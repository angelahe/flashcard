import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import AddDeckCardComp from '../components/AddDeckCardComp';
import Client from '../components/Client';

jest.mock('../components/Client');

it('renders without crashing', () => {
  shallow(<AddDeckCardComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddDeckCardComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('does not show the current deck when there is no deck', () => {
  const component = shallow(<AddDeckCardComp />);
  expect(component.html()).not.toContain('current deck');
});

it('shows the current deck when there is one', () => {
  const deckId = '12345-ABCD';
  const component = shallow(<AddDeckCardComp />);
  component.setState({ currentDeck: deckId });
  component.update();

  expect(component.html()).toContain(`current deck: ${deckId}`);
});

it('should set the state when createDeck completes', (done) => {
  const deckId = '12345-ABCD';
  Client.createDeck = jest.fn(() => Promise.resolve(deckId));

  const component = shallow(<AddDeckCardComp />);
  const button = component.find('button').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentDeck).toBe(deckId);
    done();
  });
});

it('does not show the current card when there is no card', () => {
  const component = shallow(<AddDeckCardComp />);
  expect(component.html()).not.toContain('current card');
});

it('shows the current card when there is one', () => {
  const cardId = '12345-ABCD';
  const component = shallow(<AddDeckCardComp />);
  component.setState({ currentCard: cardId });
  component.update();

  expect(component.html()).toContain(`current card: ${cardId}`);
});

it('should set the state when createCard completes', (done) => {
  const cardId = '12345-ABCD';
  Client.createCard = jest.fn(() => Promise.resolve(cardId));

  const component = shallow(<AddDeckCardComp />);
  const button = component.find('button').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentCard).toBe(cardId);
    done();
  });
});