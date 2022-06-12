import React from 'react';
import { render } from 'react-testing-library';
import ToastifyMessage from '../index';

describe('<ToastifyMessage />', () => {
  it('should render success tostify a prop', () => {
    const message = 'Success message';
    const type = 'success';
    const { container } = render(<ToastifyMessage message={message} type={type} />);
    const { childNodes } = container.querySelector('div');
    expect(childNodes).toHaveLength(2);
  });

  it('should render success tostify a prop', () => {
    const message = 'Error message';
    const type = 'error';
    const { container } = render(<ToastifyMessage message={message} type={type} />);
    const { childNodes } = container.querySelector('div');
    expect(childNodes).toHaveLength(2);
  });
});
