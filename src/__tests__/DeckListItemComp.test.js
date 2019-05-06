import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DeckListItemComp from '../components/DeckListItemComp';

const deck = { deck_id: 'ABCD-1234' };

it('renders without crashing', () => {
  shallow(<DeckListItemComp deck={deck} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeckListItemComp deck={deck} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('DeckListItemComp renders correctly', () => {
  const tree = renderer.create(<DeckListItemComp deck={deck} />).toJSON();
  expect(tree).toMatchSnapshot();
});
