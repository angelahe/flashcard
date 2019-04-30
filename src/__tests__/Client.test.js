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
  fetch.once(JSON.stringify({ id: '1809fd82-686a-4205-b0b5-51db95c0fd29' }));
  Client.createCard(testDeckId, 'bird', 'el pájaro').then((id) => {
    expect(id).toEqual(testCardId);
  });
  expect(fetch.mock.calls.length).toEqual(2);
  expect(fetch.mock.calls[1][0]).toEqual(`api/deck/${testDeckId}/card?EN_word=bird&ES_word=el pájaro`);
});
