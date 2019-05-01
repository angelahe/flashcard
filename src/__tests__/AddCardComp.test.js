import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import AddCardComp from '../components/AddDeckComp';
import Client from '../components/Client';

jest.mock('../components/Client');

it('renders without crashing', () => {
  shallow(<AddCardComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCardComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('AddCardComp renders correctly', () => {
  const tree = renderer.create(<AddCardComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not show the current card when there is no card', () => {
  const component = shallow(<AddCardComp />);
  expect(component.html()).not.toContain('current card');
});

it('shows the current card when there is one', () => {
  const cardId = '12345-ABCD';
  const component = shallow(<AddCardComp />);
  component.setState({ currentCard: cardId });
  component.update();

  expect(component.html()).toContain(`current card: ${cardId}`);
});

it('should set the state when createCard completes', (done) => {
  const cardId = '67890-EFGH';
  Client.createCard = jest.fn(() => Promise.resolve(cardId));

  const component = shallow(<AddCardComp />);
  const button = component.find('button').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentCard).toBe(cardId);
    done();
  });
});
