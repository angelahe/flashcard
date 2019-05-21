import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ActionBarComp from '../components/ActionBarComp';

it('renders without crashing', () => {
  shallow(<ActionBarComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ActionBarComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<ActionBarComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div ActionBarComp on shallow render', () => {
  const component = shallow(<ActionBarComp />);
  expect(component.html()).toContain('ActionBarComp');
  expect(component.html()).toContain('AppLogo');
  expect(component.html()).toContain('AddBtn');
  expect(component.html()).toContain('BackBtn');
  expect(component.html()).toContain('HeaderText');
});

it('does not have add button if showAdd is false', () => {
  const handleAddClick = jest.fn(() => {});
  const handleBackClick = jest.fn(() => {});
  const component = shallow(<ActionBarComp
    showAdd={false}
    headerText="Header"
    onAdd={handleAddClick}
    onBack={handleBackClick}
  />);
  expect(component.html()).not.toContain('AddBtn');
});

it('calls addHandler on add click', (done) => {
  const handleAddClick = jest.fn(() => {});
  const handleBackClick = jest.fn(() => {});
  const component = shallow(<ActionBarComp
    showAdd
    headerText="Header"
    onAdd={handleAddClick}
    onBack={handleBackClick}
  />);
  const button = component.find('.AddBtn').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleAddClick.mock.calls.length).toBe(1);
    done();
  });
});

it('calls backHandler on back click', (done) => {
  const handleAddClick = jest.fn(() => {});
  const handleBackClick = jest.fn(() => {});
  const component = shallow(<ActionBarComp
    showAdd={false}
    headerText="Header"
    onAdd={handleAddClick}
    onBack={handleBackClick}
  />);
  const button = component.find('.BackBtn').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleBackClick.mock.calls.length).toBe(1);
    done();
  });
});
