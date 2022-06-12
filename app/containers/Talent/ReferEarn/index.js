import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, change, untouch } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import ReactModal from 'react-modal';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import SVG from 'react-inlinesvg';
import { FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { propTypes } from 'containers/proptypes';
import { P, Card, Button, H3, A, FormLabel, FormControl, ToastifyMessage } from 'components';
import messages from 'containers/Talent/Dashboard/messages';
import { earnIcon, newTabIcon, closeIcon, REFERRAL_TERMS, copyIcon, plusSquareIcon, sendIcon } from 'containers/App/constants';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import reducer from 'containers/Talent/Dashboard/reducer';
import saga from 'containers/Talent/Dashboard/saga';
import * as actions from 'containers/Talent/Dashboard/actions';
import injectReducer from 'utils/injectReducer';
import * as selectors from 'containers/Talent/Dashboard/selectors';
import { makeSelectLoading, makeSelectPopUpSaga } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import { InvitePeople } from 'containers/Talent/Dashboard/InvitePeople';
import { key, MINIMUM_INVITE_ROWS } from 'containers/Talent/Dashboard/constants';
import containerMessage from './messages';
import { ReferEarnCard, ReferModalBody } from './styles';

export class ReferEarn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReferModal: false,
      showEmailBlock: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ showReferModal: false });
    }
  }

  showReferModal = () => {
    const { dispatch, onChangeInvite, inviteMails } = this.props;
    const inviteMailsLength = inviteMails.length <= MINIMUM_INVITE_ROWS ? MINIMUM_INVITE_ROWS : inviteMails.length;
    const newInviteMails = [];
    for (let i = 0; i < inviteMailsLength; i++) {
      dispatch(change(key, `name${i}`, ''));
      dispatch(change(key, `email${i}`, ''));
      dispatch(untouch(key, `name${i}`));
      dispatch(untouch(key, `email${i}`));
      newInviteMails.push({ name: '', email: '' });
    }
    onChangeInvite(newInviteMails);
    this.setState({
      showReferModal: true,
    });
  };

  closeReferModalHandler = () => {
    this.setState({
      showReferModal: false,
      showEmailBlock: false,
    });
  };

  copyToclipboard = () => {
    const { inviteLink } = this.props;
    navigator.clipboard.writeText(inviteLink);
    toast.success(<ToastifyMessage message={messages.copiedToClipBoard.defaultMessage} type="success" />, {
      className: 'Toast-success',
    });
  };

  showInviteEmailCotnaienr = () => {
    this.setState({
      showEmailBlock: true,
    });
  };

  onAddPeople = () => {
    const { dispatch, onChangeInvite, inviteMails } = this.props;
    const totalPeople = inviteMails.length;
    const newInvite = [
      {
        name: '',
        email: '',
      },
    ];
    dispatch(change(key, `name${totalPeople + 1}`, newInvite.name));
    dispatch(change(key, `email${totalPeople + 1}`, newInvite.url));
    const newInviteMails = [...inviteMails, ...newInvite];
    onChangeInvite(newInviteMails);
  };

  referInviteBlock = () => {
    const { inviteMails, responseSuccess, responseError, loading, onSubmitInviteMails, gtm, handleSubmit, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <InvitePeople {...this.props} inviteMails={inviteMails} formKey={key} />
        {inviteMails.length < 10 && (
          <Button className="btn-icon text-primary btn-link mt-3" onClick={this.onAddPeople}>
            <SVG className="me-2" src={plusSquareIcon} />
            <FormattedMessage {...messages.buttonAddAnother} />
          </Button>
        )}
        <div className="d-flex justify-content-end mt-4">
          <Button
            className="btn btn-link d-flex align-content-right m-3"
            onClick={() => {
              this.setState({
                showEmailBlock: false,
              });
            }}
          >
            <FormattedMessage {...containerMessage.backTonviteLink} />
          </Button>
          <Button
            className={`${getBtnClass(loading, responseSuccess, responseError)} align-content-right`}
            type="submit"
            onClick={handleSubmit(e => {
              onSubmitInviteMails(e);
              gtm({
                action: 'Button Click',
                label: 'refer_invite',
                category: 'Talent Portal',
                value: inviteMails.length,
                directGA: true,
              });
            })}
            disabled={invalid || inviteMails.every(invite => isEmpty(invite.email))}
          >
            <FormattedMessage {...messages.buttonInvite} />
            <SVG className="mx-2" src={sendIcon} />
          </Button>
        </div>
      </form>
    );
  };

  referEarnModal = () => {
    const { showReferModal, showEmailBlock } = this.state;
    const { inviteLink } = this.props;
    return (
      <ReactModal
        isOpen={showReferModal}
        contentLabel="crop"
        className={`modal-dialog ${showEmailBlock ? '' : 'modal-sm'}`}
        style={{ overlay: { zIndex: 12 } }}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        ariaModal
      >
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-end pb-0">
            <button type="button" className="modal-dismiss" onClick={this.closeReferModalHandler}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <ReferModalBody className="modal-body pt-0 mt-2">
            <H3 className="modal-title d-flex align-items-center mb10">
              Refer and earn up to <span className="mx-1"> $100 </span> cash
            </H3>
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...containerMessage.referModalText} />
              (<FormattedMessage {...containerMessage.subjectToOurTerms} />{' '}
              <A href={REFERRAL_TERMS} target="_blank" className="ms-1 me-1 text-decoration-underline">
                <SVG src={newTabIcon} />
              </A>
              ).
            </P>
            {!showEmailBlock ? (
              <div>
                <FormLabel className="mt-3">
                  <FormattedMessage {...containerMessage.inviteLinkLabel} />
                </FormLabel>
                <FormControl
                  className="no-background"
                  placeholder="https://app.codemonk.ai/talent/referral/"
                  type="text"
                  disabled
                  value={inviteLink}
                />
                <FormGroup className="text-center mt-4">
                  <Button className="btn btn-primary mt-1 w-100" type="button" onClick={this.copyToclipboard}>
                    <FormattedMessage {...messages.buttonCopyLink} />
                    <SVG src={copyIcon} className="mx-2" />
                  </Button>
                </FormGroup>
                <FormGroup className="text-center mt-4">
                  <Button className="btn btn-outline paddingY12 h-auto w-100" type="button" onClick={this.showInviteEmailCotnaienr}>
                    <FormattedMessage {...containerMessage.invitebyEmail} />
                  </Button>
                </FormGroup>
              </div>
            ) : (
              this.referInviteBlock()
            )}
          </ReferModalBody>
        </div>
      </ReactModal>
    );
  };

  render() {
    return (
      <ReferEarnCard className="mt-5">
        <H3 className="mb-3">
          <FormattedMessage {...messages.referAndEarnTitle} />
        </H3>
        <Card className="bg-secondary-gradient custom-card d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <SVG src={earnIcon} />
            <P className="p16 mb-0 mx-3" lineHeight="18">
              Invite your friends to work on CodeMonk &#38; earn rewards
            </P>
          </div>
          <Button type="button" className="btn btn-outline btn-sm" onClick={this.showReferModal}>
            <FormattedMessage {...containerMessage.inviteNow} />
          </Button>
        </Card>
        {this.referEarnModal()}
      </ReferEarnCard>
    );
  }
}

ReferEarn.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  inviteMails: selectors.makeSelectInviteMails(),
  loading: makeSelectLoading(),
  popUpSaga: makeSelectPopUpSaga(),
  firstName: selectors.firstName,
  lastName: selectors.lastName,
  email: selectors.email,
  currency: selectors.currency,
  rate: selectors.rate,
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeInvite: data => dispatch(actions.changeInvite(data)),
    onSubmitInviteMails: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.submitInviteMails());
    },
  };
}
const withConnect = connect(
  mapStateToProp,
  mapDispatchToProp,
);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(ReferEarn);
