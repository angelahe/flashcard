import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import NavBarComp from '../components/AddImageComp';

it('renders without crashing', () => {
  shallow(<NavBarComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBarComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('AddCardComp renders correctly', () => {
  const tree = renderer.create(<NavBarComp />).toJSON();
  expect(tree).toMatchSnapshot();
});
