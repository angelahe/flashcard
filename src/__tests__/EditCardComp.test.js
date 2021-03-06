import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import EditCardComp from '../components/EditCardComp';

const card = {
  card_id: 'ABCD-1234',
  deck_id: 'DECK-1234',
  L1_word: 'cat',
  L2_word: 'el gato',
  img_id: 123,
  img_url: 'xxx',
  card_order: 1,
  cardtype_id: 'abc',
};

it('renders without crashing', () => {
  shallow(<EditCardComp card={card} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditCardComp card={card} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<EditCardComp card={card} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div EditCardComp on shallow render', () => {
  const component = shallow(<EditCardComp card={card} />);
  expect(component.html()).toContain('EditCardComp');
});
