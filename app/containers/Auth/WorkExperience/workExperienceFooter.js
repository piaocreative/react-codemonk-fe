import React from 'react';
import { FormattedMessage } from 'react-intl';
import StorageService from 'utils/StorageService';
import { TALENT_STEP_4_URL } from 'containers/Auth/constants';
import containerMessage from 'containers/messages';
import { LinkButtonMod, Button } from 'components';
import { handleBackButton } from 'containers/Auth/utils';
import { propTypes } from './proptypes';

const WorkExperienceFooter = ({ history, formValid, handleSaveForLater }) => (
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
      className="btn-primary mt-3 mt-md-0 ms-md-3"
      disabled={!formValid}
      onClick={e => {
        StorageService.set('signupStep', 4, { hash: true });
        handleBackButton(e, history, TALENT_STEP_4_URL);
      }}
    >
      <FormattedMessage {...containerMessage.continueButton} />
    </Button>
  </div>
);
export default WorkExperienceFooter;

WorkExperienceFooter.propTypes = propTypes;
