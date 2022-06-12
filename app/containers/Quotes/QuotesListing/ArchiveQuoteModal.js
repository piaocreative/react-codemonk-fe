/** ArchiveQuoteModal
 * This is the Modal page for the Client to archive Quote,
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { reduxForm } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import ReactModal from 'react-modal';
import { loadRepos, reset } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { API_URL, QUOTE, ARCHIVE, closeIcon } from 'containers/App/constants';
import { H4, Button, ToastifyMessage, P } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';

export class ArchiveQuoteModal extends React.Component {
  submitArchive = () => {
    const { dispatch, quoteId } = this.props;
    dispatch(loadRepos());
    const data = { method: 'PATCH' };
    const requestURL = `${API_URL}${QUOTE}${ARCHIVE}/${quoteId}`;

    request(requestURL, data)
      .then(this.quoteArchived)
      .catch(() => {
        dispatch(reset());
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  quoteArchived = response => {
    const { dispatch, handleQuoteArchived } = this.props;
    if (get(response, 'status')) {
      dispatch(reset());
      toast.success(<ToastifyMessage message={get(response, 'message')} type="success" />, { className: 'Toast-success' });
      handleQuoteArchived();
    } else {
      dispatch(reset());
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  /**
   * call on open popup
   * @author Innovify
   */

  render() {
    const { showArchiveQuoteModal, handleArchiveQuoteCloseModal, loading } = this.props;
    return (
      <ReactModal
        isOpen={showArchiveQuoteModal}
        contentLabel={containerMessage.archiveModalTitle.defaultMessage}
        onRequestClose={handleArchiveQuoteCloseModal}
        className="modal-dialog secondary-modal"
        style={{ overlay: { zIndex: 12 } }}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        ariaModal
      >
        <div className="modal-content">
          <div className="modal-header modal-close">
            <button type="button" className="modal-dismiss" onClick={handleArchiveQuoteCloseModal}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <div className="modal-body">
            <H4 className="newH4 mt-0" opacityVal="0.5">
              <FormattedMessage {...containerMessage.archiveModalTitle} />
            </H4>
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...containerMessage.archiveModalContent} />
            </P>
            <div className="d-flex justify-content-end mt-5">
              <Button className="btn-link me-4 h-auto" type="button" onClick={handleArchiveQuoteCloseModal}>
                <FormattedMessage {...containerMessage.btnCancel} />
              </Button>
              <Button type="button" className={`${loading ? 'loading' : ''} btn-primary btn-sm`} onClick={this.submitArchive}>
                <FormattedMessage {...containerMessage.btnArchive} />
              </Button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

ArchiveQuoteModal.defaultProps = defaultProps;
ArchiveQuoteModal.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  reduxForm({
    form: 'applyQuote',
    touchOnChange: true,
  }),
)(ArchiveQuoteModal);
