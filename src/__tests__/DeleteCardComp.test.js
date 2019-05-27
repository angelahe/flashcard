import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DeleteCardComp from '../components/DeleteCardComp';
import Client from '../components/Client';

const card = 'ABCD-1234';

it('renders without crashing', () => {
  shallow(<DeleteCardComp card={card} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteCardComp card={card} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<DeleteCardComp card={card} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div EditDeckComp on shallow render', () => {
  const component = shallow(<DeleteCardComp card={card} />);
  expect(component.html()).toContain('DeleteCardComp');
});

it('should set the state when deleteCard completes', (done) => {
  const message = 'Successfully deleted';
  Client.deleteCard = jest.fn(() => Promise.resolve(message));

  const handleCardDeleted = jest.fn(() => {});
  const component = shallow(<DeleteCardComp card={card} onCardDeleted={handleCardDeleted} />);
  const button = component.find('.YesDelete').first();
  button.simulate('click');

  setTimeout(() => {
    // expect(component.instance().state.errorMessage).toBe(message);
    expect(handleCardDeleted.mock.calls.length).toBe(1);
    expect(handleCardDeleted.mock.calls[0][0]).toBe('ABCD-1234');
    done();
  });
});
