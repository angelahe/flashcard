"""
blueprint for /api/user routes
"""
import functools
import uuid

from flask import(Blueprint, g, request, json, make_response, abort, jsonify)
from source.db import get_db
from source.auth import check_authorization

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
