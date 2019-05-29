import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ManageDecksComp from '../components/ManageDecksComp';

const decks = JSON.stringify([
  { deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939', deck_name: 'Animals' },
  { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc', deck_name: 'Birds' },
]);

it('renders without crashing', () => {
  fetch.once(decks);
  shallow(<ManageDecksComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.once(decks);
  ReactDOM.render(<ManageDecksComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('ManageDecksComp renders correctly', () => {
  fetch.once(decks);
  const tree = renderer.create(<ManageDecksComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not show the current deck when there is no deck', () => {
  fetch.once(decks);
  const component = shallow(<ManageDecksComp />);
  expect(component.html()).not.toContain('current deck');
});

it('shows the current deck in the DeckList UI when there is one', () => {
  const deckId = '12345-ABCD';
  fetch.once(decks);
  const component = shallow(<ManageDecksComp />);
  component.setState({ currentDeck: deckId });
  component.update();

  expect(component.instance().state.currentDeck).toBe(deckId);
  expect(component.html()).toContain('DeckListComp');
  expect(component.html()).toContain('Decks');
});

it('contains the container div ManageDecksComp on shallow render', () => {
  const component = shallow(<ManageDecksComp />);
  expect(component.html()).toContain('ManageDecksComp');
  expect(component.html()).toContain('DeckList');
});

it('shows DeckAdd when view set', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckAdd');
  expect(component.instance().state.currentView).toBe('DeckAdd');
  expect(component.html()).toContain('AddDeckComp');
});

it('shows DeckList when view set', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckList');
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.html()).toContain('DeckListComp');
});

it('shows DeckEdit when view set', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckEdit');
  expect(component.instance().state.currentView).toBe('DeckEdit');
  expect(component.html()).toContain('EditDeckComp');
});

it('shows DeckDelete when view set', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckDelete');
  expect(component.instance().state.currentView).toBe('DeckDelete');
  expect(component.html()).toContain('DeleteDeckComp');
});

it('shows CardList when view set', () => {
  const deck = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(deck);
  component.instance().setView('CardList');
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('shows CardAdd when view set', () => {
  const deck = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(deck);
  component.instance().setView('CardAdd');
  expect(component.instance().state.currentView).toBe('CardAdd');
  expect(component.html()).toContain('AddCardComp');
});

it('shows CardEdit when view set', () => {
  const card = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleCardAdded(card);
  component.instance().setView('CardEdit');
  expect(component.instance().state.currentView).toBe('CardEdit');
  expect(component.html()).toContain('EditCardComp');
});

it('shows CardDelete when view set', () => {
  const card = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleCardAdded(card);
  component.instance().setView('CardDelete');
  expect(component.instance().state.currentView).toBe('CardDelete');
  expect(component.html()).toContain('DeleteCardComp');
});

it('shows DeckList when unknown view set', () => {
  const card = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleCardAdded(card);
  component.instance().setView('JunkView');
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.html()).toContain('DeckListComp');
});

it('tests handleAddClick from DeckList', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckList');
  component.instance().handleAddClick();
  expect(component.instance().state.currentView).toBe('DeckAdd');
  expect(component.html()).toContain('AddDeckComp');
});

it('tests handleAddClick from CardList', () => {
  const deck = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(deck);
  component.instance().setView('CardList');
  component.instance().handleAddClick();
  expect(component.instance().state.currentView).toBe('CardAdd');
  expect(component.html()).toContain('AddCardComp');
});

it('tests handleBackClick from DeckList', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckList');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.html()).toContain('DeckListComp');
});

it('tests handleBackClick from DeckAdd', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckAdd');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.html()).toContain('DeckListComp');
});

it('tests handleBackClick from DeckDelete', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckDelete');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.html()).toContain('DeckListComp');
});

it('tests handleBackClick from DeckEdit', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('DeckEdit');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.html()).toContain('DeckListComp');
});

it('tests handleBackClick from CardList', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('CardList');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.html()).toContain('DeckListComp');
});

