/* Wordy — daily reminders.
   Runs every hour. Picks devices whose chosen local hour is now (field utcHour), and sends one notification
   only if the app was not opened today on that device (field last). Eases off for people who stopped coming:
   daily for the first 3 missed days, then every other day, and silence after 14 days. */
const {onSchedule}=require('firebase-functions/v2/scheduler');
const {logger}=require('firebase-functions');
const admin=require('firebase-admin');
admin.initializeApp();

const URL='https://wordy-b5142.web.app/app.html';
const pick=a=>a[Math.floor(Math.random()*a.length)];

function localDay(now,tz){ return new Date(now.getTime()+tz*60000).toISOString().slice(0,10); }
function daysBetween(a,b){ return Math.round((Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/86400000); }

/* pure decision, exported for tests */
function plan(d,now){
  if(!d||!d.on||!d.token) return null;
  const today=localDay(now,d.tz||0);
  if(d.sent===today) return null;
  if(!d.last||d.last>=today) return null;
  const gap=daysBetween(d.last,today);
  if(gap>14) return null;
  if(gap>3&&gap%2===1) return null;
  let title, body;
  if(gap===1&&d.streak>=2){ title='Серия '+d.streak+' '+(d.streak%10===1&&d.streak%100!==11?'день':[2,3,4].includes(d.streak%10)&&![12,13,14].includes(d.streak%100)?'дня':'дней')+' под угрозой';
    body=pick(['Пять минут — и серия спасена. Ворди уже ждёт!','Ворди держит для тебя слова дня. Заглянешь?']); }
  else if(gap===1){ title='Ворди ждёт тебя'; body=pick(['Слова дня готовы. Пять минут — и цель выполнена.','Короткая тренировка сегодня — и слова не забудутся.']); }
  else if(gap<=3){ title='Ворди скучает'; body=pick(['Слова в повторении ждут — без повторения они забываются.','Вернёмся? Начнём с короткого повторения.']); }
  else { title='Ворди всё ещё ждёт'; body='Можно начать с пяти слов. Всё, что ты выучил, сохранено.'; }
  return {today,title,body};
}

exports.wordyReminders=onSchedule({schedule:'0 * * * *',timeZone:'Etc/UTC',region:'europe-west1',memory:'256MiB',timeoutSeconds:120,maxInstances:1},async()=>{
  const db=admin.firestore(), now=new Date();
  const snap=await db.collection('push').where('utcHour','==',now.getUTCHours()).where('on','==',true).get();
  let sent=0, dropped=0;
  await Promise.all(snap.docs.map(async doc=>{
    const d=doc.data(), p=plan(d,now); if(!p) return;
    try{
      await admin.messaging().send({token:d.token,data:{title:p.title,body:p.body,url:URL},webpush:{headers:{TTL:'21600',Urgency:'normal'},fcmOptions:{link:URL}}});
      await doc.ref.update({sent:p.today}); sent++;
    }catch(e){
      const c=e&&e.code||'';
      if(c==='messaging/registration-token-not-registered'||c==='messaging/invalid-registration-token'||c==='messaging/invalid-argument'){ await doc.ref.delete().catch(()=>{}); dropped++; }
      else logger.warn('send failed',c||String(e));
    }
  }));
  logger.info('reminders',{hour:now.getUTCHours(),candidates:snap.size,sent,dropped});
});
exports._plan=plan;
