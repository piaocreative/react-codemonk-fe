import React from 'react';
import { FormattedMessage } from 'react-intl';
import StorageService from 'utils/StorageService';
import containerMessage from 'containers/messages';
import { LinkButtonMod, Button } from 'components';
import { handleBackButton } from 'containers/Auth/utils';
import { propTypes } from './proptypes';

const DocumentUploadFooter = ({ history, formValid, handleSaveForLater }) => (
  <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end mt-5">
    <React.Fragment>
      <LinkButtonMod
        color="link"
        onClick={e => {
          handleSaveForLater(e);
        }}
      >
        <FormattedMessage {...containerMessage.skipButton} />
      </LinkButtonMod>
      <Button
        className="btn-primary mt-3 mt-md-0 ms-md-3"
        disabled={!formValid}
        onClick={e => {
          StorageService.set('signupStep', 8, { hash: true });
          handleBackButton(e, history, 8);
        }}
      >
        <FormattedMessage {...containerMessage.continueButton} />
      </Button>
    </React.Fragment>
  </div>
);

export default DocumentUploadFooter;

DocumentUploadFooter.propTypes = propTypes;
