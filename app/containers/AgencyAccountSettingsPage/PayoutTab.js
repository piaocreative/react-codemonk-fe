/** PayoutTab Page
 * This is the Billing Tab in account settings
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import get from 'lodash/get';
import Emitter from 'utils/emitter';
import { H1, H4, FormWrapper } from 'components';
import { createStructuredSelector } from 'reselect';
import { reduxForm, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { PayoutDetailsComponents } from 'components/UserProfileComponents/PayoutDetails';
import * as actions from 'containers/Auth/Talent/PayoutDetailsPage/actions';
import * as selectors from 'containers/Auth/Talent/PayoutDetailsPage/selectors';
import { key } from 'containers/Auth/Talent/PayoutDetailsPage/constants';
import { formFields } from 'containers/Auth/Talent/PayoutDetailsPage/fields';
import saga from 'containers/Auth/Talent/PayoutDetailsPage/saga';
import reducer from 'containers/Auth/Talent/PayoutDetailsPage/reducer';
import { propTypes } from 'containers/proptypes';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import authMessages from 'containers/Auth/Talent/PayoutDetailsPage/messages';
import { accountSettingsTabFooter } from 'containers/Auth/utils';
import { EditLink } from './styles';
import messages from './messages';

export class PayoutTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFlag: false,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setBillingData(data);

    Emitter.on('editPayout', editPayout => {
      if (editPayout) {
        this.setState({ editFlag: false });
      }
    });
  }

  componentWillUnmount() {
    Emitter.off('editPayout');
  }

  handleSubmitButton = (invalid, editFlag) => {
    let output = true;
    if (!invalid && editFlag) {
      output = false;
    }
    return output;
  };

  setBillingData = data => {
    const { dispatch } = this.props;
    const bankName = get(data, 'payDetails.bankName', '');
    const bankAccountNumber = get(data, 'payDetails.accNumber', '');
    const bankCode = get(data, 'payDetails.bankCode', '');
    dispatch(change(key, 'bankName', bankName));
    dispatch(change(key, 'bankAccountNumber', bankAccountNumber));
    dispatch(change(key, 'bankCode', bankCode));
    dispatch(actions.changeBankName(bankName));
    dispatch(actions.changeAccountNumber(bankAccountNumber));
    dispatch(actions.changeBankCode(bankCode));
  };

  handleEdit = editFlag => {
    this.setState({ editFlag: !editFlag });
  };

  handleCancelButton = editFlag => {
    this.setState({ editFlag: !editFlag });
  };

  render() {
    const { handleSubmit, loading, invalid, onSubmitPayoutDetailsForm } = this.props;
    const { editFlag } = this.state;
    return (
      <PaymentPageWrapper>
        <FormWrapper>
          <div className="d-flex align-items-center justify-content-between">
            <H1 className="text-start mb-0">
              {editFlag && 'Edit'} <FormattedMessage {...authMessages.headingPayoutDetails} />
            </H1>
            {!editFlag && (
              <EditLink
                color="link"
                onClick={() => {
                  this.handleEdit(editFlag);
                }}
              >
                <small className="opacity-100">
                  <FormattedMessage {...messages.headingEditCTA} />
                </small>
              </EditLink>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <H4>
              <FormattedMessage {...authMessages.subHeadingBankDetails} />
            </H4>
            <PayoutDetailsComponents {...this.props} editFlag={editFlag} />
            <hr className="mt-5" />
            {accountSettingsTabFooter(
              loading,
              invalid,
              handleSubmit,
              editFlag,
              this.handleCancelButton,
              this.handleSubmitButton,
              onSubmitPayoutDetailsForm,
            )}
          </form>
        </FormWrapper>
      </PaymentPageWrapper>
    );
  }
}

PayoutTab.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  bankName: selectors.makeSelectBankName(),
  bankAccountNumber: selectors.makeSelectAccountNumber(),
  bankCode: selectors.makeSelectBankCode(),
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeBankName: evt => dispatch(actions.changeBankName(evt.target.value)),
    onChangeAccountNumber: evt => dispatch(actions.changeAccountNumber(evt.target.value)),
    onChangeBankCode: evt => dispatch(actions.changeBankCode(evt.target.value)),
    onSubmitPayoutDetailsForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitPayoutDetailsForm('editPayout'));
    },
  };
}

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
    fields: formFields,
    touchOnChange: true,
  }),
)(PayoutTab);
