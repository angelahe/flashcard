import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';
import Client from '../components/Client';

const { hello } = window;

it('renders without crashing', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));

  // const hello = jest.fn(() => {});

  // hello.init = jest.fn(() => Promise.resolve(xxx));
  // hello.on = jest.fn(() => Promise.resolve())

  // Client.login = jest.fn(() => Promise.resolve(yyy));

  const div = document.createElement('div');
  ReactDOM.render(<App hello={hello} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains the container div App on shallow render', () => {
  const component = shallow(<App hello={hello} />);
  expect(component.html()).toContain('App');
  expect(component.html()).toContain('LoginComp');
});

it('contains FlashcardComp when user starts session', (done) => {
  const auth = {
    network: 'abc',
    authResponse:
      { id_token: 'xxx' },
  };
  const response = {
    id: 'angela12345',
    displayName: 'Angela',
  };

  Client.login = jest.fn(() => Promise.resolve(response));

  const user = { id: 'angela12345', displayName: 'Angela' };
  const component = shallow(<App hello={hello} />);
  component.instance().sessionStart(auth);
  setTimeout(() => {
    expect(component.html()).toContain('FlashcardComp');
    expect(component.instance().state.user).toBe(user);
    done();
  });
});
