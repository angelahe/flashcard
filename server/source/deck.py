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
    """insert row to db"""
    db = get_db()
    deck_id = str(uuid.uuid4())
    db.execute(
        'INSERT INTO deck (deck_id) VALUES (?)', (deck_id,)
    )
    db.commit()
    thisdeck = {"id": deck_id}
    body = json.dumps(thisdeck)
    return make_response((body, 201))


@bp.route('/<string:deck_id>/card', methods=['POST'])
def create_card(deck_id):
    """insert row to db"""
    print(request)
    print("request data is", request.data)

    card_id = str(uuid.uuid4())
    #EN_word = "the cat"
    #ES_word = "el gato"
    #EN_word = request.form['EN_word']
    #ES_word = request.form['ES_word']
    L1_word = request.args.get('L1_word')
    L2_word = request.args.get('L2_word')
    print("L1 word is", L1_word)

    db = get_db()
    db.execute(
        'INSERT INTO card (card_id, deck_id, L1_word, L2_word)'
        ' VALUES (?, ?, ?, ?)',
        (card_id, deck_id, L1_word, L2_word)
    )
    db.commit()
    thiscard = {"card_id": card_id, "deck_id": deck_id,
                "L1_word": L1_word, "L2_word": L2_word}
    body = json.dumps(thiscard)
    return make_response((body, 201))
