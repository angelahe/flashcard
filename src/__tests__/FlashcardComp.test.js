import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FlashcardComp from '../components/FlashcardComp';

it('renders without crashing', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  shallow(<FlashcardComp />);
});

it('renders without crashing', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const div = document.createElement('div');
  ReactDOM.render(<FlashcardComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('FlashcardComp renders correctly', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const tree = renderer.create(<FlashcardComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div FlashcardComp on shallow render', () => {
  const component = shallow(<FlashcardComp />);
  expect(component.html()).toContain('FlashcardComp');
});
