import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import AddImageComp from '../components/AddImageComp';
import NounProject from '../components/NounProject';
import searchresults from '../testdata/testsearchresults';

it('renders without crashing', () => {
  shallow(<AddImageComp />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddImageComp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('AddCardComp renders correctly', () => {
  const tree = renderer.create(<AddImageComp />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('contains the container div AddImageComp on shallow render', () => {
  const component = shallow(<AddImageComp />);
  expect(component.html()).toContain('AddImageComp');
  expect(component.html()).toContain('SearchTerm');
  expect(component.html()).toContain('SearchBtn');
  expect(component.html()).toContain('ImagePreview');
  expect(component.html()).toContain('DoneBtn');
  expect(component.html()).toContain('Thumbnails');
});

it('should simulate a change to SearchTerm input field', (done) => {
  const component = shallow(<AddImageComp />);
  const searchTerm = component.find('.SearchTerm').first();
  searchTerm.simulate('change', { target: { value: 'cat' } });
  setTimeout(() => {
    expect(component.instance().state.term).toBe('cat');
    done();
  });
});

it('should simulate a click on search button', (done) => {
  const handleImageAdded = jest.fn(() => {});
  const results = searchresults.searchresults;
  NounProject.getImages = jest.fn(() => Promise.resolve(results));

  const component = shallow(<AddImageComp onImageAdded={handleImageAdded} />);
  const searchTerm = component.find('.SearchTerm').first();
  searchTerm.simulate('change', { target: { value: 'cat' } });
  const button = component.find('.SearchBtn').first();
  button.simulate('click');
  setTimeout(() => {
    expect(component.instance().state.imagesList).toBe(results);
    done();
  });
});

it('should simulate a click on Done button', (done) => {
  const currentImageUrl = 'https://d30y9cdsu7xlg0.cloudfront.net/png/77680-200.png';
  const currentImageId = '77680';
  const handleImageAdded = jest.fn(() => {});
  const component = shallow(<AddImageComp onImageAdded={handleImageAdded} />);
  const button = component.find('.DoneBtn').first();
  button.simulate('click');

  setTimeout(() => {
    expect(handleImageAdded.mock.calls.length).toBe(1);
    expect(handleImageAdded.mock.calls[0][0]).toBe(currentImageUrl);
    expect(handleImageAdded.mock.calls[0][1]).toBe(currentImageId);
    done();
  });
});
