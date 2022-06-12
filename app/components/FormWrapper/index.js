import styled from 'styled-components';
import { primaryNew } from 'themes/variables';
import media from 'themes/media';

const FormWrapper = styled.div`
  input::-webkit-input-placeholder {
    opacity: 0.5;
  }
  label {
    margin-bottom: 0;
  }

  .present-text {
    min-height: 44px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    ${media.medium`
      margin-top: 10px;
    `};
    ${media.large`
        min-height: 54px;
    `};
  }

  .row + .row,
  .radio-div + .sub-form {
    margin-top: 30px;
  }
  .col-md-4 + .col-md-4,
  .col-md-6 + .col-md-6 {
    margin-top: 30px;
    ${media.medium`
        margin-top: 0px;
    `};
  }
  .form-group + .form-group,
  .row + .form-group,
  .row-spacing {
    margin-bottom: 20px;
    ${media.medium`
      margin-bottom: 30px;
    `};
  }
  .hr-280 {
    max-width: 280px;
  }
  small {
    opacity: 0.5;
    padding-left: 10px;
  }
  .form-group {
    margin-bottom: 0px;
  }
  .row {
    margin-left: -15px;
    margin-right: -15px;
  }
  .delete-button {
    display: inline-flex;
    align-items: flex-end;
    cursor: pointer;
    svg {
      opacity: 0.331240699;
    }
    &:hover small {
      color: rgb(${primaryNew});
      opacity: 1;
    }
    &:hover svg {
      fill: rgb(${primaryNew});
      opacity: 1;
    }
  }
  .col-md-4,
  .col-md-6,
  .col {
    padding-left: 15px;
    padding-right: 15px;
  }
  textarea {
    min-height: 170px;
  }
  hr {
    margin: 30px 0;
    ${media.medium`
      margin: 60px 0;
    `};
  }
  .btn-submit {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    min-width: 196px;

    ${media.medium`
      padding:14px 50px;
      font-size:22px;
      margin-left: 40px;
      margin-right: 0;
      margin-top: 0;
    `};
  }
  .tool-tip {
    background-color: red;
  }
  .link {
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    &.m-right {
      margin-right: 0px;
      ${media.medium`
        margin-right: 40px;
      `};
    }
    ${media.medium`
      font-size: 22px;
    `};
  }
  .m-link {
    margin-right: 0px;
    margin-bottom: 10px;
    ${media.medium`
      margin-right: 40px;
      margin-bottom:0px;
    `};
  }

  .left-arrow {
    &::before {
      content: '';
      height: 13px;
      width: 13px;
      padding: 3px;
      margin-left: 3px;
      margin-right: 10px;
      display: inline-block;
      border: solid rgb(${primaryNew});
      border-width: 0px 5px 5px 0px;
      transform: rotate(135deg) translateY(1px);
    }
    ${media.medium`
      font-size:22px;
    `};
  }
`;

export default FormWrapper;
