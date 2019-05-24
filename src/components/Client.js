// interract with db back end

function createDeck() {
  return fetch('/api/deck', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(deck => deck.id)
    .catch(err => console.error(err.message));
}

function createCard(deckId, l1word, l2word, imageUrl, imageId) {
  return fetch(`api/deck/${deckId}/card?L1_word=${l1word}&L2_word=${l2word}&img_url=${imageUrl}&img_id=${imageId}`,
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
    .then(response => response.json());
//    .catch(err => console.error(err.message));
}

function getCardsInDeck(deckId) {
  return fetch(`api/deck/${deckId}/cards`, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(err => console.error(err));
// oops, needed to be a deck in the db, how to troubleshoot? create a deck, 
// then create a card, then get that card?

//  return fetch('api/deck/9470f75e-ee46-43a3-911a-06ae23ebdfce/cards', {
//    method: 'GET',
//  })
//    .then(response => response.json())
//    .catch(err => console.error(err));
}

const Client = {
  createDeck, createCard, getDecks, getCardsInDeck,
};
export default Client;
