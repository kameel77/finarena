"""Capture Printflow journey on a local copy with a fictional demo catalog and client.
Cost and margin values are blurred; the client's brand logo on the public offer page is hidden.
Sending by e-mail is simulated by setting status SENT in the local DB (no SMTP)."""
import json, os, subprocess, sys
from playwright.sync_api import sync_playwright

B = 'http://127.0.0.1:3300'
OUT = '/home/claude/work/pf-cap'
DB = 'postgresql://printflow:demo@127.0.0.1:5432/printflow'
T = open('/home/claude/work/pf_token.txt').read().strip()
USER = json.dumps({"id": 1, "email": "anna.handlowiec@example.com", "full_name": "Anna Handlowa", "role": "ADMIN", "is_active": True})
INIT = f"localStorage.setItem('access_token', {json.dumps(T)}); localStorage.setItem('user', {json.dumps(USER)});"
MASK = """(() => {
  for (const lab of document.querySelectorAll('*')) {
    const t = lab.children.length === 0 ? (lab.textContent || '').trim() : '';
    if (t === 'Koszt' || t === 'Marża') { const card = lab.parentElement; for (const ch of card.children) if (ch !== lab) ch.style.filter = 'blur(8px)'; }
  }
  for (const el of document.querySelectorAll('*')) {
    const t = el.children.length === 0 ? (el.textContent || '').trim().toUpperCase() : '';
    if (t.startsWith('ZYSK (MARŻA)') || t.startsWith('KOSZT ZMIENNY')) { const box = el.parentElement; box.style.filter = 'blur(7px)'; }
  }
  for (const img of document.querySelectorAll('img')) { if (/wally|logo/i.test(img.src + ' ' + img.alt)) img.style.visibility = 'hidden'; }
})()"""


def psql(sql):
    return subprocess.run(['psql', DB, '-At', '-c', sql], capture_output=True, text=True).stdout.strip()


