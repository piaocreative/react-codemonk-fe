import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LinkButtonMod, Button } from 'components';
import { handleBackButton } from 'containers/Auth/utils';
import { propTypes } from 'containers/proptypes';
import messages from './messages';

const CertificationsFooter = ({ history, invalid, loading, handleSubmit, handleSaveForLater }) => (
  <div className="d-flex justify-content-md-end align-items-center flex-wrap justify-content-between">
    <LinkButtonMod
      className="left-arrow link me-auto"
      color="link"
      onClick={e => {
        handleBackButton(e, history, '/agency/add-talents');
      }}
    >
      <FormattedMessage {...messages.btnBack} />
    </LinkButtonMod>

    <LinkButtonMod
      color="link"
      onClick={e => {
        handleSaveForLater(e, 'saveForLater');
      }}
    >
      <FormattedMessage {...messages.btnSaveLater} />
    </LinkButtonMod>
    <Button
      className={`${loading ? 'loading' : ''} btn-primary btn-submit`}
      disabled={invalid}
      onClick={handleSubmit(e => handleSaveForLater(e, 'continue'))}
    >
      {messages.continueBtn.defaultMessage}
    </Button>
  </div>
);
export default CertificationsFooter;

CertificationsFooter.propTypes = propTypes;
