/** ArchiveBriefModal
 * This is the Modal page for the Client to archive brief,
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { reduxForm } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import ReactModal from 'react-modal';
import { loadRepos, reset } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { API_URL, JOB_POST, ARCHIVE, closeIcon, archiveIcon } from 'containers/App/constants';
import { H4, Button, ToastifyMessage, P } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';

export class ArchiveBriefModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showArchiveBriefModal: false,
    };
  }

  submitArchive = () => {
    const { dispatch, briefID } = this.props;
    dispatch(loadRepos());
    const data = { method: 'PATCH' };
    const requestURL = `${API_URL}${JOB_POST}${ARCHIVE}/${briefID}`;

    request(requestURL, data)
      .then(this.briefArchived)
      .catch(() => {
        dispatch(reset());
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  handleArchiveBriefOpenModal = e => {
    e.stopPropagation();
    this.setState({ showArchiveBriefModal: true });
  };

  handleArchiveBriefCloseModal = () => this.setState({ showArchiveBriefModal: false });

  briefArchived = response => {
    const { dispatch, handleBriefArchived } = this.props;
    if (get(response, 'status')) {
      dispatch(reset());
      this.setState({ showArchiveBriefModal: false }, () => {
        toast.success(<ToastifyMessage message={get(response, 'message')} type="success" />, { className: 'Toast-success' });
        handleBriefArchived();
      });
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
    const { loading, briefID } = this.props;
    const { showArchiveBriefModal } = this.state;
    return (
      <React.Fragment>
        <Button type="button" className="btn btn-icon btn-link" onClick={e => this.handleArchiveBriefOpenModal(e, briefID)}>
          <SVG src={archiveIcon} />
        </Button>
        <ReactModal
          isOpen={showArchiveBriefModal}
          contentLabel={containerMessage.archiveModalTitle.defaultMessage}
          onRequestClose={this.handleArchiveBriefCloseModal}
          className="modal-dialog secondary-modal"
          style={{ overlay: { zIndex: 12 } }}
          shouldCloseOnOverlayClick={false}
          ariaHideApp={false}
          ariaModal
        >
          <div className="modal-content">
            <div className="modal-header modal-close">
              <button type="button" className="modal-dismiss" onClick={this.handleArchiveBriefCloseModal}>
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
                <Button className="btn-link me-4 h-auto" type="button" onClick={this.handleArchiveBriefCloseModal}>
                  <FormattedMessage {...containerMessage.btnCancel} />
                </Button>
                <Button type="button" className={`${loading ? 'loading' : ''} btn-primary btn-sm`} onClick={this.submitArchive}>
                  <FormattedMessage {...containerMessage.btnArchive} />
                </Button>
              </div>
            </div>
          </div>
        </ReactModal>
      </React.Fragment>
    );
  }
}

ArchiveBriefModal.defaultProps = defaultProps;
ArchiveBriefModal.propTypes = propTypes;

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
    form: 'applyBrief',
    touchOnChange: true,
  }),
)(ArchiveBriefModal);
