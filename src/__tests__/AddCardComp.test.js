import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import AddCardComp from '../components/AddCardComp';
import Client from '../components/Client';

jest.mock('../components/Client');

it('renders without crashing', () => {
  shallow(<AddCardComp deck="ABCD-1234" />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCardComp deck="ABCD-1234" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('AddCardComp renders correctly', () => {
  const tree = renderer.create(<AddCardComp deck="ABCD-1234" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not show the current card when there is no card', () => {
  const component = shallow(<AddCardComp deck="ABCD-1234" />);
  expect(component.html()).not.toContain('current card');
});

it('shows the current card when there is one', () => {
  const cardId = '12345-ABCD';
  const component = shallow(<AddCardComp deck="ABCD-1234" />);
  component.setState({ currentCard: cardId });
  component.update();

  expect(component.html()).toContain(`current card: ${cardId}`);
});

it('should set the state when createCard completes', (done) => {
  const cardId = '67890-EFGH';
  Client.createCard = jest.fn(() => Promise.resolve(cardId));

  const handleCardAdded = jest.fn(() => {});
  const component = shallow(<AddCardComp deck="ABCD-1234" onCardAdded={handleCardAdded} />);
  const button = component.find('button').at(1);
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentCard).toBe(cardId);
    expect(handleCardAdded.mock.calls.length).toBe(1);
    expect(handleCardAdded.mock.calls[0][0]).toBe(cardId);
    done();
  });
});
