import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LinkButtonMod, Button } from 'components';
import StorageService from 'utils/StorageService';
import containerMessage from 'containers/messages';
import { TALENT_STEP_3_URL } from 'containers/Auth/constants';
import { handleBackButton } from 'containers/Auth/utils';
import { propTypes } from 'containers/proptypes';

const EducationFooter = ({ history, formValid, handleSaveForLater }) => (
  <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end my-5">
    <LinkButtonMod
      color="link"
      onClick={e => {
        handleSaveForLater(e);
      }}
    >
      <FormattedMessage {...containerMessage.skipButton} />
    </LinkButtonMod>
    <Button
      disabled={!formValid}
      className="btn-primary mt-3 mt-md-0 ms-md-3"
      onClick={e => {
        StorageService.set('signupStep', 3, { hash: true });
        handleBackButton(e, history, TALENT_STEP_3_URL);
      }}
    >
      <FormattedMessage {...containerMessage.continueButton} />
    </Button>
  </div>
);

export default EducationFooter;

EducationFooter.propTypes = propTypes;
