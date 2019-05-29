import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FlashcardDecksComp from '../components/flashcard/FlashcardDecksComp';
import Client from '../components/Client';
import deckList from '../testdata/testdecklist';

const decks = JSON.stringify([
  { deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939', deck_name: 'Animals' },
  { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc', deck_name: 'Birds' },
]);

// const deck = { deck_id: 'ABCD-1234', deck_name: 'Animals' };

it('renders without crashing', () => {
  fetch.once(decks);
  shallow(<FlashcardDecksComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.once(decks);
  ReactDOM.render(<FlashcardDecksComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  fetch.once(decks);
  const tree = renderer.create(<FlashcardDecksComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div FlashcardDecksComp on shallow render', () => {
  fetch.once(decks);
  const component = shallow(<FlashcardDecksComp />);
  expect(component.html()).toContain('FlashcardDecksComp');
});

it('goes to ManageDecks on Add Click', () => {
  fetch.once(decks);
  const handleAddClick = jest.fn(() => {});
  const component = shallow(<FlashcardDecksComp onAdd={handleAddClick} />);
  component.instance().handleAddClick();
  expect(handleAddClick.mock.calls.length).toBe(1);
});

it('shows decks loaded', (done) => {
  const handleAddClick = jest.fn(() => {});
  Client.getDecks = jest.fn(() => Promise.resolve(deckList.deckList));
  const component = shallow(<FlashcardDecksComp onAdd={handleAddClick} />);

  setTimeout(() => {
    expect(Client.getDecks.mock.calls.length).toBe(1);
    expect(component.instance().state.deckList).toBe(deckList.deckList);
    done();
  });
});
