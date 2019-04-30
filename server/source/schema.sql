DROP TABLE IF EXISTS deck;
DROP TABLE IF EXISTS card;

CREATE TABLE deck (
    deck_id TEXT PRIMARY KEY
);

CREATE TABLE card (
    card_id TEXT PRIMARY KEY,
    deck_id TEXT NOT NULL,
    EN_word TEXT NOT NULL,
    ES_word TEXT NOT NULL,
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id)
);