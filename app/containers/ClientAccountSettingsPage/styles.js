import styled from 'styled-components';
import { LinkButtonMod } from 'components';
import media from 'themes/media';

export const EditLink = styled(LinkButtonMod)`
  text-decoration: underline;
`;

export const ResendBtn = styled(LinkButtonMod)`
  font-family: 'GT-Walsheim-Pro-Regular' !important;
  font-size: 16px !important;
  margin-top: 20px;
  width: 60px;
  text-decoration: underline;

  ${media.large`
    left: 100%;
    margin-left: 30px;
    bottom: 15px;
    position: absolute;
    margin-top: 0;
    &.input-sm {
      bottom: 9px;
    }
  `};
`;
