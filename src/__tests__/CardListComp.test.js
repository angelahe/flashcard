import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import CardListComp from '../components/CardListComp';
import cardList from '../testdata/testcardlist';
import Client from '../components/Client';

const deck = 'ABCD-1234';

it('renders without crashing', () => {
  fetch.once(JSON.stringify([
    {
      L1_word: 'fish', L2_word: 'el pez', card_id: 'f6a18989-3138-4801-b95e-435e8af3a2f0', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 6725, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/6725-200.png',
    },
    {
      L1_word: 'dog', L2_word: 'el perro', card_id: '2bdd592e-2e5f-497e-ac00-ebbc46b29f1a', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 364, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/364-200.png',
    },
    {
      L1_word: 'bird', L2_word: 'el p\u00e1jaro', card_id: '90f9b79a-b779-4669-a5e2-9691b92f8365', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 17463, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/17463-200.png',
    },
  ]));
  shallow(<CardListComp deck={deck} />);
});

it('renders without crashing', () => {
  fetch.once(JSON.stringify([
    {
      L1_word: 'fish', L2_word: 'el pez', card_id: 'f6a18989-3138-4801-b95e-435e8af3a2f0', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 6725, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/6725-200.png',
    },
    {
      L1_word: 'dog', L2_word: 'el perro', card_id: '2bdd592e-2e5f-497e-ac00-ebbc46b29f1a', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 364, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/364-200.png',
    },
    {
      L1_word: 'bird', L2_word: 'el p\u00e1jaro', card_id: '90f9b79a-b779-4669-a5e2-9691b92f8365', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 17463, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/17463-200.png',
    },
  ]));
  const div = document.createElement('div');
  ReactDOM.render(<CardListComp deck={deck} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  fetch.once(JSON.stringify([
    {
      L1_word: 'fish', L2_word: 'el pez', card_id: 'f6a18989-3138-4801-b95e-435e8af3a2f0', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 6725, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/6725-200.png',
    },
    {
      L1_word: 'dog', L2_word: 'el perro', card_id: '2bdd592e-2e5f-497e-ac00-ebbc46b29f1a', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 364, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/364-200.png',
    },
    {
      L1_word: 'bird', L2_word: 'el p\u00e1jaro', card_id: '90f9b79a-b779-4669-a5e2-9691b92f8365', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 17463, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/17463-200.png',
    },
  ]));
  const tree = renderer.create(<CardListComp deck={deck} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div CardListComp on shallow render', () => {
  fetch.once(JSON.stringify([
    {
      L1_word: 'fish', L2_word: 'el pez', card_id: 'f6a18989-3138-4801-b95e-435e8af3a2f0', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 6725, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/6725-200.png',
    },
    {
      L1_word: 'dog', L2_word: 'el perro', card_id: '2bdd592e-2e5f-497e-ac00-ebbc46b29f1a', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 364, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/364-200.png',
    },
    {
      L1_word: 'bird', L2_word: 'el p\u00e1jaro', card_id: '90f9b79a-b779-4669-a5e2-9691b92f8365', deck_id: '9470f75e-ee46-43a3-911a-06ae23ebdfce', img_id: 17463, img_url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/17463-200.png',
    },
  ]));
  const component = shallow(<CardListComp deck={deck} />);
  expect(component.html()).toContain('CardListComp');
});

it('shows cards loaded', (done) => {
  Client.getCardsInDeck = jest.fn(() => Promise.resolve(cardList.cardList));
  const component = shallow(<CardListComp deck={deck} />);

  setTimeout(() => {
    expect(Client.getCardsInDeck.mock.calls.length).toBe(1);
    expect(component.instance().state.cardList).toBe(cardList.cardList);
    done();
  });
});

it('handles a child select event', () => {
  Client.getCardsInDeck = jest.fn(() => Promise.resolve(cardList.cardList));

  const handleCardSelect = jest.fn(() => {});
  const component = shallow(<CardListComp
    deck={deck}
    onCardSelect={handleCardSelect}
  />);
  component.instance().handleCardSelect(deck);
  expect(handleCardSelect.mock.calls.length).toBe(1);
  expect(handleCardSelect.mock.calls[0][0]).toBe(deck);
});

it('handles a child edit event', () => {
  Client.getCardsInDeck = jest.fn(() => Promise.resolve(cardList.cardList));

  const handleCardEdit = jest.fn(() => {});
  const component = shallow(<CardListComp
    deck={deck}
    onCardEdit={handleCardEdit}
  />);
  component.instance().handleCardEdit(deck);
  expect(handleCardEdit.mock.calls.length).toBe(1);
  expect(handleCardEdit.mock.calls[0][0]).toBe(deck);
});

it('handles a child delete event', () => {
  Client.getCardsInDeck = jest.fn(() => Promise.resolve(cardList.cardList));

  const handleCardDelete = jest.fn(() => {});
  const component = shallow(<CardListComp
    deck={deck}
    onCardDelete={handleCardDelete}
  />);
  component.instance().handleCardDelete(deck);
  expect(handleCardDelete.mock.calls.length).toBe(1);
  expect(handleCardDelete.mock.calls[0][0]).toBe(deck);
});
