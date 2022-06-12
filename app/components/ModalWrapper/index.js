/**
 * ModalWrapper
 *
 * This is the code for the omnipresent ModalWrapper.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { closeIcon } from 'containers/App/constants';
import { Button, H4 } from 'components';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';

export class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      disabled,
      isOpen,
      children,
      onHandleSubmit,
      onDiscard,
      title,
      loading,
      responseSuccess,
      responseError,
      primaryBtnText,
      modalClassName,
      modalBodyClass,
    } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onDiscard}
        className={`modal-dialog ${modalClassName}`}
        style={{ overlay: { zIndex: 12 } }}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        ariaModal
      >
        <div className="modal-content">
          <div className="modal-header">
            <H4 className="modal-title newH4 d-flex align-items-center my-0">{title}</H4>
            <button type="button" className="modal-dismiss" onClick={onDiscard}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <div className={`modal-body ${modalBodyClass}`}>{children}</div>
          <div className="modal-footer">
            <div className="ms-auto">
              <Button
                type="submit"
                className={`${getBtnClass(loading, responseSuccess, responseError)} btn-sm`}
                disabled={disabled}
                onClick={onHandleSubmit}
              >
                {primaryBtnText}
              </Button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

ModalWrapper.defaultProps = {
  disabled: false,
  isOpen: false,
  children: {},
  onHandleSubmit: () => {},
  onDiscard: () => {},
  title: '',
  loading: false,
  responseSuccess: false,
  responseError: false,
  primaryBtnText: '',
  modalClassName: '',
  modalBodyClass: '',
};

ModalWrapper.propTypes = {
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  children: PropTypes.object,
  onHandleSubmit: PropTypes.func,
  onDiscard: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  primaryBtnText: PropTypes.string,
  modalClassName: PropTypes.string,
  modalBodyClass: PropTypes.string,
};

export default ModalWrapper;
