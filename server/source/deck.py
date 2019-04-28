"""
blueprint for /api/deck routes
"""
import functools
import uuid

from flask import(Blueprint, g, request, json, make_response)
from source.db import get_db

bp = Blueprint('deck', __name__, url_prefix='/api/deck')

@bp.route('', methods=['POST'])
def create():
    db = get_db()
    id = str(uuid.uuid4())
    db.execute(
        'INSERT INTO deck (deck_id) VALUES (?)', (id,)
    )
    db.commit()
    thisdeck={"id" : id}
    body = json.dumps(thisdeck)
    return make_response((body, 201))