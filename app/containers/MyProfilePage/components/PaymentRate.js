/** PaymentRate
 * This is the PaymentRate for the App, at the '/my-profile' route
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl';
import { Card, P, FormLabel } from 'components';
import { reduxForm, change, untouch } from 'redux-form/immutable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { gtm } from 'utils/Helper';
import { createStructuredSelector } from 'reselect';
import StorageService from 'utils/StorageService';
import { RateComponents } from 'components/UserProfileComponents/Rate';
import reducer from 'containers/Auth/PaymentAndBilling/reducer';
import saga from 'containers/Auth/PaymentAndBilling/saga';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { saveForLater, changeRate } from 'containers/Auth/PaymentAndBilling/actions';
import { currencyData, editNoteIcon, briefcaseIcon } from 'containers/App/constants';
import { makeSelectRate } from 'containers/Auth/PaymentAndBilling/selectors';
import { key } from 'containers/Auth/PaymentAndBilling/constants';
import { redirectPageURL } from 'containers/App/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import componentMessage from 'components/UserProfileComponents/messages';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import PopupWrapper from '../PopupWrapper';
import { ActionIconLink, CardHeader } from '../styles';
import { getCurrencySymbol } from './utils';
import { modals } from '../constants';
import messages from '../messages';

export class PaymentRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRateEditModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga, loadProfileData, currentModal, modalClose } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.PaymentRate) {
      this.setState({ showRateEditModal: false });
      modalClose();
      loadProfileData();
    }
  }

  /** call on close button click
   * @author Innovify
   */
  handleRateEditCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showRateEditModal: false });
    modalClose();
  };

  /**
   * call on open popup
   * @author Innovify
   */
  handleRateEditOpenModal = () => {
    const { dispatch, onChangeRate, data, modalOpen } = this.props;

    const apiCurrency = get(data, 'currency');
    const currency = apiCurrency ? { label: data.currency, value: data.currency } : '';
    const ratePerHour = Number(get(data, 'ratePerHour', 0));
    dispatch(change(key, `ratePerHour`, ratePerHour));
    dispatch(change(key, `currency`, currency));
    dispatch(untouch(key, `ratePerHour`));
    dispatch(untouch(key, `currency`));

    const rateData = { currency, ratePerHour };
    onChangeRate(rateData);
    this.setState({ showRateEditModal: true });
    modalOpen(modals.PaymentRate);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Rate',
      value: 1,
    });
  };

  render() {
    const { handleSubmit, invalid, loading, responseSuccess, responseError, onSubmitPaymentForm, role, data = {} } = this.props;
    const { showRateEditModal } = this.state;
    const isLoginViaAdmin = StorageService.get('isLoginViaAdmin') || '';
    let isDisable = false;
    if (isLoginViaAdmin) {
      isDisable = false;
    } else if (data.hasActiveProject === true) {
      isDisable = true;
    }
    return (
      <React.Fragment>
        <Card className="p-30">
          <CardHeader>
            <div className="d-flex align-items-center">
              <SVG src={briefcaseIcon} className="me-2 title-icon" />
              <P className="p20 mb-0">
                <FormattedMessage {...componentMessage.labelEmpType} />
              </P>
            </div>
            {(role === '1' || role === '3') && (
              <ActionIconLink to={{ pathname: redirectPageURL(6), state: { fromMyProfile: true } }}>
                <SVG src={editNoteIcon} />
              </ActionIconLink>
            )}
            {/* <ActionIcon type="button" onClick={this.handleRateEditOpenModal}>
                <SVG src={editNoteIcon} />
              </ActionIcon> */}
          </CardHeader>
          {get(data, 'employmentType', []).includes('permanent-employee') ? (
            <div className="d-flex flex-column">
              <FormLabel>
                <FormattedMessage {...messages.permanentEmp} />
              </FormLabel>
              <div className="d-flex mb-3 align-items-center">
                <P className="p20 text-primary mb-0">
                  {getCurrencySymbol(currencyData, 'code', get(data, 'currencyAnnualRate'))}
                  {get(data, 'annualRate')}
                </P>
                <P className="p14 text-primary mb-0 ms-1">
                  <FormattedMessage {...messages.perAnnum} />
                </P>
              </div>
            </div>
          ) : (
            ''
          )}
          {get(data, 'employmentType', []).includes('freelancer-consultant') ? (
            <div className="d-flex flex-column">
              <FormLabel>
                {role !== '2' ? <FormattedMessage {...messages.labelFreelancer} /> : <FormattedMessage {...messages.labelSubContractor} />}
              </FormLabel>
              <div className="d-flex mb-3 align-items-center">
                <P className="p20 text-primary mb-0">
                  {getCurrencySymbol(currencyData, 'code', get(data, 'currency'))}
                  {get(data, 'ratePerHour')}
                </P>
                <P className="p14 text-primary mb-0 ms-1">
                  <FormattedMessage {...messages.perHour} />
                </P>
              </div>
            </div>
          ) : (
            ''
          )}
        </Card>

        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid || isDisable}
          isOpen={showRateEditModal}
          onDiscard={this.handleRateEditCloseModal}
          onHandleSubmit={handleSubmit(e => {
            onSubmitPaymentForm(e);

            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Rate',
              value: 1,
            });
          })}
          modalType="edit"
          title={messages.modalEditRateHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <RateComponents {...this.props} size="sm" formKey={key} />
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }
}

PaymentRate.defaultProps = defaultProps;
PaymentRate.propTypes = propTypes;

export function mapDispatchToProps(dispatch) {
  return {
    onChangeRate: data => dispatch(changeRate(data)),
    onSubmitPaymentForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(saveForLater('editRate', { validatePaymentRate: 1 }));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  rate: makeSelectRate(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
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
)(PaymentRate);
