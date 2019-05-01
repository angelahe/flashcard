import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import AddDeckComp from '../components/AddDeckComp';
import Client from '../components/Client';
import ManageDecksComp from '../components/ManageDecksComp';

const props = new ManageDecksComp();

jest.mock('../components/Client');

it('renders without crashing', () => {
  shallow(<AddDeckComp addDeck={props.onDeckAdded} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddDeckComp addDeck={props.onDeckAdded} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('AddDeckComp renders correctly', () => {
  const tree = renderer.create(<AddDeckComp addDeck={props.onDeckAdded} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not show the current deck when there is no deck', () => {
  const component = shallow(<AddDeckComp addDeck={props.onDeckAdded} />);
  expect(component.html()).not.toContain('current deck');
});

it('shows the current deck when there is one', () => {
  const deckId = '12345-ABCD';
  const component = shallow(<AddDeckComp addDeck={props.onDeckAdded} />);
  component.setState({ currentDeck: deckId });
  component.update();
  console.log('component html is', component.html);
  expect(component.html()).toContain(`current deck: ${deckId}`);
});

it('should set the state when createDeck completes', (done) => {
  const deckId = '12345-ABCD';
  Client.createDeck = jest.fn(() => Promise.resolve(deckId));

  const component = shallow(<AddDeckComp addDeck={props.onDeckAdded} />);
  const button = component.find('button').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentDeck).toBe(deckId);
    done();
  });
});
