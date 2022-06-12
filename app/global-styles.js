import { createGlobalStyle } from 'styled-components';
import { primaryDarkNew, successNew, white, danger, success, primaryNew, black, darkGray, lightGray } from 'themes/variables';

// Import Fonts

import GTWalsheimProMediumWOFF from 'fonts/GT-Walsheim-Pro-Medium.woff';
import GTWalsheimProMediumWOFF2 from 'fonts/GT-Walsheim-Pro-Medium.woff2';
import GTWalsheimProMediumEOT from 'fonts/GT-Walsheim-Pro-Medium.eot';
import GTWalsheimProMediumSVG from 'fonts/GT-Walsheim-Pro-Medium.svg';

import GTWalsheimProBoldWOFF from 'fonts/GT-Walsheim-Pro-Bold.woff';
import GTWalsheimProBoldWOFF2 from 'fonts/GT-Walsheim-Pro-Bold.woff2';
import GTWalsheimProBoldEOT from 'fonts/GT-Walsheim-Pro-Bold.eot';
import GTWalsheimProBoldSVG from 'fonts/GT-Walsheim-Pro-Bold.svg';

import GTWalsheimProRegularWOFF from 'fonts/GT-Walsheim-Pro-Regular.woff';
import GTWalsheimProRegularWOFF2 from 'fonts/GT-Walsheim-Pro-Regular.woff2';
import GTWalsheimProRegularEOT from 'fonts/GT-Walsheim-Pro-Regular.eot';
import GTWalsheimProRegularSVG from 'fonts/GT-Walsheim-Pro-Regular.svg';

