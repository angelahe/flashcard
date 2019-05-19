import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FlashcardChartComp from '../components/FlashcardChartComp';

it('renders without crashing', () => {
  shallow(<FlashcardChartComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FlashcardChartComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<FlashcardChartComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div FlashcardChartComp on shallow render', () => {
  const component = shallow(<FlashcardChartComp />);
  expect(component.html()).toContain('FlashcardChartComp');
});
