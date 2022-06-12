import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form/immutable';
import { RadioButton, renderField } from 'utils/Fields';
import { H1 } from 'components';
import * as formValidations from 'utils/formValidations';
import { defaultProps, propTypes } from 'containers/proptypes';
import { WorkProgress } from './constants';
import { ProjectURL } from './styles';
import messages from './messages';
import StepFooter from './StepFooter';

export class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.buildStatus,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedOption: nextProps.buildStatus,
    });
  }

  handleBuildStatusChange = event => {
    const { onWorkProgressChange } = this.props;
    this.setState({
      selectedOption: event.target.value,
    });
    onWorkProgressChange(event.target.value);
  };

  render() {
    const { projectUrl, onChangeProjectURL, invalid } = this.props;
    const { selectedOption } = this.state;
    return (
      <React.Fragment>
        <H1>
          <FormattedMessage {...messages.titleStep2} />
        </H1>
        <FormGroup>
          {WorkProgress.map(item => (
            <Field
              name="buildStatus"
              defaultValue={item.value}
              value={item.value}
              component={RadioButton}
              groupName="workProgress"
              label={item.label}
              checked={selectedOption === item.value}
              onChangeRadio={e => this.handleBuildStatusChange(e)}
            />
          ))}
        </FormGroup>
        {selectedOption === 'live' ? (
          <ProjectURL>
            <Field
              name="projectUrl"
              type="text"
              component={renderField}
              placeholder={messages.placeholderLinkSite.defaultMessage}
              value={projectUrl}
              onChange={onChangeProjectURL}
              validate={[formValidations.required, formValidations.websiteURL]}
            />
          </ProjectURL>
        ) : (
          ''
        )}
        <StepFooter step={2} {...this.props} invalid={invalid || !selectedOption} />
      </React.Fragment>
    );
  }
}

Step2.defaultProps = defaultProps;
Step2.propTypes = propTypes;

export default Step2;
