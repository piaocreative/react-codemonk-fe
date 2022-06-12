import styled from 'styled-components';
import { leftSectionBG } from 'containers/App/constants';
import { Link } from 'react-router-dom';
import { primaryNew, white } from 'themes/variables';
import media from 'themes/media';

export const LeftSectionBlock = styled.div`
  background-image: url(${leftSectionBG});
  background-color: rgba(${primaryNew}, 0.06);
  background-position: right;
`;
LeftSectionBlock.displayName = 'LeftSectionBlock';

export const RightSection = styled.div`
  background-color: rgb(${white});
  display: grid;
  overflow-y: scroll;

  .inner-content {
    padding: 30px;
    ${media.medium`
      padding: 50px 50px 30px 50px;
    `};
    ${media.large`
      padding: 100px 100px 50px 100px;
    `};
  }
`;
RightSection.displayName = 'RightSection';

export const BrandIcon = styled(Link)`
  position: absolute;
  top: 50px;
  left: 50px;
`;
BrandIcon.displayName = 'BrandIcon';

export const SignInContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  ${RightSection}, ${LeftSectionBlock} {
    height: 100vh;
  }
  ${media.medium`
    grid-template-columns: 1fr 1fr;
  `};
`;
SignInContent.displayName = 'SignInContent';
