import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DeleteDeckComp from '../components/DeleteDeckComp';
import Client from '../components/Client';

const deck = 'ABCD-1234';

it('renders without crashing', () => {
  shallow(<DeleteDeckComp deck={deck} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteDeckComp deck={deck} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<DeleteDeckComp deck={deck} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div DeleteDeckComp on shallow render', () => {
  const component = shallow(<DeleteDeckComp deck={deck} />);
  expect(component.html()).toContain('DeleteDeckComp');
  expect(component.html()).toContain('YesDelete');
});

it('should set the state when deleteDeck completes', (done) => {
  const message = 'Successfully deleted';
  Client.deleteDeck = jest.fn(() => Promise.resolve(message));

  const handleDeckDeleted = jest.fn(() => {});
  const component = shallow(<DeleteDeckComp deck="ABCD-1234" onDeckDeleted={handleDeckDeleted} />);
  const button = component.find('.YesDelete').first();
  button.simulate('click');

  setTimeout(() => {
    // expect(component.instance().state.errorMessage).toBe(message);
    expect(handleDeckDeleted.mock.calls.length).toBe(1);
    expect(handleDeckDeleted.mock.calls[0][0]).toBe('ABCD-1234');
    done();
  });
});
