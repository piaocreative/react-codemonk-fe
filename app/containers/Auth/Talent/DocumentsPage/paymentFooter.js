import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LinkButtonMod, Button } from 'components';
import { handleBackButton } from 'containers/Auth/utils';
import messages from './messages';
import { propTypes } from './proptypes';

const PaymentFooter = ({ history, invalid, loading, handleSubmit, onSubmitPaymentForm }) => (
  <div className="d-flex justify-content-md-end align-items-center flex-wrap justify-content-between">
    <LinkButtonMod
      className="left-arrow link me-auto"
      color="link"
      onClick={e => {
        handleBackButton(e, history, '/agency/add-directors-shareholders');
      }}
    >
      <FormattedMessage {...messages.btnBack} />
    </LinkButtonMod>
    <Button
      className={`${loading ? 'loading' : ''} btn-primary btn-submit`}
      disabled={invalid}
      onClick={handleSubmit(e => onSubmitPaymentForm(e))}
    >
      Continue
    </Button>
  </div>
);
export default PaymentFooter;

PaymentFooter.propTypes = propTypes;
