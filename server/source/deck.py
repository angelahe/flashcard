"""
blueprint for /api/deck routes
"""
import functools
import uuid

from flask import(Blueprint, g, request, json, make_response, abort, jsonify)
from source.db import get_db

bp = Blueprint('deck', __name__, url_prefix='/api/deck')


@bp.route('', methods=['POST'])
def create():
    """insert row to deck table"""
    print(request)
    print("request data is", request.data)

    deck_name = request.args.get('deck_name')
    deck_key = request.args.get('deck_key')
    deck_order = request.args.get('deck_order')

    db = get_db()
    deck_id = str(uuid.uuid4())
    db.execute(
        'INSERT INTO deck (deck_id, deck_name, deck_key, deck_order)'
        ' VALUES (?, ?, ?, ?)', 
        (deck_id, deck_name, deck_key, deck_order)
    )
    db.commit()
    thisdeck = {"id": deck_id, "deck_name": deck_name,
                "deck_key": deck_key, "deck_order": deck_order}
    body = json.dumps(thisdeck)
    return make_response((body, 201))

def get_deck(id):
    deck = get_db().execute(
        'SELECT * FROM deck WHERE deck_id = ?',
        (id,)
    ).fetchone()
    if deck is None:
        abort(404, "Deck id {0} doesn't exist.".format(id))
    return deck

@bp.route('/<string:deck_id>/delete', methods=('POST',))
def delete_deck(deck_id):
    deck = get_deck(deck_id)
    print(f'deck is $deck')
    response = {}
    if deck:
        db = get_db()
        db.execute('DELETE FROM deck WHERE deck_id = ?', (deck_id,))
        db.commit()
        response = {"message": "Successfully deleted",}
        body = json.dumps(response)
        return make_response(body,200)
    else:
        response = {"message": "Delete failed"}
        body = json.dumps(response)
        return make_response(body,404)

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
    card_order = request.args.get('card_order')
    cardtype_id = request.args.get('cardtype_id')

    db = get_db()
    db.execute(
        'INSERT INTO card (card_id, deck_id, L1_word, L2_word, img_url, img_id, card_order, cardtype_id)'
        ' VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        (card_id, deck_id, L1_word, L2_word, img_url, img_id, card_order, cardtype_id)
    )
    db.commit()
    thiscard = {"card_id": card_id, "deck_id": deck_id,
                "L1_word": L1_word, "L2_word": L2_word,
                "img_url": img_url, "img_id": img_id,
                "card_order": card_order, "cardtype_id": cardtype_id}
    body = json.dumps(thiscard)
    return make_response((body, 201))

@bp.route('/all')
def get_decks():
    db = get_db()
    decks = db.execute(
        'SELECT *'
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