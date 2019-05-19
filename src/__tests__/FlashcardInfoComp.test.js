import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FlashcardInfoComp from '../components/FlashcardInfoComp';

it('renders without crashing', () => {
  shallow(<FlashcardInfoComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FlashcardInfoComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<FlashcardInfoComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div FlashcardInfoComp on shallow render', () => {
  const component = shallow(<FlashcardInfoComp />);
  expect(component.html()).toContain('FlashcardInfoComp');
});
