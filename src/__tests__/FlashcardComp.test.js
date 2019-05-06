import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FlashcardComp from '../components/FlashcardComp';

it('renders without crashing', () => {
  shallow(<FlashcardComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FlashcardComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('FlashcardComp renders correctly', () => {
  const tree = renderer.create(<FlashcardComp />).toJSON();
  expect(tree).toMatchSnapshot();
});
