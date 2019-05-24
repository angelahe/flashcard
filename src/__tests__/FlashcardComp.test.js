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

//  handleNavClick tests
it('shows ManageDecksComp', () => {
  const component = shallow(<FlashcardComp />);
  component.instance().handleNavClick('ManageDecks');
  expect(component.instance().state.currentView).toBe('ManageDecks');
  expect(component.html()).toContain('ManageDecksComp');
});

it('shows FlashcardDecksComp', () => {
  const component = shallow(<FlashcardComp />);
  component.instance().handleNavClick('FlashcardDecks');
  expect(component.instance().state.currentView).toBe('FlashcardDecks');
  expect(component.html()).toContain('FlashcardDecksComp');
});

it('shows FlashcardChartComp', () => {
  const component = shallow(<FlashcardComp />);
  component.instance().handleNavClick('FlashcardChart');
  expect(component.instance().state.currentView).toBe('FlashcardChart');
  expect(component.html()).toContain('FlashcardChartComp');
});

it('shows FlsahcardSettingsComp', () => {
  const component = shallow(<FlashcardComp />);
  component.instance().handleNavClick('FlashcardSettings');
  expect(component.instance().state.currentView).toBe('FlashcardSettings');
  expect(component.html()).toContain('FlashcardSettingsComp');
});

it('shows FlashcardInfoComp', () => {
  const component = shallow(<FlashcardComp />);
  component.instance().handleNavClick('FlashcardInfo');
  expect(component.instance().state.currentView).toBe('FlashcardInfo');
  expect(component.html()).toContain('FlashcardInfoComp');
});

it('shows ManageDecks on unknown view', () => {
  const component = shallow(<FlashcardComp />);
  component.instance().setView('JunkView');
  expect(component.instance().state.currentView).toBe('ManageDecks');
  expect(component.html()).toContain('ManageDecksComp');
});

it('shows ManageDecks on Add click from FlashcardDecksComp', () => {
  const component = shallow(<FlashcardComp />);
  component.instance().handleNavClick('FlashcardDecks');
  component.instance().handleAddClick();
  expect(component.instance().state.currentView).toBe('ManageDecks');
  expect(component.html()).toContain('ManageDecksComp');
});

it('shows ManageDecks on Add click by default e.g. from charts', () => {
  const component = shallow(<FlashcardComp />);
  component.instance().handleNavClick('FlashcardCharts');
  component.instance().handleAddClick();
  expect(component.instance().state.currentView).toBe('ManageDecks');
  expect(component.html()).toContain('ManageDecksComp');
});
