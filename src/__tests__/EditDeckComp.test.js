import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import EditDeckComp from '../components/EditDeckComp';

const deck = {
  deck_id: 'ABCD-1234',
  deck_name: 'Animals',
  deck_key: 'aaa',
  deck_order: 1,
};

it('renders without crashing', () => {
  shallow(<EditDeckComp deck={deck} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditDeckComp deck={deck} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<EditDeckComp deck={deck} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div EditDeckComp on shallow render', () => {
  const component = shallow(<EditDeckComp deck={deck} />);
  expect(component.html()).toContain('EditDeckComp');
});
