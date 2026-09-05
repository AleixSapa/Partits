from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []


def require(path: str):
    p = ROOT / path
    if not p.is_file():
        errors.append(f"Falta el fitxer: {path}")
    return p

html = require("frontend/index.html")
js = require("frontend/js/app.js")
css = require("frontend/css/styles.css")
dockerfile = require("Dockerfile")
nginx = require("nginx.conf")

if html.is_file():
    text = html.read_text(encoding="utf-8")
    for ref in ("css/styles.css", "js/app.js"):
        if ref not in text:
            errors.append(f"index.html no referencia {ref}")
    for ident in ("matches", "standings", "news", "teamSelect", "transfers", "heroScore"):
        if f'id="{ident}"' not in text:
            errors.append(f"Falta l'element #{ident}")

if js.is_file():
    text = js.read_text(encoding="utf-8")
    for endpoint in ("scoreboard", "standings/esp.1", "news", "roster", "transactions"):
        if endpoint not in text:
            errors.append(f"Falta la integració amb {endpoint}")
    if "setInterval(loadMatches,30000)" not in text:
        errors.append("Els partits no tenen actualització cada 30 segons")
    if "const esc=" not in text:
        errors.append("Falta escapament de text HTML")

if css.is_file() and css.stat().st_size < 1000:
    errors.append("styles.css sembla massa petit o incomplet")

if dockerfile.is_file():
    text = dockerfile.read_text(encoding="utf-8")
    for required in ("nginx:alpine", "COPY frontend/", "COPY nginx.conf"):
        if required not in text:
            errors.append(f"Dockerfile no conté: {required}")

if nginx.is_file():
    text = nginx.read_text(encoding="utf-8")
    for required in ("listen 80", "/health", "site.api.espn.com"):
        if required not in text:
            errors.append(f"nginx.conf no conté: {required}")

if errors:
    print("ÀRBITRE: FALLA")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("ÀRBITRE: OK — estructura, frontend, Docker i proxy revisats")
