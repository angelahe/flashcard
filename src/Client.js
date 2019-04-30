// interract with db back end

function createDeck() {
  return fetch('/api/deck', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => json.id);
}

function createCard(L1word, L2word) {
  // let's try to send an api call with hardcoded values like in postman
  // return fetch('api/card?EN_word=test&ES_word=prueba', {
  // let's try to send the values passed in
  return fetch(`api/card?EN_word=${L1word}&ES_word=${L2word}`,
    {
    // return fetch('/api/card', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(json => json.id);
}
const Client = { createDeck, createCard };
export default Client;
