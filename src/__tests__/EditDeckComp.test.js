import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import EditDeckComp from '../components/EditDeckComp';

it('renders without crashing', () => {
  shallow(<EditDeckComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditDeckComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<EditDeckComp />).toJSON();
  expect(tree).toMatchSnapshot();
});
