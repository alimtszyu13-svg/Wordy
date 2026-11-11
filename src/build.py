import re,sys,hashlib,subprocess,os,shutil
src,dist=sys.argv[1],sys.argv[2]
s=open(src).read()
start=s.rfind('<script>\nwindow.__libsReady.then(function(){ try{ (function(){')
end=s.rfind('</script>')
assert start>0 and end>start
js=s[start+len('<script>\n'):end]
os.makedirs(dist+'/js',exist_ok=True)
tmp='/tmp/claude-0/-home-claude/9274decf-83c4-5e55-ad4e-ecf19101c7a7/scratchpad/build'
open(tmp+'/main.js','w').write(js)
r=subprocess.run(['node',tmp+'/split.js',tmp+'/main.js',dist+'/js/wordy-core.js',dist+'/js/wordy-data.js'],capture_output=True,text=True); print(r.stdout,r.stderr); assert r.returncode==0
h=lambda p:hashlib.sha1(open(p,'rb').read()).hexdigest()[:10]
hc,hd=h(dist+'/js/wordy-core.js'),h(dist+'/js/wordy-data.js')
tags='<script src="/js/wordy-data.js?v=%s"></script>\n<script src="/js/wordy-core.js?v=%s"></script>\n'%(hd,hc)
out=s[:start]+tags+s[end+len('</script>'):]
pre='<link rel="preload" href="/js/wordy-data.js?v=%s" as="script"><link rel="preload" href="/js/wordy-core.js?v=%s" as="script">\n'%(hd,hc)
out=out.replace('</head>',pre+'</head>',1)
open(dist+'/app.html','w').write(out)
for f in ['app.html','js/wordy-core.js','js/wordy-data.js']: print(f, os.path.getsize(dist+'/'+f)//1024,'KB')
