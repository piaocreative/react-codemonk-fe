import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import { H1 } from 'components';
import { Field } from 'redux-form/immutable';
import { RadioButton } from 'utils/Fields';
import { defaultProps, propTypes } from 'containers/proptypes';
import { ManageTeam } from './constants';
import messages from './messages';
import StepFooter from './StepFooter';

export class Step7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.teamManageType,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedOption: nextProps.teamManageType,
    });
  }

  handleManageTeamChange = event => {
    const { onManageTeamChange } = this.props;
    this.setState({
      selectedOption: event.target.value,
    });
    onManageTeamChange(event.target.value);
  };

  render() {
    const { selectedOption } = this.state;
    const { invalid } = this.props;
    return (
      <React.Fragment>
        <H1>
          <FormattedMessage {...messages.titleStep7} />
        </H1>
        <FormGroup>
          {ManageTeam.map(item => (
            <Field
              name="manageTeam"
              defaultValue={item.value}
              value={item.value}
              component={RadioButton}
              groupName="manageTeam"
              label={item.label}
              checked={selectedOption === item.value}
              onChangeRadio={e => this.handleManageTeamChange(e)}
            />
          ))}
        </FormGroup>
        <StepFooter step={6} {...this.props} invalid={invalid || !selectedOption} />
      </React.Fragment>
    );
  }
}

Step7.defaultProps = defaultProps;
Step7.propTypes = propTypes;

export default Step7;
