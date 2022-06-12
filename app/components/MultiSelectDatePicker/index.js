import React from 'react';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { DatePickerComponent } from './datePicker-styles';
import { CalendarNavbar, CalendarWeekday } from './utils';

export class MultiSelectDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: props.selectedDays,
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ selectedDays: (nextProps && nextProps.selectedDays) || [] });
  };

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    const { handleDayClick } = this.props;
    if (typeof handleDayClick === 'function') {
      if (selected) {
        const selectedIndex = selectedDays.findIndex(selectedDay => DateUtils.isSameDay(selectedDay, day));
        selectedDays.splice(selectedIndex, 1);
      } else {
        selectedDays.push(day);
      }
      this.setState({ selectedDays });
      handleDayClick(selectedDays);
    }
  }

  render() {
    const { selectedDays } = this.state;
    const { smallSize } = this.props;
    return (
      <DatePickerComponent className={`${smallSize ? 'cal-small' : ''}`}>
        <DayPicker
          selectedDays={(selectedDays || []).map(d => new Date(d))}
          onDayClick={this.handleDayClick}
          navbarElement={<CalendarNavbar />}
          weekdayElement={<CalendarWeekday />}
        />
      </DatePickerComponent>
    );
  }
}

MultiSelectDatePicker.propTypes = {
  handleDayClick: PropTypes.func,
  selectedDays: PropTypes.func,
  smallSize: PropTypes.any,
};

export default MultiSelectDatePicker;