it('tests handleBackClick from CardAdd', () => {
  const deck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(deck);
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('tests handleBackClick from CardEdit', () => {
  const card = 'ABCD-1234';
  const deck = 'DECK-1234';
  const cardobj = { card_id: 'ABCD-1234', deck_id: 'DECK-1234' };
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(deck);
  component.instance().handleCardAdded(card);
  component.instance().handleCardSelect(cardobj);
  component.instance().setView('CardEdit');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('tests handleBackClick from CardDelete', () => {
  const card = 'ABCD-1234';
  const deck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(deck);
  component.instance().handleCardAdded(card);
  component.instance().setView('CardDelete');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('tests handleDeckAdded handler called', () => {
  const deck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(deck);
  expect(component.instance().state.currentView).toBe('CardAdd');
  expect(component.instance().state.currentDeck).toBe(deck);
  expect(component.html()).toContain('AddCardComp');
});

it('tests handleDeckSelect handler called', () => {
  const deck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.instance().state.currentDeck).toBe(deck);
  expect(component.html()).toContain('CardListComp');
});

it('tests handleDeckEdit handler called', () => {
  const deck = { deck_id: 'DECK-1234', deck_name: 'Animals' };
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckEdit(deck);
  expect(component.instance().state.currentView).toBe('DeckEdit');
  expect(component.instance().state.thisDeck).toBe(deck);
  expect(component.html()).toContain('EditDeckComp');
});

it('tests handleDeckDelete handler called', () => {
  const deck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckDelete(deck);
  expect(component.instance().state.currentView).toBe('DeckDelete');
  expect(component.instance().state.currentDeck).toBe(deck);
  expect(component.html()).toContain('DeleteDeckComp');
});

it('tests handleCardAdded handler called', () => {
  const deck = 'DECK-1234';
  const card = 'CARD-5678';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  component.instance().handleCardAdded(card);
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.instance().state.currentCard).toBe(card);
  expect(component.html()).toContain('CardListComp');
});

it('tests handleCardSelect handler called', () => {
  const deck = 'DECK-1234';
  const cardobj = { card_id: 'CARD-5678', deck_id: 'DECK-1234' };
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  component.instance().handleCardSelect(cardobj);
  expect(component.instance().state.currentView).toBe('CardEdit');
  expect(component.instance().state.thisCard).toBe(cardobj);
  expect(component.html()).toContain('EditCardComp');
});

it('tests handleCardEdit handler called', () => {
  const deck = 'DECK-1234';
  const card = { card_id: 'CARD-5678', deck_id: 'DECK-1234' };
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  component.instance().handleCardEdit(card);
  expect(component.instance().state.currentView).toBe('CardEdit');
  expect(component.instance().state.thisCard).toBe(card);
  expect(component.html()).toContain('EditCardComp');
});

it('tests handleCardDelete handler called', () => {
  const deck = 'DECK-1234';
  const card = 'CARD-5678';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  component.instance().handleCardDelete(card);
  expect(component.instance().state.currentView).toBe('CardDelete');
  expect(component.instance().state.currentCard).toBe(card);
  expect(component.html()).toContain('DeleteCardComp');
});

it('tests handleDeckEdited handler called', () => {
  const deck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  component.instance().handleDeckEdited(deck);
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.instance().state.currentDeck).toBe(deck);
  expect(component.html()).toContain('DeckListComp');
});

it('tests handleDeckDeleted handler called', () => {
  const deck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  component.instance().handleDeckDeleted(deck);
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.instance().state.currentDeck).not.toBe(deck);
  expect(component.instance().state.currentDeck).toBe('');
  expect(component.html()).toContain('DeckListComp');
});

it('tests handleCardEdited handler called', () => {
  const deck = 'DECK-1234';
  const card = 'CARD-5678';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  component.instance().handleCardSelect(card);
  component.instance().handleCardEdited(card);
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.instance().state.currentCard).toBe(card);
  expect(component.html()).toContain('CardListComp');
});

it('tests handleCardDeleted handler called', () => {
  const deck = 'DECK-1234';
  const card = 'CARD-5678';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(deck);
  component.instance().handleCardSelect(card);
  component.instance().handleCardDeleted();
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.instance().state.currentCard).not.toBe(card);
  expect(component.instance().state.currentCard).toBe('');
  expect(component.html()).toContain('CardListComp');
});
