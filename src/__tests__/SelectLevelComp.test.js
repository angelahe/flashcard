import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import SelectLevelComp from '../components/flashcard/SelectLevelComp';

it('renders without crashing', () => {
  shallow(<SelectLevelComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectLevelComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<SelectLevelComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div ChooseLevelComp on shallow render', () => {
  const component = shallow(<SelectLevelComp />);
  expect(component.html()).toContain('ChooseLevelComp');
});

it('calls onLevelPicked on Review click', (done) => {
  const handleReviewClick = jest.fn(() => {});
  const component = shallow(<SelectLevelComp
    onLevelSelect={handleReviewClick}
  />);
  const button = component.find('.ReviewBtn').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleReviewClick.mock.calls.length).toBe(1);
    expect(handleReviewClick.mock.calls[0][0]).toBe('Review');
    done();
  });
});

it('calls onLevelPicked on Recognize click', (done) => {
  const handleRecognizeClick = jest.fn(() => {});
  const component = shallow(<SelectLevelComp
    onLevelSelect={handleRecognizeClick}
  />);
  const button = component.find('.RecognizeBtn').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleRecognizeClick.mock.calls.length).toBe(1);
    expect(handleRecognizeClick.mock.calls[0][0]).toBe('Recognize');
    done();
  });
});

it('calls onLevelPicked on Produce click', (done) => {
  const handleProduceClick = jest.fn(() => {});
  const component = shallow(<SelectLevelComp
    onLevelSelect={handleProduceClick}
  />);
  const button = component.find('.ProduceBtn').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleProduceClick.mock.calls.length).toBe(1);
    expect(handleProduceClick.mock.calls[0][0]).toBe('Produce');
    done();
  });
});
