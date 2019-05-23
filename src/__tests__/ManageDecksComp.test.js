import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ManageDecksComp from '../components/ManageDecksComp';
import { doesNotReject } from 'assert';

it('renders without crashing', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  shallow(<ManageDecksComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  ReactDOM.render(<ManageDecksComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('ManageDecksComp renders correctly', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const tree = renderer.create(<ManageDecksComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not show the current deck when there is no deck', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const component = shallow(<ManageDecksComp />);
  expect(component.html()).not.toContain('current deck');
});

it('shows the current deck in the DeckList UI when there is one', () => {
  const deckId = '12345-ABCD';
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const component = shallow(<ManageDecksComp />);
  component.setState({ currentDeck: deckId });
  component.update();

  expect(component.html()).toContain(`current deck: ${deckId}`);
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
  const deck = 'ABCD-1234';
  const component = shallow(<ManageDecksComp />);
  component.instance().handleDeckAdded(deck);
  component.instance().setView('CardDelete');
  expect(component.instance().state.currentView).toBe('CardDelete');
  expect(component.html()).toContain('DeleteCardComp');
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
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('CardAdd');
  component.instance().handleBackClick();
  expect(component.instance().state.currentView).toBe('CardList');
  expect(component.html()).toContain('CardListComp');
});

it('tests handleBackClick from CardEdit', () => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('CardEdit');
  component.instance().handleBackClick();
  setTimeout(() => {
    expect(component.instance().state.currentView).toBe('CardList');
    expect(component.html()).toContain('CardListComp');
  });
});

it('tests handleBackClick from CardDelete', (done) => {
  const component = shallow(<ManageDecksComp />);
  component.instance().setView('CardDelete');
  component.instance().handleBackClick();
  setTimeout(() => {
    expect(component.instance().state.currentView).toBe('CardList');
    expect(component.html()).toContain('CardListComp');
    done();
  });
});
//should change headerText to Add Deck
//should find AddCard component
//};

//it('tests handleAddClick from CardList', () => {
//setup: click add deck, 
//should change headerText to Add Card
//should find AddCard component
//
//});

//it('tests handleBackClick from  )
/*
it('shows the AddDeck UI when currentView is AddDeck', (done) => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const component = shallow(<ManageDecksComp />);
  component.findWhere(n => n.type() === 'button' && n.contains('Add'));
  const button = component.find('button').first();
  console.log('1st button is', component);
  button.simulate('click');
  // component.setState({ currentView: 'AddDeck' });
  // component.update();

  setTimeout(() => {
    expect(component.instance().state.currentView).toBe('AddDeck');
    done();
  });

  //  component.setState({ currentView: 'AddDeck' });
  component.update();
  expect(component.html()).toContain('Add Deck');
  const container = component.find('button');
  expect(container.length).toBe(1);
  console.log('component is', component);
  expect(component.html()).toContain('Add Deck');
  expect(component.find('.HeaderText').text()).toBe('Add Deck');
});
*/
// const deckId = '12345-ABCD';
//  Client.createDeck = jest.fn(() => Promise.resolve(deckId));

//  const component = shallow(<AddDeckComp onDeckAdded={dummyDeckAdded} />);
//  const button = component.find('button').first();
//  button.simulate('click');

//  setTimeout(() => {
//    expect(component.instance().state.currentDeck).toBe(deckId);
//    done();
//  });