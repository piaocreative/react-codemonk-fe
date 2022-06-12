import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TALENT_STEP_5_URL } from 'containers/Auth/constants';
import StorageService from 'utils/StorageService';
import containerMessage from 'containers/messages';
import { LinkButtonMod, Button } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import { handleBackButton } from 'containers/Auth/utils';

const ProjectFooter = props => {
  const { history, formValid, handleSaveForLater } = props;
  return (
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
          StorageService.set('signupStep', 5, { hash: true });
          handleBackButton(e, history, TALENT_STEP_5_URL);
        }}
      >
        <FormattedMessage {...containerMessage.continueButton} />
      </Button>
    </div>
  );
};

ProjectFooter.defaultProps = defaultProps;
ProjectFooter.propTypes = propTypes;

export default ProjectFooter;
