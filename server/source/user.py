"""
blueprint for /api/user routes
"""
from flask import(Blueprint, json, make_response)
from source.db import get_db

bp = Blueprint('user', __name__, url_prefix='/api/user')
@bp.route('/all')
def index():
    db = get_db()
    users = db.execute(
        'SELECT *'
        ' FROM appuser'
        ' ORDER BY user_name'
    ).fetchall()
    body = json.dumps( [dict(ix) for ix in users] )
    print('json should be', body)
    return make_response((body, 200))
