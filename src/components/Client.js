// interact with db back end
function createDeck(name, key, order) {
  const data = { deck_name: name, deck_key: key, deck_order: order };

  return fetch('/api/deck',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deck_name: name,
        deck_key: key,
        deck_order: order,
      }),
    })
    .then(response => response.json())
    .then(deck => deck.id)
    .catch(err => console.error(err.message));
}

function editDeck(deckId, name, key, order) {
  console.log('deck id is ', deckId);
  return fetch(`api/deck/${deckId}/update`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deck_name: name,
        deck_key: key,
        deck_order: order,
      }),
    })
    .then(response => response.json())
    .then(deck => deck.id)
    .catch(err => console.error(err.message));
}

function deleteDeck(deckId) {
  return fetch(`/api/deck/${deckId}`,
    {
      method: 'DELETE',
    })
    .then(response => response.json())
    .catch(err => console.error(err.message));
}

function createCard(deckId, l1word, l2word, order, imageUrl, imageId) {
  return fetch(`api/deck/${deckId}/card?L1_word=${l1word}&L2_word=${l2word}&card_order=${order}&img_url=${imageUrl}&img_id=${imageId}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(card => card.card_id)
    .catch(err => console.error(err.message));
}

function editCard(cardId, l1word, l2word, order, imageUrl, imageId) {
  return fetch(`api/card/${cardId}/update`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        L1_word: l1word,
        L2_word: l2word,
        card_order: order,
        img_url: imageUrl,
        img_id: imageId,
      }),
    })
    .then(response => response.json())
    .then(card => card.card_id)
    .catch(err => console.error(err.message));
}

function deleteCard(card) {
  return fetch(`/api/card/${card}`,
    {
      method: 'DELETE',
    })
    .then(response => response.json())
    .catch(err => console.error(err.message));
}

function getDecks() {
  return fetch('api/deck/all', {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(err => console.error(err.message));
}

function getCardsInDeck(deckId) {
  return fetch(`api/deck/${deckId}/cards`, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(err => console.error(err.message));
}

const Client = {
  createDeck,
  editDeck,
  deleteDeck,
  createCard,
  editCard,
  deleteCard,
  getDecks,
  getCardsInDeck,
};

export default Client;
