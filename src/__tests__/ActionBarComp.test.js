import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ActionBarComp from '../components/ActionBarComp';

it('renders without crashing', () => {
  shallow(<ActionBarComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ActionBarComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<ActionBarComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div ActionBarComp on shallow render', () => {
  const component = shallow(<ActionBarComp />);
  expect(component.html()).toContain('ActionBarComp');
});
