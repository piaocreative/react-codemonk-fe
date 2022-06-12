import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import FooterWrapper from '../index';

describe('<Footer />', () => {
  describe('Component: FooterWrapper', () => {
    it('should render', () => {
      const component = (
        <BrowserRouter>
          <FooterWrapper />
        </BrowserRouter>
      );
      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
