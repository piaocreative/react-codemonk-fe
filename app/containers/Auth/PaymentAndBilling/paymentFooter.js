import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LinkButtonMod, Button } from 'components';
import containerMessage from 'containers/messages';
import { propTypes } from 'containers/proptypes';
import { handleBackButton, checkForValidation } from './utils';

const PaymentFooter = ({
  history,
  invalid,
  loading,
  handleSubmit,
  onSubmitPaymentForm,
  handleSaveForLater,
  rate,
  billingType,
  companyDetails,
  payType,
  bankPayDetails,
  payPalEmail,
  dispatch,
}) => (
  <div className="d-flex justify-content-md-end align-items-center flex-wrap justify-content-between">
    <LinkButtonMod
      className="left-arrow link me-auto"
      color="link"
      onClick={e => {
        handleBackButton(e, history, dispatch);
      }}
    >
      <FormattedMessage {...containerMessage.backButton} />
    </LinkButtonMod>

    <LinkButtonMod
      color="link"
      onClick={e => {
        handleSaveForLater(e);
      }}
    >
      <FormattedMessage {...containerMessage.skipButton} />
    </LinkButtonMod>
    <Button
      className={loading ? 'loading btn-primary btn-submit' : 'btn-primary btn-submit'}
      disabled={invalid}
      onClick={handleSubmit(e =>
        onSubmitPaymentForm(e, checkForValidation(rate, billingType, companyDetails, payType, bankPayDetails, payPalEmail)),
      )}
    >
      <FormattedMessage {...containerMessage.continueButton} />
    </Button>
  </div>
);
export default PaymentFooter;

PaymentFooter.propTypes = propTypes;
