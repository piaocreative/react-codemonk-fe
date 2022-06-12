import PropTypes from 'prop-types';
import React from 'react';
import failureIcon from '../../images/circle-tick.svg';
import successIcon from '../../images/circle-tick1.svg';
import { MessageWrapper } from './toastify-styles';

const ToastifyMessage = ({ message, type }) => {
  let icon = null;
  if (type) {
    if (type === 'success') {
      icon = successIcon;
    } else if (type === 'error') {
      icon = failureIcon;
    }
  }
  return (
    <MessageWrapper>
      <span className="icon">{icon ? <img src={icon} alt="Error" /> : null}</span>
      <span>{message}</span>
    </MessageWrapper>
  );
};
ToastifyMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

ToastifyMessage.defaultProps = {
  message: '',
  type: '',
};
export default ToastifyMessage;
