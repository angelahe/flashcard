"""
blueprint for /api/card routes
"""
import functools
import uuid

from flask import(Blueprint, g, flash, request, json, make_response)
from source.db import get_db

bp = Blueprint('card', __name__, url_prefix='/api/card')
@bp.route('/all')
def index():
    db = get_db()
    cards = db.execute(
        'SELECT card_id, L1_word, L2_word, img_url, img_id'
        ' FROM card'
        ' ORDER BY card_id'
    ).fetchall()
    body = json.dumps( [dict(ix) for ix in cards] )
    print('json should be', body)
    return make_response((body, 200))
