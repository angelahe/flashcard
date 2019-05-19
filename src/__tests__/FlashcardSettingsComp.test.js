import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FlashcardSettingsComp from '../components/FlashcardSettingsComp';

it('renders without crashing', () => {
  shallow(<FlashcardSettingsComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FlashcardSettingsComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<FlashcardSettingsComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div FlashcardSettingsComp on shallow render', () => {
  const component = shallow(<FlashcardSettingsComp />);
  expect(component.html()).toContain('FlashcardSettingsComp');
});
