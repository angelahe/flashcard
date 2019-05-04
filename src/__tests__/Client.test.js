import Client from '../components/Client';


test('Test Client creates a deck successfully', () => {
  const testDeckId = '1809fd82-686a-4205-b0b5-51db95c0fd22';
  fetch.once(JSON.stringify({ id: '1809fd82-686a-4205-b0b5-51db95c0fd22' }));
  Client.createDeck().then((id) => {
    expect(id).toEqual(testDeckId);
  });
  expect(fetch.mock.calls.length).toEqual(1);
  expect(fetch.mock.calls[0][0]).toEqual('/api/deck');
});

// will want to check the L1 and L2 after creation

test('Test Client creates a card successfully', () => {
  const testCardId = '1809fd82-686a-4205-b0b5-51db95c0fd29';
  const testDeckId = '1809fd82-686a-4205-b0b5-51db95c0fd22';
  fetch.once(JSON.stringify({
    L1_word: 'test',
    L2_word: 'prueba',
    card_id: testCardId,
    deck_id: testDeckId,
  }));
  Client.createCard(testDeckId, 'bird', 'el pájaro').then((cardId) => {
    expect(cardId).toEqual(testCardId);
  });
  expect(fetch.mock.calls.length).toEqual(2);
  expect(fetch.mock.calls[1][0]).toEqual(`api/deck/${testDeckId}/card?L1_word=bird&L2_word=el pájaro`);
});

test('Test Client gives a list of all decks', () => {
  fetch.once(`[{"deck_id": "97d9a5d3-4f85-499d-b4b5-7fbf610b036e"}, 
    {"deck_id": "545ec835-bbe2-4b1c-a4ca-6468aa4c67b8"}, 
    {"deck_id": "6619549b-78d2-4228-b5a2-40e91e5be942"}, 
    {"deck_id": "7babe13f-72fe-484c-b9c7-c4baea78af10"}, 
    {"deck_id": "3bbf53ac-b43d-4f08-afd0-ac943c5f60d0"}]`);
  Client.getDecks().then((decks) => {
    expect(decks).toContainEqual({ deck_id: '97d9a5d3-4f85-499d-b4b5-7fbf610b036e' });
  });
  expect(fetch.mock.calls.length).toEqual(3);
  expect(fetch.mock.calls[2][0]).toEqual('api/deck/all');
});
