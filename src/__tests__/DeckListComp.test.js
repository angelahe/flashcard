import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DeckListComp from '../components/DeckListComp';

it('renders without crashing', () => {
  shallow(<DeckListComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeckListComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<DeckListComp />).toJSON();
  expect(tree).toMatchSnapshot();
});
