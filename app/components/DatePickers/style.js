import styled from 'styled-components';
import { primaryNew, black, white, dangerNew, primaryDarkNew } from 'themes/variables';

const placeholderStyles = `
  color: rgba(${primaryDarkNew}, 0.5);
  -webkit-text-fill-color: rgba(${primaryDarkNew}, 0.5);
  opacity: 1 !important;
  font-size: 16px;
`;

export const DatePickerContainer = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 20px;
    width: 14px;
    height: 16px;
    z-index: 1;
    top: 50%;
    margin-top: -8px;

    path {
      stroke: rgba(${primaryDarkNew}, 0.5);
    }
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: rgb(${primaryNew}) !important;
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
  }
  .react-datepicker {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid rgba(${primaryNew}, 0.2);
    border-radius: 10px;
    box-shadow: 0px 1px 6px rgba(${primaryNew}, 0.15);
  }
  .react-datepicker__header {
    border-bottom: 1px solid rgba(${primaryNew}, 0.2);
    background: #ffffff;
    border-top-right-radius: 10px !important;
    border-top-left-radius: 10px;
  }
  .react-datepicker-popper {
    z-index: 9999;
    .react-datepicker__triangle:before {
      border-bottom-color: rgba(${primaryDarkNew}, 0.5) !important;
    }
  }
  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    color: rgb(${primaryNew});
  }
  .react-datepicker-year-header {
    padding-bottom: 8px;
  }
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
    border-width: 4px;
    border-top-color: rgba(${primaryDarkNew}, 0.5);
  }
  .react-datepicker__navigation {
    border-width: 0;
    width: 16px;
    height: 16px;
    &:focus {
      outline: none;
    }
  }
  .react-datepicker__navigation::before {
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 7px 5px 0;
    border-color: transparent rgba(${primaryDarkNew}, 0.5) transparent transparent;
  }
  .react-datepicker__navigation.react-datepicker__navigation--next::before {
    transform: rotate(-180deg) translateX(50%);
    right: 0;
  }
  .react-datepicker__navigation--years-upcoming::before {
    transform: rotate(90deg);
    top: 7px;
  }
  .react-datepicker__navigation--years-previous::before {
    transform: rotate(-90deg);
    top: 0;
  }
  .box-shadow-datepicker {
    outline: none;
    &:hover {
      box-shadow: 0px 0px 0px 2px rgba(${primaryNew}, 0.2);
    }
    &:focus {
      border-color: rgb(${primaryNew});
      box-shadow: 0px 0px 0px 2px rgba(${primaryNew}, 0.2);
    }
    box-shadow: ${props => (props.errorState ? `0px 0px 0px 2px rgba(${dangerNew}, 0.2)` : '')};
    border-color: ${props => (props.errorState ? `rgb(${dangerNew})` : '')};
  }
  .react-datepicker__day:hover,
  .react-datepicker__year-text:hover {
    border-radius: 0;
  }
  .react-datepicker__year .react-datepicker__year-text {
    width: 3.5rem;
    padding: 2px 0;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: rgba(${primaryNew}, 0.1);
    border-radius: 0;
    border: 0;
    color: rgb(${black});
    &:hover {
      background-color: rgb(${primaryNew}) !important;
      color: rgb(${white});
    }
  }
  .react-datepicker__day--keyboard-selected:hover,
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover,
  .react-datepicker__year-text--selected:hover {
    background-color: rgb(${primaryNew}) !important;
    color: rgb(${white});
    border-radius: 0;
  }
  input {
    background: rgb(${white});
    border-radius: 10px;
    font-size: 16px;
    line-height: 16px;
    font-family: 'GT-Walsheim-Pro-Regular';
    border: 1px solid rgba(${primaryNew}, 0.2);
    margin-left: auto;
    margin-right: auto;
    height: auto;
    position: relative;
    z-index: 1;
    -moz-appearance: textfield;
    padding: 13px 20px;

    &::-webkit-input-placeholder,
    input::-webkit-input-placeholder {
      ${placeholderStyles}
    }
    &::-moz-placeholder,
    input::-moz-placeholder {
      ${placeholderStyles}
    }
    &:-ms-input-placeholder,
    input:-ms-input-placeholder {
      ${placeholderStyles}
    }
    &:-moz-placeholder,
    input:-moz-placeholder {
      ${placeholderStyles}
    }

    &:disabled {
      color: rgb(${primaryNew}, 0.5) !important;
      -webkit-text-fill-color: rgb(${primaryNew}, 0.5) !important;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &.sm-picker {
    position: relative;
    img {
      width: 14px;
      right: 14px;
      position: absolute;
      top: 50%;
      margin-top: -7px;
      z-index: 1;
    }
  }
`;
DatePickerContainer.displayName = 'DatePickerContainer';
