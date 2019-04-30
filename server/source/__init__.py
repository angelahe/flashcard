"""
Application Factory to tell Python that the source directory should be
treated as a package

from http://flask.pocoo.org/docs/1.0/tutorial/factory/
"""
import os

from flask import Flask


def create_app(test_config=None):
    """
    create and configure the app
    import the database
    """
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flashcard.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    from . import db
    db.init_app(app)

    from . import deck
    app.register_blueprint(deck.bp)

    from . import card
    app.register_blueprint(card.bp)
    
    return app
