// interract with db back end

function createDeck() {
  return fetch('/api/deck', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => json.id);
}

function createCard(deckId, l1word, l2word) {
  // let's try to send an api call with hardcoded values like in postman
  // return fetch('api/card?EN_word=test&ES_word=prueba', {
  // let's try to send the values passed in
  // 127.0.0.1:5000/api/deck/68dfd811-9913-422f-8c50-037055314e13/card?EN_word=test&ES_word=prueba
  console.log(`args are deck:${deckId}, l1word: ${l1word}, l2word: ${l2word}!`);
  return fetch(`api/deck/${deckId}/card?EN_word=${l1word}&ES_word=${l2word}`,
  //  return fetch(`api/deck/card?EN_word=${l1word}&ES_word=${l2word}`,
    {
    // return fetch('/api/card', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(json => json.id);
}
const Client = { createDeck, createCard };
export default Client;
