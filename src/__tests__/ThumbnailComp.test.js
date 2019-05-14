import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ThumbnailComp from '../components/ThumbnailComp';

const imageUrl = 'https://d30y9cdsu7xlg0.cloudfront.net/png/75112-200.png';
const imageId = '75112';
it('renders without crashing', () => {
  shallow(<ThumbnailComp imageUrl={imageUrl} imageId={imageId} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ThumbnailComp imageUrl={imageUrl} imageId={imageId} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot of UI renders consistently', () => {
  const tree = renderer.create(<ThumbnailComp imageUrl={imageUrl} imageId={imageId} />).toJSON();
  expect(tree).toMatchSnapshot();
});
