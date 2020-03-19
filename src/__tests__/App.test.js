import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';

let hello;

it('renders without crashing', () => {
  fetch.once(JSON.stringify([{ deck_id: '76ff91c7-8c30-4226-93f2-2c295fdb9939' }, { deck_id: '1a614b6b-408a-4365-94be-2b87be6b94dc' }]));

  const div = document.createElement('div');
  ReactDOM.render(<App hello={hello} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains the container div App on shallow render', () => {
  const component = shallow(<App hello={hello} />);
  expect(component.html()).toContain('App');
  expect(component.html()).toContain('FlashcardComp');
});
