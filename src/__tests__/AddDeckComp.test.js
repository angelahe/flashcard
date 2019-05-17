import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import AddDeckComp from '../components/AddDeckComp';
import Client from '../components/Client';

jest.mock('../components/Client');

const dummyDeckAdded = () => { };

it('renders without crashing', () => {
  shallow(<AddDeckComp onDeckAdded={dummyDeckAdded} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddDeckComp onDeckAdded={dummyDeckAdded} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('AddDeckComp renders correctly', () => {
  const tree = renderer.create(<AddDeckComp onDeckAdded={dummyDeckAdded} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not show the current deck when there is no deck', () => {
  const component = shallow(<AddDeckComp onDeckAdded={dummyDeckAdded} />);
  expect(component.html()).not.toContain('current deck');
});

it('shows the current deck when there is one', () => {
  const deckId = '12345-ABCD';
  const component = shallow(<AddDeckComp onDeckAdded={dummyDeckAdded} />);
  component.setState({ currentDeck: deckId });
  component.update();
  expect(component.html()).toContain(`current deck: ${deckId}`);
});

it('should set the state when createDeck completes', (done) => {
  const deckId = '12345-ABCD';
  Client.createDeck = jest.fn(() => Promise.resolve(deckId));

  const component = shallow(<AddDeckComp onDeckAdded={dummyDeckAdded} />);
  const button = component.find('button').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentDeck).toBe(deckId);
    done();
  });
});

it('contains the container div AddDeckComp on shallow render', () => {
  const component = shallow(<AddDeckComp onDeckAdded={dummyDeckAdded} />);
  expect(component.html()).toContain('AddDeckComp');
});

it('should call the Add button click handler when clicked', (done) => {
  const deckId = '12345-ABCD';
  Client.createDeck = jest.fn(() => Promise.resolve(deckId));

  const handleDeckAdded = jest.fn(() => {});
  const component = shallow(<AddDeckComp onDeckAdded={handleDeckAdded} />);
  const button = component.find('.AddDeckButton').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentDeck).toBe(deckId);
    expect(handleDeckAdded.mock.calls.length).toBe(1);
    expect(handleDeckAdded.mock.calls[0][0]).toBe(deckId);
    done();
  });
});
