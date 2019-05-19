import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DeleteDeckComp from '../components/DeleteDeckComp';

it('renders without crashing', () => {
  shallow(<DeleteDeckComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteDeckComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<DeleteDeckComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div DeleteDeckComp on shallow render', () => {
  const component = shallow(<DeleteDeckComp />);
  expect(component.html()).toContain('DeleteDeckComp');
});
