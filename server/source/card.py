"""
blueprint for /api/card routes
"""
import functools
import uuid

from flask import(Blueprint, g, flash, request, json, make_response)
from source.db import get_db

bp = Blueprint('card', __name__, url_prefix='/api/card')
@bp.route('/')
def index():
    db = get_db()
    cards = db.execute(
        'SELECT card_id, EN_word, ES_word'
        ' FROM card'
        ' ORDER BY card_id'
    ).fetchall()

