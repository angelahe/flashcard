import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FlashcardPlayComp from '../components/flashcard/FlashcardPlayComp';

const decks = JSON.stringify([
  { deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939', deck_name: 'Animals' },
  { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc', deck_name: 'Birds' },
]);

it('renders without crashing', () => {
  fetch.once(decks);
  shallow(<FlashcardPlayComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.once(decks);
  ReactDOM.render(<FlashcardPlayComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  fetch.once(decks);
  const tree = renderer.create(<FlashcardPlayComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div FlashcardPlayComp on shallow render', () => {
  fetch.once(decks);
  const component = shallow(<FlashcardPlayComp />);
  expect(component.html()).toContain('FlashcardPlayComp');
});

it('calls the OnAdd handler on Add Click', () => {
  fetch.once(decks);
  const handleAddClick = jest.fn(() => {});
  const component = shallow(<FlashcardPlayComp onAdd={handleAddClick} />);
  component.instance().handleAddClick();
  expect(handleAddClick.mock.calls.length).toBe(1);
});

it('goes to SelectLevel view when select a deck', (done) => {
  fetch.once(decks);
  const handleAddClick = jest.fn(() => {});
  const component = shallow(<FlashcardPlayComp onAdd={handleAddClick} />);
  // make sure we are in the flashcard decks view
  expect(component.html()).toContain('FlashcardDecks');
  // make sure handleDeckSelect can be run
  component.instance().handleDeckSelect(decks[0]);

  setTimeout(() => {
    expect(component.instance().state.currentDeck).toBe(decks[0]);
    done();
  });
});
