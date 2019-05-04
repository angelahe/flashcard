import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import AddImageComp from '../components/AddImageComp';

it('renders without crashing', () => {
  shallow(<AddImageComp card="ABCD-1234" />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddImageComp card="ABCD-1234" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('AddCardComp renders correctly', () => {
  const tree = renderer.create(<AddImageComp card="ABCD-1234" />).toJSON();
  expect(tree).toMatchSnapshot();
});
