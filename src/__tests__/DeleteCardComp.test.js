import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DeleteCardComp from '../components/DeleteCardComp';

it('renders without crashing', () => {
  shallow(<DeleteCardComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteCardComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<DeleteCardComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div EditDeckComp on shallow render', () => {
  const component = shallow(<DeleteCardComp />);
  expect(component.html()).toContain('DeleteCardComp');
});
