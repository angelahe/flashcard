"""
blueprint for /api/cardtype routes
"""
import functools
import uuid

from flask import(Blueprint, g, flash, request, json, make_response)
from source.db import get_db

bp = Blueprint('cardtype', __name__, url_prefix='/api/cardtype')

@bp.route('', methods=['POST'])
def create_cardtype():
    """insert row to cardtype table"""
    print(request)
    print("request data is", request.data)

    cardtype_id = str(uuid.uuid4())
    cardtype_name = request.args.get('cardtype_name')
    cardtype_desc = request.args.get('cardtype_desc')

    db = get_db()
    db.execute(
        'INSERT INTO cardtype (cardtype_id, cardtype_name, cardtype_desc)'
        ' VALUES (?, ?, ?)',
        (cardtype_id, cardtype_name, cardtype_desc)
    )
    db.commit()
    thiscardtype = {"cardtype_id": cardtype_id, "cardtype_name": cardtype_name,
                "cardtype_desc": cardtype_desc}
    body = json.dumps(thiscardtype)
    return make_response((body, 201))

@bp.route('/all')
def index():
    db = get_db()
    cardtypes = db.execute(
        'SELECT *'
        ' FROM cardtype'
        ' ORDER BY cardtype_name'
    ).fetchall()
    body = json.dumps( [dict(ix) for ix in cardtypes] )
    print('json should be', body)
    return make_response((body, 200))
