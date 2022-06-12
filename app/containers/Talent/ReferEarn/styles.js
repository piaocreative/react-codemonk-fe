import styled from 'styled-components';
import { primaryNew } from 'themes/variables';

export const ReferEarnCard = styled.div`
  .custom-card {
    border: 1px solid rgba(${primaryNew}, 0.1);
  }
`;

export const ReferModalBody = styled.div`
  .no-background {
    background: none;
  }
  .modal-title {
    span {
      color: rgb(${primaryNew});
    }
  }
  .paddingY12 {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  table input,
  table input:hover {
    border: none;
    box-shadow: none !important;
    border-radius: 0;
    padding: 6px 20px;
    margin: 4px auto;
  }
  .table,
  .table > :not(caption) > * > * {
    border-color: rgba(${primaryNew}, 0.2) !important;
  }
  .left-border {
    border-left: 1px solid rgba(${primaryNew}, 0.2);
  }
  div[class*='ValidationMessage'] {
    display: none;
  }
`;
