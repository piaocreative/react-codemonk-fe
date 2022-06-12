import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormGroup } from 'reactstrap';
import { H1 } from 'components';
import { Field } from 'redux-form/immutable';
import { RadioButton } from 'utils/Fields';
import { defaultProps, propTypes } from 'containers/proptypes';
import { BudgetArray } from './constants';
import messages from './messages';
import StepFooter from './StepFooter';

export class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.budget,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedOption: nextProps.budget,
    });
  }

  handleBudgetChange = event => {
    const { onBudgetChange } = this.props;
    const item = event.target.value;
    this.setState({
      selectedOption: item,
    });
    onBudgetChange(item);
  };

  render() {
    const { selectedOption } = this.state;
    const { invalid } = this.props;
    return (
      <React.Fragment>
        <H1>
          <FormattedMessage {...messages.titleStep4} />
        </H1>
        <FormGroup>
          {BudgetArray.map(item => (
            <Field
              name="budget"
              data-testid="radiobtn"
              defaultValue={item.value}
              value={item.value}
              component={RadioButton}
              groupName="budget"
              label={item.label}
              checked={selectedOption === item.value}
              onChangeRadio={e => this.handleBudgetChange(e)}
            />
          ))}
        </FormGroup>
        <StepFooter step={4} {...this.props} invalid={invalid || !selectedOption} />
      </React.Fragment>
    );
  }
}

Step4.defaultProps = defaultProps;
Step4.propTypes = propTypes;

export default Step4;
