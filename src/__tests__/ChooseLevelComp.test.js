import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ChooseLevelComp from '../components/flashcard/ChooseLevelComp';

it('renders without crashing', () => {
  shallow(<ChooseLevelComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChooseLevelComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<ChooseLevelComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div ChooseLevelComp on shallow render', () => {
  const component = shallow(<ChooseLevelComp />);
  expect(component.html()).toContain('ChooseLevelComp');
});

it('calls onLevelPicked on Review click', (done) => {
  const handleReviewClick = jest.fn(() => {});
  const component = shallow(<ChooseLevelComp
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
  const component = shallow(<ChooseLevelComp
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
  const component = shallow(<ChooseLevelComp
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
