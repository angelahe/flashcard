"""
blueprint for /api/card routes
"""
import functools
import uuid

from flask import(Blueprint, g, request, json, make_response, abort, jsonify)
from source.db import get_db

bp = Blueprint('card', __name__, url_prefix='/api/card')
@bp.route('/all')
def index():
    db = get_db()
    cards = db.execute(
        'SELECT card_id, deck_id, L1_word, L2_word, img_url, img_id, card_order'
        ' FROM card'
        ' ORDER BY deck_id, card_order'
    ).fetchall()
    body = json.dumps( [dict(ix) for ix in cards] )
    print('json should be', body)
    return make_response((body, 200))

def get_card(id):
    card = get_db().execute(
        'SELECT * FROM card WHERE card_id = ?',
        (id,)
    ).fetchone()
    if card is None:
        abort(404, "Card id {0} doesn't exist.".format(id))
    return card

@bp.route('/<string:card_id>/update', methods=['POST'])
def update(card_id):
    card = get_card(card_id)

    content = request.get_json()
    print('----update card ', request, content)

    L1_word = content['L1_word']
    L2_word = content['L2_word']
    img_url = content['img_url']
    img_id = content['img_id']
    card_order = content['card_order']
    print('----L1word is ', L1_word)

    message = None
    response = {}

    if not L1_word:
        message = 'L1 is required'
    
    if not L2_word:
        message = 'L2 is required'
    
    print('message is ', message)
    if message is not None:
        #return error
        print('error updating')
        response = {"message": message}
        body = json.dumps(response)
        return make_response(body, 400)
    else:
        db = get_db()
        db.execute(
            'UPDATE card SET L1_word = ?, L2_word = ?, img_url = ?,'
            ' img_id = ?, card_order = ?'
            ' WHERE card_id = ?',
            (L1_word, L2_word, img_url, img_id, card_order, card_id)
        )
        db.commit()
        response = {"message": "Successfully updated"}
        body = json.dumps(response)
        return make_response(body, 200)

@bp.route('/<string:card_id>', methods=['DELETE'])
def delete_card(card_id):
    card = get_card(card_id)
    print(f'card is $card')
    response = {}
    if card:
        db = get_db()
        db.execute('DELETE FROM card WHERE card_id = ?', (card_id,))
        db.commit()
        response = {"message": "Successfully deleted",}
        body = json.dumps(response)
        return make_response(body,200)
    else:
        response = {"message": "Delete failed"}
        body = json.dumps(response)
        return make_response(body,404)