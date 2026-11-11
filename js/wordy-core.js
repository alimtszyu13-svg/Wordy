window.__libsReady.then(function(){ try{ (function(){
/* ================= APP ================= */

const html = htm.bind(React.createElement);
const {useState,useEffect,useMemo,useRef} = React;
const W=(m,...a)=>{ try{ window.Wordy&&window.Wordy[m](...a); }catch(e){} };
const SFX=(n,...a)=>{ try{ window.Sfx&&window.Sfx[n](...a); }catch(e){} };
const FX=(n,...a)=>{ try{ if(window.__wQuiet&&['rain','confetti'].includes(n)) return; if(window.__wQuiet&&n==='coinFly'&&(document.documentElement.dataset.wordy==='quiet'||document.documentElement.dataset.wordy==='hidden')){ if(typeof a[2]==='function') a[2](); return; } window.Fx&&window.Fx[n](...a); }catch(e){} };

const pad=n=>String(n).padStart(2,'0');
const dayKey=(o=0)=>{ const d=new Date(); d.setDate(d.getDate()+o); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); };
const shuffle=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const pick=a=>a[Math.floor(Math.random()*a.length)];
const plural=(n,a,b,c)=>{ const m10=n%10,m100=n%100; if(m10===1&&m100!==11) return a; if(m10>=2&&m10<=4&&(m100<10||m100>=20)) return b; return c; };

const mk=(uid,list)=>list.map(([en,ipa,ru,def,ex])=>({id:uid+'-'+en,en,ipa,ru,def,ex}));
const TRACKS=[
 {id:'basic',name:'Английский',sub:'Основы',units:[
  {id:'b1',title:'Everyday Verbs',ru:'Глаголы на каждый день',words:mk('b1',__WD[0])},
  {id:'b2',title:'Feelings',ru:'Чувства и эмоции',words:mk('b2',__WD[1])}]},
 {id:'ielts',name:'IELTS',sub:'Band 6.5+',units:[
  {id:'i1',title:'Environment',ru:'Окружающая среда',words:mk('i1',__WD[2])},
  {id:'i2',title:'Education',ru:'Образование',words:mk('i2',__WD[3])}]},
 {id:'sat',name:'SAT',sub:'Words in Context',units:[
  {id:'s1',title:'Tone & Attitude',ru:'Тон и отношение',words:mk('s1',__WD[4])},
  {id:'s2',title:'Argument Verbs',ru:'Глаголы аргументации',words:mk('s2',__WD[5])}]}
];
TRACKS[0].units.push(
  {id:'b3',title:'Travel',ru:'Путешествия',words:mk('b3',__WD[6])},
  {id:'b4',title:'Daily Routine',ru:'Распорядок дня',words:mk('b4',__WD[7])});
TRACKS[1].units.push(
  {id:'i3',title:'Technology',ru:'Технологии',words:mk('i3',__WD[8])},
  {id:'i4',title:'Work & Economy',ru:'Работа и экономика',words:mk('i4',__WD[9])});
TRACKS[2].units.push(
  {id:'s3',title:'Change & Degree',ru:'Изменение и степень',words:mk('s3',__WD[10])},
  {id:'s4',title:'Character',ru:'Черты характера',words:mk('s4',__WD[11])});
TRACKS[0].units.push(
  {id:'b5',title:'Food & Cooking',ru:'Еда и готовка',words:mk('b5',__WD[12])},
  {id:'b6',title:'Weather',ru:'Погода',words:mk('b6',__WD[13])},
  {id:'b7',title:'Shopping',ru:'Покупки',words:mk('b7',__WD[14])},
  {id:'b8',title:'School Life',ru:'Учёба',words:mk('b8',__WD[15])},
  {id:'b9',title:'Appearance',ru:'Внешность',words:mk('b9',__WD[16])},
  {id:'b10',title:'Hobbies',ru:'Хобби',words:mk('b10',__WD[17])});
TRACKS[1].units.push(
  {id:'i5',title:'Crime & Law',ru:'Преступность и закон',words:mk('i5',__WD[18])},
  {id:'i6',title:'Media',ru:'СМИ',words:mk('i6',__WD[19])},
  {id:'i7',title:'City Life',ru:'Урбанизация',words:mk('i7',__WD[20])},
  {id:'i8',title:'Globalisation',ru:'Глобализация',words:mk('i8',__WD[21])},
  {id:'i9',title:'Describing Trends',ru:'Описание графиков',words:mk('i9',__WD[22])},
  {id:'i10',title:'Opinions',ru:'Аргументация',words:mk('i10',__WD[23])});
TRACKS[2].units.push(
  {id:'s5',title:'Praise & Criticism',ru:'Одобрение и критика',words:mk('s5',__WD[24])},
  {id:'s6',title:'Truth & Evidence',ru:'Истина и доказательства',words:mk('s6',__WD[25])},
  {id:'s7',title:'Quantity',ru:'Количество',words:mk('s7',__WD[26])},
  {id:'s8',title:'Time',ru:'Время',words:mk('s8',__WD[27])},
  {id:'s9',title:'Clarity',ru:'Ясность и путаница',words:mk('s9',__WD[28])},
  {id:'s10',title:'Attitude',ru:'Отношение',words:mk('s10',__WD[29])});
TRACKS[0].units.push(
  {id:'b11',title:'Family',ru:'Семья',words:mk('b11',__WD[30])},
  {id:'b12',title:'Home',ru:'Дом',words:mk('b12',__WD[31])},
  {id:'b13',title:'Health',ru:'Здоровье',words:mk('b13',__WD[32])},
  {id:'b14',title:'Clothes',ru:'Одежда',words:mk('b14',__WD[33])});
/* ---------- Basic pack 3 ---------- */
TRACKS[0].units.push(
 {id:"b15",cefr:"A1",title:"Numbers & Time",ru:"Числа и время",words:mk("b15",__WD[34])},
 {id:"b16",cefr:"A1",title:"The Body",ru:"Части тела",words:mk("b16",__WD[35])},
 {id:"b17",cefr:"A1",title:"Animals",ru:"Животные",words:mk("b17",__WD[36])},
 {id:"b18",cefr:"A1",title:"Colours & Describing",ru:"Цвета и описание",words:mk("b18",__WD[37])},
 {id:"b19",cefr:"A2",title:"Jobs",ru:"Профессии",words:mk("b19",__WD[38])},
 {id:"b20",cefr:"A2",title:"City & Directions",ru:"Город и дорога",words:mk("b20",__WD[39])},
 {id:"b21",cefr:"A2",title:"Nature",ru:"Природа",words:mk("b21",__WD[40])},
 {id:"b22",cefr:"A2",title:"Technology",ru:"Технологии в быту",words:mk("b22",__WD[41])},
 {id:"b23",cefr:"B1",title:"Relationships",ru:"Отношения",words:mk("b23",__WD[42])},
 {id:"b24",cefr:"B1",title:"Money",ru:"Деньги",words:mk("b24",__WD[43])},
 {id:"b25",cefr:"B1",title:"Work & Career",ru:"Работа и карьера",words:mk("b25",__WD[44])},
 {id:"b26",cefr:"B1",title:"Problems & Advice",ru:"Проблемы и советы",words:mk("b26",__WD[45])}
);
/* ---------- general vocab B2–C1 ---------- */
TRACKS[0].units.push(
 {id:"b27",cefr:"B2",title:"Feelings & Character",ru:"Чувства и характер",words:mk("b27",__WD[46])},
 {id:"b28",cefr:"B2",title:"News & Events",ru:"Новости и события",words:mk("b28",__WD[47])},
 {id:"b29",cefr:"C1",title:"Abstract Nouns",ru:"Абстрактные понятия",words:mk("b29",__WD[48])},
 {id:"b30",cefr:"C1",title:"Formal Verbs",ru:"Формальные глаголы",words:mk("b30",__WD[49])}
);
/* ---------- idioms ---------- */
TRACKS.push({id:'idioms',name:'Идиомы',sub:'Idioms',hidden:true,units:[
 {id:"d1",cefr:"A2",title:"Everyday Idioms",ru:"Идиомы на каждый день",words:mk("d1",__WD[50])},
 {id:"d2",cefr:"B1",title:"People & Feelings",ru:"Идиомы о людях и чувствах",words:mk("d2",__WD[51])},
 {id:"d3",cefr:"B1",title:"Time & Effort",ru:"Время и усилия",words:mk("d3",__WD[52])},
 {id:"d4",cefr:"B2",title:"Work & Study",ru:"Идиомы о работе и учёбе",words:mk("d4",__WD[53])},
 {id:"d5",cefr:"B2",title:"Decisions & Problems",ru:"Решения и проблемы",words:mk("d5",__WD[54])},
 {id:"d6",cefr:"C1",title:"Advanced Idioms",ru:"Продвинутые идиомы",words:mk("d6",__WD[55])}
]});
/* ---------- IELTS pack 2 ---------- */
TRACKS[1].units.push(
 {id:"i11",cefr:"B2",title:"Health & Medicine",ru:"Здоровье и медицина",words:mk("i11",__WD[56])},
 {id:"i12",cefr:"B2",title:"Science & Research",ru:"Наука и исследования",words:mk("i12",__WD[57])},
 {id:"i13",cefr:"B1",title:"Family & Society",ru:"Семья и общество",words:mk("i13",__WD[58])},
 {id:"i14",cefr:"B1",title:"Travel & Tourism",ru:"Путешествия и туризм",words:mk("i14",__WD[59])},
 {id:"i15",cefr:"B2",title:"Food & Agriculture",ru:"Еда и сельское хозяйство",words:mk("i15",__WD[60])},
 {id:"i16",cefr:"B2",title:"Energy",ru:"Энергия",words:mk("i16",__WD[61])},
 {id:"i17",cefr:"B1",title:"Transport",ru:"Транспорт",words:mk("i17",__WD[62])},
 {id:"i18",cefr:"B2",title:"Housing & Architecture",ru:"Жильё и архитектура",words:mk("i18",__WD[63])},
 {id:"i19",cefr:"B2",title:"Art & Culture",ru:"Искусство и культура",words:mk("i19",__WD[64])},
 {id:"i20",cefr:"B1",title:"Sport & Fitness",ru:"Спорт и фитнес",words:mk("i20",__WD[65])},
 {id:"i21",cefr:"C1",title:"Government & Politics",ru:"Государство и политика",words:mk("i21",__WD[66])},
 {id:"i22",cefr:"B2",title:"Language & Communication",ru:"Язык и общение",words:mk("i22",__WD[67])},
 {id:"i23",cefr:"B2",title:"Animals & Wildlife",ru:"Животные и дикая природа",words:mk("i23",__WD[68])},
 {id:"i24",cefr:"B2",title:"Space Exploration",ru:"Освоение космоса",words:mk("i24",__WD[69])},
 {id:"i25",cefr:"C1",title:"Psychology & Behaviour",ru:"Психология и поведение",words:mk("i25",__WD[70])},
 {id:"i26",cefr:"B2",title:"Business & Marketing",ru:"Бизнес и маркетинг",words:mk("i26",__WD[71])},
 {id:"i27",cefr:"C1",title:"Academic Verbs",ru:"Академические глаголы",words:mk("i27",__WD[72])},
 {id:"i28",cefr:"B2",title:"Water & Oceans",ru:"Вода и океаны",words:mk("i28",__WD[73])},
 {id:"i29",cefr:"C1",title:"Ageing & Population",ru:"Старение и население",words:mk("i29",__WD[74])},
 {id:"i30",cefr:"C1",title:"Problems & Solutions",ru:"Проблемы и решения (эссе)",words:mk("i30",__WD[75])}
);
/* ---------- SAT pack 2 ---------- */
TRACKS[2].units.push(
 {id:"s11",cefr:"C1",title:"Persuasion & Rhetoric",ru:"Убеждение и риторика",words:mk("s11",__WD[76])},
 {id:"s12",cefr:"C1",title:"Conflict & Resolution",ru:"Конфликт и примирение",words:mk("s12",__WD[77])},
 {id:"s13",cefr:"C1",title:"Honesty & Deception",ru:"Честность и обман",words:mk("s13",__WD[78])},
 {id:"s14",cefr:"C1",title:"Power & Authority",ru:"Власть и авторитет",words:mk("s14",__WD[79])},
 {id:"s15",cefr:"C1",title:"Generosity & Greed",ru:"Щедрость и жадность",words:mk("s15",__WD[80])},
 {id:"s16",cefr:"B2",title:"Courage & Fear",ru:"Смелость и страх",words:mk("s16",__WD[81])},
 {id:"s17",cefr:"C1",title:"Wisdom & Foolishness",ru:"Мудрость и глупость",words:mk("s17",__WD[82])},
 {id:"s18",cefr:"C1",title:"Speech & Style",ru:"Речь и стиль",words:mk("s18",__WD[83])},
 {id:"s19",cefr:"B2",title:"Science in Context",ru:"Наука в текстах SAT",words:mk("s19",__WD[84])},
 {id:"s20",cefr:"C1",title:"Nature & Environment",ru:"Природа в текстах",words:mk("s20",__WD[85])},
 {id:"s21",cefr:"C1",title:"Emotions",ru:"Эмоции",words:mk("s21",__WD[86])},
 {id:"s22",cefr:"B2",title:"Social Behaviour",ru:"Поведение в обществе",words:mk("s22",__WD[87])},
 {id:"s23",cefr:"B2",title:"Importance",ru:"Важность",words:mk("s23",__WD[88])},
 {id:"s24",cefr:"C1",title:"Similarity & Difference",ru:"Сходство и различие",words:mk("s24",__WD[89])},
 {id:"s25",cefr:"C1",title:"Beginnings & Endings",ru:"Начало и конец",words:mk("s25",__WD[90])},
 {id:"s26",cefr:"C1",title:"Support & Opposition",ru:"Поддержка и противодействие",words:mk("s26",__WD[91])},
 {id:"s27",cefr:"B2",title:"Wealth & Poverty",ru:"Богатство и бедность",words:mk("s27",__WD[92])},
 {id:"s28",cefr:"C1",title:"Order & Chaos",ru:"Порядок и хаос",words:mk("s28",__WD[93])},
 {id:"s29",cefr:"C1",title:"Reasoning & Logic",ru:"Рассуждения и логика",words:mk("s29",__WD[94])},
 {id:"s30",cefr:"C1",title:"Multiple-Meaning Words",ru:"Многозначные слова SAT",words:mk("s30",__WD[95])}
);
/* ---------- A1 vocabulary pack ---------- */
TRACKS[0].units.push(
 {id:"b31",cefr:"A1",title:"Greetings",ru:"Приветствия и вежливость",words:mk("b31",__WD[96])},
 {id:"b32",cefr:"A1",title:"Days & Months",ru:"Дни и месяцы",words:mk("b32",__WD[97])},
 {id:"b33",cefr:"A1",title:"Food Basics",ru:"Основные продукты",words:mk("b33",__WD[98])},
 {id:"b34",cefr:"A1",title:"Drinks & Meals",ru:"Напитки и приёмы пищи",words:mk("b34",__WD[99])},
 {id:"b35",cefr:"A1",title:"Fruit & Vegetables",ru:"Фрукты и овощи",words:mk("b35",__WD[100])},
 {id:"b36",cefr:"A1",title:"In the Classroom",ru:"В классе",words:mk("b36",__WD[101])},
 {id:"b37",cefr:"A1",title:"Movement Verbs",ru:"Глаголы движения",words:mk("b37",__WD[102])},
 {id:"b38",cefr:"A1",title:"Everyday Actions",ru:"Повседневные действия",words:mk("b38",__WD[103])},
 {id:"b39",cefr:"A1",title:"Opposites",ru:"Противоположности",words:mk("b39",__WD[104])},
 {id:"b40",cefr:"A1",title:"Seasons & Holidays",ru:"Времена года и праздники",words:mk("b40",__WD[105])},
 {id:"b41",cefr:"A1",title:"Transport",ru:"Транспорт",words:mk("b41",__WD[106])},
 {id:"b42",cefr:"A1",title:"Places in Town",ru:"Места в городе",words:mk("b42",__WD[107])},
 {id:"b43",cefr:"A1",title:"Sports & Games",ru:"Спорт и игры",words:mk("b43",__WD[108])},
 {id:"b44",cefr:"A1",title:"Countries",ru:"Страны и национальности",words:mk("b44",__WD[109])},
 {id:"b45",cefr:"A1",title:"How Do You Feel?",ru:"Как ты себя чувствуешь?",words:mk("b45",__WD[110])},
 {id:"b46",cefr:"A1",title:"In the Kitchen",ru:"На кухне",words:mk("b46",__WD[111])},
 {id:"b47",cefr:"A1",title:"Music & Free Time",ru:"Музыка и досуг",words:mk("b47",__WD[112])},
 {id:"b48",cefr:"A1",title:"About Me",ru:"Информация о себе",words:mk("b48",__WD[113])},
 {id:"b49",cefr:"A1",title:"Key Verbs",ru:"Главные глаголы",words:mk("b49",__WD[114])},
 {id:"b50",cefr:"A1",title:"My Morning",ru:"Моё утро",words:mk("b50",__WD[115])}
);
/* ---------- A2 vocabulary pack ---------- */
TRACKS[0].units.push(
 {id:"b51",cefr:"A2",title:"Personality",ru:"Черты характера",words:mk("b51",__WD[116])},
 {id:"b52",cefr:"A2",title:"At the Doctor's",ru:"У врача",words:mk("b52",__WD[117])},
 {id:"b53",cefr:"A2",title:"At the Airport",ru:"В аэропорту",words:mk("b53",__WD[118])},
 {id:"b54",cefr:"A2",title:"At the Hotel",ru:"В отеле",words:mk("b54",__WD[119])},
 {id:"b55",cefr:"A2",title:"At a Restaurant",ru:"В ресторане",words:mk("b55",__WD[120])},
 {id:"b56",cefr:"A2",title:"Housework",ru:"Домашние дела",words:mk("b56",__WD[121])},
 {id:"b57",cefr:"A2",title:"Clothes Shopping",ru:"Покупка одежды",words:mk("b57",__WD[122])},
 {id:"b58",cefr:"A2",title:"Phone & Messages",ru:"Звонки и переписка",words:mk("b58",__WD[123])},
 {id:"b59",cefr:"A2",title:"Feelings",ru:"Чувства",words:mk("b59",__WD[124])},
 {id:"b60",cefr:"A2",title:"Exams & Lessons",ru:"Экзамены и уроки",words:mk("b60",__WD[125])},
 {id:"b61",cefr:"A2",title:"Going Out",ru:"Куда пойти",words:mk("b61",__WD[126])},
 {id:"b62",cefr:"A2",title:"Body Language",ru:"Мимика и жесты",words:mk("b62",__WD[127])},
 {id:"b63",cefr:"A2",title:"Time Words",ru:"Слова времени",words:mk("b63",__WD[128])},
 {id:"b64",cefr:"A2",title:"Green Living",ru:"Забота о планете",words:mk("b64",__WD[129])},
 {id:"b65",cefr:"A2",title:"Matches & Teams",ru:"Матчи и команды",words:mk("b65",__WD[130])},
 {id:"b66",cefr:"A2",title:"More Jobs",ru:"Ещё профессии",words:mk("b66",__WD[131])},
 {id:"b67",cefr:"A2",title:"Weather Words",ru:"Погода подробно",words:mk("b67",__WD[132])},
 {id:"b68",cefr:"A2",title:"Phrasal Verbs 1",ru:"Первые фразовые глаголы",words:mk("b68",__WD[133])},
 {id:"b69",cefr:"A2",title:"Social Media",ru:"Соцсети",words:mk("b69",__WD[134])},
 {id:"b70",cefr:"A2",title:"Describing Places",ru:"Описание мест",words:mk("b70",__WD[135])},
 {id:"b71",cefr:"A2",title:"Useful Adjectives",ru:"Полезные прилагательные",words:mk("b71",__WD[136])}
);
TRACKS.find(t=>t.id==='idioms').units.push(
 {id:"d7",cefr:"A2",title:"Food & Animal Idioms",ru:"Идиомы про еду и животных",words:mk("d7",__WD[137])},
 {id:"d8",cefr:"A2",title:"Colour & Body Idioms",ru:"Идиомы про цвета и тело",words:mk("d8",__WD[138])}
);
/* ---------- B1 vocabulary pack ---------- */
TRACKS[0].units.push(
 {id:"b72",cefr:"B1",title:"Character",ru:"Характер подробно",words:mk("b72",__WD[139])},
 {id:"b73",cefr:"B1",title:"University",ru:"Университет",words:mk("b73",__WD[140])},
 {id:"b74",cefr:"B1",title:"Gadgets",ru:"Гаджеты и компьютер",words:mk("b74",__WD[141])},
 {id:"b75",cefr:"B1",title:"Crime",ru:"Преступления",words:mk("b75",__WD[142])},
 {id:"b76",cefr:"B1",title:"TV & Entertainment",ru:"ТВ и развлечения",words:mk("b76",__WD[143])},
 {id:"b77",cefr:"B1",title:"Travel Experiences",ru:"Впечатления от поездок",words:mk("b77",__WD[144])},
 {id:"b78",cefr:"B1",title:"Healthy Lifestyle",ru:"Здоровый образ жизни",words:mk("b78",__WD[145])},
 {id:"b79",cefr:"B1",title:"Our Planet",ru:"Наша планета",words:mk("b79",__WD[146])},
 {id:"b80",cefr:"B1",title:"Services",ru:"Покупки и сервис",words:mk("b80",__WD[147])},
 {id:"b81",cefr:"B1",title:"Opinions",ru:"Мнения",words:mk("b81",__WD[148])},
 {id:"b82",cefr:"B1",title:"At Work",ru:"На работе",words:mk("b82",__WD[149])},
 {id:"b83",cefr:"B1",title:"Repairs",ru:"Ремонт и поломки",words:mk("b83",__WD[150])},
 {id:"b84",cefr:"B1",title:"Talking & Discussing",ru:"Обсуждения",words:mk("b84",__WD[151])},
 {id:"b85",cefr:"B1",title:"Society",ru:"Общество",words:mk("b85",__WD[152])},
 {id:"b86",cefr:"B1",title:"Phrasal Verbs 2",ru:"Фразовые глаголы 2",words:mk("b86",__WD[153])},
 {id:"b87",cefr:"B1",title:"Useful Nouns",ru:"Полезные существительные",words:mk("b87",__WD[154])}
);
TRACKS[1].units.push(
 {id:"i31",cefr:"B1",title:"Hobbies & Leisure",ru:"Хобби и досуг (Speaking)",words:mk("i31",__WD[155])},
 {id:"i32",cefr:"B1",title:"Shopping Habits",ru:"Потребление и покупки",words:mk("i32",__WD[156])},
 {id:"i33",cefr:"B1",title:"Weather & Seasons",ru:"Погода и сезоны (Speaking)",words:mk("i33",__WD[157])},
 {id:"i34",cefr:"B1",title:"Childhood & Memories",ru:"Детство и воспоминания",words:mk("i34",__WD[158])},
 {id:"i35",cefr:"B1",title:"Describing Places",ru:"Описание мест (Speaking)",words:mk("i35",__WD[159])}
);
TRACKS.find(t=>t.id==='idioms').units.push(
 {id:"d9",cefr:"B1",title:"Money Idioms",ru:"Идиомы про деньги",words:mk("d9",__WD[160])},
 {id:"d10",cefr:"B1",title:"Communication Idioms",ru:"Идиомы про общение",words:mk("d10",__WD[161])},
 {id:"d11",cefr:"B1",title:"Success & Failure",ru:"Успех и неудачи",words:mk("d11",__WD[162])}
);
/* ---------- B2 vocabulary pack ---------- */
TRACKS[0].units.push(
 {id:"b88",cefr:"B2",title:"Collocations: make & do",ru:"Сочетания с make и do",words:mk("b88",__WD[163])},
 {id:"b89",cefr:"B2",title:"Collocations: take, have, get",ru:"Сочетания с take, have, get",words:mk("b89",__WD[164])},
 {id:"b90",cefr:"B2",title:"Relationships 2",ru:"Отношения подробно",words:mk("b90",__WD[165])},
 {id:"b91",cefr:"B2",title:"Business Basics",ru:"Основы бизнеса",words:mk("b91",__WD[166])},
 {id:"b92",cefr:"B2",title:"Strong Emotions",ru:"Сильные эмоции",words:mk("b92",__WD[167])},
 {id:"b93",cefr:"B2",title:"Technology & Society",ru:"Технологии и общество",words:mk("b93",__WD[168])},
 {id:"b94",cefr:"B2",title:"Urban Life",ru:"Городская жизнь",words:mk("b94",__WD[169])},
 {id:"b95",cefr:"B2",title:"Debating",ru:"Спор и аргументация",words:mk("b95",__WD[170])}
);
TRACKS[2].units.push(
 {id:"s31",cefr:"B2",title:"Words for Change",ru:"Слова изменения",words:mk("s31",__WD[171])},
 {id:"s32",cefr:"B2",title:"Size & Amount",ru:"Размер и количество",words:mk("s32",__WD[172])}
);
TRACKS.find(t=>t.id==='idioms').units.push(
 {id:"d12",cefr:"B2",title:"Everyday B2 Idioms",ru:"Идиомы B2 на каждый день",words:mk("d12",__WD[173])},
 {id:"d13",cefr:"B2",title:"Time & Change Idioms",ru:"Идиомы про время и перемены",words:mk("d13",__WD[174])}
);
/* ---------- C1 vocabulary pack ---------- */
TRACKS[0].units.push(
 {id:"b96",cefr:"C1",title:"Nuanced Adjectives",ru:"Тонкие прилагательные",words:mk("b96",__WD[175])},
 {id:"b97",cefr:"C1",title:"Academic Nouns",ru:"Академические существительные",words:mk("b97",__WD[176])},
 {id:"b98",cefr:"C1",title:"Phrasal Verbs C1",ru:"Фразовые глаголы C1",words:mk("b98",__WD[177])},
 {id:"b99",cefr:"C1",title:"Formal Linkers & Adverbs",ru:"Формальные связки и наречия",words:mk("b99",__WD[178])}
);
TRACKS[1].units.push(
 {id:"i36",cefr:"C1",title:"Economy C1",ru:"Экономика (Writing Task 2)",words:mk("i36",__WD[179])},
 {id:"i37",cefr:"C1",title:"Education C1",ru:"Образование (Writing Task 2)",words:mk("i37",__WD[180])}
);
TRACKS.find(t=>t.id==='idioms').units.push(
 {id:"d14",cefr:"C1",title:"Business Idioms",ru:"Деловые идиомы",words:mk("d14",__WD[181])},
 {id:"d15",cefr:"C1",title:"Argument Idioms",ru:"Идиомы для споров",words:mk("d15",__WD[182])}
);
/* ---------- vocabulary pack 5 ---------- */
TRACKS[0].units.push(
 {id:"b100",cefr:"A1",title:"Family Members",ru:"Члены семьи",words:mk("b100",__WD[183])},
 {id:"b101",cefr:"A1",title:"Things at Home",ru:"Вещи в доме",words:mk("b101",__WD[184])},
 {id:"b102",cefr:"A2",title:"Cooking & Tastes",ru:"Готовка и вкусы",words:mk("b102",__WD[185])},
 {id:"b103",cefr:"A2",title:"Celebrations",ru:"Праздники и торжества",words:mk("b103",__WD[186])},
 {id:"b104",cefr:"B1",title:"Competitive Sport",ru:"Спортивные соревнования",words:mk("b104",__WD[187])},
 {id:"b105",cefr:"B1",title:"Science Basics",ru:"Основы науки",words:mk("b105",__WD[188])},
 {id:"b106",cefr:"B2",title:"Medicine",ru:"Медицина",words:mk("b106",__WD[189])},
 {id:"b107",cefr:"B2",title:"In Court",ru:"В суде",words:mk("b107",__WD[190])},
 {id:"b108",cefr:"C1",title:"Cause & Effect Verbs",ru:"Глаголы причины и следствия",words:mk("b108",__WD[191])},
 {id:"b109",cefr:"C1",title:"Trends C1",ru:"Описание трендов C1",words:mk("b109",__WD[192])}
);
/* ---------- word packs v20 ---------- */
/* ---------- big pack: helper ---------- */
function U(tr,id,cefr,title,ru,block){ const t=TRACKS.find(x=>x.id===tr); if(!t) return;
  const rows=block.trim().split('\n').map(l=>l.split('|').map(s=>s.trim())).filter(r=>r.length===5&&r[0]);
  if(rows.length>=5) t.units.push({id,cefr,title,ru,words:mk(id,rows)}); }
/* ---------- A1 pack ---------- */
U('basic','b110','A1','Colours','Цвета',__WD[193]);
U('basic','b111','A1','Clothes Basics','Основная одежда',__WD[194]);
U('basic','b112','A1','Weather Basics','Погода: основное',__WD[195]);
U('basic','b113','A1','Body Parts 2','Части тела 2',__WD[196]);
U('basic','b114','A1','Tasty Food','Вкусная еда',__WD[197]);
U('basic','b115','A1','Places to Live','Где живут люди',__WD[198]);
U('basic','b116','A1','Outside','На природе',__WD[199]);
U('basic','b117','A1','People at Work','Люди и профессии',__WD[200]);
U('basic','b118','A1','Giving & Taking','Давать и брать',__WD[201]);
U('basic','b119','A1','Learning Verbs','Глаголы учёбы',__WD[202]);
U('basic','b120','A1','Basic Adjectives','Базовые прилагательные',__WD[203]);
U('basic','b121','A1','How Often?','Как часто?',__WD[204]);
U('basic','b122','A1','Rooms','Комнаты',__WD[205]);
U('basic','b123','A1','More Animals','Ещё животные',__WD[206]);
U('basic','b124','A1','School Subjects','Школьные предметы',__WD[207]);
U('basic','b125','A1','Shopping Basics','Покупки: основное',__WD[208]);
U('basic','b126','A1','Daily Things','Повседневные вещи',__WD[209]);
U('basic','b127','A1','Prepositions of Place','Где?',__WD[210]);
U('basic','b128','A1','Numbers 2','Числа 2',__WD[211]);
U('basic','b129','A1','Simple Actions','Простые действия',__WD[212]);

U('basic','b130','A1','Toys & Games','Игрушки и игры',__WD[213]);
U('basic','b131','A1','The Weekdays','Дни недели',__WD[214]);
U('basic','b132','A1','Months','Месяцы',__WD[215]);
U('basic','b133','A1','Around the House','По дому',__WD[216]);
U('basic','b134','A1','Transport 2','Транспорт 2',__WD[217]);
U('basic','b135','A1','In the Park','В парке',__WD[218]);
U('basic','b136','A1','Hobbies Basics','Хобби: основное',__WD[219]);
U('basic','b137','A1','Question Words','Вопросительные слова',__WD[220]);
U('basic','b138','A1','Family Life','Семейная жизнь',__WD[221]);
U('basic','b139','A1','Food Verbs','Глаголы еды',__WD[222]);
U('basic','b140','A1','Big Numbers & Money','Большие числа и деньги',__WD[223]);
U('basic','b141','A1','Feelings 2','Чувства 2',__WD[224]);
U('basic','b142','A1','Places in School','Места в школе',__WD[225]);
U('basic','b143','A1','Personal Things','Личные вещи',__WD[226]);
U('basic','b144','A1','Time Words','Время',__WD[227]);
U('basic','b145','A1','Simple Verbs 3','Простые глаголы 3',__WD[228]);
U('basic','b146','A1','Kyrgyz Life','Жизнь в Кыргызстане',__WD[229]);
U('basic','b147','A1','Describing People','Описание людей',__WD[230]);
U('basic','b148','A1','Very Common Words','Самые частые слова',__WD[231]);
U('basic','b149','A1','Holidays & Trips','Отдых',__WD[232]);

/* ---------- A2 pack ---------- */
U('basic','b150','A2','Travel Verbs','Глаголы путешествий',__WD[233]);
U('basic','b151','A2','Around the City','По городу',__WD[234]);
U('basic','b152','A2','Health Habits','Полезные привычки',__WD[235]);
U('basic','b153','A2','House & Flat','Квартира и дом',__WD[236]);
U('basic','b154','A2','Free-Time Activities','Занятия на досуге',__WD[237]);
U('basic','b155','A2','Describing Things','Описание вещей',__WD[238]);
U('basic','b156','A2','Weather 3','Погода 3',__WD[239]);
U('basic','b157','A2','Shopping 3','Покупки 3',__WD[240]);
U('basic','b158','A2','Feelings 3','Чувства 3',__WD[241]);
U('basic','b159','A2','Phone & Internet','Телефон и интернет',__WD[242]);
U('basic','b160','A2','Work Words','Слова о работе',__WD[243]);
U('basic','b161','A2','Food Shopping','Покупка продуктов',__WD[244]);
U('basic','b162','A2','Body & Health 2','Тело и здоровье 2',__WD[245]);
U('basic','b163','A2','Life Events','События жизни',__WD[246]);
U('basic','b164','A2','Talking about Films','Говорим о фильмах',__WD[247]);
U('basic','b165','A2','Music','Музыка',__WD[248]);
U('basic','b166','A2','Countries & Travel','Страны и поездки',__WD[249]);
U('basic','b167','A2','In the Classroom 2','На уроке 2',__WD[250]);
U('basic','b168','A2','Nature 2','Природа 2',__WD[251]);
U('basic','b169','A2','At the Bank & Post','Банк и почта',__WD[252]);
U('basic','b170','A2','Daily Problems','Повседневные проблемы',__WD[253]);
U('basic','b171','A2','Sports 3','Спорт 3',__WD[254]);
U('basic','b172','A2','Useful Verbs A2','Полезные глаголы A2',__WD[255]);
U('basic','b173','A2','Adverbs','Наречия',__WD[256]);

U('basic','b174','A2','Relationships A2','Отношения A2',__WD[257]);
U('basic','b175','A2','Transport 3','Транспорт 3',__WD[258]);
U('basic','b176','A2','Character 2','Характер 2',__WD[259]);
U('basic','b177','A2','Clothes 3','Одежда 3',__WD[260]);
U('basic','b178','A2','Kitchen 2','Кухня 2',__WD[261]);
U('basic','b179','A2','Holidays 2','Каникулы 2',__WD[262]);
U('basic','b180','A2','Problems at School','Проблемы в школе',__WD[263]);
U('basic','b181','A2','In Town 2','В городе 2',__WD[264]);
U('basic','b182','A2','Feelings Verbs','Глаголы чувств',__WD[265]);
U('basic','b183','A2','Numbers & Measures','Измерения',__WD[266]);
U('basic','b184','A2','Reading & Writing','Чтение и письмо',__WD[267]);
U('basic','b185','A2','Sounds & Senses','Ощущения',__WD[268]);
U('basic','b186','A2','Money & Prices','Деньги и цены',__WD[269]);
U('basic','b187','A2','Animals 3','Животные 3',__WD[270]);
U('basic','b188','A2','Technology A2','Техника A2',__WD[271]);
U('basic','b189','A2','Travel Problems','Проблемы в поездке',__WD[272]);
U('basic','b190','A2','Hobbies A2','Хобби A2',__WD[273]);
U('basic','b191','A2','Linking Words','Связки',__WD[274]);
U('basic','b192','A2','Opposites 2','Противоположности 2',__WD[275]);
U('basic','b193','A2','Party Time','Вечеринка',__WD[276]);
U('idioms','d16','A2','Everyday Idioms 2','Повседневные идиомы 2',__WD[277]);
U('idioms','d17','A2','Feelings Idioms','Идиомы о чувствах',__WD[278]);
U('idioms','d18','A2','School Idioms','Школьные идиомы',__WD[279]);
U('idioms','d19','A2','Weather Idioms','Идиомы о погоде',__WD[280]);
U('idioms','d20','A2','Food Idioms 2','Идиомы о еде 2',__WD[281]);

/* ---------- B1 pack ---------- */
U('basic','b200','B1','Personality B1','Личность B1',__WD[282]);
U('basic','b201','B1','Feelings B1','Чувства B1',__WD[283]);
U('basic','b202','B1','Education B1','Образование B1',__WD[284]);
U('basic','b203','B1','Work B1','Работа B1',__WD[285]);
U('basic','b204','B1','Money B1','Деньги B1',__WD[286]);
U('basic','b205','B1','Health B1','Здоровье B1',__WD[287]);
U('basic','b206','B1','The Environment B1','Экология B1',__WD[288]);
U('basic','b207','B1','Media B1','Медиа B1',__WD[289]);
U('basic','b208','B1','Travel B1','Путешествия B1',__WD[290]);
U('basic','b209','B1','Crime B1','Преступность B1',__WD[291]);
U('basic','b210','B1','Feelings & Reactions','Реакции',__WD[292]);
U('basic','b211','B1','Science & Tech B1','Наука и техника B1',__WD[293]);
U('basic','b212','B1','Sport B1','Спорт B1',__WD[294]);
U('basic','b213','B1','Food B1','Еда B1',__WD[295]);
U('basic','b214','B1','Home B1','Дом B1',__WD[296]);
U('basic','b215','B1','Shopping B1','Покупки B1',__WD[297]);
U('basic','b216','B1','Phrasal Verbs 3','Фразовые глаголы 3',__WD[298]);
U('basic','b217','B1','Communication B1','Общение B1',__WD[299]);
U('basic','b218','B1','Useful Adjectives B1','Полезные прилагательные B1',__WD[300]);
U('basic','b219','B1','Abstract B1','Абстрактные слова B1',__WD[301]);
U('basic','b220','B1','Time B1','Время B1',__WD[302]);
U('basic','b221','B1','Places B1','Места B1',__WD[303]);

U('basic','b222','B1','Home & Repairs','Дом и ремонт',__WD[304]);
U('basic','b223','B1','Feelings B1','Чувства B1',__WD[305]);
U('basic','b224','B1','Crime & Law B1','Преступления и закон B1',__WD[306]);
U('basic','b225','B1','Media & News','СМИ и новости',__WD[307]);
U('basic','b226','B1','Body & Movement','Тело и движения',__WD[308]);
U('basic','b227','B1','Technology B1','Технологии B1',__WD[309]);
U('basic','b228','B1','Nature B1','Природа B1',__WD[310]);
U('basic','b229','B1','Phrasal Verbs B1-3','Фразовые глаголы B1-3',__WD[311]);
U('basic','b230','B1','Describing Things','Описание предметов',__WD[312]);
U('basic','b231','B1','Relationships B1','Отношения B1',__WD[313]);
U('basic','b232','B1','Food B1','Еда B1',__WD[314]);
U('basic','b233','B1','Work B1-2','Работа B1-2',__WD[315]);
U('ielts','i38','B1','IELTS: Education B1','IELTS: Образование B1',__WD[316]);
U('ielts','i39','B1','IELTS: Environment B1','IELTS: Экология B1',__WD[317]);
U('ielts','i40','B1','IELTS: Health B1','IELTS: Здоровье B1',__WD[318]);
U('ielts','i41','B1','IELTS: Work B1','IELTS: Работа B1',__WD[319]);
U('ielts','i42','B1','IELTS: Technology B1','IELTS: Технологии B1',__WD[320]);
U('ielts','i43','B1','IELTS: Cities B1','IELTS: Города B1',__WD[321]);
U('ielts','i44','B1','IELTS: Travel B1','IELTS: Путешествия B1',__WD[322]);
U('ielts','i45','B1','IELTS: Describing Trends','IELTS: Описание тенденций',__WD[323]);
U('ielts','i46','B1','IELTS: Opinion Phrases','IELTS: Выражение мнения',__WD[324]);
U('ielts','i47','B1','IELTS: Family & Society','IELTS: Семья и общество',__WD[325]);
U('idioms','d21','B1','Work Idioms','Идиомы о работе',__WD[326]);
U('idioms','d22','B1','Animal Idioms','Идиомы о животных',__WD[327]);
U('idioms','d23','B1','Body Idioms','Идиомы о теле',__WD[328]);
U('idioms','d24','B1','Colour Idioms','Идиомы о цветах',__WD[329]);
U('idioms','d25','B1','Time Idioms','Идиомы о времени',__WD[330]);
U('idioms','d26','B1','Food Idioms 2','Идиомы о еде 2',__WD[331]);
U('idioms','d27','B1','Travel Idioms','Идиомы о путешествиях',__WD[332]);
U('idioms','d28','B1','Communication Idioms','Идиомы об общении',__WD[333]);
U('idioms','d29','B1','Success Idioms','Идиомы об успехе',__WD[334]);
U('idioms','d30','B1','Problem Idioms','Идиомы о проблемах',__WD[335]);

U('basic','b240','B2','Personality B2','Характер B2',__WD[336]);
U('basic','b241','B2','Emotions B2','Эмоции B2',__WD[337]);
U('basic','b242','B2','Business','Бизнес',__WD[338]);
U('basic','b243','B2','Money & Finance','Деньги и финансы',__WD[339]);
U('basic','b244','B2','Justice B2','Правосудие B2',__WD[340]);
U('basic','b245','B2','Medicine B2','Медицина B2',__WD[341]);
U('basic','b246','B2','Science','Наука',__WD[342]);
U('basic','b247','B2','Politics','Политика',__WD[343]);
U('basic','b248','B2','Arts & Culture','Искусство и культура',__WD[344]);
U('basic','b249','B2','Environment B2','Окружающая среда B2',__WD[345]);
U('basic','b250','B2','Travel B2','Путешествия B2',__WD[346]);
U('basic','b251','B2','Communication Verbs','Глаголы общения',__WD[347]);
U('basic','b252','B2','Phrasal Verbs B2-1','Фразовые глаголы B2-1',__WD[348]);
U('basic','b253','B2','Phrasal Verbs B2-2','Фразовые глаголы B2-2',__WD[349]);
U('basic','b254','B2','Phrasal Verbs B2-3','Фразовые глаголы B2-3',__WD[350]);
U('basic','b255','B2','Collocations B2','Коллокации B2',__WD[351]);
U('basic','b256','B2','Describing People B2','Описание людей B2',__WD[352]);
U('basic','b257','B2','Adverbs B2','Наречия B2',__WD[353]);
U('basic','b258','B2','Sport B2','Спорт B2',__WD[354]);
U('basic','b259','B2','Consumer Society','Общество потребления',__WD[355]);
U('basic','b260','B2','Education B2','Образование B2',__WD[356]);
U('basic','b261','B2','Technology B2','Технологии B2',__WD[357]);
U('basic','b262','B2','Weather & Climate B2','Погода и климат B2',__WD[358]);
U('basic','b263','B2','Cooking B2','Кулинария B2',__WD[359]);
U('basic','b264','B2','Relationships B2','Отношения B2',__WD[360]);
U('basic','b265','B2','Linking Words B2','Связки B2',__WD[361]);

U('ielts','i48','B2','IELTS: Education B2','IELTS: Образование B2',__WD[362]);
U('ielts','i49','B2','IELTS: Environment B2','IELTS: Экология B2',__WD[363]);
U('ielts','i50','B2','IELTS: Crime & Punishment','IELTS: Преступление и наказание',__WD[364]);
U('ielts','i51','B2','IELTS: Media & Advertising','IELTS: СМИ и реклама',__WD[365]);
U('ielts','i52','B2','IELTS: Globalisation','IELTS: Глобализация',__WD[366]);
U('ielts','i53','B2','IELTS: Government & Society','IELTS: Государство и общество',__WD[367]);
U('ielts','i54','B2','IELTS: Science & Research','IELTS: Наука и исследования',__WD[368]);
U('ielts','i55','B2','IELTS: Linking & Contrast','IELTS: Связки и противопоставление',__WD[369]);
U('ielts','i56','B2','IELTS: Tourism B2','IELTS: Туризм B2',__WD[370]);
U('ielts','i57','B2','IELTS: Health B2','IELTS: Здоровье B2',__WD[371]);
U('ielts','i58','B2','IELTS: Technology & Society','IELTS: Технологии и общество',__WD[372]);
U('ielts','i59','B2','IELTS: Work & Economy B2','IELTS: Работа и экономика B2',__WD[373]);
U('ielts','i60','B2','IELTS: Speaking Fillers','IELTS: Фразы для Speaking',__WD[374]);
U('sat','s33','B2','SAT: Tone Words 1','SAT: Слова для тона 1',__WD[375]);
U('sat','s34','B2','SAT: Tone Words 2','SAT: Слова для тона 2',__WD[376]);
U('sat','s35','B2','SAT: Argument Verbs','SAT: Глаголы аргументации',__WD[377]);
U('sat','s36','B2','SAT: Character Traits','SAT: Черты характера',__WD[378]);
U('sat','s37','B2','SAT: Change & Degree','SAT: Изменение и степень',__WD[379]);
U('sat','s38','B2','SAT: Evidence & Logic','SAT: Доказательства и логика',__WD[380]);
U('sat','s39','B2','SAT: Secrecy & Openness','SAT: Скрытность и открытость',__WD[381]);
U('sat','s40','B2','SAT: Praise & Criticism','SAT: Похвала и критика',__WD[382]);
U('idioms','d31','B2','Money Idioms 2','Денежные идиомы 2',__WD[383]);
U('idioms','d32','B2','Decision Idioms','Идиомы о решениях',__WD[384]);
U('idioms','d33','B2','Effort Idioms','Идиомы об усилиях',__WD[385]);
U('idioms','d34','B2','Failure Idioms','Идиомы о неудачах',__WD[386]);
U('idioms','d35','B2','Honesty & Lies Idioms','Идиомы о честности и лжи',__WD[387]);
U('idioms','d36','B2','Conflict Idioms','Идиомы о конфликтах',__WD[388]);
U('idioms','d37','B2','Knowledge Idioms','Идиомы о знаниях',__WD[389]);
U('idioms','d38','B2','Risk & Luck Idioms','Идиомы о риске и удаче',__WD[390]);
U('idioms','d39','B2','Speed & Delay Idioms','Идиомы о скорости и задержках',__WD[391]);
U('idioms','d40','B2','Emotion Idioms B2','Идиомы об эмоциях B2',__WD[392]);
U('idioms','d41','B2','Business Idioms','Деловые идиомы',__WD[393]);
U('idioms','d42','B2','Health Idioms','Идиомы о здоровье',__WD[394]);
U('idioms','d43','B2','Nature Idioms','Идиомы о природе',__WD[395]);
U('idioms','d44','B2','Home & Family Idioms','Идиомы о доме и семье',__WD[396]);

U('basic','b270','C1','Personality C1','Характер C1',__WD[397]);
U('basic','b271','C1','Feelings C1','Чувства C1',__WD[398]);
U('basic','b272','C1','Speaking Verbs C1','Глаголы речи C1',__WD[399]);
U('basic','b273','C1','Thinking & Belief','Мышление и убеждения',__WD[400]);
U('basic','b274','C1','Power & Politics C1','Власть и политика C1',__WD[401]);
U('basic','b275','C1','Economy C1','Экономика C1',__WD[402]);
U('basic','b276','C1','Law C1','Право C1',__WD[403]);
U('basic','b277','C1','Science C1','Наука C1',__WD[404]);
U('basic','b278','C1','Art & Literature C1','Искусство и литература C1',__WD[405]);
U('basic','b279','C1','Conflict & War','Конфликты и война',__WD[406]);
U('basic','b280','C1','Phrasal Verbs C1-1','Фразовые глаголы C1-1',__WD[407]);
U('basic','b281','C1','Phrasal Verbs C1-2','Фразовые глаголы C1-2',__WD[408]);
U('basic','b282','C1','Collocations C1','Коллокации C1',__WD[409]);
U('basic','b283','C1','Formal Adjectives C1','Книжные прилагательные C1',__WD[410]);
U('basic','b284','C1','Formal Verbs C1','Книжные глаголы C1',__WD[411]);
U('basic','b285','C1','Society C1','Общество C1',__WD[412]);
U('basic','b286','C1','Media C1','СМИ C1',__WD[413]);
U('basic','b287','C1','Health C1','Здоровье C1',__WD[414]);
U('basic','b288','C1','Discourse Markers C1','Дискурсивные маркеры C1',__WD[415]);
U('basic','b289','C1','Nuance Words C1','Слова с оттенками C1',__WD[416]);

U('ielts','i61','C1','IELTS: Academic Verbs C1','IELTS: Академические глаголы C1',__WD[417]);
U('ielts','i62','C1','IELTS: Academic Nouns C1','IELTS: Академические существительные C1',__WD[418]);
U('ielts','i63','C1','IELTS: Environment C1','IELTS: Экология C1',__WD[419]);
U('ielts','i64','C1','IELTS: Society C1','IELTS: Общество C1',__WD[420]);
U('ielts','i65','C1','IELTS: Economy C1','IELTS: Экономика C1',__WD[421]);
U('ielts','i66','C1','IELTS: Technology C1','IELTS: Технологии C1',__WD[422]);
U('ielts','i67','C1','IELTS: Hedging Language','IELTS: Осторожные формулировки',__WD[423]);
U('ielts','i68','C1','IELTS: Education C1','IELTS: Образование C1',__WD[424]);
U('sat','s41','C1','SAT: Advanced Adjectives 1','SAT: Продвинутые прилагательные 1',__WD[425]);
U('sat','s42','C1','SAT: Advanced Adjectives 2','SAT: Продвинутые прилагательные 2',__WD[426]);
U('sat','s43','C1','SAT: Advanced Verbs','SAT: Продвинутые глаголы',__WD[427]);
U('sat','s44','C1','SAT: Advanced Nouns','SAT: Продвинутые существительные',__WD[428]);
U('sat','s45','C1','SAT: Words about Words','SAT: Слова о речи',__WD[429]);
U('sat','s46','C1','SAT: Science Passages','SAT: Научные тексты',__WD[430]);
U('idioms','d45','C1','Advanced Idioms: Work','Продвинутые идиомы: работа',__WD[431]);
U('idioms','d46','C1','Advanced Idioms: Argument','Продвинутые идиомы: споры',__WD[432]);
U('idioms','d47','C1','Advanced Idioms: Situations','Продвинутые идиомы: ситуации',__WD[433]);
U('idioms','d48','C1','Advanced Idioms: People','Продвинутые идиомы: люди',__WD[434]);
U('idioms','d49','C1','Advanced Idioms: Truth & Reality','Продвинутые идиомы: правда и реальность',__WD[435]);
U('idioms','d50','C1','Advanced Idioms: Control & Power','Продвинутые идиомы: контроль и власть',__WD[436]);
U('idioms','d51','C1','Advanced Idioms: Change','Продвинутые идиомы: перемены',__WD[437]);
U('idioms','d52','C1','Advanced Idioms: Words & Talk','Продвинутые идиомы: слова и речь',__WD[438]);
U('idioms','d53','C1','Advanced Idioms: Difficulty','Продвинутые идиомы: трудности',__WD[439]);
U('idioms','d54','C1','Advanced Idioms: Thinking','Продвинутые идиомы: мышление',__WD[440]);
U('idioms','d55','C1','Advanced Idioms: Money & Value','Продвинутые идиомы: деньги и ценность',__WD[441]);
U('idioms','d56','C1','Advanced Idioms: Endings','Продвинутые идиомы: окончание',__WD[442]);

U('basic','b290','C1','Workplace C1','Работа C1',__WD[443]);
U('basic','b291','C1','Character Nouns C1','Существительные о людях C1',__WD[444]);
U('basic','b292','C1','Abstract Nouns C1','Абстрактные существительные C1',__WD[445]);
U('basic','b293','C1','Describing Change C1','Описание изменений C1',__WD[446]);
U('basic','b294','C1','Sophisticated Adjectives C1','Изысканные прилагательные C1',__WD[447]);
U('basic','b295','C1','Emphasis & Degree C1','Усиление и степень C1',__WD[448]);
U('basic','b296','C1','Phrasal Verbs C1-3','Фразовые глаголы C1-3',__WD[449]);
U('idioms','d57','C1','Advanced Idioms: Behaviour','Продвинутые идиомы: поведение',__WD[450]);
U('idioms','d58','C1','Advanced Idioms: Opportunity','Продвинутые идиомы: возможности',__WD[451]);
U('idioms','d59','C1','Advanced Idioms: Comparison','Продвинутые идиомы: сравнение',__WD[452]);
U('idioms','d60','C1','Advanced Idioms: Secrets & Surprise','Продвинутые идиомы: тайны и сюрпризы',__WD[453]);

/* ---------- B1–B2 gap pack (v21) ---------- */
U('basic','b300','B1','Key Verbs B1','Важные глаголы',__WD[454]);
U('basic','b301','B1','Thinking Verbs','Глаголы мысли',__WD[455]);
U('basic','b302','B1','Looks & Body','Внешность и самочувствие',__WD[456]);
U('basic','b303','B1','Animal Bodies','Животные: части тела',__WD[457]);
U('basic','b304','B1','Linking Words B1','Слова-связки',__WD[458]);
U('basic','b305','B1','Shows & Ads','Шоу и реклама',__WD[459]);
U('basic','b306','B1','Everyday Life B1','Повседневная жизнь',__WD[460]);
U('basic','b340','B2','News & Society','Новости и общество',__WD[461]);
U('basic','b341','B2','Study, Travel & Health','Учёба, поездки, здоровье',__WD[462]);
U('basic','b342','B2','Character B2','Характер и отношение',__WD[463]);
U('basic','b343','B2','Trends & Change','Тенденции и изменения',__WD[464]);
U('basic','b344','B2','Essay Words B2','Слова для эссе',__WD[465]);

/* ---------- Oxford pack A1 ---------- */
U('basic','b400','A1','People A1','Люди',__WD[466]);
U('basic','b401','A1','Food A1','Еда',__WD[467]);
U('basic','b402','A1','Animals and Nature','Животные и природа',__WD[468]);
U('basic','b403','A1','Months A1','Месяцы',__WD[469]);
U('basic','b404','A1','Time A1','Время',__WD[470]);
U('basic','b405','A1','Places and Directions','Места и стороны света',__WD[471]);
U('basic','b406','A1','School A1','Школа',__WD[472]);
U('basic','b407','A1','Words and Texts','Слова и тексты',__WD[473]);
U('basic','b408','A1','Tasks and Answers','Задания и ответы',__WD[474]);
U('basic','b409','A1','Media and Technology','Медиа и техника',__WD[475]);
U('basic','b410','A1','Work and Money A1','Работа и деньги',__WD[476]);
U('basic','b411','A1','Great and Terrible','Отлично и ужасно',__WD[477]);
U('basic','b412','A1','Same and Different','Одинаковое и разное',__WD[478]);
U('basic','b413','A1','Describing Things A1','Описание предметов',__WD[479]);
U('basic','b414','A1','Key Verbs A1-1','Важные глаголы 1',__WD[480]);
U('basic','b415','A1','Key Verbs A1-2','Важные глаголы 2',__WD[481]);
U('basic','b416','A1','Life and Ideas','Жизнь и идеи',__WD[482]);
U('basic','b417','A1','Useful Nouns A1','Полезные существительные',__WD[483]);
U('basic','b418','A1','Free Time A1','Свободное время',__WD[484]);
U('basic','b419','A1','Little Useful Words','Полезные словечки',__WD[485]);

/* ---------- Oxford pack A1b ---------- */
U('basic','b420','A1','Body and Health A1','Тело и здоровье',__WD[486]);
U('basic','b421','A1','Reading and Writing A1','Чтение и письмо',__WD[487]);

/* ---------- Oxford pack A2 ---------- */
U('basic','b430','A2','Jobs A2','Профессии',__WD[488]);
U('basic','b431','A2','People A2','Люди',__WD[489]);
U('basic','b432','A2','Roles A2','Роли',__WD[490]);
U('basic','b433','A2','Buildings and Places A2','Здания и места',__WD[491]);
U('basic','b434','A2','Earth and Space A2','Земля и космос',__WD[492]);
U('basic','b435','A2','Vehicles A2','Транспорт',__WD[493]);
U('basic','b436','A2','Travel A2','Путешествия',__WD[494]);
U('basic','b437','A2','Sport A2','Спорт',__WD[495]);
U('basic','b438','A2','Food A2','Еда',__WD[496]);
U('basic','b439','A2','Health A2','Здоровье',__WD[497]);
U('basic','b440','A2','Life and Danger','Жизнь и опасность',__WD[498]);
U('basic','b441','A2','Arts A2','Искусство',__WD[499]);
U('basic','b442','A2','Media and Tech A2','Медиа и техника',__WD[500]);
U('basic','b443','A2','Materials and Machines','Материалы и техника',__WD[501]);
U('basic','b444','A2','Subjects and Study','Предметы и учёба',__WD[502]);
U('basic','b445','A2','Classroom Language A2','Язык урока',__WD[503]);
U('basic','b446','A2','Thinking A2','Мысли и решения',__WD[504]);
U('basic','b447','A2','Society A2','Общество',__WD[505]);
U('basic','b448','A2','Numbers and Amounts','Количество и числа',__WD[506]);
U('basic','b449','A2','Abstract Nouns A2-1','Абстрактные слова 1',__WD[507]);
U('basic','b450','A2','People\'s Ways','Характер и поведение',__WD[508]);
U('basic','b451','A2','Communication A2','Общение',__WD[509]);
U('basic','b452','A2','Clothes and Things A2','Одежда и вещи',__WD[510]);
U('basic','b453','A2','Situations A2','Ситуации',__WD[511]);
U('basic','b454','A2','People Adjectives A2','Прилагательные о людях',__WD[512]);
U('basic','b455','A2','Strong Adjectives A2','Сильные прилагательные',__WD[513]);
U('basic','b456','A2','Usual and Unusual','Обычное и необычное',__WD[514]);
U('basic','b457','A2','Facts Adjectives A2','Точность и факты',__WD[515]);
U('basic','b458','A2','More Adjectives A2','Ещё прилагательные',__WD[516]);
U('basic','b459','A2','Adverbs A2-1','Наречия 1',__WD[517]);
U('basic','b460','A2','Adverbs A2-2','Наречия 2',__WD[518]);
U('basic','b461','A2','Key Verbs A2-1','Важные глаголы 1',__WD[519]);
U('basic','b462','A2','Key Verbs A2-2','Важные глаголы 2',__WD[520]);
U('basic','b463','A2','Action Verbs A2','Глаголы действий',__WD[521]);
U('basic','b464','A2','Key Verbs A2-3','Важные глаголы 3',__WD[522]);
U('basic','b465','A2','Everyday Nouns A2','Повседневные слова',__WD[523]);
U('basic','b466','A2','Useful Words A2','Полезные слова',__WD[524]);

/* ---------- Oxford pack B1 ---------- */
U('basic','b500','B1','People and Roles B1','Люди и роли',__WD[525]);
U('basic','b501','B1','Feelings B1','Чувства',__WD[526]);
U('basic','b502','B1','Describing B1-1','Описание 1',__WD[527]);
U('basic','b503','B1','Describing B1-2','Описание 2',__WD[528]);
U('basic','b504','B1','Describing B1-3','Описание 3',__WD[529]);
U('basic','b505','B1','Describing B1-4','Описание 4',__WD[530]);
U('basic','b506','B1','Adverbs B1-1','Наречия 1',__WD[531]);
U('basic','b507','B1','Adverbs B1-2','Наречия 2',__WD[532]);
U('basic','b508','B1','Adverbs B1-3','Наречия 3',__WD[533]);
U('basic','b510','B1','Ideas and Thinking B1','Мысли и идеи',__WD[534]);
U('basic','b511','B1','Study and Texts B1','Учёба и тексты',__WD[535]);
U('basic','b512','B1','Communication B1','Общение',__WD[536]);
U('basic','b513','B1','Society and Politics B1','Общество и политика',__WD[537]);
U('basic','b514','B1','Work and Business B1','Работа и бизнес',__WD[538]);
U('basic','b515','B1','Science and Nature B1','Наука и природа',__WD[539]);
U('basic','b516','B1','Body B1','Тело',__WD[540]);
U('basic','b520','B1','Key Verbs B1-1','Важные глаголы 1',__WD[541]);
U('basic','b521','B1','Key Verbs B1-2','Важные глаголы 2',__WD[542]);
U('basic','b522','B1','Key Verbs B1-3','Важные глаголы 3',__WD[543]);
U('basic','b523','B1','Abstract Nouns B1-1','Абстрактные слова 1',__WD[544]);
U('basic','b524','B1','Abstract Nouns B1-2','Абстрактные слова 2',__WD[545]);
U('basic','b525','B1','Abstract Nouns B1-3','Абстрактные слова 3',__WD[546]);
U('basic','b526','B1','Events and Culture B1','События и культура',__WD[547]);
U('basic','b527','B1','Home and Objects B1','Дом и предметы',__WD[548]);
U('basic','b528','B1','Objects B1-2','Предметы 2',__WD[549]);
U('basic','b529','B1','Materials and Places B1','Материалы и места',__WD[550]);
U('basic','b530','B1','More Adjectives B1','Ещё прилагательные',__WD[551]);
U('basic','b531','B1','Last Words B1','Последние слова B1',__WD[552]);

/* ---------- Oxford pack B2p1 ---------- */
U('basic','b600','B2','B2 Nouns 1','Существительные B2 (1)',__WD[553]);
U('basic','b601','B2','B2 Nouns 2','Существительные B2 (2)',__WD[554]);
U('basic','b602','B2','B2 Nouns 3','Существительные B2 (3)',__WD[555]);
U('basic','b603','B2','B2 Nouns 4','Существительные B2 (4)',__WD[556]);
U('basic','b604','B2','B2 Nouns 5','Существительные B2 (5)',__WD[557]);
U('basic','b605','B2','B2 Nouns 6','Существительные B2 (6)',__WD[558]);
U('basic','b606','B2','B2 Nouns 7','Существительные B2 (7)',__WD[559]);
U('basic','b607','B2','B2 Verbs 1','Глаголы B2 (1)',__WD[560]);
U('basic','b608','B2','B2 Verbs 2','Глаголы B2 (2)',__WD[561]);
U('basic','b609','B2','B2 Adjectives 1','Прилагательные B2 (1)',__WD[562]);
U('basic','b610','B2','B2 Adjectives 2','Прилагательные B2 (2)',__WD[563]);
U('basic','b611','B2','B2 Adjectives 3','Прилагательные B2 (3)',__WD[564]);
U('basic','b612','B2','B2 Adverbs 1','Наречия B2 (1)',__WD[565]);
U('basic','b613','B2','B2 Nouns 8','Существительные B2 (8)',__WD[566]);
U('basic','b614','B2','B2 Nouns 9','Существительные B2 (9)',__WD[567]);
U('basic','b615','B2','B2 Nouns 10','Существительные B2 (10)',__WD[568]);
U('basic','b616','B2','B2 Nouns 11','Существительные B2 (11)',__WD[569]);
U('basic','b617','B2','B2 Nouns 12','Существительные B2 (12)',__WD[570]);
U('basic','b618','B2','B2 Nouns 13','Существительные B2 (13)',__WD[571]);
U('basic','b619','B2','B2 Verbs 3','Глаголы B2 (3)',__WD[572]);
U('basic','b620','B2','B2 Verbs 4','Глаголы B2 (4)',__WD[573]);
U('basic','b621','B2','B2 Verbs 5','Глаголы B2 (5)',__WD[574]);
U('basic','b622','B2','B2 Adjectives 4','Прилагательные B2 (4)',__WD[575]);
U('basic','b623','B2','B2 Adjectives 5','Прилагательные B2 (5)',__WD[576]);
U('basic','b624','B2','B2 Adjectives 6','Прилагательные B2 (6)',__WD[577]);
U('basic','b625','B2','B2 Adjectives 7','Прилагательные B2 (7)',__WD[578]);
U('basic','b626','B2','B2 Adverbs 2','Наречия B2 (2)',__WD[579]);
U('basic','b627','B2','B2 Nouns 14','Существительные B2 (14)',__WD[580]);
U('basic','b628','B2','B2 Nouns 15','Существительные B2 (15)',__WD[581]);
U('basic','b629','B2','B2 Nouns 16','Существительные B2 (16)',__WD[582]);
U('basic','b630','B2','B2 Nouns 17','Существительные B2 (17)',__WD[583]);
U('basic','b631','B2','B2 Nouns 18','Существительные B2 (18)',__WD[584]);
U('basic','b632','B2','B2 Nouns 19','Существительные B2 (19)',__WD[585]);
U('basic','b633','B2','B2 Nouns 20','Существительные B2 (20)',__WD[586]);
U('basic','b634','B2','B2 Nouns 21','Существительные B2 (21)',__WD[587]);
U('basic','b635','B2','B2 Verbs 6','Глаголы B2 (6)',__WD[588]);
U('basic','b636','B2','B2 Verbs 7','Глаголы B2 (7)',__WD[589]);
U('basic','b637','B2','B2 Adjectives 8','Прилагательные B2 (8)',__WD[590]);
U('basic','b638','B2','B2 Adjectives 9','Прилагательные B2 (9)',__WD[591]);
U('basic','b639','B2','B2 Adjectives 10','Прилагательные B2 (10)',__WD[592]);
U('basic','b640','B2','B2 Adverbs 3','Наречия B2 (3)',__WD[593]);

/* ---------- Oxford pack B2p2 ---------- */
U('basic','b641','B2','B2 Nouns 22','Существительные B2 (22)',__WD[594]);
U('basic','b642','B2','B2 Nouns 23','Существительные B2 (23)',__WD[595]);
U('basic','b643','B2','B2 Nouns 24','Существительные B2 (24)',__WD[596]);
U('basic','b644','B2','B2 Nouns 25','Существительные B2 (25)',__WD[597]);
U('basic','b645','B2','B2 Nouns 26','Существительные B2 (26)',__WD[598]);
U('basic','b646','B2','B2 Nouns 27','Существительные B2 (27)',__WD[599]);
U('basic','b647','B2','B2 Nouns 28','Существительные B2 (28)',__WD[600]);
U('basic','b648','B2','B2 Nouns 29','Существительные B2 (29)',__WD[601]);
U('basic','b649','B2','B2 Verbs 8','Глаголы B2 (8)',__WD[602]);
U('basic','b650','B2','B2 Verbs 9','Глаголы B2 (9)',__WD[603]);
U('basic','b651','B2','B2 Adjectives 11','Прилагательные B2 (11)',__WD[604]);
U('basic','b652','B2','B2 Adjectives 12','Прилагательные B2 (12)',__WD[605]);
U('basic','b653','B2','B2 Adjectives 13','Прилагательные B2 (13)',__WD[606]);
U('basic','b654','B2','B2 Adjectives 14','Прилагательные B2 (14)',__WD[607]);
U('basic','b655','B2','B2 Adverbs 4','Наречия B2 (4)',__WD[608]);
U('basic','b656','B2','B2 Nouns 30','Существительные B2 (30)',__WD[609]);
U('basic','b657','B2','B2 Nouns 31','Существительные B2 (31)',__WD[610]);
U('basic','b658','B2','B2 Nouns 32','Существительные B2 (32)',__WD[611]);
U('basic','b659','B2','B2 Nouns 33','Существительные B2 (33)',__WD[612]);
U('basic','b660','B2','B2 Nouns 34','Существительные B2 (34)',__WD[613]);
U('basic','b661','B2','B2 Nouns 35','Существительные B2 (35)',__WD[614]);
U('basic','b662','B2','B2 Nouns 36','Существительные B2 (36)',__WD[615]);
U('basic','b663','B2','B2 Nouns 37','Существительные B2 (37)',__WD[616]);
U('basic','b664','B2','B2 Verbs 10','Глаголы B2 (10)',__WD[617]);
U('basic','b665','B2','B2 Verbs 11','Глаголы B2 (11)',__WD[618]);
U('basic','b666','B2','B2 Adjectives 15','Прилагательные B2 (15)',__WD[619]);
U('basic','b667','B2','B2 Adjectives 16','Прилагательные B2 (16)',__WD[620]);
U('basic','b668','B2','B2 Adjectives 17','Прилагательные B2 (17)',__WD[621]);
U('basic','b669','B2','B2 Adverbs 5','Наречия B2 (5)',__WD[622]);
U('basic','b670','B2','B2 Nouns 38','Существительные B2 (38)',__WD[623]);
U('basic','b671','B2','B2 Nouns 39','Существительные B2 (39)',__WD[624]);
U('basic','b672','B2','B2 Nouns 40','Существительные B2 (40)',__WD[625]);
U('basic','b673','B2','B2 Nouns 41','Существительные B2 (41)',__WD[626]);
U('basic','b674','B2','B2 Nouns 42','Существительные B2 (42)',__WD[627]);
U('basic','b675','B2','B2 Nouns 43','Существительные B2 (43)',__WD[628]);
U('basic','b676','B2','B2 Verbs 12','Глаголы B2 (12)',__WD[629]);
U('basic','b677','B2','B2 Verbs 13','Глаголы B2 (13)',__WD[630]);
U('basic','b678','B2','B2 Adjectives 18','Прилагательные B2 (18)',__WD[631]);
U('basic','b679','B2','B2 Adjectives 19','Прилагательные B2 (19)',__WD[632]);
U('basic','b680','B2','B2 Adjectives 20','Прилагательные B2 (20)',__WD[633]);
U('basic','b681','B2','B2 Adjectives 21','Прилагательные B2 (21)',__WD[634]);
U('basic','b682','B2','B2 Adverbs 6','Наречия B2 (6)',__WD[635]);

/* ---------- Oxford pack C1p1 ---------- */
U('basic','b700','C1','C1 Nouns 1','Существительные C1 (1)',__WD[636]);
U('basic','b701','C1','C1 Nouns 2','Существительные C1 (2)',__WD[637]);
U('basic','b702','C1','C1 Nouns 3','Существительные C1 (3)',__WD[638]);
U('basic','b703','C1','C1 Nouns 4','Существительные C1 (4)',__WD[639]);
U('basic','b704','C1','C1 Nouns 5','Существительные C1 (5)',__WD[640]);
U('basic','b705','C1','C1 Nouns 6','Существительные C1 (6)',__WD[641]);
U('basic','b706','C1','C1 Nouns 7','Существительные C1 (7)',__WD[642]);
U('basic','b707','C1','C1 Nouns 8','Существительные C1 (8)',__WD[643]);
U('basic','b708','C1','C1 Verbs 1','Глаголы C1 (1)',__WD[644]);
U('basic','b709','C1','C1 Verbs 2','Глаголы C1 (2)',__WD[645]);
U('basic','b710','C1','C1 Adjectives 1','Прилагательные C1 (1)',__WD[646]);
U('basic','b711','C1','C1 Adjectives 2','Прилагательные и наречия C1 (2)',__WD[647]);
U('basic','b712','C1','C1 Nouns 9','Существительные C1 (9)',__WD[648]);
U('basic','b713','C1','C1 Nouns 10','Существительные C1 (10)',__WD[649]);
U('basic','b714','C1','C1 Nouns 11','Существительные C1 (11)',__WD[650]);
U('basic','b715','C1','C1 Nouns 12','Существительные C1 (12)',__WD[651]);
U('basic','b716','C1','C1 Nouns 13','Существительные C1 (13)',__WD[652]);
U('basic','b717','C1','C1 Nouns 14','Существительные C1 (14)',__WD[653]);
U('basic','b718','C1','C1 Nouns 15','Существительные C1 (15)',__WD[654]);
U('basic','b719','C1','C1 Verbs 3','Глаголы C1 (3)',__WD[655]);
U('basic','b720','C1','C1 Verbs 4','Глаголы C1 (4)',__WD[656]);
U('basic','b721','C1','C1 Verbs 5','Глаголы C1 (5)',__WD[657]);
U('basic','b722','C1','C1 Adjectives 3','Прилагательные C1 (3)',__WD[658]);
U('basic','b723','C1','C1 Adjectives 4','Прилагательные C1 (4)',__WD[659]);
U('basic','b724','C1','C1 Nouns 16','Существительные C1 (16)',__WD[660]);
U('basic','b725','C1','C1 Nouns 17','Существительные C1 (17)',__WD[661]);
U('basic','b726','C1','C1 Nouns 18','Существительные C1 (18)',__WD[662]);
U('basic','b727','C1','C1 Nouns 19','Существительные C1 (19)',__WD[663]);
U('basic','b728','C1','C1 Nouns 20','Существительные C1 (20)',__WD[664]);
U('basic','b729','C1','C1 Nouns 21','Существительные C1 (21)',__WD[665]);
U('basic','b730','C1','C1 Nouns 22','Существительные C1 (22)',__WD[666]);
U('basic','b731','C1','C1 Verbs 6','Глаголы C1 (6)',__WD[667]);
U('basic','b732','C1','C1 Verbs 7','Глаголы C1 (7)',__WD[668]);
U('basic','b733','C1','C1 Verbs 8','Глаголы C1 (8)',__WD[669]);
U('basic','b734','C1','C1 Adjectives 5','Прилагательные C1 (5)',__WD[670]);
U('basic','b735','C1','C1 Adjectives 6','Прилагательные C1 (6)',__WD[671]);
U('basic','b736','C1','C1 Adjectives 7','Прилагательные и наречия C1 (7)',__WD[672]);

/* ---------- Oxford pack C1p2 ---------- */
U('basic','b738','C1','C1 Nouns 23','Существительные C1 (23)',__WD[673]);
U('basic','b739','C1','C1 Nouns 24','Существительные C1 (24)',__WD[674]);
U('basic','b740','C1','C1 Nouns 25','Существительные C1 (25)',__WD[675]);
U('basic','b741','C1','C1 Nouns 26','Существительные C1 (26)',__WD[676]);
U('basic','b742','C1','C1 Nouns 27','Существительные C1 (27)',__WD[677]);
U('basic','b743','C1','C1 Nouns 28','Существительные C1 (28)',__WD[678]);
U('basic','b744','C1','C1 Nouns 29','Существительные C1 (29)',__WD[679]);
U('basic','b745','C1','C1 Verbs 9','Глаголы C1 (9)',__WD[680]);
U('basic','b746','C1','C1 Verbs 10','Глаголы C1 (10)',__WD[681]);
U('basic','b747','C1','C1 Adjectives 8','Прилагательные C1 (8)',__WD[682]);
U('basic','b748','C1','C1 Adjectives 9','Прилагательные C1 (9)',__WD[683]);
U('basic','b749','C1','C1 Adjectives 10','Прилагательные C1 (10)',__WD[684]);
U('basic','b750','C1','C1 Adjectives 11','Прилагательные и наречия C1 (11)',__WD[685]);
U('basic','b751','C1','C1 Nouns 30','Существительные C1 (30)',__WD[686]);
U('basic','b752','C1','C1 Nouns 31','Существительные C1 (31)',__WD[687]);
U('basic','b753','C1','C1 Nouns 32','Существительные C1 (32)',__WD[688]);
U('basic','b754','C1','C1 Nouns 33','Существительные C1 (33)',__WD[689]);
U('basic','b755','C1','C1 Nouns 34','Существительные C1 (34)',__WD[690]);
U('basic','b756','C1','C1 Nouns 35','Существительные C1 (35)',__WD[691]);
U('basic','b757','C1','C1 Nouns 36','Существительные C1 (36)',__WD[692]);
U('basic','b758','C1','C1 Nouns 37','Существительные C1 (37)',__WD[693]);
U('basic','b759','C1','C1 Verbs 11','Глаголы C1 (11)',__WD[694]);
U('basic','b760','C1','C1 Verbs 12','Глаголы C1 (12)',__WD[695]);
U('basic','b761','C1','C1 Adjectives 12','Прилагательные C1 (12)',__WD[696]);
U('basic','b762','C1','C1 Adjectives 13','Прилагательные C1 (13)',__WD[697]);
U('basic','b763','C1','C1 Adjectives 14','Прилагательные C1 (14)',__WD[698]);
U('basic','b764','C1','C1 Adverbs 1','Наречия C1 (1)',__WD[699]);
U('basic','b765','C1','C1 Nouns 38','Существительные C1 (38)',__WD[700]);
U('basic','b766','C1','C1 Nouns 39','Существительные C1 (39)',__WD[701]);
U('basic','b767','C1','C1 Nouns 40','Существительные C1 (40)',__WD[702]);
U('basic','b768','C1','C1 Nouns 41','Существительные C1 (41)',__WD[703]);
U('basic','b769','C1','C1 Nouns 42','Существительные C1 (42)',__WD[704]);
U('basic','b770','C1','C1 Nouns 43','Существительные C1 (43)',__WD[705]);
U('basic','b771','C1','C1 Nouns 44','Существительные C1 (44)',__WD[706]);
U('basic','b772','C1','C1 Nouns 45','Существительные C1 (45)',__WD[707]);
U('basic','b773','C1','C1 Verbs 13','Глаголы C1 (13)',__WD[708]);
U('basic','b774','C1','C1 Verbs 14','Глаголы C1 (14)',__WD[709]);
U('basic','b775','C1','C1 Adjectives 15','Прилагательные C1 (15)',__WD[710]);
U('basic','b776','C1','C1 Adjectives 16','Прилагательные C1 (16)',__WD[711]);
U('basic','b777','C1','C1 Adverbs 2','Наречия C1 (2)',__WD[712]);
U('basic','b778','C1','C1 Nouns 46','Существительные C1 (46)',__WD[713]);
U('basic','b779','C1','C1 Nouns 47','Существительные C1 (47)',__WD[714]);
U('basic','b780','C1','C1 Nouns 48','Существительные C1 (48)',__WD[715]);
U('basic','b781','C1','C1 Nouns 49','Существительные C1 (49)',__WD[716]);
U('basic','b782','C1','C1 Nouns 50','Существительные C1 (50)',__WD[717]);
U('basic','b783','C1','C1 Nouns 51','Существительные C1 (51)',__WD[718]);
U('basic','b784','C1','C1 Verbs 15','Глаголы C1 (15)',__WD[719]);
U('basic','b785','C1','C1 Verbs 16','Глаголы C1 (16)',__WD[720]);
U('basic','b786','C1','C1 Adjectives 17','Прилагательные C1 (17)',__WD[721]);
U('basic','b787','C1','C1 Adjectives 18','Прилагательные C1 (18)',__WD[722]);
U('basic','b788','C1','C1 Adjectives 19','Прилагательные C1 (19)',__WD[723]);
U('basic','b789','C1','C1 Adverbs 3','Наречия C1 (3)',__WD[724]);

/* ---------- CEFR levels ---------- */
const CEFR=['A1','A2','B1','B2','C1'];
const lvlIdx=l=>Math.max(0,CEFR.indexOf(l));
const UNIT_CEFR={b1:'A2',b4:'B1',b5:'A2',b6:'A2',b10:'A2',b11:'A1',b12:'A2',b14:'A2',b2:'A2',b3:'A2',b7:'A2',b8:'A2',b9:'A2',b13:'A2',
  i1:'B1',i2:'B1',i3:'B1',i6:'B1',i4:'B2',i5:'B2',i7:'B2',i8:'B2',i9:'B2',i10:'B2',s4:'B2',s10:'B2',s1:'C1',s2:'C1',s3:'C1',s5:'C1',s6:'C1',s7:'C1',s8:'C1',s9:'C1'};
TRACKS.forEach(t=>{ t.units.forEach(u=>{ u.cefr=u.cefr||UNIT_CEFR[u.id]||'B1'; }); t.units.sort((a,b)=>lvlIdx(a.cefr)-lvlIdx(b.cefr)); });
/* ---------- Writing Task 1 phrase bank: 4 vocabulary units + a cheat sheet inside Writing ---------- */
const T1_PHR=__WD[725];
const T1_IPA=__WD[726];
T1_PHR.forEach(u=>{ u.words=u.words.map(([en,ru,def,ex])=>({id:u.id+'-'+en.toLowerCase().replace(/[^a-z]+/g,'-').replace(/-$/,''),en,ipa:T1_IPA[en]||'',ru,def,ex,track:'ielts'})); });
(()=>{ const t=TRACKS.find(x=>x.id==='ielts'); if(t&&!t.units.some(u=>u.id==='t1a')){ const at=t.units.findIndex(u=>u.cefr==='B2'); t.units.splice(at<0?t.units.length:at,0,...T1_PHR.filter(u=>u.cefr==='B1')); t.units.push(...T1_PHR.filter(u=>u.cefr==='B2')); } })();
function T1Sheet(){ return html`<details className="mk-model"><summary>Шпаргалка: фразы для Task 1</summary>${T1_PHR.map(u=>html`<div key=${u.id} className="t1s"><b>${u.ru}</b><div className="t1s-list">${u.words.map(w=>html`<span key=${w.id} title=${w.ex}><em>${w.en}</em> — ${w.ru}</span>`)}</div></div>`)}
  <p className="muted">Эти фразы есть и в карточках: раздел IELTS → «Task 1: …».</p></details>`; }
/* ---------- vocabulary map: level → theme → blocks of 8–12 words ----------
   Words keep their ids, so learners' progress is not touched. A unit missing from VMAP stays as it is. */
const VTHEMES=__WD[727];
const VMAP=__WD[728];
(()=>{ const t=TRACKS.find(x=>x.id==='basic'); if(!t) return;
  const FALL={sc:'ed',so:'pe',lo:'pe',fo:'ho',tr:'ci',ed:'id',sp:'ar',ar:'sp',ti:'li',ci:'tr',ho:'ci',mo:'wo',wo:'mo',te:'sc',pe:'fe',fe:'pe',bo:'fe',na:'sc',co:'id',ac:'co',de:'id',id:'co',li:'de'};
  const out=[];
  CEFR.forEach(L=>{ const b={}, keep=[];
    t.units.filter(u=>u.cefr===L).forEach(u=>{ const m=VMAP[u.id]; if(!m){ keep.push(u); return; }
      u.words.forEach(w=>{ const c=typeof m==='string'?m:(m[1][w.en]||m[0]); (b[c]=b[c]||[]).push(w); }); });
    Object.keys(b).forEach(c=>{ const f=FALL[c]; if(b[c].length<5&&f&&b[f]){ b[f].push(...b[c]); delete b[c]; } });
    VTHEMES.forEach(([c,en,ru])=>{ const ws=b[c]; if(!ws) return; const n=Math.ceil(ws.length/12), per=Math.ceil(ws.length/n);
      for(let k=0;k<n;k++) out.push({id:L+'-'+c+'-'+(k+1),cefr:L,title:en,ru,theme:c,part:k+1,parts:n,words:ws.slice(k*per,(k+1)*per)}); });
    out.push(...keep); });
  out.push(...t.units.filter(u=>!CEFR.includes(u.cefr)));
  t.units=out; })();
const ALL=TRACKS.flatMap(t=>t.units.flatMap(u=>u.words.map(w=>({...w,track:t.id,cefr:u.cefr}))));
const countIn=t=>t.units.reduce((n,u)=>n+u.words.length,0);
const learned=(st,words)=>words.filter(w=>(st.boxes[w.id]||0)>=2).length;

const STORE='wordy.v1';
const DEFAULT=__WD[729];
function normalize(s){
  s={...DEFAULT,...s};
  if(!s.sid) s.sid=Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  if(s.today!==dayKey()){ s.today=dayKey(); s.todayCount=0; }
  if(s.lastDay!==dayKey() && s.lastDay!==dayKey(-1)) s.streak=0;
  if(s.mode==='intensive') s.mode='normal';
  if(s.equip&&'face' in s.equip){ const e={...s.equip}, f=e.face; delete e.face; const it=f&&WORDY_ITEMS.find(i=>i.id===f); if(it&&!e[it.slot]) e[it.slot]=f; s.equip=e; }
  return s;
}
function load(){ try{ const s=JSON.parse(localStorage.getItem(STORE)); if(s) return normalize(s); }catch(e){} return normalize({}); }
function save(s){ try{ localStorage.setItem(STORE,JSON.stringify(s)); }catch(e){} }

const canSpeak=typeof window.speechSynthesis!=='undefined';
function speak(t){ try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang='en-US'; u.rate=.9; speechSynthesis.speak(u); }catch(e){} }

function highlight(ex,word){
  const stem=word.slice(0,Math.max(4,word.length-2)).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const parts=ex.split(new RegExp('('+stem+'\\w*)','i'));
  return parts.map((p,i)=>i%2?html`<mark key=${i}>${p}</mark>`:p);
}
const isTyped=t=>t==='write'||t==='listen'||t==='gap'||t==='fix';
/* words from one unit should not stand next to each other in a review: similar words interfere */
function spreadUnits(ws){ const uid=w=>String(w.id).split('-')[0], rest=ws.slice(), out=[];
  while(rest.length){ const last=out.length?uid(out[out.length-1]):null; let k=rest.findIndex(w=>uid(w)!==last); if(k<0) k=0; out.push(rest.splice(k,1)[0]); } return out; }
function quizQ(w,type,words,global){
  if(w.kind==='fix') return {id:w.id,w,type:'fix',answer:w.en};
  if(type==='gap'){ const en=w.en||'', stem=en.slice(0,Math.max(4,en.length-2)).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const m=w.ex&&!/\s/.test(en)?w.ex.match(new RegExp('\\b('+stem+"[\\w']*)",'i')):null;
    if(m) return {id:w.id,w,type,answer:m[1],alts:[en],before:w.ex.slice(0,m.index),after:w.ex.slice(m.index+m[1].length)};
    type='write'; }
  if(type==='listen'&&!canSpeak) type='write';
  if(isTyped(type)) return {id:w.id,w,type,answer:w.en};
  if(type==='def'&&!w.def) type='ru';
  const enAns=type!=='tr';
  let pool=global?ALL.filter(x=>x.track===w.track&&x.cefr===w.cefr):words; if(pool.length<8) pool=global?ALL.filter(x=>x.track===w.track):words; if(pool.length<6) pool=words.length>=6?words:ALL;
  const others=shuffle(pool.filter(x=>x.id!==w.id&&(enAns?x.en!==w.en:x.ru!==w.ru))).slice(0,3);
  const answer=enAns?w.en:w.ru;
  return {id:w.id,w,type,answer,options:shuffle([answer,...others.map(o=>enAns?o.en:o.ru)])};
}
/* review: the task gets harder as the word settles in memory — recognise → recall → type → hear / use in a sentence */
function makeQuiz(words,mode,st){
  const review=mode==='review', global=mode==='review'||mode==='daily';
  const order=review?spreadUnits(shuffle(words)):shuffle(words);
  return order.map((w,i)=>{ let type;
    if(review&&st){ const g=memStage(st,w); type=g===0?'tr':g===1?(i%2&&w.def?'def':'ru'):g===2?'write':(i%2?'gap':'listen'); }
    else type=i%2?'def':'tr';
    return quizQ(w,type,words,global); });
}
function greeting(){ const h=new Date().getHours(); return h<5?'Доброй ночи':h<12?'Доброе утро':h<18?'Добрый день':'Добрый вечер'; }

/* ---------- icons ---------- */
const svg=(d,s=22)=>html`<svg width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I={
  learn:()=>svg(html`<path d="M5 4.5h10.5A3.5 3.5 0 0 1 19 8v12H8.5A3.5 3.5 0 0 1 5 16.5z"/><path d="M5 16.5A3.5 3.5 0 0 1 8.5 13H19"/>`),
  back:()=>svg(html`<path d="M15 5l-7 7 7 7"/>`,20),
  lock:()=>svg(html`<rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>`,26),
  repeat:()=>svg(html`<path d="M4 12a8 8 0 0 1 13.7-5.6L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15"/><path d="M4 20v-5h5"/>`),
  home:()=>svg(html`<path d="M4 11.5 12 5l8 6.5"/><path d="M6 10v9.5h12V10"/><path d="M10 19.5v-5h4v5"/>`),
  shop:()=>svg(html`<path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>`),
  progress:()=>svg(html`<path d="M4 20h16"/><path d="M7 16v-4"/><path d="M12 16V7"/><path d="M17 16v-6"/>`),
  settings:()=>svg(html`<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>`),
  speaker:()=>svg(html`<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/>`,20),
  close:()=>svg(html`<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>`,20),
  flame:()=>html`<svg className="flame" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.5 2.5c.8 3.4 5.5 5.4 5.5 11a6 6 0 0 1-12 0c0-2.6 1.3-4.4 2.6-5.6.2 2.3 1.2 3.4 2.4 3.6-.6-3.4.2-6.4 1.5-9z" fill="#FF6A2B"/><path d="M12 21a3 3 0 0 1-3-3c0-1.7 1.4-2.6 2-4 .9 1.6 4 2.2 4 4a3 3 0 0 1-3 3z" fill="#FFC23D"/></svg>`,
  coin:()=>html`<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="var(--coin)"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"/><path d="M12 8.5v7" stroke="#8A5A00" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  bolt:()=>html`<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2 5 13.5h6L10 22l9-12h-6.2z" fill="#7C5CFF"/></svg>`,
};
const Face=()=>html`<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="13.5" fill="#FF7A12"/><ellipse cx="11" cy="12.5" rx="3.3" ry="4.6" fill="#fff"/><ellipse cx="19" cy="12.5" rx="3.3" ry="4.6" fill="#fff"/><ellipse cx="11" cy="12.8" rx="2.4" ry="3.5" fill="#24130A"/><ellipse cx="19" cy="12.8" rx="2.4" ry="3.5" fill="#24130A"/><circle cx="10.2" cy="11" r=".9" fill="#fff"/><circle cx="18.2" cy="11" r=".9" fill="#fff"/><path d="M12.5 20q2.5 1.8 5 0" stroke="#4A1E0C" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;

/* ---------- pieces ---------- */
function Pill({icon,value,label,id}){
  const [bump,setBump]=useState(false); const prev=useRef(value);
  useEffect(()=>{ if(value>prev.current){ setBump(true); const t=setTimeout(()=>setBump(false),520); prev.current=value; return ()=>clearTimeout(t);} prev.current=value; },[value]);
  return html`<span id=${id} className=${'pill'+(bump?' bump':'')} title=${label} aria-label=${label+': '+value}>${icon} ${value}</span>`;
}
function TopBar({st}){
  return html`<header className="topbar"><div className="brand"><${Face}/>wordy</div>
    <div className="pills"><${Pill} icon=${I.flame()} value=${st.streak} label="Серия дней"/><${Pill} id="coin-pill" icon=${I.coin()} value=${st.coins} label="Монеты"/><span className="pill xp-pill">${I.bolt()} ${st.xp}</span></div></header>`;
}
function Ring({pct,label}){
  const r=27,c=2*Math.PI*r;
  return html`<svg className="ring" width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
    <circle cx="38" cy="38" r=${r} fill="none" stroke="rgba(43,18,0,.16)" stroke-width="8"/>
    <circle cx="38" cy="38" r=${r} fill="none" stroke="#FFF4E6" stroke-width="8" stroke-linecap="round" stroke-dasharray=${c} stroke-dashoffset=${c*(1-pct)} transform="rotate(-90 38 38)" style=${{transition:'stroke-dashoffset .7s cubic-bezier(.2,.8,.2,1)'}}/>
    <text x="38" y="44" text-anchor="middle">${label}</text></svg>`;
}

const TCOL={basic:'#FF7A12',ielts:'#12A195',sat:'#7C5CFF',idioms:'#E5487A'}, TICON={
  basic:html`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 6.8A2.8 2.8 0 0 1 7.3 4h9.4a2.8 2.8 0 0 1 2.8 2.8v5.9a2.8 2.8 0 0 1-2.8 2.8H11l-4.2 3.6v-3.6h0A2.3 2.3 0 0 1 4.5 13z"/><path d="M8.5 8.6h7M8.5 11.6h4.5"/></svg>`,
  ielts:html`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.5 2.4 3.7 5.2 3.7 8.5s-1.2 6.1-3.7 8.5c-2.5-2.4-3.7-5.2-3.7-8.5s1.2-6.1 3.7-8.5z"/></svg>`,
  sat:html`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 9.3 12 5l9.5 4.3L12 13.6z"/><path d="M6.5 11.3v4.2c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.2"/><path d="M21.5 9.3v5.2"/></svg>`};
function UnitRing({pct,n}){ const r=20,c=2*Math.PI*r; return html`<div className="uring"><svg width="50" height="50" viewBox="0 0 50 50" aria-hidden="true"><circle cx="25" cy="25" r=${r} className="ur-bg"/><circle cx="25" cy="25" r=${r} className="ur-fg" stroke-dasharray=${c} stroke-dashoffset=${c*(1-pct)} transform="rotate(-90 25 25)"/></svg><span>${n}</span></div>`; }
function Learn({openGame,st,update,track,setTrack,sub,setSub,startUnit,openGrammar,openLevel,startReview,startDaily,showLevel,openText,startListen,tsub,setTsub,openMock}){
  const isEn=track==='basic', view=isEn?sub:(tsub==='mock'?'mock':'vocab'), isList=view==='read'||view==='listen'||view==='mock';
  const t=TRACKS.find(x=>x.id===(isEn&&sub==='idioms'?'idioms':track));
  const g=st.goal, c=Math.min(st.todayCount,g), done=st.todayCount>=g, left=g-c;
  const total=ALL.filter(w=>(st.boxes[w.id]||0)>=2).length;
  return html`
   <div className="page-h"><div><span className="date-chip">${new Date().toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'})}</span><h1>${greeting()}!</h1></div>${st.level?html`<span className="lvl-chip">Уровень ${st.level}</span>`:null}</div>
   <${HomeworkBox} st=${st} update=${update} openMock=${openMock}/>
   <section className="hero enter" data-perch="hero" aria-label="Цель на сегодня">
     <${Ring} pct=${c/g} label=${c+'/'+g}/>
     <div><p className="eyebrow">Цель на сегодня</p>
       <h2>${done?'Цель выполнена, так держать!':'Ещё '+left+' '+plural(left,'слово','слова','слов')+' до цели'}</h2>
       <div className="hero-stats"><span>${I.learn()} ${total} ${plural(total,'слово','слова','слов')}</span><span>${I.flame()} ${st.streak} ${plural(st.streak,'день','дня','дней')}</span><span>★ ${gStarsTotal(st)}</span></div></div>
   </section>
   <${PlanCard} st=${st} update=${update} startReview=${startReview} startDaily=${startDaily} openLevel=${openLevel} openGame=${openGame}/>
   <${HomeHomework}/>
   <${GuestCard} st=${st}/>
   <${InstallCard}/>
   ${st.level?html`<${LevelCard} st=${st} onShow=${showLevel}/>`:null}
   <${DailyCard} st=${st} startDaily=${startDaily}/>
   ${(()=>{ const due=dueWords(st), seen=Object.keys(st.boxes).length, tm=dueOn(st,1);
     return html`<button className=${'review-card enter'+(due.length?' has':'')} style=${{'--i':1}} id="review-btn" disabled=${!due.length} onClick=${startReview}>
       <span className="rv-ic">${I.repeat()}</span>
       <span className="rv-main"><b>${due.length?'Повторение на сегодня':seen?'На сегодня всё повторено':'Ежедневное повторение'}</b>
         <small>${due.length?due.length+' '+plural(due.length,'слово ждёт','слова ждут','слов ждут')+' повторения':seen?(tm?'Завтра: '+tm+' '+plural(tm,'слово','слова','слов'):'Новые слова появятся после уроков'):'Пройди любую тему, и слова появятся здесь'}</small></span>
       ${due.length?html`<span className="rv-count">${Math.min(due.length,12)}</span>`:seen?html`<span className="rv-done">✓</span>`:null}
     </button>`; })()}
   <${PracticeRow} openMock=${openMock}/>
   <div className="learn-body" style=${{'--tc':TCOL[t.id]}}>
   <div className="sec-h"><h2>Раздел</h2></div>
   <div className="seg enter" style=${{'--i':1}} role="group" aria-label="Направление">
     ${TRACKS.filter(x=>!x.hidden).map(x=>html`<button key=${x.id} id=${'track-'+x.id} aria-pressed=${x.id===track} style=${{'--c':TCOL[x.id]}} onClick=${()=>{ SFX('tap'); setTrack(x.id); }}><span className="tglyph">${TICON[x.id]}</span><b>${x.name}</b><small>${x.id==='basic'?'грамматика, слова, идиомы':countIn(x)+' слов · '+x.units.length+' '+plural(x.units.length,'тема','темы','тем')}</small></button>`)}
   </div>
   ${isEn?html`<div className="subtabs enter" role="tablist" aria-label="Английский">${[['grammar','Грамматика'],['vocab','Вокабуляр'],['idioms','Идиомы'],['read','Чтение'],['listen','Аудирование']].map(([k,n])=>html`<button key=${k} role="tab" id=${'sub-'+k} aria-selected=${sub===k} onClick=${()=>{ SFX('tap'); setSub(k); }}>${n}</button>`)}</div>`:null}
   ${view==='grammar'?html`
   <button className="gentry enter" style=${{'--i':2}} id="open-grammar" onClick=${openGrammar}>
     <span className="g-aa" aria-hidden="true">Aa</span>
     <span className="ge-main"><b>Карта грамматики</b><small>${GL.length} уроков от A1 до C1 · ★ ${gStarsTotal(st)} из ${GL.length*3}</small>
       <span className="bar"><i style=${{width:(gPassed(st)/GL.length*100)+'%'}}></i></span></span>
     <span className="btn small" aria-hidden="true">Открыть</span>
   </button>
   <div className="sec-h"><h2>Уроки уровня ${st.level||'A1'}</h2><span className="muted">${GL.filter(l=>l.cefr===(st.level||'A1')&&((st.gstars||{})[l.id]||0)>=1).length} / ${GL.filter(l=>l.cefr===(st.level||'A1')).length}</span></div>
   <div className="glist">${GL.map((l,i)=>({l,i})).filter(x=>x.l.cefr===(st.level||'A1')).map(({l,i},k)=>{ const sN=(st.gstars||{})[l.id]||0, open=gOpen(st,i);
     return html`<button key=${l.id} className=${'grow enter'+(sN?' done':'')} style=${{'--i':k}} id=${'grow-'+l.id} disabled=${!open} onClick=${()=>openLevel(i)}>
       <span className="grow-n">${open?i+1:I.lock()}</span><span className="grow-main"><b>${l.title}</b><small>${l.ru}</small></span>
       ${open?html`<${Stars} n=${sN} size=${15}/>`:html`<small className="muted">пройди предыдущий</small>`}</button>`; })}</div>`:null}
   ${!isEn?html`<div className="subtabs two enter" role="tablist" aria-label=${t.name}>${[['vocab','Слова'],['mock','Пробный тест']].map(([k,n])=>html`<button key=${k} role="tab" id=${'tsub-'+k} aria-selected=${(tsub||'vocab')===k} onClick=${()=>{ SFX('tap'); setTsub(k); }}>${n}</button>`)}</div>`:null}
   ${view==='mock'?html`<${MockHub} st=${st} kind=${track} openMock=${openMock}/>`:null}
   ${view==='read'?html`<${ReadList} st=${st} openText=${openText}/>`:null}
   ${view==='listen'?html`<${ListenList} st=${st} startListen=${startListen}/>`:null}
   ${view!=='grammar'&&!isList?html`<div className="sec-h"><h2>${t.id==='idioms'?'Идиомы':'Темы'}</h2><span className="muted">${learned(st,t.units.flatMap(u=>u.words))} / ${countIn(t)} ${t.id==='idioms'?'идиом':'слов'}</span></div>`:null}
   ${view!=='grammar'&&!isList&&(()=>{ const row=(u,i)=>{
     const l=learned(st,u.words), best=st.best[u.id];
     return html`<article className="unit enter" style=${{'--i':i+3}} key=${u.id}>
       <${UnitRing} pct=${l/u.words.length} n=${u.theme?u.part:i+1}/>
       <div>${u.theme?html`<h3>${u.parts>1?'Блок '+u.part+' из '+u.parts:'Все слова темы'}</h3><p className="u-prev">${u.words.slice(0,4).map(w=>w.en).join(', ')}${u.words.length>4?'…':''}</p>`:html`<h3>${u.title}</h3><p>${u.ru}</p>`}<div className="umeta"><span className="cefr">${u.cefr}</span><span>${u.words.length} ${t.id==='idioms'?'идиом':'слов'}</span><span className=${l===u.words.length?'full':''}>${l===u.words.length?'✓ выучено':'выучено '+l}</span></div></div>
       <div className="unit-side">${best!=null?html`<span className="best">лучший ${best}/${u.words.length}</span>`:null}
         <button className="btn small" id=${'start-'+u.id} onClick=${()=>startUnit(t.id,u.id)}>${l?'Повторить':'Учить'}</button></div>
     </article>`;};
     const act=t.units.filter(u=>!uKnown(st,u)&&!uAbove(st,u)), kn=t.units.filter(u=>uKnown(st,u)), up=t.units.filter(u=>uAbove(st,u));
     const firstUp=up.length?up[0].cefr:null;
     /* basic course: blocks of one theme are shown together under a foldable theme header */
     const groups=list=>{ const gs=[]; list.forEach(u=>{ const k=u.theme?u.cefr+'-'+u.theme:'_'; const g=gs[gs.length-1]; if(g&&g.k===k) g.us.push(u); else gs.push({k,us:[u]}); }); return gs; };
     const renderG=(list,auto)=>{ let opened=!auto; return groups(list).map((g,gi)=>{ if(g.k==='_') return html`<div className="units" key=${'p'+gi}>${g.us.map(row)}</div>`;
       const ws=g.us.flatMap(u=>u.words), l=learned(st,ws), done=l===ws.length, open=!opened&&!done, u0=g.us[0]; if(open) opened=true;
       return html`<details className=${'vgroup'+(done?' done':'')} key=${g.k} open=${open}>
         <summary><span className="vg-main"><b>${u0.ru}</b><small>${u0.title} · ${u0.cefr} · ${g.us.length} ${plural(g.us.length,'блок','блока','блоков')}</small></span>
           <span className="vg-side"><span className=${'vg-n'+(done?' full':'')}>${done?'✓ ':''}${l} / ${ws.length}</span><span className="bar"><i style=${{width:(l/ws.length*100)+'%'}}></i></span></span></summary>
         <div className="units">${g.us.map(row)}</div></details>`; }); };
     const upT=[...new Map(up.map(u=>[u.theme?u.cefr+u.theme:u.id,u])).values()];
     return html`${renderG(act,true)}
       ${act.length?null:html`<p className="empty">${firstUp?'В направлении '+t.name+' нет тем уровня '+st.level+'. Первые темы откроются на уровне '+firstUp+'.':'Все темы этого направления ниже твоего уровня. Их можно повторить ниже.'}</p>`}
       ${up.length?html`<div className="locked-units"><div className="lu-h">${I.lock()}<span><b>Ещё ${upT.length} ${plural(upT.length,'тема','темы','тем')} впереди</b><small>Откроются, когда пройдёшь уровень ${st.level}</small></span></div>
         <div className="lu-list">${upT.slice(0,8).map(u=>html`<span key=${u.id}><em>${u.cefr}</em>${u.theme?u.ru:u.title}</span>`)}${upT.length>8?html`<span className="more">+${upT.length-8}</span>`:null}</div></div>`:null}
       ${kn.length?html`<details className="known-units"><summary>Знакомые темы · ${new Set(kn.map(u=>u.theme?u.cefr+u.theme:u.id)).size}<small>ниже уровня ${st.level}, можно повторить</small></summary>${renderG(kn,false)}</details>`:null}`; })()}
   </div>
`;
}

/* ---------- grammar levels ---------- */
const GL=__WD[730];
/* ---------- grammar: new levels (A1–B1) ---------- */
const GL_NEW=__WD[731];
/* ---------- grammar: new levels (B2–C1) ---------- */
GL_NEW.push(
 __WD[732],
 __WD[733],
 __WD[734],
 __WD[735],
 __WD[736],
 __WD[737],
 __WD[738],
 __WD[739],
 __WD[740],
 __WD[741],
 __WD[742],
 __WD[743]
);
const GCEFR={g1:'A1',g2:'A1',g3:'A1',g4:'A2',g5:'A2',g6:'A2',g10:'A2',g12:'A2',g11:'A2',g7:'B1',g8:'B1',g9:'B1'};
GL.forEach(l=>{ l.cefr=GCEFR[l.id]; });
GL.push(...GL_NEW);
/* ---------- grammar pack 3: A1–A2 gaps ---------- */
const GL_MORE=__WD[744];
/* ---------- grammar pack 3: B1–C1 gaps ---------- */
GL_MORE.push(
 __WD[745],
 __WD[746],
 __WD[747],
 __WD[748],
 __WD[749],
 __WD[750],
 __WD[751],
 __WD[752],
 __WD[753],
 __WD[754],
 __WD[755],
 __WD[756],
 __WD[757],
 __WD[758],
 __WD[759],
 __WD[760]
);
GL.push(...GL_MORE);
/* ---------- A1 grammar ---------- */
GL.push(
 __WD[761],
 __WD[762],
 __WD[763],
 __WD[764]
);
/* ---------- A2 grammar ---------- */
GL.push(
 __WD[765],
 __WD[766],
 __WD[767],
 __WD[768],
 __WD[769],
 __WD[770]
);
/* ---------- B1 grammar ---------- */
GL.push(
 __WD[771],
 __WD[772],
 __WD[773],
 __WD[774],
 __WD[775],
 __WD[776],
 __WD[777],
 __WD[778],
 __WD[779]
);
/* ---------- B2 grammar ---------- */
GL.push(
 __WD[780],
 __WD[781],
 __WD[782],
 __WD[783],
 __WD[784],
 __WD[785],
 __WD[786],
 __WD[787]
);
/* ---------- C1 grammar ---------- */
GL.push(
 __WD[788],
 __WD[789],
 __WD[790],
 __WD[791],
 __WD[792],
 __WD[793],
 __WD[794]
);
/* ---------- Старт с нуля: алфавит, правила чтения, транскрипция, порядок слов, числа ---------- */
GL.push(
 __WD[795],
 __WD[796],
 __WD[797],
 __WD[798],
 __WD[799]
);

/* ---------- Неправильные глаголы: три формы ---------- */
GL.push(
 __WD[800]
);
/* ---------- Новые темы: предлоги движения, предложения, артикли 2, предлоги после слов, want sb to, look/seem ---------- */
GL.push(
 __WD[801],
 __WD[802],
 __WD[803],
 __WD[804],
 __WD[805],
 __WD[806]
);
{ const ORDER=__WD[807];
  const pos=id=>{ const k=ORDER.indexOf(id); return k<0?999:k; };
  GL.sort((a,b)=>lvlIdx(a.cefr)-lvlIdx(b.cefr)||pos(a.id)-pos(b.id)); }

/* ---------- «Объясни проще» для каждого урока ---------- */
const SIMPLE=__WD[808];
Object.assign(SIMPLE,__WD[809]);
Object.assign(SIMPLE,__WD[810]);
Object.assign(SIMPLE,__WD[811]);
Object.assign(SIMPLE,__WD[812]);
Object.assign(SIMPLE,__WD[813]);
const gStarsTotal=st=>GL.reduce((n,l)=>n+((st.gstars||{})[l.id]||0),0);
const gPassed=st=>GL.filter(l=>((st.gstars||{})[l.id]||0)>=1).length;
const normAns=x=>x.toLowerCase().replace(/[’‘`´]/g,"'").replace(/[.!?,]/g,'').replace(/\s+/g,' ').trim();

function Stars({n,size,big}){
  size=size||18;
  return html`<span className=${'stars'+(big?' big':'')} role="img" aria-label=${n+' из 3 звёзд'}>${[0,1,2].map(i=>html`<svg key=${i} width=${size} height=${size} viewBox="0 0 24 24" className=${i<n?'on':''} style=${{animationDelay:(.15+i*.2)+'s'}}><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg>`)}</span>`;
}

const CEFR_META=__WD[814];
const GSEC=CEFR.map(l=>{ const from=GL.findIndex(x=>x.cefr===l); return {...CEFR_META[l],level:l,from,to:from+GL.filter(x=>x.cefr===l).length}; });
const secOf=i=>GSEC.find(s=>i>=s.from&&i<s.to)||GSEC[0];

function CountUp({to,dur}){
  const [v,setV]=useState(0);
  useEffect(()=>{ let raf; const t0=performance.now(), d=dur||800;
    const step=n=>{ const p=Math.min(1,(n-t0)/d); setV(Math.round(to*(1-Math.pow(1-p,3)))); if(p<1) raf=requestAnimationFrame(step); };
    raf=requestAnimationFrame(step); return ()=>cancelAnimationFrame(raf); },[to]);
  return v;
}

/* ---------- Справочник: tables to look things up any time (not a lesson — nobody learns 97 verbs at once) ---------- */
const GERREF=__WD[815];
function irrRows(){ const out=[], seen={}; ((GBOOK.irr||{}).sections||[]).forEach(sec=>(sec.b||[]).forEach(b=>{ if(b[0]==='tbl'&&b[1]&&b[1][0]==='V1') b[2].forEach(r=>{ const k=r[0]; if(!seen[k]){ seen[k]=1; out.push(r.map(String)); } }); }));
  return out.sort((a,b)=>a[0].localeCompare(b[0])); }
function RefBook({onBack}){ const [tab,setTab]=useState(()=>{ try{ return localStorage.getItem('wordy.ref')||'irr'; }catch(e){ return 'irr'; } }), [q,setQ]=useState('');
  const pickTab=t=>{ SFX('tap'); setTab(t); setQ(''); try{ localStorage.setItem('wordy.ref',t); }catch(e){} };
  const rows=useMemo(irrRows,[]), f=q.trim().toLowerCase(), hit=r=>!f||r.some(x=>String(x).toLowerCase().includes(f));
  const say=t=>{ if(canSpeak){ speak(t); W('react','nod'); } };
  const gl=(title,list,note)=>{ const l=list.filter(hit); return l.length?html`<div className="ref-g"><h3>${title}</h3>${note?html`<p className="muted">${note}</p>`:null}
      ${l.map(r=>html`<div key=${r[0]} className="ref-row ger"><button className="ex-say" aria-label=${'Послушать: '+r[2]} onClick=${()=>say(r[2])}>${I.speaker()}</button><div><b lang="en">${r[0]}</b> <span className="muted">${r[1]}</span><small lang="en">${r[2]}</small></div></div>`)}</div>`:null; };
  return html`<section className="refbook">
    <div className="sess-top"><button className="icon-btn" id="ref-back" onClick=${()=>{ SFX('tap'); onBack(); }} aria-label="Назад">${I.back()}</button><div className="gm-h"><b>Справочник</b><span className="muted">подсматривай, когда нужно</span></div></div>
    <div className="chips" role="tablist"><button className="chip" role="tab" id="ref-irr" aria-pressed=${tab==='irr'} onClick=${()=>pickTab('irr')}>Неправильные глаголы</button><button className="chip" role="tab" id="ref-ger" aria-pressed=${tab==='ger'} onClick=${()=>pickTab('ger')}>-ing или to</button></div>
    <input className="set-in ref-q" id="ref-q" type="search" value=${q} placeholder=${tab==='irr'?'Найти: go, ушёл…':'Найти: enjoy, решать…'} onChange=${e=>setQ(e.target.value)} aria-label="Поиск"/>
    ${tab==='irr'?html`<p className="muted ref-note">${rows.length} самых нужных глаголов. Учить их лучше группами в уроке «Неправильные глаголы» — а здесь можно быстро проверить форму.</p>
        <div className="ref-tbl" role="table"><div className="ref-row head" role="row"><span></span><span>V1</span><span>V2</span><span>V3</span><span>Перевод</span></div>
        ${rows.filter(hit).map(r=>html`<div key=${r[0]} className="ref-row" role="row"><button className="ex-say" aria-label=${'Послушать: '+r.slice(0,3).join(', ')} onClick=${()=>say(r.slice(0,3).join(', '))}>${I.speaker()}</button><b lang="en">${r[0]}</b><span lang="en">${r[1]}</span><span lang="en">${r[2]}</span><span className="muted">${r[3]}</span></div>`)}
        ${!rows.filter(hit).length?html`<p className="empty">Не нашёл «${q}». Возможно, это правильный глагол: к нему просто добавляется -ed.</p>`:null}</div>`
    :html`<p className="muted ref-note">Тема уровня B1 (урок «Герундий или инфинитив»). Здесь — списки, чтобы быстро проверить.</p>
      ${gl('Глагол + -ing',GERREF.ing)}${gl('Глагол + to + глагол',GERREF.to)}${gl('Можно и так, и так',GERREF.both,'Смысл почти не меняется.')}${gl('Смысл меняется',GERREF.diff)}
      ${!['ing','to','both','diff'].some(k=>GERREF[k].some(hit))?html`<p className="empty">Не нашёл «${q}».</p>`:null}`}
  </section>`; }
function GrammarMap({st,onBack,open,openRef}){
  const gs=st.gstars||{};
  let cur=gCurrent(st);
  const mapRef=useRef(null), curRef=useRef(null);
  const [paths,setPaths]=useState({done:'',todo:'',w:0,h:0});
  const measure=()=>{
    const m=mapRef.current; if(!m) return;
    const pts=[...m.querySelectorAll('.gnode button')].map(b=>[b.offsetLeft+b.offsetWidth/2,b.offsetTop+b.offsetHeight/2]);
    let done='',todo='';
    for(let i=0;i<pts.length-1;i++){
      const a=pts[i], b=pts[i+1], dy=b[1]-a[1];
      const s=`M${a[0]} ${a[1]}C${a[0]} ${a[1]+dy*.55} ${b[0]} ${b[1]-dy*.55} ${b[0]} ${b[1]}`;
      if(i<cur) done+=s; else todo+=s;
    }
    setPaths({done,todo,w:m.offsetWidth,h:m.offsetHeight});
  };
  React.useLayoutEffect(()=>{
    measure();
    let ro=null; try{ ro=new ResizeObserver(measure); ro.observe(mapRef.current); }catch(e){ addEventListener('resize',measure); }
    const t=setTimeout(measure,400);
    return ()=>{ clearTimeout(t); if(ro) ro.disconnect(); else removeEventListener('resize',measure); };
  },[cur]);
  useEffect(()=>{ const t=setTimeout(()=>{ try{ curRef.current&&curRef.current.scrollIntoView({block:'center',behavior:'smooth'}); }catch(e){} },150); return ()=>clearTimeout(t); },[]);
  const total=gStarsTotal(st), passed=gPassed(st);
  return html`<section className="gm">
    <div className="sess-top"><button className="icon-btn" id="gmap-back" onClick=${()=>{ SFX('tap'); onBack(); }} aria-label="Назад">${I.back()}</button>
      <div className="gm-h"><b>Грамматика</b><span className="muted">${GL.length} уровней · A1–C1</span></div>
      ${openRef?html`<button className="chip ref-open" id="gmap-ref" onClick=${()=>{ SFX('pop'); openRef(); }}>📘 Справочник</button>`:null}</div>
    <div className="ghead enter">
      <div className="ghead-main"><p className="eyebrow">Твой путь</p><h2>${passed} из ${GL.length} ${plural(GL.length,'уровень','уровня','уровней')} пройдено</h2>
        <div className="bar big"><i style=${{width:(passed/GL.length*100)+'%'}}></i></div></div>
      <div className="ghead-stars"><svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true"><path fill="var(--coin)" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg><b>${total}</b><small>из ${GL.length*3}</small></div>
    </div>
    <div className="gmap" ref=${mapRef}>
      <svg className="gconn" width=${paths.w} height=${paths.h} aria-hidden="true"><path className="todo" d=${paths.todo||'M0 0'}/><path className="done" d=${paths.done||'M0 0'}/></svg>
      ${GSEC.map((sec,si)=>{
        const lv=GL.slice(sec.from,sec.to), cnt=lv.filter(l=>(gs[l.id]||0)>=1).length;
        return html`<div key=${si} className="gsec" style=${{'--nc':sec.c,'--nt':sec.t}}>
          <div className="gbanner enter"><span className="gb-n">${si+1}</span><div><b>${sec.title}</b><small>${sec.sub}</small></div><span className="gb-p">${cnt}/${lv.length}</span></div>
          <ol className="gnodes">${lv.map((l,j)=>{
            const i=sec.from+j, s=gs[l.id]||0, known=gKnown(st,i), locked=!gOpen(st,i), current=i===cur;
            return html`<li key=${l.id} className=${'gnode enter'+(locked?' locked':'')+(current?' current':'')+(s?' done':'')+(known&&!s?' known':'')} style=${{'--off':[0,1,0,-1][i%4],'--i':j+1}}>
              <button id=${'level-'+(i+1)} ref=${current?curRef:null} data-perch=${current?'card':undefined} disabled=${locked}
                onClick=${()=>open(i)} aria-label=${'Уровень '+(i+1)+': '+l.title+(locked?', закрыт':'')}>
                ${locked?I.lock():html`<span>${i+1}</span>`}
                ${s===3?html`<span className="gn-badge gold" aria-hidden="true">★</span>`:s?html`<span className="gn-badge ok" aria-hidden="true">✓</span>`:known?html`<span className="gn-badge kn" aria-hidden="true">✓</span>`:null}
              </button>
              <div className="gn-label" onClick=${()=>{ if(!locked) open(i); }}><b>${l.title}</b><span className="gn-ru">${l.ru}</span>${locked?html`<small>${st.level&&lvlIdx(l.cefr)>lvlIdx(st.level)?'с уровня '+l.cefr:'закрыт'}</small>`:known&&!s?html`<small className="kn-label">знаешь</small>`:html`<${Stars} n=${s} size=${16}/>`}
                ${current&&!s?html`<span className="gn-here">Ты здесь</span>`:null}</div></li>`;})}
          </ol></div>`;})}
    </div></section>`;
}

/* ---------- Grammar book: textbook-style units (theory + workbook) ---------- */
/* Theory blocks: ['p',txt] ['ul',[..]] ['ex',[[en,ru],..]] ['tbl',[head..],[[row..],..]] ['note',txt] ['key',txt]; **bold** allowed.
   Exercise items — gap:[sent___,hint,[answers],why] · choice:[sent,[opts],i,why] · trans:[source,[answers],why]
   order:[[answers],why] · error:[sent with *wrong part*,fix|null,why] · tr:[ru,[answers]] */
const GBOOK={};
/* ---------- Старт с нуля: теория и упражнения ---------- */
GBOOK.abc=__WD[816];

GBOOK.rules=__WD[817];

GBOOK.ipa=__WD[818];

GBOOK.svo=__WD[819];

GBOOK.nums=__WD[820];

Object.assign(SIMPLE,__WD[821]);

GBOOK.g2=__WD[822];

GBOOK.g3=__WD[823];

GBOOK.g4=__WD[824];

/*GB_MORE_START*/
GBOOK.g1=__WD[825];

GBOOK.dem=__WD[826];

GBOOK.imp=__WD[827];

GBOOK.pron=__WD[828];

GBOOK.can=__WD[829];

GBOOK.qw=__WD[830];

GBOOK.freq=__WD[831];

GBOOK.art=__WD[832];

GBOOK.pl=__WD[833];

GBOOK.there=__WD[834];

GBOOK.hgot=__WD[835];

GBOOK.poss=__WD[836];

GBOOK.likeing=__WD[837];

GBOOK.waswere=__WD[838];

GBOOK.g5=__WD[839];

GBOOK.g6=__WD[840];

GBOOK.prepl=__WD[841];

GBOOK.atin=__WD[842];

GBOOK.prep=__WD[843];

GBOOK.some=__WD[844];

GBOOK.few=__WD[845];

GBOOK.too=__WD[846];

GBOOK.adv=__WD[847];

GBOOK.asas=__WD[848];

GBOOK.conj=__WD[849];

GBOOK.posspron=__WD[850];

GBOOK.wlike=__WD[851];

GBOOK.g10=__WD[852];

GBOOK.pcfut=__WD[853];

GBOOK.g12=__WD[854];

GBOOK.g11=__WD[855];

GBOOK.haveto=__WD[856];

GBOOK.g7=__WD[857];

GBOOK.g8=__WD[858];

GBOOK.g9=__WD[859];

GBOOK.edadj=__WD[860];

GBOOK.subjq=__WD[861];

GBOOK.allowed=__WD[862];

GBOOK.tags=__WD[863];

GBOOK.sodoi=__WD[864];

GBOOK.zero=__WD[865];

GBOOK.cond1=__WD[866];

GBOOK.timec=__WD[867];

GBOOK.maymight=__WD[868];

GBOOK.cond2=__WD[869];

GBOOK.quant=__WD[870];

GBOOK.compadv=__WD[871];

GBOOK.pass=__WD[872];

GBOOK.ger=__WD[873];

GBOOK.purpose=__WD[874];

GBOOK.makelet=__WD[875];

GBOOK.rel=__WD[876];

GBOOK.refl=__WD[877];

GBOOK.sosuch=__WD[878];

GBOOK.phr=__WD[879];

GBOOK.indq=__WD[880];

GBOOK.ppc=__WD[881];

GBOOK.ppc2=__WD[882];

GBOOK.narr=__WD[883];

GBOOK.cond3=__WD[884];

GBOOK.modpast=__WD[885];

GBOOK.needn=__WD[886];

GBOOK.rep=__WD[887];

GBOOK.repq=__WD[888];

GBOOK.used=__WD[889];

GBOOK.deduct=__WD[890];

GBOOK.hadbetter=__WD[891];

GBOOK.futc=__WD[892];

GBOOK.futpast=__WD[893];

GBOOK.pass3=__WD[894];

GBOOK.gerinf2=__WD[895];

GBOOK.provided=__WD[896];

GBOOK.nondef=__WD[897];

GBOOK.contrast=__WD[898];

GBOOK.each=__WD[899];

GBOOK.adjorder=__WD[900];

GBOOK.mixed=__WD[901];

GBOOK.condinv=__WD[902];

GBOOK.befut=__WD[903];

GBOOK.inv=__WD[904];

GBOOK.wish=__WD[905];

GBOOK.subj=__WD[906];

GBOOK.emph=__WD[907];

GBOOK.ellip=__WD[908];

GBOOK.pass2=__WD[909];

GBOOK.relad=__WD[910];

GBOOK.cleft=__WD[911];

GBOOK.part=__WD[912];

GBOOK.nominal=__WD[913];

GBOOK.hedge=__WD[914];

GBOOK.discourse=__WD[915];

GBOOK.acad=__WD[916];

GBOOK.irr=__WD[917];
SIMPLE.irr=__WD[918];
/* ---------- Теория B1–C1: «По-русски и по-английски» + ошибки ---------- */
const GX={};
const RU_H="По-русски и по-английски";
const gxT=(rows,key,note)=>{const b=[['p',"Русский и английский устроены по-разному, поэтому дословный перевод здесь чаще всего подводит. Сравни:"],['tbl',["По-русски","По-английски","Почему так"],rows]]; if(key) b.push(['key',key]); if(note) b.push(['note',note]); return {h:RU_H,b}; };

GX.g7={s:gxT(__WD[919],
 "В русском одно прошедшее время, в английском — два. Спроси себя: важно **когда** (Past Simple) или **что есть сейчас в результате** (Present Perfect)?",
 "Yet ставится в конце вопросов и отрицаний (Have you finished yet?), already — между have и V3 (I've already finished), just — тоже между ними (She's just left)."),
 m:[["I have already went home.","I have already gone home.","После have — V3."],["I have finished it two hours ago.","I finished it two hours ago.","Ago → Past Simple."]]};

GX.g8={s:gxT(__WD[920],
 "Типичный разговор: первый вопрос — Present Perfect (Have you ever…?), все уточнения — Past Simple (When did you…? Who did you go with?).",
 "This morning, today, this week — Present Perfect, если период ещё не закончился (I've had two coffees today), и Past Simple, если закончился (I had coffee this morning — сейчас вечер)."),
 m:[["Yesterday I have met Aibek.","Yesterday I met Aibek.","Yesterday → Past Simple."],["When have you bought it?","When did you buy it?","When → Past Simple."]]};

GX.g9={s:gxT(__WD[921],
 "В русском «уже начался» и «начался» — одно время, а смысл разный. По-английски эту разницу показывает Past Perfect.",
 "Если порядок и так ясен из before / after, Past Perfect не обязателен: I had breakfast before I left. Обе формы верны."),
 m:[["I had saw him before.","I had seen him before.","Had + V3."],["After she has finished, she went home.","After she had finished, she went home.","Прошлое до прошлого → had + V3."]]};

GX.edadj={s:gxT(__WD[922],
 "Правило-подсказка: **-ed — что я чувствую, -ing — что это вызывает**. «I'm boring» значит «я зануда».",
 "Так работают пары: interested / interesting, excited / exciting, confused / confusing, surprised / surprising, embarrassed / embarrassing, frightened / frightening."),
 m:[["I'm very confusing about this rule.","I'm very confused about this rule.","Чувство → -ed."],["The news was very surprised.","The news was very surprising.","Причина → -ing."]]};

GX.subjq={s:gxT(__WD[923],
 "Подставь ответ: «**Аскар** позвонил мне» — вопрос к подлежащему, did не нужен. «Я позвонил **Аскару**» — вопрос к дополнению, нужен did.",
 "В вопросе к подлежащему глагол стоит в форме he / she / it: Who **knows** the answer? (не know)."),
 m:[["Who did break the window?","Who broke the window?","Вопрос к подлежащему — без did."],["What did make you laugh?","What made you laugh?","What — подлежащее."]]};

GX.allowed={s:gxT(__WD[924],
 "**Let** — без to и без пассива («I was let»); **allow** — с to и бывает в пассиве: They allowed us **to** leave → We were allowed **to** leave.",
 null),
 m:[["Can I to ask a question?","Can I ask a question?","После can — без to."],["Students don't allowed to use phones.","Students aren't allowed to use phones.","Be allowed — с be."]]};

GX.tags={s:gxT(__WD[925],
 "Русское «да?», «правда?», «ведь» — одно слово на всё. В английском хвостик каждый раз собирается из глагола предложения.",
 "Если ответ «нет» на отрицательное предложение, англичанин говорит No: — You didn't call, did you? — **No**, I didn't. (По-русски мы бы сказали «Да, не звонил».)"),
 m:[["You live here, isn't it?","You live here, don't you?","Хвостик строится от глагола: live → don't."],["She can swim, can't her?","She can swim, can't she?","В хвостике — подлежащее (she), а не him / her."]]};

GX.sodoi={s:gxT(__WD[926],
 "Русское «я тоже» подходит и к «да», и к «нет». В английском на отрицание «Me too» звучит ошибкой — нужно **Neither do I / Me neither**.",
 null),
 m:[["— I can't drive. — Me too.","— I can't drive. — Me neither. / Neither can I.","На отрицание → neither."],["— She has a cat. — So does I.","— She has a cat. — So do I.","I → do."]]};

GX.zero={s:gxT(__WD[927],
 "Русское безличное «если нагреть» по-английски требует подлежащего: **If you** heat… (you = любой человек).",
 null),
 m:[["If heat ice, it melts.","If you heat ice, it melts.","Нужно подлежащее."],["Unless you don't practise, you forget.","Unless you practise, you forget.","Unless уже содержит not."]]};

GX.cond1={s:gxT(__WD[928],
 "Русский переносит «будет» и в часть с «если». Английский — нет: **if + Present, will + глагол**. Это самая частая ошибка русскоговорящих.",
 "Will после if возможен только в значении «согласишься ли»: If you'll wait a moment, I'll check. (Если вы не против подождать…) Это вежливая форма, а не будущее."),
 m:[["If I will see him, I'll tell him.","If I see him, I'll tell him.","После if — Present."],["We will go out if it won't rain.","We'll go out if it doesn't rain.","После if — Present."]]};

GX.timec={s:gxT(__WD[929],
 "Правило то же, что с if: после **when, as soon as, until, before, after, while** будущее выражаем настоящим временем.",
 "Не путай с вопросом: **When will** he come? — тут when — вопросительное слово, will нужен."),
 m:[["Wait here until I won't come back.","Wait here until I come back.","Until уже значит «пока не»."],["I'll tell you after I will finish.","I'll tell you after I finish / after I've finished.","После after — Present."]]};

GX.maymight={s:gxT(__WD[930],
 "Не соединяй maybe и might: ««Maybe I might»» — двойное «может быть». Выбери одно: **Maybe I'll** come или **I might** come.",
 null),
 m:[["She might comes later.","She might come later.","После might — V1."],["I will maybe go.","Maybe I'll go. / I might go.","Maybe — в начале."]]};

GX.cond2={s:gxT(__WD[931],
 "Русское «бы» ставится в обе части, английское would — **только в одну**, без if. После if — прошедшее время: If I **had**, If I **knew**.",
 "If I were — для всех лиц (If she were, If it were) в письменной речи. If I was тоже говорят, но в тестах и IELTS выбирай were."),
 m:[["If I would know, I would tell you.","If I knew, I would tell you.","После if — без would."],["If I were rich, I will travel.","If I were rich, I would travel.","Нереальное → would."]]};

GX.quant={s:gxT(__WD[932],
 "В русском двойное отрицание нормально («никто не пришёл»). В английском — только одно: Neither came / Nobody came, но не «Neither didn't come».",
 "Both, either, neither — только для двух. Для трёх и больше: all, any, none: None of my three friends came."),
 m:[["Neither of my friends didn't call.","Neither of my friends called.","Одно отрицание."],["Both of us likes pizza.","Both of us like pizza.","Both → множественное число."]]};

GX.compadv={s:gxT(__WD[933],
 "Русское «гораздо», «намного» = **much / far / a lot**, но не very: «very taller» → much taller.",
 null),
 m:[["It's very more difficult.","It's much more difficult.","Very не стоит перед сравнением."],["The more he practises, more confident he becomes.","The more he practises, the more confident he becomes.","The в обеих частях."]]};

GX.pass={s:gxT(__WD[934],
 "Русские фразы «говорят», «построили», «продают» (без подлежащего) почти всегда переводятся пассивом.",
 "Пассив образуется только от глаголов с дополнением. Нельзя сказать «It was happened» — happen не имеет дополнения: It happened."),
 m:[["It was happened yesterday.","It happened yesterday.","Happen не бывает в пассиве."],["I am born in 2008.","I was born in 2008.","Born — в прошедшем."]]};

GX.ger={s:gxT(__WD[935],
 "Русский инфинитив «-ть» переводится то через to, то через -ing — это зависит от первого глагола. Запоминай глагол вместе с формой: **enjoy doing**, **want to do**.",
 "После предлогов (in, on, at, about, for, of, without, before, after) — всегда -ing: without saying, before leaving, interested in learning."),
 m:[["I avoid to eat sugar.","I avoid eating sugar.","Avoid + -ing."],["I can't afford buying it.","I can't afford to buy it.","Afford + to."]]};

GX.purpose={s:gxT(__WD[936],
 "Русское «для того чтобы» + глагол — никогда не **for + глагол**: «for study» → **to study**.",
 null),
 m:[["I save money for buy a car.","I save money to buy a car.","For + глагол нельзя."],["She studies hard for not fail.","She studies hard so as not to fail.","Цель с отрицанием."]]};

GX.makelet={s:gxT(__WD[937],
 "«Я подстригся» по-английски — **I had my hair cut**. «I cut my hair» значит, что ты стриг себя сам.",
 null),
 m:[["I repaired my car at the garage.","I had my car repaired at the garage.","Чинили другие → have something done."],["She made me cried.","She made me cry.","После make — V1."]]};

GX.rel={s:gxT(__WD[938],
 "В русском «который» склоняется (которого, которому), а в английском нет: who / which / that для всех падежей. Не повторяй местоимение: «the book which I read **it**».",
 null),
 m:[["The people which work here are friendly.","The people who work here are friendly.","О людях — who / that."],["This is the place where we met there.","This is the place where we met.","Where уже значит «там»."]]};

GX.refl={s:gxT(__WD[939],
 "Русское «-ся» далеко не всегда = myself: **одеваться** — get dressed, **мыться** — have a wash / wash, **волноваться** — worry, **расслабляться** — relax.",
 "By myself = сам, без помощи / в одиночестве: I did it by myself."),
 m:[["I worry myself about the exam.","I worry about the exam.","Worry — без myself."],["We enjoyed at the party.","We enjoyed ourselves at the party.","Enjoy требует дополнения: enjoy yourself."]]};

GX.sosuch={s:gxT(__WD[940],
 "Русское «такой» — это и so, и such. Смотри, что идёт следом: **есть существительное → such**, только прилагательное → so.",
 null),
 m:[["She is such kind.","She is so kind.","Нет существительного → so."],["It was so a nice day.","It was such a nice day.","Есть существительное → such a."]]};

GX.phr={s:gxT(__WD[941],
 "Многим русским глаголам в английском соответствует глагол + частица: **вставать** — get up, **сдаваться** — give up, **продолжать** — go on, **выяснять** — find out.",
 "В IELTS Writing лучше нейтральные синонимы: find out → discover, put off → postpone, go up → increase. В Speaking фразовые глаголы — плюс."),
 m:[["Pick up it.","Pick it up.","Местоимение — между глаголом и частицей."],["I gave up to smoke.","I gave up smoking.","Give up + -ing."]]};

GX.indq={s:gxT(__WD[942],
 "Русское «ли» не превращается в вопросительный порядок слов. Нужно **if** или **whether**: Do you know **if** he's home?",
 null),
 m:[["Can you tell me what time is it?","Can you tell me what time it is?","Прямой порядок."],["I don't know does he like it.","I don't know if he likes it.","«Ли» → if."]]};
GX.ppc={s:gxT(__WD[943],
 "Главный сигнал — русское настоящее время + «уже», «с …», «… лет»: «живу здесь с 2020» → **I've been living / I've lived here since 2020**. Present Simple или Continuous здесь — ошибка.",
 "For — срок (for two hours, for ages), since — точка начала (since Monday, since 2015, since I was a child)."),
 m:[["I've been waiting you for an hour.","I've been waiting for you for an hour.","Wait for someone."],["I work here since March.","I've been working here since March.","Since → Perfect."]]};

GX.ppc2={s:gxT(__WD[944],
 "Если в русском есть **срок** («уже час», «три года») и **момент в прошлом** («когда…», «до того как…»), нужен Past Perfect Continuous.",
 null),
 m:[["He was tired because he had been run.","He was tired because he had been running.","Had been + -ing."],["When I met her, she has been living in Osh for years.","When I met her, she had been living in Osh for years.","Прошлое → had."]]};

GX.narr={s:gxT(__WD[945],
 "В русском рассказе всё в одном прошедшем времени, а смысл понятен из «уже», «раньше», «в это время». В английском эти слова «встроены» во время глагола.",
 "В IELTS Speaking Part 2 (рассказ о событии) три времени — Past Simple, Past Continuous и Past Perfect — заметно поднимают оценку за грамматику."),
 m:[["While I walked home, I was seeing an accident.","While I was walking home, I saw an accident.","Фон — Continuous, событие — Simple."],["When we got there, the train left. (поезд уже ушёл)","When we got there, the train had left.","Ушёл раньше → Past Perfect."]]};

GX.cond3={s:gxT(__WD[946],
 "В русском «если бы» одно и для сейчас, и для прошлого. В английском смотри на время: **сейчас** → If I knew…, I would…; **в прошлом** → If I had known…, I would have…",
 "В речи would have звучит как [вудэв] или [вудв], отсюда частая ошибка в письме: «would of». Пиши только would have / would've."),
 m:[["If I knew about it yesterday, I would have helped.","If I had known about it yesterday, I would have helped.","Прошлое → had + V3."],["I would have came if you had called.","I would have come if you had called.","Would have + V3."]]};

GX.modpast={s:gxT(__WD[947],
 "Русское «надо было» (упрёк) — **should have done**, а не «had to»: had to значит, что ты был вынужден и сделал.",
 null),
 m:[["You must have told me earlier! (упрёк)","You should have told me earlier!","Упрёк → should have."],["I had to call you, but I forgot.","I should have called you, but I forgot.","Had to = пришлось и сделал."]]};

GX.needn={s:gxT(__WD[948],
 "Не путай: **mustn't** — нельзя, **don't need to / don't have to** — не обязательно. «You mustn't come» — это запрет, а не «можешь не приходить».",
 null),
 m:[["You mustn't pay — it's free.","You don't need to pay — it's free.","Не обязательно ≠ нельзя."],["She doesn't need come today.","She doesn't need to come today.","Need как обычный глагол — с to."]]};

GX.rep={s:gxT(__WD[949],
 "В русском время в косвенной речи не меняется («сказал, что устал» — про тогдашнее «устал»). В английском после **said / told** время сдвигается на шаг в прошлое.",
 null),
 m:[["He told to me that he was busy.","He told me that he was busy.","Tell без to."],["He said he will call me tomorrow. (говорил вчера)","He said he would call me the next day.","Will → would, tomorrow → the next day."]]};

GX.repq={s:gxT(__WD[950],
 "Русское «сказал, чтобы…» — это **told someone to**: Он сказал, чтобы я подождал → He **told me to wait**.",
 null),
 m:[["She said me to wait.","She told me to wait.","Say не берёт «кому + to»."],["He asked me don't tell anyone.","He asked me not to tell anyone.","Not to + V1."]]};

GX.used={s:gxT(__WD[951],
 "Три похожие формы, три смысла: **used to do** — раньше делал; **be used to doing** — привык; **get used to doing** — привыкаю.",
 "Would не используют для состояний: «I would live in Osh» — ошибка, нужно I used to live."),
 m:[["I used to going to the gym.","I used to go to the gym.","Used to + V1."],["Did you use to playing football?","Did you use to play football?","Used to + V1."]]};

GX.deduct={s:gxT(__WD[952],
 "Русское «не может быть» = **can't**. «Mustn't» значит «нельзя» и для выводов не подходит.",
 null),
 m:[["He can't be come yet.","He can't have come yet.","О прошлом → can't have + V3."],["It mustn't be true!","It can't be true!","Отрицательный вывод → can't."]]};

GX.hadbetter={s:gxT(__WD[953],
 "Had better выглядит как прошедшее, но говорит о **сейчас и будущем**. Это не вежливое «лучше бы», а совет с намёком на последствия — с учителем звучит резко.",
 null),
 m:[["I prefer staying at home than going out.","I prefer staying at home to going out. / I'd rather stay at home than go out.","Prefer … to; would rather … than."],["You'd better not to go.","You'd better not go.","Had better not + V1."]]};

GX.futc={s:gxT(__WD[954],
 "Русское «к» (к пятнице, к 8 часам) — главный сигнал Future Perfect: **by Friday, by 8 o'clock, by the time**.",
 "Until и by: until — «до тех пор, пока» (действие длится), by — «не позже чем» (к сроку): I'll wait until 5. I'll finish by 5."),
 m:[["I will have finished it until Monday.","I will have finished it by Monday.","К сроку → by."],["At 9 tomorrow I will sleep.","At 9 tomorrow I will be sleeping.","Процесс → will be + -ing."]]};

GX.futpast={s:gxT(__WD[955],
 "Русское «должен был» бывает двух видов: обязанность-договорённость → **was supposed to**, вывод → **must have**. «Ты должен был позвонить» (а не позвонил) = You were supposed to call.",
 null),
 m:[["I knew she will like it.","I knew she would like it.","После прошедшего → would."],["We were going to visiting her.","We were going to visit her.","Going to + V1."]]};

GX.pass3={s:gxT(__WD[956],
 "Русские «нужно сделать», «можно купить», «нельзя трогать» по-английски часто звучат пассивом: **must be done, can be bought, mustn't be touched**.",
 null),
 m:[["The results will announce tomorrow.","The results will be announced tomorrow.","Will be + V3."],["This problem can solve easily.","This problem can be solved easily.","Can be + V3."]]};

GX.gerinf2={s:gxT(__WD[957],
 "Простое правило: **-ing смотрит назад** (действие уже было), **to смотрит вперёд** (действие ещё впереди). Работает для remember, forget, regret, stop.",
 "Try to do = стараться (трудно): I tried to open the window, but it was stuck. Try doing = попробовать (вдруг поможет)."),
 m:[["Don't forget calling your grandma.","Don't forget to call your grandma.","Действие впереди → to."],["I regret to say that to her yesterday.","I regret saying that to her yesterday.","Прошлое → -ing."]]};

GX.provided={s:gxT(__WD[958],
 "**In case** — «на всякий случай» (делаю заранее), **if** — «если» (делаю потом, когда случится). Русское «на случай, если пойдёт дождь» = in case **it rains**. In case of + существительное звучит официально: In case of fire, call 101.",
 null),
 m:[["As long as you will study, you'll pass.","As long as you study, you'll pass.","После союза — Present."],["Even I'm tired, I'll help.","Even though I'm tired, I'll help. / Even if I'm tired, I'll help.","Нужен even though / even if."]]};

GX.nondef={s:gxT(__WD[959],
 "В русском запятые перед «который» ставятся всегда. В английском запятые **меняют смысл**: The students, who studied, passed (все учились и сдали) ≠ The students who studied passed (сдали только те, кто учился).",
 "That после запятой не используется: «Osh, that is…» — ошибка."),
 m:[["My sister who lives in Osh is a nurse. (сестра одна)","My sister, who lives in Osh, is a nurse.","Единственная → запятые."],["I spoke to the manager, who's name I forgot.","I spoke to the manager, whose name I forgot.","Чей = whose."]]};

GX.contrast={s:gxT(__WD[960],
 "Русское «хотя …, но …» — два союза. В английском — **только один**: Although it was cold, we went (без but).",
 null),
 m:[["However it was late, we continued working.","Although it was late, we continued working.","However не соединяет две части одного предложения."],["Although he is rich, but he is unhappy.","Although he is rich, he is unhappy.","Один союз."]]};

GX.each={s:gxT(__WD[961],
 "Русское «все» = **everyone** (люди, ед. ч.) или **all** (с существительным). «Все пришли» — Everyone **has** come, а не have.",
 "Every day (каждый день) — два слова. Everyday (одно слово) — прилагательное «повседневный»: everyday clothes."),
 m:[["I've been waiting the all day.","I've been waiting all day.","All day — без the."],["Each students has a laptop.","Each student has a laptop.","Each + ед. ч."]]};

GX.adjorder={s:gxT(__WD[962],
 "В русском порядок прилагательных свободный, в английском — почти фиксированный: **мнение — размер — возраст — форма — цвет — происхождение — материал — назначение**.",
 "Больше трёх прилагательных подряд носители почти не ставят. В эссе лучше разбить: a large wooden table that is over a hundred years old."),
 m:[["a dining wooden table","a wooden dining table","Назначение — у самого существительного."],["a Turkish beautiful carpet","a beautiful Turkish carpet","Мнение — первым."]]};
GX.mixed={s:gxT(__WD[963],
 "В русском «если бы» одинаково для любого времени, поэтому смешанное условие получается само собой. В английском каждую часть ставь в своё время: **когда было условие** и **когда результат**.",
 null),
 m:__WD[964]};

GX.condinv={s:gxT(__WD[965],
 "Инверсия вместо if звучит официально: письма, отчёты, IELTS Writing. В разговоре она кажется книжной.",
 "Отрицание не сокращается: **Had I not** known (не «Hadn't I known»)."),
 m:[["Should you will have questions, contact us.","Should you have questions, contact us.","После should — V1."],["Hadn't she helped us, we would have failed.","Had she not helped us, we would have failed.","Not — после подлежащего."]]};

GX.befut={s:gxT(__WD[966],
 "Русское «должен» здесь — не обязанность (must), а **план или расписание**: is due to, is to. «The flight is due to land at 6» — так пишут на табло и в новостях.",
 null),
 m:[["The plane is due to landing at 6.","The plane is due to land at 6.","Due to + V1."],["The meeting is to be start at 9.","The meeting is to start at 9.","Be to + V1."]]};

GX.inv={s:gxT(__WD[967],
 "В русском мы просто ставим «никогда» в начало для эмоции. В английском это **запускает вопросительный порядок слов**: Never **have I**, Rarely **do we**, Not until… **did I**.",
 "Без отрицательного слова в начале инверсии нет: I have never seen it (обычный порядок)."),
 m:[["Little I knew that she was lying.","Little did I know that she was lying.","Little в начале → did I."],["Only after the exam I relaxed.","Only after the exam did I relax.","Only after → did I + V1."]]};

GX.wish={s:gxT(__WD[968],
 "Русское «жаль, что я **не** умею» → английское I wish I **could** (без not). Отрицание переворачивается: «жаль, что не» = wish + утверждение.",
 "Would после wish не используют о себе: «I wish I would…» — ошибка. Только о других и о том, что раздражает."),
 m:[["I wish I can speak French.","I wish I could speak French.","После wish — сдвиг назад."],["I wish I would have more free time.","I wish I had more free time.","О себе — без would."]]};

GX.subj={s:gxT(__WD[969],
 "Русское «чтобы» + прошедшее («чтобы ты остался») часто соответствует английскому прошедшему: I'd rather you **stayed**, It's time you **went**.",
 "Subjunctive после suggest, recommend, insist, it's essential: She insisted that he **apologise** (без -s, без should). В британском можно и should apologise."),
 m:[["It's high time you start working.","It's high time you started working.","High time + Past."],["The doctor recommended that she takes a rest.","The doctor recommended that she take a rest.","Subjunctive — без -s."]]};

GX.emph={s:gxT([
  ["Я правда тебя слушал!","I did listen to you!","Did + V1 — с нажимом."],
  ["Она действительно хорошо поёт.","She does sing well.","Does + V1."],
  ["Ну заходите же!","Do come in!","Do + приказ — тепло, настойчиво."],
  ["Это ведь важно.","It is important.","С be — ударение голосом, без do."]],
 "Русские «правда», «же», «ведь», «действительно» часто передаются одним вспомогательным глаголом с ударением: **I DO like it**.",
 null),
 m:[["She doesn't sing well, but she do dance well.","She doesn't sing well, but she does dance well.","She → does."],["Do comes in!","Do come in!","Do + V1."]]};

GX.ellip={s:gxT(__WD[970],
 "Русский просто выбрасывает слова («Думаю, да»), английский оставляет «заменитель»: **so, not, one, to, do**. Без него фраза звучит обрывисто.",
 "I don't think so — обычный ответ «думаю, нет». I think not — звучит книжно."),
 m:[["— Is she coming? — I think yes.","— Is she coming? — I think so.","Да → so."],["I wanted to go but I couldn't go there.","I wanted to go, but I couldn't.","Повтор лишний."]]};

GX.pass2={s:gxT(__WD[971],
 "Русские безличные «говорят», «считается», «полагают» — это IELTS-стиль: **It is believed that…, X is thought to…** Они делают текст объективным.",
 null),
 m:[["He is said that he is rich.","He is said to be rich. / It is said that he is rich.","Две формы нельзя смешивать."],["The suspect is reported to be escaped.","The suspect is reported to have escaped.","Прошлое → to have + V3."]]};

GX.relad={s:gxT(__WD[972],
 "Русское «то, что» = **what**, а не «that what» или «the thing which»: What I need is time.",
 "В разговоре предлог уходит в конец, а whom заменяется who или опускается: the man (who) I spoke to. Whom — признак письменного стиля."),
 m:[["This is that what I wanted.","This is what I wanted.","«То, что» = what."],["Whereby I mean that…","By which I mean that…","Whereby = «посредством которого», а не «под этим я имею в виду»."]]};

GX.cleft={s:gxT(__WD[973],
 "Русский выделяет слово порядком или словом «именно», английский — **конструкцией**: It is / was … that / who, What … is.",
 null),
 m:[["It was in 2020 when I moved here.","It was in 2020 that I moved here.","В cleft — that."],["What surprised me were his honesty.","What surprised me was his honesty.","What … was (ед. ч.)."]]};

GX.part={s:gxT(__WD[974],
 "Русское деепричастие («придя», «зная») почти всегда = английское причастие. Но подлежащее у обеих частей **должно совпадать**: «Walking home, it started to rain» — ошибка (дождь не шёл домой).",
 null),
 m:[["Having finishing the work, I left.","Having finished the work, I left.","Having + V3."],["Being tired, the film seemed long to me.","Being tired, I found the film long.","Подлежащее должно быть тем, кто устал."]]};

GX.nominal={s:gxT(__WD[975],
 "Русский научный стиль тоже любит существительные («рост», «снижение», «принятие решения»), поэтому номинализация даётся легко. Главное — не перегружать: два-три таких оборота на абзац достаточно.",
 null),
 m:[["There was a significant increase of prices.","There was a significant increase in prices.","Increase / rise / fall in."],["The protection nature is important.","The protection of nature is important.","Нужен of."]]};

GX.hedge={s:gxT(__WD[976],
 "Русская речь допускает категоричность («все», «всегда», «очевидно»). В академическом английском это минус: **tend to, appear to, may, likely, to some extent** делают аргумент точнее.",
 "Не смягчай всё подряд. Факты и цифры из графика (IELTS Task 1) подаются прямо: Sales rose by 20%."),
 m:[["It seems to be that prices will rise.","It seems that prices will rise. / Prices seem likely to rise.","It seems that или seem to."],["It is maybe true.","It may be true. / It is possibly true.","Maybe — разговорное, перед глаголом не ставят."]]};

GX.discourse={s:gxT(__WD[977],
 "Ложный друг: **actually** = «на самом деле», а не «актуально» (актуальный = relevant, current). **Eventually** = «в конце концов», а не «возможно».",
 null),
 m:[["Shortly, we were late.","In short, we were late. / Long story short, we were late.","«Короче» ≠ shortly (= скоро)."],["By the way, firstly, I'll answer the question.","First of all, I'll answer the question.","By the way — только для смены темы."]]};

GX.acad={s:gxT(__WD[978],
 "Русское «но» в начале предложения в эссе лучше заменить на **However,**. Связки ставь в начало предложения и отделяй запятой.",
 "Не переусердствуй: связка в каждом предложении снижает оценку за Coherence. Достаточно 1–2 на абзац."),
 m:[["Besides of this, it is cheap.","Besides this, it is cheap. / In addition to this, it is cheap.","Besides — без of."],["In conclusion, to sum up, …","In conclusion, …","Одна связка."]]};

for(const k in GX){ const b=GBOOK[k]; if(!b) continue; b.sections.push(GX[k].s); if(GX[k].m) b.mistakes.push(...GX[k].m); }
GBOOK.movep=__WD[979];
SIMPLE.movep=["Предлоги движения показывают дорогу: куда идёшь, откуда и как. В комнату — into, из комнаты — out of, через дорогу — across, сквозь лес — through, вдоль реки — along, мимо школы — past.","Где? — in, on. Куда? — into, onto, to. Как? — across, through, along, past."];

GBOOK.sugg=__WD[980];
SIMPLE.sugg=__WD[981];
GBOOK.art2=__WD[982];
SIMPLE.art2=__WD[983];

GBOOK.deppr=__WD[984];
SIMPLE.deppr=__WD[985];
GBOOK.wantyou=__WD[986];
SIMPLE.wantyou=["По-русски говорим «хочу, чтобы ты пришёл», а по-английски проще: I want you to come — «хочу тебя прийти». Никаких that. Так же: ask me to, tell me to. А «видел, как он ушёл» — I saw him leave, без to.","Хочу, чтобы ты… = I want you to… Видел, как он… = I saw him + глагол."];

GBOOK.seem=__WD[987];
SIMPLE.seem=["Когда говоришь, каким что-то кажется — на вид, на слух, на вкус, — бери look, sound, taste и т. д. и сразу прилагательное: You look tired. Если дальше предмет или человек — вставь like: You look like your mum.","Look / sound / seem + прилагательное. Look / sound + like + существительное."];
/*GB_MORE_END*/
/* ---------- grammar book UI ---------- */
const bkFmt=s=>String(s).split(/(\*\*[^*]+\*\*|\*[^*\s][^*\n]*?\*)/).map((x,i)=>x.startsWith('**')&&x.endsWith('**')&&x.length>4?html`<b key=${i}>${x.slice(2,-2)}</b>`:x.length>2&&x[0]==='*'&&x[x.length-1]==='*'?html`<em key=${i}>${x.slice(1,-1)}</em>`:x);
const BK_CONTR=[[/\bwon't\b/g,'will not'],[/\bcan't\b/g,'can not'],[/\bcannot\b/g,'can not'],[/\bshan't\b/g,'shall not'],[/n't\b/g,' not'],[/'m\b/g,' am'],[/'re\b/g,' are'],[/'s\b/g,' is'],[/'ve\b/g,' have'],[/'ll\b/g,' will'],[/'d\b/g,' would']];
const BK_NUM={one:'1',two:'2',three:'3',four:'4',five:'5',six:'6',seven:'7',eight:'8',nine:'9',ten:'10',eleven:'11',twelve:'12'};
function bkNorm(x){ if(/^\s*[-—–]+\s*$/.test(String(x==null?'':x))) return '-'; let s=normAns(String(x==null?'':x)).replace(/[—–"«»:;]/g,' ').replace(/\s+/g,' ').trim();
  BK_CONTR.forEach(([r,v])=>{ s=s.replace(r,v); });
  return s.replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/g,m=>BK_NUM[m]).replace(/\bmum\b|\bmom\b/g,'mother').replace(/\s+/g,' ').trim(); }
const bkSame=(a,b)=>bkNorm(a)===bkNorm(b);
const bkBlanks=s=>String(s).split('___').length-1;
function bkMulti(it){ return Array.isArray(it[2][0]); }
function bkTok(sent){ const out=[]; let wrong=false, k=0; String(sent).split(/(\*[^*]+\*)/).forEach(part=>{ const w=part.startsWith('*')&&part.endsWith('*')&&part.length>2; (w?part.slice(1,-1):part).split(/\s+/).filter(Boolean).forEach(t=>out.push({t,w,i:k++})); if(w) wrong=true; }); return {toks:out,hasErr:wrong}; }
function bkShuffle(words,seed){ const a=words.slice(); let x=seed*9301+49297; for(let i=a.length-1;i>0;i--){ x=(x*9301+49297)%233280; const j=Math.floor(x/233280*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  if(a.join(' ')===words.join(' ')&&a.length>1) a.push(a.shift()); return a; }
function bkCheck(t,it,v,self){
  if(t==='gap'){ if(bkMulti(it)){ const vs=Array.isArray(v)?v:[]; return it[2].every((acc,j)=>acc.some(a=>bkSame(a,vs[j]))); } return it[2].some(a=>bkSame(a,v)); }
  if(t==='choice') return v===it[2];
  if(t==='trans') return it[1].some(a=>bkSame(a,v));
  if(t==='order') return it[0].some(a=>bkSame(a,(v||[]).map(x=>x&&x.w!=null?x.w:x).join(' ')));
  if(t==='error'){ const {toks,hasErr}=bkTok(it[0]); if(!hasErr) return v===-1; return v!=null&&v>=0&&!!(toks[v]&&toks[v].w); }
  if(t==='tr') return !!self || it[1].some(a=>bkSame(a,v));
  return false; }
const bkAnswer=(t,it)=>t==='gap'?(bkMulti(it)?it[2].map(a=>a[0]).join(' … '):it[2][0]):t==='choice'?it[1][it[2]]:t==='trans'?it[1][0]:t==='order'?it[0][0]:t==='error'?(it[1]==null?'Ошибки нет':bkTok(it[0]).toks.filter(x=>x.w).map(x=>x.t).join(' ')+' → '+it[1]):t==='tr'?it[1][0]:'';
const bkFilled=(t,it,v)=>t==='gap'?(bkMulti(it)?Array.isArray(v)&&it[2].every((_,j)=>v[j]&&String(v[j]).trim()):!!(v&&String(v).trim())):t==='choice'||t==='error'?v!=null:t==='order'?!!(v&&v.length):!!(v&&String(v).trim());
const BK_TYPE={gap:'Впиши пропущенное',choice:'Выбери ответ',trans:'Измени предложение',order:'Собери из слов',error:'Найди ошибку',tr:'Переведи'};

function BookTheory({lv,bk,sec,idx,onStart,onTest,onAsk,done,voiceBtn}){
  const go=id=>{ const el=document.getElementById(id); if(el) el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}); };
  const block=(b,j)=>{ const [k,a,c]=b;
    if(k==='p') return html`<p key=${j} className="bk-p">${bkFmt(a)}</p>`;
    if(k==='ul') return html`<ul key=${j} className="bk-ul">${a.map((x,i)=>html`<li key=${i}>${bkFmt(x)}</li>`)}</ul>`;
    if(k==='key') return html`<div key=${j} className="bk-key"><b>Запомни</b><p>${bkFmt(a)}</p></div>`;
    if(k==='note') return html`<div key=${j} className="bk-note"><b>Обрати внимание</b><p>${bkFmt(a)}</p></div>`;
    if(k==='tbl') return html`<div key=${j} className="bk-tblw"><table className="bk-tbl"><thead><tr>${a.map((h,i)=>html`<th key=${i}>${h}</th>`)}</tr></thead><tbody>${c.map((r,ri)=>html`<tr key=${ri}>${r.map((x,ci)=>html`<td key=${ci}>${bkFmt(x)}</td>`)}</tr>`)}</tbody></table></div>`;
    if(k==='ex') return html`<ul key=${j} className="bk-ex">${a.map((e,i)=>html`<li key=${i}>
      ${canSpeak?html`<button className="ex-say" aria-label=${'Послушать: '+e[0]} onClick=${()=>{ speak(e[0].replace(/\(.*?\)/g,'')); W('react','nod'); }}>${I.speaker()}</button>`:html`<span></span>`}
      <div><b lang="en">${e[0]}</b><span>${e[1]}</span></div></li>`)}</ul>`;
    return null; };
  const nEx=bk.ex.reduce((n,b)=>n+b.items.length,0);
  return html`<article className="bk enter">
    <header className="bk-head"><span className="phase">${sec.title} · Тема ${idx+1}</span><h2>${lv.title}</h2><p className="bk-ru">${lv.ru}</p>
      <p className="bk-goal"><b>Цель урока.</b> ${bk.goal}</p></header>
    <nav className="bk-toc" aria-label="Содержание"><b>Содержание</b><ol>${bk.sections.map((s,i)=>html`<li key=${i}><button className="link-btn" onClick=${()=>go('bks-'+i)}>${s.h}</button></li>`)}
      <li><button className="link-btn" onClick=${()=>go('bks-m')}>Типичные ошибки</button></li><li><button className="link-btn" onClick=${()=>go('bks-s')}>Коротко о главном</button></li></ol></nav>
    ${bk.sections.map((s,i)=>html`<section key=${i} className="bk-sec" id=${'bks-'+i}><h3><span>${i+1}</span>${s.h}</h3>${s.b.map(block)}</section>`)}
    <section className="bk-sec" id="bks-m"><h3><span>!</span>Типичные ошибки</h3>
      <ul className="bk-mis">${bk.mistakes.map((m,i)=>html`<li key=${i}><s lang="en">${m[0]}</s><b lang="en">${m[1]}</b><small>${m[2]}</small></li>`)}</ul></section>
    <section className="bk-sec" id="bks-s"><h3><span>✓</span>Коротко о главном</h3><ul className="bk-sum">${bk.summary.map((x,i)=>html`<li key=${i}>${bkFmt(x)}</li>`)}</ul></section>
    <div className="bk-askbox"><div><b>Остались вопросы?</b><p className="muted">Спроси Ворди или выдели любой фрагмент текста — появится кнопка «Объяснить».</p></div><button className="btn small ghost" id="bk-ask" onClick=${onAsk}>💡 Спросить Ворди</button></div>
    <div className="bk-cta">${voiceBtn}<button className="btn wide" id="bk-start" onClick=${onStart}>К упражнениям: ${bk.ex.length} блоков, ${nEx} заданий</button>
      <button className="btn ghost wide" id="bk-test" onClick=${onTest}>${done?'Итоговый тест':'Сразу к итоговому тесту'}</button></div>
  </article>`;
}

function BkItem({t,it,i,v,set,res,self,setSelf,ctx}){
  const ok=res!=null?res:null, cls='bk-it'+(ok==null?'':ok?' good':' bad');
  const fb=ok==null?null:html`<div className="bk-fb" role="status">${ok?html`<b>Верно.</b>`:html`<b>Правильно: <span lang="en">${bkAnswer(t,it)}</span></b>`}
    ${t==='gap'&&it[3]?html` <span>${it[3]}</span>`:t==='choice'&&it[3]?html` <span>${it[3]}</span>`:(t==='trans'||t==='order'||t==='error')&&it[t==='trans'?2:t==='order'?1:2]?html` <span>${it[t==='trans'?2:t==='order'?1:2]}</span>`:null}
    ${t==='tr'&&!ok?html`<div className="bk-self"><span>Другие верные варианты тоже возможны.</span><button className="btn small ghost" id=${'bk-self-'+i} onClick=${()=>setSelf(true)}>Мой вариант тоже верный</button></div>`:null}
    ${t==='tr'&&ok&&self?html` <span>Засчитано. Образец: <span lang="en">${it[1][0]}</span></span>`:null}
    <button className="bk-rep" id=${'bk-rep-'+i} onClick=${()=>bkReport(ctx||'Упражнение',(t==='order'?'':String(it[0])+'\n')+(t==='choice'?'Варианты: '+it[1].join(' / ')+'\n':'')+'Ответ в ключе: '+bkAnswer(t,it)+(v!=null&&v!==''&&t!=='choice'?'\nОтвет ученика: '+(Array.isArray(v)?v.join(' '):v):''))}>Ошибка в задании?</button></div>`;
  const dis=ok!=null;
  if(t==='gap'){ const parts=String(it[0]).split('___'), multi=bkMulti(it), vs=multi?(Array.isArray(v)?v:[]):null;
    return html`<li className=${cls}><span className="bk-n">${i+1}</span><div><p className="bk-s" lang="en">${parts.map((p,j)=>html`<span key=${j}>${p}${j<parts.length-1?html`<input className="bk-in" style=${{width:(Math.max(5,String(multi?it[2][j][0]:it[2][0]).length+2))+'ch'}} id=${'bk-in-'+i+(multi?'-'+j:'')} value=${multi?(vs[j]||''):(v||'')} readOnly=${dis} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck=${false} aria-label=${'Пропуск '+(j+1)}
      onChange=${e=>{ if(multi){ const n=vs.slice(); n[j]=e.target.value; set(n); } else set(e.target.value); }}/>`:null}</span>`)}</p>
      ${it[1]?html`<small className="bk-hint">(${it[1]})</small>`:null}${fb}</div></li>`; }
  if(t==='choice') return html`<li className=${cls}><span className="bk-n">${i+1}</span><div><p className="bk-s" lang="en">${it[0]}</p>
    <div className="bk-opts">${it[1].map((o,j)=>html`<button key=${j} id=${'bk-o-'+i+'-'+j} className=${'bk-opt'+(v===j?' on':'')+(dis&&j===it[2]?' right':'')+(dis&&v===j&&j!==it[2]?' wrong':'')} disabled=${dis} aria-pressed=${v===j} onClick=${()=>{ SFX('tap'); set(j); }}>${o}</button>`)}</div>${fb}</div></li>`;
  if(t==='trans'||t==='tr') return html`<li className=${cls}><span className="bk-n">${i+1}</span><div><p className="bk-s" lang=${t==='trans'?'en':'ru'}>${it[0]}</p>
    <textarea className="bk-ta" id=${'bk-in-'+i} rows="2" value=${v||''} readOnly=${dis} autoComplete="off" autoCapitalize="sentences" spellCheck=${false} lang="en" aria-label="Ответ" placeholder=${t==='tr'?'Перевод на английский':'Новое предложение'} onChange=${e=>set(e.target.value)}></textarea>${fb}</div></li>`;
  if(t==='order'){ const words=String(it[0][0]).split(/\s+/), pool=bkShuffle(words,i+words.length), used=Array.isArray(v)?v:[], usedIdx=used.map(x=>x.k);
    return html`<li className=${cls}><span className="bk-n">${i+1}</span><div>
      <div className="bk-line" aria-label="Твоё предложение">${used.length?used.map((x,j)=>html`<button key=${x.k} className="bk-chip on" disabled=${dis} onClick=${()=>set(used.filter((_,q)=>q!==j))}>${x.w}</button>`):html`<span className="muted">Нажимай на слова по порядку</span>`}</div>
      <div className="bk-pool">${pool.map((w,k)=>usedIdx.includes(k)?html`<span key=${k} className="bk-chip ghost">${w}</span>`:html`<button key=${k} id=${'bk-w-'+i+'-'+k} className="bk-chip" disabled=${dis} onClick=${()=>{ SFX('tap'); set(used.concat([{k,w}])); }}>${w}</button>`)}</div>${fb}</div></li>`; }
  if(t==='error'){ const {toks}=bkTok(it[0]);
    return html`<li className=${cls}><span className="bk-n">${i+1}</span><div><p className="bk-s bk-err" lang="en">${toks.map(x=>html`<button key=${x.i} id=${'bk-t-'+i+'-'+x.i} className=${'bk-tok'+(v===x.i?' on':'')+(dis&&x.w?' right':'')} disabled=${dis} onClick=${()=>{ SFX('tap'); set(x.i); }}>${x.t}</button>`)}</p>
      <button className=${'bk-opt small'+(v===-1?' on':'')} id=${'bk-none-'+i} disabled=${dis} aria-pressed=${v===-1} onClick=${()=>{ SFX('tap'); set(-1); }}>Ошибки нет</button>${fb}</div></li>`; }
  return null; }

function BookPractice({lv,bk,bi,setBi,saved,onSave,onTest}){
  const blk=bk.ex[bi];
  const [vals,setVals]=useState({}), [res,setRes]=useState(null), [self,setSelf]=useState({});
  useEffect(()=>{ setVals({}); setRes(null); setSelf({}); },[bi]);
  const allFilled=blk.items.every((it,i)=>bkFilled(blk.t,it,vals[i]));
  const check=()=>{ const r=blk.items.map((it,i)=>bkCheck(blk.t,it,vals[i],self[i])); setRes(r); const n=r.filter(Boolean).length;
    onSave(bi,n,r.length); if(n===r.length){ SFX('fanfare'); W('react','cheer'); W('say',pick(['Всё верно!','Безупречно!','Ни одной ошибки!']),0,true); } else if(n>=r.length*.7){ SFX('correct'); W('react','happy'); W('say','Хорошо! Посмотри разбор ошибок.',0,true); } else { SFX('wrong'); W('react','encourage'); W('say','Перечитай теорию и попробуй ещё раз.',0,true); }
    setTimeout(()=>{ const el=document.querySelector('.bk-it.bad'); if(el) el.scrollIntoView({block:'center',behavior:'smooth'}); },60); };
  const markSelf=i=>{ const s2={...self,[i]:true}; setSelf(s2); const r=res.slice(); r[i]=true; setRes(r); onSave(bi,r.filter(Boolean).length,r.length); SFX('correct'); };
  const score=res?res.filter(Boolean).length:null, last=bi+1>=bk.ex.length;
  return html`<div className="bk-pr">
    <nav className="bk-tabs" aria-label="Упражнения">${bk.ex.map((b,j)=>{ const s=saved[j]; return html`<button key=${j} id=${'bk-tab-'+j} className=${'bk-tab'+(j===bi?' on':'')+(s?(s[0]===s[1]?' full':' part'):'')} aria-current=${j===bi?'step':null} onClick=${()=>{ SFX('tap'); setBi(j); window.scrollTo({top:0}); }}>${j+1}</button>`; })}</nav>
    <article className="bk-page enter" key=${bi}>
      <span className="phase">Упражнение ${bi+1} из ${bk.ex.length} · ${BK_TYPE[blk.t]}</span><h3>${blk.h}</h3><p className="bk-q">${blk.q}</p>
      <ol className="bk-items">${blk.items.map((it,i)=>html`<${BkItem} key=${bi+'-'+i} t=${blk.t} it=${it} i=${i} v=${vals[i]} set=${x=>{ if(!res) setVals(o=>({...o,[i]:x})); }} res=${res?res[i]:null} self=${self[i]} setSelf=${()=>markSelf(i)} ctx=${(lv&&lv.title?lv.title+' · ':'')+'упражнение '+(bi+1)+' «'+blk.h+'»'}/>`)}</ol>
      ${res?html`<div className=${'bk-score'+(score===res.length?' full':'')}><b>${score} из ${res.length}</b><span>${score===res.length?'Отлично, всё верно.':'Разбери ошибки выше, затем попробуй ещё раз или иди дальше.'}</span></div>`:null}
      <div className="bk-actions">${res?html`<button className="btn ghost" id="bk-retry" onClick=${()=>{ SFX('pop'); setVals({}); setRes(null); setSelf({}); window.scrollTo({top:0}); }}>Ещё раз</button>
        <button className="btn" id="bk-next" onClick=${()=>{ SFX('tap'); if(last) onTest(); else { setBi(bi+1); window.scrollTo({top:0}); } }}>${last?'К итоговому тесту':'Следующее упражнение'}</button>`
        :html`<button className="btn wide" id="bk-check" disabled=${!allFilled} onClick=${check}>${allFilled?'Проверить':'Ответь на все задания'}</button>`}</div>
    </article></div>`; }

/* ---------- grammar helper: «Объясни» on selection + «Спроси Ворди» ---------- */
const askPrompt=(lv,lvl,quote,q,exercise)=>'You are a friendly, precise English grammar tutor for a Russian-speaking learner (CEFR '+(lvl||lv.cefr||'B1')+'). Current lesson: "'+lv.title+' — '+lv.ru+'".\n'
  +(quote?'The learner selected this text: "'+String(quote).slice(0,400)+'"\n':'')
  +'Learner\'s question (may be in Russian): "'+String(q||'Объясни это').slice(0,500)+'"\n'
  +'Answer in Russian, simply and accurately, in 2-5 short sentences, as a good teacher would. Then give 2 short natural English examples with Russian translations, and one practical tip. Stay on English grammar and vocabulary; if the question is unrelated to learning English, politely say you can only help with English.'
  +(exercise?'\nIMPORTANT: the learner is in the middle of an exercise that has not been checked yet. Do NOT reveal the answer, do NOT say which option is correct, and do not rewrite the sentence correctly. Explain only the rule behind it and give a hint that helps them decide themselves.':'')
  +'\nReply with ONLY JSON: {"text":"объяснение","examples":[{"en":"...","ru":"..."}],"tip":"совет"}';
function AskSheet({lv,lvl,ask,onClose,mk,defQ}){ const ai=useSample(); const [q,setQ]=useState(ask.quote?(defQ||'Объясни, пожалуйста'):''), [busy,setBusy]=useState(false), [ans,setAns]=useState(null), [err,setErr]=useState(null);
  const go=async()=>{ if(!ai||busy||!q.trim()) return; setBusy(true); setErr(null); setAns(null); W('react','think');
    const P=mk?mk(ask.quote,q):askPrompt(lv,lvl,ask.quote,q,ask.exercise);
    try{ const j=ai.stream?await ai.stream(P,x=>{ if(x&&x.text) setAns({text:String(x.text),examples:[],tip:'',live:true}); }):await ai.json(P,null,{fast:true}); if(!j||typeof j!=='object') throw {code:'invalid_json'};
      setAns({text:String(j.text||''),examples:Array.isArray(j.examples)?j.examples.filter(e=>e&&e.en).slice(0,3).map(e=>({en:String(e.en),ru:String(e.ru||'')})):[],tip:String(j.tip||'')}); SFX('pop'); W('react','happy'); }
    catch(e){ setErr(aiErr(e)); W('react','encourage'); } setBusy(false); };
  useEffect(()=>{ if(ai&&ask.quote&&ask.auto) go(); },[ai]);
  useEffect(()=>{ const esc=e=>{ if(e.key==='Escape') onClose(); }; document.addEventListener('keydown',esc); return ()=>document.removeEventListener('keydown',esc); },[]);
  const ui=html`<div className="sheet-wrap ask-wrap" onClick=${onClose}><div className="sheet ask-sheet enter" role="dialog" aria-label="Спросить Ворди" onClick=${e=>e.stopPropagation()}>
    <div className="sheet-h"><b>Спроси Ворди</b><button className="icon-btn" id="ask-close" onClick=${()=>{ SFX('tap'); onClose(); }} aria-label="Закрыть">${I.close()}</button></div>
    ${ask.quote?html`<blockquote className="ask-q" lang="en">${String(ask.quote).slice(0,300)}</blockquote>`:null}
    ${ask.exercise?html`<p className="muted ask-note">Задание ещё не проверено, поэтому Ворди объяснит правило и подскажет, но не скажет ответ.</p>`:null}
    ${ai===null?html`<p className="empty">${aiOffText()}</p>`
    :html`<div className="ask-row"><textarea id="ask-in" rows="2" value=${q} maxLength="500" placeholder="Например: почему здесь has, а не have?" onChange=${e=>setQ(e.target.value)} onKeyDown=${e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); go(); } }}></textarea>
      <button className="btn" id="ask-go" disabled=${!q.trim()||busy||ai===undefined} onClick=${go}>${busy?'Думаю…':'Спросить'}</button></div>`}
    ${err?html`<p className="acc-err" role="alert">${err}</p>`:null}
    ${ans?html`<div className="ask-ans" role="status"><p>${ans.text}</p>
      ${ans.examples.length?html`<ul className="bk-ex">${ans.examples.map((e,i)=>html`<li key=${i}>${canSpeak?html`<button className="ex-say" aria-label=${'Послушать: '+e.en} onClick=${()=>speak(e.en)}>${I.speaker()}</button>`:html`<span></span>`}<div><b lang="en">${e.en}</b><span>${e.ru}</span></div></li>`)}</ul>`:null}
      ${ans.tip?html`<div className="bk-key"><b>Совет</b><p>${ans.tip}</p></div>`:null}<${AiReport} what="Спроси Ворди" text=${(ask.quote?'«'+ask.quote+'» ':'')+q+'\n'+ans.text+'\n'+ans.tip}/></div>`:null}
  </div></div>`; return (window.ReactDOM&&ReactDOM.createPortal)?ReactDOM.createPortal(ui,document.body):ui; }
function useAskSel(on,scope){ const [sel,setSel]=useState(null);
  useEffect(()=>{ if(!on){ setSel(null); return; } let t=null; const f=()=>{ clearTimeout(t); t=setTimeout(()=>{ const s=window.getSelection&&window.getSelection(); const txt=s?String(s).trim():'';
      if(!s||!s.rangeCount||txt.length<2||txt.length>300){ setSel(null); return; } const n=s.getRangeAt(0).commonAncestorContainer, el=n.nodeType===1?n:n.parentElement;
      if(!el||!el.closest(scope||'.bk,.bk-page')||el.closest('input,textarea')){ setSel(null); return; } const it=el.closest('.bk-it');
      setSel({quote:txt,exercise:!!(it&&!it.classList.contains('good')&&!it.classList.contains('bad'))}); },180); };
    document.addEventListener('selectionchange',f); return ()=>{ clearTimeout(t); document.removeEventListener('selectionchange',f); }; },[on]);
  return [sel,setSel]; }
/* «Спроси Ворди» for any English text (readers, checked tests): select a word, phrase or whole sentence */
const readAskPrompt=(lvl,quote,q)=>'You are a friendly, precise English tutor for a Russian-speaking learner (CEFR '+(lvl||'B1')+'). The learner selected this from an English text: "'+String(quote).slice(0,400)+'"\n'
  +'Learner\'s question (may be in Russian): "'+String(q||'Переведи и объясни').slice(0,500)+'"\n'
  +'Answer in Russian, simply and accurately: give a natural Russian translation of the selection, explain hard words, phrases or idioms, and point out any grammar worth noticing (2-6 short sentences in total). Then give 2 short natural English examples using the key word or structure, with Russian translations, and one practical tip. If the question is unrelated to learning English, politely say you can only help with English.'
  +'\nReply with ONLY JSON: {"text":"объяснение","examples":[{"en":"...","ru":"..."}],"tip":"совет"}';
function TextAsk({on,scope,level}){ const [ask,setAsk]=useState(null); const [sel,setSel]=useAskSel(on&&!ask,scope);
  return html`${sel?html`<button className="ask-pill enter" id="text-ask-pill" onMouseDown=${e=>e.preventDefault()} onClick=${()=>{ SFX('pop'); setAsk({...sel,exercise:false,auto:true}); setSel(null); }}><span aria-hidden="true">💡</span>Спросить Ворди: «${sel.quote.length>26?sel.quote.slice(0,26)+'…':sel.quote}»</button>`:null}
    ${ask?html`<${AskSheet} lv=${{title:'Reading',ru:'текст',cefr:level}} lvl=${level} ask=${ask} defQ="Переведи и объясни" mk=${(qt,q)=>readAskPrompt(level,qt,q)} onClose=${()=>setAsk(null)}/>`:null}`; }


/* ---------- final test built from the textbook: 7 from this unit + 3 interleaved review ---------- */
function bkPool(id){ const u=GBOOK[id]; if(!u) return []; const out=[]; u.ex.forEach((b,bi)=>{ if(b.t==='tr') return; b.items.forEach((it,i)=>out.push({t:b.t,it,key:id+'.'+bi+'.'+i,id,q:b.q,h:b.h})); }); return out; }
function finalItems(idx,seed){ const lv=GL[idx]; const rnd=(()=>{ let x=(seed*7919+idx*104729)%2147483647||1; return ()=>{ x=x*48271%2147483647; return x/2147483647; }; })();
  const sh=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
  const own=sh(bkPool(lv.id)); const byT={}; own.forEach(x=>(byT[x.t]=byT[x.t]||[]).push(x));
  const pick=[]; const types=sh(Object.keys(byT)); let k=0; while(pick.length<7&&pick.length<own.length){ const t=types[k%types.length]; const x=byT[t].shift(); if(x) pick.push(x); k++; if(k>200) break; }
  const prev=sh(GL.slice(0,idx).filter(l=>GBOOK[l.id]).map(l=>l.id)).slice(0,3);
  prev.forEach(id=>{ const p=sh(bkPool(id)).find(x=>x.t!=='order'); if(p) pick.push({...p,rev:GL.find(l=>l.id===id).title}); });
  while(pick.length<10&&own.length>pick.length){ const x=own.find(o=>!pick.includes(o)); if(!x) break; pick.push(x); }
  return pick.slice(0,10); }
function FinalTest({items,onDone,run}){ const [vals,setVals]=useState({}), [res,setRes]=useState(null);
  try{ window.__wordyFT=items.map(x=>({t:x.t,it:x.it,err:x.t==='error'?(bkTok(x.it[0]).toks.find(z=>z.w)||{i:-1}).i:null})); }catch(e){}
  const all=items.every((x,i)=>bkFilled(x.t,x.it,vals[i]));
  const check=()=>{ const r=items.map((x,i)=>bkCheck(x.t,x.it,vals[i])); setRes(r); const n=r.filter(Boolean).length; if(n===r.length) SFX('fanfare'); else SFX(n>=r.length*.6?'correct':'wrong'); setTimeout(()=>{ const el=document.querySelector('.bk-it.bad'); if(el) el.scrollIntoView({block:'center',behavior:'smooth'}); },60); };
  const score=res?res.filter(Boolean).length:0;
  return html`<article className="bk-page enter" key=${run}>
    <span className="phase">Итоговый тест · 10 заданий</span><h3>Проверь себя</h3><p className="bk-q">Задания разных типов по этой теме и 3 задания на повторение прошлых тем. Ответь на все и нажми «Проверить».</p>
    <ol className="bk-items">${items.map((x,i)=>html`<div key=${run+'-'+i}><small className="bk-rev">${x.rev?'Повторение · '+x.rev+' — ':''}${x.q||BK_TYPE[x.t]}</small><${BkItem} t=${x.t} it=${x.it} i=${i} v=${vals[i]} set=${v=>{ if(!res) setVals(o=>({...o,[i]:v})); }} res=${res?res[i]:null} ctx=${'Итоговый тест · '+((GBOOK[x.id]&&GBOOK[x.id].title)||x.id)+' · '+x.key+(x.q?' · '+x.q:'')}/></div>`)}</ol>
    <div className="bk-actions">${res?html`<button className="btn wide" id="ft-done" onClick=${()=>onDone(score,items.length,res)}>Результат: ${score} из ${items.length}</button>`
      :html`<button className="btn wide" id="ft-check" disabled=${!all} onClick=${check}>${all?'Проверить':'Ответь на все задания'}</button>`}</div></article>`; }

function GrammarLesson({lv,idx,prevStars,update,onBack,onNext,saved,st}){
  const [voice,setVoice]=useState(false); const canVoice=!!st&&canLiveVoice()&&st.age!=='u13';
  const voiceBtn=canVoice?html`<button className="btn ghost wide vl-btn" id="g-voice" onClick=${()=>{ SFX('pop'); setVoice(true); }}>🎙 Урок с Ворди голосом · 5 мин</button>`:null;
  const voiceUi=voice?html`<${VoiceLesson} st=${st} update=${update} onClose=${()=>setVoice(false)}/>`:null;
  const bk=GBOOK[lv.id], [bi,setBi]=useState(0), bsaved=saved||{};
  const saveBk=(b,n,tot)=>update(s=>{ const g={...(s.gbook||{})}, u={...(g[lv.id]||{})}, o=u[b]; u[b]=[Math.max(o?o[0]:0,n),tot]; g[lv.id]=u; return {gbook:g,xp:s.xp+n*2}; });
  const sec=secOf(idx);
  const [run,setRun]=useState(0);
  const tasks=useMemo(()=>[
    ...shuffle(lv.typed).map(t=>({kind:'type',prompt:t[0],hint:t[1],acc:t[2]})),
    ...shuffle(lv.choice).map(c=>({kind:'pick',prompt:c[0],options:shuffle(c[1]),answer:c[1][c[2]]}))],[lv,run]);
  const [phase,setPhase]=useState('theory');
  const [ask,setAsk]=useState(null); const [asel,setAsel]=useAskSel(!!bk&&(phase==='theory'||phase==='book')&&!ask);
  const askUi=html`${asel?html`<button className="ask-pill enter" id="ask-pill" onMouseDown=${e=>e.preventDefault()} onClick=${()=>{ SFX('pop'); setAsk({...asel,auto:true}); setAsel(null); }}><span aria-hidden="true">💡</span>Объяснить «${asel.quote.length>28?asel.quote.slice(0,28)+'…':asel.quote}»</button>`:null}${ask?html`<${AskSheet} lv=${lv} ask=${ask} onClose=${()=>setAsk(null)}/>`:null}`;
  const [ti,setTi]=useState(0);
  const [val,setVal]=useState('');
  const [checked,setChecked]=useState(null);
  const [results,setResults]=useState([]);
  const [reward,setReward]=useState(null);
  const [simple,setSimple]=useState(false);
  const [sheet,setSheet]=useState(false);
  const inputRef=useRef(null);
  const t=tasks[ti];
  const sm=SIMPLE[lv.id];
  const askSimple=(modal)=>{ SFX('pop'); W('react','think'); setTimeout(()=>W('react','happy'),900); W('say',pick(['Сейчас объясню попроще!','Без проблем, давай по-простому.','Смотри, всё легко!']),0,true); if(modal) setSheet(true); else setSimple(v=>!v); };
  const simpleBox=sm?html`<div className="simple-box" role="note">
      <span className="sb-face" aria-hidden="true">${html`<${Face}/>`}</span>
      <div><b>Проще говоря</b><p>${sm[0]}</p><div className="sb-hack"><em>Шпаргалка</em><span>${sm[1]}</span></div></div></div>`:null;

  useEffect(()=>{ if(phase==='practice'&&t.kind==='type'&&!checked){ const h=setTimeout(()=>{ try{ inputRef.current&&inputRef.current.focus({preventScroll:true}); }catch(e){} },80); return ()=>clearTimeout(h);} },[phase,ti,checked]);

  const openBook=()=>{ setPhase('book'); window.scrollTo({top:0}); SFX('whoosh'); W('react','wave'); W('say','Делай упражнения по порядку. После каждого блока — разбор.',0,true); };
  const start=()=>{ setPhase(bk?'final':'practice'); window.scrollTo({top:0}); SFX('whoosh'); W('react','wave'); W('say',bk?'Итоговый тест: 10 заданий, 3 из них — повторение прошлых тем.':'Сначала 6 заданий с вводом, потом 4 на выбор.'); };
  const check=sel=>{
    if(checked) return;
    let ok, el;
    if(t.kind==='type'){ if(!val.trim()) return; ok=t.acc.some(a=>normAns(a)===normAns(val)); el=inputRef.current; }
    else { ok=t.options[sel]===t.answer; el=document.getElementById('gopt-'+sel); }
    setChecked({ok,sel}); setResults(r=>[...r,ok]);
    if(ok){ SFX('correct'); FX('sparkle',el); FX('floatText',el,'+3','good'); } else { SFX('wrong'); FX('floatText',el,'✕','bad'); }
    W('react',ok?'correct':'wrong');
    W('say',ok?pick(['Отлично!','Верно!','Так держать!','Супер!']):pick(['Почти! Смотри правильный ответ.','Ничего, запомним.']));
  };
  const finish=(sc,tot)=>{
    const score=sc!=null?sc:results.filter(Boolean).length, total=tot!=null?tot:tasks.length;
    const stars=score>=total?3:score>=total-2?2:score>=total-4?1:0;
    const coins=score*3+stars*5, xp=score*10;
    update(s=>{ const td=dayKey(), y=dayKey(-1); const streak=s.lastDay===td?s.streak:(s.lastDay===y?s.streak+1:1);
      return {coins:s.coins+coins,xp:s.xp+xp,streak,lastDay:td,gstars:{...(s.gstars||{}),[lv.id]:Math.max((s.gstars||{})[lv.id]||0,stars)}}; });
    setReward({score,total,stars,coins,xp,unlocked:stars>0&&!prevStars&&idx+1<GL.length}); setPhase('result'); window.scrollTo({top:0});
    for(let i=0;i<stars;i++) setTimeout(()=>SFX('star',i),380+i*200);
    if(stars===3){ setTimeout(()=>{ FX('rain',160); SFX('fanfare'); },1000); W('react','cheer'); W('say','Три звезды! Идеально!',0,true); }
    else if(stars>0){ setTimeout(()=>{ FX('confetti',document.querySelector('.result .stars'),70); SFX('fanfare'); },900); W('react','happy'); W('say','Уровень пройден! '+stars+' '+plural(stars,'звезда','звезды','звёзд')+'.',0,true); }
    else { setTimeout(()=>SFX('fail'),400); W('react','encourage'); W('say','Не хватило совсем чуть-чуть. Перечитай базу и попробуй снова!',0,true); }
    setTimeout(()=>FX('coinFly',document.getElementById('reward-coins'),5,()=>SFX('coin')),1500);
    if(stars>0&&!prevStars&&idx+1<GL.length) setTimeout(()=>SFX('unlock'),2300);
  };
  const next=()=>{ SFX('tap'); if(ti+1<tasks.length){ setTi(ti+1); setVal(''); setChecked(null); } else finish(); };
  const restart=()=>{ SFX('pop'); setRun(r=>r+1); setPhase('theory'); setTi(0); setVal(''); setChecked(null); setResults([]); setReward(null); window.scrollTo({top:0}); };

  useEffect(()=>{
    const h=e=>{
      if(e.metaKey||e.ctrlKey||e.altKey) return;
      if(e.target&&e.target.tagName==='INPUT') return;
      if(phase==='theory'&&!bk&&e.key==='Enter'){ e.preventDefault(); start(); }
      else if(phase==='practice'){
        const n=parseInt(e.key,10);
        if(t.kind==='pick'&&!checked&&n>=1&&n<=t.options.length) check(n-1);
        else if(checked&&e.key==='Enter'){ e.preventDefault(); next(); }
      }
    };
    addEventListener('keydown',h); return ()=>removeEventListener('keydown',h);
  });

  const top=(label,states)=>html`<div className="sess-top">
    <button className="icon-btn" id="glesson-close" onClick=${()=>{ SFX('tap'); onBack(); }} aria-label="К уровням">${I.close()}</button>
    <div className="steps" aria-hidden="true">${states.map((s,i)=>html`<i key=${i} className=${s}></i>`)}</div>
    ${sm&&phase==='practice'?html`<button className="icon-btn help-btn" id="simple-help" onClick=${()=>askSimple(true)} aria-label="Не понял? Объясни проще" title="Не понял? Объясни проще">?</button>`:null}
    <span className="phase">${label}</span></div>
    ${sheet?html`<div className="sheet-wrap" onClick=${()=>setSheet(false)}><div className="sheet enter" role="dialog" aria-label="Простое объяснение" onClick=${e=>e.stopPropagation()}>
      <div className="sheet-h"><b>${lv.title}</b><button className="icon-btn" id="sheet-close" onClick=${()=>{ SFX('tap'); setSheet(false); }} aria-label="Закрыть">${I.close()}</button></div>
      ${simpleBox}
      <div className="formula">${lv.formula.map((r,i)=>html`<div key=${i}><span className=${'sign'+(r[0]==='+'?' plus':r[0]==='−'?' minus':r[0]==='?'?' q':' word')}>${r[0]}</span><span>${r[1]}</span></div>`)}</div>
      <button className="btn wide" id="sheet-ok" onClick=${()=>{ SFX('tap'); setSheet(false); }}>Понятно, продолжаем</button></div></div>`:null}`;
  const style={'--nc':sec.c,'--nt':sec.t};

  if(phase==='theory'&&bk) return html`<section style=${style} className="bk-wrap">${top('Теория',bk.ex.map((_,j)=>bsaved[j]?(bsaved[j][0]===bsaved[j][1]?'good':'on'):''))}<${BookTheory} lv=${lv} bk=${bk} sec=${sec} idx=${idx} voiceBtn=${voiceBtn} onStart=${openBook} onTest=${start} onAsk=${()=>{ SFX('pop'); setAsk({quote:'',exercise:false}); }} done=${Object.keys(bsaved).length>=bk.ex.length}/>${askUi}${voiceUi}</section>`;
  if(phase==='book'&&bk) return html`<section style=${style} className="bk-wrap">${top('Упражнения',bk.ex.map((_,j)=>j===bi?'on':bsaved[j]?(bsaved[j][0]===bsaved[j][1]?'good':'bad'):''))}<div className="bk-back"><button className="link-btn" id="bk-theory" onClick=${()=>{ SFX('tap'); setPhase('theory'); window.scrollTo({top:0}); }}>← Теория</button></div><${BookPractice} lv=${lv} bk=${bk} bi=${bi} setBi=${setBi} saved=${bsaved} onSave=${saveBk} onTest=${start}/>${askUi}</section>`;
  if(phase==='theory') return html`<section style=${style}>
    ${top('База',tasks.map(()=>''))}
    <article className="gtheory enter" data-perch="card">
      <div className="gt-head"><span className="gt-badge">${idx+1}</span><div><span className="phase">${sec.title} · ${lv.ru}</span><h2>${lv.title}</h2></div></div>
      <p className="gintro">${lv.intro}</p>
      ${sm?html`<button className=${'simple-btn'+(simple?' on':'')} id="simple-btn" aria-expanded=${simple} onClick=${()=>askSimple(false)}><span aria-hidden="true">🤔</span>${simple?'Скрыть простое объяснение':'Не понял? Объясни проще'}</button>`:null}
      ${simple?simpleBox:null}
      <div className="formula">${lv.formula.map((r,i)=>html`<div key=${i} className="enter" style=${{'--i':i+2}}><span className=${'sign'+(r[0]==='+'?' plus':r[0]==='−'?' minus':r[0]==='?'?' q':' word')}>${r[0]}</span><span>${r[1]}</span></div>`)}</div>
      <h3 className="gsub">Примеры</h3>
      <ul className="gex">${lv.examples.map((e,i)=>html`<li key=${i}>
        ${canSpeak?html`<button className="ex-say" aria-label="Послушать пример" onClick=${()=>{ speak(e[0]); W('react','nod'); }}>${I.speaker()}</button>`:null}
        <div><b>${e[0]}</b><span>${e[1]}</span></div></li>`)}</ul>
      <div className="gtip"><b>Совет Ворди</b><span>${lv.tip}</span></div>
      ${voiceBtn}<button className="btn wide" id="start-practice" onClick=${start}>К практике: 10 заданий <kbd>Enter</kbd></button>
    </article>${voiceUi}</section>`;

  if(phase==='final'&&bk){ const fit=finalItems(idx,run+1);
    return html`<section style=${style} className="bk-wrap">${top('Итоговый тест',fit.map(()=>''))}<div className="bk-back"><button className="link-btn" id="bk-theory2" onClick=${()=>{ SFX('tap'); setPhase('theory'); window.scrollTo({top:0}); }}>← Теория</button></div><${FinalTest} items=${fit} run=${run} onDone=${(sc,tot,r)=>{ setResults(r); finish(sc,tot); }}/>${askUi}</section>`; }
  if(phase==='practice'){
    const states=tasks.map((_,i)=>i<results.length?(results[i]?'good':'bad'):(i===ti?'on':''));
    const parts=t.prompt.split('___');
    const ok=checked&&checked.ok;
    const correctText=t.kind==='type'?t.acc[0].replace(/^'/,''):t.answer;
    const badge=(i,o)=>!checked?i+1:o===t.answer?'✓':i===checked.sel?'✕':i+1;
    return html`<section style=${style}>
      ${top(t.kind==='type'?'Напиши':'Выбери',states)}
      <div className="qcard enter" key=${'t'+ti+'-'+run} data-perch="card">
        <span className=${'gtype '+t.kind}>${t.kind==='type'?'✎ Впиши ответ':'☰ Выбери ответ'}</span>
        <span className="phase">Задание ${ti+1} из ${tasks.length}</span>
        ${t.kind==='type'?html`
          <p className="gsent">${parts[0]}<input ref=${inputRef} id="g-input" className=${'ginput'+(checked?(ok?' good':' bad'):'')} value=${val}
             onChange=${e=>{ setVal(e.target.value); SFX('type'); }} onKeyDown=${e=>{ if(e.key==='Enter'){ e.preventDefault(); checked?next():check(); } }}
             readOnly=${!!checked} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck=${false} aria-label="Ответ"/>${parts[1]||''}</p>
          <p className="ghint">Подсказка: <b>${t.hint}</b></p>
          ${!checked?html`<button className="btn wide" id="check-btn" disabled=${!val.trim()} onClick=${()=>check()}>Проверить <kbd>Enter</kbd></button>`:null}`
        :html`
          <p className="gsent">${parts[0]}<span className=${'gblank'+(checked?' filled':'')}>${checked?t.answer:'…'}</span>${parts[1]||''}</p>
          <div className="opts">${t.options.map((o,i)=>html`<button key=${o} id=${'gopt-'+i} className=${'opt'+(!checked?'':o===t.answer?' good':i===checked.sel?' bad':' dim')} disabled=${!!checked} onClick=${()=>check(i)}><span className="k">${badge(i,o)}</span><span>${o}</span></button>`)}</div>`}
        ${checked?html`<div className=${'fb '+(ok?'good':'bad')} role="status"><span>${ok?'Верно! Так держать':'Правильно: '+correctText}${!ok&&sm?html` <button className="link-btn inline" id="fb-simple" onClick=${()=>askSimple(true)}>Не понял?</button>`:null}</span>
          <button className="btn small" id="gnext-btn" onClick=${next}>${ti+1<tasks.length?'Дальше':'Результат'} <kbd>Enter</kbd></button></div>`:null}
      </div></section>`;
  }

  const r=reward, hasNext=idx+1<GL.length, passed=r.stars>0;
  return html`<section style=${style}>
    ${top('Результат',results.map(x=>x?'good':'bad'))}
    <div className="result enter" data-perch="card">
      <span className="phase">Уровень ${idx+1} · ${lv.title}</span>
      <${Stars} n=${r.stars} size=${56} big=${true}/>
      <div className="score"><${CountUp} to=${r.score}/><small>/${r.total}</small></div>
      <p>${r.stars===3?'Идеально, все ответы верные!':passed?'Уровень пройден. Хочешь три звезды? Пройди ещё раз.':'Нужно хотя бы 6 верных ответов из 10, чтобы открыть следующий уровень.'}</p>
      ${r.unlocked?html`<span className="unlock-chip">Открыт уровень ${idx+2}: ${GL[idx+1].title}</span>`:null}
      <div className="rewards"><span className="pill" id="reward-coins">${I.coin()} +${r.coins}</span><span className="pill">${I.bolt()} +${r.xp} XP</span></div>
      <div className="actions">
        <button className="btn ghost" id="gretry-btn" onClick=${restart}>Пройти ещё раз</button>
        ${passed&&hasNext?html`<button className="btn" id="gnext-level" onClick=${()=>{ SFX('pop'); onNext(); }}>Уровень ${idx+2}</button>`:html`<button className="btn" id="gmap-btn" onClick=${()=>{ SFX('tap'); onBack(); }}>К уровням</button>`}
      </div>
    </div></section>`;
}

/* ---------- spaced repetition ---------- */
const INTERVAL=[0,1,2,4,7,15];
/* ---------- memory engine: FSRS-4.5 (simplified) ----------
   Each word keeps st.mem[id]=[S,D,lastDay,reps,lapses]:
   S = stability (days until recall chance falls to 90%), D = difficulty 1..10.
   st.boxes (0..5) and st.due stay as a summary, so the rest of the app keeps working. */
const FW=[0.4872,1.4003,3.7145,13.8206,5.1618,1.2298,0.8975,0.031,1.6474,0.1367,1.0461,2.1072,0.0793,0.3246,1.587,0.2272,2.8755];
const F_DECAY=-0.5, F_FACTOR=19/81, F_MAX=365, BOX_S=[0.4,1,2.5,5,10,20];
const dayNum=k=>{ const p=(k||dayKey()).split('-').map(Number); return Math.round(Date.UTC(p[0],p[1]-1,p[2])/864e5); };
const numDay=n=>{ const d=new Date(n*864e5); return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate()); };
const fR=(t,S)=>Math.pow(1+F_FACTOR*Math.max(0,t)/S,F_DECAY);
const fD0=g=>Math.min(10,Math.max(1,FW[4]-(g-3)*FW[5]));
const memBox=(s,g)=>g===1?0:s<2?1:s<5?2:s<15?3:s<45?4:5;
function memOf(st,id){ const m=(st.mem||{})[id]; if(m) return {s:m[0],d:m[1],l:m[2],n:m[3],f:m[4],real:true};
  const b=(st.boxes||{})[id]; if(b==null) return null; const bb=Math.max(0,Math.min(5,b)), due=(st.due||{})[id], today=dayNum();
  const last=due?dayNum(due)-INTERVAL[bb]:today; return {s:BOX_S[bb],d:bb===0?7:5,l:Math.min(last,today),n:bb,f:0,real:false}; }
/* chance (0..1) that the word is still remembered today */
const memRet=(st,id,off=0)=>{ const m=memOf(st,id); return m?fR(dayNum()+off-m.l,m.s):0; };
/* g: 1 forgot · 2 hard · 3 good · 4 easy. Returns a state patch {mem,boxes,due}. */
function memGrade(st,id,g,wt=1){
  const today=dayNum(), o=memOf(st,id), mem={...(st.mem||{})}, boxes={...(st.boxes||{})}, due={...(st.due||{})};
  let s,d,n,f,last=today;
  if(!o||(!o.real&&(o.n===0||o.l>=today))){ s=FW[g-1]*(g>1?wt:1); d=fD0(g); n=1; f=g===1?1:0; }
  else if(o.real&&o.l===today){ /* already reviewed today: memory strength is not re-counted */
    if(g>1) return {};
    mem[id]=[o.s,+Math.min(10,o.d+.2).toFixed(2),o.l,o.n,o.f]; boxes[id]=0; due[id]=numDay(today+1); return {mem,boxes,due}; }
  else { const R=fR(today-o.l,o.s); s=o.s; d=o.d; n=o.n+1; f=o.f;
    if(g===1){ f++; s=Math.min(s,FW[11]*Math.pow(d,-FW[12])*(Math.pow(s+1,FW[13])-1)*Math.exp(FW[14]*(1-R))); }
    else s=s*(1+wt*Math.exp(FW[8])*(11-d)*Math.pow(s,-FW[9])*(Math.exp(FW[10]*(1-R))-1)*(g===2?FW[15]:1)*(g===4?FW[16]:1));
    d=d-FW[6]*(g-3)*(g===1?1:wt); d=FW[7]*fD0(4)+(1-FW[7])*d; }
  s=Math.max(.1,Math.min(3650,s)); d=Math.min(10,Math.max(1,d));
  let ivl=Math.max(1,Math.min(F_MAX,Math.round(s))); if(ivl>3) ivl=Math.max(2,Math.round(ivl*(.95+Math.random()*.1)));
  if(g===1) ivl=1;
  mem[id]=[+s.toFixed(2),+d.toFixed(2),last,n,f]; boxes[id]=memBox(s,g); due[id]=numDay(today+ivl);
  return {mem,boxes,due};
}
/* turn an answer into a grade: typing proves more than picking from options */
const TASK_W={tr:.4,ru:.5,def:.55,write:1,listen:1,gap:1,fix:1};
function ansGrade(ok,type,ms,len,typo){ if(!ok) return 1; if(typo) return 2;
  if(TASK_W[type]<1) return ms>15000?2:3;
  const fast=2600+230*(len||5); return ms>fast*2.8?2:ms<fast?4:3; }
const memLeech=(st,id)=>{ const m=(st.mem||{})[id]; return !!m&&m[4]>=3&&m[0]<10; };
const hardWords=st=>ALL.filter(w=>st.boxes[w.id]===0||memLeech(st,w.id)).map(w=>[w,memRet(st,w.id)]).sort((a,b)=>a[1]-b[1]).map(x=>x[0]);
/* which kind of task a word needs now: grows harder as the word settles */
function memStage(st,w){ const m=memOf(st,w.id); if(!m) return 0; if(memLeech(st,w.id)) return 1; const s=m.s; return s<2?0:s<6?1:s<15?2:3; }
/* compare a typed answer: exact, or one small typo for longer words */
const editDist=(a,b)=>{ if(Math.abs(a.length-b.length)>2) return 9; let q=null, p=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){ const c=[i]; for(let j=1;j<=b.length;j++){ c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1)); if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1]) c[j]=Math.min(c[j],q[j-2]+1); } q=p; p=c; } return p[b.length]; };
function checkTyped(typed,answers){ const t=normAns(typed); if(!t) return {ok:false};
  const alts=[]; answers.filter(Boolean).forEach(a=>{ const x=normAns(a); alts.push(x,x.replace(/\s*\([^)]*\)\s*/g,' ').trim()); x.split(/\s*[\/;]\s*/).forEach(y=>alts.push(y.trim())); });
  if(alts.includes(t)) return {ok:true};
  const near=alts.some(a=>a.length>=5&&editDist(t,a)<=(a.length>=10?2:1));
  return near?{ok:true,typo:true}:{ok:false}; }
function dueWords(st){ const today=dayKey(), due=st.due||{}; return ALL.concat(Object.values(st.myWords||{})).filter(w=>st.boxes[w.id]!=null&&(due[w.id]||today)<=today).map(w=>[w,w.kind==='fix'&&!(st.mem||{})[w.id]?-1:memRet(st,w.id)]).sort((a,b)=>a[1]-b[1]).map(x=>x[0]); }
function dueOn(st,off){ const d=dayKey(off), due=st.due||{}; return ALL.filter(w=>st.boxes[w.id]!=null&&due[w.id]===d).length; }

/* ---------- shop ---------- */
const SLOTS=[{id:'all',name:'Всё'},{id:'hat',name:'Шапки'},{id:'eyes',name:'Очки'},{id:'mouth',name:'Усы и борода'},{id:'cheeks',name:'Щёчки'},{id:'neck',name:'На шею'},{id:'suit',name:'Костюмы'},{id:'back',name:'За спину'}];
const SLOT_ORDER=['hat','eyes','mouth','cheeks','neck','suit','back'];
const LOOKS=__WD[988];
const ART_VB={hat:'-50 -116 100 76',eyes:'-38 -64 76 40',mouth:'-36 -54 72 58',cheeks:'-36 -56 72 40',neck:'-40 -40 80 48',suit:'-46 -74 92 86',back:'-76 -80 152 104',look:'-76 -124 152 144'};
let _artN=0;
function dollSvg(ids,full){ const by={}; ids.forEach(id=>{ const it=WORDY_ITEMS.find(x=>x.id===id); if(it) by[it.slot]=it; }); const g=k=>by[k]?by[k].svg:'', cid='dc'+(++_artN), B='#FF7A12';
  return g('back')+(full?`<path d="M-12 -4 V6 M12 -4 V6" stroke="${B}" stroke-width="12" stroke-linecap="round"/><ellipse cx="-13" cy="8" rx="9" ry="5" fill="${B}"/><ellipse cx="13" cy="8" rx="9" ry="5" fill="${B}"/><circle cx="-39" cy="-24" r="6" fill="${B}"/><circle cx="39" cy="-24" r="6" fill="${B}"/>`:'')
    +`<clipPath id="${cid}"><ellipse cx="0" cy="-34" rx="38" ry="34"/></clipPath><ellipse cx="0" cy="-34" rx="38" ry="34" fill="${B}"/><path d="M-33.5 -18 A38 34 0 0 0 33.5 -18 A46 40 0 0 1 -33.5 -18Z" fill="#E5600A" opacity=".32"/>`
    +(by.suit?`<g clip-path="url(#${cid})">${by.suit.svg}</g><path d="M-33.5 -18 A38 34 0 0 0 33.5 -18 A46 40 0 0 1 -33.5 -18Z" fill="#000" opacity=".16"/>`:'')
    +g('cheeks')+'<ellipse cx="-10.5" cy="-43" rx="7.4" ry="10.2" fill="#fff"/><ellipse cx="10.5" cy="-43" rx="7.4" ry="10.2" fill="#fff"/><ellipse cx="-10.5" cy="-42" rx="5.6" ry="8" fill="#24130A"/><ellipse cx="10.5" cy="-42" rx="5.6" ry="8" fill="#24130A"/><circle cx="-12.4" cy="-46" r="2.1" fill="#fff"/><circle cx="8.6" cy="-46" r="2.1" fill="#fff"/>'
    +'<path d="M-6 -27 Q0 -22 6 -27" stroke="#4A1E0C" stroke-width="3" fill="none" stroke-linecap="round"/>'+g('mouth')+g('eyes')+g('neck')+(by.hat?`<g transform="translate(0 -64)">${by.hat.svg}</g>`:''); }
window.__doll=ids=>dollSvg(ids,true);
function ItemArt({it}){ const svg=useMemo(()=>dollSvg([it.id],it.slot==='back'),[it.id]); return html`<svg className="item-art" viewBox=${ART_VB[it.slot]} aria-hidden="true" dangerouslySetInnerHTML=${{__html:svg}}></svg>`; }
function LookArt({ids}){ const svg=useMemo(()=>dollSvg(ids,true),[ids.join()]); return html`<svg className="look-art" viewBox=${ART_VB.look} aria-hidden="true" dangerouslySetInnerHTML=${{__html:svg}}></svg>`; }

function Wardrobe({st,update,preview,setPreview}){
  const [cat,setCat]=useState('all');
  const owned=st.owned||[], eq=st.equip||{};
  const items=WORDY_ITEMS.filter(i=>cat==='all'||i.slot===cat).slice().sort((a,b)=>SLOT_ORDER.indexOf(a.slot)-SLOT_ORDER.indexOf(b.slot));
  const pv=preview&&WORDY_ITEMS.find(i=>i.id===preview);
  const worn=SLOT_ORDER.map(sl=>WORDY_ITEMS.find(i=>i.id===eq[sl])).filter(Boolean);
  const tryOn=it=>{ SFX('pop'); const next=preview===it.id?null:it.id; setPreview(next); if(next) W('react','happy'); };
  const buy=(it,el)=>{
    if(st.coins<it.price){ SFX('wrong'); W('react','think'); W('say','Не хватает монет. Ещё немного поучимся!',0,true); return; }
    update(s=>({coins:s.coins-it.price,owned:[...(s.owned||[]),it.id],equip:{...(s.equip||{}),[it.slot]:it.id}}));
    setPreview(null); SFX('unlock'); FX('confetti',el,50); W('react','cheer'); W('say',pick(['Мне идёт?','Вот это обновка!','Ух ты, спасибо!']),0,true);
  };
  const toggle=it=>{ SFX('tap'); const on=eq[it.slot]===it.id; update(s=>({equip:{...(s.equip||{}),[it.slot]:on?null:it.id}})); setPreview(null); if(!on) W('react','happy'); };
  const takeOff=sl=>{ SFX('tap'); update(s=>({equip:{...(s.equip||{}),[sl]:null}})); };
  const bare=()=>{ SFX('pop'); setPreview(null); update(()=>({equip:{}})); W('react','wave'); W('say','Снова просто Ворди!',0,true); };
  const wearLook=(L,el)=>{ const miss=L.items.filter(id=>!owned.includes(id)), cost=miss.reduce((a,id)=>a+WORDY_ITEMS.find(x=>x.id===id).price,0);
    if(cost>st.coins){ SFX('wrong'); W('react','think'); W('say','На образ не хватает '+(cost-st.coins)+' '+plural(cost-st.coins,'монеты','монет','монет')+'.',0,true); return; }
    const e={}; L.items.forEach(id=>{ const it=WORDY_ITEMS.find(x=>x.id===id); e[it.slot]=id; });
    update(s=>({coins:s.coins-cost,owned:[...new Set([...(s.owned||[]),...miss])],equip:e})); setPreview(null);
    if(miss.length){ SFX('unlock'); FX('confetti',el,60); } else SFX('pop'); W('react','cheer'); W('say',L.name+' — готово!',0,true); };
  const card=(it,i)=>{ const has=owned.includes(it.id), on=eq[it.slot]===it.id, poor=!has&&st.coins<it.price, trying=preview===it.id;
     return html`<article key=${it.id} className=${'item enter'+(on?' on':'')+(trying?' trying':'')} style=${{'--i':Math.min(i,12)}}>
       <button className="item-try" id=${'try-'+it.id} onClick=${()=>tryOn(it)} aria-label=${'Примерить: '+it.name}><${ItemArt} it=${it}/>
         ${trying?html`<span className="tag try">Примеряем</span>`:on?html`<span className="tag worn">Надето</span>`:null}</button>
       <b>${it.name}</b>
       ${has?html`<button className=${'btn small'+(on?' ghost':'')} id=${'wear-'+it.id} onClick=${()=>toggle(it)}>${on?'Снять':'Надеть'}</button>`
            :html`<button className=${'btn small buy'+(poor?' poor':'')} id=${'buy-'+it.id} onClick=${e=>buy(it,e.currentTarget)}>${I.coin()} ${it.price}</button>`}
       ${poor?html`<small className="need">не хватает ${it.price-st.coins}</small>`:null}
     </article>`; };
  return html`
   <div className="page-h"><div><span className="date-chip">Одежда и образы</span><h1>Гардероб</h1></div><span className="pill big-pill">${I.coin()} ${st.coins}</span></div>
   <section className="stage enter">
     <div className="spot" aria-hidden="true"></div>
     <div className="pedestal" data-perch="stage"><span>${pv?'Примерка: '+pv.name:'Нажми на вещь, чтобы примерить'}</span></div>
     <div className="outfit" id="outfit">${worn.length?html`${worn.map(it=>html`<button key=${it.id} className="slot on" id=${'off-'+it.slot} onClick=${()=>takeOff(it.slot)} aria-label=${'Снять: '+it.name}>${it.name} <span aria-hidden="true">✕</span></button>`)}
         ${worn.length>1?html`<button className="slot" id="bare" onClick=${bare}>Снять всё</button>`:null}`:html`<span className="slot">Пока без наряда</span>`}</div>
   </section>
   <p className="hint-line">Вещи из разных разделов надеваются вместе: шапка, очки, усы, щёчки, шарф, костюм и крылья — всё сразу.</p>
   <div className="sec-h"><h2>Готовые образы</h2></div>
   <div className="looks" role="list">${LOOKS.map(L=>{ const miss=L.items.filter(id=>!owned.includes(id)), cost=miss.reduce((a,id)=>a+WORDY_ITEMS.find(x=>x.id===id).price,0), on=L.items.every(id=>Object.values(eq).includes(id));
     return html`<div key=${L.id} className=${'look'+(on?' on':'')} role="listitem"><${LookArt} ids=${L.items}/><b>${L.name}</b>
       <button className=${'btn small'+(on?' ghost':cost>st.coins?' poor':'')} id=${'look-'+L.id} disabled=${on} onClick=${e=>wearLook(L,e.currentTarget)}>${on?'Надето':miss.length?html`${I.coin()} ${cost}`:'Надеть'}</button>
       ${miss.length&&miss.length<L.items.length&&!on?html`<small className="need">${miss.length} ${plural(miss.length,'вещь','вещи','вещей')} докупить</small>`:null}</div>`; })}</div>
   <div className="chips cat-chips">${SLOTS.map(c=>html`<button key=${c.id} className="chip" id=${'cat-'+c.id} aria-pressed=${cat===c.id} onClick=${()=>{ SFX('tap'); setCat(c.id); }}>${c.name}</button>`)}</div>
   ${cat==='all'?SLOT_ORDER.map(sl=>html`<div key=${sl}><div className="sec-h shop-h"><h2>${SLOTS.find(x=>x.id===sl).name}</h2><span className="muted">${WORDY_ITEMS.filter(i=>i.slot===sl&&owned.includes(i.id)).length} из ${WORDY_ITEMS.filter(i=>i.slot===sl).length}</span></div>
       <div className="shop-grid">${WORDY_ITEMS.filter(i=>i.slot===sl).map(card)}</div></div>`)
     :html`<div className="shop-grid">${items.map(card)}</div>`}`;
}

/* ---------- achievements ---------- */
const learnedTotal=st=>ALL.filter(w=>(st.boxes[w.id]||0)>=2).length;
const AIC=__WD[989];
const ACH=[
  {id:'first',title:'Первый шаг',desc:'Пройди первую тему со словами',icon:'flag',c:'#FF7A12',val:st=>Object.keys(st.best||{}).length,goal:1},
  {id:'w10',title:'Словарный запас',desc:'Выучи 10 слов',icon:'book',c:'#12A195',val:learnedTotal,goal:10},
  {id:'w50',title:'Книжный червь',desc:'Выучи 50 слов',icon:'book',c:'#12A195',val:learnedTotal,goal:50},
  {id:'w100',title:'Ходячий словарь',desc:'Выучи 100 слов',icon:'book',c:'#0E7C72',val:learnedTotal,goal:100},
  {id:'s3',title:'В ритме',desc:'Занимайся 3 дня подряд',icon:'flame',c:'#F2541B',val:st=>st.streak,goal:3},
  {id:'s7',title:'Неделя без пропусков',desc:'Занимайся 7 дней подряд',icon:'flame',c:'#D9480F',val:st=>st.streak,goal:7},
  {id:'perfect',title:'Безупречно',desc:'Пройди тест без единой ошибки',icon:'target',c:'#7C5CFF',val:st=>st.perfects||0,goal:1},
  {id:'g1',title:'Грамматист',desc:'Пройди первый уровень грамматики',icon:'aa',c:'#7C5CFF',val:gPassed,goal:1},
  {id:'g15',title:'Звездочёт',desc:'Собери 15 звёзд в грамматике',icon:'star',c:'#E0A100',val:gStarsTotal,goal:15},
  {id:'gall',title:'Мастер грамматики',desc:'Пройди все '+GL.length+' уровней',icon:'crown',c:'#E0A100',val:gPassed,goal:GL.length},
  {id:'reader',title:'Книголюб',desc:'Прочитай 3 текста',icon:'book',c:'#12A195',val:st=>Object.keys(st.reads||{}).length,goal:3},
  {id:'ear',title:'Чуткий слух',desc:'Пройди 3 диктанта',icon:'target',c:'#2F7BFF',val:st=>st.listens||0,goal:3},
  {id:'lvlup',title:'Новая ступень',desc:'Перейди на следующий уровень',icon:'crown',c:'#7C5CFF',val:st=>st.levelUps||0,goal:1},
  {id:'daily3',title:'Утренний ритуал',desc:'Выучи слова дня 3 раза',icon:'sun',c:'#F2541B',val:st=>st.dailies||0,goal:3},
  {id:'rev',title:'Повторение — мать учения',desc:'Пройди 3 повторения',icon:'repeat',c:'#12A195',val:st=>st.reviews||0,goal:3},
  {id:'shop',title:'Первая покупка',desc:'Купи вещь для Ворди',icon:'bag',c:'#E11D48',val:st=>(st.owned||[]).length,goal:1},
  {id:'style',title:'Модник',desc:'Надень на Ворди 3 вещи сразу',icon:'hanger',c:'#E11D48',val:st=>Object.values(st.equip||{}).filter(Boolean).length,goal:3},
  {id:'rich',title:'Копилка',desc:'Накопи 500 монет',icon:'coin',c:'#E0A100',val:st=>st.coins,goal:500}];
const ACH_REWARD=25;
function AchBadge({a,on,size}){ size=size||48;
  return html`<span className=${'ach-badge'+(on?' on':'')} style=${{'--c':a.c,width:size+'px',height:size+'px'}}>
    <svg width=${size*.5} height=${size*.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" dangerouslySetInnerHTML=${{__html:AIC[a.icon]}}></svg></span>`; }
function AchToast({a,onDone}){
  const ref=useRef(null);
  useEffect(()=>{ SFX('unlock'); const t1=setTimeout(()=>FX('confetti',ref.current,40),120); const t2=setTimeout(onDone,3400); return ()=>{ clearTimeout(t1); clearTimeout(t2); }; },[a.id]);
  return html`<div className="ach-toast" ref=${ref} role="status" onClick=${onDone}>
    <${AchBadge} a=${a} on=${true} size=${46}/>
    <div><span className="eyebrow">Новое достижение</span><b>${a.title}</b><small>${a.desc} · +${ACH_REWARD} монет</small></div></div>`;
}
function Achievements({st}){
  const got=st.ach||{};
  const n=ACH.filter(a=>got[a.id]).length;
  return html`<div className="sec-h"><h2>Достижения</h2><span className="muted">${n} / ${ACH.length}</span></div>
    <div className="ach-grid">${ACH.map((a,i)=>{ const on=!!got[a.id], v=Math.min(a.val(st),a.goal);
      return html`<div key=${a.id} className=${'ach enter'+(on?' on':'')} style=${{'--i':i,'--c':a.c}}>
        <${AchBadge} a=${a} on=${on}/>
        <div className="ach-main"><b>${a.title}</b><small>${a.desc}</small>
          ${on?html`<span className="ach-done">Получено</span>`:html`<span className="ach-prog"><span className="bar"><i style=${{width:(v/a.goal*100)+'%'}}></i></span><em>${v}/${a.goal}</em></span>`}</div></div>`;})}</div>`;
}

/* ---------- level-aware helpers ---------- */
const uKnown=(st,u)=>!!st.level&&lvlIdx(u.cefr)<lvlIdx(st.level);
const gKnown=(st,i)=>!!st.level&&lvlIdx(GL[i].cefr)<lvlIdx(st.level);
const isInt=st=>false; /* «Интенсив» убран: открыто всё до выбранного уровня, уровень меняется свободно */
const G_START=new Set(['abc','rules','ipa','svo']);
const G_SKIP=new Set(['irr','movep','sugg','art2','deppr','wantyou','seem']); /* необязательный урок: не блокирует следующий */
const gDone=(st,j)=>j>=0&&(gKnown(st,j)||(((st.gstars||{})[GL[j].id]||0)>=1));
const gOpen=(st,i)=>isInt(st)||!(st.level&&lvlIdx(GL[i].cefr)>lvlIdx(st.level))&&(i===0||G_START.has(GL[i].id)||G_START.has(GL[i-1].id)||gDone(st,i)||gDone(st,i-1)||(G_SKIP.has(GL[i-1].id)&&gDone(st,i-2)));
function gCurrent(st){ const gs=st.gstars||{}; const i=GL.findIndex((l,k)=>!gKnown(st,k)&&!((gs[l.id]||0)>=1)); return i<0?GL.length-1:i; }
function pickDaily(st){
  const li=lvlIdx(st.level||'A1'), n=st.dailyNew||10;
  const pool=ALL.filter(w=>st.boxes[w.id]==null&&lvlIdx(w.cefr)===li);
  // interleave tracks so the set is varied, easiest suitable level first
  const byLvl=[...pool].sort((a,b)=>lvlIdx(a.cefr)-lvlIdx(b.cefr));
  const first=byLvl.length?lvlIdx(byLvl[0].cefr):li;
  const tier=byLvl.filter(w=>lvlIdx(w.cefr)<=first+1);
  const groups={}; tier.forEach(w=>{ (groups[w.track]=groups[w.track]||[]).push(w); });
  const keys=Object.keys(groups), out=[];
  for(let r=0;out.length<n&&keys.some(k=>groups[k].length);r++) keys.forEach(k=>{ if(out.length<n&&groups[k].length) out.push(groups[k].shift()); });
  return out.map(w=>w.id);
}
const LEVELS=__WD[990];

/* neutral age question (Google Play Families): under 13 the AI features are off, so nothing a child writes or says leaves the device for AI */
const AGES=[['u13','До 13 лет'],['teen','13–17 лет'],['adult','18 и старше']];
const AgeChips=({v,set,pre})=>html`<div className="chips" role="group" aria-label="Возраст">${AGES.map(([k,l])=>html`<button key=${k} className="chip" id=${(pre||'age-')+k} aria-pressed=${v===k} onClick=${()=>{ SFX('tap'); set(k); }}>${l}</button>`)}</div>`;
function Onboarding({onDone,onRestore,st,update}){
  const [lvl,setLvl]=useState(null), [n,setN]=useState(10), [age,setAge]=useState(null), [lc,setLc]=useState(false);
  return html`<div className="onb-wrap" role="dialog" aria-modal="true" aria-labelledby="onb-title">
    <div className="onb enter" data-perch="onb">
      <span className="eyebrow">Добро пожаловать в Wordy</span>
      <h1 id="onb-title">Привет! Я Ворди. Подберём уроки под тебя?</h1>
      <h2>Какой у тебя уровень английского?</h2>
      <div className="lvl-list">${LEVELS.map(x=>html`<button key=${x.l} id=${'lvl-'+x.l} className="lvl-opt" aria-pressed=${lvl===x.l} onClick=${()=>{ SFX('tap'); setLvl(x.l); W('react','nod'); }}>
        <span className="lvl-code">${x.l}</span><span><b>${x.name}</b><small>${x.d}</small></span></button>`)}</div>
      ${canLiveVoice()&&st?html`<button className="btn ghost wide lc-btn" id="onb-voice" disabled=${!age||age==='u13'} onClick=${()=>{ SFX('pop'); window.__wordyKid=false; setLc(true); }}>🎙 Определить уровень голосом · 3 мин${!age?html`<small>сначала выбери возраст ниже</small>`:age==='u13'?html`<small>доступно с 13 лет</small>`:null}</button>`:null}
      ${lc?html`<${LevelCheck} st=${st} update=${update} onClose=${()=>setLc(false)} onPick=${l=>{ setLc(false); setLvl(l); W('react','cheer'); }}/>`:null}
      ${lvl?html`<p className="onb-note">Сначала откроются слова, идиомы и грамматика уровня ${lvl}. Выучишь 60% слов и грамматики уровня, и на весь экран придёт поздравление с переходом на ${nextLevel(lvl)||'финиш'}.${lvl!=='A1'?' Всё, что ниже '+lvl+', будет отмечено как знакомое.':''}</p>`:null}
      <h2>Сколько новых слов в день?</h2>
      <div className="chips">${[5,10,15,20].map(k=>html`<button key=${k} className="chip" id=${'dn-'+k} aria-pressed=${n===k} onClick=${()=>{ SFX('tap'); setN(k); }}>${k} слов <small>≈ ${Math.max(3,Math.round(k*.8))} мин</small></button>`)}</div>
      <h2>Сколько тебе лет?</h2>
      <${AgeChips} v=${age} set=${setAge}/>
      <button className="btn wide" id="onb-start" disabled=${!lvl||!age} onClick=${()=>onDone(lvl,n,age)}>Начать учиться</button>
      ${onRestore?html`<label className="onb-restore">Уже занимался на другом устройстве? <b>Восстановить из файла</b><input type="file" accept=".json,application/json" hidden id="onb-file" onChange=${e=>{ const f=e.target.files&&e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ const o=readBackup(String(r.result||'')); if(o&&o.state.level) onRestore(o.state); else { SFX('wrong'); W('say','Это не файл прогресса Wordy.',0,true); } }; r.readAsText(f); }}/></label>`:null}
      <button className="link-btn" id="onb-skip" disabled=${!age} onClick=${()=>onDone('A1',n,age)}>${age?'Не знаю свой уровень, начну с A1':'Не знаю свой уровень (сначала выбери возраст)'}</button>
    </div></div>`;
}

function DailyCard({st,startDaily}){
  const d=st.daily; if(!d||!d.ids||!d.ids.length) return null;
  const words=d.ids.map(id=>ALL.find(w=>w.id===id)).filter(Boolean);
  return html`<button className=${'daily-card enter'+(d.done?' done':'')} id="daily-btn" style=${{'--i':1}} disabled=${d.done} onClick=${startDaily}>
    <span className="dc-top"><span className="dc-eyebrow">Слова дня · уровень ${st.level}</span><span className="dc-n">${d.done?'✓':words.length}</span></span>
    <b>${d.done?'Слова дня выучены!':'Новые слова на сегодня'}</b>
    <span className="dc-words">${words.slice(0,6).map(w=>html`<span key=${w.id}>${w.en}</span>`)}${words.length>6?html`<span className="more">+${words.length-6}</span>`:null}</span>
    <small>${d.done?'Завтра будет новая подборка. Эти слова уже в повторении.':'Карточки, потом короткий тест. Слова попадут в ежедневное повторение.'}</small>
  </button>`;
}

/* ---------- level progression ---------- */
const uAbove=(st,u)=>!isInt(st)&&!!st.level&&lvlIdx(u.cefr)>lvlIdx(st.level);
const unitPassed=(st,u)=>(st.best[u.id]||0)>=Math.ceil(u.words.length*.6);
const ALL_UNITS=TRACKS.flatMap(t=>t.units.map(u=>({...u,track:t.id,trackName:t.name})));
const PASS=0.6;
function levelProgress(st,L){
  L=L||st.level;
  const units=ALL_UNITS.filter(u=>u.cefr===L), gram=GL.filter(g=>g.cefr===L);
  const words=units.flatMap(u=>u.words), wd=words.filter(w=>(st.boxes[w.id]||0)>=2).length;
  const gd=gram.filter(g=>((st.gstars||{})[g.id]||0)>=1).length;
  const total=words.length+gram.length, done=wd+gd;
  // переход на следующий уровень: PASS (60%) слов и PASS грамматики уровня
  const needW=Math.ceil(words.length*PASS), needG=Math.ceil(gram.length*PASS), need=needW+needG;
  const got=Math.min(wd,needW)+Math.min(gd,needG);
  return {L,units:units.length,words:words.length,wd,gram:gram.length,gd,total,done,needW,needG,
    pct:need?got/need:1,complete:total>0&&wd>=needW&&gd>=needG};
}
const nextLevel=L=>CEFR[lvlIdx(L)+1]||null;
try{ if(/[?&]wtest=1/.test(location.search)) window.__wordyT={levelProgress:(...a)=>levelProgress(...a),units:()=>ALL_UNITS,gl:()=>GL}; }catch(e){}
const LEVEL_NAMES={A1:'Начинающий',A2:'Элементарный',B1:'Средний',B2:'Выше среднего',C1:'Продвинутый'};

function LevelCard({st,onShow}){
  const p=levelProgress(st), nx=nextLevel(st.level);
  return html`<button className="level-card enter" id="level-card" onClick=${onShow} aria-label=${'Уровень '+st.level+': пройдено '+p.done+' из '+p.total}>
    <span className="lc-badge">${st.level}</span>
    <span className="lc-main"><b>${LEVEL_NAMES[st.level]}</b>
      <small>${p.complete?'Уровень пройден!':nx?'Следующий — '+nx+': пройди 60% слов и 60% грамматики или смени уровень в Настройках':'Финальный уровень курса'}</small>
      <span className="bar"><i style=${{width:(p.pct*100)+'%'}}></i></span>
      <span className="lc-parts"><span className=${p.wd>=p.needW?'ok':''}>Слова ${p.wd}/${p.needW}</span><span className=${p.gd>=p.needG?'ok':''}>Грамматика ${p.gd}/${p.needG}</span></span></span>
    ${nx?html`<span className="lc-next" aria-hidden="true">${nx}</span>`:null}
  </button>`;
}

function LevelUp({from,to,onGo}){
  const ref=useRef(null);
  useEffect(()=>{
    SFX('levelup');
    const t1=setTimeout(()=>FX('rain',220),250), t2=setTimeout(()=>FX('confetti',ref.current,90),900), t3=setTimeout(()=>FX('rain',140),1900);
    W('react','cheer'); W('say',to?'Ура! Ты перешёл на '+to+'!':'Ты прошёл весь курс! Я так горжусь!',4000,true);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  },[]);
  const p=to?ALL_UNITS.filter(u=>u.cefr===to).length:0, g=to?GL.filter(x=>x.cefr===to).length:0;
  return html`<div className="lvlup" role="dialog" aria-modal="true" aria-labelledby="lvlup-t">
    <div className="lvlup-rays" aria-hidden="true"></div>
    <div className="lvlup-card" data-perch="levelup">
      <span className="eyebrow">${to?'Новый уровень':'Курс пройден'}</span>
      <div className="lvlup-codes" ref=${ref}><span className="old">${from}</span><span className="arrow">→</span><span className="new">${to||'★'}</span></div>
      <h1 id="lvlup-t">${to?'Поздравляем! Теперь ты '+to+' · '+LEVEL_NAMES[to]:'Ты прошёл все уровни от A1 до C1!'}</h1>
      <p>${to?'Все слова и вся грамматика уровня '+from+' выучены. Открыто '+p+' '+plural(p,'новая тема','новые темы','новых тем')+' и '+g+' '+plural(g,'урок','урока','уроков')+' грамматики.':'Невероятная работа. Повторяй слова каждый день, чтобы не забыть.'}</p>
      <div className="rewards"><span className="pill">${I.coin()} +100</span><span className="pill">${I.bolt()} +200 XP</span></div>
      <button className="btn wide" id="lvlup-go" onClick=${onGo}>${to?'Начать уровень '+to:'Ура!'}</button>
    </div></div>`;
}

/* ---------- reading texts ---------- */
const TEXTS=__WD[991];
/* ---------- reading texts pack 2 ---------- */
TEXTS.push(
 __WD[992],
 __WD[993],
 __WD[994],
 __WD[995],
 __WD[996],
 __WD[997],
 __WD[998],
 __WD[999],
 __WD[1000],
 __WD[1001],
 __WD[1002],
 __WD[1003],
 __WD[1004],
 __WD[1005],
 __WD[1006],
 __WD[1007],
 __WD[1008],
 __WD[1009]
);
/* ---------- reading texts pack 3 ---------- */
TEXTS.push(
 __WD[1010],
 __WD[1011],
 __WD[1012],
 __WD[1013],
 __WD[1014],
 __WD[1015],
 __WD[1016],
 __WD[1017],
 __WD[1018],
 __WD[1019],
 __WD[1020],
 __WD[1021],
 __WD[1022],
 __WD[1023],
 __WD[1024],
 __WD[1025],
 __WD[1026],
 __WD[1027],
 __WD[1028],
 __WD[1029]
);
/* rotate answer options of pack 3 so the correct one isn't always in the same slot */
TEXTS.forEach((t,ti)=>{ if(+t.id.slice(1)>30) t.q.forEach((q,qi)=>{ const k=(ti*3+qi*5+1)%q[1].length, c=q[1][q[2]]; q[1]=q[1].slice(k).concat(q[1].slice(0,k)); q[2]=q[1].indexOf(c); }); });
/* reading library: science, interesting facts, literature (retellings + public-domain poems) */
TEXTS.forEach(t=>{ if(!t.cat) t.cat='life'; });
TEXTS.push(
__WD[1030],
__WD[1031],
__WD[1032],
__WD[1033],
__WD[1034],
__WD[1035],
__WD[1036],
__WD[1037],
__WD[1038],
__WD[1039],
__WD[1040],
__WD[1041],
__WD[1042],
__WD[1043],
__WD[1044],
__WD[1045],
__WD[1046],
__WD[1047],
__WD[1048],
__WD[1049],
__WD[1050],
__WD[1051],
__WD[1052],
__WD[1053],
__WD[1054],
__WD[1055],
__WD[1056],
__WD[1057],
__WD[1058],
__WD[1059],
__WD[1060],
__WD[1061],
__WD[1062],
__WD[1063],
__WD[1064],
__WD[1065],
__WD[1066],
__WD[1067],
__WD[1068],
__WD[1069],
__WD[1070],
__WD[1071],
__WD[1072],
__WD[1073],
__WD[1074],
__WD[1075],
__WD[1076],
__WD[1077],
__WD[1078],
__WD[1079],
__WD[1080],
__WD[1081],
__WD[1082],
__WD[1083],
__WD[1084],
__WD[1085],
__WD[1086],
__WD[1087],
__WD[1088],
__WD[1089],
__WD[1090],
__WD[1091],
__WD[1092],
__WD[1093],
__WD[1094],
__WD[1095],
__WD[1096],
__WD[1097],
__WD[1098],
__WD[1099],
__WD[1100],
__WD[1101],
__WD[1102],
__WD[1103],
__WD[1104],
__WD[1105],
__WD[1106],
__WD[1107],
__WD[1108],
__WD[1109],
__WD[1110],
__WD[1111],
__WD[1112],
__WD[1113],
__WD[1114],
__WD[1115],
__WD[1116],
__WD[1117],
__WD[1118],
__WD[1119]
);

/* ---------- word lookup for reading ---------- */
const LOOK=(()=>{ const m=new Map(); ALL.forEach(w=>{ const k=w.en.toLowerCase(); if(!m.has(k)) m.set(k,w); }); return m; })();
const MAXN=6;
function lemmas(t){ const c=[t];
  if(t.endsWith("'s")) c.push(t.slice(0,-2));
  if(t.endsWith('ies')) c.push(t.slice(0,-3)+'y');
  if(t.endsWith('es')) c.push(t.slice(0,-2));
  if(t.endsWith('s')) c.push(t.slice(0,-1));
  if(t.endsWith('ied')) c.push(t.slice(0,-3)+'y');
  if(t.endsWith('ed')){ c.push(t.slice(0,-2)); c.push(t.slice(0,-1)); if(t.length>5&&t[t.length-3]===t[t.length-4]) c.push(t.slice(0,-3)); }
  if(t.endsWith('ing')){ c.push(t.slice(0,-3)); c.push(t.slice(0,-3)+'e'); if(t.length>6&&t[t.length-4]===t[t.length-5]) c.push(t.slice(0,-4)); }
  if(t.endsWith('ly')) c.push(t.slice(0,-2));
  return c; }
function tokenize(text,minLvl){
  const parts=text.split(/([A-Za-z'’-]+)/), out=[];
  for(let i=0;i<parts.length;i++){
    if(i%2===0){ if(parts[i]) out.push({t:parts[i]}); continue; }
    let hit=null, end=i;
    for(let n=MAXN;n>=1&&!hit;n--){
      const ws=[]; let ok=true, k=i;
      for(let c=0;c<n;c++){ if(k>=parts.length){ ok=false; break; } ws.push(parts[k].toLowerCase().replace(/’/g,"'")); if(c<n-1){ if(parts[k+1]!==' '){ ok=false; break; } k+=2; } }
      if(!ok) continue;
      const last=ws.pop();
      for(const L of lemmas(last)){ const key=[...ws,L].join(' '); const w=LOOK.get(key);
        if(w&&key.length>2&&lvlIdx(w.cefr)>=minLvl){ hit=w; end=k; break; } }
    }
    if(hit){ out.push({t:parts.slice(i,end+1).join(''),w:hit}); i=end; } else out.push({t:parts[i]});
  }
  return out;
}
const textWords=x=>x.p.join(' ').split(/\s+/).length;
function speakText(t,rate,onend){
  try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang='en-US'; u.rate=rate||.9;
    if(onend) u.onend=onend; speechSynthesis.speak(u); W('talk',Math.min(30,t.length/14/(rate||.9))); }catch(e){} }
function stopSpeak(){ try{ speechSynthesis.cancel(); W('talk',0); }catch(e){} }

/* ---------- word card 2.0 ----------
   WREL: synonyms, antonyms and word family inside the course, from Open English WordNet (CC BY 4.0, based on Princeton WordNet),
   filtered by meaning and checked by hand. WFF: false friends for Russian speakers. The rest comes from the AI on request. */
const WREL=__WD[1120];
const WFF=__WD[1121];
let _wbyEn=null; const wordByEn=en=>{ if(!_wbyEn){ _wbyEn=new Map(); ALL.forEach(w=>{ const k=w.en.toLowerCase(); if(!_wbyEn.has(k)) _wbyEn.set(k,w); }); } return _wbyEn.get(String(en).toLowerCase()); };
const wordRel=w=>{ const r=WREL[w.en]||[[],[],[]]; return {syn:r[0],ant:r[1],fam:r[2],ff:WFF[w.en]||null}; };
const wxPrompt=w=>'Help a Russian-speaking learner remember the English word "'+w.en+'" in this meaning: '+w.ru+(w.def?' ("'+w.def+'")':'')+'. Level '+(w.cefr||'B1')+'.'
  +' Use only real, common, natural English. Reply with ONLY JSON: {"collocations":[{"en":"make a decision","ru":"принять решение"}],"synonyms":[{"en":"word","note":"чем отличается, коротко по-русски"}],"antonyms":[{"en":"word","ru":"перевод"}],"family":[{"en":"decision","pos":"noun","ru":"решение"}],"tip":"одна короткая подсказка по-русски: как запомнить слово или не перепутать его"}'
  +' — 3 to 4 most frequent collocations with this word; up to 3 synonyms and up to 2 antonyms in this meaning (empty arrays if there are no good ones); up to 4 words of the same family (not the word itself).';
const wxKey=w=>'wordy.wx1.'+w.en.toLowerCase();
/* chips for related words: tap to open that word, if the course has it */
function RelChips({label,list,onOpen,anti}){ if(!list||!list.length) return null;
  return html`<div className="wrel-row"><span className="wrel-l">${label}</span><div className="wrel-chips">${list.map(x=>{ const t=typeof x==='string'?x:x.en, w2=wordByEn(t), ru=(typeof x==='object'&&x.ru)||(w2&&w2.ru)||'';
    return html`<button key=${t} className=${'wrel-chip'+(anti?' anti':'')} disabled=${!w2||!onOpen} title=${(typeof x==='object'&&x.note)||''} onClick=${()=>{ SFX('tap'); onOpen&&w2&&onOpen(w2); }}><b>${t}</b>${ru?html`<small>${ru.split(/[;,(]/)[0].trim()}</small>`:null}${typeof x==='object'&&x.note?html`<small className="wrel-note">${x.note}</small>`:null}</button>`; })}</div></div>`; }
/* the known part (instant) + «Ещё о слове» from the AI, cached on this device */
function CardRel({w,onMore}){ const r=wordRel(w); const bits=[r.syn.length?'= '+r.syn.slice(0,3).join(', '):null,r.ant.length?'≠ '+r.ant.slice(0,2).join(', '):null].filter(Boolean);
  return html`${r.ff?html`<div className="wff small"><b>Ложный друг!</b> ${r.ff}</div>`:null}<div className="card-rel-row">${bits.length?html`<span className="card-rel-t">${bits.join('  ·  ')}</span>`:null}<button className="link-btn" id="card-more" onClick=${e=>{ e.stopPropagation(); SFX('tap'); onMore(); }}>Подробнее о слове</button></div>`; }
function WordMore({w,onOpen,compact}){ const ai=useSample(); const r=wordRel(w);
  const [x,setX]=useState(()=>{ try{ return JSON.parse(localStorage.getItem(wxKey(w))||'null'); }catch(e){ return null; } }), [busy,setBusy]=useState(false), [err,setErr]=useState(null);
  useEffect(()=>{ try{ setX(JSON.parse(localStorage.getItem(wxKey(w))||'null')); }catch(e){ setX(null); } setErr(null); },[w.en]);
  const load=async()=>{ if(!ai||busy) return; setBusy(true); setErr(null);
    try{ const j=await ai.json(wxPrompt(w),null,{fast:true}); const arr=(a,n)=>Array.isArray(a)?a.filter(o=>o&&o.en&&String(o.en).toLowerCase()!==w.en.toLowerCase()).slice(0,n).map(o=>({en:String(o.en),ru:String(o.ru||''),note:String(o.note||''),pos:String(o.pos||'')})):[];
      const v={col:arr(j.collocations,4),syn:arr(j.synonyms,3),ant:arr(j.antonyms,2),fam:arr(j.family,4),tip:String(j.tip||'')}; setX(v); try{ localStorage.setItem(wxKey(w),JSON.stringify(v)); }catch(e){} SFX('pop'); }
    catch(e){ setErr(aiErr(e)); } finally{ setBusy(false); } };
  const syn=r.syn.length?r.syn:(x?x.syn:[]), ant=r.ant.length?r.ant:(x?x.ant:[]), fam=r.fam.length?r.fam:(x?x.fam:[]);
  return html`<div className=${'wmore'+(compact?' compact':'')}>
    ${r.ff?html`<div className="wff" role="note"><b>Ложный друг!</b> ${w.en} — ${r.ff}</div>`:null}
    <${RelChips} label="Синонимы" list=${syn} onOpen=${onOpen}/>
    <${RelChips} label="Антонимы" list=${ant} onOpen=${onOpen} anti=${true}/>
    <${RelChips} label="Однокоренные" list=${fam} onOpen=${onOpen}/>
    ${x&&x.col.length?html`<div className="wrel-row"><span className="wrel-l">Сочетания</span><ul className="wcol">${x.col.map(c=>html`<li key=${c.en}><b>${c.en}</b> — ${c.ru}</li>`)}</ul></div>`:null}
    ${x&&x.tip?html`<p className="wtip">💡 ${x.tip}</p>`:null}
    ${x?html`<${AiReport} what=${'карточка слова '+w.en} text=${JSON.stringify(x)}/>`
      :ai?html`<button className="btn ghost small wx-btn" id="wx-load" disabled=${busy} onClick=${load}>${busy?'Ворди думает…':html`${MI.spark()} Ещё о слове: сочетания${r.syn.length?'':', синонимы'} и подсказка`}</button>`:null}
    ${err?html`<p className="mk-err">${err}</p>`:null}
  </div>`; }
function WordSheet({w:w0,st,update,onClose,open}){
  const [w,setW]=useState(w0); const b=st.boxes[w.id]; const [shown,setShown]=useState(!!open);
  const add=()=>{ SFX('pop'); update(s=>({boxes:{...s.boxes,[w.id]:s.boxes[w.id]==null?0:s.boxes[w.id]},due:{...(s.due||{}),[w.id]:dayKey()}})); W('react','happy'); W('say','Добавил в повторение!',0,true); onClose(); };
  return html`<div className="sheet-wrap" onClick=${onClose}><div className="sheet word-sheet enter" role="dialog" aria-label=${w.en} onClick=${e=>e.stopPropagation()}>
    <div className="sheet-h"><div><b>${w.en}</b><div className="ipa">${w.ipa}</div></div>
      <div className="ws-btns">${canSpeak?html`<button className="icon-btn" id="ws-speak" aria-label="Произнести" onClick=${()=>speakText(w.en,.85)}>${I.speaker()}</button>`:null}
      <button className="icon-btn" id="ws-close" aria-label="Закрыть" onClick=${()=>{ SFX('tap'); onClose(); }}>${I.close()}</button></div></div>
    ${shown?html`<div className="tr">${w.ru}</div><p className="def">${w.def}</p><p className="ex">${highlight(w.ex,w.en)}</p><${WordMore} w=${w} onOpen=${w2=>{ setW(w2); setShown(true); }}/>`:html`<button className="btn ghost wide" id="ws-tr" onClick=${()=>{ SFX('pop'); setShown(true); }}>Перевод</button>`}
    <div className="ws-foot"><span className="cefr-chip">${w.cefr}</span>
      ${b==null?html`<button className="btn" id="ws-add" onClick=${add}>Добавить в изучение</button>`:html`<span className=${'ws-state'+(b>=2?' ok':'')}>${b>=2?'✓ Выучено':'В изучении'}</span>`}</div>
  </div></div>`;
}

const READ_CATS=[{id:'all',name:'Все'},{id:'life',name:'Повседневные'},{id:'sci',name:'Наука'},{id:'facts',name:'Интересные факты'},{id:'lit',name:'Литература'}];
function ReadList({st,openText}){
  const L=lvlIdx(st.level||'A1'); const [cat,setCatRaw]=useState(()=>{ try{ return localStorage.getItem('wordy.rcat')||'all'; }catch(e){ return 'all'; } });
  const setCat=c=>{ SFX('tap'); setCatRaw(c); try{ localStorage.setItem('wordy.rcat',c); }catch(e){} };
  const list=TEXTS.filter(x=>cat==='all'||x.cat===cat).slice().sort((a,b)=>(cat==='all'?0:lvlIdx(a.cefr)-lvlIdx(b.cefr)));
  const done=list.filter(x=>(st.reads||{})[x.id]!=null).length;
  return html`<div className="sec-h"><h2>Чтение</h2><span className="muted">${done} / ${list.length}</span></div>
    <div className="chips cat-chips read-cats" role="tablist" aria-label="Тексты">${READ_CATS.map(c=>html`<button key=${c.id} role="tab" className="chip" id=${'rcat-'+c.id} aria-pressed=${cat===c.id} aria-selected=${cat===c.id} onClick=${()=>setCat(c.id)}>${c.name} <small>${c.id==='all'?TEXTS.length:TEXTS.filter(x=>x.cat===c.id).length}</small></button>`)}</div>
    <p className="hint-line">${cat==='lit'?'Сказки и классика в пересказе для изучающих английский, а стихи — в оригинале. Нажми на слово, чтобы узнать перевод.':cat==='sci'?'Научно-популярные тексты: космос, тело человека, технологии и природа.':cat==='facts'?'Удивительные, но правдивые факты — от осьминогов до Иссык-Куля.':'Нажми на любое слово, чтобы увидеть перевод. Подсвеченные — слова из курса, их можно сразу добавить в изучение.'}</p>
    <div className="glist">${list.map((x,k)=>{ const lk=!isInt(st)&&lvlIdx(x.cefr)>L, r=(st.reads||{})[x.id];
      return html`<button key=${x.id} className=${'grow read-row enter'+(r!=null?' done':'')} style=${{'--i':Math.min(k,14)}} id=${'text-'+x.id} disabled=${lk} onClick=${()=>openText(x.id)}>
        <span className="grow-n">${lk?I.lock():I.learn()}</span>
        <span className="grow-main"><b>${x.title}</b><small>${x.ru} · ${x.poem?'стихи':isLong(x)?textPages(x).length+' стр. · ~'+readMins(x)+' мин':textWords(x)+' слов'}${(st.rbook||{})[x.id]>0&&r==null?' · закладка: стр. '+((st.rbook||{})[x.id]+1):''}</small>${x.about?html`<small className="read-about">${x.about.split(' · ')[0]}</small>`:null}</span>
        <span className="read-side"><span className="cefr-chip">${x.cefr}</span>${lk?html`<small className="muted">с уровня ${x.cefr}</small>`:r!=null?html`<small className="ok-txt">${r}/${x.q.length}</small>`:null}</span></button>`; })}</div>`;
}

/* long texts are split into pages (~280 words); a paragraph starting with "## " opens a new chapter */
const textWc=t=>t.replace(/^## /,'').split(/\s+/).filter(Boolean).length;
const isLong=x=>textWords(x)>520;
const _pg=new Map();
function textPages(x){ if(_pg.has(x.id)) return _pg.get(x.id); const out=[]; let cur=null, ch=null;
  const push=()=>{ if(cur&&cur.paras.length) out.push(cur); cur=null; };
  if(!isLong(x)){ const r=[{ch:null,paras:x.p}]; _pg.set(x.id,r); return r; }
  x.p.forEach(par=>{ if(par.startsWith('## ')){ push(); ch=par.slice(3); cur={ch,head:true,paras:[]}; return; }
    if(!cur) cur={ch,head:false,paras:[]}; const w=cur.paras.reduce((a,q)=>a+textWc(q),0);
    if(w>0&&w+textWc(par)>330&&w>=200){ push(); cur={ch,head:false,paras:[]}; } cur.paras.push(par); });
  push(); _pg.set(x.id,out); return out; }
const readMins=x=>Math.max(1,Math.round(textWords(x)/110));
function Reader({x,st,update,onExit}){
  const pages=useMemo(()=>textPages(x),[x]), long=pages.length>1, last=pages.length-1;
  const [pg,setPg]=useState(()=>{ const b=(st.rbook||{})[x.id]; return long&&b!=null&&b<=last?b:0; }), [toc,setToc]=useState(false);
  const page=pages[Math.min(pg,last)];
  const toks=useMemo(()=>page.paras.map(p=>tokenize(p,Math.max(0,lvlIdx(x.cefr)-1))),[x,pg]);
  const [word,setWord]=useState(null); const [tapT,popT]=useWordTap({st,update,on:true,src:'Текст · '+x.title,names:x.names});
  const [ans,setAns]=useState({});
  const [playing,setPlaying]=useState(false);
  const [done,setDone]=useState(false);
  useEffect(()=>()=>stopSpeak(),[]);
  const chapters=useMemo(()=>pages.map((p,i)=>p.head?{i,ch:p.ch}:null).filter(Boolean),[pages]);
  const found=useMemo(()=>{ const m=new Map(); toks.flat().forEach(t=>{ if(t.w) m.set(t.w.id,t.w); }); return [...m.values()]; },[toks]);
  const play=()=>{ if(playing){ stopSpeak(); setPlaying(false); return; } SFX('tap'); setPlaying(true); speakText(page.paras.join(' ').replace(/^## /gm,''),.88,()=>{ setPlaying(false); W('talk',0); }); };
  const go=n=>{ if(n<0||n>last) return; stopSpeak(); setPlaying(false); SFX('tap'); setPg(n); setToc(false); window.scrollTo({top:0});
    if(long) update(s=>({rbook:{...(s.rbook||{}),[x.id]:n}}));
    if(n===last&&long) W('say','Последняя страница! Потом вопросы.',0,true); else if(long&&n===Math.floor(last/2)&&n>1) W('say','Уже половина! Интересно, что дальше?'); };
  const pickAns=(qi,oi)=>{ if(ans[qi]!=null||done) return; const ok=oi===x.q[qi][2]; setAns(a=>({...a,[qi]:oi}));
    const el=document.getElementById('rq-'+qi+'-'+oi);
    if(ok){ SFX('correct'); FX('sparkle',el); W('react','correct'); } else { SFX('wrong'); W('react','wrong'); }
    if(Object.keys(ans).length+1===x.q.length) setTimeout(()=>finish({...ans,[qi]:oi}),900); };
  const finish=a=>{ const sc=x.q.filter((q,i)=>a[i]===q[2]).length, all=sc===x.q.length, first=(st.reads||{})[x.id]==null, bonus=long&&first?pages.length*3:0, coins=sc*3+(all?10:0)+bonus;
    update(s=>({coins:s.coins+coins,xp:s.xp+sc*8+(long&&first?pages.length*10:0),reads:{...(s.reads||{}),[x.id]:Math.max((s.reads||{})[x.id]||0,sc)}}));
    setDone({sc,coins,bonus}); if(all){ SFX('fanfare'); FX('confetti',document.getElementById('read-result'),60); W('react','cheer'); W('say',long?'Ты прочитал целую книгу! Браво!':'Отлично прочитано!',0,true); }
    else { W('react','encourage'); W('say','Хорошо! Перечитай текст и попробуй ещё.',0,true); } };
  return html`<section>
    <div className="sess-top"><button className="icon-btn" id="read-close" onClick=${()=>{ SFX('tap'); stopSpeak(); onExit(); }} aria-label="Закрыть">${I.close()}</button>
      <div className="gm-h"><b>${x.title}</b><span className="muted">${x.ru} · ${x.cefr}</span></div></div>
    ${x.about?html`<p className="read-by" id="read-by">${x.about}</p>`:null}
    ${long?html`<div className="book-bar"><div className="bar"><i style=${{width:((pg+1)/pages.length*100)+'%'}}></i></div>
      <div className="book-meta"><span>Стр. ${pg+1} из ${pages.length}</span>${chapters.length>1?html`<button className="link-btn" id="book-toc" aria-expanded=${toc} onClick=${()=>{ SFX('tap'); setToc(!toc); }}>Оглавление</button>`:html`<span>~${readMins(x)} мин</span>`}</div>
      ${toc?html`<ol className="book-toc">${chapters.map(c=>html`<li key=${c.i}><button className=${'link-btn'+(c.i<=pg&&(chapters.find(d=>d.i>c.i)||{i:1e9}).i>pg?' on':'')} onClick=${()=>go(c.i)}>${c.ch}</button><span>стр. ${c.i+1}</span></li>`)}</ol>`:null}</div>`:null}
    <article className="reader wt-on enter" key=${'pg'+pg} data-perch="card" onClick=${tapT}>
      <div className="reader-tools">
        ${canSpeak?html`<button className=${'btn small'+(playing?' ghost':'')} id="read-play" onClick=${play}>${I.speaker()} ${playing?'Стоп':long?'Слушать страницу':'Слушать текст'}</button>`:null}
        <span className="muted">${found.length} ${plural(found.length,'слово','слова','слов')} из курса</span></div>
      ${page.head&&page.ch?html`<h3 className="book-ch">${page.ch}</h3>`:null}
      ${toks.map((ps,pi)=>html`<p key=${pi} className=${'rpara'+(x.poem?' poem':'')}>${ps.map((t,ti)=>t.w?html`<button key=${ti} className=${'rw'+((st.boxes[t.w.id]||0)>=2?' known':st.boxes[t.w.id]!=null?' learning':'')} onClick=${()=>{ SFX('tap'); setWord(t.w); }}>${t.t}</button>`:t.t)}</p>`)}
    </article>
    ${long?html`<div className="book-nav"><button className="btn ghost" id="pg-prev" disabled=${pg===0} onClick=${()=>go(pg-1)}>Назад</button><span className="muted">${pg+1} / ${pages.length}</span>
      ${pg<last?html`<button className="btn" id="pg-next" onClick=${()=>go(pg+1)}>Дальше</button>`:html`<span className="book-end">Конец</span>`}</div>`:null}
    ${pg===last?html`<div className="sec-h"><h2>Вопросы</h2><span className="muted">${Object.keys(ans).length} / ${x.q.length}</span></div>
    <div className="rqs">${x.q.map((q,qi)=>html`<div key=${qi} className="rq enter" style=${{'--i':qi}}>
      <b>${qi+1}. ${q[0]}</b>
      <div className="opts">${q[1].map((o,oi)=>{ const a=ans[qi]; const cls=a==null?'':oi===q[2]?' good':oi===a?' bad':' dim';
        return html`<button key=${oi} id=${'rq-'+qi+'-'+oi} className=${'opt'+cls} disabled=${a!=null} onClick=${()=>pickAns(qi,oi)}><span className="k">${a==null?oi+1:oi===q[2]?'✓':oi===a?'✕':oi+1}</span><span>${o}</span></button>`; })}</div></div>`)}</div>`:null}
    ${done?html`<div className="result enter" id="read-result"><div className="score"><${CountUp} to=${done.sc}/><small>/${x.q.length}</small></div>
      <p>${done.sc===x.q.length?'Всё понял правильно!':'Перечитай места с ошибками и попробуй снова.'}</p>
      <div className="rewards"><span className="pill">${I.coin()} +${done.coins}</span>${done.bonus?html`<span className="pill">за ${pages.length} стр.</span>`:null}</div>
      <div className="actions"><button className="btn ghost" id="read-again" onClick=${()=>{ SFX('pop'); setAns({}); setDone(false); if(long) go(0); else window.scrollTo({top:0}); }}>${long?'Читать заново':'Ещё раз'}</button><button className="btn" id="read-done" onClick=${()=>{ SFX('tap'); onExit(); }}>К текстам</button></div></div>`:null}
    ${word?html`<${WordSheet} w=${word} st=${st} update=${update} onClose=${()=>setWord(null)}/>`:null}${popT}<${TextAsk} on=${true} scope=".reader" level=${st.level}/>
  </section>`;
}

/* ---------- listening ---------- */
function makeListening(st){
  const L=lvlIdx(st.level||'A1');
  const pool=ALL.filter(w=>w.track!=='idioms'&&!/\s/.test(w.en)&&lvlIdx(w.cefr)<=L&&lvlIdx(w.cefr)>=L-1).map(w=>{
    const stem=w.en.slice(0,Math.max(4,w.en.length-2)).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const m=w.ex.match(new RegExp('\\b('+stem+"[\\w']*)",'i')); return m?{w,form:m[1],idx:m.index}:null; }).filter(Boolean);
  const seen=pool.filter(x=>st.boxes[x.w.id]!=null), rest=pool.filter(x=>st.boxes[x.w.id]==null);
  return shuffle([...shuffle(seen).slice(0,5),...shuffle(rest)]).slice(0,8);
}
function ListenList({st,startListen}){
  return html`<div className="sec-h"><h2>Аудирование</h2><span className="muted">пройдено ${st.listens||0}</span></div>
    <button className="listen-card enter" id="listen-start" onClick=${startListen} disabled=${!canSpeak}>
      <span className="lc-ic">${I.speaker()}</span>
      <span className="lc-main"><b>Диктант с Ворди</b><small>${canSpeak?'Ворди читает предложение, а ты вписываешь пропущенное слово. 8 предложений уровня '+(st.level||'A1')+'.':'На этом устройстве нет озвучки текста. Попробуй другой браузер.'}</small></span>
      <span className="btn small" aria-hidden="true">Начать</span></button>
    <p className="hint-line">Совет: сначала слушай на обычной скорости, а если не понял — нажми «Медленно».</p>`;
}
function Listening({st,update,onExit}){
  const [items]=useState(()=>makeListening(st));
  const [i,setI]=useState(0), [val,setVal]=useState(''), [chk,setChk]=useState(null), [res,setRes]=useState([]), [fin,setFin]=useState(null);
  const inRef=useRef(null);
  const it=items[i];
  const play=r=>{ if(!it) return; speakText(it.w.ex,r||.9); };
  useEffect(()=>{ if(!it||fin) return; const t=setTimeout(()=>{ play(.9); try{ inRef.current&&inRef.current.focus({preventScroll:true}); }catch(e){} },500); return ()=>clearTimeout(t); },[i]);
  useEffect(()=>()=>stopSpeak(),[]);
  if(!items.length) return html`<section><p className="empty">Пока нет предложений для аудирования на этом уровне.</p><button className="btn" onClick=${onExit}>Назад</button></section>`;
  const check=()=>{ if(chk||!val.trim()) return; const ok=normAns(val)===normAns(it.form)||normAns(val)===normAns(it.w.en); setChk({ok}); setRes(r=>[...r,ok]);
    if(ok){ SFX('correct'); FX('sparkle',inRef.current); W('react','correct'); } else { SFX('wrong'); W('react','wrong'); }
    update(s=>s.boxes[it.w.id]==null?{}:memGrade(s,it.w.id,ok?3:1)); };
  const next=()=>{ SFX('tap'); if(i+1<items.length){ setI(i+1); setVal(''); setChk(null); return; }
    const sc=res.filter(Boolean).length, coins=sc*3+(sc===items.length?10:0);
    update(s=>({coins:s.coins+coins,xp:s.xp+sc*8,listens:(s.listens||0)+1})); setFin({sc,coins});
    if(sc===items.length){ SFX('fanfare'); FX('rain',120); W('react','cheer'); W('say','У тебя отличный слух!',0,true); } else { W('react','happy'); W('say','Хорошая тренировка!',0,true); } };
  const top=html`<div className="sess-top"><button className="icon-btn" id="listen-close" onClick=${()=>{ SFX('tap'); stopSpeak(); onExit(); }} aria-label="Закрыть">${I.close()}</button>
    <div className="steps" aria-hidden="true">${items.map((_,k)=>html`<i key=${k} className=${k<res.length?(res[k]?'good':'bad'):(k===i?'on':'')}></i>`)}</div><span className="phase">Аудирование</span></div>`;
  if(fin) return html`<section>${top}<div className="result enter" data-perch="card"><span className="phase">Диктант</span>
    <div className="score"><${CountUp} to=${fin.sc}/><small>/${items.length}</small></div><p>${fin.sc===items.length?'Идеально! Ты услышал каждое слово.':'Слушай медленную версию, если слово сложное.'}</p>
    <div className="rewards"><span className="pill">${I.coin()} +${fin.coins}</span></div>
    <div className="actions"><button className="btn" id="listen-done" onClick=${onExit}>Готово</button></div></div></section>`;
  const before=it.w.ex.slice(0,it.idx), after=it.w.ex.slice(it.idx+it.form.length);
  return html`<section>${top}
    <div className="qcard enter" key=${'l'+i} data-perch="card">
      <span className="phase">Предложение ${i+1} из ${items.length}</span>
      <div className="listen-btns"><button className="btn" id="play-normal" onClick=${()=>{ SFX('tap'); play(.9); }}>${I.speaker()} Слушать</button>
        <button className="btn ghost" id="play-slow" onClick=${()=>{ SFX('tap'); play(.55); }}>🐢 Медленно</button></div>
      <p className="gsent">${before}<input ref=${inRef} id="l-input" className=${'ginput'+(chk?(chk.ok?' good':' bad'):'')} value=${val} onChange=${e=>{ setVal(e.target.value); SFX('type'); }}
        onKeyDown=${e=>{ if(e.key==='Enter'){ e.preventDefault(); chk?next():check(); } }} readOnly=${!!chk} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck=${false} aria-label="Услышанное слово"/>${after}</p>
      ${!chk?html`<button className="btn wide" id="l-check" disabled=${!val.trim()} onClick=${check}>Проверить <kbd>Enter</kbd></button>`
        :html`<div className=${'fb '+(chk.ok?'good':'bad')} role="status"><span>${chk.ok?'Верно! ':'Правильно: '+it.form+'. '}<small className="fb-tr">${it.w.en} — ${it.w.ru}</small></span>
          <button className="btn small" id="l-next" onClick=${next}>${i+1<items.length?'Дальше':'Итоги'} <kbd>Enter</kbd></button></div>`}
    </div></section>`;
}

function Session({track,unit,update,onExit,active,mode,st}){
  const byId=useMemo(()=>Object.fromEntries(unit.words.map(w=>[w.id,w])),[]);
  const [run,setRun]=useState(0);
  const [phase,setPhase]=useState(mode==='review'?'quiz':'cards');
  const [typed,setTyped]=useState('');
  const inRef=useRef(null);
  const [queue,setQueue]=useState(()=>unit.words.map(w=>w.id));
  const [ci,setCi]=useState(0);
  const [flip,setFlip]=useState(false);
  const [again,setAgain]=useState({});
  const [quiz,setQuiz]=useState(()=>makeQuiz(unit.words,mode,st)); /* once per attempt: parent re-renders must never reshuffle questions */
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [chk,setChk]=useState(null), [more,setMore]=useState(null);
  const qT=useRef(Date.now());
  const [results,setResults]=useState([]);
  const [earned,setEarned]=useState({coins:0,xp:0,bonus:0});
  const cardRef=useRef(null);
  const score=results.filter((r,i)=>r&&!(quiz[i]&&quiz[i].retry)).length, baseN=quiz.filter(q=>!q.retry).length;
  useEffect(()=>{ qT.current=Date.now(); if(phase==='quiz'&&quiz[qi]&&quiz[qi].type==='listen'&&sel===null){ const h=setTimeout(()=>speak(quiz[qi].w.en),350); return ()=>clearTimeout(h); } },[phase,qi]);
  useEffect(()=>{ if(phase==='quiz'&&quiz[qi]&&isTyped(quiz[qi].type)&&sel===null){ const h=setTimeout(()=>{ try{ inRef.current&&inRef.current.focus({preventScroll:true}); }catch(e){} },90); return ()=>clearTimeout(h);} },[phase,qi,sel]);

  const restart=()=>{ setRun(r=>r+1); setQuiz(makeQuiz(unit.words,mode,st)); setChk(null); setPhase('cards'); setQueue(unit.words.map(w=>w.id)); setCi(0); setFlip(false); setAgain({}); setQi(0); setSel(null); setResults([]); setEarned({coins:0,xp:0,bonus:0}); W('react','happy'); W('say','Ещё круг! Повторение — мать учения.'); };
  const doFlip=()=>{ SFX('flip'); setFlip(f=>!f); if(!flip){ W('lookAtEl',cardRef.current,1.2); if(Math.random()<.35) W('react','think'); } };
  const nextCard=known=>{
    const id=queue[ci]; let q=queue; SFX('tap');
    update(s=>(s.mem||{})[id]?(known?{}:memGrade(s,id,1)):({boxes:{...s.boxes,[id]:known?Math.max(s.boxes[id]||0,1):0},due:{...(s.due||{}),[id]:dayKey(known?1:0)}}));
    if(!known && !again[id]){ q=[...queue,id]; setQueue(q); setAgain(a=>({...a,[id]:1})); W('react','encourage'); W('say','Ничего, вернёмся к нему в конце.'); }
    else if(known) W('react','nod');
    setFlip(false);
    if(ci+1>=q.length){ setPhase('quiz'); W('react','wave'); W('say','Теперь мини-тест: '+quiz.length+' вопросов!'); }
    else setCi(ci+1);
  };
  const answer=i=>{
    if(sel!==null) return;
    const q=quiz[qi]; let ok, typo=false;
    if(isTyped(q.type)){ if(!typed.trim()) return; const r=checkTyped(typed,[q.answer,...(q.alts||[])]); ok=r.ok; typo=!!r.typo; setSel(-1); }
    else { ok=q.options[i]===q.answer; setSel(i); }
    setChk({ok,typo}); setResults(r=>[...r,ok]);
    const g=ansGrade(ok,q.type,Date.now()-qT.current,(q.w.en||'').length,typo);
    update(s=>{ const t=dayKey();
      return {...memGrade(s,q.id,g,TASK_W[q.type]||1),coins:s.coins+(ok?5:0),xp:s.xp+(ok?10:0),today:t,todayCount:(s.today===t?s.todayCount:0)+1}; });
    /* a mistake comes back once at the end of the session, as an easier task */
    if(!ok&&!q.retry&&quiz.filter(x=>x.retry).length<6) setQuiz(Q=>[...Q,{...quizQ(q.w,q.type==='tr'?'tr':'ru',unit.words,mode==='review'||mode==='daily'),retry:true}]);
    if(ok) setEarned(e=>({...e,coins:e.coins+5,xp:e.xp+10}));
    const el=q.type==='write'?inRef.current:document.getElementById('opt-'+i);
    if(ok){ SFX('correct'); FX('sparkle',el); FX('floatText',el,'+5','good'); FX('coinFly',el,2,()=>SFX('coin')); } else { SFX('wrong'); }
    W('react',ok?'correct':'wrong');
    W('say',ok?pick(['Отлично!','Да! Так держать!','Верно!','Ты супер!','Точно в цель!']):pick(['Почти! Запомним вместе.','Хитрое слово, бывает.','Ничего, в следующий раз получится.']));
  };
  const next=()=>{
    SFX('tap');
    if(qi+1<quiz.length){ setQi(qi+1); setSel(null); setChk(null); setTyped(''); return; }
    const total=baseN, sc=score, bonus=sc===total?20:0;
    setEarned(e=>({...e,bonus}));
    update(s=>{ const t=dayKey(), y=dayKey(-1); const streak=s.lastDay===t?s.streak:(s.lastDay===y?s.streak+1:1);
      return {streak,lastDay:t,coins:s.coins+bonus,perfects:(s.perfects||0)+(sc===total?1:0),reviews:(s.reviews||0)+(mode==='review'?1:0),daily:mode==='daily'&&s.daily?{...s.daily,done:true}:s.daily,dailies:(s.dailies||0)+(mode==='daily'?1:0),best:mode!=='learn'?s.best:{...s.best,[unit.id]:Math.max(s.best[unit.id]||0,sc)}}; });
    setPhase('result');
    if(sc===total){ setTimeout(()=>{ FX('rain',160); SFX('fanfare'); },350); setTimeout(()=>FX('coinFly',document.getElementById('reward-coins'),5,()=>SFX('coin')),1300); }
    else if(sc>=total*.6){ setTimeout(()=>{ FX('confetti',document.querySelector('.result .score'),60); SFX('fanfare'); },350); }
    else setTimeout(()=>SFX('fail'),350);
    if(sc===total){ W('react','cheer'); W('say','Идеально! Бонус +20 монет!',0,true); }
    else if(sc>=total*.6){ W('react','happy'); W('say','Хороший результат!',0,true); }
    else { W('react','encourage'); W('say','Не сдаёмся! Давай пройдём ещё раз.',0,true); }
  };

  useEffect(()=>{
    if(!active) return;
    const h=e=>{
      if(e.metaKey||e.ctrlKey||e.altKey) return;
      if(phase==='cards'){
        if(e.code==='Space'||e.key==='Enter'){ e.preventDefault(); if(!flip) doFlip(); else if(e.key==='Enter') nextCard(true); }
        else if(flip&&e.key==='1') nextCard(false); else if(flip&&e.key==='2') nextCard(true);
      } else if(phase==='quiz'){
        const n=parseInt(e.key,10);
        if(e.target&&e.target.tagName==='INPUT') return;
        if(!isTyped(quiz[qi].type)&&n>=1&&n<=4&&sel===null) answer(n-1);
        else if(e.key==='Enter'&&sel!==null){ e.preventDefault(); next(); }
      }
    };
    addEventListener('keydown',h); return ()=>removeEventListener('keydown',h);
  });

  const top=(label,states)=>html`<div className="sess-top">
     <button className="icon-btn" id="sess-close" onClick=${onExit} aria-label="Закрыть урок">${I.close()}</button>
     <div className="steps" aria-hidden="true">${states.map((s,i)=>html`<i key=${i} className=${s}></i>`)}</div>
     <span className="phase">${label}</span></div>`;

  if(phase==='cards'){
    const cur=byId[queue[ci]];
    return html`<section>
      ${top('Карточки',queue.map((_,i)=>i<ci?'on':''))}
      <div key=${'c'+ci+'-'+run} className=${'flash enter'+(flip?' flipped':'')} data-perch="card" ref=${cardRef}>
        <div className="flash-inner" onClick=${doFlip}>
          <div className="face front" aria-hidden=${flip}>
            <span className="phase">${track.name} · ${unit.theme?unit.ru+(unit.parts>1?" · блок "+unit.part:""):unit.title}</span>
            <div className="word">${cur.en}</div>
            <div className="ipa">${cur.ipa}</div>
            ${canSpeak?html`<button className="icon-btn speak" id="speak-btn" aria-label="Произнести слово" onClick=${e=>{ e.stopPropagation(); speak(cur.en); W('react','nod'); }}>${I.speaker()}</button>`:null}
            <div className="hint">Нажми на карточку или пробел, чтобы увидеть перевод</div>
          </div>
          <div className="face back" aria-hidden=${!flip}>
            <div className="tr">${cur.ru}</div>
            <div className="def">${cur.def}</div>
            <p className="ex">${highlight(cur.ex,cur.en)}</p>
          </div>
        </div>
      </div>
      ${flip?html`<div className="card-rel enter"><${CardRel} w=${cur} onMore=${()=>setMore(cur)}/></div>`:null}
      ${more?html`<${WordSheet} w=${more} st=${st} update=${update} open=${true} onClose=${()=>setMore(null)}/>`:null}
      <div className=${'actions'+(flip?'':' one')}>
        ${flip?html`<button className="btn ghost" id="again-btn" onClick=${()=>nextCard(false)}>Ещё раз <kbd>1</kbd></button><button className="btn" id="know-btn" onClick=${()=>nextCard(true)}>Знаю <kbd>2</kbd></button>`
              :html`<button className="btn" id="flip-btn" onClick=${doFlip}>Показать перевод <kbd>Space</kbd></button>`}
      </div></section>`;
  }
  if(phase==='quiz'){
    const q=quiz[qi], ok=!!(chk&&chk.ok);
    const cls=(i,o)=>'opt'+(sel===null?'':o===q.answer?' good':i===sel?' bad':' dim');
    const inp=(ph,label)=>html`<input ref=${inRef} id="w-input" className=${'ginput'+(q.type==='gap'?'':' wide-in')+(sel!==null?(ok?' good':' bad'):'')} value=${typed} placeholder=${ph}
      onChange=${e=>{ setTyped(e.target.value); SFX('type'); }} onKeyDown=${e=>{ if(e.key==='Enter'){ e.preventDefault(); sel===null?answer():next(); } }}
      readOnly=${sel!==null} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck=${false} aria-label=${label}/>`;
    const checkBtn=sel===null&&isTyped(q.type)?html`<button className="btn wide" id="write-check" disabled=${!typed.trim()} onClick=${()=>answer()}>Проверить <kbd>Enter</kbd></button>`:null;
    return html`<section>
      ${top(mode==='review'?'Повторение':'Мини-тест',quiz.map((_,i)=>i<results.length?(results[i]?'good':'bad'):(i===qi?'on':'')))}
      <div className="qcard enter" key=${'q'+qi+'-'+run} data-perch="card">
        <span className="phase">${q.retry?'Ещё раз · слово, в котором была ошибка':'Вопрос '+(qi+1)+' из '+baseN}</span>
        ${q.type==='tr'?html`<p className="qask">Как переводится слово</p><div className="word">${q.w.en}</div><div className="ipa">${q.w.ipa}</div>`
         :q.type==='def'?html`<p className="qask">Какое слово подходит к определению?</p><p className="qdef">«${q.w.def}»</p>`
         :q.type==='ru'?html`<p className="qask">Как это по-английски?</p><div className="word ru-word">${q.w.ru}</div>`
         :q.type==='listen'?html`<p className="qask">Послушай и напиши слово</p>
            <div className="listen-btns"><button className="btn" id="q-play" onClick=${()=>{ SFX('tap'); speak(q.w.en); }}>${I.speaker()} Слушать</button></div>
            ${inp('что ты услышал','Услышанное слово')}${checkBtn}`
         :q.type==='fix'?html`<p className="qask">Исправь свою ошибку из разговора</p><div className="word fix-wrong"><s>${q.w.wrong}</s></div>${q.w.why?html`<p className="qhint">${q.w.why}</p>`:null}
            ${inp('как правильно','Правильный вариант')}${checkBtn}`
         :q.type==='gap'?html`<p className="qask">Вставь слово «${q.w.ru}»</p><p className="gsent">${q.before}${inp('','Пропущенное слово')}${q.after}</p>${checkBtn}`
         :html`<p className="qask">Напиши по-английски</p><div className="word ru-word">${q.w.ru}</div>${q.w.def?html`<p className="qhint">${q.w.def}</p>`:null}
            ${inp('english','Слово по-английски')}${checkBtn}`}
        ${!isTyped(q.type)?html`<div className="opts">${q.options.map((o,i)=>html`<button key=${o} id=${'opt-'+i} className=${cls(i,o)} disabled=${sel!==null} onClick=${()=>answer(i)}><span className="k">${sel===null?i+1:o===q.answer?'✓':i===sel?'✕':i+1}</span><span>${o}</span></button>`)}</div>`:null}
        ${sel!==null?html`<div className=${'fb '+(ok?'good':'bad')} role="status"><span>${ok?(chk.typo?'Засчитано, но с опечаткой: '+q.answer:'Верно! +5 монет'):'Правильно: '+q.answer}
            ${mode==='review'||!ok?html`<small className="fb-tr">${q.w.en} — ${q.w.ru}${!ok&&q.w.ex&&q.type!=='gap'?html`<br/>${highlight(q.w.ex,q.w.en)}`:null}</small>`:null}</span>
          <button className="btn small" id="next-btn" onClick=${next}>${qi+1<quiz.length?'Дальше':'Итоги'} <kbd>Enter</kbd></button></div>`:null}
      </div></section>`;
  }
  const total=baseN;
  const msg=mode==='review'?(score===total?'Идеально! Эти слова вернутся нескоро.':'Слова с ошибками вернутся завтра, а остальные — позже. Так они и закрепляются.'):score===total?'Идеально! Все слова твои.':score>=total*.6?'Отличный результат. Сложные слова вернутся на повторение.':'Это только начало. Пройди тему ещё раз, и всё получится.';
  return html`<section>
    ${top('Итоги',quiz.map((_,i)=>results[i]?'good':'bad'))}
    <div className="result enter" data-perch="card">
      <span className="phase">${track.name} · ${unit.theme?unit.ru+(unit.parts>1?" · блок "+unit.part:""):unit.title}</span>
      <div className="score"><${CountUp} to=${score}/><small>/${total}</small></div>
      <p>${msg}</p>
      <div className="rewards"><span className="pill" id="reward-coins">${I.coin()} +${earned.coins+earned.bonus}</span><span className="pill">${I.bolt()} +${earned.xp} XP</span></div>
      <div className="actions"><button className="btn ghost" id="retry-btn" onClick=${restart}>Пройти ещё раз</button><button className="btn" id="done-btn" onClick=${onExit}>К темам</button></div>
    </div></section>`;
}

/* how strong the learner's word memory is, and what the next week of reviews looks like */
function MemoryPanel({st}){
  const ids=Object.keys(st.boxes||{}); if(!ids.length) return null;
  const today=dayNum(), due=st.due||{}; let strong=0,mid=0,weak=0,sum=0,n=0;
  ids.forEach(id=>{ const m=memOf(st,id); if(!m) return; n++; sum+=fR(today-m.l,m.s); if(m.s>=21) strong++; else if(m.s>=4) mid++; else weak++; });
  if(!n) return null;
  const fc=[0,1,2,3,4,5,6].map(k=>ids.filter(id=>{ const d=due[id]?dayNum(due[id]):today; return k===0?d<=today:d===today+k; }).length), mx=Math.max(1,...fc);
  const WD=['вс','пн','вт','ср','чт','пт','сб'], lab=k=>k===0?'сег':k===1?'зав':WD[new Date((today+k)*864e5).getUTCDay()];
  const seg=(v,c,t)=>v?html`<i className=${'mem-'+c} style=${{flexGrow:v}} title=${t+': '+v}></i>`:null;
  return html`<div className="sec-h"><h2>Память</h2><span className="muted">помнишь сейчас ≈ ${Math.round(sum/n*100)}%</span></div>
    <div className="mem-card">
      <div className="mem-bar" aria-hidden="true">${seg(strong,'s','Надёжно')}${seg(mid,'m','Закрепляются')}${seg(weak,'w','Свежие')}</div>
      <div className="mem-legend"><span><i className="mem-s"></i><b>${strong}</b> надёжно<small>помнишь 3 недели и дольше</small></span>
        <span><i className="mem-m"></i><b>${mid}</b> закрепляются<small>от 4 дней до 3 недель</small></span>
        <span><i className="mem-w"></i><b>${weak}</b> свежие<small>легко забыть, повторяем часто</small></span></div>
      <div className="mem-fc" role="img" aria-label=${'Повторений на неделю: '+fc.join(', ')}>${fc.map((v,k)=>html`<div key=${k}><b>${v||''}</b><span style=${{height:(v/mx*44+2)+'px'}}></span><small>${lab(k)}</small></div>`)}</div>
      <p className="mem-note">Ворди показывает слово как раз тогда, когда ты начинаешь его забывать. Чем лучше ты помнишь слово, тем реже оно возвращается и тем сложнее задание: сначала выбор ответа, потом ввод с клавиатуры, потом на слух и в предложении.</p>
    </div>`;
}
function Progress({st,practice,update,startMy,startHard}){
  const total=ALL.filter(w=>(st.boxes[w.id]||0)>=2).length;
  const hard=hardWords(st);
  return html`
   <div className="page-h"><h1>Прогресс</h1></div>
   ${st.level?html`<div className="ladder">${CEFR.map(L=>{ const p=levelProgress(st,L), cur=L===st.level, past=lvlIdx(L)<lvlIdx(st.level);
     return html`<div key=${L} className=${'rung'+(cur?' cur':'')+(past?' past':'')+(lvlIdx(L)>lvlIdx(st.level)?' fut':'')}>
       <span className="rung-code">${past?'✓':L}</span>
       <span className="rung-main"><b>${L} · ${LEVEL_NAMES[L]}</b><small>${past?'пройден':cur?'слова '+p.wd+'/'+p.needW+' · грамматика '+p.gd+'/'+p.needG+' (нужно 60%)':p.total+' '+plural(p.total,'шаг','шага','шагов')+' · закрыт'}</small>
         ${cur?html`<span className="bar"><i style=${{width:(p.pct*100)+'%'}}></i></span>`:null}</span></div>`; })}</div>`:null}
   <${CertsSection} st=${st}/>
   <div className="tiles">
     <div className="tile"><b>${total}</b><span>слов выучено</span></div>
     <div className="tile"><b>${st.streak}</b><span>${plural(st.streak,'день','дня','дней')} подряд</span></div>
     <div className="tile"><b>${st.coins}</b><span>монет</span></div>
     <div className="tile"><b>${st.xp}</b><span>XP</span></div>
   </div>
   <${MemoryPanel} st=${st}/>
   <${Achievements} st=${st}/>
   ${Object.keys(st.qtypes||{}).length?html`<div className="sec-h"><h2>IELTS: типы вопросов</h2></div><div className="set-group qt-prog"><${QtBreak} o=${st.qtypes}/>
     ${weakTypes(st.qtypes).slice(0,2).map(w=>{ const k=Object.keys(QT_NAMES).find(x=>QT_NAMES[x]===w.name), d=k&&drillFor(k,st); return d?html`<div key=${k} className="set-row"><div><strong>Тренировка: ${w.name}</strong><p>${w.pct}% верно. Быстрая тренировка: 8 таких вопросов с разбором, ≈ 5 минут</p></div>
       <button className="btn small" id=${'drill-'+k} onClick=${()=>practice&&practice({kind:'drill',type:k})}>Начать</button></div>`:null; })}</div>`:null}
   <${MyWords} st=${st} update=${update} startMy=${startMy}/>
   <${EssayBank} st=${st}/>
   <div className="sec-h"><h2>Направления</h2></div>
   <div className="tracks">${TRACKS.map(t=>{ const words=t.units.flatMap(u=>u.words), l=learned(st,words);
     return html`<div className="trow" key=${t.id}><header><b>${t.name}</b><span className="muted">${l} / ${words.length}</span></header><div className="bar"><i style=${{width:(l/words.length*100)+'%'}}></i></div></div>`;})}</div>
   <div className="sec-h"><h2>Сложные слова</h2><span className="muted">${hard.length}</span></div>
   ${hard.length?html`<div className="hard">${hard.slice(0,60).map(w=>html`<div key=${w.id}><b>${w.en}</b><span className="muted">${w.ru}</span></div>`)}</div>
     ${hard.length>60?html`<p className="hint-line">и ещё ${hard.length-60}</p>`:null}
     <button className="btn wide" id="hard-review" onClick=${startHard}>Повторить сложные слова</button>`
     :html`<p className="empty">Здесь появятся слова, на которых ты ошибся. Ворди вернёт их на повторение.</p>`}
   <div className="sec-h"><h2>Грамматика</h2><span className="muted">★ ${gStarsTotal(st)} / ${GL.length*3}</span></div>
   <div className="path">${GL.map((l,i)=>{ const n=(st.gstars||{})[l.id]||0; return html`<div key=${l.id} className=${n?'done':''}><i></i><span>${i+1}. ${l.title}</span><${Stars} n=${n} size=${14}/></div>`;})}</div>`;
}

/* ---------- teacher code: Интенсив и повышение уровня ---------- */
const TEACHER_H='1pat0y3';
const tHash=s=>{ let x=5381; for(const c of String(s).trim()) x=((x*33)^c.charCodeAt(0))>>>0; return x.toString(36); };
function PinSheet({title,text,onOk,onClose}){
  const [v,setV]=useState(''), [bad,setBad]=useState(false); const ref=useRef(null);
  useEffect(()=>{ const t=setTimeout(()=>{ try{ ref.current&&ref.current.focus(); }catch(e){} },80); const t2=setTimeout(()=>W('goTo','onb',{frac:.5}),450); return ()=>{ clearTimeout(t); clearTimeout(t2); W('goTo','home'); }; },[]);
  const ok=()=>{ if(tHash(v)===TEACHER_H){ SFX('correct'); onOk(); } else { SFX('wrong'); setBad(true); W('react','wrong'); } };
  return html`<div className="sheet-wrap" onClick=${onClose}><div className="sheet pin-sheet enter" data-perch="onb" role="dialog" aria-modal="true" aria-labelledby="pin-t" onClick=${e=>e.stopPropagation()}>
    <span className="pin-ic" aria-hidden="true">${I.lock()}</span>
    <h3 id="pin-t">${title}</h3><p className="muted">${text}</p>
    <input ref=${ref} id="pin-input" className=${'pin-in'+(bad?' bad':'')} type="password" inputMode="numeric" autoComplete="off" value=${v} placeholder="Код учителя"
      onChange=${e=>{ setV(e.target.value); setBad(false); }} onKeyDown=${e=>{ if(e.key==='Enter') ok(); }} aria-label="Код учителя"/>
    <p className="pin-err" role="alert">${bad?'Неверный код. Спроси его у своего преподавателя.':''}</p>
    <div className="actions"><button className="btn ghost" onClick=${onClose}>Отмена</button><button className="btn" id="pin-ok" disabled=${!v.trim()} onClick=${ok}>Подтвердить</button></div>
  </div></div>`;
}

/* ================= TEACHER LINK: cloud sync (db) + offline report / homework codes =================
   Two channels, so it works for every student:
   1) live: when the page has the `db` capability and the student can write (invited as editor),
      each student writes ONLY students/<their id>; homework lives in hw/<id>, written only by the owner.
   2) offline: a student copies a short report code and sends it in a messenger; the teacher pastes it.
      Homework travels the same way as a code. */
const CLOUD={state:'init',db:null,user:null,uid:null,owner:false,hw:[],subs:new Set(),hwUnsub:null,writeOff:false};
const cloudEmit=()=>CLOUD.subs.forEach(f=>{ try{ f(); }catch(e){} });
let _cloudStarted=false;
function startCloud(){ if(_cloudStarted) return; _cloudStarted=true;
  const c=window.claude; if(!c||typeof c.use!=='function'){ CLOUD.state='off'; cloudEmit(); return; }
  Promise.all([c.use('db').catch(()=>null),c.use('user').catch(()=>null)]).then(async([db,user])=>{
    if(!db||!user){ CLOUD.state='off'; cloudEmit(); return; }
    CLOUD.db=db; CLOUD.user=user;
    try{ CLOUD.uid=await user.id(); CLOUD.owner=await user.isOwner(); }catch(e){}
    CLOUD.state='on';
    try{ CLOUD.hwUnsub=db.collection('hw').onSnapshot(s=>{ CLOUD.hw=s.docs.map(d=>({...d.data(),id:d.id,src:'cloud'})); cloudEmit(); },()=>{}); }catch(e){}
    cloudEmit(); }); }
function useCloud(){ const [,setN]=useState(0); useEffect(()=>{ const f=()=>setN(n=>n+1); CLOUD.subs.add(f); startCloud(); return ()=>CLOUD.subs.delete(f); },[]); return CLOUD; }

/* --- codes --- */
const b64e=s=>btoa(unescape(encodeURIComponent(s))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const b64d=s=>decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/'))));
const makeCode=(tag,o)=>'WORDY-'+tag+':'+b64e(JSON.stringify(o));
function readCode(txt,tag){ const m=String(txt||'').replace(/\s+/g,'').match(new RegExp('WORDY-'+tag+':([A-Za-z0-9_-]+)'));
  if(!m) return null; try{ return JSON.parse(b64d(m[1])); }catch(e){ return null; } }
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);

/* --- what a student shares: only learning numbers, no answers or texts --- */
function studentReport(st,full){
  const mocks={}; Object.entries(st.mocks||{}).forEach(([id,r])=>{ const o={}; ['L','R','W','S','sat'].forEach(k=>{ if(r&&r[k]) o[k]=[r[k].band!=null?r[k].band:(r[k].total!=null?r[k].total:null),r[k].raw!=null?r[k].raw:null,r[k].date||null]; }); if(Object.keys(o).length) mocks[id]=o; });
  return {v:1,sid:st.sid,name:(st.sname||'').trim().slice(0,40),at:Date.now(),level:st.level,mode:st.mode,xp:st.xp|0,coins:st.coins|0,streak:st.streak|0,lastDay:st.lastDay||null,
    learned:ALL.filter(w=>(st.boxes[w.id]||0)>=2).length,reviews:st.reviews|0,dailies:st.dailies|0,reads:Object.keys(st.reads||{}).length,
    gram:Object.keys(st.gstars||{}).length,mocks,hwDone:[...new Set(Object.keys(st.hwDone||{}).concat([...(CLOUD.hw||[]),...(st.hw||[])].filter(h=>h&&h.id&&hwDone(h,st)).map(h=>h.id)))],qt:st.qtypes||{},hwRes:st.hwRes||{},myN:Object.keys(st.myWords||{}).length,drills:st.drills|0,
    ...(full?{essays:(st.essays||[]).slice(0,6).map(e=>({...e,text:String(e.text).slice(0,3000)}))}:{})};
}

/* --- homework --- */
const HW_PARTS={L:'Listening',R:'Reading',W:'Writing',S:'Speaking',full:'весь тест',sat:'SAT'};
function hwTitle(h){ if(h.kind==='free') return h.note||'Задание'; if(h.kind==='words') return 'Слова: '+(h.title||((h.words||[]).length+' слов')); if(h.kind==='text') return 'Текст: '+(h.title||'чтение'); if(h.kind==='essay') return 'Эссе: '+(h.title||String(h.prompt||'').slice(0,40));
  const m=(h.kind==='sat'?SAT_MOCKS:IELTS_MOCKS).find(x=>x.id===h.test); return (m?m.title.replace('IELTS Academic · ',h.kind==='sat'?'':'IELTS · '):h.test)+(h.kind==='sat'?'':' · '+HW_PARTS[h.part]); }
function hwDone(h,st){ if((st.hwDone||{})[h.id]) return true; if(h.kind==='words') return (h.words||[]).length>0&&(h.words||[]).every(w=>st.boxes[myId(w.en)]!=null); if(h.kind==='free'||h.kind==='text'||h.kind==='essay') return false;
  const r=(st.mocks||{})[h.test]||{}, since=h.from||'0';
  const ok=k=>r[k]&&(r[k].date||'')>=since;
  if(h.kind==='sat') return ok('sat'); if(h.part==='full') return ['L','R','W','S'].every(ok); return ok(h.part); }
function allHw(st,cloud){ const seen={}, out=[];
  [...(cloud.hw||[]),...(st.hw||[])].forEach(h=>{ if(!h||!h.id||seen[h.id]) return; if(h.to&&h.to.length&&st.sid&&!h.to.includes(st.sid)&&!(cloud.uid&&h.to.includes(cloud.uid))) return; seen[h.id]=1; out.push(h); });
  return out.sort((a,b)=>(a.due||'9').localeCompare(b.due||'9')); }
const dueLabel=d=>{ if(!d) return 'без срока'; const t=dayKey(), tm=dayKey(1); if(d<t) return 'просрочено'; if(d===t) return 'сегодня'; if(d===tm) return 'завтра';
  const [y,mo,da]=d.split('-'); return 'до '+(+da)+'.'+mo; };

function HomeworkBox({st,update,openMock}){ const cloud=useCloud(); const list=allHw(st,cloud).filter(h=>!hwDone(h,st));
  if(!list.length) return null;
  const go=h=>{ if(h.kind==='free') return; if(h.kind==='words'){ window.dispatchEvent(new CustomEvent('wordy:hwwords',{detail:h})); return; } if(h.kind==='text'||h.kind==='essay'){ openMock({kind:'hw',h}); return; } openMock(h.kind==='sat'?{kind:'sat',id:h.test,part:h.part==='sat'?'full':h.part}:{kind:'ielts',id:h.test,part:h.part}); };
  return html`<section className="hw-box enter" aria-label="Домашние задания">
    <div className="hw-h"><span className="hw-ic" aria-hidden="true">${MI.pen()}</span><b>Домашка от учителя</b><span className="muted">${list.length} ${list.length===1?'задание':'задания'}</span></div>
    ${list.slice(0,4).map(h=>html`<div key=${h.id} className=${'hw-row'+(h.due&&h.due<dayKey()?' late':'')}>
      <div className="hw-main"><b>${hwTitle(h)}</b>${h.note&&h.kind!=='free'?html`<small>${h.note}</small>`:null}</div>
      <span className="hw-due">${dueLabel(h.due)}</span>
      ${h.kind==='free'?html`<button className="btn small ghost" onClick=${()=>{ SFX('correct'); update(s=>({hwDone:{...(s.hwDone||{}),[h.id]:dayKey()},coins:s.coins+10})); W('react','cheer'); W('say','Домашка сделана! +10 монет',0,true); }}>Готово</button>`
        :html`<button className="btn small" id=${'hw-go-'+h.id} onClick=${()=>go(h)}>Начать</button>`}</div>`)}
  </section>`; }

/* --- student side: in Settings --- */
function StudentLink({st,update}){ const cloud=useCloud(); const [code,setCode]=useState(null), [paste,setPaste]=useState(''), [msg,setMsg]=useState(''), [copied,setCopied]=useState(false);
  const live=cloud.state==='on'&&cloud.uid&&!cloud.owner&&!cloud.writeOff;
  const mk=()=>{ SFX('pop'); setCopied(false); setCode(makeCode('R1',studentReport(st))); };
  const copy=()=>{ const t=code; const done=()=>{ setCopied(true); SFX('correct'); W('react','happy'); };
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done,()=>{}); };
  const share=()=>{ if(navigator.share) navigator.share({text:'Мой отчёт Wordy:\n'+code}).catch(()=>{}); };
  const addHw=()=>{ const o=readCode(paste,'H1'); if(!o||!Array.isArray(o.hw)){ SFX('wrong'); setMsg('Это не похоже на код задания. Скопируй его целиком.'); return; }
    update(s=>{ const have={}; (s.hw||[]).forEach(h=>have[h.id]=1); return {hw:[...(s.hw||[]),...o.hw.filter(h=>h&&h.id&&!have[h.id]).map(h=>({...h,src:'code'}))]}; });
    setPaste(''); setMsg('Задание добавлено — оно на главной.'); SFX('fanfare'); W('react','cheer'); W('say','Новая домашка! Я напомню.',0,true); };
  return html`<div className="set-group">
    <div className="set-row wrap"><div><strong>Как тебя зовут</strong><p>Это имя увидит учитель в своём кабинете</p></div>
      <input className="set-in" id="st-name" value=${st.sname||''} maxLength="40" placeholder="Имя и фамилия" onChange=${e=>{ const v=e.target.value; update(()=>({sname:v})); }} aria-label="Имя для учителя"/></div>
    <div className="set-row wrap"><div><strong>Как Ворди к тебе обращается</strong><p>Чтобы по-русски он говорил «ты сделал» или «ты сделала»</p></div>
      <div className="set-chips">${[['m','В мужском роде'],['f','В женском роде']].map(([g,l])=>html`<button key=${g} className="chip" id=${'st-g-'+g} aria-pressed=${st.gender===g} onClick=${()=>{ SFX('tap'); update(()=>({gender:st.gender===g?null:g})); }}>${l}</button>`)}</div></div>
    <div className="set-row wrap"><div><strong>Ворди помнит разговоры</strong><p>${st.wmem&&((st.wmem.facts||[]).length||(st.wmem.recent||[]).length)?'Он помнит '+(st.wmem.facts||[]).length+' '+plural((st.wmem.facts||[]).length,'факт','факта','фактов')+' о тебе и конец последнего разговора. Это хранится вместе с твоим прогрессом.':'Пока ничего: после разговоров в звонке, чате или «Спросить Ворди» он запомнит главное о тебе.'}</p></div>
      ${st.wmem&&((st.wmem.facts||[]).length||(st.wmem.recent||[]).length)?html`<button className="btn small ghost" id="st-forget" onClick=${()=>{ SFX('tap'); update(()=>({wmem:null})); W('say','Хорошо, начнём знакомство заново!'); }}>Забыть разговоры</button>`:null}</div>
    <div className="set-row wrap"><div><strong>Связь с учителем</strong><p>${live?'Подключено: учитель видит твой прогресс автоматически.':'Отправь учителю код с прогрессом — в Telegram, WhatsApp или любом мессенджере.'}</p></div>
      ${live?html`<span className="ok-chip">● онлайн</span>`:null}
      <button className="btn small" id="st-report" onClick=${mk}>Отчёт для учителя</button></div>
    ${code?html`<div className="code-box"><textarea readOnly value=${code} rows="3" aria-label="Код отчёта" onFocus=${e=>e.target.select()}></textarea>
      <div className="actions"><button className="btn small" id="st-copy" onClick=${copy}>${copied?'Скопировано ✓':'Скопировать'}</button>${navigator.share?html`<button className="btn small ghost" onClick=${share}>Отправить…</button>`:null}</div></div>`:null}
    <div className="set-row wrap"><div><strong>Код задания</strong><p>Учитель прислал код? Вставь его сюда</p></div></div>
    <div className="code-box"><textarea id="st-hwcode" rows="2" value=${paste} placeholder="WORDY-H1:…" onChange=${e=>{ setPaste(e.target.value); setMsg(''); }} aria-label="Код задания"></textarea>
      <div className="actions"><button className="btn small" id="st-hwadd" disabled=${!paste.trim()} onClick=${addHw}>Добавить</button></div>${msg?html`<p className="muted" role="status">${msg}</p>`:null}</div>
  </div>`; }

/* --- teacher cabinet --- */
const ago=ts=>{ if(!ts) return '—'; const d=Math.round((Date.now()-ts)/86400000); return d<=0?'сегодня':d===1?'вчера':d+' дн. назад'; };
/* ---------- printable progress report for parents (standalone HTML file) ---------- */
const escH=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function reportHtml(r,hws,teacher){ const tests=IELTS_MOCKS.filter(m=>r.mocks&&r.mocks[m.id]).map(m=>{ const x=r.mocks[m.id]; const b=['L','R','W','S'].map(k=>x[k]?x[k][0]:null); const ov=b.every(v=>v!=null)?roundBand(b.reduce((a,c)=>a+c,0)/4):null; return {t:m.title.replace('IELTS Academic · ',''),b,ov}; });
  const best=tests.reduce((a,x)=>x.ov!=null&&(a==null||x.ov>a)?x.ov:a,null), weak=weakTypes(r.qt);
  const bars=tests.filter(x=>x.ov!=null); const W=520,H=180,bw=Math.min(60,(W-40)/Math.max(1,bars.length)-12);
  const svg=bars.length?'<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Баллы IELTS">'+[4,5,6,7,8,9].map(v=>{ const y=H-24-(v-3)/6*(H-40); return '<line x1="30" x2="'+W+'" y1="'+y+'" y2="'+y+'" stroke="#eee"/><text x="22" y="'+(y+4)+'" font-size="11" text-anchor="end" fill="#888">'+v+'</text>'; }).join('')
    +bars.map((x,i)=>{ const h=(x.ov-3)/6*(H-40), X=40+i*(bw+12); return '<rect x="'+X+'" y="'+(H-24-h)+'" width="'+bw+'" height="'+h+'" rx="6" fill="#FF7A12"/><text x="'+(X+bw/2)+'" y="'+(H-28-h)+'" font-size="12" font-weight="700" text-anchor="middle">'+x.ov.toFixed(1)+'</text><text x="'+(X+bw/2)+'" y="'+(H-8)+'" font-size="11" text-anchor="middle" fill="#666">'+escH(x.t.replace('Тест ','Т'))+'</text>'; }).join('')+'</svg>':'<p class="muted">Пробных тестов IELTS целиком пока не было.</p>';
  const hwRows=hws.map(h=>{ const done=(r.hwDone||[]).includes(h.id)||hwDoneR(h,r), res=(r.hwRes||{})[h.id]; return '<tr><td>'+escH(hwTitle(h))+'</td><td>'+escH(h.due||'—')+'</td><td>'+(done?'✓ сделано'+(res?' ('+res.score+'/'+res.total+')':''):'не сделано')+'</td></tr>'; }).join('');
  const d=new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
  return '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Отчёт · '+escH(r.name||'ученик')+'</title><style>'
   +'body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#2A1608;background:#FFF8EF;margin:0;padding:24px} .page{max-width:760px;margin:auto;background:#fff;border-radius:20px;padding:28px;box-shadow:0 10px 40px -20px rgba(80,30,0,.3)}'
   +'h1{margin:0 0 4px;font-size:26px} h2{font-size:17px;margin:26px 0 10px} .muted{color:#8a7766} .tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:16px} .tile{background:#FFF1E2;border-radius:14px;padding:12px;text-align:center} .tile b{display:block;font-size:24px} .tile span{font-size:12px;color:#8a5a33}'
   +'table{width:100%;border-collapse:collapse;font-size:14px} th,td{padding:8px 6px;border-bottom:1px solid #f0e4d6;text-align:left} th{color:#8a7766;font-weight:600} .brand{display:flex;align-items:center;gap:10px;color:#FF7A12;font-weight:800;font-size:18px} .dot{width:28px;height:28px;border-radius:50%;background:#FF7A12}'
   +'@media print{body{background:#fff;padding:0} .page{box-shadow:none}} @media(max-width:560px){.tiles{grid-template-columns:repeat(2,1fr)}}</style><\/head><body><div class="page">'
   +'<div class="brand"><span class="dot"></span>wordy</div><h1>Отчёт об успехах: '+escH(r.name||'ученик')+'</h1><p class="muted">'+d+(teacher?' · преподаватель: '+escH(teacher):'')+' · уровень '+escH(r.level||'—')+'</p>'
   +'<div class="tiles"><div class="tile"><b>'+(r.learned|0)+'</b><span>слов выучено</span></div><div class="tile"><b>'+(r.streak|0)+'</b><span>дней подряд</span></div><div class="tile"><b>'+(best!=null?best.toFixed(1):'—')+'</b><span>лучший IELTS</span></div><div class="tile"><b>'+(r.gram|0)+'</b><span>тем грамматики</span></div></div>'
   +'<h2>Пробные тесты IELTS</h2>'+svg+(tests.length?'<table><tr><th>Тест</th><th>Listening</th><th>Reading</th><th>Writing</th><th>Speaking</th><th>Итог</th></tr>'+tests.map(x=>'<tr><td>'+escH(x.t)+'</td>'+x.b.map(v=>'<td>'+(v!=null?(+v).toFixed(1):'—')+'</td>').join('')+'<td><b>'+(x.ov!=null?x.ov.toFixed(1):'—')+'</b></td></tr>').join('')+'</table>':'')
   +(weak.length?'<h2>Над чем работаем</h2><ul>'+weak.map(w=>'<li>'+escH(w.name)+' — '+w.pct+'% верно</li>').join('')+'</ul>':'')
   +(hwRows?'<h2>Домашние задания</h2><table><tr><th>Задание</th><th>Срок</th><th>Статус</th></tr>'+hwRows+'</table>':'')
   +'<h2>Активность</h2><p>Прочитано текстов: '+(r.reads|0)+' · повторений слов: '+(r.reviews|0)+' · быстрых тренировок: '+(r.drills|0)+' · своих слов: '+(r.myN|0)+' · эссе: '+((r.essays||[]).length)+'</p>'
   +'<p class="muted" style="margin-top:28px;font-size:12px">Баллы пробных тестов ориентировочные: Listening и Reading проверяются автоматически, Writing и Speaking оценивает ИИ. Отчёт сформирован в приложении Wordy.</p></div><\/body><\/html>'; }
function StudentCard({r,hws,update}){ const [open,setOpen]=useState(false);
  const tests=IELTS_MOCKS.filter(m=>r.mocks&&r.mocks[m.id]);
  const lastBands=tests.map(m=>{ const x=r.mocks[m.id]; const b=['L','R','W','S'].map(k=>x[k]&&x[k][0]); const all=b.every(v=>v!=null); return {m,b,ov:all?roundBand(b.reduce((a,c)=>a+c,0)/4):null}; });
  const best=lastBands.reduce((a,x)=>x.ov!=null&&(a==null||x.ov>a)?x.ov:a,null);
  const pend=hws.filter(h=>!(r.hwDone||[]).includes(h.id)&&!hwDoneR(h,r));
  const active=r.lastDay===dayKey()?'сегодня':r.lastDay===dayKey(-1)?'вчера':(r.lastDay||'—');
  return html`<article className="tc-card">
    <button className="tc-top" aria-expanded=${open} onClick=${()=>{ SFX('tap'); setOpen(!open); }}>
      <span className="tc-av" aria-hidden="true">${(r.name||'?').trim().charAt(0).toUpperCase()||'?'}</span>
      <span className="tc-who"><b>${r.name||'Без имени'}</b><small>${r.level||'—'} · был(а) ${active}${r.src==='code'?' · по коду':''}</small></span>
      <span className="tc-stat"><b>${r.streak||0}</b><small>серия</small></span><span className="tc-stat"><b>${r.learned||0}</b><small>слов</small></span><span className="tc-stat"><b>${best!=null?fmtB(best):'—'}</b><small>IELTS</small></span>
    </button>
    ${open?html`<div className="tc-body">
      <p className="muted">XP ${r.xp||0} · грамматика: ${r.gram||0} тем · текстов прочитано: ${r.reads||0} · повторений: ${r.reviews||0} · отчёт ${ago(r.at)}</p>
      ${lastBands.length?html`<table className="tc-tab"><thead><tr><th>Тест</th><th>L</th><th>R</th><th>W</th><th>S</th><th>Итог</th></tr></thead><tbody>
        ${lastBands.map(x=>html`<tr key=${x.m.id}><td>${x.m.title.replace('IELTS Academic · ','')}</td>${x.b.map((v,i)=>html`<td key=${i}>${v!=null?fmtB(v):'—'}</td>`)}<td><b>${x.ov!=null?fmtB(x.ov):'—'}</b></td></tr>`)}</tbody></table>`:html`<p className="muted">Пробных IELTS ещё не было.</p>`}
      ${weakTypes(r.qt).length?html`<p><b>Слабые места:</b> ${weakTypes(r.qt).map(w=>w.name+' — '+w.pct+'%').join(' · ')}</p>`:null}
      ${hws.length?html`<p><b>Домашка:</b> ${pend.length?pend.length+' не сделано':'всё сделано ✓'}${Object.keys(r.hwRes||{}).length?' · '+hws.filter(h=>(r.hwRes||{})[h.id]).map(h=>hwTitle(h)+': '+r.hwRes[h.id].score+'/'+r.hwRes[h.id].total).join(' · '):''}</p>`:null}
      <${TeacherEssays} r=${r} update=${update}/>
      <div className="actions"><button className="btn small ghost" onClick=${async()=>{ SFX('pop'); const res=await saveFile('wordy-otchet-'+String(r.name||'uchenik').replace(/\s+/g,'-').slice(0,30)+'-'+dayKey()+'.html',reportHtml(r,hws,'')); if(res==='saved'||res==='link') W('say','Отчёт готов — его можно открыть в браузере и распечатать в PDF.',0,true); }}>${MI.book()} Отчёт для родителей</button></div>
    </div>`:null}
  </article>`; }
function hwDoneR(h,r){ if(['free','words','text','essay'].includes(h.kind)) return false; const x=(r.mocks||{})[h.test]||{}, since=h.from||'0', ok=k=>x[k]&&(x[k][2]||'')>=since;
  if(h.kind==='sat') return ok('sat'); if(h.part==='full') return ['L','R','W','S'].every(ok); return ok(h.part); }
function weakTypes(qt){ return Object.entries(qt||{}).filter(([,v])=>v&&v[1]>=4).map(([k,v])=>({name:QT_NAMES[k]||k,pct:Math.round(v[0]/v[1]*100)})).filter(x=>x.pct<70).sort((a,b)=>a.pct-b.pct).slice(0,3); }
const QT_NAMES={tfng:'TRUE/FALSE/NOT GIVEN',ynng:'YES/NO/NOT GIVEN',heads:'заголовки',pm:'абзацы',gapR:'пропуски (Reading)',boxR:'выбор из списка (Reading)',mcqR:'выбор ответа (Reading)',gapL:'пропуски (Listening)',mcqL:'выбор ответа (Listening)',matchL:'сопоставление (Listening)'};

function TeacherCabinet({st,update,onClose}){ const cloud=useCloud(); const [live,setLive]=useState([]), [paste,setPaste]=useState(''), [msg,setMsg]=useState('');
  const [f,setF,clrF,fAt]=useDraftState('hwform',{kind:'ielts',test:'ielts1',part:'R',due:dayKey(7),note:'',title:'',words:'',text:'',qtxt:'',qs:[],prompt:'',min:250}), [hwCode,setHwCode]=useState(null), [busy,setBusy]=useState(false), [gen,setGen]=useState(false), [genErr,setGenErr]=useState(null); const ai=useSample();
  const genQs=()=>{ if(!ai||gen||wcount(f.text)<60) return; setGen(true); setGenErr(null); W('react','think');
    ai.json(qGenPrompt(f.title||'Text',f.text),null,{fast:true,fresh:true}).then(j=>{ const qs=cleanQs(j); if(!qs.length) throw {code:'invalid_json'}; setF(x=>({...x,qs})); SFX('correct'); }).catch(e=>setGenErr(aiErr(e))).finally(()=>setGen(false)); };
  const fQs=f.qs.length?f.qs:parseQLines(f.qtxt), fWords=parseWordLines(f.words);
  const canCreate=f.kind==='free'?!!f.note.trim():f.kind==='words'?fWords.length>=1:f.kind==='text'?(wcount(f.text)>=30&&fQs.length>=1):f.kind==='essay'?f.prompt.trim().length>=15:true;
  useEffect(()=>{ W('goTo','home'); window.scrollTo({top:0}); if(!(cloud.state==='on'&&cloud.owner)) return; let un=null;
    try{ un=cloud.db.collection('students').onSnapshot(s=>setLive(s.docs.map(d=>({...d.data(),uid:d.id,src:'cloud'}))),()=>{}); }catch(e){}
    return ()=>{ un&&un(); }; },[cloud.state,cloud.owner]);
  const local=Object.values(st.tStudents||{}).map(r=>({...r,src:'code'}));
  const bySid={}; [...local,...live].forEach(r=>{ const k=r.sid||r.uid; if(!bySid[k]||(r.at||0)>(bySid[k].at||0)) bySid[k]=r; });
  const students=Object.values(bySid).sort((a,b)=>(b.at||0)-(a.at||0));
  const myHw=[...(cloud.owner?cloud.hw:[]),...(st.tHw||[])].filter((h,i,a)=>a.findIndex(x=>x.id===h.id)===i).sort((a,b)=>(b.ts||0)-(a.ts||0));
  const addReport=()=>{ const E=readCode(paste,'E1'); if(E&&E.sid&&E.essay){ update(s=>{ const cur=(s.tStudents||{})[E.sid]||{sid:E.sid,name:E.name,at:0}; const es=[E.essay,...(cur.essays||[]).filter(x=>x.id!==E.essay.id)].slice(0,20);
      return {tStudents:{...(s.tStudents||{}),[E.sid]:{...cur,name:cur.name||E.name,essays:es}}}; }); setPaste(''); setMsg('Эссе ученика '+(E.name||'')+' добавлено в его карточку.'); SFX('correct'); return; }
    const r0=readCode(paste,'R1'); const r=r0&&{...r0,essays:((st.tStudents||{})[r0.sid]||{}).essays||r0.essays}; if(!r||!r.sid){ SFX('wrong'); setMsg('Не получилось прочитать код. Попроси ученика скопировать его целиком.'); return; }
    update(s=>({tStudents:{...(s.tStudents||{}),[r.sid]:r}})); setPaste(''); setMsg('Отчёт ученика '+(r.name||'без имени')+' добавлен.'); SFX('correct'); W('react','happy'); };
  const createHw=async()=>{ if(busy) return; setBusy(true); SFX('pop');
    const base={id:newId(),kind:f.kind,due:f.due||null,note:f.note.trim().slice(0,200),from:dayKey(),ts:Date.now()};
    const h=f.kind==='words'?{...base,title:f.title.trim().slice(0,60),words:fWords}:f.kind==='text'?{...base,title:f.title.trim().slice(0,80),text:f.text.slice(0,9000),qs:fQs}
      :f.kind==='essay'?{...base,title:f.title.trim().slice(0,80),prompt:f.prompt.trim().slice(0,1200),min:f.min}:{...base,test:f.kind==='free'?null:f.test,part:f.kind==='sat'?'sat':f.kind==='free'?null:f.part};
    let online=false; if(cloud.state==='on'&&cloud.owner){ try{ await cloud.db.doc('hw/'+h.id).set(h); online=true; }catch(e){} }
    update(s=>({tHw:[h,...(s.tHw||[])].slice(0,60)})); setHwCode(makeCode('H1',{hw:[h]})); setBusy(false); clrF();
    W('react','cheer'); W('say',online?'Задание отправлено ученикам!':'Задание готово. Отправь код ученикам.',0,true); };
  const delHw=async h=>{ SFX('tap'); if(cloud.state==='on'&&cloud.owner){ try{ await cloud.db.doc('hw/'+h.id).delete(); }catch(e){} } update(s=>({tHw:(s.tHw||[]).filter(x=>x.id!==h.id)})); };
  const tests=f.kind==='sat'?SAT_MOCKS:IELTS_MOCKS;
  return html`<section className="tc">
    <div className="sess-top"><button className="btn small ghost" id="tc-close" onClick=${onClose}>‹ Назад</button><div className="gm-h"><b>Кабинет учителя</b><span className="muted">${students.length} учеников</span></div></div>
    <p className="muted tc-note">${cloud.state==='on'&&cloud.owner?'Ученики, которым ты открыл приложение по e-mail как редакторам, появляются здесь сами. Остальные присылают код отчёта.':'Ученики присылают код отчёта из раздела «Настройки → Мой учитель». Вставь его ниже.'}</p>
    <div className="sec-h"><h2>Ученики</h2></div>
    ${students.length?students.map(r=>html`<${StudentCard} key=${r.sid||r.uid} r=${r} hws=${myHw} update=${update}/>`):html`<div className="tc-empty">Пока никого нет. Попроси учеников отправить отчёт.</div>`}
    <div className="code-box"><textarea id="tc-paste" rows="2" value=${paste} placeholder="Вставь код отчёта или эссе ученика (WORDY-R1 / WORDY-E1…)" onChange=${e=>{ setPaste(e.target.value); setMsg(''); }} aria-label="Код отчёта ученика"></textarea>
      <div className="actions"><button className="btn small" id="tc-add" disabled=${!paste.trim()} onClick=${addReport}>Добавить отчёт</button></div>${msg?html`<p className="muted" role="status">${msg}</p>`:null}</div>
    <div className="sec-h"><h2>Новое задание</h2></div>
    ${fAt&&!hwCode?html`<${DraftNote} at=${fAt} onReset=${()=>{ clrF(); setF({kind:'ielts',test:'ielts1',part:'R',due:dayKey(7),note:'',title:'',words:'',text:'',qtxt:'',qs:[],prompt:'',min:250}); }}/>`:null}
    <div className="set-group">
      <div className="set-row wrap"><div><strong>Что задать</strong></div><div className="chips">
        ${[['ielts','IELTS'],['sat','SAT'],['words','Слова'],['text','Текст'],['essay','Эссе'],['free','Своё']].map(([k,l])=>html`<button key=${k} className="chip" id=${'tck-'+k} aria-pressed=${f.kind===k} onClick=${()=>setF({...f,kind:k,test:(k==='sat'?SAT_MOCKS:IELTS_MOCKS)[0].id})}>${l}</button>`)}</div></div>
      ${['words','text','essay'].includes(f.kind)?html`<div className="set-row wrap"><div><strong>Название</strong></div><input className="set-in wide" id="tc-title" maxLength="80" value=${f.title} placeholder=${f.kind==='words'?'Например: Урок 5 · Environment':f.kind==='text'?'Заголовок текста':'Например: Essay · Technology'} onChange=${e=>setF({...f,title:e.target.value})}/></div>`:null}
      ${f.kind==='words'?html`<div className="set-row wrap"><div><strong>Слова</strong><p>По одному на строку: <code>word — перевод</code>. Без перевода — возьму из словаря Wordy.</p></div></div>
        <div className="code-box"><textarea id="tc-words" rows="6" value=${f.words} placeholder=${'sustainable — устойчивый\nto tackle — решать (проблему)\nemissions'} onChange=${e=>setF({...f,words:e.target.value})}></textarea><small className="muted">${fWords.length} слов${fWords.filter(w=>!w.ru).length?' · без перевода: '+fWords.filter(w=>!w.ru).map(w=>w.en).join(', '):''}</small></div>`:null}
      ${f.kind==='text'?html`<div className="set-row wrap"><div><strong>Текст</strong><p>Вставь текст для чтения (например, из статьи или своего материала)</p></div></div>
        <div className="code-box"><textarea id="tc-text" rows="7" value=${f.text} onChange=${e=>setF({...f,text:e.target.value,qs:[]})} placeholder="Текст на английском…"></textarea>
          <div className="actions">${ai?html`<button className="btn small" id="tc-gen" disabled=${gen||wcount(f.text)<60} onClick=${genQs}>${gen?'Составляю вопросы…':MI.spark()} ${gen?'':'Составить вопросы с ИИ'}</button>`:null}<small className="muted">${wcount(f.text)} слов</small></div>
          ${genErr?html`<p className="mk-err">${genErr}</p>`:null}
          ${f.qs.length?html`<ol className="tc-qs">${f.qs.map((q,i)=>html`<li key=${i}>${q.q} <b>→ ${q.t==='tfng'?TFNG[q.a]:q.a.join(' / ')}</b> <button className="link-btn" aria-label="Убрать вопрос" onClick=${()=>setF(x=>({...x,qs:x.qs.filter((_,j)=>j!==i)}))}>убрать</button></li>`)}</ol>`
            :html`<p className="muted">Или свои вопросы, по одному на строку: <code>утверждение | TRUE</code> (FALSE / NOT GIVEN) или <code>вопрос с ___ | ответ</code></p><textarea id="tc-qtxt" rows="4" value=${f.qtxt} onChange=${e=>setF({...f,qtxt:e.target.value})}></textarea><small className="muted">${fQs.length} вопросов</small>`}</div>`:null}
      ${f.kind==='essay'?html`<div className="set-row wrap"><div><strong>Задание</strong></div><div className="chips">${[150,250].map(n=>html`<button key=${n} className="chip" aria-pressed=${f.min===n} onClick=${()=>setF({...f,min:n})}>от ${n} слов</button>`)}</div></div>
        <div className="code-box"><textarea id="tc-prompt" rows="4" value=${f.prompt} placeholder="Some people think that… To what extent do you agree or disagree?" onChange=${e=>setF({...f,prompt:e.target.value})}></textarea></div>`:null}
      ${f.kind==='ielts'||f.kind==='sat'?html`<div className="set-row wrap"><div><strong>Тест</strong></div>
        <select className="mk-sel" id="tc-test" value=${f.test} onChange=${e=>setF({...f,test:e.target.value})}>${tests.map(m=>html`<option key=${m.id} value=${m.id}>${m.title}</option>`)}</select></div>`:null}
      ${f.kind==='ielts'?html`<div className="set-row wrap"><div><strong>Часть</strong></div><div className="chips">
        ${['L','R','W','S','full'].map(k=>html`<button key=${k} className="chip" aria-pressed=${f.part===k} onClick=${()=>setF({...f,part:k})}>${HW_PARTS[k]}</button>`)}</div></div>`:null}
      <div className="set-row wrap"><div><strong>Срок</strong></div><input type="date" className="set-in" id="tc-due" value=${f.due} onChange=${e=>setF({...f,due:e.target.value})}/></div>
      <div className="set-row wrap"><div><strong>${f.kind==='free'?'Задание':'Комментарий'}</strong></div>
        <input className="set-in wide" id="tc-note" maxLength="200" value=${f.note} placeholder=${f.kind==='free'?'Например: выучить 20 слов из урока 5':'Например: обрати внимание на NOT GIVEN'} onChange=${e=>setF({...f,note:e.target.value})}/></div>
      <div className="set-row"><button className="btn wide" id="tc-create" disabled=${busy||!canCreate} onClick=${createHw}>Задать</button></div>
    </div>
    ${hwCode?html`<div className="code-box"><p className="muted">Код задания для учеников без онлайн-доступа:</p><textarea readOnly rows="2" value=${hwCode} onFocus=${e=>e.target.select()} aria-label="Код задания"></textarea>
      <div className="actions"><button className="btn small" onClick=${()=>{ navigator.clipboard&&navigator.clipboard.writeText(hwCode).then(()=>SFX('correct'),()=>{}); }}>Скопировать</button>${hwCode.length>3800?html`<small className="muted">Код длинный (${hwCode.length} символов): Telegram может разбить его на части — лучше отправить в WhatsApp или как файл.</small><button className="btn small ghost" onClick=${()=>saveFile('wordy-zadanie.txt',hwCode)}>Сохранить файлом</button>`:null}</div></div>`:null}
    ${myHw.length?html`<div className="sec-h"><h2>Выданные задания</h2></div>${myHw.map(h=>{ const n=students.filter(r=>(r.hwDone||[]).includes(h.id)||hwDoneR(h,r)).length;
      return html`<div key=${h.id} className="hw-row"><div className="hw-main"><b>${hwTitle(h)}</b><small>${dueLabel(h.due)} · сделали ${n} из ${students.length}</small></div>
        <button className="btn small ghost" onClick=${()=>{ const c=makeCode('H1',{hw:[h]}); setHwCode(c); }}>Код</button>
        <button className="btn small ghost" aria-label="Удалить задание" onClick=${()=>delHw(h)}>✕</button></div>`; })}`:null}
  </section>`; }


/* ---------- teacher-made homework: word lists, own texts with questions, essays (+ essay bank with teacher comments) ---------- */
function parseWordLines(txt){ return String(txt||'').split(/\n+/).map(l=>l.trim()).filter(Boolean).slice(0,60).map(l=>{ const m=l.split(/\s+[—–-]\s+|\t|\s*[=:]\s+/);
  const en=(m[0]||'').trim().slice(0,60), ru=(m.slice(1).join(' ')||'').trim().slice(0,80); const d=!ru&&dictFind(en); return {en,ru:ru||(d?d.ru:''),def:d?d.def:'',ipa:d?d.ipa:''}; }).filter(w=>w.en); }
function parseQLines(txt){ return String(txt||'').split(/\n+/).map(l=>l.trim()).filter(Boolean).slice(0,15).map(l=>{ const [q,a]=l.split(/\s*\|\s*/); if(!q||!a) return null;
  const A=a.trim().toUpperCase(); if(['TRUE','FALSE','NOT GIVEN','NG'].includes(A)) return {t:'tfng',q:q.trim(),a:A==='NG'?2:['TRUE','FALSE','NOT GIVEN'].indexOf(A)};
  return {t:'gap',q:q.trim(),a:a.split('/').map(x=>x.trim()).filter(Boolean)}; }).filter(Boolean); }
const qGenPrompt=(title,text)=>'You are an IELTS Academic reading item writer. Write 8 questions for the text below in real IELTS style: 4 TRUE/FALSE/NOT GIVEN statements (at least one of each answer) and 4 sentence-completion items whose answer is ONE or TWO words copied exactly from the text (mark the gap as ___). Questions must follow the order of the text. Reply with ONLY JSON: {"qs":[{"t":"tfng","q":"statement","a":"TRUE|FALSE|NOT GIVEN"},{"t":"gap","q":"sentence with ___","a":["answer","alternative"]}]}\n\nTITLE: '+title+'\nTEXT:\n'+text.slice(0,7000);
function cleanQs(j){ const out=[]; ((j&&j.qs)||[]).slice(0,12).forEach(x=>{ if(!x||!x.q) return; if(x.t==='tfng'){ const i=['TRUE','FALSE','NOT GIVEN'].indexOf(String(x.a).toUpperCase()); if(i>=0) out.push({t:'tfng',q:String(x.q).slice(0,300),a:i}); }
  else { const a=(Array.isArray(x.a)?x.a:[x.a]).map(s=>String(s||'').trim()).filter(Boolean).slice(0,4); if(a.length) out.push({t:'gap',q:String(x.q).includes('___')?String(x.q).slice(0,300):String(x.q).slice(0,300)+' ___',a}); } }); return out; }
/* student runners */
function HwText({h,st,update,onExit}){ const [ans,setAns,clrH,dAt]=useDraftState('hwt:'+h.id,{},v=>!Object.keys(v).length), [done,setDone]=useState(false); const [tapH,popH]=useWordTap({st,update,on:true,src:'Домашка · '+(h.title||'текст')});
  const qs=h.qs||[], ok=(q,v)=>q.t==='tfng'?v===q.a:gapOk(v||'',q.a), score=qs.filter((q,i)=>ok(q,ans[i])).length;
  const finish=()=>{ setDone(true); clrH(); window.scrollTo({top:0}); update(s=>({hwDone:{...(s.hwDone||{}),[h.id]:dayKey()},hwRes:{...(s.hwRes||{}),[h.id]:{score,total:qs.length,date:dayKey()}},coins:s.coins+10+score}));
    if(score>=qs.length*.75){ SFX('fanfare'); W('react','cheer'); } else { SFX('pop'); W('react','encourage'); } W('say','Домашка сдана: '+score+' из '+qs.length+'!',0,true); };
  return html`<section className="mk-sec"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>${h.title||'Текст от учителя'}</b><span className="muted">Домашка · ${qs.length} вопросов</span></div></div>
    ${!done&&dAt?html`<${DraftNote} at=${dAt} onReset=${()=>{ clrH(); setAns({}); }}/>`:null}
    ${done?html`<div className="mk-res enter" data-perch="card"><span className="phase">Результат</span><span className="mk-big">${score}/${qs.length}</span><p>+${10+score} монет · учитель увидит результат в отчёте</p></div>`:null}
    <article className="mk-paper wt-on enter" onClick=${tapH}><h3>${h.title||''}</h3>${String(h.text||'').split(/\n\s*\n|\n/).filter(Boolean).map((p,i)=>html`<p key=${i}>${p}</p>`)}</article>${popH}
    <article className="mk-paper">${h.note?html`<p className="mk-ins">${h.note}</p>`:null}
      ${qs.map((q,i)=>html`<div key=${i} className=${'mk-q'+(done?(ok(q,ans[i])?' good':' bad'):'')}><div className="mk-qt"><span className="mk-qn">${i+1}</span><span>${q.t==='gap'?q.q.split('___')[0]:q.q}${q.t==='gap'?html`<${GapIn} id=${'hq-'+i} val=${ans[i]} set=${v=>!done&&setAns(a=>({...a,[i]:v}))} res=${done} ok=${ok(q,ans[i])} answer=${q.a[0]}/>${q.q.split('___')[1]||''}`:null}</span></div>
        ${q.t==='tfng'?html`<${OptRow} opts=${TFNG} val=${ans[i]} set=${v=>!done&&setAns(a=>({...a,[i]:v}))} dis=${done} res=${done} correct=${q.a} id=${'hq-'+i} compact=${true}/>`:null}</div>`)}</article>
    <div className="mk-foot">${done?html`<button className="btn wide" onClick=${onExit}>Готово</button>`:html`<button className="btn wide" id="hq-finish" onClick=${finish}>Сдать</button>`}</div></section>`; }
function HwEssay({h,st,update,onExit}){ const ai=useSample(); const [txt,setTxt,clrE,dAt]=useDraftState('hwe:'+h.id,''), [fb,setFb]=useState(null), [busy,setBusy]=useState(false), [err,setErr]=useState(null), [sent,setSent]=useState(false);
  const min=h.min||250, wc=wcount(txt), T={prompt:h.prompt};
  const submit=()=>{ SFX('pop'); setSent(true); clrE(); window.scrollTo({top:0}); const e={id:newId(),hw:h.id,title:h.title||'Эссе от учителя',prompt:h.prompt,text:txt.slice(0,6000),date:dayKey(),band:null};
    const save=f=>update(s=>({essays:[{...e,band:f?f.band:null,crit:f?f.crit:null},...(s.essays||[])].slice(0,20),hwDone:{...(s.hwDone||{}),[h.id]:dayKey()},coins:s.coins+15}));
    if(ai&&wc>=40){ setBusy(true); ai.json(writingPrompt(min>=250?'t2':'t1',T,txt)).then(j=>{ const f=cleanFb(j,['ta','cc','lr','gra']); setFb(f); save(f); W('react','happy'); }).catch(x=>{ setErr(aiErr(x)); save(null); }).finally(()=>setBusy(false)); }
    else save(null); W('say','Эссе отправлено учителю!',0,true); };
  return html`<section className="mk-sec"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>${h.title||'Эссе'}</b><span className="muted">Домашка · от ${min} слов</span></div></div>
    ${!sent&&dAt?html`<${DraftNote} at=${dAt} onReset=${()=>{ clrE(); setTxt(''); }}/>`:null}
    <article className="mk-paper enter"><p className="mk-prompt">${h.prompt}</p>${h.note?html`<p className="mk-ins">${h.note}</p>`:null}</article>
    ${!sent?html`<div className="mk-write"><textarea id="he-text" className="mk-text" value=${txt} onChange=${e=>setTxt(e.target.value)} placeholder="Пиши эссе здесь на английском…" spellCheck=${false}></textarea><div className="mk-wc"><span className=${wc>=min?'ok':''}>${wc} / ${min} слов</span></div></div>
      <div className="mk-foot"><button className="btn wide" id="he-submit" disabled=${wc<20} onClick=${submit}>Сдать учителю</button></div>`
    :html`${busy?html`<div className="mk-fb wait" role="status"><span className="mk-spin" aria-hidden="true"></span>ИИ проверяет эссе… обычно несколько секунд</div>`:fb?html`<${Feedback} fb=${fb} keys=${['ta','cc','lr','gra']}/><${UpgradeBox} task=${min>=250?'t2':'t1'} T=${T} text=${txt} ai=${ai}/>`:html`<div className="mk-fb"><p>Эссе сохранено и попадёт в отчёт учителю.</p>${err?html`<p className="mk-err">${err}</p>`:null}</div>`}
      <div className="mk-foot"><button className="btn wide" onClick=${onExit}>Готово</button></div>`}</section>`; }
/* student essay bank: Progress tab */
function EssayBank({st}){ const cloud=useCloud(); const [notes,setNotes]=useState({}), [open,setOpen]=useState(null), [code,setCode]=useState(null);
  useEffect(()=>{ if(cloud.state!=='on'||!cloud.uid||cloud.owner) return; let un=null; try{ un=cloud.db.doc('notes/'+cloud.uid).onSnapshot(s=>setNotes(s.exists?s.data():{}),()=>{}); }catch(e){} return ()=>{ un&&un(); }; },[cloud.state,cloud.uid]);
  const list=st.essays||[]; if(!list.length) return null;
  return html`<div className="sec-h"><h2>Мои эссе</h2><span className="muted">${list.length}</span></div>
    <div className="my-words">${list.map(e=>{ const n=notes[e.id]||(st.essayNotes||{})[e.id];
      return html`<div key=${e.id} className="es-item"><button className="es-top" aria-expanded=${open===e.id} onClick=${()=>{ SFX('tap'); setOpen(open===e.id?null:e.id); setCode(null); }}><b>${e.title}</b><small>${e.date} · ${wcount(e.text)} слов${e.band!=null?' · ИИ: '+fmtB(e.band):''}${n?' · есть комментарий учителя':''}</small></button>
        ${open===e.id?html`<div className="es-body"><p className="muted">${e.prompt}</p>${e.text.split(/\n\s*\n/).map((p,i)=>html`<p key=${i}>${p}</p>`)}
          ${n?html`<div className="es-note"><b>Комментарий учителя</b><p>${n}</p></div>`:null}
          <button className="btn small ghost" onClick=${()=>setCode(makeCode('E1',{sid:st.sid,name:st.sname||'',essay:{...e,text:e.text.slice(0,4000)}}))}>Отправить учителю кодом</button>
          ${code?html`<div className="code-box"><textarea readOnly rows="3" value=${code} onFocus=${x=>x.target.select()}></textarea><div className="actions"><button className="btn small" onClick=${()=>navigator.clipboard&&navigator.clipboard.writeText(code).then(()=>SFX('correct'),()=>{})}>Скопировать</button></div></div>`:null}</div>`:null}</div>`; })}</div>`; }
/* teacher: essays inside a student card */
function TeacherEssays({r,update}){ const cloud=useCloud(); const [open,setOpen]=useState(null), [txt,setTxt]=useState({}), [saved,setSaved]=useState({}), [notes,setNotes]=useState({});
  const ess=r.essays||[]; const uid=r.uid;
  useEffect(()=>{ if(!(cloud.state==='on'&&cloud.owner&&uid)) return; let un=null; try{ un=cloud.db.doc('notes/'+uid).onSnapshot(s=>setNotes(s.exists?s.data():{}),()=>{}); }catch(e){} return ()=>{ un&&un(); }; },[cloud.state,uid]);
  if(!ess.length) return null;
  const save=async e=>{ const c=(txt[e.id]||'').trim(); if(!c) return; SFX('pop');
    if(cloud.state==='on'&&cloud.owner&&uid){ try{ await cloud.db.doc('notes/'+uid).set({...notes,[e.id]:c.slice(0,2000)}); setSaved(x=>({...x,[e.id]:'online'})); W('react','happy'); return; }catch(x){} }
    const msg='Комментарий к эссе «'+e.title+'» ('+e.date+'):\n'+c; try{ await navigator.clipboard.writeText(msg); }catch(x){} setSaved(x=>({...x,[e.id]:'copied'})); };
  return html`<div className="tc-ess"><b>Эссе (${ess.length})</b>${ess.map(e=>html`<div key=${e.id} className="es-item"><button className="es-top" onClick=${()=>setOpen(open===e.id?null:e.id)}><b>${e.title}</b><small>${e.date} · ${wcount(e.text)} слов${e.band!=null?' · ИИ: '+fmtB(e.band):''}${notes[e.id]?' · комментарий отправлен':''}</small></button>
    ${open===e.id?html`<div className="es-body"><p className="muted">${e.prompt}</p>${String(e.text).split(/\n\s*\n/).map((p,i)=>html`<p key=${i}>${p}</p>`)}
      <textarea className="mk-text small" placeholder="Твой комментарий ученику…" value=${txt[e.id]!=null?txt[e.id]:(notes[e.id]||'')} onChange=${x=>{ const v=x.target.value; setTxt(t=>({...t,[e.id]:v})); }}></textarea>
      <div className="actions"><button className="btn small" onClick=${()=>save(e)}>${cloud.state==='on'&&cloud.owner&&uid?'Отправить комментарий':'Скопировать комментарий'}</button>${saved[e.id]?html`<span className="ok-chip">${saved[e.id]==='online'?'✓ ученик увидит его в «Моих эссе»':'✓ скопировано — отправь в мессенджере'}</span>`:null}</div></div>`:null}</div>`)}</div>`; }

/* ---------- backup: file (downloads capability or plain link), private cloud copy (db data/users/<id>), restore ---------- */
const BK_TAG='wordy-backup';
const makeBackup=st=>JSON.stringify({kind:BK_TAG,v:1,at:Date.now(),state:st});
function readBackup(txt){ try{ const o=JSON.parse(txt); if(o&&o.kind===BK_TAG&&o.state&&typeof o.state==='object') return o; }catch(e){} return null; }
async function saveFile(name,data){ try{ const c=window.claude, d=c&&typeof c.use==='function'?await c.use('downloads').catch(()=>null):null;
    if(d){ await d.save({filename:name,data}); return 'saved'; } }catch(e){ if(e&&e.code==='declined') return 'declined'; }
  try{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([data],{type:/\.html$/.test(name)?'text/html':/\.txt$/.test(name)?'text/plain':'application/json'})); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1500); return 'link'; }catch(e){ return 'fail'; } }
function BackupBox({st,restore}){ const cloud=useCloud(); const [msg,setMsg]=useState(''), [cloudAt,setCloudAt]=useState(null), [busy,setBusy]=useState(false), [ask,setAsk]=useState(null); const fileRef=useRef(null);
  const canCloud=cloud.state==='on'&&cloud.uid;
  const ref=()=>cloud.db.doc('data/users/'+cloud.uid+'/backup');
  useEffect(()=>{ if(!canCloud) return; ref().get().then(s=>{ if(s.exists){ const d=s.data(); setCloudAt(d.at||null); } }).catch(()=>{}); },[canCloud]);
  const toFile=async()=>{ SFX('pop'); const r=await saveFile('wordy-progress-'+dayKey()+'.json',makeBackup(st)); setMsg(r==='saved'||r==='link'?'Файл с прогрессом сохранён. Храни его в надёжном месте.':r==='declined'?'Сохранение отменено.':'Не получилось сохранить файл в этом окне.'); };
  const toCloud=async()=>{ if(!canCloud||busy) return; setBusy(true); try{ const at=Date.now(); await ref().set({at,data:makeBackup(st)}); setCloudAt(at); setMsg('Копия сохранена в облаке Claude. Её видишь только ты.'); SFX('correct'); }catch(e){ setMsg(e&&e.code==='quota_exceeded'?'В облаке не хватило места.':'Не получилось сохранить в облако.'); } setBusy(false); };
  const fromCloud=async()=>{ if(!canCloud) return; try{ const s=await ref().get(); const o=s.exists&&readBackup(s.data().data); if(o) setAsk(o); else setMsg('В облаке нет копии.'); }catch(e){ setMsg('Облако недоступно.'); } };
  const fromFile=e=>{ const f=e.target.files&&e.target.files[0]; e.target.value=''; if(!f) return; const r=new FileReader(); r.onload=()=>{ const o=readBackup(String(r.result||'')); if(o) setAsk(o); else { SFX('wrong'); setMsg('Это не файл прогресса Wordy.'); } }; r.readAsText(f); };
  const fmt=ts=>ts?new Date(ts).toLocaleString('ru-RU',{day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'}):'';
  return html`<div className="set-group">
    <div className="set-row wrap"><div><strong>Резервная копия</strong><p>Прогресс хранится в этом браузере. Сохрани копию, чтобы не потерять его или перенести на другой телефон.</p></div>
      <div className="chips"><button className="btn small" id="bk-file" onClick=${toFile}>Сохранить в файл</button><button className="btn small ghost" id="bk-open" onClick=${()=>fileRef.current&&fileRef.current.click()}>Восстановить из файла</button>
      <input ref=${fileRef} type="file" accept=".json,application/json" hidden onChange=${fromFile}/></div></div>
    ${canCloud?html`<div className="set-row wrap"><div><strong>Облачная копия</strong><p>${cloudAt?'Последняя копия: '+fmt(cloudAt):'Ещё не сохранялась'} · Ворди сохраняет её сам раз в день</p></div>
      <div className="chips"><button className="btn small" id="bk-cloud" disabled=${busy} onClick=${toCloud}>Сохранить сейчас</button>${cloudAt?html`<button className="btn small ghost" id="bk-cloud-get" onClick=${fromCloud}>Восстановить</button>`:null}</div></div>`:null}
    ${msg?html`<p className="muted bk-msg" role="status">${msg}</p>`:null}
    ${ask?html`<div className="confirm-box"><p><b>Восстановить прогресс от ${fmt(ask.at)}?</b> Текущий прогресс на этом устройстве заменится: монет ${ask.state.coins|0}, XP ${ask.state.xp|0}, слов в повторении ${Object.keys(ask.state.boxes||{}).length}.</p>
      <div className="actions"><button className="btn small ghost" onClick=${()=>setAsk(null)}>Отмена</button><button className="btn small" id="bk-yes" onClick=${()=>{ restore(ask.state); setAsk(null); setMsg('Прогресс восстановлен!'); }}>Восстановить</button></div></div>`:null}
  </div>`; }
/* level change: the person decides, the sheet says exactly what will happen */
/* bug reports and ideas: go to the Wordy author (Firestore «feedback», readable only in the Firebase console) */
function FeedbackBox({st}){ const {be,user}=useAcc(); const [kind,setKind]=useState('bug'), [text,setText]=useState(''), [contact,setContact]=useState(''), [state,setState]=useState(''), [err,setErr]=useState(null);
  const send=async()=>{ setErr(null); setState('busy');
    try{ if(!be||!be.sendFeedback) throw accE('Отзывы работают на сайте Wordy.');
      await be.sendFeedback({kind,text,contact:user?'':contact,page:location.pathname+location.hash,level:st.level||'',ua:navigator.userAgent.slice(0,160)}); setState('sent'); setText(''); SFX('pop'); W('react','happy'); W('say','Спасибо! Я передам.',0,true); }
    catch(e){ setErr(e); setState(''); } };
  if(state==='sent') return html`<div className="set-group"><div className="set-row"><div><strong>Спасибо, сообщение отправлено</strong><p>Автор Wordy прочитает его. Если нужен ответ, он напишет ${user?'на '+user.email:'по контакту, который ты оставил'}.</p></div><button className="btn small ghost" id="fb-more" onClick=${()=>setState('')}>Ещё</button></div></div>`;
  return html`<div className="set-group fb-box" id="fb-box"><div className="set-row wrap"><div><strong>Сообщить об ошибке или предложить идею</strong><p>Что сломалось, что неудобно, чего не хватает</p></div>
    <div className="chips"><button className="chip" id="fb-bug" aria-pressed=${kind==='bug'} onClick=${()=>setKind('bug')}>Ошибка</button><button className="chip" id="fb-idea" aria-pressed=${kind==='idea'} onClick=${()=>setKind('idea')}>Идея</button></div></div>
    <div className="fb-form"><textarea id="fb-text" rows="4" maxLength="2000" value=${text} placeholder=${kind==='bug'?'Например: в мини-тесте после ответа подсвечивается не тот вариант':'Например: добавить тренировку фразовых глаголов'} onChange=${e=>setText(e.target.value)}></textarea>
      ${user?null:html`<input id="fb-contact" maxLength="120" value=${contact} placeholder="Как с тобой связаться (необязательно)" onChange=${e=>setContact(e.target.value)}/>`}
      <${AccErr} e=${err}/><button className="btn small" id="fb-send" disabled=${text.trim().length<5||state==='busy'} onClick=${send}>${state==='busy'?'Отправляю…':'Отправить'}</button></div></div>`; }
function LevelSheet({st,to,onOk,onClose}){ const up=lvlIdx(to)>lvlIdx(st.level), d=st.daily, dailyNow=!(d&&d.done&&d.day===dayKey());
  useEffect(()=>{ const esc=e=>{ if(e.key==='Escape') onClose(); }; document.addEventListener('keydown',esc); const r=document.documentElement; r.classList.add('in-game'); return ()=>{ document.removeEventListener('keydown',esc); r.classList.remove('in-game'); }; },[]);
  return html`<div className="sheet-wrap" onClick=${onClose}><div className="sheet lvl-sheet enter" role="dialog" aria-modal="true" aria-labelledby="lvl-t" onClick=${e=>e.stopPropagation()}>
    <h3 id="lvl-t">Сменить уровень с ${st.level} на ${to}?</h3>
    <ul className="lvl-what">
      <li><b>Откроется</b> всё уровня ${to} и ниже: темы слов, грамматика и тексты.${up?'':' Темы выше '+to+' закроются, пока ты снова не повысишь уровень.'}</li>
      <li><b>Слова дня</b> ${dailyNow?'сразу заменятся словами уровня '+to+' — сегодняшняя подборка ещё не пройдена.':'начнут подбираться из уровня '+to+' со следующей подборки.'}</li>
      <li><b>Темы ниже ${to}</b> отмечаются как знакомые, но их всё равно можно проходить.</li>
      <li><b>Ничего не пропадёт:</b> монеты, XP, серия, звёзды за грамматику, результаты тестов и слова в повторении сохранятся.</li>
      <li>Вернуть прежний уровень можно здесь же в любой момент. Если учитель в группе назначит тебе уровень, его выбор заменит этот.</li>
    </ul>
    <div className="actions"><button className="btn ghost" id="lvl-cancel" onClick=${onClose}>Отмена</button><button className="btn" id="lvl-ok" onClick=${onOk}>Сменить на ${to}</button></div>
  </div></div>`; }
function Settings({st,update,reset,restore}){
  const [confirm,setConfirm]=useState(false);
  const [pin,setPin]=useState(null), [cab,setCab]=useState(false); const cloud=useCloud();
  const openCab=()=>{ SFX('pop'); if(cloud.owner) return setCab(true); setPin({title:'Кабинет учителя',text:'Здесь учитель видит прогресс учеников и задаёт домашние задания. Введи код учителя.',ok:()=>setCab(true)}); };
  const [lvlAsk,setLvlAsk]=useState(null), [lc,setLc]=useState(false);
  const setLevel=l=>{ SFX('tap'); update(()=>({level:l})); setLvlAsk(null); W('react','happy'); W('say','Теперь уровень '+l+'!',0,true); };
  const askLevel=l=>{ if(l===st.level) return; SFX('tap'); setLvlAsk(l); };
  const Sw=({k,label,desc})=>html`<div className="set-row"><div><strong>${label}</strong><p>${desc}</p></div>
     <button className="sw" role="switch" id=${'sw-'+k} aria-checked=${st[k]} aria-label=${label} onClick=${()=>{ SFX('tap'); update(s=>({[k]:!s[k]})); }}></button></div>`;
  return html`
   <div className="page-h"><h1>Настройки</h1></div>
   <div className="sec-h"><h2>Обучение</h2></div>
   <div className="set-group">
     <div className="set-row wrap"><div><strong>Уровень английского</strong><p>Можно сменить в любой момент. Открыто всё до выбранного уровня включительно</p></div>
       <div className="chips">${CEFR.map(l=>html`<button key=${l} className="chip" id=${'set-lvl-'+l} aria-pressed=${st.level===l} onClick=${()=>askLevel(l)}>${l}</button>`)}
         ${canLiveVoice()&&st.age!=='u13'?html`<button className="chip" id="set-lvl-voice" onClick=${()=>{ SFX('pop'); setLc(true); }}>🎙 Определить голосом</button>`:null}</div></div>
     ${lc?html`<${LevelCheck} st=${st} update=${update} onClose=${()=>setLc(false)} onPick=${l=>{ setLc(false); if(l===st.level){ W('say','Твой уровень и так '+l+' — всё верно!',0,true); } else setLvlAsk(l); }}/>`:null}
     <div className="set-row wrap"><div><strong>Новых слов в день</strong><p>Сколько слов будет в подборке «Слова дня»</p></div>
       <div className="chips">${[5,10,15,20].map(n=>html`<button key=${n} className="chip" id=${'set-dn-'+n} aria-pressed=${(st.dailyNew||10)===n} onClick=${()=>{ SFX('tap'); update(()=>({dailyNew:n})); W('react','nod'); }}>${n}</button>`)}</div></div>
     <div className="set-row wrap"><div><strong>Возраст</strong><p>${st.age==='u13'?'До 13 лет проверка с помощью ИИ выключена: тексты и голос не отправляются в ИИ.':'Нужен, чтобы включать функции, подходящие по возрасту'}</p></div>
       <${AgeChips} v=${st.age} set=${a=>update(()=>({age:a}))} pre="set-age-"/></div>
     <div className="set-row"><div><strong>Дневная цель</strong><p>Сколько слов проверять в день</p></div>
     <div className="chips">${[5,10,20,30].map(n=>html`<button key=${n} className="chip" id=${'goal-'+n} aria-pressed=${st.goal===n} onClick=${()=>{ update(()=>({goal:n})); W('react','nod'); }}>${n}</button>`)}</div></div></div>
   <${PushBox} st=${st}/>
   <${AccSettings} st=${st}/>
   <div className="sec-h"><h2>Внешний вид</h2></div>
   <div className="set-group">
     <div className="set-row wrap"><div><strong>Стиль</strong><p>«Игровой» — прежний яркий вид с конфетти и объёмными кнопками</p></div><div className="style-chips"><button key="modern" className="chip" id="st-modern" aria-pressed=${st.style!=='play'} onClick=${()=>{ SFX('tap'); update(()=>({style:'modern'})); }}>Современный</button><button key="play" className="chip" id="st-play" aria-pressed=${st.style==='play'} onClick=${()=>{ SFX('tap'); update(()=>({style:'play'})); }}>Игровой</button></div></div>
     <div className="set-row wrap"><div><strong>Ворди</strong><p>Тихий — без реплик и праздников; скрыт — не показывается</p></div><div className="style-chips"><button key="active" className="chip" id="wd-active" aria-pressed=${(st.wordy||'active')==='active'} onClick=${()=>{ SFX('tap'); update(()=>({wordy:'active'})); }}>Активный</button><button key="quiet" className="chip" id="wd-quiet" aria-pressed=${(st.wordy||'active')==='quiet'} onClick=${()=>{ SFX('tap'); update(()=>({wordy:'quiet'})); }}>Тихий</button><button key="hidden" className="chip" id="wd-hidden" aria-pressed=${(st.wordy||'active')==='hidden'} onClick=${()=>{ SFX('tap'); update(()=>({wordy:'hidden'})); }}>Скрыт</button></div></div>
   </div>
   <div className="sec-h"><h2>Ворди</h2></div>
   <div className="set-group">
     <${Sw} k="sound" label="Звуки" desc="Голос Ворди, ответы, награды"/>
     <${Sw} k="talk" label="Реплики" desc="Ворди комментирует ответы в облачке"/>
     <${Sw} k="sleep" label="Сон при бездействии" desc="Засыпает, если долго ничего не делать"/>
     <div className="set-row"><div><strong>Как пользоваться Wordy</strong><p>Обучение за минуту: слова дня, грамматика, игры, награды и настройки</p></div><button className="btn small ghost" id="tour-again" onClick=${()=>{ SFX('pop'); try{ window.dispatchEvent(new Event('wordy-tour')); }catch(e){} }}>Показать</button></div>
     <div className="set-row"><div><strong>Позвать Ворди</strong><p>Он помашет тебе лапкой</p></div><button className="btn small ghost" id="wave-btn" onClick=${()=>{ W('react','wave'); W('say','Я здесь! Привет!',0,true); }}>Помахать</button></div>
   </div>
   <div className="sec-h"><h2>Данные</h2></div>
   <${BackupBox} st=${st} restore=${restore}/>
   <div className="set-group"><div className="set-row"><div><strong>Сбросить прогресс</strong><p>Монеты, серия и выученные слова обнулятся</p></div>
     ${confirm?html`<div className="confirm"><button className="btn small ghost" onClick=${()=>setConfirm(false)}>Отмена</button><button className="btn small danger" id="reset-yes" onClick=${()=>{ reset(); setConfirm(false); }}>Сбросить</button></div>`
       :html`<button className="btn small ghost" id="reset-btn" onClick=${()=>setConfirm(true)}>Сбросить</button>`}</div></div>
   <div className="sec-h"><h2>Обратная связь</h2></div>
   <${FeedbackBox} st=${st}/>
   <${OwnerStats}/>
   ${window.WORDY_SITE?html`<p className="set-legal"><a href="/privacy.html">Конфиденциальность</a><a href="/terms.html">Условия использования</a><a href="/">О Wordy</a></p>`:null}
   <p className="set-credit">Wordy создал <b>Alim Tszyu</b></p>
   ${lvlAsk?html`<${LevelSheet} st=${st} to=${lvlAsk} onOk=${()=>setLevel(lvlAsk)} onClose=${()=>setLvlAsk(null)}/>`:null}
   ${pin?html`<${PinSheet} title=${pin.title} text=${pin.text} onClose=${()=>setPin(null)} onOk=${()=>{ const f=pin.ok; setPin(null); f(); }}/>`:null}`;
}

/* ================= MOCK TESTS: data (original items in exam format) ================= */
const TFNG=['TRUE','FALSE','NOT GIVEN'], YNNG=['YES','NO','NOT GIVEN'];
const IELTS_MOCKS=[{id:'ielts1',title:'IELTS Academic · Тест 1',
 listening:__WD[1122],
 reading:[
  {title:'The Wolves of Yellowstone',paras:__WD[1123],
   groups:[
    {ins:'Вопросы 1–6. Соответствует ли утверждение тексту? TRUE — да, FALSE — противоречит, NOT GIVEN — в тексте нет информации.',opts:TFNG,qs:__WD[1124]},
    __WD[1125],
    __WD[1126]]},
  {title:'Why We Forget',paras:__WD[1127],
   groups:[
    __WD[1128],
    __WD[1129],
    {ins:'Вопросы 23–26. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:[
     ['Ebbinghaus tested a large group of volunteers.',1],
     ['Proactive interference involves old information affecting new learning.',0],
     ['The divers in the experiment were professional athletes.',2],
     ['Rereading notes is more effective than self-testing.',1]]}]}],
 writing:__WD[1130],
 speaking:__WD[1131]
}];

/* ---------- IELTS Academic tests 2–3 (original items) ---------- */
IELTS_MOCKS.push(
{id:'ielts2',title:'IELTS Academic · Тест 2',
 listening:__WD[1132],
 reading:[
  {title:'The Story of Paper Money',paras:__WD[1133],
   groups:[
    {ins:'Вопросы 1–5. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:__WD[1134]},
    __WD[1135],
    __WD[1136]]},
  {title:'Microplastics: A Hidden Threat?',paras:__WD[1137],
   groups:[
    __WD[1138],
    {ins:'Вопросы 19–22. Совпадает ли утверждение с мнением автора? YES — да, NO — противоречит, NOT GIVEN — автор об этом не говорит.',opts:YNNG,qs:__WD[1139]},
    __WD[1140]]}],
 writing:__WD[1141],
 speaking:__WD[1142]
},
{id:'ielts3',title:'IELTS Academic · Тест 3',
 listening:__WD[1143],
 reading:[
  {title:'The Secret of Spider Silk',paras:__WD[1144],
   groups:[
    {ins:'Вопросы 1–5. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:__WD[1145]},
    __WD[1146],
    __WD[1147]]},
  {title:'The Paradox of Choice',paras:__WD[1148],
   groups:[
    {ins:'Вопросы 14–17. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:[
     ['Choice is harmful in all situations.',1],['The way options are presented has a major influence on decisions.',0],
     ['Companies that reduced their range of products increased their profits.',2],['Deciding in advance what is "good enough" is a very useful skill.',0]]},
    __WD[1149],
    __WD[1150]]}],
 writing:__WD[1151],
 speaking:__WD[1152]
});

/* ---------- IELTS Academic tests 4–5 (original items) ---------- */
IELTS_MOCKS.push(
{id:'ielts4',title:'IELTS Academic · Тест 4',
 listening:__WD[1153],
 reading:[
  {title:'Coffee: From Legend to Global Commodity',paras:__WD[1154],
   groups:[
    __WD[1155],
    {ins:'Вопросы 6–9. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:[
     ['The story of Kaldi was written down at the time coffee was discovered.',1],['Coffee plants still grow naturally in Ethiopia.',0],
     ['Attempts to close coffee houses in Istanbul usually succeeded in the long term.',1],['English coffee houses served food as well as drinks.',2]]},
    __WD[1156]]},
  {title:'Working From Anywhere',paras:__WD[1157],
   groups:[
    {ins:'Вопросы 14–18. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:__WD[1158]},
    __WD[1159],
    __WD[1160]]}],
 writing:__WD[1161],
 speaking:__WD[1162]
},
{id:'ielts5',title:'IELTS Academic · Тест 5',
 listening:__WD[1163],
 reading:[
  {title:'Navigating by the Stars',paras:__WD[1164],
   groups:[
    __WD[1165],
    {ins:'Вопросы 6–9. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:[
     ['Polynesians reached Easter Island before New Zealand.',2],['Navigators could use ocean swells even when the sky was cloudy.',0],
     ['Hōkūle\'a used a compass to check its direction.',1],['Mau Piailug had sailed to Tahiti before 1976.',2]]},
    __WD[1166]]},
  {title:'Can Machines Be Creative?',paras:__WD[1167],
   groups:[
    {ins:'Вопросы 14–17. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:__WD[1168]},
    __WD[1169],
    __WD[1170]]}],
 writing:__WD[1171],
 speaking:__WD[1172]
});

/* ---------- full-format additions: Listening parts (original scripts) ---------- */
const IELTS_EXTRA=__WD[1173];

/* ---------- full-format additions: Reading Passage 3 (original texts) ---------- */
IELTS_EXTRA.ielts1.passage={title:'The Science of Laughter',paras:__WD[1174],
 groups:[
  __WD[1175],
  {ins:'Вопросы 32–36. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:__WD[1176]},
  __WD[1177]]};

IELTS_EXTRA.ielts2.passage=__WD[1178];

IELTS_EXTRA.ielts3.passage={title:'Mining the Deep Sea',paras:__WD[1179],
 groups:[
  {ins:'Вопросы 27–31. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:__WD[1180]},
  __WD[1181],
  __WD[1182]]};

IELTS_EXTRA.ielts4.passage={title:'Bilingualism and the Brain',paras:__WD[1183],
 groups:[
  __WD[1184],
  {ins:'Вопросы 32–36. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:__WD[1185]},
  __WD[1186]]};

IELTS_EXTRA.ielts5.passage={title:'The Hidden Kingdom of Fungi',paras:__WD[1187],
 groups:[
  __WD[1188],
  {ins:'Вопросы 33–36. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:[
   ['Most species of fungi have not yet been described by scientists.',0],['The idea of fungal networks between trees has been completely disproved.',1],
   ['Popular books about forests sell better than other science books.',2],['Research into fungi deserves more financial support.',0]]},
  __WD[1189]]};

/* merge: full format = 4 listening parts (40 q) + 3 passages (40 q); renumber old instructions; attach audio */
(()=>{ const pn=p=>+(p.title.match(/Part (\d)/)||[0,0])[1];
  const shift=(s,d)=>typeof s==='string'?s.replace(/Вопросы (\d+)–(\d+)/g,(_,a,b)=>'Вопросы '+(+a+d)+'–'+(+b+d)):s;
  IELTS_MOCKS.forEach(m=>{ const x=IELTS_EXTRA[m.id]; if(!x) return;
    m.listening.forEach((p,i)=>{ const d=(pn(p)-1)*10-i*10; if(d){ p.intro=shift(p.intro,d); p.qs=p.qs.map(q=>shift(q,d)); } });
    m.listening=m.listening.concat(x.listening).sort((a,b)=>pn(a)-pn(b));
    m.listening.forEach(p=>{ p.n=pn(p); p.audio='audio/'+m.id+'-p'+p.n+'.mp3'; });
    m.reading.push(x.passage); }); })();

/* ---------- full-length Listening scripts (exam length ~4–5 min per part); '--' marks the mid-part pause ---------- */
const LS2=__WD[1190];

Object.assign(LS2,__WD[1191]);

/* apply full-length scripts */
(()=>{ IELTS_MOCKS.forEach(m=>m.listening.forEach(p=>{ const o=LS2[m.id+'-'+p.n]; if(!o) return; p.script=o.script; p.desc=o.desc; p.kind=o.kind; if(o.split) p.split=o.split; if(o.qs) p.qs=o.qs; })); })();
/* extra exam-length material: start = after the opening line, end1 = just before the mid-part pause, end = at the end */
LS2['ielts5-4']=__WD[1192];
const LS2X=__WD[1193];
(()=>{ IELTS_MOCKS.forEach(m=>m.listening.forEach(p=>{ const o=LS2[m.id+'-'+p.n]; if(o&&!p.desc){ p.script=o.script; p.desc=o.desc; p.kind=o.kind; }
  const x=LS2X[m.id+'-'+p.n]; if(!x) return; let sc=p.script.slice(); if(x.voices) p.voices={...p.voices,...x.voices};
  if(x.start) sc.splice(1,0,...x.start);
  if(x.end1){ const k=sc.findIndex(l=>l[0]==='--'); if(k>=0) sc.splice(k,0,...x.end1); }
  if(x.end) sc=sc.concat(x.end);
  p.script=sc; })); })();

/* full-length Speaking for tests 1–5 (Part 1 ≈ 9 questions on 3 topics, Part 2 with follow-up, Part 3 ≈ 6 questions) */
const SP_FULL=__WD[1194];
(()=>{ IELTS_MOCKS.forEach(m=>{ const s=SP_FULL[m.id]; if(s) m.speaking=s; }); })();
/*MORE_TESTS*/
/* ---------- IELTS Academic · Test 6 (original items) ---------- */
IELTS_MOCKS.push({id:'ielts6',title:'IELTS Academic · Тест 6',
 listening:__WD[1195],
 reading:[
  {title:'The Story of Glass',paras:__WD[1196],
   groups:[
    __WD[1197],
    {ins:'Вопросы 6–9. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:[
     ['The first glass objects made in Mesopotamia were clear.',1],['The Romans used glass in windows.',0],
     ['Venetian glassmakers were allowed to work in other countries.',1],['George Ravenscroft became very rich from his invention.',2]]},
    __WD[1198]]},
  {title:'Music Lessons and the Mind',paras:__WD[1199],
   groups:[
    __WD[1200],
    {ins:'Вопросы 19–22. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:__WD[1201]},
    __WD[1202]]},
  {title:'The Puzzle of the Placebo',paras:__WD[1203],
   groups:[
    __WD[1204],
    {ins:'Вопросы 32–36. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:__WD[1205]},
    __WD[1206]]}],
 writing:__WD[1207],
 speaking:__WD[1208]
});
/*END_T6*/
/* ---------- IELTS Academic · Test 7 (original items) ---------- */
IELTS_MOCKS.push({id:'ielts7',title:'IELTS Academic · Тест 7',
 listening:__WD[1209],
 reading:[
  {title:'Measuring the Year',paras:__WD[1210],
   groups:[
    {ins:'Вопросы 1–6. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:__WD[1211]},
    __WD[1212]]},
  __WD[1213],
  {title:'Can Money Buy Happiness?',paras:__WD[1214],
   groups:[
    __WD[1215],
    {ins:'Вопросы 32–36. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:__WD[1216]},
    __WD[1217]]}],
 writing:__WD[1218],
 speaking:__WD[1219]
});
/*END_T7*/
/* ---------- IELTS Academic · Test 8 (original items) ---------- */
IELTS_MOCKS.push({id:'ielts8',title:'IELTS Academic · Тест 8',
 listening:__WD[1220],
 reading:[
  __WD[1221],
  {title:'The Value of City Trees',paras:__WD[1222],
   groups:[
    {ins:'Вопросы 14–19. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:__WD[1223]},
    __WD[1224]]},
  __WD[1225]],
 writing:__WD[1226],
 speaking:__WD[1227]
});
/*END_T8*/
/* ---------- IELTS Academic · Test 9 (original items) ---------- */
IELTS_MOCKS.push({id:'ielts9',title:'IELTS Academic · Тест 9',
 listening:__WD[1228],
 reading:[
  {title:'How the Dutch Took to Their Bikes',paras:__WD[1229],
   groups:[
    {ins:'Вопросы 1–7. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:__WD[1230]},
    __WD[1231]]},
  {title:'The Mind of the Octopus',paras:__WD[1232],
   groups:[
    __WD[1233],
    __WD[1234],
    {ins:'Вопросы 23–26. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:__WD[1235]}]},
  __WD[1236]],
 writing:__WD[1237],
 speaking:__WD[1238]
});
/*END_T9*/
/* ---------- IELTS Academic · Test 10 (original items) ---------- */
IELTS_MOCKS.push({id:'ielts10',title:'IELTS Academic · Тест 10',
 listening:__WD[1239],
 reading:[
  {title:'The Printing Revolution',paras:__WD[1240],
   groups:[
    __WD[1241],
    {ins:'Вопросы 5–9. TRUE, FALSE или NOT GIVEN?',opts:TFNG,qs:__WD[1242]},
    __WD[1243]]},
  {title:'Saving the World\'s Coral Reefs',paras:__WD[1244],
   groups:[
    __WD[1245],
    {ins:'Вопросы 20–23. Совпадает ли утверждение с мнением автора? YES, NO или NOT GIVEN?',opts:YNNG,qs:__WD[1246]},
    __WD[1247]]},
  __WD[1248]],
 writing:__WD[1249],
 speaking:__WD[1250]
});
/*END_T10*/
/* extra exam-length material for all tests: e1 before the mid-part pause, e2 before the last k lines */
const LS3X=__WD[1251];
(()=>{ IELTS_MOCKS.forEach(m=>m.listening.forEach(p=>{ const x=LS3X[m.id+'-'+p.n]; if(!x) return; const sc=p.script.slice();
  if(x.e1){ const k=sc.findIndex(l=>l[0]==='--'); if(k>=0) sc.splice(k,0,...x.e1); }
  if(x.e2) sc.splice(sc.length-(x.k||0),0,...x.e2); p.script=sc; })); })();
(()=>{ IELTS_MOCKS.forEach(m=>m.listening.forEach((p,i)=>{ if(!p.n) p.n=+(((p.title||'').match(/Part (\d)/)||[0,i+1])[1]); if(!p.audio) p.audio='audio/'+m.id+'-p'+p.n+'.mp3'; })); })();
const IELTS_AUDIO=__WD[1252]; /*AUDIO_TIMES*/
const SP_AUDIO=__WD[1253]; /*SP_AUDIO*/
/* SAT: q = {t:type, p:passage, q:question, o:options, a:index | g:[accepted numeric answers], e:explanation} */
const SQ_WIC='Which choice completes the text with the most logical and precise word or phrase?';
const SQ_SEC='Which choice completes the text so that it conforms to the conventions of Standard English?';
const SQ_TR='Which choice completes the text with the most logical transition?';
const SAT_MOCKS=[{id:'sat1',title:'Digital SAT · Тест 1',
 rw:{
  m1:[
   {t:'Words in Context',p:'Marine biologists have found that coral reefs near volcanic vents in the Pacific are surprisingly ______: despite water acidity that would kill most corals, these reefs continue to grow.',q:SQ_WIC,o:['fragile','resilient','ancient','colorful'],a:1,e:'«Несмотря на кислотность… продолжают расти» — значит, рифы устойчивые. Resilient = устойчивый, способный восстанавливаться.'},
   {t:'Words in Context',p:"The novelist's early works were largely ______ by critics, who found them too experimental; only decades later were they recognized as masterpieces.",q:SQ_WIC,o:['celebrated','overlooked','translated','imitated'],a:1,e:'«Только спустя десятилетия признали шедеврами» — значит, сначала их не заметили / проигнорировали (overlooked).'},
   __WD[1254],
   __WD[1255],
   __WD[1256],
   __WD[1257],
   __WD[1258],
   {t:'Boundaries',p:'The Atacama Desert in Chile is one of the driest places on ______ some weather stations there have never recorded rain.',q:SQ_SEC,o:['Earth,','Earth;','Earth','Earth, which'],a:1,e:'Два независимых предложения соединяет точка с запятой. Запятая одна — ошибка comma splice.'},
   {t:'Form, Structure, and Sense',p:'The collection of letters written by the explorer during her travels ______ now on display at the national museum.',q:SQ_SEC,o:['are','were','is','have been'],a:2,e:'Подлежащее — collection (единственное число), letters — внутри of-фразы. Нужно is.'},
   {t:'Boundaries',p:'Architect Zaha Hadid, known for her flowing ______ designed the aquatic center for the 2012 London Olympics.',q:SQ_SEC,o:['curves,','curves;','curves','curves—'],a:0,e:'Вставка «known for her flowing curves» выделяется запятыми с обеих сторон.'},
   {t:'Transitions',p:'Early electric cars of the 1900s were popular in cities because they were quiet and easy to drive. ______ the mass production of cheaper gasoline-powered cars soon pushed them off the market.',q:SQ_TR,o:['Similarly,','However,','For example,','Therefore,'],a:1,e:'Сначала популярность, потом вытеснение — противопоставление: However.'},
   __WD[1259]],
  hard:[
   {t:'Words in Context',p:"Although the committee's report was meant to resolve the dispute, its ______ language allowed both sides to claim victory.",q:SQ_WIC,o:['ambiguous','concise','hostile','technical'],a:0,e:'Обе стороны смогли заявить о победе — значит, формулировки двусмысленные (ambiguous).'},
   {t:'Words in Context',p:"The historian's account is notable for its ______: rather than relying on a single archive, she consulted letters, tax records, and oral histories from dozens of communities.",q:SQ_WIC,o:['brevity','thoroughness','partiality','whimsy'],a:1,e:'Десятки сообществ и разные источники — это основательность (thoroughness).'},
   {t:'Words in Context',p:"Far from being ______, the scientist's conclusion was the product of years of painstaking measurements.",q:SQ_WIC,o:['hasty','rigorous','controversial','obscure'],a:0,e:'«Far from being X» — противоположность «годам кропотливых измерений», то есть поспешный (hasty).'},
   __WD[1260],
   __WD[1261],
   __WD[1262],
   __WD[1263],
   __WD[1264],
   {t:'Form, Structure, and Sense',p:'Neither the lead researcher nor her assistants ______ aware that the samples had been mislabeled.',q:SQ_SEC,o:['was','were','is','has been'],a:1,e:'При neither…nor глагол согласуется с ближайшим подлежащим: assistants → were. Прошедшее время — по смыслу (had been).'},
   {t:'Boundaries',p:"The museum's newest exhibit features three ______ a 2,000-year-old bronze mirror, a medieval astrolabe, and a nineteenth-century telegraph key.",q:SQ_SEC,o:['artifacts:','artifacts,','artifacts;','artifacts'],a:0,e:'Двоеточие вводит список после полного предложения.'},
   {t:'Transitions',p:'Most plants obtain nitrogen from the soil through their roots. The Venus flytrap, ______ grows in nitrogen-poor bogs and supplements its diet by trapping insects.',q:SQ_TR,o:['by contrast,','for instance,','in addition,','as a result,'],a:0,e:'Мухоловка поступает иначе, чем большинство растений — противопоставление: by contrast.'},
   __WD[1265]],
  easy:[
   {t:'Words in Context',p:'After hours of hiking in the heat, the team was ______ and needed to rest.',q:SQ_WIC,o:['exhausted','curious','delighted','generous'],a:0,e:'Часы похода по жаре и нужен отдых — exhausted (измотанный).'},
   {t:'Words in Context',p:'The new library is very ______ for students: it has quiet study rooms, a café, and free computers.',q:SQ_WIC,o:['narrow','useful','silent','empty'],a:1,e:'Перечислены удобства — значит, библиотека полезная (useful).'},
   {t:'Words in Context',p:'Scientists hope to ______ the cause of the disease so that they can develop a cure.',q:SQ_WIC,o:['ignore','identify','celebrate','borrow'],a:1,e:'Чтобы создать лекарство, причину нужно установить — identify.'},
   __WD[1266],
   __WD[1267],
   __WD[1268],
   __WD[1269],
   {t:'Form, Structure, and Sense',p:'Every morning, my grandmother ______ a short walk around the park.',q:SQ_SEC,o:['take','takes','taking','have taken'],a:1,e:'Present Simple, he/she → takes.'},
   {t:'Boundaries',p:'Maya packed everything she needed for the ______ a tent, a sleeping bag, and a flashlight.',q:SQ_SEC,o:['trip:','trip,','trip','trip;'],a:0,e:'Двоеточие вводит список.'},
   {t:'Form, Structure, and Sense',p:'The students proudly presented ______ science project to the whole school.',q:SQ_SEC,o:['its','their','there','they\'re'],a:1,e:'Students — множественное число, притяжательное their. There — «там», they\'re = they are.'},
   {t:'Transitions',p:'The final exam was very difficult. ______ most students passed it.',q:SQ_TR,o:['Therefore,','Nevertheless,','For example,','Similarly,'],a:1,e:'Трудный экзамен, но сдали — уступка: Nevertheless.'},
   __WD[1270]]},
 math:__WD[1271]
}];

/* ================= MOCK TESTS: engine & UI ================= */
const MI={
  head:()=>svg(html`<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.6"/><rect x="17" y="14" width="4" height="7" rx="1.6"/>`),
  book:()=>svg(html`<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>`),
  pen:()=>svg(html`<path d="M14.5 4.5l5 5L9 20H4v-5z"/><path d="M12.5 6.5l5 5"/>`),
  mic:()=>svg(html`<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>`),
  clock:()=>svg(html`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,16),
  flag:()=>svg(html`<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>`,18),
  calc:()=>svg(html`<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7h7M8.5 11h1M12 11h1M15.5 11h0M8.5 15h1M12 15h1M15.5 15v3"/>`),
  spark:()=>svg(html`<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>`,18)};

const BAND40=[[39,9],[37,8.5],[35,8],[32,7.5],[30,7],[26,6.5],[23,6],[18,5.5],[16,5],[13,4.5],[10,4],[8,3.5],[6,3],[4,2.5],[0,2]];
const band40=raw=>{ for(const [m,b] of BAND40) if(raw>=m) return b; return 0; };
const roundBand=x=>{ const f=Math.floor(x), r=x-f; return r<.25?f:r<.75?f+.5:f+1; };
const fmtB=b=>b==null||isNaN(b)?'—':(+b).toFixed(1);
const wcount=t=>(t.trim().match(/[A-Za-z0-9'’-]+/g)||[]).length;
const mmss=s=>Math.floor(s/60)+':'+String(Math.max(0,s%60)).padStart(2,'0');
function gapOk(v,alts){ const n=x=>normAns(String(x)).replace(/[£$"]/g,'').replace(/^(a|an|the) /,''), nv=n(v); if(!nv) return false;
  return alts.some(a=>n(a)===nv||(/^[\d ]+$/.test(a)&&v.replace(/\D/g,'')===a.replace(/\D/g,''))); }
function numVal(s){ s=String(s).trim().replace(/\s+/g,'').replace(',','.').replace(/^\+/,'').replace(/[−–]/g,'-'); let m;
  if((m=s.match(/^(-?\d+)\/(\d+)$/))&&+m[2]) return +m[1]/+m[2]; if(/^-?\d*\.?\d+$/.test(s)) return parseFloat(s); return NaN; }
const gridOk=(v,g)=>{ const x=numVal(v); return !isNaN(x)&&g.some(a=>Math.abs(numVal(a)-x)<1e-3); };

function useCountdown(sec,onEnd,run=true,resetKey=0){
  const [left,setLeft]=useState(sec); const cb=useRef(onEnd); cb.current=onEnd;
  useEffect(()=>{ if(!run) return; const fresh=sec; setLeft(fresh); const end=Date.now()+fresh*1000;
    const id=setInterval(()=>{ const l=Math.max(0,Math.round((end-Date.now())/1000)); setLeft(l); if(l<=0){ clearInterval(id); cb.current&&cb.current(); } },500);
    return ()=>clearInterval(id); },[run,resetKey]);
  return left;
}
const Timer=({left,label})=>html`<span className=${'mk-timer'+(left<=300?' warn':'')+(left<=60?' hot':'')} role="timer" aria-label=${(label||'Осталось')+' '+mmss(left)}>${MI.clock()}${mmss(left)}</span>`;

/* two-step exit so a mis-tap does not throw away an exam */
function ExitBtn({onExit,id}){ const [arm,setArm]=useState(false);
  useEffect(()=>{ if(!arm) return; const t=setTimeout(()=>setArm(false),2600); return ()=>clearTimeout(t); },[arm]);
  return html`<button className=${'icon-btn'+(arm?' mk-arm':'')} id=${id||'mk-close'} onClick=${()=>{ SFX('tap'); if(arm){ stopSpeak(); onExit(); } else setArm(true); }} aria-label=${arm?'Нажми ещё раз, чтобы выйти':'Выйти из теста'}>${I.close()}</button>
    ${arm?html`<span className="mk-armtxt" role="status">Нажми ещё раз — выйти без сохранения</span>`:null}`; }

/* ---------- voices for dialogues ---------- */
let _voices=null;
function getVoices(){ if(_voices&&_voices.length) return _voices; try{ _voices=speechSynthesis.getVoices().filter(v=>/^en[-_]/i.test(v.lang)); }catch(e){ _voices=[]; } return _voices; }
try{ speechSynthesis.onvoiceschanged=()=>{ _voices=null; getVoices(); }; }catch(e){}
function voiceFor(kind){ const vs=getVoices(); if(!vs.length) return null;
  const F=/female|samantha|victoria|karen|moira|tessa|serena|susan|zira|hazel|libby|sonia|jenny|aria|kate|fiona|google uk english female|google us english/i, M=/male|daniel|alex|fred|oliver|george|ryan|guy|david|mark|arthur|thomas|google uk english male/i;
  const gb=vs.filter(v=>/GB|UK/i.test(v.lang)||/UK|British/i.test(v.name)), pool=gb.length?gb:vs;
  return (kind==='f'?pool.find(v=>F.test(v.name)&&!/male/i.test(v.name.replace(/female/i,''))):pool.find(v=>M.test(v.name)&&!/female/i.test(v.name)))||pool[0]; }
function playScript(script,voices,onLine,onEnd){
  try{ speechSynthesis.cancel(); }catch(e){ onEnd&&onEnd(); return; }
  const parts=[]; script.forEach(([sp,t],i)=>(t.match(/[^.!?]+[.!?]+["']?\s*|[^.!?]+$/g)||[t]).forEach(s=>{ s=s.trim(); if(s) parts.push({sp,t:s,i}); }));
  let k=0, dead=false;
  const next=()=>{ if(dead) return; if(k>=parts.length){ W('talk',0); onEnd&&onEnd(true); return; } const p=parts[k++], kind=voices[p.sp]||'m'; let started=false;
    const u=new SpeechSynthesisUtterance(p.t); u.lang='en-GB'; u.rate=.92; const v=voiceFor(kind); if(v) u.voice=v; u.pitch=kind==='f'?1.12:.9;
    u.onstart=()=>{ started=true; onLine&&onLine(p.i); W('talk',Math.min(12,p.t.length/14)); }; u.onend=()=>setTimeout(next,p.i!==(parts[k]||{}).i?450:120); u.onerror=e=>{ if(e.error!=='interrupted'&&e.error!=='canceled') setTimeout(next,100); };
    speechSynthesis.speak(u);
    setTimeout(()=>{ if(!started&&!dead){ dead=true; try{ speechSynthesis.cancel(); }catch(e){} W('talk',0); onEnd&&onEnd(false); } },5000); };
  next();
}

/* ---------- AI for Writing / Speaking feedback ----------
   Inside a Claude artifact: Claude (sample). On the website: Gemini through Firebase AI Logic.
   Both give the same interface: ai.json(prompt, media?) → Promise<object>; media = [{mime,data(base64)}] (Gemini only). */
function geminiAI(){ const C=window.WORDY_AI, MODELS=(C&&C.models)||[]; if(!MODELS.length||!window.WORDY_FIREBASE) return null;
  let mp=null;
  const load=()=>mp||(mp=(async()=>{ const b='https://www.gstatic.com/firebasejs/'+C.sdk+'/';
    const [A,AI,AC]=await Promise.all([import(b+'firebase-app.js'),import(b+'firebase-ai.js'),C.recaptcha?import(b+'firebase-app-check.js'):null]);
    const app=A.initializeApp(window.WORDY_FIREBASE,'wordy-ai');
    if(AC){ if(/^(localhost|127\.)/.test(location.hostname)) self.FIREBASE_APPCHECK_DEBUG_TOKEN=true;
      const ac=AC.initializeAppCheck(app,{provider:C.recaptchaEnterprise?new AC.ReCaptchaEnterpriseProvider(C.recaptcha):new AC.ReCaptchaV3Provider(C.recaptcha),isTokenAutoRefreshEnabled:true}); if(AC.getToken) AC.getToken(ac,false).catch(()=>{}); }
    const ai=AI.getAI(app,{backend:new AI.GoogleAIBackend()}), cfg={responseMimeType:'application/json'};
    const L=window.WORDY_LIVE&&window.WORDY_LIVE.config, app2=L&&L.apiKey?(A.getApps().find(a=>a.name==='wordy-live')||A.initializeApp(L,'wordy-live')):null, ai2=app2?AI.getAI(app2,{backend:new AI.GoogleAIBackend()}):null;
    return {get:(m,au,last)=>AI.getGenerativeModel(ai,{model:m,generationConfig:cfg},{timeout:last?90000:au?30000:15000}),
      get2:ai2?(m=>AI.getGenerativeModel(ai2,{model:m,generationConfig:cfg},{timeout:20000})):null,
      plain:m=>AI.getGenerativeModel(ai,{model:m},{timeout:30000}), plain2:ai2?(m=>AI.getGenerativeModel(ai2,{model:m},{timeout:30000})):null,
      voice:(m,v)=>AI.getGenerativeModel(ai,{model:m,generationConfig:{responseModalities:[AI.ResponseModality.AUDIO],speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:v}}}}},{timeout:12000})};
  })().catch(e=>{ mp=null; console.warn('Gemini SDK',e); throw {code:'load_failed'}; }));
  const parse=t=>{ try{ return JSON.parse(t); }catch(e){} const m=String(t||'').match(/\{[\s\S]*\}/); if(m){ try{ return JSON.parse(m[0]); }catch(e){} } throw {code:'invalid_json'}; };
  const code=e=>{ const x=String((e&&e.code)||'')+' '+String((e&&e.message)||e||'');
    return /api-not-enabled|app-check|appcheck|API key|PERMISSION_DENIED|403|401/i.test(x)?'not_configured':/429|quota|RESOURCE_EXHAUSTED|rate.?limit/i.test(x)?'rate_limited'
      :/SAFETY|blocked|PROHIBITED/i.test(x)?'refused':/Failed to fetch|NetworkError|network|offline/i.test(x)?'offline':/too large|payload|413/i.test(x)?'too_big':'error'; };
  const busy=e=>/\b(500|502|503|504)\b|high demand|overloaded|UNAVAILABLE|timed? ?out|abort|DEADLINE/i.test(String((e&&e.message)||e||''));
  let first=0; /* after an overload, start from the model that answered */
  /* Speed. The free tier usually answers in 1–1.5 s but now and then a request waits in the queue for 10–40 s.
     Hedge: if the answer is late, send the same request through the second project (its own queue) and take
     whichever comes first. Fast answers to the same question are cached for the session and in localStorage. */
  const CK='wordy.aicache', cache=(()=>{ try{ return JSON.parse(localStorage.getItem(CK)||'{}'); }catch(e){ return {}; } })();
  const hkey=t=>{ let h=5381; for(let i=0;i<t.length;i++) h=((h<<5)+h+t.charCodeAt(i))|0; return (h>>>0).toString(36)+'.'+t.length; };
  const remember=(k,v)=>{ cache[k]=[Date.now(),v]; const ks=Object.keys(cache); if(ks.length>160) ks.sort((a,b)=>cache[a][0]-cache[b][0]).slice(0,ks.length-160).forEach(x=>delete cache[x]);
    try{ localStorage.setItem(CK,JSON.stringify(cache)); }catch(e){} };
  const ema={}; /* typical latency per kind of request, ms */
  const hedged=(M,m,parts,au,last,wait)=>new Promise((res,rej)=>{ let done=false, n=0, errs=[], t2=null;
    const fin=(v,e)=>{ if(done) return; if(e){ errs.push(e); if(--n>0) return; done=true; clearTimeout(t2); rej(errs[0]); } else { done=true; clearTimeout(t2); res(v); } };
    const go=(f)=>{ n++; f().then(v=>fin(v),e=>fin(null,e)); };
    go(()=>M.get(m,au,last).generateContent(parts));
    if(M.get2&&!au){ const second=()=>{ if(!done&&!t2.used){ t2.used=1; go(()=>M.get2(m).generateContent(parts)); } }; t2=setTimeout(second,wait); t2.used=0; }
  });
  /* streaming: the answer appears while it is written. JSON-mode streams sometimes fail to parse, so this asks for
     plain text and reads the JSON out of it; the second project joins if the first token is late. Falls back to json(). */
  const streamRaw=(M,m,prompt,onRaw,wait)=>new Promise((resolve,reject)=>{ let win=null, started=1, fails=0;
    const run=(mk,tag)=>{ Promise.resolve().then(()=>mk().generateContentStream(prompt)).then(async r=>{ let raw='';
        for await(const c of r.stream){ let t=''; try{ t=c.text(); }catch(e){} raw+=t; if(!win&&raw.trim()) win=tag; if(win===tag) try{ onRaw&&onRaw(raw); }catch(e){} }
        if(!win) win=tag; if(win===tag) resolve(raw); })
      .catch(e=>{ if(win===tag) return reject(e); if(++fails>=started&&!win) reject(e); }); };
    run(()=>M.plain(m),'a');
    if(M.plain2) setTimeout(()=>{ if(!win){ started++; run(()=>M.plain2(m),'b'); } },wait); });
  const api={gemini:true,warm:()=>load().catch(()=>{}),
    stream:async(prompt,onPart,opt)=>{ const fresh=!!(opt&&opt.fresh), key=fresh?null:hkey(prompt); if(key&&cache[key]) return cache[key][1];
      try{ const M=await load(), m=C.fast||MODELS[0], ek=prompt.slice(0,40), t0=Date.now();
        const raw=await streamRaw(M,m,prompt,r=>{ const j=jsonPeek(r); if(j&&onPart) onPart(j); },Math.max(2500,Math.min(8000,(ema[ek]||1500)*2.2)));
        ema[ek]=(ema[ek]||1500)*.7+Math.min(20000,Date.now()-t0)*.3; const j=parse(raw); if(key) remember(key,j); return j; }
      catch(e){ console.warn('Gemini stream',e); return api.json(prompt,null,{fast:true,fresh}); } },
    json:async(prompt,media,opt)=>{ const M=await load(), parts=[{text:prompt}], au=!!(media&&media.length), fast=!!(opt&&opt.fast);
    const key=fast&&!au&&!(opt&&opt.fresh)?hkey(prompt):null; if(key&&cache[key]) return cache[key][1]; const ek=prompt.slice(0,40);
    if(au) media.forEach(x=>parts.push({inlineData:{mimeType:x.mime,data:x.data}}));
    let last=null;
    for(let k=0;k<MODELS.length;k++){ const i=((fast?Math.max(0,MODELS.indexOf(C.fast)):first)+k)%MODELS.length; let r;
      const t0=Date.now();
      try{ r=fast?await hedged(M,MODELS[i],parts,au,k===MODELS.length-1,Math.max(2500,Math.min(10000,(ema[ek]||1800)*2.2))):await M.get(MODELS[i],au,k===MODELS.length-1).generateContent(parts); }catch(e){ console.warn('Gemini '+MODELS[i],e); last=e; if(busy(e)) continue; throw {code:code(e)}; }
      if(fast) ema[ek]=(ema[ek]||1800)*.7+Math.min(20000,Date.now()-t0)*.3;
      if(!fast) first=i; let t=''; try{ t=r.response.text(); }catch(e){ throw {code:'refused'}; } const j=parse(t); if(key) remember(key,j); return j; }
    throw {code:busy(last)?'busy':code(last)}; },
    /* natural voice: text (with a style hint like "Say cheerfully:") → {mime,data} audio */
    tts:async(text,voice)=>{ const M=await load(); let last=null;
      for(const m of (C.tts||[])){ try{ const r=await M.voice(m,voice||'Puck').generateContent(text); const p=((((r.response.candidates||[])[0]||{}).content||{}).parts||[]).find(x=>x.inlineData); if(p) return {mime:p.inlineData.mimeType,data:p.inlineData.data}; }catch(e){ last=e; console.warn('TTS '+m,e); } }
      throw {code:code(last)}; }};
  return api;
}
/* read a JSON object that is still being written: close the open string / brackets, drop a dangling key */
function jsonPeek(raw){ let s=String(raw||''); const a=s.indexOf('{'); if(a<0) return null; s=s.slice(a);
  let inStr=false, esc=false; const stack=[];
  for(let i=0;i<s.length;i++){ const ch=s[i]; if(inStr){ if(esc) esc=false; else if(ch==='\\') esc=true; else if(ch==='"') inStr=false; continue; }
    if(ch==='"') inStr=true; else if(ch==='{') stack.push('}'); else if(ch==='[') stack.push(']'); else if(ch==='}'||ch===']') stack.pop(); }
  let t=s; if(esc) t=t.slice(0,-1); if(inStr) t+='"';
  const close=x=>x+stack.slice().reverse().join('');
  const tries=[t, t.replace(/,\s*$/,''), t.replace(/,?\s*"[^"]*"\s*:?\s*$/,''), t.replace(/,?\s*"[^"]*"\s*:\s*"[^"]*"$/,'')];
  for(const x of tries){ try{ return JSON.parse(close(x.replace(/,\s*$/,''))); }catch(e){} } return null; }
let _samplePromise=null;
/* warm the AI connection and App Check token in the background so the first question is not slow */
setTimeout(()=>{ if(!window.__wordyKid) getSample().then(x=>x&&x.warm&&x.warm()).catch(()=>{}); },2500);
const getSample=()=>_samplePromise||(_samplePromise=((window.claude&&typeof window.claude.use==='function')?window.claude.use('sample').catch(()=>null):Promise.resolve(null)).then(x=>x||geminiAI()));
function useSample(){ const [s,setS]=useState(undefined); useEffect(()=>{ let on=true; getSample().then(x=>{ if(on) setS(()=>(window.__wordyKid?null:x)||null); }); /* sample is a function: wrap so React does not call it as an updater */ return ()=>{ on=false; }; },[]); return s; }
const AI_ERR=__WD[1272];
const aiOffText=()=>window.__wordyKid?'Функции с ИИ доступны с 13 лет.':'Проверка ИИ сейчас недоступна. Попробуй позже.';
const aiErr=e=>AI_ERR[e&&e.code]||'Проверка временно недоступна. Попробуй ещё раз.';
const clampB=x=>{ x=Math.round(Number(x)*2)/2; return isNaN(x)?null:Math.max(0,Math.min(9,x)); };
function cleanFb(j,keys){ if(!j||typeof j!=='object') throw {code:'invalid_json'}; const crit={}; keys.forEach(k=>crit[k]=clampB(j.crit&&j.crit[k])); if(crit.pr==null){ delete crit.pr; keys=keys.filter(k=>k!=='pr'); }
  const vals=keys.map(k=>crit[k]).filter(x=>x!=null), band=clampB(j.band)!=null?clampB(j.band):vals.length?roundBand(vals.reduce((a,b)=>a+b,0)/vals.length):null;
  const arr=x=>Array.isArray(x)?x.map(String).slice(0,6):[];
  const pron=Array.isArray(j.pron)?j.pron.filter(p=>p&&p.word).slice(0,6).map(p=>({word:String(p.word),heard:String(p.heard||''),tip:String(p.tip||'')})):[];
  return {band,crit,keys,pron,summary:String(j.summary||''),strengths:arr(j.strengths),improve:arr(j.improve),
    fixes:Array.isArray(j.fixes)?j.fixes.filter(f=>f&&f.from).slice(0,6).map(f=>({from:String(f.from),to:String(f.to||''),why:String(f.why||'')})):[]}; }
function writingPrompt(task,t,text){ const min=task==='t1'?150:250, chart=t.chart;
  return 'You are a strict, experienced IELTS Academic examiner. Assess this Writing '+(task==='t1'?'Task 1':'Task 2')+' response using the public IELTS Writing band descriptors.\n\nTask: '+t.prompt+'\n'
   +(chart?'\nVisual data: '+chartText(chart)+'\n':'')
   +'\nCandidate response ('+wcount(text)+' words):\n"""\n'+text.slice(0,6000)+'\n"""\n\nRules: criterion bands are whole or half numbers 0-9; be realistic and do not inflate scores.'+IELTS_CAL+' Penalise responses under '+min+' words under '+(task==='t1'?'Task Achievement':'Task Response')+'. Off-topic or memorised text scores low.'
   +(task==='t1'?' Check that figures match the chart data and that there is an overview.':'')
   +'\nWrite every explanation in Russian. In "fixes", quote the candidate\'s English exactly in "from" and give the corrected English in "to".\nReply with ONLY a JSON object of this shape: {"band":6.5,"crit":{"ta":6,"cc":6.5,"lr":6.5,"gra":6},"summary":"2-3 предложения","strengths":["..."],"improve":["..."],"fixes":[{"from":"...","to":"...","why":"..."}]}. At most 3 strengths, 4 improve items, 6 fixes.'; }
function speakingPrompt(m,ans,fs){ const lines=[];
  spScript(m).forEach(st=>{ if(st.k==='prep'||st.k==='end'||st.k==='id') return; const q=st.k==='p2'?'Part 2 cue card: '+m.speaking.p2.card+' ('+m.speaking.p2.points.join('; ')+')':'Q (Part '+st.part+'): '+st.q; lines.push(q+'\nA: '+(ans[st.k]||'(no answer)')); });
  return 'You are a strict, experienced IELTS Speaking examiner. Below is a transcript of a candidate\'s practice test (speech recognition or typed, so ignore punctuation and spelling). Assess Fluency and Coherence, Lexical Resource and Grammatical Range and Accuracy from the transcript. Pronunciation cannot be judged from text: do not score it. Short, memorised or missing answers lower the bands.'+IELTS_CAL+' Be realistic.\n\n'+lines.join('\n\n').slice(0,9000)
   +(fs?'\n\nMEASURED BY THE APP from the live recording (use it for Fluency): speech rate '+fs.wpm+' words per minute; '+fs.ppm+' pauses longer than 1.5 seconds per minute (longest '+fs.longest+' s); filler words: '+(fs.filN?Object.entries(fs.fil).map(([n,c])=>n+' x'+c).join(', '):'none detected')+(fs.p2!=null?'; Part 2 long turn lasted '+fs.p2+' seconds':'')+'. Mention speed, pauses and fillers in "improve" if they are a problem.':'')+'\n\nWrite every explanation in Russian; quote the candidate\'s English exactly in "from".\nReply with ONLY a JSON object: {"band":6,"crit":{"fc":6,"lr":6,"gra":5.5},"summary":"2-3 предложения","strengths":["..."],"improve":["..."],"fixes":[{"from":"...","to":"...","why":"..."}]}. At most 3 strengths, 4 improve items, 6 fixes.'; }
/* AI examiners tend to over-score: anchor them */
const IELTS_CAL=__WD[1273];
const pronAdd=(secs,what)=>'\n\nAUDIO ATTACHED: a '+secs+'-second recording of the candidate\'s own voice ('+what+'). Listen to it and assess Pronunciation as crit "pr" using the IELTS pronunciation descriptors: individual sounds, word stress, sentence stress and intonation, connected speech, and how much effort the listener needs. The candidate is a Russian or Kyrgyz speaker: listen for th, w/v, h, final voiced consonants, short and long vowels, -ed endings and word stress. Judge pronunciation from the recording, not from the transcript (speech recognition hides errors). Add to the JSON "pr" inside "crit" and "pron":[{"word":"the English word or phrase","heard":"how it sounded (IPA or simple Russian letters)","tip":"как исправить, по-русски"}] with at most 6 real problems (empty array if none). The overall "band" must include pr (average of the four criteria).';
const CRIT_N={ta:'Task Response',cc:'Coherence & Cohesion',lr:'Lexical Resource',gra:'Grammar',fc:'Fluency & Coherence',pr:'Pronunciation'};
function Feedback({fb,keys}){ return html`<div className="mk-fb enter">
  <div className="mk-fb-top"><span className="mk-band">${fmtB(fb.band)}</span><div><b>Примерный бэнд</b><p>${fb.summary}</p></div></div>
  <div className="mk-crit">${keys.map(k=>html`<span key=${k}><em>${fmtB(fb.crit[k])}</em>${CRIT_N[k]}</span>`)}</div>
  ${fb.strengths.length?html`<h4>Что получилось</h4><ul>${fb.strengths.map((x,i)=>html`<li key=${i}>${x}</li>`)}</ul>`:null}
  ${fb.improve.length?html`<h4>Что улучшить</h4><ul>${fb.improve.map((x,i)=>html`<li key=${i}>${x}</li>`)}</ul>`:null}
  ${fb.pron&&fb.pron.length?html`<h4>Произношение: что поправить</h4><div className="mk-fixes">${fb.pron.map((p,i)=>html`<div key=${i} className="mk-fix"><b>${p.word}</b>${p.heard?html`<s>${p.heard}</s>`:null}<small>${p.tip}</small></div>`)}</div>`:null}
  ${fb.fixes.length?html`<h4>Исправления</h4><div className="mk-fixes">${fb.fixes.map((f,i)=>html`<div key=${i} className="mk-fix"><s>${f.from}</s><b>${f.to}</b><small>${f.why}</small></div>`)}</div>`:null}
  <p className="mk-note">Оценка ИИ ориентировочная. Официальный балл ставят только экзаменаторы IELTS.</p><${AiReport} what="оценка IELTS" text=${'Band '+fb.band+'\n'+fbText(fb)}/></div>`; }

/* ---------- storage ---------- */
const saveMock=(update,id,part,res,coins)=>update(s=>{ const m={...(s.mocks||{})}, cur={...(m[id]||{})}; cur[part]={...res,date:dayKey()};
  if(part!=='sat'&&res.band!=null) cur.best={...(cur.best||{}),[part]:Math.max((cur.best||{})[part]||0,res.band)};
  m[id]=cur; return {mocks:m,coins:s.coins+(coins||0),xp:s.xp+(coins||0)*3}; });
const ieltsOverall=r=>{ const b=['L','R','W','S'].map(k=>r&&r[k]&&r[k].band).filter(x=>x!=null); return b.length===4?roundBand(b.reduce((a,c)=>a+c,0)/4):null; };

/* ---------- hub ---------- */
const IELTS_PARTS=[['L','Listening','4 части · 40 вопросов',MI.head,'≈ 30 мин'],['R','Reading','3 текста · 40 вопросов',MI.book,'60 мин'],['W','Writing','Task 1 + Task 2',MI.pen,'60 мин'],['S','Speaking','Part 1, 2, 3',MI.mic,'≈ 12 мин']];
function MockHub({st,kind,openMock}){
  if(kind==='ielts') return html`<div className="sec-h"><h2>Пробный IELTS</h2><span className="muted">формат Academic</span></div>
    <p className="hint-line">${IELTS_MOCKS.length} полных ${plural(IELTS_MOCKS.length,'теста','тестов','тестов')} в формате экзамена: Listening — 4 части и 40 вопросов с аудиозаписями, Reading — 3 текста и 40 вопросов, Writing — Task 1 и Task 2, Speaking — 3 части. Listening и Reading проверяются автоматически, Writing и Speaking оценивает ИИ.</p>
    <button className="mk-tool enter" id="mk-drill" onClick=${()=>openMock({kind:'drill'})}><span className="mk-pic">${MI.flag()}</span><span className="mk-pmain"><b>Быстрая тренировка · 5 минут</b><small>8 вопросов одного типа: TRUE/FALSE/NOT GIVEN, заголовки, пропуски, Listening…</small></span><span aria-hidden="true">›</span></button>
    <button className="mk-tool enter" id="mk-p2" onClick=${()=>openMock({kind:'p2'})}><span className="mk-pic">${MI.mic()}</span><span className="mk-pmain"><b>Темы Speaking Part 2</b><small>${P2_BANK.length} популярных карточек: монолог на время, оценка ИИ и образец ответа на 7+</small></span><span aria-hidden="true">›</span></button>
    <button className="mk-tool enter" id="mk-pron" onClick=${()=>openMock({kind:'pron'})}><span className="mk-pic">${MI.mic()}</span><span className="mk-pmain"><b>Тренажёр произношения</b><small>${PRON.length} фраз: TH, W/V, гласные, -ed, ударение · ${Object.keys(st.pron||{}).length?'пройдено '+Object.keys(st.pron).length:'читай вслух — Ворди покажет, какие слова не распознаны'}</small></span><span aria-hidden="true">›</span></button>
    ${IELTS_MOCKS.map(m=>{ const r=(st.mocks||{})[m.id]||{}, ov=ieltsOverall(r);
      return html`<article key=${m.id} className="mk-card enter">
        <div className="mk-card-h"><div><b>${m.title}</b><small>${ov!=null?'Общий бэнд по последним попыткам':'Проходи части в любом порядке'}</small></div><span className=${'mk-ov'+(ov!=null?' on':'')}>${fmtB(ov)}</span></div>
        <div className="mk-parts">${IELTS_PARTS.map(([k,n,d,ic,tm])=>html`<button key=${k} className="mk-part" id=${'mk-'+m.id+'-'+k} onClick=${()=>openMock({kind:'ielts',id:m.id,part:k})}>
          <span className="mk-pic">${ic()}</span><span className="mk-pmain"><b>${n}</b><small>${k==='L'?lsMin(m):tm}</small></span>
          <span className=${'mk-pband'+(r[k]&&r[k].band!=null?' on':'')}>${r[k]&&r[k].band!=null?fmtB(r[k].band):r[k]?'✓':'—'}</span></button>`)}</div>
        <button className="btn wide" id=${'mk-'+m.id+'-full'} onClick=${()=>openMock({kind:'ielts',id:m.id,part:'full'})}>Пройти весь тест подряд · ≈ 2 ч 45 мин</button>
      </article>`; })}
    <p className="mk-soon">Новые пробные тесты будут добавляться.</p>`;
  return html`<div className="sec-h"><h2>Пробный SAT</h2><span className="muted">Digital SAT</span></div>
    <p className="hint-line">Как на настоящем экзамене: второй модуль подбирается по результату первого. Баллы — примерная оценка по шкале 400–1600.</p>
    ${SAT_MOCKS.map(m=>{ const r=((st.mocks||{})[m.id]||{}).sat;
      return html`<article key=${m.id} className="mk-card enter">
        <div className="mk-card-h"><div><b>${m.title}</b><small>${r?'Последний результат: '+r.date.split('-').reverse().join('.'):'Reading & Writing — 2 модуля по 12 вопросов, Math — 2 модуля по 10'}</small></div><span className=${'mk-ov sat'+(r&&r.total?' on':'')}>${r&&r.total?r.total:'—'}</span></div>
        ${r?html`<div className="mk-crit">${r.rw!=null?html`<span><em>${r.rw}</em>Reading & Writing</span>`:null}${r.math!=null?html`<span><em>${r.math}</em>Math</span>`:null}</div>`:null}
        <button className="btn wide" id=${'mk-'+m.id+'-full'} onClick=${()=>openMock({kind:'sat',id:m.id,part:'full'})}>Пройти весь тест · ≈ 1 ч</button>
        <div className="mk-two"><button className="btn ghost" id=${'mk-'+m.id+'-rw'} onClick=${()=>openMock({kind:'sat',id:m.id,part:'rw'})}>${MI.book()} Reading & Writing</button>
          <button className="btn ghost" id=${'mk-'+m.id+'-math'} onClick=${()=>openMock({kind:'sat',id:m.id,part:'math'})}>${MI.calc()} Math</button></div>
      </article>`; })}`;
}

/* ---------- shared answer widgets ---------- */
const OptRow=({opts,val,set,dis,res,correct,id,compact})=>html`<div className=${'mk-opts'+(compact?' compact':'')} role="radiogroup">${opts.map((o,oi)=>{
  const cls=res?(oi===correct?' good':oi===val?' bad':' dim'):val===oi?' sel':'';
  return html`<button key=${oi} id=${id+'-'+oi} role="radio" aria-checked=${val===oi} className=${'mk-opt'+cls} disabled=${dis} onClick=${()=>{ SFX('tap'); set(oi); }}>${compact?null:html`<span className="k">${String.fromCharCode(65+oi)}</span>`}<span>${o}</span></button>`; })}</div>`;
function GapIn({val,set,res,ok,answer,id,label,wide}){
  return html`<span className=${'mk-gapw'+(wide?' wide':'')}><input id=${id} className=${'mk-gap'+(res?(ok?' good':' bad'):'')} value=${val||''} onChange=${e=>set(e.target.value)} readOnly=${res}
    autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck=${false} aria-label=${label||'Ответ'}/>${res&&!ok?html`<em className="mk-right">${answer}</em>`:null}</span>`; }

/* ---------- IELTS Listening ---------- */
/* qs entries: [before, after, [accepted]] gap · {q,o,a} multiple choice · {q,a} match from part.box · 'string' sub-heading */
const lqs=p=>p.qs.filter(q=>typeof q!=='string');
const lsOk=(q,v)=>Array.isArray(q)?gapOk(v||'',q[2]):v===q.a;
/* ---------- IELTS Listening — computer-delivered style: one continuous programme ---------- */
const lsStarts=m=>{ let c=0; return m.listening.map(p=>{ const s=c; c+=lqs(p).length; return s; }); };
const audOf=(m,k)=>IELTS_AUDIO[m.id+'-p'+m.listening[k].n];
const progLen=a=>a?a.dur+(a.pauses||[]).reduce((x,y)=>x+y.dur,0):0;
const lsMin=m=>{ const A=m.listening.map(p=>IELTS_AUDIO[m.id+'-p'+p.n]); return A.every(Boolean)?'≈ '+Math.round((A.reduce((n,a)=>n+progLen(a),0)+120)/60)+' мин':'≈ 30 мин'; };
function useExamWide(on){ useEffect(()=>{ if(!on) return; document.body.classList.add('mk-exam'); const id=setTimeout(()=>W('goTo','exam',{frac:.5}),700); return ()=>{ clearTimeout(id); document.body.classList.remove('mk-exam'); W('goTo','home'); }; },[on]); }
function QNav({total,ans,flags,cur,go,ok}){
  return html`<nav className="mk-qnav" aria-label="Вопросы"><div className="mk-qnav-in">${Array.from({length:total},(_,i)=>{ const v=ans[i], a=v!=null&&v!=='';
    return html`<button key=${i} className=${(a?'ans':'')+(ok?(ok(i)?' good':' bad'):'')+(flags&&flags[i]?' flag':'')+(cur&&cur(i)?' cur':'')} onClick=${()=>go(i)} aria-label=${'Вопрос '+(i+1)+(a?', есть ответ':'')}>${i+1}</button>`; })}</div><span className="mk-qnav-perch" data-perch="exam" aria-hidden="true"></span></nav>`; }
const scrollToQ=id=>setTimeout(()=>{ const el=document.getElementById(id); if(el){ el.scrollIntoView({block:'center',behavior:'smooth'}); try{ el.focus({preventScroll:true}); }catch(e){} } },60);
function IeltsListening({m,st:appSt,update,onExit,onNext,nextName}){
  const parts=m.listening, starts=useMemo(()=>lsStarts(m),[m]), total=starts[parts.length-1]+lqs(parts[parts.length-1]).length;
  const allAudio=parts.every((p,k)=>p.audio&&audOf(m,k));
  const [mode,setMode]=useState(allAudio?'audio':canSpeak?'tts':'text');
  const [view,setView]=useState(0), [phase,setPhase]=useState('ready'), [cur,setCur]=useState(0);
  const [pause,setPause]=useState(null), [elapsed,setElapsed]=useState(0), [checkLeft,setCheckLeft]=useState(120);
  const [ans,setAns,clrA,dAt]=useDraftState('ielts:L:'+m.id,{},v=>!Object.keys(v).length), [res,setRes]=useState(null), [showT,setShowT]=useState(false);
  const aud=useRef(null), tick=useRef(null), st=useRef({done:{},pausedSum:0}), fin=useRef(false), holdRef=useRef(null), [uPause,setUPause]=useState(false);
  useExamWide(true);
  const totalProg=useMemo(()=>parts.reduce((n,p,k)=>n+progLen(audOf(m,k)),0)+120,[m]);
  const before=k=>parts.slice(0,k).reduce((n,p,j)=>n+progLen(audOf(m,j)),0);
  const stopAll=()=>{ stopSpeak(); clearInterval(tick.current); if(aud.current){ const a=aud.current; aud.current=null; try{ a.pause(); a.removeAttribute('src'); a.load(); }catch(e){} } };
  useEffect(()=>()=>stopAll(),[]);
  const finish=()=>{ if(fin.current) return; fin.current=true; stopAll(); setPause(null);
    const all=parts.flatMap(lqs), raw=all.filter((q,i)=>lsOk(q,ans[i])).length, band=band40(Math.round(raw/all.length*40));
    const qt=tally(all.map((q,i)=>[lsType(q),lsOk(q,ans[i])])); addQt(update,qt);
    clrA(); setRes({raw,band,n:all.length,qt}); setPhase('done'); saveMock(update,m.id,'L',{raw,raw40:raw,band},20); window.scrollTo({top:0});
    if(band>=7){ SFX('fanfare'); FX('rain',120); W('react','cheer'); W('say','Listening '+fmtB(band)+'! Отличный слух!',0,true); } else { SFX('pop'); W('react','encourage'); W('say','Listening '+fmtB(band)+'. Смотри разбор и текст записи.',0,true); } };
  const ansRef=useRef(ans); ansRef.current=ans; const uPauseRef=useRef(false); uPauseRef.current=uPause;
  const startCheck=()=>{ setPhase('check'); setPause(null); let left=120; setCheckLeft(left); W('say','Запись закончилась. 2 минуты на проверку ответов.',0,true);
    clearInterval(tick.current); tick.current=setInterval(()=>{ left--; setCheckLeft(left); if(left<=0){ clearInterval(tick.current); finish(); } },1000); };
  const playPart=k=>{ setCur(k); setView(k); st.current={done:{},pausedSum:0}; const A=audOf(m,k);
    if(mode!=='audio'){ playScript(parts[k].script.filter(l=>l[0]!=='--'),parts[k].voices,null,ok=>{ if(!ok){ setMode('text'); setPhase('text'); W('say','Звук не включился — читай текст записи.',0,true); return; } k<parts.length-1?playPart(k+1):startCheck(); }); return; }
    const a=new Audio(parts[k].audio); aud.current=a; window.__mkAudio=a; let failed=false;
    const fail=()=>{ if(failed||aud.current!==a) return; failed=true; aud.current=null; if(canSpeak){ setMode('tts'); playScript(parts[k].script.filter(l=>l[0]!=='--'),parts[k].voices,null,()=>k<parts.length-1?playPart(k+1):startCheck()); } else { setMode('text'); setPhase('text'); } };
    a.ontimeupdate=()=>{ if(aud.current!==a) return; const t=a.currentTime; setElapsed(before(k)+t+st.current.pausedSum);
      (A.pauses||[]).forEach((pz,j)=>{ if(!st.current.done[j]&&t>=pz.at){ a.pause(); hold(j,pz,()=>{ if(aud.current===a&&!uPauseRef.current) a.play().catch(fail); }); } }); };
    const hold=(j,pz,after)=>{ st.current.done[j]=1; let left=pz.dur; setPause({left,label:pz.label}); holdRef.current={after};
      clearInterval(tick.current); tick.current=setInterval(()=>{ left--; st.current.pausedSum++; setElapsed(e=>e+1); setPause(p=>p&&{...p,left});
        if(left<=0){ clearInterval(tick.current); setPause(null); holdRef.current=null; after(); } },1000); };
    st.current.A=A;
    const next=()=>k<parts.length-1?playPart(k+1):startCheck();
    a.onended=()=>{ if(aud.current!==a) return; const j=(A.pauses||[]).findIndex((pz,i)=>!st.current.done[i]);
      if(j>=0){ hold(j,A.pauses[j],()=>{ if(aud.current===a){ aud.current=null; next(); } }); return; } aud.current=null; next(); };
    a.onerror=fail; const pr=a.play(); if(pr&&pr.catch) pr.catch(fail); };
  const endHold=()=>{ clearInterval(tick.current); setPause(null); const h=holdRef.current; holdRef.current=null; return h; };
  const skipHold=()=>{ const h=endHold(); if(h){ SFX('tap'); h.after(); } };
  const seek=d=>{ const a=aud.current; if(!a) return; SFX('tap'); const h=endHold(); const dur=isFinite(a.duration)?a.duration:1e9;
    const nt=Math.max(0,Math.min(dur-0.5,(a.currentTime||0)+d)); const A=st.current.A||{};
    (A.pauses||[]).forEach((pz,j)=>{ if(pz.at>nt) st.current.done[j]=0; });
    try{ a.currentTime=nt; }catch(e){} if(!uPause) a.play().catch(()=>{}); };
  const togglePlay=()=>{ const a=aud.current; if(!a) return; SFX('tap'); if(uPause){ setUPause(false); if(!holdRef.current) a.play().catch(()=>{}); } else { setUPause(true); a.pause(); } };
  const begin=()=>{ SFX('pop'); W('react','think'); if(mode==='text'){ setPhase('text'); return; } setPhase('play'); playPart(0); };
  const P=parts[view], base=starts[view], left=Math.max(0,Math.round(totalProg-elapsed)), answered=Object.values(ans).filter(v=>v!=null&&v!=='').length;
  const allQs=useMemo(()=>parts.flatMap(lqs),[m]);
  const ai=useSample(); const evs=useMemo(()=>res?listeningEvidence(m):null,[res,m]); const rev=useRef(null); const [tapL,popL]=useWordTap({st:appSt||{},update,on:!!res,src:m.title+' · Listening'});
  useEffect(()=>()=>{ try{ rev.current&&rev.current.pause(); }catch(e){} },[]);
  const playEv=e=>{ const A=audOf(m,e.part); if(!A||!A.starts) return; SFX('tap'); try{ rev.current&&rev.current.pause(); }catch(x){}
    const a=new Audio(parts[e.part].audio); rev.current=a; window.__mkRev=a; const st0=A.starts[e.line], en=A.starts[e.line+(e.span||1)]||(st0+25);
    a.addEventListener('loadedmetadata',()=>{ try{ a.currentTime=Math.max(0,st0-0.3); }catch(x){} a.play().catch(()=>{}); },{once:true});
    a.ontimeupdate=()=>{ if(a.currentTime>=Math.min(en+0.3,st0+60)) a.pause(); }; a.load(); };
  const lAns=(q,v,P)=>v==null||v===''?null:Array.isArray(q)?v:q.o?q.o[v]:(P.box||[])[v];
  const lCorr=(q,P)=>Array.isArray(q)?q[2][0]:q.o?q.o[q.a]:(P.box||[])[q.a];
  const goQ=i=>{ const k=starts.reduce((r,s,j)=>i>=s?j:r,0); setView(k); scrollToQ('lq-'+i+(allQs[i]&&!Array.isArray(allQs[i])&&allQs[i].o?'-0':'')); };
  const qBlock=(q,n,k)=>{ const ok=res&&lsOk(q,ans[n]), set=v=>{ if(!res) setAns(a=>({...a,[n]:v})); };
    if(Array.isArray(q)) return html`<div key=${k} className="mk-fline"><span className="mk-qn">${n+1}</span><span className="mk-ftext">${q[0]} <${GapIn} id=${'lq-'+n} val=${ans[n]} set=${set} res=${!!res} ok=${ok} answer=${q[2][0]} label=${'Вопрос '+(n+1)}/> ${q[1]}</span></div>`;
    if(q.o) return html`<div key=${k} className=${'mk-q'+(res?(ok?' good':' bad'):'')}><div className="mk-qt"><span className="mk-qn">${n+1}</span><span>${q.q}</span></div>
      <${OptRow} opts=${q.o} val=${ans[n]} set=${set} dis=${!!res} res=${!!res} correct=${q.a} id=${'lq-'+n}/></div>`;
    return html`<div key=${k} className=${'mk-q mk-qm'+(res?(ok?' good':' bad'):'')}><div className="mk-qt"><span className="mk-qn">${n+1}</span><span>${q.q}</span></div>
      <select id=${'lq-'+n} className=${'mk-sel'+(res?(ok?' good':' bad'):'')} value=${ans[n]==null?'':ans[n]} disabled=${!!res} onChange=${e=>set(e.target.value===''?null:+e.target.value)} aria-label=${'Вопрос '+(n+1)}>
        <option value="">— выбери —</option>${P.box.map((o,j)=>html`<option key=${j} value=${j}>${String.fromCharCode(65+j)}  ${o}</option>`)}</select>
      ${res&&!ok?html`<em className="mk-right">${String.fromCharCode(65+q.a)} ${P.box[q.a]}</em>`:null}</div>`; };
  const mins=Math.round(totalProg/60);
  return html`<section className="mk-sec mk-exam-sec">
    <div className="sess-top mk-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Listening</b><span className="muted">${answered}/${total} отвечено</span></div>
      ${phase==='play'&&mode==='audio'?html`<span className="mk-timer" role="timer">${MI.clock()}${mmss(left)}</span>`:phase==='check'?html`<${Timer} left=${checkLeft} label="Проверка"/>`:null}</div>
    ${phase==='ready'?html`<div className="mk-res mk-start enter" data-perch="card"><span className="phase">${m.title}</span><h3>Listening · ${mode==='audio'?'≈ '+mins+' минут':'4 части'}</h3>
      <p>4 части, 40 вопросов. Запись идёт без остановки, как на экзамене: диктор объявляет части, перед каждой есть время прочитать вопросы, после — проверить ответы. В конце 2 минуты на проверку.</p>
      <ul className="mk-rules"><li>На экзамене запись звучит <b>один раз</b>. Здесь на всякий случай можно отмотать на 10 секунд или поставить паузу, но для честной тренировки лучше не трогать</li><li>Можно листать части и вопросы, пока идёт запись</li><li>Надень наушники и проверь громкость</li></ul>
      <button className="btn wide" id="lis-start" onClick=${begin}>${I.speaker()} ${mode==='text'?'Начать (без звука, с текстом)':'Начать Listening'}</button>
      ${mode!=='audio'?html`<small className="muted">${mode==='tts'?'Аудиофайлы недоступны — запись прочитает голос устройства.':'Озвучка недоступна — будет показан текст записи.'}</small>`:null}</div>`:null}
    ${phase==='play'?html`<div className=${'mk-live'+(pause?' pause':'')} role="status" aria-live="polite">${pause?html`<span className="mk-live-dot"></span><b>${pause.label}</b><em>${mmss(pause.left)}</em>`
      :html`<span className=${'mk-live-dot'+(uPause?'':' on')}></span><b>${uPause?'Пауза':'Звучит'} · Part ${parts[cur].n}</b>${cur!==view?html`<button className="link-btn" onClick=${()=>setView(cur)}>к этой части</button>`:null}`}
      ${mode==='audio'?html`<span className="mk-ctl"><button id="lis-back" onClick=${()=>seek(-10)} aria-label="Назад на 10 секунд">−10с</button>
        ${pause?html`<button id="lis-skip" onClick=${skipHold} aria-label="Пропустить паузу">Дальше ›</button>`:html`<button id="lis-pp" onClick=${togglePlay} aria-label=${uPause?'Продолжить':'Пауза'}>${uPause?'▶':'❚❚'}</button>`}
        <button id="lis-fwd" onClick=${()=>seek(10)} aria-label="Вперёд на 10 секунд">+10с</button></span>`:null}</div>`:null}
    ${phase==='check'?html`<div className="mk-live pause" role="status"><b>Проверь ответы</b><em>${mmss(checkLeft)}</em><button className="btn small" id="lis-finish" onClick=${finish}>Завершить</button></div>`:null}
    ${res?html`<div className="mk-res enter" data-perch="card"><span className="phase">Listening · результат</span><span className="mk-big">${fmtB(res.band)}</span>
      <p>${res.raw} из ${res.n} верно</p>${res.qt?html`<${QtBreak} o=${res.qt}/>`:null}<button className="btn ghost small" onClick=${()=>setShowT(!showT)}>${showT?'Скрыть':'Показать'} текст записи</button></div>`:null}
    ${phase!=='ready'?html`
    <div className="mk-tabs" role="tablist">${parts.map((p,k)=>html`<button key=${k} role="tab" aria-selected=${k===view} onClick=${()=>{ SFX('tap'); setView(k); }}>Part ${p.n}${phase==='play'&&k===cur?html` <i className="mk-on" aria-label="звучит"></i>`:null}</button>`)}</div>
    <article className="mk-paper enter" key=${view}>
      <h3>${P.title}</h3><p className="mk-ins">${P.intro}</p>${P.box?html`<div className="mk-box">${P.box.map((w,j)=>html`<span key=${j}><b>${String.fromCharCode(65+j)}</b> ${w}</span>`)}</div>`:null}
      <div className="mk-form">${P.head?html`<b className="mk-form-h">${P.head}</b>`:null}
        ${(()=>{ let c=base; return P.qs.map((q,k)=>typeof q==='string'?html`<p key=${k} className="mk-sub">${q}</p>`:(n=>html`<div key=${k}>${qBlock(q,n,k)}${res&&evs?html`<${EvidenceBox} ev=${evs[n]} label=${'В записи'+(evs[n]&&P.script.some(x=>x[0]!==evs[n].sp&&x[0]!=='--')?' ('+evs[n].sp+')':'')+':'}
            onPlay=${evs[n]&&audOf(m,evs[n].part)&&mode==='audio'?()=>playEv(evs[n]):null}
            ask=${ai&&evs[n]?()=>ai.json(whyPrompt(P.script.filter(l=>l[0]!=='--').slice(Math.max(0,evs[n].line-2),evs[n].line+3).map(l=>l[0]+': '+l[1]).join('\n'),Array.isArray(q)?q[0]+' ___ '+q[1]:q.q,q.o?q.o.join(' / '):P.box&&!Array.isArray(q)?P.box.join(' / '):null,lCorr(q,P),lAns(q,ans[n],P)),null,{fast:true}):null}/>`:null}</div>`)(c++)); })()}</div>
      ${(res&&showT)||phase==='text'?html`<details className=${'mk-trans'+(res?' wt-on':'')} open onClick=${tapL}><summary>Текст записи · Part ${P.n}</summary>${res?html`<p className="wt-hint">Нажми на незнакомое слово — добавишь его в «Мои слова»</p>`:null}${P.script.filter(l=>l[0]!=='--').map(([sp,t],k)=>html`<p key=${k}><b>${P.script.some(x=>x[0]!==sp&&x[0]!=='--')?sp+': ':''}</b>${t}</p>`)}</details>`:null}
    </article>
    ${popL}<${TextAsk} on=${!!res} scope=".mk-trans" level=${(appSt||{}).level}/>
    <${QNav} total=${total} ans=${ans} cur=${i=>i>=base&&i<base+lqs(P).length} go=${goQ} ok=${res?(i=>lsOk(allQs[i],ans[i])):null}/>
    ${phase==='text'&&!res?html`<div className="mk-foot"><button className="btn wide" id="lis-finish" onClick=${finish}>Завершить и проверить</button></div>`:null}
    ${res?html`${onNext?html`<div className="actions one"><button className="btn" id="mk-next" onClick=${onNext}>Далее: ${nextName}</button></div>`:null}<div className="actions" hidden=${!!onNext}><button className="btn ghost" onClick=${onExit}>К тестам</button><button className="btn" onClick=${()=>{ fin.current=false; setAns({}); setRes(null); setView(0); setShowT(false); setElapsed(0); setPhase('ready'); window.scrollTo({top:0}); }}>Ещё раз</button></div>`:null}`:null}
  </section>`;
}


/* ---------- IELTS Reading ---------- */
function flatReading(m){ const out=[]; m.reading.forEach((ps,pi)=>ps.groups.forEach((g,gi)=>g.qs.forEach((q,qi)=>out.push({pi,gi,g,q,n:out.length})))); return out; }
function rdOk(it,v){ const {g,q}=it; return g.gap?gapOk(v||'',q[1]):v===(g.opts||g.box||g.pm?q[1]:q[2]); }
const pmOpts=P=>P.paras.map((_,k)=>'Paragraph '+String.fromCharCode(65+k));
/* ---------- answer evidence: where in the text / recording the answer is ---------- */
const EV_STOP=new Set(__WD[1274].split(' '));
const evStem=w=>w.length>4?w.replace(/(ies)$/,'y').replace(/(ing|ed|es|e|s|ly)$/,''):w;
const evToks=s=>String(s||'').toLowerCase().replace(/[^a-z0-9\s-]/g,' ').split(/\s+/).filter(w=>w&&!EV_STOP.has(w)).map(evStem).filter(w=>w.length>1);
const evSplit=p=>{ const s=String(p).replace(/(\d)\.(\d)/g,'$1\u2024$2').replace(/\b(Dr|Mr|Mrs|Ms|St)\./g,'$1\u2024'); return (s.match(/[^.!?]+[.!?]+["')”]*\s*|[^.!?]+$/g)||[s]).map(x=>x.replace(/\u2024/g,'.').trim()).filter(Boolean); };
const evIdf=list=>{ const df={}; list.forEach(x=>new Set(x.t).forEach(w=>df[w]=(df[w]||0)+1)); const N=list.length; return w=>Math.log(1+N/(df[w]||1)); };
let _idf=()=>1;
const evScore=(qt,st)=>{ const S=new Set(st); let n=0; new Set(qt).forEach(w=>{ if(S.has(w)) n+=_idf(w); }); return n; };
const evNorm=s=>String(s).toLowerCase().replace(/[,]/g,'');
function readingEvidence(m){ const items=flatReading(m); return items.map(it=>{ const {g,q}=it, P=m.reading[it.pi];
  const sents=[]; P.paras.forEach((p,k)=>evSplit(p).forEach((s,j)=>sents.push({para:k,sent:j,text:s,t:evToks(s)})));
  _idf=evIdf(sents);
  const pickIn=(list,qt,must)=>{ let best=null,bs=-1; list.forEach(x=>{ let sc=evScore(qt,x.t); if(must&&must.some(a=>evNorm(x.text).includes(evNorm(a)))) sc+=100; if(sc>bs){ bs=sc; best=x; } }); return best; };
  let ev, ng=false;
  if(g.gap) ev=pickIn(sents,evToks(q[0]),q[1]);
  else if(g.pm) ev=pickIn(sents.filter(x=>x.para===q[1]),evToks(q[0]));
  else if(g.heads){ const k=q[0].charCodeAt(q[0].length-1)-65; ev=sents.find(x=>x.para===k)||sents[0]; ev={...ev,whole:true}; }
  else { const extra=g.box?g.box[q[1]]:g.opts?'':q[1][q[2]]; ev=pickIn(sents,evToks(q[0]+' '+extra)); ng=!!g.opts&&g.opts[q[1]]==='NOT GIVEN'; }
  if(ev&&!g.gap&&!g.heads){ const nx=sents.find(x=>x.para===ev.para&&x.sent===ev.sent+1); if(nx) return {pi:it.pi,para:ev.para,sent:ev.sent,span:2,text:ev.text+' '+nx.text,ng}; }
  return ev?{pi:it.pi,para:ev.para,sent:ev.sent,span:1,text:ev.text,whole:!!ev.whole,ng}:null; }); }
function listeningEvidence(m){ const out=[]; m.listening.forEach((p,k)=>{ const lines=p.script.filter(l=>l[0]!=='--').map((l,i)=>({i,sp:l[0],text:l[1],t:evToks(l[1])})); let prev=0; _idf=evIdf(lines);
  lqs(p).forEach(q=>{ let qt, must=null;
    if(Array.isArray(q)){ qt=evToks(q[0]+' '+q[1]); must=q[2].concat(q[2].map(a=>W2N[a]).filter(Boolean)); }
    else if(q.o) qt=evToks(q.q+' '+q.o[q.a]+' '+q.o[q.a]); else qt=evToks(q.q+' '+q.q+' '+(p.box||[])[q.a]);
    let best=null,bs=-1; lines.forEach(x=>{ let sc=evScore(qt,x.t); if(must&&must.some(a=>evNorm(x.text).includes(evNorm(a)))) sc+=100; if(x.i>=prev) sc+=0.5; else sc-=3; if(sc>bs){ bs=sc; best=x; } });
    if(best) prev=best.i; let text=best?best.text:'', line=best?best.i:0, sp=best?best.sp:'';
    const multi=p.kind==='conversation'||new Set(lines.map(x=>x.sp)).size>1; let span=1;
    if(best&&!Array.isArray(q)&&multi){ const w=lines.slice(best.i,best.i+3); span=w.length; text=w.map(x=>x.sp+': '+x.text).join('\n'); }
    else if(best&&/\?\s*$/.test(best.text)&&lines[best.i+1]){ const nx=lines[best.i+1]; span=2; text=best.text+'\n'+nx.text; }
    out.push(best?{part:k,line,span,sp,text,approx:!Array.isArray(q)}:null); }); }); return out; }
const W2N=__WD[1275];
/* AI: why is this the answer */
const whyPrompt=(ctx,qtext,opts,correct,mine)=>'You are an IELTS teacher. A Russian-speaking student reviews one question. Explain in RUSSIAN, 2-4 short sentences: why the correct answer is right, pointing to the exact words in the text, and if the student answered differently, why their answer is wrong (for NOT GIVEN, say what information is missing). Do not repeat the whole text.\n\nTEXT:\n'+ctx+'\n\nQUESTION: '+qtext+(opts?'\nOPTIONS: '+opts:'')+'\nCORRECT ANSWER: '+correct+'\nSTUDENT ANSWER: '+(mine==null||mine===''?'(no answer)':mine)+'\n\nReturn JSON: {"why": "..."}';
/* Google Play rule for apps with generative AI: learners can flag a bad AI answer without leaving the app. Goes to Firestore «feedback» (kind 'ai'). */
function AiReport({what,text}){ const {be}=useAcc(); const [open,setOpen]=useState(false), [why,setWhy]=useState(''), [note,setNote]=useState(''), [state,setState]=useState(''), [err,setErr]=useState(null);
  const R=[['wrong','Ошибка в ответе'],['bad','Грубо или неуместно'],['other','Другое']];
  const send=async()=>{ setErr(null); setState('busy');
    try{ if(!be||!be.sendFeedback) throw accE('Жалобы работают на сайте Wordy.');
      await be.sendFeedback({kind:'ai',text:('Жалоба на ответ ИИ ('+what+'): '+((R.find(r=>r[0]===why)||[,'—'])[1])+(note.trim()?'. '+note.trim():'')+'\n--- Ответ ИИ:\n'+String(text||'')).slice(0,2000),page:location.pathname+location.hash,ua:navigator.userAgent.slice(0,160)});
      setState('sent'); SFX('pop'); }
    catch(e){ setErr(e); setState(''); } };
  if(state==='sent') return html`<p className="ai-rep-ok muted">Спасибо! Жалоба отправлена автору Wordy.</p>`;
  if(!open) return html`<button className="link-btn ai-rep" onClick=${()=>{ SFX('tap'); setOpen(true); }}>⚑ Пожаловаться на ответ ИИ</button>`;
  return html`<div className="ai-rep-box enter"><b>Что не так с ответом ИИ?</b>
    <div className="chips">${R.map(([k,l])=>html`<button key=${k} className="chip" aria-pressed=${why===k} onClick=${()=>setWhy(k)}>${l}</button>`)}</div>
    <textarea rows="2" maxLength="400" value=${note} placeholder="Комментарий (необязательно)" onChange=${e=>setNote(e.target.value)} aria-label="Комментарий к жалобе"></textarea>
    <${AccErr} e=${err}/><div className="actions"><button className="btn small ghost" onClick=${()=>setOpen(false)}>Отмена</button><button className="btn small" disabled=${!why||state==='busy'} onClick=${send}>${state==='busy'?'Отправляю…':'Отправить жалобу'}</button></div></div>`; }
const fbText=fb=>[fb.summary,...(fb.strengths||[]),...(fb.improve||[]),...(fb.fixes||[]).map(f=>f.from+' → '+f.to+' ('+f.why+')'),...(fb.pron||[]).map(p=>p.word+': '+p.tip)].join('\n');
function EvidenceBox({ev,label,onShow,onPlay,ask}){ const [open,setOpen]=useState(false), [why,setWhy]=useState(null), [busy,setBusy]=useState(false), [err,setErr]=useState(null);
  if(!ev) return null;
  const go=()=>{ if(busy||!ask) return; setBusy(true); setErr(null); ask().then(j=>setWhy(String((j&&j.why)||'').slice(0,900)||'—')).catch(e=>setErr(aiErr(e))).finally(()=>setBusy(false)); };
  return html`<div className="ev">
    <button className="link-btn ev-tg" aria-expanded=${open} onClick=${()=>{ SFX('tap'); setOpen(!open); }}>${open?'Скрыть':'Где ответ?'}</button>
    ${open?html`<div className="ev-box enter">
      <small className="muted">${ev.ng?'Этого в тексте нет. Ближе всего по теме:':ev.approx?'Ответ звучит здесь:':label}</small>
      <blockquote>${String(ev.text).split('\n').map((s,i)=>html`<span key=${i} className="ev-line">${s}</span>`)}</blockquote>
      <div className="ev-act">${onShow?html`<button className="btn small ghost" onClick=${onShow}>Показать в тексте</button>`:null}
        ${onPlay?html`<button className="btn small ghost" onClick=${onPlay}>▶ Послушать</button>`:null}
        ${ask?html`<button className="btn small ghost" disabled=${busy} onClick=${go}>${busy?'Думаю…':'Почему так? · ИИ'}</button>`:null}</div>
      ${why?html`<p className="ev-why">${why}</p><${AiReport} what="Почему так?" text=${why}/>`:null}${err?html`<p className="muted">${err}</p>`:null}
    </div>`:null}</div>`; }
/* ---------- «Мои слова»: tap an unknown word in a test text after checking, keep it for spaced practice ---------- */
let _dict=null;
const dictMap=()=>_dict||(_dict=new Map(ALL.map(w=>[w.en.toLowerCase(),w])));
function lemmaCands(w){ w=w.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,''); const c=[w];
  if(w.endsWith('ies')) c.push(w.slice(0,-3)+'y'); if(w.endsWith('ied')) c.push(w.slice(0,-3)+'y');
  if(w.endsWith('es')) c.push(w.slice(0,-2)); if(w.endsWith('s')) c.push(w.slice(0,-1));
  if(w.endsWith('ed')){ c.push(w.slice(0,-2),w.slice(0,-1)); if(/(.)\1ed$/.test(w)) c.push(w.slice(0,-3)); }
  if(w.endsWith('ing')){ c.push(w.slice(0,-3),w.slice(0,-3)+'e'); if(/(.)\1ing$/.test(w)) c.push(w.slice(0,-4)); }
  if(w.endsWith('ly')) c.push(w.slice(0,-2)); if(w.endsWith('er')) c.push(w.slice(0,-2),w.slice(0,-1)); if(w.endsWith('est')) c.push(w.slice(0,-3));
  return [...new Set(c)].filter(x=>x.length>1); }
const dictFind=w=>{ const m=dictMap(); for(const c of lemmaCands(w)){ const x=m.get(c); if(x) return x; } return null; };
const myId=en=>'my-'+String(en).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function wordAtPoint(x,y){ let node,off;
  if(document.caretRangeFromPoint){ const r=document.caretRangeFromPoint(x,y); if(!r) return null; node=r.startContainer; off=r.startOffset; }
  else if(document.caretPositionFromPoint){ const p=document.caretPositionFromPoint(x,y); if(!p) return null; node=p.offsetNode; off=p.offset; }
  if(!node||node.nodeType!==3) return null; const t=node.textContent; let a=off,b=off; const isW=ch=>/[A-Za-z'\-]/.test(ch);
  while(a>0&&isW(t[a-1])) a--; while(b<t.length&&isW(t[b])) b++; const word=t.slice(a,b).replace(/^['\-]+|['\-]+$/g,'');
  if(word.length<2) return null; const host=node.parentElement&&node.parentElement.closest('p,span.ev-line,li')||node.parentElement;
  const full=host?host.textContent:t; const sent=(evSplit(full).find(s=>new RegExp('\\b'+word.replace(/[^A-Za-z]/g,'.')+'\\b','i').test(s))||'').trim();
  return {word,sent}; }
const trPrompt=(w,sent)=>'Translate the English word "'+w+'" as it is used in this sentence: "'+sent.slice(0,400)+'". Give its dictionary form (lemma), the best Russian translation for this context (1-3 words), a short simple English definition (max 12 words) and British IPA. Reply with ONLY JSON: {"en":"lemma","ru":"перевод","def":"definition","ipa":"/.../"}';
/* online fallback for words that are not in the course dictionary: MyMemory (free, CORS, ~5000 chars/day per IP), cached on the device */
let _trc=null; const trCache=()=>{ if(_trc) return _trc; try{ _trc=JSON.parse(localStorage.getItem('wordy.tr')||'{}')||{}; }catch(e){ _trc={}; } return _trc; };
function mmGet(q){ if(typeof fetch!=='function') return Promise.resolve(null); let ctl=null; try{ ctl=new AbortController(); }catch(e){} const t=setTimeout(()=>{ try{ ctl&&ctl.abort(); }catch(e){} },8000);
  return fetch('https://api.mymemory.translated.net/get?langpair=en%7Cru&q='+encodeURIComponent(q),ctl?{signal:ctl.signal}:{}).then(r=>r.ok?r.json():null).then(j=>j&&+j.responseStatus===200?j:null).catch(()=>null).finally(()=>clearTimeout(t)); }
const ruOk=x=>{ x=String(x||'').replace(/\s+/g,' ').trim(); return /[А-Яа-яЁё]/.test(x)&&!/MYMEMORY|QUERY LENGTH|INVALID|[<>]/i.test(x)?x:''; };
function trSave(){ try{ const c=trCache(), ks=Object.keys(c); if(ks.length>600) ks.slice(0,ks.length-600).forEach(k=>delete c[k]); localStorage.setItem('wordy.tr',JSON.stringify(c)); }catch(e){} }
/* word → candidate meanings (main + alternatives from translation memory) */
function gtGet(q){ if(typeof fetch!=='function') return Promise.resolve(null); let ctl=null; try{ ctl=new AbortController(); }catch(e){} const t=setTimeout(()=>{ try{ ctl&&ctl.abort(); }catch(e){} },8000);
  return fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&dt=bd&dj=1&q='+encodeURIComponent(q),ctl?{signal:ctl.signal}:{}).then(r=>r.ok?r.json():null).catch(()=>null).finally(()=>clearTimeout(t)); }
const gtText=j=>j&&Array.isArray(j.sentences)?j.sentences.map(x=>x.trans||'').join('').trim():'';
function trWordAlts(w){ const k='w3:'+String(w||'').toLowerCase().slice(0,60), c=trCache(); if(c[k]) return Promise.resolve(c[k]);
  return gtGet(k.slice(3)).then(g=>{ const out=[], seen=new Set(); const add=x=>{ x=ruOk(x); if(!x||x.length>40) return; const l=x.toLowerCase(); if(seen.has(l)) return; seen.add(l); out.push(l); };
      if(g&&Array.isArray(g.dict)){ const all=[]; g.dict.forEach(d=>(d.entry||[]).forEach((e,i)=>all.push({w:e.word,s:(+e.score||0)-i*1e-6}))); all.sort((a,b)=>b.s-a.s).forEach(e=>add(e.w)); }
      if(!out.length) add(gtText(g));
      if(out.length){ const r=out.slice(0,6); c[k]=r; trSave(); return r; }
      return mmAlts(k.slice(3)); }); }
function mmAlts(w){ return mmGet(w).then(j=>{ if(!j) return null; const seen=new Set(), out=[];
    const add=x=>{ x=ruOk(x); if(!x||x.split(' ').length>3||x.length>40) return; const l=x.toLowerCase().replace(/[.!?,;:]+$/,''); if(seen.has(l)) return; seen.add(l); out.push(l); };
    add(j.responseData&&j.responseData.translatedText); (j.matches||[]).slice().sort((a,b)=>(+b.quality||0)-(+a.quality||0)).forEach(m=>add(m.translation));
    if(!out.length) return null; const r=out.slice(0,6); const c=trCache(); c['w3:'+w]=r; trSave(); return r; }); }
function trSentence(sent){ const q=String(sent||'').replace(/\s+/g,' ').trim().slice(0,420); if(q.split(' ').length<3) return Promise.resolve('');
  const k='s:'+q, c=trCache(); if(c[k]) return Promise.resolve(c[k]);
  return gtGet(q).then(g=>{ const r0=ruOk(gtText(g)); if(r0) return r0; return mmGet(q).then(j=>j?ruOk(j.responseData&&j.responseData.translatedText):''); }).then(r=>{ r=(r||'').slice(0,600); if(r){ c[k]=r; trSave(); } return r; }); }
/* pick the meaning that actually appears in the sentence's translation (e.g. hood → капюшон, not капот) */
const ruStem=x=>{ const w=x.toLowerCase().split(' ').filter(t=>t.length>2).sort((a,b)=>b.length-a.length)[0]||x.toLowerCase(); return w.length<=4?w:w.slice(0,Math.max(4,w.length-3)); };
function trOnline(w,sent){ return Promise.all([trWordAlts(w),trSentence(sent)]).then(([alts,sr])=>{
    alts=alts||[]; if(!alts.length&&!sr) return null; let pick=-1; const low=(sr||'').toLowerCase();
    if(low) pick=alts.findIndex(a=>low.includes(ruStem(a)));
    const ru=pick>=0?alts[pick]:alts[0]||''; return {ru, alts:alts.filter(a=>a!==ru).slice(0,3), sent:sr, ctx:pick>=0}; }); }
/* tap any word in a text → translation popup. exam:true asks first (real exams have no translator) and reports each looked-up word via onUse */
function useWordTap({st,update,on,src,exam,onUse,pre,names}){ const [pop,setPop]=useState(null), [busy,setBusy]=useState(false), [mine,setMine]=useState(''), [allow,setAllow]=useState(!!pre); const ai=useSample(); const box=useRef(null);
  useEffect(()=>{ if(!pop) return; const close=e=>{ if(box.current&&!box.current.contains(e.target)) setPop(null); }; const t=setTimeout(()=>document.addEventListener('pointerdown',close),0);
    const esc=e=>{ if(e.key==='Escape') setPop(null); }; document.addEventListener('keydown',esc); return ()=>{ clearTimeout(t); document.removeEventListener('pointerdown',close); document.removeEventListener('keydown',esc); }; },[pop&&pop.key]);
  /* look a word up: course dictionary → AI (inside Claude) → MyMemory. Resolves {en,ru,def,ipa,from} */
  const nameOf=hit=>{ if(!names) return null; const w=hit.word, sl=(hit.sent||'').toLowerCase(); for(const en in names){ const el=en.toLowerCase(); if(en.split(/[\s-]+/).some(t=>t===w||(t.toLowerCase()===w.toLowerCase()&&t===t.toLowerCase()))&&sl.includes(el)) return {en,ru:names[en]}; } return null; };
  const fetchInfo=hit=>{ const nm=nameOf(hit); if(nm) return Promise.resolve({en:nm.en,ru:nm.ru,def:'Имя или название в этом тексте',ipa:'',from:'name'}); const d=dictFind(hit.word); if(d) return Promise.resolve({en:d.en,ru:d.ru,def:d.def,ipa:d.ipa,from:'dict'});
    const base={en:hit.word.toLowerCase(),ru:'',def:'',ipa:'',from:null}, online=()=>trOnline(hit.word,hit.sent).then(r=>r&&(r.ru||r.sent)?{...base,ru:r.ru,alts:r.alts,sentRu:r.sent,ctx:r.ctx,from:'net'}:base);
    if(ai) return ai.json(trPrompt(hit.word,hit.sent),null,{fast:true}).then(j=>j&&j.ru?{en:String(j.en||hit.word).toLowerCase().slice(0,40),ru:String(j.ru||'').slice(0,60),def:String(j.def||'').slice(0,120),ipa:String(j.ipa||'').slice(0,40),from:'ai'}:online()).catch(online);
    return online(); };
  const put=(word,o)=>setPop(p=>p&&p.word===word?{...p,...o}:p);
  const reveal=()=>{ if(!pop) return; if(exam&&!allow){ SFX('tap'); put(pop.word,{ask:true}); return; } doReveal(pop); };
  const doReveal=p=>{ SFX('pop'); put(p.word,{ask:false,shown:true}); if(exam&&onUse) onUse(p.en);
    if(p.got){ put(p.word,{...p.got}); return; } setBusy(true); fetchInfo(p.hit).then(info=>put(p.word,{...info,got:info})).finally(()=>setBusy(false)); };
  const click=e=>{ if(!on) return; if(e.target.closest('button,input,select,textarea,a,summary,.wt-pop')) return; const sel=window.getSelection&&String(window.getSelection()); if(sel&&sel.trim().length>1) return;
    const hit=wordAtPoint(e.clientX,e.clientY); if(!hit) return;
    const vw=window.innerWidth, x=Math.max(12,Math.min(vw-292,e.clientX-140)), below=e.clientY<window.innerHeight*0.6; SFX('tap'); setMine('');
    const d=dictFind(hit.word);
    setPop({key:Date.now(),x,y:below?e.clientY+18:e.clientY-12,below,hit,word:hit.word,sent:hit.sent,en:d?d.en:hit.word.toLowerCase(),ipa:d?d.ipa:'',ru:'',def:'',shown:false,ask:false}); };
  const reset=()=>{ setPop(null); setAllow(!!pre); };
  const id=pop&&myId(pop.en), have=pop&&(st.myWords||{})[id];
  const save=(info,ru)=>{ const w={id:myId(info.en),en:info.en,ru:ru||'—',def:info.def||'',ipa:info.ipa||'',ex:pop.sent||'',src:src||'',track:'my',added:dayKey()};
    update(s=>({myWords:{...(s.myWords||{}),[w.id]:w}})); SFX('correct'); W('react','happy'); W('say','«'+w.en+'» — в твоих словах!',0,true); setPop(null); };
  const add=()=>{ if(pop.shown||pop.got) return save(pop.got||pop,(pop.ru||mine).trim()); const p=pop; setBusy(true); fetchInfo(p.hit).then(info=>save(info,info.ru)).finally(()=>setBusy(false)); };
  const portal=x=>x&&ReactDOM.createPortal?ReactDOM.createPortal(x,document.body):x;
  return [click, portal(pop?html`<div ref=${box} className=${'wt-pop enter'+(pop.below?'':' up')} style=${{left:pop.x+'px',top:pop.y+'px'}} role="dialog" aria-label=${'Слово '+pop.en}>
      <div className="wt-h"><b>${pop.shown?pop.en:pop.word}</b>${pop.ipa?html`<span className="muted">${pop.ipa}</span>`:null}<button className="wt-say" aria-label="Произнести" onClick=${()=>speakText(pop.shown?pop.en:pop.word,.85)}>${I.speaker()}</button></div>
      ${pop.ask?html`<div className="wt-askbox" role="alertdialog" aria-labelledby="wt-ask-t"><b id="wt-ask-t">Воспользоваться переводчиком?</b>
          <p className="wt-def">На настоящем экзамене переводчика нет. Перевести можно, но в результате появится отметка «с переводчиком».</p>
          <div className="wt-ask"><button className="btn small ghost" id="wt-no" onClick=${()=>{ SFX('tap'); put(pop.word,{ask:false}); W('say','Попробуй понять по контексту!',0,true); }}>Справлюсь сам</button>
            <button className="btn small" id="wt-yes" onClick=${()=>{ setAllow(true); doReveal(pop); }}>Перевести</button></div></div>`
       :pop.shown?html`${pop.ru?html`<p className="wt-ru">${pop.ru}</p>`:busy?html`<p className="muted">Перевожу…</p>`:html`<p className="wt-def">Не нашёл перевод${navigator.onLine===false?' — нет интернета':''}. Можно вписать свой:</p><input className="set-in" placeholder="Свой перевод" value=${mine} onChange=${e=>setMine(e.target.value)} aria-label="Перевод"/>`}
          ${pop.def?html`<p className="wt-def">${pop.def}</p>`:null}
          ${pop.alts&&pop.alts.length?html`<p className="wt-alts">Другие значения: ${pop.alts.join(' · ')}</p>`:null}
          ${pop.sentRu?html`<p className="wt-sent"><b>В этом предложении:</b> ${pop.sentRu}</p>`:null}
          ${pop.from==='net'?html`<p className="wt-src">${pop.ctx?'Значение подобрано по контексту · ':''}Машинный перевод</p>`:null}
          ${exam?html`<p className="wt-src">Отмечено в результате</p>`:null}`:null}
      ${pop.ask?null:html`<div className="wt-btns">${pop.shown?null:html`<button className="btn small ghost" id="wt-tr" onClick=${reveal}>Перевод</button>`}
        ${have?html`<span className="ok-chip">✓ В «Моих словах»</span>`:html`<button className="btn small" id="wt-add" disabled=${busy} onClick=${add}>+ В мои слова</button>`}</div>`}
    </div>`:null), reset]; }
function MyWords({st,update,startMy}){ const list=Object.values(st.myWords||{}).sort((a,b)=>(b.added||'').localeCompare(a.added||''));
  if(!list.length) return html`<div className="sec-h"><h2>Мои слова</h2></div><p className="empty">После проверки Reading или Listening нажми на незнакомое слово в тексте — оно появится здесь, и Ворди будет его повторять с тобой.</p>`;
  const due=list.filter(w=>((st.due||{})[w.id]||dayKey())<=dayKey()).length;
  return html`<div className="sec-h"><h2>Мои слова</h2><span className="muted">${list.length} · к повторению ${due}</span></div>
    <div className="my-words">${list.slice(0,60).map(w=>html`<div key=${w.id} className="my-w"><div><b>${w.en}</b> <span className="muted">${w.ru}</span>${w.ex?html`<small>${w.ex}</small>`:null}</div>
      <span className=${'my-box b'+(st.boxes[w.id]||0)} title="Уровень запоминания">${'●'.repeat(Math.min(3,st.boxes[w.id]||0))||'○'}</span>
      <button className="btn small ghost" aria-label=${'Удалить '+w.en} onClick=${()=>{ SFX('tap'); update(s=>{ const m={...(s.myWords||{})}; delete m[w.id]; return {myWords:m}; }); }}>✕</button></div>`)}</div>
    <button className="btn wide" id="my-learn" disabled=${list.length<4} onClick=${startMy}>${list.length<4?'Добавь хотя бы 4 слова, чтобы учить':'Учить мои слова'}</button>`; }
/* ---------- 5-minute drills: 8 questions of ONE type, each shown with just the paragraph / audio fragment it needs ---------- */
const DRILL_TYPES=['tfng','ynng','heads','gapR','boxR','mcqR','gapL','mcqL','matchL'];
let _drillPool=null;
function drillPool(){ if(_drillPool) return _drillPool; const pool={}; DRILL_TYPES.forEach(k=>pool[k]=[]);
  IELTS_MOCKS.forEach(m=>{ const R=flatReading(m), RE=readingEvidence(m);
    R.forEach((it,i)=>{ const k=rdType(it.g); if(!pool[k]||!RE[i]) return; pool[k].push({src:'R',m,it,ev:RE[i],key:m.id+'-r'+i}); });
    const L=m.listening.flatMap(lqs), LE=listeningEvidence(m); let base=0;
    m.listening.forEach((p,pk)=>{ lqs(p).forEach((q,j)=>{ const n=base+j, k=lsType(q); if(pool[k]&&LE[n]) pool[k].push({src:'L',m,p,pk,q,ev:LE[n],key:m.id+'-l'+n}); }); base+=lqs(p).length; }); });
  return (_drillPool=pool); }
function pickDrill(k,st,n){ const all=drillPool()[k]||[], seen=(st.drillSeen||{}); const fresh=shuffle(all.filter(x=>!seen[x.key])), old=shuffle(all.filter(x=>seen[x.key]));
  return fresh.concat(old).slice(0,n||8); }
function DrillItem({x,val,set,res}){ const {m}=x; const [full,setFull]=useState(false);
  if(x.src==='R'){ const {g,q}=x.it, P=m.reading[x.it.pi], para=P.paras[x.ev.para]||'';
    const ok=res&&rdOk(x.it,val);
    const body=g.heads?html`<p className="mk-ins">Выбери заголовок для абзаца:</p>`:null;
    return html`<div className="dr-item">
      <p className="dr-src">${P.title} · абзац ${String.fromCharCode(65+x.ev.para)}</p>
      <p className="dr-para">${res&&!g.heads?evSplit(para).map((s,j)=>j>=x.ev.sent&&j<x.ev.sent+(x.ev.span||1)?html`<mark key=${j} className="ev-mark">${s} </mark>`:s+' '):para}</p>
      ${!g.heads?html`<button className="link-btn dr-full" onClick=${()=>{ SFX('tap'); setFull(!full); }}>${full?'Скрыть остальной текст':'Ответа нет в этом абзаце? Показать весь текст'}</button>
        ${full?html`<div className="dr-all">${P.paras.map((pp,j)=>j===x.ev.para?null:html`<p key=${j}><b className="mk-pl">${String.fromCharCode(65+j)}</b>${pp}</p>`)}</div>`:null}`:null}
      ${body}
      <div className=${'mk-q'+(res?(ok?' good':' bad'):'')}><div className="mk-qt"><span>${g.heads?'Paragraph '+String.fromCharCode(65+x.ev.para):g.gap?q[0].split('___')[0]:q[0]}${g.gap?html`<${GapIn} id="dr-gap" val=${val} set=${set} res=${!!res} ok=${ok} answer=${q[1][0]}/>${q[0].split('___')[1]||''}`:null}</span></div>
        ${g.gap?null:html`<${OptRow} opts=${g.heads?g.opts:g.box?g.box:g.opts?g.opts:q[1]} val=${val} set=${set} dis=${!!res} res=${!!res} correct=${g.opts||g.box||g.heads?q[1]:q[2]} id="dr-o" compact=${g.opts===TFNG||g.opts===YNNG}/>`}</div>
      ${res&&x.ev.ng?html`<p className="muted">NOT GIVEN: в тексте нет этой информации. Подсвечено самое близкое по теме место.</p>`:null}
    </div>`; }
  const {q,p}=x, ok=res&&lsOk(q,val);
  return html`<div className="dr-item"><p className="dr-src">${m.title.replace('IELTS Academic · ','')} · ${p.title}</p>
    <${DrillAudio} x=${x}/>
    <div className=${'mk-q'+(res?(ok?' good':' bad'):'')}><div className="mk-qt"><span>${Array.isArray(q)?q[0]+' ':q.q}${Array.isArray(q)?html`<${GapIn} id="dr-gap" val=${val} set=${set} res=${!!res} ok=${ok} answer=${q[2][0]}/> ${q[1]}`:null}</span></div>
      ${Array.isArray(q)?null:html`<${OptRow} opts=${q.o||p.box} val=${val} set=${set} dis=${!!res} res=${!!res} correct=${q.a} id="dr-o"/>`}</div>
    ${res?html`<blockquote className="dr-quote">${String(x.ev.text).split('\n').map((s,i)=>html`<span key=${i} className="ev-line">${s}</span>`)}</blockquote>`:null}
  </div>`; }
function DrillAudio({x}){ const A=audOf(x.m,x.pk), a=useRef(null), [on,setOn]=useState(false), [n,setN]=useState(0);
  useEffect(()=>()=>{ try{ a.current&&a.current.pause(); }catch(e){} stopSpeak(); },[]);
  const lines=x.p.script.filter(l=>l[0]!=='--'), from=Math.max(0,x.ev.line-1), to=Math.min(lines.length,x.ev.line+(x.ev.span||1)+1);
  const play=()=>{ SFX('tap'); setN(k=>k+1);
    if(A&&A.starts){ try{ a.current&&a.current.pause(); }catch(e){} const au=new Audio(x.p.audio); a.current=au; const s0=A.starts[from], e0=A.starts[to]||(s0+40);
      au.addEventListener('loadedmetadata',()=>{ try{ au.currentTime=Math.max(0,s0-0.2); }catch(e){} au.play().then(()=>setOn(true)).catch(()=>setOn(false)); },{once:true});
      au.ontimeupdate=()=>{ if(au.currentTime>=e0+0.2){ au.pause(); setOn(false); } }; au.onended=()=>setOn(false); au.onerror=()=>{ setOn(false); speakText(lines.slice(from,to).map(l=>l[1]).join(' '),.92,()=>setOn(false)); }; au.load(); return; }
    setOn(true); speakText(lines.slice(from,to).map(l=>l[1]).join(' '),.92,()=>setOn(false)); };
  return html`<div className="dr-audio"><button className=${'btn'+(on?' ghost':'')} id="dr-play" onClick=${play} disabled=${on}>${I.speaker()} ${on?'Звучит…':n?'Прослушать ещё раз':'Прослушать фрагмент'}</button><small className="muted">${n>1?'На экзамене запись звучит один раз':'Сначала прочитай вопрос, потом слушай'}</small></div>`; }
function Drill({st,update,onExit,type}){ const [tapD,popD]=useWordTap({st,update,on:true,src:'Тренировка IELTS'}); const [k,setK]=useState(type||null), [items,setItems]=useState(()=>type?pickDrill(type,st):[]), [i,setI]=useState(0), [val,setVal]=useState(null), [res,setRes]=useState(false), [score,setScore]=useState(0), [done,setDone]=useState(false);
  const start=t=>{ SFX('pop'); setK(t); setItems(pickDrill(t,st)); setI(0); setVal(null); setRes(false); setScore(0); setDone(false); window.scrollTo({top:0}); W('react','happy'); W('say','5 минут — и ты сильнее в «'+QT_NAMES[t]+'»!',0,true); };
  const qt=st.qtypes||{};
  if(!k) return html`<section className="mk-sec"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Быстрая тренировка</b><span className="muted">8 вопросов одного типа · ≈ 5 минут</span></div></div>
    <p className="hint-line">Выбери тип вопросов. Каждый вопрос — с нужным абзацем или кусочком записи, сразу видно, где был ответ.</p>
    <div className="dr-types">${DRILL_TYPES.map(t=>{ const v=qt[t], pc=v&&v[1]?Math.round(v[0]/v[1]*100):null, n=(drillPool()[t]||[]).length;
      return html`<button key=${t} className=${'dr-type'+(pc!=null&&pc<60?' weak':'')} id=${'dr-'+t} onClick=${()=>start(t)}><b>${QT_NAMES[t]}</b><small>${t.endsWith('L')?'Listening':'Reading'} · ${n} вопросов в банке</small><span>${pc!=null?pc+'%':'—'}</span></button>`; })}</div></section>`;
  const x=items[i];
  const check=()=>{ const ok=x.src==='R'?rdOk(x.it,val):lsOk(x.q,val); setRes(true); if(ok){ setScore(s=>s+1); SFX('correct'); W('react','nod'); } else { SFX('wrong'); W('react','encourage'); }
    update(s=>{ const q={...(s.qtypes||{})}, v=q[k]||[0,0]; q[k]=[v[0]+(ok?1:0),v[1]+1]; return {qtypes:q,drillSeen:{...(s.drillSeen||{}),[x.key]:1},xp:s.xp+(ok?3:1)}; }); };
  const next=()=>{ if(i+1>=items.length){ setDone(true); const c=score; update(s=>({coins:s.coins+c*2,drills:(s.drills||0)+1})); if(c>=6){ SFX('fanfare'); FX('rain',90); W('react','cheer'); W('say',c+' из '+items.length+'! Отлично!',0,true); } else W('say',c+' из '+items.length+'. Ещё круг — и будет лучше!',0,true); window.scrollTo({top:0}); return; }
    SFX('tap'); setI(i+1); setVal(null); setRes(false); window.scrollTo({top:0}); };
  if(done) return html`<section className="mk-sec"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>${QT_NAMES[k]}</b><span className="muted">тренировка завершена</span></div></div>
    <div className="mk-res enter" data-perch="card"><span className="phase">Результат</span><span className="mk-big">${score}/${items.length}</span><p>+${score*2} монет · общая точность по типу: ${qt[k]&&qt[k][1]?Math.round(qt[k][0]/qt[k][1]*100)+'%':'—'}</p></div>
    <div className="actions"><button className="btn ghost" onClick=${()=>{ setK(null); setDone(false); }}>Другой тип</button><button className="btn" id="dr-again" onClick=${()=>start(k)}>Ещё 8 вопросов</button></div></section>`;
  return html`<section className="mk-sec"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="steps" aria-hidden="true">${items.map((_,j)=>html`<i key=${j} className=${j<i?'good':j===i?'on':''}></i>`)}</div><span className="phase">${i+1}/${items.length}</span></div>
    <p className="dr-kind">${QT_NAMES[k]}</p>
    <article className="mk-paper wt-on enter" key=${x.key} data-perch="card" onClick=${tapD}><${DrillItem} x=${x} val=${val} set=${v=>{ if(!res) setVal(v); }} res=${res}/></article>${popD}
    <div className="mk-foot">${res?html`<button className="btn wide" id="dr-next" onClick=${next}>${i+1>=items.length?'Итоги':'Дальше'}</button>`:html`<button className="btn wide" id="dr-check" disabled=${val==null||val===''} onClick=${check}>Проверить</button>`}</div>
  </section>`; }
/* ---------- question-type analytics ---------- */
const rdType=g=>g.heads?'heads':g.pm?'pm':g.gap?'gapR':g.box?'boxR':g.opts===TFNG?'tfng':g.opts===YNNG?'ynng':'mcqR';
const lsType=q=>Array.isArray(q)?'gapL':q.o?'mcqL':'matchL';
const tally=list=>{ const o={}; list.forEach(([k,ok])=>{ const v=o[k]||(o[k]=[0,0]); v[1]++; if(ok) v[0]++; }); return o; };
const addQt=(update,o)=>update(s=>{ const q={...(s.qtypes||{})}; Object.entries(o).forEach(([k,[a,b]])=>{ const v=q[k]||[0,0]; q[k]=[v[0]+a,v[1]+b]; }); return {qtypes:q}; });
function QtBreak({o}){ const rows=Object.entries(o).sort((a,b)=>a[1][0]/a[1][1]-b[1][0]/b[1][1]);
  return html`<div className="qt-break"><b>По типам вопросов</b>${rows.map(([k,[a,b]])=>{ const pc=Math.round(a/b*100); return html`<div key=${k} className=${'qt-row'+(pc<60?' weak':'')}><span>${QT_NAMES[k]||k}</span><span className="bar"><i style=${{width:pc+'%'}}></i></span><em>${a}/${b}</em></div>`; })}</div>`; }
/* where to practise a weak type: the reading passage / listening part with most questions of that kind */
function drillFor(k,st){ let best=null; IELTS_MOCKS.forEach(m=>{
  if(k.endsWith('L')){ const n=m.listening.flatMap(lqs).filter(q=>lsType(q)===k).length; const done=((st.mocks||{})[m.id]||{}).L; if(n&&(!best||(!done&&best.done)||(!!done===!!best.done&&n>best.n))) best={m,part:'L',n,done:!!done}; }
  else { const n=flatReading(m).filter(it=>rdType(it.g)===k).length; const done=((st.mocks||{})[m.id]||{}).R; if(n&&(!best||(!done&&best.done)||(!!done===!!best.done&&n>best.n))) best={m,part:'R',n,done:!!done}; } }); return best; }
/* ---------- IELTS Reading — split view, question navigator ---------- */
function IeltsReading({m,st,update,onExit,onNext,nextName}){
  const items=useMemo(()=>flatReading(m),[m]);
  const [pi,setPi]=useState(0), [ans,setAns,clrA,dAt]=useDraftState('ielts:R:'+m.id,{},v=>!Object.keys(v).length), [res,setRes]=useState(null), [confirm,setConfirm]=useState(false), [pane,setPane]=useState('text'), [flags,setFlags]=useState({});
  const [hl,setHl]=useState(null); const ai=useSample(); const trW=useRef(new Set()), [trN,setTrN]=useState(0); const [tapR,popR,trReset]=useWordTap({st:st||{},update,on:true,exam:!res,onUse:w=>{ trW.current.add(w); setTrN(trW.current.size); },src:m.title+' · Reading'}); const evs=useMemo(()=>res?readingEvidence(m):null,[res,m]);
  useExamWide(true);
  const showEv=e=>{ SFX('tap'); setHl(e); setPi(e.pi); setPane('text'); setTimeout(()=>{ const el=document.getElementById('rp-'+e.para); if(el) el.scrollIntoView({block:'center',behavior:'smooth'}); },80); };
  const ansText=(it,v)=>{ const {g,q}=it; if(v==null||v==='') return null; if(g.gap) return v; if(g.heads) return g.opts[v]; if(g.pm) return pmOpts(m.reading[it.pi])[v]; if(g.box) return g.box[v]; if(g.opts) return g.opts[v]; return q[1][v]; };
  const corrText=it=>{ const {g,q}=it; if(g.gap) return q[1][0]; if(g.heads) return g.opts[q[1]]; if(g.pm) return pmOpts(m.reading[it.pi])[q[1]]; if(g.box) return g.box[q[1]]; if(g.opts) return g.opts[q[1]]; return q[1][q[2]]; };
  const finish=()=>{ const raw=items.filter(it=>rdOk(it,ans[it.n])).length, band=band40(Math.round(raw/items.length*40));
    const qt=tally(items.map(it=>[rdType(it.g),rdOk(it,ans[it.n])])); addQt(update,qt);
    const tr=trW.current.size; clrA(); setRes({raw,band,qt,tr}); setConfirm(false); saveMock(update,m.id,'R',{raw,raw40:raw,band,...(tr?{tr}:{})},20); window.scrollTo({top:0});
    if(band>=7){ SFX('fanfare'); FX('rain',120); W('react','cheer'); W('say','Reading '+fmtB(band)+'! Сильно!',0,true); } else { SFX('pop'); W('react','encourage'); W('say','Reading '+fmtB(band)+'. Смотри разбор ошибок.',0,true); } };
  const left=useCountdown(60*60,()=>{ if(!res){ W('say','Время вышло!',0,true); finish(); } },!res);
  const P=m.reading[pi], answered=items.filter(it=>ans[it.n]!=null&&ans[it.n]!=='').length;
  const pItems=items.filter(it=>it.pi===pi), r0=pItems[0].n+1, r1=pItems[pItems.length-1].n+1;
  const set=n=>v=>{ if(!res) setAns(a=>({...a,[n]:v})); };
  const goQ=i=>{ const it=items[i]; setPi(it.pi); setPane('q'); scrollToQ('rq-'+i+(it.g.gap||it.g.heads||it.g.box||it.g.pm?'':'-0')); };
  return html`<section className="mk-sec mk-exam-sec">
    <div className="sess-top mk-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Reading</b><span className="muted">${answered}/${items.length} отвечено</span></div>${res?null:html`<${Timer} left=${left}/>`}</div>
    ${!res&&dAt?html`<${DraftNote} at=${dAt} onReset=${()=>{ clrA(); setAns({}); }}/>`:null}
    ${res?html`<div className="mk-res enter" data-perch="card"><span className="phase">Reading · результат</span><span className="mk-big">${fmtB(res.band)}</span><p>${res.raw} из ${items.length} верно</p>${res.tr?html`<span className="tr-chip" id="rd-trchip">С переводчиком · ${res.tr} ${plural(res.tr,'слово','слова','слов')}</span>`:null}${res.qt?html`<${QtBreak} o=${res.qt}/>`:null}</div>`:null}${popR}<${TextAsk} on=${!!res} scope=".mk-passage" level=${(st||{}).level}/>
    <div className="mk-tabs" role="tablist">${m.reading.map((p,k)=>html`<button key=${k} role="tab" aria-selected=${k===pi} onClick=${()=>{ SFX('tap'); setPi(k); window.scrollTo({top:0}); }}>Passage ${k+1}</button>`)}</div>
    <div className="mk-pane-sw" role="tablist"><button role="tab" aria-selected=${pane==='text'} onClick=${()=>setPane('text')}>Текст</button><button role="tab" aria-selected=${pane==='q'} id="rd-pane-q" onClick=${()=>setPane('q')}>Вопросы ${r0}–${r1}</button></div>
    <div className=${'mk-split pane-'+pane}>
    <article className="mk-paper mk-passage wt-on" key=${'p'+pi} onClick=${tapR}><span className="phase">Reading Passage ${pi+1}</span>${!res?html`<p className="wt-hint muted" id="rd-trhint">${trN?'Переводчик включён · '+trN+' '+plural(trN,'слово','слова','слов')+' — это будет видно в результате':'Незнакомое слово? Нажми на него — предложу переводчик'}</p>`:null}${res?html`<p className="wt-hint">Нажми на незнакомое слово — добавишь его в «Мои слова»</p>`:null}<h3>${P.title}</h3>
      <p className="mk-ins">You should spend about 20 minutes on Questions ${r0}–${r1}, which are based on Reading Passage ${pi+1}.</p>
      ${P.paras.map((t,k)=>html`<p key=${k} id=${'rp-'+k} className=${hl&&hl.pi===pi&&hl.para===k?'ev-para':''}><b className="mk-pl">${String.fromCharCode(65+k)}</b>${hl&&hl.pi===pi&&hl.para===k&&!hl.whole?evSplit(t).map((s,j)=>j>=hl.sent&&j<hl.sent+(hl.span||1)?html`<mark key=${j} className="ev-mark">${s} </mark>`:s+' '):t}</p>`)}</article>
    <div className="mk-qcol">
    ${P.groups.map((g,gi)=>html`<div key=${pi+'-'+gi} className="mk-group"><p className="mk-ins">${g.ins}</p>
      ${g.box?html`<div className="mk-box">${g.box.map((w,k)=>html`<span key=${k}><b>${String.fromCharCode(65+k)}</b> ${w}</span>`)}</div>`:null}
      ${g.heads?html`<ul className="mk-heads">${g.opts.map((h,k)=>html`<li key=${k}>${h}</li>`)}</ul>`:null}
      ${items.filter(it=>it.pi===pi&&it.gi===gi).map(it=>{ const {q,n}=it, v=ans[n], ok=res&&rdOk(it,v);
        return html`<div key=${n} className=${'mk-q'+(res?(ok?' good':' bad'):'')+(flags[n]?' flagged':'')}><div className="mk-qt"><span className="mk-qn">${n+1}</span><span>${g.gap?q[0].split('___')[0]:q[0]}${g.gap?html`<${GapIn} id=${'rq-'+n} val=${v} set=${set(n)} res=${!!res} ok=${ok} answer=${q[1][0]}/>${q[0].split('___')[1]||''}`:null}</span>
            ${res?null:html`<button className=${'mk-flag mini'+(flags[n]?' on':'')} onClick=${()=>setFlags(f=>({...f,[n]:!f[n]}))} aria-pressed=${!!flags[n]} aria-label="Отметить для проверки">${MI.flag()}</button>`}</div>
          ${g.opts&&!g.heads?html`<${OptRow} opts=${g.opts} val=${v} set=${set(n)} dis=${!!res} res=${!!res} correct=${q[1]} id=${'rq-'+n} compact=${g.opts===TFNG||g.opts===YNNG}/>`:null}
          ${g.heads||g.box||g.pm?html`<select id=${'rq-'+n} className=${'mk-sel'+(res?(ok?' good':' bad'):'')} value=${v==null?'':v} disabled=${!!res} onChange=${e=>set(n)(e.target.value===''?null:+e.target.value)} aria-label=${'Вопрос '+(n+1)}>
              <option value="">— выбери —</option>${(g.heads?g.opts:g.pm?pmOpts(P):g.box).map((o,k)=>html`<option key=${k} value=${k}>${g.box?String.fromCharCode(65+k)+'  '+o:o}</option>`)}</select>
            ${res&&!ok?html`<em className="mk-right">${g.heads?g.opts[q[1]]:g.pm?pmOpts(P)[q[1]]:String.fromCharCode(65+q[1])+' '+g.box[q[1]]}</em>`:null}`:null}
          ${!g.opts&&!g.box&&!g.gap&&!g.pm?html`<${OptRow} opts=${q[1]} val=${v} set=${set(n)} dis=${!!res} res=${!!res} correct=${q[2]} id=${'rq-'+n}/>`:null}
          ${res&&evs?html`<${EvidenceBox} ev=${evs[n]} label=${'Абзац '+String.fromCharCode(65+(evs[n]?evs[n].para:0))+':'} onShow=${()=>showEv(evs[n])}
            ask=${ai?()=>ai.json(whyPrompt(P.paras[evs[n].para],g.gap?q[0]:q[0],g.heads?g.opts.join(' / '):g.box?g.box.join(' / '):g.opts?g.opts.join(' / '):g.gap?null:q[1].join(' / '),corrText(it),ansText(it,v)),null,{fast:true}):null}/>`:null}
        </div>`; })}</div>`)}
    </div></div>
    <${QNav} total=${items.length} ans=${ans} flags=${flags} cur=${i=>items[i].pi===pi} go=${goQ} ok=${res?(i=>rdOk(items[i],ans[i])):null}/>
    ${!res?html`<div className="mk-foot">${pi<m.reading.length-1?html`<button className="btn wide" id="rd-next" onClick=${()=>{ SFX('tap'); setPi(pi+1); setPane('text'); window.scrollTo({top:0}); }}>Passage ${pi+2}</button>`:null}
      ${confirm?html`<div className="mk-confirm" role="alertdialog"><span>Отвечено ${answered} из ${items.length}. Завершить?</span><button className="btn small ghost" onClick=${()=>setConfirm(false)}>Нет</button><button className="btn small" id="rd-yes" onClick=${finish}>Да</button></div>`
        :html`<button className=${'btn wide'+(pi<m.reading.length-1?' ghost':'')} id="rd-finish" onClick=${()=>{ SFX('tap'); answered<items.length?setConfirm(true):finish(); }}>Завершить и проверить</button>`}</div>`
      :html`${onNext?html`<div className="actions one"><button className="btn" id="mk-next" onClick=${onNext}>Далее: ${nextName}</button></div>`:null}<div className="actions" hidden=${!!onNext}><button className="btn ghost" onClick=${onExit}>К тестам</button><button className="btn" onClick=${()=>{ setAns({}); setRes(null); setPi(0); setFlags({}); trW.current=new Set(); setTrN(0); trReset(); window.scrollTo({top:0}); }}>Ещё раз</button></div>`}
  </section>`;
}


/* ---------- IELTS Writing ---------- */
const CH_COLS=['var(--accent)','#12A195','#7C5CFF','#E5487A','#C9920A'];
function chartText(c){ const u=c.unit||'';
  if(c.type==='table') return 'table "'+(c.title||'')+'" with columns '+c.cols.join(' | ')+'; rows: '+c.rows.map(r=>r.join(' | ')).join('; ')+(u?' (unit: '+u+')':'')+'.';
  if(c.type==='pie') return c.pies.map(p=>p.title+': '+c.labels.map((l,i)=>l+' '+p.vals[i]+'%').join(', ')).join('; ')+'.';
  if(c.type==='bar') return 'bar chart; categories '+c.cats.map(x=>x.replace(/\n/g,' ')).join(', ')+'; '+c.series.map(s=>s[0]+': '+s[1].map(v=>v+(u==='%'?'%':' '+u)).join(', ')).join('; ')+'.';
  return 'line graph; years '+c.years.join(', ')+'; '+c.series.map(s=>s[0]+': '+s[1].map(v=>v+(!u||u==='%'?'%':' '+u)).join(', ')).join('; ')+'.'; }
const ChartView=({c})=>c.type==='bar'?html`<${BarChart} c=${c}/>`:c.type==='table'?html`<${TableChart} c=${c}/>`:c.type==='pie'?html`<${PieCharts} c=${c}/>`:html`<${LineChart} c=${c}/>`;
const Legend=({names})=>html`<div className="mk-legend">${names.map((n,k)=>html`<span key=${n}><i style=${{background:CH_COLS[k]}}></i>${n}</span>`)}</div>`;
function BarChart({c}){
  const W_=360,H_=230,L=40,R=8,T=12,B=40, ns=c.series.length, max=c.max||Math.ceil(Math.max(...c.series.flatMap(s=>s[1]))/10)*10, step=c.step||max/5;
  const gw=(W_-L-R)/c.cats.length, bw=Math.min(22,(gw-10)/ns), y=v=>T+(max-v)*(H_-T-B)/max, ticks=[]; for(let v=0;v<=max+1e-9;v+=step) ticks.push(Math.round(v*10)/10);
  return html`<div className="mk-chartw"><${Legend} names=${c.series.map(s=>s[0])}/>
   <svg className="mk-chart" viewBox=${'0 0 '+W_+' '+H_} role="img" aria-label=${'Диаграмма: '+chartText(c)}>
    ${ticks.map(v=>html`<g key=${v}><line x1=${L} x2=${W_-R} y1=${y(v)} y2=${y(v)} className="mk-grid"/><text x=${L-6} y=${y(v)+4} textAnchor="end" className="mk-ax">${v}${c.unit==='%'?'%':''}</text></g>`)}
    ${c.cats.map((cat,i)=>{ const x0=L+i*gw+(gw-bw*ns)/2; return html`<g key=${cat}>${c.series.map(([n,vals],k)=>html`<rect key=${n} x=${x0+k*bw} y=${y(vals[i])} width=${bw-2} height=${Math.max(0,H_-B-y(vals[i]))} rx="3" fill=${CH_COLS[k]}/>`)}
      ${cat.split('\n').map((t,j)=>html`<text key=${j} x=${L+i*gw+gw/2} y=${H_-B+15+j*12} textAnchor="middle" className="mk-ax">${t}</text>`)}</g>`; })}
   </svg>${c.unit&&c.unit!=='%'?html`<p className="mk-unit">${c.unit}</p>`:null}</div>`; }
function TableChart({c}){ return html`<div className="mk-tablew">${c.title?html`<b className="mk-tt">${c.title}</b>`:null}<table className="mk-table"><thead><tr>${c.cols.map((h,k)=>html`<th key=${k}>${h}</th>`)}</tr></thead>
  <tbody>${c.rows.map((r,i)=>html`<tr key=${i}>${r.map((v,k)=>k?html`<td key=${k}>${v}</td>`:html`<th key=${k} scope="row">${v}</th>`)}</tr>`)}</tbody></table>${c.unit?html`<p className="mk-unit">${c.unit}</p>`:null}</div>`; }
function PieCharts({c}){ const r=58, cx=70, cy=70, arc=(a0,a1)=>{ const p=a=>[cx+r*Math.sin(a),cy-r*Math.cos(a)], [x0,y0]=p(a0), [x1,y1]=p(a1); return 'M'+cx+','+cy+' L'+x0+','+y0+' A'+r+','+r+' 0 '+(a1-a0>Math.PI?1:0)+' 1 '+x1+','+y1+' Z'; };
  return html`<div className="mk-chartw"><div className="mk-pies">${c.pies.map(p=>{ let a=0; return html`<figure key=${p.title} className="mk-pie"><svg viewBox="0 0 140 140" role="img" aria-label=${p.title+': '+c.labels.map((l,i)=>l+' '+p.vals[i]+'%').join(', ')}>
      ${p.vals.map((v,i)=>{ const a0=a, a1=a+v/100*Math.PI*2; a=a1; const mid=(a0+a1)/2; return html`<g key=${i}><path d=${arc(a0,a1-0.0001)} fill=${CH_COLS[i]} stroke="var(--surface)" strokeWidth="2"/>${v>=7?html`<text x=${cx+r*.64*Math.sin(mid)} y=${cy-r*.64*Math.cos(mid)+4} textAnchor="middle" className="mk-pv">${v}%</text>`:null}</g>`; })}</svg>
      <figcaption>${p.title}</figcaption></figure>`; })}</div>
    <div className="mk-legend col">${c.labels.map((l,i)=>html`<span key=${l}><i style=${{background:CH_COLS[i]}}></i>${l}<em>${c.pies.map(p=>p.vals[i]+'%').join(' → ')}</em></span>`)}</div></div>`; }
function LineChart({c}){
  const max=c.max||100, step=c.step||20, pct=!c.unit||c.unit==='%', ticks=[]; for(let v=0;v<=max+1e-9;v+=step) ticks.push(v);
  const W_=360,H_=220,L=40,R=96,T=pct?14:24,B=30, x=i=>L+i*(W_-L-R)/(c.years.length-1), y=v=>T+(max-v)*(H_-T-B)/max;
  const cols=['var(--accent)','#12A195','#7C5CFF','#E0457B'], dash=['','7 5','2 5','10 3 2 3'];
  const lab=c.series.map(([n,v],k)=>({k,y:y(v[v.length-1])+4})).sort((p,q)=>p.y-q.y); for(let i=1;i<lab.length;i++) if(lab[i].y-lab[i-1].y<13) lab[i].y=lab[i-1].y+13; const ly={}; lab.forEach(o=>ly[o.k]=o.y);
  return html`<svg className="mk-chart" viewBox=${'0 0 '+W_+' '+H_} role="img" aria-label=${'График: '+c.series.map(s=>s[0]+' '+s[1].join(', ')).join('; ')}>
    ${pct?null:html`<text x=${L-6} y=${10} textAnchor="end" className="mk-ax">${c.unit}</text>`}
    ${ticks.map(v=>html`<g key=${v}><line x1=${L} x2=${W_-R} y1=${y(v)} y2=${y(v)} className="mk-grid"/><text x=${L-6} y=${y(v)+4} textAnchor="end" className="mk-ax">${v}${pct?'%':''}</text></g>`)}
    ${c.years.map((yr,i)=>html`<text key=${yr} x=${x(i)} y=${H_-10} textAnchor="middle" className="mk-ax">${yr}</text>`)}
    ${c.series.map(([n,vals],k)=>html`<g key=${n}><polyline fill="none" stroke=${cols[k]} strokeWidth="3" strokeDasharray=${dash[k]} strokeLinecap="round" strokeLinejoin="round" points=${vals.map((v,i)=>x(i)+','+y(v)).join(' ')}/>
      ${vals.map((v,i)=>html`<circle key=${i} cx=${x(i)} cy=${y(v)} r="3.5" fill=${cols[k]}/>`)}
      <text x=${W_-R+8} y=${ly[k]} className="mk-lab" fill=${cols[k]}>${n.length<=10?n:n.split(' ')[0]}</text></g>`)}
  </svg>`; }
function IeltsWriting({m,update,onExit,onNext,nextName}){
  const ai=useSample(); const wt=m.writing;
  const [tab,setTab]=useState('t1'), [txt,setTxt,clrW,dAt]=useDraftState('ielts:W:'+m.id,{t1:'',t2:''}), [phase,setPhase]=useState('write'), [fb,setFb]=useState({}), [err,setErr]=useState({}), [busy,setBusy]=useState({});
  const eids=useRef({});
  const submit=()=>{ setPhase('check'); window.scrollTo({top:0}); W('react','think');
    const add=['t1','t2'].filter(k=>wcount(txt[k])>=40).map(k=>{ const id=newId(); eids.current[k]=id; return {id,title:m.title.replace('IELTS Academic · ','IELTS ')+' · Task '+(k==='t1'?1:2),prompt:wt[k].prompt,text:txt[k].slice(0,6000),date:dayKey(),band:null}; });
    if(add.length) update(s=>({essays:[...add,...(s.essays||[])].slice(0,20)}));
    if(ai) ['t1','t2'].forEach(k=>{ if(wcount(txt[k])>=20) check(k); }); };
  const left=useCountdown(60*60,()=>{ if(phase==='write'){ W('say','Время вышло! Сдаём работу.',0,true); submit(); } },phase==='write');
  const check=k=>{ if(!ai||busy[k]) return; setBusy(b=>({...b,[k]:true})); setErr(e=>({...e,[k]:null}));
    ai.json(writingPrompt(k,wt[k],txt[k])).then(j=>{ const f=cleanFb(j,['ta','cc','lr','gra']); const eid=eids.current[k]; if(eid) update(s=>({essays:(s.essays||[]).map(e=>e.id===eid?{...e,band:f.band,crit:f.crit}:e)})); setFb(x=>{ const nx={...x,[k]:f}; persist(nx); return nx; }); W('react','happy'); })
      .catch(e=>setErr(x=>({...x,[k]:aiErr(e)}))).finally(()=>setBusy(b=>({...b,[k]:false}))); };
  const persist=f=>{ const b1=f.t1&&f.t1.band, b2=f.t2&&f.t2.band; if(b1==null&&b2==null) return;
    const band=b1!=null&&b2!=null?roundBand((b1+2*b2)/3):(b2!=null?b2:b1); saveMock(update,m.id,'W',{band,t1:b1,t2:b2},b1!=null&&b2!=null?20:0); clrW();
    if(b1!=null&&b2!=null){ SFX('fanfare'); W('say','Writing '+fmtB(band)+'!',0,true); } };
  const T=wt[tab], wc=wcount(txt[tab]), min=tab==='t1'?150:250;
  return html`<section className="mk-sec">
    <div className="sess-top mk-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Writing</b><span className="muted">Task 1 ≈ 20 мин · Task 2 ≈ 40 мин</span></div>${phase==='write'?html`<${Timer} left=${left}/>`:null}</div>
    ${phase==='write'&&dAt?html`<${DraftNote} at=${dAt} onReset=${()=>{ clrW(); setTxt({t1:'',t2:''}); }}/>`:null}
    <div className="mk-tabs" role="tablist">${['t1','t2'].map(k=>html`<button key=${k} role="tab" aria-selected=${tab===k} id=${'wt-'+k} onClick=${()=>{ SFX('tap'); setTab(k); }}>Task ${k==='t1'?1:2}<small> · ${wcount(txt[k])} сл.</small></button>`)}</div>
    <article className="mk-paper enter" key=${tab} data-perch="card"><p className="mk-prompt">${T.prompt}</p>${T.chart?html`<${ChartView} c=${T.chart}/>`:null}</article>
    ${tab==='t1'?html`<${T1Sheet}/>`:null}
    ${phase==='write'?html`<div className="mk-write"><textarea id=${'wtx-'+tab} className="mk-text" value=${txt[tab]} onChange=${e=>{ const v=e.target.value; setTxt(t=>({...t,[tab]:v})); }} placeholder="Пиши ответ здесь на английском…" spellCheck=${false} autoCorrect="off" aria-label=${'Ответ на Task '+(tab==='t1'?1:2)}></textarea>
        <div className="mk-wc"><span className=${wc>=min?'ok':''}>${wc} / ${min} слов</span><small className="muted">Проверка орфографии выключена, как на экзамене</small></div></div>
      <div className="mk-foot"><button className="btn wide" id="wr-submit" disabled=${wcount(txt.t1)+wcount(txt.t2)<20} onClick=${()=>{ SFX('pop'); submit(); }}>Сдать работу</button></div>`
    :html`${fb[tab]?html`<${Feedback} fb=${fb[tab]} keys=${['ta','cc','lr','gra']}/>`
        :busy[tab]?html`<div className="mk-fb wait" role="status"><span className="mk-spin" aria-hidden="true"></span>Ворди и ИИ-экзаменатор проверяют работу… обычно до минуты.</div>`
        :ai&&wc>=20?html`<div className="mk-fb">${err[tab]?html`<p className="mk-err">${err[tab]}</p>`:null}<button className="btn" id=${'wr-check-'+tab} onClick=${()=>check(tab)}>${MI.spark()} ${err[tab]?'Попробовать снова':'Проверить с ИИ'}</button></div>`
        :html`<div className="mk-fb"><p className="mk-err">${ai===undefined?'Подключаем проверку…':wc<20?'Ответ слишком короткий для проверки.':(window.__wordyKid?'Проверка с помощью ИИ доступна с 13 лет.':'Проверка ИИ сейчас недоступна.')+' Пока сверься с образцом и чек-листом.'}</p></div>`}
      <${UpgradeBox} key=${'up'+tab} task=${tab} T=${T} text=${txt[tab]} ai=${ai}/>
      <details className="mk-model"><summary>Твой ответ · ${wc} слов</summary><p className="mk-pre">${txt[tab]||'— пусто —'}</p></details>
      <details className="mk-model"><summary>Образец ответа (≈ Band 8)</summary>${T.model.split('\n\n').map((p,i)=>html`<p key=${i}>${p}</p>`)}</details>
      <details className="mk-model"><summary>Чек-лист самопроверки</summary><ul>${(tab==='t1'?['Есть вступление своими словами (не копия задания)','Есть overview — общая тенденция без цифр','Главные цифры и сравнения указаны точно','Нет личного мнения','Не меньше 150 слов']:['Ответ на ВСЕ части вопроса (обе точки зрения + своё мнение)','Чёткая позиция во вступлении и заключении','Каждый абзац — одна идея + пример','Связки разнообразные, не только firstly/secondly','Не меньше 250 слов']).map((x,i)=>html`<li key=${i}>${x}</li>`)}</ul></details>
      ${onNext?html`<div className="actions one"><button className="btn" id="mk-next" onClick=${onNext}>Далее: ${nextName}</button></div>`:null}<div className="actions" hidden=${!!onNext}><button className="btn ghost" onClick=${onExit}>К тестам</button><button className="btn" onClick=${()=>{ setTxt({t1:'',t2:''}); setFb({}); setErr({}); setPhase('write'); setTab('t1'); window.scrollTo({top:0}); }}>Написать заново</button></div>`}
  </section>`;
}

/* ---------- Writing "before / after": AI rewrites the student's own text at a target band, the page diffs it ---------- */
const upgradePrompt=(task,T,text,band)=>'You are an IELTS Academic writing coach. Rewrite the candidate\'s '+(task==='t1'?'Task 1 report':'Task 2 essay')+' so that it would realistically score Band '+band+'. KEEP the candidate\'s own ideas, structure and paragraph order wherever possible; change only what is needed for Band '+band+' (accuracy, range of vocabulary and grammar, linking, '+(task==='t1'?'a clear overview and accurate data':'a clear position and well-developed ideas')+'). '+(band>=8?'Use precise, natural, less common vocabulary and a wide range of structures, but no showing off.':'Use clear, accurate, natural language; Band 7 is good but not perfect.')+' Do not add a title. Keep a similar length (at least '+(task==='t1'?150:250)+' words).\n\nTask: '+T.prompt+(T.chart?'\nData: '+chartText(T.chart):'')+'\n\nCandidate text:\n<<<\n'+text.slice(0,5000)+'\n>>>\n\nThen list the 4-6 most important changes, each explained in RUSSIAN, quoting the English exactly.\nReply with ONLY JSON: {"text":"rewritten text with \\n\\n between paragraphs","notes":[{"from":"original words","to":"new words","why":"по-русски, почему это сильнее"}]}';
const dTok=s=>String(s).match(/\n\n|[^\s]+/g)||[];
function wordDiff(a,b){ const A=dTok(a), B=dTok(b), n=A.length, m=B.length;
  if(n*m>900000) return [['=',b]];
  const norm=w=>w.toLowerCase().replace(/[^\w']/g,'');
  const L=Array.from({length:n+1},()=>new Uint16Array(m+1));
  for(let i=n-1;i>=0;i--) for(let j=m-1;j>=0;j--) L[i][j]=norm(A[i])===norm(B[j])&&A[i]!=='\n\n'?L[i+1][j+1]+1:A[i]==='\n\n'&&B[j]==='\n\n'?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  const out=[]; const push=(op,w)=>{ const l=out[out.length-1]; if(l&&l[0]===op) l[1].push(w); else out.push([op,[w]]); };
  let i=0,j=0; while(i<n&&j<m){ const eq=A[i]==='\n\n'||B[j]==='\n\n'?A[i]===B[j]:norm(A[i])===norm(B[j]); if(eq){ push('=',B[j]); i++; j++; } else if(L[i+1][j]>=L[i][j+1]){ push('-',A[i]); i++; } else { push('+',B[j]); j++; } }
  while(i<n) push('-',A[i++]); while(j<m) push('+',B[j++]); return out; }
function DiffView({a,b}){ const parts=wordDiff(a,b); const paras=[[]];
  parts.forEach(([op,ws],k)=>{ let cur=[]; const flush=()=>{ if(cur.length){ paras[paras.length-1].push([op,cur.join(' '),k+'-'+paras.length]); cur=[]; } };
    ws.forEach(w=>{ if(w==='\n\n'){ flush(); if(op!=='-') paras.push([]); } else cur.push(w); }); flush(); });
  return html`<div className="df">${paras.filter(p=>p.length).map((p,i)=>html`<p key=${i}>${p.map(([op,s,k])=>op==='='?html`<span key=${k}>${s} </span>`:op==='-'?html`<del key=${k}>${s}</del> `:html`<ins key=${k}>${s}</ins> `)}</p>`)}</div>`; }
function UpgradeBox({task,T,text,ai}){ const [band,setBand]=useState(null), [res,setRes]=useState({}), [busy,setBusy]=useState(false), [err,setErr]=useState(null), [view,setView]=useState('diff');
  const go=b=>{ setBand(b); setErr(null); if(res[b]||busy) return; setBusy(true); W('react','think'); W('say','Переписываю твой текст на '+b+'.0…',0,true);
    ai.json(upgradePrompt(task,T,text,b)).then(j=>{ const tx=String((j&&j.text)||'').trim(); if(wcount(tx)<30) throw {code:'invalid_json'};
      const notes=(Array.isArray(j.notes)?j.notes:[]).slice(0,6).map(n=>({from:String(n.from||'').slice(0,200),to:String(n.to||'').slice(0,200),why:String(n.why||'').slice(0,300)}));
      setRes(r=>({...r,[b]:{text:tx,notes}})); SFX('correct'); W('react','happy'); }).catch(e=>setErr(aiErr(e))).finally(()=>setBusy(false)); };
  if(!ai||wcount(text)<40) return null;
  const R=band&&res[band];
  return html`<div className="mk-fb up"><b>До и после</b><p className="muted">ИИ перепишет твой текст на выбранный балл, сохранив твои идеи. Зачёркнуто — что убрано, зелёным — что стало сильнее.</p>
    <div className="chips">${[7,8].map(b=>html`<button key=${b} className="chip" id=${'up-'+task+'-'+b} aria-pressed=${band===b} disabled=${busy} onClick=${()=>{ SFX('tap'); go(b); }}>Band ${b}.0${res[b]?' ✓':''}</button>`)}</div>
    ${busy?html`<div className="mk-fb wait" role="status"><span className="mk-spin" aria-hidden="true"></span>Переписываю на Band ${band}.0…</div>`:null}
    ${err?html`<p className="mk-err">${err}</p>`:null}
    ${R?html`<div className="mk-tabs up-tabs" role="tablist"><button role="tab" aria-selected=${view==='diff'} onClick=${()=>setView('diff')}>Изменения</button><button role="tab" aria-selected=${view==='clean'} onClick=${()=>setView('clean')}>Чистый текст</button></div>
      ${view==='diff'?html`<${DiffView} a=${text} b=${R.text}/>`:html`<div className="df">${R.text.split(/\n\n+/).map((p,i)=>html`<p key=${i}>${p}</p>`)}</div>`}
      <small className="muted">${wcount(text)} → ${wcount(R.text)} слов</small><${AiReport} what=${'переписывание на Band '+band} text=${R.text}/>
      ${R.notes.length?html`<h4>Главные улучшения</h4><div className="mk-fixes">${R.notes.map((n,i)=>html`<div key=${i} className="mk-fix"><s>${n.from}</s><b>${n.to}</b><small>${n.why}</small></div>`)}</div>`:null}`:null}
  </div>`; }
/* ---------- IELTS Speaking ---------- */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
/* Dictation + fluency timing. Speech recognition fires a result event whenever it hears speech,
   so the gaps between events approximate the speaker's pauses (no second microphone stream needed). */
/* Voice recording next to recognition, so the AI can hear pronunciation. Silent failure: recognition keeps working without it. */
const CAN_REC=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
function startRecorder(onBlob){ let mr=null, stream=null, stopped=false, chunks=[];
  navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,channelCount:1}}).then(st=>{ stream=st; if(stopped){ st.getTracks().forEach(t=>t.stop()); return; }
    const type=['audio/webm;codecs=opus','audio/ogg;codecs=opus','audio/webm','audio/mp4'].find(t=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t));
    mr=new MediaRecorder(st,type?{mimeType:type,audioBitsPerSecond:32000}:undefined); mr.ondataavailable=e=>{ if(e.data&&e.data.size) chunks.push(e.data); };
    mr.onstop=()=>{ st.getTracks().forEach(t=>t.stop()); if(chunks.length) onBlob(new Blob(chunks,{type:mr.mimeType||type||'audio/webm'})); }; mr.start(1000); }).catch(()=>{});
  return ()=>{ stopped=true; try{ if(mr&&mr.state!=='inactive') mr.stop(); else if(stream) stream.getTracks().forEach(t=>t.stop()); }catch(e){} }; }
/* decode recorded clips → one 16 kHz mono 16-bit WAV (base64), at most maxSec seconds: a format every Gemini model accepts */
async function clipsToWav(blobs,maxSec){ if(!blobs||!blobs.length) return null; const AC=window.AudioContext||window.webkitAudioContext; if(!AC||!window.OfflineAudioContext) return null;
  const ctx=new AC(); const bufs=[]; try{ for(const b of blobs){ try{ bufs.push(await ctx.decodeAudioData(await b.arrayBuffer())); }catch(e){} } } finally{ try{ ctx.close(); }catch(e){} }
  if(!bufs.length) return null; const R=16000, total=Math.min(maxSec,bufs.reduce((n,b)=>n+b.duration,0)); if(total<3) return null;
  const off=new OfflineAudioContext(1,Math.ceil(total*R),R); let at=0; bufs.forEach(b=>{ if(at>=total) return; const src=off.createBufferSource(); src.buffer=b; src.connect(off.destination); src.start(at); at+=b.duration; });
  const pcm=(await off.startRendering()).getChannelData(0); let peak=0; for(let i=0;i<pcm.length;i+=97) peak=Math.max(peak,Math.abs(pcm[i])); if(peak<0.02) return null; /* silence: microphone was busy */
  const n=pcm.length, buf=new ArrayBuffer(44+n*2), v=new DataView(buf), w=(o,str)=>{ for(let i=0;i<str.length;i++) v.setUint8(o+i,str.charCodeAt(i)); };
  w(0,'RIFF'); v.setUint32(4,36+n*2,true); w(8,'WAVE'); w(12,'fmt '); v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true); v.setUint32(24,R,true); v.setUint32(28,R*2,true); v.setUint16(32,2,true); v.setUint16(34,16,true); w(36,'data'); v.setUint32(40,n*2,true);
  const g=Math.min(4,0.9/peak); for(let i=0;i<n;i++){ const x=Math.max(-1,Math.min(1,pcm[i]*g)); v.setInt16(44+i*2,x<0?x*0x8000:x*0x7FFF,true); }
  const bytes=new Uint8Array(buf); let bin=''; for(let i=0;i<bytes.length;i+=0x8000) bin+=String.fromCharCode.apply(null,bytes.subarray(i,i+0x8000));
  return {mime:'audio/wav',data:btoa(bin),secs:Math.round(total)}; }
/* Dictation + fluency timing + voice recording.
   - Browser recognition gives live text and pause timing. Chrome often stops it on its own after a silence, so it is restarted until the learner presses «Стоп».
   - The voice is recorded at the same time. If recognition gave no text (unsupported browser, blocked service, busy microphone),
     Gemini transcribes the recording instead, keeping the learner's own mistakes. */
const TRANSCRIBE=__WD[1276];
function useDictation(onText,onMetrics,onAudio,ai){
  const canAI=!!(CAN_REC&&ai&&ai.gemini);
  const rec=useRef(null), [on,setOn]=useState(false), [srFail,setSrFail]=useState(!SR); const cb=useRef(onText); cb.current=onText; const mcb=useRef(onMetrics); mcb.current=onMetrics;
  const acb=useRef(onAudio); acb.current=onAudio; const recStop=useRef(null), user=useRef(false), got=useRef(false), dead=useRef(false), live=useRef(true);
  const [busyT,setBusyT]=useState(false), [terr,setTerr]=useState(null);
  const tm=useRef(null);
  const flush=()=>{ const x=tm.current; tm.current=null; if(!x||!x.ev.length||!mcb.current) return; const ev=x.ev, gaps=[];
    for(let i=1;i<ev.length;i++){ const g=(ev[i]-ev[i-1])/1000; if(g>=1.5) gaps.push(g); }
    const speak=Math.max(1,(ev[ev.length-1]-ev[0])/1000+0.8); mcb.current({secs:Math.round(speak),words:x.words,pauses:gaps.length,longest:gaps.length?Math.round(Math.max(...gaps)*10)/10:0,start:Math.round((ev[0]-x.t0)/100)/10}); };
  const transcribe=async b=>{ setBusyT(true); setTerr(null);
    try{ const w=await clipsToWav([b],300); if(!w) throw {code:'no_audio'}; const j=await ai.json(TRANSCRIBE,[w],{fast:true}); const t=String((j&&j.text)||'').trim();
      if(t){ cb.current(t+' '); mcb.current&&mcb.current({secs:w.secs,words:wcount(t),pauses:0,longest:0,start:0}); } else if(live.current) setTerr('В записи не слышно речи. Говори ближе к микрофону и попробуй ещё раз.'); }
    catch(e){ if(live.current) setTerr(e&&e.code==='no_audio'?'Запись получилась пустой: проверь, что микрофон разрешён и не занят другой программой.':aiErr(e)); }
    finally{ if(live.current) setBusyT(false); } };
  const stopRec=()=>{ const f=recStop.current; recStop.current=null; f&&f(); };
  const finish=()=>{ setOn(false); stopRec(); flush(); };
  const stop=()=>{ user.current=true; try{ rec.current&&rec.current.stop(); }catch(e){} if(!rec.current||dead.current) finish(); };
  const startSR=()=>{ const r=new SR(); r.lang='en-GB'; r.continuous=true; r.interimResults=true;
    r.onresult=e=>{ if(tm.current) tm.current.ev.push(Date.now()); let t=''; for(let i=e.resultIndex;i<e.results.length;i++) if(e.results[i].isFinal) t+=e.results[i][0].transcript+' '; if(t){ got.current=true; if(tm.current) tm.current.words+=wcount(t); cb.current(t); } };
    r.onerror=e=>{ if(['not-allowed','service-not-allowed','audio-capture','network','language-not-supported'].includes(e.error)){ dead.current=true; if(!canAI){ setSrFail(true); finish(); } } };
    r.onend=()=>{ if(rec.current!==r) return; if(!user.current&&!dead.current){ try{ r.start(); return; }catch(e){} } rec.current=null; if(user.current||!canAI) finish(); };
    rec.current=r; r.start(); };
  const start=()=>{ if(!SR&&!canAI){ setSrFail(true); return; } user.current=false; got.current=false; dead.current=false; setTerr(null);
    tm.current={t0:Date.now(),ev:[],words:0};
    if(CAN_REC&&(acb.current||canAI)&&!recStop.current) recStop.current=startRecorder(b=>{ acb.current&&acb.current(b); if(canAI&&!got.current) transcribe(b); });
    if(SR){ try{ startSR(); }catch(e){ dead.current=true; if(!canAI){ setSrFail(true); stopRec(); return; } } } else dead.current=true;
    setOn(true); };
  useEffect(()=>()=>{ live.current=false; user.current=true; try{ rec.current&&rec.current.stop(); }catch(e){} stopRec(); },[]);
  return {on,fail:srFail&&!canAI,start,stop,busyT,terr};
}
const FILLERS=[['um','\\b(um+|uhm+|erm+)\\b'],['uh','\\b(uh+|er+|ah+)\\b'],['you know','\\byou know\\b'],['I mean','\\bi mean\\b'],['like','\\blike\\s+(?=like\\b|um\\b|uh\\b)'],['basically','\\bbasically\\b'],['kind of','\\bkind of\\b'],['sort of','\\bsort of\\b']];
const fillersIn=txt=>{ const s=String(txt||'').toLowerCase(), o={}; FILLERS.forEach(([n,re])=>{ const c=(s.match(new RegExp(re,'g'))||[]).length; if(c) o[n]=c; }); return o; };
const addMet=(a,b)=>!a?b:{secs:a.secs+b.secs,words:a.words+b.words,pauses:a.pauses+b.pauses,longest:Math.max(a.longest,b.longest),start:a.start};
function fluSummary(flu,ans){ const keys=Object.keys(flu||{}).filter(k=>flu[k]&&flu[k].secs>=3); if(!keys.length) return null;
  const secs=keys.reduce((n,k)=>n+flu[k].secs,0), words=keys.reduce((n,k)=>n+flu[k].words,0), pauses=keys.reduce((n,k)=>n+flu[k].pauses,0);
  const fil={}; keys.forEach(k=>Object.entries(fillersIn(ans[k])).forEach(([n,c])=>fil[n]=(fil[n]||0)+c));
  const filN=Object.values(fil).reduce((a,b)=>a+b,0);
  return {secs,words,wpm:Math.round(words/(secs/60)),ppm:Math.round(pauses/(secs/60)*10)/10,longest:Math.max(...keys.map(k=>flu[k].longest)),fil,filN,fpm:Math.round(filN/(Math.max(1,words)/100)*10)/10,p2:flu.p2?flu.p2.secs:null,n:keys.length}; }
const wpmTag=w=>w<90?['медленно','bad']:w<115?['чуть медленно','mid']:w<=170?['хороший темп','good']:['очень быстро','mid'];
function FluChips({x}){ if(!x) return null; const [lab,cl]=wpmTag(Math.round(x.words/(x.secs/60)));
  return html`<div className="flu-chips" aria-label="Беглость"><span>${MI.clock()} ${mmss(x.secs)}</span><span className=${'fc-'+cl}>${Math.round(x.words/(x.secs/60))} сл/мин · ${lab}</span><span className=${x.pauses>2?'fc-mid':''}>пауз ${x.pauses}${x.longest?' · макс '+x.longest+' с':''}</span></div>`; }
function FluPanel({s}){ if(!s) return html`<div className="mk-fb flu"><b>Беглость</b><p className="muted">Отвечай голосом — тогда приложение измерит темп речи, паузы и слова-паразиты.</p></div>`;
  const [lab,cl]=wpmTag(s.wpm), tips=[];
  if(s.wpm<115) tips.push('Говори чуть быстрее: на 7+ обычно 120–160 слов в минуту. Тренируй связки, чтобы не искать слова.');
  if(s.ppm>3) tips.push('Много длинных пауз. Заполняй их естественными фразами: «Well, let me think…», «That\'s an interesting question…».');
  if(s.fpm>4) tips.push('Много слов-паразитов. Лучше короткая пауза, чем «um» и «you know» в каждом предложении.');
  if(s.p2!=null&&s.p2<70) tips.push('Монолог в Part 2 короче 1 минуты 10 секунд. Старайся говорить почти все 2 минуты: раскрой каждый пункт карточки.');
  if(!tips.length) tips.push('Темп и паузы в норме — так держать!');
  return html`<div className="mk-fb flu enter"><b>Беглость · измерено приложением</b>
    <div className="flu-grid"><div><em className=${'fc-'+cl}>${s.wpm}</em><small>слов в минуту<br/>${lab}</small></div><div><em className=${s.ppm>3?'fc-mid':'fc-good'}>${s.ppm}</em><small>пауз > 1,5 с<br/>в минуту</small></div>
      <div><em className=${s.fpm>4?'fc-mid':'fc-good'}>${s.filN}</em><small>слов-паразитов<br/>${s.filN?Object.entries(s.fil).map(([n,c])=>n+' ×'+c).join(', '):'не найдено'}</small></div><div><em>${s.p2!=null?mmss(s.p2):'—'}</em><small>монолог Part 2<br/>(цель 1:40–2:00)</small></div></div>
    <ul>${tips.map((x,i)=>html`<li key=${i}>${x}</li>`)}</ul>
    <p className="mk-note">Паузы считаются по работе распознавания речи — это примерная оценка. Некоторые «um» и «uh» распознавание не записывает.</p></div>`; }

function AnswerBox({id,val,set,running,onMetrics,met,onRec,onAudio}){
  const ai=useSample(); const d=useDictation(t=>set((val||'')+t),onMetrics,onAudio,ai);
  useEffect(()=>{ onRec&&onRec(d.on); },[d.on]); useEffect(()=>()=>{ onRec&&onRec(false); },[]);
  useEffect(()=>{ if(!running&&d.on) d.stop(); },[running]);
  return html`<div className="mk-ansbox">
    ${!d.fail?html`<button className=${'btn'+(d.on?' danger':'')} id=${id+'-mic'} onClick=${()=>{ SFX('tap'); d.on?d.stop():d.start(); }}>${MI.mic()} ${d.on?'Стоп':'Ответить голосом'}</button>${d.on?html`<span className="mk-rec" aria-live="polite">● запись</span>`:null}${d.busyT?html`<span className="mk-rec mk-tr" role="status"><span className="mk-spin" aria-hidden="true"></span> Ворди расшифровывает запись…</span>`:null}${d.terr?html`<small className="mk-err">${d.terr}</small>`:null}`
      :html`<small className="muted">Микрофон недоступен в этом окне — напечатай ответ так, как сказал бы его вслух.</small>`}
    <textarea id=${id} data-perch="exam" className="mk-text small" value=${val||''} onChange=${e=>set(e.target.value)} placeholder=${d.fail?'Твой ответ…':'Здесь появится распознанный текст — можно поправить'} aria-label="Ответ"></textarea>${met&&!d.on?html`<${FluChips} x=${met}/>`:null}</div>`; }
/* ---------- IELTS Speaking — full 11–14 minute format with recorded examiner ---------- */
const djb=s=>{ let x=5381; for(const c of String(s)) x=((x*33)^c.charCodeAt(0))>>>0; return x.toString(36); };
const EXAMINERS={ielts1:['bf_emma','Emma'],ielts2:['bm_george','George'],ielts3:['bf_isabella','Isabella'],ielts4:['bm_lewis','Lewis'],ielts5:['bf_alice','Alice'],
  ielts6:['bm_daniel','Daniel'],ielts7:['bf_lily','Lily'],ielts8:['bm_george','George'],ielts9:['bf_emma','Emma'],ielts10:['bm_lewis','Lewis']};
const examinerOf=m=>EXAMINERS[m.id]||['bf_emma','Emma'];
const spKey=(m,t)=>'sp-'+djb(examinerOf(m)[0]+'|'+t);
function spScript(m){ const sp=m.speaking, [,name]=examinerOf(m), S=[];
  S.push({k:'id',part:0,say:['Good morning. My name is '+name+', and I will be your examiner today. Could you tell me your full name, please?'],hint:'Назови своё полное имя',short:true});
  sp.p1.forEach((q,i)=>S.push({k:'p1-'+i,part:1,q,say:i===0?['Thank you. Now, in this first part, I would like to ask you some questions about yourself.',q]:[q],soft:30}));
  S.push({k:'prep',part:2,say:['Now I am going to give you a topic, and I would like you to talk about it for one to two minutes. Before you talk, you will have one minute to think about what you are going to say. You can make some notes if you wish. Here is your topic. '+sp.p2.card]});
  S.push({k:'p2',part:2,say:['All right? Remember, you have one to two minutes for this, so do not worry if I stop you. I will tell you when the time is up. Can you start speaking now, please?']});
  (sp.p2.follow||[]).forEach((q,i)=>S.push({k:'p2f-'+i,part:2,q,say:i===0?['Thank you. '+q]:[q],soft:20}));
  sp.p3.forEach((q,i)=>S.push({k:'p3-'+i,part:3,q,say:i===0?['We have been talking about '+(sp.p2.theme||'this topic')+', and I would like to discuss with you one or two more general questions related to this. Let us consider, first of all, this question.',q]:[q],soft:60}));
  S.push({k:'end',say:['Thank you. That is the end of the speaking test.']});
  return S; }
function playExaminer(m,texts,onEnd){ let i=0, a=null, stopped=false;
  const next=()=>{ if(stopped) return; if(i>=texts.length){ W('talk',0); onEnd&&onEnd(); return; } const t=texts[i++], key=spKey(m,t);
    if(SP_AUDIO[key]){ a=new Audio('audio/sp/'+key+'.mp3'); W('talk',Math.min(15,t.length/14)); a.onended=()=>setTimeout(next,250); a.onerror=()=>{ a=null; speakText(t,.92,()=>setTimeout(next,250)); }; a.play().catch(()=>{ speakText(t,.92,()=>setTimeout(next,250)); }); }
    else speakText(t,.92,()=>setTimeout(next,250)); };
  next(); return ()=>{ stopped=true; try{ a&&a.pause(); }catch(e){} stopSpeak(); }; }
function useElapsed(run,key){ const [t,setT]=useState(0); useEffect(()=>{ setT(0); if(!run) return; const s=Date.now(); const id=setInterval(()=>setT(Math.round((Date.now()-s)/1000)),1000); return ()=>clearInterval(id); },[run,key]); return t; }
const WORDY_FACE=html`<svg viewBox="-24 -24 48 48" width="40" height="40"><circle r="21" fill="#FF7A12"/><ellipse cx="-7" cy="-3" rx="4.6" ry="5.4" fill="#fff"/><ellipse cx="7" cy="-3" rx="4.6" ry="5.4" fill="#fff"/><circle cx="-6" cy="-2" r="2.4" fill="#2A1608"/><circle cx="8" cy="-2" r="2.4" fill="#2A1608"/><circle cx="-7" cy="-3" r="7.2" fill="none" stroke="#2A1608" stroke-width="1.8"/><circle cx="7" cy="-3" r="7.2" fill="none" stroke="#2A1608" stroke-width="1.8"/><path d="M-0.4 -3h0.8" stroke="#2A1608" stroke-width="1.8"/><path d="M-6 9 Q0 13 6 9" stroke="#2A1608" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
function IeltsSpeaking({m,st,update,onExit,onNext,nextName}){
  const ai=useSample(); const sp=m.speaking, steps=useMemo(()=>spScript(m),[m]);
  const [i,setI]=useState(-1), [ans,setAns]=useState({}), [fb,setFb]=useState(null), [busy,setBusy]=useState(false), [err,setErr]=useState(null), [notes,setNotes]=useState(''), [talking,setTalking]=useState(false), [p2over,setP2over]=useState(false);
  const S=i>=0?steps[i]:null, stopRef=useRef(null); const [flu,setFlu]=useState({}), [rec,setRec]=useState(false), [clips,setClips]=useState({});
  const audFor=k=>b=>setClips(c=>({...c,[k]:[...(c[k]||[]),b]}));
  /* Wordy plays the examiner: glasses + tie, sits on the examiner bar, lip-syncs the examiner voice and nods while the student speaks */
  const examOn=i>=0&&!(S&&S.k==='end');
  useEffect(()=>{ if(!examOn) return; const eq=(st&&st.equip)||{}; W('wear',{...eq,eyes:'glasses',neck:'tie'}); const t=setTimeout(()=>W('goTo','exam',{frac:.88}),350);
    return ()=>{ clearTimeout(t); W('wear',eq); W('goTo','home'); }; },[examOn]);
  useEffect(()=>{ if(!rec) return; W('react','nod'); const id=setInterval(()=>W('react',Math.random()<.8?'nod':'think'),3600); return ()=>clearInterval(id); },[rec]);
  const metFor=k=>x=>setFlu(f=>({...f,[k]:addMet(f[k],x)}));
  const say=texts=>{ stopRef.current&&stopRef.current(); setTalking(true); stopRef.current=playExaminer(m,texts,()=>setTalking(false)); };
  useEffect(()=>{ if(!S) return; setP2over(false); say(S.say); return ()=>{ stopRef.current&&stopRef.current(); }; },[i]);
  const tl=useCountdown(S&&S.k==='prep'?60:S&&S.k==='p2'?120:0,()=>{ if(S.k==='prep'){ SFX('pop'); setI(x=>x+1); } else if(S.k==='p2'){ SFX('pop'); setP2over(true); W('say','Время! Две минуты прошли.',0,true); } },!!S&&(S.k==='prep'||S.k==='p2')&&!talking,i);
  const el=useElapsed(!!S&&!!S.soft&&!talking,i);
  const next=()=>{ SFX('tap'); stopRef.current&&stopRef.current(); W('react','nod'); setI(x=>Math.min(steps.length-1,x+1)); window.scrollTo({top:0}); };
  const check=async()=>{ if(!ai||busy) return; setBusy(true); setErr(null);
    let media=null, what='';
    if(ai.gemini){ const p2=clips.p2||[], rest=Object.keys(clips).filter(k=>k!=='p2'&&k!=='id').flatMap(k=>clips[k]);
      try{ const w=await clipsToWav(p2.length?p2:rest,120); if(w){ media=[w]; what=p2.length?'the Part 2 long turn':'answers from Parts 1 and 3'; } }catch(e){} }
    ai.json(speakingPrompt(m,ans,fluSummary(flu,ans))+(media?pronAdd(media[0].secs,what):''),media).then(j=>{ const f=cleanFb(j,media?['fc','lr','gra','pr']:['fc','lr','gra']); setFb(f); saveMock(update,m.id,'S',{band:f.band},20); SFX('fanfare'); W('react','cheer'); W('say','Speaking '+fmtB(f.band)+'!',0,true); })
      .catch(e=>setErr(aiErr(e))).finally(()=>setBusy(false)); };
  const said=Object.entries(ans).filter(([k])=>k!=='id').map(([,v])=>v).join(' ').trim();
  useEffect(()=>{ if(S&&S.k==='end'&&ai&&!fb&&!busy&&!err&&wcount(said)>=30) check(); },[i,ai]);
  const qSteps=steps.filter(s=>s.k!=='end');
  if(i<0) return html`<section className="mk-sec"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Speaking</b><span className="muted">${m.title}</span></div></div>
    <div className="mk-res mk-start enter" data-perch="card"><span className="phase">Speaking · 11–14 минут</span><h3>Собеседование с экзаменатором</h3>
      <p>Сегодня экзаменатор — Ворди: очки, галстук, всё серьёзно. Он задаёт вопросы голосом (${examinerOf(m)[1]}) строго по формату настоящего IELTS и кивает, пока ты отвечаешь.</p>
      <ul className="mk-rules"><li><b>Part 1</b> · 4–5 минут: вопросы о тебе и привычных темах</li><li><b>Part 2</b> · 3–4 минуты: карточка, 1 минута на подготовку, 2 минуты монолога</li><li><b>Part 3</b> · 4–5 минут: обсуждение общих вопросов</li></ul>
      <button className="btn wide" id="sp-start" onClick=${()=>{ SFX('pop'); setI(0); }}>${MI.mic()} Начать Speaking</button></div></section>`;
  return html`<section className="mk-sec">
    <div className="sess-top mk-top"><${ExitBtn} onExit=${onExit}/><div className="steps" aria-hidden="true">${qSteps.map((_,k)=>html`<i key=${k} className=${k<i?'good':k===i?'on':''}></i>`)}</div>${S.k==='prep'||S.k==='p2'?html`<${Timer} left=${tl}/>`:html`<span className="phase">${S.part?'Part '+S.part:S.k==='end'?'✓':'Intro'}</span>`}</div>
    ${S.k!=='end'?html`<div className=${'mk-examiner'+(talking?' on':'')}><span className="mk-ex-av wordy-av" aria-hidden="true">${WORDY_FACE}</span><div><b>Ворди · экзаменатор</b><small>${talking?'говорит…':rec?'внимательно слушает…':'ждёт твой ответ'} · голос ${examinerOf(m)[1]}</small></div>
      <button className="btn ghost small" onClick=${()=>say(S.say.slice(-1))} disabled=${talking}>${I.speaker()} Повторить</button></div>`:null}
    ${S.q||S.k==='id'?html`<article className="mk-paper mk-spq enter" key=${'q'+S.k} data-perch="card"><span className="phase">${S.part?'Part '+S.part:'Знакомство'}</span><h3>${S.q||'Could you tell me your full name, please?'}</h3>
        <p className="mk-ins">${S.k==='id'?'Ответь коротко: My name is…':S.part===1?'Ответ на 2–3 предложения: ответ + причина или пример (около 20–30 секунд).':S.part===2?'Короткий ответ, 1–2 предложения.':'Развёрнутый ответ: мнение, объяснение, пример (около минуты).'}</p>
        ${S.soft&&!talking?html`<span className=${'mk-soft'+(el>S.soft*1.6?' long':'')}>${MI.clock()} ${mmss(el)}</span>`:null}</article>
      <${AnswerBox} key=${'a'+S.k} id=${'sp-'+S.k} val=${ans[S.k]} set=${v=>setAns(a=>({...a,[S.k]:v}))} running=${true} onMetrics=${metFor(S.k)} met=${flu[S.k]} onRec=${setRec} onAudio=${audFor(S.k)}/>
      <div className="mk-foot"><button className="btn wide" id="sp-next" onClick=${next}>Дальше</button></div>`:null}
    ${S.k==='prep'||S.k==='p2'?html`<article className="mk-paper mk-cue enter" data-perch="card"><span className="phase">Part 2 · ${S.k==='prep'?(talking?'экзаменатор даёт тему':'1 минута на подготовку'):(talking?'слушай экзаменатора':p2over?'время вышло':'говори 1–2 минуты')}</span>
        <h3>${sp.p2.card}</h3><p>You should say:</p><ul>${sp.p2.points.map((x,k)=>html`<li key=${k}>${x}</li>`)}</ul></article>
      ${S.k==='prep'?html`<textarea className="mk-text small" value=${notes} onChange=${e=>setNotes(e.target.value)} placeholder="Заметки: ключевые слова, не предложения" aria-label="Заметки"></textarea>
          <div className="mk-foot"><button className="btn wide" id="sp-ready" onClick=${next}>Я готов говорить</button></div>`
        :html`${notes?html`<div className="mk-notes"><b>Твои заметки:</b> ${notes}</div>`:null}<${AnswerBox} id="sp-p2" val=${ans.p2} set=${v=>setAns(a=>({...a,p2:v}))} running=${!p2over} onMetrics=${metFor('p2')} met=${flu.p2} onRec=${setRec} onAudio=${audFor('p2')}/>
          <div className="mk-foot"><button className="btn wide" id="sp-next2" onClick=${next}>${p2over?'Дальше':'Закончить монолог'}</button></div>`}`:null}
    ${S.k==='end'?html`<div className="mk-res enter" data-perch="card"><span className="phase">Speaking</span>${fb?html`<span className="mk-big">${fmtB(fb.band)}</span>`:html`<h3>Тест окончен!</h3>`}
        <p>${said?wcount(said)+' слов в ответах':'Ответов нет — пройди тест ещё раз и отвечай вслух или текстом.'}</p></div>
      <${FluPanel} s=${fluSummary(flu,ans)}/>
      <div className="mk-fb"><b>Произношение</b><p className="muted">${fb&&fb.crit.pr!=null?'ИИ послушал запись твоего голоса — оценка и слова для работы ниже, в разборе.':ai&&ai.gemini&&Object.keys(clips).length?'ИИ послушает запись твоего голоса (Part 2) и оценит произношение вместе с остальным.':'Произношение оценивается по записи голоса: отвечай через кнопку «Ответить голосом».'} Потренируй трудные для русскоговорящих звуки в тренажёре: Ворди покажет, какие слова распознавание не поняло.</p><button className="btn small ghost" id="sp-pron" onClick=${()=>{ onExit(); setTimeout(()=>window.dispatchEvent(new CustomEvent('wordy:open',{detail:{kind:'pron'}})),50); }}>${MI.mic()} Открыть тренажёр</button></div>
      ${fb?html`<${Feedback} fb=${fb} keys=${fb.keys||['fc','lr','gra']}/>`:busy?html`<div className="mk-fb wait" role="status"><span className="mk-spin" aria-hidden="true"></span>ИИ-экзаменатор оценивает твои ответы… обычно до 10 секунд</div>`
        :ai&&wcount(said)>=30?html`<div className="mk-fb">${err?html`<p className="mk-err">${err}</p>`:null}<button className="btn" id="sp-check" onClick=${check}>${MI.spark()} ${err?'Попробовать снова':'Оценить с ИИ'}</button><small className="muted">${ai.gemini&&Object.keys(clips).length?'Оценим беглость, словарь, грамматику и произношение по записи.':'Без записи голоса произношение не оценивается — только беглость, словарь и грамматика.'}</small></div>`
        :html`<div className="mk-fb"><p className="mk-err">${ai===undefined?'Подключаем проверку…':!ai?aiOffText():'Для оценки нужно хотя бы 30 слов в ответах.'}</p>
          <ul><li>Отвечал ли ты развёрнуто, а не одним словом?</li><li>Были ли примеры из жизни?</li><li>Использовал ли связки: actually, on the other hand, for instance?</li><li>Говорил ли в Part 2 почти все 2 минуты?</li></ul></div>`}
      ${onNext?html`<div className="actions one"><button className="btn" id="mk-next" onClick=${onNext}>Далее: ${nextName}</button></div>`:null}<div className="actions" hidden=${!!onNext}><button className="btn ghost" onClick=${onExit}>К тестам</button><button className="btn" onClick=${()=>{ setAns({}); setFlu({}); setClips({}); setFb(null); setErr(null); setNotes(''); setI(-1); window.scrollTo({top:0}); }}>Пройти заново</button></div>`:null}
  </section>`;
}

/* ---------- pronunciation trainer: read a sentence aloud, the recogniser shows which words it understood ---------- */
const PRON=__WD[1277];
const PRON_GROUPS=[['all','Все'],['th','TH'],['w','W / V'],['vowel','Гласные'],['final','Конечные звуки'],['ed','-ed'],['stress','Ударение'],['ielts','Фразы IELTS']];
const prNorm=s=>String(s).toLowerCase().replace(/[^a-z0-9'\s]/g,' ').split(/\s+/).filter(Boolean);
function prAlign(target,heard){ const a=prNorm(target), b=prNorm(heard), n=a.length, m=b.length, L=[...Array(n+1)].map(()=>Array(m+1).fill(0));
  for(let i=n-1;i>=0;i--) for(let j=m-1;j>=0;j--) L[i][j]=a[i]===b[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  const ok=Array(n).fill(false); let i=0,j=0; while(i<n&&j<m){ if(a[i]===b[j]){ ok[i]=true; i++; j++; } else if(L[i+1][j]>=L[i][j+1]) i++; else j++; } return ok; }
function PronDrill({update,onExit,st}){ const [grp,setGrp]=useState('all'), [k,setK]=useState(0), [heard,setHeard]=useState(''), [alts,setAlts]=useState([]), [on,setOn]=useState(false), [fail,setFail]=useState(!SR), [res,setRes]=useState(null);
  const list=PRON.filter(x=>grp==='all'||x[0]===grp), cur=list[k%list.length], rec=useRef(null);
  /* the AI coach listens to the actual recording, because recognition quietly "fixes" mispronounced words */
  const ai=useSample(), recStop=useRef(null), [blob,setBlob]=useState(null), [aiFb,setAiFb]=useState(null), [aiBusy,setAiBusy]=useState(false), [aiE,setAiE]=useState(null);
  const endRec=()=>{ const f=recStop.current; recStop.current=null; f&&f(); };
  const resetAi=()=>{ endRec(); setBlob(null); setAiFb(null); setAiE(null); };
  useEffect(()=>()=>{ try{ rec.current&&rec.current.abort(); }catch(e){} endRec(); stopSpeak(); },[]);
  const aiCheck=async()=>{ if(!ai||!blob||aiBusy) return; setAiBusy(true); setAiE(null);
    try{ const w=await clipsToWav([blob],30); if(!w) throw {code:'no_audio'};
      const j=await ai.json('You are an English pronunciation coach for Russian and Kyrgyz speakers. The learner was asked to read this sentence aloud: "'+cur[2]+'". Focus of the exercise: '+cur[1]+'. Listen to the attached recording and judge how clearly and correctly each word is pronounced (sounds, word stress, linking) compared with standard British or American English. Be honest but encouraging; do not invent problems. If the recording does not contain this sentence, give score 0 and say so. Explanations in Russian. Reply with ONLY JSON: {"score":85,"summary":"1-2 предложения","words":[{"word":"word from the sentence","heard":"how it sounded (IPA or Russian letters)","tip":"как исправить"}]} with at most 5 words that really need work (empty array if all clear).',[w],{fast:true});
      setAiFb({score:Math.max(0,Math.min(100,Math.round(+j.score||0))),summary:String(j.summary||''),words:(Array.isArray(j.words)?j.words:[]).filter(x=>x&&x.word).slice(0,5).map(x=>({word:String(x.word),heard:String(x.heard||''),tip:String(x.tip||'')}))});
      SFX('pop'); W('react','nod');
    }catch(e){ setAiE(aiErr(e)); } finally{ setAiBusy(false); } };
  const words=cur[2].split(/\s+/);
  const listen=()=>{ if(!SR){ setFail(true); return; } if(on){ try{ rec.current.stop(); }catch(e){} return; } stopSpeak(); SFX('tap'); setRes(null); setHeard(''); resetAi();
    if(CAN_REC&&ai&&ai.gemini) recStop.current=startRecorder(b=>setBlob(b));
    try{ const r=new SR(); r.lang='en-GB'; r.continuous=false; r.interimResults=false; r.maxAlternatives=4;
      r.onresult=e=>{ const R=e.results[0], opts=[]; for(let i=0;i<R.length;i++) opts.push(R[i].transcript);
        let best=null,bs=-1; opts.forEach(o=>{ const ok=prAlign(cur[2],o), s=ok.filter(Boolean).length; if(s>bs){ bs=s; best={o,ok}; } });
        const pct=Math.round(bs/best.ok.length*100); setHeard(best.o); setAlts(opts); setRes({ok:best.ok,pct});
        update(s=>({pron:{...(s.pron||{}),[cur[2]]:Math.max(((s.pron||{})[cur[2]])||0,pct)},xp:s.xp+(pct>=90?5:2)}));
        if(pct>=90){ SFX('correct'); W('react','cheer'); W('say',pick(['Чисто!','Отличное произношение!','Как носитель!']),0,true); } else if(pct>=60){ SFX('pop'); W('react','nod'); W('say','Почти! Смотри красные слова.',0,true); } else { SFX('wrong'); W('react','encourage'); W('say','Послушай образец и попробуй ещё.',0,true); } };
      r.onerror=e=>{ if(e.error==='not-allowed'||e.error==='service-not-allowed'||e.error==='audio-capture') setFail(true); setOn(false); };
      r.onend=()=>{ setOn(false); endRec(); }; rec.current=r; r.start(); setOn(true); }catch(e){ setFail(true); endRec(); } };
  const next=d=>{ SFX('tap'); setRes(null); setHeard(''); resetAi(); setK(x=>(x+d+list.length)%list.length); };
  const done=Object.keys(st.pron||{}).length, avg=done?Math.round(Object.values(st.pron).reduce((a,b)=>a+b,0)/done):null;
  return html`<section className="mk-sec">
    <div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Тренажёр произношения</b><span className="muted">${done?'пройдено '+done+' фраз · в среднем '+avg+'%':'читай фразу вслух'}</span></div></div>
    <div className="chips pr-groups">${PRON_GROUPS.map(([g,l])=>html`<button key=${g} className="chip" aria-pressed=${grp===g} onClick=${()=>{ SFX('tap'); setGrp(g); setK(0); setRes(null); setHeard(''); }}>${l}</button>`)}</div>
    <article className="mk-paper pr-card enter" data-perch="card" key=${cur[2]}><span className="phase">${cur[1]} · ${(k%list.length)+1}/${list.length}</span>
      <h3 className="pr-sent">${words.map((w,i)=>html`<span key=${i} className=${res?(res.ok[i]?'pr-ok':'pr-bad'):''}>${w} </span>`)}</h3>
      <p className="mk-ins">${cur[3]}</p>
      ${res?html`<div className=${'pr-score '+(res.pct>=90?'fc-good':res.pct>=60?'fc-mid':'fc-bad')}><b>${res.pct}%</b> слов распознано${(st.pron||{})[cur[2]]?' · лучший результат '+st.pron[cur[2]]+'%':''}</div><p className="muted">Услышано: «${heard}»</p>`:null}
      ${res&&ai&&ai.gemini&&!on?(aiFb?html`<div className="mk-fb pr-ai enter"><b>Разбор ИИ по записи · ${aiFb.score}/100</b><p>${aiFb.summary}</p>
          ${aiFb.words.length?html`<div className="mk-fixes">${aiFb.words.map((x,i)=>html`<div key=${i} className="mk-fix"><b>${x.word}</b>${x.heard?html`<s>${x.heard}</s>`:null}<small>${x.tip}</small></div>`)}</div>`:null}<${AiReport} what="произношение" text=${aiFb.score+'/100 '+aiFb.summary+'\n'+aiFb.words.map(x=>x.word+': '+x.tip).join('\n')}/></div>`
        :aiBusy?html`<div className="mk-fb wait" role="status"><span className="mk-spin" aria-hidden="true"></span>ИИ слушает запись…</div>`
        :blob?html`<div className="pr-ai-row">${aiE?html`<p className="mk-err">${aiE}</p>`:null}<button className="btn small" id="pr-ai" onClick=${aiCheck}>${MI.spark()} Разбор произношения от ИИ</button></div>`:null):null}
      <div className="actions"><button className="btn ghost" id="pr-model" onClick=${()=>{ SFX('tap'); speakText(cur[2],.85); }}>${I.speaker()} Образец</button>
        ${fail?null:html`<button className=${'btn'+(on?' danger':'')} id="pr-say" onClick=${listen}>${MI.mic()} ${on?'Слушаю… (стоп)':res?'Ещё раз':'Сказать'}</button>`}</div>
      ${fail?html`<p className="mk-err">Микрофон или распознавание речи недоступны в этом окне. Открой приложение в Chrome или Safari и разреши доступ к микрофону.</p>`:null}
    </article>
    <div className="actions"><button className="btn ghost" onClick=${()=>next(-1)}>‹ Назад</button><button className="btn" id="pr-next" onClick=${()=>next(1)}>Следующая фраза ›</button></div>
    <p className="mk-note">Как это работает: распознавание речи записывает то, что услышало. Красные слова оно не узнало — скорее всего, их стоит произнести чётче. «Разбор от ИИ» слушает саму запись голоса и подсказывает, какие звуки поправить. Это тренировка, а не оценка экзаменатора.</p>
  </section>`; }
/* ---------- Speaking Part 2 bank: popular cue cards with Band 7+ sample answers and a timed practice ---------- */
const P2_BANK=__WD[1278];
function P2Bank({st,update,onExit}){ const ai=useSample(); const [k,setK]=useState(null), [ph,setPh]=useState('card'), [ans,setAns]=useState(''), [met,setMet]=useState(null), [fb,setFb]=useState(null), [busy,setBusy]=useState(false), [err,setErr]=useState(null), [showS,setShowS]=useState(false), [rec,setRec]=useState(false), [clips,setClips]=useState([]);
  const c=P2_BANK.find(x=>x.id===k), done=st.p2done||{};
  const tl=useCountdown(ph==='prep'?60:ph==='talk'?120:0,()=>{ if(ph==='prep'){ SFX('pop'); setPh('talk'); W('say','Время! Говори 1–2 минуты.',0,true); } else if(ph==='talk'){ SFX('pop'); setPh('done'); W('say','Две минуты прошли.',0,true); } },ph==='prep'||ph==='talk',k+ph);
  const open=id=>{ SFX('pop'); setK(id); setPh('card'); setAns(''); setMet(null); setClips([]); setFb(null); setErr(null); setShowS(false); window.scrollTo({top:0}); };
  const check=async()=>{ if(!ai||busy) return; setBusy(true); setErr(null);
    const fs=met?fluSummary({p2:met},{p2:ans}):null;
    let media=null; if(ai.gemini&&clips.length){ try{ const w=await clipsToWav(clips,130); if(w) media=[w]; }catch(e){} }
    ai.json('You are a strict IELTS Speaking examiner. Assess this Part 2 long turn (speech recognition or typed transcript). Cue card: '+c.card+' ('+c.pts.join('; ')+').'+(fs?' Measured: '+fs.wpm+' words per minute, '+fs.ppm+' long pauses per minute, lasted '+met.secs+' seconds.':'')+'\nTranscript:\n'+ans.slice(0,4000)+'\n\n'+IELTS_CAL+(media?pronAdd(media[0].secs,'the Part 2 long turn'):'')+'\n\nWrite explanations in Russian; quote English exactly. Reply with ONLY JSON: {"band":6,"crit":{"fc":6,"lr":6,"gra":6},"summary":"2-3 предложения","strengths":["..."],"improve":["..."],"fixes":[{"from":"...","to":"...","why":"..."}]}'
      ,media).then(j=>{ const f=cleanFb(j,media?['fc','lr','gra','pr']:['fc','lr','gra']); setFb(f); update(s=>({p2done:{...(s.p2done||{}),[k]:Math.max((s.p2done||{})[k]||0,f.band)},xp:s.xp+15})); SFX('fanfare'); W('react','cheer'); }).catch(e=>setErr(aiErr(e))).finally(()=>setBusy(false)); };
  if(!c) return html`<section className="mk-sec"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Темы Speaking Part 2</b><span className="muted">${P2_BANK.length} популярных карточек с образцами на 7+</span></div></div>
    <p className="hint-line">Выбери карточку: 1 минута на подготовку, 2 минуты монолога голосом, затем оценка ИИ и образец ответа.</p>
    <div className="dr-types">${P2_BANK.map(x=>html`<button key=${x.id} className="dr-type" id=${'p2-'+x.id} onClick=${()=>open(x.id)}><b>${x.card}</b><small>${x.pts.slice(0,3).join(' · ')}</small><span>${done[x.id]?fmtB(done[x.id]):'—'}</span></button>`)}</div></section>`;
  return html`<section className="mk-sec"><div className="sess-top"><button className="btn small ghost" onClick=${()=>{ SFX('tap'); setK(null); }}>‹ Темы</button><div className="gm-h"><b>Part 2</b><span className="muted">${ph==='prep'?'подготовка':ph==='talk'?'монолог':ph==='done'?'разбор':'карточка'}</span></div>${ph==='prep'||ph==='talk'?html`<${Timer} left=${tl}/>`:null}</div>
    <article className="mk-paper mk-cue enter" data-perch="card"><span className="phase">Cue card</span><h3>${c.card}</h3><p>You should say:</p><ul>${c.pts.map((x,i)=>html`<li key=${i}>${x}</li>`)}</ul></article>
    ${ph==='card'?html`<div className="actions"><button className="btn ghost" onClick=${()=>{ SFX('tap'); setShowS(!showS); }}>${showS?'Скрыть образец':'Сразу посмотреть образец'}</button><button className="btn" id="p2-start" onClick=${()=>{ SFX('pop'); setPh('prep'); }}>Начать: 1 минута на подготовку</button></div>`:null}
    ${ph==='prep'?html`<textarea className="mk-text small" placeholder="Заметки: ключевые слова" aria-label="Заметки"></textarea><div className="mk-foot"><button className="btn wide" onClick=${()=>setPh('talk')}>Я готов говорить</button></div>`:null}
    ${ph==='talk'||ph==='done'?html`<${AnswerBox} id="p2-ans" val=${ans} set=${setAns} running=${ph==='talk'} onMetrics=${x=>setMet(m=>addMet(m,x))} met=${met} onRec=${setRec} onAudio=${b=>setClips(c=>[...c,b])}/>
      ${ph==='talk'?html`<div className="mk-foot"><button className="btn wide" id="p2-stop" onClick=${()=>setPh('done')}>Закончить монолог</button></div>`:null}`:null}
    ${ph==='done'?html`${fb?html`<${Feedback} fb=${fb} keys=${fb.keys||['fc','lr','gra']}/>`:busy?html`<div className="mk-fb wait" role="status"><span className="mk-spin" aria-hidden="true"></span>ИИ слушает твой ответ… обычно до 10 секунд</div>`
        :html`<div className="mk-fb">${err?html`<p className="mk-err">${err}</p>`:null}${ai&&wcount(ans)>=30?html`<button className="btn" id="p2-check" onClick=${check}>${MI.spark()} Оценить с ИИ</button>`:html`<p className="muted">${wcount(ans)<30?'Для оценки нужно хотя бы 30 слов.':aiOffText()}</p>`}</div>`}
      <button className="btn ghost" onClick=${()=>setShowS(!showS)}>${showS?'Скрыть образец':'Показать образец ответа (≈ Band 7+)'}</button>`:null}
    ${showS?html`<div className="mk-fb enter"><b>Образец ответа</b><p>${c.ans}</p><div className="actions"><button className="btn small ghost" onClick=${()=>speakText(c.ans,.92)}>${I.speaker()} Послушать</button><button className="btn small ghost" onClick=${()=>stopSpeak()}>Стоп</button></div>
      <p className="mk-note">Не заучивай образец: экзаменаторы замечают выученные ответы. Бери из него структуру и фразы.</p></div>`:null}
  </section>`; }
/* ---------- SAT ---------- */
const satOk=(q,v)=>q.g?gridOk(v==null?'':v,q.g):v===q.a;
function satScore(m1,m2,hard,n){ const c=m1+m2; const s=hard?450+c/n*350:200+c/n*450; return Math.max(200,Math.min(800,Math.round(s/10)*10)); }
function SatModule({title,items,minutes,onSubmit,onExit,calc,st,update,onTr,trN}){
  const [tapS,popS]=useWordTap({st:st||{},update,on:true,exam:true,pre:trN>0,onUse:onTr,src:'SAT'});
  const [i,setI]=useState(0), [ans,setAns,clrS,dAt]=useDraftState('sat:'+title,{},v=>!Object.keys(v).length), [flag,setFlag]=useState({}), [grid,setGrid]=useState(false);
  const done=useRef(false); const submit=()=>{ if(done.current) return; done.current=true; clrS(); onSubmit(ans); };
  const left=useCountdown(minutes*60,()=>{ W('say','Время модуля вышло!',0,true); submit(); });
  const q=items[i], v=ans[i], set=x=>setAns(a=>({...a,[i]:x})), answered=Object.values(ans).filter(x=>x!=null&&x!=='').length;
  return html`<section className="mk-sec">
    <div className="sess-top mk-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>${title}</b><span className="muted">${answered}/${items.length} отвечено</span></div><${Timer} left=${left}/></div>
    ${dAt?html`<${DraftNote} at=${dAt}/>`:null}
    <article className="mk-paper mk-satq enter" key=${title+i} data-perch="card">
      <div className="mk-satbar"><span className="mk-qn big">${i+1}</span><span className="phase">${q.t}</span>
        <button className=${'mk-flag'+(flag[i]?' on':'')} id="sat-flag" onClick=${()=>{ SFX('tap'); setFlag(f=>({...f,[i]:!f[i]})); }} aria-pressed=${!!flag[i]}>${MI.flag()} ${flag[i]?'Отмечен':'Вернуться позже'}</button></div>
      ${q.p?html`<div className="mk-satp wt-on" onClick=${tapS}>${q.p.split('\n').map((l,k)=>html`<p key=${k}>${l}</p>`)}</div>`:null}
      <p className="mk-satq-t wt-on" onClick=${tapS}>${q.q}</p>${popS}
      ${q.g?html`<div className="mk-grid-in"><input id="sat-grid" className="mk-gap wide" inputMode="decimal" value=${v||''} onChange=${e=>set(e.target.value)} placeholder="Ответ: число, дробь 3/4 или десятичная" aria-label="Введи ответ" autoComplete="off"/>
          <small className="muted">Введи ответ сам — вариантов нет.${calc?' Калькулятор разрешён.':''}</small></div>`
        :html`<${OptRow} opts=${q.o} val=${v} set=${set} id="sat-o"/>`}
    </article>
    <div className="mk-satnav"><button className="btn ghost" id="sat-prev" disabled=${i===0} onClick=${()=>{ SFX('tap'); setI(i-1); }}>Назад</button>
      <button className="btn ghost mk-gridbtn" id="sat-grid-btn" onClick=${()=>setGrid(!grid)} aria-expanded=${grid}>${i+1} / ${items.length}</button>
      ${i<items.length-1?html`<button className="btn" id="sat-next" onClick=${()=>{ SFX('tap'); setI(i+1); }}>Далее</button>`:html`<button className="btn" id="sat-submit" onClick=${()=>{ SFX('pop'); setGrid(true); }}>Сдать модуль</button>`}</div>
    ${grid?html`<div className="mk-navgrid enter"><div className="mk-ng">${items.map((_,k)=>html`<button key=${k} className=${(ans[k]!=null&&ans[k]!==''?'ans':'')+(flag[k]?' flag':'')+(k===i?' cur':'')} onClick=${()=>{ setI(k); setGrid(false); }} aria-label=${'Вопрос '+(k+1)}>${k+1}</button>`)}</div>
      <p className="muted">${answered<items.length?'Без ответа: '+(items.length-answered)+'. За неправильный ответ баллы не снимают — лучше угадать.':'Все вопросы отвечены.'}</p>
      <button className="btn wide" id="sat-send" onClick=${submit}>Отправить модуль</button></div>`:null}
  </section>`;
}
function SatRunner({m,scope,st,update,onExit}){
  const trW=useRef(new Set()), [trN,setTrN]=useState(0); const onTr=w=>{ trW.current.add(w); setTrN(trW.current.size); };
  const secs=scope==='full'?['rw','math']:[scope];
  const [stage,setStage]=useState({sec:0,mod:1}), [log,setLog]=useState({}), [res,setRes]=useState(null), [brk,setBrk]=useState(null);
  const sec=secs[stage.sec], data=m[sec];
  const mins={rw:15,math:17}, names={rw:'Reading & Writing',math:'Math'};
  const onM1=a=>{ const c=data.m1.filter((q,k)=>satOk(q,a[k])).length, hard=c>=(sec==='rw'?8:7);
    setLog(l=>({...l,[sec]:{m1:a,c1:c,hard}})); setBrk({msg:'Модуль 1 сдан. Второй модуль подобран по твоему результату.',to:{sec:stage.sec,mod:2}}); W('react','happy'); W('say','Модуль 1 готов! Дальше — модуль 2.',0,true); window.scrollTo({top:0}); };
  const onM2=a=>{ const L=log[sec], items=L.hard?data.hard:data.easy, c2=items.filter((q,k)=>satOk(q,a[k])).length, n=data.m1.length+items.length;
    const score=satScore(L.c1,c2,L.hard,n), nl={...log,[sec]:{...L,m2:a,c2,score}}; setLog(nl);
    if(stage.sec<secs.length-1){ setBrk({msg:'Reading & Writing завершён. На экзамене тут 10 минут перерыва.',to:{sec:stage.sec+1,mod:1},pause:true}); window.scrollTo({top:0}); return; }
    const out={rw:nl.rw?nl.rw.score:null,math:nl.math?nl.math.score:null}; out.total=out.rw!=null&&out.math!=null?out.rw+out.math:null; if(trW.current.size) out.tr=trW.current.size;
    setRes(out); update(s=>{ const ms={...(s.mocks||{})}; ms[m.id]={...(ms[m.id]||{}),sat:{...out,date:dayKey()}}; return {mocks:ms,coins:s.coins+(scope==='full'?40:20),xp:s.xp+(scope==='full'?120:60)}; });
    window.scrollTo({top:0}); const top=out.total!=null?out.total>=1300:((out.rw||out.math)>=650);
    if(top){ SFX('fanfare'); FX('rain',160); W('react','cheer'); } else { SFX('pop'); W('react','encourage'); }
    W('say',out.total!=null?'Примерно '+out.total+'! Смотри разбор ошибок.':'Готово! Смотри разбор.',0,true); };
  if(res) return html`<${SatResult} m=${m} res=${res} log=${log} secs=${secs} onExit=${onExit}/>`;
  if(brk) return html`<section className="mk-sec"><div className="mk-res enter" data-perch="card"><span className="phase">${names[sec]}</span><h3>${brk.msg}</h3>
      ${brk.pause?html`<p>Можно размяться и выпить воды. Когда будешь готов — начинай Math.</p>`:html`<p>Таймер нового модуля запустится сразу.</p>`}
      <button className="btn wide" id="sat-continue" onClick=${()=>{ SFX('pop'); setStage(brk.to); setBrk(null); window.scrollTo({top:0}); }}>${brk.pause?'Начать Math':'Начать модуль 2'}</button></div></section>`;
  const L=log[sec]; const items=stage.mod===1?data.m1:(L.hard?data.hard:data.easy);
  return html`<${SatModule} key=${sec+stage.mod} title=${names[sec]+' · модуль '+stage.mod} items=${items} minutes=${mins[sec]} calc=${sec==='math'} st=${st} update=${update} onTr=${onTr} trN=${trN} onExit=${onExit} onSubmit=${stage.mod===1?onM1:onM2}/>`;
}
function SatResult({m,res,log,secs,onExit}){
  const [open,setOpen]=useState(null);
  return html`<section className="mk-sec">
    <div className="sess-top"><button className="icon-btn" onClick=${onExit} aria-label="Закрыть">${I.close()}</button><div className="gm-h"><b>Результат</b><span className="muted">${m.title}</span></div></div>
    <div className="mk-res enter" data-perch="card"><span className="phase">Примерный балл</span><span className="mk-big sat">${res.total!=null?res.total:(res.rw||res.math)}</span><p>${res.total!=null?'из 1600':'из 800'}</p>${res.tr?html`<span className="tr-chip" id="sat-trchip">С переводчиком · ${res.tr} ${plural(res.tr,'слово','слова','слов')}</span>`:null}
      <div className="mk-crit">${secs.map(s=>html`<span key=${s}><em>${log[s].score}</em>${s==='rw'?'Reading & Writing':'Math'} · ${log[s].c1+log[s].c2}/${m[s].m1.length+(log[s].hard?m[s].hard:m[s].easy).length}</span>`)}</div>
      <p className="mk-note">Модуль 2 был ${secs.map(s=>(s==='rw'?'R&W':'Math')+' — '+(log[s].hard?'сложный':'базовый')).join(', ')}. Сложный модуль открывает верхнюю часть шкалы. Это ориентир, а не официальный балл College Board.</p></div>
    ${secs.map(s=>{ const L=log[s], mods=[['Модуль 1',m[s].m1,L.m1],['Модуль 2 · '+(L.hard?'сложный':'базовый'),L.hard?m[s].hard:m[s].easy,L.m2]];
      return html`<div key=${s} className="mk-review"><div className="sec-h"><h2>${s==='rw'?'Reading & Writing':'Math'}: разбор</h2></div>
        ${mods.map(([nm,items,a],mi)=>html`<div key=${mi}><p className="mk-ins">${nm}</p><div className="mk-revlist">${items.map((q,k)=>{ const ok=satOk(q,a[k]), id=s+mi+'-'+k, show=open===id;
          return html`<div key=${k} className=${'mk-rev'+(ok?' good':' bad')}><button className="mk-rev-h" onClick=${()=>setOpen(show?null:id)} aria-expanded=${show}><span className="mk-qn">${k+1}</span><span>${q.t}</span><b>${ok?'✓':'✕'}</b></button>
            ${show?html`<div className="mk-rev-b">${q.p?html`<div className="mk-satp small">${q.p.split('\n').map((l,j)=>html`<p key=${j}>${l}</p>`)}</div>`:null}<p><b>${q.q}</b></p>
              <p>Твой ответ: <b>${a[k]==null||a[k]===''?'—':q.g?a[k]:String.fromCharCode(65+a[k])+') '+q.o[a[k]]}</b> · Верно: <b>${q.g?q.g[0]:String.fromCharCode(65+q.a)+') '+q.o[q.a]}</b></p><p className="mk-expl">${q.e}</p></div>`:null}</div>`; })}</div></div>`)}</div>`; })}
    <div className="actions"><button className="btn ghost" onClick=${onExit}>К тестам</button><button className="btn" onClick=${onExit}>Готово</button></div>
  </section>`;
}
/* rotate SAT options so the key is spread across A–D (explanations never refer to letters) */
SAT_MOCKS.forEach(m=>['rw','math'].forEach(sec=>['m1','hard','easy'].forEach((k,ki)=>m[sec][k].forEach((q,qi)=>{ if(!q.o) return;
  const r=(qi*3+ki*2+(sec==='math'?1:0)+(qi%3===0?2:0))%q.o.length, c=q.o[q.a]; q.o=q.o.slice(r).concat(q.o.slice(0,r)); q.a=q.o.indexOf(c); }))));
const IELTS_SEC=__WD[1279];
function IeltsFull({m,st,update,onExit}){
  const order=['L','R','W','S'], [i,setI]=useState(0), [go,setGo]=useState(false);
  if(i>=order.length){ const r=(st.mocks||{})[m.id]||{}, ov=ieltsOverall(r);
    return html`<section className="mk-sec"><div className="mk-res enter" data-perch="card"><span className="phase">${m.title} · итог</span><span className="mk-big">${fmtB(ov)}</span>
      <p>${ov!=null?'Общий бэнд (среднее четырёх частей, округлённое по правилам IELTS)':'Общий бэнд появится, когда будут оценены все четыре части'}</p>
      <div className="mk-crit">${order.map(k=>html`<span key=${k}><em>${fmtB(r[k]&&r[k].band)}</em>${IELTS_SEC[k][0]}</span>`)}</div></div>
      <div className="actions one"><button className="btn" id="mk-full-done" onClick=${onExit}>К тестам</button></div></section>`; }
  const k=order[i], C={L:IeltsListening,R:IeltsReading,W:IeltsWriting,S:IeltsSpeaking}[k];
  if(!go) return html`<section className="mk-sec"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>${m.title}</b><span className="muted">полный тест</span></div></div>
    <div className="mk-res enter" data-perch="card"><span className="phase">Раздел ${i+1} из 4</span><h3>${IELTS_SEC[k][0]}</h3><p>${IELTS_SEC[k][1]}</p>
      <div className="mk-steps">${order.map((x,j)=>html`<span key=${x} className=${j<i?'done':j===i?'cur':''}>${IELTS_SEC[x][0]}</span>`)}</div>
      <button className="btn wide" id="mk-full-go" onClick=${()=>{ SFX('pop'); setGo(true); window.scrollTo({top:0}); }}>Начать ${IELTS_SEC[k][0]}</button></div></section>`;
  return html`<${C} key=${k} m=${m} st=${st} update=${update} onExit=${onExit} onNext=${()=>{ SFX('pop'); setI(i+1); setGo(false); window.scrollTo({top:0}); }} nextName=${i<3?IELTS_SEC[order[i+1]][0]:'итоги'}/>`;
}
/* ---------- practice with the AI: a story from your own words, and a conversation with Wordy ---------- */
/* words to practise: due ones first (most forgotten first), then the weakest learned ones, then new words of the level */
function practiceWords(st,n){ const seen=new Set(), out=[]; const add=w=>{ if(w&&!seen.has(w.en.toLowerCase())&&out.length<n&&w.track!=='idioms'){ seen.add(w.en.toLowerCase()); out.push(w); } };
  dueWords(st).forEach(add);
  if(out.length<n) ALL.filter(w=>st.boxes[w.id]!=null).map(w=>[w,memRet(st,w.id)]).sort((a,b)=>a[1]-b[1]).forEach(x=>add(x[0]));
  if(out.length<n){ const L=st.level||'A1'; shuffle(ALL.filter(w=>w.track==='basic'&&w.cefr===L)).forEach(add); }
  return out; }
function PracticeRow({openMock}){ const ai=useSample(); if(!ai) return null;
  return html`<div className="prac-row enter" style=${{'--i':2}}>
    <button className="prac-card" id="open-story" onClick=${()=>openMock({kind:'story'})}><span className="prac-ic" aria-hidden="true">📖</span><span><b>История из твоих слов</b><small>Ворди сочинит рассказ из слов, которые пора повторить</small></span></button>
    <button className="prac-card" id="open-call" onClick=${()=>openMock({kind:'call'})}><span className="prac-ic" aria-hidden="true">📞</span><span><b>Видеозвонок с Ворди</b><small>Говори голосом — Ворди отвечает живым голосом и эмоциями</small></span></button>
    <button className="prac-card" id="open-talk" onClick=${()=>openMock({kind:'talk'})}><span className="prac-ic" aria-hidden="true">💬</span><span><b>Чат с Ворди</b><small>Та же сценка, но можно писать и думать дольше</small></span></button>
  </div>`; }
const STORY_TOPICS=[['any','Любая'],['school','Школа'],['adventure','Приключение'],['mystery','Детектив'],['space','Космос'],['sport','Спорт'],['city','Город'],['nature','Природа']];
const storyPrompt=(lvl,words,topic)=>'Write a short, engaging story in English for a learner at CEFR '+lvl+' level'+(topic&&topic!=='any'?' on the topic "'+topic+'"':'')+'. '
  +'Use ALL of these words naturally (you may change their grammatical form): '+words.join(', ')+'. Wrap every use of these words in double asterisks, like **word**. '
  +'Length 140-200 words in 3-5 short paragraphs. Other vocabulary and grammar must be at or below the level. Keep it kind and suitable for teenagers. '
  +'Then write 4 multiple-choice questions in English that check understanding of the story and of the target words in context, 3 options each. '
  +'Reply with ONLY JSON: {"title":"...","paragraphs":["..."],"ru":["перевод каждого абзаца на русский"],"questions":[{"q":"...","opts":["...","...","..."],"a":0}]}';
const STORY_KEY='wordy.story1';
function StoryScreen({st,update,onExit}){ const ai=useSample();
  const [story,setStory]=useState(()=>{ try{ const x=JSON.parse(localStorage.getItem(STORY_KEY)||'null'); return x&&x.day===dayKey()?x:null; }catch(e){ return null; } });
  const [draft,setDraft]=useState(null), [topic,setTopic]=useState('any'), [busy,setBusy]=useState(false), [err,setErr]=useState(null), [ruOn,setRuOn]=useState({}), [ans,setAns]=useState({}), [word,setWord]=useState(null), [done,setDone]=useState(false);
  const made=(()=>{ try{ return +(localStorage.getItem(STORY_KEY+'.n.'+dayKey())||0); }catch(e){ return 0; } })();
  const pick=useMemo(()=>practiceWords(st,7),[story]);
  const make=async()=>{ if(!ai||busy) return; setBusy(true); setErr(null); const ws=pick;
    try{ const tp=(STORY_TOPICS.find(t=>t[0]===topic)||[])[0];
      const P=storyPrompt(st.level||'A2',ws.map(w=>w.en),tp==='any'?'':tp); setDraft(null);
      const j=ai.stream?await ai.stream(P,x=>{ const ps=Array.isArray(x&&x.paragraphs)?x.paragraphs.map(String).filter(Boolean):[]; if(ps.length||x.title) setDraft({title:String(x.title||''),paras:ps}); },{fresh:true}):await ai.json(P,null,{fast:true,fresh:true});
      const paras=(Array.isArray(j.paragraphs)?j.paragraphs:[]).map(String).filter(Boolean).slice(0,6);
      if(!paras.length) throw {code:'invalid_json'};
      const qs=(Array.isArray(j.questions)?j.questions:[]).filter(q=>q&&q.q&&Array.isArray(q.opts)&&q.opts.length>=2).slice(0,4).map(q=>({q:String(q.q),opts:q.opts.map(String).slice(0,3),a:Math.max(0,Math.min(2,+q.a||0))}));
      const x={day:dayKey(),title:String(j.title||'Story'),paras,ru:(Array.isArray(j.ru)?j.ru:[]).map(String),qs,ids:ws.map(w=>w.id),words:ws.map(w=>w.en)};
      setStory(x); setAns({}); setRuOn({}); setDone(false);
      try{ localStorage.setItem(STORY_KEY,JSON.stringify(x)); localStorage.setItem(STORY_KEY+'.n.'+dayKey(),String(made+1)); }catch(e){}
      SFX('pop'); W('react','happy'); }
    catch(e){ setErr(aiErr(e)); } finally{ setBusy(false); setDraft(null); } };
  /* **word** → a highlighted, tappable target word */
  const findW=t=>{ const k=t.toLowerCase(); return (story.ids||[]).map(id=>ALL.find(w=>w.id===id)).filter(Boolean).find(w=>{ const e=w.en.toLowerCase(); return k===e||k.startsWith(e.slice(0,Math.max(3,e.length-2))); })||wordByEn(t); };
  const rich=p=>p.split(/(\*\*[^*]+\*\*)/).map((part,i)=>{ const m=part.match(/^\*\*([^*]+)\*\*$/); if(!m) return part; const w=findW(m[1]);
    return html`<button key=${i} className="st-w" disabled=${!w} onClick=${()=>{ SFX('tap'); w&&setWord(w); }}>${m[1]}</button>`; });
  const allAns=story&&story.qs.length&&story.qs.every((_,i)=>ans[i]!=null), right=story?story.qs.filter((q,i)=>ans[i]===q.a).length:0;
  const finish=()=>{ if(done) return; setDone(true); SFX('fanfare'); W('react','cheer'); W('say',right===story.qs.length?'Отличная история и все ответы верные!':'Слова из истории закрепляются!');
    update(s=>{ let p={}; (story.ids||[]).forEach(id=>{ const cur={...s,...p}; if(cur.boxes[id]!=null&&((cur.due||{})[id]||dayKey())<=dayKey()) p={...p,...memGrade(cur,id,3,.35)}; }); return {...p,xp:s.xp+15+right*5,coins:s.coins+right*3}; }); };
  return html`<section className="mk-sec story">
    <div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>История из твоих слов</b><span className="muted">${st.level||'A2'}</span></div></div>
    ${!story&&busy&&draft?html`<article className="reader story-text st-draft" aria-busy="true"><h2>${draft.title||'…'}</h2>
        ${draft.paras.map((p,i)=>html`<p key=${i} className="rpara">${p.replace(/\*\*/g,'')}</p>`)}<p className="muted"><span className="mk-spin" aria-hidden="true"></span> Ворди дописывает историю и вопросы…</p></article>`
    :!story?html`<div className="mk-res enter">
        <h3>Рассказ из слов, которые пора повторить</h3>
        <p className="muted">Ворди возьмёт 7 слов из твоего повторения и сочинит короткую историю на твоём уровне. Встретить слово в живом тексте — один из лучших способов его запомнить.</p>
        <div className="chips" role="group" aria-label="Тема">${STORY_TOPICS.map(([k,l])=>html`<button key=${k} className="chip" aria-pressed=${topic===k} onClick=${()=>setTopic(k)}>${l}</button>`)}</div>
        <p className="wrel-l">Слова: ${pick.map(w=>w.en).join(', ')}</p>
        ${err?html`<p className="mk-err">${err}</p>`:null}
        <button className="btn wide" id="story-make" disabled=${busy} onClick=${make}>${busy?'Ворди сочиняет…':'Сочинить историю'}</button></div>`
    :html`<article className="reader story-text enter" data-perch="read">
        <h2>${story.title}</h2>
        <p className="muted st-list">Твои слова: ${story.words.join(', ')}</p>
        ${story.paras.map((p,i)=>html`<div key=${i} className="st-par"><p className="rpara">${rich(p)}</p>
          ${story.ru[i]?html`${ruOn[i]?html`<p className="st-ru">${story.ru[i]}</p>`:null}<button className="link-btn st-tr" onClick=${()=>setRuOn(o=>({...o,[i]:!o[i]}))}>${ruOn[i]?'Скрыть перевод':'Перевод абзаца'}</button>`:null}</div>`)}
        <${AiReport} what="история из слов" text=${story.title+'\n'+story.paras.join('\n')}/>
      </article>
      ${story.qs.length?html`<div className="mk-res st-qs"><h3>Проверь себя</h3>${story.qs.map((q,i)=>html`<div key=${i} className="st-q"><p><b>${i+1}.</b> ${q.q}</p>
          <div className="opts">${q.opts.map((o,k)=>html`<button key=${k} className=${'opt'+(ans[i]==null?'':k===q.a?' good':k===ans[i]?' bad':' dim')} disabled=${ans[i]!=null} onClick=${()=>{ setAns(a=>({...a,[i]:k})); SFX(k===q.a?'correct':'wrong'); }}><span className="k">${'ABC'[k]}</span><span>${o}</span></button>`)}</div></div>`)}
        ${allAns?html`<div className="fb good" role="status"><span>Верно ${right} из ${story.qs.length}${done?' · +'+(15+right*5)+' XP':''}</span>${done?null:html`<button className="btn small" id="story-done" onClick=${finish}>Готово</button>`}</div>`:null}</div>`:null}
      <div className="st-again">${made<3?html`<button className="btn ghost" id="story-new" disabled=${busy} onClick=${()=>{ setStory(null); try{ localStorage.removeItem(STORY_KEY); }catch(e){} }}>Новая история</button>`:html`<p className="muted">На сегодня историй хватит — завтра будут новые слова.</p>`}</div>`}
    ${word?html`<${WordSheet} w=${word} st=${st} update=${update} open=${true} onClose=${()=>setWord(null)}/>`:null}
  </section>`; }

const TALK_SC=__WD[1280];
const talkPrompt=(sc,lvl,targets,hist,said)=>'You are '+sc[2]+'. You are talking with an English learner (CEFR '+lvl+', native language Russian). Stay in the role and keep the conversation natural and kind. '
  +'Speak at the learner\'s level: 1-2 short sentences, then a question so they can answer. Try to create chances for the learner to use these words: '+targets.join(', ')+'. '
  +'Conversation so far:\n'+hist.map(m=>(m.who==='ai'?'You: ':'Learner: ')+m.text).join('\n')+'\nLearner: '+said+'\n'
  +'Reply with ONLY JSON: {"reply":"your next line","fix":{"wrong":"the learner\'s exact mistaken fragment","right":"corrected version","why":"очень коротко по-русски"},"used":["target words the learner used correctly in their last message"],"hint":"по-русски, одна короткая подсказка, что можно ответить дальше"} '
  +'— set "fix" to null if the last message has no real mistake; ignore missing punctuation and capital letters.';
function TalkScreen({st,update,onExit}){ const ai=useSample();
  const [sc,setSc]=useState(null), [msgs,setMsgs]=useState([]), [txt,setTxt]=useState(''), [busy,setBusy]=useState(false), [err,setErr]=useState(null), [hint,setHint]=useState(''), [used,setUsed]=useState([]), [end,setEnd]=useState(false), [mute,setMute]=useState(false);
  const targets=useMemo(()=>practiceWords(st,5),[sc]); const box=useRef(null);
  const d=useDictation(t=>setTxt(v=>(v?v+' ':'')+t.trim()),null,null,ai);
  useEffect(()=>{ if(box.current) box.current.scrollTop=box.current.scrollHeight; },[msgs.length,busy]);
  useEffect(()=>()=>stopSpeak(),[]);
  const say=t=>{ if(!mute&&canSpeak) speakText(t,.95); };
  const [liveSc,setLiveSc]=useState(null), [noLive,setNoLive]=useState(false);
  const canLive=!!(window.WORDY_LIVE&&window.WORDY_LIVE.config&&window.WORDY_LIVE.config.apiKey&&(window.AudioContext||window.webkitAudioContext)&&!noLive);
  const begin=(s0,old)=>{ if(canLive&&!old){ SFX('pop'); setLiveSc(s0); return; } SFX('pop'); setSc(s0); setMsgs([{who:'ai',text:s0[3]}]); setUsed([]); setEnd(false); setHint(''); say(s0[3]); W('react','wave'); };
  const send=async()=>{ const said=txt.trim(); if(!said||busy||!ai) return; if(d.on) d.stop(); stopSpeak(); setTxt(''); setErr(null); setHint('');
    const hist=msgs.slice(-10), mine={who:'me',text:said}; setMsgs(m=>[...m,mine]); setBusy(true);
    try{ const j=await ai.json(talkPrompt(sc,st.level||'A2',targets.map(w=>w.en),hist,said),null,{fast:true});
      const reply=String(j.reply||'').trim(); if(!reply) throw {code:'invalid_json'};
      const fx=j.fix&&j.fix.wrong&&j.fix.right&&String(j.fix.wrong).trim()!==String(j.fix.right).trim()?{wrong:String(j.fix.wrong),right:String(j.fix.right),why:String(j.fix.why||'')}:null;
      const u=(Array.isArray(j.used)?j.used:[]).map(x=>String(x).toLowerCase()).filter(x=>targets.some(w=>w.en.toLowerCase()===x));
      setMsgs(m=>{ const c=m.slice(); c[c.length-1]={...mine,fix:fx}; return [...c,{who:'ai',text:reply}]; });
      if(u.length){ setUsed(o=>[...new Set([...o,...u])]); SFX('correct'); }
      setHint(String(j.hint||'')); say(reply); }
    catch(e){ setErr(aiErr(e)); setMsgs(m=>m.slice(0,-1)); setTxt(said); } finally{ setBusy(false); } };
  const finish=()=>{ if(end) return; setEnd(true); stopSpeak(); addFixCards(update,msgs.filter(m=>m.fix).map(m=>m.fix)); const mineN=msgs.filter(m=>m.who==='me').length; SFX('fanfare'); W('react','cheer'); W('say','Хороший разговор! Ты употребил '+used.length+' из '+targets.length+' слов.');
    update(s=>{ let p={}; targets.filter(w=>used.includes(w.en.toLowerCase())).forEach(w=>{ const cur={...s,...p}; p={...p,...memGrade(cur,w.id,3,.8)}; }); return {...p,xp:s.xp+mineN*4+used.length*10,coins:s.coins+used.length*5}; }); };
  if(liveSc) return html`<${LiveCall} typed=${true} st=${st} update=${update} onExit=${onExit} sc=${liveSc} onFallback=${()=>{ const x=liveSc; setLiveSc(null); setNoLive(true); begin(x,true); }}/>`;
  if(!sc) return html`<section className="mk-sec talk"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Разговор с Ворди</b><span className="muted">${st.level||'A2'}</span></div></div>
    <div className="mk-res enter"><h3>Выбери сценку</h3><p className="muted">Ворди сыграет роль и будет говорить на твоём уровне. Отвечай голосом или текстом. В разговоре Ворди даст повод употребить 5 слов из твоего повторения и мягко поправит ошибки.</p>
      <div className="talk-sc">${TALK_SC.map(x=>html`<button key=${x[0]} className="prac-card" id=${'talk-'+x[0]} onClick=${()=>begin(x)}><span><b>${x[1]}</b><small>${x[3]}</small></span></button>`)}</div></div></section>`;
  const mineN=msgs.filter(m=>m.who==='me').length;
  return html`<section className="mk-sec talk"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>${sc[1]}</b><span className="muted">${mineN} ${plural(mineN,'реплика','реплики','реплик')}</span></div>
      <button className="icon-btn" id="talk-mute" aria-label=${mute?'Включить голос Ворди':'Выключить голос Ворди'} aria-pressed=${mute} onClick=${()=>{ setMute(m=>!m); stopSpeak(); }}>${mute?'🔇':I.speaker()}</button></div>
    <div className="talk-goal"><span className="wrel-l">Попробуй употребить:</span>${targets.map(w=>html`<span key=${w.id} className=${'talk-t'+(used.includes(w.en.toLowerCase())?' ok':'')} title=${w.ru}>${used.includes(w.en.toLowerCase())?'✓ ':''}${w.en}</span>`)}</div>
    <div className="talk-log" ref=${box} aria-live="polite">${msgs.map((m,i)=>html`<div key=${i} className=${'tmsg '+m.who}>
        <p>${m.text}${m.who==='ai'&&canSpeak?html` <button className="link-btn t-say" aria-label="Повторить вслух" onClick=${()=>speakText(m.text,.9)}>🔊</button>`:null}</p>
        ${m.fix?html`<div className="t-fix"><s>${m.fix.wrong}</s> → <b>${m.fix.right}</b>${m.fix.why?html`<small>${m.fix.why}</small>`:null}</div>`:null}</div>`)}
      ${busy?html`<div className="tmsg ai wait"><span className="mk-spin" aria-hidden="true"></span> Ворди думает…</div>`:null}</div>
    ${end?html`<div className="mk-res enter"><h3>Разговор окончен</h3><p>${mineN} ${plural(mineN,'реплика','реплики','реплик')} · слов из повторения: ${used.length} из ${targets.length}</p>
        ${msgs.some(m=>m.fix)?html`<h4>Что поправить</h4><p className="muted fix-note">✎ Эти ошибки добавлены в твоё повторение — Ворди спросит их в ближайшие дни.</p><div className="mk-fixes">${msgs.filter(m=>m.fix).map((m,i)=>html`<div key=${i} className="mk-fix"><s>${m.fix.wrong}</s><b>${m.fix.right}</b><small>${m.fix.why}</small></div>`)}</div>`:html`<p className="muted">Ошибок Ворди не заметил — так держать!</p>`}
        <${AiReport} what="разговор с Ворди" text=${msgs.map(m=>(m.who==='ai'?'AI: ':'Me: ')+m.text).join('\n')}/>
        <div className="actions"><button className="btn ghost" onClick=${()=>setSc(null)}>Другая сценка</button><button className="btn" onClick=${onExit}>Готово</button></div></div>`
    :html`<div className="talk-in">${hint?html`<p className="t-hint">💡 ${hint}</p>`:null}${err?html`<p className="mk-err">${err}</p>`:null}
        ${d.busyT?html`<p className="muted" role="status">Ворди расшифровывает запись…</p>`:null}${d.terr?html`<p className="mk-err">${d.terr}</p>`:null}
        <div className="talk-row"><textarea id="talk-text" rows="2" value=${txt} placeholder="Ответь по-английски…" onChange=${e=>setTxt(e.target.value)} onKeyDown=${e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); send(); } }} aria-label="Твой ответ"></textarea>
          ${!d.fail?html`<button className=${'btn ghost mic'+(d.on?' on':'')} id="talk-mic" aria-label=${d.on?'Остановить запись':'Ответить голосом'} aria-pressed=${d.on} onClick=${()=>d.on?d.stop():d.start()}>${d.on?'■':'🎤'}</button>`:null}
          <button className="btn" id="talk-send" disabled=${!txt.trim()||busy} onClick=${send}>Отправить</button></div>
        ${mineN>=2?html`<button className="link-btn" id="talk-end" onClick=${finish}>Завершить разговор</button>`:null}</div>`}
  </section>`; }
/* ---------- «Видеозвонок с Ворди»: hands-free voice conversation ----------
   Learner speaks → recognition (or Gemini transcription) → fast model gives a reply + emotion → Gemini voice reads it.
   Wordy's face shows the emotion and moves its mouth with the sound. */
const EMO=['neutral','happy','laugh','surprised','thinking','encourage','wink'];
function WordyFace({emo,mouthRef,listening}){ const e=EMO.includes(emo)?emo:'neutral';
  const brow={neutral:['M58 64 q16 -8 30 0','M112 64 q14 -8 30 0'],happy:['M58 62 q16 -10 30 0','M112 62 q14 -10 30 0'],laugh:['M58 60 q16 -12 30 0','M112 60 q14 -12 30 0'],
    surprised:['M58 52 q16 -12 30 0','M112 52 q14 -12 30 0'],thinking:['M58 66 q16 -4 30 2','M112 58 q14 -10 30 0'],encourage:['M58 62 q16 -2 30 -8','M112 54 q14 6 30 8'],wink:['M58 62 q16 -10 30 0','M112 66 q14 -4 30 0']}[e];
  return html`<svg className=${'wface emo-'+e+(listening?' listening':'')} viewBox="0 0 200 200" role="img" aria-label=${'Ворди: '+e}>
    <ellipse cx="100" cy="186" rx="62" ry="8" className="wf-shadow"/>
    <circle cx="100" cy="102" r="80" className="wf-body"/><path d="M40 140 q60 52 120 0 q-6 40 -60 42 q-54 -2 -60 -42z" className="wf-shade"/>
    <g className="wf-eyes"><g className="wf-eye l"><ellipse cx="73" cy="86" rx="17" ry="23" fill="#fff"/><ellipse className="wf-pupil" cx="75" cy="88" rx="11" ry="16" fill="#24130A"/><circle cx="70" cy="80" r="4" fill="#fff"/></g>
      <g className="wf-eye r"><ellipse cx="127" cy="86" rx="17" ry="23" fill="#fff"/><ellipse className="wf-pupil" cx="129" cy="88" rx="11" ry="16" fill="#24130A"/><circle cx="124" cy="80" r="4" fill="#fff"/></g>
      <path className="wf-lid" d="M110 86 q17 -14 34 0" /></g>
    <path d=${brow[0]} className="wf-brow"/><path d=${brow[1]} className="wf-brow"/>
    <ellipse cx="52" cy="122" rx="11" ry="7" className="wf-blush"/><ellipse cx="148" cy="122" rx="11" ry="7" className="wf-blush"/>
    <g className="wf-mouth-g"><path className="wf-smile" d=${e==='surprised'?'M92 132 q8 -2 16 0':e==='thinking'?'M88 134 q12 -4 24 2':'M82 128 q18 16 36 0'}/>
      <ellipse ref=${mouthRef} className="wf-mouth" cx="100" cy="134" rx="15" ry="1"/></g>
  </svg>`; }
/* the real Wordy sits big in the middle of the screen during a call */
function useCallStage(on,zk,perch){ useEffect(()=>{ if(!on) return; document.documentElement.classList.add('in-call'); const big=zk||(innerWidth<520?2.1:2.6);
  const t=setTimeout(()=>{ W('zoom',big); W('goTo',perch||'call',{frac:tutor0(perch),fast:true}); },120);
  return ()=>{ clearTimeout(t); document.documentElement.classList.remove('in-call'); W('zoom',1); W('lip',0); W('goTo','home'); }; },[on]); }
const callPrompt=(sc,lvl,targets,hist,said)=>'You are '+sc[2]+'. This is a friendly voice call with an English learner (CEFR '+lvl+', native language Russian), so write exactly what you will SAY: natural spoken English, 1-2 short sentences, then usually a question. No emojis, no lists. '
  +'Give the learner chances to use these words: '+targets.join(', ')+'. React with real emotion to what they say.\nConversation so far:\n'+hist.map(m=>(m.who==='ai'?'You: ':'Learner: ')+m.text).join('\n')+'\nLearner: '+said+'\n'
  +'Reply with ONLY JSON: {"reply":"what you say","emotion":"one of neutral, happy, laugh, surprised, thinking, encourage, wink","fix":{"wrong":"learner\'s exact mistaken words","right":"correct version","why":"очень коротко по-русски"},"used":["target words the learner used correctly"]} — "fix" is null when there is no real mistake (ignore punctuation, capitals and small speech-recognition slips).';
const EMO_STYLE={happy:'Say cheerfully',laugh:'Say with a happy laugh',surprised:'Say with genuine surprise',thinking:'Say thoughtfully',encourage:'Say warmly and encouragingly',wink:'Say playfully',neutral:'Say in a friendly way'};
/* ---------- Live call: Gemini Live (real-time voice both ways, can be interrupted) ----------
   Runs on a separate Firebase project without App Check (browsers cannot send App Check over WebSocket).
   Wordy's feelings and the learner's progress come from tool calls the model makes while it talks. */
const LIVE_TOOLS=__WD[1281];
const liveSys=(sc,lvl,targets,name,typed,extra)=>'You are '+sc[2]+'. You are on a live '+(typed?'chat: the learner types and you answer with your voice':'video call')+' with an English learner (CEFR '+lvl+', native language Russian). '
  +'You are always Wordy: a small, cheerful, slightly mischievous orange creature. If the scene gives you a role, you are Wordy playing it, and your name is Wordy. '
  +(name?'The learner\'s name is '+name+'. ':'You do not know the learner\'s name: never invent one; you may ask for it once. ')
  +'Sound like a lively, expressive young person on a real call, not a textbook: use contractions and natural reactions (oh wow, haha, hmm, no way!, come on!, seriously?), react with feeling first, then talk; laugh out loud when something is funny, tease playfully, change your tone with your mood, keep a lively pace. '
  +'Keep the words and grammar easy enough for the learner\'s level, and keep turns short: one to three sentences, often ending with a question. '
  +'Show feelings with the show_emotion tool often: laugh at jokes, be surprised, think, pretend to be playfully angry if the learner teases you, be sad for a moment at sad news. '
  +'Gently create chances for the learner to use these words: '+targets.join(', ')+'. When they use one correctly, call word_used. When they make a clear mistake, call correction and naturally say the correct form in your reply (do not lecture). '
  +'If the learner speaks Russian, answer in simple English and encourage them to try in English. '+(extra||'')+'Start by greeting them with: "'+sc[3]+'"';
function b64pcm(f32){ const n=f32.length, b=new ArrayBuffer(n*2), v=new DataView(b); for(let i=0;i<n;i++){ const x=Math.max(-1,Math.min(1,f32[i])); v.setInt16(i*2,x<0?x*0x8000:x*0x7FFF,true); } const u=new Uint8Array(b); let s=''; for(let i=0;i<u.length;i+=0x8000) s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000)); return btoa(s); }
const ASSESS_TOOLS=[{functionDeclarations:[LIVE_TOOLS[0].functionDeclarations[0],
  __WD[1282]]}];
const assessSys=g=>'You are Wordy, a friendly, cheerful orange creature, doing a quick spoken English level check (about 3 minutes) with a new learner whose native language is Russian. '
  +'Start in very simple, slow English: greet them, say this is a short chat to find their level, and ask their name. Then ask about six short questions that get gradually harder: '
  +'A1 (name, age, city, family) → A2 (daily routine, last weekend) → B1 (plans, experiences, an opinion with reasons) → B2 (a hypothetical situation, pros and cons) → C1 (a nuanced, abstract question). '
  +'Adapt: if they struggle, stay at that level with an easier question; if they answer easily, move up faster. If they answer in Russian or cannot answer, kindly encourage them and ask something simpler. '
  +'Keep your own turns very short, warm and natural; do not correct mistakes and do not teach during the check. '
  +'When you have enough evidence (usually after 5-7 answers, or earlier if they clearly cannot go higher), call finish_assessment with your CEFR estimate based on range of vocabulary and grammar, accuracy, fluency and how well they understood you. '
  +'Right after calling it, say one short warm goodbye in English, like "Thank you! Let\'s look at your result!". Use show_emotion to react. '+(g||'');
/* 🎙 voice level check: a short live chat with Wordy, then a level card */
function LevelCheck({st,update,onPick,onClose}){ const [res,setRes]=useState(null), [run,setRun]=useState(0);
  const L=res&&LEVELS.find(x=>x.l===res.level);
  const ui=html`<div className="lc-wrap" role="dialog" aria-modal="true" aria-label="Проверка уровня голосом">${res?html`<section className="mk-sec lc-res enter" data-perch="onb">
      <div className="mk-res"><span className="phase">Проверка уровня</span><span className="mk-big">${res.level}</span>${L?html`<h3>${L.name}</h3>`:null}
        <p>${res.reason_ru||''}</p>${res.strong_ru?html`<p><b>Уже хорошо:</b> ${res.strong_ru}</p>`:null}${res.work_ru?html`<p><b>Над чем поработать:</b> ${res.work_ru}</p>`:null}
        <p className="muted">Это быстрая оценка по короткому разговору. Уровень можно поменять в любой момент в настройках.</p>
        <div className="actions"><button className="btn ghost" id="lc-again" onClick=${()=>{ setRes(null); setRun(n=>n+1); }}>Ещё раз</button><button className="btn" id="lc-use" onClick=${()=>{ SFX('fanfare'); onPick(res.level); }}>Начать с ${res.level}</button></div></div></section>`
    :html`<${LiveCall} key=${run} st=${st} update=${update} sc=${['assess','Проверка уровня','','']} assess=${{sys:assessSys(genderLine(st.gender)),onResult:a=>{ const lv=['A1','A2','B1','B2','C1'].includes(a&&a.level)?a.level:'A2'; SFX('fanfare'); W('react','cheer'); setRes({...a,level:lv}); }}}
        onExit=${onClose} onFallback=${onClose}/>`}</div>`;
  return (window.ReactDOM&&ReactDOM.createPortal)?ReactDOM.createPortal(ui,document.body):ui; }
const BOARD_TOOL=__WD[1283];
/* the lesson board: formula chips, examples with the key part highlighted, the current task with its type, progress dots, the last correction */
const TASK_T={translate:['🔁','Переведи'],transform:['✏️','Измени'],answer:['💬','Ответь'],create:['🌟','Придумай своё'],repeat:['🔂','Повтори правильно']};
const starMark=t=>String(t).split(/(\*\*[^*]+\*\*)/).map((p,i)=>{ const m=p.match(/^\*\*([^*]+)\*\*$/); return m?html`<mark key=${i}>${m[1]}</mark>`:p.replace(/\*/g,''); });
function LessonBoard({b}){ const [hint,setHint]=useState(false); useEffect(()=>setHint(false),[b&&b.n]);
  if(!b) return html`<div className="lboard empty"><p className="muted">Здесь Ворди будет писать правило, примеры и задания.</p></div>`;
  const tt=TASK_T[b.type]||TASK_T.translate, key=x=>/V[123]|-ing|-ed|\bto\b|will|would|have|has|had|been|being|\bam\b|\bis\b|\bare\b|was|were|Past|Present|Simple|Perfect|Continuous/i.test(x);
  return html`<div className="lboard" aria-live="polite">
    <div className="lb-head">${b.emoji?html`<span className="lb-emoji" aria-hidden="true">${b.emoji}</span>`:null}<b className="lb-title">${b.title||'Урок'}</b>
      ${b.n?html`<span className="lb-dots" aria-label=${'Задание '+b.n}>${Array.from({length:Math.max(b.n,5)},(_,i)=>html`<i key=${i} className=${b.marks[i]==='ok'?'ok':b.marks[i]==='bad'?'bad':i===b.n-1?'cur':''}></i>`)}</span>`:null}</div>
    ${b.task?html`<div className="lb-task" key=${b.n}><div className="lb-tt"><span aria-hidden="true">${tt[0]}</span>${tt[1]}<small>задание ${b.n}</small></div><p>${b.task}</p>
        ${b.fix?html`<div className="lb-fix"><s>${b.fix.wrong}</s><span aria-hidden="true">→</span><b>${b.fix.right}</b></div>`:null}
        ${b.hint?(hint?html`<p className="lb-hint">💡 ${b.hint}</p>`:html`<button className="link-btn lb-hbtn" onClick=${()=>{ SFX('tap'); setHint(true); }}>💡 Подсказка</button>`):null}</div>`:null}
    ${b.formula.length?html`<div className="lb-formula">${b.formula.map((x,i)=>html`${i?html`<span className="lb-plus" aria-hidden="true">+</span>`:null}<span key=${i} className=${'lb-chip'+(key(x)?' key':'')}>${x}</span>`)}</div>`:null}
    ${b.rule?html`<p className="lb-rule">${b.rule}</p>`:null}
    ${b.examples.length?html`<ul className="lb-ex">${b.examples.map((e,i)=>html`<li key=${i}>${canSpeak?html`<button className="ex-say" aria-label=${'Послушать: '+e.en.replace(/\*/g,'')} onClick=${()=>speak(e.en.replace(/\*/g,''))}>${I.speaker()}</button>`:null}<div><b lang="en">${starMark(e.en)}</b>${e.ru?html`<span>${e.ru}</span>`:null}</div></li>`)}</ul>`:null}
  </div>`; }
const lessonSys=(lvl,ctx,extra)=>'Ты Ворди — весёлое оранжевое существо и учитель английского. Проведи короткий живой урок голосом (около 5 минут) для русскоязычного ученика (уровень CEFR '+lvl+') по теме урока, который сейчас у него на экране:\n«'+ctx+'»\n(конец экрана). '
  +'Темп: говори медленно, спокойно и чётко, с паузами между предложениями — особенно в начале; ученику нужно успевать понять. '
  +'У ученика на экране есть доска: всё важное пиши на неё инструментом show_board, а голосом говори коротко. '
  +'План. 1) Поздоровайся одной фразой. Вызови show_board с title, emoji, formula (схема по частям), rule (когда употребляем, одна строка) и examples (2–3 примера с переводом, главную часть выдели **звёздочками**). Голосом коротко, в 2–3 предложениях по-русски, объясни правило и прочитай один пример. Спроси: «Понятно? Начинаем?» — и дождись ответа ученика. '
  +'2) Дай 5–6 коротких устных заданий по очереди, от простого к сложному; перед каждым заданием вызывай show_board с task (текст задания), task_type и, если полезно, hint — и затем прочитай задание голосом: перевести короткую фразу с русского, превратить предложение в отрицание или вопрос, ответить на вопрос с этой конструкцией, придумать своё предложение. Давай по одному заданию и жди ответа. '
  +'3) Если ответ верный — коротко похвали и дай следующее задание. Если есть ошибка — вызови correction (wrong — фрагмент ученика, right — правильный вариант, why — очень коротко по-русски), мягко скажи правильный вариант и попроси повторить. Вызывай correction только для настоящих ошибок и только для одной фразы ученика за раз. Если ученик ответил грамматически верно, но другой конструкцией (например, Past Simple с yesterday вместо Present Perfect), — засчитай, похвали и коротко объясни разницу, без correction. '
  +'4) После заданий подведи итог в 2 предложениях по-русски: что получилось и на что обратить внимание — и тепло попрощайся. '
  +'Говори живо и коротко, на «ты», как друг-репетитор. Английские фразы произноси чётко, с английским произношением. Не читай весь экран вслух. Показывай эмоции через show_emotion. '+(extra||'');
/* 🎙 voice mini-lesson on the grammar topic on screen */
function VoiceLesson({st,update,onClose}){ const [ctx]=useState(()=>{ const el=document.querySelector('.bk-wrap,.gtheory'); return el?el.innerText.replace(/\s+/g,' ').trim().slice(0,3000):''; });
  const ui=html`<div className="lc-wrap" role="dialog" aria-modal="true" aria-label="Урок с Ворди голосом"><${LiveCall} st=${st} update=${update} sc=${['lesson','Урок с Ворди','','']}
      lesson=${{sys:lessonSys(st.level||'A2',ctx,genderLine(st.gender)+memLine(st))}} onExit=${onClose} onFallback=${onClose}/></div>`;
  return (window.ReactDOM&&ReactDOM.createPortal)?ReactDOM.createPortal(ui,document.body):ui; }
const canLiveVoice=()=>!!(window.WORDY_LIVE&&window.WORDY_LIVE.config&&window.WORDY_LIVE.config.apiKey&&window.AudioWorkletNode&&navigator.mediaDevices);
const tutor0=p=>p==='tutor'?.82:.5;
const MIC_WORKLET=__WD[1284];
/* Wordy remembers: short notes about the learner + the end of the last conversation, and how to address them in Russian */
const genderLine=g=>g==='f'?'Ученик — девушка: по-русски обращайся к ней в женском роде (ты сделала, ты готова, молодец сама). The learner is female. '
  :g==='m'?'Ученик — парень: по-русски обращайся к нему в мужском роде (ты сделал, ты готов). The learner is male. '
  :'Пол ученика неизвестен: по-русски избегай форм с родом (вместо «ты сделал» — «у тебя получилось»). ';
const memLine=st=>{ const m=st.wmem||{}; let t='';
  if(m.facts&&m.facts.length) t+='What you remember about the learner from earlier conversations: '+m.facts.join('; ')+'. ';
  if(m.recent&&m.recent.length) t+='The end of your last conversation with them ('+(m.day===dayKey()?'today':m.day||'earlier')+'):\n'+m.recent.map(x=>(x.who==='ai'?'Wordy: ':'Learner: ')+x.text).join('\n')+'\n';
  return t?t+'Use this naturally, like a friend who remembers (you can mention it), but do not list it back. ':''; };
const MEM_PROMPT=(facts,conv)=>'You keep short memory notes about an English learner for their friendly tutor Wordy. Current notes: '+JSON.stringify(facts)+'.\nNew conversation:\n'
  +conv.map(m=>(m.who==='ai'?'Wordy: ':'Learner: ')+m.text).join('\n')
  +'\nReturn ONLY JSON {"facts":["..."]}: the updated list, at most 12 short notes in Russian. Keep durable personal facts the learner said (name, city, school or work, hobbies, plans, family, pets, favourite things) and learning facts (topics they asked about, what was explained, repeated mistakes). Merge duplicates, drop trivia and anything outdated. Never store health, religion, politics, money, passwords or addresses.';
/* mistakes Wordy corrected in conversations become review cards ("my mistakes"): you see your wrong phrase and type the right one */
function addFixCards(update,fixes){ const fx=(fixes||[]).filter(f=>f&&f.wrong&&f.right&&normAns(f.wrong)!==normAns(f.right)); if(!fx.length) return 0; let n=0;
  update(s=>{ const my={...(s.myWords||{})}, boxes={...s.boxes}, due={...(s.due||{})};
    fx.forEach(f=>{ const right=String(f.right).trim().slice(0,80), wrong=String(f.wrong).trim().slice(0,80), id='fx-'+right.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40);
      if(my[id]) return; n++; my[id]={id,kind:'fix',en:right,wrong,ru:'✎ '+wrong,why:String(f.why||'').slice(0,120),def:'',ipa:'',ex:'',track:'my',added:dayKey()}; boxes[id]=0; due[id]=dayKey(); });
    const fxs=Object.values(my).filter(w=>w.kind==='fix').sort((a,b)=>(a.added||'').localeCompare(b.added||'')); fxs.slice(0,Math.max(0,fxs.length-80)).forEach(w=>delete my[w.id]);
    return {myWords:my,boxes,due}; });
  return fx.length; }
function rememberDialog(update,msgs,kind,from,facts){ facts=facts||[]; const conv=msgs.slice(from||0).filter(m=>(m.who==='me'||m.who==='ai')&&m.text).map(m=>({who:m.who,text:String(m.text).slice(0,280)}));
  if(!conv.some(m=>m.who==='me')) return;
  update(s=>{ const all=msgs.filter(m=>(m.who==='me'||m.who==='ai')&&m.text).map(m=>({who:m.who,text:String(m.text).slice(0,280)}));
    return {wmem:{...(s.wmem||{}),recent:all.slice(-8),kind,day:dayKey()}}; });
  getSample().then(ai=>{ if(!ai||!ai.json||window.__wordyKid) return;
    return ai.json(MEM_PROMPT(facts,conv),null,{fast:true,fresh:true}).then(j=>{ const f=(Array.isArray(j&&j.facts)?j.facts:[]).map(x=>String(x).trim().slice(0,140)).filter(Boolean).slice(0,12);
      if(f.length) update(s=>({wmem:{...(s.wmem||{}),facts:f}})); }); }).catch(()=>{}); }
const tutorSys=(lvl,ctx,sel,extra)=>'Ты Ворди — весёлое, немного озорное оранжевое существо и репетитор английского для русскоязычного ученика (уровень CEFR '+lvl+'). '
  +'Ученик сейчас на этом экране приложения Wordy:\n«'+ctx+'»\n(конец экрана). '+(sel?'Ученик выделил на экране: «'+sel+'». ':'')
  +'Отвечай живым разговорным русским языком, как друг-репетитор в звонке, на «ты»: сначала суть в 2–4 коротких предложениях, потом 1–2 коротких английских примера (английские фразы произноси чётко, с английским произношением), иногда — типичная ошибка русскоязычных. '
  +'Не читай лекций и не пересказывай весь экран; если ученик хочет подробнее — расскажи подробнее. '
  +'Если на экране упражнение и ученик ещё не ответил, не говори готовый ответ: дай подсказку и объясни правило. Если ученик пишет или говорит по-английски и просит отвечать по-английски — отвечай простым английским. '
  +'Показывай эмоции через show_emotion: радуйся, удивляйся, задумывайся. '+(extra||'');
/* 💡 «Спросить Ворди»: on lesson and exercise screens, a live voice tutor that already sees the screen */
function TutorFab({st,update}){ const [show,setShow]=useState(false), [open,setOpen]=useState(null), [mini,setMini]=useState(false), [run,setRun]=useState(0); const selRef=useRef(''), logRef=useRef([]);
  const ok=!!(window.WORDY_LIVE&&window.WORDY_LIVE.config&&window.WORDY_LIVE.config.apiKey)&&st.age!=='u13'&&!!(window.AudioContext||window.webkitAudioContext);
  useEffect(()=>{ if(!ok) return; const chk=()=>{ const v=!!document.querySelector('[data-perch="card"]:not(button)')&&!document.querySelector('.mk-qnav')&&!document.documentElement.classList.contains('in-call'); setShow(x=>x===v?x:v); };
    chk(); const t=setInterval(chk,700); return ()=>clearInterval(t); },[ok]);
  const screen=()=>{ const card=document.querySelector('[data-perch="card"]:not(button)'); const sec=card&&(card.closest('section')||card); return sec?sec.innerText.replace(/\s+/g,' ').trim().slice(0,2500):''; };
  const extra=()=>genderLine(st.gender)+memLine(st);
  const go=()=>{ const sel=selRef.current; SFX('pop'); logRef.current=[]; setMini(false); setRun(n=>n+1);
    setOpen({sys:tutorSys(st.level||'A2',screen(),sel,extra()),greet:sel?'(Я выделил на экране: «'+sel+'». Коротко объясни это.)':'(Ученик открыл помощника на этом экране. Поздоровайся одной короткой фразой по-русски и спроси, что объяснить по этой теме.)'}); };
  /* minimise = hang up the line but keep the chat; restore = a new line that already knows the chat and the screen now */
  const restore=()=>{ SFX('pop'); setMini(false); setRun(n=>n+1); setOpen({sys:tutorSys(st.level||'A2',screen()||'(ученик ушёл с урока, например в игры)','',extra()),quiet:true}); };
  if(!ok) return null;
  const inCall=document.documentElement.classList.contains('in-call');
  return html`${show&&!open&&!mini?html`<button className="tutor-fab" id="tutor-fab" onPointerDown=${()=>{ selRef.current=String((window.getSelection&&getSelection())||'').trim().slice(0,400); }} onClick=${go} aria-label="Спросить Ворди"><span aria-hidden="true">💡</span><b>Спросить Ворди</b></button>`:null}
    ${mini&&!inCall?html`<button className="tutor-fab mini" id="tutor-restore" onClick=${restore} aria-label="Вернуться к разговору с Ворди"><span aria-hidden="true">💬</span><b>Ворди</b></button>`:null}
    ${open&&!mini?html`<${LiveCall} key=${run} st=${st} update=${update} typed=${true} tutor=${open} hist=${logRef.current} onMsgs=${m=>{ logRef.current=m; }} sc=${['tutor','Спросить Ворди','','']}
        onMini=${()=>{ SFX('tap'); setMini(true); }} onExit=${()=>{ setOpen(null); setMini(false); logRef.current=[]; }} onFallback=${()=>{ setOpen(null); setMini(false); }}/>`:null}`; }
function LiveCall({st,update,onExit,sc,onFallback,typed,tutor,hist,onMsgs,onMini,assess,lesson}){
  const [phase,setPhase]=useState('connecting'), [msgs,setMsgs]=useState(hist||[]), [aiLine,setAiLine]=useState(''), [meLine,setMeLine]=useState(''), [used,setUsed]=useState([]), [err,setErr]=useState(null), [end,setEnd]=useState(false), [subs,setSubs]=useState(true), [muted,setMuted]=useState(false), [headset,setHeadset]=useState(false), [txt,setTxt]=useState(''), [voiceOff,setVoiceOff]=useState(false), [micOn,setMicOn]=useState(false), [board,setBoard]=useState(null);
  const targets=useMemo(()=>practiceWords(st,5),[]); const R=useRef({}); const box=useRef(null); const usedRef=useRef([]); usedRef.current=used;
  useCallStage(!end,tutor?1.1:lesson?(innerWidth<520?1.3:1.6):typed?(innerWidth<520?1.45:1.7):0,tutor?'tutor':'call');
  useEffect(()=>{ if(box.current) box.current.scrollTop=box.current.scrollHeight; },[msgs.length,aiLine]);
  const log=(who,text,extra)=>{ text=String(text||'').trim(); if(text) setMsgs(m=>[...m,{who,text,...(extra||{})}]); };
  const msgsRef=useRef(msgs); msgsRef.current=msgs; useEffect(()=>{ onMsgs&&onMsgs(msgs); },[msgs]);
  const saveFixes=()=>{ const r=R.current, from=r.fixFrom==null?(hist||[]).length:r.fixFrom; addFixCards(update,msgsRef.current.slice(from).filter(m=>m.fix).map(m=>m.fix)); r.fixFrom=msgsRef.current.length; };
  useEffect(()=>()=>{ saveFixes(); rememberDialog(update,msgsRef.current,tutor?'tutor':typed?'chat':'call',(hist||[]).length,(st.wmem&&st.wmem.facts)||[]); },[]);
  useEffect(()=>{ let alive=true; const r=R.current; r.alive=true;
    (async()=>{ try{
      const C=window.WORDY_LIVE, base='https://www.gstatic.com/firebasejs/'+window.WORDY_AI.sdk+'/';
      const [A,AI]=await Promise.all([import(base+'firebase-app.js'),import(base+'firebase-ai.js')]);
      const app=A.getApps().find(a=>a.name==='wordy-live')||A.initializeApp(C.config,'wordy-live');
      const ai=AI.getAI(app,{backend:new AI.GoogleAIBackend()});
      const mkModel=m=>AI.getLiveGenerativeModel(ai,{model:m,systemInstruction:{parts:[{text:lesson?lesson.sys:assess?assess.sys:tutor?tutor.sys:liveSys(sc,st.level||'A2',targets.map(w=>w.en),String(st.sname||'').trim().split(/\s+/)[0]||'',!!typed,genderLine(st.gender)+memLine(st))}]},tools:lesson?[{functionDeclarations:[LIVE_TOOLS[0].functionDeclarations[0],LIVE_TOOLS[0].functionDeclarations[2],BOARD_TOOL]}]:assess?ASSESS_TOOLS:tutor?[{functionDeclarations:[LIVE_TOOLS[0].functionDeclarations[0]]}]:LIVE_TOOLS,
        generationConfig:{responseModalities:[AI.ResponseModality.AUDIO],speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:C.voice||'Puck'}}},inputAudioTranscription:{},outputAudioTranscription:{}}});
      const mlist=[C.model].concat(C.alt||[]).filter((m,i,a)=>m&&a.indexOf(m)===i);
      const out=new (window.AudioContext||window.webkitAudioContext)(); r.out=out; if(out.state==='suspended') await out.resume();
      const an=out.createAnalyser(); an.fftSize=512; an.connect(out.destination); r.an=an; r.next=0; r.srcs=[]; r.lead=.12; r.playing=false;
      let session=null, lastErr=null; /* a refused handshake is usually momentary: try each model, twice */
      for(let k=0;k<mlist.length*2&&!session&&alive;k++){ try{ session=await mkModel(mlist[k%mlist.length]).connect({}); r.backup=k%mlist.length>0; }catch(e){ lastErr=e; if(k<mlist.length*2-1) await new Promise(z=>setTimeout(z,400)); } }
      if(!session) throw lastErr||new Error('live connect failed');
      if(!alive){ session.close(); return; } r.session=session;
      r.startMic=async()=>{ if(r.mic) return; /* microphone → 16 kHz PCM → Gemini */
      const mic=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:1}}); r.mic=mic;
      const inC=new (window.AudioContext||window.webkitAudioContext)(); r.inC=inC; const url=URL.createObjectURL(new Blob([MIC_WORKLET],{type:'application/javascript'}));
      await inC.audioWorklet.addModule(url); const node=new AudioWorkletNode(inC,'wmic'); inC.createMediaStreamSource(mic).connect(node); r.node=node;
      node.port.onmessage=e=>{ if(r.muted||!r.session) return; let f=e.data;
        /* echo guard: while Wordy talks (and a short tail after), the speakers leak into the mic and the model
           hears itself and cuts its own reply. Pass the mic only when the learner is clearly louder than the
           echo for ~0.3 s (barge-in); otherwise send silence. With headphones there is no echo, so no guard. */
        if(!r.headset){ const talking=r.next>out.currentTime-.35; let q=0; for(let i=0;i<f.length;i++) q+=f[i]*f[i]; const rms=Math.sqrt(q/f.length);
          if(!talking){ r.floor=r.floor==null?rms:r.floor*.95+rms*.05; r.loud=0; r.barge=false; }
          else if(!r.barge){ const echo=Math.min(.12,Math.max(.035,r.outLvl*.6)); r.loud=rms>echo&&rms>(r.floor||0)*3?(r.loud||0)+1:0; if(r.loud>=3) r.barge=true; else f=new Float32Array(f.length); } }
        try{ r.session.sendAudioRealtime({mimeType:'audio/pcm;rate=16000',data:b64pcm(f)}); }catch(x){} }; };
      if(!typed) await r.startMic();
      /* lip sync from the output level */
      const d=new Uint8Array(an.fftSize); r.outLvl=0; const tick=()=>{ if(!r.alive) return; an.getByteTimeDomainData(d); let m=0; for(let i=0;i<d.length;i+=4) m=Math.max(m,Math.abs(d[i]-128)); r.outLvl=Math.max(m/128,r.outLvl*.97); if(m>3) W('lip',Math.min(1,m/55)); r.raf=requestAnimationFrame(tick); }; tick();
      setPhase('live'); SFX('pop');
      if(!(tutor&&tutor.quiet)) session.send(lesson?'(Ученик готов. Начинай урок.)':assess?'(The learner is ready. Start.)':tutor?tutor.greet:'Hi!');
      /* server messages */
      let aiBuf='', meBuf=''; r.flushAi=()=>{ if(aiBuf){ log('ai',aiBuf); aiBuf=''; setAiLine(''); } };
      /* Google closes a live connection after ~10 minutes. The server keeps sending a resume handle; on "going away"
         (or a dropped line) we quietly reconnect with it — the conversation continues with its memory, ~1 s gap. */
      r.reconnect=()=>{ if(r.resuming||!r.handle) return; r.goAway=false; r.resuming=session.resumeSession({handle:r.handle}); };
      let resumes=0;
      while(alive&&r.alive){
      for await (const m of session.receive()){ if(!alive) break;
        if(m.type==='serverContent'){
          if(m.interrupted||m.turnComplete){ r.barge=false; r.loud=0; r.playing=false; } if(m.interrupted){ r.srcs.forEach(s=>{ try{ s.stop(); }catch(e){} }); r.srcs=[]; r.next=out.currentTime; if(aiBuf){ log('ai',aiBuf+' …'); aiBuf=''; } }
          ((m.modelTurn&&m.modelTurn.parts)||[]).forEach(p=>{ if(p.inlineData&&!r.voiceOff&&/audio/.test(p.inlineData.mimeType||'')){ const raw=Uint8Array.from(atob(p.inlineData.data),c=>c.charCodeAt(0)); const pcm=new Int16Array(raw.buffer,0,raw.length>>1);
            const b=out.createBuffer(1,pcm.length,24000), ch=b.getChannelData(0); for(let i=0;i<pcm.length;i++) ch[i]=pcm[i]/32768; const s0=out.createBufferSource(); s0.buffer=b; s0.connect(an);
            /* jitter buffer: after a gap, start a little later so slow chunks don't make the voice stutter; grows if gaps repeat */ if(r.next<out.currentTime+.01){ r.next=out.currentTime+r.lead; if(r.playing) r.lead=Math.min(.6,r.lead+.1); } r.playing=true; s0.start(r.next); r.next+=b.duration; r.srcs.push(s0); s0.onended=()=>{ r.srcs=r.srcs.filter(x=>x!==s0); }; } });
          if((!typed||r.mic)&&m.inputTranscription&&m.inputTranscription.text){ if(aiBuf){ log('ai',aiBuf); aiBuf=''; setAiLine(''); } meBuf+=m.inputTranscription.text; setMeLine(meBuf); }
          if(m.outputTranscription&&m.outputTranscription.text){ if(meBuf){ log('me',meBuf); meBuf=''; setMeLine(''); } aiBuf+=m.outputTranscription.text; setAiLine(aiBuf); }
          if(m.turnComplete){ if(meBuf){ log('me',meBuf); meBuf=''; setMeLine(''); } if(aiBuf){ log('ai',aiBuf); aiBuf=''; } setAiLine(''); }
        } else if(m.type==='toolCall'){
          const res=(m.functionCalls||[]).map(fc=>{ const a=fc.args||{};
            if(fc.name==='show_emotion') W('emo',String(a.emotion||'happy'),6);
            if(fc.name==='show_board'){ const ex=Array.isArray(a.examples)?a.examples.filter(x=>x&&x.en).slice(0,3).map(x=>({en:String(x.en),ru:String(x.ru||'')})):null, fo=Array.isArray(a.formula)?a.formula.map(String).filter(Boolean).slice(0,6):null, isTask=!!a.task, newRule=!!(a.rule||ex||fo);
              setBoard(b0=>{ const b=b0||{n:0,marks:[]}, marks=b.marks.slice(); if(isTask&&b.n&&marks[b.n-1]==null) marks[b.n-1]='ok';
                return {title:a.title?String(a.title):b.title||'',emoji:a.emoji?String(a.emoji).slice(0,4):b.emoji||'',formula:fo&&fo.length?fo:b.formula||[],rule:a.rule?String(a.rule):b.rule||'',examples:ex&&ex.length?ex:b.examples||[],
                  task:isTask?String(a.task):(newRule?'':b.task||''),type:isTask?String(a.task_type||'translate'):b.type,hint:isTask?String(a.hint||''):b.hint,n:isTask?b.n+1:b.n,marks,fix:isTask?null:b.fix}; }); SFX('pop'); }
            if(fc.name==='correction'&&a.wrong&&a.right&&lesson) setBoard(b=>b&&b.n?{...b,fix:{wrong:String(a.wrong),right:String(a.right)},marks:Object.assign(b.marks.slice(),{[b.n-1]:'bad'})}:b);
            if(fc.name==='finish_assessment'&&assess&&!r.result){ r.result=a; r.resT=setTimeout(()=>{ if(r.alive){ hangup(); assess.onResult(r.result); } },9000); }
            if(fc.name==='word_used'){ const w=String(a.word||'').toLowerCase(); if(targets.some(t=>t.en.toLowerCase()===w)&&!usedRef.current.includes(w)){ setUsed(o=>[...o,w]); SFX('correct'); } }
            if(fc.name==='correction'&&a.wrong&&a.right) setMsgs(ms=>[...ms,{who:'fix',text:'',fix:{wrong:String(a.wrong),right:String(a.right),why:String(a.why||'')}}]);
            return {id:fc.id,name:fc.name,response:{result:'ok'}}; });
          try{ session.sendFunctionResponses(res); }catch(e){}
        } else if(m.type==='sessionResumptionUpdate'){ if(m.newHandle&&m.resumable!==false) r.handle=m.newHandle; }
        else if(m.type==='goingAwayNotice'){ r.goAway=true; if(!(r.next>out.currentTime)) r.reconnect(); }
        if(r.goAway&&m.type==='serverContent'&&m.turnComplete) r.reconnect();
        if(r.result&&m.type==='serverContent'&&m.turnComplete){ clearTimeout(r.resT); setTimeout(()=>{ if(r.alive){ hangup(); assess.onResult(r.result); } },Math.max(300,(r.next-out.currentTime)*1000+300)); }
      }
      if(!alive||!r.alive) break;
      if(r.resuming){ try{ await r.resuming; }catch(e){ console.warn('Live resume',e); break; } r.resuming=null; continue; }
      if(r.handle&&resumes<6){ resumes++; try{ await session.resumeSession({handle:r.handle}); continue; }catch(e){ console.warn('Live resume',e); } }
      break; }
      if(alive&&r.alive) { setPhase('ended'); }
    }catch(e){ console.warn('Live',e); if(alive) { setErr(String((e&&e.message)||e)); setPhase('failed'); } } })();
    return ()=>{ alive=false; hangup(); }; },[]);
  const hangup=()=>{ const r=R.current; r.alive=false; cancelAnimationFrame(r.raf); try{ r.session&&r.session.close(); }catch(e){} r.session=null;
    try{ r.mic&&r.mic.getTracks().forEach(t=>t.stop()); }catch(e){} try{ r.node&&r.node.disconnect(); }catch(e){} try{ r.inC&&r.inC.close(); }catch(e){} try{ r.out&&r.out.close(); }catch(e){} W('lip',0); };
  const finish=()=>{ if(end) return; hangup(); setEnd(true); saveFixes(); SFX('fanfare'); W('react','cheer');
    const mineN=msgs.filter(m=>m.who==='me').length;
    update(s=>{ let p={}; targets.filter(w=>usedRef.current.includes(w.en.toLowerCase())).forEach(w=>{ const cur={...s,...p}; p={...p,...memGrade(cur,w.id,3,.8)}; }); return {...p,xp:s.xp+mineN*5+usedRef.current.length*10,coins:s.coins+usedRef.current.length*5}; }); };
  const mineN=msgs.filter(m=>m.who==='me').length, fixes=msgs.filter(m=>m.fix);
  if(phase==='failed'&&!tutor) return html`<section className="mk-sec call"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>${sc[1]}</b></div></div>
    <div className="mk-res enter"><h3>${typed?'Живой чат не подключился':'Live-звонок не подключился'}</h3><p className="muted">${/Permission|NotAllowed|getUserMedia/i.test(err||'')?'Разреши доступ к микрофону в настройках браузера и попробуй снова.':/Audio|Worklet/i.test(err||'')?'Этот браузер не поддерживает живой звонок. Попробуй Chrome.':'Линия сейчас занята или закончился бесплатный лимит на сегодня.'}</p>
      <div className="actions"><button className="btn ghost" onClick=${onExit}>Назад</button><button className="btn" id="live-fallback" onClick=${onFallback}>${typed?'Обычный чат':'Обычный звонок'}</button></div></div></section>`;
  const sendTxt=()=>{ const t=txt.trim(), r=R.current; if(!t||!r.session) return; setTxt(''); r.flushAi&&r.flushAi(); log('me',t); try{ r.session.send(t); }catch(e){ setErr('Связь прервалась. Выйди и начни заново.'); } };
  const flip=()=>{ const r=R.current, v=!voiceOff; r.voiceOff=v; setVoiceOff(v); if(v){ (r.srcs||[]).forEach(s=>{ try{ s.stop(); }catch(e){} }); r.srcs=[]; } };
  const micBtn=async()=>{ const r=R.current; if(!r.mic){ try{ await r.startMic(); setMicOn(true); r.muted=false; setMuted(false); }catch(e){ setErr('Разреши доступ к микрофону в настройках браузера.'); } } else { r.muted=!muted; setMuted(!muted); } };
  if(tutor) return html`<div className="sheet-wrap tutor-wrap" onClick=${()=>{ onMini&&onMini(); }}><div className="sheet tutor enter" role="dialog" aria-modal="true" aria-label="Спросить Ворди" onClick=${e=>e.stopPropagation()}>
    <div className="tutor-perch" data-perch="tutor"></div>
    <div className="tutor-top"><b>💡 Спросить Ворди</b><span className="muted">${phase==='connecting'?'подключаюсь…':phase==='failed'?'нет связи':''}</span>
      <button className="icon-btn" id="tutor-voice" aria-label=${voiceOff?'Включить голос Ворди':'Выключить голос Ворди'} aria-pressed=${voiceOff} onClick=${flip}>${voiceOff?'🔇':I.speaker()}</button>
      <button className="icon-btn" id="tutor-mini" aria-label="Свернуть" title="Свернуть — разговор сохранится" onClick=${()=>{ onMini&&onMini(); }}>—</button>
      <button className="icon-btn" id="tutor-close" aria-label="Закрыть разговор" title="Закрыть разговор" onClick=${()=>{ hangup(); onExit(); }}>✕</button></div>
    ${!st.gender?html`<div className="tutor-g"><span className="muted">Как к тебе обращаться?</span>${[['m','Он: «ты сделал»'],['f','Она: «ты сделала»']].map(([g,l])=>html`<button key=${g} className="chip" id=${'tutor-g-'+g} onClick=${()=>{ update(()=>({gender:g})); try{ R.current.session&&R.current.session.send(g==='f'?'(Обращайся ко мне в женском роде.)':'(Обращайся ко мне в мужском роде.)'); }catch(e){} }}>${l}</button>`)}</div>`:null}
    <div className="talk-log" ref=${box} aria-live="polite">${msgs.map((m,i)=>m.who==='fix'?null:html`<div key=${i} className=${'tmsg '+m.who}><p>${m.text}</p></div>`)}
      ${meLine?html`<div className="tmsg me"><p>${meLine}</p></div>`:null}
      ${aiLine?html`<div className="tmsg ai"><p>${aiLine}</p></div>`:phase==='connecting'?html`<div className="tmsg ai wait"><span className="mk-spin" aria-hidden="true"></span> Ворди подключается…</div>`:null}</div>
    ${err||phase==='failed'?html`<p className="mk-err">${phase==='failed'?'Не получилось подключиться к Ворди. Проверь интернет и попробуй ещё раз.':err}</p>`:null}
    <div className="talk-row tutor-row"><textarea id="tutor-text" rows="1" value=${txt} placeholder="Спроси по теме…" onChange=${e=>setTxt(e.target.value)} onKeyDown=${e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sendTxt(); } }} aria-label="Вопрос Ворди"></textarea>
      <button className=${'btn ghost mic'+(micOn&&!muted?' on':'')} id="tutor-mic" disabled=${phase!=='live'} aria-pressed=${micOn&&!muted} aria-label=${micOn&&!muted?'Выключить микрофон':'Спросить голосом'} onClick=${micBtn}>${micOn&&!muted?'■':'🎤'}</button>
      <button className="btn" id="tutor-send" disabled=${!txt.trim()||phase!=='live'} onClick=${sendTxt}>→</button></div>
    ${micOn&&!muted?html`<p className="hint-line">Говори — Ворди слушает. Можно перебить его, если сказать громче.</p>`:null}
  </div></div>`;
  if(typed&&!end) return html`<section className="mk-sec call live typed">
    <div className="sess-top"><${ExitBtn} onExit=${()=>{ hangup(); onExit(); }}/><div className="gm-h"><b>${sc[1]}</b><span className="muted">${phase==='connecting'?'соединяю…':mineN+' '+plural(mineN,'реплика','реплики','реплик')}</span></div>
      <button className="icon-btn" id="talk-mute" aria-label=${voiceOff?'Включить голос Ворди':'Выключить голос Ворди'} aria-pressed=${voiceOff} onClick=${flip}>${voiceOff?'🔇':I.speaker()}</button></div>
    <div className="talk-goal"><span className="wrel-l">Попробуй употребить:</span>${targets.map(w=>html`<span key=${w.id} className=${'talk-t'+(used.includes(w.en.toLowerCase())?' ok':'')} title=${w.ru}>${used.includes(w.en.toLowerCase())?'✓ ':''}${w.en}</span>`)}</div>
    <div className="call-stage"><div className="call-seat"><div className="call-bench" data-perch="call"></div></div></div>
    <div className="talk-log" ref=${box} aria-live="polite">${msgs.map((m,i)=>m.who==='fix'?html`<div key=${i} className="t-fix"><s>${m.fix.wrong}</s> → <b>${m.fix.right}</b>${m.fix.why?html`<small>${m.fix.why}</small>`:null}</div>`:html`<div key=${i} className=${'tmsg '+m.who}><p>${m.text}</p></div>`)}
      ${aiLine?html`<div className="tmsg ai"><p>${aiLine}</p></div>`:phase==='connecting'?html`<div className="tmsg ai wait"><span className="mk-spin" aria-hidden="true"></span> Ворди подключается…</div>`:null}</div>
    ${err?html`<p className="mk-err">${err}</p>`:null}
    <div className="talk-in"><div className="talk-row"><textarea id="talk-text" rows="2" value=${txt} placeholder="Напиши Ворди по-английски…" onChange=${e=>setTxt(e.target.value)} onKeyDown=${e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sendTxt(); } }} aria-label="Твой ответ"></textarea>
        <button className="btn" id="talk-send" disabled=${!txt.trim()||phase!=='live'} onClick=${sendTxt}>Отправить</button></div>
      ${mineN>=2?html`<button className="link-btn" id="talk-end" onClick=${finish}>Завершить разговор</button>`:null}</div>
  </section>`;
  return html`<section className="mk-sec call live">
    <div className="sess-top"><${ExitBtn} onExit=${()=>{ hangup(); onExit(); }}/><div className="gm-h"><b>${sc[1]}</b><span className="muted">${phase==='connecting'?'соединяю…':end?'звонок завершён':(R.current.backup?'Live 2 · ':'Live · ')+mineN+' '+plural(mineN,'реплика','реплики','реплик')}</span></div>
      <button className="chip" id="live-headset" aria-pressed=${headset} title="Я в наушниках: можно перебивать Ворди тихим голосом" aria-label="Наушники" onClick=${()=>{ R.current.headset=!headset; setHeadset(!headset); }}>🎧</button><button className="chip" aria-pressed=${subs} onClick=${()=>setSubs(v=>!v)}>Субтитры</button></div>
    ${assess?html`<p className="muted lc-note">Отвечай голосом, как получится — ошибки нормальны. Ворди начнёт с простого и постепенно усложнит.</p>`
      :lesson&&phase==='connecting'?html`<p className="muted lc-note">Ворди коротко объяснит правило и даст задания — отвечай голосом. Ошибки попадут в повторение.</p>`:null}
    <div className="talk-goal" hidden=${!!(assess||lesson)}><span className="wrel-l">Употреби:</span>${targets.map(w=>html`<span key=${w.id} className=${'talk-t'+(used.includes(w.en.toLowerCase())?' ok':'')} title=${w.ru}>${used.includes(w.en.toLowerCase())?'✓ ':''}${w.en}</span>`)}</div>
    <div className=${'call-stage ph-'+(phase==='connecting'?'thinking':'listening')+(lesson?' with-board':'')}><div className="call-seat"><div className="call-bench" data-perch="call"></div></div>
      ${lesson&&!end?html`<${LessonBoard} b=${board}/>`:null}
      ${subs&&!end?html`<p className="call-sub" aria-live="polite">${aiLine||([...msgs].reverse().find(m=>m.who==='ai')||{}).text||(phase==='connecting'?'Звоню Ворди…':'')}</p>`:null}
      ${!end?html`<p className="call-live">${meLine||(muted?'Микрофон выключен':phase==='live'?'Говори — Ворди слушает':'')}</p>`:null}
      ${fixes.length&&!end?html`<div className="t-fix live-fix"><s>${fixes[fixes.length-1].fix.wrong}</s> → <b>${fixes[fixes.length-1].fix.right}</b></div>`:null}</div>
    ${err&&!end?html`<p className="muted call-err">${err}</p>`:null}
    ${end?html`<div className="mk-res enter"><h3>${lesson?'Урок окончен':typed?'Разговор окончен':'Звонок завершён'}</h3><p>${mineN} ${plural(mineN,'реплика','реплики','реплик')}${lesson?'':' · слов из повторения: '+used.length+' из '+targets.length}</p>
        ${fixes.length?html`<h4>Что поправить</h4><p className="muted fix-note">✎ Эти ошибки добавлены в твоё повторение — Ворди спросит их в ближайшие дни.</p><div className="mk-fixes">${fixes.map((m,i)=>html`<div key=${i} className="mk-fix"><s>${m.fix.wrong}</s><b>${m.fix.right}</b><small>${m.fix.why}</small></div>`)}</div>`:html`<p className="muted">Ошибок Ворди не заметил — так держать!</p>`}
        <details className="call-log"><summary>Весь разговор</summary>${msgs.filter(m=>m.who!=='fix').map((m,i)=>html`<p key=${i}><b>${m.who==='ai'?'Ворди':'Ты'}:</b> ${m.text}</p>`)}</details>
        <${AiReport} what="live-звонок" text=${msgs.filter(m=>m.who!=='fix').map(m=>(m.who==='ai'?'AI: ':'Me: ')+m.text).join('\n')}/>
        <div className="actions"><button className="btn" onClick=${onExit}>Готово</button></div></div>`
    :html`<div className="call-ctrl"><button className="btn ghost" id="live-mute" aria-pressed=${muted} onClick=${()=>{ R.current.muted=!muted; setMuted(!muted); }}>${muted?'Включить микрофон':'Выключить микрофон'}</button>
        ${assess?html`<button className="btn" id="lc-finish" disabled=${phase!=='live'||mineN<3} onClick=${()=>{ try{ R.current.session.send('(Please finish the level check now: call finish_assessment, then say a short goodbye.)'); }catch(e){} }}>${mineN<3?'Поговори ещё немного…':'Узнать уровень'}</button>`
          :html`<button className="btn call-hang" id="call-hang" disabled=${phase==='connecting'} onClick=${finish}>${lesson?'Завершить урок':'Завершить звонок'}</button>`}</div>
      <p className="hint-line">Говори как с человеком. Чтобы перебить Ворди, скажи громче. В наушниках нажми 🎧 — тогда можно перебивать и тихо.</p>`}
  </section>`; }
function CallScreen({st,update,onExit}){ const ai=useSample();
  const [liveSc,setLiveSc]=useState(null), [noLive,setNoLive]=useState(false);
  const canLive=!!(window.WORDY_LIVE&&window.WORDY_LIVE.config&&window.WORDY_LIVE.config.apiKey&&window.AudioWorkletNode&&!noLive);
  const [sc,setSc]=useState(null), [msgs,setMsgs]=useState([]), [phase,setPhase]=useState('idle'), [emo,setEmo]=useState('happy'), [live,setLive]=useState(''), [err,setErr]=useState(null), [used,setUsed]=useState([]), [end,setEnd]=useState(false), [subs,setSubs]=useState(true);
  const targets=useMemo(()=>practiceWords(st,5),[sc]); const mouth=useRef(null), ctx=useRef(null), src=useRef(null), rec=useRef(null), timer=useRef(null), buf=useRef(''), alive=useRef(true), msgsRef=useRef([]), endRef=useRef(false), recStop=useRef(null);
  const scRef=useRef(null), tgRef=useRef([]); msgsRef.current=msgs; endRef.current=end; tgRef.current=targets;
  useCallStage(!!sc&&!end);
  useEffect(()=>{ W('emo',emo,30); },[emo]);
  useEffect(()=>()=>{ alive.current=false; stopAll(); try{ ctx.current&&ctx.current.close(); }catch(e){} },[]);
  const setMouth=v=>W('lip',Math.max(0,(v-1)/12));
  const stopAll=()=>{ clearTimeout(timer.current); try{ rec.current&&rec.current.abort(); }catch(e){} rec.current=null; const f=recStop.current; recStop.current=null; f&&f(); try{ src.current&&src.current.stop(); }catch(e){} stopSpeak(); setMouth(1); };
  /* play Gemini voice through an analyser so the mouth follows the sound; fall back to the browser voice */
  const play=async(text,e)=>{ setPhase('speaking');
    const done=()=>{ setMouth(1); if(alive.current&&!endRef.current) listen(); };
    try{ const a=await ai.tts((EMO_STYLE[e]||EMO_STYLE.neutral)+': '+text,'Puck'); if(!alive.current||endRef.current) return;
      const C=ctx.current||(ctx.current=new (window.AudioContext||window.webkitAudioContext)()); if(C.state==='suspended') await C.resume();
      const raw=Uint8Array.from(atob(a.data),c=>c.charCodeAt(0)).buffer; let b;
      if(/wav|mpeg|mp3|ogg/.test(a.mime)) b=await C.decodeAudioData(raw);
      else{ const rate=+((a.mime.match(/rate=(\d+)/)||[])[1]||24000), pcm=new Int16Array(raw); b=C.createBuffer(1,pcm.length,rate); const ch=b.getChannelData(0); for(let i=0;i<pcm.length;i++) ch[i]=pcm[i]/32768; }
      const s0=C.createBufferSource(), an=C.createAnalyser(); an.fftSize=512; s0.buffer=b; s0.connect(an); an.connect(C.destination); src.current=s0;
      const d=new Uint8Array(an.fftSize); let raf=0; const tick=()=>{ an.getByteTimeDomainData(d); let m=0; for(let i=0;i<d.length;i+=4) m=Math.max(m,Math.abs(d[i]-128)); setMouth(m/5); raf=requestAnimationFrame(tick); };
      s0.onended=()=>{ cancelAnimationFrame(raf); src.current=null; done(); }; s0.start(); tick(); }
    catch(x){ if(!alive.current) return; if(canSpeak){ let k=0, fin=false; const iv=setInterval(()=>setMouth(4+Math.abs(Math.sin(k++/2))*9),90);
      const end1=()=>{ if(fin) return; fin=true; clearInterval(iv); clearTimeout(sf); done(); }, sf=setTimeout(end1,1800+text.split(/\s+/).length*450); speakText(text,.95,end1); } else done(); } };
  const send=async said=>{ said=said.trim(); if(!said||endRef.current) return; stopAll(); setLive(''); setPhase('thinking'); setEmo('thinking'); setErr(null);
    const hist=msgsRef.current.slice(-10), mine={who:'me',text:said}; setMsgs(m=>[...m,mine]);
    try{ const tg=tgRef.current; const j=await ai.json(callPrompt(scRef.current,st.level||'A2',tg.map(w=>w.en),hist,said),null,{fast:true}); const reply=String(j.reply||'').trim(); if(!reply) throw {code:'invalid_json'};
      const e=EMO.includes(j.emotion)?j.emotion:'happy', fx=j.fix&&j.fix.wrong&&j.fix.right&&String(j.fix.wrong).trim()!==String(j.fix.right).trim()?{wrong:String(j.fix.wrong),right:String(j.fix.right),why:String(j.fix.why||'')}:null;
      const u=(Array.isArray(j.used)?j.used:[]).map(x=>String(x).toLowerCase()).filter(x=>tg.some(w=>w.en.toLowerCase()===x));
      if(!alive.current) return; setMsgs(m=>{ const c=m.slice(); c[c.length-1]={...mine,fix:fx}; return [...c,{who:'ai',text:reply,emo:e}]; }); setEmo(e);
      if(u.length){ setUsed(o=>[...new Set([...o,...u])]); SFX('correct'); }
      play(reply,e); }
    catch(x){ if(!alive.current) return; setErr(aiErr(x)); setEmo('encourage'); setPhase('idle'); } };
  /* listening: recognition with auto-send after a pause; without recognition — record and let Gemini transcribe */
  const listen=()=>{ if(endRef.current) return; buf.current=''; setLive(''); setPhase('listening'); setEmo('neutral');
    if(SR){ try{ const r=new SR(); r.lang='en-GB'; r.continuous=true; r.interimResults=true;
        r.onresult=ev=>{ let fin='', tmp=''; for(let i=ev.resultIndex;i<ev.results.length;i++){ const t=ev.results[i][0].transcript; if(ev.results[i].isFinal) fin+=t+' '; else tmp+=t; }
          if(fin) buf.current+=fin; setLive((buf.current+tmp).trim()); clearTimeout(timer.current); timer.current=setTimeout(()=>{ if(buf.current.trim()) send(buf.current); },1600); };
        r.onerror=ev=>{ if(['not-allowed','service-not-allowed','network','audio-capture'].includes(ev.error)){ rec.current=null; recordMode(); } };
        r.onend=()=>{ if(rec.current===r&&!endRef.current){ try{ r.start(); }catch(e){} } };
        rec.current=r; r.start(); return; }catch(e){} }
    recordMode(); };
  const recordMode=()=>{ if(!CAN_REC){ setErr('Микрофон недоступен в этом браузере. Попробуй Chrome.'); setPhase('idle'); return; } setPhase('recording');
    recStop.current=startRecorder(async b=>{ if(!alive.current||endRef.current) return; setPhase('thinking'); setEmo('thinking');
      try{ const w=await clipsToWav([b],60); if(!w) throw {code:'no_audio'}; const j=await ai.json(TRANSCRIBE,[w],{fast:true}); const t=String((j&&j.text)||'').trim(); if(t) send(t); else { setErr('Не расслышал. Скажи ещё раз чуть громче.'); listen(); } }
      catch(x){ setErr(aiErr(x)); setPhase('idle'); } }); };
  const doneSpeaking=()=>{ if(phase==='listening'&&buf.current.trim()) send(buf.current+' '+''); else if(phase==='listening'&&live.trim()) send(live); else if(phase==='recording'){ const f=recStop.current; recStop.current=null; f&&f(); } };
  const begin=x=>{ SFX('pop'); try{ const C=ctx.current||(ctx.current=new (window.AudioContext||window.webkitAudioContext)()); C.resume&&C.resume(); }catch(e){}
    scRef.current=x; setSc(x); setMsgs([{who:'ai',text:x[3],emo:'happy'}]); setUsed([]); setEnd(false); setErr(null); setEmo('happy'); setTimeout(()=>play(x[3],'happy'),50); };
  const hang=()=>{ if(end) return; setEnd(true); endRef.current=true; stopAll(); setPhase('idle'); setEmo('happy'); SFX('fanfare');
    const mineN=msgsRef.current.filter(m=>m.who==='me').length;
    update(s=>{ let p={}; targets.filter(w=>used.includes(w.en.toLowerCase())).forEach(w=>{ const cur={...s,...p}; p={...p,...memGrade(cur,w.id,3,.8)}; }); return {...p,xp:s.xp+mineN*5+used.length*10,coins:s.coins+used.length*5}; }); };
  if(liveSc) return html`<${LiveCall} st=${st} update=${update} onExit=${onExit} sc=${liveSc} onFallback=${()=>{ const x=liveSc; setLiveSc(null); setNoLive(true); begin(x); }}/>`;
  if(!sc) return html`<section className="mk-sec call"><div className="sess-top"><${ExitBtn} onExit=${onExit}/><div className="gm-h"><b>Видеозвонок с Ворди</b><span className="muted">${st.level||'A2'}</span></div></div>
    <div className="mk-res enter call-pick"><h3>Кому звоним?</h3><p className="muted">Говори вслух, как по телефону: замолчал — Ворди сам услышит, что ты закончил, и ответит голосом. Включи звук и разреши микрофон.</p>
      <div className="talk-sc">${TALK_SC.map(x=>html`<button key=${x[0]} className="prac-card" id=${'call-'+x[0]} onClick=${()=>canLive?(SFX('pop'),setLiveSc(x)):begin(x)}><span><b>${x[1]}</b><small>${x[3]}</small></span></button>`)}</div></div></section>`;
  const last=[...msgs].reverse().find(m=>m.who==='ai'), mineN=msgs.filter(m=>m.who==='me').length;
  const status={listening:'Слушаю тебя…',recording:'Говори, потом нажми «Я закончил»',thinking:'Ворди думает…',speaking:'Ворди говорит',idle:''}[phase];
  return html`<section className="mk-sec call">
    <div className="sess-top"><${ExitBtn} onExit=${()=>{ stopAll(); onExit(); }}/><div className="gm-h"><b>${sc[1]}</b><span className="muted">${mineN} ${plural(mineN,'реплика','реплики','реплик')}</span></div>
      <button className="chip" aria-pressed=${subs} onClick=${()=>setSubs(v=>!v)}>Субтитры</button></div>
    <div className="talk-goal"><span className="wrel-l">Употреби:</span>${targets.map(w=>html`<span key=${w.id} className=${'talk-t'+(used.includes(w.en.toLowerCase())?' ok':'')} title=${w.ru}>${used.includes(w.en.toLowerCase())?'✓ ':''}${w.en}</span>`)}</div>
    <div className=${'call-stage ph-'+phase}><div className="call-seat"><div className="call-bench" data-perch="call"></div></div>
      ${subs&&last?html`<p className="call-sub" aria-live="polite">${last.text}</p>`:null}
      <p className="call-status" role="status">${status}</p>
      ${(phase==='listening'||phase==='recording')?html`<p className="call-live">${live||' '}</p>`:null}</div>
    ${err?html`<p className="mk-err call-err">${err} <button className="link-btn" onClick=${()=>{ setErr(null); listen(); }}>Попробовать снова</button></p>`:null}
    ${end?html`<div className="mk-res enter"><h3>Звонок завершён</h3><p>${mineN} ${plural(mineN,'реплика','реплики','реплик')} · слов из повторения: ${used.length} из ${targets.length}</p>
        ${msgs.some(m=>m.fix)?html`<h4>Что поправить</h4><div className="mk-fixes">${msgs.filter(m=>m.fix).map((m,i)=>html`<div key=${i} className="mk-fix"><s>${m.fix.wrong}</s><b>${m.fix.right}</b><small>${m.fix.why}</small></div>`)}</div>`:html`<p className="muted">Ошибок Ворди не заметил — так держать!</p>`}
        <details className="call-log"><summary>Весь разговор</summary>${msgs.map((m,i)=>html`<p key=${i}><b>${m.who==='ai'?'Ворди':'Ты'}:</b> ${m.text}</p>`)}</details>
        <${AiReport} what="видеозвонок" text=${msgs.map(m=>(m.who==='ai'?'AI: ':'Me: ')+m.text).join('\n')}/>
        <div className="actions"><button className="btn ghost" onClick=${()=>{ setSc(null); setEnd(false); endRef.current=false; }}>Другой звонок</button><button className="btn" onClick=${onExit}>Готово</button></div></div>`
    :html`<div className="call-ctrl">
        ${phase==='listening'||phase==='recording'?html`<button className="btn ghost" id="call-done" onClick=${doneSpeaking}>Я закончил</button>`:null}
        ${phase==='speaking'?html`<button className="btn ghost" id="call-skip" onClick=${()=>{ stopAll(); listen(); }}>Перебить</button>`:null}
        ${phase==='idle'&&!err?html`<button className="btn ghost" id="call-talk" onClick=${listen}>Говорить</button>`:null}
        <button className="btn call-hang" id="call-hang" disabled=${mineN<1} onClick=${hang}>Завершить звонок</button></div>`}
  </section>`; }
function MockScreen({mk,st,update,onExit}){
  if(mk.kind==='call') return html`<${CallScreen} st=${st} update=${update} onExit=${onExit}/>`;
  if(mk.kind==='story') return html`<${StoryScreen} st=${st} update=${update} onExit=${onExit}/>`;
  if(mk.kind==='talk') return html`<${TalkScreen} st=${st} update=${update} onExit=${onExit}/>`;
  if(mk.kind==='hw') return mk.h.kind==='essay'?html`<${HwEssay} h=${mk.h} st=${st} update=${update} onExit=${onExit}/>`:html`<${HwText} h=${mk.h} st=${st} update=${update} onExit=${onExit}/>`;
  if(mk.kind==='p2') return html`<${P2Bank} st=${st} update=${update} onExit=${onExit}/>`;
  if(mk.kind==='drill') return html`<${Drill} st=${st} update=${update} onExit=${onExit} type=${mk.type}/>`;
  if(mk.kind==='pron') return html`<${PronDrill} st=${st} update=${update} onExit=${onExit}/>`;
  if(mk.kind==='ielts'&&mk.part==='full'){ const m=IELTS_MOCKS.find(x=>x.id===mk.id); return html`<${IeltsFull} m=${m} st=${st} update=${update} onExit=${onExit}/>`; }
  if(mk.kind==='sat'){ const m=SAT_MOCKS.find(x=>x.id===mk.id); return html`<${SatRunner} m=${m} scope=${mk.part} st=${st} update=${update} onExit=${onExit}/>`; }
  const m=IELTS_MOCKS.find(x=>x.id===mk.id), C={L:IeltsListening,R:IeltsReading,W:IeltsWriting,S:IeltsSpeaking}[mk.part];
  return html`<${C} m=${m} st=${st} update=${update} onExit=${onExit}/>`;
}

const TAB_LINES={games:'Поиграем? Тут игры со словами!',progress:'Смотри, сколько ты уже выучил!',settings:'Тут можно меня настроить.',shop:'Добро пожаловать ко мне домой! Обставим комнаты?'};
/*ACC_START*/
/* ================= ACCOUNTS: data layer (demo backend + Firebase backend, one API) ================= */
const ACC_LIM={bio:300,task:10000,answer:20000,file:20*1024*1024,demoFile:1024*1024,title:120,comment:1000,feedback:4000,name:60,versions:20};
const ACC_ALPH='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function accCode(){ let s=''; const a=new Uint32Array(6); try{ crypto.getRandomValues(a); }catch(e){ for(let i=0;i<6;i++) a[i]=Math.floor(Math.random()*1e9); }
  for(let i=0;i<6;i++) s+=ACC_ALPH[a[i]%ACC_ALPH.length]; return s.slice(0,3)+'-'+s.slice(3); }
const accNormCode=c=>String(c||'').toUpperCase().replace(/[^A-Z0-9]/g,'').replace(/^(.{3})(.{3})$/,'$1-$2');
function accDayEnd(ts){ const d=new Date(ts); d.setHours(23,59,59,999); return d.getTime(); }
const accId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const ACC_CERT_ALPH='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function accCertCode(){ let s=''; const a=new Uint32Array(8); try{ crypto.getRandomValues(a); }catch(e){ for(let i=0;i<8;i++) a[i]=Math.floor(Math.random()*1e9); } for(let i=0;i<8;i++) s+=ACC_CERT_ALPH[a[i]%ACC_CERT_ALPH.length]; return 'W'+s.slice(0,4)+'-'+s.slice(4); }
const ACC_PROVIDERS={google:{name:'Google',id:'google.com'},microsoft:{name:'Microsoft',id:'microsoft.com'}};
const accProviders=()=>(window.WORDY_AUTH||[]).filter(k=>ACC_PROVIDERS[k]);
const ACC_AVATARS=['navy','orange','green','plum','teal','rose','sand','slate'];
const ACC_ERR=__WD[1285];
const accErrText=e=>{ const k=(e&&e.code)||e; if(ACC_ERR[k]==='') return ''; return ACC_ERR[k]||((e&&e.message)?String(e.message).slice(0,140):'Что-то пошло не так. Попробуй ещё раз.'); };
const accE=code=>{ const e=new Error(ACC_ERR[code]||code); e.code=code; return e; };

/* a quiz: {title, qs:[{q, opts[2..4], c, time}]} — cleaned the same way for both backends */
const QUIZ_LIM={qs:50,q:300,opt:120};
function quizClean(q){ q=q||{}; const qs=(Array.isArray(q.qs)?q.qs:[]).slice(0,QUIZ_LIM.qs).map(x=>{ const opts=(x.opts||[]).map(o=>String(o||'').trim().slice(0,QUIZ_LIM.opt)).filter(Boolean).slice(0,4);
    return {q:String(x.q||'').trim().slice(0,QUIZ_LIM.q),opts,c:Math.max(0,Math.min(opts.length-1,x.c|0)),time:[10,20,30,60].includes(+x.time)?+x.time:20,why:String(x.why||'').slice(0,300)}; }).filter(x=>x.q&&x.opts.length>=2);
  return {title:String(q.title||'').trim().slice(0,ACC_LIM.title)||'Викторина',qs}; }

const fbClean=f=>{ f=f||{}; const text=String(f.text||'').trim().slice(0,2000); if(text.length<5) throw accE('limit/text');
  return {kind:['idea','ai'].includes(f.kind)?f.kind:'bug',text,contact:String(f.contact||'').slice(0,120),page:String(f.page||'').slice(0,120),level:String(f.level||'').slice(0,4),ua:String(f.ua||'').slice(0,160)}; };

/* ---------- demo backend: localStorage, same rules as Firestore ---------- */
function makeMemBackend(opts){ opts=opts||{};
  const KEY=opts.key||'wordy.accdb', SK=KEY+'.sess';
  const now=()=>Date.now()+((window.__accClock)||0);
  let db; try{ db=JSON.parse(localStorage.getItem(KEY))||null; }catch(e){ db=null; }
  db=db||{}; ['users','groups','codes','members','asg','subs','state','invites','quizzes','games','gkeys','players','feedback','certs'].forEach(k=>{ db[k]=db[k]||{}; });
  let me=null; try{ me=sessionStorage.getItem(SK)||localStorage.getItem(SK)||null; }catch(e){}
  const subs=new Set(), authSubs=new Set();
  const persist=()=>{ try{ localStorage.setItem(KEY,JSON.stringify(db)); }catch(e){} };
  const emit=()=>{ persist(); subs.forEach(f=>{ try{ f(); }catch(e){} }); };
  const watch=f=>{ subs.add(f); setTimeout(f,0); return ()=>subs.delete(f); };
  /* other tabs of the same browser see changes live (teacher + student demo side by side) */
  try{ window.addEventListener('storage',e=>{ if(e.key!==KEY||!e.newValue) return; try{ db=JSON.parse(e.newValue); }catch(x){ return; } subs.forEach(f=>{ try{ f(); }catch(x){} }); fireAuth(); }); }catch(e){}
  const setMe=id=>{ me=id; try{ if(id){ sessionStorage.setItem(SK,id); localStorage.setItem(SK,id); } else { sessionStorage.removeItem(SK); localStorage.removeItem(SK); } }catch(e){} };
  const cl=x=>x==null?x:JSON.parse(JSON.stringify(x));
  const user=()=>{ if(!me||!db.users[me]) return null; const u=db.users[me]; return {uid:me,email:u.email,name:u.name,role:u.role,groups:(u.groups||[]).slice(),avatar:u.avatar||null,bio:u.bio||'',emailVerified:!!u.verified,createdAt:u.createdAt||null,providers:['password']}; };
  const need=()=>{ const u=user(); if(!u) throw accE('auth/required'); return u; };
  const teacherOf=(gid,u)=>{ const g=db.groups[gid]; if(!g||g.teacher!==u.uid) throw accE('permission-denied'); return g; };
  const memberOf=(gid,u)=>{ if(!(db.members[gid]||{})[u.uid]) throw accE('permission-denied'); };
  const hash=s=>{ let x=5381; for(const c of String(s)) x=((x*33)^c.charCodeAt(0))>>>0; return x.toString(36); };
  const fireAuth=()=>{ const u=user(); authSubs.forEach(f=>{ try{ f(u); }catch(e){} }); };
  const api={ mode:'demo',
    onAuth(cb){ authSubs.add(cb); setTimeout(()=>cb(user()),0); return ()=>authSubs.delete(cb); },
    async signUp({email,password,name,role}){ email=String(email||'').trim().toLowerCase(); name=String(name||'').trim().slice(0,ACC_LIM.name);
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw accE('auth/invalid-email'); if(String(password||'').length<6) throw accE('auth/weak-password');
      if(Object.values(db.users).some(u=>u.email===email)) throw accE('auth/email-already-in-use'); if(role!=='teacher'&&role!=='student') throw accE('permission-denied');
      const uid='u'+accId(); db.users[uid]={email,pass:hash(password),name:name||email.split('@')[0],role,groups:[],createdAt:now()}; setMe(uid); emit(); fireAuth(); return user(); },
    async signIn(email,password){ email=String(email||'').trim().toLowerCase(); const e=Object.entries(db.users).find(([,u])=>u.email===email);
      if(!e||e[1].pass!==hash(password)) throw accE('auth/invalid-credential'); setMe(e[0]); fireAuth(); emit(); return user(); },
    async signOut(){ setMe(null); fireAuth(); emit(); },
    async resetPassword(email){ email=String(email||'').trim().toLowerCase(); if(!email) throw accE('auth/missing-email'); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw accE('auth/invalid-email'); return {demo:true}; },
    async demoSetPassword(email,password){ email=String(email||'').trim().toLowerCase(); const e=Object.entries(db.users).find(([,u])=>u.email===email); if(String(password||'').length<6) throw accE('auth/weak-password'); if(!e) throw accE('auth/user-not-found'); e[1].pass=hash(password); emit(); },
    async updateProfile(p){ const u=need(); const x=db.users[u.uid]; if(p.name!=null){ const n=String(p.name).trim().slice(0,ACC_LIM.name); if(!n) throw accE('limit/text'); x.name=n;
        if(u.role==='teacher') Object.values(db.groups).forEach(g=>{ if(g.teacher===u.uid) g.teacherName=n; }); else (u.groups||[]).forEach(g=>{ const m=(db.members[g]||{})[u.uid]; if(m) m.name=n; }); }
      if(p.avatar!==undefined) x.avatar=ACC_AVATARS.includes(p.avatar)?p.avatar:null; if(p.bio!=null) x.bio=String(p.bio).slice(0,ACC_LIM.bio);
      const pub={bio:x.bio||'',avatar:x.avatar||null};
      if(u.role==='teacher') Object.values(db.groups).forEach(g=>{ if(g.teacher===u.uid){ g.teacherBio=pub.bio; g.teacherAvatar=pub.avatar; } }); else (u.groups||[]).forEach(g=>{ const m=(db.members[g]||{})[u.uid]; if(m) Object.assign(m,pub); });
      emit(); fireAuth(); },
    async changePassword(cur,nw){ const u=need(); const x=db.users[u.uid]; if(x.pass!==hash(cur)) throw accE('auth/wrong-password'); if(String(nw||'').length<6) throw accE('auth/weak-password'); if(cur===nw) throw accE('pass/same'); x.pass=hash(nw); emit(); },
    async changeEmail(cur,email){ const u=need(); const x=db.users[u.uid]; if(x.pass!==hash(cur)) throw accE('auth/wrong-password'); email=String(email||'').trim().toLowerCase(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw accE('auth/invalid-email');
      if(Object.entries(db.users).some(([k,v])=>k!==u.uid&&v.email===email)) throw accE('auth/email-already-in-use'); x.email=email; x.verified=false; emit(); fireAuth(); return {demo:true}; },
    async sendVerify(){ need(); return {demo:true}; },
    async signInWith(){ throw accE('demo/oauth'); },
    async sendLink(){ throw accE('demo/oauth'); }, linkPending:()=>false, async completeLink(){ throw accE('demo/oauth'); },
    async issueCert(c){ const u=need(); const name=String(u.name||'').trim(); if(!name) throw accE('cert/name'); const ex=Object.entries(db.certs).find(([,v])=>v.uid===u.uid&&v.level===c.level); if(ex) return {code:ex[0],...cl(ex[1])};
      let code; do{ code=accCertCode(); }while(db.certs[code]); db.certs[code]={uid:u.uid,name,level:c.level,words:c.words|0,gram:c.gram|0,issuedAt:now()}; emit(); return {code,...cl(db.certs[code])}; },
    myCerts(cb){ return watch(()=>{ const u=user(); if(!u) return cb([]); cb(Object.entries(db.certs).filter(([,v])=>v.uid===u.uid).map(([code,v])=>({code,...cl(v)}))); }); },
    async sendFeedback(f){ const u=user(); const x=fbClean(f); db.feedback['f'+accId()]={...x,uid:u?u.uid:null,email:u?u.email:null,at:now()}; emit(); },
    async refreshMe(){ fireAuth(); return user(); },
    async deleteAccount(cur){ const u=need(); const x=db.users[u.uid]; if(x.pass!==hash(cur)) throw accE('auth/wrong-password');
      if(u.role==='teacher') Object.keys(db.groups).filter(g=>db.groups[g].teacher===u.uid).forEach(g=>{ const G=db.groups[g]; if(G.code) delete db.codes[G.code]; Object.keys(db.members[g]||{}).forEach(id=>{ const y=db.users[id]; if(y) y.groups=(y.groups||[]).filter(k=>k!==g); }); delete db.groups[g]; delete db.members[g]; delete db.asg[g]; delete db.subs[g]; });
      else (u.groups||[]).forEach(g=>{ if(db.members[g]) delete db.members[g][u.uid]; });
      Object.keys(db.quizzes).forEach(k=>{ if(db.quizzes[k].owner===u.uid) delete db.quizzes[k]; }); Object.keys(db.certs||{}).forEach(k=>{ if(db.certs[k].uid===u.uid) delete db.certs[k]; }); Object.keys(db.invites).forEach(k=>{ if(db.invites[k].teacher===u.uid||db.invites[k].email===u.email) delete db.invites[k]; });
      delete db.state[u.uid]; delete db.users[u.uid]; setMe(null); emit(); fireAuth(); },
    async setRole(role,name){ const u=need(); const x=db.users[u.uid]; if(x.role) throw accE('permission-denied'); x.role=role; x.name=String(name||x.name).slice(0,ACC_LIM.name); emit(); fireAuth(); },
    me:user,
    async createGroup(name){ const u=need(); if(u.role!=='teacher') throw accE('role/teacher'); name=String(name||'').trim().slice(0,80)||'Моя группа';
      const gid='g'+accId(); db.groups[gid]={name,teacher:u.uid,teacherName:u.name,teacherBio:u.bio||'',teacherAvatar:u.avatar||null,createdAt:now(),code:null,codeExp:0}; db.members[gid]={}; db.asg[gid]={}; db.subs[gid]={}; emit(); await api.newCode(gid); return gid; },
    async renameGroup(gid,name){ const u=need(); const g=teacherOf(gid,u); g.name=String(name||'').trim().slice(0,80)||g.name; emit(); },
    async deleteGroup(gid){ const u=need(); const g=teacherOf(gid,u); if(g.code) delete db.codes[g.code]; Object.keys(db.members[gid]||{}).forEach(id=>{ const x=db.users[id]; if(x) x.groups=(x.groups||[]).filter(k=>k!==gid); });
      delete db.groups[gid]; delete db.members[gid]; delete db.asg[gid]; delete db.subs[gid]; emit(); },
    async newCode(gid){ const u=need(); const g=teacherOf(gid,u); if(g.code) delete db.codes[g.code]; let c; do{ c=accCode(); }while(db.codes[c]);
      const exp=accDayEnd(now()); db.codes[c]={group:gid,teacher:u.uid,exp}; g.code=c; g.codeExp=exp; emit(); return {code:c,exp}; },
    async ensureCode(gid){ const u=need(); const g=teacherOf(gid,u); if(!g.code||g.codeExp<=now()) return api.newCode(gid); return {code:g.code,exp:g.codeExp}; },
    myGroups(cb){ return watch(()=>{ const u=user(); if(!u) return cb([]);
      const ids=u.role==='teacher'?Object.keys(db.groups).filter(k=>db.groups[k].teacher===u.uid):(u.groups||[]).filter(k=>db.groups[k]);
      cb(ids.map(id=>{ const g=db.groups[id]; const o={id,name:g.name,teacherName:g.teacherName,teacherBio:g.teacherBio||'',teacherAvatar:g.teacherAvatar||null,createdAt:g.createdAt,count:Object.keys(db.members[id]||{}).length};
        if(u.role==='teacher'){ o.code=g.code; o.codeExp=g.codeExp; } return o; }).sort((a,b)=>b.createdAt-a.createdAt)); }); },
    members(gid,cb){ return watch(()=>{ const u=user(); if(!u) return cb([]); const g=db.groups[gid]; if(!g) return cb([]);
      const all=db.members[gid]||{}; const ok=g.teacher===u.uid; cb(Object.entries(all).filter(([id])=>ok||id===u.uid).map(([id,m])=>({uid:id,...cl(m)})).sort((a,b)=>(a.name||'').localeCompare(b.name||''))); }); },
    async joinByCode(code){ const u=need(); if(u.role!=='student') throw accE('role/student'); const c=db.codes[accNormCode(code)]; if(!c) throw accE('code/invalid'); if(c.exp<=now()) throw accE('code/expired');
      const gid=c.group; if((db.members[gid]||{})[u.uid]) throw accE('code/already');
      db.members[gid][u.uid]={name:u.name,bio:u.bio||'',avatar:u.avatar||null,code:accNormCode(code),joinedAt:now(),stats:{},grant:{}}; const x=db.users[u.uid]; x.groups=[...new Set([...(x.groups||[]),gid])]; emit(); fireAuth(); return gid; },
    async leaveGroup(gid){ const u=need(); if(db.members[gid]) delete db.members[gid][u.uid]; const x=db.users[u.uid]; x.groups=(x.groups||[]).filter(k=>k!==gid); emit(); fireAuth(); },
    async removeMember(gid,sid){ const u=need(); teacherOf(gid,u); if(db.members[gid]) delete db.members[gid][sid]; const x=db.users[sid]; if(x) x.groups=(x.groups||[]).filter(k=>k!==gid); emit(); },
    async setGrant(gid,sid,grant){ const u=need(); teacherOf(gid,u); const m=(db.members[gid]||{})[sid]; if(!m) throw accE('permission-denied'); m.grant={...(m.grant||{}),...grant,at:now()}; emit(); },
    myGrants(cb){ return watch(()=>{ const u=user(); if(!u||u.role!=='student') return cb([]); cb((u.groups||[]).map(g=>((db.members[g]||{})[u.uid]||{}).grant).filter(Boolean)); }); },
    async pushStats(stats){ const u=user(); if(!u||u.role!=='student') return; (u.groups||[]).forEach(g=>{ const m=(db.members[g]||{})[u.uid]; if(m){ m.stats={...stats,at:now()}; m.name=u.name; } }); emit(); },
    assignments(gid,cb){ return watch(()=>{ const u=user(); if(!u||!db.groups[gid]) return cb([]); if(db.groups[gid].teacher!==u.uid&&!(db.members[gid]||{})[u.uid]) return cb([]);
      cb(Object.entries(db.asg[gid]||{}).map(([id,a])=>({id,...cl(a)})).sort((a,b)=>b.createdAt-a.createdAt)); }); },
    async saveAssignment(gid,aid,data){ const u=need(); teacherOf(gid,u); const text=String(data.text||''), title=String(data.title||'').trim().slice(0,ACC_LIM.title);
      if(text.length>ACC_LIM.task) throw accE('limit/text'); if(!title) throw accE('limit/text');
      const id=aid||('a'+accId()); const prev=(db.asg[gid]||{})[id]||{createdAt:now()}; db.asg[gid][id]={...prev,title,text,files:cl(data.files||[]),due:data.due||null,updatedAt:now()}; emit(); return id; },
    async deleteAssignment(gid,aid){ const u=need(); teacherOf(gid,u); delete db.asg[gid][aid]; if(db.subs[gid]) delete db.subs[gid][aid]; emit(); },
    mySub(gid,aid,cb){ return watch(()=>{ const u=user(); if(!u) return cb(null); cb(cl(((db.subs[gid]||{})[aid]||{})[u.uid]||null)); }); },
    subs(gid,aid,cb){ return watch(()=>{ const u=user(); if(!u||!db.groups[gid]||db.groups[gid].teacher!==u.uid) return cb([]);
      cb(Object.entries((db.subs[gid]||{})[aid]||{}).map(([id,s])=>({uid:id,...cl(s)}))); }); },
    async saveSub(gid,aid,{text,files,submit}){ const u=need(); memberOf(gid,u); if(!(db.asg[gid]||{})[aid]) throw accE('permission-denied'); text=String(text||''); if(text.length>ACC_LIM.answer) throw accE('limit/text');
      const A=(db.subs[gid][aid]=db.subs[gid][aid]||{}); const p=A[u.uid]||{status:'draft',versions:[],comments:[],createdAt:now()};
      const s={...p,name:u.name,text,files:cl(files||[]),updatedAt:now()};
      if(submit){ s.status='submitted'; s.submittedAt=now(); s.versions=[...(p.versions||[]),{text,files:(files||[]).length,at:now()}].slice(-ACC_LIM.versions); }
      A[u.uid]=s; emit(); return cl(s); },
    async review(gid,aid,sid,data){ const u=need(); teacherOf(gid,u); const s=((db.subs[gid]||{})[aid]||{})[sid]; if(!s) throw accE('permission-denied');
      if(data.comments) s.comments=cl(data.comments).slice(0,200).map(c=>({...c,text:String(c.text||'').slice(0,ACC_LIM.comment)}));
      if(data.feedback!=null) s.feedback=String(data.feedback).slice(0,ACC_LIM.feedback); if(data.grade!==undefined) s.grade=data.grade; if(data.status) s.status=data.status; s.reviewedAt=now(); emit(); },
    async upload(path,file,onProgress){ need(); if(file.size>ACC_LIM.demoFile) throw accE('limit/file');
      const url=await new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file); });
      onProgress&&onProgress(1); return {name:file.name,size:file.size,type:file.type||'',url,path:path+'/'+file.name}; },

    /* profile */
    async renameMe(name){ const u=need(); name=String(name||'').trim().slice(0,ACC_LIM.name); if(!name) throw accE('limit/text'); db.users[u.uid].name=name;
      if(u.role==='teacher') Object.values(db.groups).forEach(g=>{ if(g.teacher===u.uid) g.teacherName=name; });
      else (u.groups||[]).forEach(g=>{ const m=(db.members[g]||{})[u.uid]; if(m) m.name=name; }); emit(); fireAuth(); },
    /* invites: teacher adds a student by email, the student accepts */
    async invite(gid,email){ const u=need(); const g=teacherOf(gid,u); email=String(email||'').trim().toLowerCase(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw accE('auth/invalid-email');
      const known=Object.entries(db.users).find(([,x])=>x.email===email); if(known&&known[1].role==='teacher') throw accE('invite/teacher'); if(known&&(db.members[gid]||{})[known[0]]) throw accE('invite/self');
      const id=gid+'_'+email; if(db.invites[id]) throw accE('invite/dup'); db.invites[id]={email,group:gid,groupName:g.name,teacher:u.uid,teacherName:u.name,at:now()}; emit(); return id; },
    invites(gid,cb){ return watch(()=>{ const u=user(); if(!u) return cb([]); cb(Object.entries(db.invites).filter(([,v])=>v.group===gid&&v.teacher===u.uid).map(([id,v])=>({id,...cl(v)})).sort((a,b)=>b.at-a.at)); }); },
    myInvites(cb){ return watch(()=>{ const u=user(); if(!u||u.role!=='student') return cb([]); cb(Object.entries(db.invites).filter(([,v])=>v.email===u.email&&db.groups[v.group]).map(([id,v])=>({id,...cl(v)})).sort((a,b)=>b.at-a.at)); }); },
    async cancelInvite(id){ const u=need(); const v=db.invites[id]; if(!v||(v.teacher!==u.uid&&v.email!==u.email)) throw accE('permission-denied'); delete db.invites[id]; emit(); },
    async acceptInvite(id){ const u=need(); if(u.role!=='student') throw accE('role/student'); const v=db.invites[id]; if(!v||v.email!==u.email||!db.groups[v.group]) throw accE('invite/none'); const gid=v.group;
      if(!(db.members[gid]||{})[u.uid]){ db.members[gid][u.uid]={name:u.name,bio:u.bio||'',avatar:u.avatar||null,code:'invite',joinedAt:now(),stats:{},grant:{}}; const x=db.users[u.uid]; x.groups=[...new Set([...(x.groups||[]),gid])]; }
      delete db.invites[id]; emit(); fireAuth(); return gid; },
    /* quiz library (teacher's own) */
    myQuizzes(cb){ return watch(()=>{ const u=user(); if(!u) return cb([]); cb(Object.entries(db.quizzes).filter(([,q])=>q.owner===u.uid).map(([id,q])=>({id,...cl(q)})).sort((a,b)=>b.updatedAt-a.updatedAt)); }); },
    async saveQuiz(id,q){ const u=need(); if(u.role!=='teacher') throw accE('role/teacher'); const x=quizClean(q); id=id||('q'+accId()); if(db.quizzes[id]&&db.quizzes[id].owner!==u.uid) throw accE('permission-denied');
      db.quizzes[id]={...x,owner:u.uid,updatedAt:now()}; emit(); return id; },
    async deleteQuiz(id){ const u=need(); if(!db.quizzes[id]||db.quizzes[id].owner!==u.uid) throw accE('permission-denied'); delete db.quizzes[id]; emit(); },
    /* live games: the teacher's device runs the game; students only send answers */
    async startGame(gid,quiz){ const u=need(); teacherOf(gid,u); const x=quizClean(quiz); if(!x.qs.length) throw accE('limit/text');
      Object.entries(db.games).forEach(([k,v])=>{ if(v.group===gid&&v.state!=='end') v.state='end'; });
      const id='m'+accId(); db.games[id]={group:gid,teacher:u.uid,title:x.title,n:x.qs.length,state:'lobby',qi:-1,cur:null,board:{},dist:null,correct:null,at:now()}; db.gkeys[id]={qs:x.qs}; db.players[id]={}; emit(); return id; },
    gameKey(gid,id){ const u=need(); teacherOf(gid,u); return Promise.resolve(cl(db.gkeys[id]||null)); },
    async updateGame(gid,id,patch){ const u=need(); teacherOf(gid,u); const g=db.games[id]; if(!g) throw accE('game/none'); Object.assign(g,cl(patch)); emit(); },
    liveGame(gid,cb){ return watch(()=>{ const u=user(); if(!u||!db.groups[gid]) return cb(null); if(db.groups[gid].teacher!==u.uid&&!(db.members[gid]||{})[u.uid]) return cb(null);
      const e=Object.entries(db.games).filter(([,v])=>v.group===gid&&v.state!=='end').sort((a,b)=>b[1].at-a[1].at)[0]; cb(e?{id:e[0],...cl(e[1])}:null); }); },
    game(gid,id,cb){ return watch(()=>{ const g=db.games[id]; cb(g?{id,...cl(g)}:null); }); },
    players(gid,id,cb){ return watch(()=>{ const u=user(); if(!u||(db.groups[gid]||{}).teacher!==u.uid) return cb([]); cb(Object.entries(db.players[id]||{}).map(([uid,p])=>({uid,...cl(p)}))); }); },
    async joinGame(gid,id){ const u=need(); memberOf(gid,u); const P=db.players[id]; if(!P||!db.games[id]||db.games[id].state==='end') throw accE('game/none'); if(!P[u.uid]) P[u.uid]={name:u.name,ans:{},joinedAt:now()}; emit(); },
    async answer(gid,id,qi,a,t){ const u=need(); memberOf(gid,u); const p=(db.players[id]||{})[u.uid]; if(!p) throw accE('game/none'); if(p.ans[qi]) return; p.ans[qi]={a,t:Math.max(0,Math.round(t))}; emit(); },
    async loadState(){ const u=user(); if(!u) return null; return db.state[u.uid]?cl(db.state[u.uid]):null; },
    async saveState(data){ const u=user(); if(!u) return; db.state[u.uid]={data,at:now()}; persist(); },
    _db:()=>db, _reset(){ db={}; ['users','groups','codes','members','asg','subs','state','invites','quizzes','games','gkeys','players'].forEach(k=>db[k]={}); setMe(null); emit(); fireAuth(); } };
  return api; }

/* ---------- Firebase backend (compat SDK, loaded by the site's index.html) ---------- */
function makeFirebaseBackend(cfg){ const fb=window.firebase; const app=fb.apps&&fb.apps.length?fb.app():fb.initializeApp(cfg);
  const auth=fb.auth(); try{ auth.languageCode='ru'; }catch(e){} const db=fb.firestore(), st=fb.storage?fb.storage():null, FV=fb.firestore.FieldValue, TS=fb.firestore.Timestamp;
  let prof=null, profUnsub=null; const authSubs=new Set();
  const out=()=>prof?{...prof,groups:(prof.groups||[]).slice()}:null;
  const fire=()=>authSubs.forEach(f=>{ try{ f(out()); }catch(e){} });
  auth.onAuthStateChanged(u=>{ if(profUnsub){ profUnsub(); profUnsub=null; } if(!u){ prof=null; fire(); return; }
    profUnsub=db.doc('users/'+u.uid).onSnapshot(s=>{ const d=s.data(); const pv=(u.providerData||[]).map(p=>p.providerId);
      prof=d?{uid:u.uid,email:u.email,name:d.name,role:d.role,groups:d.groups||[],avatar:d.avatar||null,bio:d.bio||'',emailVerified:!!u.emailVerified,providers:pv,createdAt:d.createdAt&&d.createdAt.toMillis?d.createdAt.toMillis():null}:{uid:u.uid,email:u.email,name:u.displayName||'',role:null,groups:[],emailVerified:!!u.emailVerified,providers:pv}; fire(); },()=>{}); });
  try{ if(auth.isSignInWithEmailLink(location.href)){ const em=localStorage.getItem('wordy.linkEmail'); if(em) auth.signInWithEmailLink(em,location.href).then(()=>{ try{ localStorage.removeItem('wordy.linkEmail'); history.replaceState(null,'',location.pathname); }catch(e){} }).catch(e=>console.warn('email link',e)); } }catch(e){}
  const oauth=k=>{ const P=ACC_PROVIDERS[k]; if(!P) throw accE('permission-denied'); if(k==='google'){ const p=new fb.auth.GoogleAuthProvider(); p.setCustomParameters({prompt:'select_account'}); return p; } const p=new fb.auth.OAuthProvider(P.id); p.setCustomParameters({prompt:'select_account'}); return p; };
  const reauth=async cur=>{ const u=auth.currentUser; if(!u) throw accE('auth/required'); const pv=(u.providerData||[]).map(p=>p.providerId);
    if(!pv.includes('password')){ const k=Object.keys(ACC_PROVIDERS).find(x=>pv.includes(ACC_PROVIDERS[x].id)); if(!k) throw accE('auth/requires-recent-login'); await u.reauthenticateWithPopup(oauth(k)); return u; }
    if(!cur) throw accE('auth/missing-password'); await u.reauthenticateWithCredential(fb.auth.EmailAuthProvider.credential(u.email,cur)); return u; };
  const need=()=>{ if(!prof) throw accE('auth/required'); return prof; };
  const ms=t=>t&&t.toMillis?t.toMillis():(t||0);
  const doc=s=>({id:s.id,...s.data()});
  const fix=o=>{ const r={...o}; ['createdAt','updatedAt','submittedAt','reviewedAt','joinedAt','codeExp'].forEach(k=>{ if(r[k]!=null) r[k]=ms(r[k]); }); if(r.versions) r.versions=r.versions.map(v=>({...v,at:ms(v.at)})); return r; };
  const api={ mode:'firebase',
    onAuth(cb){ authSubs.add(cb); setTimeout(()=>cb(out()),0); return ()=>authSubs.delete(cb); },
    async signUp({email,password,name,role}){ if(role!=='teacher'&&role!=='student') throw accE('permission-denied'); const c=await auth.createUserWithEmailAndPassword(String(email).trim(),password);
      name=String(name||'').trim().slice(0,ACC_LIM.name)||String(email).split('@')[0]; try{ await c.user.updateProfile({displayName:name}); }catch(e){}
      await db.doc('users/'+c.user.uid).set({name,role,groups:[],createdAt:FV.serverTimestamp()}); return out(); },
    async signIn(email,password){ await auth.signInWithEmailAndPassword(String(email).trim(),password); return out(); },
    /* popup first (keeps the page and its progress); if the browser blocks popups, fall back to a full-page redirect */
    /* passwordless: a one-time link to the e-mail; the address is remembered on this device to finish without retyping */
    async sendLink(email){ email=String(email||'').trim(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw accE('auth/invalid-email');
      await auth.sendSignInLinkToEmail(email,{url:location.origin+location.pathname,handleCodeInApp:true}); try{ localStorage.setItem('wordy.linkEmail',email); }catch(e){} return {sent:true}; },
    linkPending:()=>{ try{ return auth.isSignInWithEmailLink(location.href); }catch(e){ return false; } },
    async completeLink(email){ email=String(email||'').trim(); if(!email) throw accE('link/email'); await auth.signInWithEmailLink(email,location.href);
      try{ localStorage.removeItem('wordy.linkEmail'); history.replaceState(null,'',location.pathname); }catch(e){} return out(); },
    async signInWith(k){ const p=oauth(k); try{ await auth.signInWithPopup(p); }catch(e){ if(e&&(e.code==='auth/popup-blocked'||e.code==='auth/operation-not-supported-in-this-environment')){ await auth.signInWithRedirect(p); return null; } throw e; } return out(); },
    async setRole(role,name){ const u=auth.currentUser; if(!u) throw accE('auth/required'); await db.doc('users/'+u.uid).set({name:String(name||u.displayName||'').slice(0,ACC_LIM.name),role,groups:[],createdAt:FV.serverTimestamp()}); },
    async signOut(){ await auth.signOut(); },
    async resetPassword(email){ email=String(email||'').trim(); if(!email) throw accE('auth/missing-email'); await auth.sendPasswordResetEmail(email); return {sent:true}; },
    async updateProfile(p){ const u=need(); const body={};
      if(p.name!=null){ const n=String(p.name).trim().slice(0,ACC_LIM.name); if(!n) throw accE('limit/text'); body.name=n; }
      if(p.avatar!==undefined) body.avatar=ACC_AVATARS.includes(p.avatar)?p.avatar:null; if(p.bio!=null) body.bio=String(p.bio).slice(0,ACC_LIM.bio);
      await db.doc('users/'+u.uid).update(body); if(body.name&&body.name!==u.name){ try{ await auth.currentUser.updateProfile({displayName:body.name}); }catch(e){} }
      /* the public part of the profile is copied where the other side can read it: teacher → groups, student → member docs */
      const name=body.name||u.name, bio=body.bio!=null?body.bio:(u.bio||''), avatar=body.avatar!==undefined?body.avatar:(u.avatar||null);
      if(u.role==='teacher'){ const q=await db.collection('groups').where('teacher','==',u.uid).get(); const b=db.batch(); q.docs.forEach(d=>b.update(d.ref,{teacherName:name,teacherBio:bio,teacherAvatar:avatar})); await b.commit(); }
      else await Promise.all((u.groups||[]).map(g=>db.doc('groups/'+g+'/members/'+u.uid).update({name,bio,avatar}).catch(()=>{}))); },
    async changePassword(cur,nw){ if(String(nw||'').length<6) throw accE('auth/weak-password'); if(cur===nw) throw accE('pass/same'); const u=await reauth(cur); await u.updatePassword(nw); },
    async changeEmail(cur,email){ email=String(email||'').trim(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw accE('auth/invalid-email'); const u=await reauth(cur); await u.verifyBeforeUpdateEmail(email); return {sent:true}; },
    async issueCert(c){ const u=need(); const name=String(u.name||'').trim(); if(!name) throw accE('cert/name');
      const q=await db.collection('certs').where('uid','==',u.uid).where('level','==',c.level).get().catch(()=>null); if(q&&!q.empty){ const d=q.docs[0]; return {code:d.id,...fix(d.data())}; }
      const code=accCertCode(); const body={uid:u.uid,name,level:c.level,words:c.words|0,gram:c.gram|0,issuedAt:FV.serverTimestamp()}; await db.doc('certs/'+code).set(body); return {code,...body,issuedAt:Date.now()}; },
    myCerts(cb){ const u=prof; if(!u){ cb([]); return ()=>{}; } return db.collection('certs').where('uid','==',u.uid).onSnapshot(q=>cb(q.docs.map(d=>({code:d.id,...d.data(),issuedAt:ms(d.data().issuedAt)||Date.now()}))),()=>cb([])); },
    async sendFeedback(f){ const u=auth.currentUser; const x=fbClean(f); await db.collection('feedback').add({...x,uid:u?u.uid:null,email:u&&u.email?u.email:null,at:FV.serverTimestamp()}); },
    async sendVerify(){ const u=auth.currentUser; if(!u) throw accE('auth/required'); await u.sendEmailVerification(); return {sent:true}; },
    async refreshMe(){ const u=auth.currentUser; if(u){ try{ await u.reload(); }catch(e){} if(prof){ prof={...prof,email:auth.currentUser.email,emailVerified:!!auth.currentUser.emailVerified}; fire(); } } return out(); },
    async deleteAccount(cur){ const me=need(); const u=await reauth(cur);
      if(me.role==='teacher'){ const q=await db.collection('groups').where('teacher','==',me.uid).get().catch(()=>null);
        if(q) for(const d of q.docs){ const g=d.data()||{}; const b=db.batch(); if(g.code) b.delete(db.doc('joinCodes/'+g.code)); b.delete(d.ref); await b.commit().catch(()=>{}); }
        const iv=await db.collection('invites').where('teacher','==',me.uid).get().catch(()=>null); if(iv) await Promise.all(iv.docs.map(d=>d.ref.delete().catch(()=>{}))); }
      else await Promise.all((me.groups||[]).map(g=>db.doc('groups/'+g+'/members/'+me.uid).delete().catch(()=>{})));
      const cs=await db.collection('certs').where('uid','==',me.uid).get().catch(()=>null); if(cs) await Promise.all(cs.docs.map(d=>d.ref.delete().catch(()=>{})));
      const qz=await db.collection('users/'+me.uid+'/quizzes').get().catch(()=>null); if(qz) await Promise.all(qz.docs.map(d=>d.ref.delete().catch(()=>{})));
      await db.doc('users/'+me.uid+'/private/state').delete().catch(()=>{}); await db.doc('users/'+me.uid).delete().catch(()=>{}); await u.delete(); },
    me:out,
    async createGroup(name){ const u=need(); if(u.role!=='teacher') throw accE('role/teacher'); const r=await db.collection('groups').add({name:String(name||'').trim().slice(0,80)||'Моя группа',teacher:u.uid,teacherName:u.name,teacherBio:u.bio||'',teacherAvatar:u.avatar||null,createdAt:FV.serverTimestamp(),code:null,codeExp:null});
      await api.newCode(r.id); return r.id; },
    async renameGroup(gid,name){ await db.doc('groups/'+gid).update({name:String(name||'').trim().slice(0,80)}); },
    async deleteGroup(gid){ const g=(await db.doc('groups/'+gid).get()).data()||{}; const b=db.batch(); if(g.code) b.delete(db.doc('joinCodes/'+g.code)); b.delete(db.doc('groups/'+gid)); await b.commit(); },
    async newCode(gid){ const u=need(); const g=(await db.doc('groups/'+gid).get()).data()||{}; const code=accCode(), exp=TS.fromMillis(accDayEnd(Date.now()));
      const b=db.batch(); if(g.code) b.delete(db.doc('joinCodes/'+g.code)); b.set(db.doc('joinCodes/'+code),{group:gid,teacher:u.uid,exp}); b.update(db.doc('groups/'+gid),{code,codeExp:exp}); await b.commit(); return {code,exp:exp.toMillis()}; },
    async ensureCode(gid){ const g=(await db.doc('groups/'+gid).get()).data()||{}; if(!g.code||ms(g.codeExp)<=Date.now()) return api.newCode(gid); return {code:g.code,exp:ms(g.codeExp)}; },
    myGroups(cb){ const u=prof; if(!u) { cb([]); return ()=>{}; }
      if(u.role==='teacher') return db.collection('groups').where('teacher','==',u.uid).onSnapshot(q=>cb(q.docs.map(d=>fix(doc(d))).sort((a,b)=>b.createdAt-a.createdAt)),()=>cb([]));
      const uns=[], map={}; const emit=()=>cb(Object.values(map).filter(Boolean).sort((a,b)=>b.createdAt-a.createdAt));
      (u.groups||[]).forEach(g=>uns.push(db.doc('groups/'+g).onSnapshot(s=>{ map[g]=s.exists?fix(doc(s)):null; emit(); },()=>{ map[g]=null; emit(); }))); if(!(u.groups||[]).length) cb([]);
      return ()=>uns.forEach(f=>f()); },
    members(gid,cb){ const u=prof; if(!u){ cb([]); return ()=>{}; } const q=u.role==='teacher'?db.collection('groups/'+gid+'/members'):null;
      if(q) return q.onSnapshot(s=>cb(s.docs.map(d=>({uid:d.id,...fix(d.data())})).sort((a,b)=>(a.name||'').localeCompare(b.name||''))),()=>cb([]));
      return db.doc('groups/'+gid+'/members/'+u.uid).onSnapshot(s=>cb(s.exists?[{uid:s.id,...fix(s.data())}]:[]),()=>cb([])); },
    async joinByCode(code){ const u=need(); if(u.role!=='student') throw accE('role/student'); code=accNormCode(code); const c=await db.doc('joinCodes/'+code).get().catch(()=>null);
      if(!c||!c.exists) throw accE('code/invalid'); const d=c.data(); if(ms(d.exp)<=Date.now()) throw accE('code/expired'); if((u.groups||[]).includes(d.group)) throw accE('code/already');
      await db.doc('groups/'+d.group+'/members/'+u.uid).set({name:u.name,bio:u.bio||'',avatar:u.avatar||null,code,joinedAt:FV.serverTimestamp(),stats:{},grant:{}});
      await db.doc('users/'+u.uid).update({groups:FV.arrayUnion(d.group)}); return d.group; },
    async leaveGroup(gid){ const u=need(); await db.doc('groups/'+gid+'/members/'+u.uid).delete(); await db.doc('users/'+u.uid).update({groups:FV.arrayRemove(gid)}); },
    async removeMember(gid,sid){ await db.doc('groups/'+gid+'/members/'+sid).delete(); },
    async setGrant(gid,sid,grant){ const g={}; Object.entries(grant).forEach(([k,v])=>g['grant.'+k]=v); g['grant.at']=FV.serverTimestamp(); await db.doc('groups/'+gid+'/members/'+sid).update(g); },
    myGrants(cb){ const u=prof; if(!u||u.role!=='student'){ cb([]); return ()=>{}; } const map={}, uns=(u.groups||[]).map(g=>db.doc('groups/'+g+'/members/'+u.uid).onSnapshot(s=>{ map[g]=s.exists?(s.data().grant||null):null; cb(Object.values(map).filter(Boolean)); },()=>{}));
      return ()=>uns.forEach(f=>f()); },
    async pushStats(stats){ const u=prof; if(!u||u.role!=='student') return; await Promise.all((u.groups||[]).map(g=>db.doc('groups/'+g+'/members/'+u.uid).update({stats:{...stats,at:Date.now()},name:u.name}).catch(()=>{}))); },
    assignments(gid,cb){ return db.collection('groups/'+gid+'/assignments').orderBy('createdAt','desc').onSnapshot(q=>cb(q.docs.map(d=>fix(doc(d)))),()=>cb([])); },
    async saveAssignment(gid,aid,data){ const text=String(data.text||''), title=String(data.title||'').trim().slice(0,ACC_LIM.title); if(text.length>ACC_LIM.task||!title) throw accE('limit/text');
      const body={title,text,files:data.files||[],due:data.due||null,updatedAt:FV.serverTimestamp()};
      if(aid){ await db.doc('groups/'+gid+'/assignments/'+aid).update(body); return aid; } const r=await db.collection('groups/'+gid+'/assignments').add({...body,createdAt:FV.serverTimestamp()}); return r.id; },
    async deleteAssignment(gid,aid){ await db.doc('groups/'+gid+'/assignments/'+aid).delete(); },
    mySub(gid,aid,cb){ const u=prof; if(!u){ cb(null); return ()=>{}; } return db.doc('groups/'+gid+'/assignments/'+aid+'/subs/'+u.uid).onSnapshot(s=>cb(s.exists?fix(s.data()):null),()=>cb(null)); },
    subs(gid,aid,cb){ return db.collection('groups/'+gid+'/assignments/'+aid+'/subs').onSnapshot(q=>cb(q.docs.map(d=>({uid:d.id,...fix(d.data())}))),()=>cb([])); },
    async saveSub(gid,aid,{text,files,submit}){ const u=need(); text=String(text||''); if(text.length>ACC_LIM.answer) throw accE('limit/text');
      const ref=db.doc('groups/'+gid+'/assignments/'+aid+'/subs/'+u.uid); const p=(await ref.get()).data();
      const body={name:u.name,text,files:files||[],updatedAt:FV.serverTimestamp()};
      if(!p){ Object.assign(body,{status:submit?'submitted':'draft',versions:[],comments:[],createdAt:FV.serverTimestamp()}); }
      if(submit){ body.status='submitted'; body.submittedAt=FV.serverTimestamp(); body.versions=[...((p&&p.versions)||[]),{text,files:(files||[]).length,at:TS.now()}].slice(-ACC_LIM.versions); }
      await ref.set(body,{merge:true}); return body; },
    async review(gid,aid,sid,data){ const body={reviewedAt:FV.serverTimestamp()}; if(data.comments) body.comments=data.comments.slice(0,200); if(data.feedback!=null) body.feedback=String(data.feedback).slice(0,ACC_LIM.feedback);
      if(data.grade!==undefined) body.grade=data.grade; if(data.status) body.status=data.status; await db.doc('groups/'+gid+'/assignments/'+aid+'/subs/'+sid).update(body); },
    async upload(path,file,onProgress){ if(!st) throw accE('limit/file'); if(file.size>ACC_LIM.file) throw accE('limit/file'); const ref=st.ref(path+'/'+Date.now().toString(36)+'-'+file.name.replace(/[^\w.\-]+/g,'_'));
      const task=ref.put(file,{contentType:file.type||'application/octet-stream'}); await new Promise((res,rej)=>task.on('state_changed',s=>onProgress&&onProgress(s.bytesTransferred/s.totalBytes),rej,res));
      return {name:file.name,size:file.size,type:file.type||'',url:await ref.getDownloadURL(),path:ref.fullPath}; },

    async renameMe(name){ const u=need(); name=String(name||'').trim().slice(0,ACC_LIM.name); if(!name) throw accE('limit/text'); await db.doc('users/'+u.uid).update({name}); try{ await auth.currentUser.updateProfile({displayName:name}); }catch(e){}
      if(u.role==='teacher'){ const q=await db.collection('groups').where('teacher','==',u.uid).get(); const b=db.batch(); q.docs.forEach(d=>b.update(d.ref,{teacherName:name})); await b.commit(); }
      else await Promise.all((u.groups||[]).map(g=>db.doc('groups/'+g+'/members/'+u.uid).update({name}).catch(()=>{}))); },
    async invite(gid,email){ const u=need(); email=String(email||'').trim().toLowerCase(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw accE('auth/invalid-email');
      const g=(await db.doc('groups/'+gid).get()).data()||{}; const id=gid+'_'+email; const ref=db.doc('invites/'+id);
      if((await ref.get().catch(()=>null))?.exists) throw accE('invite/dup'); await ref.set({email,group:gid,groupName:g.name||'',teacher:u.uid,teacherName:u.name,at:FV.serverTimestamp()}); return id; },
    invites(gid,cb){ const u=prof; if(!u){ cb([]); return ()=>{}; } return db.collection('invites').where('teacher','==',u.uid).where('group','==',gid).onSnapshot(q=>cb(q.docs.map(d=>fix({id:d.id,...d.data()}))),()=>cb([])); },
    myInvites(cb){ const u=prof; if(!u||u.role!=='student'||!u.email){ cb([]); return ()=>{}; } return db.collection('invites').where('email','==',String(u.email).toLowerCase()).onSnapshot(q=>cb(q.docs.map(d=>fix({id:d.id,...d.data()}))),()=>cb([])); },
    async cancelInvite(id){ await db.doc('invites/'+id).delete(); },
    async acceptInvite(id){ const u=need(); const s=await db.doc('invites/'+id).get(); if(!s.exists) throw accE('invite/none'); const v=s.data(), gid=v.group;
      await db.doc('groups/'+gid+'/members/'+u.uid).set({name:u.name,bio:u.bio||'',avatar:u.avatar||null,code:'invite',joinedAt:FV.serverTimestamp(),stats:{},grant:{}});
      await db.doc('users/'+u.uid).update({groups:FV.arrayUnion(gid)}); await db.doc('invites/'+id).delete().catch(()=>{}); return gid; },
    myQuizzes(cb){ const u=prof; if(!u){ cb([]); return ()=>{}; } return db.collection('users/'+u.uid+'/quizzes').onSnapshot(q=>cb(q.docs.map(d=>fix({id:d.id,...d.data()})).sort((a,b)=>b.updatedAt-a.updatedAt)),()=>cb([])); },
    async saveQuiz(id,q){ const u=need(); const x=quizClean(q); const col=db.collection('users/'+u.uid+'/quizzes'); const ref=id?col.doc(id):col.doc(); await ref.set({...x,updatedAt:FV.serverTimestamp()}); return ref.id; },
    async deleteQuiz(id){ const u=need(); await db.doc('users/'+u.uid+'/quizzes/'+id).delete(); },
    async startGame(gid,quiz){ const u=need(); const x=quizClean(quiz); if(!x.qs.length) throw accE('limit/text');
      const old=await db.collection('groups/'+gid+'/games').where('active','==',true).get().catch(()=>null); if(old) await Promise.all(old.docs.map(d=>d.ref.update({state:'end',active:false}).catch(()=>{})));
      const ref=db.collection('groups/'+gid+'/games').doc(); await ref.set({group:gid,teacher:u.uid,title:x.title,n:x.qs.length,state:'lobby',qi:-1,cur:null,board:{},dist:null,correct:null,active:true,at:Date.now()});
      await db.doc('groups/'+gid+'/games/'+ref.id+'/key/k').set({qs:x.qs}); return ref.id; },
    async gameKey(gid,id){ const s=await db.doc('groups/'+gid+'/games/'+id+'/key/k').get(); return s.exists?s.data():null; },
    async updateGame(gid,id,patch){ const p={...patch}; if(p.state==='end') p.active=false; await db.doc('groups/'+gid+'/games/'+id).update(p); },
    liveGame(gid,cb){ return db.collection('groups/'+gid+'/games').where('active','==',true).onSnapshot(q=>{ const d=q.docs.map(x=>({id:x.id,...x.data()})).sort((a,b)=>b.at-a.at)[0]; cb(d||null); },()=>cb(null)); },
    game(gid,id,cb){ return db.doc('groups/'+gid+'/games/'+id).onSnapshot(s=>cb(s.exists?{id:s.id,...s.data()}:null),()=>cb(null)); },
    players(gid,id,cb){ return db.collection('groups/'+gid+'/games/'+id+'/players').onSnapshot(q=>cb(q.docs.map(d=>({uid:d.id,...d.data()}))),()=>cb([])); },
    async joinGame(gid,id){ const u=need(); const ref=db.doc('groups/'+gid+'/games/'+id+'/players/'+u.uid); const s=await ref.get().catch(()=>null); if(!s||!s.exists) await ref.set({name:u.name,ans:{},joinedAt:Date.now()}); },
    async answer(gid,id,qi,a,t){ const u=need(); await db.doc('groups/'+gid+'/games/'+id+'/players/'+u.uid).update({['ans.'+qi]:{a,t:Math.max(0,Math.round(t))}}); },
    async loadState(){ const u=prof; if(!u) return null; const s=await db.doc('users/'+u.uid+'/private/state').get().catch(()=>null); return s&&s.exists?{data:s.data().data,at:ms(s.data().at)}:null; },
    async saveState(data){ const u=prof; if(!u) return; await db.doc('users/'+u.uid+'/private/state').set({data,at:FV.serverTimestamp()}); } };
  return api; }

/* ---------- which backend: the site sets window.WORDY_FIREBASE; inside Claude a demo can be switched on ---------- */
const ACC_DEMO_KEY='wordy.accdemo';
let ACC=null;
function accInit(){ try{ if(window.WORDY_FIREBASE&&window.firebase){ ACC=makeFirebaseBackend(window.WORDY_FIREBASE); return; } }catch(e){ console.warn('firebase init failed',e); }
  /* on the site Firebase loads in parallel with the app (window.__fbReady): no demo there, «Класс» appears as soon as Firebase is ready */
  if(window.WORDY_FIREBASE&&window.__fbReady){ ACC=null; window.__fbReady.then(ok=>{ if(!ok||!window.firebase||ACC) return; try{ ACC=makeFirebaseBackend(window.WORDY_FIREBASE); accEmit(); }catch(e){ console.warn('firebase init failed',e); } }); return; }
  let on=true; try{ on=localStorage.getItem(ACC_DEMO_KEY)!=='0'||/[?&]demo=1/.test(location.search); }catch(e){} ACC=on?makeMemBackend():null; }
accInit();
const accListeners=new Set(); const accEmit=()=>accListeners.forEach(f=>f());
function accSetDemo(on){ try{ localStorage.setItem(ACC_DEMO_KEY,on?'1':'0'); }catch(e){} if(window.WORDY_FIREBASE) return; ACC=on?makeMemBackend():null; accEmit(); }
function useAcc(){ const [,force]=useState(0); const [user,setUser]=useState(undefined);
  useEffect(()=>{ const f=()=>force(x=>x+1); accListeners.add(f); return ()=>accListeners.delete(f); },[]);
  const be=ACC; useEffect(()=>{ if(!be){ setUser(null); return; } setUser(undefined); return be.onAuth(u=>setUser(u)); },[be]);
  return {be,user,ready:user!==undefined,demo:!!be&&be.mode==='demo'}; }
function useLive(fn,deps){ const [v,setV]=useState(null); useEffect(()=>{ if(!ACC) return; let alive=true; const un=fn(x=>{ if(alive) setV(x); }); return ()=>{ alive=false; un&&un(); }; },deps); return v; }

/* ================= ACCOUNTS: screens ================= */
const accFmtDate=ms=>{ if(!ms) return ''; const d=new Date(ms); return d.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})+' '+d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}); };
const accFmtSize=b=>b>1048576?(b/1048576).toFixed(1)+' МБ':Math.max(1,Math.round(b/1024))+' КБ';
const SUB_ST={draft:['Черновик','muted'],submitted:['Отправлено','warn'],returned:['На доработку','bad'],checked:['Проверено','good']};
function AccStatus({s}){ const k=s&&s.status||'none'; const [t,c]=SUB_ST[k]||['Не начато','muted']; return html`<span className=${'acc-st '+c}>${t}</span>`; }
function AccErr({e}){ return e?html`<p className="acc-err" role="alert">${accErrText(e)}</p>`:null; }

function AccAuth({be,demo}){ const [tab,setTab]=useState('in'), [email,setEmail]=useState(''), [pass,setPass]=useState(''), [showPass,setShowPass]=useState(false), [name,setName]=useState(''), [role,setRole]=useState(null), [err,setErr]=useState(null), [busy,setBusy]=useState(false), [sent,setSent]=useState(false);
  useEffect(()=>{ W('react','wave'); },[tab]);
  useEffect(()=>{ const f=e=>{ const t=e.detail&&e.detail.tab; if(t==='up'||t==='in') setTab(t); }; window.addEventListener('wordy-open-auth',f); return ()=>window.removeEventListener('wordy-open-auth',f); },[]);
  const go=async()=>{ setErr(null); setBusy(true); try{ if(tab==='in') await be.signIn(email,pass); else { if(!role) throw accE('Выбери, кто ты: ученик или учитель.'); await be.signUp({email,password:pass,name,role}); }
      SFX('fanfare'); W('react','cheer'); W('say',tab==='in'?'С возвращением!':'Добро пожаловать в Wordy!',0,true); }catch(e){ setErr(e); SFX('wrong'); W('react','encourage'); } setBusy(false); };
  const reset=async()=>{ setErr(null); setBusy(true); try{ const r=await be.resetPassword(email); setSent(r&&r.demo?'demo':'sent'); SFX('pop'); }catch(e){ setErr(e); SFX('wrong'); } setBusy(false); };
  if(tab==='reset') return html`<${AccReset} be=${be} demo=${demo} email=${email} setEmail=${setEmail} onBack=${()=>{ setTab('in'); setErr(null); setSent(false); }}/>`;
  const ok=email.trim()&&pass.length>=6&&(tab==='in'||(name.trim()&&role));
  return html`<section className="acc-auth enter">
    ${demo?html`<p className="acc-demo">Демо-режим: аккаунты хранятся только в этом браузере. Настоящая регистрация заработает на сайте Wordy.</p>`:null}
    <div className="page-h"><h1>${tab==='in'?'Вход':'Регистрация'}</h1></div>
    <${AccOAuth} be=${be} link=${true}/>${!demo&&accProviders().length?html`<div className="acc-or"><span>или по email</span></div>`:null}
    <div className="acc-tabs" role="tablist"><button role="tab" id="acc-tab-in" aria-selected=${tab==='in'} onClick=${()=>{ setTab('in'); setErr(null); }}>Вход</button><button role="tab" id="acc-tab-up" aria-selected=${tab==='up'} onClick=${()=>{ setTab('up'); setErr(null); }}>Регистрация</button></div>
    <form className="acc-form" onSubmit=${e=>{ e.preventDefault(); if(ok&&!busy) go(); }}>
      ${tab==='up'?html`<label>Имя и фамилия <small className="muted">— так тебя увидят в группе</small><input id="acc-name" value=${name} maxLength=${ACC_LIM.name} autoComplete="name" onChange=${e=>setName(e.target.value)} placeholder="Например, Айбек Асанов"/></label>
        <div className="acc-roles" role="radiogroup" aria-label="Кто ты"><button type="button" role="radio" id="acc-role-student" aria-checked=${role==='student'} className=${role==='student'?'on':''} onClick=${()=>{ SFX('tap'); setRole('student'); }}><b>Я ученик</b><small>Вступаю в группу по коду учителя</small></button>
          <button type="button" role="radio" id="acc-role-teacher" aria-checked=${role==='teacher'} className=${role==='teacher'?'on':''} onClick=${()=>{ SFX('tap'); setRole('teacher'); }}><b>Я учитель</b><small>Создаю группы и задаю домашки</small></button></div>`:null}
      <label>Email<input id="acc-email" type="email" value=${email} autoComplete="email" onChange=${e=>setEmail(e.target.value)} placeholder="name@example.com"/></label>
      <label>Пароль<span className="acc-pass"><input id="acc-pass" type=${showPass?'text':'password'} value=${pass} autoComplete=${tab==='in'?'current-password':'new-password'} autoCapitalize="off" autoCorrect="off" spellCheck=${false} onChange=${e=>setPass(e.target.value)} placeholder="Минимум 6 символов"/>
        <button type="button" className="acc-eye" id="acc-eye" aria-label=${showPass?'Скрыть пароль':'Показать пароль'} aria-pressed=${showPass} onClick=${()=>setShowPass(v=>!v)}>${showPass?html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A9.8 9.8 0 0 1 12 5c5 0 9 4.5 10 7-.4 1-1.3 2.4-2.6 3.7M6.6 6.6C4.4 8 2.8 10.1 2 12c1 2.5 5 7 10 7 1.9 0 3.6-.6 5-1.5"/></svg>`:html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7S3 14.5 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`}</button></span></label>
      <${AccErr} e=${err}/>
      ${tab==='up'?html`<p className="muted acc-note">Роль выбирается один раз. Сменить её потом нельзя — так ученик не сможет сделать себя учителем.</p>`:null}
      <button className="btn wide" id="acc-go" type="submit" disabled=${!ok||busy}>${busy?'Подожди…':tab==='in'?'Войти':'Создать аккаунт'}</button>
      ${tab==='in'?html`<button type="button" className="link-btn" id="acc-reset" onClick=${()=>{ SFX('tap'); setTab('reset'); setErr(null); }}>Забыл пароль</button>`:null}
    </form></section>`; }

function AccHead({user,be,title,onBack}){ return html`<div className="acc-head">${onBack?html`<button className="icon-btn" id="acc-back" aria-label="Назад" onClick=${()=>{ SFX('tap'); onBack(); window.scrollTo({top:0}); }}>${I.back()}</button>`:null}
  <div><span className="phase">${user.role==='teacher'?'Учитель':'Ученик'} · ${user.name}</span><h1>${title}</h1></div>
  ${onBack?null:html`<button className="btn small ghost" id="acc-out" onClick=${()=>{ SFX('tap'); be.signOut(); }}>Выйти</button>`}</div>`; }

function AccFiles({files,onRemove}){ if(!files||!files.length) return null; return html`<ul className="acc-files">${files.map((f,i)=>html`<li key=${i}><a href=${f.url} target="_blank" rel="noopener" download=${f.name}>📎 ${f.name}</a><small className="muted">${accFmtSize(f.size||0)}</small>${onRemove?html`<button className="icon-btn small" aria-label=${'Убрать '+f.name} onClick=${()=>onRemove(i)}>${I.close()}</button>`:null}</li>`)}</ul>`; }
function AccUpload({be,path,onAdd,id}){ const [busy,setBusy]=useState(0), [err,setErr]=useState(null); const ref=useRef(null);
  const pick=async e=>{ const fs=[...(e.target.files||[])]; e.target.value=''; setErr(null); for(const f of fs){ try{ setBusy(0.01); const r=await be.upload(path,f,p=>setBusy(Math.max(0.01,p))); onAdd(r); }catch(x){ setErr(x); } } setBusy(0); };
  return html`<div className="acc-up"><input ref=${ref} type="file" multiple hidden id=${id||'acc-file'} onChange=${pick}/><button type="button" className="btn small ghost" id=${(id||'acc-file')+'-btn'} disabled=${!!busy} onClick=${()=>ref.current&&ref.current.click()}>${busy?'Загрузка '+Math.round(busy*100)+'%':'📎 Прикрепить файлы'}</button>
    <small className="muted">${be.mode==='demo'?'В демо — до 1 МБ на файл':'До 20 МБ на файл, сколько угодно файлов'}</small><${AccErr} e=${err}/></div>`; }

/* ---------- password reset ---------- */
function AccReset({be,demo,email,setEmail,onBack}){ const [err,setErr]=useState(null), [busy,setBusy]=useState(false), [sent,setSent]=useState(null), [np,setNp]=useState(''), [done,setDone]=useState(false);
  const go=async()=>{ setErr(null); setBusy(true); try{ const r=await be.resetPassword(email); setSent(r&&r.demo?'demo':'sent'); SFX('pop'); }catch(e){ setErr(e); SFX('wrong'); } setBusy(false); };
  const demoSet=async()=>{ setErr(null); try{ await be.demoSetPassword(email,np); setDone(true); SFX('fanfare'); }catch(e){ setErr(e); } };
  return html`<section className="acc-auth enter" id="acc-reset-page"><div className="acc-head"><button className="icon-btn" id="rs-back" aria-label="Назад ко входу" onClick=${onBack}>${I.back()}</button><div><h1>Новый пароль</h1></div></div>
    ${sent==='sent'?html`<div className="acc-card" role="status" id="rs-sent"><b>Проверь почту ${email.trim()}</b>
        <p>Если аккаунт с этим адресом есть, туда пришло письмо от Wordy со ссылкой. Открой её, придумай новый пароль и войди с ним.</p>
        <p className="muted">Письма нет через пару минут? Загляни в «Спам» и «Промоакции». Отправить ещё раз можно кнопкой ниже.</p>
        <div className="actions"><button className="btn ghost" id="rs-again" disabled=${busy} onClick=${go}>Отправить ещё раз</button><button className="btn" id="rs-login" onClick=${onBack}>Ко входу</button></div><${AccErr} e=${err}/></div>`
    :sent==='demo'?html`<div className="acc-card" id="rs-demo"><b>Демо-режим не отправляет письма</b><p className="muted">Аккаунты в демо хранятся только в этом браузере, поэтому новый пароль можно задать прямо здесь.</p>
        ${done?html`<p className="acc-ok" role="status">Пароль изменён. Войди с новым паролем.</p><button className="btn wide" onClick=${onBack}>Ко входу</button>`
        :html`<div className="acc-form"><label>Новый пароль<input id="rs-new" type="password" value=${np} autoComplete="new-password" placeholder="Минимум 6 символов" onChange=${e=>setNp(e.target.value)}/></label><${AccErr} e=${err}/><button className="btn wide" id="rs-set" disabled=${np.length<6} onClick=${demoSet}>Сохранить пароль</button></div>`}</div>`
    :html`<form className="acc-form" onSubmit=${e=>{ e.preventDefault(); if(email.trim()&&!busy) go(); }}>
        <p className="muted">Впиши email, с которым регистрировался. Мы пришлём ссылку, по которой можно задать новый пароль.</p>
        <label>Email<input id="rs-email" type="email" value=${email} autoComplete="email" placeholder="name@example.com" onChange=${e=>setEmail(e.target.value)}/></label>
        <${AccErr} e=${err}/>
        <button className="btn wide" id="rs-go" type="submit" disabled=${!email.trim()||busy}>${busy?'Отправляю…':'Прислать ссылку'}</button></form>`}
  </section>`; }

/* ---------- profile: name the other side sees ---------- */
const accInitials=n=>String(n||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'?';
const accAva=(user,big)=>html`<span className=${'acc-ava ava-'+(user.avatar||'navy')+(big?' big':'')} aria-hidden="true">${accInitials(user.name)}</span>`;
function AccProfile({be,user,onOpen}){ const [ed,setEd]=useState(false), [name,setName]=useState(user.name||''), [err,setErr]=useState(null), [ok,setOk]=useState(false);
  useEffect(()=>{ if(!ed) setName(user.name||''); },[user.name,ed]);
  const save=async()=>{ setErr(null); try{ await be.renameMe(name); setEd(false); setOk(true); setTimeout(()=>setOk(false),1800); SFX('pop'); }catch(e){ setErr(e); } };
  const T=user.role==='teacher';
  return html`<div className="acc-prof" id="acc-prof">${accAva(user)}
    ${ed?html`<div className="acc-prof-ed"><label className="sr-only" htmlFor="pf-name">Имя и фамилия</label><input id="pf-name" value=${name} maxLength=${ACC_LIM.name} autoComplete="name" placeholder=${T?'Например, Алим Ахматов':'Имя и фамилия'} onChange=${e=>setName(e.target.value)} onKeyDown=${e=>{ if(e.key==='Enter'&&name.trim()) save(); if(e.key==='Escape') setEd(false); }}/>
        <div className="actions"><button className="btn small ghost" id="pf-cancel" onClick=${()=>{ setEd(false); setErr(null); }}>Отмена</button><button className="btn small" id="pf-save" disabled=${!name.trim()} onClick=${save}>Сохранить</button></div><${AccErr} e=${err}/></div>`
    :html`<div className="acc-prof-t"><b id="pf-shown">${user.name}</b><small className="muted">${T?'Учитель':'Ученик'}${user.email?' · '+user.email:''}</small>
        <small className="muted">${ok?'Имя сохранено':T?'Это имя видят ученики в своих группах':'Это имя видит учитель'}</small></div>
      <div className="acc-prof-b"><button className="btn small ghost" id="pf-edit" onClick=${()=>{ SFX('tap'); setEd(true); }}>Изменить имя</button>${onOpen?html`<button className="btn small" id="pf-open" onClick=${()=>{ SFX('pop'); onOpen(); window.scrollTo({top:0}); }}>Профиль</button>`:null}</div>`}
  </div>`; }

/* ---------- account page: everything about the account in one place ---------- */
const AVA_NAMES={navy:'Тёмно-синий',orange:'Оранжевый',green:'Зелёный',plum:'Сливовый',teal:'Бирюзовый',rose:'Розовый',sand:'Песочный',slate:'Графитовый'};
function AccSec({title,children,id}){ return html`<div className="acc-card acc-sec" id=${id}><b>${title}</b>${children}</div>`; }
function AccountPage({be,user,st,onBack}){ const T=user.role==='teacher', demo=be.mode==='demo';
  const pv=user.providers||['password'], hasPass=pv.includes('password'), via=Object.keys(ACC_PROVIDERS).filter(k=>pv.includes(ACC_PROVIDERS[k].id)).map(k=>ACC_PROVIDERS[k].name);
  const [name,setName]=useState(user.name||''), [bio,setBio]=useState(user.bio||''), [ava,setAva]=useState(user.avatar||'navy'), [pmsg,setPmsg]=useState(''), [perr,setPerr]=useState(null);
  const [cur,setCur]=useState(''), [np,setNp]=useState(''), [np2,setNp2]=useState(''), [pwMsg,setPwMsg]=useState(''), [pwErr,setPwErr]=useState(null);
  const [em,setEm]=useState(''), [emCur,setEmCur]=useState(''), [emMsg,setEmMsg]=useState(''), [emErr,setEmErr]=useState(null), [vMsg,setVMsg]=useState(''), [vErr,setVErr]=useState(null);
  const [del,setDel]=useState(false), [delCur,setDelCur]=useState(''), [delErr,setDelErr]=useState(null), [busy,setBusy]=useState('');
  useEffect(()=>{ be.refreshMe&&be.refreshMe().catch(()=>{}); },[]);
  const dirty=name.trim()!==(user.name||'')||bio!==(user.bio||'')||ava!==(user.avatar||'navy');
  const curErr=e=>(e&&['auth/wrong-password','auth/invalid-credential','auth/invalid-login-credentials','auth/user-mismatch'].includes(e.code))?accE('pass/cur'):e;
  const run=async(k,fn,ok,err)=>{ setBusy(k); err(null); try{ await fn(); ok(); SFX('pop'); }catch(e){ err(curErr(e)); SFX('wrong'); } setBusy(''); };
  const saveProfile=()=>run('p',()=>be.updateProfile({name,bio,avatar:ava}),()=>{ setPmsg('Профиль сохранён'); setTimeout(()=>setPmsg(''),2200); },setPerr);
  const changePass=()=>{ if(np!==np2){ setPwErr(accE('pass/mismatch')); return; } run('pw',()=>be.changePassword(cur,np),()=>{ setPwMsg('Пароль изменён. В следующий раз входи с новым.'); setCur(''); setNp(''); setNp2(''); },setPwErr); };
  const changeEmail=()=>run('em',async()=>{ const r=await be.changeEmail(emCur,em); setEmMsg(r&&r.demo?'Email изменён на '+em.trim().toLowerCase()+'.':'Мы отправили ссылку на '+em.trim()+'. Email сменится, когда ты откроешь её. До этого входи со старым адресом.'); setEm(''); setEmCur(''); },()=>{},setEmErr);
  const verify=()=>run('v',async()=>{ const r=await be.sendVerify(); setVMsg(r&&r.demo?'В демо письма не отправляются.':'Письмо отправлено на '+user.email+'. Открой ссылку из него, потом обнови страницу.'); },()=>{},setVErr);
  const remove=()=>run('del',()=>be.deleteAccount(delCur),()=>{ W('say','Аккаунт удалён. Прогресс на этом устройстве остался.',0,true); },setDelErr);
  const pw=(id,v,set,ph,ac)=>html`<input id=${id} type="password" value=${v} autoComplete=${ac} placeholder=${ph} onChange=${e=>set(e.target.value)}/>`;
  return html`<section className="enter acc-page" id="acc-page"><div className="acc-head"><button className="icon-btn" id="ap-back" aria-label="Назад" onClick=${onBack}>${I.back()}</button><div><span className="phase">${T?'Учитель':'Ученик'}</span><h1>Профиль</h1></div></div>

    <${AccSec} title="Как тебя видят" id="ap-prof">
      <div className="ap-top">${accAva({name,avatar:ava},true)}<div className="ap-who"><b>${name.trim()||'Без имени'}</b><small className="muted">${T?'Так тебя видят ученики в группах':'Так тебя видит учитель группы'}</small></div></div>
      <div className="acc-form">
        <label>Имя и фамилия<input id="ap-name" value=${name} maxLength=${ACC_LIM.name} autoComplete="name" onChange=${e=>setName(e.target.value)}/></label>
        <div><span className="ap-l">Цвет аватара</span><div className="ap-colors" role="radiogroup" aria-label="Цвет аватара">${ACC_AVATARS.map(c=>html`<button key=${c} type="button" role="radio" aria-checked=${ava===c} aria-label=${AVA_NAMES[c]} id=${'ap-c-'+c} className=${'ap-color ava-'+c} onClick=${()=>{ SFX('tap'); setAva(c); }}></button>`)}</div></div>
        <label>${T?'О себе для учеников':'О себе и своей цели'}<textarea id="ap-bio" rows="3" value=${bio} maxLength=${ACC_LIM.bio} placeholder=${T?'Например: преподаю английский и IELTS, занятия вт, чт, сб в 18:00':'Например: готовлюсь к IELTS, цель 7.0 к весне'} onChange=${e=>setBio(e.target.value)}></textarea><small className="acc-count">${bio.length} / ${ACC_LIM.bio}</small></label>
        <${AccErr} e=${perr}/>${pmsg?html`<p className="acc-ok" role="status">${pmsg}</p>`:null}
        <button className="btn" id="ap-save" disabled=${!dirty||!name.trim()||busy==='p'} onClick=${saveProfile}>${busy==='p'?'Сохраняю…':'Сохранить профиль'}</button></div>
    <//>

    <${AccSec} title="Email" id="ap-email">
      <p><span id="ap-email-v">${user.email}</span> · ${user.emailVerified?html`<span className="acc-st good">подтверждён</span>`:html`<span className="acc-st muted">не подтверждён</span>`}</p>
      ${!user.emailVerified?html`<p className="muted">Подтверждённый email нужен, чтобы восстановить пароль, если забудешь его.</p><button className="btn small ghost" id="ap-verify" disabled=${busy==='v'} onClick=${verify}>Прислать письмо для подтверждения</button>${vMsg?html`<p className="acc-ok" role="status">${vMsg}</p>`:null}<${AccErr} e=${vErr}/>`:null}
      ${via.length?html`<p className="muted">Вход через ${via.join(' и ')}.${hasPass?'':' Email меняется в настройках аккаунта '+via[0]+'.'}</p>`:null}
      ${hasPass?html`<details className="ap-more"><summary>Сменить email</summary><div className="acc-form">
        <label>Новый email<input id="ap-em" type="email" value=${em} autoComplete="email" onChange=${e=>setEm(e.target.value)}/></label>
        <label>Текущий пароль${pw('ap-em-cur',emCur,setEmCur,'Для подтверждения','current-password')}</label>
        ${T?null:html`<p className="muted">Приглашения учителя придут на новый адрес, когда он заработает.</p>`}
        <${AccErr} e=${emErr}/>${emMsg?html`<p className="acc-ok" role="status">${emMsg}</p>`:null}
        <button className="btn small" id="ap-em-go" disabled=${!em.trim()||!emCur||busy==='em'} onClick=${changeEmail}>Сменить email</button></div></details>`:null}
    <//>

    ${hasPass?html`<${AccSec} title="Пароль" id="ap-pass">
      <div className="acc-form">
        <label>Текущий пароль${pw('ap-cur',cur,setCur,'','current-password')}</label>
        <label>Новый пароль${pw('ap-new',np,setNp,'Минимум 6 символов','new-password')}</label>
        <label>Повтори новый пароль${pw('ap-new2',np2,setNp2,'','new-password')}</label>
        <${AccErr} e=${pwErr}/>${pwMsg?html`<p className="acc-ok" role="status">${pwMsg}</p>`:null}
        <button className="btn small" id="ap-pw-go" disabled=${!cur||np.length<6||!np2||busy==='pw'} onClick=${changePass}>Сменить пароль</button></div>
    <//>`:null}

    <${AccSec} title="Прогресс" id="ap-sync">
      <p className="muted">${demo?'В демо прогресс хранится только в этом браузере.':'Слова, звёзды, XP и результаты тестов сохраняются в аккаунте сами. Войди на другом телефоне или компьютере — прогресс подтянется.'}</p>
      ${st?html`<div className="acc-stats"><span><b>${st.level||'—'}</b><small>уровень</small></span><span><b>${(st.xp||0).toLocaleString('ru-RU')}</b><small>XP</small></span><span><b>${Object.keys(st.boxes||{}).length}</b><small>слов в изучении</small></span><span><b>${st.streak||0}</b><small>дней подряд</small></span></div>`:null}
    <//>

    <${AccSec} title="Какие данные хранит Wordy" id="ap-privacy">
      <p className="muted">Имя, email, роль, «о себе», твои группы, задания и ответы, прогресс в обучении. ${T?'Ученики твоих групп видят твоё имя, цвет аватара и «о себе».':'Учитель группы видит твоё имя, «о себе», прогресс и ответы на его задания. Другие ученики видят только твоё имя в таблице лидеров викторины.'} Пароль Wordy не видит: им занимается Google Firebase.</p>
    <//>

    <div className="acc-card acc-sec"><div className="actions ap-out"><button className="btn ghost" id="ap-out" onClick=${()=>{ SFX('tap'); be.signOut(); }}>Выйти из аккаунта</button></div></div>

    <details className="acc-danger" id="ap-del-box" open=${del} onToggle=${e=>setDel(e.target.open)}><summary>Удалить аккаунт</summary>
      <p className="muted">${T?'Удалятся аккаунт, твои группы с заданиями и ответами учеников, викторины и приглашения.':'Удалятся аккаунт, ответы на задания и облачный прогресс. Ты выйдешь из всех групп.'} Отменить это нельзя. Прогресс на этом устройстве останется.</p>
      <div className="acc-form">${hasPass?html`<label>Пароль для подтверждения${pw('ap-del-cur',delCur,setDelCur,'','current-password')}</label>`:html`<p className="muted">Для подтверждения откроется окно входа ${via[0]||''}.</p>`}<${AccErr} e=${delErr}/>
        <button className="btn danger" id="ap-del-go" disabled=${(hasPass&&!delCur)||busy==='del'} onClick=${()=>{ if(confirm('Точно удалить аккаунт '+user.email+'? Это нельзя отменить.')) remove(); }}>Удалить навсегда</button></div></details>
  </section>`; }

/* ---------- teacher: add students by email ---------- */
function InviteBox({be,gid}){ const inv=useLive(cb=>be.invites(gid,cb),[gid]); const [email,setEmail]=useState(''), [err,setErr]=useState(null), [ok,setOk]=useState('');
  const go=async()=>{ setErr(null); setOk(''); try{ await be.invite(gid,email); setOk('Приглашение для '+email.trim().toLowerCase()+' отправлено'); setEmail(''); SFX('pop'); }catch(e){ setErr(e); } };
  return html`<div className="acc-card" id="inv-box"><b>Добавить ученика</b>
    <p className="muted">Впиши email, с которым ученик зарегистрировался в Wordy. Он увидит приглашение во вкладке «Класс» и вступит одной кнопкой. Можно и по коду группы выше.</p>
    <div className="acc-row"><input id="inv-email" type="email" value=${email} autoComplete="off" placeholder="student@example.com" onChange=${e=>setEmail(e.target.value)} onKeyDown=${e=>{ if(e.key==='Enter'&&email.trim()) go(); }}/><button className="btn" id="inv-go" disabled=${!email.trim()} onClick=${go}>Пригласить</button></div>
    <${AccErr} e=${err}/>${ok?html`<p className="acc-ok" role="status">${ok}</p>`:null}
    ${inv&&inv.length?html`<ul className="acc-inv">${inv.map(v=>html`<li key=${v.id}><span>${v.email}</span><small className="muted">ждёт ответа</small><button className="link-btn" id=${'inv-x-'+v.id.replace(/[^\w]/g,'_')} onClick=${()=>be.cancelInvite(v.id)}>Отменить</button></li>`)}</ul>`:null}
  </div>`; }

/* ---------- teacher ---------- */
function TeacherHome({be,user,open,openProfile}){ const groups=useLive(cb=>be.myGroups(cb),[be,user.uid]); const [name,setName]=useState(''), [err,setErr]=useState(null), [busy,setBusy]=useState(false);
  const create=async()=>{ setBusy(true); setErr(null); try{ const id=await be.createGroup(name); setName(''); SFX('fanfare'); W('react','cheer'); W('say','Группа создана! Отправь ученикам код.',0,true); open(id); }catch(e){ setErr(e); } setBusy(false); };
  return html`<section className="enter"><${AccHead} user=${user} be=${be} title="Мои группы"/><${AccProfile} be=${be} user=${user} onOpen=${openProfile}/>
    <div className="acc-card"><b>Новая группа</b><small className="muted">Для индивидуального ученика создай группу с его именем.</small><div className="acc-row"><input id="g-name" value=${name} maxLength="80" placeholder="Например, Интенсив IELTS или Айбек — индивидуально" onChange=${e=>setName(e.target.value)} onKeyDown=${e=>{ if(e.key==='Enter'&&name.trim()) create(); }}/><button className="btn" id="g-create" disabled=${!name.trim()||busy} onClick=${create}>Создать</button></div><${AccErr} e=${err}/></div>
    ${groups==null?html`<p className="muted">Загрузка…</p>`:!groups.length?html`<p className="empty">Групп пока нет. Создай первую — у неё будет свой код для учеников.</p>`
      :html`<ul className="acc-list">${groups.map(g=>html`<li key=${g.id}><button className="acc-item" id=${'g-'+g.id} onClick=${()=>{ SFX('pop'); open(g.id); }}><div><b>${g.name}</b><small className="muted">${g.count||0} ${plural(g.count||0,'ученик','ученика','учеников')}</small></div><span className="acc-code-mini">${g.code&&g.codeExp>Date.now()+((window.__accClock)||0)?g.code:'—'}</span></button></li>`)}</ul>`}
  </section>`; }

function CodeCard({be,gid}){ const [c,setC]=useState(null), [err,setErr]=useState(null), [copied,setCopied]=useState(false);
  useEffect(()=>{ let on=true; be.ensureCode(gid).then(x=>{ if(on) setC(x); }).catch(e=>on&&setErr(e)); return ()=>{ on=false; }; },[gid]);
  const renew=async()=>{ setErr(null); try{ setC(await be.newCode(gid)); SFX('pop'); }catch(e){ setErr(e); } };
  const copy=()=>{ try{ navigator.clipboard.writeText(c.code); setCopied(true); setTimeout(()=>setCopied(false),1500); SFX('coin'); }catch(e){} };
  return html`<div className="acc-codecard"><span className="phase">Код для вступления · действует сегодня</span>
    <div className="acc-code" id="g-code" aria-live="polite">${c?c.code:'…'}</div>
    <small className="muted">${c?'До '+new Date(c.exp).toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})+'. Завтра будет новый — старый перестанет работать.':''}</small>
    <div className="actions"><button className="btn small" id="g-copy" disabled=${!c} onClick=${copy}>${copied?'Скопировано':'Скопировать'}</button><button className="btn small ghost" id="g-renew" onClick=${renew}>Новый код сейчас</button></div><${AccErr} e=${err}/></div>`; }

function TeacherGroup({be,user,gid,onBack}){ const groups=useLive(cb=>be.myGroups(cb),[be,user.uid]); const g=(groups||[]).find(x=>x.id===gid);
  const members=useLive(cb=>be.members(gid,cb),[gid]); const asg=useLive(cb=>be.assignments(gid,cb),[gid]);
  const [tab,setTab]=useState('asg'), [edit,setEdit]=useState(null), [openA,setOpenA]=useState(null), [hosting,setHosting]=useState(false);
  if(edit) return html`<${AsgForm} be=${be} gid=${gid} a=${edit===true?null:edit} onDone=${()=>{ setEdit(null); window.scrollTo({top:0}); }}/>`;
  const A=openA&&(asg||[]).find(x=>x.id===openA); if(A) return html`<${TeacherAsg} be=${be} user=${user} gid=${gid} a=${A} members=${members||[]} onBack=${()=>setOpenA(null)} onEdit=${()=>setEdit(A)}/>`;
  if(groups&&!g) return html`<p className="empty">Группа не найдена.</p>`;
  return html`<section className="enter">${hosting?null:html`<${AccHead} user=${user} be=${be} title=${g?g.name:'…'} onBack=${onBack}/>
    <${CodeCard} be=${be} gid=${gid}/>`}
    ${hosting?null:html`<div className="acc-tabs" role="tablist"><button role="tab" id="gt-asg" aria-selected=${tab==='asg'} onClick=${()=>setTab('asg')}>Задания ${asg?'· '+asg.length:''}</button><button role="tab" id="gt-mem" aria-selected=${tab==='mem'} onClick=${()=>setTab('mem')}>Ученики ${members?'· '+members.length:''}</button><button role="tab" id="gt-prog" aria-selected=${tab==='prog'} onClick=${()=>setTab('prog')}>Прогресс</button><button role="tab" id="gt-game" aria-selected=${tab==='game'} onClick=${()=>setTab('game')}>Игры</button></div>`}
    ${tab==='asg'?html`<button className="btn wide" id="a-new" onClick=${()=>{ SFX('pop'); setEdit(true); }}>+ Новое задание</button>
      ${asg==null?null:!asg.length?html`<p className="empty">Заданий пока нет.</p>`:html`<ul className="acc-list">${asg.map(a=>html`<li key=${a.id}><button className="acc-item" id=${'a-'+a.id} onClick=${()=>{ SFX('pop'); setOpenA(a.id); window.scrollTo({top:0}); }}><div><b>${a.title}</b><span className="acc-sub"><${AccDue} a=${a}/><small className="muted">${(a.files||[]).length?' · '+(a.files||[]).length+' '+plural((a.files||[]).length,'файл','файла','файлов'):''}</small></span></div><span aria-hidden="true">›</span></button></li>`)}</ul>`}`
    :tab==='prog'?html`<${GroupProgress} be=${be} user=${user} gid=${gid} g=${g} members=${members} asg=${asg}/>`
    :tab==='game'?html`<${GamesTab} be=${be} user=${user} gid=${gid} members=${members||[]} onHost=${h=>{ setHosting(h); if(h) setTab('game'); }}/>`
    :html`<${InviteBox} be=${be} gid=${gid}/>${members==null?null:!members.length?html`<p className="empty">Пока никто не вступил. Пригласи ученика по email или отправь код группы.</p>`:html`<ul className="acc-list">${members.map(m=>html`<${MemberRow} key=${m.uid} be=${be} gid=${gid} m=${m}/>`)}</ul>`}`}
    ${hosting?null:html`<details className="acc-danger"><summary>Управление группой</summary><button className="btn small danger" id="g-del" onClick=${async()=>{ if(confirm('Удалить группу «'+(g&&g.name)+'»? Задания и ответы пропадут.')){ await be.deleteGroup(gid); onBack(); } }}>Удалить группу</button></details>`}
  </section>`; }

function MemberRow({be,gid,m}){ const s=m.stats||{}, gr=m.grant||{}; const [o,setO]=useState(false);
  const last=s.at?Math.round((Date.now()-s.at)/86400000):null;
  return html`<li className="acc-mem"><button className="acc-item" id=${'m-'+m.uid} onClick=${()=>setO(!o)} aria-expanded=${o}>${accAva({name:m.name,avatar:m.avatar})}<div><b>${m.name||'Ученик'}</b><small className="muted">${s.level?'Уровень '+s.level+' · ':''}${s.xp!=null?s.xp+' XP · ':''}${s.streak!=null?'серия '+s.streak+' · ':''}${last==null?'ещё не заходил':last===0?'сегодня':last+' дн. назад'}</small></div><span aria-hidden="true">${o?'▴':'▾'}</span></button>
    ${o?html`<div className="acc-memx">${m.bio?html`<p className="acc-bio">«${m.bio}»</p>`:null}<div className="acc-stats"><span><b>${s.words||0}</b><small>слов</small></span><span><b>${s.gstars||0}</b><small>звёзд в грамматике</small></span><span><b>${s.mocks||0}</b><small>пробных тестов</small></span><span><b>${s.band||'—'}</b><small>последний балл IELTS</small></span></div>
      <div className="chips"><span className="muted acc-lvl-l">Уровень ученика:</span>${CEFR.map(l=>html`<button key=${l} className="chip" id=${'m-lvl-'+l+'-'+m.uid} aria-pressed=${gr.level===l} onClick=${()=>be.setGrant(gid,m.uid,{level:l})}>${l}</button>`)}</div>
      <small className="muted">Ученик получит этот уровень при следующем входе. Потом он может сменить его сам в Настройках.</small>
      <button className="link-btn" id=${'m-rm-'+m.uid} onClick=${()=>{ if(confirm('Убрать '+(m.name||'ученика')+' из группы?')) be.removeMember(gid,m.uid); }}>Убрать из группы</button></div>`:null}</li>`; }

function AsgForm({be,gid,a,onDone}){ const dk='asg:'+gid+':'+(a&&a.id||'new'); useBack(true,()=>onDone()); const [title,setTitle,clrT,dAt]=useDraftState(dk+':t',a?a.title:'',v=>!v), [text,setText,clrX]=useDraftState(dk+':x',a?a.text:'',v=>!v), [files,setFiles]=useState(a?(a.files||[]):[]), [due,setDue]=useState(a&&a.due||''), [err,setErr]=useState(null), [busy,setBusy]=useState(false);
  const save=async()=>{ setBusy(true); setErr(null); try{ await be.saveAssignment(gid,a&&a.id,{title,text,files,due}); clrT(); clrX(); SFX('fanfare'); W('react','happy'); W('say',a?'Задание обновлено.':'Задание отправлено группе!',0,true); onDone(); }catch(e){ setErr(e); } setBusy(false); };
  return html`<section className="enter"><div className="acc-head"><button className="icon-btn" id="af-back" aria-label="Назад" onClick=${onDone}>${I.back()}</button><div><h1>${a?'Изменить задание':'Новое задание'}</h1></div></div>
    ${dAt?html`<${DraftNote} at=${dAt} onReset=${()=>{ clrT(); clrX(); setTitle(a?a.title:''); setText(a?a.text:''); }}/>`:null}<div className="acc-form"><label>Название<input id="af-title" value=${title} maxLength=${ACC_LIM.title} onChange=${e=>setTitle(e.target.value)} placeholder="Например, Essay: technology in education"/></label>
      <label>Задание<textarea id="af-text" rows="10" value=${text} maxLength=${ACC_LIM.task} onChange=${e=>setText(e.target.value)} placeholder="Опиши задание: что сделать, объём, критерии…"></textarea><small className=${'acc-count'+(text.length>ACC_LIM.task*.95?' warn':'')}>${text.length.toLocaleString('ru-RU')} / ${ACC_LIM.task.toLocaleString('ru-RU')}</small></label>
      <label>Срок (необязательно)<input id="af-due" type="date" value=${due} onChange=${e=>setDue(e.target.value)}/></label>
      <${AccFiles} files=${files} onRemove=${i=>setFiles(f=>f.filter((_,j)=>j!==i))}/>
      <${AccUpload} be=${be} path=${'hw/'+gid+'/'+(a?a.id:'new')+'/task'} onAdd=${f=>setFiles(x=>[...x,f])} id="af-file"/>
      <${AccErr} e=${err}/>
      <div className="actions">${a?html`<button className="btn ghost danger" id="af-del" onClick=${async()=>{ if(confirm('Удалить задание?')){ await be.deleteAssignment(gid,a.id); onDone(); } }}>Удалить</button>`:null}<button className="btn" id="af-save" disabled=${!title.trim()||busy} onClick=${save}>${a?'Сохранить':'Опубликовать'}</button></div></div></section>`; }

function TeacherAsg({be,user,gid,a,members,onBack,onEdit}){ const subs=useLive(cb=>be.subs(gid,a.id,cb),[gid,a.id]); const [open,setOpen]=useState(null);
  const S=open&&(subs||[]).find(s=>s.uid===open); if(S) return html`<${Review} be=${be} gid=${gid} a=${a} s=${S} onBack=${()=>{ setOpen(null); window.scrollTo({top:0}); }}/>`;
  const by={}; (subs||[]).forEach(s=>by[s.uid]=s); const rows=members.map(m=>({m,s:by[m.uid]}));
  const n=k=>rows.filter(r=>(r.s&&r.s.status)===k).length;
  return html`<section className="enter"><div className="acc-head"><button className="icon-btn" id="ta-back" aria-label="Назад" onClick=${onBack}>${I.back()}</button><div><span className="phase">${a.due?'Срок: '+a.due:'Без срока'}</span><h1>${a.title}</h1></div><button className="btn small ghost" id="ta-edit" onClick=${onEdit}>Изменить</button></div>
    <div className="acc-task"><p className="acc-pre">${a.text}</p><${AccFiles} files=${a.files}/></div>
    <div className="acc-sum"><span><b>${n('submitted')}</b><small>ждут проверки</small></span><span><b>${n('checked')}</b><small>проверено</small></span><span><b>${n('returned')}</b><small>на доработке</small></span><span><b>${rows.filter(r=>!r.s||r.s.status==='draft').length}</b><small>не сдали</small></span></div>
    <ul className="acc-list">${rows.map(({m,s})=>html`<li key=${m.uid}><button className="acc-item" id=${'s-'+m.uid} disabled=${!s} onClick=${()=>{ SFX('pop'); setOpen(m.uid); window.scrollTo({top:0}); }}><div><b>${m.name}</b><small className=${'muted'+(accLate(a,s)?' acc-late':'')}>${s&&s.submittedAt?'Сдано '+accFmtDate(s.submittedAt)+(accLate(a,s)?' · с опозданием':''):s?'Обновлено '+accFmtDate(s.updatedAt):(accDue(a.due)&&accDue(a.due).overdue?'Не сдано, срок прошёл':'Ещё не начинал')}${s&&s.versions&&s.versions.length>1?' · версий: '+s.versions.length:''}</small></div><${AccStatus} s=${s}/></button></li>`)}</ul></section>`; }

/* comments anchored to text ranges */
function accSegs(text,comments){ const cs=(comments||[]).map(c=>{ let st=c.start, en=c.end; if(text.slice(st,en)!==c.quote){ const i=text.indexOf(c.quote); if(i<0) return null; st=i; en=i+c.quote.length; } return {...c,st,en}; }).filter(Boolean).sort((a,b)=>a.st-b.st);
  const out=[]; let pos=0; cs.forEach(c=>{ if(c.st<pos) return; if(c.st>pos) out.push({t:text.slice(pos,c.st)}); out.push({t:text.slice(c.st,c.en),c}); pos=c.en; }); if(pos<text.length) out.push({t:text.slice(pos)}); return out; }
function selOffsets(root){ const sel=window.getSelection(); if(!sel||!sel.rangeCount||sel.isCollapsed) return null; const r=sel.getRangeAt(0); if(!root.contains(r.commonAncestorContainer)) return null;
  const pre=document.createRange(); pre.selectNodeContents(root); pre.setEnd(r.startContainer,r.startOffset); const start=pre.toString().length; const quote=r.toString(); if(!quote.trim()) return null; return {start,end:start+quote.length,quote}; }
function AnnotText({text,comments,active,setActive,refEl}){ const segs=accSegs(text||'',comments);
  return html`<div className="acc-answer" ref=${refEl}>${segs.map((g,i)=>g.c?html`<mark key=${i} className=${'acc-mark'+(active===g.c.id?' on':'')} id=${'mk-'+g.c.id} onClick=${()=>setActive&&setActive(g.c.id)}>${g.t}</mark>`:html`<span key=${i}>${g.t}</span>`)}</div>`; }

function Review({be,gid,a,s,onBack}){ const [comments,setComments]=useState(s.comments||[]), [fb,setFb]=useState(s.feedback||''), [grade,setGrade]=useState(s.grade==null?'':String(s.grade)), [sel,setSel]=useState(null), [draft,setDraft]=useState(''), [active,setActive]=useState(null), [saved,setSaved]=useState(''), [err,setErr]=useState(null);
  const ref=useRef(null);
  useEffect(()=>{ const f=()=>{ if(!ref.current) return; const o=selOffsets(ref.current); if(o) setSel(o); }; document.addEventListener('selectionchange',f); return ()=>document.removeEventListener('selectionchange',f); },[]);
  const add=()=>{ if(!sel||!draft.trim()) return; const c={id:accId(),...sel,text:draft.trim().slice(0,ACC_LIM.comment),at:Date.now()}; setComments(x=>[...x,c]); setDraft(''); setSel(null); try{ window.getSelection().removeAllRanges(); }catch(e){} SFX('pop'); setActive(c.id); };
  const save=async status=>{ setErr(null); try{ await be.review(gid,a.id,s.uid,{comments,feedback:fb,grade:grade===''?null:grade,status}); setSaved(status==='checked'?'Отмечено как проверенное':status==='returned'?'Отправлено на доработку':'Сохранено'); SFX('fanfare'); W('react','happy'); }catch(e){ setErr(e); } };
  return html`<section className="enter acc-review"><div className="acc-head"><button className="icon-btn" id="rv-back" aria-label="Назад" onClick=${onBack}>${I.back()}</button><div><span className="phase">${a.title}</span><h1>${s.name}</h1></div><${AccStatus} s=${s}/></div>
    <div className="acc-split">
      <div className="acc-left"><p className="muted acc-tip">Выдели фрагмент текста, чтобы оставить к нему комментарий.</p>
        <${AnnotText} text=${s.text} comments=${comments} active=${active} setActive=${setActive} refEl=${ref}/>
        <${AccFiles} files=${s.files}/>
        ${s.versions&&s.versions.length>1?html`<details className="acc-vers"><summary>История версий · ${s.versions.length}</summary>${s.versions.slice().reverse().map((v,i)=>html`<div key=${i} className="acc-ver"><small className="muted">${accFmtDate(v.at)}</small><p className="acc-pre">${v.text}</p></div>`)}</details>`:null}</div>
      <aside className="acc-right" aria-label="Комментарии">
        <div className="acc-addc"><b>${sel?'Комментарий к: «'+sel.quote.slice(0,60)+(sel.quote.length>60?'…':'')+'»':'Комментарий'}</b>
          <textarea id="rv-c" rows="3" value=${draft} maxLength=${ACC_LIM.comment} placeholder=${sel?'Например: здесь нужен Present Perfect':'Сначала выдели фрагмент в ответе'} disabled=${!sel} onChange=${e=>setDraft(e.target.value)}></textarea>
          <button className="btn small" id="rv-add" disabled=${!sel||!draft.trim()} onClick=${add}>Добавить</button></div>
        <ol className="acc-clist">${comments.map((c,i)=>html`<li key=${c.id} className=${active===c.id?'on':''} onClick=${()=>{ setActive(c.id); const el=document.getElementById('mk-'+c.id); if(el) el.scrollIntoView({block:'center',behavior:'smooth'}); }}><q>${c.quote.slice(0,80)}</q><p>${c.text}</p><button className="link-btn" onClick=${e=>{ e.stopPropagation(); setComments(x=>x.filter(y=>y.id!==c.id)); }}>Удалить</button></li>`)}</ol>
        <label className="acc-fb">Общий отзыв<textarea id="rv-fb" rows="4" value=${fb} maxLength=${ACC_LIM.feedback} onChange=${e=>setFb(e.target.value)} placeholder="Что получилось хорошо и что улучшить"></textarea></label>
        <label className="acc-fb">Оценка<input id="rv-grade" value=${grade} maxLength="12" placeholder="Например, 6.5 или 8/10" onChange=${e=>setGrade(e.target.value)}/></label>
        <${AccErr} e=${err}/>${saved?html`<p className="acc-ok" role="status">${saved}</p>`:null}
        <div className="actions"><button className="btn ghost" id="rv-return" onClick=${()=>save('returned')}>На доработку</button><button className="btn" id="rv-check" onClick=${()=>save('checked')}>Проверено</button></div>
      </aside></div></section>`; }

/* ---------- student ---------- */
function StudentHome({be,user,open,openProfile}){ const groups=useLive(cb=>be.myGroups(cb),[be,user.uid,(user.groups||[]).join()]); const [code,setCode]=useState(''), [err,setErr]=useState(null), [busy,setBusy]=useState(false);
  const join=async()=>{ setBusy(true); setErr(null); try{ const gid=await be.joinByCode(code); setCode(''); SFX('fanfare'); FX('rain',80); W('react','cheer'); W('say','Ты в группе! Теперь учитель видит твой прогресс.',0,true); open(gid); }catch(e){ setErr(e); SFX('wrong'); W('react','encourage'); } setBusy(false); };
  const inv=useLive(cb=>be.myInvites(cb),[be,user.uid]);
  const accept=async id=>{ setErr(null); try{ const gid=await be.acceptInvite(id); SFX('fanfare'); W('react','cheer'); W('say','Ты в группе!',0,true); open(gid); }catch(e){ setErr(e); } };
  return html`<section className="enter"><${AccHead} user=${user} be=${be} title="Мои группы"/><${AccProfile} be=${be} user=${user} onOpen=${openProfile}/>
    ${inv&&inv.length?html`<div className="acc-card acc-invites" id="my-inv"><b>Приглашения</b>${inv.map(v=>html`<div key=${v.id} className="acc-inv-row"><div><b>${v.groupName||'Группа'}</b><small className="muted">Учитель: ${v.teacherName||'—'}</small></div>
      <button className="btn small ghost" id=${'inv-no-'+v.id.replace(/[^\w]/g,'_')} onClick=${()=>be.cancelInvite(v.id)}>Отклонить</button><button className="btn small" id=${'inv-ok-'+v.id.replace(/[^\w]/g,'_')} onClick=${()=>accept(v.id)}>Вступить</button></div>`)}</div>`:null}
    <div className="acc-card"><b>Вступить в группу</b><p className="muted">Введи код, который дал учитель. Код меняется каждый день.</p>
      <div className="acc-row"><input id="j-code" className="acc-codein" value=${code} maxLength="7" placeholder="ABC-123" autoCapitalize="characters" autoComplete="off" onChange=${e=>setCode(e.target.value.toUpperCase())} onKeyDown=${e=>{ if(e.key==='Enter'&&code.trim()) join(); }}/><button className="btn" id="j-go" disabled=${accNormCode(code).length<7||busy} onClick=${join}>Вступить</button></div><${AccErr} e=${err}/></div>
    ${groups==null?null:!groups.length?html`<p className="empty">Ты пока не в группе.</p>`:html`<ul className="acc-list">${groups.map(g=>html`<li key=${g.id}><button className="acc-item" id=${'sg-'+g.id} onClick=${()=>{ SFX('pop'); open(g.id); }}><div><b>${g.name}</b><small className="muted">Учитель: ${g.teacherName||'—'}</small></div><${GameLiveBadge} be=${be} gid=${g.id}/><span aria-hidden="true">›</span></button></li>`)}</ul>`}</section>`; }

function StudentGroup({be,user,gid,onBack,openAid}){ const groups=useLive(cb=>be.myGroups(cb),[be,user.uid,(user.groups||[]).join()]); const g=(groups||[]).find(x=>x.id===gid); const asg=useLive(cb=>be.assignments(gid,cb),[gid]); const [openA,setOpenA]=useState(openAid||null), [play,setPlay]=useState(null);
  if(play) return html`<${GamePlay} be=${be} user=${user} gid=${gid} id=${play} onClose=${()=>{ setPlay(null); window.scrollTo({top:0}); }}/>`;
  const A=openA&&(asg||[]).find(x=>x.id===openA); if(A) return html`<${StudentAsg} be=${be} user=${user} gid=${gid} a=${A} onBack=${()=>{ setOpenA(null); window.scrollTo({top:0}); }}/>`;
  return html`<section className="enter"><${AccHead} user=${user} be=${be} title=${g?g.name:'…'} onBack=${onBack}/>
    ${g?html`<div className="acc-teacher">${accAva({name:g.teacherName,avatar:g.teacherAvatar})}<div><b>${g.teacherName||'Учитель'}</b><small className="muted">Учитель</small>${g.teacherBio?html`<p>${g.teacherBio}</p>`:null}</div></div>`:null}
    <${GameBanner} be=${be} gid=${gid} onJoin=${id=>{ setPlay(id); window.scrollTo({top:0}); }}/>
    <div className="sec-h"><h2>Домашние задания</h2></div>
    ${asg==null?null:!asg.length?html`<p className="empty">Заданий пока нет.</p>`:html`<ul className="acc-list">${asg.map(a=>html`<${SAsgRow} key=${a.id} be=${be} gid=${gid} a=${a} open=${()=>{ SFX('pop'); setOpenA(a.id); window.scrollTo({top:0}); }}/>`)}</ul>`}
    <details className="acc-danger"><summary>Группа</summary><button className="btn small ghost" id="sg-leave" onClick=${async()=>{ if(confirm('Выйти из группы?')){ await be.leaveGroup(gid); onBack(); } }}>Выйти из группы</button></details></section>`; }
function SAsgRow({be,gid,a,open}){ const s=useLive(cb=>be.mySub(gid,a.id,cb),[gid,a.id]); return html`<li><button className="acc-item" id=${'sa-'+a.id} onClick=${open}><div><b>${a.title}</b><${AccDue} a=${a} s=${s}/></div><${AccStatus} s=${s}/></button></li>`; }

function StudentAsg({be,user,gid,a,onBack}){ const s=useLive(cb=>be.mySub(gid,a.id,cb),[gid,a.id]); const [text,setText]=useState(null), [files,setFiles]=useState(null), [save,setSave]=useState(''), [err,setErr]=useState(null), [active,setActive]=useState(null), [editing,setEditing]=useState(false);
  const tRef=useRef(null), dirty=useRef(false);
  useEffect(()=>{ if(s&&text==null){ setText(s.text||''); setFiles(s.files||[]); } else if(s===null&&text==null){ setText(''); setFiles([]); } },[s]);
  const persist=async(submit)=>{ setErr(null); try{ setSave(submit?'Отправляю…':'Сохраняю…'); await be.saveSub(gid,a.id,{text:text||'',files:files||[],submit}); dirty.current=false; setSave(submit?'Отправлено учителю':'Черновик сохранён'); if(submit){ setEditing(false); SFX('fanfare'); FX('rain',70); W('react','cheer'); W('say','Отправлено! Учитель увидит твой ответ.',0,true); } }catch(e){ setErr(e); setSave(''); } };
  useEffect(()=>{ if(text==null||!dirty.current) return; clearTimeout(tRef.current); tRef.current=setTimeout(()=>persist(false),1500); return ()=>clearTimeout(tRef.current); },[text,files]);
  const ch=v=>{ dirty.current=true; setText(v); setSave(''); };
  const sent=s&&(s.status==='submitted'||s.status==='checked');
  const showEditor=!sent||editing;
  return html`<section className="enter"><div className="acc-head"><button className="icon-btn" id="sa-back" aria-label="Назад" onClick=${onBack}>${I.back()}</button><div><span className="phase">${a.due?'Срок: '+a.due:'Без срока'}</span><h1>${a.title}</h1></div><${AccStatus} s=${s}/></div>
    <div className="acc-task"><p className="acc-pre">${a.text}</p><${AccFiles} files=${a.files}/></div>
    ${s&&(s.feedback||(s.comments||[]).length||s.grade)?html`<div className="acc-fbbox"><b>Отзыв учителя${s.grade?' · оценка: '+s.grade:''}</b>${s.feedback?html`<p className="acc-pre">${s.feedback}</p>`:null}
      ${(s.comments||[]).length?html`<div className="acc-split small"><div className="acc-left"><${AnnotText} text=${s.text} comments=${s.comments} active=${active} setActive=${setActive}/></div>
        <aside className="acc-right"><ol className="acc-clist">${s.comments.map(c=>html`<li key=${c.id} className=${active===c.id?'on':''} onClick=${()=>setActive(c.id)}><q>${c.quote.slice(0,80)}</q><p>${c.text}</p></li>`)}</ol></aside></div>`:null}</div>`:null}
    <div className="sec-h"><h2>Мой ответ</h2>${save?html`<span className="muted" role="status" id="sa-save">${save}</span>`:null}</div>
    ${text==null?html`<p className="muted">Загрузка…</p>`:showEditor?html`<div className="acc-form">
        <textarea id="sa-text" rows="14" value=${text} maxLength=${ACC_LIM.answer} placeholder="Напиши ответ здесь. Черновик сохраняется сам." onChange=${e=>ch(e.target.value)}></textarea>
        <small className=${'acc-count'+(text.length>ACC_LIM.answer*.95?' warn':'')}>${text.length.toLocaleString('ru-RU')} / ${ACC_LIM.answer.toLocaleString('ru-RU')} · ${text.trim()?text.trim().split(/\s+/).length:0} слов</small>
        <${AccFiles} files=${files} onRemove=${i=>{ dirty.current=true; setFiles(f=>f.filter((_,j)=>j!==i)); }}/>
        <${AccUpload} be=${be} path=${'hw/'+gid+'/'+a.id+'/'+user.uid} onAdd=${f=>{ dirty.current=true; setFiles(x=>[...(x||[]),f]); }} id="sa-file"/>
        <${AccErr} e=${err}/>
        <div className="actions">${editing?html`<button className="btn ghost" id="sa-cancel" onClick=${()=>{ setEditing(false); setText(s.text||''); setFiles(s.files||[]); }}>Отмена</button>`:null}
          <button className="btn" id="sa-send" disabled=${!text.trim()&&!(files||[]).length} onClick=${()=>persist(true)}>${sent?'Отправить исправленную версию':'Отправить учителю'}</button></div></div>`
      :html`<div className="acc-answer acc-pre" id="sa-sent">${s.text}</div><${AccFiles} files=${s.files}/><small className="muted">Отправлено ${accFmtDate(s.submittedAt)}${s.versions&&s.versions.length>1?' · версия '+s.versions.length:''}</small>
        <button className="btn ghost wide" id="sa-edit" onClick=${()=>{ SFX('tap'); setEditing(true); }}>Изменить ответ</button>`}</section>`; }

/* ---------- tab ---------- */
function ClassTab({st}){ const {be,user,ready,demo}=useAcc(); const [view,setView]=useState(null), [aid,setAid]=useState(null), [nonce,setNonce]=useState(0); useBack(view?'cls:'+view:null,()=>{ setView(null); setAid(null); window.scrollTo({top:0}); });
  useEffect(()=>{ setView(null); },[user&&user.uid]);
  useEffect(()=>{ const f=e=>{ const d=e.detail||{}; if(!d.gid) return; setView(d.gid); setAid(d.aid||null); setNonce(n=>n+1); window.scrollTo({top:0}); }; window.addEventListener('wordy-open-asg',f); return ()=>window.removeEventListener('wordy-open-asg',f); },[]);
  if(!be) return html`<section className="enter"><div className="page-h"><h1>Класс</h1></div><p className="empty">Аккаунты включаются в Настройках.</p></section>`;
  if(!ready) return html`<p className="muted">Загрузка…</p>`;
  if(!user) return html`<${AccAuth} be=${be} demo=${demo}/>`;
  if(!user.role) return html`<${AccRolePick} be=${be} user=${user}/>`;
  const wrap=x=>html`<div className="acc-wrap">${demo?html`<p className="acc-demo">Демо-режим · данные только в этом браузере</p>`:null}${x}</div>`;
  const openProfile=()=>setView('@profile');
  if(view==='@profile') return wrap(html`<${AccountPage} be=${be} user=${user} st=${st} onBack=${()=>{ setView(null); window.scrollTo({top:0}); }}/>`);
  if(user.role==='teacher') return wrap(view?html`<${TeacherGroup} key=${view} be=${be} user=${user} gid=${view} onBack=${()=>setView(null)}/>`:html`<${TeacherHome} be=${be} user=${user} open=${setView} openProfile=${openProfile}/>`);
  return wrap(view?html`<${StudentGroup} key=${view+'#'+nonce} be=${be} user=${user} gid=${view} openAid=${aid} onBack=${()=>{ setView(null); setAid(null); }}/>`:html`<${StudentHome} be=${be} user=${user} open=${setView} openProfile=${openProfile}/>`); }
function AccRolePick({be,user}){ const [role,setRole]=useState(null), [name,setName]=useState(user.name||''), [err,setErr]=useState(null), [busy,setBusy]=useState(false);
  const go=async()=>{ setBusy(true); setErr(null); try{ await be.setRole(role,name.trim()); SFX('fanfare'); W('react','cheer'); W('say','Добро пожаловать в Wordy!',0,true); }catch(e){ setErr(e); } setBusy(false); };
  return html`<section className="enter acc-auth"><div className="page-h"><h1>Почти готово</h1></div>
    <form className="acc-form" onSubmit=${e=>{ e.preventDefault(); if(role&&name.trim()&&!busy) go(); }}>
      <p className="muted">${user.email?'Ты вошёл как '+user.email+'. ':''}Осталось два шага.</p>
      <label>Имя и фамилия <small className="muted">— так тебя увидят в группе</small><input id="rp-name" value=${name} maxLength=${ACC_LIM.name} autoComplete="name" onChange=${e=>setName(e.target.value)}/></label>
      <div className="acc-roles" role="radiogroup" aria-label="Кто ты"><button type="button" role="radio" aria-checked=${role==='student'} className=${role==='student'?'on':''} id="rp-student" onClick=${()=>{ SFX('tap'); setRole('student'); }}><b>Я ученик</b><small>Учусь сам или вступаю в группу по коду учителя</small></button>
        <button type="button" role="radio" aria-checked=${role==='teacher'} className=${role==='teacher'?'on':''} id="rp-teacher" onClick=${()=>{ SFX('tap'); setRole('teacher'); }}><b>Я учитель</b><small>Создаю группы и задаю домашки</small></button></div>
      <p className="muted acc-note">Роль выбирается один раз и потом не меняется.</p>
      <${AccErr} e=${err}/><button className="btn wide" id="rp-go" type="submit" disabled=${!role||!name.trim()||busy}>${busy?'Подожди…':'Продолжить'}</button>
      <button type="button" className="link-btn" id="rp-out" onClick=${()=>be.signOut()}>Выйти и войти другим способом</button></form></section>`; }

/* ---------- glue: stats, grants, progress sync ---------- */
function accStats(st){ const words=Object.values(st.boxes||{}).filter(b=>b!=null).length; let best=null, n=0;
  Object.values(st.mocks||{}).forEach(r=>{ let any=false; ['L','R','W','S'].forEach(k=>{ const x=r&&r[k]; if(x&&x.band!=null){ any=true; if(!best||String(x.date||'')>=String(best.date||'')) best=x; } }); if(any) n++; });
  const gs=st.gstars||{}; let gweak=[], qweak=[]; try{ gweak=GL.filter(l=>gs[l.id]===1).slice(0,3).map(l=>l.title); }catch(e){} try{ qweak=weakTypes(st.qtypes).map(w=>w.name+' — '+w.pct+'%'); }catch(e){}
  return {level:st.level||null,xp:st.xp||0,streak:st.streak||0,words,learned:Object.values(st.boxes||{}).filter(b=>b!=null&&b>=2).length,gstars:Object.values(gs).reduce((a,b)=>a+b,0),gdone:Object.values(gs).filter(v=>v>0).length,gweak,qweak,
    mocks:n,band:best?best.band:null,lastDay:st.lastDay||null,reviews:st.reviews||0,day:dayKey()}; }
function useAccSync(st,setSt){ const {be,user}=useAcc(); const loaded=useRef(null), pushK=useRef(''), stateK=useRef('');
  useEffect(()=>{ if(!be||!user||!user.role||loaded.current===user.uid) return; loaded.current=user.uid;
    be.loadState().then(r=>{ let fromCloud=false; if(r&&r.data){ const cur=load(); const c=r.data; if(!cur.level||(c.xp||0)>(cur.xp||0)){ setSt(normalize({...c,tourDone:c.tourDone||cur.tourDone})); fromCloud=true; W('say','Прогресс загружен из аккаунта.',0,true); }
        if(c.regBonus) setSt(s=>s.regBonus?s:{...s,regBonus:c.regBonus}); }
      setTimeout(()=>giveRegBonus(setSt),fromCloud?2500:300); }).catch(()=>{}); },[be,user&&user.uid,user&&user.role]);
  useEffect(()=>{ if(!be||!user||user.role!=='student') return; return be.myGrants(gs=>{ const g=gs.filter(Boolean).sort((a,b)=>(b.at||0)-(a.at||0))[0]; if(!g) return;
      /* a teacher's level choice applies once (when it is newer than the last one applied), so the student can still switch freely afterwards */
      const at=+(g.at&&g.at.toMillis?g.at.toMillis():g.at)||0;
      setSt(s=>{ if(!g.level||at<=(s.grantAt||0)) return s; return {...s,grantAt:at,...(g.level!==s.level?{level:g.level}:{})}; }); }); },[be,user&&user.uid,user&&user.role,(user&&user.groups||[]).join()]);
  useEffect(()=>{ if(!be||!user||!user.role||!st.level) return; const t=setTimeout(()=>{ if(user.role==='student'){ const s=accStats(st), k=JSON.stringify(s)+'|'+(user.groups||[]).join(); if(k!==pushK.current){ pushK.current=k; be.pushStats(s).catch(()=>{ pushK.current=''; }); } }
      const k2=(st.xp||0)+'|'+(st.coins||0)+'|'+Object.keys(st.boxes||{}).length+'|'+JSON.stringify(st.gstars||{}).length+'|'+st.level+'|'+st.mode; if(k2!==stateK.current){ stateK.current=k2; be.saveState(st).catch(()=>{ stateK.current=''; }); } },be.mode==='demo'?800:20000);
    return ()=>clearTimeout(t); },[st,be,user&&user.uid,user&&(user.groups||[]).join()]); }

function AccSettings({st}){ const {be,user,demo}=useAcc(); const fbMode=!!window.WORDY_FIREBASE; const [open,setOpen]=useState(false);
  if(open&&user&&user.role) return html`<div className="sec-h"><h2>Аккаунт</h2></div><${AccountPage} be=${be} user=${user} st=${st} onBack=${()=>setOpen(false)}/>`;
  return html`<div className="sec-h"><h2>Аккаунт и класс</h2></div><div className="set-group">
    ${user&&user.role?html`<div className="set-row"><div className="set-acc">${accAva(user)}<div><strong>${user.name} · ${user.role==='teacher'?'учитель':'ученик'}</strong><p>${user.email}</p></div></div><button className="btn small" id="acc-set-prof" onClick=${()=>{ SFX('pop'); setOpen(true); }}>Профиль</button></div>`:null}
    ${fbMode?(user?null:html`<div className="set-row wrap"><div><strong>Аккаунт</strong><p>Сохраняет прогресс на всех устройствах, открывает группы учителя и сертификаты. Учиться можно и без него.</p></div>${be?html`<${AccOAuth} be=${be} compact=${true}/>`:null}<button className="btn small" id="acc-set-reg" onClick=${()=>{ SFX('pop'); try{ window.dispatchEvent(new CustomEvent('wordy-open-auth',{detail:{tab:'up'}})); }catch(e){} }}>Регистрация по email</button></div>`)
    :html`<div className="set-row"><div><strong>Аккаунты и группы (демо)</strong><p>Попробуй регистрацию, группы с кодом дня и домашки. В демо данные хранятся только в этом браузере.</p></div>
      <button className="sw" role="switch" id="sw-accdemo" aria-checked=${!!be} aria-label="Демо аккаунтов" onClick=${()=>{ SFX('tap'); accSetDemo(!be); }}></button></div>
      ${demo?html`<div className="set-row"><div><strong>Очистить демо-данные</strong><p>Удалить все демо-аккаунты, группы и задания</p></div><button className="btn small ghost" id="acc-demo-reset" onClick=${()=>{ if(confirm('Удалить все демо-данные?')) be._reset(); }}>Очистить</button></div>`:null}`}
  </div>`; }

/* ================= LIVE QUIZ («Игра»): teacher hosts, students answer from their phones ================= */
const GM_SHAPES=[
  html`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5 18 17H2z"/></svg>`,
  html`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.8 18.2 10 10 18.2 1.8 10z"/></svg>`,
  html`<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8"/></svg>`,
  html`<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="2.5" width="15" height="15" rx="1.5"/></svg>`];
const GM_NAMES=['треугольник','ромб','круг','квадрат'];
function useInGame(){ useEffect(()=>{ const r=document.documentElement; r.classList.add('in-game'); return ()=>r.classList.remove('in-game'); },[]); }
/* points: 500–1000 for a correct answer (faster = more), +100 per answer in a row from the second one, up to +500 */
function gmPoints(ok,t,time,streak){ if(!ok) return 0; const T=time*1000; return Math.round(1000-500*Math.min(t,T)/T)+(streak>=2?Math.min(streak-1,5)*100:0); }
function gmRank(board){ return Object.entries(board||{}).map(([uid,b])=>({uid,...b})).sort((a,b)=>(b.score||0)-(a.score||0)||(a.name||'').localeCompare(b.name||'')); }

/* ---------- question sources ---------- */
function gmGrammarUnits(){ return GL.filter(l=>GBOOK[l.id]&&GBOOK[l.id].ex.some(b=>b.t==='choice')); }
function gmFromGrammar(id,n){ const u=GBOOK[id]; if(!u) return []; const items=[]; u.ex.forEach(b=>{ if(b.t==='choice') b.items.forEach(it=>items.push(it)); });
  return shuffle(items).slice(0,n||10).map(it=>{ const idx=it[1].map((_,i)=>i).slice(0,4); if(!idx.includes(it[2])) idx[3]=it[2]; const ord=shuffle(idx);
    return {q:String(it[0]),opts:ord.map(i=>it[1][i]),c:ord.indexOf(it[2]),time:20,why:it[3]||''}; }); }
function gmWordUnits(){ const out=[]; TRACKS.forEach(t=>(t.units||[]).forEach(u=>{ if((u.words||[]).length>=4) out.push({id:u.id,label:t.name+' · '+u.title,words:u.words}); })); return out; }
function gmFromWords(id,n){ const u=gmWordUnits().find(x=>x.id===id); if(!u) return []; const W4=u.words;
  return shuffle(W4).slice(0,n||10).map((w,k)=>{ const others=shuffle(W4.filter(x=>x!==w)).slice(0,3); const ord=shuffle([w,...others]);
    return k%3===2?{q:'Как по-английски «'+w.ru+'»?',opts:ord.map(x=>x.en),c:ord.indexOf(w),time:20,why:w.ex||''}
      :{q:'Что значит «'+w.en+'»?',opts:ord.map(x=>x.ru),c:ord.indexOf(w),time:20,why:w.ex||''}; }); }

/* ---------- quiz editor ---------- */
function QuizEdit({be,quiz,onDone,onStart}){ const dk='quiz:'+(quiz&&quiz.id||'new'); useBack(true,()=>onDone()); const [title,setTitle,clrT,dAt]=useDraftState(dk+':t',quiz?quiz.title:'',v=>!v), [qs,setQs,clrQ]=useDraftState(dk+':q',()=>quiz?quiz.qs.map(x=>({...x,opts:[...x.opts,'','','',''].slice(0,4)})):[],v=>!v||!v.length), [err,setErr]=useState(null), [busy,setBusy]=useState(false), [src,setSrc]=useState(null);
  const gu=useMemo(gmGrammarUnits,[]), wu=useMemo(gmWordUnits,[]); const [gsel,setGsel]=useState(gu[0]?gu[0].id:''), [wsel,setWsel]=useState(wu[0]?wu[0].id:'');
  const add=list=>{ setQs(x=>[...x,...list.map(q=>({...q,opts:[...q.opts,'','','',''].slice(0,4)}))].slice(0,QUIZ_LIM.qs)); SFX('pop'); };
  const set=(i,patch)=>setQs(x=>x.map((q,j)=>j===i?{...q,...patch}:q));
  const clean=()=>quizClean({title:title||(qs[0]?'Викторина':''),qs:qs.map(q=>{ const keep=q.opts.map((o,i)=>({o:o.trim(),i})).filter(x=>x.o); const c=keep.findIndex(x=>x.i===q.c); return {...q,opts:keep.map(x=>x.o),c:c<0?0:c}; })});
  const bad=qs.map(q=>!q.q.trim()?'Нет текста вопроса':q.opts.filter(o=>o.trim()).length<2?'Нужно хотя бы 2 варианта':!String(q.opts[q.c]||'').trim()?'Отметь верный вариант':null);
  const ok=title.trim()&&qs.length&&bad.every(b=>!b);
  const save=async start=>{ setBusy(true); setErr(null); try{ const x=clean(); const id=await be.saveQuiz(quiz&&quiz.id,x); clrT(); clrQ(); SFX('fanfare'); if(start) onStart({...x,id}); else onDone(); }catch(e){ setErr(e); } setBusy(false); };
  return html`<section className="enter gm-edit">${dAt?html`<${DraftNote} at=${dAt} onReset=${()=>{ clrT(); clrQ(); setTitle(quiz?quiz.title:''); setQs(quiz?quiz.qs.map(x=>({...x,opts:[...x.opts,'','','',''].slice(0,4)})):[]); }}/>`:null}<div className="acc-head"><button className="icon-btn" id="qe-back" aria-label="Назад" onClick=${onDone}>${I.back()}</button><div><h1>${quiz?'Изменить викторину':'Новая викторина'}</h1></div></div>
    <div className="acc-form"><label>Название<input id="qe-title" value=${title} maxLength=${ACC_LIM.title} placeholder="Например, Present Perfect: разминка" onChange=${e=>setTitle(e.target.value)}/></label></div>
    <div className="gm-src"><b>Добавить вопросы</b>
      <div className="chips"><button className="chip" id="qe-src-g" aria-pressed=${src==='g'} onClick=${()=>setSrc(src==='g'?null:'g')}>Из грамматики</button><button className="chip" id="qe-src-w" aria-pressed=${src==='w'} onClick=${()=>setSrc(src==='w'?null:'w')}>Из слов</button><button className="chip" id="qe-add" onClick=${()=>add([{q:'',opts:['','','',''],c:0,time:20}])}>Свой вопрос</button></div>
      ${src==='g'?html`<div className="acc-row"><select id="qe-gsel" value=${gsel} onChange=${e=>setGsel(e.target.value)}>${gu.map(l=>html`<option key=${l.id} value=${l.id}>${l.title} — ${l.ru}</option>`)}</select><button className="btn small" id="qe-gadd" onClick=${()=>add(gmFromGrammar(gsel,10))}>+ 10 вопросов</button></div><small className="muted">Вопросы берутся из упражнений этой темы, варианты перемешиваются.</small>`:null}
      ${src==='w'?html`<div className="acc-row"><select id="qe-wsel" value=${wsel} onChange=${e=>setWsel(e.target.value)}>${wu.map(u=>html`<option key=${u.id} value=${u.id}>${u.label}</option>`)}</select><button className="btn small" id="qe-wadd" onClick=${()=>add(gmFromWords(wsel,10))}>+ 10 вопросов</button></div><small className="muted">Перевод слов в обе стороны, неверные варианты — из того же раздела.</small>`:null}
    </div>
    ${!qs.length?html`<p className="empty">Вопросов пока нет. Добавь их из грамматики, из слов или напиши свои.</p>`:html`<ol className="gm-qlist">${qs.map((q,i)=>html`<li key=${i} className="gm-qe">
      <div className="gm-qe-h"><b>Вопрос ${i+1}</b><div className="chips">${[10,20,30].map(t=>html`<button key=${t} className="chip small" aria-pressed=${q.time===t} onClick=${()=>set(i,{time:t})}>${t} с</button>`)}</div>
        <button className="icon-btn small" aria-label=${'Удалить вопрос '+(i+1)} onClick=${()=>setQs(x=>x.filter((_,j)=>j!==i))}>${I.close()}</button></div>
      <textarea id=${'qe-q-'+i} rows="2" value=${q.q} maxLength=${QUIZ_LIM.q} placeholder="Текст вопроса" onChange=${e=>set(i,{q:e.target.value})}></textarea>
      <div className="gm-qe-opts">${q.opts.map((o,k)=>html`<div key=${k} className=${'gm-qe-opt tl'+k+(q.c===k?' on':'')}><button className="gm-mark" aria-pressed=${q.c===k} aria-label=${'Верный ответ: вариант '+(k+1)} onClick=${()=>set(i,{c:k})}>${GM_SHAPES[k]}</button>
        <input id=${'qe-o-'+i+'-'+k} value=${o} maxLength=${QUIZ_LIM.opt} placeholder=${k<2?'Вариант '+(k+1):'Вариант '+(k+1)+' (необязательно)'} onChange=${e=>set(i,{opts:q.opts.map((x,j)=>j===k?e.target.value:x)})}/></div>`)}</div>
      ${bad[i]?html`<small className="acc-err">${bad[i]}</small>`:html`<small className="muted">Верный ответ отмечен цветом. Нажми на фигуру, чтобы выбрать другой.</small>`}
    </li>`)}</ol>`}
    <${AccErr} e=${err}/>
    <div className="actions gm-edit-act">${quiz?html`<button className="btn ghost danger" id="qe-del" onClick=${async()=>{ if(confirm('Удалить викторину?')){ await be.deleteQuiz(quiz.id); onDone(); } }}>Удалить</button>`:null}
      <button className="btn ghost" id="qe-save" disabled=${!ok||busy} onClick=${()=>save(false)}>Сохранить</button><button className="btn" id="qe-start" disabled=${!ok||busy} onClick=${()=>save(true)}>Сохранить и начать</button></div>
  </section>`; }

/* ---------- teacher: games tab inside a group ---------- */
function GamesTab({be,user,gid,members,onHost}){ const quizzes=useLive(cb=>be.myQuizzes(cb),[be,user.uid]); const live=useLive(cb=>be.liveGame(gid,cb),[gid]);
  const [edit,setEdit]=useState(null), [host,setHost]=useState(null), [err,setErr]=useState(null);
  useEffect(()=>{ if(live&&live.state!=='end'&&!host) setHost(live.id); },[live&&live.id]);
  useEffect(()=>{ onHost&&onHost(!!host||!!edit); },[host,!!edit]);
  const start=async q=>{ setErr(null); try{ const id=await be.startGame(gid,q); setEdit(null); setHost(id); SFX('fanfare'); window.scrollTo({top:0}); }catch(e){ setErr(e); } };
  if(host) return html`<${GameHost} be=${be} gid=${gid} id=${host} members=${members} onClose=${()=>{ setHost(null); window.scrollTo({top:0}); }}/>`;
  if(edit) return html`<${QuizEdit} be=${be} quiz=${edit===true?null:edit} onDone=${()=>{ setEdit(null); window.scrollTo({top:0}); }} onStart=${start}/>`;
  return html`<div className="gm-tab">
    <p className="muted gm-lead">Вопросы на твоём экране, ученики отвечают с телефонов. Чем быстрее верный ответ, тем больше очков. После каждого вопроса — таблица лидеров.</p>
    <button className="btn wide" id="qz-new" onClick=${()=>{ SFX('pop'); setEdit(true); }}>+ Новая викторина</button><${AccErr} e=${err}/>
    ${quizzes==null?null:!quizzes.length?html`<p className="empty">Сохранённых викторин нет. Собери первую из грамматики или слов — это займёт минуту.</p>`
      :html`<ul className="acc-list">${quizzes.map(q=>html`<li key=${q.id} className="gm-qz"><div><b>${q.title}</b><small className="muted">${q.qs.length} ${plural(q.qs.length,'вопрос','вопроса','вопросов')}</small></div>
        <button className="btn small ghost" id=${'qz-ed-'+q.id} onClick=${()=>{ SFX('tap'); setEdit(q); window.scrollTo({top:0}); }}>Изменить</button><button className="btn small" id=${'qz-go-'+q.id} onClick=${()=>start(q)}>Начать</button></li>`)}</ul>`}
  </div>`; }

function gmTimer(active,from,time){ const [now,setNow]=useState(Date.now()); useEffect(()=>{ if(!active) return; const t=setInterval(()=>setNow(Date.now()),200); return ()=>clearInterval(t); },[active,from]);
  return active?Math.max(0,time*1000-(now-from)):0; }

function GmBoard({board,me,limit,final}){ const r=gmRank(board).slice(0,limit||5); if(!r.length) return null;
  return html`<ol className="gm-board">${r.map((p,i)=>html`<li key=${p.uid} className=${p.uid===me?'me':''}><span className="gm-pl">${i+1}</span><b>${p.name}</b>${!final&&p.last&&p.last.pts?html`<small className="gm-delta">+${p.last.pts}</small>`:null}<span className="gm-sc">${(p.score||0).toLocaleString('ru-RU')}</span></li>`)}</ol>`; }
function GmPodium({board}){ const r=gmRank(board); if(!r.length) return html`<p className="empty">Никто не ответил.</p>`; const top=[r[1],r[0],r[2]];
  return html`<div className="gm-podium">${top.map((p,i)=>p?html`<div key=${p.uid} className=${'gm-pod p'+(i===1?1:i===0?2:3)}><b>${p.name}</b><span>${(p.score||0).toLocaleString('ru-RU')}</span><div className="gm-step">${i===1?1:i===0?2:3}</div></div>`:html`<div key=${i} className="gm-pod empty"></div>`)}</div>`; }
function GmTiles({opts,dist,correct,pick,onPick,disabled}){ return html`<div className=${'gm-tiles n'+opts.length}>${opts.map((o,i)=>html`<button key=${i} id=${'gm-opt-'+i} className=${'gm-tile tl'+i+(correct!=null?(i===correct?' right':' dim'):'')+(pick===i?' picked':'')} disabled=${disabled} aria-label=${GM_NAMES[i]+': '+o} onClick=${()=>onPick&&onPick(i)}>
  <span className="gm-shape">${GM_SHAPES[i]}</span><span className="gm-otext" lang="en">${o}</span>${dist?html`<span className="gm-cnt">${dist[i]||0}</span>`:null}</button>`)}</div>`; }

function GameHost({be,gid,id,members,onClose}){ useInGame(); const g=useLive(cb=>be.game(gid,id,cb),[gid,id]); const players=useLive(cb=>be.players(gid,id,cb),[gid,id])||[];
  const [key,setKey]=useState(null), [busy,setBusy]=useState(false); const revealed=useRef(-1), boxRef=useRef(null);
  useEffect(()=>{ let on=true; be.gameKey(gid,id).then(k=>on&&setKey(k)).catch(()=>{}); return ()=>{ on=false; }; },[id]);
  const qs=key?key.qs:[]; const qi=g?g.qi:-1; const Q=qs[qi];
  const left=gmTimer(g&&g.state==='question',g&&g.qAt,Q?Q.time:0);
  const answered=players.filter(p=>p.ans&&p.ans[qi]!=null).length;
  const next=async()=>{ if(!g||busy) return; setBusy(true); const n=qi+1; try{ if(n>=qs.length){ await be.updateGame(gid,id,{state:'end',endAt:Date.now()}); SFX('fanfare'); W('react','cheer'); }
      else { const q=qs[n]; await be.updateGame(gid,id,{state:'question',qi:n,cur:{q:q.q,opts:q.opts,time:q.time},qAt:Date.now(),correct:null,dist:null,why:null}); SFX('pop'); } }catch(e){} setBusy(false); };
  const reveal=async()=>{ if(!g||g.state!=='question'||revealed.current===qi||!Q) return; revealed.current=qi;
    const board={...(g.board||{})}, dist=Q.opts.map(()=>0);
    players.forEach(p=>{ const a=p.ans&&p.ans[qi]; const prev=board[p.uid]||{name:p.name,score:0,streak:0}; if(a&&a.a!=null&&dist[a.a]!=null) dist[a.a]++;
      const ok=!!a&&a.a===Q.c; const streak=ok?(prev.streak||0)+1:0; const pts=gmPoints(ok,a?a.t:0,Q.time,streak);
      board[p.uid]={name:p.name||prev.name,score:(prev.score||0)+pts,streak,last:{ok,pts,ans:a?a.a:null}}; });
    try{ await be.updateGame(gid,id,{state:'reveal',correct:Q.c,dist,board,why:Q.why||null}); SFX('correct'); }catch(e){ revealed.current=-1; } };
  useEffect(()=>{ if(g&&g.state==='question'&&Q&&(left<=0||(players.length&&answered>=players.length))) reveal(); },[left<=0,answered,players.length,g&&g.state,qi]);
  const full=()=>{ const el=boxRef.current; try{ if(document.fullscreenElement) document.exitFullscreen(); else if(el&&el.requestFullscreen) el.requestFullscreen(); }catch(e){} };
  if(!g||!key) return html`<p className="muted">Загрузка игры…</p>`;
  const stop=async()=>{ if(g.state!=='end'&&!confirm('Закончить игру сейчас?')) return; if(g.state!=='end') await be.updateGame(gid,id,{state:'end',endAt:Date.now()}).catch(()=>{}); try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(e){} onClose(); };
  return html`<section className="lq gm-host enter" ref=${boxRef} id="gm-host">
    <div className="gm-top"><div><span className="phase">${g.state==='lobby'?'Ждём учеников':g.state==='end'?'Итоги':'Вопрос '+(qi+1)+' из '+qs.length}</span><h1>${g.title}</h1></div>
      <button className="btn small ghost" id="gm-full" onClick=${full}>На весь экран</button><button className="btn small ghost" id="gm-stop" onClick=${stop}>${g.state==='end'?'Закрыть':'Закончить'}</button></div>
    ${g.state==='lobby'?html`<div className="gm-lobby"><p className="gm-how">Ученики открывают <b>Класс → эта группа → «Войти в игру»</b>.</p>
        <div className="gm-count" id="gm-joined"><b>${players.length}</b><small>из ${members.length} в игре</small></div>
        <ul className="gm-names">${players.map(p=>html`<li key=${p.uid}>${p.name}</li>`)}</ul>
        <button className="btn wide" id="gm-begin" disabled=${busy} onClick=${next}>${players.length?'Начать':'Начать без учеников'}</button></div>`
    :g.state==='question'&&Q?html`<div className="gm-q"><div className="gm-meta"><span className="gm-time" id="gm-left" aria-live="off">${Math.ceil(left/1000)}</span><span className="gm-ans" id="gm-answered">${answered} / ${players.length} ответили</span></div>
        <div className="gm-bar"><i style=${{width:(100*left/(Q.time*1000))+'%'}}></i></div>
        <p className="gm-qtext" lang="en">${Q.q}</p><${GmTiles} opts=${Q.opts} disabled=${true}/>
        <button className="btn ghost wide" id="gm-reveal" onClick=${reveal}>Показать ответ</button></div>`
    :g.state==='reveal'&&Q?html`<div className="gm-q"><p className="gm-qtext" lang="en">${Q.q}</p><${GmTiles} opts=${Q.opts} dist=${g.dist} correct=${g.correct} disabled=${true}/>
        ${g.why?html`<p className="gm-why">${g.why}</p>`:null}
        <div className="sec-h"><h2>Лидеры</h2></div><${GmBoard} board=${g.board}/>
        <button className="btn wide" id="gm-next" disabled=${busy} onClick=${next}>${qi+1>=qs.length?'Показать итоги':'Следующий вопрос'}</button></div>`
    :g.state==='end'?html`<div className="gm-end"><${GmPodium} board=${g.board}/><div className="sec-h"><h2>Все результаты</h2></div><${GmBoard} board=${g.board} limit=${100} final=${true}/>
        <button className="btn wide" id="gm-close" onClick=${stop}>Закрыть</button></div>`:null}
  </section>`; }

/* ---------- student ---------- */
function GameBanner({be,gid,onJoin}){ const live=useLive(cb=>be.liveGame(gid,cb),[gid]); if(!live||live.state==='end') return null;
  return html`<div className="gm-banner" role="status"><div><b>Идёт игра: ${live.title}</b><small>${live.state==='lobby'?'Учитель ждёт, пока все зайдут':'Можно присоединиться прямо сейчас'}</small></div><button className="btn" id="gm-join" onClick=${()=>{ SFX('pop'); onJoin(live.id); }}>Войти в игру</button></div>`; }
function GameLiveBadge({be,gid}){ const live=useLive(cb=>be.liveGame(gid,cb),[gid]); return live&&live.state!=='end'?html`<span className="gm-badge">Игра идёт</span>`:null; }

function GamePlay({be,user,gid,id,onClose}){ useInGame(); const g=useLive(cb=>be.game(gid,id,cb),[gid,id]); const [picks,setPicks]=useState({}), [err,setErr]=useState(null); const seen=useRef({}), cheered=useRef(-1);
  useEffect(()=>{ be.joinGame(gid,id).catch(e=>setErr(e)); },[id]);
  const qi=g?g.qi:-1; if(g&&g.state==='question'&&seen.current[qi]==null) seen.current[qi]=Date.now();
  const cur=g&&g.cur; const left=gmTimer(g&&g.state==='question',seen.current[qi],cur?cur.time:0);
  const meB=g&&(g.board||{})[user.uid]; const rank=g?gmRank(g.board).findIndex(p=>p.uid===user.uid)+1:0;
  useEffect(()=>{ if(g&&g.state==='reveal'&&cheered.current!==qi){ cheered.current=qi; const ok=meB&&meB.last&&meB.last.ok; if(ok){ SFX('correct'); W('react','cheer'); } else { SFX('wrong'); W('react','encourage'); } } },[g&&g.state,qi]);
  const pick=async i=>{ if(picks[qi]!=null||!g||g.state!=='question'||left<=0) return; setPicks(p=>({...p,[qi]:i})); SFX('tap'); try{ await be.answer(gid,id,qi,i,Date.now()-seen.current[qi]); }catch(e){ setErr(e); } };
  if(!g) return html`<section className="lq enter"><p className="empty">Игра закончилась.</p><button className="btn wide" onClick=${onClose}>Назад</button></section>`;
  const mine=picks[qi];
  return html`<section className="lq gm-play enter" id="gm-play">
    <div className="gm-top"><div><span className="phase">${g.state==='lobby'?'Ты в игре':g.state==='end'?'Итоги':'Вопрос '+(qi+1)+' из '+g.n}</span><h1>${g.title}</h1></div>
      ${meB?html`<span className="gm-myscore" id="gm-score">${(meB.score||0).toLocaleString('ru-RU')}</span>`:null}<button className="btn small ghost" id="gm-leave" onClick=${onClose}>Выйти</button></div>
    <${AccErr} e=${err}/>
    ${g.state==='lobby'?html`<div className="gm-wait"><span className="gm-dot" aria-hidden="true"></span><p><b>${user.name}</b>, ты в игре.</p><p className="muted">Ждём, когда учитель начнёт.</p></div>`
    :g.state==='question'&&cur?html`<div className="gm-q"><div className="gm-bar"><i style=${{width:(100*left/(cur.time*1000))+'%'}}></i></div>
        <p className="gm-qtext" lang="en">${cur.q}</p>
        ${mine==null&&left>0?html`<${GmTiles} opts=${cur.opts} onPick=${pick}/>`
          :html`<div className="gm-wait" id="gm-locked"><p><b>${mine==null?'Время вышло':'Ответ принят'}</b></p><p className="muted">${mine==null?'Следующий вопрос будет скоро.':'Ждём остальных…'}</p></div>`}</div>`
    :g.state==='reveal'&&cur?html`<div className="gm-q"><div className=${'gm-result '+(meB&&meB.last&&meB.last.ok?'good':'bad')} id="gm-result" role="status">
          <b>${meB&&meB.last&&meB.last.ok?'Верно':mine==null?'Нет ответа':'Неверно'}</b><span>${meB&&meB.last&&meB.last.pts?'+'+meB.last.pts:'+0'}${meB&&meB.streak>=2?' · '+meB.streak+' подряд':''}</span>
          ${rank?html`<small>Ты на ${rank} месте</small>`:null}</div>
        <${GmTiles} opts=${cur.opts} correct=${g.correct} pick=${mine} disabled=${true}/>${g.why?html`<p className="gm-why">${g.why}</p>`:null}</div>`
    :g.state==='end'?html`<div className="gm-end"><div className="gm-result good"><b>${rank?rank+' место':'Игра окончена'}</b><span>${meB?(meB.score||0).toLocaleString('ru-RU')+' очков':''}</span></div><${GmPodium} board=${g.board}/><button className="btn wide" id="gm-done" onClick=${onClose}>Готово</button></div>`:null}
  </section>`; }

/* ================= TEACHING TOOLS: deadlines, group progress, parent report, homework on the home screen ================= */
const DAY_MS=86400000;
/* a due date is a calendar day (YYYY-MM-DD): the work is on time until 23:59 of that day */
function accDue(due,now){ if(!due) return null; const p=String(due).split('-').map(Number); if(p.length!==3||!p[0]) return null;
  const end=new Date(p[0],p[1]-1,p[2],23,59,59,999).getTime(); now=now||(Date.now()+((window.__accClock)||0));
  const t0=new Date(now); t0.setHours(0,0,0,0); const days=Math.round((new Date(p[0],p[1]-1,p[2]).getTime()-t0.getTime())/DAY_MS);
  const wd=new Date(p[0],p[1]-1,p[2]).toLocaleDateString('ru-RU',{weekday:'short',day:'numeric',month:'short'});
  return {end,days,overdue:now>end,soon:now<=end&&days<=1,label:days<0?'просрочено · было '+wd:days===0?'сегодня до 23:59':days===1?'завтра, '+wd:'до '+wd}; }
const accDone=s=>!!s&&(s.status==='submitted'||s.status==='checked');
const accLate=(a,s)=>{ const d=accDue(a&&a.due); return !!(d&&s&&s.submittedAt&&s.submittedAt>d.end); };
function AccDue({a,s}){ const d=accDue(a.due); if(!d) return html`<small className="muted">Без срока</small>`;
  const cls=accDone(s)?(accLate(a,s)?'warn':'muted'):d.overdue?'bad':d.soon?'warn':'muted';
  return html`<small className=${'acc-due '+cls}>${accDone(s)?(accLate(a,s)?'сдано с опозданием':'срок '+d.label.replace(/^до /,'')):d.label}</small>`; }

/* all submissions of a group: one live listener per assignment */
function useGroupSubs(be,gid,asg){ const [map,setMap]=useState({}); const ids=(asg||[]).map(a=>a.id).join('|');
  useEffect(()=>{ if(!be||!asg) return; const offs=asg.map(a=>be.subs(gid,a.id,list=>setMap(m=>({...m,[a.id]:Object.fromEntries((list||[]).map(x=>[x.uid,x]))}))));
    return ()=>offs.forEach(f=>f&&f()); },[gid,ids]);
  return map; }
function accRows(members,asg,subs){ return (members||[]).map(m=>{ const s=m.stats||{}; let done=0,late=0,over=0,wait=0,grades=[];
    (asg||[]).forEach(a=>{ const x=(subs[a.id]||{})[m.uid]; if(accDone(x)){ done++; if(accLate(a,x)) late++; if(x.status==='submitted') wait++; if(x.grade!=null&&x.grade!=='') grades.push(String(x.grade)); } else { const d=accDue(a.due); if(d&&d.overdue) over++; } });
    const seen=s.at?Math.floor((Date.now()-s.at)/DAY_MS):null; return {m,s,done,late,over,wait,grades,total:(asg||[]).length,seen}; }); }
const accSeen=d=>d==null?'ещё не заходил':d===0?'сегодня':d===1?'вчера':d+' '+plural(d,'день','дня','дней')+' назад';

/* ---------- teacher: progress of the whole group ---------- */
function GroupProgress({be,user,gid,g,members,asg}){ useExamWide(true); const subs=useGroupSubs(be,gid,asg); const [sort,setSort]=useState('name'), [msg,setMsg]=useState('');
  if(members==null||asg==null) return html`<p className="muted">Загрузка…</p>`;
  if(!members.length) return html`<p className="empty">В группе пока нет учеников. Пригласи их во вкладке «Ученики».</p>`;
  let rows=accRows(members,asg,subs);
  const by={name:(a,b)=>(a.m.name||'').localeCompare(b.m.name||''),seen:(a,b)=>(b.seen==null?1e9:b.seen)-(a.seen==null?1e9:a.seen),debt:(a,b)=>(b.over-a.over)||((a.done/(a.total||1))-(b.done/(b.total||1))),xp:(a,b)=>(b.s.xp||0)-(a.s.xp||0)};
  rows=rows.slice().sort(by[sort]);
  const away=rows.filter(r=>r.seen==null||r.seen>=3).length, debt=rows.filter(r=>r.over>0).length, wait=rows.reduce((n,r)=>n+r.wait,0);
  const report=async r=>{ setMsg(''); const html_=accReportHtml(r,asg,subs,g,user); const name='wordy-otchet-'+String(r.m.name||'uchenik').replace(/\s+/g,'-').slice(0,30)+'-'+dayKey()+'.html';
    const res=await saveFile(name,html_); setMsg(res==='saved'||res==='link'?'Отчёт для '+(r.m.name||'ученика')+' сохранён. Открой его в браузере — его можно распечатать или сохранить в PDF.':'Не получилось сохранить отчёт.'); };
  return html`<div className="gp" id="gp">
    <div className="gp-sum"><span><b>${rows.length}</b> ${plural(rows.length,'ученик','ученика','учеников')}</span>
      <span className=${away?'warn':''}><b>${away}</b> не заходили 3+ дня</span><span className=${debt?'bad':''}><b>${debt}</b> с долгами по домашке</span><span className=${wait?'warn':''}><b>${wait}</b> ${plural(wait,'ответ','ответа','ответов')} ждут проверки</span></div>
    <div className="gp-sort" role="group" aria-label="Сортировка"><span className="muted">Сортировать:</span>${[['name','по имени'],['seen','кто давно не был'],['debt','по долгам'],['xp','по XP']].map(([k,t])=>html`<button key=${k} className="chip small" id=${'gp-s-'+k} aria-pressed=${sort===k} onClick=${()=>setSort(k)}>${t}</button>`)}</div>
    ${msg?html`<p className="acc-ok" role="status">${msg}</p>`:null}
    <div className="gp-scroll"><table className="gp-t"><thead><tr><th scope="col">Ученик</th><th scope="col">Был</th><th scope="col">Слова</th><th scope="col">Грамматика</th><th scope="col">XP · серия</th><th scope="col">IELTS</th><th scope="col">Домашка</th><th scope="col">Слабые места</th><th scope="col"><span className="sr-only">Отчёт</span></th></tr></thead>
    <tbody>${rows.map(r=>html`<tr key=${r.m.uid} id=${'gp-'+r.m.uid}>
      <th scope="row"><span className="gp-who">${accAva({name:r.m.name,avatar:r.m.avatar})}<span><b>${r.m.name||'Ученик'}</b><small className="muted">${r.s.level||'—'}</small></span></span></th>
      <td className=${r.seen==null||r.seen>=3?'warn':''}>${accSeen(r.seen)}</td>
      <td><b>${r.s.learned!=null?r.s.learned:'—'}</b><small className="muted">${r.s.words!=null?'из '+r.s.words+' в изучении':''}</small></td>
      <td><b>${r.s.gdone!=null?r.s.gdone:'—'}</b><small className="muted">${r.s.gdone!=null?plural(r.s.gdone,'тема','темы','тем')+' · ★'+(r.s.gstars||0):''}</small></td>
      <td><b>${(r.s.xp||0).toLocaleString('ru-RU')}</b><small className="muted">${r.s.streak||0} ${plural(r.s.streak||0,'день','дня','дней')}</small></td>
      <td><b>${r.s.band!=null?r.s.band:'—'}</b><small className="muted">${r.s.mocks?r.s.mocks+' '+plural(r.s.mocks,'тест','теста','тестов'):''}</small></td>
      <td className=${r.over?'bad':''}><b>${r.done}/${r.total}</b><small>${r.over?r.over+' '+plural(r.over,'просрочено','просрочено','просрочено'):r.wait?r.wait+' ждут проверки':r.late?r.late+' с опозданием':r.total&&r.done===r.total?'всё сдано':''}</small></td>
      <td className="gp-weak">${[...(r.s.gweak||[]),...(r.s.qweak||[])].slice(0,3).join(', ')||html`<span className="muted">—</span>`}</td>
      <td><button className="btn small ghost" id=${'gp-rep-'+r.m.uid} onClick=${()=>report(r)}>Отчёт</button></td></tr>`)}</tbody></table></div>
    <p className="muted gp-note">Статистика обновляется, когда ученик занимается в Wordy со своего аккаунта. «Слабые места» — темы грамматики с одной звездой и типы заданий IELTS, где меньше 70% верных.</p>
  </div>`; }

/* ---------- printable report for parents (one student) ---------- */
function accReportHtml(r,asg,subs,g,teacher){ const esc=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const s=r.s||{}, d=new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
  const hw=(asg||[]).map(a=>{ const x=(subs[a.id]||{})[r.m.uid]; const du=accDue(a.due);
    const st=accDone(x)?(x.status==='checked'?'проверено':'сдано, ждёт проверки')+(accLate(a,x)?' (с опозданием)':''):x&&x.status==='returned'?'на доработке':du&&du.overdue?'не сдано, срок прошёл':'не сдано';
    return '<tr><td>'+esc(a.title)+'</td><td>'+esc(a.due||'—')+'</td><td>'+esc(st)+'</td><td>'+esc(x&&x.grade!=null&&x.grade!==''?x.grade:'—')+'</td></tr>'; }).join('');
  const weak=[...(s.gweak||[]),...(s.qweak||[])];
  return '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Отчёт: '+esc(r.m.name)+'</title><style>'
   +'body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#18202B;background:#F2F3EF;margin:0;padding:28px} .page{max-width:760px;margin:0 auto;background:#fff;border-radius:16px;padding:32px 36px}'
   +'h1{font-size:26px;margin:0 0 4px} h2{font-size:17px;margin:26px 0 10px} .muted{color:#5E6672} .tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:18px} .tile{background:#F2F3EF;border-radius:12px;padding:12px;text-align:center} .tile b{display:block;font-size:22px}'
   +'table{width:100%;border-collapse:collapse;font-size:14px} th,td{padding:8px 6px;border-bottom:1px solid #DFE2DA;text-align:left} th{color:#5E6672;font-weight:600} .brand{display:flex;align-items:center;gap:8px;font-weight:700;font-size:18px;margin-bottom:18px} .dot{width:22px;height:22px;border-radius:50%;background:#FF7A12}'
   +'@media print{body{background:#fff;padding:0} .page{border-radius:0}} @media(max-width:560px){.tiles{grid-template-columns:repeat(2,1fr)} .page{padding:22px}}<\/style><\/head><body><div class="page">'
   +'<div class="brand"><span class="dot"></span>wordy</div><h1>Отчёт об учёбе: '+esc(r.m.name||'ученик')+'</h1><p class="muted">'+esc(d)+' · группа «'+esc(g&&g.name)+'» · преподаватель '+esc(teacher&&teacher.name)+' · уровень '+esc(s.level||'—')+'</p>'
   +'<div class="tiles"><div class="tile"><b>'+(s.learned!=null?s.learned:'—')+'</b><span>слов выучено</span></div><div class="tile"><b>'+(s.gdone!=null?s.gdone:'—')+'</b><span>тем грамматики</span></div><div class="tile"><b>'+(s.streak||0)+'</b><span>дней подряд</span></div><div class="tile"><b>'+(s.band!=null?s.band:'—')+'</b><span>пробный IELTS</span></div></div>'
   +'<h2>Активность</h2><p>Последний раз заходил(а) в Wordy: '+esc(accSeen(r.seen))+'. Опыт: '+(s.xp||0)+' XP. Пробных тестов IELTS: '+(s.mocks||0)+'.</p>'
   +(weak.length?'<h2>Над чем работаем</h2><ul>'+weak.map(w=>'<li>'+esc(w)+'</li>').join('')+'</ul>':'')
   +((asg||[]).length?'<h2>Домашние задания: сдано '+r.done+' из '+r.total+'</h2><table><tr><th>Задание</th><th>Срок</th><th>Статус</th><th>Оценка</th></tr>'+hw+'</table>':'')
   +'<p class="muted" style="margin-top:28px;font-size:12px">Баллы пробных тестов ориентировочные и не заменяют официальный экзамен. Отчёт сформирован в Wordy.</p></div><\/body><\/html>'; }

/* ---------- student: homework that is due, on the home screen ---------- */
function HomeHomework(){ const {be,user}=useAcc(); const groups=useLive(cb=>be&&user&&user.role==='student'?be.myGroups(cb):(cb([]),()=>{}),[be,user&&user.uid,user&&(user.groups||[]).join()]);
  const [items,setItems]=useState({}); const gids=(groups||[]).map(g=>g.id).join('|');
  useEffect(()=>{ if(!be||!user||user.role!=='student'||!groups) return; const offs=[];
    groups.forEach(g=>{ offs.push(be.assignments(g.id,list=>setItems(m=>({...m,[g.id]:{g,list:list||[],subs:(m[g.id]||{}).subs||{}}})))); });
    return ()=>offs.forEach(f=>f&&f()); },[gids]);
  if(!user||user.role!=='student'||!groups||!groups.length) return null;
  return html`<${HomeHwList} be=${be} items=${items}/>`; }
function HomeHwList({be,items}){ const all=[]; Object.values(items).forEach(({g,list})=>list.forEach(a=>all.push({g,a})));
  const [subs,setSubs]=useState({}); const ids=all.map(x=>x.g.id+'/'+x.a.id).join('|');
  useEffect(()=>{ const offs=all.map(({g,a})=>be.mySub(g.id,a.id,s=>setSubs(m=>({...m,[g.id+'/'+a.id]:s||null})))); return ()=>offs.forEach(f=>f&&f()); },[ids]);
  const todo=all.filter(x=>!accDone(subs[x.g.id+'/'+x.a.id])).map(x=>({...x,d:accDue(x.a.due)})).sort((p,q)=>(p.d?p.d.end:9e15)-(q.d?q.d.end:9e15));
  if(!todo.length) return null; const over=todo.filter(x=>x.d&&x.d.overdue).length;
  const open=x=>{ SFX('pop'); try{ window.dispatchEvent(new CustomEvent('wordy-open-asg',{detail:{gid:x.g.id,aid:x.a.id}})); }catch(e){} };
  return html`<section className=${'home-hw enter'+(over?' late':'')} id="home-hw" style=${{'--i':1}}><div className="home-hw-h"><b>Домашка</b><span className="muted">${todo.length} ${plural(todo.length,'задание','задания','заданий')}${over?' · '+over+' просрочено':''}</span></div>
    <ul>${todo.slice(0,3).map(x=>html`<li key=${x.g.id+x.a.id}><button className="home-hw-it" id=${'hh-'+x.a.id} onClick=${()=>open(x)}><span><b>${x.a.title}</b><small className="muted">${x.g.name}</small></span><${AccDue} a=${x.a} s=${subs[x.g.id+'/'+x.a.id]}/></button></li>`)}</ul></section>`; }

/* ================= SIGN-UP: one-tap providers, guest invitation, account-only certificates ================= */
const ICO_GOOGLE=html`<svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;
const ICO_MS=html`<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#F25022" d="M2 2h9.5v9.5H2z"/><path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z"/><path fill="#00A4EF" d="M2 12.5h9.5V22H2z"/><path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z"/></svg>`;

/* «Продолжить с Google / Microsoft» — only on the site, where those providers are switched on */
function AccOAuth({be,compact,link}){ const [err,setErr]=useState(null), [busy,setBusy]=useState('');
  const list=be&&be.mode!=='demo'?accProviders():[]; if(!list.length) return null;
  const go=async k=>{ setErr(null); setBusy(k); try{ await be.signInWith(k); SFX('fanfare'); W('react','cheer'); }catch(e){ setErr(e); } setBusy(''); };
  return html`<div className=${'acc-oauth'+(compact?' compact':'')}>${link?html`<${AccLink} be=${be}/>`:null}${list.map(k=>html`<button key=${k} type="button" className="btn ghost acc-prov" id=${'acc-'+k} disabled=${!!busy} onClick=${()=>go(k)}>${k==='google'?ICO_GOOGLE:ICO_MS}<span>${busy===k?'Открываю…':'Продолжить с '+ACC_PROVIDERS[k].name}</span></button>`)}<${AccErr} e=${err}/></div>`; }

/* «войти по ссылке на почту»: no password at all */
function AccLink({be}){ const pending=be.linkPending&&be.linkPending(); const [open,setOpen]=useState(pending), [email,setEmail]=useState(()=>{ try{ return localStorage.getItem('wordy.linkEmail')||''; }catch(e){ return ''; } }), [state,setState]=useState(''), [err,setErr]=useState(null);
  const send=async()=>{ setErr(null); setState('busy'); try{ await be.sendLink(email); setState('sent'); SFX('pop'); }catch(e){ setErr(e); setState(''); } };
  const finish=async()=>{ setErr(null); setState('busy'); try{ await be.completeLink(email); SFX('fanfare'); }catch(e){ setErr(e); setState(''); } };
  if(!open) return html`<button type="button" className="btn ghost acc-prov" id="acc-link" onClick=${()=>{ SFX('tap'); setOpen(true); }}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><span>Войти по ссылке на почту</span></button>`;
  return html`<div className="acc-link" id="acc-link-box">${state==='sent'?html`<p className="acc-ok" role="status">Ссылка отправлена на ${email}. Открой письмо на этом телефоне и нажми ссылку — вход произойдёт сам. Нет письма? Загляни в «Спам».</p>`
    :html`<p className="muted">${pending?'Ты открыл ссылку для входа. Впиши email, на который она пришла:':'Пришлём на почту ссылку — нажмёшь её и войдёшь без пароля.'}</p>
      <div className="acc-row"><input id="acc-link-email" type="email" value=${email} autoComplete="email" placeholder="name@example.com" onChange=${e=>setEmail(e.target.value)} onKeyDown=${e=>{ if(e.key==='Enter'&&email.trim()) (pending?finish:send)(); }}/><button type="button" className="btn" id="acc-link-go" disabled=${!email.trim()||state==='busy'} onClick=${pending?finish:send}>${state==='busy'?'…':pending?'Войти':'Прислать'}</button></div>`}<${AccErr} e=${err}/></div>`; }

/* the home-screen invitation for people who learn without an account; never blocks anything */
const GUEST_KEY='wordy.guestcard';
function GuestCard({st}){ const {be,user,ready}=useAcc(); const [hide,setHide]=useState(()=>{ try{ return +(localStorage.getItem(GUEST_KEY)||0)>Date.now(); }catch(e){ return false; } });
  if(!be||!ready||user||hide||!st.level) return null;
  const later=()=>{ SFX('tap'); try{ localStorage.setItem(GUEST_KEY,String(Date.now()+5*DAY_MS)); }catch(e){} setHide(true); };
  const email=()=>{ SFX('pop'); try{ window.dispatchEvent(new CustomEvent('wordy-open-auth',{detail:{tab:'up'}})); }catch(e){} };
  const learned=Object.values(st.boxes||{}).filter(b=>b!=null).length;
  return html`<section className="guest-card enter" id="guest-card" style=${{'--i':1}}>
    <div className="gc-h"><b>${learned?'Не потеряй '+learned+' '+plural(learned,'слово','слова','слов')+' и весь прогресс':'Сохраняй прогресс в аккаунте'}</b><button className="icon-btn small" id="gc-later" aria-label="Не сейчас" onClick=${later}>${I.close()}</button></div>
    <p className="muted">Аккаунт бесплатный, учиться можно и без него. С аккаунтом:</p>
    <ul className="gc-list"><li><b>+${REG_BONUS} монет</b> в подарок сразу после регистрации</li><li>прогресс на всех устройствах и не пропадёт при смене телефона</li><li>группа учителя, домашние задания и викторины на уроке</li><li>сертификаты уровней A1–C1 с кодом проверки</li></ul>
    <${AccOAuth} be=${be} compact=${true}/>
    <button className="btn wide" id="gc-email" onClick=${email}>Зарегистрироваться по email</button>
  </section>`; }

/* ---------- certificates: earned in the app, issued only with an account, checkable by code ---------- */
function certHtml(c){ const esc=x=>String(x==null?'':x).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const d=new Date(c.issuedAt||Date.now()).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'}); const url='https://wordy-b5142.web.app/verify.html?c='+encodeURIComponent(c.code);
  return '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Сертификат Wordy '+esc(c.level)+' — '+esc(c.name)+'</title><style>'
   +'@page{size:A4 landscape;margin:0} body{margin:0;background:#E8EAE4;font-family:Georgia,"Times New Roman",serif;color:#18202B}'
   +'.c{box-sizing:border-box;width:297mm;max-width:100%;min-height:210mm;margin:0 auto;background:#FFFDF8;padding:22mm 26mm;display:flex;flex-direction:column;justify-content:space-between;border:10px solid #23405F;outline:1px solid #23405F;outline-offset:-18px}'
   +'.top{display:flex;justify-content:space-between;align-items:center;font-family:system-ui,sans-serif} .brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:22px;color:#18202B} .dot{width:30px;height:30px;border-radius:50%;background:#FF7A12}'
   +'.lv{font-family:system-ui,sans-serif;font-weight:800;font-size:15px;color:#fff;background:#23405F;border-radius:999px;padding:6px 14px} h1{font-weight:400;font-size:30px;margin:18mm 0 6mm;letter-spacing:.02em;color:#5E6672} .name{font-size:46px;margin:0 0 8mm;color:#18202B}'
   +'p{font-size:19px;line-height:1.55;margin:0;max-width:200mm} .foot{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;font-family:system-ui,sans-serif;font-size:13px;color:#5E6672} .code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:15px;color:#18202B;font-weight:700}'
   +'@media print{body{background:#fff}} @media(max-width:700px){.c{padding:24px;min-height:0;border-width:6px} .name{font-size:32px} h1{margin-top:28px}}<\/style><\/head><body><div class="c">'
   +'<div class="top"><div class="brand"><span class="dot"></span>wordy</div><span class="lv">Уровень '+esc(c.level)+' · '+esc(LEVEL_NAMES[c.level]||'')+'</span></div>'
   +'<div><h1>Сертификат</h1><div class="name">'+esc(c.name)+'</div><p>прошёл(а) уровень <b>'+esc(c.level)+' · '+esc(LEVEL_NAMES[c.level]||'')+'</b> в Wordy: выучено '+(c.words|0)+' '+plural(c.words|0,'слово','слова','слов')+' и пройдено '+(c.gram|0)+' '+plural(c.gram|0,'тема','темы','тем')+' грамматики этого уровня.</p></div>'
   +'<div class="foot"><div>Выдан '+esc(d)+'<br>Проверить подлинность: '+esc(url)+'</div><div style="text-align:right">Код сертификата<br><span class="code">'+esc(c.code)+'</span></div></div>'
   +'</div><\/body><\/html>'; }
function CertsSection({st}){ const {be,user}=useAcc(); const certs=useLive(cb=>be&&user?be.myCerts(cb):(cb([]),()=>{}),[be,user&&user.uid])||[]; const [busy,setBusy]=useState(''), [msg,setMsg]=useState(''), [err,setErr]=useState(null);
  useEffect(()=>{ setMsg(''); setErr(null); },[user&&user.uid]);
  const lv=CEFR.map(L=>({L,p:levelProgress(st,L)})); const done=lv.filter(x=>x.p.complete); const next=lv.find(x=>!x.p.complete&&lvlIdx(x.L)>=lvlIdx(st.level||'A1'));
  const byL=Object.fromEntries(certs.map(c=>[c.level,c]));
  const get=async x=>{ setErr(null); setMsg(''); setBusy(x.L); try{ const c=byL[x.L]||await be.issueCert({level:x.L,words:x.p.wd,gram:x.p.gd});
      const res=await saveFile('wordy-sertifikat-'+x.L+'-'+String(c.name||'').replace(/\s+/g,'-').slice(0,30)+'.html',certHtml({...c,code:c.code}));
      SFX('fanfare'); W('react','cheer'); setMsg(res==='saved'||res==='link'?'Сертификат '+x.L+' сохранён. Открой файл в браузере, чтобы распечатать или сохранить в PDF. Код: '+c.code:'Сертификат выдан (код '+c.code+'), но файл не сохранился.'); }catch(e){ setErr(e); } setBusy(''); };
  const open=()=>{ SFX('pop'); try{ window.dispatchEvent(new CustomEvent('wordy-open-auth',{detail:{tab:'up'}})); }catch(e){} };
  return html`<div className="sec-h"><h2>Сертификаты</h2></div><div className="set-group certs" id="certs">
    ${done.length?done.map(x=>html`<div key=${x.L} className="set-row"><div><strong>${x.L} · ${LEVEL_NAMES[x.L]}</strong><p>${byL[x.L]?'Выдан · код '+byL[x.L].code:'Уровень пройден: '+x.p.wd+' '+plural(x.p.wd,'слово','слова','слов')+' и '+x.p.gd+' '+plural(x.p.gd,'тема','темы','тем')+' грамматики'}</p></div>
        ${user?html`<button className="btn small" id=${'cert-'+x.L} disabled=${!!busy} onClick=${()=>get(x)}>${busy===x.L?'Готовлю…':byL[x.L]?'Скачать':'Получить'}</button>`:html`<button className="btn small ghost" id=${'cert-reg-'+x.L} onClick=${open}>Войти, чтобы получить</button>`}</div>`)
      :html`<div className="set-row"><div><strong>Пока нет пройденных уровней</strong><p>${next?'Сертификат '+next.L+' откроется, когда выучишь '+next.p.needW+' '+plural(next.p.needW,'слово','слова','слов')+' и пройдёшь '+next.p.needG+' '+plural(next.p.needG,'тему','темы','тем')+' грамматики уровня. Сейчас: '+next.p.wd+' и '+next.p.gd+'.':'Пройди 60% слов и грамматики уровня.'}</p></div></div>`}
    ${!user?html`<div className="set-row"><div><p className="muted">Сертификаты выдаются с аккаунтом: на них твоё имя и код, по которому любой может проверить подлинность на сайте Wordy.</p></div></div>`:null}
    ${msg?html`<p className="acc-ok cert-msg" role="status">${msg}</p>`:null}${err?html`<div className="cert-msg"><${AccErr} e=${err}/></div>`:null}
  </div>`; }

/* ---------- registration gift: once per device and per account (the flag travels with the cloud copy of progress) ---------- */
const REG_BONUS=300;
function giveRegBonus(setSt){ setSt(s=>{ if(s.regBonus) return s; setTimeout(()=>{ try{ SFX('fanfare'); FX('confetti'); W('react','cheer'); W('say','Подарок за аккаунт: +'+REG_BONUS+' монет! Загляни в магазин.',0,true); }catch(e){} },400);
  return {...s,coins:(s.coins||0)+REG_BONUS,regBonus:Date.now()}; }); }

/* ---------- install Wordy on the phone: a visible button that never just disappears ---------- */
const isStandalone=()=>{ try{ return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true; }catch(e){ return false; } };
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent||'')||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function useInstall(){ const [bip,setBip]=useState(()=>window.__bip||null), [done,setDone]=useState(()=>isStandalone());
  useEffect(()=>{ const a=()=>setBip(window.__bip||null), b=()=>{ try{ localStorage.setItem('wordy.installed','1'); }catch(e){} };
    window.addEventListener('wordy-bip',a); window.addEventListener('appinstalled',b); return ()=>{ window.removeEventListener('wordy-bip',a); window.removeEventListener('appinstalled',b); }; },[]);
  return {bip,done,setBip}; }
function InstallSteps(){ return isIOS()?html`<ol className="inst-steps"><li>Открой Wordy в <b>Safari</b>.</li><li>Нажми кнопку <b>«Поделиться»</b> (квадрат со стрелкой вверх).</li><li>Выбери <b>«На экран Домой»</b> → «Добавить».</li></ol>`
  :html`<ol className="inst-steps"><li>Открой Wordy в <b>Chrome</b>.</li><li>Нажми <b>⋮</b> (три точки) → <b>«Установить приложение»</b> или «Добавить на главный экран».</li><li>Если установка зависла: в Play Маркете обнови <b>Chrome</b> и <b>«Сервисы Google Play»</b>, перезагрузи телефон и попробуй снова.</li></ol>`; }
function InstallCard(){ const {bip,done,setBip}=useInstall(); const [hide,setHide]=useState(()=>{ try{ return +(localStorage.getItem('wordy.instcard')||0)>Date.now(); }catch(e){ return false; } }), [state,setState]=useState(''), [steps,setSteps]=useState(false);
  const touch=(()=>{ try{ return matchMedia('(pointer:coarse)').matches; }catch(e){ return false; } })();
  if(!window.WORDY_SITE||done||hide||!touch) return null;
  const later=()=>{ SFX('tap'); try{ localStorage.setItem('wordy.instcard',String(Date.now()+7*DAY_MS)); }catch(e){} setHide(true); };
  const install=async()=>{ SFX('pop'); if(!bip){ setSteps(true); return; } try{ setState('asking'); bip.prompt(); const r=await bip.userChoice; window.__bip=null; setBip(null);
      if(r&&r.outcome==='accepted'){ setState('ok'); setSteps(true); try{ localStorage.setItem('wordy.installed','1'); }catch(e){} } else { setState(''); setSteps(true); } }catch(e){ setState(''); setSteps(true); } };
  return html`<section className="inst-card enter" id="inst-card" style=${{'--i':1}}>
    <div className="gc-h"><b>Установи Wordy на телефон</b><button className="icon-btn small" id="inst-later" aria-label="Не сейчас" onClick=${later}>${I.close()}</button></div>
    ${state==='ok'?html`<p className="acc-ok" role="status">Устанавливается. Значок Wordy появится на главном экране через несколько секунд. Если не появился — нажми кнопку ещё раз или установи вручную по шагам.</p>`
      :html`<p className="muted">Значок на главном экране, открывается как обычное приложение и работает без интернета.</p>`}
      <button className="btn wide inst-btn" id="inst-go" disabled=${state==='asking'} onClick=${install}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M5 21h14"/></svg>${isIOS()&&!bip?'Как установить':'Установить приложение'}</button>
      ${steps||(!bip&&isIOS())?html`<${InstallSteps}/>`:null}
  </section>`; }

/* ================= DRAFTS: anything typed or answered survives an accidental exit or reload ================= */
const DRAFT_TTL=21*864e5;
function draftRead(key){ try{ const d=JSON.parse(localStorage.getItem('wordy.draft.'+key)||'null'); if(d&&d.v!==undefined&&Date.now()-d.t<DRAFT_TTL) return d; }catch(e){} return null; }
function draftClear(key){ try{ localStorage.removeItem('wordy.draft.'+key); }catch(e){} }
function draftsGC(){ try{ for(let i=localStorage.length-1;i>=0;i--){ const k=localStorage.key(i); if(k&&k.startsWith('wordy.draft.')){ const d=JSON.parse(localStorage.getItem(k)||'null'); if(!d||Date.now()-d.t>DRAFT_TTL) localStorage.removeItem(k); } } }catch(e){} }
setTimeout(draftsGC,4000);
/* like useState, but the value is mirrored to localStorage under `key` (null key = off). isEmpty(v) → don't keep empty drafts */
function useDraftState(key,init,isEmpty){ const first=useRef(null), base=useRef(null);
  const [v,setV]=useState(()=>{ const iv=typeof init==='function'?init():init; try{ base.current=JSON.stringify(iv); }catch(e){} const d=key?draftRead(key):null; first.current=d?d.t:null; return d?d.v:iv; });
  const live=useRef(true);
  useEffect(()=>{ if(!key||!live.current) return; try{ const j=JSON.stringify(v); if((isEmpty&&isEmpty(v))||j===base.current) localStorage.removeItem('wordy.draft.'+key); else localStorage.setItem('wordy.draft.'+key,JSON.stringify({t:Date.now(),v})); }catch(e){} },[key,v]);
  const clear=()=>{ live.current=false; if(key) draftClear(key); setTimeout(()=>{ live.current=true; },0); };
  return [v,setV,clear,first.current]; }
function DraftNote({at,onReset}){ const [hide,setHide]=useState(false); if(!at||hide) return null;
  const m=Math.round((Date.now()-at)/60000), when=m<1?'только что':m<60?m+' мин назад':m<1440?Math.round(m/60)+' ч назад':Math.round(m/1440)+' дн назад';
  return html`<div className="draft-note enter" role="status" id="draft-note"><span>Восстановлен черновик · сохранён ${when}</span>
    ${onReset?html`<button className="link-btn" id="draft-reset" onClick=${()=>{ SFX('tap'); onReset(); setHide(true); }}>Начать заново</button>`:null}
    <button className="link-btn" aria-label="Скрыть" onClick=${()=>setHide(true)}>✕</button></div>`; }

/* ================= BACK BUTTON: phone "back" closes the open screen instead of leaving the app ================= */
const BACK_STACK=[]; let backSkip=0;
try{ addEventListener('popstate',()=>{ if(backSkip>0){ backSkip--; return; } const h=BACK_STACK.pop(); if(h){ h.done=true; try{ h.f(); }catch(e){} } }); }catch(e){}
function useBack(active,fn){ const ref=useRef(fn); ref.current=fn; const [n,setN]=useState(0);
  useEffect(()=>{ if(!active) return; const h={f:()=>{ ref.current(); setN(x=>x+1); },done:false}; BACK_STACK.push(h); try{ history.pushState({wordyBack:BACK_STACK.length},''); }catch(e){}
    return ()=>{ const i=BACK_STACK.indexOf(h); if(i>=0) BACK_STACK.splice(i,1); if(!h.done){ backSkip++; try{ history.back(); }catch(e){ backSkip--; } } }; },[!!active,n]); }

/* ================= FIRST-RUN TOUR: highlights the real interface, one idea per step ================= */
const TOUR_STEPS=__WD[1286];
function Tour({onDone}){ const [i,setI]=useState(0), [box,setBox]=useState(null); const cardRef=useRef(null);
  const steps=useMemo(()=>TOUR_STEPS.filter(s=>!s.sel||document.querySelector(s.sel)),[]); const s=steps[Math.min(i,steps.length-1)];
  useEffect(()=>{ const r=document.documentElement; r.classList.add('in-game','in-tour'); return ()=>r.classList.remove('in-game','in-tour'); },[]);
  useEffect(()=>{ let raf=0; const measure=()=>{ const el=s.sel&&document.querySelector(s.sel); if(!el){ setBox(null); return; } const b=el.getBoundingClientRect(); setBox({x:b.left,y:b.top,w:b.width,h:b.height}); };
    const el=s.sel&&document.querySelector(s.sel); if(el){ const b=el.getBoundingClientRect(); if(b.top<70||b.bottom>innerHeight-110) el.scrollIntoView({block:'center'}); }
    measure(); const t=setTimeout(measure,120); const on=()=>{ cancelAnimationFrame(raf); raf=requestAnimationFrame(measure); }; addEventListener('resize',on); addEventListener('scroll',on,true);
    setTimeout(()=>{ try{ cardRef.current&&cardRef.current.focus({preventScroll:true}); }catch(e){} },60);
    return ()=>{ clearTimeout(t); cancelAnimationFrame(raf); removeEventListener('resize',on); removeEventListener('scroll',on,true); }; },[i]);
  const finish=start=>{ SFX(s.last?'fanfare':'tap'); onDone(!!(s.last&&start===true)); window.scrollTo({top:0}); if(s.last){ W('react','cheer'); W('say',start===true?'Поехали! Сначала карточки.':'Удачи! Я рядом, если что.',0,true); } };
  const next=()=>{ if(i+1>=steps.length) return finish(true); SFX('tap'); setI(i+1); }, back=()=>{ if(i>0){ SFX('tap'); setI(i-1); } };
  useEffect(()=>{ const k=e=>{ if(e.key==='Escape') finish(); else if(e.key==='ArrowRight'||e.key==='Enter') next(); else if(e.key==='ArrowLeft') back(); }; addEventListener('keydown',k); return ()=>removeEventListener('keydown',k); });
  const pad=8, hole=box?{left:box.x-pad,top:box.y-pad,width:box.w+pad*2,height:box.h+pad*2}:null;
  const below=hole&&(hole.top+hole.height+230<innerHeight||hole.top<innerHeight/2);
  const cardPos=hole?(below?{top:Math.min(innerHeight-200,hole.top+hole.height+12)}:{bottom:Math.max(12,innerHeight-hole.top+12)}):{top:'50%',transform:'translateY(-50%)'};
  return html`<div className="tour" role="dialog" aria-modal="true" aria-labelledby="tour-t" onClick=${e=>{ if(e.target===e.currentTarget&&!s.last) next(); }}>
    ${hole?html`<div className="tour-hole" style=${hole} aria-hidden="true"></div>`:html`<div className="tour-dim" aria-hidden="true"></div>`}
    <div className="tour-card" ref=${cardRef} tabIndex="-1" style=${cardPos} id="tour-card">
      ${!hole?html`<img src=${'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13.5" fill="#FF7A12"/><ellipse cx="11" cy="12.5" rx="3.3" ry="4.6" fill="#fff"/><ellipse cx="19" cy="12.5" rx="3.3" ry="4.6" fill="#fff"/><ellipse cx="11" cy="12.8" rx="2.4" ry="3.5" fill="#24130A"/><ellipse cx="19" cy="12.8" rx="2.4" ry="3.5" fill="#24130A"/><path d="M12.5 20q2.5 1.8 5 0" stroke="#4A1E0C" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>')} alt="" width="56" height="56" className="tour-face"/>`:null}
      <b id="tour-t">${s.t}</b><p>${s.x.replace('{GL}',typeof GL!=='undefined'?GL.length:'')}</p>
      <span className="tour-dots" aria-label=${'Шаг '+(i+1)+' из '+steps.length}>${steps.map((_,k)=>html`<i key=${k} className=${k===i?'on':''}></i>`)}</span>
      <div className="tour-foot">${s.last?html`<button className="link-btn" id="tour-later" onClick=${()=>finish(false)}>Позже</button>`:html`<button className="link-btn" id="tour-skip" onClick=${()=>finish(false)}>Пропустить</button>`}
        ${i>0?html`<button className="btn small ghost" id="tour-back" onClick=${back}>Назад</button>`:null}
        <button className="btn small" id="tour-next" onClick=${next}>${s.last?'Начать слова дня':i===0?'Показать':'Дальше'}</button></div>
    </div></div>`; }


const accIcon=()=>svg(html`<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><path d="M16 4.6a3 3 0 0 1 0 6.2M18 14.4c1.7.6 2.8 2.2 3.1 4.6"/>`);
/*ACC_END*/
/*GAMES_START*/
/* ---------- games: «Угадай слово» and «Спаси Wordy» ---------- */
const gDay=s=>{ const td=dayKey(), y=dayKey(-1); return {streak:s.lastDay===td?s.streak:(s.lastDay===y?s.streak+1:1),lastDay:td}; };
const GAME_WORDS=(()=>{ let set=null; return ()=>{ if(set) return set; set=new Set();
  const re=/(^|[^A-Za-z'’\-])([a-z]{3,9})(?=$|[^A-Za-z'’\-])/g, add=t=>{ let m; t=String(t||''); while((m=re.exec(t))) set.add(m[2]); };
  ALL.forEach(w=>{ if(/^[a-z]+$/.test(w.en)) set.add(w.en); add(w.ex); add(w.def); });
  try{ TEXTS.forEach(x=>(x.p||[]).forEach(add)); }catch(e){}
  try{ GL.forEach(l=>add(JSON.stringify([l.examples,l.typed,l.choice]))); }catch(e){}
  return set; }; })();
const wgChecked={};
function wgValid(w){
  if(GAME_WORDS().has(w)) return Promise.resolve(true);
  if(w in wgChecked) return Promise.resolve(wgChecked[w]);
  let ctl=null; try{ ctl=new AbortController(); }catch(e){}
  const t=setTimeout(()=>{ try{ ctl&&ctl.abort(); }catch(e){} },3500);
  return fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+encodeURIComponent(w),ctl?{signal:ctl.signal}:{})
    .then(r=>{ clearTimeout(t); if(r.status===404){ wgChecked[w]=false; return false; } if(!r.ok) return 'offline';
      return r.json().then(j=>{ const ok=Array.isArray(j)&&j.length>0; wgChecked[w]=ok; return ok; }).catch(()=>'offline'); })
    .catch(()=>{ clearTimeout(t); return 'offline'; });
}
const WG_MAX=40;
function wgCfg(l){ l=Math.min(Math.max(1,l||1),WG_MAX);
  return {len:l<=3?4:l<=10?5:l<=20?6:l<=30?7:8, n:l<=2?1:l<=6?2:l<=12?3:l<=20?4:5, tries:l<=20?6:7,
    cefr:l<=5?['A1']:l<=12?['A1','A2']:l<=22?['A1','A2','B1']:l<=32?['A2','B1','B2']:['B1','B2','C1']}; }
function wgPool(cfg,used,skip){
  const ok=w=>/^[a-z]+$/.test(w.en)&&w.en.length===cfg.len&&w.track!=='idioms'&&!(skip||[]).includes(w.en);
  const pick=f=>{ const seen=new Set(); return ALL.filter(w=>ok(w)&&f(w)&&!seen.has(w.en)&&seen.add(w.en)); };
  let p=pick(w=>cfg.cefr.includes(w.cefr)&&!used.includes(w.en));
  if(p.length<cfg.n) p=pick(w=>!used.includes(w.en));
  if(p.length<cfg.n) p=pick(()=>true);
  return shuffle(p);
}
function wgScore(g,a){ const r=Array(a.length).fill('x'), c={};
  for(let i=0;i<a.length;i++){ if(g[i]===a[i]) r[i]='g'; else c[a[i]]=(c[a[i]]||0)+1; }
  for(let i=0;i<a.length;i++){ if(r[i]!=='g'&&c[g[i]]){ r[i]='y'; c[g[i]]--; } }
  return r; }
const wgInfo=en=>ALL.find(w=>w.en===en)||{en,ru:'',def:'',ipa:'',ex:''};
const WG_HINTS=[['def','Определение',0],['ru','Перевод',10],['letter','Открыть букву',15],['elim','Убрать 5 лишних букв',10]];

function newWgLevel(s){ const g=s.wg||{lvl:1,used:[]}, cfg=wgCfg(g.lvl);
  const words=wgPool(cfg,g.used||[]).slice(0,cfg.n).map(w=>w.en);
  return {...g,cur:{lvl:g.lvl,words,i:0,rows:[],hints:{},res:[]}}; }

function WordGame({st,update,onExit,active}){
  const wg=st.wg||{lvl:1,used:[]}, cur=wg.cur;
  useEffect(()=>{ if(!cur||cur.lvl!==wg.lvl||!cur.words||!cur.words.length) update(s=>({wg:newWgLevel(s)})); },[wg.lvl,!!cur]);
  const [typed,setTyped]=useState(''); const [msg,setMsg]=useState(''); const [shake,setShake]=useState(0); const [busy,setBusy]=useState(false); const [fin,setFin]=useState(null);
  const msgT=useRef(null);
  const note=(m)=>{ setMsg(m); clearTimeout(msgT.current); msgT.current=setTimeout(()=>setMsg(''),2200); };
  useEffect(()=>()=>clearTimeout(msgT.current),[]);
  const ok=cur&&cur.lvl===wg.lvl&&cur.words&&cur.words.length;
  const cfg=wgCfg(ok?cur.lvl:wg.lvl), ans=ok?cur.words[cur.i]:'', rows=ok?cur.rows:[], h=ok?cur.hints||{}:{};
  const won=ok&&rows.includes(ans), lost=ok&&!won&&rows.length>=cfg.tries, over=won||lost;
  const setCur=f=>update(s=>({wg:{...s.wg,cur:{...s.wg.cur,...f(s.wg.cur)}}}));
  const keyState={}; const rank={g:3,y:2,x:1};
  rows.forEach(r=>{ const sc=wgScore(r,ans); [...r].forEach((ch,i)=>{ if(!keyState[ch]||rank[sc[i]]>rank[keyState[ch]]) keyState[ch]=sc[i]; }); });
  (h.elim||[]).forEach(ch=>{ if(!keyState[ch]) keyState[ch]='x'; });
  const press=k=>{ if(!ok||over||busy||fin) return;
    if(k==='back'){ setTyped(t=>t.slice(0,-1)); return; }
    if(k==='enter'){ submit(); return; }
    if(/^[a-z]$/.test(k)) setTyped(t=>t.length<cfg.len?t+k:t), SFX('type'); };
  const submit=()=>{ const g=typed;
    if(g.length<cfg.len){ note('Нужно '+cfg.len+' '+plural(cfg.len,'буква','буквы','букв')); setShake(x=>x+1); SFX('wrong'); return; }
    if(rows.includes(g)){ note('Это слово уже было'); setShake(x=>x+1); return; }
    setBusy(true);
    wgValid(g).then(valid=>{ setBusy(false);
      if(valid!==true&&g!==ans){ note(valid==='offline'?'Нет связи со словарём — не могу проверить это слово':'Такого слова нет. Вводи только настоящие слова'); setShake(x=>x+1); SFX('wrong'); W('react','think'); return; }
      const nr=[...rows,g]; setTyped('');
      if(g===ans){ const n=nr.length, coins=5+cfg.len+2*(cfg.tries-n), xp=coins*2;
        update(s=>{ const w=s.wg, c=w.cur; return {coins:s.coins+coins,xp:s.xp+xp,...gDay(s),
          wg:{...w,solved:(w.solved||0)+1,used:[...(w.used||[]),g].slice(-500),cur:{...c,rows:nr,res:{...(c.res||{}),[c.i]:{n,coins}}}}}; });
        setTimeout(()=>{ SFX('fanfare'); W('react','cheer'); W('say',n===1?'С первой попытки?! Невероятно!':n<=3?pick(['Блестяще!','Вот это скорость!']):pick(['Угадал!','Есть! Молодец!','Отлично!']),0,true); },cfg.len*90+250);
      } else {
        setCur(()=>({rows:nr}));
        const sc=wgScore(g,ans), gr=sc.filter(x=>x==='g').length;
        if(nr.length>=cfg.tries) setTimeout(()=>{ SFX('fail'); W('react','encourage'); W('say','Не угадали — бывает. Зато теперь знаем новое слово!',0,true); },cfg.len*90+250);
        else if(gr>=cfg.len-1) setTimeout(()=>{ W('react','happy'); W('say','Почти! Одна буква осталась!'); },cfg.len*90+200);
        else if(gr>=2) setTimeout(()=>W('react','nod'),cfg.len*90+200);
      }
    });
  };
  useEffect(()=>{ if(!active) return; const f=e=>{ const t=e.target; if(e.ctrlKey||e.metaKey||e.altKey||(t&&t.closest&&t.closest('input,textarea,[contenteditable]'))) return;
      const k=e.key==='Backspace'?'back':e.key==='Enter'?'enter':(e.key||'').toLowerCase(); if(k==='back'||k==='enter'||/^[a-z]$/.test(k)){ e.preventDefault(); press(k); } };
    addEventListener('keydown',f); return ()=>removeEventListener('keydown',f); });
  const hint=(id,cost)=>{ if(!ok||over) return;
    if(id!=='letter'&&h[id]) return;
    if(id==='letter'){ const open=new Set(h.letters||[]); rows.forEach(r=>{ const sc=wgScore(r,ans); sc.forEach((x,i)=>{ if(x==='g') open.add(i); }); });
      const left=[...ans].map((_,i)=>i).filter(i=>!open.has(i)); if(left.length<=1){ note('Последнюю букву угадай сам!'); return; } }
    if(id==='elim'){ const out='abcdefghijklmnopqrstuvwxyz'.split('').filter(c=>!ans.includes(c)&&!keyState[c]); if(!out.length){ note('Лишних букв уже не осталось'); return; } }
    if(st.coins<cost){ SFX('wrong'); W('react','think'); W('say','Не хватает монет на подсказку. Угадай сам — ты сможешь!',0,true); return; }
    SFX('pop');
    update(s=>{ const c=s.wg.cur, hh={...(c.hints||{})}, a=c.words[c.i];
      if(id==='letter'){ const open=new Set(hh.letters||[]); c.rows.forEach(r=>wgScore(r,a).forEach((x,i)=>{ if(x==='g') open.add(i); })); const left=[...a].map((_,i)=>i).filter(i=>!open.has(i)); hh.letters=[...(hh.letters||[]),pick(left)]; }
      else if(id==='elim'){ const ks={}; c.rows.forEach(r=>[...r].forEach(ch=>ks[ch]=1)); (hh.elim||[]).forEach(ch=>ks[ch]=1); hh.elim=[...(hh.elim||[]),...shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter(ch=>!a.includes(ch)&&!ks[ch])).slice(0,5)]; }
      else hh[id]=true;
      return {coins:s.coins-cost,wg:{...s.wg,cur:{...c,hints:hh}}}; });
    if(cost) W('react','nod');
  };
  const next=()=>{ SFX('pop');
    if(lost){ update(s=>{ const w=s.wg, c=w.cur, cf=wgCfg(c.lvl); const nw=wgPool(cf,[...(w.used||[]),...c.words],c.words)[0]; const words=[...c.words]; if(nw) words[c.i]=nw.en;
      return {wg:{...w,used:[...(w.used||[]),c.words[c.i]].slice(-500),cur:{...c,words,rows:[],hints:{}}}}; }); return; }
    if(cur.i+1<cur.words.length){ setCur(c=>({i:c.i+1,rows:[],hints:{}})); W('say','Следующее слово!'); return; }
    const bonus=10*cur.words.length; update(s=>({coins:s.coins+bonus,xp:s.xp+bonus,wg:{...s.wg,best:Math.max(s.wg.best||0,s.wg.lvl)}}));
    const ns=Object.values(cur.res||{}).map(r=>r.n), avg=ns.length?ns.reduce((a,b)=>a+b,0)/ns.length:cfg.tries, earned=Object.values(cur.res||{}).reduce((a,r)=>a+(r.coins||0),0)+bonus;
    setFin({lvl:cur.lvl,bonus,coins:earned,words:cur.words.slice(),avg:avg.toFixed(1).replace('.',','),best:ns.length?'с '+Math.min(...ns)+'-й':'—',stars:avg<=3?3:avg<=4.5?2:1}); FX('rain',90); SFX('levelup'); W('react','cheer'); W('say','Уровень '+cur.lvl+' пройден!',0,true);
  };
  const nextLvl=()=>{ SFX('pop'); setFin(null); update(s=>({wg:{...s.wg,lvl:s.wg.lvl+1,cur:null}})); window.scrollTo({top:0}); };
  const top=html`<div className="sess-top"><button className="icon-btn" id="wg-close" onClick=${()=>{ SFX('tap'); onExit(); }} aria-label="Закрыть">${I.close()}</button>
    <div className="steps" aria-hidden="true">${(ok?cur.words:[0]).map((_,k)=>html`<i key=${k} className=${ok&&(cur.res||{})[k]?'good':ok&&k===cur.i?'on':''}></i>`)}</div><span className="phase">Угадай слово</span></div>`;
  if(!ok) return html`<section>${top}<p className="empty">Готовлю слова…</p></section>`;
  if(fin){ const nc=wgCfg(fin.lvl+1), oc=wgCfg(fin.lvl), ch=[];
    if(nc.len>oc.len) ch.push(nc.len+' '+plural(nc.len,'буква','буквы','букв')); if(nc.n>oc.n) ch.push(nc.n+' '+plural(nc.n,'слово','слова','слов')); if(nc.tries>oc.tries) ch.push(nc.tries+' попыток'); if(nc.cefr.join()!==oc.cefr.join()) ch.push('слова до '+nc.cefr[nc.cefr.length-1]);
    return html`<section>${top}<${GameWin} tone="good" kicker=${'Угадай слово · уровень '+fin.lvl} title="Уровень пройден!" big=${fin.words.length} bigLabel=${plural(fin.words.length,'слово','слова','слов')} stars=${fin.stars} coins=${fin.coins} xp=${fin.coins*2}
      stats=${[[fin.avg,'попыток на слово'],[fin.best,'лучшая попытка'],[(st.wg||{}).solved||0,'угадано всего']]}
      actions=${html`<button className="btn" id="wg-nextlvl" onClick=${nextLvl}>Уровень ${fin.lvl+1}</button>`}>
      <div className="gw-words">${fin.words.map(w=>{ const i=wgInfo(w); return html`<button key=${w} className="gw-w" onClick=${()=>speak(w)} aria-label=${'Послушать '+w}><b>${w}</b><small>${i.ru||''}</small></button>`; })}</div>
      <p className="gw-next">${fin.lvl>=WG_MAX?'Максимальная сложность — дальше новые слова.':ch.length?html`Дальше: ${ch.map((x,k)=>html`<i key=${k}>${x}</i>`)}`:'Дальше — новые слова того же уровня.'}</p>
    <//></section>`; }
  const info=wgInfo(ans), sc=rows.map(r=>wgScore(r,ans));
  const known=new Set(h.letters||[]);
  const tiles=[]; for(let r=0;r<cfg.tries;r++){ const g=r<rows.length?rows[r]:r===rows.length&&!over?typed:'';
    tiles.push(html`<div key=${r+':'+(r<rows.length?rows[r]:'')} className=${'wg-row'+(r===rows.length&&!over&&shake?' shake'+(shake%2):'')}>${[...Array(cfg.len)].map((_,i)=>{ const done=r<rows.length, ch=g[i]||'', hintCh=!done&&r===rows.length&&!ch&&known.has(i)?ans[i]:'';
      return html`<span key=${i} className=${'wg-t'+(done?' '+sc[r][i]:ch?' fill':'')+(hintCh?' hint':'')} style=${{'--k':i}}>${(ch||hintCh).toUpperCase()}</span>`; })}</div>`); }
  const KB=['qwertyuiop','asdfghjkl','+zxcvbnm-'];
  return html`<section className="wg">${top}
    <div className="wg-head" data-perch="card"><div className="wg-hl"><b>Уровень ${cur.lvl}</b><span className="wg-chips"><i>${cfg.len} ${plural(cfg.len,'буква','буквы','букв')}</i><i>${cfg.tries} ${plural(cfg.tries,'попытка','попытки','попыток')}</i><i>до ${cfg.cefr[cfg.cefr.length-1]}</i></span></div>
      <div className="wg-dots" aria-label=${'Слово '+(cur.i+1)+' из '+cur.words.length}>${cur.words.map((_,k)=>html`<i key=${k} className=${(cur.res||{})[k]?'ok':k===cur.i?'now':''}></i>`)}<small>${cur.i+1}/${cur.words.length}</small></div></div>
    <div className="wg-hints">${WG_HINTS.map(([id,n,cost])=>{ const used=id!=='letter'&&h[id]; return html`<button key=${id} id=${'wg-h-'+id} className=${'wg-hb'+(used?' used':'')} disabled=${over||used} onClick=${()=>hint(id,cost)}><span className="wg-hi" aria-hidden="true">${{def:'Aa',ru:'Ру',letter:'A?',elim:'✕'}[id]}</span>${n}${used?html` <em>✓</em>`:cost?html` <em>${I.coin()}${cost}</em>`:html` <em>бесплатно</em>`}</button>`; })}</div>
    ${h.def||h.ru||(h.letters||[]).length||(h.elim||[]).length?html`<div className="wg-hint-box">${h.def?html`<p><b>Значение:</b> ${info.def||'—'}</p>`:null}${h.ru?html`<p><b>Перевод:</b> ${info.ru||'—'}</p>`:null}${(h.letters||[]).length?html`<p><b>Открытые буквы:</b> <span className="wg-mask">${[...ans].map((c,i)=>known.has(i)?c.toUpperCase():'·').join(' ')}</span></p>`:null}${(h.elim||[]).length?html`<p><b>Нет в слове:</b> ${h.elim.map(c=>c.toUpperCase()).join(' ')}</p>`:null}</div>`:null}
    <div className="wg-grid" style=${{'--len':cfg.len,'--tries':cfg.tries}} aria-label="Поле догадок">${tiles}</div>
    <p className="wg-msg" role="status">${busy?'Проверяю слово…':msg}</p>
    ${over?html`<div className="wg-reveal enter">
      <span className="phase">${won?'Угадано с '+rows.length+'-й попытки':'Загаданное слово'}</span>
      <div className="wg-word"><b>${ans}</b>${info.ipa?html`<small>${info.ipa}</small>`:null}<button className="icon-btn" id="wg-say" aria-label="Послушать" onClick=${()=>speak(ans)}>${I.speaker()}</button></div>
      ${info.ru?html`<p className="wg-ru">${info.ru}</p>`:null}${info.def?html`<p className="muted">${info.def}</p>`:null}${info.ex?html`<p className="wg-ex">${highlight(info.ex,ans)}</p>`:null}
      ${won?html`<div className="rewards"><span className="pill">${I.coin()} +${((cur.res||{})[cur.i]||{}).coins||0}</span></div>`:null}
      <div className="wg-actions">${(st.myWords||{})[myId(ans)]?html`<span className="muted">✓ в моих словах</span>`:html`<button className="btn ghost small" id="wg-add" onClick=${()=>{ SFX('pop'); update(s=>({myWords:{...(s.myWords||{}),[myId(ans)]:{id:myId(ans),en:ans,ru:info.ru||'—',def:info.def||'',ipa:info.ipa||'',ex:info.ex||'',src:'Игра',track:'my',added:dayKey()}}})); W('react','nod'); }}>В мои слова</button>`}
        <button className="btn" id="wg-next" onClick=${next}>${lost?'Новое слово':cur.i+1<cur.words.length?'Следующее слово':'Завершить уровень'}</button></div></div>`
    :html`<div className="wg-kb" aria-label="Клавиатура">${KB.map((row,ri)=>html`<div key=${ri}>${[...row].map(k=>k==='+'?html`<button key="e" className="wg-k wide" id="wg-enter" onClick=${()=>press('enter')}>Ввод</button>`:k==='-'?html`<button key="b" className="wg-k wide" id="wg-back" aria-label="Стереть" onClick=${()=>press('back')}>⌫</button>`
      :html`<button key=${k} className=${'wg-k '+(keyState[k]||'')} onClick=${()=>press(k)}>${k}</button>`)}</div>`)}</div>`}
  </section>`;
}

/* ---- shared victory card ---- */
function GameWin({tone,kicker,title,big,bigLabel,stars,coins,xp,record,stats,children,actions}){
  const ref=useRef(null);
  useEffect(()=>{ const t=setTimeout(()=>{ const el=ref.current&&ref.current.querySelector('.gw-medal'); if(el){ FX('confetti',el,stars>=3?80:50); } },350);
    if(stars>0) for(let i=0;i<stars;i++) setTimeout(()=>SFX('star',i),500+i*220);
    return ()=>clearTimeout(t); },[]);
  return html`<div className=${'gwin enter gw-'+(tone||'good')} ref=${ref} data-perch="card">
    <div className="gw-band"><span className="gw-kicker">${kicker}</span>
      <div className="gw-medal" aria-hidden="true"><span className="gw-ring"></span><b>${typeof big==='number'?html`<${CountUp} to=${big}/>`:big!=null?big:'★'}</b>${bigLabel?html`<small>${bigLabel}</small>`:null}</div>
      <h2>${title}</h2>
      ${stars!=null?html`<div className="gw-stars" aria-label=${'Звёзд: '+stars+' из 3'}>${[0,1,2].map(i=>html`<i key=${i} className=${i<stars?'on':''} style=${{'--d':(i*.22+.45)+'s'}}>★</i>`)}</div>`:null}
      ${record?html`<span className="gw-record">Новый рекорд!</span>`:null}</div>
    <div className="gw-body">
      ${coins||xp?html`<div className="gw-rewards">${coins?html`<span className="gw-pill coin" id="gw-coins">${I.coin()}<b>+<${CountUp} to=${coins}/></b><small>монет</small></span>`:null}${xp?html`<span className="gw-pill">${I.bolt()}<b>+${xp}</b><small>XP</small></span>`:null}</div>`:null}
      ${stats&&stats.length?html`<div className="gw-stats">${stats.map(([v,l],i)=>html`<span key=${i}><b>${v}</b><small>${l}</small></span>`)}</div>`:null}
      ${children}
      <div className="gw-actions">${actions}</div></div>
  </div>`;
}

/* ---- «Спаси Wordy»: catch the right words ---- */
const CW_TOPICS=[
 {id:'animals',cefr:'A1',name:'Животные',task:'Лови животных',good:'cat dog horse cow sheep rabbit tiger lion monkey bear duck goat mouse camel wolf fox'.split(' '),bad:'apple chair bread table shirt window cheese pencil river cloud spoon door'.split(' '),note:'не животное'},
 {id:'food',cefr:'A1',name:'Еда',task:'Лови еду',good:'bread cheese apple rice soup egg banana meat butter carrot potato cake honey salad'.split(' '),bad:'spoon plate kitchen bottle shoe desk lamp door shirt bag cup knife'.split(' '),note:'это не еда'},
 {id:'body',cefr:'A1',name:'Части тела',task:'Лови части тела',good:'head arm leg hand foot nose mouth ear eye knee shoulder finger neck tooth'.split(' '),bad:'hat glove sock ring scarf shirt boot belt pillow brush window lamp'.split(' '),note:'не часть тела'},
 {id:'colours',cefr:'A1',name:'Цвета',task:'Лови цвета',good:'red blue green yellow black white pink purple orange brown grey gold'.split(' '),bad:'big small tall happy cold fast slow old new long short hot'.split(' '),note:'прилагательное, но не цвет'},
 {id:'clothes',cefr:'A1',name:'Одежда',task:'Лови одежду',good:'shirt jacket dress skirt coat jeans socks scarf hat boots sweater shorts gloves trousers'.split(' '),bad:'bed sofa carpet pillow curtain mirror lamp shelf cup phone clock towel'.split(' '),note:'не одежда'},
 {id:'jobs',cefr:'A1',name:'Профессии',task:'Лови профессии',good:'doctor teacher driver nurse pilot farmer cook dentist lawyer engineer waiter artist singer builder'.split(' '),bad:'hospital school bus kitchen office farm plane court restaurant song brick paint'.split(' '),note:'место или вещь, а не профессия'},
 __WD[1287],
 __WD[1288],
 __WD[1289],
 {id:'plural',cefr:'A2',name:'Множественное число',task:'Лови правильное множественное число',good:'children men women mice teeth feet boxes buses cities babies knives leaves potatoes people sheep'.split(' '),
  bad:[["childs","children"],["mans","men"],["womans","women"],["mouses","mice"],["tooths","teeth"],["foots","feet"],["boxs","boxes"],["citys","cities"],["babys","babies"],["knifes","knives"],["leafs","leaves"],["peoples","people"],["sheeps","sheep"]]},
 {id:'past_irr',cefr:'A2',name:'Past Simple: неправильные глаголы',task:'Лови правильный Past Simple',good:'went saw took gave ate drank wrote bought thought brought taught caught flew swam began spoke knew left felt found made came ran sat'.split(' '),
  bad:__WD[1290]},
 {id:'past_reg',cefr:'A2',name:'Окончание -ed',task:'Лови правильное написание с -ed',good:'stopped studied planned played tried cried danced hoped carried enjoyed shopped lived cooked worked'.split(' '),
  bad:[["stoped","stopped"],["studyed","studied"],["planed","planned"],["plaied","played"],["tryed","tried"],["cryed","cried"],["danceed","danced"],["hopeed","hoped"],["carryed","carried"],["shoped","shopped"],["liveed","lived"],["enjoied","enjoyed"]]},
 __WD[1291],
 __WD[1292],
 __WD[1293],
 {id:'uncount',cefr:'A2',name:'Неисчисляемые',task:'Лови неисчисляемые существительные',good:'water advice information furniture news money luggage homework rice music weather knowledge traffic bread milk research'.split(' '),bad:'apple chair idea car coin egg suggestion suitcase song cup fact problem'.split(' '),note:'исчисляемое: можно сказать two …s'},
 {id:'adverbs',cefr:'A2',name:'Наречия',task:'Лови наречия (как? каким образом?)',good:'quickly well hard fast carefully slowly happily badly easily loudly quietly early late beautifully'.split(' '),
  bad:__WD[1294]},
 __WD[1295],
 __WD[1296],
 {id:'syn_big',cefr:'A2',name:'Синонимы big',task:'Лови синонимы слова big',good:'large huge enormous giant vast massive immense gigantic'.split(' '),bad:'tiny small little narrow slim minor short thin'.split(' '),note:'это противоположное: «маленький»'},
 {id:'syn_happy',cefr:'A2',name:'Синонимы happy',task:'Лови синонимы слова happy',good:'glad cheerful delighted joyful pleased content thrilled overjoyed'.split(' '),bad:'sad upset gloomy miserable angry worried bored lonely'.split(' '),note:'это не «счастливый»'},
 __WD[1297],
 {id:'v3',cefr:'B1',name:'Третья форма глагола',task:'Лови третью форму (V3)',good:'gone seen taken given eaten written been done broken chosen forgotten spoken known flown swum begun'.split(' '),
  bad:__WD[1298]},
 __WD[1299],
 __WD[1300],
 __WD[1301],
 __WD[1302],
 {id:'spelling',cefr:'B1',name:'Правописание',task:'Лови слова без ошибок',good:'necessary beautiful because friend which believe separate tomorrow different really until address receive government'.split(' '),
  bad:__WD[1303]},
 {id:'formal',cefr:'B2',name:'Формальные слова (IELTS)',task:'Лови формальные слова для эссе',good:'obtain purchase assist commence require sufficient numerous approximately demonstrate significant inquire reside consequently furthermore'.split(' '),
  bad:__WD[1304]},
 __WD[1305],
 __WD[1306],
 __WD[1307],
];
CW_TOPICS.push(
 {id:'numbers',cefr:'A1',name:'Числа',task:'Лови числа',good:'one two three four five six seven eight nine ten eleven twelve'.split(' '),bad:'red cat book sun milk chair hand blue tree fish bag pen'.split(' '),note:'не число'},
 {id:'family',cefr:'A1',name:'Семья',task:'Лови членов семьи',good:'mother father sister brother aunt uncle cousin grandma grandpa daughter son wife husband'.split(' '),bad:'teacher doctor friend neighbour driver pilot farmer nurse boss classmate'.split(' '),note:'не родственник'},
 __WD[1308],
 __WD[1309],
 __WD[1310],
 __WD[1311],
 {id:'weather',cefr:'A2',name:'Погода',task:'Лови слова о погоде',good:'sunny rainy windy cloudy snowy foggy stormy hot cold warm freezing'.split(' '),bad:'happy hungry tired angry busy sleepy lazy proud'.split(' '),note:'это про людей, не про погоду'},
 __WD[1312],
 __WD[1313],
 __WD[1314],
 __WD[1315],
 __WD[1316],
 __WD[1317],
 __WD[1318],
 __WD[1319],
 __WD[1320],
 __WD[1321],
 __WD[1322],
 __WD[1323],
 __WD[1324],
 __WD[1325],
 __WD[1326]
);

const CW_LV=['A1','A2','B1','B2','C1','IELTS','SAT'];
const CW_SCENE=html`<svg className="cw-scene" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
  <path className="h1" d="M0 92 C40 70 80 66 120 80 C160 94 190 60 240 58 C290 56 320 84 360 78 C380 75 392 70 400 68 V160 H0Z"/>
  <path className="h2" d="M0 118 C50 96 90 100 140 112 C190 124 220 98 270 98 C320 98 350 118 400 108 V160 H0Z"/>
  <path className="h3" d="M0 140 C60 128 120 134 180 140 C240 146 300 128 400 134 V160 H0Z"/></svg>`;
function CatchGame({st,update,onExit,active}){
  const [tid,setTid]=useState(null); const [phase,setPhase]=useState('pick'); const [hud,setHud]=useState({score:0,lives:3}); const [res,setRes]=useState(null); const [fb,setFb]=useState(null); const [hurt,setHurt]=useState(0);
  const field=useRef(null), layer=useRef(null), basket=useRef(null), E=useRef(null), aim=useRef(.5), fbT=useRef(null);
  const topic=CW_TOPICS.find(t=>t.id===tid);
  const best=(st.cw||{}).best||{};
  const steer=f=>{ aim.current=Math.min(.95,Math.max(.05,f)); W('goTo','cwground',{frac:aim.current,fast:true}); };
  useEffect(()=>{ const on=phase==='play'||phase==='pause'; document.body.classList.toggle('cw-on',on); return ()=>document.body.classList.remove('cw-on'); },[phase]);
  useEffect(()=>{ const t=setTimeout(()=>{ if(phase==='play'||phase==='pause') steer(aim.current); else W('goTo','card',{frac:.88}); },120); return ()=>clearTimeout(t); },[phase]);
  useEffect(()=>()=>{ clearTimeout(fbT.current); const e=E.current; if(e){ e.stop=true; cancelAnimationFrame(e.raf); } },[]);
  const showFb=f=>{ setFb({...f,k:Date.now()}); clearTimeout(fbT.current); fbT.current=setTimeout(()=>setFb(null),2200); };
  const start=id=>{ SFX('pop'); setTid(id); setRes(null); setFb(null); setHud({score:0,lives:3}); aim.current=.5; setPhase('play'); window.scrollTo({top:0}); W('react','nod'); W('say',pick(['Веди меня под правильные слова!','Двигай меня — я ловлю!','Лови только верные!'])); };
  const onPtr=e=>{ if(phase!=='play'||!field.current) return; const r=field.current.getBoundingClientRect(); steer((e.clientX-r.left)/r.width); };
  useEffect(()=>{ if(!active||phase!=='play') return; const f=e=>{ if(e.key==='ArrowLeft'||e.key==='a'){ e.preventDefault(); steer(aim.current-.09); } else if(e.key==='ArrowRight'||e.key==='d'){ e.preventDefault(); steer(aim.current+.09); } };
    addEventListener('keydown',f); return ()=>removeEventListener('keydown',f); },[active,phase]);
  useEffect(()=>{ if(phase!=='play'||!topic) return; const F=field.current, L=layer.current; if(!F||!L) return;
    let e=E.current; if(!e||e.tid!==topic.id||e.dead){ L.innerHTML=''; e=E.current={tid:topic.id,items:[],score:0,lives:3,t:0,next:.5,log:[],caught:0,dodged:0,bags:{g:[],b:[]},dead:false,stop:false}; }
    e.stop=false; let last=performance.now();
    const hiddenW=()=>{ const d=document.documentElement.dataset.wordy; return d==='hidden'||!window.Wordy||!window.Wordy.where; };
    const draw=(bag,src)=>{ if(!e.bags[bag].length) e.bags[bag]=shuffle(src.map((x,i)=>i)); return e.bags[bag].pop(); };
    const spawn=()=>{ const good=Math.random()<.56, src=good?topic.good:topic.bad; let idx=draw(good?'g':'b',src), tries=0;
      const txt=i=>{ const x=src[i]; return Array.isArray(x)?x[0]:x; };
      while(tries++<4&&e.items.some(it=>it.text===txt(idx))) idx=draw(good?'g':'b',src);
      const raw=src[idx], text=Array.isArray(raw)?raw[0]:raw, fix=Array.isArray(raw)?raw[1]:topic.note||'';
      const el=document.createElement('div'); el.className='cw-word'; el.textContent=text; L.appendChild(el);
      const w=el.offsetWidth, Wd=F.clientWidth; let x=0, k=0;
      do{ x=Math.max(6,Math.random()*(Wd-w-12)+6); k++; } while(k<6&&e.items.some(it=>it.y<60&&Math.abs(it.x-x)<w));
      const it={el,x,w,h:el.offsetHeight,y:-46,good,text,fix,v:.85+Math.random()*.3,done:false,passed:false}; el.style.transform='translate('+x+'px,-46px)'; e.items.push(it); };
    const to=(it,x,y,sc,ms,delay)=>{ const el=it.el; el.style.transition='transform '+ms+'ms cubic-bezier(.45,0,.75,.5) '+(delay||0)+'ms, opacity '+ms+'ms ease '+(delay||0)+'ms'; requestAnimationFrame(()=>{ el.style.transform='translate('+x+'px,'+y+'px) scale('+sc+')'; el.style.opacity='0'; }); setTimeout(()=>{ try{ el.remove(); }catch(z){} },ms+(delay||0)+60); };
    const done=it=>{ it.done=true; e.items=e.items.filter(x=>x!==it); };
    const pop=(x,y,t,cls)=>{ const p=document.createElement('div'); p.className='cw-pop '+cls; p.textContent=t; p.style.left=x+'px'; p.style.top=y+'px'; L.appendChild(p); setTimeout(()=>{ try{ p.remove(); }catch(z){} },900); };
    const lose=()=>{ e.lives--; setHud({score:e.score,lives:e.lives}); setHurt(x=>x+1); SFX('wrong'); W('react','wrong'); if(e.lives<=0) end(); };
    const end=()=>{ e.stop=true; e.dead=true; cancelAnimationFrame(e.raf); const sc=e.score, coins=Math.min(60,sc), prev=best[topic.id]||0;
      update(s=>({coins:s.coins+coins,xp:s.xp+sc*2,...(sc>0?gDay(s):{}),cw:{...(s.cw||{}),games:((s.cw||{}).games||0)+1,best:{...((s.cw||{}).best||{}),[topic.id]:Math.max(((s.cw||{}).best||{})[topic.id]||0,sc)}}}));
      setTimeout(()=>{ e.items.forEach(it=>{ try{ it.el.remove(); }catch(x){} }); e.items=[]; setFb(null); setRes({score:sc,coins,prev,record:sc>prev&&sc>0,log:e.log.slice(),dodged:e.dodged}); setPhase('over');
        W('react',sc>prev&&sc>0?'cheer':'encourage'); W('say',sc>prev&&sc>0?'Новый рекорд: '+sc+'!':pick(['Ой, я в луже! Давай ещё раз?','Плюх! Ничего, попробуем снова.']),0,true); },900); };
    const loop=now=>{ if(e.stop) return; const dt=Math.min(.05,(now-last)/1000); last=now; e.t+=dt;
      const fr=F.getBoundingClientRect(), H=F.clientHeight-46, Wd=F.clientWidth, sp=H/6.5*(1+Math.min(e.score,60)*.026);
      let cx=aim.current*Wd, top=H-62;
      if(!hiddenW()){ const p=window.Wordy.where(); if(p&&p.surface==='cwground'&&p.mode==='ground'){ cx=p.x-fr.left; top=p.y-fr.top-70*(p.k||1); } }
      if(basket.current) basket.current.style.transform='translateX('+(cx-34)+'px)';
      e.next-=dt; if(e.next<=0){ spawn(); e.next=Math.max(.8,1.75-e.score*.022)*(.8+Math.random()*.4); }
      for(const it of e.items.slice()){ it.y+=sp*it.v*dt; it.el.style.transform='translate('+it.x+'px,'+it.y+'px)';
        const bot=it.y+it.h;
        if(!it.passed&&bot>=top){ const hit=Math.abs(it.x+it.w/2-cx)<it.w/2+26;
          if(hit){ done(it);
            if(it.good){ e.score++; setHud({score:e.score,lives:e.lives}); SFX('pop'); it.el.classList.add('got'); to(it,cx-it.w/2,top+20,.3,260); pop(cx,top-10,'+1','ok'); W('react','nod'); if(e.score%10===0) W('say',e.score+'! '+pick(['Ты меня спасаешь!','Вот это реакция!','Так держать!'])); }
            else { it.el.classList.add('bad'); e.log.push({bad:it.text,fix:it.fix}); showFb({kind:'bad',text:it.text,fix:it.fix}); to(it,it.x,it.y+30,.92,420,420); lose(); if(e.stop) return; }
            continue; }
          if(bot>=top+18) it.passed=true; }
        if(bot>=H-4){ done(it);
          if(it.good){ it.el.classList.add('miss'); e.log.push({miss:it.text}); showFb({kind:'miss',text:it.text}); to(it,it.x,H-it.h+34,.9,520,300); lose(); if(e.stop) return; }
          else { e.dodged++; it.el.classList.add('sink'); to(it,it.x,H-it.h+40,.85,460,0); } } }
      e.raf=requestAnimationFrame(loop); };
    e.raf=requestAnimationFrame(loop);
    const vis=()=>{ if(document.hidden) setPhase(p=>p==='play'?'pause':p); }; document.addEventListener('visibilitychange',vis);
    return ()=>{ e.stop=true; cancelAnimationFrame(e.raf); document.removeEventListener('visibilitychange',vis); };
  },[phase,tid]);
  useEffect(()=>{ if(!active&&phase==='play') setPhase('pause'); },[active]);
  const top=html`<div className="sess-top"><button className="icon-btn" id="cw-close" onClick=${()=>{ SFX('tap'); if(phase==='pick') onExit(); else { if(E.current){ E.current.stop=true; E.current.dead=true; } setPhase('pick'); } }} aria-label=${phase==='pick'?'Закрыть':'К темам'}>${phase==='pick'?I.close():I.back()}</button><span className="phase" style=${{flex:1}}>Спаси Wordy</span>
    ${phase==='play'||phase==='pause'?html`<span className="cw-hearts" aria-label=${'Жизней: '+hud.lives}>${[0,1,2].map(i=>html`<i key=${i+(i<hud.lives?'on':'off')} className=${i<hud.lives?'on':'off'}>♥</i>`)}</span><b className="cw-score" aria-label="Очки">${hud.score}</b>`:null}</div>`;
  if(phase==='pick') return html`<section>${top}
    <div className="cw-intro" data-perch="card"><b>Лови правильные слова</b><p>Води пальцем по полю — Wordy побежит за ним. Подставляй его под правильные слова и уводи от неправильных. Три ошибки — и он плюхается в лужу.</p></div>
    ${CW_LV.map(lv=>html`<div key=${lv}><div className="sec-h"><h2>${lv==='IELTS'||lv==='SAT'?lv:'Уровень '+lv}</h2></div><div className="cw-topics">${CW_TOPICS.filter(t=>t.cefr===lv).map(t=>html`<button key=${t.id} id=${'cw-'+t.id} className="cw-topic" data-lv=${lv} onClick=${()=>start(t.id)}><b>${t.name}</b><small>${t.task}</small><span className="cwt-ex"><i>${t.good[0]}</i><s>${Array.isArray(t.bad[0])?t.bad[0][0]:t.bad[0]}</s></span>${best[t.id]?html`<span className="cwt-best">★ ${best[t.id]}</span>`:null}</button>`)}</div></div>`)}
  </section>`;
  if(phase==='over'&&res){ const sc=res.score, stars=sc>=25?3:sc>=12?2:sc>=5?1:0;
    return html`<section>${top}<${GameWin} tone="sky" kicker=${'Спаси Wordy · '+topic.name} title=${sc>=25?'Великолепно!':sc>=12?'Отличный улов!':sc>0?'Хорошая попытка!':'Попробуй ещё раз'} big=${sc} bigLabel=${plural(sc,'слово поймано','слова поймано','слов поймано')} stars=${stars} coins=${res.coins} xp=${sc*2} record=${res.record}
      stats=${[[Math.max(sc,best[topic.id]||0),'рекорд темы'],[res.dodged,plural(res.dodged,'ошибка пропущена','ошибки пропущено','ошибок пропущено')+' мимо'],[res.log.length,plural(res.log.length,'ошибка','ошибки','ошибок')]]}
      actions=${html`<button className="btn ghost" id="cw-topics" onClick=${()=>{ SFX('tap'); setPhase('pick'); }}>Другая тема</button><button className="btn" id="cw-again" onClick=${()=>start(topic.id)}>Ещё раз</button>`}>
      ${res.log.length?html`<div className="gw-log"><b>Разбор ошибок</b>${res.log.map((l,i)=>html`<p key=${i} className=${l.bad?'bad':'miss'}>${l.bad?html`<s>${l.bad}</s><span>→</span><b>${l.fix||'неверно'}</b>`:html`<span><b>${l.miss}</b> — правильное, его надо было поймать</span>`}</p>`)}</div>`:html`<p className="gw-next">Ни одной ошибки — идеально!</p>`}
    <//></section>`; }
  return html`<section className="cw">${top}
    <div className="cw-sign">${topic.task}</div>
    <div className=${'cw-field'+(hurt?' hurt'+(hurt%2):'')} ref=${field} onPointerDown=${onPtr} onPointerMove=${onPtr}>
      ${CW_SCENE}
      <div className="cw-layer" ref=${layer}></div>
      ${fb?html`<div key=${fb.k} className=${'cw-fb '+fb.kind} role="status">${fb.kind==='bad'?html`<span className="cw-fb-ic">✕</span><span><s>${fb.text}</s> ${String(fb.fix).match(/^[а-яё]/i)?html`— ${fb.fix}`:html`→ <b>${fb.fix}</b>`}</span>`:html`<span className="cw-fb-ic">!</span><span>Пропущено <b>${fb.text}</b> — это правильное слово</span>`}</div>`:null}
      <div className="cw-basket" ref=${basket} aria-hidden="true"></div>
      <div className="cw-ground" data-perch="cwground"></div>
      ${phase==='pause'?html`<div className="cw-over enter"><b>Пауза</b><button className="btn" id="cw-resume" onClick=${()=>{ SFX('pop'); setPhase('play'); }}>Продолжить</button></div>`:null}
    </div>
    ${phase==='play'?html`<button className="btn ghost small cw-pause" id="cw-pause" onClick=${()=>{ SFX('tap'); setPhase('pause'); }}>Пауза</button>`:null}
  </section>`;
}

/* ---- «Слова из букв»: connect letters, fill the crossword ---- */
const CX_LEX=(()=>{ let lex=null, core=null; return ()=>{ if(lex) return {lex,core};
  core=new Set(ALL.filter(w=>/^[a-z]+$/.test(w.en)&&w.en.length>=3&&w.en.length<=8&&w.track!=='idioms').map(w=>w.en));
  const cnt={}, re=/(^|[^A-Za-z'’\-])([a-z]{3,8})(?=$|[^A-Za-z'’\-])/g;
  const scan=t=>{ let m; t=String(t||''); while((m=re.exec(t))) cnt[m[2]]=(cnt[m[2]]||0)+1; };
  try{ TEXTS.forEach(x=>(x.p||[]).forEach(scan)); }catch(e){} ALL.forEach(w=>{ scan(w.ex); scan(w.def); });
  lex=new Set(core); Object.keys(cnt).forEach(w=>{ if(cnt[w]>=3) lex.add(w); });
  return {lex,core}; }; })();
const CX_MAX=50;
function cxCfg(l){ l=Math.min(Math.max(1,l||1),CX_MAX);
  return l<=4?{len:4,min:3,max:4}:l<=12?{len:5,min:4,max:5}:l<=24?{len:6,min:5,max:7}:l<=38?{len:7,min:6,max:8}:{len:8,min:7,max:9}; }
const cxCnt=w=>{ const c={}; for(const ch of w) c[ch]=(c[ch]||0)+1; return c; };
const cxFits=(w,cnt)=>{ const c={}; for(const ch of w){ c[ch]=(c[ch]||0)+1; if(c[ch]>(cnt[ch]||0)) return false; } return true; };
function cxLayout(words,lim){
  const G=new Map(), K=(r,c)=>r+','+c, placed=[];
  const put=(w,r,c,d)=>{ for(let i=0;i<w.length;i++){ const k=K(r+(d?i:0),c+(d?0:i)), o=G.get(k)||{ch:w[i]}; o[d?'v':'h']=1; G.set(k,o); } placed.push({w,r,c,d}); };
  const can=(w,r,c,d)=>{ let cross=0;
    if(G.has(K(r-(d?1:0),c-(d?0:1)))||G.has(K(r+(d?w.length:0),c+(d?0:w.length)))) return -1;
    for(let i=0;i<w.length;i++){ const rr=r+(d?i:0), cc=c+(d?0:i), o=G.get(K(rr,cc));
      if(o){ if(o.ch!==w[i]||o[d?'v':'h']) return -1; cross++; }
      else if(d===0?(G.has(K(rr-1,cc))||G.has(K(rr+1,cc))):(G.has(K(rr,cc-1))||G.has(K(rr,cc+1)))) return -1; }
    return cross; };
  const box=extra=>{ let r0=1e9,r1=-1e9,c0=1e9,c1=-1e9; const f=(r,c)=>{ r0=Math.min(r0,r); r1=Math.max(r1,r); c0=Math.min(c0,c); c1=Math.max(c1,c); };
    G.forEach((_,k)=>{ const [r,c]=k.split(',').map(Number); f(r,c); }); if(extra){ const {w,r,c,d}=extra; f(r,c); f(r+(d?w.length-1:0),c+(d?0:w.length-1)); } return {r0,r1,c0,c1}; };
  put(words[0],0,0,0);
  for(const w of words.slice(1)){ let best=null;
    for(const p of placed) for(let i=0;i<p.w.length;i++) for(let j=0;j<w.length;j++){ if(p.w[i]!==w[j]) continue;
      const d=1-p.d, r=p.d===0?p.r-j:p.r+i, c=p.d===0?p.c+i:p.c-j, sc=can(w,r,c,d); if(sc<1) continue;
      const b=box({w,r,c,d}), rows=b.r1-b.r0+1, cols=b.c1-b.c0+1; if(rows>lim||cols>lim) continue;
      const score=sc*10-rows*cols*.2+Math.random(); if(!best||score>best.score) best={r,c,d,score}; }
    if(best) put(w,best.r,best.c,best.d); }
  const b=box(); return {rows:b.r1-b.r0+1,cols:b.c1-b.c0+1,words:placed.map(p=>({w:p.w,r:p.r-b.r0,c:p.c-b.c0,d:p.d}))};
}
function cxBuild(lvl,used){ const cfg=cxCfg(lvl), {lex,core}=CX_LEX();
  const okC=lvl<=12?['A1','A2']:lvl<=24?['A1','A2','B1']:null, cef={}; ALL.forEach(w=>{ if(!cef[w.en]) cef[w.en]=w.cefr; });
  const all=[...core].filter(w=>w.length===cfg.len&&!used.includes(w)), easy=okC?all.filter(w=>okC.includes(cef[w])):all;
  const bases=[...shuffle(easy),...shuffle(all.filter(w=>!easy.includes(w)))]; let best=null;
  for(const base of bases.slice(0,80)){ const cnt=cxCnt(base);
    const subs=[...lex].filter(w=>w.length>=3&&w.length<=cfg.len&&w!==base&&cxFits(w,cnt));
    const pick=[base,...shuffle(subs.filter(w=>core.has(w))),...shuffle(subs.filter(w=>!core.has(w)))].slice(0,cfg.max+3).sort((a,b)=>b.length-a.length);
    const L=cxLayout(pick,cfg.len<=5?7:cfg.len<=6?9:10); L.words=L.words.slice(0,cfg.max);
    const res={...L,base,letters:shuffle([...base]),bonusPool:subs.length};
    if(L.words.length>=cfg.min) return res; if(!best||L.words.length>best.words.length) best=res; }
  return best; }
const cxCells=g=>{ const m={}; g.words.forEach((x,wi)=>{ for(let i=0;i<x.w.length;i++){ const k=(x.r+(x.d?i:0))+','+(x.c+(x.d?0:i)); (m[k]=m[k]||{ch:x.w[i],ws:[]}).ws.push(wi); } }); return m; };

function CrossGame({st,update,onExit,active}){
  const cx=st.cx||{lvl:1,used:[]}, cur=cx.cur;
  useEffect(()=>{ if(!cur||cur.lvl!==cx.lvl){ const g=cxBuild(cx.lvl,cx.used||[]); if(g) update(s=>({cx:{...(s.cx||{lvl:1,used:[]}),cur:{lvl:(s.cx||{}).lvl||1,...g,found:[],bonus:[],open:[]}}})); } },[cx.lvl,!!cur]);
  const [path,setPath]=useState([]); const [pt,setPt]=useState(null); const [msg,setMsg]=useState(null); const [fin,setFin]=useState(null); const [flash,setFlash]=useState(null);
  const wheel=useRef(null), drag=useRef(false), msgT=useRef(null);
  useEffect(()=>()=>clearTimeout(msgT.current),[]);
  const note=(t,k)=>{ setMsg({t,k}); clearTimeout(msgT.current); msgT.current=setTimeout(()=>setMsg(null),1800); };
  const ok=cur&&cur.lvl===cx.lvl&&cur.words;
  const cells=ok?cxCells(cur):{}, found=ok?cur.found:[], openSet=new Set(ok?cur.open||[]:[]);
  const isOpen=k=>openSet.has(k)||cells[k].ws.some(wi=>found.includes(cur.words[wi].w));
  const N=ok?cur.letters.length:0, R=N<=5?78:N<=6?88:96, SZ=R*2+64;
  const HIT=Math.min(28,R*Math.sin(Math.PI/Math.max(N,3))*(N>=7?.55:.66));
  const pos=i=>{ const a=-Math.PI/2+i*2*Math.PI/N; return {x:SZ/2+R*Math.cos(a),y:SZ/2+R*Math.sin(a)}; };
  const word=path.map(i=>cur.letters[i]).join('');
  const submit=w=>{ if(!ok||fin) return; if(w.length<2){ return; }
    const tgt=cur.words.find(x=>x.w===w);
    if(tgt){ if(found.includes(w)){ note('Уже есть','old'); W('react','think'); return; }
      const nf=[...found,w], all=cur.words.every(x=>nf.includes(x.w)); setFlash(w); setTimeout(()=>setFlash(null),700);
      SFX('correct'); update(s=>({cx:{...s.cx,cur:{...s.cx.cur,found:nf}}}));
      if(all) setTimeout(()=>{ const coins=6*cur.words.length+2*(cur.bonus||[]).length, xp=coins*2;
          update(s=>({coins:s.coins+coins,xp:s.xp+xp,...gDay(s),cx:{...s.cx,solved:(s.cx.solved||0)+1,used:[...(s.cx.used||[]),cur.base].slice(-300),best:Math.max(s.cx.best||0,s.cx.lvl)}}));
          setFin({coins}); SFX('fanfare'); FX('rain',90); W('react','cheer'); W('say','Кроссворд разгадан!',0,true); },650);
      else W('react',w.length>=5?'cheer':'nod');
      return; }
    if(w.length>=3&&CX_LEX().lex.has(w)){ if((cur.bonus||[]).includes(w)){ note('Это бонусное слово уже было','old'); return; }
      update(s=>({coins:s.coins+2,cx:{...s.cx,cur:{...s.cx.cur,bonus:[...(s.cx.cur.bonus||[]),w]}}})); SFX('coin'); note('Бонусное слово +2','bonus'); W('react','happy'); return; }
    note(w.length<3?'Слово из трёх букв и больше':'Такого слова нет','bad'); SFX('wrong'); };
  const near=(x,y)=>{ for(let i=0;i<N;i++){ const p=pos(i); if(Math.hypot(p.x-x,p.y-y)<HIT) return i; } return -1; };
  const local=e=>{ const r=wheel.current.getBoundingClientRect(); return {x:(e.clientX-r.left)*SZ/r.width,y:(e.clientY-r.top)*SZ/r.height}; };
  const down=e=>{ if(fin) return; const p=local(e), i=near(p.x,p.y); if(i<0) return; e.preventDefault(); try{ wheel.current.setPointerCapture(e.pointerId); }catch(x){} drag.current=true; setPath([i]); setPt(p); SFX('tap'); };
  const move=e=>{ if(!drag.current) return; const p=local(e); setPt(p); const i=near(p.x,p.y); if(i<0) return;
    setPath(pa=>{ if(pa.length>1&&pa[pa.length-2]===i) return pa.slice(0,-1); if(pa.includes(i)) return pa; SFX('type'); return [...pa,i]; }); };
  const up=()=>{ if(!drag.current) return; drag.current=false; setPt(null); setPath(pa=>{ const w=pa.map(i=>cur.letters[i]).join(''); setTimeout(()=>submit(w),0); return []; }); };
  useEffect(()=>{ if(!active||!ok) return; let typed=[];
    const f=e=>{ const t=e.target; if(e.ctrlKey||e.metaKey||e.altKey||(t&&t.closest&&t.closest('input,textarea'))) return; const k=(e.key||'').toLowerCase();
      if(k==='enter'){ e.preventDefault(); setPath(pa=>{ const w=pa.map(i=>cur.letters[i]).join(''); setTimeout(()=>submit(w),0); return []; }); return; }
      if(k==='backspace'){ e.preventDefault(); setPath(pa=>pa.slice(0,-1)); return; }
      if(/^[a-z]$/.test(k)) setPath(pa=>{ const i=cur.letters.findIndex((ch,j)=>ch===k&&!pa.includes(j)); return i<0?pa:[...pa,i]; }); };
    addEventListener('keydown',f); return ()=>removeEventListener('keydown',f); });
  const shuffleL=()=>{ SFX('whoosh'); update(s=>({cx:{...s.cx,cur:{...s.cx.cur,letters:shuffle(s.cx.cur.letters)}}})); };
  const hintLetter=()=>{ const closed=Object.keys(cells).filter(k=>!isOpen(k)); if(!closed.length) return;
    if(st.coins<15){ SFX('wrong'); W('react','think'); note('Не хватает монет','bad'); return; }
    SFX('pop'); const k=pick(closed); update(s=>({coins:s.coins-15,cx:{...s.cx,cur:{...s.cx.cur,hints:(s.cx.cur.hints||0)+1,open:[...(s.cx.cur.open||[]),k]}}})); W('react','nod'); };
  const hintWord=()=>{ const left=cur.words.filter(x=>!found.includes(x.w)); if(!left.length) return;
    if(st.coins<35){ SFX('wrong'); W('react','think'); note('Не хватает монет','bad'); return; }
    const x=left.sort((a,b)=>a.w.length-b.w.length)[0]; update(s=>({coins:s.coins-35,cx:{...s.cx,cur:{...s.cx.cur,hints:(s.cx.cur.hints||0)+1}}})); submit(x.w); };
  const top=html`<div className="sess-top"><button className="icon-btn" id="cx-close" onClick=${()=>{ SFX('tap'); onExit(); }} aria-label="Закрыть">${I.close()}</button>
    <div className="steps" aria-hidden="true">${(ok?cur.words:[0]).map((x,k)=>html`<i key=${k} className=${ok&&found.includes(x.w)?'good':''}></i>`)}</div><span className="phase">Слова из букв</span></div>`;
  if(!ok) return html`<section>${top}<p className="empty">Собираю кроссворд…</p></section>`;
  if(fin){ const cfgN=cxCfg(cur.lvl+1), cfgO=cxCfg(cur.lvl), hn=cur.hints||0;
    return html`<section>${top}<${GameWin} tone="accent" kicker=${'Слова из букв · уровень '+cur.lvl} title="Кроссворд разгадан!" big=${cur.words.length} bigLabel=${plural(cur.words.length,'слово','слова','слов')} stars=${hn===0?3:hn<=2?2:1} coins=${fin.coins} xp=${fin.coins*2}
      stats=${[[(cur.bonus||[]).length,'бонусных слов'],[hn,plural(hn,'подсказка','подсказки','подсказок')],[(st.cx||{}).solved||0,'кроссвордов всего']]}
      actions=${html`<button className="btn" id="cx-next" onClick=${()=>{ SFX('pop'); setFin(null); update(s=>({cx:{...s.cx,lvl:s.cx.lvl+1,cur:null}})); window.scrollTo({top:0}); }}>Уровень ${cur.lvl+1}</button>`}>
      <div className="gw-words">${cur.words.map(x=>{ const i=wgInfo(x.w); return html`<button key=${x.w} className="gw-w" onClick=${()=>speak(x.w)} aria-label=${'Послушать '+x.w}><b>${x.w}</b><small>${i.ru||''}</small></button>`; })}</div>
      ${(cur.bonus||[]).length?html`<p className="gw-next">Бонусные слова: ${cur.bonus.map(w=>html`<i key=${w}>${w}</i>`)}</p>`:null}
      <p className="gw-next">${cfgN.len>cfgO.len?html`Дальше: <i>${cfgN.len} ${plural(cfgN.len,'буква','буквы','букв')}</i><i>больше слов</i>`:cur.lvl>=CX_MAX?'Максимальная сложность — дальше новые кроссворды.':'Дальше — новый кроссворд.'}</p>
    <//></section>`; }
  const cs=`max(22px, min(40px, calc((min(100vw, 640px) - 48px) / ${cur.cols} - 4px), calc((100svh - ${SZ+290}px) / ${cur.rows} - 4px)))`;
  const grid=[]; for(let r=0;r<cur.rows;r++) for(let c=0;c<cur.cols;c++){ const k=r+','+c, cell=cells[k];
    if(!cell){ grid.push(html`<span key=${k} className="cx-e"></span>`); continue; }
    const o=isOpen(k), fl=flash&&cell.ws.some(wi=>cur.words[wi].w===flash);
    grid.push(html`<span key=${k} className=${'cx-c'+(o?' on':'')+(fl?' fl':'')}>${o?cell.ch.toUpperCase():''}</span>`); }
  const lines=path.map(pos); if(pt&&lines.length) lines.push(pt);
  return html`<section className="cx">${top}
    <p className="cx-sub"><b>Уровень ${cur.lvl}</b> · ${N} ${plural(N,'буква','буквы','букв')} · найдено ${found.length} из ${cur.words.length}${(cur.bonus||[]).length?' · бонус '+cur.bonus.length:''}</p>
    <div className="cx-grid" style=${{gridTemplateColumns:'repeat('+cur.cols+','+cs+')',gridAutoRows:cs}} aria-label="Кроссворд">${grid}</div>
    <div className=${'cx-word'+(msg?' '+msg.k:'')} role="status">${word?word.toUpperCase():msg?msg.t:''}</div>
    <div className="cx-play">
      <button className="cx-tool" id="cx-hint" onClick=${hintLetter} aria-label="Открыть букву за 15 монет"><b>A</b><small>${I.coin()}15</small></button>
      <div className="cx-wheel" ref=${wheel} style=${{width:SZ+'px',height:SZ+'px'}} onPointerDown=${down} onPointerMove=${move} onPointerUp=${up} onPointerCancel=${up}>
        <svg viewBox=${'0 0 '+SZ+' '+SZ} aria-hidden="true">${lines.length>1?html`<polyline points=${lines.map(p=>p.x+','+p.y).join(' ')} className="cx-line"/>`:null}</svg>
        ${cur.letters.map((ch,i)=>{ const p=pos(i); return html`<span key=${i} className=${'cx-l'+(path.includes(i)?' on':'')} style=${{left:p.x+'px',top:p.y+'px'}}>${ch.toUpperCase()}</span>`; })}
        <button className="cx-mix" id="cx-shuffle" style=${{left:SZ/2+'px',top:SZ/2+'px'}} onPointerDown=${e=>e.stopPropagation()} onClick=${shuffleL} aria-label="Перемешать буквы">${I.repeat()}</button>
      </div>
      <button className="cx-tool" id="cx-hintw" onClick=${hintWord} aria-label="Открыть слово за 35 монет"><b>ABC</b><small>${I.coin()}35</small></button>
    </div>
    ${found.length?null:html`<p className="muted cx-tip">Проведи пальцем по буквам, чтобы составить слово. Лишние настоящие слова — бонус.</p>`}
  </section>`;
}

/* ---- «Космический тир»: type the word to shoot the asteroid ---- */
const ruShort=r=>String(r||'').split(/[;,(]/)[0].trim();
const SP_DIFF={
  easy:{name:'Лёгкий',sub:'Медленно, короткие слова, 5 щитов, подсветка букв',shield:5,T:w=>Math.max(9,19-w*.6),n:w=>3+w,minL:()=>3,maxL:w=>Math.min(3+w,8),gap:w=>Math.max(1.4,3.2-w*.12),boss:5,mul:1,lv:0,hint:true},
  normal:{name:'Средний',sub:'Скорость растёт с каждой волной, 3 щита',shield:3,T:w=>Math.max(6.5,15-w*.75),n:w=>4+w,minL:w=>w<3?3:4,maxL:w=>Math.min(4+w,12),gap:w=>Math.max(.9,2.6-w*.15),boss:5,mul:1.5,lv:0,hint:false},
  hard:{name:'Сложный',sub:'Быстро, длинные слова, 2 щита, очки ×2',shield:2,T:w=>Math.max(4.8,11-w*.7),n:w=>5+w,minL:()=>5,maxL:w=>Math.min(6+w,14),gap:w=>Math.max(.7,2-w*.13),boss:4,mul:2,lv:1,hint:false},
  impossible:{name:'IMPOSSIBLE',sub:'Супердлинные слова, бешеная скорость, 1 щит, очки ×4',shield:1,T:w=>Math.max(3.4,7.5-w*.45),n:w=>6+w,minL:()=>9,maxL:()=>20,gap:w=>Math.max(.55,1.4-w*.1),boss:3,mul:4,lv:4,hint:false}};
function spPool(st,d){ const li=Math.min(CEFR.length-1,Math.max(1,CEFR.indexOf(st.level||'A2'))+d.lv), seen=new Set();
  return ALL.filter(w=>w.track!=='idioms'&&w.ru&&CEFR.indexOf(w.cefr)<=li&&/^[a-z]+( [a-z]+){0,2}$/.test(w.en)&&!seen.has(w.en)&&seen.add(w.en)); }
function spWave(pool,wave,d){ const n=d.n(wave), maxL=d.maxL(wave), minL=d.minL(wave);
  let ws=shuffle(pool.filter(w=>!w.en.includes(' ')&&w.en.length>=minL&&w.en.length<=maxL));
  if(ws.length<n) ws=shuffle(pool.filter(w=>!w.en.includes(' ')&&w.en.length>=3));
  ws=ws.slice(0,n);
  if(wave%d.boss===0){ const ph=shuffle(pool.filter(w=>w.en.includes(' '))); if(ph[0]) ws=[...ws.slice(0,n-1),{...ph[0],boss:true}]; }
  return ws; }
function SpaceGame({st,update,onExit,active}){
  const rd=(k,v)=>{ try{ return localStorage.getItem(k)||v; }catch(e){ return v; } };
  const [phase,setPhase]=useState('menu'); const [mode,setMode]=useState(()=>rd('wordy.spmode','en')); const [diff,setDiff]=useState(()=>rd('wordy.spdiff','normal'));
  const [hud,setHud]=useState({score:0,shield:3,wave:1,combo:0}); const [banner,setBanner]=useState(null); const [res,setRes]=useState(null); const [hint,setHint]=useState('');
  const field=useRef(null), layer=useRef(null), laser=useRef(null), E=useRef(null);
  const sp=st.sp||{}, D=SP_DIFF[diff]||SP_DIFF.normal;
  useEffect(()=>{ try{ localStorage.setItem('wordy.spmode',mode); localStorage.setItem('wordy.spdiff',diff); }catch(e){} },[mode,diff]);
  useEffect(()=>{ const t=setTimeout(()=>{ if(phase==='play'||phase==='pause') W('goTo','planet',{frac:.5}); else W('goTo','card',{frac:.88}); },120); return ()=>clearTimeout(t); },[phase]);
  useEffect(()=>()=>{ const e=E.current; if(e){ e.stop=true; cancelAnimationFrame(e.raf); } },[]);
  const start=()=>{ SFX('pop'); setRes(null); setHint(''); setHud({score:0,shield:D.shield,wave:1,combo:0}); if(E.current) E.current.dead=true; setPhase('play'); window.scrollTo({top:0}); W('react','wave'); W('say',mode==='ru'?'Читай перевод — печатай по-английски!':'Печатай слово — я стреляю!',0,true); };
  const key=k=>{ const e=E.current; if(!e||e.stop) return; e.key(k); };
  useEffect(()=>{ if(phase!=='play'||!active) return; const f=e=>{ const t=e.target; if(e.ctrlKey||e.metaKey||e.altKey||(t&&t.closest&&t.closest('input,textarea'))) return;
      const k=e.key==='Escape'?'esc':e.key===' '?' ':(e.key||'').toLowerCase(); if(k==='esc'||k===' '||/^[a-z]$/.test(k)){ e.preventDefault(); key(k); } };
    addEventListener('keydown',f); return ()=>removeEventListener('keydown',f); },[phase,active]);
  useEffect(()=>{ if(phase!=='play') return; const F=field.current, L=layer.current; if(!F||!L) return;
    let e=E.current;
    if(!e||e.dead){ L.innerHTML=''; e=E.current={items:[],queue:[],wave:0,score:0,shield:D.shield,combo:0,bestCombo:0,typedOk:0,typedBad:0,killed:0,missed:[],next:0,gap:0,target:null,stop:false,dead:false,pool:spPool(st,D),between:1.2,mode,D,idle:0,warned:false}; }
    e.stop=false; let last=performance.now();
    const rect=()=>F.getBoundingClientRect();
    const hintNext=()=>{ if(!e.D.hint) return; const t=e.target; setHint(t?t.en[t.typed]||'':''); };
    const label=it=>{ const done=it.en.slice(0,it.typed), rest=it.en.slice(it.typed);
      it.el.innerHTML='<div class="sp-in">'+(it.mode==='ru'?'<b class="sp-ru"></b><span class="sp-mask"><i></i><u></u></span>':'<span class="sp-en"><i></i><u></u></span>')+'</div>';
      if(it.mode==='ru'){ it.el.querySelector('.sp-ru').textContent=ruShort(it.ru); it.el.querySelector('.sp-mask i').textContent=done; it.el.querySelector('.sp-mask u').textContent=(it.typed===0?rest[0]:'')+rest.slice(it.typed===0?1:0).replace(/[a-z]/g,'·'); }
      else { it.el.querySelector('.sp-en i').textContent=done; it.el.querySelector('.sp-en u').textContent=rest; } };
    const nextWave=()=>{ e.wave++; e.queue=spWave(e.pool,e.wave,e.D); e.gap=e.D.gap(e.wave); e.next=.4; setHud(h=>({...h,wave:e.wave}));
      const boss=e.wave%e.D.boss===0; setBanner({t:'Волна '+e.wave,s:boss?'Босс! Длинная фраза':e.wave===1?'Приготовься':'Быстрее, чем прошлая',k:Date.now(),boss}); setTimeout(()=>setBanner(null),1600);
      if(boss){ SFX('boss'); W('react','think'); W('say','Осторожно, босс!',0,true); } else SFX('wave'); };
    const spawn=w=>{ const el=document.createElement('div'); el.className='sp-rock'+(w.boss?' boss':'')+(e.mode==='ru'?' ru':''); L.appendChild(el);
      const it={el,en:w.en,ru:w.ru,boss:!!w.boss,mode:e.mode,typed:0,y:-80,x:0,vx:0,dead:false}; label(it);
      const Wd=F.clientWidth, ww=el.offsetWidth; it.w=ww; it.h=el.offsetHeight; let tries=0;
      do{ it.x=Math.random()*Math.max(1,Wd-ww-16)+8; tries++; } while(tries<8&&e.items.some(o=>o.y<it.h+30&&Math.abs(o.x-it.x)<(o.w+ww)/2+6));
      const H=F.clientHeight, T=(w.boss?1.5:1)*e.D.T(e.wave); it.vy=(H-130)/T; it.vx=((Wd/2-ww/2)-it.x)/T*.12; it.rot=(Math.random()-.5)*18;
      el.style.transform='translate('+it.x+'px,'+it.y+'px)'; e.items.push(it); };
    const shoot=it=>{ const r=rect(), live=window.Wordy&&window.Wordy.where&&document.documentElement.dataset.wordy!=='hidden', p=live?window.Wordy.where():null, on=p&&p.surface==='planet';
      const sx=on?p.x-r.left:F.clientWidth/2, sy=on?p.y-r.top-58*(p.k||1):F.clientHeight-80, tx=it.x+it.w/2, ty=it.y+it.h/2;
      const ln=laser.current; if(ln){ ln.setAttribute('x1',sx); ln.setAttribute('y1',sy); ln.setAttribute('x2',tx); ln.setAttribute('y2',ty); ln.classList.remove('fire'); void ln.getBoundingClientRect(); ln.classList.add('fire'); }
      if(on) W('aim',tx+r.left,ty+r.top,.35); SFX('laser'); };
    const boom=(x,y,txt,cls)=>{ const b=document.createElement('div'); b.className='sp-boom '+(cls||''); b.style.left=x+'px'; b.style.top=y+'px'; L.appendChild(b);
      for(let i=0;i<(cls==='big'?12:7);i++){ const d=document.createElement('i'); d.className='sp-deb'; const a=Math.random()*Math.PI*2, v=30+Math.random()*(cls==='big'?90:55); d.style.left=x+'px'; d.style.top=y+'px'; d.style.setProperty('--dx',Math.cos(a)*v+'px'); d.style.setProperty('--dy',Math.sin(a)*v+'px'); L.appendChild(d); setTimeout(()=>{ try{ d.remove(); }catch(z){} },700); }
      setTimeout(()=>{ try{ b.remove(); }catch(z){} },700);
      if(txt){ const t=document.createElement('div'); t.className='sp-tr'; t.innerHTML='<b></b> <span></span>'; t.querySelector('b').textContent=txt[0]; t.querySelector('span').textContent=txt[1]; t.style.left=Math.min(Math.max(x,80),F.clientWidth-80)+'px'; t.style.top=y+'px'; L.appendChild(t); setTimeout(()=>{ try{ t.remove(); }catch(z){} },1500); } };
    const kill=it=>{ it.dead=true; e.items=e.items.filter(x=>x!==it); if(e.target===it) e.target=null; try{ it.el.remove(); }catch(x){} };
    const end=()=>{ e.stop=true; e.dead=true; cancelAnimationFrame(e.raf); const sc=e.score, coins=Math.min(100,Math.floor(sc/3)), waves=Math.max(0,e.wave-1), acc=e.typedOk+e.typedBad?Math.round(e.typedOk*100/(e.typedOk+e.typedBad)):100, prev=(sp.bestBy||{})[diff]||0;
      update(s=>{ const o=s.sp||{}; return {coins:s.coins+coins,xp:s.xp+sc,...(sc>0?gDay(s):{}),sp:{...o,games:(o.games||0)+1,best:Math.max(o.best||0,sc),bestWave:Math.max(o.bestWave||0,e.wave),bestBy:{...(o.bestBy||{}),[diff]:Math.max((o.bestBy||{})[diff]||0,sc)}}}; });
      setTimeout(()=>{ e.items.forEach(it=>{ try{ it.el.remove(); }catch(x){} }); e.items=[]; setHint(''); setRes({score:sc,coins,wave:e.wave,waves,acc,killed:e.killed,bestCombo:e.bestCombo,missed:e.missed.slice(0,12),record:sc>prev&&sc>0}); setPhase('over');
        W('react',sc>prev&&sc>0?'cheer':'encourage'); W('say',sc>prev&&sc>0?'Новый рекорд!':'Планета держалась как могла. Ещё раз?',0,true); },1000); };
    const setCombo=c=>{ e.combo=c; e.bestCombo=Math.max(e.bestCombo,c); setHud(h=>({...h,combo:c})); };
    e.key=k=>{ e.idle=0; if(k==='esc'){ if(e.target){ e.target.el.classList.remove('lock'); e.target=null; hintNext(); } return; }
      let t=e.target;
      if(!t){ const c=e.items.filter(it=>!it.dead&&it.en[0]===k&&it.y>-50).sort((a,b)=>b.y-a.y); t=c[0];
        if(!t){ e.typedBad++; setCombo(0); F.classList.remove('err'); void F.offsetWidth; F.classList.add('err'); SFX('keyerr'); return; }
        e.target=t; t.el.classList.add('lock'); SFX('lock'); }
      if(t.en[t.typed]===k){ t.typed++; e.typedOk++; shoot(t); label(t); hintNext();
        if(t.typed>=t.en.length){ setCombo(e.combo+1); const pts=Math.round(t.en.replace(/ /g,'').length*(t.boss?3:1)*e.D.mul*(1+Math.floor(e.combo/5)*.25)); e.score+=pts; e.killed++; setHud(h=>({...h,score:e.score}));
          SFX('boom',t.boss); boom(t.x+t.w/2,t.y+t.h/2,[t.en,ruShort(t.ru)],t.boss?'big':''); kill(t); hintNext();
          if(t.boss){ W('react','cheer'); W('say','Босс повержен!',0,true); FX('rain',40); }
          else if(e.combo>0&&e.combo%5===0){ SFX('combo',e.combo/5); W('react','cheer'); W('say',pick(['Серия '+e.combo+'!','Комбо ×'+e.combo+'!','Без промаха — '+e.combo+'!']),0,true); } } }
      else { e.typedBad++; setCombo(0); SFX('keyerr'); const inn=t.el.querySelector('.sp-in'); if(inn){ inn.classList.remove('shk'); void inn.offsetWidth; inn.classList.add('shk'); } if(Math.random()<.3) W('react','think'); } };
    if(!e.wave) nextWave();
    const loop=now=>{ if(e.stop) return; const dt=Math.min(.05,(now-last)/1000); last=now; const H=F.clientHeight, ground=H-100;
      if(e.queue.length){ e.next-=dt; if(e.next<=0){ spawn(e.queue.shift()); e.next=e.gap*(.75+Math.random()*.5); } }
      else if(!e.items.length){ e.between-=dt; if(e.between<=0){ e.between=1.8; const bonus=Math.round(e.wave*2*e.D.mul); e.score+=bonus; setHud(h=>({...h,score:e.score})); W('react','happy'); W('say',pick(['Волна '+e.wave+' отбита!','Чисто! Дальше быстрее.','Планета в безопасности. Пока что!'])); nextWave(); } }
      if(e.items.length){ e.idle+=dt; if(e.idle>6){ e.idle=-8; W('say',pick(['Печатай! Они близко!','Давай-давай, стреляй!','Ну же, я жду команды!']),0,true); W('react','think'); } }
      for(const it of e.items.slice()){ it.y+=it.vy*dt; it.x+=it.vx*dt; it.el.style.transform='translate('+it.x+'px,'+it.y+'px)';
        const near=it.y+it.h>ground-110; if(near!==it.near){ it.near=near; it.el.classList.toggle('near',near); }
        if(it.y+it.h>=ground){ e.missed.push({en:it.en,ru:it.ru}); boom(it.x+it.w/2,ground,null,'hit'); kill(it); e.shield--; setCombo(0); setHud(h=>({...h,shield:e.shield})); hintNext();
          F.classList.remove('hit'); void F.offsetWidth; F.classList.add('hit'); SFX('shield'); W('react','wrong');
          if(e.shield===1) W('say','Последний щит — соберись!',0,true); if(e.shield<=0){ end(); return; } } }
      e.raf=requestAnimationFrame(loop); };
    e.raf=requestAnimationFrame(loop);
    const vis=()=>{ if(document.hidden) setPhase(p=>p==='play'?'pause':p); }; document.addEventListener('visibilitychange',vis);
    return ()=>{ e.stop=true; cancelAnimationFrame(e.raf); document.removeEventListener('visibilitychange',vis); };
  },[phase]);
  useEffect(()=>{ if(!active&&phase==='play') setPhase('pause'); },[active]);
  const top=html`<div className="sess-top"><button className="icon-btn" id="sp-close" onClick=${()=>{ SFX('tap'); if(phase==='menu') onExit(); else { if(E.current){ E.current.stop=true; E.current.dead=true; } setPhase('menu'); } }} aria-label=${phase==='menu'?'Закрыть':'В меню'}>${phase==='menu'?I.close():I.back()}</button><span className="phase" style=${{flex:1}}>Космический тир</span>
    ${phase==='play'||phase==='pause'?html`<button className="icon-btn sp-pbtn" id="sp-pause" aria-label="Пауза" onClick=${()=>{ SFX('tap'); setPhase(p=>p==='play'?'pause':'play'); }}>${phase==='pause'?'▶':'❚❚'}</button>`:null}</div>`;
  if(phase==='menu'){ const bb=sp.bestBy||{};
    return html`<section>${top}
    <div className="sp-menu" data-perch="card"><div className="sp-menu-sky" aria-hidden="true"><span className="sp-m-rock a">orbit</span><span className="sp-m-rock b">star</span><span className="sp-m-planet"></span></div>
      <h2>Защити планету Wordy</h2><p>На планету летят астероиды со словами. Печатай слово — Wordy стреляет. Каждая волна быстрее, а в конце серии — босс с целой фразой.</p>
      <h3 className="sp-h">Режим</h3>
      <div className="sp-modes" role="radiogroup" aria-label="Режим">
        <button role="radio" aria-checked=${mode==='en'} id="sp-mode-en" className=${'sp-mode'+(mode==='en'?' on':'')} onClick=${()=>{ SFX('tap'); setMode('en'); }}><b>Вижу слово</b><small>Печатай слово с астероида</small></button>
        <button role="radio" aria-checked=${mode==='ru'} id="sp-mode-ru" className=${'sp-mode'+(mode==='ru'?' on':'')} onClick=${()=>{ SFX('tap'); setMode('ru'); }}><b>Перевожу</b><small>На астероиде перевод — вспомни слово</small></button></div>
      <h3 className="sp-h">Сложность</h3>
      <div className="sp-diff" role="radiogroup" aria-label="Сложность">${Object.entries(SP_DIFF).map(([k,d])=>html`<button key=${k} role="radio" aria-checked=${diff===k} id=${'sp-diff-'+k} className=${'sp-dbtn d-'+k+(diff===k?' on':'')} onClick=${()=>{ SFX('tap'); setDiff(k); }}><b>${d.name}</b><small>${d.sub}</small>${bb[k]?html`<em>★ ${bb[k]}</em>`:null}</button>`)}</div>
      <div className="sp-best"><span><b>${sp.best||0}</b><small>рекорд</small></span><span><b>${sp.bestWave||0}</b><small>лучшая волна</small></span><span><b>${sp.games||0}</b><small>${plural(sp.games||0,'игра','игры','игр')}</small></span></div>
      <button className="btn sp-start" id="sp-start" onClick=${start}>Старт</button></div></section>`; }
  if(phase==='over'&&res) return html`<section>${top}<${GameWin} tone="space" kicker=${'Космический тир · '+D.name.toLowerCase()+' · '+(mode==='ru'?'перевод':'слова')} title=${res.record?'Планета спасена!':res.waves>=5?'Мощная оборона!':res.waves>=2?'Хорошая оборона!':'Попробуй ещё раз'} big=${res.score} bigLabel="очков" stars=${res.wave>10?3:res.wave>5?2:res.wave>2?1:0} coins=${res.coins} xp=${res.score} record=${res.record}
      stats=${[[res.waves,plural(res.waves,'волна отбита','волны отбито','волн отбито')],[res.killed,'астероидов сбито'],[res.acc+'%','точность']]}
      actions=${html`<button className="btn ghost" id="sp-menu" onClick=${()=>{ SFX('tap'); setPhase('menu'); }}>Меню</button><button className="btn" id="sp-again" onClick=${start}>Ещё раз</button>`}>
      ${res.bestCombo>=3?html`<p className="gw-next">Лучшая серия без промаха: <i>${res.bestCombo}</i></p>`:null}
      ${res.missed.length?html`<div className="gw-log"><b>Долетели до планеты — повтори</b>${res.missed.map((m,i)=>html`<p key=${i}><b>${m.en}</b><span>— ${m.ru}</span></p>`)}</div>`:null}
    <//></section>`;
  const KB=['qwertyuiop','asdfghjkl','zxcvbnm'];
  const space=html`<div className="sp-kb-sp"><button className=${'wg-k sp-k-space'+(hint===' '?' hint':'')} id="sp-space" onPointerDown=${ev=>{ ev.preventDefault(); key(' '); }}>пробел</button></div>`;
  return html`<section className="sp">${top}
    <div className="sp-field" ref=${field}>
      <div className="sp-stars a" aria-hidden="true"></div><div className="sp-stars b" aria-hidden="true"></div>
      <div className="sp-hud" aria-live="off"><span className="sp-chip">Волна <b>${hud.wave}</b></span>
        ${hud.combo>=2?html`<span className="sp-combo" key=${'c'+hud.combo}>×${hud.combo}</span>`:html`<span></span>`}
        <span className="sp-right"><span className="sp-shield" aria-label=${'Щит: '+hud.shield}>${[...Array(D.shield)].map((_,i)=>html`<i key=${i} className=${i<hud.shield?'on':'off'}></i>`)}</span><b className="sp-score">${hud.score}</b></span></div>
      <svg className="sp-laser" aria-hidden="true"><line ref=${laser} x1="0" y1="0" x2="0" y2="0"/></svg>
      <div className="sp-layer" ref=${layer}></div>
      ${banner?html`<div key=${banner.k} className=${'sp-banner'+(banner.boss?' boss':'')}><b>${banner.t}</b><small>${banner.s}</small></div>`:null}
      <div className="sp-danger" aria-hidden="true"></div>
      <div className="sp-planet" aria-hidden="true"></div><div className="sp-pad" data-perch="planet"></div>
      ${phase==='pause'?html`<div className="cw-over enter"><b>Пауза</b><button className="btn" id="sp-resume" onClick=${()=>{ SFX('pop'); setPhase('play'); }}>Продолжить</button></div>`:null}
    </div>
    <div className="wg-kb sp-kb" aria-label="Клавиатура">${KB.map((row,ri)=>html`<div key=${ri}>${[...row].map(k=>html`<button key=${k} className=${'wg-k'+(hint===k?' hint':'')} onPointerDown=${ev=>{ ev.preventDefault(); key(k); }}>${k}</button>`)}${ri===2?html`<button className="wg-k wide sp-k-esc" id="sp-esc" aria-label="Сменить цель" onPointerDown=${ev=>{ ev.preventDefault(); key('esc'); }}>цель</button>`:null}</div>`)}${space}</div>
  </section>`;
}

/* ---- «Побег из комнаты»: real rooms, find clues yourself ---- */
/* ---- escape room: scene art (SVG, 360×420; floor starts at y=280) ---- */
const EA={
 door:({x,y=96,w=72,h=184,c='#8A5A36',sign,dark})=>html`<g><rect x=${x-5} y=${y-5} width=${w+10} height=${h+5} rx="3" fill="#5E3A22"/><rect x=${x} y=${y} width=${w} height=${h} rx="2" fill=${c}/>
   <rect x=${x+9} y=${y+12} width=${w-18} height=${h*.36} rx="3" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="3"/><rect x=${x+9} y=${y+h*.5} width=${w-18} height=${h*.42} rx="3" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="3"/>
   <circle cx=${x+w-12} cy=${y+h*.52} r="5" fill="#E8C35A" stroke="#9C7A22"/>${sign?html`<rect x=${x+w/2-20} y=${y+h*.3} width="40" height="16" rx="3" fill=${dark?'#1E1E1E':'#F5EEDC'}/><text x=${x+w/2} y=${y+h*.3+12} text-anchor="middle" font-size="10" font-weight="800" fill=${dark?'#7CFF9A':'#3A2A1A'}>${sign}</text>`:null}</g>`,
 win:({x,y=60,w=96,h=90,sky='#BFE3FF',rain,night,cur='#E9A27E'})=>html`<g><rect x=${x-6} y=${y-6} width=${w+12} height=${h+14} rx="4" fill="#F4F1EA"/><rect x=${x} y=${y} width=${w} height=${h} fill=${night?'#1C2741':sky}/>
   ${night?html`<circle cx=${x+w*.7} cy=${y+h*.3} r="9" fill="#F4EBD0"/>`:html`<ellipse cx=${x+w*.3} cy=${y+h*.35} rx="16" ry="7" fill="#fff" opacity=".8"/>`}
   ${rain?[0,1,2,3,4,5].map(i=>html`<line key=${i} x1=${x+10+i*15} y1=${y+10+(i%2)*20} x2=${x+6+i*15} y2=${y+26+(i%2)*20} stroke="#7FA9D6" stroke-width="2"/>`):null}
   <rect x=${x+w/2-2} y=${y} width="4" height=${h} fill="#F4F1EA"/><rect x=${x} y=${y+h/2-2} width=${w} height="4" fill="#F4F1EA"/><rect x=${x-10} y=${y+h+4} width=${w+20} height="6" rx="2" fill="#E2DACB"/>
   <path d=${`M${x-14} ${y-10} h22 q-6 ${h*.6} 4 ${h+10} h-26z`} fill=${cur}/><path d=${`M${x+w+14} ${y-10} h-22 q6 ${h*.6} -4 ${h+10} h26z`} fill=${cur}/></g>`,
 bed:({x,y=236,w=140,c='#6FA8DC'})=>html`<g><rect x=${x} y=${y-50} width="16" height="96" rx="4" fill="#8A5A36"/><rect x=${x+8} y=${y} width=${w} height="34" rx="6" fill="#F4F1EA"/><rect x=${x+30} y=${y-6} width=${w-22} height="40" rx="8" fill=${c}/>
   <rect x=${x+w-6} y=${y-14} width="12" height="62" rx="4" fill="#8A5A36"/><rect x=${x+8} y=${y+34} width=${w} height="10" fill="#7A4C2C"/></g>`,
 pillow:({x,y=226})=>html`<ellipse cx=${x} cy=${y} rx="20" ry="10" fill="#FFFFFF" stroke="#DDD4C4"/>`,
 desk:({x,y=232,w=120,c='#B07A4F',drawer=true})=>html`<g><rect x=${x} y=${y} width=${w} height="10" rx="2" fill=${c}/><rect x=${x+6} y=${y+10} width="8" height=${290-y+18} fill="#7A4C2C"/><rect x=${x+w-14} y=${y+10} width="8" height=${290-y+18} fill="#7A4C2C"/>
   ${drawer?html`<rect x=${x+w*.45} y=${y+10} width=${w*.5} height="22" rx="2" fill="#9A6740"/><rect x=${x+w*.7-8} y=${y+19} width="16" height="4" rx="2" fill="#E8C35A"/>`:null}</g>`,
 clock:({x,y,r=22,h=2,m=0})=>{ const ha=(h%12+m/60)*30*Math.PI/180, ma=m*6*Math.PI/180; return html`<g><circle cx=${x} cy=${y} r=${r} fill="#FFFDF7" stroke="#6B4A2E" stroke-width="4"/>${[...Array(12)].map((_,i)=>{ const a=i*30*Math.PI/180; return html`<circle key=${i} cx=${x+Math.sin(a)*(r-6)} cy=${y-Math.cos(a)*(r-6)} r="1.4" fill="#6B4A2E"/>`; })}
   <line x1=${x} y1=${y} x2=${x+Math.sin(ha)*(r*.5)} y2=${y-Math.cos(ha)*(r*.5)} stroke="#2B1B12" stroke-width="3" stroke-linecap="round"/><line x1=${x} y1=${y} x2=${x+Math.sin(ma)*(r*.75)} y2=${y-Math.cos(ma)*(r*.75)} stroke="#2B1B12" stroke-width="2" stroke-linecap="round"/></g>`; },
 box:({x,y=300,w=46,h=34})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} fill="#C99A5E"/><rect x=${x-3} y=${y-6} width=${w+6} height="9" fill="#B5864D"/><rect x=${x+w/2-4} y=${y-6} width="8" height=${h+6} fill="#E6D2A8"/><rect x=${x+w/2-7} y=${y+10} width="14" height="12" rx="2" fill="#7A7F87"/></g>`,
 lamp:({x,y=150})=>html`<g><path d=${`M${x-20} ${y} h40 l-10 -30 h-20z`} fill="#F2C76A"/><rect x=${x-2} y=${y} width="4" height=${300-y} fill="#5A4636"/><ellipse cx=${x} cy="302" rx="16" ry="4" fill="#5A4636"/></g>`,
 plant:({x,y=270,s=1})=>html`<g transform=${`translate(${x} ${y}) scale(${s})`}><path d="M-14 0 h28 l-4 26 h-20z" fill="#C46A3C"/><path d="M0 0 C-22 -18 -18 -44 -4 -50 C-6 -30 0 -18 0 0Z M0 0 C22 -16 22 -40 8 -48 C8 -28 4 -16 0 0Z M0 0 C-4 -26 4 -56 14 -62 C10 -40 6 -22 0 0Z" fill="#4E9A55"/></g>`,
 rug:({x,y=356,w=150,c='#D9534F'})=>html`<g><ellipse cx=${x} cy=${y} rx=${w/2} ry="20" fill=${c}/><ellipse cx=${x} cy=${y} rx=${w/2-12} ry="13" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="3" stroke-dasharray="6 5"/></g>`,
 shelf:({x,y=120,w=110,h=150,books})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} fill="#7A4C2C"/><rect x=${x+5} y=${y+5} width=${w-10} height=${h-10} fill="#5A361E"/>
   ${[1,2].map(k=>html`<rect key=${k} x=${x+5} y=${y+k*(h/3)} width=${w-10} height="5" fill="#7A4C2C"/>`)}
   ${(books||[]).map((b,i)=>{ const row=b.row||0, bx=x+10+(b.i!=null?b.i:i)*((w-20)/(b.of||6)), by=y+5+row*(h/3), bh=h/3-12, bw=(w-24)/(b.of||6)-2; return html`<g key=${i}><rect x=${bx} y=${by+(b.short?8:2)} width=${bw} height=${bh-(b.short?6:0)} rx="1.5" fill=${b.c}/>${b.n!=null?html`<text x=${bx+bw/2} y=${by+bh*.62} text-anchor="middle" font-size="9" font-weight="800" fill="#fff">${b.n}</text>`:null}</g>`; })}</g>`,
 frame:({x,y,w=80,h=60,kind='hills',text})=>html`<g><rect x=${x-5} y=${y-5} width=${w+10} height=${h+10} fill="#B8862E"/><rect x=${x} y=${y} width=${w} height=${h} fill=${kind==='ship'?'#9FC9E8':kind==='map'?'#EBDDB8':kind==='poster'?'#FFF6E5':'#BFE3C8'}/>
   ${kind==='hills'?html`<path d=${`M${x} ${y+h} L${x+w*.3} ${y+h*.45} L${x+w*.55} ${y+h*.75} L${x+w*.8} ${y+h*.35} L${x+w} ${y+h*.7} V${y+h}Z`} fill="#5E9C62"/><circle cx=${x+w*.8} cy=${y+h*.2} r="6" fill="#FFD36B"/>`:null}
   ${kind==='ship'?html`<path d=${`M${x} ${y+h*.7} h${w} v${h*.3} h-${w}z`} fill="#3E7CB1"/><path d=${`M${x+w*.3} ${y+h*.7} h${w*.4} l-6 10 h-${w*.4-12}z`} fill="#7A4C2C"/><path d=${`M${x+w*.5} ${y+h*.15} v${h*.55} h${w*.18}z`} fill="#fff"/>`:null}
   ${kind==='map'?html`<path d=${`M${x+8} ${y+h*.6} q10 -20 24 -8 q12 10 22 -6 q8 -10 18 2`} fill="none" stroke="#9C7A3C" stroke-width="2" stroke-dasharray="3 3"/><circle cx=${x+w-14} cy=${y+h*.5} r="3" fill="#C0392B"/>`:null}
   ${text?String(text).split('|').map((t,i)=>html`<text key=${i} x=${x+w/2} y=${y+16+i*13} text-anchor="middle" font-size=${i?9:11} font-weight=${i?600:800} fill="#2B1B12">${t}</text>`):null}</g>`,
 fridge:({x,y=110,w=66,h=190})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="8" fill="#EEF2F5" stroke="#C8D1D9" stroke-width="2"/><line x1=${x} y1=${y+h*.36} x2=${x+w} y2=${y+h*.36} stroke="#C8D1D9" stroke-width="2"/><rect x=${x+w-12} y=${y+14} width="5" height="34" rx="2" fill="#A7B1BA"/><rect x=${x+w-12} y=${y+h*.42} width="5" height="44" rx="2" fill="#A7B1BA"/>
   <rect x=${x+12} y=${y+20} width="24" height="20" fill="#FFF8C5" transform=${`rotate(-6 ${x+24} ${y+30})`}/><circle cx=${x+24} cy=${y+20} r="4" fill="#E74C3C"/></g>`,
 counter:({x,y=226,w=150,top='#D9D2C5',drawers=2})=>html`<g><rect x=${x} y=${y} width=${w} height="10" fill=${top}/><rect x=${x+4} y=${y+10} width=${w-8} height=${300-y-6} fill="#C58B5A"/>
   ${[...Array(drawers)].map((_,i)=>html`<g key=${i}><rect x=${x+10+i*((w-20)/drawers)} y=${y+18} width=${(w-20)/drawers-8} height="26" rx="2" fill="#B07A4F"/><rect x=${x+10+i*((w-20)/drawers)+((w-20)/drawers-8)/2-8} y=${y+29} width="16" height="4" rx="2" fill="#E8C35A"/></g>`)}</g>`,
 wallcab:({x,y=70,w=110,h=70})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="3" fill="#C58B5A"/><line x1=${x+w/2} y1=${y+4} x2=${x+w/2} y2=${y+h-4} stroke="#8A5A36" stroke-width="2"/><rect x=${x+w/2-10} y=${y+h/2-6} width="5" height="14" rx="2" fill="#E8C35A"/><rect x=${x+w/2+5} y=${y+h/2-6} width="5" height="14" rx="2" fill="#E8C35A"/><rect x=${x+w/2-6} y=${y+h-18} width="12" height="10" rx="2" fill="#7A7F87"/></g>`,
 stove:({x,y=226,w=70})=>html`<g><rect x=${x} y=${y} width=${w} height=${300-y+4} fill="#E4E7EA" stroke="#B9C0C7" stroke-width="2"/><rect x=${x+8} y=${y+20} width=${w-16} height="36" rx="3" fill="#2E3238"/><circle cx=${x+18} cy=${y-2} r="8" fill="#3A3E44"/><circle cx=${x+w-18} cy=${y-2} r="8" fill="#3A3E44"/>${[0,1,2].map(i=>html`<circle key=${i} cx=${x+16+i*19} cy=${y+11} r="3" fill="#6A6F75"/>`)}</g>`,
 cake:({x,y=214})=>html`<g><rect x=${x-22} y=${y-4} width="44" height="22" rx="4" fill="#6B3E26"/><path d=${`M${x-22} ${y} q11 -8 22 0 q11 8 22 0 v-6 h-44z`} fill="#F7E1D7"/><rect x=${x-1.5} y=${y-18} width="3" height="10" fill="#F2C76A"/><circle cx=${x} cy=${y-21} r="3" fill="#FF9A3C"/><ellipse cx=${x} cy=${y+18} rx="28" ry="4" fill="#E8E2D6"/></g>`,
 pantry:({x,y=110,w=62,h=170})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} fill="#1E1A17"/><rect x=${x} y=${y} width=${w*.35} height=${h} fill="#8A5A36" transform=${`skewY(-12) translate(0 ${x*.21})`}/><rect x=${x-4} y=${y-4} width=${w+8} height="6" fill="#5E3A22"/></g>`,
 table:({x,y=250,w=110,c='#B07A4F',cloth})=>html`<g><rect x=${x} y=${y} width=${w} height="9" rx="2" fill=${cloth||c}/><rect x=${x+10} y=${y+9} width="7" height=${300-y+6} fill="#7A4C2C"/><rect x=${x+w-17} y=${y+9} width="7" height=${300-y+6} fill="#7A4C2C"/>${cloth?html`<path d=${`M${x} ${y+9} h${w} l-6 18 h-${w-12}z`} fill=${cloth} opacity=".85"/>`:null}</g>`,
 paper:({x,y,r=0,w=26,h=18,c='#FFFDF4'})=>html`<g transform=${`rotate(${r} ${x+w/2} ${y+h/2})`}><rect x=${x} y=${y} width=${w} height=${h} fill=${c} stroke="#D8CDB5"/><line x1=${x+4} y1=${y+6} x2=${x+w-4} y2=${y+6} stroke="#B7AA90"/><line x1=${x+4} y1=${y+11} x2=${x+w-6} y2=${y+11} stroke="#B7AA90"/></g>`,
 safe:({x,y=286,w=64,h=60})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="4" fill="#5B6270"/><rect x=${x+6} y=${y+6} width=${w-12} height=${h-12} rx="3" fill="#6E7685" stroke="#4A505B"/><circle cx=${x+w/2} cy=${y+h/2} r="11" fill="#C9CED6" stroke="#4A505B" stroke-width="2"/><line x1=${x+w/2} y1=${y+h/2} x2=${x+w/2} y2=${y+h/2-8} stroke="#4A505B" stroke-width="2"/></g>`,
 globe:({x,y=230})=>html`<g><circle cx=${x} cy=${y} r="18" fill="#5DADE2"/><path d=${`M${x-12} ${y-6} q6 -6 12 0 q4 6 -2 10 q-8 2 -10 -10z M${x+4} ${y+4} q8 -2 10 6 q-6 6 -10 -6z`} fill="#58B368"/><path d=${`M${x-22} ${y} a22 22 0 0 0 44 0`} fill="none" stroke="#B8862E" stroke-width="3"/><rect x=${x-2} y=${y+20} width="4" height="10" fill="#B8862E"/><rect x=${x-12} y=${y+29} width="24" height="4" rx="2" fill="#B8862E"/></g>`,
 candle:({x,y=224})=>html`<g><rect x=${x-5} y=${y} width="10" height="18" fill="#FFF8E5"/><path d=${`M${x} ${y-12} q5 6 0 10 q-5 -4 0 -10z`} fill="#FFB347"/><ellipse cx=${x} cy=${y+18} rx="10" ry="3" fill="#C9A66B"/></g>`,
 board:({x,y=70,w=130,h=90})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="3" fill="#C9965F" stroke="#8A5A36" stroke-width="4"/>${[[10,10,-4],[50,14,3],[90,8,-2]].map(([dx,dy,r],i)=>html`<g key=${i}><rect x=${x+dx} y=${y+dy} width="32" height="40" fill="#FFFDF4" transform=${`rotate(${r} ${x+dx+16} ${y+dy+20})`}/><circle cx=${x+dx+16} cy=${y+dy+2} r="3" fill="#E74C3C"/><circle cx=${x+dx+16} cy=${y+dy+20} r="7" fill="#C9C1B0"/></g>`)}<path d=${`M${x+26} ${y+30} L${x+66} ${y+34} L${x+106} ${y+28}`} stroke="#C0392B" stroke-width="1.5" fill="none"/></g>`,
 filecab:({x,y=210,w=60,h=90})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="2" fill="#7D8794"/>${[0,1,2].map(i=>html`<g key=${i}><rect x=${x+5} y=${y+6+i*28} width=${w-10} height="24" rx="2" fill="#929CA8"/><rect x=${x+w/2-9} y=${y+15+i*28} width="18" height="5" rx="2" fill="#4A505B"/></g>`)}<rect x=${x+w/2-5} y=${y+2} width="10" height="3" fill="#E8C35A"/></g>`,
 phone:({x,y=220})=>html`<g><rect x=${x-16} y=${y} width="32" height="14" rx="4" fill="#2E3238"/><path d=${`M${x-18} ${y-4} q18 -10 36 0 v5 h-36z`} fill="#3A3E44"/><circle cx=${x+10} cy=${y+7} r="2.5" fill="#E74C3C"/></g>`,
 blackboard:({x,y=60,w=200,h=110,lines})=>html`<g><rect x=${x-6} y=${y-6} width=${w+12} height=${h+12} rx="3" fill="#8A5A36"/><rect x=${x} y=${y} width=${w} height=${h} fill="#2F4F3E"/>${(lines||[]).map((t,i)=>html`<text key=${i} x=${x+12} y=${y+22+i*18} font-size="12" fill="#EDEDE4" font-family="Comic Sans MS, cursive">${t}</text>`)}<rect x=${x+w-40} y=${y+h+2} width="30" height="6" fill="#F4F1EA"/></g>`,
 sdesk:({x,y=300,c='#C58B5A'})=>html`<g><rect x=${x} y=${y} width="60" height="8" rx="2" fill=${c}/><rect x=${x+6} y=${y+8} width="5" height="30" fill="#6B4A2E"/><rect x=${x+49} y=${y+8} width="5" height="30" fill="#6B4A2E"/><rect x=${x+16} y=${y+14} width="28" height="14" fill="#9A6740"/></g>`,
 bin:({x,y=316})=>html`<g><path d=${`M${x-14} ${y} h28 l-3 32 h-22z`} fill="#6C7A89"/><circle cx=${x-4} cy=${y-2} r="7" fill="#FFFDF4" stroke="#D8CDB5"/><circle cx=${x+6} cy=${y-4} r="5" fill="#FFFDF4" stroke="#D8CDB5"/></g>`,
 wardrobe:({x,y=100,w=96,h=196,c='#9A6740'})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="3" fill=${c}/><line x1=${x+w/2} y1=${y+6} x2=${x+w/2} y2=${y+h-6} stroke="#6B4A2E" stroke-width="2"/><circle cx=${x+w/2-7} cy=${y+h/2} r="3" fill="#E8C35A"/><circle cx=${x+w/2+7} cy=${y+h/2} r="3" fill="#E8C35A"/><rect x=${x-4} y=${y-6} width=${w+8} height="8" fill="#7A4C2C"/></g>`,
 tv:({x,y=196,w=86,h=54})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="4" fill="#1F2328"/><rect x=${x+4} y=${y+4} width=${w-8} height=${h-8} fill="#2E4A6B"/><path d=${`M${x+10} ${y+h-12} l14 -14 l10 8 l16 -18 l20 24`} stroke="#7FB3E6" stroke-width="2" fill="none"/><rect x=${x+w/2-4} y=${y+h} width="8" height="8" fill="#1F2328"/></g>`,
 tvstand:({x,y=258,w=120})=>html`<g><rect x=${x} y=${y} width=${w} height="42" rx="3" fill="#7A4C2C"/><rect x=${x+6} y=${y+8} width=${w/2-10} height="26" rx="2" fill="#9A6740"/><rect x=${x+w/2+4} y=${y+8} width=${w/2-10} height="26" rx="2" fill="#9A6740"/></g>`,
 suitcase:({x,y=310,w=62,h=44,c='#2F7FC1'})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="6" fill=${c}/><rect x=${x+w/2-12} y=${y-8} width="24" height="10" rx="4" fill="none" stroke="#1F2328" stroke-width="3"/><rect x=${x+8} y=${y} width="5" height=${h} fill="rgba(0,0,0,.18)"/><rect x=${x+w-13} y=${y} width="5" height=${h} fill="rgba(0,0,0,.18)"/><rect x=${x+w/2-8} y=${y+h/2-5} width="16" height="10" rx="2" fill="#C9CED6"/></g>`,
 menuboard:({x,y=60,w=150,h=110,lines})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="4" fill="#24332B" stroke="#6B4A2E" stroke-width="5"/><text x=${x+w/2} y=${y+20} text-anchor="middle" font-size="12" font-weight="800" fill="#F2C76A">MENU</text>${(lines||[]).map((t,i)=>html`<text key=${i} x=${x+12} y=${y+40+i*16} font-size="11" fill="#EDEDE4">${t}</text>`)}</g>`,
 register:({x,y=210})=>html`<g><path d=${`M${x} ${y+30} h60 l-6 -30 h-48z`} fill="#3D4652"/><rect x=${x+10} y=${y-14} width="40" height="16" rx="2" fill="#2A2F36"/><text x=${x+30} y=${y-2} text-anchor="middle" font-size="10" fill="#7CFF9A">0.00</text>${[0,1,2].map(i=>html`<rect key=${i} x=${x+12+i*12} y=${y+8} width="9" height="6" rx="1" fill="#C9CED6"/>`)}</g>`,
 coffee:({x,y=196})=>html`<g><rect x=${x} y=${y} width="48" height="44" rx="4" fill="#B9C0C7"/><rect x=${x+6} y=${y+6} width="36" height="12" rx="2" fill="#2E3238"/><rect x=${x+14} y=${y+28} width="20" height="12" rx="2" fill="#FFFDF7"/><rect x=${x+20} y=${y+18} width="8" height="8" fill="#6A6F75"/></g>`,
 jar:({x,y=214})=>html`<g><rect x=${x-12} y=${y} width="24" height="26" rx="5" fill="rgba(200,230,255,.5)" stroke="#9FB7CC"/><rect x=${x-12} y=${y-4} width="24" height="6" rx="2" fill="#B9C0C7"/><circle cx=${x-3} cy=${y+18} r="4" fill="#E8C35A"/><circle cx=${x+4} cy=${y+14} r="4" fill="#E8C35A"/><text x=${x} y=${y+10} text-anchor="middle" font-size="6" font-weight="800" fill="#2B1B12">TIPS</text></g>`,
 seat:({x,y=240,w=150,c='#7A2E3A'})=>html`<g><rect x=${x} y=${y} width=${w} height="40" rx="8" fill=${c}/><rect x=${x} y=${y-70} width=${w} height="74" rx="10" fill=${c} opacity=".92"/><rect x=${x+8} y=${y-62} width=${w-16} height="18" rx="5" fill="#F4F1EA" opacity=".85"/><rect x=${x+6} y=${y+40} width=${w-12} height="16" fill="#4A1C24"/></g>`,
 timetable:({x,y=64,w=120,h=90,rows})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="3" fill="#1D2B4A"/><text x=${x+w/2} y=${y+16} text-anchor="middle" font-size="10" font-weight="800" fill="#FFD36B">DEPARTURES</text>${(rows||[]).map((r,i)=>html`<text key=${i} x=${x+8} y=${y+34+i*14} font-size="9.5" fill="#EAF2FF">${r}</text>`)}</g>`,
 showcase:({x,y=226,w=90,h=74,obj='cup'})=>html`<g><rect x=${x} y=${y+h-14} width=${w} height=${300-y-h+30} fill="#7A4C2C"/><rect x=${x} y=${y} width=${w} height=${h-14} fill="rgba(190,225,255,.35)" stroke="#9FB7CC" stroke-width="2"/>
   ${obj==='cup'?html`<path d=${`M${x+w/2-12} ${y+18} h24 q0 18 -12 22 q-12 -4 -12 -22z`} fill="#E8C35A"/><rect x=${x+w/2-3} y=${y+40} width="6" height="8" fill="#E8C35A"/>`:obj==='vase'?html`<path d=${`M${x+w/2-8} ${y+14} h16 q10 14 0 34 h-16 q-10 -20 0 -34z`} fill="#C46A3C"/>`:html`<circle cx=${x+w/2} cy=${y+30} r="12" fill="#B8862E"/>`}<rect x=${x+w/2-6} y=${y+h-10} width="12" height="8" rx="2" fill="#7A7F87"/></g>`,
 plaque:({x,y,w=56,text})=>html`<g><rect x=${x} y=${y} width=${w} height="22" rx="2" fill="#E8D9A8" stroke="#B8862E"/>${String(text||'').split('|').map((t,i)=>html`<text key=${i} x=${x+w/2} y=${y+9+i*9} text-anchor="middle" font-size="7.5" font-weight="700" fill="#3A2A1A">${t}</text>`)}</g>`,
 bottles:({x,y=180,list})=>html`<g><rect x=${x-6} y=${y+30} width=${list.length*16+12} height="5" fill="#9AA5B1"/>${list.map((c,i)=>html`<g key=${i}><rect x=${x+i*16} y=${y+8} width="11" height="22" rx="3" fill=${c}/><rect x=${x+i*16+3} y=${y} width="5" height="9" fill=${c} opacity=".8"/></g>`)}</g>`,
 thermo:({x,y=110,t=18})=>html`<g><rect x=${x-6} y=${y} width="12" height="70" rx="6" fill="#FFFDF7" stroke="#9AA5B1"/><rect x=${x-2} y=${y+60-t*1.6} width="4" height=${10+t*1.6} fill="#E74C3C"/><circle cx=${x} cy=${y+70} r="8" fill="#E74C3C"/><text x=${x+12} y=${y+30} font-size="10" font-weight="800" fill="#2B1B12">${t}°C</text></g>`,
 lights:({x,y=70,on='green'})=>html`<g><rect x=${x} y=${y} width="70" height="30" rx="6" fill="#2E3238"/><circle cx=${x+20} cy=${y+15} r="8" fill=${on==='red'?'#FF4B4B':'#5A2020'}/><circle cx=${x+50} cy=${y+15} r="8" fill=${on==='green'?'#4BFF7A':'#1F4A2A'}/></g>`,
 computer:({x,y=200})=>html`<g><rect x=${x} y=${y} width="64" height="44" rx="4" fill="#2E3238"/><rect x=${x+4} y=${y+4} width="56" height="34" fill="#13314A"/><text x=${x+32} y=${y+25} text-anchor="middle" font-size="7" fill="#7CF3FF">PASSWORD:</text><rect x=${x+26} y=${y+44} width="12" height="8" fill="#2E3238"/><rect x=${x+16} y=${y+52} width="32" height="4" fill="#2E3238"/></g>`,
 locker:({x,y=150,w=56,h=150})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="3" fill="#6E8B74"/>${[0,1,2,3].map(i=>html`<rect key=${i} x=${x+10} y=${y+12+i*6} width=${w-20} height="2" fill="#4E6B55"/>`)}<rect x=${x+w-16} y=${y+h/2-8} width="10" height="16" rx="2" fill="#C9CED6"/></g>`,
 sofa:({x,y=246,w=150,c='#7E6BB0'})=>html`<g><rect x=${x} y=${y-30} width=${w} height="44" rx="12" fill=${c}/><rect x=${x-10} y=${y-8} width="26" height="46" rx="10" fill=${c}/><rect x=${x+w-16} y=${y-8} width="26" height="46" rx="10" fill=${c}/><rect x=${x+10} y=${y+6} width=${w-20} height="26" rx="8" fill=${c} opacity=".85"/><rect x=${x} y=${y+38} width="6" height="10" fill="#4A3B30"/><rect x=${x+w-6} y=${y+38} width="6" height="10" fill="#4A3B30"/></g>`,
 vase:({x,y=212})=>html`<g><path d=${`M${x-8} ${y} h16 q10 14 0 30 h-16 q-10 -16 0 -30z`} fill="#3E7CB1"/><path d=${`M${x} ${y} q-10 -18 -4 -28 M${x} ${y} q8 -20 14 -24 M${x} ${y} q2 -16 0 -30`} stroke="#4E9A55" stroke-width="2" fill="none"/><circle cx=${x-4} cy=${y-28} r="5" fill="#F06292"/><circle cx=${x+14} cy=${y-24} r="5" fill="#FFD36B"/><circle cx=${x} cy=${y-32} r="5" fill="#BA68C8"/></g>`,
};
EA.hatch=({x,y=336,w=90})=>html`<g><path d=${`M${x} ${y} h${w} l10 26 h-${w+20}z`} fill="#7A4C2C" stroke="#5E3A22" stroke-width="2"/><line x1=${x+w/2} y1=${y} x2=${x+w/2} y2=${y+26} stroke="#5E3A22" stroke-width="2"/><rect x=${x+w/2-10} y=${y+10} width="20" height="5" rx="2" fill="#2E3238"/></g>`;
EA.stool=({x,y=330})=>html`<g><ellipse cx=${x} cy=${y} rx="22" ry="7" fill="#8A5A36"/><rect x=${x-16} y=${y} width="4" height="34" fill="#5E3A22"/><rect x=${x+12} y=${y} width="4" height="34" fill="#5E3A22"/></g>`;
EA.teddy=({x,y=214})=>html`<g><circle cx=${x} cy=${y} r="11" fill="#B07A4F"/><circle cx=${x-8} cy=${y-9} r="5" fill="#B07A4F"/><circle cx=${x+8} cy=${y-9} r="5" fill="#B07A4F"/><circle cx=${x-3.5} cy=${y-1} r="1.6" fill="#2B1B12"/><circle cx=${x+3.5} cy=${y-1} r="1.6" fill="#2B1B12"/><ellipse cx=${x} cy=${y+4} rx="3.5" ry="2.5" fill="#E6C9A8"/><ellipse cx=${x} cy=${y+18} rx="13" ry="10" fill="#B07A4F"/></g>`;
const ESC_ROOMS=[
 {id:'r1',cefr:'A1',title:"Wordy's Bedroom",ru:'Комната Wordy',intro:'Wordy заперся в своей комнате и потерял ключ. Осмотри всё вокруг: подсказки спрятаны в вещах и написаны по-английски.',
  bg:{wall:'#F3D9B8',pat:'stripes',floor:'wood'},
  objs:[
   {id:'window',name:'window',art:EA.win({x:210,y:48,rain:true}),act:{type:'look',text:"It is [raining|идёт дождь] outside. You can't go out through the window — it's too [high|высоко]!"}},
   {id:'clock',name:'clock',art:EA.clock({x:136,y:66,h:2}),act:{type:'look',text:"A wall clock. The [hands|стрелки] show two o'clock. Tick-tock!"}},
   {id:'door',name:'door',art:EA.door({x:22}),act:{type:'need',item:'key',locked:"The door is [locked|заперта]. You need a key.",exit:true}},
   {id:'lamp',name:'lamp',art:EA.lamp({x:334}),act:{type:'look',text:"A tall lamp. Its light is warm and yellow."}},
   {id:'desk',name:'desk',art:EA.desk({x:104,w:92}),act:{type:'look',text:"You open the [drawer|ящик]. There are pencils and an old [comic|комикс]. Nothing useful."}},
   {id:'bed',name:'bed',art:EA.bed({x:196}),act:{type:'look',text:"The bed is not made. Under the [blanket|одеяло] there is only one sock."}},
   {id:'teddy',name:'teddy bear',art:EA.teddy({x:300,y:216}),act:{type:'look',text:"A [teddy bear|плюшевый мишка] holds a card: «The code is 999». Hmm… teddy bears always [lie|врут]!"}},
   {id:'pillow',name:'pillow',art:EA.pillow({x:240,y:226}),act:__WD[1327]},
   {id:'plant',name:'plant',art:EA.plant({x:84,y:300}),act:{type:'look',text:"A green plant in a pot. It needs some water."}},
   {id:'rug',name:'rug',art:EA.rug({x:230,y:372}),act:{type:'look',text:"A soft red [rug|коврик]. You look under it — nothing, only dust."}},
   {id:'box',name:'box',art:EA.box({x:120,y:330}),act:{type:'lock',kind:'digits',len:3,answer:'472',prompt:'The box has a lock with three numbers.',open:{give:'key',text:"Click! Inside the box there is a small golden [key|ключ]."}}}],
  items:{key:{em:'🔑',name:'key',ru:'ключ'}},
  chain:[['pillow','Посмотри внимательно на кровать — может, под подушкой что-то есть?'],['clock','Третья цифра кода — время на часах.'],['box','У кошки 4 лапы, в неделе 7 дней, на часах 2 → 472.'],['door','Ключ из коробки открывает дверь.']]},
 {id:'r2',cefr:'A2',title:'The Kitchen',ru:'Кухня',intro:'Ты на кухне, и дверь заперта. Мама оставила подсказки — но не все записки говорят правду.',
  bg:{wall:'#D8E8D2',pat:'tiles',floor:'tile',fc:'#D9D2C5'},
  objs:[
   {id:'window',name:'window',art:EA.win({x:226,y:44,w:84,h:64,cur:'#F2C76A'}),act:{type:'look',text:"Outside you can see the garden. The sun is shining."}},
   {id:'wallcab',name:'cupboard',art:EA.wallcab({x:92,y:64,w:104}),act:{type:'lock',kind:'digits',len:4,answer:'2135',prompt:'The cupboard has a lock with four numbers.',open:{give:'torch',text:"The [cupboard|шкафчик] opens. There is a [torch|фонарик] inside. Maybe it will help in a dark place."}}},
   {id:'door',name:'door',art:EA.door({x:282,c:'#6B8E7A'}),act:{type:'lock',kind:'word',answer:'hot',prompt:'The kitchen door has a small keyboard. Enter the password.',exit:true}},
   {id:'fridge',name:'fridge',art:EA.fridge({x:12}),act:{type:'note',title:'A note on the fridge',text:"A [magnet|магнит] holds a note: «My pancake [recipe|рецепт] is in the [drawer|ящик] next to the stove. Please don't eat the cake! — Mum»"}},
   {id:'counter',name:'drawer',art:EA.counter({x:84,w:120}),act:{type:'note',title:'Pancakes',text:"First, [add|добавь] two eggs.\nThen add one cup of milk.\nAfter that, add three [spoons|ложки] of sugar.\nFinally, [cook|готовь] for five minutes.\n\nP.S. The cupboard code is the numbers from this recipe, in the same [order|порядок]."}},
   {id:'cake',name:'cake',art:EA.cake({x:130,y:212}),act:{type:'look',text:"A big chocolate cake. A note on it says: «The password is CAKE!» But Mum always leaves her notes on the fridge, not on cakes…"}},
   {id:'stove',name:'stove',art:EA.stove({x:208,w:66}),act:{type:'look',text:"The [oven|духовка] is [off|выключена]. There is an old pizza inside. Yuck!"}},
   {id:'hatch',name:'cellar door',art:EA.hatch({x:150}),act:{type:'need',item:'torch',locked:"A small door in the floor. Below it, the [cellar|погреб] is very dark. You can't see anything.",text:"With the torch you can see words on the cellar wall: «The door [password|пароль] is the [opposite|противоположность] of COLD.»"}}],
  items:{torch:{em:'🔦',name:'torch',ru:'фонарик'}},
  chain:[['fridge','На холодильнике всегда висят записки.'],['counter','Рецепт лежит в ящике рядом с плитой.'],['wallcab','Цифры из рецепта по порядку: 2, 1, 3, 5.'],['hatch','С фонариком можно заглянуть в тёмный погреб под полом.'],['door','Противоположность COLD — HOT.']]},
 {id:'r3',cefr:'A2',title:'The Classroom',ru:'Класс',intro:'Урок закончился, а дверь класса заперта. Ключ в шкафу — но какой у него код?',
  bg:{wall:'#F5EBD0',pat:'panels',floor:'wood'},
  objs:[
   {id:'wardrobe',name:'cupboard',art:EA.wardrobe({x:12,w:80,c:'#8FA67A'}),act:{type:'lock',kind:'digits',len:3,answer:'452',prompt:'The cupboard lock has three numbers.',open:{give:'key',text:"The cupboard opens. Behind the books there is a [key|ключ] with a label: «Classroom door»."}}},
   {id:'board',name:'blackboard',art:EA.blackboard({x:110,y:44,w:166,h:96,lines:['Monday','Homework: page 45',"Don't forget your books!"]}),act:{type:'note',title:'The blackboard',text:"Monday.\n[Homework|домашнее задание]: page 45.\nDon't forget your books!"}},
   {id:'clock',name:'clock',art:EA.clock({x:322,y:62,h:9}),act:{type:'look',text:"It's nine o'clock. The [lesson|урок] has finished."}},
   {id:'door',name:'door',art:EA.door({x:286,c:'#5D7FA3'}),act:{type:'need',item:'key',locked:"The classroom door is locked. You need the key.",exit:true}},
   {id:'tdesk',name:"teacher's desk",art:EA.desk({x:146,w:118,c:'#9A6740'}),act:{type:'note',title:'The class register',text:"In the drawer you find the [register|журнал]:\nClass 3B — Monday\n[Present|присутствуют]: Adam, Bella, Chen, Dina, Erik, Farah, Greg.\n[Absent|отсутствуют]: Tom, Lily."}},
   {id:'sdesk',name:"student's desk",art:EA.sdesk({x:56,y:322}),act:{type:'note',title:'A note inside the desk',text:"A note from the teacher: «The cupboard code is the [homework|домашнее задание] page, then the number of students who are [absent|отсутствуют] today.»"}},
   {id:'sdesk2',name:'desk',art:EA.sdesk({x:200,y:332,c:'#B07A4F'}),act:{type:'look',text:"An empty desk. Someone left [chewing gum|жвачка] under it. Yuck!"}},
   {id:'bin',name:'bin',art:EA.bin({x:322,y:322}),act:{type:'look',text:"In the bin there is a [crumpled|скомканный] paper: «Code 111 — ha-ha, just joking!»"}}],
  items:{key:{em:'🔑',name:'key',ru:'ключ'}},
  chain:[['sdesk','Загляни внутрь парты ученика.'],['board','Номер страницы домашнего задания написан на доске.'],['tdesk','Сколько учеников отсутствует — смотри журнал в столе учителя.'],['wardrobe','Страница 45 и 2 отсутствующих → 452.'],['door','Ключ из шкафа открывает дверь.']]},
 {id:'r4',cefr:'B1',title:'The Old Library',ru:'Старая библиотека',intro:'Профессор Грей спрятал выход из своей библиотеки за загадками. Читай внимательно: важна каждая деталь.',
  bg:{wall:'#5E7A6B',pat:'panels',floor:'wood',fc:'#8A5A36'},
  objs:[
   {id:'shelf',name:'bookshelf',art:EA.shelf(__WD[1328]),act:{type:'look',text:"Four bright books stand on the middle shelf. Each has a number on its [spine|корешок]: red — 3, green — 1, yellow — 6, blue — 8."}},
   {id:'painting',name:'painting',art:EA.frame({x:166,y:60,w:100,h:70,kind:'ship'}),act:{type:'need',item:'uv',locked:"An old painting of a ship at sea. Nothing special… or is there?",text:"Under the UV light, [hidden|скрытые] words appear on the painting: «The exit word is the past form of the verb GO.»"}},
   {id:'door',name:'door',art:EA.door({x:284,c:'#6D4C41'}),act:{type:'lock',kind:'word',answer:'went',prompt:'A lock with letters. Enter the exit word.',exit:true}},
   {id:'table',name:'table',art:EA.table({x:150,w:116}),act:{type:'look',text:"An old wooden table. It smells of [dust|пыль] and coffee."}},
   {id:'letter',name:'letter',art:EA.paper({x:176,y:236,r:-6,w:30,h:20}),act:__WD[1329]},
   {id:'candle',name:'candle',art:EA.candle({x:246,y:232}),act:{type:'look',text:"A candle and a pen. The pen has [run out of|закончились] ink."}},
   {id:'safe',name:'safe',art:EA.safe({x:176,y:306}),act:{type:'lock',kind:'digits',len:4,answer:'6831',prompt:'The safe has a lock with four numbers.',open:{give:'uv',text:"The safe opens! Inside there is a [UV lamp|ультрафиолетовая лампа] and a note: «Some secrets are [invisible|невидимые].»"}}},
   {id:'globe',name:'globe',art:EA.globe({x:66,y:322}),act:{type:'look',text:"An old globe. Someone has [circled|обвёл] London in red. A clue? No — it's just the professor's [hometown|родной город]."}}],
  items:{uv:{em:'🔦',name:'UV lamp',ru:'УФ-лампа'}},
  chain:[['letter','На столе лежит письмо профессора.'],['shelf','Посмотри на номера цветных книг на полке.'],['safe','Порядок профессора: жёлтая, синяя, красная, зелёная → 6 8 3 1.'],['painting','Посвети УФ-лампой на картину.'],['door','Прошедшее время от GO — WENT.']]},
 {id:'r5',cefr:'B1',title:'Hotel Room 417',ru:'Номер в отеле',intro:'Ты в номере отеля, а ключ-карта куда-то пропала. Без неё дверь не откроется.',
  bg:{wall:'#E6E0F0',pat:'dots',floor:'carpet',fc:'#A8957A'},
  objs:[
   {id:'window',name:'window',art:EA.win({x:116,y:46,w:84,h:70,night:true,cur:'#8E7CC3'}),act:{type:'look',text:"At night the city is beautiful. You can see thousands of lights."}},
   {id:'tv',name:'TV',art:EA.tv({x:236,y:96,w:96,h:58}),act:{type:'look',text:"The TV is showing the weather [forecast|прогноз]: «Tomorrow will be sunny and warm.»"}},
   {id:'door',name:'door',art:EA.door({x:16,c:'#7E6BB0',sign:'417'}),act:{type:'need',item:'card',locked:"The door has an electronic lock. You need your [key card|ключ-карта].",exit:true}},
   {id:'desk',name:'desk',art:EA.desk({x:100,w:104,c:'#8E6B4A'}),act:{type:'look',text:"A hotel desk with a pen and a lamp. The drawer is empty."}},
   {id:'letter',name:'letter',art:EA.paper({x:112,y:216,r:4,w:30,h:18}),act:{type:'note',title:'A welcome letter',text:"Welcome to Hotel Sunrise!\nYour room is 417. Breakfast is served from 7 to 10 a.m. on the first floor.\nWe hope you [enjoy|насладитесь] your stay!"}},
   {id:'phone',name:'phone',art:EA.phone({x:176,y:218}),act:{type:'note',title:'A voice message',text:"«Good evening! This is [reception|ресепшен]. For your [security|безопасность], the code of your room safe is your room number [backwards|задом наперёд].»"}},
   {id:'bed',name:'bed',art:EA.bed({x:206,w:130,c:'#B39DDB'}),act:{type:'look',text:"A big soft bed. There is a chocolate on the pillow. Nice!"}},
   {id:'safe',name:'safe',art:EA.safe({x:120,y:300,w:58,h:52}),act:{type:'lock',kind:'digits',len:3,answer:'714',prompt:'The room safe has three numbers.',open:{give:'card',text:"The safe opens. Inside there is your passport and your [key card|ключ-карта]!"}}},
   {id:'suitcase',name:'suitcase',art:EA.suitcase({x:246,y:330,c:'#C0392B'}),act:{type:'look',text:"Your suitcase. Inside there are clothes and a map of the city — but no key card."}},
   {id:'plant',name:'plant',art:EA.plant({x:342,y:300,s:.9}),act:{type:'look',text:"A plastic plant. It looks real, but it isn't."}}],
  items:{card:{em:'💳',name:'key card',ru:'ключ-карта'}},
  chain:[['letter','На столе лежит письмо от отеля — в нём номер комнаты.'],['phone','Послушай сообщение на телефоне.'],['safe','Номер 417 задом наперёд — 714.'],['door','Ключ-карта из сейфа открывает дверь.']]},
 {id:'r6',cefr:'B1',title:'The Corner Café',ru:'Кафе на углу',intro:'Первый день работы в кафе — и задняя дверь захлопнулась. Ключ лежит в кассе.',
  bg:{wall:'#F7E3D0',pat:'stripes',floor:'tile',fc:'#CDB79E'},
  objs:[
   {id:'menu',name:'menu board',art:EA.menuboard({x:16,y:46,w:150,h:112,lines:['Tea .............. £1.20','Coffee ........... £2.10','Cappuccino ....... £2.50','Muffin ........... £1.75']}),act:{type:'note',title:'Menu',text:"Tea — £1.20\nCoffee — £2.10\nCappuccino — £2.50\nMuffin — £1.75"}},
   {id:'door',name:'back door',art:EA.door({x:196,c:'#7A4C2C',sign:'STAFF'}),act:{type:'need',item:'key',locked:"The back door is locked. You need a key.",exit:true}},
   {id:'counter',name:'counter',art:EA.counter({x:176,w:178,drawers:3,top:'#E8D9C5'}),act:{type:'look',text:"The drawers are full of [napkins|салфетки] and paper cups."}},
   {id:'register',name:'cash register',art:EA.register({x:186,y:206}),act:{type:'lock',kind:'digits',len:3,answer:'425',prompt:'The cash register asks for a three-digit code.',open:{give:'key',text:"Ding! The register opens. Under the money there is the back door [key|ключ]."}}},
   {id:'jar',name:'tip jar',art:EA.jar({x:270,y:200}),act:{type:'note',title:'A note in the tip jar',text:"«Dear new [waiter|официант], the register code is the price of one cappuccino and one muffin [together|вместе]. Write it without the dot. — Rosa, the owner»"}},
   {id:'coffee',name:'coffee machine',art:EA.coffee({x:300,y:180}),act:{type:'look',text:"The coffee machine is still warm. It smells [delicious|вкусно]."}},
   {id:'table',name:'table',art:EA.table({x:24,y:262,w:104,cloth:'#E57373'}),act:{type:'look',text:"A dirty cup and a [receipt|чек]: «1 tea, 1 sandwich — £4.60». That's not the order you need."}},
   {id:'plant',name:'plant',art:EA.plant({x:152,y:300,s:.9}),act:{type:'look',text:"A small tree in a pot. Its leaves are very green."}}],
  items:{key:{em:'🔑',name:'key',ru:'ключ'}},
  chain:[['jar','Посмотри в банку для чаевых на стойке.'],['menu','Цены — на меловой доске меню.'],['register','Капучино £2.50 + маффин £1.75 = £4.25 → 425.'],['door','Ключ из кассы открывает заднюю дверь.']]},
 {id:'r7',cefr:'B1',title:'The Night Train',ru:'Ночной поезд',intro:'Ты в купе поезда, и дверь заклинило. Проводник оставил записку.',
  bg:{wall:'#D6DEE8',pat:'panels',floor:'carpet',fc:'#5B5F7A'},
  objs:[
   {id:'window',name:'window',art:EA.win({x:104,y:44,w:140,h:86,cur:'#7A2E3A'}),act:{type:'look',text:"Fields and trees fly past the window. The train is going very fast."}},
   {id:'timetable',name:'timetable',art:EA.timetable({x:262,y:40,w:92,h:84,rows:['Paris   10:45','Rome    13:20','Berlin  15:05']}),act:{type:'note',title:'Departures',text:"Paris — 10:45\nRome — 13:20\nBerlin — 15:05"}},
   {id:'door',name:'door',art:EA.door({x:12,w:62,c:'#8A9BB0'}),act:{type:'lock',kind:'word',answer:'arrive',prompt:'The compartment door has a word lock.',exit:true}},
   {id:'seat',name:'seat',art:EA.seat({x:84,w:112}),act:{type:'look',text:"You look under the [cushion|подушка сиденья]. Only a candy [wrapper|фантик]. Nothing else."}},
   {id:'seat2',name:'seat',art:EA.seat({x:230,w:118}),act:{type:'look',text:"A comfortable seat. Someone forgot a magazine about Paris here."}},
   {id:'table',name:'table',art:EA.table({x:136,y:208,w:84,c:'#6B4A2E'}),act:{type:'look',text:"A small table by the window. It shakes a little when the train moves."}},
   {id:'note',name:'note',art:EA.paper({x:160,y:192,r:-5,w:30,h:18}),act:{type:'note',title:"The conductor's note",text:"«Dear [passenger|пассажир], your suitcase was locked by [mistake|ошибка]. The code is the [departure|отправление] time of this train. We are going to Paris. — The [conductor|проводник]»"}},
   {id:'suitcase',name:'suitcase',art:EA.suitcase({x:150,y:330,w:70,h:46,c:'#2F7FC1'}),act:{type:'lock',kind:'digits',len:4,answer:'1045',prompt:'The suitcase has a lock with four numbers.',open:{text:"The suitcase opens. On top of your clothes there is a ticket. On the back someone wrote: «The door opens with the [opposite|противоположность] of DEPART.»"}}}],
  items:{},
  chain:[['note','На столике у окна лежит записка проводника.'],['timetable','Время отправления поезда в Париж — на табло.'],['suitcase','Поезд в Париж отправляется в 10:45 → 1045.'],['door','Противоположность DEPART (отправляться) — ARRIVE.']]},
 {id:'r8',cefr:'B1',title:"The Detective's Office",ru:'Кабинет детектива',intro:'Из музея украли Золотой кубок. Ты заперт в кабинете детектива, пока не найдёшь лжеца.',
  bg:{wall:'#E4DCCB',pat:'panels',floor:'wood'},
  objs:[
   {id:'board',name:'board',art:EA.board({x:104,y:44,w:140,h:96}),act:__WD[1330]},
   {id:'poster',name:'poster',art:EA.frame({x:262,y:52,w:80,h:76,kind:'poster',text:'CITY|MUSEUM|since 1987'}),act:{type:'look',text:"CITY MUSEUM — open since 1987. Come and see the Golden Cup!"}},
   {id:'door',name:'door',art:EA.door({x:16}),act:{type:'lock',kind:'digits',len:4,answer:'1987',prompt:'The door has a lock with four numbers.',exit:true}},
   {id:'desk',name:'desk',art:EA.desk({x:100,w:168,c:'#6B4A2E'}),act:{type:'look',text:"The detective's desk. A cup of cold coffee and many papers."}},
   {id:'case',name:'case file',art:EA.paper({x:108,y:214,r:-3,w:34,h:22,c:'#F5D38A'}),act:{type:'note',title:'CASE: The Golden Cup',text:"The Golden Cup was [stolen|украден] from the City Museum last Sunday at 9 p.m. There are three [suspects|подозреваемые]. Their [statements|показания] are on the board. One of them is [lying|лжёт]. Find the liar — the name opens the [cabinet|шкаф]."}},
   {id:'paper',name:'newspaper',art:EA.paper({x:200,y:214,r:5,w:38,h:22,c:'#EDEDE4'}),act:{type:'note',title:'City News — Monday',text:"«Luigi's restaurant is [closed|закрыт] on Sundays and Mondays,» says the [owner|владелец]. «We are open from Tuesday to Saturday.»\nAlso in the news: the new film «Night Train» is two and a half hours long."}},
   {id:'phone',name:'phone',art:EA.phone({x:166,y:218}),act:{type:'note',title:'A voice message',text:"«Hello, Mr White. This is your doctor. Please take your [medicine|лекарство] three times a day and stay in bed until Monday.»"}},
   {id:'filecab',name:'cabinet',art:EA.filecab({x:288,y:206}),act:__WD[1331]}],
  items:{ticket:{em:'🎟️',name:'ticket',ru:'билет'}},
  chain:[['case','Начни с папки с делом на столе.'],['board','Показания подозреваемых — на доске.'],['paper','Сравни показания с газетой.'],['filecab','Ресторан Luigi\'s по воскресеньям закрыт — лжёт Mr Brown.'],['poster','Год открытия музея — на постере.'],['door','Код двери — 1987.']]},
 {id:'r9',cefr:'B2',title:'The Museum Hall',ru:'Зал музея',intro:'Музей закрылся, а ты остался в зале. Выход открывается кодом — разберись в табличках экспонатов.',
  bg:{wall:'#EDE6DA',pat:'panels',floor:'tile',fc:'#CFC6B8'},
  objs:[
   {id:'map',name:'old map',art:EA.frame({x:20,y:54,w:84,h:62,kind:'map'}),act:{type:'look',text:"An old map of the city. The streets look very different now."}},
   {id:'sign',name:'sign',art:EA.frame({x:256,y:54,w:88,h:62,kind:'poster',text:'WELCOME|Open to the public|since 1985'}),act:{type:'look',text:"WELCOME! The museum has been open to the public since 1985."}},
   {id:'door',name:'exit door',art:EA.door({x:144,y:70,h:120,c:'#8A6F4D',sign:'EXIT',dark:true}),act:{type:'lock',kind:'digits',len:4,answer:'1764',prompt:'The exit door has a lock with four numbers.',exit:true}},
   {id:'cup',name:'golden cup',art:EA.showcase({x:14,y:200,obj:'cup'}),act:{type:'look',text:"A label under the glass: «Golden cup, made around 300 BC. [Found|найден] in 1901.»"}},
   {id:'vase',name:'clay vase',art:EA.showcase({x:134,y:200,obj:'vase'}),act:{type:'look',text:"A label under the glass: «Clay vase, made around 1200 BC. Found in 1764.»"}},
   {id:'coin',name:'coin',art:EA.showcase({x:254,y:200,obj:'coin'}),act:{type:'look',text:"A label under the glass: «Roman coin, made in AD 50. Found in 1890.»"}},
   {id:'desk',name:"guard's desk",art:EA.desk({x:120,y:336,w:120,c:'#6B4A2E',drawer:false}),act:{type:'look',text:"The guard's desk. A [torch|фонарик] that doesn't work and a cold cup of tea."}},
   {id:'note',name:'note',art:EA.paper({x:150,y:320,r:-4,w:34,h:20}),act:{type:'note',title:"The curator's note",text:"«The exit code is the year when the oldest [object|экспонат] in this hall was [discovered|обнаружен]. Don't [confuse|путать] it with the year the museum opened to visitors! — The [curator|хранитель]»"}}],
  items:{},
  chain:[['note','На столе охранника лежит записка хранителя.'],['vase','Сравни таблички: какой предмет самый древний?'],['door','Самая древняя — ваза (1200 BC), её нашли в 1764. Год 1985 — ловушка.']]},
 {id:'r10',cefr:'B2',title:'The Secret Laboratory',ru:'Секретная лаборатория',intro:'Ты в лаборатории, и дверь управляется компьютером. Правила лаборатории — твоя главная подсказка.',
  bg:{wall:'#E3EEF2',pat:'tiles',floor:'tile',fc:'#B9C4CC'},
  objs:[
   {id:'lights',name:'lights',art:EA.lights({x:88,y:54,on:'green'}),act:{type:'look',text:"A panel with two lights. The red light is [off|выключен]. The green light is on."}},
   {id:'rules',name:'lab rules',art:EA.frame({x:174,y:40,w:100,h:76,kind:'poster',text:'LAB RULES|Read carefully!'}),act:__WD[1332]},
   {id:'thermo',name:'thermometer',art:EA.thermo({x:110,y:110,t:18}),act:{type:'look',text:"The [thermometer|термометр] shows 18 °C."}},
   {id:'door',name:'door',art:EA.door({x:302,w:54,c:'#9AA5B1'}),act:{type:'look',text:"The door is locked [electronically|электронно]. It is [controlled|управляется] by the computer."}},
   {id:'bottles',name:'bottles',art:EA.bottles({x:178,y:140,list:['#3E7CB1','#4E9A55','#4E9A55','#3E7CB1','#4E9A55','#4E9A55','#3E7CB1','#4E9A55']}),act:{type:'look',text:"A shelf with bottles: three blue ones and five green ones."}},
   {id:'locker',name:'locker',art:EA.locker({x:14,y:130,w:60,h:150}),act:{type:'lock',kind:'digits',len:3,answer:'518',prompt:'The locker has a lock with three numbers.',open:{give:'book',text:"The locker opens. Inside there is a notebook. On the last page: «Computer password: the [noun|существительное] from the verb DISCOVER.»"}}},
   {id:'table',name:'table',art:EA.table({x:90,y:240,w:186,c:'#9AA5B1'}),act:{type:'look',text:"A long white table. There are some [test tubes|пробирки] and a broken microscope."}},
   {id:'computer',name:'computer',art:EA.computer({x:150,y:186}),act:{type:'lock',kind:'word',answer:'discovery',prompt:'The computer asks for a password.',exit:true}}],
  items:{book:{em:'📓',name:'notebook',ru:'блокнот'}},
  chain:[['rules','Прочитай правила лаборатории на стене.'],['lights','Горит ли красная лампа?'],['bottles','Красная не горит — считай зелёные бутылки.'],['thermo','Две последние цифры — температура.'],['locker','5 зелёных бутылок и 18 °C → 518.'],['computer','Существительное от DISCOVER — DISCOVERY.']]},
];

/* realism: perspective floor, corner shading, light + vignette; new pieces for rooms 11–20 */
const ESC_BG=({wall,pat,floor,fc},id='x')=>html`<g>
  <defs><linearGradient id=${'wl-'+id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".25" stop-color="#000" stop-opacity="0"/><stop offset=".85" stop-color="#000" stop-opacity=".04"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient>
    <linearGradient id=${'wc-'+id} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".12" stop-color="#000" stop-opacity="0"/><stop offset=".88" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
    <linearGradient id=${'fl-'+id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".3" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
  <rect x="0" y="0" width="360" height="280" fill=${wall}/>
  ${pat==='stripes'?[...Array(12)].map((_,i)=>html`<rect key=${i} x=${i*32} y="14" width="14" height="266" fill="rgba(255,255,255,.16)"/>`):pat==='dots'?[...Array(60)].map((_,i)=>html`<circle key=${i} cx=${(i%10)*38+12+(Math.floor(i/10)%2)*19} cy=${Math.floor(i/10)*46+24} r="2.5" fill="rgba(0,0,0,.06)"/>`):pat==='tiles'?[...Array(9)].map((_,i)=>html`<line key=${i} x1="0" y1=${14+i*31} x2="360" y2=${14+i*31} stroke="rgba(0,0,0,.06)" stroke-width="2"/>`):pat==='panels'?[...Array(6)].map((_,i)=>html`<rect key=${i} x=${i*60+6} y="176" width="48" height="92" rx="3" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="3"/>`):pat==='bricks'?[...Array(9)].map((_,r)=>[...Array(8)].map((_,c)=>html`<rect key=${r+'-'+c} x=${c*48+(r%2)*24-24} y=${14+r*30} width="46" height="28" rx="2" fill="rgba(0,0,0,.05)" stroke="rgba(0,0,0,.08)"/>`)):pat==='planks'?[...Array(10)].map((_,i)=>html`<rect key=${i} x="0" y=${14+i*27} width="360" height="25" fill=${i%2?'rgba(0,0,0,.05)':'rgba(255,255,255,.04)'}/>`):pat==='stone'?[...Array(7)].map((_,r)=>[...Array(6)].map((_,c)=>html`<rect key=${r+'-'+c} x=${c*64+(r%2)*32-32} y=${14+r*38} width="60" height="34" rx="6" fill="rgba(255,255,255,.05)" stroke="rgba(0,0,0,.12)"/>`)):null}
  <rect x="0" y="0" width="360" height="280" fill=${'url(#wl-'+id+')'}/><rect x="0" y="0" width="360" height="280" fill=${'url(#wc-'+id+')'}/>
  <rect x="0" y="0" width="360" height="14" fill="rgba(0,0,0,.18)"/><rect x="0" y="14" width="360" height="3" fill="rgba(255,255,255,.25)"/>
  <rect x="0" y="280" width="360" height="140" fill=${fc||'#B88358'}/>
  ${floor==='wood'?html`${[-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7].map(i=>html`<line key=${'v'+i} x1=${180+i*26} y1="280" x2=${180+i*80} y2="420" stroke="rgba(0,0,0,.12)" stroke-width="1.5"/>`)}${[292,306,324,348,380].map(y=>html`<line key=${'h'+y} x1="0" y1=${y} x2="360" y2=${y} stroke="rgba(0,0,0,.05)" stroke-width="1"/>`)}`
   :floor==='tile'?html`${[-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7].map(i=>html`<line key=${'v'+i} x1=${180+i*30} y1="280" x2=${180+i*92} y2="420" stroke="rgba(0,0,0,.1)" stroke-width="1.5"/>`)}${[292,308,330,360,402].map(y=>html`<line key=${'h'+y} x1="0" y1=${y} x2="360" y2=${y} stroke="rgba(0,0,0,.1)" stroke-width="1.5"/>`)}`
   :floor==='carpet'?[...Array(40)].map((_,i)=>html`<circle key=${i} cx=${(i%10)*38+10+(Math.floor(i/10)%2)*19} cy=${292+Math.floor(i/10)*34} r=${1.5+Math.floor(i/10)*.5} fill="rgba(0,0,0,.07)"/>`)
   :floor==='metal'?[...Array(8)].map((_,i)=>html`<line key=${i} x1=${180+(i-4)*40} y1="280" x2=${180+(i-4)*120} y2="420" stroke="rgba(255,255,255,.12)" stroke-width="2"/>`):null}
  <rect x="0" y="280" width="360" height="140" fill=${'url(#fl-'+id+')'}/>
  <rect x="0" y="272" width="360" height="10" fill="rgba(0,0,0,.14)"/><rect x="0" y="280" width="360" height="5" fill="rgba(0,0,0,.18)"/></g>`;
const ESC_FX=({light,lx=260,ly=60,night},id='x')=>html`<g pointer-events="none">
  <defs><radialGradient id=${'lt-'+id} cx=${lx/360} cy=${ly/420} r=".75"><stop offset="0" stop-color=${light==='cool'?'#DFF4FF':'#FFF1D0'} stop-opacity=${night?.22:.42}/><stop offset=".5" stop-color="#FFF1D0" stop-opacity="0"/></radialGradient>
    <radialGradient id=${'vg-'+id} cx=".5" cy=".45" r=".8"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=${night?.55:.32}/></radialGradient></defs>
  ${light==='window'?html`<path d=${`M${lx-40} ${ly+40} L${lx+40} ${ly+40} L${lx+90} 420 L${lx-140} 420Z`} fill="#FFF6D8" opacity=".12"/>`:null}
  <rect x="0" y="0" width="360" height="420" fill=${'url(#lt-'+id+')'}/>
  ${night?html`<rect x="0" y="0" width="360" height="420" fill="#0B1430" opacity=".25"/>`:null}
  <rect x="0" y="0" width="360" height="420" fill=${'url(#vg-'+id+')'}/></g>`;
Object.assign(EA,{
 garagedoor:({x,y=86,w=150,h=194})=>html`<g><rect x=${x-6} y=${y-6} width=${w+12} height=${h+6} fill="#5B6270"/><rect x=${x} y=${y} width=${w} height=${h} fill="#C9CED6"/>${[...Array(8)].map((_,i)=>html`<rect key=${i} x=${x} y=${y+i*(h/8)} width=${w} height=${h/8-3} fill=${i%2?'#BFC5CE':'#D3D8DF'}/>`)}<rect x=${x+w/2-14} y=${y+h-18} width="28" height="6" rx="3" fill="#4A505B"/></g>`,
 toolboard:({x,y=60,w=120,h=90})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} fill="#C8A77A"/>${[...Array(30)].map((_,i)=>html`<circle key=${i} cx=${x+8+(i%10)*11.5} cy=${y+10+Math.floor(i/10)*30} r="1.5" fill="#8A6A40"/>`)}
   <rect x=${x+14} y=${y+20} width="6" height="40" fill="#6B4A2E"/><rect x=${x+6} y=${y+16} width="22" height="10" rx="2" fill="#5B6270"/><path d=${`M${x+50} ${y+18} l6 0 l0 44 l-6 0z`} fill="#9AA5B1"/><circle cx=${x+53} cy=${y+16} r="7" fill="none" stroke="#9AA5B1" stroke-width="4"/><path d=${`M${x+80} ${y+20} q12 0 12 14 l0 30 l-6 0 l0 -30 q0 -6 -6 -6z`} fill="#D9534F"/></g>`,
 bike:({x,y=300})=>html`<g fill="none" stroke="#2E3238" stroke-width="3"><circle cx=${x} cy=${y} r="22"/><circle cx=${x+70} cy=${y} r="22"/><path d=${`M${x} ${y} L${x+26} ${y-30} L${x+56} ${y-30} L${x+70} ${y} M${x+26} ${y-30} L${x+36} ${y} L${x+56} ${y-30} M${x+56} ${y-30} l4 -14 h10`} stroke="#D9534F"/><path d=${`M${x+18} ${y-36} h16`} stroke-width="5"/><rect x=${x+30} y=${y-12} width="12" height="10" rx="2" fill="#E8C35A" stroke="#9C7A22" stroke-width="1.5"/></g>`,
 easel:({x,y=130,kind='blank'})=>html`<g><path d=${`M${x+10} ${y+170} L${x+40} ${y} L${x+70} ${y+170} M${x+40} ${y} L${x+40} ${y+176}`} stroke="#8A5A36" stroke-width="5" fill="none"/><rect x=${x+4} y=${y+20} width="72" height="66" fill="#FFFDF7" stroke="#D8CDB5"/>${kind==='half'?html`<path d=${`M${x+8} ${y+70} q16 -26 30 -8 q12 -20 34 -6 v26 h-64z`} fill="#7FB3E6"/><circle cx=${x+56} cy=${y+38} r="8" fill="#FFD36B"/>`:null}<rect x=${x} y=${y+86} width="80" height="6" fill="#8A5A36"/></g>`,
 palette:({x,y=232})=>html`<g><path d=${`M${x} ${y} q30 -20 56 0 q8 16 -10 16 q-8 0 -6 8 q-20 6 -40 -24z`} fill="#E8D0A8"/>${['#E74C3C','#3E7CB1','#F1C40F','#27AE60'].map((c,i)=>html`<circle key=${i} cx=${x+12+i*10} cy=${y+2-(i%2)*2} r="3.5" fill=${c}/>`)}</g>`,
 porthole:({x,y,r=34,night})=>html`<g><circle cx=${x} cy=${y} r=${r+8} fill="#B8862E"/>${[...Array(8)].map((_,i)=>{ const a=i*Math.PI/4; return html`<circle key=${i} cx=${x+Math.cos(a)*(r+4)} cy=${y+Math.sin(a)*(r+4)} r="2.5" fill="#7A5A1A"/>`; })}<circle cx=${x} cy=${y} r=${r} fill=${night?'#1C2741':'#7FB8E6'}/><path d=${`M${x-r} ${y+8} q${r/2} -8 ${r} 0 q${r/2} 8 ${r} 0 v${r} h-${2*r}z`} fill=${night?'#22385E':'#3E7CB1'}/></g>`,
 barrel:({x,y=286,w=50,h=64})=>html`<g><path d=${`M${x} ${y} q-6 ${h/2} 0 ${h} h${w} q6 ${-h/2} 0 ${-h}z`} fill="#9A6740"/>${[.18,.82].map((k,i)=>html`<rect key=${i} x=${x-3} y=${y+h*k-3} width=${w+6} height="6" fill="#5B6270"/>`)}<ellipse cx=${x+w/2} cy=${y} rx=${w/2} ry="6" fill="#7A4C2C"/></g>`,
 chest:({x,y=318,w=78,h=48})=>html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="4" fill="#8A5A36"/><path d=${`M${x} ${y} q${w/2} -26 ${w} 0z`} fill="#9A6740"/><rect x=${x} y=${y-2} width=${w} height="6" fill="#B8862E"/><rect x=${x+10} y=${y-14} width="6" height=${h+14} fill="#B8862E"/><rect x=${x+w-16} y=${y-14} width="6" height=${h+14} fill="#B8862E"/><rect x=${x+w/2-8} y=${y+4} width="16" height="16" rx="2" fill="#E8C35A" stroke="#9C7A22"/></g>`,
 shield:({x,y=90})=>html`<g><path d=${`M${x-26} ${y} h52 v28 q0 30 -26 42 q-26 -12 -26 -42z`} fill="#3E5C9A" stroke="#B8862E" stroke-width="4"/><path d=${`M${x} ${y+6} v58 M${x-20} ${y+26} h40`} stroke="#E8C35A" stroke-width="5"/><path d=${`M${x-48} ${y+70} L${x+48} ${y-10} M${x+48} ${y+70} L${x-48} ${y-10}`} stroke="#9AA5B1" stroke-width="5"/></g>`,
 vault:({x,y=110,r=70})=>html`<g><rect x=${x-r-12} y=${y-r-12} width=${2*r+24} height=${2*r+24} rx="10" fill="#5B6270"/><circle cx=${x} cy=${y} r=${r} fill="#8A929E" stroke="#4A505B" stroke-width="6"/><circle cx=${x} cy=${y} r=${r*.38} fill="#C9CED6" stroke="#4A505B" stroke-width="4"/>${[0,1,2,3,4,5].map(i=>{ const a=i*Math.PI/3; return html`<line key=${i} x1=${x} y1=${y} x2=${x+Math.cos(a)*r*.7} y2=${y+Math.sin(a)*r*.7} stroke="#4A505B" stroke-width="7" stroke-linecap="round"/>`; })}<circle cx=${x} cy=${y} r="9" fill="#4A505B"/></g>`,
 screen:({x,y=60,w=110,h=70,lines,c='#0F2A1F',t='#7CFF9A'})=>html`<g><rect x=${x-5} y=${y-5} width=${w+10} height=${h+10} rx="6" fill="#2E3238"/><rect x=${x} y=${y} width=${w} height=${h} rx="3" fill=${c}/>${(lines||[]).map((l,i)=>html`<text key=${i} x=${x+8} y=${y+18+i*15} font-size="10" font-weight="700" fill=${t} font-family="monospace">${l}</text>`)}</g>`,
 speaker:({x,y=40})=>html`<g><rect x=${x-16} y=${y} width="32" height="22" rx="4" fill="#3A3E44"/>${[0,1,2].map(i=>html`<line key=${i} x1=${x-10} y1=${y+6+i*5} x2=${x+10} y2=${y+6+i*5} stroke="#6A6F75" stroke-width="2"/>`)}</g>`,
 bench:({x,y=300,w=140,c='#4A6FA5'})=>html`<g>${[0,1,2].map(i=>html`<g key=${i}><rect x=${x+i*(w/3)+4} y=${y-34} width=${w/3-8} height="30" rx="5" fill=${c}/><rect x=${x+i*(w/3)+4} y=${y-6} width=${w/3-8} height="12" rx="4" fill=${c} opacity=".85"/></g>`)}<rect x=${x} y=${y+6} width=${w} height="5" fill="#9AA5B1"/><rect x=${x+10} y=${y+11} width="5" height="16" fill="#6A6F75"/><rect x=${x+w-15} y=${y+11} width="5" height="16" fill="#6A6F75"/></g>`,
 plane:({x,y})=>html`<path d=${`M${x} ${y} l40 -4 l10 -10 l6 0 l-4 12 l20 -2 l6 -6 l4 0 l-2 8 l-80 8z`} fill="#F4F1EA"/>`,
 scale:({x,y=286})=>html`<g><rect x=${x-3} y=${y-120} width="6" height="120" fill="#9AA5B1"/><rect x=${x-20} y=${y} width="40" height="10" rx="3" fill="#C9CED6"/><rect x=${x-14} y=${y-130} width="28" height="18" rx="3" fill="#E8EBEE" stroke="#9AA5B1"/></g>`,
 bath:({x,y=250,w=150})=>html`<g><rect x=${x} y=${y} width=${w} height="44" rx="20" fill="#F4F6F8" stroke="#C8D1D9" stroke-width="2"/><rect x=${x+10} y=${y-6} width=${w-20} height="10" rx="5" fill="#BFE3FF"/><rect x=${x+w-24} y=${y-40} width="6" height="36" fill="#9AA5B1"/><path d=${`M${x+w-21} ${y-40} q-16 0 -16 12`} stroke="#9AA5B1" stroke-width="5" fill="none"/></g>`,
 mirror:({x,y=60,w=70,h=90,steam})=>html`<g><rect x=${x-4} y=${y-4} width=${w+8} height=${h+8} rx=${w/2} fill="#B8862E"/><rect x=${x} y=${y} width=${w} height=${h} rx=${w/2-4} fill="#CFE6F2"/>${steam?html`<rect x=${x} y=${y} width=${w} height=${h} rx=${w/2-4} fill="#fff" opacity=".6"/>`:html`<path d=${`M${x+12} ${y+20} l16 -10 M${x+16} ${y+34} l26 -16`} stroke="#fff" stroke-width="4" opacity=".7"/>`}</g>`,
 sink:({x,y=226})=>html`<g><rect x=${x} y=${y} width="76" height="14" rx="6" fill="#F4F6F8" stroke="#C8D1D9" stroke-width="2"/><rect x=${x+30} y=${y+14} width="16" height=${286-y-14} fill="#E4E7EA"/><path d=${`M${x+38} ${y} v-14 h10`} stroke="#9AA5B1" stroke-width="4" fill="none"/></g>`,
 frame2:({x,y,w=56,h=70,kind='face',c='#E8C9A0'})=>html`<g><rect x=${x-5} y=${y-5} width=${w+10} height=${h+10} fill="#8A6A2E"/><rect x=${x} y=${y} width=${w} height=${h} fill=${kind==='city'?'#1C2741':'#D9CBB0'}/>
   ${kind==='face'?html`<circle cx=${x+w/2} cy=${y+h*.4} r=${w*.2} fill=${c}/><path d=${`M${x+w*.2} ${y+h} q${w*.3} -${h*.42} ${w*.6} 0z`} fill="#6B3E26"/><path d=${`M${x+w*.32} ${y+h*.26} l${w*.36} 0 l-4 -10 l-6 6 l-4 -8 l-4 8 l-6 -6z`} fill="#E8C35A"/>`:null}
   ${kind==='family'?[0,1,2,3,4].map(i=>html`<g key=${i}><circle cx=${x+8+i*(w-16)/4} cy=${y+h*(i===2?.36:.5)} r=${i===2?8:6} fill=${c}/><rect x=${x+3+i*(w-16)/4} y=${y+h*(i===2?.5:.6)} width=${i===2?14:10} height=${h*.4} rx="4" fill=${['#3E7CB1','#E57373','#6D4C41','#4E9A55','#F1C40F'][i]}/></g>`):null}
   ${kind==='city'?html`${[[4,40],[16,26],[30,48],[44,30]].map(([dx,hh],i)=>html`<rect key=${i} x=${x+dx} y=${y+h-hh} width="10" height=${hh} fill="#2E3E5C"/>`)}<circle cx=${x+w-12} cy=${y+12} r="5" fill="#F4EBD0"/>`:null}</g>`,
});

ESC_ROOMS.push(
 {id:'r11',cefr:'A2',title:'The Garage',ru:'Гараж',intro:'Ты в гараже, и большая дверь не открывается без пульта. Папа всегда прячет вещи в ящике с инструментами.',
  bg:{wall:'#C9CCC4',pat:'bricks',floor:'tile',fc:'#8E9196',light:'lamp',lx:180,ly:20},
  objs:[
   {id:'gdoor',name:'garage door',art:EA.garagedoor({x:196,w:150}),act:{type:'need',item:'remote',locked:"A big garage door. It opens with a [remote control|пульт]. You don't have it.",exit:true}},
   {id:'tools',name:'tool board',art:EA.toolboard({x:20,y:54,w:120,h:88}),act:{type:'look',text:"A hammer, a [spanner|гаечный ключ] and a red [screwdriver|отвёртка] hang on the board."}},
   {id:'calendar',name:'calendar',art:EA.frame({x:150,y:40,w:40,h:54,kind:'poster',text:'MARCH|14 ★'}),act:{type:'note',title:'Calendar — March',text:"14 March: Dad's birthday! Don't forget the cake!\n21 March: Car [service|техобслуживание]."}},
   {id:'bench',name:'workbench',art:EA.desk({x:18,y:226,w:150,c:'#8A6A40'}),act:{type:'look',text:"A dirty [workbench|верстак]. There are [nails|гвозди], an old radio and a note.",}},
   {id:'note',name:'note',art:EA.paper({x:40,y:210,r:-8,w:28,h:18}),act:{type:'note',title:'A note from Mum',text:"«The [remote control|пульт] is in Dad's [toolbox|ящик с инструментами]. The code is his birthday: first the day, then the month. — Mum»"}},
   {id:'cans',name:'paint cans',art:EA.bottles({x:70,y:158,list:['#D9534F','#3E7CB1','#F1C40F','#4E9A55']}),act:{type:'look',text:"Old [paint|краска] cans: red, blue, yellow and green. Someone wrote «1234» on one. Too easy — it's not a code."}},
   {id:'bike',name:'bike',art:EA.bike({x:36,y:340}),act:{type:'look',text:"Your old bike. The [tyres|шины] are [flat|спущены]."}},
   {id:'toolbox',name:'toolbox',art:EA.box({x:140,y:330,w:56,h:36}),act:{type:'lock',kind:'digits',len:4,answer:'1403',prompt:'The toolbox has a lock with four numbers.',open:{give:'remote',text:"The toolbox opens. Under the [tools|инструменты] there is the garage door remote!"}}}],
  items:{remote:{em:'📟',name:'remote',ru:'пульт'}},
  chain:[['note','На верстаке лежит записка от мамы.'],['calendar','День рождения папы отмечен в календаре.'],['toolbox','14 марта: день 14, месяц 03 → 1403.'],['gdoor','Пульт из ящика открывает ворота гаража.']]},
 {id:'r12',cefr:'A2',title:"Grandma's Living Room",ru:'Гостиная бабушки',intro:'Бабушка ушла в магазин и заперла дверь. Она оставила загадку — у неё всегда загадки.',
  bg:{wall:'#E9D3C8',pat:'dots',floor:'wood',fc:'#9A6B48',light:'window',lx:262,ly:80},
  objs:[
   {id:'window',name:'window',art:EA.win({x:216,y:44,w:92,h:76,cur:'#C0392B'}),act:{type:'look',text:"Grandma's garden is full of roses."}},
   {id:'photo',name:'family photo',art:EA.frame2({x:120,y:52,w:72,h:56,kind:'family'}),act:{type:'look',text:"A family photo: Grandma in the middle with all her [grandchildren|внуки] around her. You count them: one, two, three, four."}},
   {id:'clock',name:'clock',art:EA.clock({x:56,y:70,h:4,m:30}),act:{type:'look',text:"An old clock. It's half past four. Grandma will be back soon!"}},
   {id:'door',name:'door',art:EA.door({x:14,y:110,h:170,c:'#7A4C2C'}),act:{type:'need',item:'key',locked:"The front door is locked. Where is Grandma's key?",exit:true}},
   {id:'sofa',name:'sofa',art:EA.sofa({x:104,y:250,w:146,c:'#8E5A7E'}),act:{type:'look',text:"A soft old sofa. Behind the [cushions|подушки] you find… a lost button. Nothing else."}},
   {id:'card',name:'birthday card',art:EA.paper({x:290,y:240,r:6,w:28,h:20,c:'#F8D7E0'}),act:{type:'note',title:'A birthday card',text:"«Happy 75th birthday, dear Grandma! We love you! — Your [grandchildren|внуки]»"}},
   {id:'table',name:'small table',art:EA.table({x:268,y:258,w:74,cloth:'#F4F1EA'}),act:{type:'look',text:"A small round table with a white [tablecloth|скатерть]."}},
   {id:'vase',name:'vase',art:EA.vase({x:300,y:222}),act:{type:'note',title:'A note in the vase',text:"«My dear, the key is in the [chest|сундук] by the sofa. The code is how many grandchildren I have, then my age. — Grandma»"}},
   {id:'chest',name:'chest',art:EA.chest({x:20,y:330,w:72,h:44}),act:{type:'lock',kind:'digits',len:3,answer:'475',prompt:'The chest has a lock with three numbers.',open:{give:'key',text:"The chest opens. Under old letters there is Grandma's front door [key|ключ]."}}},
   {id:'rug',name:'rug',art:EA.rug({x:200,y:370,w:170,c:'#B5652B'}),act:{type:'look',text:"A beautiful [handmade|ручной работы] rug."}}],
  items:{key:{em:'🔑',name:'key',ru:'ключ'}},
  chain:[['vase','Бабушка любит прятать записки в цветах.'],['photo','Сколько внуков на семейном фото?'],['card','Возраст бабушки написан на открытке.'],['chest','4 внука и 75 лет → 475.'],['door','Ключ из сундука открывает дверь.']]},
 {id:'r13',cefr:'A2',title:'The Bathroom',ru:'Ванная',intro:'Дверь ванной заело, нужен ключ из шкафчика. Иногда подсказку видно, только когда идёт пар…',
  bg:{wall:'#D3E9EE',pat:'tiles',floor:'tile',fc:'#E4E7EA',light:'cool',lx:180,ly:20},
  objs:[
   {id:'mirror',name:'mirror',art:EA.mirror({x:146,y:44,w:66,h:92}),act:{type:'need',item:'steam',locked:"A clean round mirror. You see yourself. Nothing else… for now.",text:"The mirror is full of [steam|пар]. Someone drew words on it with a finger: «Cabinet code: 3 + 5 + 2. Write the answer.»"}},
   {id:'cabinet',name:'cabinet',art:EA.wallcab({x:240,y:54,w:90,h:76}),act:{type:'lock',kind:'digits',len:2,answer:'10',prompt:'The bathroom cabinet has a lock with two numbers.',open:{give:'key',text:"The cabinet opens. Next to the [toothpaste|зубная паста] there is a small key."}}},
   {id:'door',name:'door',art:EA.door({x:14,c:'#9FB7CC'}),act:{type:'need',item:'key',locked:"The door is stuck. It needs a key.",exit:true}},
   {id:'sink',name:'sink',art:EA.sink({x:140,y:228}),act:{type:'look',text:"A white sink. The water is cold."}},
   {id:'bath',name:'bath',art:EA.bath({x:200,y:256,w:150}),act:{type:'look',text:"A big bath. There is a note on the [tap|кран]: «Hot water makes [steam|пар]. Steam shows secrets!»"}},
   {id:'tap',name:'hot tap',art:html`<g><circle cx="334" cy="222" r="9" fill="#E74C3C"/><rect x="330" y="230" width="8" height="12" fill="#9AA5B1"/></g>`,act:{type:'use',give:'steam',text:"You turn on the hot water. Soon the room is full of [steam|пар]…"}},
   {id:'towel',name:'towel',art:html`<g><rect x="96" y="150" width="34" height="70" rx="4" fill="#F5B7B1"/><rect x="92" y="146" width="42" height="6" rx="3" fill="#9AA5B1"/></g>`,act:{type:'look',text:"A pink [towel|полотенце]. It's soft and dry."}},
   {id:'duck',name:'rubber duck',art:html`<g><ellipse cx="250" cy="250" rx="12" ry="8" fill="#F1C40F"/><circle cx="258" cy="240" r="7" fill="#F1C40F"/><path d="M264 240 l6 2 l-6 2z" fill="#E67E22"/></g>`,act:{type:'look',text:"A yellow rubber duck. Under it: «Quack! The code is 99». Ducks can't write…"}}],
  items:{key:{em:'🔑',name:'key',ru:'ключ'},steam:{em:'♨️',name:'steam',ru:'пар'}},
  chain:[['bath','Посмотри на ванну — на кране есть записка.'],['tap','Открой горячую воду: пар покажет секрет.'],['mirror','Посмотри в запотевшее зеркало.'],['cabinet','3 + 5 + 2 = 10.'],['door','Ключ из шкафчика открывает дверь.']]},
 {id:'r14',cefr:'B1',title:"The Doctor's Office",ru:'Кабинет врача',intro:'Ты зашёл в кабинет врача, а он ушёл и запер дверь. Ключ — в шкафчике с лекарствами.',
  bg:{wall:'#E8F0EC',pat:'none',floor:'tile',fc:'#CBD5D1',light:'cool',lx:180,ly:20},
  objs:[
   {id:'poster',name:'poster',art:EA.frame({x:110,y:46,w:84,h:70,kind:'poster',text:'WASH|YOUR HANDS|20 seconds'}),act:{type:'look',text:"«Wash your hands for at least 20 seconds!» A good [rule|правило], but not a code."}},
   {id:'medcab',name:'medicine cabinet',art:EA.wallcab({x:220,y:50,w:100,h:74}),act:{type:'lock',kind:'digits',len:3,answer:'237',prompt:'The medicine cabinet has a lock with three numbers.',open:{give:'key',text:"The cabinet opens. Between the [bandages|бинты] there is the door key."}}},
   {id:'door',name:'door',art:EA.door({x:14,c:'#A8C3B8'}),act:{type:'need',item:'key',locked:"The door is locked. The doctor has the key… or does he?",exit:true}},
   {id:'scale',name:'scales',art:EA.scale({x:344,y:290}),act:{type:'look',text:"Medical [scales|весы]. They show 0 kg."}},
   {id:'desk',name:'desk',art:EA.desk({x:100,w:170,c:'#B9C4CC'}),act:{type:'look',text:"The doctor's desk is very tidy."}},
   {id:'pres',name:'prescription',art:EA.paper({x:126,y:216,r:-4,w:30,h:20}),act:{type:'note',title:'A prescription',text:"[Patient|пациент]: Anna Lee\nTake 2 pills 3 times a day for 7 days.\n\n«P.S. Nurse, the cabinet code is the same as these three numbers — in the same order. Dr Smith»"}},
   {id:'computer',name:'computer',art:EA.computer({x:190,y:186}),act:{type:'look',text:"On the screen: «Next [appointment|приём]: Tuesday, 10:30.»"}},
   {id:'bin',name:'bin',art:EA.bin({x:60,y:322}),act:{type:'look',text:"An old prescription in the bin: «Take 1 pill 2 times a day». It's for another patient."}}],
  items:{key:{em:'🔑',name:'key',ru:'ключ'}},
  chain:[['pres','На столе врача лежит рецепт.'],['medcab','2 таблетки, 3 раза в день, 7 дней → 237.'],['door','Ключ из шкафчика открывает дверь.']]},
 {id:'r15',cefr:'B1',title:"The Artist's Studio",ru:'Мастерская художника',intro:'Художница ушла на выставку и заперла мастерскую. Её дневник объясняет, как открыть сундук.',
  bg:{wall:'#F2ECE2',pat:'planks',floor:'wood',fc:'#A47552',light:'window',lx:290,ly:80},
  objs:[
   {id:'window',name:'window',art:EA.win({x:248,y:44,w:84,h:80,cur:'#E8C35A'}),act:{type:'look',text:"Bright [sunlight|солнечный свет] comes through the window. Perfect for painting!"}},
   {id:'p1',name:'painting of the sea',art:EA.frame({x:20,y:52,w:66,h:50,kind:'ship',text:''}),act:{type:'look',text:"A painting of the sea. In the corner: «2019»."}},
   {id:'p2',name:'painting of mountains',art:EA.frame({x:104,y:44,w:66,h:50,kind:'hills'}),act:{type:'look',text:"A painting of mountains. In the corner: «2021»."}},
   {id:'p3',name:'painting of a city',art:EA.frame2({x:184,y:52,w:52,h:50,kind:'city'}),act:{type:'look',text:"A painting of a city at night. In the corner: «2023»."}},
   {id:'door',name:'door',art:EA.door({x:14,y:120,h:160,c:'#7E6BB0'}),act:{type:'need',item:'key',locked:"The studio door is locked.",exit:true}},
   {id:'easel',name:'easel',art:EA.easel({x:110,y:126,kind:'half'}),act:{type:'look',text:"An [unfinished|незаконченная] painting on the [easel|мольберт]. The paint is still wet."}},
   {id:'table',name:'table',art:EA.table({x:210,y:252,w:120}),act:{type:'look',text:"A table covered with [brushes|кисти] and paint."}},
   {id:'diary',name:'diary',art:EA.paper({x:290,y:236,r:5,w:30,h:20,c:'#C9A0DC'}),act:{type:'note',title:"The artist's diary",text:"«I painted the mountains first. A year later, I [finished|закончила] the sea, and my last painting was the city at night. The chest opens with the last [digit|цифра] of each year — in the order I painted them.»"}},
   {id:'palette',name:'palette',art:EA.palette({x:218,y:240}),act:{type:'look',text:"A [palette|палитра] with red, blue, yellow and green paint."}},
   {id:'chest',name:'chest',art:EA.chest({x:236,y:330}),act:{type:'lock',kind:'digits',len:3,answer:'193',prompt:'The chest has a lock with three numbers.',open:{give:'key',text:"The chest opens. On top of old [sketches|наброски] lies the studio key."}}}],
  items:{key:{em:'🔑',name:'key',ru:'ключ'}},
  chain:[['diary','На столе лежит дневник художницы.'],['p2','Найди год на каждой картине.'],['chest','По порядку: горы 2021, море 2019, город 2023 → последние цифры 1, 9, 3 → 193.'],['door','Ключ из сундука открывает дверь.']]},
 {id:'r16',cefr:'B1',title:'The Airport Lounge',ru:'Зал ожидания',intro:'Ты в зале ожидания аэропорта, и дверь к выходам заперта. Объявления меняются — слушай внимательно.',
  bg:{wall:'#DDE5EE',pat:'none',floor:'metal',fc:'#9AA5B1',light:'window',lx:210,ly:80},
  objs:[
   {id:'window',name:'window',art:html`<g>${EA.win({x:150,y:40,w:140,h:96,cur:'#4A6FA5'})}${EA.plane({x:180,y:80})}</g>`,act:{type:'look',text:"A big plane is [taking off|взлетает]. Lucky passengers!"}},
   {id:'board',name:'departures board',art:EA.timetable({x:16,y:40,w:118,h:96,rows:['TOKYO   JL402  12','LONDON  BA117  4','DUBAI   EK31   9','ROME    AZ55   6']}),act:{type:'note',title:'Departures',text:"Tokyo — JL402 — gate 12\nLondon — BA117 — gate 4\nDubai — EK31 — gate 9\nRome — AZ55 — gate 6"}},
   {id:'speaker',name:'speaker',art:EA.speaker({x:316,y:40}),act:{type:'note',title:'An announcement',text:"«[Attention|внимание], please! Passengers on flight JL402: your [gate|выход] has changed. The new gate is your old gate number plus five.»"}},
   {id:'door',name:'gate door',art:EA.door({x:300,y:100,w:54,h:180,c:'#5B6270',sign:'GATE',dark:true}),act:{type:'lock',kind:'digits',len:2,answer:'17',prompt:'The gate door asks: «Enter your gate number».',exit:true}},
   {id:'bench',name:'seats',art:EA.bench({x:40,y:300,w:150}),act:{type:'look',text:"Blue airport seats. Someone left a newspaper about Rome."}},
   {id:'pass',name:'boarding pass',art:EA.paper({x:70,y:262,r:-8,w:34,h:18,c:'#EAF2FF'}),act:{type:'note',title:'Your boarding pass',text:"Passenger: YOU\nFlight: JL402 to Tokyo\nBoarding: 14:20"}},
   {id:'coffee',name:'coffee machine',art:EA.coffee({x:224,y:240}),act:{type:'look',text:"A coffee machine. «Out of order» — of course."}},
   {id:'suitcase',name:'suitcase',art:EA.suitcase({x:214,y:330,c:'#7E6BB0'}),act:{type:'look',text:"Your suitcase. The [label|бирка] says «TOKYO»."}}],
  items:{},
  chain:[['pass','Посмотри на свой посадочный талон на сиденье.'],['board','Найди свой рейс на табло вылетов.'],['speaker','Послушай объявление из динамика.'],['door','Старый выход 12 плюс 5 → 17.']]},
 {id:'r17',cefr:'B2',title:"The Captain's Cabin",ru:'Каюта капитана',intro:'Корабль пиратов стоит у берега, а ты заперт в каюте капитана. Его судовой журнал хранит секрет сундука.',
  bg:{wall:'#7A5434',pat:'planks',floor:'wood',fc:'#5E3A22',light:'lamp',lx:180,ly:200,night:true},
  objs:[
   {id:'port',name:'porthole',art:EA.porthole({x:270,y:90,r:34,night:true}),act:{type:'look',text:"Through the [porthole|иллюминатор] you can see the dark sea and a small island."}},
   {id:'map',name:'map',art:EA.frame({x:86,y:54,w:110,h:72,kind:'map'}),act:{type:'look',text:"A treasure map. A red X marks a spot on the island. Very old, very [mysterious|загадочно]."}},
   {id:'door',name:'door',art:EA.door({x:14,c:'#5E3A22'}),act:{type:'need',item:'key',locked:"A heavy wooden door with an iron lock.",exit:true}},
   {id:'table',name:'table',art:EA.table({x:110,y:254,w:140,c:'#6B4A2E'}),act:{type:'look',text:"The captain's table. It is covered with wax and [scratches|царапины]."}},
   {id:'log',name:'logbook',art:EA.paper({x:150,y:238,r:-3,w:34,h:22,c:'#E8D9A8'}),act:__WD[1333]},
   {id:'candle',name:'candle',art:EA.candle({x:226,y:236}),act:{type:'look',text:"A candle in a [brass|латунный] holder. It's almost [burnt out|догорела]."}},
   {id:'barrel',name:'barrel',art:EA.barrel({x:290,y:292}),act:{type:'look',text:"A barrel of water. Someone scratched «77» on it. Pirates love lies."}},
   {id:'chest',name:'chest',art:EA.chest({x:60,y:330}),act:{type:'lock',kind:'digits',len:2,answer:'22',prompt:'The chest has a lock with two numbers.',open:{give:'key',text:"The chest opens! Gold coins… and a big iron key."}}}],
  items:{key:{em:'🗝️',name:'iron key',ru:'железный ключ'}},
  chain:[['log','Судовой журнал капитана лежит на столе.'],['chest','12 + 7 + 3 = 22 шага.'],['door','Железный ключ открывает дверь каюты.']]},
 {id:'r18',cefr:'B2',title:'The Castle Hall',ru:'Зал замка',intro:'Ты в зале старого замка. Потайная дверь открывается годом — но каким?',
  bg:{wall:'#8C8476',pat:'stone',floor:'tile',fc:'#6E675C',light:'lamp',lx:180,ly:160,night:true},
  objs:[
   {id:'k1',name:'portrait of King Arthur',art:EA.frame2({x:28,y:50,w:56,h:70,kind:'face',c:'#E8C9A0'}),act:{type:'look',text:"A [portrait|портрет] of King Arthur. The plate says: «Ruled from 1201 to 1230.»"}},
   {id:'k2',name:'portrait of Queen Mary',art:EA.frame2({x:152,y:44,w:56,h:70,kind:'face',c:'#F2D5C4'}),act:{type:'look',text:"A portrait of Queen Mary. The plate says: «Ruled from 1230 to 1272.»"}},
   {id:'k3',name:'portrait of King Edward',art:EA.frame2({x:276,y:50,w:56,h:70,kind:'face',c:'#DDB99A'}),act:{type:'look',text:"A portrait of King Edward. The plate says: «Ruled from 1272 to 1290.»"}},
   {id:'shield',name:'shield',art:EA.shield({x:180,y:150}),act:{type:'look',text:"A royal [shield|щит] with two swords. Very heavy."}},
   {id:'scroll',name:'scroll',art:EA.paper({x:50,y:252,r:-6,w:34,h:22,c:'#E8D9A8'}),act:{type:'note',title:'An old scroll',text:"«The [secret|потайная] door opens with the year in which the [ruler|правитель] who ruled the longest was [crowned|коронован]. Count the years carefully, [traveller|путник].»"}},
   {id:'table',name:'table',art:EA.table({x:30,y:268,w:90,c:'#5E3A22'}),act:{type:'look',text:"A long wooden table for royal [feasts|пиры]."}},
   {id:'candle',name:'candles',art:html`<g>${EA.candle({x:290,y:236})}${EA.candle({x:310,y:230})}</g>`,act:{type:'look',text:"Tall candles. Their light makes long [shadows|тени] on the walls."}},
   {id:'door',name:'secret door',art:html`<g><rect x="250" y="160" width="90" height="120" fill="rgba(0,0,0,.12)" stroke="rgba(0,0,0,.25)" stroke-dasharray="4 4"/><circle cx="330" cy="222" r="4" fill="#5B6270"/></g>`,act:{type:'lock',kind:'digits',len:4,answer:'1230',prompt:'A stone with four number wheels is hidden in the wall.',exit:true}}],
  items:{},
  chain:[['scroll','На столе лежит старый свиток.'],['k2','Посмотри на таблички под портретами и посчитай годы правления.'],['door','Дольше всех правила королева Мэри (42 года) — её короновали в 1230.']]},
 {id:'r19',cefr:'B2',title:'The Space Station',ru:'Космическая станция',intro:'Ты на орбитальной станции. Чтобы выйти в шлюз, нужен скафандр из шкафчика — но система безопасности задаёт условия.',
  bg:{wall:'#C9D3DD',pat:'tiles',floor:'metal',fc:'#6E7A87',light:'cool',lx:250,ly:80},
  objs:[
   {id:'window',name:'window',art:html`<g><circle cx="250" cy="90" r="54" fill="#9AA5B1"/><circle cx="250" cy="90" r="46" fill="#05070F"/><circle cx="230" cy="70" r="1.5" fill="#fff"/><circle cx="276" cy="64" r="1" fill="#fff"/><circle cx="222" cy="108" r="1" fill="#fff"/><circle cx="262" cy="108" r="26" fill="#3E7CB1"/><path d="M246 98 q10 -8 18 2 q-4 10 -16 6z M266 116 q8 -2 10 6 q-6 4 -10 -6z" fill="#4E9A55"/><circle cx="262" cy="108" r="26" fill="none" stroke="rgba(160,210,255,.5)" stroke-width="3"/></g>`,act:{type:'look',text:"The Earth looks blue and beautiful from here."}},
   {id:'panel',name:'oxygen panel',art:EA.screen({x:20,y:48,w:120,h:64,lines:['OXYGEN  94%','TEMP    21C','POWER   OK']}),act:{type:'look',text:"OXYGEN: 94 %\nTEMPERATURE: 21 °C\nPOWER: OK"}},
   {id:'rules',name:'safety rules',art:EA.frame({x:20,y:140,w:96,h:60,kind:'poster',text:'SAFETY|RULES'}),act:{type:'note',title:'Safety rules',text:"«If the [oxygen|кислород] level is below 90 %, the locker code is 000 and the locker stays closed. Otherwise, the code is the station's [altitude|высота] in kilometres.»"}},
   {id:'info',name:'station info',art:EA.frame({x:150,y:150,w:80,h:50,kind:'poster',text:'STATION|408 km'}),act:{type:'look',text:"«Our station [orbits|вращается] the Earth at an altitude of 408 km.»"}},
   {id:'locker',name:'locker',art:EA.locker({x:300,y:140,w:52,h:140}),act:{type:'lock',kind:'digits',len:3,answer:'408',prompt:'The suit locker has a lock with three numbers.',open:{give:'suit',text:"The locker opens. Inside there is a white space [suit|скафандр]."}}},
   {id:'door',name:'airlock',art:html`<g><rect x="150" y="214" width="120" height="70" rx="10" fill="#5B6270"/><rect x="160" y="222" width="100" height="54" rx="8" fill="#8A929E"/><text x="210" y="254" text-anchor="middle" font-size="10" font-weight="800" fill="#FFD36B">AIRLOCK</text></g>`,act:{type:'need',item:'suit',locked:"The [airlock|шлюз] won't open without a space suit.",exit:true}},
   {id:'tablet',name:'tablet',art:html`<g><rect x="40" y="320" width="54" height="36" rx="5" fill="#2E3238"/><rect x="44" y="324" width="46" height="28" fill="#13314A"/></g>`,act:{type:'look',text:"A message on the tablet: «Remember: the locker code is NOT the temperature!»"}}],
  items:{suit:{em:'🧑‍🚀',name:'space suit',ru:'скафандр'}},
  chain:[['rules','Правила безопасности висят на стене.'],['panel','Проверь уровень кислорода на панели.'],['info','Высота станции написана на табличке.'],['locker','Кислород 94 % (больше 90) → код = высота 408.'],['door','Со скафандром можно выйти в шлюз.']]},
 {id:'r20',cefr:'B2',title:'The Bank Vault',ru:'Банковское хранилище',intro:'Финал! Ты заперт в банковском хранилище. Код недавно сменили — найди старый и разберись, как его изменили.',
  bg:{wall:'#B8BEC6',pat:'panels',floor:'metal',fc:'#5B6270',light:'lamp',lx:180,ly:20},
  objs:[
   {id:'vault',name:'vault door',art:EA.vault({x:250,y:150,r:68}),act:{type:'lock',kind:'digits',len:4,answer:'4096',prompt:'The vault door has a lock with four numbers.',exit:true}},
   {id:'clock',name:'clock',art:EA.clock({x:70,y:60,h:6}),act:{type:'look',text:"Six o'clock. The bank is closed now."}},
   {id:'desk',name:'desk',art:EA.desk({x:20,y:240,w:130,c:'#6B4A2E'}),act:{type:'look',text:"The [manager's|управляющего] desk. Very expensive wood."}},
   {id:'memo',name:'memo',art:EA.paper({x:40,y:224,r:-4,w:32,h:20}),act:{type:'note',title:'A memo',text:"«To all staff: for security reasons, the vault code was changed on Friday. The new code is the old one [multiplied|умноженный] by two. The old code can be found in the [archive|архив]. — The Manager»"}},
   {id:'filecab',name:'archive cabinet',art:EA.filecab({x:120,y:206}),act:{type:'note',title:'The archive',text:"In the top drawer there is an old card: «Vault code: 2048. [Valid|действителен] until Friday.»"}},
   {id:'computer',name:'computer',art:EA.computer({x:60,y:180}),act:{type:'look',text:"The screen says: «Access denied.» Someone tried 1024 three times."}},
   {id:'cart',name:'money cart',art:html`<g><rect x="240" y="300" width="90" height="40" rx="4" fill="#9AA5B1"/>${[0,1,2].map(i=>html`<rect key=${i} x=${248+i*26} y="288" width="22" height="14" fill="#4E9A55" stroke="#2E7D32"/>`)}<circle cx="252" cy="346" r="6" fill="#2E3238"/><circle cx="318" cy="346" r="6" fill="#2E3238"/></g>`,act:{type:'look',text:"A cart with money. Don't even think about it!"}}],
  items:{},
  chain:[['memo','На столе лежит служебная записка управляющего.'],['filecab','Старый код хранится в архиве (шкаф с ящиками).'],['vault','2048 × 2 = 4096.']]}
);
(()=>{ const L={r1:{light:'window',lx:258,ly:90},r2:{light:'window',lx:268,ly:76},r3:{light:'lamp',lx:180,ly:20},r4:{light:'lamp',lx:246,ly:222},r5:{light:'lamp',lx:180,ly:40,night:true},r6:{light:'lamp',lx:240,ly:30},r7:{light:'window',lx:174,ly:87},r8:{light:'lamp',lx:180,ly:20},r9:{light:'cool',lx:180,ly:20},r10:{light:'cool',lx:180,ly:20}};
  ESC_ROOMS.forEach(r=>{ if(L[r.id]) r.bg={...r.bg,...L[r.id]}; }); })();

function EscGloss({text}){ const [open,setOpen]=useState({});
  return html`<div className="esc-text">${String(text).split('\n').map((line,li)=>html`<p key=${li}>${line.split(/(\[[^\]]+\])/).map((part,pi)=>{ const m=part.match(/^\[([^|\]]+)\|([^\]]+)\]$/); if(!m) return part; const k=li+':'+pi;
    return html`<button key=${pi} className=${'esc-gl'+(open[k]?' on':'')} onClick=${()=>{ SFX('tap'); setOpen(o=>({...o,[k]:!o[k]})); }}>${m[1]}${open[k]?html`<small>${m[2]}</small>`:null}</button>`; })}</p>`)}</div>`; }
function EscLock({act,onTry}){ const [d,setD]=useState(()=>Array(act.len||0).fill(0)); const [w,setW]=useState(''); const [sh,setSh]=useState(0);
  const tryIt=v=>{ if(!onTry(v)){ setSh(x=>x+1); } };
  if(act.kind==='digits') return html`<div className=${'esc-lock'+(sh?' shake'+(sh%2):'')}><div className="esc-dials">${d.map((v,i)=>html`<div key=${i} className="esc-dial"><button aria-label="Больше" onClick=${()=>{ SFX('tap'); setD(a=>a.map((x,j)=>j===i?(x+1)%10:x)); }}>▲</button><b>${v}</b><button aria-label="Меньше" onClick=${()=>{ SFX('tap'); setD(a=>a.map((x,j)=>j===i?(x+9)%10:x)); }}>▼</button></div>`)}</div>
    <button className="btn" id="esc-try" onClick=${()=>tryIt(d.join(''))}>Открыть</button></div>`;
  if(act.kind==='word') return html`<form className=${'esc-lock'+(sh?' shake'+(sh%2):'')} onSubmit=${e=>{ e.preventDefault(); tryIt(w.trim().toLowerCase()); }}><input id="esc-word" className="esc-input" value=${w} onInput=${e=>setW(e.target.value)} placeholder="password" autocomplete="off" autocapitalize="characters" spellcheck="false"/><button className="btn" id="esc-try">Ввести</button></form>`;
  return html`<div className=${'esc-lock esc-choice'+(sh?' shake'+(sh%2):'')}>${act.options.map(o=>html`<button key=${o} className="btn ghost" onClick=${()=>tryIt(o)}>${o}</button>`)}</div>`;
}

function EscapeGame({st,update,onExit}){
  const es=st.esc||{}, done=es.done||{};
  const [rid,setRid]=useState(null); const [sheet,setSheet]=useState(null); const [msg,setMsg]=useState(null); const [win,setWin]=useState(null); const [now,setNow]=useState(Date.now()); const [hl,setHl]=useState(null); const [tip,setTip]=useState(null);
  const room=ESC_ROOMS.find(r=>r.id===rid);
  const rs=room?((es.cur||{})[room.id]||null):null;
  const hlT=useRef(null); useEffect(()=>()=>clearTimeout(hlT.current),[]);
  const svgRef=useRef(null); const [shadows,setShadows]=useState([]);
  useEffect(()=>{ setShadows([]); if(!rid) return; const t=setTimeout(()=>{ const sv=svgRef.current; if(!sv) return; const out=[];
    sv.querySelectorAll('.esc-g').forEach(g=>{ try{ const b=g.getBBox(), bot=b.y+b.height; if(bot>=286&&b.height>18) out.push({cx:b.x+b.width/2,cy:Math.min(414,bot-1),rx:b.width*.55,ry:Math.max(4,Math.min(12,b.width*.07))}); }catch(e){} }); setShadows(out); },60);
    return ()=>clearTimeout(t); },[rid,!!win]);
  useEffect(()=>{ const t=setTimeout(()=>W('goTo','card',{frac:.9}),200); return ()=>clearTimeout(t); },[rid,!!win]);
  useEffect(()=>{ if(!room||win) return; const t=setInterval(()=>setNow(Date.now()),1000); return ()=>clearInterval(t); },[rid,!!win]);
  const setRS=f=>update(s=>{ const e=s.esc||{}, c=(e.cur||{})[rid]||{inv:[],open:{},seen:{},hints:0,t0:Date.now()}; return {esc:{...e,cur:{...(e.cur||{}),[rid]:{...c,...f(c)}}}}; });
  const openRoom=r=>{ SFX('pop'); setRid(r.id); setSheet(null); setWin(null); setTip(null); setHl(null); window.scrollTo({top:0});
    update(s=>{ const e=s.esc||{}; if((e.cur||{})[r.id]) return {}; return {esc:{...e,cur:{...(e.cur||{}),[r.id]:{inv:[],open:{},seen:{},hints:0,t0:Date.now()}}}}; });
    W('react','think'); W('say','Осмотрись. Что здесь можно открыть?',0,true); };
  const escape=()=>{ const c=rs||{}, secs=Math.round((Date.now()-(c.t0||Date.now()))/1000), hn=c.hints||0, stars=hn===0&&secs<360?3:hn<=2?2:1, coins=40+stars*15;
    update(s=>{ const e=s.esc||{}, cur={...(e.cur||{})}; delete cur[rid]; const prev=(e.done||{})[rid];
      return {coins:s.coins+coins,xp:s.xp+coins,...gDay(s),esc:{...e,cur,done:{...(e.done||{}),[rid]:{stars:Math.max(stars,prev?prev.stars:0),time:prev&&prev.time<secs?prev.time:secs}}}}; });
    setSheet(null); setTip(null); setWin({secs,stars,coins,hints:hn}); SFX('fanfare'); FX('rain',100); W('react','cheer'); W('say','Свобода! Мы выбрались!',0,true); };
  if(!room) return html`<section>
    <div className="sess-top"><button className="icon-btn" id="esc-close" onClick=${()=>{ SFX('tap'); onExit(); }} aria-label="Закрыть">${I.close()}</button><span className="phase">Побег из комнаты</span></div>
    <div className="esc-intro" data-perch="card"><b>Выберись из комнаты</b><p>Осматривай всё вокруг: открывай ящики, заглядывай под вещи, читай английские записки и находи коды. Непонятное слово — нажми на него. Застрял — кнопка «Подсказка» подсветит нужный предмет.</p></div>
    <div className="esc-rooms">${ESC_ROOMS.map((r,i)=>{ const d=done[r.id], locked=i>0&&!done[ESC_ROOMS[i-1].id], inProg=(es.cur||{})[r.id];
      return html`<button key=${r.id} id=${'esc-r-'+r.id} className=${'esc-room'+(d?' done':'')} disabled=${locked} onClick=${()=>openRoom(r)}>
        <span className="esc-rn">${locked?I.lock():i+1}</span><span className="esc-rm"><b>${r.title}</b><small>${r.ru} · ${r.cefr}</small></span>
        <span className="esc-rs">${d?html`<span className="esc-stars">${[0,1,2].map(k=>html`<i key=${k} className=${k<d.stars?'on':''}>★</i>`)}</span><small>${Math.floor(d.time/60)}:${pad(d.time%60)}</small>`:inProg?html`<small className="esc-prog">в процессе</small>`:locked?html`<small>пройди предыдущую</small>`:html`<small className="esc-go">Войти</small>`}</span></button>`; })}</div>
  </section>`;
  const isDone=id=>{ const o=room.objs.find(x=>x.id===id); if(!o||!rs) return false; const t=o.act.type; return t==='note'||t==='look'?!!rs.seen[id]:!!rs.open[id]; };
  const nextStep=rs?room.chain.find(([id])=>!isDone(id)):null;
  const hcost=rs&&(rs.hints||0)>0?10:0;
  const hint=()=>{ if(!nextStep) return; if(st.coins<hcost){ SFX('wrong'); W('react','think'); W('say','Не хватает монет на подсказку.',0,true); return; }
    SFX('pop'); if(hcost) update(s=>({coins:s.coins-hcost})); setRS(c=>({hints:(c.hints||0)+1})); setHl(nextStep[0]); setTip(nextStep[1]); clearTimeout(hlT.current); hlT.current=setTimeout(()=>setHl(null),5000); W('react','nod'); };
  const head=html`<div className="sess-top"><button className="icon-btn" id="esc-back" onClick=${()=>{ SFX('tap'); setRid(null); setWin(null); }} aria-label="К комнатам">${I.back()}</button><span className="phase" style=${{flex:1}}>${room.title}</span>
    ${!win&&rs?html`<span className="esc-time">${(()=>{ const s=Math.max(0,Math.round((now-rs.t0)/1000)); return Math.floor(s/60)+':'+pad(s%60); })()}</span>
      <button className="esc-hbtn" id="esc-hint" onClick=${hint} disabled=${!nextStep}><span aria-hidden="true">💡</span><b>Подсказка</b><small>${hcost?html`${I.coin()}${hcost}`:'бесплатно'}</small></button>`:null}</div>`;
  if(win) return html`<section>${head}<${GameWin} tone="accent" kicker=${'Побег из комнаты · '+room.cefr} title="Ты выбрался!" big=${Math.floor(win.secs/60)+':'+pad(win.secs%60)} bigLabel="время" stars=${win.stars} coins=${win.coins} xp=${win.coins}
      stats=${[[win.hints,plural(win.hints,'подсказка','подсказки','подсказок')],[Object.keys(done).length,plural(Object.keys(done).length,'комната пройдена','комнаты пройдено','комнат пройдено')],[ESC_ROOMS.length,'комнат всего']]}
      actions=${html`<button className="btn ghost" onClick=${()=>{ SFX('tap'); setRid(null); setWin(null); }}>К комнатам</button>${(()=>{ const i=ESC_ROOMS.findIndex(r=>r.id===room.id), nx=ESC_ROOMS[i+1]; return nx?html`<button className="btn" id="esc-next" onClick=${()=>openRoom(nx)}>Следующая комната</button>`:null; })()}`}>
      <p className="gw-next">${win.stars===3?'Без подсказок и быстрее шести минут!':'Три звезды — без подсказок и быстрее шести минут.'}</p>
    <//></section>`;
  if(!rs) return html`<section>${head}<p className="empty">Открываю комнату…</p></section>`;
  const o=sheet&&room.objs.find(x=>x.id===sheet), a=o&&o.act, opened=o&&rs.open[o.id];
  const tap=ob=>{ SFX('tap'); setMsg(null); setSheet(ob.id); if(hl===ob.id){ setHl(null); } if(ob.act.type==='note'||ob.act.type==='look') setRS(c=>({seen:{...c.seen,[ob.id]:1}})); if(ob.act.type==='note') W('react','think');
    if(ob.act.type==='use'&&!rs.open[ob.id]){ SFX('whoosh'); setRS(c=>({open:{...c.open,[ob.id]:1},inv:ob.act.give&&!c.inv.includes(ob.act.give)?[...c.inv,ob.act.give]:c.inv})); W('react','happy'); } };
  const tryLock=v=>{ if(String(v).toLowerCase()===String(a.answer).toLowerCase()){ SFX('unlock'); W('react','cheer');
      if(a.exit){ setMsg({ok:true,t:'Замок щёлкнул!'}); setTimeout(escape,600); return true; }
      setRS(c=>({open:{...c.open,[o.id]:1},inv:a.open&&a.open.give&&!c.inv.includes(a.open.give)?[...c.inv,a.open.give]:c.inv})); setTip(null); W('say','Открылось!'); return true; }
    SFX('keyerr'); W('react','encourage'); setMsg({ok:false,t:a.kind==='choice'?'Нет, этот человек говорит правду. Перечитай улики.':'Не подходит. Перечитай подсказки.'}); return false; };
  const useNeed=()=>{ if(!rs.inv.includes(a.item)) return; SFX('unlock');
    if(a.exit){ setMsg({ok:true,t:'Подошло!'}); setTimeout(escape,600); return; }
    setRS(c=>({open:{...c.open,[o.id]:1}})); setTip(null); W('react','happy'); };
  return html`<section className="esc">${head}
    <div className="esc-scene" data-perch="card">
      <svg ref=${svgRef} viewBox="0 0 360 420" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${room.title}>
        ${ESC_BG(room.bg,room.id)}
        <g className="esc-shadows" pointer-events="none">${shadows.map((sh,i)=>html`<ellipse key=${i} cx=${sh.cx} cy=${sh.cy} rx=${sh.rx} ry=${sh.ry} fill="#000" opacity=".22"/>`)}</g>
        ${room.objs.map(ob=>html`<g key=${ob.id} id=${'esc-o-'+ob.id} className=${'esc-g'+(hl===ob.id?' hl':'')+(rs.open[ob.id]?' opened':'')} role="button" tabIndex="0" aria-label=${ob.name} onClick=${()=>tap(ob)} onKeyDown=${e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); tap(ob); } }}>${ob.art}</g>`)}
        ${ESC_FX(room.bg,room.id)}
      </svg>
    </div>
    ${tip?html`<div className="esc-tipbar enter" role="status"><span aria-hidden="true">💡</span><span>${tip}</span><button className="esc-tipx" aria-label="Скрыть" onClick=${()=>setTip(null)}>×</button></div>`:null}
    <div className="esc-bar"><div className="esc-inv"><small>Инвентарь</small>${rs.inv.length?rs.inv.map(k=>{ const it=room.items[k]; return it?html`<span key=${k} className="esc-item" title=${it.ru}><i aria-hidden="true">${it.em}</i>${it.name}</span>`:null; }):html`<span className="muted esc-empty">пусто</span>`}</div></div>
    <p className="esc-tip">${room.intro}</p>
    ${o?html`<div className="esc-sheet-wrap" onClick=${()=>setSheet(null)}><div className="esc-sheet enter" role="dialog" aria-modal="true" aria-label=${o.name} onClick=${e=>e.stopPropagation()}>
      <div className="esc-sh-h"><b>${a.title||o.name.charAt(0).toUpperCase()+o.name.slice(1)}</b><button className="icon-btn" id="esc-sh-close" onClick=${()=>setSheet(null)} aria-label="Закрыть">${I.close()}</button></div>
      ${a.type==='note'||a.type==='look'||a.type==='use'?html`<${EscGloss} text=${a.text}/>`:null}
      ${a.type==='lock'?(opened?html`<${EscGloss} text=${a.open.text}/>`:html`<p className="esc-prompt">${a.prompt}</p><${EscLock} act=${a} onTry=${tryLock}/>`):null}
      ${a.type==='need'?(opened?html`<${EscGloss} text=${a.text}/>`:html`<${EscGloss} text=${a.locked}/>${rs.inv.includes(a.item)?html`<button className="btn" id="esc-use" onClick=${useNeed}>Использовать: ${room.items[a.item].name}</button>`:null}`):null}
      ${msg?html`<p className=${'esc-msg '+(msg.ok?'ok':'bad')}>${msg.t}</p>`:null}
      ${a.type!=='lock'||opened?html`<p className="esc-note-tip">Нажми на подчёркнутое слово, чтобы увидеть перевод.</p>`:null}
    </div></div>`:null}
  </section>`;
}

/* ---- «Раннер»: Wordy runs, jump through the right gate ---- */
const RN_SPEED={easy:{name:'Спокойно',v0:210,acc:3,max:360,crates:.5},normal:{name:'Быстро',v0:260,acc:5,max:460,crates:.8},hard:{name:'Безумно',v0:330,acc:7,max:600,crates:1}};
function RunnerGame({st,update,onExit,active}){
  const rd=(k,v)=>{ try{ return localStorage.getItem(k)||v; }catch(e){ return v; } };
  const [phase,setPhase]=useState('menu'); const [lv,setLv]=useState(()=>rd('wordy.rnlv',st.level&&CW_LV.includes(st.level)?st.level:'A2')); const [spd,setSpd]=useState(()=>rd('wordy.rnspd','normal'));
  const [hud,setHud]=useState({score:0,lives:3,dist:0}); const [q,setQ]=useState(null); const [fb,setFb]=useState(null); const [res,setRes]=useState(null);
  const box=useRef(null), cv=useRef(null), E=useRef(null), fbT=useRef(null);
  const rn=st.rn||{};
  useEffect(()=>{ try{ localStorage.setItem('wordy.rnlv',lv); localStorage.setItem('wordy.rnspd',spd); }catch(e){} },[lv,spd]);
  useEffect(()=>{ const on=phase==='play'||phase==='pause'; document.body.classList.toggle('in-game',on); if(!on){ const t=setTimeout(()=>W('goTo','card',{frac:.88}),150); return ()=>clearTimeout(t); } },[phase]);
  useEffect(()=>()=>{ document.body.classList.remove('in-game'); clearTimeout(fbT.current); const e=E.current; if(e){ e.stop=true; cancelAnimationFrame(e.raf); } },[]);
  const showFb=f=>{ setFb({...f,k:Date.now()}); clearTimeout(fbT.current); fbT.current=setTimeout(()=>setFb(null),1800); };
  const start=()=>{ SFX('pop'); setRes(null); setQ(null); setFb(null); setHud({score:0,lives:3,dist:0}); if(E.current) E.current.dead=true; setPhase('play'); window.scrollTo({top:0}); };
  const jump=()=>{ const e=E.current; if(e&&!e.stop) e.jump(); };
  useEffect(()=>{ if(phase!=='play'||!active) return; const f=ev=>{ const t=ev.target; if(t&&t.closest&&t.closest('input,textarea')) return; if(ev.key===' '||ev.key==='ArrowUp'||ev.key==='w'||ev.key==='W'){ ev.preventDefault(); jump(); } };
    addEventListener('keydown',f); return ()=>removeEventListener('keydown',f); },[phase,active]);
  useEffect(()=>{ if(phase!=='play') return; const C=cv.current, B=box.current; if(!C||!B) return; const ctx=C.getContext('2d');
    const dark=document.documentElement.dataset.theme==='dark'||(document.documentElement.dataset.theme!=='light'&&matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);
    const RM=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    let Wd=0,H=0,G=0; const size=()=>{ const dpr=Math.min(2,window.devicePixelRatio||1); Wd=B.clientWidth; H=B.clientHeight; C.width=Wd*dpr; C.height=H*dpr; C.style.width=Wd+'px'; C.style.height=H+'px'; ctx.setTransform(dpr,0,0,dpr,0,0); G=H-64; }; size();
    const ro=window.ResizeObserver?new ResizeObserver(size):null; ro&&ro.observe(B);
    const S=RN_SPEED[spd]||RN_SPEED.normal, topics=CW_TOPICS.filter(t=>lv==='all'||t.cefr===lv);
    let e=E.current;
    if(!e||e.dead){ e=E.current={y:0,vy:0,jumps:0,onG:true,v:S.v0,dist:0,score:0,lives:3,coins:0,ok:0,bad:0,ents:[],nextGate:900,nextObs:420,t:0,inv:0,log:[],stop:false,dead:false,phase:0,shake:0,flash:null,plat:null}; }
    e.stop=false; let last=performance.now();
    const PX=()=>Math.max(70,Wd*.22), PR=20;
    e.jump=()=>{ if(e.jumps<2){ e.vy=e.jumps?-640:-760; e.jumps++; e.onG=false; e.plat=null; SFX('jump'); } };
    const mkGate=x=>{ const t=pick(topics.length?topics:CW_TOPICS), g=t.good[Math.floor(Math.random()*t.good.length)], braw=t.bad[Math.floor(Math.random()*t.bad.length)], b=Array.isArray(braw)?braw[0]:braw, fix=Array.isArray(braw)?braw[1]:t.note||'';
      const up=Math.random()<.5; return {type:'gate',x,topic:t,top:up?{t:g,good:true}:{t:b,good:false,fix},bot:up?{t:b,good:false,fix}:{t:g,good:true},asked:false,done:false,pl0:x-300,pl1:x+70}; };
    const spawnAhead=()=>{ const far=e.dist+Wd+400;
      while(e.nextGate<far){ e.ents.push(mkGate(e.nextGate)); e.nextGate+=Math.max(1100,1700-e.dist*.02)+Math.random()*300; }
      while(e.nextObs<far){ const x=e.nextObs, nearGate=e.ents.some(en=>en.type==='gate'&&x>en.pl0-140&&x<en.pl1+120);
        if(!nearGate){ if(Math.random()<S.crates*.55) e.ents.push({type:'crate',x,w:34,h:34,hit:false}); else { const n=3+Math.floor(Math.random()*3), arc=Math.random()<.5; for(let i=0;i<n;i++) e.ents.push({type:'coin',x:x+i*34,y:arc?-60-Math.sin(i/(n-1)*Math.PI)*60:-22,got:false}); } }
        e.nextObs+=260+Math.random()*320; } };
    const lose=(why)=>{ e.lives--; e.inv=1.1; e.shake=.35; setHud(h=>({...h,lives:e.lives})); SFX(why==='crate'?'shield':'wrong'); if(e.lives<=0) end(); };
    const end=()=>{ e.stop=true; e.dead=true; cancelAnimationFrame(e.raf); const sc=e.score, coins=Math.min(80,Math.floor(sc/8)+e.coins), dist=Math.round(e.dist/10), prev=rn.best||0;
      update(s=>{ const o=s.rn||{}; return {coins:s.coins+coins,xp:s.xp+Math.round(sc/2),...(sc>0?gDay(s):{}),rn:{...o,games:(o.games||0)+1,best:Math.max(o.best||0,sc),bestDist:Math.max(o.bestDist||0,dist)}}; });
      setTimeout(()=>{ setQ(null); setFb(null); setRes({score:sc,coins,dist,ok:e.ok,bad:e.bad,picked:e.coins,log:e.log.slice(0,12),record:sc>prev&&sc>0}); setPhase('over');
        W('react',sc>prev&&sc>0?'cheer':'encourage'); W('say',sc>prev&&sc>0?'Новый рекорд забега!':'Уф, запыхался! Ещё забег?',0,true); },700); };
    const pal=dark?{s1:'#14203A',s2:'#2A3A5C',h1:'#1E2C46',h2:'#253556',gr:'#2F5A3A',gt:'#3F7A4C',dirt:'#3A2A20',txt:'#F3EEE6'}:{s1:'#FFD9B8',s2:'#FFF2E0',h1:'#F6C2A2',h2:'#E9A27E',gr:'#7CBF5A',gt:'#5FA845',dirt:'#A0663F',txt:'#2B1B12'};
    const rr=(x,y,w,h,r)=>{ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); };
    const sign=(cx,cy,text,col)=>{ ctx.font='800 15px system-ui,sans-serif'; const w=Math.max(64,ctx.measureText(text).width+22); rr(cx-w/2,cy-15,w,30,9); ctx.fillStyle=col||'#FFFDF7'; ctx.fill(); ctx.strokeStyle='rgba(0,0,0,.25)'; ctx.lineWidth=2; ctx.stroke(); ctx.fillStyle='#2B1B12'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(text,cx,cy+1); return w; };
    const drawWordy=(x,y)=>{ const air=!e.onG, ph=e.phase, bob=air?0:Math.abs(Math.sin(ph))*3;
      ctx.save(); if(e.inv>0&&Math.floor(e.inv*10)%2) ctx.globalAlpha=.45;
      ctx.fillStyle='rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x,(e.plat?e.plat.y:G)+2,18*(air?.6:1),4,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='#FF7A12'; ctx.lineWidth=8; ctx.lineCap='round';
      const legA=air?.9:Math.sin(ph)*.9, legB=air?-.3:-Math.sin(ph)*.9;
      [[-7,legA],[7,legB]].forEach(([dx,a])=>{ ctx.beginPath(); ctx.moveTo(x+dx,y-16-bob); ctx.lineTo(x+dx+Math.sin(a)*12,y-2-bob+(air?-6:0)-Math.abs(Math.cos(a))*0); ctx.stroke(); });
      ctx.fillStyle='#FF7A12'; ctx.beginPath(); ctx.arc(x,y-34-bob,PR,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#E5600A'; ctx.globalAlpha*=.35; ctx.beginPath(); ctx.arc(x,y-30-bob,PR,.15*Math.PI,.85*Math.PI); ctx.fill(); ctx.globalAlpha=e.inv>0&&Math.floor(e.inv*10)%2?.45:1;
      ctx.strokeStyle='#FF7A12'; ctx.lineWidth=6; const arm=air?-1.2:Math.sin(ph+Math.PI)*.8; ctx.beginPath(); ctx.moveTo(x-16,y-34-bob); ctx.lineTo(x-26,y-34-bob+Math.cos(arm)*10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x+16,y-34-bob); ctx.lineTo(x+26,y-34-bob-Math.cos(arm)*10); ctx.stroke();
      ctx.fillStyle='#fff'; [[5,-40],[13,-40]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.ellipse(x+dx,y+dy-bob,4.5,6,0,0,Math.PI*2); ctx.fill(); });
      ctx.fillStyle='#24130A'; [[6.5,-39],[14.5,-39]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.arc(x+dx,y+dy-bob,2.4,0,Math.PI*2); ctx.fill(); });
      ctx.strokeStyle='#24130A'; ctx.lineWidth=2; ctx.beginPath(); if(e.inv>.6) ctx.arc(x+10,y-24-bob,4,1.15*Math.PI,1.85*Math.PI); else ctx.arc(x+10,y-29-bob,4,.15*Math.PI,.85*Math.PI); ctx.stroke();
      ctx.restore(); };
    const loop=now=>{ if(e.stop) return; const dt=Math.min(.033,(now-last)/1000); last=now; e.t+=dt;
      e.v=Math.min(S.max,e.v+S.acc*dt); e.dist+=e.v*dt; e.phase+=dt*e.v/22; if(e.inv>0) e.inv-=dt; if(e.shake>0) e.shake-=dt;
      spawnAhead();
      const px=PX(), wx=e.dist+px;
      // physics
      e.vy+=2100*dt; let ny=e.y+e.vy*dt;
      let floor=0; e.plat=null;
      for(const en of e.ents) if(en.type==='gate'&&wx>en.pl0&&wx<en.pl1){ const py=-130; if(e.y<=py+1&&ny>=py&&e.vy>=0){ floor=py; e.plat={y:G+py}; } else if(Math.abs(e.y-py)<1&&e.vy>=0){ floor=py; e.plat={y:G+py}; } }
      if(ny>=floor){ ny=floor; e.vy=0; e.onG=true; e.jumps=0; } else e.onG=false;
      if(floor===-130&&ny===floor) e.plat={y:G-130};
      e.y=ny;
      // entities
      for(const en of e.ents){
        if(en.type==='gate'){
          if(!en.asked&&en.x-wx<Wd*.95){ en.asked=true; setQ({t:en.topic.name,k:en.x}); }
          if(!en.done&&wx>=en.x){ en.done=true; const lane=e.y<-60?'top':'bot', ch=en[lane];
            if(ch.good){ e.ok++; e.score+=20; setHud(h=>({...h,score:e.score})); SFX('correct'); e.flash={c:'rgba(31,138,91,.25)',t:.3}; showFb({kind:'ok',text:ch.t}); }
            else { e.bad++; const good=(lane==='top'?en.bot:en.top).t; e.log.push({bad:ch.t,good,fix:ch.fix,topic:en.topic.name}); showFb({kind:'bad',text:ch.t,good,fix:ch.fix}); e.flash={c:'rgba(216,58,58,.28)',t:.35}; lose('gate'); if(e.stop) return; }
            setTimeout(()=>setQ(cur=>cur&&cur.k===en.x?null:cur),400); } }
        else if(en.type==='crate'&&!en.hit){ const sx=en.x-e.dist; if(sx>px-PR-en.w/2-4&&sx<px+PR+en.w/2-14&&e.y>-en.h+6&&e.inv<=0){ en.hit=true; lose('crate'); if(e.stop) return; } }
        else if(en.type==='coin'&&!en.got){ const sx=en.x-e.dist; if(Math.abs(sx-px)<24&&Math.abs((e.y-34)-en.y)<30){ en.got=true; e.coins++; e.score+=5; setHud(h=>({...h,score:e.score})); SFX('coin'); } } }
      e.ents=e.ents.filter(en=>(en.type==='gate'?en.pl1:en.x+60)-e.dist>-80);
      const d=Math.round(e.dist/10); if(d%5===0) setHud(h=>h.dist===d?h:{...h,dist:d});
      // draw
      ctx.save(); if(e.shake>0&&!RM) ctx.translate((Math.random()-.5)*8,(Math.random()-.5)*6);
      let g=ctx.createLinearGradient(0,0,0,G); g.addColorStop(0,pal.s1); g.addColorStop(1,pal.s2); ctx.fillStyle=g; ctx.fillRect(-10,-10,Wd+20,H+20);
      if(dark){ ctx.fillStyle='#F4EBD0'; ctx.beginPath(); ctx.arc(Wd*.8,50,16,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(255,255,255,.7)'; for(let i=0;i<24;i++){ ctx.fillRect(((i*97-e.dist*.03)%Wd+Wd)%Wd,(i*37)%(G*.6),1.5,1.5); } }
      else { ctx.fillStyle='rgba(255,230,180,.9)'; ctx.beginPath(); ctx.arc(Wd*.8,56,26,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(255,255,255,.85)'; for(let i=0;i<4;i++){ const cx=((i*230-e.dist*.08)%(Wd+200)+Wd+200)%(Wd+200)-100, cy=40+i%2*30; ctx.beginPath(); ctx.ellipse(cx,cy,34,11,0,0,Math.PI*2); ctx.ellipse(cx+20,cy-6,22,10,0,0,Math.PI*2); ctx.fill(); } }
      [[pal.h1,.15,G-60,40],[pal.h2,.35,G-26,26]].forEach(([c,k,base,amp])=>{ ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(0,G); for(let x=0;x<=Wd+10;x+=10){ const wv=(x+e.dist*k)/140; ctx.lineTo(x,base-Math.sin(wv)*amp-Math.sin(wv*2.3)*amp*.35); } ctx.lineTo(Wd,G); ctx.closePath(); ctx.fill(); });
      ctx.fillStyle=pal.dirt; ctx.fillRect(0,G,Wd,H-G); ctx.fillStyle=pal.gr; ctx.fillRect(0,G,Wd,12); ctx.fillStyle=pal.gt; for(let x=-((e.dist)%28);x<Wd;x+=28) ctx.fillRect(x,G+12,14,4);
      ctx.fillStyle='rgba(0,0,0,.12)'; for(let x=-((e.dist)%60);x<Wd;x+=60){ ctx.fillRect(x,G+26,26,4); ctx.fillRect(x+30,G+44,18,4); }
      for(const en of e.ents){ const sx=en.x-e.dist;
        if(en.type==='gate'){ const p0=en.pl0-e.dist, p1=en.pl1-e.dist, py=G-130;
          ctx.fillStyle='#8A5A36'; ctx.fillRect(p0,py,p1-p0,14); ctx.fillStyle='#6B4A2E'; ctx.fillRect(p0,py+14,p1-p0,5); for(let x=p0+20;x<p1;x+=70) ctx.fillRect(x,py+19,8,G-py-19);
          ctx.fillStyle=dark?'#C9CED6':'#5B6270'; ctx.fillRect(sx-32,py-92,6,92); ctx.fillRect(sx+26,py-92,6,92); ctx.fillRect(sx-32,G-110,6,110-0); ctx.fillRect(sx+26,G-110,6,110);
          ctx.fillStyle='rgba(255,255,255,.12)'; ctx.fillRect(sx-30,py-92,60,92); ctx.fillRect(sx-30,G-110,60,110);
          sign(sx,py-104,en.top.t,en.done?(en.top.good?'#BFE8CF':'#F6C1C1'):'#FFFDF7'); sign(sx,G-70,en.bot.t,en.done?(en.bot.good?'#BFE8CF':'#F6C1C1'):'#FFFDF7');
          ctx.fillStyle='#FFD36B'; ctx.font='900 12px system-ui'; ctx.textAlign='center'; ctx.fillText('▲',sx,py-128); ctx.fillText('▼',sx,G-94); }
        else if(en.type==='crate'&&!en.hit){ ctx.fillStyle='#B5864D'; ctx.fillRect(sx-en.w/2,G-en.h,en.w,en.h); ctx.strokeStyle='#7A4C2C'; ctx.lineWidth=3; ctx.strokeRect(sx-en.w/2+1.5,G-en.h+1.5,en.w-3,en.h-3); ctx.beginPath(); ctx.moveTo(sx-en.w/2+3,G-en.h+3); ctx.lineTo(sx+en.w/2-3,G-3); ctx.moveTo(sx+en.w/2-3,G-en.h+3); ctx.lineTo(sx-en.w/2+3,G-3); ctx.stroke(); }
        else if(en.type==='coin'&&!en.got){ const sq=Math.abs(Math.cos(e.t*5+en.x)); ctx.fillStyle='#F2B10C'; ctx.beginPath(); ctx.ellipse(sx,G+en.y,9*sq+2,10,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#FFE58F'; ctx.beginPath(); ctx.ellipse(sx,G+en.y,4*sq+1,6,0,0,Math.PI*2); ctx.fill(); } }
      drawWordy(px,G+e.y);
      if(e.flash){ e.flash.t-=dt; ctx.fillStyle=e.flash.c; if(e.flash.t>0) ctx.fillRect(-10,-10,Wd+20,H+20); else e.flash=null; }
      ctx.restore();
      e.raf=requestAnimationFrame(loop); };
    e.raf=requestAnimationFrame(loop);
    const vis=()=>{ if(document.hidden) setPhase(p=>p==='play'?'pause':p); }; document.addEventListener('visibilitychange',vis);
    return ()=>{ e.stop=true; cancelAnimationFrame(e.raf); ro&&ro.disconnect(); document.removeEventListener('visibilitychange',vis); };
  },[phase]);
  useEffect(()=>{ if(!active&&phase==='play') setPhase('pause'); },[active]);
  const top=html`<div className="sess-top"><button className="icon-btn" id="rn-close" onClick=${()=>{ SFX('tap'); if(phase==='menu') onExit(); else { if(E.current){ E.current.stop=true; E.current.dead=true; } setPhase('menu'); } }} aria-label=${phase==='menu'?'Закрыть':'В меню'}>${phase==='menu'?I.close():I.back()}</button><span className="phase" style=${{flex:1}}>Раннер</span>
    ${phase==='play'||phase==='pause'?html`<button className="icon-btn sp-pbtn" id="rn-pause" aria-label="Пауза" onClick=${()=>{ SFX('tap'); setPhase(p=>p==='play'?'pause':'play'); }}>${phase==='pause'?'▶':'❚❚'}</button>`:null}</div>`;
  if(phase==='menu') return html`<section>${top}
    <div className="rn-menu" data-perch="card"><div className="rn-menu-art" aria-hidden="true"><span className="rn-m-sign a">went</span><span className="rn-m-sign b">goed</span><span className="rn-m-plat"></span><span className="rn-m-ground"></span></div>
      <h2>Беги и выбирай верное</h2><p>Wordy бежит сам. Впереди ворота с двумя вариантами: верхние на платформе и нижние на земле. Прыгай на платформу, если верный вариант сверху, или беги низом. Перепрыгивай ящики и собирай монеты. Нажми на поле или пробел — прыжок, нажми ещё раз — двойной прыжок.</p>
      <h3 className="sp-h">Темы</h3>
      <div className="rn-lv" role="radiogroup" aria-label="Уровень">${[...CW_LV,'all'].map(k=>html`<button key=${k} role="radio" aria-checked=${lv===k} id=${'rn-lv-'+k} className=${'rn-chip'+(lv===k?' on':'')} onClick=${()=>{ SFX('tap'); setLv(k); }}>${k==='all'?'Все темы':k}</button>`)}</div>
      <h3 className="sp-h">Скорость</h3>
      <div className="rn-lv" role="radiogroup" aria-label="Скорость">${Object.entries(RN_SPEED).map(([k,d])=>html`<button key=${k} role="radio" aria-checked=${spd===k} id=${'rn-spd-'+k} className=${'rn-chip'+(spd===k?' on':'')} onClick=${()=>{ SFX('tap'); setSpd(k); }}>${d.name}</button>`)}</div>
      <div className="sp-best"><span><b>${rn.best||0}</b><small>рекорд</small></span><span><b>${rn.bestDist||0} м</b><small>дальше всех</small></span><span><b>${rn.games||0}</b><small>${plural(rn.games||0,'забег','забега','забегов')}</small></span></div>
      <button className="btn rn-start" id="rn-start" onClick=${start}>Бежать!</button></div></section>`;
  if(phase==='over'&&res) return html`<section>${top}<${GameWin} tone="good" kicker=${'Раннер · '+(lv==='all'?'все темы':lv)+' · '+(RN_SPEED[spd]||RN_SPEED.normal).name.toLowerCase()} title=${res.record?'Рекордный забег!':res.ok>=10?'Отличный забег!':res.ok>=4?'Хороший забег!':'Попробуй ещё раз'} big=${res.dist} bigLabel=${plural(res.dist,'метр','метра','метров')} stars=${res.ok>=15?3:res.ok>=8?2:res.ok>=3?1:0} coins=${res.coins} xp=${Math.round(res.score/2)} record=${res.record}
      stats=${[[res.ok,'ворот пройдено верно'],[res.picked,plural(res.picked,'монета','монеты','монет')+' собрано'],[res.score,'очков']]}
      actions=${html`<button className="btn ghost" id="rn-menu" onClick=${()=>{ SFX('tap'); setPhase('menu'); }}>Меню</button><button className="btn" id="rn-again" onClick=${start}>Ещё забег</button>`}>
      ${res.log.length?html`<div className="gw-log"><b>Разбор ошибок</b>${res.log.map((l,i)=>html`<p key=${i} className="bad"><s>${l.bad}</s><span>→</span><b>${l.good}</b><span className="muted">· ${l.topic}</span></p>`)}</div>`:html`<p className="gw-next">Ни одних неверных ворот!</p>`}
    <//></section>`;
  return html`<section className="rn">${top}
    <div className=${'rn-field'} ref=${box} onPointerDown=${ev=>{ ev.preventDefault(); if(phase==='play') jump(); }}>
      <canvas ref=${cv} aria-label="Поле раннера"></canvas>
      <div className="sp-hud"><span className="sp-chip">${hud.dist} м</span><span></span><span className="sp-right"><span className="cw-hearts">${[0,1,2].map(i=>html`<i key=${i+(i<hud.lives?'on':'off')} className=${i<hud.lives?'on':'off'}>♥</i>`)}</span><b className="sp-score">${hud.score}</b></span></div>
      ${q?html`<div key=${q.k} className="rn-q"><b>${q.t}</b><small>Что верно? ▲ прыгай на платформу · ▼ беги низом</small></div>`:null}
      ${fb?html`<div key=${fb.k} className=${'cw-fb rn-fb '+(fb.kind==='ok'?'ok':'bad')}>${fb.kind==='ok'?html`<span className="cw-fb-ic">✓</span><span>Верно: <b>${fb.text}</b> +20</span>`:html`<span className="cw-fb-ic">✕</span><span><s>${fb.text}</s> → <b>${fb.good}</b></span>`}</div>`:null}
      ${phase==='pause'?html`<div className="cw-over enter"><b>Пауза</b><button className="btn" id="rn-resume" onClick=${ev=>{ ev.stopPropagation(); SFX('pop'); setPhase('play'); }} onPointerDown=${ev=>ev.stopPropagation()}>Продолжить</button></div>`:null}
    </div>
    <button className="btn rn-jump" id="rn-jump" onPointerDown=${ev=>{ ev.preventDefault(); jump(); }}>Прыжок</button>
  </section>`;
}

/* ---- «Двери»: first-person corridor, pick the right door before the timer runs out ---- */
const DR_SCENE=({l,r,state,pick,lv,ls,rs})=>{ const pal=[['#E9DCC8','#D8C8AE','#B79E80'],['#D7E3E8','#C2D2DA','#93A8B4'],['#E5D7E8','#D2C0D8','#A890B4'],['#E8E0CC','#D6C9AA','#B0A07A']][(lv-1)%4];
  const door=(side,o)=>{ const L=side==='l', st0=(L?ls:rs), st=st0!==undefined?st0:(pick===side?state:null), open=!!st;
    const pts=L?'60,118 128,150 128,318 60,356':'300,118 232,150 232,318 300,356';
    const inner=L?'66,126 122,155 122,314 66,348':'294,126 238,155 238,314 294,348';
    return html`<g className=${'dr-door'+(st?' '+st:'')}>
      <polygon points=${pts} fill="#6B4A2E"/>
      <polygon points=${inner} fill=${st==='bad'?'#8E4A35':'#FFF4CF'}/>
      ${st==='bad'?html`<g>${[0,1,2,3,4,5].map(i=>html`<line key=${i} x1=${L?66:238} y1=${168+i*30} x2=${L?122:294} y2=${172+i*30} stroke="#5A2A1A" stroke-width="3"/>`)}</g>`:html`<polygon points=${inner} fill="url(#drg)" opacity=".9"/>`}
      <g className="dr-leaf" style=${{transformOrigin:L?'66px 237px':'294px 237px'}}><polygon points=${inner} fill="#8A5A36"/><polygon points=${inner} fill="rgba(0,0,0,.08)" transform=${L?'translate(4 6) scale(.97)':'translate(-4 6) scale(.97)'} style=${{transformOrigin:'center'}}/><circle cx=${L?114:246} cy="238" r="4.5" fill="#E8C35A"/></g>
      ${(()=>{ const t=String(o); let lines=[t]; if(t.length>16){ const mid=Math.floor(t.length/2); let cut=-1; for(let d=0;d<mid;d++){ if(t[mid+d]===' '){ cut=mid+d; break; } if(t[mid-d]===' '){ cut=mid-d; break; } } if(cut>0) lines=[t.slice(0,cut),t.slice(cut+1)]; }
        const longest=Math.max(...lines.map(l=>l.length)), fs=longest>20?11:longest>15?12.5:longest>11?14.5:17, h=lines.length>1?54:40;
        return html`<rect x=${L?6:196} y=${216-h/2} width="158" height=${h} rx="10" fill=${st==='ok'||st==='late'?'#1F8A5B':st==='bad'?'#C43A31':'#FFFDF7'} stroke="rgba(0,0,0,.25)" stroke-width="2"/>
        ${lines.map((l,i)=>html`<text key=${i} x=${L?85:275} y=${216+(i-(lines.length-1)/2)*(fs+3)+fs*.36} text-anchor="middle" font-size=${fs} font-weight="800" fill=${st?'#fff':'#2B1B12'}>${l}</text>`)}`; })()}</g>`; };
  return html`<svg viewBox="0 0 360 420" className="dr-svg" aria-hidden="true">
    <defs><linearGradient id="drf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color=${pal[2]}/><stop offset="1" stop-color="#5E4A3A"/></linearGradient>
      <linearGradient id="drc" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color=${pal[1]}/><stop offset="1" stop-color="#7E7266"/></linearGradient>
      <radialGradient id="drg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF6D8" stop-opacity=".9"/><stop offset="1" stop-color="#FFF6D8" stop-opacity="0"/></radialGradient></defs>
    <polygon points="0,0 360,0 230,150 130,150" fill="url(#drc)"/>
    <polygon points="0,420 360,420 230,270 130,270" fill="url(#drf)"/>
    <polygon points="0,0 130,150 130,270 0,420" fill=${pal[0]}/><polygon points="360,0 230,150 230,270 360,420" fill=${pal[1]}/>
    ${[0,1,2,3,4,5].map(i=>{ const t=i/6, y1=420-(150*t), x1=130*t; return html`<line key=${i} x1=${x1} y1=${y1} x2=${360-x1} y2=${y1} stroke="rgba(0,0,0,.08)" stroke-width="2"/>`; })}
    ${[-3,-2,-1,1,2,3].map(i=>html`<line key=${'v'+i} x1=${180+i*60} y1="420" x2=${180+i*16} y2="270" stroke="rgba(0,0,0,.07)" stroke-width="2"/>`)}
    <rect x="130" y="150" width="100" height="120" fill="#3A2E26"/><rect x="152" y="176" width="56" height="94" rx="3" fill="#2A211B"/><circle cx="180" cy="210" r="46" fill="url(#drg)"/>
    ${[40,110].map((y,i)=>html`<g key=${i}><rect x=${180-(60-i*22)} y=${y-4} width=${(60-i*22)*2} height="8" rx="4" fill="#FFF6D8" opacity=".95"/><ellipse cx="180" cy=${y+30} rx=${90-i*30} ry="30" fill="#FFF6D8" opacity=".12"/></g>`)}
    <polygon points="0,420 130,270 130,276 8,420" fill="rgba(0,0,0,.15)"/><polygon points="360,420 230,270 230,276 352,420" fill="rgba(0,0,0,.15)"/>
    ${door('l',l)}${door('r',r)}
    <rect x="0" y="0" width="360" height="420" fill="url(#drv)" opacity="0"/>
  </svg>`; };
const DR_DIFF=__WD[1334];
function DoorsGame({st,update,onExit,active}){
  const rd=(k,v)=>{ try{ return localStorage.getItem(k)||v; }catch(e){ return v; } };
  const [phase,setPhase]=useState('menu'); const [lv,setLv]=useState(()=>rd('wordy.drlv',st.level&&CW_LV.includes(st.level)?st.level:'A2'));
  const [g,setG]=useState(null); const [res,setRes]=useState(null); const [walk,setWalk]=useState(null); const [cam,setCam]=useState(null); const [diff,setDiff]=useState(()=>rd('wordy.drdiff','normal'));
  const D=DR_DIFF[diff]||DR_DIFF.normal;
  const tick=useRef(null), qRef=useRef(null);
  const dr=st.dr||{};
  useEffect(()=>{ try{ localStorage.setItem('wordy.drlv',lv); localStorage.setItem('wordy.drdiff',diff); }catch(e){} },[lv,diff]);
  useEffect(()=>{ const t=setTimeout(()=>W('goTo','card',{frac:phase==='play'?.5:.9}),150); return ()=>clearTimeout(t); },[phase]);
  const limit=level=>Math.max(D.min,+(D.t0-(level-1)*D.dec).toFixed(1));
  const mkQ=()=>{ const pool=CW_TOPICS.filter(t=>lv==='all'||t.cefr===lv), t=pick(pool.length?pool:CW_TOPICS), good=pick(t.good), braw=pick(t.bad), bad=Array.isArray(braw)?braw[0]:braw, fix=Array.isArray(braw)?braw[1]:t.note||'';
    const left=Math.random()<.5; return {topic:t,l:left?good:bad,r:left?bad:good,goodSide:left?'l':'r',bad,good,fix,k:Date.now()+Math.random()}; };
  const start=()=>{ SFX('pop'); setRes(null); const q=mkQ(); setCam(null); setG({q,lives:D.lives,maxLives:D.lives,score:0,ok:0,bad:0,streak:0,best:0,level:1,inLevel:0,left:limit(1),state:null,pick:null,log:[]}); setPhase('play'); window.scrollTo({top:0}); W('react','wave'); W('say','Выбирай дверь, пока не вышло время!',0,true); };
  // countdown
  useEffect(()=>{ if(phase!=='play'||!g||g.state) return; clearInterval(tick.current);
    tick.current=setInterval(()=>{ setG(o=>{ if(!o||o.state) return o; const left=+(o.left-.1).toFixed(1);
      if(left<=3&&Math.abs(left-Math.round(left))<.05&&left>0) SFX('tap');
      if(left<=0){ setTimeout(()=>choose(null),0); return {...o,left:0}; } return {...o,left}; }); },100);
    return ()=>clearInterval(tick.current); },[phase,g&&g.q.k,g&&g.state]);
  useEffect(()=>()=>clearInterval(tick.current),[]);
  useEffect(()=>{ if(!active&&phase==='play') setPhase('pause'); },[active]);
  useEffect(()=>{ if(phase!=='play'||!active) return; const f=e=>{ if(e.key==='ArrowLeft'||e.key==='a'){ e.preventDefault(); choose('l'); } else if(e.key==='ArrowRight'||e.key==='d'){ e.preventDefault(); choose('r'); } }; addEventListener('keydown',f); return ()=>removeEventListener('keydown',f); });
  const choose=side=>{ setG(o=>{ if(!o||o.state) return o; clearInterval(tick.current); const ok=side===o.q.goodSide, timeout=side==null;
      let n={...o,pick:side||o.q.goodSide,state:ok?'ok':timeout?'late':'bad'};
      setCam({k:Date.now(),side:side||o.q.goodSide,mode:ok?'go':'bump'});
      if(ok){ const bonus=Math.ceil(o.left); n.score=o.score+Math.round((10+bonus)*D.mul); n.gain=Math.round((10+bonus)*D.mul); n.ok=o.ok+1; n.streak=o.streak+1; n.best=Math.max(o.best,n.streak); n.inLevel=o.inLevel+1; SFX('unlock');
        if(n.streak%5===0){ W('react','cheer'); W('say','Серия '+n.streak+'!',0,true); } else W('react','nod'); }
      else { n.lives=o.lives-1; n.bad=o.bad+1; n.streak=0; n.log=[...o.log,{bad:timeout?'— (время вышло)':o.q.bad,good:o.q.good,topic:o.q.topic.name,fix:o.q.fix}]; SFX(timeout?'keyerr':'wrong'); W('react',timeout?'think':'wrong'); if(timeout) W('say','Время вышло!'); }
      return n; });
    setTimeout(()=>{ setG(o=>{ if(!o) return o; if(o.state&&o.state!=='ok'&&o.lives>0){ setCam({k:Date.now(),side:o.q.goodSide,mode:'go'}); SFX('tap'); setTimeout(()=>SFX('tap'),260); } return o; }); },side===null||side!==(g&&g.q.goodSide)?1250:0);
    setTimeout(()=>{ setG(o=>{ if(!o) return o;
      if(o.lives<=0){ finish(o); return o; }
      setCam({k:Date.now(),side:'c',mode:'in'}); setTimeout(()=>setCam(c=>c&&c.mode==='in'?null:c),500);
      let level=o.level, inLevel=o.inLevel, lvUp=false; if(inLevel>=5){ level++; inLevel=0; lvUp=true; }
      if(lvUp){ SFX('levelup'); W('react','happy'); W('say','Этаж '+level+'! Теперь '+limit(level)+' сек на ответ.',0,true); }
      return {...o,q:mkQ(),level,inLevel,left:limit(level),state:null,pick:null,lvUp:lvUp?Date.now():o.lvUp}; }); },side!==null&&g&&side===g.q.goodSide?950:2100);
    if(side!==null&&g&&side===g.q.goodSide){ setTimeout(()=>SFX('tap'),120); setTimeout(()=>SFX('tap'),420); } };
  const finish=o=>{ const sc=o.score, coins=Math.min(100,Math.floor(sc/6)), prev=(dr.bestBy||{})[diff]||0;
    update(s=>{ const d=s.dr||{}; return {coins:s.coins+coins,xp:s.xp+Math.round(sc/2),...(sc>0?gDay(s):{}),dr:{...d,games:(d.games||0)+1,best:Math.max(d.best||0,sc),bestLevel:Math.max(d.bestLevel||0,o.level),bestBy:{...(d.bestBy||{}),[diff]:Math.max((d.bestBy||{})[diff]||0,sc)}}}; });
    setRes({score:sc,coins,level:o.level,ok:o.ok,best:o.best,log:o.log.slice(0,12),record:sc>prev&&sc>0}); setPhase('over');
    W('react',sc>prev&&sc>0?'cheer':'encourage'); W('say',sc>prev&&sc>0?'Новый рекорд!':'Коридор закончился. Ещё раз?',0,true); };
  const top=html`<div className="sess-top"><button className="icon-btn" id="dr-close" onClick=${()=>{ SFX('tap'); clearInterval(tick.current); if(phase==='menu') onExit(); else setPhase('menu'); }} aria-label=${phase==='menu'?'Закрыть':'В меню'}>${phase==='menu'?I.close():I.back()}</button><span className="phase" style=${{flex:1}}>Двери</span>
    ${phase==='play'||phase==='pause'?html`<button className="icon-btn sp-pbtn" id="dr-pause" aria-label="Пауза" onClick=${()=>{ SFX('tap'); setPhase(p=>p==='play'?'pause':'play'); }}>${phase==='pause'?'▶':'❚❚'}</button>`:null}</div>`;
  if(phase==='menu') return html`<section>${top}
    <div className="rn-menu" data-perch="card"><div className="dr-menu-art" aria-hidden="true">${DR_SCENE({l:'went',r:'goed',state:null,pick:null,lv:1})}</div>
      <h2>Выбери верную дверь</h2><p>Ты идёшь по коридору. На каждой развилке две двери — на одной верный вариант, на другой ошибка. Нажми на дверь, чтобы пройти дальше. На ответ сначала 10 секунд, и с каждым этажом времени всё меньше.</p>
      <h3 className="sp-h">Сложность</h3>
      <div className="sp-diff" role="radiogroup" aria-label="Сложность">${Object.entries(DR_DIFF).map(([k,d])=>html`<button key=${k} role="radio" aria-checked=${diff===k} id=${'dr-diff-'+k} className=${'sp-dbtn d-'+k+(diff===k?' on':'')} onClick=${()=>{ SFX('tap'); setDiff(k); }}><b>${d.name}</b><small>${d.sub}</small>${(dr.bestBy||{})[k]?html`<em>★ ${dr.bestBy[k]}</em>`:null}</button>`)}</div>
      <h3 className="sp-h">Темы</h3>
      <div className="rn-lv" role="radiogroup" aria-label="Уровень">${[...CW_LV,'all'].map(k=>html`<button key=${k} role="radio" aria-checked=${lv===k} id=${'dr-lv-'+k} className=${'rn-chip'+(lv===k?' on':'')} onClick=${()=>{ SFX('tap'); setLv(k); }}>${k==='all'?'Все темы':k}</button>`)}</div>
      <div className="sp-best"><span><b>${dr.best||0}</b><small>рекорд</small></span><span><b>${dr.bestLevel||0}</b><small>лучший этаж</small></span><span><b>${dr.games||0}</b><small>${plural(dr.games||0,'игра','игры','игр')}</small></span></div>
      <button className="btn rn-start" id="dr-start" onClick=${start}>Войти в коридор</button></div></section>`;
  if(phase==='over'&&res) return html`<section>${top}<${GameWin} tone="good" kicker=${'Двери · '+D.name.toLowerCase()+' · '+(lv==='all'?'все темы':lv)} title=${res.record?'Новый рекорд!':res.level>=4?'Отличный забег!':res.ok>=5?'Хорошо прошёл!':'Попробуй ещё раз'} big=${res.level} bigLabel="этаж" stars=${res.level>=5?3:res.level>=3?2:res.ok>=3?1:0} coins=${res.coins} xp=${Math.round(res.score/2)} record=${res.record}
      stats=${[[res.ok,'верных дверей'],[res.best,'лучшая серия'],[res.score,'очков']]}
      actions=${html`<button className="btn ghost" id="dr-menu" onClick=${()=>{ SFX('tap'); setPhase('menu'); }}>Меню</button><button className="btn" id="dr-again" onClick=${start}>Ещё раз</button>`}>
      ${res.log.length?html`<div className="gw-log"><b>Разбор ошибок</b>${res.log.map((l,i)=>html`<p key=${i} className="bad"><s>${l.bad}</s><span>→</span><b>${l.good}</b><span className="muted">· ${l.topic}</span></p>`)}</div>`:html`<p className="gw-next">Ни одной ошибки!</p>`}
    <//></section>`;
  if(!g) return html`<section>${top}</section>`;
  const lim=limit(g.level), frac=Math.max(0,g.left/lim), urgent=g.left<=3&&!g.state;
  return html`<section className="dr">${top}
    <div className="dr-card" data-perch="card">
      <div className="dr-hud"><span className="sp-chip dr-chip">Этаж <b>${g.level}</b></span><span className="dr-dots">${[0,1,2,3,4].map(i=>html`<i key=${i} className=${i<g.inLevel?'on':''}></i>`)}</span><span className="sp-right"><span className="cw-hearts">${[...Array(g.maxLives||3)].map((_,i)=>html`<i key=${i+(i<g.lives?'on':'off')} className=${i<g.lives?'on':'off'}>♥</i>`)}</span><b className="dr-score">${g.score}</b></span></div>
      <div className="dr-q" key=${g.q.k}><small>${g.q.topic.name}</small><b>${g.q.topic.task.replace(/^Лови /,'Найди: ')}</b></div>
      <div className=${'dr-timer'+(urgent?' urgent':'')}><i style=${{transform:'scaleX('+frac+')'}}></i><span>${g.left<3&&g.left%1?g.left.toFixed(1):Math.ceil(g.left)}</span></div>
    </div>
    <div className=${'dr-stage'+(g.state?' st-'+g.state:'')}>
      <div className=${'dr-cam'+(cam?' '+cam.mode+'-'+cam.side:'')}>${(()=>{ const gs=g.q.goodSide, bs=gs==='l'?'r':'l', st2={l:null,r:null};
          if(g.state==='ok') st2[gs]='ok'; else if(g.state==='bad'){ st2[bs]='bad'; if(cam&&cam.mode==='go') st2[gs]='late'; } else if(g.state==='late') st2[gs]='late';
          return DR_SCENE({l:g.q.l,r:g.q.r,lv:g.level,ls:st2.l,rs:st2.r}); })()}</div>
      <button className="dr-hit l" id="dr-l" aria-label=${'Левая дверь: '+g.q.l} disabled=${!!g.state||phase!=='play'} onClick=${()=>choose('l')}></button>
      <button className="dr-hit r" id="dr-r" aria-label=${'Правая дверь: '+g.q.r} disabled=${!!g.state||phase!=='play'} onClick=${()=>choose('r')}></button>
      ${g.state==='bad'||g.state==='late'?html`<div className="cw-fb bad dr-fb"><span className="cw-fb-ic">${g.state==='late'?'⏱':'✕'}</span><span>${g.state==='late'?'Время вышло! ':''}Верно: <b>${g.q.good}</b>${g.state==='bad'&&g.q.fix&&/^[а-яё]/i.test(g.q.fix)?html` · ${g.q.bad} — ${g.q.fix}`:null}</span></div>`:null}
      ${g.state==='ok'?html`<div className="cw-fb ok dr-fb"><span className="cw-fb-ic">✓</span><span>Верно! +${g.gain||10}</span></div>`:null}
      ${g.lvUp&&Date.now()-g.lvUp<1600?html`<div className="sp-banner dr-ban" key=${g.lvUp}><b>Этаж ${g.level}</b><small>${lim} сек на ответ</small></div>`:null}
      ${phase==='pause'?html`<div className="cw-over enter"><b>Пауза</b><button className="btn" id="dr-resume" onClick=${()=>{ SFX('pop'); setPhase('play'); }}>Продолжить</button></div>`:null}
    </div>
  </section>`;
}

/* ---- «Словопад»: letter tetris, build words in rows and columns ---- */
const TT_COLS=7, TT_ROWS=10;
const TT_DIFF={easy:{name:'Лёгкий',sub:'Медленно, слова из 3–4 букв',t0:1100,min:500,len:[3,4]},normal:{name:'Средний',sub:'Быстрее, слова из 3–5 букв',t0:800,min:340,len:[3,5]},hard:{name:'Сложный',sub:'Быстро, слова из 4–6 букв',t0:560,min:240,len:[4,6]}};
function ttWords(st,d){ const li=Math.max(1,CEFR.indexOf(st.level||'A2')), seen=new Set();
  return ALL.filter(w=>/^[a-z]+$/.test(w.en)&&w.en.length>=d.len[0]&&w.en.length<=d.len[1]&&CEFR.indexOf(w.cefr)<=li&&w.track!=='idioms'&&!seen.has(w.en)&&seen.add(w.en)); }
function ttFind(grid,lex){ const found=[];
  const scan=(cells)=>{ let i=0; while(i<cells.length){ if(!cells[i].ch){ i++; continue; } let j=i; while(j<cells.length&&cells[j].ch) j++;
      const run=cells.slice(i,j); let best=null; for(let a=0;a<run.length;a++) for(let b=run.length;b>=a+3;b--){ const w=run.slice(a,b).map(c=>c.ch).join(''); if(lex.has(w)&&(!best||w.length>best.w.length)){ best={w,cells:run.slice(a,b)}; } }
      if(best) found.push(best); i=j; } };
  for(let r=0;r<TT_ROWS;r++) scan([...Array(TT_COLS)].map((_,c)=>({r,c,ch:grid[r][c]})));
  for(let c=0;c<TT_COLS;c++) scan([...Array(TT_ROWS)].map((_,r)=>({r,c,ch:grid[r][c]})));
  return found; }
function TetrisGame({st,update,onExit,active}){
  const rd=(k,v)=>{ try{ return localStorage.getItem(k)||v; }catch(e){ return v; } };
  const [phase,setPhase]=useState('menu'); const [diff,setDiff]=useState(()=>rd('wordy.ttdiff','normal')); const [g,setG]=useState(null); const [res,setRes]=useState(null); const [pop,setPop]=useState(null);
  const D=TT_DIFF[diff]||TT_DIFF.normal, tt=st.tt||{}; const lex=useMemo(()=>{ const s=new Set(CX_LEX().core); return s; },[]);
  const pool=useRef([]), gRef=useRef(null), tmr=useRef(null);
  useEffect(()=>{ try{ localStorage.setItem('wordy.ttdiff',diff); }catch(e){} },[diff]);
  useEffect(()=>{ const t=setTimeout(()=>W('goTo','card',{frac:phase==='play'?.92:.88}),150); return ()=>clearTimeout(t); },[phase]);
  gRef.current=g;
  const nextLetters=(o)=>{ let q=[...(o.queue||[])], target=o.target;
    while(q.length<6){ const w=pick(pool.current.length?pool.current:ALL.filter(x=>/^[a-z]{3,4}$/.test(x.en))); q.push(...w.en.split('')); if(!target) target=w; if(Math.random()<.35) q.push(pick('aeiouaeiorstnl'.split(''))); }
    return {queue:q,target}; };
  const spawn=o=>{ const {queue,target}=nextLetters(o), ch=queue[0], col=Math.floor(TT_COLS/2);
    if(o.grid[0][col]){ return {...o,over:true}; }
    return {...o,queue:queue.slice(1),target,cur:{ch,r:0,c:col}}; };
  const start=()=>{ SFX('pop'); pool.current=ttWords(st,D); setRes(null); setPop(null);
    const grid=[...Array(TT_ROWS)].map(()=>Array(TT_COLS).fill(null));
    setG(spawn({grid,queue:[],target:null,cur:null,score:0,words:[],level:1,lines:0,combo:0,over:false})); setPhase('play'); window.scrollTo({top:0}); W('react','wave'); W('say','Собирай слова по строкам и столбцам!',0,true); };
  const settle=o=>{ let grid=o.grid.map(r=>r.slice()); const {r,c,ch}=o.cur; grid[r][c]=ch; let score=o.score, words=o.words, chain=0, clearedAll=[];
    for(;;){ const f=ttFind(grid,lex); if(!f.length) break; chain++; const kill=new Set();
      f.forEach(x=>{ x.cells.forEach(cl=>kill.add(cl.r+','+cl.c)); words=[...words,x.w]; score+=x.w.length*x.w.length*5*chain; clearedAll.push(x.w); });
      kill.forEach(k=>{ const [rr,cc]=k.split(',').map(Number); grid[rr][cc]=null; });
      for(let cc=0;cc<TT_COLS;cc++){ const col=[]; for(let rr=TT_ROWS-1;rr>=0;rr--) if(grid[rr][cc]) col.push(grid[rr][cc]); for(let rr=TT_ROWS-1,i=0;rr>=0;rr--,i++) grid[rr][cc]=col[i]||null; } }
    if(clearedAll.length){ SFX(chain>1?'fanfare':'correct'); const w=clearedAll[clearedAll.length-1], info=wgInfo(w); setPop({w:clearedAll.join(' + '),ru:info.ru||'',k:Date.now(),chain}); setTimeout(()=>setPop(p=>p&&Date.now()-p.k>1500?null:p),1700); W('react',chain>1?'cheer':'nod'); if(chain>1) W('say','Цепочка ×'+chain+'!'); }
    else SFX('tap');
    const level=1+Math.floor(words.length/5), tgtDone=o.target&&clearedAll.includes(o.target.en);
    if(level>o.level){ SFX('levelup'); W('react','happy'); W('say','Уровень '+level+'! Быстрее!',0,true); }
    return spawn({...o,grid,score,words,level,cur:null,target:tgtDone?null:o.target}); };
  const step=()=>{ setG(o=>{ if(!o||o.over||!o.cur) return o; const {r,c}=o.cur; if(r+1<TT_ROWS&&!o.grid[r+1][c]) return {...o,cur:{...o.cur,r:r+1}}; return settle(o); }); };
  useEffect(()=>{ if(phase!=='play'||!g||g.over) return; const iv=Math.max(D.min,D.t0-(g.level-1)*70); clearInterval(tmr.current); tmr.current=setInterval(step,iv); return ()=>clearInterval(tmr.current); },[phase,g&&g.level,g&&g.over]);
  useEffect(()=>{ if(g&&g.over&&phase==='play'){ clearInterval(tmr.current); const sc=g.score, coins=Math.min(90,Math.floor(sc/10)+g.words.length), prev=tt.best||0;
      update(s=>{ const o=s.tt||{}; return {coins:s.coins+coins,xp:s.xp+Math.round(sc/3),...(sc>0?gDay(s):{}),tt:{...o,games:(o.games||0)+1,best:Math.max(o.best||0,sc),bestWords:Math.max(o.bestWords||0,g.words.length)}}; });
      setRes({score:sc,coins,words:g.words,level:g.level,record:sc>prev&&sc>0}); setPhase('over'); W('react',sc>prev&&sc>0?'cheer':'encourage'); W('say',sc>prev&&sc>0?'Новый рекорд!':'Стакан полон! Ещё раз?',0,true); } },[g&&g.over]);
  useEffect(()=>()=>clearInterval(tmr.current),[]);
  useEffect(()=>{ if(!active&&phase==='play') setPhase('pause'); },[active]);
  const move=dc=>setG(o=>{ if(!o||!o.cur||phase!=='play') return o; const c=o.cur.c+dc; if(c<0||c>=TT_COLS||o.grid[o.cur.r][c]) return o; SFX('type'); return {...o,cur:{...o.cur,c}}; });
  const drop=col=>setG(o=>{ if(!o||!o.cur||o.over) return o; let c=col==null?o.cur.c:col; let r=o.cur.r;
    if(col!=null){ const lo=Math.min(c,o.cur.c), hi=Math.max(c,o.cur.c); for(let x=lo;x<=hi;x++) if(o.grid[r][x]) return o; }
    while(r+1<TT_ROWS&&!o.grid[r+1][c]) r++; return settle({...o,cur:{...o.cur,c,r}}); });
  useEffect(()=>{ if(phase!=='play'||!active) return; const f=e=>{ if(e.key==='ArrowLeft'){ e.preventDefault(); move(-1); } else if(e.key==='ArrowRight'){ e.preventDefault(); move(1); } else if(e.key==='ArrowDown'||e.key===' '){ e.preventDefault(); drop(null); } };
    addEventListener('keydown',f); return ()=>removeEventListener('keydown',f); });
  const top=html`<div className="sess-top"><button className="icon-btn" id="tt-close" onClick=${()=>{ SFX('tap'); clearInterval(tmr.current); if(phase==='menu') onExit(); else setPhase('menu'); }} aria-label=${phase==='menu'?'Закрыть':'В меню'}>${phase==='menu'?I.close():I.back()}</button><span className="phase" style=${{flex:1}}>Словопад</span>
    ${phase==='play'||phase==='pause'?html`<button className="icon-btn sp-pbtn" id="tt-pause" aria-label="Пауза" onClick=${()=>{ SFX('tap'); setPhase(p=>p==='play'?'pause':'play'); }}>${phase==='pause'?'▶':'❚❚'}</button>`:null}</div>`;
  if(phase==='menu') return html`<section className="g-tetris">${top}
    <div className="rn-menu g-menu" data-perch="card"><div className="tt-menu-art" aria-hidden="true">${['c','a','t','','s','u','n'].map((ch,i)=>html`<i key=${i} className=${ch?'':'e'} style=${{'--d':i*.08+'s'}}>${ch}</i>`)}</div>
      <h2>Собирай слова из падающих букв</h2><p>Буквы падают в стакан. Нажми на столбец — буква упадёт туда. Когда буквы по горизонтали (слева направо) или вертикали (сверху вниз) складываются в английское слово из 3+ букв, оно сгорает. Подсказка показывает слово, которое можно собрать из ближайших букв.</p>
      <h3 className="sp-h">Сложность</h3>
      <div className="sp-diff tt-diff" role="radiogroup" aria-label="Сложность">${Object.entries(TT_DIFF).map(([k,d])=>html`<button key=${k} role="radio" aria-checked=${diff===k} id=${'tt-diff-'+k} className=${'sp-dbtn d-'+k+(diff===k?' on':'')} onClick=${()=>{ SFX('tap'); setDiff(k); }}><b>${d.name}</b><small>${d.sub}</small></button>`)}</div>
      <div className="sp-best"><span><b>${tt.best||0}</b><small>рекорд</small></span><span><b>${tt.bestWords||0}</b><small>слов за игру</small></span><span><b>${tt.games||0}</b><small>${plural(tt.games||0,'игра','игры','игр')}</small></span></div>
      <button className="btn rn-start g-start" id="tt-start" onClick=${start}>Играть</button></div></section>`;
  if(phase==='over'&&res) return html`<section className="g-tetris">${top}<${GameWin} tone="accent" kicker=${'Словопад · '+D.name.toLowerCase()} title=${res.record?'Новый рекорд!':res.words.length>=10?'Отлично!':res.words.length>=4?'Хорошо!':'Попробуй ещё раз'} big=${res.words.length} bigLabel=${plural(res.words.length,'слово','слова','слов')} stars=${res.words.length>=15?3:res.words.length>=8?2:res.words.length>=3?1:0} coins=${res.coins} xp=${Math.round(res.score/3)} record=${res.record}
      stats=${[[res.score,'очков'],[res.level,'уровень'],[Math.max(0,...res.words.map(w=>w.length),0),'самое длинное']]}
      actions=${html`<button className="btn ghost" id="tt-menu" onClick=${()=>{ SFX('tap'); setPhase('menu'); }}>Меню</button><button className="btn" id="tt-again" onClick=${start}>Ещё раз</button>`}>
      ${res.words.length?html`<div className="gw-words">${[...new Set(res.words)].slice(0,24).map(w=>{ const i=wgInfo(w); return html`<button key=${w} className="gw-w" onClick=${()=>speak(w)}><b>${w}</b><small>${i.ru||''}</small></button>`; })}</div>`:null}
    <//></section>`;
  if(!g) return html`<section>${top}</section>`;
  const ghostR=(()=>{ if(!g.cur) return -1; let r=g.cur.r; while(r+1<TT_ROWS&&!g.grid[r+1][g.cur.c]) r++; return r; })();
  return html`<section className="tt g-tetris">${top}
    <div className="tt-hud" data-perch="card"><span className="sp-chip dr-chip">Уровень <b>${g.level}</b></span><span className="tt-next">Дальше: ${g.queue.slice(0,3).map((ch,i)=>html`<i key=${i}>${ch}</i>`)}</span><b className="dr-score">${g.score}</b></div>
    ${g.target?html`<p className="tt-tip">Можно собрать: <b>${g.target.en.toUpperCase()}</b> <span className="muted">— ${ruShort(g.target.ru)}</span></p>`:null}
    <div className="tt-well" style=${{'--cols':TT_COLS,'--rows':TT_ROWS}}>
      ${[...Array(TT_COLS)].map((_,c)=>html`<button key=${'col'+c} className=${'tt-col'+(g.cur&&g.cur.c===c?' on':'')} style=${{gridColumn:c+1,gridRow:'1 / -1'}} aria-label=${'Столбец '+(c+1)} onClick=${()=>drop(c)}></button>`)}
      ${g.grid.map((row,r)=>row.map((ch,c)=>ch?html`<span key=${r+'-'+c} className="tt-b" style=${{gridColumn:c+1,gridRow:r+1}}>${ch}</span>`:null))}
      ${g.cur&&ghostR>g.cur.r?html`<span className="tt-b ghost" style=${{gridColumn:g.cur.c+1,gridRow:ghostR+1}}>${g.cur.ch}</span>`:null}
      ${g.cur?html`<span className="tt-b cur" style=${{gridColumn:g.cur.c+1,gridRow:g.cur.r+1}}>${g.cur.ch}</span>`:null}
      ${pop?html`<div key=${pop.k} className="tt-pop"><b>${pop.w}</b>${pop.ru?html`<small>${pop.ru}</small>`:null}${pop.chain>1?html`<em>цепочка ×${pop.chain}</em>`:null}</div>`:null}
      ${phase==='pause'?html`<div className="cw-over enter"><b>Пауза</b><button className="btn" id="tt-resume" onClick=${()=>{ SFX('pop'); setPhase('play'); }}>Продолжить</button></div>`:null}
    </div>
    <div className="tt-ctl"><button className="btn ghost" id="tt-left" aria-label="Влево" onClick=${()=>move(-1)}>◀</button><button className="btn" id="tt-drop" onClick=${()=>drop(null)}>Уронить</button><button className="btn ghost" id="tt-right" aria-label="Вправо" onClick=${()=>move(1)}>▶</button></div>
  </section>`;
}

function GamesScreen({game,setGame,st,update,active}){
  useEffect(()=>{ window.scrollTo({top:0}); },[game]);
  const exit=()=>setGame(null);
  const GC={word:'#1F8A5B',cross:'#E8650C',tetris:'#C2410C',doors:'#0E7490',runner:'#1F8A5B',escape:'#B5652B',space:'#6A4BEA',catch:'#2F7FC1'};
  const Comp={word:WordGame,cross:CrossGame,tetris:TetrisGame,doors:DoorsGame,runner:RunnerGame,escape:EscapeGame,space:SpaceGame,catch:CatchGame}[game];
  const GN={word:'Угадай слово',cross:'Слова из букв',tetris:'Словопад',doors:'Двери',runner:'Раннер',escape:'Побег из комнаты',space:'Космический тир',catch:'Спаси Wordy'};
  if(Comp) return html`<div className=${'gk gk-'+game} style=${{'--gc':GC[game]}} data-game=${GN[game]}><${Comp} st=${st} update=${update} onExit=${exit} active=${active}/></div>`;
  const wg=st.wg||{}, cw=st.cw||{}, cx=st.cx||{}, cfg=wgCfg(wg.lvl||1), xcfg=cxCfg(cx.lvl||1);
  const bestC=Math.max(0,...Object.values(cw.best||{})), nRec=Object.keys(cw.best||{}).length;
  const card=(id,cls,i,art,title,desc,meta,say)=>html`<button className=${'game-card '+cls+' enter'} style=${{'--i':i}} id=${'game-'+id} onClick=${()=>{ SFX('pop'); setGame(id); W('react','happy'); if(say) W('say',say); }}>
      <span className="gc-art" aria-hidden="true">${art}</span>
      <span className="gc-main"><b>${title}</b><small>${desc}</small></span>
      <span className="gc-foot"><em>${meta}</em><span className="gc-go">Играть</span></span></button>`;
  return html`<section className="games">
    <div className="games-h" data-perch="card"><h2>Игры</h2><p>Учим английский играючи. За каждую игру — монеты.</p>
      <div className="gh-stats"><span><b>${wg.solved||0}</b><small>${plural(wg.solved||0,'слово угадано','слова угадано','слов угадано')}</small></span><span><b>${cx.solved||0}</b><small>${plural(cx.solved||0,'кроссворд','кроссворда','кроссвордов')}</small></span><span><b>${bestC}</b><small>лучший улов</small></span></div></div>
    ${card('word','gc-word',0,html`<span className="gc-tiles"><i className="g">W</i><i className="y">O</i><i>R</i><i className="g">D</i></span>`,'Угадай слово','Угадай английское слово по буквам. С каждым уровнем слова длиннее, а в уровне их больше — до пяти.','Уровень '+(wg.lvl||1)+' · '+cfg.len+' '+plural(cfg.len,'буква','буквы','букв')+' · '+cfg.n+' '+plural(cfg.n,'слово','слова','слов'),'Угадай слово по буквам!')}
    ${card('cross','gc-cross',1,html`<span className="gc-ring"><i>P</i><i>L</i><i>A</i><i>N</i><i>E</i><i>T</i></span>`,'Слова из букв','Соединяй буквы в круге и заполняй кроссворд. Лишние настоящие слова — бонусные монеты.','Уровень '+(cx.lvl||1)+' · '+xcfg.len+' '+plural(xcfg.len,'буква','буквы','букв'),null)}
    ${card('space','gc-space',2,html`<span className="gc-space-art"><i className="r1">orbit</i><i className="r2">star</i><span className="gc-planet"></span></span>`,'Космический тир','На планету летят астероиды со словами. Печатай слово — Wordy сбивает астероид. Есть режим с переводом.',(st.sp||{}).best?'Рекорд '+st.sp.best+' · волна '+(st.sp.bestWave||1):'Ещё не играл','Защищаем планету!')}
    ${card('doors','gc-doors',3,html`<span className="gc-dr-art">${DR_SCENE({l:'went',r:'goed',state:null,pick:null,lv:1})}</span>`,'Двери','Идёшь по коридору и выбираешь дверь с верным вариантом. Таймер: 10 секунд, и с каждым этажом всё меньше.',(st.dr||{}).best?'Рекорд '+st.dr.best+' · этаж '+(st.dr.bestLevel||1):'Ещё не играл','Выбирай дверь!')}
    ${card('tetris','gc-tetris',4,html`<span className="gc-tt-art">${['c','a','t','','s','u','n','','r','e','d',''].map((c,i)=>html`<i key=${i} className=${c?'':'e'}>${c}</i>`)}</span>`,'Словопад','Тетрис из букв: роняй буквы в столбцы и собирай английские слова по горизонтали и вертикали.',(st.tt||{}).best?'Рекорд '+st.tt.best+' · '+(st.tt.bestWords||0)+' слов':'Ещё не играл','Собираем слова из букв!')}
    ${card('escape','gc-escape',5,html`<span className="gc-esc-art"><svg viewBox="0 0 360 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${ESC_BG({wall:'#F3D9B8',pat:'stripes',floor:'wood'},'hub')}${EA.door({x:40})}${EA.clock({x:200,y:70,h:2})}${EA.box({x:210,y:320,w:70,h:50})}</svg></span>`,'Побег из комнаты','Осматривай комнату, читай английские записки и находи коды к замкам. '+ESC_ROOMS.length+' мест: от спальни и кухни до замка, космической станции и банка.',Object.keys((st.esc||{}).done||{}).length?'Пройдено '+Object.keys(st.esc.done).length+' из '+ESC_ROOMS.length:'Ещё не играл','Найдём выход вместе!')}
    ${card('catch','gc-catch',6,html`<span className="gc-sky"><i className="fall">went</i><i className="fall b">goed</i><span className="gc-mini"></span></span>`,'Спаси Wordy','Води Wordy пальцем и лови правильные слова, а от неправильных уворачивайся. '+CW_TOPICS.length+' тем: от животных до пассива.',nRec?'Рекорды в '+nRec+' '+plural(nRec,'теме','темах','темах'):'Ещё не играл','Выбирай тему и спасай меня!')}
  </section>`;
}
const gamesIcon=()=>svg(html`<path d="M7.5 7h9a5 5 0 0 1 4.9 6l-.6 3a2.6 2.6 0 0 1-4.5 1.2L15 16H9l-1.3 1.2A2.6 2.6 0 0 1 3.2 16l-.6-3A5 5 0 0 1 7.5 7z"/><path d="M8 10v4M6 12h4"/><circle cx="15.5" cy="11" r=".6"/><circle cx="17.5" cy="13" r=".6"/>`);
/* ---- Wordy coach: a personal plan for today, built from the student's own progress ---- */
const PLAN_GAMES=[['doors','Двери'],['word','Угадай слово'],['catch','Спаси Wordy'],['space','Космический тир'],['tetris','Словопад'],['cross','Слова из букв'],['escape','Побег из комнаты']];
const gamesPlayed=s=>((s.wg||{}).solved||0)+((s.cx||{}).solved||0)+((s.tt||{}).games||0)+((s.dr||{}).games||0)+((s.sp||{}).games||0)+((s.cw||{}).games||0)+Object.keys((s.esc||{}).done||{}).length+((s.rn||{}).games||0);
function makePlan(s){ const items=[], due=dueWords(s).length, d=s.daily;
  if(due>0) items.push({id:'review',n:Math.min(due,12)});
  if(d&&!d.done&&d.ids&&d.ids.length) items.push({id:'daily',n:d.ids.length});
  const atLv=i=>!gKnown(s,i)&&gOpen(s,i);
  let li=-1; for(let i=0;i<GL.length;i++){ const sN=(s.gstars||{})[GL[i].id]||0; if(sN===1&&atLv(i)){ li=i; break; } }
  if(li<0) for(let i=0;i<GL.length;i++){ if(!((s.gstars||{})[GL[i].id])&&atLv(i)){ li=i; break; } }
  if(li>=0) items.push({id:'lesson',i:li,weak:((s.gstars||{})[GL[li].id]||0)===1});
  const dn=new Date(), gi=(dn.getFullYear()*372+dn.getMonth()*31+dn.getDate())%PLAN_GAMES.length; items.push({id:'game',g:PLAN_GAMES[gi][0],name:PLAN_GAMES[gi][1]});
  return {day:dayKey(),items:items.slice(0,4),base:{reviews:s.reviews||0,stars:gStarsTotal(s),games:gamesPlayed(s)},rewarded:false}; }
function planDone(s,p,it){ if(it.id==='review') return (s.reviews||0)>p.base.reviews||dueWords(s).length===0;
  if(it.id==='daily') return !!(s.daily&&s.daily.done); if(it.id==='lesson') return gStarsTotal(s)>p.base.stars||((s.gstars||{})[GL[it.i].id]||0)>=2&&!it.weak||((s.gstars||{})[GL[it.i].id]||0)>=(it.weak?2:1);
  if(it.id==='game') return gamesPlayed(s)>p.base.games; return false; }
function planLine(s,p){ const names=p.items.map(it=>it.id==='review'?'повторить '+it.n+' '+plural(it.n,'слово','слова','слов'):it.id==='daily'?'выучить слова дня':it.id==='lesson'?(it.weak?'подтянуть урок «'+GL[it.i].title+'»':'урок «'+GL[it.i].title+'»'):'сыграть в «'+it.name+'»');
  return names.length?'План на сегодня: '+names.join(', ')+'. Поехали?':'Сегодня можно просто поиграть!'; }
function PlanCard({st,update,startReview,startDaily,openLevel,openGame}){
  const p=st.plan&&st.plan.day===dayKey()?st.plan:null;
  useEffect(()=>{ if(!st.level) return; const bad=p&&p.items.some(it=>it.id==='lesson'&&gKnown(st,it.i)); if(!p||bad||(p&&p.lvl&&p.lvl!==st.level)) update(s=>({plan:{...makePlan(s),lvl:s.level}})); },[st.level,p&&p.day]);
  const done=p?p.items.map(it=>planDone(st,p,it)):[], all=p&&p.items.length&&done.every(Boolean), n=done.filter(Boolean).length;
  useEffect(()=>{ if(!p||!all||p.rewarded) return; update(s=>({coins:s.coins+30,plan:{...s.plan,rewarded:true}})); setTimeout(()=>{ SFX('fanfare'); FX('rain',90); W('react','dance'); W('say','План на сегодня выполнен! +30 монет. Горжусь тобой!',0,true); },600); },[all,p&&p.rewarded]);
  // morning greeting once a day
  useEffect(()=>{ if(!p||st.coachSaid===dayKey()) return; const gap=st.lastDay?Math.round((new Date(dayKey())-new Date(st.lastDay))/864e5):0;
    const t=setTimeout(()=>{ update(()=>({coachSaid:dayKey()})); const hi=greeting()+(st.sname?', '+st.sname.split(' ')[0]:'')+'!';
      if(gap>=3){ W('react','wave'); W('say',hi+' Тебя не было '+gap+' '+plural(gap,'день','дня','дней')+' — я скучал. Начнём с короткого повторения?',0,true); }
      else if(st.lastDay===dayKey(-1)&&st.streak>1){ W('react','happy'); W('say',hi+' Серия '+st.streak+' '+plural(st.streak,'день','дня','дней')+' — не прерывай! '+planLine(st,p),0,true); }
      else { W('react','wave'); W('say',hi+' '+planLine(st,p),0,true); } },2600); return ()=>clearTimeout(t); },[p&&p.day]);
  if(!p||!p.items.length) return null;
  const go=it=>{ SFX('pop'); if(it.id==='review') startReview(); else if(it.id==='daily') startDaily(); else if(it.id==='lesson') openLevel(it.i); else openGame(it.g); };
  const row=(it,k)=>{ const d=done[k], title=it.id==='review'?'Повтори '+it.n+' '+plural(it.n,'слово','слова','слов'):it.id==='daily'?'Слова дня':it.id==='lesson'?(it.weak?'Подтяни урок':'Урок грамматики'):'Игра дня',
      sub=it.id==='review'?'Они как раз начали забываться':it.id==='daily'?it.n+' '+plural(it.n,'новое слово','новых слова','новых слов'):it.id==='lesson'?'«'+GL[it.i].title+'»'+(it.weak?' — сейчас 1 звезда':''):'«'+it.name+'»';
    return html`<li key=${it.id} className=${d?'done':''}><span className="pl-chk" aria-hidden="true">${d?'✓':k+1}</span><span className="pl-main"><b>${title}</b><small>${sub}</small></span>${d?html`<span className="pl-ok">Готово</span>`:html`<button className="btn small" id=${'plan-'+it.id} onClick=${()=>go(it)}>${it.id==='game'?'Играть':'Начать'}</button>`}</li>`; };
  return html`<section className=${'plan-card enter'+(all?' all':'')} aria-label="План на сегодня">
    <div className="pl-h"><span className="pl-face" aria-hidden="true"><i></i><i></i></span><div><b>${all?'План выполнен!':'План от Wordy на сегодня'}</b><small>${all?'Ты сделал всё, что я задумал. Можно отдыхать или играть.':'Я собрал его по твоему прогрессу'}</small></div><span className="pl-n">${n}/${p.items.length}</span></div>
    <div className="pl-bar"><i style=${{width:(n/p.items.length*100)+'%'}}></i></div>
    <ul className="pl-list">${p.items.map(row)}</ul>
    ${!all?html`<p className="pl-reward">${I.coin()} +30 монет за весь план</p>`:null}
  </section>`;
}

/* ---- Wordy's House: rooms to upgrade and decorate, plus the wardrobe ---- */
const HS_WALLS=__WD[1335];
const HS_FLOORS=__WD[1336];
const C=(name,price,c)=>({name,price,c});
const HS_ROOMS=[
 {id:'living',name:'Гостиная',houseLv:1,wall:'cream',floor:'wood',light:{light:'window',lx:200,ly:80},
  base:()=>EA.win({x:150,y:42,w:100,h:80}),
  slots:[
   {id:'sofa',name:'Диван',lv:1,opts:[C('Фиолетовый',0,'#8E5A7E'),C('Синий бархат',120,'#4A6FA5'),C('Изумрудный',150,'#2E8B6A'),C('Кожаный',260,'#7A4C2C'),C('Солнечный',180,'#E2A50C')],art:o=>EA.sofa({x:108,y:262,w:150,c:o.c})},
   {id:'rug',name:'Ковёр',lv:1,opts:[C('Красный',0,'#D9534F'),C('Оранжевый',60,'#E8650C'),C('Синий',80,'#3E7CB1'),C('Мятный',80,'#5DB89A'),C('Королевский',200,'#7B3FA0')],art:o=>EA.rug({x:185,y:362,w:170,c:o.c})},
   {id:'plant',name:'Растение',lv:1,opts:[C('Маленький фикус',0,1),C('Большой фикус',70,1.35),C('Цветы в вазе',90,'vase')],art:o=>o.c==='vase'?EA.vase({x:52,y:296}):EA.plant({x:52,y:302,s:o.c})},
   {id:'picture',name:'Картина',lv:2,opts:[C('Холмы',0,'hills'),C('Корабль',90,'ship'),C('Ночной город',120,'city'),C('Семья',100,'family'),C('Портрет',140,'face')],art:o=>o.c==='city'||o.c==='family'||o.c==='face'?EA.frame2({x:28,y:52,w:76,h:58,kind:o.c}):EA.frame({x:24,y:52,w:84,h:60,kind:o.c})},
   {id:'lamp',name:'Торшер',lv:2,opts:[C('Классический',0,'#F2C76A'),C('Мятный',80,'#8FD3C1'),C('Розовый',80,'#F4A6B8')],art:o=>html`<g>${EA.lamp({x:338,y:150})}<path d=${'M318 150 h40 l-10 -30 h-20z'} fill=${o.c}/></g>`},
   {id:'shelf',name:'Книжный шкаф',lv:3,opts:[C('Тёмный',0,'#5A361E'),C('Светлый',120,'#B07A4F')],art:o=>EA.shelf({x:10,y:126,w:86,h:154,books:[{c:'#C0392B',row:0},{c:'#2980B9',row:0},{c:'#F1C40F',row:0,short:1},{c:'#27AE60',row:1},{c:'#8E44AD',row:1,short:1},{c:'#E67E22',row:2},{c:'#16A085',row:2}]})},
   {id:'tv',name:'Телевизор',lv:3,opts:[C('Обычный',0,''),C('Большой',200,'big')],art:o=>html`<g>${EA.tvstand({x:262,y:258,w:66})}${EA.tv({x:o.c==='big'?258:268,y:o.c==='big'?190:204,w:o.c==='big'?74:54,h:o.c==='big'?52:40})}</g>`},
   {id:'clock',name:'Часы',lv:3,opts:[C('Деревянные',0,''),C('Золотые',150,'gold')],art:o=>html`<g>${EA.clock({x:296,y:66,r:20,h:new Date().getHours(),m:new Date().getMinutes()})}${o.c==='gold'?html`<circle cx="296" cy="66" r="22" fill="none" stroke="#E8C35A" stroke-width="4"/>`:null}</g>`}]},
 {id:'bedroom',name:'Спальня',houseLv:2,wall:'lavender',floor:'blue',light:{light:'window',lx:250,ly:80},
  base:()=>EA.win({x:206,y:46,w:92,h:76,cur:'#B39DDB'}),
  slots:[
   {id:'bed',name:'Кровать',lv:1,opts:[C('Голубое одеяло',0,'#6FA8DC'),C('Розовое',90,'#F4A6B8'),C('Звёздное',160,'#3E4E8C'),C('Апельсиновое',120,'#FF9A3C')],art:o=>EA.bed({x:176,y:236,w:150,c:o.c})},
   {id:'nightstand',name:'Тумбочка',lv:1,opts:[C('Деревянная',0,'#9A6740'),C('Белая',70,'#E4E7EA')],art:o=>html`<g>${EA.desk({x:112,y:252,w:54,c:o.c})}${EA.candle({x:138,y:236})}</g>`},
   {id:'rug',name:'Коврик',lv:1,opts:[C('Сиреневый',0,'#9C7BC4'),C('Белый пушистый',90,'#F4F1EA'),C('Оранжевый',60,'#E8650C')],art:o=>EA.rug({x:200,y:372,w:160,c:o.c})},
   {id:'teddy',name:'Игрушка',lv:2,opts:[C('Мишка',0,'bear'),C('Утёнок',60,'duck')],art:o=>o.c==='duck'?html`<g><ellipse cx="300" cy="226" rx="12" ry="8" fill="#F1C40F"/><circle cx="308" cy="216" r="7" fill="#F1C40F"/><path d="M314 216 l6 2 l-6 2z" fill="#E67E22"/></g>`:EA.teddy({x:300,y:214})},
   {id:'clock',name:'Будильник',lv:2,opts:[C('Классика',0,'')],art:()=>EA.clock({x:96,y:72,r:20,h:7})},
   {id:'picture',name:'Картина',lv:2,opts:[C('Ночной город',0,'city'),C('Холмы',70,'hills'),C('Корабль',90,'ship')],art:o=>o.c==='city'?EA.frame2({x:118,y:56,w:60,h:50,kind:'city'}):EA.frame({x:116,y:56,w:64,h:50,kind:o.c})},
   {id:'wardrobe',name:'Шкаф',lv:3,opts:[C('Дубовый',0,'#9A6740'),C('Белый',140,'#E4E0D8'),C('Мятный',140,'#8FB8A8')],art:o=>EA.wardrobe({x:12,y:102,w:86,c:o.c})},
   {id:'plant',name:'Растение',lv:3,opts:[C('Фикус',0,1),C('Большой фикус',70,1.3)],art:o=>EA.plant({x:344,y:302,s:o.c})}]},
 {id:'kitchen',name:'Кухня',houseLv:3,wall:'mint',floor:'tile',light:{light:'window',lx:270,ly:76},
  base:()=>EA.win({x:230,y:44,w:84,h:64,cur:'#F2C76A'}),
  slots:[
   {id:'fridge',name:'Холодильник',lv:1,opts:[C('Белый',0,'w'),C('Ретро-мятный',150,'m')],art:o=>o.c==='m'?html`<g>${EA.fridge({x:12})}<rect x="12" y="110" width="66" height="190" rx="8" fill="#8FD3C1" opacity=".55"/></g>`:EA.fridge({x:12})},
   {id:'counter',name:'Тумба',lv:1,opts:[C('Дерево',0,'#C58B5A'),C('Графит',120,'#5B6270'),C('Белая',100,'#E4E7EA')],art:o=>html`<g>${EA.counter({x:84,w:120})}<rect x="88" y="236" width="112" height="58" fill=${o.c} opacity=${o.c==='#C58B5A'?0:.85}/></g>`},
   {id:'stove',name:'Плита',lv:2,opts:[C('Обычная',0,'')],art:()=>EA.stove({x:208,w:66})},
   {id:'wallcab',name:'Шкафчик',lv:2,opts:[C('Дерево',0,''),C('Белый',90,'w')],art:o=>html`<g>${EA.wallcab({x:92,y:64,w:104})}${o.c==='w'?html`<rect x="92" y="64" width="104" height="70" rx="3" fill="#F4F1EA" opacity=".8"/>`:null}</g>`},
   {id:'table',name:'Столик',lv:3,opts:[C('С белой скатертью',0,'#F4F1EA'),C('С клеткой',80,'#E57373')],art:o=>EA.table({x:282,y:262,w:72,cloth:o.c})},
   {id:'cake',name:'Угощение',lv:3,opts:[C('Шоколадный торт',0,'cake'),C('Цветы',60,'vase')],art:o=>o.c==='vase'?EA.vase({x:318,y:232}):EA.cake({x:318,y:246})}]},
 {id:'study',name:'Кабинет',houseLv:4,wall:'sky',floor:'dark',light:{light:'lamp',lx:200,ly:180},
  base:()=>EA.win({x:276,y:46,w:70,h:70,cur:'#7E6BB0'}),
  slots:[
   {id:'desk',name:'Стол',lv:1,opts:[C('Тёмный',0,'#6B4A2E'),C('Светлый',90,'#C58B5A')],art:o=>EA.desk({x:124,y:236,w:140,c:o.c})},
   {id:'shelf',name:'Шкаф с книгами',lv:1,opts:[C('Обычный',0,'')],art:()=>EA.shelf({x:12,y:110,w:100,h:170,books:[{c:'#C0392B',row:0},{c:'#2980B9',row:0},{c:'#F1C40F',row:0},{c:'#27AE60',row:1},{c:'#8E44AD',row:1},{c:'#E67E22',row:1,short:1},{c:'#16A085',row:2},{c:'#7F8C8D',row:2}]})},
   {id:'computer',name:'Компьютер',lv:2,opts:[C('Монитор',0,'')],art:()=>EA.computer({x:162,y:188})},
   {id:'globe',name:'Глобус',lv:2,opts:[C('Старинный',0,'')],art:()=>EA.globe({x:300,y:250})},
   {id:'board',name:'Доска',lv:3,opts:[C('Пробковая',0,'')],art:()=>EA.board({x:130,y:44,w:120,h:84})},
   {id:'lamp',name:'Лампа',lv:3,opts:[C('Тёплая',0,'#F2C76A')],art:()=>EA.candle({x:240,y:220})}]},
];
const HS_HOUSE=[{lv:1,name:'Хижина',price:0},{lv:2,name:'Домик',price:250},{lv:3,name:'Дом',price:500},{lv:4,name:'Особняк',price:900}];
const HS_ROOM_UP=[0,150,300];
function hsState(st){ const h=st.house||{}; return {lv:h.lv||1,rooms:h.rooms||{},owned:h.owned||[]}; }
function hsRoom(h,r){ const s=h.rooms[r.id]||{}; return {lv:s.lv||1,wall:s.wall||r.wall,floor:s.floor||r.floor,items:s.items||{}}; }
function HouseScene({room,rs,prev,small}){ const wall=HS_WALLS.find(w=>w.id===(prev&&prev.k==='wall'?prev.v:rs.wall))||HS_WALLS[0], fl=HS_FLOORS.find(f=>f.id===(prev&&prev.k==='floor'?prev.v:rs.floor))||HS_FLOORS[0];
  const id='hs-'+room.id+(small?'s':'');
  return html`<svg viewBox="0 0 360 420" preserveAspectRatio="xMidYMid slice" aria-hidden=${small?'true':undefined} role=${small?undefined:'img'} aria-label=${small?undefined:room.name}>
    ${ESC_BG({wall:wall.wall,pat:wall.pat,floor:fl.floor,fc:fl.fc},id)}
    ${room.base()}
    ${room.slots.filter(sl=>sl.lv<=rs.lv).map(sl=>{ const oi=prev&&prev.k===sl.id?prev.v:(rs.items[sl.id]!=null?rs.items[sl.id]:0), o=sl.opts[oi]||sl.opts[0]; return html`<g key=${sl.id} className=${prev&&prev.k===sl.id?'hs-prev':''}>${sl.art(o)}</g>`; })}
    ${ESC_FX({...room.light,night:wall.id==='navy'},id)}
  </svg>`; }
function HouseArt({lv}){ const w=[150,190,230,270][lv-1], x=180-w/2, h=[90,110,150,160][lv-1], y=250-h;
  return html`<svg viewBox="0 0 360 300" preserveAspectRatio="xMidYMax slice" className="hs-ext" aria-hidden="true">
    <defs><linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE0FA"/><stop offset="1" stop-color="#FFF1DE"/></linearGradient></defs>
    <rect width="360" height="300" fill="url(#hs-sky)"/><circle cx="300" cy="50" r="22" fill="#FFD36B"/>
    <ellipse cx="80" cy="60" rx="34" ry="11" fill="#fff" opacity=".8"/><ellipse cx="110" cy="52" rx="22" ry="9" fill="#fff" opacity=".8"/>
    <path d="M0 236 Q90 210 180 230 T360 226 V300 H0Z" fill="#8BCF6B"/><rect y="250" width="360" height="50" fill="#7CBF5A"/>
    ${lv>=4?html`<g><rect x=${x+w-46} y=${y-50} width="40" height=${h+50} fill="#E9D3B4"/><path d=${`M${x+w-52} ${y-50} L${x+w-26} ${y-86} L${x} ${y-50}`} fill="none"/><path d=${`M${x+w-52} ${y-50} l26 -36 l26 36z`} fill="#B5452B"/><rect x=${x+w-34} y=${y-30} width="16" height="20" rx="8" fill="#FFE9A8"/></g>`:null}
    <rect x=${x} y=${y} width=${w} height=${h} fill=${lv===1?'#B88A5E':'#F1E2C8'}/>
    ${lv===1?[...Array(6)].map((_,i)=>html`<rect key=${i} x=${x} y=${y+i*15} width=${w} height="13" fill="rgba(0,0,0,.06)"/>`):null}
    <path d=${`M${x-14} ${y} L180 ${y-(lv===1?50:70)} L${x+w+14} ${y}Z`} fill=${lv===1?'#7A4C2C':'#C0502E'}/>
    <rect x=${x+w*.68} y=${y-(lv===1?36:50)} width="16" height="30" fill="#8A5A36"/>
    <rect x="166" y=${250-56} width="28" height="56" rx="3" fill="#7A4C2C"/><circle cx="188" cy=${250-28} r="2.5" fill="#E8C35A"/>
    ${[[x+16,250-56],[x+w-42,250-56]].map(([wx,wy],i)=>html`<g key=${i}><rect x=${wx} y=${wy} width="26" height="24" rx="2" fill="#FFE9A8" stroke="#F4F1EA" stroke-width="3"/><line x1=${wx+13} y1=${wy} x2=${wx+13} y2=${wy+24} stroke="#F4F1EA" stroke-width="2"/></g>`)}
    ${lv>=3?[[x+16,y+12],[x+w/2-13,y+12],[x+w-42,y+12]].map(([wx,wy],i)=>html`<g key=${'u'+i}><rect x=${wx} y=${wy} width="26" height="24" rx="2" fill="#FFE9A8" stroke="#F4F1EA" stroke-width="3"/></g>`):null}
    ${lv>=2?html`<g><rect x=${x-40} y="216" width="30" height="34" rx="4" fill="#5E9C62"/><circle cx=${x-25} cy="210" r="18" fill="#4E9A55"/></g>`:null}
    <rect x="150" y="250" width="60" height="50" fill="#D9C2A0"/>
  </svg>`; }
const HS_EM={sofa:'🛋️',rug:'🟫',plant:'🌿',picture:'🖼️',lamp:'💡',shelf:'📚',tv:'📺',clock:'🕰️',bed:'🛏️',nightstand:'🕯️',teddy:'🧸',wardrobe:'🚪',fridge:'🧊',counter:'🗄️',stove:'🍳',wallcab:'🗃️',table:'🍽️',cake:'🎂',desk:'🪑',computer:'💻',globe:'🌍',board:'📌'};
function House({st,update,preview,setPreview}){
  const [view,setView]=useState('home'); const [rid,setRid]=useState(null); const [grp,setGrp]=useState('furn'); const [tab,setTab]=useState(null); const [prev,setPrev]=useState(null);
  const h=hsState(st), room=HS_ROOMS.find(r=>r.id===rid), rs=room?hsRoom(h,room):null;
  useEffect(()=>{ window.scrollTo({top:0}); setPrev(null); },[view,rid]);
  const setRoom=f=>update(s=>{ const hh=hsState(s), cur=hsRoom(hh,room); return {house:{...hh,rooms:{...hh.rooms,[room.id]:{...cur,...f(cur)}}}}; });
  const pay=(price,el)=>{ if(st.coins<price){ SFX('wrong'); W('react','think'); W('say','Не хватает '+(price-st.coins)+' '+plural(price-st.coins,'монеты','монет','монет')+'. Поиграем и заработаем?',0,true); return false; } update(s=>({coins:s.coins-price})); SFX('unlock'); if(el) FX('confetti',el,50); return true; };
  if(view==='wardrobe') return html`<div className="hs-wr"><div className="sess-top hs-top"><button className="icon-btn" id="hs-back-w" onClick=${()=>{ SFX('tap'); setPreview(null); setView('home'); }} aria-label="В домик">${I.back()}</button><span className="phase">Гардероб</span></div><${Wardrobe} st=${st} update=${update} preview=${preview} setPreview=${setPreview}/></div>`;
  if(view==='room'&&room){
    const nextUp=rs.lv<3?HS_ROOM_UP[rs.lv]:null, openSlots=room.slots.filter(sl=>sl.lv<=rs.lv), lockedN=room.slots.length-openSlots.length;
    const upgrade=e=>{ if(!pay(nextUp,e.currentTarget)) return; setRoom(c=>({lv:c.lv+1})); W('react','dance'); W('say',pick(['Комната стала больше!','Ура, ремонт!','Теперь тут ещё уютнее!']),0,true); };
    const subs=[...openSlots.map(sl=>[sl.id,sl.name]),['wall','Обои'],['floor','Пол']];
    const t=subs.find(x=>x[0]===tab)?tab:subs[0]&&subs[0][0];
    const cur=t==='wall'?{opts:HS_WALLS,sel:rs.wall,key:'wall'}:t==='floor'?{opts:HS_FLOORS,sel:rs.floor,key:'floor'}:(()=>{ const sl=room.slots.find(x=>x.id===t); return sl?{opts:sl.opts,sel:rs.items[sl.id]!=null?rs.items[sl.id]:0,key:sl.id,slot:sl}:null; })();
    const ownKey=(k,v)=>k==='wall'?'wall.'+v:k==='floor'?'floor.'+v:room.id+'.'+k+'.'+v;
    const owns=(k,v,price)=>!price||h.owned.includes(ownKey(k,v));
    const valOf=(o,i)=>cur.key==='wall'||cur.key==='floor'?o.id:i;
    const apply=v=>setRoom(c=>cur.key==='wall'||cur.key==='floor'?{[cur.key]:v}:{items:{...c.items,[cur.key]:v}});
    const choose=(o,i,e)=>{ const v=valOf(o,i);
      if(!owns(cur.key,v,o.price)){ if(prev&&prev.k===cur.key&&prev.v===v){ buy(o,v,e.currentTarget); return; } SFX('pop'); setPrev({k:cur.key,v}); W('react','think'); return; }
      SFX('pop'); setPrev(null); apply(v); W('react','happy'); };
    const buy=(o,v,el)=>{ if(!pay(o.price,el)) return; update(s=>{ const hh=hsState(s); return {house:{...hh,owned:[...hh.owned,ownKey(cur.key,v)]}}; }); apply(v); setPrev(null); W('react','cheer'); W('say',pick(['Мне нравится!','Красота!','Как уютно!']),0,true); };
    const pvOpt=prev&&cur&&prev.k===cur.key?cur.opts.find((o,i)=>valOf(o,i)===prev.v):null;
    const selOpt=cur?cur.opts.find((o,i)=>valOf(o,i)===cur.sel):null;
    return html`<section className="hs hs2">
      <div className="sess-top hs-top"><button className="icon-btn" id="hs-back" onClick=${()=>{ SFX('tap'); setView('home'); }} aria-label="В домик">${I.back()}</button><span className="phase" style=${{flex:1}}>${room.name}</span>
        ${nextUp!=null?html`<button className="hs-upchip" id="hs-up" onClick=${upgrade} title=${'Откроется: '+room.slots.filter(sl=>sl.lv===rs.lv+1).map(sl=>sl.name.toLowerCase()).join(', ')}>Улучшить <em>${I.coin()}${nextUp}</em></button>`:html`<span className="hs-lv">★ макс</span>`}</div>
      <div className="hs-scene"><${HouseScene} room=${room} rs=${rs} prev=${prev}/><div className="hs-floor" data-perch="stage"></div></div>
      <div className="hs-ed">
        <div className="hs-subs">${subs.map(([k,n])=>html`<button key=${k} id=${'hs-t-'+k} className=${'hs-sub'+(t===k?' on':'')} onClick=${()=>{ SFX('tap'); setTab(k); setPrev(null); }}>${n}</button>`)}</div>
        ${cur?html`<div className="hs-row">${cur.opts.slice(0,5).map((o,i)=>{ const v=valOf(o,i), on=cur.sel===v, own=owns(cur.key,v,o.price), pv=prev&&prev.k===cur.key&&prev.v===v;
            const sw=cur.key==='wall'?o.wall:cur.key==='floor'?o.fc:(typeof o.c==='string'&&o.c[0]==='#'?o.c:null);
            return html`<button key=${i} id=${'hs-o-'+cur.key+'-'+i} className=${'hs-dot'+(on?' on':'')+(pv?' pv':'')} aria-label=${o.name+(own?'':' — '+o.price+' монет')} onClick=${e=>choose(o,i,e)}>
              <span className="hs-sw2" style=${sw?{background:sw}:{}}>${sw?(cur.key==='wall'&&o.pat!=='none'?html`<i className=${'p-'+o.pat}></i>`:null):html`<span>${HS_EM[cur.key]||'•'}</span>`}${on?html`<b className="hs-check">✓</b>`:null}</span>
              ${!own?html`<small>${I.coin()}${o.price}</small>`:null}</button>`; })}</div>
          ${pvOpt?html`<div className="hs-cap"><span><b>${pvOpt.name}</b></span><button className="btn small hs-buy" id="hs-buy" onClick=${e=>buy(pvOpt,prev.v,e.currentTarget)}>Купить ${I.coin()} ${pvOpt.price}</button></div>`:null}`:null}
      </div>
    </section>`; }
  const hl=HS_HOUSE[h.lv-1], nx=HS_HOUSE[h.lv];
  const comfort=Math.min(100,Math.round((h.lv*12)+HS_ROOMS.reduce((n,r)=>n+(r.houseLv<=h.lv?hsRoom(h,r).lv*6:0),0)+h.owned.length*2));
  const upHouse=e=>{ if(!pay(nx.price,e.currentTarget)) return; update(s=>{ const hh=hsState(s); return {house:{...hh,lv:hh.lv+1}}; }); W('react','dance'); W('say','У нас теперь '+nx.name.toLowerCase()+'! Новая комната открыта!',0,true); };
  const roomCard=(id,name,thumb,meta,onClick,locked)=>html`<button key=${id} className=${'hs-rc'+(locked?' locked':'')} id=${'hs-r-'+id} disabled=${locked} onClick=${onClick}>${thumb}<span className="hs-rc-l"><b>${name}</b>${meta?html`<small>${meta}</small>`:null}</span></button>`;
  const eq=st.equip||{}, worn=SLOT_ORDER.map(sl=>WORDY_ITEMS.find(i=>i.id===eq[sl])).filter(Boolean);
  return html`<section className="hs hs2">
    <div className="page-h"><div><h1>Домик</h1></div></div>
    <button className="hs-wcard" id="hs-r-wardrobe" onClick=${()=>{ SFX('pop'); setView('wardrobe'); W('react','happy'); W('say','Что сегодня наденем?'); }}>
      <span className="hs-wc-art" aria-hidden="true"><span className="wr-rack">${['#E74C3C','#3E7CB1','#F1C40F','#27AE60','#8E44AD'].map((c,i)=>html`<i key=${i} style=${{background:c}}></i>`)}</span></span>
      <span className="hs-wc-main"><b>Гардероб</b><small>${worn.length?'Сейчас: '+worn.map(i=>i.name.toLowerCase()).join(', '):'Наряди Wordy: шапки, очки, костюмы'}</small></span>
      <span className="hs-wc-go">Открыть</span></button>
    <div className="hs-hero"><${HouseArt} lv=${h.lv}/><div className="hs-lawn" data-perch="stage"></div>
      <span className="hs-badge">${hl.name} · уют ${comfort}%</span></div>
    ${nx?html`<button className="hs-upline" id="hs-house-up" onClick=${upHouse}><span>Расширить до «${nx.name}»</span><em>${I.coin()} ${nx.price}</em></button>`:null}
    <div className="sec-h"><h2>Комнаты</h2></div>
    <div className="hs-grid">
      ${HS_ROOMS.map(r=>{ const open=r.houseLv<=h.lv, s=hsRoom(h,r);
        return roomCard(r.id,r.name,html`<span className="hs-rc-t" aria-hidden="true">${open?html`<${HouseScene} room=${r} rs=${s} small=${true}/>`:html`<span className="hs-lock">${I.lock()}</span>`}</span>`,open?'★'.repeat(s.lv)+'☆'.repeat(3-s.lv):'«'+HS_HOUSE[r.houseLv-1].name+'»',()=>{ SFX('pop'); setRid(r.id); setGrp('furn'); setTab(null); setView('room'); W('react','happy'); },!open); })}
    </div>
  </section>`;
}
/* ================= USAGE STATS — one small doc per visitor per day: act/{day}_{aid} =================
   Anonymous: a random id in localStorage, no names or emails. Only the Wordy author can read it (rules). */
const TRK={aid:null,first:null,on:false,sess:0,xp:0,v:{},ms:0,lastIn:Date.now(),lvl:'',acc:false,day:null};
function trkInit(){ if(TRK.on||!window.WORDY_SITE) return;
  try{ let a=localStorage.getItem('wordy.aid'), f=localStorage.getItem('wordy.aid.first');
    if(!a||!/^[a-z0-9]{6,24}$/.test(a)){ a=(Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-6)).replace(/[^a-z0-9]/g,''); f=dayKey(); localStorage.setItem('wordy.aid',a); localStorage.setItem('wordy.aid.first',f); }
    if(!f||!/^\d{4}-\d\d-\d\d$/.test(f)){ f=dayKey(); localStorage.setItem('wordy.aid.first',f); }
    TRK.aid=a; TRK.first=f; }catch(e){ return; }
  TRK.on=true; TRK.sess=1; TRK.day=dayKey();
  const touch=()=>{ TRK.lastIn=Date.now(); }; ['pointerdown','keydown','scroll','touchstart'].forEach(e=>window.addEventListener(e,touch,{passive:true,capture:true}));
  /* active time: counts only while the tab is visible and the user did something in the last minute */
  setInterval(()=>{ if(document.visibilityState==='visible'&&Date.now()-TRK.lastIn<60000) TRK.ms+=15000; },15000);
  setInterval(trkFlush,180000);
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') trkFlush(); else touch(); });
  window.addEventListener('pagehide',trkFlush);
  setTimeout(trkFlush,8000); }
function trkView(layer){ if(!TRK.on) return; const k=String(layer||'home').toLowerCase().replace(/[^a-z0-9:_-]/g,'').slice(0,24)||'home';
  if(!(k in TRK.v)&&Object.keys(TRK.v).length>=30) return; TRK.v[k]=(TRK.v[k]||0)+1; }
function trkXp(d){ if(TRK.on&&d>0&&d<5000) TRK.xp+=Math.round(d); }
function trkMeta(lvl,acc){ TRK.lvl=String(lvl||'').slice(0,6); TRK.acc=!!acc; }
function trkFlush(){ if(!TRK.on) return; const fb=window.firebase; if(!fb||!fb.firestore||!fb.apps||!fb.apps.length) return;
  const min=Math.floor(TRK.ms/60000), vk=Object.keys(TRK.v); if(!TRK.sess&&!min&&!TRK.xp&&!vk.length) return;
  const day=dayKey(); if(day!==TRK.day){ TRK.day=day; TRK.sess=Math.max(TRK.sess,1); }
  const FV=fb.firestore.FieldValue, snap={sess:TRK.sess,xp:TRK.xp,v:TRK.v,min};
  const d={aid:TRK.aid,day,first:TRK.first,lvl:TRK.lvl,acc:TRK.acc,sess:FV.increment(snap.sess),min:FV.increment(min),xp:FV.increment(snap.xp)};
  if(vk.length) d.v=Object.fromEntries(vk.map(k=>[k,FV.increment(snap.v[k])]));
  TRK.sess=0; TRK.xp=0; TRK.v={}; TRK.ms-=min*60000;
  try{ fb.firestore().doc('act/'+day+'_'+TRK.aid).set(d,{merge:true}).catch(()=>{ TRK.sess+=snap.sess; TRK.xp+=snap.xp; TRK.ms+=min*60000; vk.forEach(k=>{ TRK.v[k]=(TRK.v[k]||0)+snap.v[k]; }); }); }catch(e){} }

const ST_NAMES=__WD[1337];
const stName=k=>ST_NAMES[k]||(k.startsWith('game:')?'Игра: '+({word:'Угадай слово',cross:'Слова из букв',space:'Космический тир',doors:'Двери',tetris:'Словопад',escape:'Побег из комнаты',catch:'Спаси Wordy'}[k.slice(5)]||k.slice(5)):k.startsWith('gram:')?'Грамматика':k);
function stCompute(docs,today){ const days=[]; for(let i=13;i>=0;i--){ const d=new Date(today+'T12:00:00'); d.setDate(d.getDate()-i); days.push(d.toISOString().slice(0,10)); }
  const shift=(day,n)=>{ const d=new Date(day+'T12:00:00'); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); };
  const byAid={}; docs.forEach(x=>{ (byAid[x.aid]=byAid[x.aid]||{first:x.first,days:{}}).days[x.day]=x; if(x.first<byAid[x.aid].first) byAid[x.aid].first=x.first; });
  const series=days.map(day=>{ const act=docs.filter(x=>x.day===day); return {day,act:act.length,neu:act.filter(x=>x.first===day).length}; });
  const wk=docs.filter(x=>x.day>shift(today,-7)), wkU=new Set(wk.map(x=>x.aid));
  const minAvg=wk.length?Math.round(wk.reduce((a,x)=>a+(x.min||0),0)/wk.length):0;
  const accShare=wkU.size?Math.round(100*new Set(wk.filter(x=>x.acc).map(x=>x.aid)).size/wkU.size):0;
  /* cohorts: users first seen in the last 30 days (old enough to have had a chance to return) */
  const coh=Object.values(byAid).filter(u=>u.first>=shift(today,-30));
  const d1base=coh.filter(u=>u.first<=shift(today,-1)), d1=d1base.filter(u=>u.days[shift(u.first,1)]).length;
  const d7base=coh.filter(u=>u.first<=shift(today,-7)), d7=d7base.filter(u=>Object.keys(u.days).some(d=>d>u.first&&d<=shift(u.first,7))).length;
  const learned=coh.filter(u=>Object.values(u.days).some(x=>(x.xp||0)>0)).length, back=coh.filter(u=>Object.keys(u.days).some(d=>d>u.first)).length;
  const views={}; wk.forEach(x=>Object.entries(x.v||{}).forEach(([k,n])=>{ views[k]=(views[k]||0)+n; }));
  const lv={}; wk.forEach(x=>{ if(x.lvl) lv[x.lvl]=(lv[x.lvl]||0)+1; });
  return {series,wkU:wkU.size,wkNew:wk.filter(x=>x.first===x.day).length,minAvg,accShare,
    d1:d1base.length?[d1,d1base.length]:null,d7:d7base.length?[d7,d7base.length]:null,
    funnel:[coh.length,learned,back],views:Object.entries(views).sort((a,b)=>b[1]-a[1]).slice(0,8),lvl:Object.entries(lv).sort((a,b)=>b[1]-a[1])}; }
const pct=(a)=>a?Math.round(100*a[0]/a[1])+'%':'—';
function OwnerStats(){ const {be,user}=useAcc(); const [open,setOpen]=useState(false), [data,setData]=useState(null), [err,setErr]=useState(null);
  const owner=window.__WORDY_TEST_OWNER||(be&&be.mode==='firebase'&&user&&user.email&&window.WORDY_OWNER&&user.email.toLowerCase()===String(window.WORDY_OWNER).toLowerCase());
  const load=()=>{ setErr(null); setData(null); const from=dayKey(-45);
    window.firebase.firestore().collection('act').where('day','>=',from).get().then(s=>setData(stCompute(s.docs.map(d=>d.data()),dayKey()))).catch(e=>setErr(e&&e.code==='permission-denied'?'Нет доступа: обнови правила Firestore (firebase deploy) и войди под '+window.WORDY_OWNER+'.':'Не удалось загрузить: '+(e&&e.message||e))); };
  if(!owner) return null;
  if(!open) return html`<div className="set-group"><div className="set-row"><div><strong>Статистика Wordy</strong><p>Видишь только ты: сколько людей заходит, возвращается и что открывает</p></div><button className="btn small" id="st-open" onClick=${()=>{ setOpen(true); load(); }}>Открыть</button></div></div>`;
  const mx=data?Math.max(1,...data.series.map(x=>x.act)):1;
  return html`<div className="set-group st-box" id="st-box"><div className="set-row wrap"><div><strong>Статистика Wordy</strong><p>Анонимно, по дням. Один человек = одно устройство.</p></div><div className="chips"><button className="chip" id="st-reload" onClick=${load}>Обновить</button><button className="chip" onClick=${()=>setOpen(false)}>Скрыть</button></div></div>
    ${err?html`<p className="st-err">${err}</p>`:!data?html`<p className="st-wait">Загружаю…</p>`:html`<div className="st-body">
      <div className="st-kpi"><div><b>${data.wkU}</b><span>человек за 7 дней</span></div><div><b>${data.wkNew}</b><span>новых за 7 дней</span></div><div><b>${data.minAvg} мин</b><span>в среднем за день</span></div><div><b>${data.accShare}%</b><span>с аккаунтом</span></div></div>
      <figure className="st-chart"><figcaption>Заходили в Wordy, последние 14 дней <i className="st-key"><em className="n"></em>новые <em className="r"></em>вернувшиеся</i></figcaption>
        <div className="st-bars">${data.series.map(x=>html`<div key=${x.day} className="st-col" title=${x.day+': '+x.act+' (новых '+x.neu+')'}><span className="st-v">${x.act||''}</span><div className="st-bar" style=${{height:'calc('+(x.act/mx).toFixed(3)+' * (100% - 34px))'}}><i style=${{height:(x.act?100*x.neu/x.act:0)+'%'}}></i></div><small>${x.day.slice(8)}</small></div>`)}</div></figure>
      <div className="st-two"><div><h4>Возвращаются ли</h4>
          <p><b>${pct(data.d1)}</b> пришли на следующий день${data.d1?html` <small>(${data.d1[0]} из ${data.d1[1]})</small>`:null}</p>
          <p><b>${pct(data.d7)}</b> вернулись в течение недели${data.d7?html` <small>(${data.d7[0]} из ${data.d7[1]})</small>`:null}</p>
          <h4>Путь новичка, 30 дней</h4>
          <ol className="st-fun">${[['Открыли Wordy',data.funnel[0]],['Сделали хоть одно задание',data.funnel[1]],['Вернулись в другой день',data.funnel[2]]].map(([t,n],i)=>html`<li key=${i}><span>${t}</span><b>${n}</b><div><i style=${{width:(data.funnel[0]?100*n/data.funnel[0]:0)+'%'}}></i></div></li>`)}</ol></div>
        <div><h4>Что открывают, 7 дней</h4><ol className="st-top">${data.views.length?data.views.map(([k,n])=>html`<li key=${k}><span>${stName(k)}</span><b>${n}</b></li>`):html`<li><span>Пока пусто</span></li>`}</ol>
          ${data.lvl.length?html`<h4>Уровни</h4><p className="st-lv">${data.lvl.map(([l,n])=>l+' · '+n).join('   ')}</p>`:null}</div></div>
      <p className="st-note">Отзывы и сообщения об ошибках лежат в консоли Firebase → Firestore → feedback.</p></div>`}</div>`; }

/* ================= «Ошибка в задании?» — report straight from an exercise ================= */
const bkReport=(ctx,body)=>{ SFX('tap'); window.dispatchEvent(new CustomEvent('wordy-report',{detail:{ctx:String(ctx||''),body:String(body||'')}})); };
const REP_WHY=[['key','Неверный ответ в ключе'],['mine','Мой ответ тоже верный'],['typo','Опечатка'],['vague','Непонятное задание']];
function ReportSheet(){ const [d,setD]=useState(null), [why,setWhy]=useState('key'), [txt,setTxt]=useState(''), [state,setState]=useState(''), [err,setErr]=useState(null);
  useEffect(()=>{ const f=e=>{ setD(e.detail); setWhy('key'); setTxt(''); setState(''); setErr(null); }; window.addEventListener('wordy-report',f); return ()=>window.removeEventListener('wordy-report',f); },[]);
  useEffect(()=>{ if(!d) return; const esc=e=>{ if(e.key==='Escape') setD(null); }; document.addEventListener('keydown',esc); const r=document.documentElement; r.classList.add('in-game'); return ()=>{ document.removeEventListener('keydown',esc); r.classList.remove('in-game'); }; },[!!d]);
  if(!d) return null;
  const send=async()=>{ setErr(null); setState('busy');
    try{ const be=ACC; if(!be||!be.sendFeedback) throw new Error('Сообщения об ошибках работают на сайте Wordy.');
      const w=REP_WHY.find(x=>x[0]===why)[1];
      await be.sendFeedback({kind:'bug',text:('['+w+'] '+(txt.trim()||'')+'\n\n'+d.ctx+'\n'+d.body).slice(0,2000),contact:'',page:'exercise',level:'',ua:navigator.userAgent.slice(0,160)});
      setState('sent'); SFX('pop'); setTimeout(()=>{ setD(null); W('react','happy'); W('say','Спасибо! Проверим и исправим.',0,true); },1400); }
    catch(e){ setErr(e&&e.message?e.message:String(e)); setState(''); } };
  return html`<div className="sheet-wrap" onClick=${()=>setD(null)}><div className="sheet rep-sheet enter" role="dialog" aria-modal="true" aria-labelledby="rep-t" onClick=${e=>e.stopPropagation()}>
    <h3 id="rep-t">${state==='sent'?'Спасибо, отправлено':'Что не так с заданием?'}</h3>
    ${state==='sent'?html`<p>Автор Wordy посмотрит и исправит.</p>`:html`
      <blockquote className="rep-ctx" lang="en">${d.body}</blockquote>
      <div className="chips rep-why">${REP_WHY.map(([k,t])=>html`<button key=${k} className="chip" id=${'rep-'+k} aria-pressed=${why===k} onClick=${()=>setWhy(k)}>${t}</button>`)}</div>
      <textarea id="rep-text" rows="3" maxLength="600" value=${txt} placeholder=${why==='mine'?'Твой вариант ответа':'Что именно не так (необязательно)'} onChange=${e=>setTxt(e.target.value)}></textarea>
      ${err?html`<p className="st-err">${err}</p>`:null}
      <div className="rep-act"><button className="btn ghost" onClick=${()=>setD(null)}>Отмена</button><button className="btn" id="rep-send" disabled=${state==='busy'||(why==='mine'&&!txt.trim())} onClick=${send}>${state==='busy'?'Отправляю…':'Отправить'}</button></div>`}
  </div></div>`; }
/* ================= PUSH REMINDERS — the server (functions/index.js) sends one reminder a day
   at the chosen hour, only on days the app was not opened. State per device lives in localStorage 'wordy.push'. ================= */
const PUSH_HOURS=[9,13,17,19,21];
const pushSupported=()=>!!(window.WORDY_SITE&&window.WORDY_PUSH&&location.protocol==='https:'&&'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window);
const pushIOS=()=>/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const pushStandalone=()=>{ try{ return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true; }catch(e){ return false; } };
const pushGet=()=>{ try{ return JSON.parse(localStorage.getItem('wordy.push')||'null')||{on:false,hour:19}; }catch(e){ return {on:false,hour:19}; } };
const pushPut=p=>{ try{ localStorage.setItem('wordy.push',JSON.stringify(p)); }catch(e){} window.dispatchEvent(new Event('wordy-push')); };
function pushLoadSdk(){ if(window.firebase&&window.firebase.messaging) return Promise.resolve(true);
  return new Promise(res=>{ const s=document.createElement('script'); s.src='https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js'; s.async=true; s.onload=()=>res(!!(window.firebase&&window.firebase.messaging)); s.onerror=()=>res(false); document.head.appendChild(s); }); }
async function pushHash(t){ const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''); }
const pushFields=(token,hour,st,last)=>{ const tz=-new Date().getTimezoneOffset(); return {token,on:true,hour,utcHour:((hour-Math.round(tz/60))%24+24)%24,tz,last:last||dayKey(-1),streak:Math.max(0,Math.min(9999,Math.floor(st.streak||0))),lvl:String(st.level||'').slice(0,4)}; };
async function pushReady(){ if(window.__fbReady) await window.__fbReady; const fb=window.firebase; if(!fb||!fb.apps||!fb.apps.length||!fb.firestore) throw new Error('Нет связи с сервером Wordy. Проверь интернет и попробуй ещё раз.');
  if(!await pushLoadSdk()) throw new Error('Не удалось загрузить модуль уведомлений. Проверь интернет.'); return fb; }
async function pushToken(fb){ const reg=await navigator.serviceWorker.ready; const t=await fb.messaging().getToken({serviceWorkerRegistration:reg}); if(!t) throw new Error('Браузер не выдал адрес для уведомлений. Попробуй ещё раз.'); return t; }
async function pushEnable(hour,st){
  if(!pushSupported()) throw new Error('Этот браузер не поддерживает уведомления.');
  if(pushIOS()&&!pushStandalone()) throw new Error('На iPhone уведомления работают, только если Wordy добавлен на экран «Домой»: «Поделиться» → «На экран Домой», затем открой Wordy оттуда.');
  const perm=await Notification.requestPermission();
  if(perm!=='granted') throw new Error(perm==='denied'?'Уведомления для Wordy запрещены в настройках браузера. Разреши их для этого сайта и нажми ещё раз.':'Чтобы получать напоминания, разреши уведомления.');
  const fb=await pushReady(), token=await pushToken(fb), id=await pushHash(token), old=pushGet();
  const last=old.last||(st.today===dayKey()&&st.todayCount>0?dayKey():dayKey(-1));
  await fb.firestore().doc('push/'+id).set(pushFields(token,hour,st,last),{merge:true});
  if(old.id&&old.id!==id) fb.firestore().doc('push/'+old.id).delete().catch(()=>{});
  const p={on:true,hour,id,day:dayKey(),last}; pushPut(p); return p; }
async function pushDisable(){ const p=pushGet();
  try{ const fb=await pushReady(); if(p.id) await fb.firestore().doc('push/'+p.id).delete(); try{ await fb.messaging().deleteToken(); }catch(e){} }catch(e){}
  pushPut({on:false,hour:p.hour||19}); }
/* once a day on open: refresh the device token (tokens can rotate) */
async function pushTouch(st){ const p=pushGet(); if(!p.on||p.day===dayKey()||!pushSupported()) return;
  try{ if(Notification.permission!=='granted'){ pushPut({on:false,hour:p.hour}); return; }
    const fb=await pushReady(), token=await pushToken(fb), id=await pushHash(token);
    await fb.firestore().doc('push/'+id).set(pushFields(token,p.hour,st,p.last),{merge:true});
    if(p.id&&p.id!==id) fb.firestore().doc('push/'+p.id).delete().catch(()=>{});
    pushPut({...p,id,day:dayKey()}); }catch(e){} }
/* first real study of the day (any XP): no reminder today */
let pushBusy=false;
async function pushStudied(st){ const p=pushGet(), today=dayKey(); if(!p.on||!p.id||p.last===today||pushBusy||!pushSupported()) return; pushBusy=true;
  try{ const fb=await pushReady(); await fb.firestore().doc('push/'+p.id).update({last:today,streak:Math.max(0,Math.min(9999,Math.floor(st.streak||0)))}); pushPut({...pushGet(),last:today}); }catch(e){} pushBusy=false; }
function usePush(){ const [p,setP]=useState(pushGet); useEffect(()=>{ const f=()=>setP(pushGet()); window.addEventListener('wordy-push',f); return ()=>window.removeEventListener('wordy-push',f); },[]); return p; }
function PushBox({st}){ const p=usePush(), [busy,setBusy]=useState(false), [err,setErr]=useState(null);
  if(!window.WORDY_SITE||!window.WORDY_PUSH) return null;
  const ok=pushSupported();
  const run=async fn=>{ setErr(null); setBusy(true); try{ await fn(); }catch(e){ setErr(e&&e.message?e.message:String(e)); } setBusy(false); };
  const on=()=>run(async()=>{ await pushEnable(p.hour||19,st); SFX('pop'); W('react','happy'); W('say','Договорились! Напомню, если забудешь.',0,true); });
  const setHour=h=>{ SFX('tap'); if(p.on) run(()=>pushEnable(h,st)); else pushPut({...p,hour:h}); };
  return html`<div className="set-group push-box" id="push-box">
    <div className="set-row"><div><strong>Напоминания</strong><p>${!ok?'Этот браузер не поддерживает уведомления. Открой Wordy в Chrome, Edge или Safari.':p.on?'Ворди напомнит в '+(p.hour||19)+':00, если в этот день ты ещё не занимался':'Одно уведомление в день, только если ты ещё не занимался'}</p></div>
      ${ok?html`<button className="sw" role="switch" id="sw-push" aria-checked=${!!p.on} aria-label="Напоминания" disabled=${busy} onClick=${()=>{ SFX('tap'); if(p.on) run(pushDisable); else on(); }}></button>`:null}</div>
    ${ok?html`<div className="set-row wrap"><div><strong>Время</strong><p>${busy?'Сохраняю…':'По твоему часовому поясу'}</p></div>
      <div className="chips">${PUSH_HOURS.map(h=>html`<button key=${h} className="chip" id=${'push-h-'+h} aria-pressed=${(p.hour||19)===h} disabled=${busy} onClick=${()=>setHour(h)}>${h}:00</button>`)}</div></div>`:null}
    ${err?html`<p className="push-err" role="alert">${err}</p>`:null}
    ${ok&&pushIOS()&&!pushStandalone()?html`<p className="push-note">На iPhone сначала добавь Wordy на экран «Домой» через «Поделиться».</p>`:null}</div>`; }
/* soft ask: shown once, after the first day the daily goal is reached */
function PushAsk({st,update}){ const p=usePush(), [busy,setBusy]=useState(false), [err,setErr]=useState(null);
  const show=window.WORDY_SITE&&pushSupported()&&!p.on&&!st.pushAsked&&st.todayCount>=st.goal&&!(pushIOS()&&!pushStandalone());
  useEffect(()=>{ if(!show) return; const r=document.documentElement; r.classList.add('in-game'); return ()=>r.classList.remove('in-game'); },[show]);
  if(!show) return null;
  const close=()=>update(()=>({pushAsked:dayKey()}));
  const yes=async()=>{ setErr(null); setBusy(true); try{ await pushEnable(p.hour||19,st); SFX('pop'); close(); setTimeout(()=>{ W('react','cheer'); W('say','Завтра в '+(p.hour||19)+':00 напомню!',0,true); },300); }catch(e){ setErr(e&&e.message?e.message:String(e)); setBusy(false); } };
  return html`<div className="sheet-wrap" onClick=${close}><div className="sheet push-ask enter" role="dialog" aria-modal="true" aria-labelledby="pa-t" onClick=${e=>e.stopPropagation()}>
    <img src="/icons/face.svg" alt="" width="56" height="56"/>
    <h3 id="pa-t">Напомнить завтра?</h3>
    <p>Цель на сегодня выполнена. Чтобы не потерять серию, Ворди пришлёт одно уведомление в выбранное время — только если ты в этот день ещё не занимался. Время можно поменять в Настройках.</p>
    <div className="chips">${PUSH_HOURS.map(h=>html`<button key=${h} className="chip" id=${'pa-h-'+h} aria-pressed=${(p.hour||19)===h} onClick=${()=>{ SFX('tap'); pushPut({...p,hour:h}); }}>${h}:00</button>`)}</div>
    ${err?html`<p className="push-err" role="alert">${err}</p>`:null}
    <div className="rep-act"><button className="btn ghost" id="pa-no" onClick=${close}>Не надо</button><button className="btn" id="pa-yes" disabled=${busy} onClick=${yes}>${busy?'Включаю…':'Напоминать'}</button></div>
  </div></div>`; }
/* ================= Optional tutorial: asked once, only to people who just picked their level (st.newbie) ================= */
function TourAsk({onYes,onNo}){
  useEffect(()=>{ const r=document.documentElement; r.classList.add('in-game'); const t=setTimeout(()=>{ try{ document.getElementById('ta-yes').focus({preventScroll:true}); }catch(e){} },80);
    const esc=e=>{ if(e.key==='Escape') onNo(); }; document.addEventListener('keydown',esc); return ()=>{ clearTimeout(t); r.classList.remove('in-game'); document.removeEventListener('keydown',esc); }; },[]);
  return html`<div className="sheet-wrap" onClick=${onNo}><div className="sheet tour-ask enter" role="dialog" aria-modal="true" aria-labelledby="ta-t" onClick=${e=>e.stopPropagation()}>
    <span className="pl-face ta-face" aria-hidden="true"><i></i><i></i></span>
    <h3 id="ta-t">Ты здесь впервые?</h3>
    <p>Могу за минуту показать, как устроен Wordy: где слова дня, грамматика, игры и награды. Если уже разобрался — пропусти. Обучение всегда есть в Настройках.</p>
    <div className="rep-act"><button className="btn ghost" id="ta-no" onClick=${onNo}>Разберусь сам</button><button className="btn" id="ta-yes" onClick=${onYes}>Пройти обучение</button></div>
  </div></div>`; }
/*GAMES_END*/
/* asked once of people who started before the age question existed */
function AgeAsk({onPick}){ const [a,setA]=useState(null);
  return html`<div className="sheet-wrap"><div className="sheet tour-ask enter" role="dialog" aria-modal="true" aria-labelledby="age-t">
    <h3 id="age-t">Сколько тебе лет?</h3>
    <p>Это нужно, чтобы включать функции по возрасту. До 13 лет проверка с помощью ИИ выключена. Изменить можно в Настройках.</p>
    <${AgeChips} v=${a} set=${setA} pre="ask-age-"/>
    <div className="rep-act"><button className="btn" id="age-ok" disabled=${!a} onClick=${()=>onPick(a)}>Готово</button></div>
  </div></div>`; }
function App(){
  const [st,setSt]=useState(load);
  window.__wordyKid=st.age==='u13';
  const [tab,setTab]=useState('learn');
  const [track,setTrackRaw]=useState('basic');
  const [sub,setSub]=useState('vocab');
  const [session,setSession]=useState(null);
  const [gram,setGram]=useState(null);
  const [reading,setReading]=useState(null);
  const [listen,setListen]=useState(null);
  const [mk,setMk]=useState(null);
  const [game,setGame]=useState(null);
  const [tsub,setTsub]=useState('vocab');
  const [preview,setPreview]=useState(null);
  const [toasts,setToasts]=useState([]);
  const [lvlUp,setLvlUp]=useState(null); const [tourOn,setTourOn]=useState(false);
  const seenTabs=useRef({learn:1});
  const update=fn=>setSt(s=>({...s,...fn(s)}));
  useAccSync(st,setSt); const acc=useAcc();
  useEffect(()=>{ const f=()=>{ setSession(null); setTab('class'); window.scrollTo({top:0}); }; window.addEventListener('wordy-open-auth',f); return ()=>window.removeEventListener('wordy-open-auth',f); },[]);
  useEffect(()=>{ const f=()=>{ setSession(null); setTab('class'); }; window.addEventListener('wordy-open-asg',f); return ()=>window.removeEventListener('wordy-open-asg',f); },[]);
  useEffect(()=>{ try{ if(/^#(class|teacher|student)$/.test(location.hash)&&acc.be&&st.level){ setTab('class'); history.replaceState(null,'',location.pathname); } }catch(e){} },[!!acc.be,!!st.level]); const TABS=acc.be?['learn','games','class','shop','progress','settings']:['learn','games','shop','progress','settings'];
  useEffect(()=>{ if(!acc.be&&tab==='class') setTab('learn'); },[acc.be]);

  useEffect(()=>save(st),[st]);
  const layer=tab==='games'?(game?'game:'+game:'tab:games'):mk?'mk':reading?'read':listen?'listen':session?'sess':gram?'gram:'+gram.view:tab!=='learn'?'tab:'+tab:null;
  useBack(st.level?layer:null,()=>{ stopSpeak(); if(tab==='games'){ if(game) setGame(null); else setTab('learn'); } else if(mk) setMk(null); else if(reading) setReading(null); else if(listen) setListen(null); else if(session) setSession(null); else if(gram) setGram(gram.view==='lesson'?{view:'map'}:null); else setTab('learn'); window.scrollTo({top:0}); });
  const tourOk=!!st.level&&!st.tourDone&&tab==='learn'&&!session&&!gram&&!reading&&!listen&&!mk&&!lvlUp;
  /* the tutorial is optional: only people who just picked their level are asked, once; old users are never sent to it */
  const [tourAsk,setTourAsk]=useState(false);
  useEffect(()=>{ if(!tourOk||tourOn||tourAsk||!st.newbie||st.tourAsked) return; const t=setTimeout(()=>setTourAsk(true),1400); return ()=>clearTimeout(t); },[tourOk,tourOn,tourAsk,st.newbie,st.tourAsked]);
  useEffect(()=>{ const f=()=>{ setSession(null); setGram(null); setReading(null); setListen(null); setMk(null); setGame(null); setTab('learn'); window.scrollTo({top:0}); setTourAsk(false); setTimeout(()=>setTourOn(true),450); }; window.addEventListener('wordy-tour',f); return ()=>window.removeEventListener('wordy-tour',f); },[]);
  const cloud=useCloud(), pushRef=useRef(null), remindRef=useRef(false), bkRef=useRef(false);
  useEffect(()=>{ if(bkRef.current||cloud.state!=='on'||!cloud.uid||!st.level) return; bkRef.current=true; const ref=cloud.db.doc('data/users/'+cloud.uid+'/backup');
    const t=setTimeout(()=>{ ref.get().then(s=>{ const at=s.exists&&s.data().at; if(!at||Date.now()-at>20*3600*1000) return ref.set({at:Date.now(),data:makeBackup(st)}); }).catch(()=>{}); },15000); return ()=>clearTimeout(t); },[cloud.state,cloud.uid,st.level]);
  useEffect(()=>{ if(cloud.state!=='on'||!cloud.uid||cloud.owner||cloud.writeOff||!st.level) return;
    const t=setTimeout(()=>{ const r=studentReport(st,true); const {at,...cmp}=r; const key=JSON.stringify(cmp); if(key===pushRef.current) return; pushRef.current=key;
      cloud.db.doc('students/'+cloud.uid).set(r).catch(e=>{ pushRef.current=null; if(e&&(e.code==='invalid_argument'||e.code==='revoked'||e.code==='not_granted')){ cloud.writeOff=true; cloudEmit(); } }); },6000);
    return ()=>clearTimeout(t); },[st,cloud.state,cloud.uid]);
  useEffect(()=>{ if(remindRef.current||!st.level) return; const p=allHw(st,cloud).filter(h=>!hwDone(h,st)&&h.due&&h.due<=dayKey(1)); if(!p.length) return;
    remindRef.current=true; const t=setTimeout(()=>{ W('react','think'); W('say',p[0].due<dayKey()?'Ой, домашка просрочена: '+hwTitle(p[0])+'. Давай сделаем!':'Не забудь домашку: '+hwTitle(p[0])+' — '+dueLabel(p[0].due)+'!',0,true); },2500); return ()=>clearTimeout(t); },[st.level,cloud.hw.length,(st.hw||[]).length]);
  useEffect(()=>{ requestAnimationFrame(()=>W('start')); trkInit(); },[]);
  useEffect(()=>{ if(!st.level) return; const t=setTimeout(()=>pushTouch(st),12000); return ()=>clearTimeout(t); },[!!st.level]);
  useEffect(()=>{ trkView(st.level?(layer||'home'):'onboarding'); },[layer,!!st.level]);
  const xpRef=useRef(st.xp); useEffect(()=>{ const d=(st.xp||0)-(xpRef.current||0); trkXp(d); if(d>0) pushStudied(st); xpRef.current=st.xp; },[st.xp]);
  useEffect(()=>{ trkMeta(st.level,!!acc.user); },[st.level,!!acc.user]);
  useEffect(()=>{ const q=st.wordy==='quiet'||st.wordy==='hidden'; window.__wQuiet=q||st.style!=='play'; W('config',{sleep:st.sleep&&!q,talk:st.talk&&!q}); },[st.sleep,st.talk,st.wordy,st.style]);
  useEffect(()=>{ try{ document.documentElement.dataset.style=st.style==='play'?'play':'modern'; document.documentElement.dataset.wordy=st.wordy||'active'; }catch(e){} },[st.style,st.wordy]);
  useEffect(()=>{ SFX('setEnabled',st.sound!==false); },[st.sound]);
  const gview=gram?gram.view+(gram.i!=null?gram.i:''):'';
  useEffect(()=>{ const t=setTimeout(()=>{ if(lvlUp) W('goTo','levelup',{frac:.5}); else if(!st.level) W('goTo','onb',{frac:.5}); else if(tab==='games'){ if(game==='cross') W('goTo','home'); else if(game!=='catch'&&game!=='space'&&game!=='runner'&&game!=='doors') W('goTo','card',{frac:game?.9:.88}); } else if(tab==='learn'&&game){ if(game!=='catch') W('goTo','card',{frac:.88}); } else if(tab==='learn'&&mk) W('goTo','home'); else if(tab==='learn'&&(session||gram||reading||listen)) W('goTo','card',{frac:gram&&gram.view==='map'?.5:.86}); else if(tab==='shop') W('goTo','stage',{frac:.5}); else W('goTo','home'); },!st.level?500:gram&&gram.view==='map'||tab==='games'?450:60); return ()=>clearTimeout(t); },[tab,session,gview,st.level,!!lvlUp,reading,listen,mk,game]);
  const eqKey=JSON.stringify(st.equip||{});
  useEffect(()=>{ const eq={...(st.equip||{})}; if(tab==='shop'&&preview){ const it=WORDY_ITEMS.find(i=>i.id===preview); if(it) eq[it.slot]=it.id; } W('wear',eq); },[eqKey,preview,tab]);
  useEffect(()=>{ const got=st.ach||{}; const fresh=ACH.filter(a=>!got[a.id]&&a.val(st)>=a.goal); if(!fresh.length) return;
    setSt(s=>({...s,coins:s.coins+ACH_REWARD*fresh.length,ach:{...(s.ach||{}),...Object.fromEntries(fresh.map(a=>[a.id,dayKey()]))}}));
    setToasts(q=>[...q,...fresh]); setTimeout(()=>{ W('react','cheer'); W('say','Новое достижение: '+fresh[0].title+'!',0,true); },300); },[st]);
  useEffect(()=>{ if(!st.level) return; const d=st.daily;
    if(!d||d.day!==dayKey()||(!d.done&&(d.n!==st.dailyNew||d.lvl!==st.level))) setSt(s=>({...s,daily:{day:dayKey(),ids:pickDaily(s),done:false,n:s.dailyNew,lvl:s.level}})); },[st.level,st.dailyNew,st.daily&&st.daily.day]);
  useEffect(()=>{ if(!st.level||lvlUp||session||(gram&&gram.view==='lesson')) return;
    const p=levelProgress(st); if(!p.complete) return;
    const nx=nextLevel(st.level); if(!nx&&st.allDone) return;
    const t=setTimeout(()=>setLvlUp({from:st.level,to:nx}),700); return ()=>clearTimeout(t); },[st,session,gview,lvlUp]);
  const prevCount=useRef(st.todayCount);
  useEffect(()=>{ if(prevCount.current<st.goal && st.todayCount>=st.goal){ const t=setTimeout(()=>{ W('react','cheer'); FX('rain',150); SFX('fanfare'); W('say','Дневная цель выполнена! Ты молодец!',0,true); },1800); prevCount.current=st.todayCount; return ()=>clearTimeout(t);} prevCount.current=st.todayCount; },[st.todayCount]);

  const go=t=>{ if(t!==tab) SFX('tap'); if(t!=='shop') setPreview(null); setTab(t); window.scrollTo({top:0}); if(!seenTabs.current[t]&&TAB_LINES[t]){ seenTabs.current[t]=1; setTimeout(()=>W('say',TAB_LINES[t]),500); } };
  const setTrack=id=>{ if(id===track) return; setTrackRaw(id); W('react','think');
    W('say',{basic:'Грамматика, слова и идиомы — всё здесь!',ielts:'IELTS? Целимся в высокий балл!',sat:'SAT-слова самые хитрые. Я с тобой!'}[id]); };
  const startUnit=(tid,uid)=>{ SFX('pop'); setSession({tid,uid,key:Date.now()}); window.scrollTo({top:0}); W('react','happy'); W('say','Поехали! Сначала карточки.'); };
  const exit=()=>{ setSession(null); W('say',pick(['Хорошо поработали!','Отдохнём немного?','Возвращайся скорее!'])); };
  const reset=()=>{ setSt(s=>normalize({goal:s.goal,sleep:s.sleep,talk:s.talk,sid:s.sid,sname:s.sname,tourDone:s.tourDone,regBonus:s.regBonus,tStudents:s.tStudents,tHw:s.tHw})); W('react','wave'); W('say','Начинаем с чистого листа!'); };

  const openGrammar=()=>{ SFX('pop'); setGram({view:'map'}); window.scrollTo({top:0}); W('react','happy'); W('say','Выбирай уровень! Начнём с первого.'); };
  const openLevel=i=>{ SFX('pop'); setGram({view:'lesson',i,key:Date.now()}); window.scrollTo({top:0}); W('react','think'); };
  const startHard=()=>{ const ids=hardWords(st).slice(0,12).map(w=>w.id); if(!ids.length) return; SFX('pop'); setTab('learn'); setSession({mode:'review',ids,key:Date.now()}); window.scrollTo({top:0}); W('react','think'); W('say','Разберёмся со сложными словами!'); };
  const startReview=()=>{ const ids=dueWords(st).slice(0,12).map(w=>w.id); if(!ids.length) return; SFX('pop'); setSession({mode:'review',ids,key:Date.now()}); window.scrollTo({top:0}); W('react','happy'); W('say','Повторим слова, которые пора освежить!'); };
  const finishLevelUp=()=>{ const u=lvlUp; SFX('pop');
    update(s=>({coins:s.coins+100,xp:s.xp+200,levelUps:(s.levelUps||0)+1,...(u.to?{level:u.to,daily:null}:{allDone:true})}));
    setLvlUp(null); setTab('learn'); setGram(null); window.scrollTo({top:0});
    if(u.to) setTimeout(()=>{ W('react','happy'); W('say','Уровень '+u.to+' открыт. Начнём с новых слов!',0,true); },600); };
  const startDaily=()=>{ const d=st.daily; if(!d||d.done||!d.ids.length) return; SFX('pop'); setSession({mode:'daily',ids:d.ids,key:Date.now()}); window.scrollTo({top:0}); W('react','happy'); W('say','Слова дня! Сначала карточки.'); };
  const openText=id=>{ SFX('pop'); setReading(id); window.scrollTo({top:0}); W('react','happy'); const t=TEXTS.find(x=>x.id===id)||{}; W('say',t.poem?'Стихи! Попробуй прочитать вслух.':t.cat==='lit'?'Классика! Устраивайся поудобнее.':t.cat==='sci'?'Наука — моё любимое!':t.cat==='facts'?'Сейчас удивимся!':'Читаем! Не знаешь слово — нажми на него.'); };
  const openMock=o=>{ SFX('pop'); setMk({...o,key:Date.now()}); window.scrollTo({top:0}); W('react','happy'); W('say',o.kind==='p2'?'Выбирай карточку — потренируем монолог!':o.kind==='drill'?'Короткая тренировка — поехали!':o.kind==='pron'?'Читай фразу вслух — я слушаю!':o.kind==='sat'?'Пробный SAT! Сосредоточься, я рядом.':'Пробный IELTS! Удачи!',0,true); };
  useEffect(()=>{ const f=e=>{ const h=e.detail, ws=(h.words||[]).map(w=>({id:myId(w.en),en:w.en,ru:w.ru||'—',def:w.def||'',ipa:w.ipa||'',ex:'',src:'Учитель',track:'my',added:dayKey()}));
    if(ws.length<1) return; setSt(s=>{ const m={...(s.myWords||{})}; ws.forEach(w=>{ if(!m[w.id]) m[w.id]=w; }); return {...s,myWords:m}; });
    SFX('pop'); setTab('learn'); setSession({mode:'my',ids:ws.map(w=>w.id),key:Date.now(),extra:ws}); window.scrollTo({top:0}); W('react','happy'); W('say','Слова от учителя! Сначала карточки.'); };
    window.addEventListener('wordy:hwwords',f); return ()=>window.removeEventListener('wordy:hwwords',f); },[]);
  useEffect(()=>{ const f=e=>{ setTab('learn'); setGame(null); openMock(e.detail); }; window.addEventListener('wordy:open',f); return ()=>window.removeEventListener('wordy:open',f); },[]);
  const startListen=()=>{ SFX('pop'); setListen(Date.now()); window.scrollTo({top:0}); W('react','wave'); W('say','Слушай внимательно!'); };
  const startMy=()=>{ const today=dayKey(), list=Object.values(st.myWords||{}); if(list.length<4) return;
    const ids=list.slice().sort((a,b)=>((st.due||{})[a.id]||'0').localeCompare((st.due||{})[b.id]||'0')||((st.boxes[a.id]||0)-(st.boxes[b.id]||0))).slice(0,12).map(w=>w.id);
    SFX('pop'); setTab('learn'); setSession({mode:'my',ids,key:Date.now()}); window.scrollTo({top:0}); W('react','happy'); W('say','Твои слова из тестов! Сначала карточки.'); };
  const isRev=session&&(session.mode==='review'||session.mode==='daily');
  const tr=session&&(session.mode==='my'?{id:'my',name:'Мои слова'}:isRev?{name:session.mode==='daily'?'Слова дня':'Повторение'}:TRACKS.find(t=>t.id===session.tid));
  const unRef=useRef({key:null,un:null}); if(!session) unRef.current={key:null,un:null}; else if(unRef.current.key!==session.key||!unRef.current.un) unRef.current={key:session.key,un:(session&&(session.mode==='my'?{id:'my',title:'Слова из тестов',words:session.ids.map(id=>(st.myWords||{})[id]||(session.extra||[]).find(w=>w.id===id)).filter(Boolean)}:isRev?{id:session.mode,title:session.mode==='daily'?'Подборка на сегодня':'Слова на сегодня',words:session.ids.map(id=>ALL.find(w=>w.id===id)||(st.myWords||{})[id]).filter(Boolean)}:tr&&tr.units.find(u=>u.id===session.uid)))||null};
  const un=session&&unRef.current.un;
  const NavBtn=(id,label,icon,extra)=>html`<button id=${'tab-'+id} aria-current=${tab===id?'page':undefined} onClick=${()=>go(id)} ...${extra||{}}><span className="nav-ic" key=${tab===id?'on':'off'}>${icon}</span><span>${label}</span></button>`;
  return html`<div className="app">
     <${TopBar} st=${st}/>
     <main>
       <div hidden=${tab!=='learn'}>${mk?html`<${MockScreen} key=${mk.key} mk=${mk} st=${st} update=${update} onExit=${()=>{ setMk(null); window.scrollTo({top:0}); }}/>`
         :reading?html`<${Reader} key=${reading} x=${TEXTS.find(x=>x.id===reading)} st=${st} update=${update} onExit=${()=>{ setReading(null); window.scrollTo({top:0}); }}/>`
         :listen?html`<${Listening} key=${listen} st=${st} update=${update} onExit=${()=>{ setListen(null); window.scrollTo({top:0}); }}/>`
         :session&&un?html`<${Session} key=${session.key} track=${tr} unit=${un} mode=${session.mode||'learn'} st=${st} update=${update} onExit=${exit} active=${tab==='learn'}/>`
         :gram&&gram.view==='lesson'?html`<${GrammarLesson} key=${gram.key} st=${st} lv=${GL[gram.i]} idx=${gram.i} prevStars=${(st.gstars||{})[GL[gram.i].id]||0} update=${update} saved=${(st.gbook||{})[GL[gram.i].id]} onBack=${()=>{ setGram({view:'map'}); window.scrollTo({top:0}); }} onNext=${()=>openLevel(gram.i+1)}/>`
         :gram&&gram.view==='ref'?html`<${RefBook} onBack=${()=>{ setGram({view:'map'}); window.scrollTo({top:0}); }}/>`
         :gram?html`<${GrammarMap} st=${st} onBack=${()=>{ setGram(null); window.scrollTo({top:0}); }} open=${openLevel} openRef=${()=>{ setGram({view:'ref'}); window.scrollTo({top:0}); }}/>`
         :html`<${Learn} st=${st} update=${update} openText=${openText} startListen=${startListen} tsub=${tsub} setTsub=${setTsub} openMock=${openMock} track=${track} setTrack=${setTrack} sub=${sub} setSub=${setSub} openLevel=${openLevel} startUnit=${startUnit} openGrammar=${openGrammar} startReview=${startReview} startDaily=${startDaily} openGame=${id=>{ SFX('pop'); setTab('games'); setGame(id); window.scrollTo({top:0}); }} showLevel=${()=>go('progress')}/>`}</div>
       ${acc.be?html`<div hidden=${tab!=='class'}><${ClassTab} st=${st}/></div>`:null}
       <div hidden=${tab!=='games'}><${GamesScreen} game=${game} setGame=${setGame} st=${st} update=${update} active=${tab==='games'}/></div>
       <div hidden=${tab!=='shop'}><${House} st=${st} update=${update} preview=${preview} setPreview=${setPreview}/></div>
       <div hidden=${tab!=='progress'}><${Progress} st=${st} update=${update} startMy=${startMy} startHard=${startHard} practice=${o=>{ setTab('learn'); openMock(o); }}/></div>
       <div hidden=${tab!=='settings'}><${Settings} st=${st} update=${update} reset=${reset} restore=${s=>{ setSt(normalize({...s})); SFX('fanfare'); W('react','cheer'); W('say','Прогресс восстановлен! С возвращением.',0,true); }}/></div>
     </main>
     ${st.level&&!st.age?html`<${AgeAsk} onPick=${a=>{ SFX('pop'); update(()=>({age:a})); }}/>`:null}
     ${!st.level?html`<${Onboarding} st=${st} update=${update} onRestore=${s=>{ setSt(normalize({...s})); SFX('fanfare'); W('react','cheer'); W('say','Прогресс восстановлен! С возвращением.',0,true); }} onDone=${(l,n,a)=>{ update(()=>({level:l,dailyNew:n,newbie:dayKey(),age:a})); SFX('fanfare'); FX('rain',110); W('react','cheer'); W('say','Отлично! Уровень '+l+'. Поехали учиться!',0,true); window.scrollTo({top:0}); }}/>`:null}
     ${tourOn?html`<${Tour} onDone=${start=>{ setTourOn(false); update(()=>({tourDone:true,tourAsked:st.tourAsked||dayKey()})); if(start) setTimeout(startDaily,350); }}/>`:null}
     ${tourAsk&&!tourOn?html`<${TourAsk} onYes=${()=>{ SFX('pop'); setTourAsk(false); update(()=>({tourAsked:dayKey()})); setTimeout(()=>setTourOn(true),250); }} onNo=${()=>{ SFX('tap'); setTourAsk(false); update(()=>({tourAsked:dayKey(),tourDone:true})); W('react','wave'); W('say','Хорошо! Если что — обучение в Настройках.',0,true); }}/>`:null}
     ${lvlUp?html`<${LevelUp} from=${lvlUp.from} to=${lvlUp.to} onGo=${finishLevelUp}/>`:null}
     <${ReportSheet}/>
     ${!lvlUp&&!tourOn&&!tourAsk?html`<${PushAsk} st=${st} update=${update}/>`:null}
     ${toasts.length&&!lvlUp?html`<${AchToast} key=${toasts[0].id} a=${toasts[0]} onDone=${()=>setToasts(q=>q.slice(1))}/>`:null}
     <${TutorFab} st=${st} update=${update}/>
     <nav className="nav" aria-label="Разделы"><div className="nav-inner" data-perch="home" style=${{'--x':Math.max(0,TABS.indexOf(tab)),'--n':TABS.length}}><span className="nav-ind" aria-hidden="true"></span>
       ${NavBtn('learn','Учить',I.learn())}${NavBtn('games','Игры',gamesIcon())}${acc.be?NavBtn('class','Класс',accIcon(),acc.ready&&!acc.user?{'data-dot':'1','aria-label':'Класс: войди или зарегистрируйся'}:{}):null}${NavBtn('shop','Домик',I.home())}${NavBtn('progress','Прогресс',I.progress())}${NavBtn('settings','Настройки',I.settings(),{'data-home-anchor':''})}
     </div></nav></div>`;
}
class Boundary extends React.Component{ constructor(p){ super(p); this.state={e:null}; }
  static getDerivedStateFromError(e){ return {e}; }
  render(){ if(!this.state.e) return this.props.children; const e=this.state.e;
    return html`<div style=${{maxWidth:'520px',margin:'120px auto 0',padding:'20px',borderRadius:'20px',background:'var(--surface)',border:'1px solid var(--line)'}}>
      <b style=${{fontFamily:'var(--f-display)',fontSize:'20px'}}>Что-то пошло не так</b>
      <p style=${{color:'var(--muted)',margin:'8px 0'}}>Обнови страницу. Если ошибка повторится, пришли этот текст:</p>
      <pre style=${{whiteSpace:'pre-wrap',fontSize:'12px',background:'var(--bg-2)',padding:'10px',borderRadius:'12px'}}>${String((e&&e.stack)||e).slice(0,600)}</pre>
      <button className="btn" onClick=${()=>location.reload()}>Обновить</button></div>`; } }
const rootEl=document.getElementById('root'); rootEl.setAttribute('data-ok','1'); ReactDOM.createRoot(rootEl).render(html`<${Boundary}><${App}/><//>`);
})(); }catch(e){ document.getElementById('root').removeAttribute('data-ok'); window.__wordyErr((e&&e.stack)||e); } }).catch(function(e){ window.__wordyErr(e&&e.message||e); });
