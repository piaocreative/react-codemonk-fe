import React from 'react';
import { shallow } from 'enzyme';
import { PrivateGrid } from '../index';

describe('test functions', () => {
  test('test PrivateGrid', () => {
    const getWrapper = () => shallow(<PrivateGrid />);
    expect(getWrapper().exists()).toBe(true);
  });
});
