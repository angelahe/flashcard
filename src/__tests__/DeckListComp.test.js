import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DeckListComp from '../components/DeckListComp';
import Client from '../components/Client';
import deckList from '../testdata/testdecklist';

it('renders without crashing', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  shallow(<DeckListComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  ReactDOM.render(<DeckListComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const tree = renderer.create(<DeckListComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div DeckListComp on shallow render', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const component = shallow(<DeckListComp />);
  expect(component.html()).toContain('DeckListComp');
});

it('shows decks loaded', (done) => {
  Client.getDecks = jest.fn(() => Promise.resolve(deckList.deckList));
  const component = shallow(<DeckListComp />);

  setTimeout(() => {
    expect(Client.getDecks.mock.calls.length).toBe(1);
    expect(component.instance().state.deckList).toBe(deckList.deckList);
    done();
  });
});

it('handles a child select event', () => {
  const deck = { deck_id: 'ABCD-1234' };
  Client.getDecks = jest.fn(() => Promise.resolve(deckList.deckList));

  const handleDeckSelect = jest.fn(() => {});
  const component = shallow(<DeckListComp onDeckSelect={handleDeckSelect} />); 
  component.instance().handleDeckSelect(deck);
  expect(handleDeckSelect.mock.calls.length).toBe(1);
  expect(handleDeckSelect.mock.calls[0][0]).toBe(deck);
});

it('handles a child edit event', () => {
  const deck = { deck_id: 'ABCD-1234' };
  Client.getDecks = jest.fn(() => Promise.resolve(deckList.deckList));

  const handleDeckEdit = jest.fn(() => {});
  const component = shallow(<DeckListComp onDeckEdit={handleDeckEdit} />); 
  component.instance().handleDeckEdit(deck);
  expect(handleDeckEdit.mock.calls.length).toBe(1);
  expect(handleDeckEdit.mock.calls[0][0]).toBe(deck);
});

it('handles a child delete event', () => {
  const deck = { deck_id: 'ABCD-1234' };
  Client.getDecks = jest.fn(() => Promise.resolve(deckList.deckList));

  const handleDeckDelete = jest.fn(() => {});
  const component = shallow(<DeckListComp onDeckDelete={handleDeckDelete} />); 
  component.instance().handleDeckDelete(deck);
  expect(handleDeckDelete.mock.calls.length).toBe(1);
  expect(handleDeckDelete.mock.calls[0][0]).toBe(deck);
});
