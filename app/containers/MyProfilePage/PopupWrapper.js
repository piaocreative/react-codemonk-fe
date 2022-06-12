/**
 * PopupWrapper
 *
 * This is the code for the omnipresent PopupWrapper.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactModal from 'react-modal';
import { closeIcon } from 'containers/App/constants';
import { Button, H4 } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import messages from './messages';

export class PopupWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getButtonText = modalType => {
    let output = '';

    if (modalType === 'edit') {
      output = <FormattedMessage {...messages.saveButton} />;
    } else if (modalType === 'add') {
      output = <FormattedMessage {...messages.addButton} />;
    } else if (modalType === 'hire') {
      output = <FormattedMessage {...messages.sendReqButton} />;
    } else if (modalType === 'submit') {
      output = <FormattedMessage {...messages.submitButton} />;
    } else if (modalType === 'allocate') {
      output = <FormattedMessage {...messages.allocateButton} />;
    } else {
      output = <FormattedMessage {...messages.applyButton} />;
    }
    return output;
  };

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
      handlePicChange,
      otherActions,
      photoChange,
      ref,
      btnClass,
      onHandleDelete,
      onHandleClearFilter,
      count,
      modalType,
      modalType1,
      modalName,
      popupType = '',
      noFooter,
      onDraft,
      className,
    } = this.props;

    const buttonText = this.getButtonText(modalType);

    const changePhotoButton = (
      <div className="btn-primary btn-sm btn-outline file-uploader mb-3 mb-md-0">
        <input type="file" accept=".jpeg,.jpg,.png,.bmp" name="profilePicture" id="profilePicture" onChange={handlePicChange} />
        <span>
          <FormattedMessage {...messages.changePhotoButton} />
        </span>
      </div>
    );
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onDiscard}
        className={`modal-dialog ${className}`}
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
          <div className={`${modalName === 'csvUploaderModal' ? 'd-flex flex-column' : ''} modal-body`}>{children}</div>
          {!noFooter && (
            <div className={`${otherActions ? 'justify-content-between flex-column flex-md-row' : 'justify-content-end'} modal-footer`}>
              {photoChange ? changePhotoButton : ''}
              {onHandleDelete && (count.length > 1 || popupType === 'certificate') ? (
                <Button className="btn-sm btn-outline" type="button" onClick={onHandleDelete}>
                  <FormattedMessage {...messages.deleteButton} />
                </Button>
              ) : (
                ''
              )}
              {modalType === 'filter' && (
                <Button className="btn-sm btn-link" type="button" onClick={onHandleClearFilter}>
                  <FormattedMessage {...messages.btnClearFilter} />
                </Button>
              )}
              <div className="ms-auto">
                {modalType1 !== 'draft' ? (
                  <Button className="btn-link me-4 h-auto" type="button" onClick={onDiscard}>
                    <FormattedMessage {...messages.cancelButton} />
                  </Button>
                ) : (
                  <Button className="btn-link me-4 h-auto" type="button" onClick={onDraft} disabled={disabled}>
                    <FormattedMessage {...messages.saveDraftButton} />
                  </Button>
                )}
                <Button
                  type="submit"
                  className={`${btnClass ? 'loading' : ''} ${getBtnClass(loading, responseSuccess, responseError)} btn-sm`}
                  disabled={disabled}
                  onClick={onHandleSubmit}
                  ref={ref}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </ReactModal>
    );
  }
}
PopupWrapper.defaultProps = defaultProps;
PopupWrapper.propTypes = propTypes;

export default PopupWrapper;
