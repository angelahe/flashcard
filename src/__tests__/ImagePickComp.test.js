import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ImagePickComp from '../components/ImagePickComp';

it('renders without crashing', () => {
  shallow(<ImagePickComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImagePickComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('ImagePickComp renders correctly', () => {
  const tree = renderer.create(<ImagePickComp />).toJSON();
  expect(tree).toMatchSnapshot();
});
