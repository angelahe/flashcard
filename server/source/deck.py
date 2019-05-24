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
    """insert row to deck table"""
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
    """insert row to card table"""
    print(request)
    print("request data is", request.data)

    card_id = str(uuid.uuid4())
    L1_word = request.args.get('L1_word')
    L2_word = request.args.get('L2_word')
    img_url = request.args.get('img_url')
    img_id = request.args.get('img_id')

    db = get_db()
    db.execute(
        'INSERT INTO card (card_id, deck_id, L1_word, L2_word, img_url, img_id)'
        ' VALUES (?, ?, ?, ?, ?, ?)',
        (card_id, deck_id, L1_word, L2_word, img_url, img_id)
    )
    db.commit()
    thiscard = {"card_id": card_id, "deck_id": deck_id,
                "L1_word": L1_word, "L2_word": L2_word,
                "img_url": img_url, "img_id": img_id}
    body = json.dumps(thiscard)
    return make_response((body, 201))


@bp.route('/all')
def get_decks():
    db = get_db()
    decks = db.execute(
        'SELECT deck_id'
        ' FROM deck'
    ).fetchall()
    body = json.dumps( [dict(ix) for ix in decks] )
    #body = json.dumps(decks)
    print('json should be',body)
    return make_response((body, 200))

@bp.route('/<string:deck_id>/cards', methods=['GET'])
def get_cards_in_deck(deck_id):
    db = get_db()
    cards = db.execute(
        'SELECT * FROM card'
        ' WHERE deck_id = ?', (deck_id,)
    ).fetchall()
    body = json.dumps( [dict(ix) for ix in cards] )
    return make_response((body, 200))

@bp.route('/cards', methods=['GET'])
def get_cards():
    db = get_db()
    cards = db.execute(
        'SELECT * FROM card'
    ).fetchall()
    body = json.dumps( [dict(ix) for ix in cards] )
    return make_response((body, 200))