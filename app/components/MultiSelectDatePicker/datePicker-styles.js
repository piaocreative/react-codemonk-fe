import styled from 'styled-components';
import { black, lightBlue, white, lightPurple, primaryNew } from 'themes/variables';
import media from 'themes/media';

export const DatePickerComponent = styled.div`
  &.cal-small {
    text-align: center;
    .DayPicker-wrapper {
      border: 0;
      margin-top: 0;
      ${media.medium`
        padding: 5px;
      `};
    }
    .DayPicker-Day {
      padding: 4px;
      min-width: 25px;
      ${media.medium` 
        font-size: 12px;
        padding: 2px;
      `};
      ${media.large`
        min-width: 27px;
      `};
      ${media.extraLarge` 
        min-width: 35px;
        padding:4px;
      `};
    }
    .DayPicker-Weekday {
      padding: 0.5em;
      min-width: 25px;
      font-size: 10px;
      ${media.medium`
        padding: 0.5em 0;
      `};
      ${media.large`
        min-width: 27px;
      `};
      ${media.extraLarge`
        font-size: 12px;
        min-width: 35px;
      `};
    }
  }
  .DayPicker-wrapper {
    margin-top: 10px;
    padding: 5px;
    border: 1px solid ${lightBlue};
    &:focus {
      outline: none;
    }
    ${media.medium`
      padding: 23px;
    `};
  }
  .DayPicker-Month {
    margin: 0px;
  }
  .DayPicker-Months {
    margin-top: 15px;
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${lightBlue};
    color: rgb(${black});
    z-index: 1;
    border-radius: 0px;
    &:hover {
      background-color: ${lightBlue};
    }
  }
  ${media.xsmall` 
    transform: translateX(-10px);
  `};
  ${media.small`
    transform:translateX(0px);
  `};
  .DayPicker-Day--today {
    color: #212529;
  }
  .DayPicker-Day {
    border: 2px solid rgb(${white});
    min-width: 25px;
    border-radius: 0px;
    max-height: 58px;
    white-space: nowrap;
    flex: 1;
    padding: 5px 6px;

    &:focus {
      outline: none;
    }
    ${media.xsmall` 
      min-width: 10px;
      padding:0px;
    `};
    ${media.small` 
      min-width:100%;
      width: 14%;
      padding:0px;
    `};
    ${media.medium` 
      min-width: 53px;
      padding:10px 11px;
    `};
    ${media.large` 
      min-width: 62px;
      padding:15px 16px;
    `};
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background-color: ${lightPurple};
  }
  .DayPicker-Weekday {
    font-size: 12px;
    min-width: 25px;
    color: rgb(${black});
    white-space: nowrap;
    text-align: center;
    font-family: 'GT-Walsheim-Pro-Bold';
    position: relative;
    ${media.medium`
      min-width: 45px;
      font-size:14px;
    `};
    &:after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: 0px;
      background-color: ${lightBlue};
      display: block;
    }
    &:last-child {
      &:after {
        width: 80%;
      }
    }
  }
  abbr {
    font-family: 'GT-Walsheim-Pro-Bold';
    color: rgb(${black});
  }
  .DayPicker-Caption {
    display: none;
  }
`;
export const CalendarNavWrapper = styled.div`
  display: flex;
  top: -1px;
  font-size: 26px;
  font-family: 'GT-Walsheim-Pro-Bold';
  left: 106px;
  color: rgb(${primaryNew});
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: auto;

  .cal-small & {
    font-size: 16px;
    button {
      svg {
        width: 7px;
        height: 10px;
      }
    }
  }
  button {
    outline: none;
    background-color: transparent;
    color: rgb(${primaryNew});
    font-size: 26px;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;
