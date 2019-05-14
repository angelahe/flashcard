import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import CardListItemComp from '../components/CardListItemComp';

const card = { card_id: 'ABCD-1234' };

it('renders without crashing', () => {
  shallow(<CardListItemComp card={card} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardListItemComp card={card} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<CardListItemComp card={card} />).toJSON();
  expect(tree).toMatchSnapshot();
});
