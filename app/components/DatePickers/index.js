/**
 * over ride the react-datepicker and bind with redux-form so we can do a validation of select box.
 * @author Innovify
 *
 */

import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SVG from 'react-inlinesvg';
import 'react-datepicker/dist/react-datepicker.css';
import { calendarIcon } from 'containers/App/constants';
import { defaultProps, propTypes } from 'containers/proptypes';
import { ValidationMessage } from '../Input';
import { DatePickerContainer } from './style';

moment.suppressDeprecationWarnings = true;

export class DatePickers extends React.Component {
  /**
   * onChange call on data value selected by user
   * @param {object} a date object we get
   * @author Innovify
   */
  handleChange = date => {
    const { input } = this.props;
    input.onChange(date);
  };

  render() {
    const {
      input,
      minDate,
      maxDate,
      minTime,
      maxTime,
      placeholder,
      placement,
      scrollableYearDropdown,
      meta: { touched, error, warning },
      onChangeRaw,
      yearDropdownItemNumber = 5,
      showDisabledMonthNavigation = false,
      shouldCloseOnSelect = true,
      showYearDropDown = false,
      showMonthDropdown = false,
      showTimeSelect = false,
      showYearPicker = false,
      dateFormat = 'dd/MM/yyyy',
      disabled = false,
      filterDate,
    } = this.props;
    const errorState = touched && (error || warning);
    return (
      <DatePickerContainer errorState={errorState}>
        <DatePicker
          placeholderText={placeholder}
          dateFormat={dateFormat}
          selected={input.value ? moment(input.value, dateFormat).toDate() : null}
          onChange={this.handleChange}
          onBlur={() => input.onBlur()}
          minDate={minDate}
          maxDate={maxDate}
          minTime={minTime}
          maxTime={maxTime}
          yearDropdownItemNumber={yearDropdownItemNumber}
          showYearDropdown={showYearDropDown}
          showMonthDropdown={showMonthDropdown}
          showYearPicker={showYearPicker}
          showTimeSelect={showTimeSelect}
          scrollableYearDropdown={scrollableYearDropdown}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
          className="box-shadow-datepicker form-control"
          popperPlacement={placement}
          shouldCloseOnSelect={shouldCloseOnSelect}
          onChangeRaw={onChangeRaw}
          disabled={disabled}
          {...(filterDate ? { filterDate } : {})}
        />
        <SVG src={calendarIcon} />
        <ValidationMessage className="required">{touched && (error || warning)}</ValidationMessage>
      </DatePickerContainer>
    );
  }
}

DatePickers.defaultProps = defaultProps;
DatePickers.propTypes = propTypes;

export default DatePickers;
