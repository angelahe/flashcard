import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FlashcardDecksComp from '../components/FlashcardDecksComp';

it('renders without crashing', () => {
  shallow(<FlashcardDecksComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FlashcardDecksComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<FlashcardDecksComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div FlashcardDecksComp on shallow render', () => {
  const component = shallow(<FlashcardDecksComp />);
  expect(component.html()).toContain('FlashcardDecksComp');
});
