import styled from 'styled-components';
import media from 'themes/media';

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 92px 0 0 260px;

  ${media.extraLarge`
    padding: 92px 0 0 260px;
  `};

  @media (max-width: 1199px) {
    padding: 92px 0 0 100px;
  }
  @media (max-width: 767px) {
    padding: 92px 0 0 0;
  }

  &.auth-layout {
    padding: 140px 0px 60px;
  }

  .layout-v2 & {
    padding: 0;
    &.auth-layout {
      flex: 1 1 0%;
    }

    ${media.medium`
      margin-left: 270px;
      &.auth-layout {
        padding: 92px 0 0;
      }
    `};
    ${media.large`
      margin-left: 361px;
    `};
  }
`;

export default MainContent;
