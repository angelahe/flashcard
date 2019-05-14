import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import CardListComp from '../components/CardListComp';

const deck = { deck_id: 'ABCD-1234' };

it('renders without crashing', () => {
  shallow(<CardListComp deck={deck} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardListComp deck={deck} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<CardListComp deck={deck} />).toJSON();
  expect(tree).toMatchSnapshot();
});
