import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { rightArrowIcon, leftArrowIcon } from 'containers/App/constants';
import { CalendarNavWrapper } from './datePicker-styles';

export function CalendarNavbar({ onPreviousClick, onNextClick, month }) {
  const date = new Date(month);
  const monthString = date.toLocaleString('default', { month: 'long' });
  return (
    <CalendarNavWrapper>
      <button type="button" className="me-3" onClick={() => onPreviousClick()}>
        <SVG src={leftArrowIcon} />
      </button>
      <span className="mt-1">{`${monthString} ${date.getFullYear()}`}</span>
      <button type="button" className="ms-3" onClick={() => onNextClick()}>
        <SVG src={rightArrowIcon} />
      </button>
    </CalendarNavWrapper>
  );
}
export function CalendarWeekday({ weekday, className, localeUtils, locale }) {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
  return (
    <div className={className} title={weekdayName}>
      {weekdayName.slice(0, 3).toUpperCase()}
    </div>
  );
}

CalendarNavbar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  month: PropTypes.any,
};

CalendarWeekday.propTypes = {
  weekday: PropTypes.any,
  className: PropTypes.any,
  localeUtils: PropTypes.any,
  locale: PropTypes.any,
};
