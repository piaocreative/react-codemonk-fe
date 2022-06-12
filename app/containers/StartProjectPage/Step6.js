import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import { H1 } from 'components';
import { Field } from 'redux-form/immutable';
import { RadioButton } from 'utils/Fields';
import { defaultProps, propTypes } from 'containers/proptypes';
import { ProjectSpeed } from './constants';
import messages from './messages';
import StepFooter from './StepFooter';

export class Step6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.speed,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedOption: nextProps.speed,
    });
  }

  handleProjectSpeedChange = event => {
    const { onProjectSpeedChange } = this.props;
    this.setState({
      selectedOption: event.target.value,
    });
    onProjectSpeedChange(event.target.value);
  };

  render() {
    const { selectedOption } = this.state;
    const { invalid } = this.props;
    return (
      <React.Fragment>
        <H1>
          <FormattedMessage {...messages.titleStep6} />
        </H1>
        <FormGroup>
          {ProjectSpeed.map(item => (
            <Field
              name="projectSpeed"
              defaultValue={item.value}
              value={item.value}
              component={RadioButton}
              label={item.label}
              checked={selectedOption === item.value}
              onChangeRadio={e => this.handleProjectSpeedChange(e)}
            />
          ))}
        </FormGroup>
        <StepFooter step={6} {...this.props} invalid={invalid || !selectedOption} />
      </React.Fragment>
    );
  }
}

Step6.defaultProps = defaultProps;
Step6.propTypes = propTypes;

export default Step6;
