import React from 'react';
import { render } from 'react-testing-library';

import ButtonMod from '../index';

describe('<ButtonMod />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<ButtonMod id={id} />);
    expect(container.querySelector('button').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<ButtonMod>{children}</ButtonMod>);
    const { childNodes } = container.querySelector('button');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
