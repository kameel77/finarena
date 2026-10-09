"""Capture Motolia customer-journey states for the Finarena case animation.
Never submits any form. Blurs the response-time claim (a metric)."""
import json, os, sys
from playwright.sync_api import sync_playwright

OFFER = 'https://motolia.pl/oferta/ford-focus-trend-2018-kompakt-diesel-cmq6sbah900fweweh9uaulqne'
LIST = 'https://motolia.pl/samochody'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')

BLUR_CSS = """
(() => { for (const el of document.querySelectorAll('*')) {
  if (el.children.length === 0 && /czas odpowiedzi/i.test(el.textContent || '')) {
    const box = el.closest('div'); if (box) box.style.filter = 'blur(6px)';
  } } })()
"""

def vis(locator):
    return locator.filter(visible=True).first

def box(pg, locator):
    try:
        locator.wait_for(state='visible', timeout=4000)
    except Exception:
        return None
    b = locator.bounding_box()
    return None if b is None else {k: round(v, 1) for k, v in b.items()}

def run(mode):
    mob = mode == 'm'
    vp = {'width': 390, 'height': 844} if mob else {'width': 1440, 'height': 900}
    meta = {'viewport': vp, 'dpr': 3 if mob else 2, 'frames': []}
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport=vp, device_scale_factor=meta['dpr'], is_mobile=mob, has_touch=mob, locale='pl-PL')
        pg = ctx.new_page()
        n = [0]
        def shot(name, targets=None):
            n[0] += 1
            fn = f'{mode}/{n[0]:02d}_{name}.png'
            pg.screenshot(path=f'{OUT}/{fn}')
            meta['frames'].append({'file': fn, 'name': name, 'targets': targets or {}})
            return fn

        # 1. Offers list
        pg.goto(LIST, wait_until='networkidle', timeout=90000)
        pg.get_by_role('button', name='Odrzucam opcjonalne').click(timeout=8000)
        pg.wait_for_timeout(1500)
        firm = vis(pg.get_by_role('button', name='Na firmę'))
        shot('list', {'firm': box(pg, firm)})
        firm.click(); pg.wait_for_timeout(1500)
        card = vis(pg.get_by_text('Ford Focus', exact=True))
        shot('list_firm', {'card': box(pg, card)})

        # 2. Offer page
        pg.goto(OFFER, wait_until='networkidle', timeout=90000)
        pg.wait_for_timeout(1500)
        if mob:
            pg.get_by_role('button', name='Na firmę').first.scroll_into_view_if_needed()
            pg.mouse.wheel(0, -120); pg.wait_for_timeout(500)
        tfirm = vis(pg.get_by_role('button', name='Na firmę'))
        shot('offer', {'firm': box(pg, tfirm)})
        tfirm.click(); pg.wait_for_timeout(1000)
        if mob:
            vis(pg.get_by_text('Kalkulator finansowania')).scroll_into_view_if_needed()
            pg.mouse.wheel(0, 120); pg.wait_for_timeout(600)
        thumb = vis(pg.locator('[role=slider]'))
        calc = vis(pg.get_by_text('Kalkulator finansowania'))
        rate = vis(pg.get_by_text('Miesięczna rata', exact=False))
        shot('offer_firm', {'thumb': box(pg, thumb), 'calc': box(pg, calc), 'rate': box(pg, rate)})
        # move the term slider right, step by step (keyboard = deterministic)
        thumb.focus()
        i = 0
        while i < 6 and thumb.get_attribute('aria-valuenow') != thumb.get_attribute('aria-valuemax'):
            pg.keyboard.press('ArrowRight'); pg.wait_for_timeout(400); pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(1500); i += 1
            shot(f'slide{i}', {'thumb': box(pg, thumb), 'value': thumb.get_attribute('aria-valuenow')})
        pg.evaluate('document.activeElement && document.activeElement.blur()')
        ask = vis(pg.get_by_role('button', name='Zapytaj o ofertę')) if not mob else vis(pg.get_by_role('link', name='Wyślij zapytanie'))
        ask.scroll_into_view_if_needed(); pg.wait_for_timeout(400)
        shot('offer_ask', {'ask': box(pg, ask)})
        ask.click(); pg.wait_for_timeout(2500)
        pg.wait_for_load_state('networkidle')
        pg.wait_for_timeout(2500)
        pg.evaluate(BLUR_CSS)
        name_in = vis(pg.locator('input[name=name]'))
        phone_in = vis(pg.locator('input[name=phone]'))
        if mob:
            name_in.scroll_into_view_if_needed(); pg.mouse.wheel(0, -160); pg.wait_for_timeout(400)
        shot('form', {'name': box(pg, name_in), 'phone': box(pg, phone_in)})
        name_in.click()
        for i, part in enumerate(['An', 'Anna', 'Anna No', 'Anna Nowak']):
            name_in.fill(part); pg.wait_for_timeout(120); shot(f'type_name{i}', {'name': box(pg, name_in)})
        phone_in.click()
        for i, part in enumerate(['+48 50', '+48 500 00', '+48 500 000 000']):
            phone_in.fill(part); pg.wait_for_timeout(120); shot(f'type_phone{i}', {'phone': box(pg, phone_in)})
        send = vis(pg.locator('button[type=submit]', has_text='Wyślij zapytanie'))
        send.scroll_into_view_if_needed(); pg.wait_for_timeout(400)
        shot('form_send', {'send': box(pg, send), 'phone': box(pg, phone_in)})
        # never click send
        json.dump(meta, open(os.path.join(os.path.dirname(OUT), 'src', f'{mode}_meta.json'), 'w'), ensure_ascii=False, indent=1)
        ctx.close(); b.close()

if __name__ == '__main__':
    import os
    for m in sys.argv[1:]:
        os.makedirs(f'{OUT}/{m}', exist_ok=True)
        run(m)
        print('done', m)
