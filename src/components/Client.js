// interract with db back end

function createDeck() {
  return fetch('/api/deck', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(deck => deck.id);
}

function createCard(deckId, l1word, l2word, imageUrl, imageId) {
  return fetch(`api/deck/${deckId}/card?L1_word=${l1word}&L2_word=${l2word}
    &img_url=${imageUrl}&img_id=${imageId}`,
  {
    method: 'POST',
  })
    .then(response => response.json())
    .then(card => card.card_id);
}

function getDecks() {
  return fetch('api/deck/all', {
    method: 'GET',
  })
    .then(response => response.json());
}

function getCards(deckId) {
  return fetch(`api/deck/${deckId}/cards`, {
    method: 'GET',
  })
    .then(response => response.json());
}

const Client = {
  createDeck, createCard, getDecks, getCards,
};
export default Client;
