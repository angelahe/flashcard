import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DeckListItemComp from '../components/DeckListItemComp';

const deck = { deck_id: 'ABCD-1234', deck_name: 'Animals' };

it('renders without crashing', () => {
  shallow(<DeckListItemComp deck={deck} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeckListItemComp deck={deck} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('DeckListItemComp renders correctly', () => {
  const tree = renderer.create(<DeckListItemComp deck={deck} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div DeckListItemComp on shallow render', () => {
  const component = shallow(<DeckListItemComp deck={deck} />);
  expect(component.html()).toContain('DeckListItemComp');
  expect(component.html()).toContain('DeckListItemText');
  expect(component.html()).toContain('DeckListItemEdit');
  expect(component.html()).toContain('DeckListItemDelete');
  expect(component.html()).toContain('Animals');
});

it('click editDeck calls handler', (done) => {
  const handleDeckEdit = jest.fn(() => {});
  const component = shallow(<DeckListItemComp deck={deck} onDeckEdit={handleDeckEdit} />);
  const button = component.find('.DeckListItemEdit').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleDeckEdit.mock.calls.length).toBe(1);
    expect(handleDeckEdit.mock.calls[0][0]).toBe(deck);
    done();
  });
});

it('click deleteDeck calls handler', (done) => {
  const handleDeckDelete = jest.fn(() => {});
  const component = shallow(<DeckListItemComp deck={deck} onDeckDelete={handleDeckDelete} />);
  const button = component.find('.DeckListItemDelete').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleDeckDelete.mock.calls.length).toBe(1);
    expect(handleDeckDelete.mock.calls[0][0]).toBe(deck.deck_id);
    done();
  });
});

it('click selectDeck calls handler', (done) => {
  const handleDeckSelect = jest.fn(() => {});
  const component = shallow(<DeckListItemComp deck={deck} onDeckSelect={handleDeckSelect} />);
  const button = component.find('.DeckListItemText').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleDeckSelect.mock.calls.length).toBe(1);
    expect(handleDeckSelect.mock.calls[0][0]).toBe(deck.deck_id);
    done();
  });
});
