import json, random
from tp_setup_lib import req
ctx=json.load(open('tp_ctx.json')); tok=ctx['token']; tal=ctx['talents']
by_code={t['code']:t for t in tal}
dom={}
for t in tal: dom.setdefault(t['domain'],[]).append(t['code'])
random.seed(7)
people=[
 ('Ola Wiśniewska','Product Owner',{'strategic_thinking':3,'influencing':2}, ['strategic','futuristic','communication','arranger','learner']),
 ('Marek Zieliński','Tech Lead',{'strategic_thinking':3,'executing':2}, ['analytical','deliberative','responsibility','learner','focus']),
 ('Kasia Lewandowska','Analityk biznesowy',{'executing':2,'strategic_thinking':2}, ['input','analytical','achiever','consistency','discipline']),
 ('Tomek Wójcik','Developer',{'executing':3}, ['achiever','focus','restorative','learner','responsibility']),
 ('Ewa Kamińska','UX Designer',{'relationship_building':3,'strategic_thinking':1}, ['empathy','ideation','individualization','developer','harmony']),
 ('Paweł Nowicki','Account Manager',{'influencing':3,'relationship_building':2}, ['woo','activator','relator','positivity','competition']),
]
org=req('POST','/api/organizations',{'name':'Studio Produktowe Demo'},token=tok)
print('org', str(org)[:200]); oid=org['id']
team=req('POST','/api/teams',{'name':'Zespół projektowy','description':'Zespół demo (dane fikcyjne)','organization_id':oid},token=tok)
print('team', str(team)[:200]); tid=team['id']
ids=[]
for name,title,weights,top in people:
    rest=[c for c in by_code if c not in top]
    w=lambda c: weights.get(by_code[c]['domain'],0.5)+random.random()*1.6
    rest.sort(key=w, reverse=True)
    order=[c for c in top if c in by_code]+rest
    talents=[{'talent_id':by_code[c]['id'],'rank':i+1} for i,c in enumerate(order[:34])]
    r=req('POST','/api/invitations/ghost',{'full_name':name,'job_title':title,'team_id':tid,'organization_id':oid,'talents':talents},token=tok)
    print(name, str(r)[:160]); ids.append(r.get('id') or r.get('user',{}).get('id'))
json.dump({'team_id':tid,'org_id':oid,'members':ids}, open('tp_team.json','w'))
