import styled from 'styled-components';
import media from 'themes/media';
import { FormControlWrapper } from '../Input';

export const OnboardingForm = styled.div`
  label {
    margin-bottom: 0;
  }
  label + .form-control,
  label + ${FormControlWrapper} {
    margin-top: 5px;
  }
  .form-group {
    margin-bottom: 0px;
  }
  .form-group + .form-group {
    margin-top: 20px;
    ${media.large`
      margin-top: 30px;
    `};
  }
  textarea {
    min-height: 170px;
  }
  hr {
    margin: 30px 0;
    ${media.large`
      margin: 60px 0;
    `};
  }
`;

export const OnBoardingFormBody = styled.div`
  .layout-v2 & {
    max-width: 360px;
    margin: 30px auto 0;
    ${media.medium`
      margin: 30px 0 0;
    `};
  }
  .layout-v1 & {
    max-width: 560px;
    margin: 30px auto 0;
    text-align: left;
  }

  ${media.large`
    .layout-v2 & {
      margin: 50px 0 0;
    }
    .layout-v1 & {
      margin: 65px auto 0;
    }
  `};
`;
