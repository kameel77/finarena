"""Capture TalentPilot (local build, fictional demo team) for the Finarena case.
The app scrolls inside an inner container, so we capture viewport screenshots at scroll positions."""
import json, os, sys
from playwright.sync_api import sync_playwright

B = 'http://127.0.0.1:3400'
OUT = '/home/claude/work/tp-cap'
c = json.load(open('/home/claude/work/tp_ctx.json'))
t = json.load(open('/home/claude/work/tp_team.json'))
INIT = (f"localStorage.setItem('talentpilot_token', {json.dumps(c['token'])});"
        f"localStorage.setItem('talentpilot_user', {json.dumps(json.dumps(c['me']))});"
        "localStorage.setItem('talentpilot_active_org', '2');")
SCROLLER = """() => { let best = document.scrollingElement, bh = best.scrollHeight - best.clientHeight;
  for (const el of document.querySelectorAll('*')) { const s = getComputedStyle(el);
    if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight - el.clientHeight > bh) { best = el; bh = el.scrollHeight - el.clientHeight; } }
  window.__sc = best; return bh; }"""


def run(mode):
    mob = mode == 'm'
    vp = {'width': 390, 'height': 844} if mob else {'width': 1440, 'height': 900}
    meta = {'viewport': vp, 'frames': []}
    os.makedirs(f'{OUT}/{mode}', exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport=vp, device_scale_factor=3 if mob else 2, is_mobile=mob, has_touch=mob, locale='pl-PL')
        ctx.add_init_script(INIT)
        pg = ctx.new_page()
        n = [0]

        def box(loc):
            try:
                loc.wait_for(state='visible', timeout=4000)
            except Exception:
                return None
            bb = loc.bounding_box()
            return None if bb is None else {k: round(v, 1) for k, v in bb.items()}

        def scroll_to(y):
            pg.evaluate(SCROLLER)
            pg.evaluate(f"window.__sc.scrollTo(0, {y})")
            pg.wait_for_timeout(500)

        def scroll_text(text, offset):
            pg.evaluate(SCROLLER)
            y = pg.evaluate("""([t, off]) => { const el = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div,button')].find(e => e.children.length < 3 && (e.textContent||'').trim().startsWith(t));
              if (!el) return -1; const sc = window.__sc; const r = el.getBoundingClientRect(); const base = sc === document.scrollingElement ? 0 : sc.getBoundingClientRect().top;
              const y = sc.scrollTop + r.top - base - off; sc.scrollTo(0, y); return y; }""", [text, offset])
            pg.wait_for_timeout(600)
            return y

        def shot(name, targets=None):
            if callable(targets):
                targets = targets()
            n[0] += 1
            fn = f'{mode}/{n[0]:02d}_{name}.png'
            pg.screenshot(path=f'{OUT}/{fn}')
            meta['frames'].append({'file': fn, 'name': name, 'targets': targets or {}})

        # 1. Team matrix
        pg.goto(B + '/dashboard/teams/1', wait_until='networkidle'); pg.wait_for_timeout(3000)
        shot('matrix', lambda: {'row_ola': box(pg.get_by_text('Ola Wiśniewska').first), 'rank': box(pg.get_by_text('Ranking zespołu').first),
                                'tab_dom': box(pg.get_by_role('button', name='Domeny').first), 'tab_prof': box(pg.get_by_role('button', name='Profile').first),
                                'pres': box(pg.get_by_role('button', name='Prezentacja wyników').first)})
        if mob:
            # matrix scrolls horizontally on phones: capture a few offsets
            for i, x in enumerate((240, 520, 800)):
                pg.evaluate(f"(() => {{ for (const el of document.querySelectorAll('*')) {{ const s = getComputedStyle(el); if (/(auto|scroll)/.test(s.overflowX) && el.scrollWidth > el.clientWidth + 40) {{ el.scrollTo({x}, 0); }} }} }})()")
                pg.wait_for_timeout(500); shot(f'matrix_x{i}')
            pg.evaluate("(() => { for (const el of document.querySelectorAll('*')) { const s = getComputedStyle(el); if (/(auto|scroll)/.test(s.overflowX) && el.scrollWidth > el.clientWidth + 40) el.scrollTo(0, 0); } })()")
        # 2. Individual profile
        pg.goto(B + '/dashboard/users/2', wait_until='networkidle'); pg.wait_for_timeout(3000)
        T5 = lambda: {'top5': box(pg.get_by_role('tab', name='Top 5').first), 'top15': box(pg.get_by_role('tab', name='Top 15').first),
                      'all': box(pg.get_by_role('tab', name='1-34').first), 'domains': box(pg.get_by_text('Rozkład domen').first)}
        pg.get_by_role('tab', name='Top 5').first.click(); pg.wait_for_timeout(1200)
        shot('profile_top5', T5)
        pg.get_by_role('tab', name='Top 15').first.click(); pg.wait_for_timeout(1200)
        shot('profile_top15', T5)
        pg.get_by_role('tab', name='1-34').first.click(); pg.wait_for_timeout(1500)
        shot('profile_all', T5)
        if mob:
            scroll_text('Rozkład domen', 120); shot('profile_domains')
        else:
            scroll_to(420); shot('profile_all_scrolled')
        # 3. Team domains, risks, pairs
        pg.goto(B + '/dashboard/teams/1', wait_until='networkidle'); pg.wait_for_timeout(2500)
        pg.get_by_role('button', name='Domeny').first.click(); pg.wait_for_timeout(2500)
        shot('domains', lambda: {'radar': box(pg.get_by_text('Potencjał Domenowy').first)})
        for i, txt in enumerate(('Heatmapa talentów', 'Ryzyka', 'Komplementarne', 'Pary')):
            y = scroll_text(txt, 110)
            if y >= 0:
                shot(f'domains_{i}_{txt[:8]}')
        meta['domain_texts'] = pg.evaluate("[...document.querySelectorAll('h2,h3,h4')].map(e=>e.textContent.trim()).slice(0,40)")
        # 4. Profiles grid
        scroll_to(0)
        pg.get_by_role('button', name='Profile').first.click(); pg.wait_for_timeout(2000)
        shot('profiles')
        scroll_to(380 if not mob else 700); shot('profiles_scrolled')
        # 5. Presentation link modal + public view
        scroll_to(0)
        pg.get_by_role('button', name='Prezentacja wyników').first.click(); pg.wait_for_timeout(1500)
        shot('pres_modal')
        pub = t['presentation']['token']
        pg.goto(B + '/presentation/' + pub, wait_until='networkidle'); pg.wait_for_timeout(3000)
        shot('public')
        json.dump(meta, open(f'{OUT}/{mode}_meta.json', 'w'), ensure_ascii=False, indent=1)
        b.close()


if __name__ == '__main__':
    for m in sys.argv[1:]:
        run(m); print('done', m)
