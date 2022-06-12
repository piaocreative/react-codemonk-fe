import styled from 'styled-components';
import { Input } from 'reactstrap';
import {
  primaryDarkNew,
  primaryNew,
  darkGray,
  progressModBg,
  lightGray,
  danger,
  dangerNew,
  success,
  white,
  mediumPurple,
  lightBlue,
  successNew,
} from 'themes/variables';
import media from 'themes/media';
import { Rotate } from '../Animations';

const placeholderStyles = `
  color: rgba(${primaryDarkNew}, 0.5);
  -webkit-text-fill-color: rgba(${primaryDarkNew}, 0.5);
  opacity: 1 !important;
`;

export const FormControlTextArea = styled.textarea`
  font-size: 16px;
  font-family: 'GT-Walsheim-Pro-Regular';
  padding: 13px 20px;
  line-height: 16px;
  color: rgb(${primaryNew});
  border: 1px solid rgba(${primaryNew}, 0.2);
  border-radius: 10px !important;
  min-height: 92px !important;
  resize: none;
  &:hover {
    box-shadow: 0px 0px 0px 2px rgba(${primaryNew}, 0.2);
  }
  &:focus {
    border-color: rgb(${primaryNew});
    box-shadow: 0px 0px 0px 2px rgba(${primaryNew}, 0.2);
  }
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
`;
export const FormControl = styled(Input)`
  margin-left: auto;
  margin-right: auto;
  height: auto;
  position: relative;
  z-index: 1;
  -moz-appearance: textfield;
  border-radius: 0;

  font-size: 16px;
  font-family: 'GT-Walsheim-Pro-Regular';

  padding: 13px 20px;
  line-height: 16px;
  color: rgb(${primaryDarkNew});
  -webkit-text-fill-color: rgb(${primaryDarkNew});
  border: 1px solid rgba(${primaryNew}, 0.2);
  border-radius: 10px !important;
  &:hover {
    box-shadow: 0px 0px 0px 2px rgba(${primaryNew}, 0.2);
  }
  &:focus {
    border-color: rgb(${primaryNew});
    box-shadow: 0px 0px 0px 2px rgba(${primaryNew}, 0.2);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

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
`;
FormControl.displayName = 'FormControl';

export const InputIconWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: auto;
  position: relative;
  z-index: 1;
  background: rgb(${lightGray});
  border-radius: 0;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  box-shadow: ${props => (props.status !== '' ? `0 0 0 2px ${success}` : 'none')};

  &.loading {
    &::after {
      border-top-color: ${progressModBg};
      border: 2px solid rgb(${darkGray});
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
      animation: ${Rotate} 0.7s linear infinite;
      z-index: 2;
      position: absolute;
      content: '';
      top: 50%;
      right: 20px;
      width: 20px;
      height: 20px;
    }
  }

  display: flex;
  ${media.large`
    padding: 12px 20px;
    font-size: 20px;
  `};

  .input-sm & {
    padding: 8px 15px;
    font-size: 16px;
    height: 40px;
  }

  .icon {
    position: absolute;
    right: 20px;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    z-index: 1;

    svg {
      width: 20px;
      height: 20px;
    }

    .input-sm & {
      svg {
        width: 20px;
        height: 18px;
      }
    }
  }
  input {
    height: 0;
    width: 0;
    position: absolute;
    opacity: 0;
    &:disabled,
    .form-control[readonly] {
      opacity: 0;
    }
  }

  label {
    width: 100%;
    cursor: pointer;
    .input-sm & {
      line-height: normal;
    }
  }
  .placeholder {
    opacity: 0.6;
    background-color: transparent;
    cursor: pointer;
  }
  .file-text {
    width: 90%;
    display: block;
    position: relative;
    top: 3px;
  }
`;
InputIconWrapper.displayName = 'InputIconWrapper';

export const DeleteIconFileWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(36px);
`;
DeleteIconFileWrapper.displayName = 'DeleteIconFileWrapper';

export const FormControlSelect = styled.div`
  &:after {
    content: '';
    height: 0px;
    width: 0px;
    position: absolute;
    right: 20px;
    top: 67%;
    border-top: 6px solid rgb(${mediumPurple});
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    ${media.large`
    border-top: 9px solid rgb(${mediumPurple});
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  `};
  }
  select {
    appearance: none;
    background: rgb(${lightGray});
    border-radius: 0;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    height: auto;
    box-shadow: ${props => (props.errorSelect ? `0 0 0 2px ${danger}` : ``)};
    &:focus {
      background: rgb(${lightGray});
      box-shadow: 0 0 0 2px rgb(${primaryNew});
    }

    ${media.large`
      padding: 12px 20px;
      font-size: 20px;
    `};
    .input-sm & {
      padding: 8px 15px;
      font-size: 16px;
    }
  }
`;
FormControlSelect.displayName = 'FormControlSelect';

