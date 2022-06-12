import React from 'react';
import renderer from 'react-test-renderer';
import 'whatwg-fetch';
import { shallow } from 'enzyme';
import { RatingComponent as MainForm } from '../RatingComponent';

jest.mock('utils/request');

const props = {
  index: 0,
  ratingItem: {
    label: 'test',
    rating: 4,
  },
  onChangeRating: jest.fn(),
};

const getWrapper = () => shallow(<MainForm {...props} />);

describe('<RatingComponent />', () => {
  it('should render and match the snapshot', () => {
    const renderedComponent = renderer.create(<MainForm />).toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});

describe('test functions', () => {
  // test('test onHover', () => {
  //   const test = getWrapper().find('[data-testid="Rating"]');
  //   test.props().onHover('test');
  //   test.props().onChange();
  // });
  test('test onHover', () => {
    props.ratingItem = {};
    const test = getWrapper().find('[data-testid="Rating"]');
    test.props().onHover();
  });
});
