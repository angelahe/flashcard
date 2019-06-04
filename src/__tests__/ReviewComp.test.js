import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ReviewComp from '../components/flashcard/ReviewComp';

it('renders without crashing', () => {
  shallow(<ReviewComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReviewComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<ReviewComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div ChooseLevelComp on shallow render', () => {
  const component = shallow(<ReviewComp />);
  expect(component.html()).toContain('ReviewComp');
});
