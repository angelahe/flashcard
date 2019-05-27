let idToken = '';

// interact with db back end
function createDeck(name, key, order) {
  return fetch(`/api/deck?deck_name=${name}&deck_key=${key}&deck_order=${order}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    .then(response => response.json())
    .then(deck => deck.id)
    .catch(err => console.error(err.message));
}

function deleteDeck(deck) {
  return fetch(`/api/deck/${deck}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    .then(response => response.json())
    .catch(err => console.error(err.message));
}

function createCard(deckId, l1word, l2word, order, imageUrl, imageId) {
  return fetch(`api/deck/${deckId}/card?L1_word=${l1word}&L2_word=${l2word}&card_order=${order}&img_url=${imageUrl}&img_id=${imageId}`,
    {
      method: 'POST',
    })
    .then(response => response.json())
    .then(card => card.card_id)
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

function login(token) {
  idToken = token;
}

const Client = {
  login, createDeck, deleteDeck, createCard, getDecks, getCardsInDeck,
};
export default Client;
