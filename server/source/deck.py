"""
blueprint for /api/deck routes
"""
import functools
import uuid

from flask import(Blueprint, g, request, json, make_response, abort, jsonify)
from source.db import get_db
from source.auth import check_authorization

bp = Blueprint('deck', __name__, url_prefix='/api/deck')

@bp.route('', methods=['POST'])
@check_authorization
def create():
    """insert row to deck table"""
    print(request)
    content = request.get_json()
    #print('-----add request ', request, content)
    #print('about to add ', content['deck_name'], content['deck_key'], content['deck_order'])

    deck_name = content['deck_name']
    deck_key = content['deck_key']
    deck_order = content['deck_order']

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

@bp.route('/<string:deck_id>/update', methods=['POST'])
@check_authorization
def update(deck_id):
    print(deck_id)
    print('in update of deck')
    print('deck id is {0}'.format(deck_id))
    deck = get_deck(deck_id)

    content = request.get_json()
    #print('-----add request ', request, content)
    #print('about to add ', content['deck_name'], content['deck_key'], content['deck_order'])

    deck_name = content['deck_name']
    deck_key = content['deck_key']
    deck_order = content['deck_order']

    message = None
    response = {}

    if not deck_name:
        message = 'Deck Name is required'
    
    print('----message', message)

    if message is not None:
        #return error
        print('error updating')
        response = {"message": message}
        body = json.dumps(response)
        return make_response(body, 400)
    else:
        db = get_db()
        db.execute(
            'UPDATE deck SET deck_name = ?, deck_key = ?, deck_order = ?'
            ' WHERE deck_id = ?',
            (deck_name, deck_key, deck_order, deck_id)
        )
        db.commit()
        response = {"message": "Successfully updated"}
        body = json.dumps(response)
        return make_response(body, 200)

@bp.route('/<string:deck_id>', methods=['DELETE'])
@check_authorization
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
        ' ORDER BY deck_order'
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
        ' WHERE deck_id = ?'
        ' ORDER BY card_order', (deck_id,)
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