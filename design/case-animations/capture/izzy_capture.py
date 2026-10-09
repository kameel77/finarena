"""Capture IzzyCheck journey (local build, AUDATEX_MOCK_MODE fixtures, demo account) for the Finarena case.
Full-page screenshots; target boxes in page coordinates. Dev-only mock banner is hidden."""
import json, os, sys, subprocess
from playwright.sync_api import sync_playwright

B = 'http://127.0.0.1:3201'
OUT = '/home/claude/work/izzy-cap'
VIN = 'WBA8E11000K654321'  # fictional, valid format
HIDE = """(() => { const s = document.createElement('style'); s.id='hide-mock';
s.textContent = ''; document.head.appendChild(s);
for (const el of document.querySelectorAll('div,p,span')) { if (el.children.length < 4 && /ŚRODOWISKO TESTOWE/i.test(el.textContent || '')) { let b = el; while (b.parentElement && b.parentElement !== document.body && b.parentElement.children.length === 1) b = b.parentElement; b.style.display = 'none'; break; } } })()"""

def run(mode):
    mob = mode == 'm'
    vp = {'width': 390, 'height': 844} if mob else {'width': 1440, 'height': 900}
    meta = {'viewport': vp, 'dpr': 3 if mob else 2, 'frames': []}
    os.makedirs(f'{OUT}/{mode}', exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport=vp, device_scale_factor=meta['dpr'], is_mobile=mob, has_touch=mob, locale='pl-PL')
        r = ctx.request.post(B + '/api/auth/login', data={'email': 'demo@example.com', 'password': 'demo-recording-1234'})
        assert r.ok, r.text()
        pg = ctx.new_page()
        n = [0]

        def pbox(sel_locator):
            try:
                sel_locator.wait_for(state='visible', timeout=5000)
            except Exception:
                return None
            return sel_locator.evaluate("e => { const r = e.getBoundingClientRect(); return {x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height}; }")

        def shot(name, targets=None):
            pg.evaluate(HIDE)
            pg.evaluate('window.scrollTo(0, 0)')
            pg.wait_for_timeout(200)
            if callable(targets):
                targets = targets()
            n[0] += 1
            fn = f'{mode}/{n[0]:02d}_{name}.png'
            pg.screenshot(path=f'{OUT}/{fn}', full_page=True)
            h = pg.evaluate('document.documentElement.scrollHeight')
            meta['frames'].append({'file': fn, 'name': name, 'h': h, 'targets': targets or {}})

        pg.goto(B + '/reports/new', wait_until='networkidle'); pg.wait_for_timeout(1500)
        vin = pg.locator('input[type=text]').first
        dates = pg.locator('input[type=date]')
        km = pg.locator('input[type=number]').first
        gen = pg.get_by_role('button', name='Generuj Raport IzzyCheck')
        T = lambda: {'vin': pbox(vin), 'date': pbox(dates.first), 'km': pbox(km), 'gen': pbox(gen),
                     'mods': pbox(pg.get_by_text('2. Wybór Modułów Raportu', exact=False).first)}
        shot('form', T)
        for i, part in enumerate([VIN[:6], VIN[:11], VIN]):
            vin.fill(part); pg.wait_for_timeout(200); shot(f'vin{i}', T)
        dates.first.fill('2018-03-14'); km.fill('118400'); pg.wait_for_timeout(300)
        shot('filled', T)
        gen.click()
        # module progress right after submit
        for i in range(6):
            pg.wait_for_timeout(450)
            try:
                shot(f'progress{i}', {})
            except Exception as e:
                print('progress shot failed', e)
        pg.wait_for_url('**/reports/**', timeout=60000)
        pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(2500)
        rid = pg.url.rstrip('/').split('/')[-1]
        meta['reportId'] = rid
        tab_dmg = pg.get_by_text('Historia & Szczegóły Szkód').first
        shot('report', lambda: {'tab_dmg': pbox(tab_dmg), 'pdf': pbox(pg.get_by_role('button', name='Pobierz PDF').first),
                        'values': pbox(pg.get_by_text('Wartości Pojazdu z AudaValuation').first),
                        'spec': pbox(pg.get_by_text('Specyfikacja techniczna pojazdu', exact=False).first)})
        tab_dmg.click(); pg.wait_for_timeout(1500)
        shot('damage', lambda: {'banner': pbox(pg.get_by_text('Znaleziono Wpisy Historii Szkód').first),
                        'map': pbox(pg.get_by_text('Mapa szkody według Audatex', exact=False).first),
                        'photo': pbox(pg.get_by_text('Zdjęcie 1: przód i prawy bok', exact=False).first),
                        'tab_audit': pbox(pg.get_by_text('Ślad Audytowy').first)})
        pg.get_by_text('Ślad Audytowy').first.click(); pg.wait_for_timeout(1200)
        shot('audit', lambda: {'pdf': pbox(pg.get_by_role('button', name='Pobierz PDF').first)})
        # PDF of this report (rendered pages for the outro)
        pdf = ctx.request.get(B + f'/api/reports/{rid}/pdf')
        if pdf.ok:
            open(f'{OUT}/{mode}_report.pdf', 'wb').write(pdf.body())
        json.dump(meta, open(f'{OUT}/{mode}_meta.json', 'w'), ensure_ascii=False, indent=1)
        ctx.close(); b.close()

if __name__ == '__main__':
    for m in sys.argv[1:]:
        run(m); print('done', m)
