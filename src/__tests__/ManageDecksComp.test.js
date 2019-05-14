import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ManageDecksComp from '../components/ManageDecksComp';

it('renders without crashing', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  shallow(<ManageDecksComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  ReactDOM.render(<ManageDecksComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('ManageDecksComp renders correctly', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const tree = renderer.create(<ManageDecksComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not show the current deck when there is no deck', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const component = shallow(<ManageDecksComp />);
  expect(component.html()).not.toContain('current deck');
});

it('shows the current deck when there is one', () => {
  const deckId = '12345-ABCD';
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));
  const component = shallow(<ManageDecksComp />);
  component.setState({ currentDeck: deckId });
  component.update();

  expect(component.html()).toContain(`current deck: ${deckId}`);
});
