// interract with db back end

function createDeck() {
  return fetch('/api/deck', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(deck => deck.id);
}

function createCard(deckId, l1word, l2word, imageUrl, imageId) {
  // eg of working postman call:
  // 127.0.0.1:5000/api/deck/68dfd811-9913-422f-8c50-037055314e13/card?EN_word=test&ES_word=prueba
  console.log(`args are deck:${deckId}, l1word: ${l1word}, l2word: ${l2word}!`);
  return fetch(`api/deck/${deckId}/card?L1_word=${l1word}&L2_word=${l2word}
    &img_url=${imageUrl}&img_id=${imageId}`,
  //  return fetch(`api/deck/card?EN_word=${l1word}&ES_word=${l2word}`,
  {
    // return fetch('/api/card', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(card => card.card_id);
}

function getDecks() {
  // const self = this;
  return fetch('api/deck/all', {
    method: 'GET',
  })
    .then(response => response.json());
}
const Client = { createDeck, createCard, getDecks };
export default Client;
