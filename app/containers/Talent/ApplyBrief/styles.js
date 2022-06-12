import styled from 'styled-components';
import ReactModal from 'react-modal';
import { primaryNew } from 'themes/variables';
import media from 'themes/media';

export const CompleteProfileModal = styled(ReactModal)`
  &.modal-dialog {
    max-width: 600px;
  }

  .modal-header {
    padding: 0 !important;
    position: relative;

    button.modal-dismiss {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 1;
      ${media.medium`
        top: 33px;
        right: 33px;
      `};
    }
  }

  .modal-body {
    min-height: initial !important;
    overflow: hidden !important;
    max-height: initial !important;
  }

  h3 {
    margin: 20px 0;
    ${media.medium`
      margin: 30px 0;
    `};
  }

  .benefits-list {
    max-width: 440px;
    border: 1px solid rgba(${primaryNew}, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin: 20px auto;
    ${media.medium`
      margin: 30px auto;
    `};
  }

  .btn-primary {
    ${media.medium`
      margin-bottom: 30px;
    `};
  }
`;
