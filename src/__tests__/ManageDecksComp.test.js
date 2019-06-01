import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ManageDecksComp from '../components/ManageDecksComp';
import { timeout } from 'q';

const decks = JSON.stringify([
  { deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939', deck_name: 'Animals' },
  { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc', deck_name: 'Birds' },
]);

const deck = { deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939', deck_name: 'Animals' };
const card = { card_id: 'CARD-1234', deck_id: 'DECK-5678' };

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
  // mock up a deck in state before setting view
  component.instance().handleDeckEdit(deck);
  // component.instance().setView('DeckEdit');
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
  const newdeck = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(newdeck);
  component.instance().setView('CardList');
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('shows CardAdd when view set', () => {
  const newdeck = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(newdeck);
  component.instance().setView('CardAdd');
  expect(component.instance().state.currentView).toBe('CardAdd');
  expect(component.html()).toContain('AddCardComp');
});

it('shows CardEdit when view set', () => {
  const newCard = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleCardAdded(newCard);
  // mock up a card in state before setting view
  component.instance().handleCardEdit(card);
  // component.instance().setView('CardEdit');
  expect(component.instance().state.currentView).toBe('CardEdit');
  expect(component.html()).toContain('EditCardComp');
});

it('shows CardDelete when view set', () => {
  const newcard = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleCardAdded(newcard);
  component.instance().setView('CardDelete');
  expect(component.instance().state.currentView).toBe('CardDelete');
  expect(component.html()).toContain('DeleteCardComp');
});

it('shows DeckList when unknown view set', () => {
  const newcard = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleCardAdded(newcard);
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
  const newdeck = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(newdeck);
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
  const newdeck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(newdeck);
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('tests handleBackClick from CardEdit', () => {
  const newcard = 'ABCD-1234';
  const newdeck = 'DECK-1234';
  const cardobj = { card_id: 'ABCD-1234', deck_id: 'DECK-1234' };
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(newdeck);
  component.instance().handleCardAdded(newcard);
  component.instance().handleCardSelect(cardobj);
  component.instance().handleCardEdit(cardobj);
  // component.instance().setView('CardEdit');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('tests handleBackClick from CardDelete', () => {
  const newcard = 'ABCD-1234';
  const newdeck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(newdeck);
  component.instance().handleCardAdded(newcard);
  component.instance().setView('CardDelete');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('tests handleDeckAdded handler called', () => {
  const newdeck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(newdeck);
  expect(component.instance().state.currentView).toBe('CardAdd');
  expect(component.instance().state.currentDeck).toBe(newdeck);
  expect(component.html()).toContain('AddCardComp');
});

it('tests handleDeckSelect handler called', () => {
  const newdeck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(newdeck);
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.instance().state.currentDeck).toBe(newdeck);
  expect(component.html()).toContain('CardListComp');
});

it('tests handleDeckEdit handler called', (done) => {
  const newdeck = { deck_id: 'DECK-1234', deck_name: 'Animals' };
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckEdit(newdeck);

  setTimeout(() => {
    expect(component.instance().state.currentView).toBe('DeckEdit');
    expect(component.instance().state.thisDeck).toBe(newdeck);
    expect(component.html()).toContain('EditDeckComp');
    done();
  });
});

it('tests handleDeckDelete handler called', () => {
  const newdeck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckDelete(newdeck);
  expect(component.instance().state.currentView).toBe('DeckDelete');
  expect(component.instance().state.currentDeck).toBe(newdeck);
  expect(component.html()).toContain('DeleteDeckComp');
});

it('tests handleCardAdded handler called', () => {
  const newdeck = 'DECK-1234';
  const newcard = 'CARD-5678';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(newdeck);
  component.instance().handleCardAdded(newcard);
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.instance().state.currentCard).toBe(newcard);
  expect(component.html()).toContain('CardListComp');
});

it('tests handleCardSelect handler called', (done) => {
  const newdeck = 'DECK-1234';
  const cardobj = { card_id: 'CARD-5678', deck_id: 'DECK-1234' };
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(newdeck);
  component.instance().handleCardSelect(cardobj);
  setTimeout(() => {
    expect(component.instance().state.currentView).toBe('CardEdit');
    expect(component.instance().state.thisCard).toBe(cardobj);
    expect(component.html()).toContain('EditCardComp');
    done();
  });
});

it('tests handleCardEdit handler called', () => {
  const newdeck = 'DECK-1234';
  const newcard = { card_id: 'CARD-5678', deck_id: 'DECK-1234' };
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(newdeck);
  component.instance().handleCardEdit(newcard);
  expect(component.instance().state.currentView).toBe('CardEdit');
  expect(component.instance().state.thisCard).toBe(newcard);
  expect(component.html()).toContain('EditCardComp');
});

it('tests handleCardDelete handler called', () => {
  const newdeck = 'DECK-1234';
  const newcard = 'CARD-5678';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(newdeck);
  component.instance().handleCardDelete(newcard);
  expect(component.instance().state.currentView).toBe('CardDelete');
  expect(component.instance().state.currentCard).toBe(newcard);
  expect(component.html()).toContain('DeleteCardComp');
});

it('tests handleDeckEdited handler called', () => {
  const newdeck = 'DECK-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckSelect(newdeck);
  component.instance().handleDeckEdited(newdeck);
  expect(component.instance().state.currentView).toBe('DeckList');
  expect(component.instance().state.currentDeck).toBe(newdeck);
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
