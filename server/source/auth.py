import functools
import jwt

from flask import (
    Blueprint, flash, g, redirect, make_response, render_template, request, abort, session, url_for
)

key = jwt.algorithms.RSAAlgorithm.from_jwk("""{
      "kid": "07a082839f2e71a9bf6c596996b94739785afdc3",
      "e": "AQAB",
      "kty": "RSA",
      "alg": "RS256",
      "n": "9Y5kfSJyw-GyM4lSXNCVaMKmDdOkYdu5ZhQ7E-8nfae-CPPsx3IZjdUrrv_AoKhM3vsZW_Z3Vucou53YZQuHFpnAa6YxiG9ntpScviU1dhMd4YyUtNYWVBxgNemT9dhhj2i32ez0tOj7o0tGh2Yoo2LiSXRDT-m2zwBImYkBksws4qq_X3jZhlfYkznrCJGjVhKEHzlQy5BBqtQtN5dXFVi-zRZ0-m7oiNW_2wivjw_99li087PNFSeyHpgxjbg30K2qnm1T8gVhnzqf8xnPW9vZFyc_8-3qmbQeDedB8YWyzojM3hDLsHqypP84MSOmejmi0c2b836oc-pI8seXwQ",
      "use": "sig"
    }""")

client_id = '429844335765-5u6hvbq01o05k3likkjf3l89frst4jvh.apps.googleusercontent.com'

def check_authorization(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        # Check request has a Bearer token which is the only
        # supported type of authorization
        token = request.headers.get('Authorization')
        if not token or token[:7] != 'Bearer ':
            response = make_response('Unauthorized', 401, {
                'WWW-Authenticate': 'Bearer'
            })
            abort(response)
        
        # Check the digital signature on the bearer token and
        # confirm it is a valid JWT issued to this application
        token = token[7:]
        try:
            decoded = jwt.decode(
                token,
                key,
                'RS256',
                audience=client_id
            )
            # TODO: Set the user in the global application context (g)
            print(decoded)
        except Exception as e: 
            print (e)
            response = make_response('Unauthorized', 401, {
                'WWW-Authenticate': 'Bearer'
            })
            abort(response)

        return view(**kwargs)
    return wrapped_view
