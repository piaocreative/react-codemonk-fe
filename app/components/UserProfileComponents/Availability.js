import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel, H4 } from 'components';
import { FormattedMessage } from 'react-intl';
import MultiSelectDatePicker from 'components/MultiSelectDatePicker';
import Switch from 'components/Switch';
import containerMessage from 'containers/messages';
import ToolTip from 'components/ToolTip';
import { setInputClass } from './utils';
import messages from './messages';

export class AvailabilityComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unavailability: props.unavailability,
      availability: props.availability,
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ availability: nextProps.availability, unavailability: nextProps.unavailability });
  };

  onChangeAvailability = () => {
    const { onAvailabilityChange } = this.props;
    const { availability } = this.state;
    onAvailabilityChange(!availability);
  };

  render() {
    const { size, onUnavailabilityChange } = this.props;
    const { unavailability, availability } = this.state;

    return (
      <React.Fragment>
        <H4 className={`d-flex align-items-center justify-content-between ${size === 'sm' ? 'mt-0' : ''} ${setInputClass(size)}`}>
          <FormattedMessage {...containerMessage.titleAvailability} />
          <Switch data-testid="SwitchButton" checked={availability} onChange={this.onChangeAvailability} />
        </H4>
        <div id="calendar" className={!availability ? 'disable-calendar' : ''}>
          <FormLabel className="d-flex align-items-end">
            <FormattedMessage {...messages.labelUnavailability} />
            <ToolTip
              wrapperClass="ms-2"
              placement="right"
              tooltipId="infoTooltip"
              content={messages.labelUnavailabilityToolTip.defaultMessage}
            />
          </FormLabel>
          <MultiSelectDatePicker handleDayClick={onUnavailabilityChange} selectedDays={unavailability} />
        </div>
      </React.Fragment>
    );
  }
}

AvailabilityComponents.defaultProps = {
  size: '',
  onBoarding: false,
};
AvailabilityComponents.propTypes = {
  onBoarding: PropTypes.bool,
  size: PropTypes.string,
  dispatch: PropTypes.any,
  formKey: PropTypes.string,
  availability: PropTypes.any,
  unavailability: PropTypes.any,
  onAvailabilityChange: PropTypes.func,
  onUnavailabilityChange: PropTypes.func,
};
