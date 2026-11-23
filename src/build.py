"""Wordy build: turns the one big source file into the files the site serves.

Usage (from the Wordy folder):
    python src/build.py

Reads   src/app.full.html  (the source you edit)
Writes  app.html           (small page that loads the scripts below)
        js/wordy-core.js   (the app code)
        js/wordy-data.js   (texts, words, grammar: large data split out of the code)
        js/wordy-en.js     (English interface dictionary, loaded only in English mode)

Needs Python 3 and Node.js, plus acorn in src/node_modules (run "npm install" inside src once).
"""
import hashlib, os, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'app.full.html')
dist = sys.argv[2] if len(sys.argv) > 2 else ROOT


def read(p):
    with open(p, encoding='utf-8', newline='') as f:
        return f.read()


def write(p, text):
    # newline='' keeps LF line endings on Windows too, so the output is identical on every computer
    with open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(text)


s = read(src).replace('\r\n', '\n')  # Git on Windows may turn line endings into CRLF; the build works with LF
start = s.rfind('<script>\nwindow.__libsReady.then(function(){ try{ (function(){')
end = s.rfind('</script>')
assert start > 0 and end > start, 'main app <script> not found in ' + src
js = s[start + len('<script>\n'):end]

# 1. English bundle: the dictionaries between the I18N markers go to js/wordy-en.js
a = js.index('/*I18N-BEGIN*/') + len('/*I18N-BEGIN*/')
b = js.index('/*I18N-END*/')
en = js[a:b]
js = js[:a] + 'const I18N_G=window.__I18N_G||{}; const I18N_D=window.__I18N_D||{}; const I18N_P=window.__I18N_P||[];' + js[b:]
os.makedirs(os.path.join(dist, 'js'), exist_ok=True)
write(os.path.join(dist, 'js', 'wordy-en.js'), '/* Wordy: English interface */\n' + en
      .replace('const I18N_G=', 'window.__I18N_G=')
      .replace('; const I18N_D=', '; window.__I18N_D=')
      .replace('; const I18N_P=', '; window.__I18N_P=') + '\n')

# 2. Code and data: split.js moves big text/array literals into wordy-data.js
with tempfile.TemporaryDirectory() as tmp:
    main = os.path.join(tmp, 'main.js')
    write(main, js)
    r = subprocess.run(['node', os.path.join(HERE, 'split.js'), main,
                        os.path.join(dist, 'js', 'wordy-core.js'), os.path.join(dist, 'js', 'wordy-data.js')],
                       capture_output=True, text=True, encoding='utf-8')
    print(r.stdout, r.stderr)
    assert r.returncode == 0, 'split.js failed (did you run "npm install" in src?)'

# 3. app.html: the source page with the big script replaced by three small <script src> tags.
#    ?v=<hash> changes whenever a file changes, so browsers never use an old cached copy.
h = lambda p: hashlib.sha1(open(p, 'rb').read()).hexdigest()[:10]
hc, hd, he = (h(os.path.join(dist, 'js', f)) for f in ('wordy-core.js', 'wordy-data.js', 'wordy-en.js'))
tags = ('<script>if(window.WORDY_LANG==="en") document.write(\'<script src="/js/wordy-en.js?v=%s"><\\/script>\');</script>\n'
        '<script src="/js/wordy-data.js?v=%s"></script>\n<script src="/js/wordy-core.js?v=%s"></script>\n') % (he, hd, hc)
out = s[:start] + tags + s[end + len('</script>'):]
pre = '<link rel="preload" href="/js/wordy-data.js?v=%s" as="script"><link rel="preload" href="/js/wordy-core.js?v=%s" as="script">\n' % (hd, hc)
out = out.replace('</head>', pre + '</head>', 1)
write(os.path.join(dist, 'app.html'), out)
for f in ['app.html', 'js/wordy-core.js', 'js/wordy-data.js', 'js/wordy-en.js']:
    print(f, os.path.getsize(os.path.join(dist, f)) // 1024, 'KB')
