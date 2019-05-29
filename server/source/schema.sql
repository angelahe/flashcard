DROP TABLE IF EXISTS deck;
DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS cardtype;
DROP TABLE IF EXISTS appuser;

CREATE TABLE deck (
    deck_id TEXT PRIMARY KEY,
    deck_name TEXT NOT NULL,
    deck_key TEXT,
    deck_order INTEGER,
    author_id TEXT
);

CREATE TABLE card (
    card_id TEXT PRIMARY KEY,
    deck_id TEXT NOT NULL,
    L1_word TEXT NOT NULL,
    L2_word TEXT NOT NULL,
    img_url TEXT,
    img_id INTEGER,
    card_order INTEGER,
    cardtype_id TEXT,
    author_id TEXT,
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id),
    FOREIGN KEY (cardtype_id) REFERENCES cardtype(cardtype_id)
);

CREATE TABLE appuser (
    user_id TEXT PRIMARY KEY,
    user_email TEXT,
    user_name TEXT
);

CREATE TABLE cardtype (
    cardtype_id TEXT PRIMARY KEY,
    cardtype_name TEXT NOT NULL,
    cardtype_desc TEXT
);
