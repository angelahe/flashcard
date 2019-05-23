import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import CardListItemComp from '../components/CardListItemComp';

const card = { card_id: 'ABCD-1234' };

it('renders without crashing', () => {
  shallow(<CardListItemComp card={card} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardListItemComp card={card} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<CardListItemComp card={card} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div CardListItemComp on shallow render', () => {
  const component = shallow(<CardListItemComp card={card} />);
  expect(component.html()).toContain('CardListItemComp');
  expect(component.html()).toContain('CardListItemText');
  expect(component.html()).toContain('CardListItemEdit');
  expect(component.html()).toContain('CardListItemDelete');
});

it('click editCard button calls handler', (done) => {
  const handleCardEdit = jest.fn(() => {});
  const component = shallow(<CardListItemComp card={card} onCardEdit={handleCardEdit} />);
  const button = component.find('.CardListItemEdit').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleCardEdit.mock.calls.length).toBe(1);
    expect(handleCardEdit.mock.calls[0][0]).toBe(card.card_id);
    done();
  });
});

it('click deleteCard button calls handler', (done) => {
  const handleCardDelete = jest.fn(() => {});
  const component = shallow(<CardListItemComp card={card} onCardDelete={handleCardDelete} />);
  const button = component.find('.CardListItemDelete').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleCardDelete.mock.calls.length).toBe(1);
    expect(handleCardDelete.mock.calls[0][0]).toBe(card.card_id);
    done();
  });
});

it('click select Card text calls handler', (done) => {
  const handleCardSelect = jest.fn(() => {});
  const component = shallow(<CardListItemComp card={card} onCardSelect={handleCardSelect} />);
  const button = component.find('.CardListItemText').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleCardSelect.mock.calls.length).toBe(1);
    expect(handleCardSelect.mock.calls[0][0]).toBe(card.card_id);
    done();
  });
});