def run():
    meta = {'frames': []}
    for d in ('d', 'm'):
        os.makedirs(f'{OUT}/{d}', exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=2, locale='pl-PL')
        ctx.add_init_script(INIT)
        pg = ctx.new_page()
        n = [0]

        def box(loc):
            try:
                loc.wait_for(state='visible', timeout=5000)
            except Exception:
                return None
            return loc.evaluate("e => { const r = e.getBoundingClientRect(); return {x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height}; }")

        def shot(page, mode, name, targets=None, full=True):
            page.evaluate(MASK)
            page.evaluate('window.scrollTo(0, 0)')
            page.wait_for_timeout(250)
            if callable(targets):
                targets = targets()
            n[0] += 1
            fn = f'{mode}/{n[0]:02d}_{name}.png'
            page.screenshot(path=f'{OUT}/{fn}', full_page=full)
            meta['frames'].append({'file': fn, 'name': name, 'h': page.evaluate('document.documentElement.scrollHeight'),
                                   'w': page.evaluate('document.documentElement.scrollWidth'), 'targets': targets or {}})

        # 1. Calculator
        pg.goto(B + '/', wait_until='networkidle'); pg.wait_for_timeout(1500)
        cat = pg.locator('select').nth(0)
        prod = lambda: pg.locator('select').filter(has_text='Wybierz produkt').first
        nums = pg.locator('input[type=number]')
        TC = lambda: {'cat': box(cat), 'prod': box(prod()), 'w': box(nums.nth(0)), 'h': box(nums.nth(1))}
        shot(pg, 'd', 'calc_empty', TC)
        cat.select_option(label='Wnętrza'); pg.wait_for_timeout(600)
        shot(pg, 'd', 'calc_cat', TC)
        prod().select_option(label='Fototapeta na wymiar'); pg.wait_for_timeout(800)
        shot(pg, 'd', 'calc_prod', TC)
        nums.nth(0).fill('420'); pg.wait_for_timeout(1200)
        shot(pg, 'd', 'calc_w', TC)
        nums.nth(1).fill('270'); pg.wait_for_timeout(2500)
        TR = lambda: {'w': box(nums.nth(0)), 'h': box(nums.nth(1)),
                      'cards': box(pg.get_by_text('Cena', exact=True).first),
                      'lam': box(pg.get_by_text('Laminowanie', exact=True).first),
                      'parts': box(pg.get_by_text('Składniki wyceny (widok techniczny)').first),
                      'bryty': box(pg.get_by_text('Bryty:', exact=False).first),
                      'details': box(pg.get_by_text('Szczegóły produkcyjne').first),
                      'offer': box(pg.get_by_role('button', name='Stwórz ofertę'))}
        shot(pg, 'd', 'calc_result', TR)
        pg.get_by_text('Laminowanie', exact=True).first.click(); pg.wait_for_timeout(2000)
        shot(pg, 'd', 'calc_lam', TR)
        pg.get_by_text('Szczegóły produkcyjne').first.click(); pg.wait_for_timeout(1200)
        shot(pg, 'd', 'calc_details', TR)

        # 2. Offer
        pg.get_by_role('button', name='Stwórz ofertę').click(); pg.wait_for_url('**/offers/new'); pg.wait_for_timeout(2000)
        TO = lambda: {'newclient': box(pg.get_by_role('button', name='Nowy klient')), 'variant': box(pg.get_by_text('Skalkulowany wariant').first),
                      'save': box(pg.get_by_role('button', name='Zapisz szkic')), 'send': box(pg.get_by_role('button', name='Wyślij do klienta'))}
        shot(pg, 'd', 'offer_new', TO)
        pg.get_by_role('button', name='Nowy klient').click(); pg.wait_for_timeout(800)
        texts = pg.locator('input[type=text]')
        email = pg.locator('input[type=email]').first
        TN = lambda: {'name': box(texts.nth(0)), 'email': box(email), 'save': box(pg.get_by_role('button', name='Zapisz szkic'))}
        shot(pg, 'd', 'offer_client', TN)
        texts.nth(0).fill('Studio Wnętrz Przykład'); pg.wait_for_timeout(300)
        email.fill('kontakt@studio-przyklad.example'); pg.wait_for_timeout(300)
        shot(pg, 'd', 'offer_client_filled', TN)
        pg.get_by_role('button', name='Zapisz szkic').click(); pg.wait_for_timeout(3000)
        oid = psql("select id from offers order by id desc limit 1")
        token = psql(f"select token from offers where id={oid}")
        meta['offer'] = {'id': oid, 'token': token}
        # simulate e-mail delivery (no SMTP locally)
        psql(f"update offers set status='SENT', sent_at=now() where id={oid}")
        pg.goto(B + f'/admin/offers/{oid}', wait_until='networkidle'); pg.wait_for_timeout(2500)
        shot(pg, 'd', 'offer_sent', {})

        # 3. Public offer page: desktop + phone
        pub = ctx.new_page()
        pub.goto(B + f'/offer/{token}', wait_until='networkidle'); pub.wait_for_timeout(2500)
        TP = lambda: {'accept': box(pub.get_by_role('button', name='Akceptuj').first) or box(pub.get_by_text('Akceptuj', exact=False).first)}
        shot(pub, 'd', 'public', TP)
        mctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=3, is_mobile=True, has_touch=True, locale='pl-PL')
        mctx.add_init_script(INIT)
        mp = mctx.new_page()
        mp.goto(B + '/', wait_until='networkidle'); mp.wait_for_timeout(1500)
        mcat = mp.locator('select').nth(0); mprod = lambda: mp.locator('select').filter(has_text='Wybierz produkt').first
        mnums = mp.locator('input[type=number]')
        TCm = lambda: {'cat': box(mcat), 'prod': box(mprod()), 'w': box(mnums.nth(0)), 'h': box(mnums.nth(1)),
                       'cards': box(mp.get_by_text('Cena', exact=True).first), 'lam': box(mp.get_by_text('Laminowanie', exact=True).first),
                       'parts': box(mp.get_by_text('Składniki wyceny (widok techniczny)').first), 'offer': box(mp.get_by_role('button', name='Stwórz ofertę'))}
        shot(mp, 'm', 'calc_empty', TCm)
        mcat.select_option(label='Wnętrza'); mp.wait_for_timeout(600)
        mprod().select_option(label='Fototapeta na wymiar'); mp.wait_for_timeout(800)
        shot(mp, 'm', 'calc_prod', TCm)
        mnums.nth(0).fill('420'); mnums.nth(1).fill('270'); mp.wait_for_timeout(2500)
        shot(mp, 'm', 'calc_result', TCm)
        mp.get_by_text('Laminowanie', exact=True).first.click(); mp.wait_for_timeout(2000)
        shot(mp, 'm', 'calc_lam', TCm)
        mp.get_by_role('button', name='Stwórz ofertę').click(); mp.wait_for_url('**/offers/new'); mp.wait_for_timeout(2000)
        shot(mp, 'm', 'offer_new', {})
        mp.goto(B + f'/offer/{token}', wait_until='networkidle'); mp.wait_for_timeout(2500)
        mp.evaluate('localStorage.clear()')
        TPm = lambda: {'accept': box(mp.get_by_role('button', name='Akceptuj').first) or box(mp.get_by_text('Akceptuj', exact=False).first)}
        shot(mp, 'm', 'public', TPm)
        acc = mp.get_by_role('button', name='Akceptuj').first
        acc.scroll_into_view_if_needed(); acc.click(); mp.wait_for_timeout(1500)
        for btn in ('Potwierdź', 'Tak', 'Akceptuj ofertę'):
            try:
                mp.get_by_role('button', name=btn).first.click(timeout=1500); mp.wait_for_timeout(1500); break
            except Exception:
                pass
        shot(mp, 'm', 'public_accepted', {})
        pub.goto(B + f'/offer/{token}', wait_until='networkidle'); pub.wait_for_timeout(2000)
        shot(pub, 'd', 'public_accepted', {})
        pg.goto(B + f'/admin/offers/{oid}', wait_until='networkidle'); pg.wait_for_timeout(2500)
        shot(pg, 'd', 'offer_accepted', {})
        json.dump(meta, open(f'{OUT}/meta.json', 'w'), ensure_ascii=False, indent=1)
        b.close()


if __name__ == '__main__':
    run(); print('done')
