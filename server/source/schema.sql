DROP TABLE IF EXISTS deck;
DROP TABLE IF EXISTS card;

CREATE TABLE deck (
    deck_id TEXT PRIMARY KEY
);

CREATE TABLE card (
    card_id TEXT PRIMARY KEY,
    deck_id TEXT NOT NULL,
    L1_word TEXT NOT NULL,
    L2_word TEXT NOT NULL,
    img_url TEXT,
    img_id INTEGER,
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id)
);