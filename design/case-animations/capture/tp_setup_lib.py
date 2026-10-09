import json, random, urllib.request
A='http://127.0.0.1:8100'
def req(method, path, body=None, token=None):
    r=urllib.request.Request(A+path, method=method, data=None if body is None else json.dumps(body).encode(), headers={'content-type':'application/json', **({'authorization':'Bearer '+token} if token else {})})
    try:
        with urllib.request.urlopen(r) as f: return json.loads(f.read() or b'null')
    except urllib.error.HTTPError as e: return {'_err': e.code, 'body': e.read().decode()[:400]}
