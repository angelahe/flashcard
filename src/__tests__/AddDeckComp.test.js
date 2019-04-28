import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import AddDeckComp from '../AddDeckComp';
import Client from '../Client';

jest.mock('../Client');

it('renders without crashing', () => {
  shallow(<AddDeckComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddDeckComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('does not show the current deck when there is no deck', () => {
  const component = shallow(<AddDeckComp />);
  expect(component.html()).not.toContain('current deck');
});

it('shows the current deck when there is one', () => {
  const deckId = '12345-ABCD';
  const component = shallow(<AddDeckComp />);
  component.setState({ currentDeck: deckId });
  component.update();

  expect(component.html()).toContain(`current deck: ${deckId}`);
});

it('should set the state when createDeck completes', (done) => {
  const deckId = '12345-ABCD';
  Client.createDeck = jest.fn(() => Promise.resolve(deckId));

  const component = shallow(<AddDeckComp />);
  const button = component.find('button').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentDeck).toBe(deckId);
    done();
  });
});
