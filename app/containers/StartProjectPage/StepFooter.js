import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, LinkButtonMod, FormWrapper } from 'components';
import get from 'lodash/get';
import { gtm } from 'utils/Helper';
import StorageService from 'utils/StorageService';
import messages from './messages';
import { HR } from './styles';

export class StepFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { currentStep, location, history, goToStep } = this.props;
    const stepCount = StorageService.get('stepCompleted');
    const pathName = get(location, 'pathname');
    if (currentStep !== Number(stepCount)) {
      let pathURL;
      if (stepCount === false) {
        pathURL = `${pathName}`;
      } else {
        pathURL = `${pathName}#step${stepCount}`;
      }
      history.push(pathURL);
      goToStep(stepCount);
    }
  }

  handleContinue = e => {
    e.preventDefault();
    const { nextStep, currentStep } = this.props;
    StorageService.set('stepCompleted', currentStep + 1, { hash: true });
    nextStep();
  };

  handleBack = () => {
    const { previousStep, currentStep } = this.props;
    StorageService.set('stepCompleted', currentStep - 1, { hash: true });
    previousStep();
  };

  render() {
    const { invalid, totalSteps, step, currentStep, handleSubmit, onSubmitProjectDetailsForm } = this.props;

    return (
      <FormWrapper>
        <HR />
        <div className="d-flex justify-content-between ">
          {step > 1 && (
            <LinkButtonMod className="left-arrow link me-auto" color="link" onClick={this.handleBack}>
              <FormattedMessage {...messages.btnBack} />
            </LinkButtonMod>
          )}
          <div className="d-flex ms-auto">
            <div className="d-flex align-items-center me-md-5 me-2">
              {currentStep}/{totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <Button className="btn-primary" color="link" disabled={invalid} onClick={this.handleContinue}>
                <FormattedMessage {...messages.btnContinue} />
              </Button>
            ) : (
              <Button
                className="btn-primary"
                disabled={invalid}
                onClick={handleSubmit(e => {
                  onSubmitProjectDetailsForm(e);
                  StorageService.delete('stepCompleted');
                  gtm({ action: 'Button Click', label: 'submit_project', category: 'Client Portal', directGA: true });
                })}
              >
                <FormattedMessage {...messages.btnSubmit} />
              </Button>
            )}
          </div>
        </div>
      </FormWrapper>
    );
  }
}
StepFooter.defaultProps = {
  handleSubmit: () => {},
  onSubmitProjectDetailsForm: () => {},
  onContinue: () => {},
  onChangeProjectURL: () => {},
};
StepFooter.propTypes = {
  nextStep: PropTypes.any,
  previousStep: PropTypes.any,
  totalSteps: PropTypes.any,
  step: PropTypes.any,
  currentStep: PropTypes.any,
  handleSubmit: PropTypes.func,
  onSubmitProjectDetailsForm: PropTypes.func,
  onContinue: PropTypes.func,
  invalid: PropTypes.any,
  location: PropTypes.any,
  history: PropTypes.any,
  goToStep: PropTypes.any,
  radioValue: PropTypes.string,
  dispatch: PropTypes.any,
  projectUrl: PropTypes.any,
  onChangeProjectURL: PropTypes.func,
  reset: PropTypes.any,
};

export default StepFooter;
