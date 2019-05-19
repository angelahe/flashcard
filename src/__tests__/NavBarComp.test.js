import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import NavBarComp from '../components/NavBarComp';

it('renders without crashing', () => {
  shallow(<NavBarComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBarComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('NavBarComp renders correctly', () => {
  const tree = renderer.create(<NavBarComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

// default to show ManageDecks is list
it('contains the container div NavBarComp on shallow render with decks focus as default', () => {
  const component = shallow(<NavBarComp />);
  expect(component.instance().state.currentFocus).toBe('list');
  expect(component.html()).toContain('NavBarComp');
  expect(component.html()).toContain('NavBarDecksOff');
  expect(component.html()).toContain('NavBarListOn');
  expect(component.html()).toContain('NavBarChartOff');
  expect(component.html()).toContain('NavBarSettingsOff');
  expect(component.html()).toContain('NavBarInfoOff');
});

it('contains NavBarComp and changes focus to NavBarDecks', (done) => {
  const handleNavClick = jest.fn(() => {});
  const component = shallow(<NavBarComp onNavClick={handleNavClick} />);
  const button = component.find('.NavBarDecksOff').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentFocus).toBe('decks');
    expect(component.html()).toContain('NavBarComp');
    expect(component.html()).toContain('NavBarDecksOn');
    expect(component.html()).toContain('NavBarListOff');
    expect(component.html()).toContain('NavBarChartOff');
    expect(component.html()).toContain('NavBarSettingsOff');
    expect(component.html()).toContain('NavBarInfoOff');
    expect(handleNavClick.mock.calls.length).toBe(1);
    expect(handleNavClick.mock.calls[0][0]).toBe('FlashcardDecks');
    done();
  });
});

it('contains NavBarComp and changes focus to NavBarChart', (done) => {
  const handleNavClick = jest.fn(() => {});
  const component = shallow(<NavBarComp onNavClick={handleNavClick} />);
  const button = component.find('.NavBarChartOff').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentFocus).toBe('chart');
    expect(component.html()).toContain('NavBarComp');
    expect(component.html()).toContain('NavBarDecksOff');
    expect(component.html()).toContain('NavBarListOff');
    expect(component.html()).toContain('NavBarChartOn');
    expect(component.html()).toContain('NavBarSettingsOff');
    expect(component.html()).toContain('NavBarInfoOff');
    expect(handleNavClick.mock.calls.length).toBe(1);
    expect(handleNavClick.mock.calls[0][0]).toBe('FlashcardChart');
    done();
  });
});

it('contains NavBarComp and changes focus to NavBarSettings', (done) => {
  const handleNavClick = jest.fn(() => {});
  const component = shallow(<NavBarComp onNavClick={handleNavClick} />);
  const button = component.find('.NavBarSettingsOff').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentFocus).toBe('settings');
    expect(component.html()).toContain('NavBarComp');
    expect(component.html()).toContain('NavBarDecksOff');
    expect(component.html()).toContain('NavBarListOff');
    expect(component.html()).toContain('NavBarChartOff');
    expect(component.html()).toContain('NavBarSettingsOn');
    expect(component.html()).toContain('NavBarInfoOff');
    expect(handleNavClick.mock.calls.length).toBe(1);
    expect(handleNavClick.mock.calls[0][0]).toBe('FlashcardSettings');
    done();
  });
});

it('contains NavBarComp and changes focus to NavBarInfo', (done) => {
  const handleNavClick = jest.fn(() => {});
  const component = shallow(<NavBarComp onNavClick={handleNavClick} />);
  const button = component.find('.NavBarInfoOff').first();
  button.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentFocus).toBe('info');
    expect(component.html()).toContain('NavBarComp');
    expect(component.html()).toContain('NavBarDecksOff');
    expect(component.html()).toContain('NavBarListOff');
    expect(component.html()).toContain('NavBarChartOff');
    expect(component.html()).toContain('NavBarSettingsOff');
    expect(component.html()).toContain('NavBarInfoOn');
    expect(handleNavClick.mock.calls.length).toBe(1);
    expect(handleNavClick.mock.calls[0][0]).toBe('FlashcardInfo');
    done();
  });
});

it('contains NavBarComp and changes focus to chart then NavBarDecks', (done) => {
  // first navigate away from default decks on
  const handleNavClick = jest.fn(() => {});
  const component = shallow(<NavBarComp onNavClick={handleNavClick} />);
  const button = component.find('.NavBarChartOff').first();
  button.simulate('click');
  const button2 = component.find('.NavBarListOff').first();
  button2.simulate('click');

  setTimeout(() => {
    expect(component.instance().state.currentFocus).toBe('list');
    expect(component.html()).toContain('NavBarComp');
    expect(component.html()).toContain('NavBarDecksOff');
    expect(component.html()).toContain('NavBarListOn');
    expect(component.html()).toContain('NavBarChartOff');
    expect(component.html()).toContain('NavBarSettingsOff');
    expect(component.html()).toContain('NavBarInfoOff');
    expect(handleNavClick.mock.calls.length).toBe(2);
    expect(handleNavClick.mock.calls[1][0]).toBe('ManageDecks');
    done();
  });
});
