import styled from 'styled-components';
import media from 'themes/media';
import { LinkButtonMod } from 'components';

export const EditLink = styled(LinkButtonMod)`
  text-decoration: underline;
`;

export const NoificationContent = styled.div`
  .checkmark {
    top: 4px !important;
  }
`;

export const LabelContainer = styled.div`
  ${media.medium`
    min-width: 180px;
  `};
  ${media.small`
    min-width: 150px;
  `};
  ${media.large`
    min-width: 300px;
  `};
  p {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const FieldContainer = styled.div`
  .notification-item {
    min-width: 30px;
    &:first-child {
      .checkmark {
        left: 10px !important;
      }
    }
    &:last-child {
      .checkmark {
        left: -10px !important;
      }
    }
    ${media.large`
      min-width: 45px;
      text-align: center !important;
    `};
  }
  p {
    word-break: initial;
  }
`;
