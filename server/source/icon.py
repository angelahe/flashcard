"""
blueprint for /api/icon routes
"""
import requests
from flask import(Blueprint, json, make_response, current_app, g, request)
from requests_oauthlib import OAuth1

bp = Blueprint('icon', __name__, url_prefix='/api/icon')

@bp.route('', methods=['GET'])
def get_icon_by_term():
    term = request.args.get('term')
    auth = OAuth1(current_app.config['KEY'], current_app.config['SECRET_KEY'])
    endpoint = f"https://api.thenounproject.com/icons/{term}?limit=200"
    response = requests.get(endpoint, auth=auth)
    
    icons = response.json()['icons']
    icons = [{'id': icon['id'], 'href': icon['preview_url']} for icon in icons]
    body = json.dumps(icons)
    return make_response((body, 200))