export const FormControlRadio = styled.div`
  .sub-form + .radio-div {
    margin-top: 30px;
  }

  .radio-label {
    display: block;
    position: relative;
    padding-left: 26px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
    .input-sm & {
      letter-spacing: 0.25px;
      margin-bottom: 0;
    }
  }
  .radio-div + .radio-div {
    margin-top: 10px;
  }

  .radio-label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .radio-label .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid rgb(${primaryNew});
  }
  .radio-label input:checked ~ .checkmark {
    background-color: transparent;
  }
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  .radio-label input:checked ~ .checkmark:after {
    display: block;
  }
  .radio-label .checkmark:after {
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgb(${primaryNew});
  }

  .radioButton-block {
    border: 2px solid ${lightBlue};
    width: 100%;
    padding: 30px 30px 30px 63px;
    border-radius: 5px;
    max-width: 560px;
    margin-bottom: 10px;

    .checkmark {
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
    &.true {
      border-color: rgb(${primaryNew});
      background: rgba(76, 0, 255, 0.08);
    }
  }

  .radio-sm {
    font-size: 16px;
    letter-spacing: 0.25px;
    color: rgb(${darkGray});
    padding-left: 30px;
    margin-bottom: 8px !important;
    .checkmark {
      top: 18%;
    }
  }
`;
FormControlRadio.displayName = 'FormControlRadio';

export const FormControlWrapper = styled.div`
  position: relative;

  &.loading {
    &::after {
      position: absolute;
      content: '';
      top: 50%;
      right: 20px;
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
      animation: ${Rotate} 0.7s linear infinite;
      z-index: 2;
      width: 20px;
      height: 20px;
      border: 2px solid rgb(${darkGray});
      border-top-color: ${progressModBg};
    }
  }

  &.request-error,
  &.has-error {
    ${FormControl}, ${FormControlTextArea} {
      border-color: rgb(${dangerNew});
      box-shadow: 0px 0px 0px 2px rgba(${dangerNew}, 0.2);
    }
  }

  &.request-success,
  &.success {
    &::before {
      position: absolute;
      content: '';
      top: 50%;
      right: 20px;
      height: 20px;
      width: 20px;
      background: rgb(${successNew});
      transform: translateY(-50%);
      z-index: 2;
      border-radius: 50%;
    }
    &::after {
      position: absolute;
      content: '';
      width: 10px;
      height: 6px;
      border-top: 2px solid rgb(${white});
      border-right: 2px solid rgb(${white});
      right: 25px;
      top: 47%;
      transform: translateY(-50%) rotate(135deg);
      z-index: 3;
    }
  }
  &.no-icon {
    &:before,
    &:after {
      display: none;
    }
  }
`;
FormControlWrapper.displayName = 'FormControlWrapper';

export const ValidationMessage = styled.div`
  position: absolute;
  color: ${danger};
  font-size: 10px;
  line-height: normal;
  left: 0;
  top: calc(100% + 5px);
  ${media.large`
    font-size: 12px;
  `};
`;
ValidationMessage.displayName = 'ValidationMessage';

export const CheckBoxContainer = styled.div`
  margin-bottom: 10px;
  .input-sm & {
    margin-bottom: 0;
  }
  .checkbox-label {
    display: inline-block;
    position: relative;
    padding-left: 33px;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .input-sm & {
      letter-spacing: 0.25px;
      font-size: 16px;
    }
    ${media.large`
      font-size:22px;
    `};
  }
  .small {
    display: flex;
    align-items: flex-end;
    padding-left: 25px;
    font-size: 12px;
    ${media.medium`
      font-size:16px;
    `};
  }
  &:last-child {
    margin-bottom: 0px;
  }
  .checkbox-label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkbox-label .checkmark {
    position: absolute;
    top: 3px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: transparent;
    border: 1px solid rgb(${primaryNew});
    border-radius: 2px;
  }
  .small .checkmark {
    height: 15px;
    width: 15px;
    top: 2px;
    ${media.medium`
      top: 5px;
    `};
  }

  .checkbox-label input:checked ~ .checkmark {
    background-color: rgb(${primaryNew});
    border: 1px solid rgb(${primaryNew});
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  .checkbox-label input:checked ~ .checkmark:after {
    display: block;
  }

  .checkbox-label .checkmark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid rgb(${white});
    border-width: 0 2.2px 2.2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .small .checkmark:after {
    left: 4px;
    top: 1px;
    height: 8px;
  }

  &.checkbox-block {
    &.true {
      label {
        border-color: rgb(${primaryNew});
        background: rgba(76, 0, 255, 0.08);
      }
    }
    label {
      border: 2px solid ${lightBlue};
      width: 100%;
      padding: 30px 30px 30px 63px;
      border-radius: 5px;

      .checkmark {
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
CheckBoxContainer.displayName = 'CheckBoxContainer';
