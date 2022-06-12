import styled from 'styled-components';
import { Card } from 'components';
import { primaryDarkNew } from 'themes/variables';
import media from 'themes/media';

export const StepCard = styled(Card)`
  padding: 20px !important;
  ${media.large`
      padding: 60px !important;
  `};
`;
export const HR = styled.hr`
  margin: 20px 0 !important;

  ${media.large`
    margin: 60px 0 !important;
  `};
`;
export const ProjectURL = styled.div`
  padding-left: 35px;
`;

export const IntroStepBlock = styled.div`
  p {
    font-size: 18px;
    letter-spacing: 0.38px;
    margin-bottom: 42px;
    color: rgb(${primaryDarkNew});

    ${media.large`
       font-size: 24px;
    `};
  }
`;
export const RequirementList = styled.ol`
  margin-bottom: 42px;
  li {
    color: rgb(${primaryDarkNew});
    font-size: 18px;
    letter-spacing: 0.38px;
    margin-bottom: 8px;

    ${media.large`
       font-size: 24px;
    `};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const IntroText = styled.div`
  max-width: 1005px;
  margin: 0 auto;
  p {
    font-size: 24px;
    letter-spacing: 0.38px;
    line-height: 40px;
  }
`;