import media from './themes/media';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'GT-Walsheim-Pro-Regular';
    src: url(${GTWalsheimProRegularEOT});
	  src: url('${GTWalsheimProRegularEOT}?#iefix') format('embedded-opentype'),
		url(${GTWalsheimProRegularWOFF2}) format('woff2'),
		url(${GTWalsheimProRegularWOFF}) format('woff'),
    url('${GTWalsheimProRegularSVG}#GT Walsheim Pro Regular') format('svg');
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    unicode-range: U+0020-00FE;
  }

  @font-face {
    font-family: 'GT-Walsheim-Pro-Bold';
    src: url(${GTWalsheimProBoldEOT});
	  src: url('${GTWalsheimProBoldEOT}?#iefix') format('embedded-opentype'),
		url(${GTWalsheimProBoldWOFF2}) format('woff2'),
		url(${GTWalsheimProBoldWOFF}) format('woff'),
    url('${GTWalsheimProBoldSVG}#GT Walsheim Pro Bold') format('svg');
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    unicode-range: U+0020-00FE;
  }

  @font-face {
    font-family:'GT-Walsheim-Pro-Medium';
    src: url(${GTWalsheimProMediumEOT});
	  src: url('${GTWalsheimProMediumEOT}?#iefix') format('embedded-opentype'),
		url(${GTWalsheimProMediumWOFF2}) format('woff2'),
		url(${GTWalsheimProMediumWOFF}) format('woff'),
		url('${GTWalsheimProMediumSVG}#GT Walsheim Pro Medium') format('svg');
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    unicode-range: U+0020-00FE;
  }

  .adroll_consent_persistent_icon {
    position: fixed !important;
    opacity: 0 !important;
  }


  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'GT-Walsheim-Pro-Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 16px;
    ${media.large`
      font-size: 18px;
    `};
    ${media.extraLarge`
      font-size: 20px;
    `};
  }

  body.fontLoaded {
    font-family: 'GT-Walsheim-Pro-Regular', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100vh;
    min-width: 100%;
    display: flex;
    flex-direction: column;

    &.bg-transparent {
      > div {
        background: transparent;
      }
    }
   
   > div{
      display: flex;
      flex-direction: column;
      flex: 1;
   }
  }

  .flex-1 {
    flex: 1;
  }
  .flex-0 {
    flex: 0;
  }

  p,
  label {
    line-height: 1.5em;
  }

  .optional-text {
    font-family: 'GT-Walsheim-Pro-Regular';
    font-size: 16px;
    color: rgb(108, 117, 125);
    opacity: 0.5;
    padding-left: 10px;
    
    .input-sm & {
      font-size: 14px;
      padding-left: 5px;
    }
  }

  .tooltip-inner {
    padding: 15px;
    font-size: 14px;
    line-height: 16px;
    box-shadow: 0 2px 14px 4px rgba(${black}, 0.07);
    background-color: rgb(${primaryDarkNew});
    color:  rgb(${white});
    border-radius: 10px;
    max-width: 204px;
  }

  .arrow {
    &:after,
    &:before {
      border-top-color:  rgb(${white}) !important;
    }
  }

  .text-medium {
    font-family: 'GT-Walsheim-Pro-Regular' !important;
  }

  .input-sm .custom-multi-select, .input-sm .custom-multi-select * {
    font-size: 16px;
  }

  /* React data table head and data row style */
  .rdt_TableHeadRow,
  .rdt_TableRow {
    border-bottom-color: rgba(${primaryNew}, 0.1) !important;
  }
  /* React data table head style */
  .rdt_TableHead {
    .rdt_TableCol:first-child {
      padding-left: 40px;
    }
    .rdt_TableCol:last-child {
      padding-right: 40px;
    }
  }
  
  ${media.medium`
    .hide-action-items {
      .rdt_TableBody {
        .rdt_TableRow {
          .rdt_TableCell {
            .action-items {
              display: none;
            }
          }
          &:hover {
            .rdt_TableCell {
              .action-items {
                display: flex;
              }
            }
          }
        }
      }
    }
  `};

  /* RC Range slider */
  .rc-slider-container {
    width: 200px;
    position: relative;

    .range-value{
      position: absolute;
      bottom: 2px;
      font-size: 12px;
    
      &.min-value{
        left: 17px; 
      }
      &.max-value{
        right: 9px; 
      }
    }

    .rc-slider-track{
      background-color: rgb(${primaryNew});
    }
    .rc-slider-handle{
      border-color: rgb(${primaryNew});
       &:hover,
       &.rc-slider-handle-click-focused:focus{
        border-color: rgb(${primaryNew});
      }
      &.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging{
        border-color: rgb(${primaryNew});
        box-shadow: 0 0 0 5px rgb(76,0,255, 0.5);
      }
    }

  }

  .file-uploader {
      display: inline-block;
      box-sizing: border-box;
      text-decoration: none;
      cursor: pointer;
      outline: 0;
      font-weight: bold;
      border-radius: 34px;
      transition: background 0.3s ease;
      border: 2px solid rgb(${primaryNew});
      font-size: 16px;
      min-width: 167px;
      padding: 10px;
      background: none;
      color: rgb(${primaryNew});
      position: relative;
      text-align: center;

      &:hover {
        background: rgb(${primaryNew});
        color: rgb(${white});
      }

      input {
        position: absolute;
        left: 0;
        right: 0;
        top: -8px;
        bottom: 0;
        cursor: pointer;
        opacity: 0;
        width: 100%;
        font-size: 0;
      }
    }

  /* Style Rules for React Modal */
  .ReactModal__Overlay {
    background-color: rgba(46,46,46,0.9) !important;
    z-index: 1001 !important;
  
    .modal-dialog {
      max-width: 738px;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
      right: 15px;
      outline: none;

      ${media.large`
        max-width: 870px;
      `};

      &.modal-sm {
        max-width: 450px;
        .modal-content {
          .modal-body {
            min-height: auto;
          }
        }
      }

      .modal-content {
        border-radius: 30px;
        border: 0;

        .modal-body {
          padding:30px;
          max-height: 450px;
          min-height: 450px;
          overflow: auto;

          ${media.extraLarge`
            max-height: 558px;
          `};
        }
        .modal-header {
          padding:30px 30px 20px;
          border-bottom: none;
          h3 {
            font-size: 20px;
            font-family: 'GT-Walsheim-Pro-Bold';
            color: rgba(${darkGray});
          }
          .modal-dismiss {
            background: none;
            border: 0;
            padding: 0;
            outline: none;
            img {
              width: 16px;
              height: 16px;
            }
          }
        }
        .modal-footer {
          border-top: 1px solid rgba(${primaryNew}, 0.1);
          justify-content: flex-start;
          padding: 13px 30px;
          & > * {
            margin:0;
          }
        }
      }

      &.confirmation-modal {
        max-width: 400px;
        .modal-content {
          .modal-body {
            max-height: initial;
            min-height: initial;
          }
        }
      }
      &.info-modal {
        max-width: 600px;
        .modal-content {
          .modal-body {
            max-height: initial;
            min-height: initial;

            p {
              font-size: 18px;
            }
          }
        }
      }
      &.secondary-modal {
        max-width: 396px;
        .modal-content {
          .modal-header {
            &.modal-close {
              padding: 0;
              border: 0;
              position: absolute;
              right: 30px;
              top: 24px;
              z-index: 1;
            }
          }
          .modal-body {
            padding: 30px;
            max-height: initial;
            min-height: initial;

            h4 {
              margin-bottom: 30px;
            }
          }
        }
      }
    }
  }
  
  .text-ellipsis {
    display: inline-block !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .disable-calendar {
    opacity: 0.5;
    pointer-events: none;
  }

  .eye-btn {
    height: 100%;
    background: transparent;
    position: absolute !important;
    right: 0;
    top: 50%;
    z-index: 3;
    transform: translateY(-50%);
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;

    svg {
      & path {
        stroke: rgba(${primaryDarkNew},0.5);
      }
    }


    &:focus,&.focus{
      box-shadow: none;
    }
  }

  .input-disabled {
    .form-control:disabled, input:disabled{
      color: rgb(${primaryDarkNew},0.5) !important;
      -webkit-text-fill-color: rgb(${primaryDarkNew},0.5) !important;
    }
  }

  .form-control {
    color: rgb(${primaryDarkNew});
    -webkit-text-fill-color: rgb(${primaryDarkNew});
    opacity: 1;
  }
  .form-control:disabled, .form-control[readonly]{
    background-color: rgb(${lightGray});
    cursor: default;
  }

  .input-sm .custom-selectbox {
    font-size: 16px;
  }

  .badge-primary {
    background: rgba(76,0,255,0.1);
    color: rgb(${primaryNew});
    padding: 9px 12px;
    min-width: 125px;
    font-size: 16px;
    line-height: normal;
    font-family: 'GT-Walsheim-Pro-Bold';

    ${media.medium`
      min-width: 144px;
      font-size: 20px;
    `};
}

  .input-sm .public-DraftEditorPlaceholder-root {
    font-size: 16px;
  }

  /* Style Rules for pagination */
  .rc-pagination {
    position: relative;
    margin-top: 30px !important;

    &.mt-0 {
      margin-top: 0 !important;
    }
    text-align: right;
    li {
      font-family: 'GT-Walsheim-Pro-Regular';
      font-size: 16px;
      margin-right: 14px;
      color: rgba(${primaryDarkNew}, 0.5);
      &:last-child{
        margin-right: 0;
      }
      &.rc-pagination-disabled {
        opacity: 0.3;
      }
      &.rc-pagination-options {
        margin-left: 0;
      }
      &.rc-pagination-prev {
        color: rgb(${primaryNew});
        &:before {
          content: '';
          height: 8px;
          width: 8px;
          padding: 3px;
          margin-right: 5px;
          display: inline-block;
          border: solid rgb(${primaryNew});
          border-width: 0px 2px 2px 0px;
          transform: rotate(135deg) translateY(2px);
          line-height: 16;
        }
      }
      &.rc-pagination-next {
        color: rgb(${primaryNew});
        &:after {
          content: '';
          height: 8px;
          width: 8px;
          padding: 3px;
          margin-left: 8px;
          display: inline-block;
          border: solid rgb(${primaryNew});
          border-width: 0px 2px 2px 0px;
          transform: rotate(-43deg) translateY(-2px);
          line-height: 16;
        }
      }
    }
    .rc-pagination-item {
      min-width: auto;
      height: 30px;
      border: 0;
      background: transparent;
      font-family: 'GT-Walsheim-Pro-Regular';
      color: rgba(${primaryDarkNew}, 0.5);
      font-size: 16px;
      line-height: 30px;

      &.rc-pagination-item-active {
        a {
          border-radius: 100%;
          height: 30px;
          width: 30px;
          background: rgb(${primaryNew});
          color: rgb(${white});
        }
      }
    }
    .rc-pagination-next {
      margin-right: 0;
    }
  }


  /* Style Rules for Toast Notifications */
  .Toast > div {
    box-shadow: 0 0 4px 4px rgba(0,0,0,0.1);
    padding: 15px 40px 15px 30px !important;
    font-size: 14px;
    margin-bottom:0;
    color: #4a5863;
    background: #ffffff;
    text-align:center;
    position: relative;
    margin: 10px 0;
    ${media.medium`
      padding: 15px 74px 15px 30px !important;
    `};
    ${media.large`
      font-size:18px;
    `};
  }

  .Toast > div.Toast-Error , .Toast > div.Toast-error {
    border-bottom: 3px solid ${danger}; 
  }


  .Toast > div.Toast-Success , .Toast > div.Toast-success {
    border-bottom: 3px solid ${success}; 
  }

  .Toast a, .Toast a:hover{
    color:#333333;
    text-decoration:underline;
    font-weight:600;
  }
  .Toast button[aria-label="close"], .post-dismiss {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    font-weight: lighter;
    opacity: 0.3;
    width: 25px;
    height: 24px;
    cursor: pointer;
    text-indent: -9999px;
    transform:scale(0.7);
    border: none;
    outline: none;
    background: none;
  }
  .post-dismiss{
    top:15px;
  }
  .Toast button[aria-label="close"]:before, .Toast button[aria-label="close"]:after, .post-dismiss:before, .post-dismiss:after {
      position: absolute;
      top: 11px;
      left: 0px;
      transform: rotate(45deg);
      cursor: pointer;
      font-family: circular-Book;
      content: "";
      width: 25px;
      height: 2px;
      background: rgb(${black});
  }

  .Toast button[aria-label="close"]:after{
    transform: rotate(-45deg);
  }
  .Toast button[aria-label="close"]:hover, .post-dismiss:hover{
    opacity:0.5;
  }
  .Toastify__toast-container {
    max-width:852px ;
    width:100% !important;
  }
  .Toastify__toast {
    margin: 15px 15px 0 !important;
  }

  /* React Time Picker Styles */
  .react-time-picker {
    .react-time-picker__wrapper {
      border: 1px solid rgba(${primaryNew}, 0.2);
      font-size: 16px;
      padding: 10px 15px;
      border-radius: 10px;

      .react-time-picker__inputGroup {
        min-width: 60px;
        text-align: center;
        input {
          outline: none;

          &::-webkit-input-placeholder {
            color: rgba(${primaryDarkNew}, 0.5);
            -webkit-text-fill-color: rgba(${primaryDarkNew}, 0.5);
            font-family: 'GT-Walsheim-Pro-Regular';
          }
          &::-moz-placeholder {
            color: rgba(${primaryDarkNew}, 0.5);
            -webkit-text-fill-color: rgba(${primaryDarkNew}, 0.5);
            font-family: 'GT-Walsheim-Pro-Regular';
          }
          &:-ms-input-placeholder {
            color: rgba(${primaryDarkNew}, 0.5);
            -webkit-text-fill-color: rgba(${primaryDarkNew}, 0.5);
            font-family: 'GT-Walsheim-Pro-Regular';
          }
          &:-moz-placeholder {
            color: rgba(${primaryDarkNew}, 0.5);
            -webkit-text-fill-color: rgba(${primaryDarkNew}, 0.5);
            font-family: 'GT-Walsheim-Pro-Regular';
          }
        }
      }
    }
    .react-time-picker__clear-button {
      display: none;
    }
  }

  .cursor-pointer {
    cursor: pointer;
  }

  /* Bootstrap classes update */

  .text-primary {
    color:rgb(${primaryNew}) !important; 
  }
  .text-success {
    color: rgb(${successNew}) !important; 
  }


  /* Bootstrap 5 fixing classes */
  .form-group {
      margin-bottom: 1rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
  hr {
      border-top: 1px solid rgba(${primaryNew}, 0.1);
      opacity: 1;
      background-color: transparent;
  }

  /* Cropper Styles */
  .cropper-modal {
    opacity: 0.6;
  }
  .cropper-view-box {
    outline: none !important;
    border-radius: 10px;
  }
  
  .cropper-point,
  .cropper-line {
    background: transparent !important;
  }
  .cropper-face {
    border-radius: 10px;
  }

  /* Tooltip Styles */
  .tooltip {
    &.bs-tooltip-right {
      padding-left: 10px;
       .arrow {
          left: 5px;
       }
    }
    &.bs-tooltip-left {
      padding-right: 10px;
       .arrow {
          right: 5px;
       }
    }
    &.bs-tooltip-bottom {
      padding-top: 10px;
       .arrow {
          top: 5px;
       }
    }
    .arrow {
      bottom: 3px;
      width: 10px;
      height: 10px;
      background-color: rgb(${primaryDarkNew});
      position: absolute;
      transform: rotate(45deg);
    }
  }

  .slick-list {
    padding:  0 10px !important;
  }
  
`;

export default GlobalStyle;
