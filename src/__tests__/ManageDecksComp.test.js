import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ManageDecksComp from '../components/ManageDecksComp';

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
});

it('shows AddDeck dialog when add button clicked from Decklist', () => {
  const component = shallow(<ManageDecksComp />);
  const handleAddClick = jest.fn(() => {});
  const button = component.find('.Add');
});
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