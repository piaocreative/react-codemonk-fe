/* eslint-disable arrow-body-style,react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import { Button } from 'components';
import { closeIcon } from 'containers/App/constants';
import ReactModal from 'react-modal';

export const Dialog = ({ show, proceed, confirmation, options }) => {
  return (
    <ReactModal
      isOpen={show}
      contentLabel="confirm"
      className={`modal-dialog ${options.className}`}
      style={{ overlay: { zIndex: 12 } }}
      ariaHideApp={false}
      ariaModal
    >
      <div className="modal-content" id="modal-confirm">
        {options.displayHeader && (
          <div className="modal-header">
            <h3 className="modal-title d-flex align-items-center my-0">{confirmation}</h3>
            <button type="button" className="modal-dismiss" onClick={() => proceed(true)}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
        )}
        <div className="modal-body">
          <p className={!options.moreContent && 'mb-0'}>{options.subTitle}</p>
          {options.moreContent && <p className="mb-0">{options.moreContent}</p>}
        </div>
        <div className="modal-footer justify-content-end">
          {options.buttons.ok ? (
            <Button type="button" className="btn btn-link me-3" onClick={() => proceed(false)}>
              {options.buttons.ok}
            </Button>
          ) : (
            ''
          )}
          {options.buttons.discard ? (
            <Button type="button" className="btn btn-primary btn-sm" onClick={() => proceed(true)}>
              {options.buttons.discard}
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </ReactModal>
  );
};

Dialog.propTypes = {
  show: PropTypes.bool, // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func, // from confirmable. call to close the dialog with promise resolved.
  confirmation: PropTypes.string, // arguments of your confirm function
  options: PropTypes.object,
};
export default confirmable(Dialog);
