from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
required=['frontend/index.html','frontend/css/styles.css','frontend/js/app.js','Dockerfile','nginx.conf']
for f in required:
    assert (ROOT/f).exists(), f'Missing {f}'
html=(ROOT/'frontend/index.html').read_text()
js=(ROOT/'frontend/js/app.js').read_text()
css=(ROOT/'frontend/css/styles.css').read_text()
docker=(ROOT/'Dockerfile').read_text()
nginx=(ROOT/'nginx.conf').read_text()
for token in ['#matches','#standings','#news','#teamSelect','#transfers','#heroScore','#matchModal','#closeModal']:
    assert token in html, f'HTML missing {token}'
for token in ['scoreboard','standings/esp.1','news','roster','transactions','summary?event=','setInterval(loadMatches,30000)','AbortController','Torna-ho a intentar']:
    assert token in js, f'JS missing {token}'
assert 'innerHTML' in js and 'esc(' in js, 'Expected escaped dynamic HTML'
assert len(css)<40000, 'CSS unexpectedly large'
assert 'COPY frontend/' in docker and 'nginx.conf' in docker, 'Docker setup incomplete'
assert 'proxy_pass' in nginx and 'location = /health' in nginx, 'Nginx proxy/health missing'
assert re.search(r'<script[^>]+src=["\']js/app\.js',html), 'JS path incorrect'
print('OK: auditoria estàtica superada')
