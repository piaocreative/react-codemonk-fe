import styled from 'styled-components';
import { Card } from 'components';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { white, primaryDarkNew, primaryNew } from 'themes/variables';
import media from 'themes/media';

const w100 = 'flex: 0 0 100%; max-width: 100%;';

export const SkillIcon = styled(SVG)`
  width: 16px;
  height: 16px;
  path {
    fill: rgb(${primaryNew});
  }
`;

export const ProfileEdit = styled.div`
  position: absolute;
  top: 11px;
  right: 20px;

  svg {
    width: 16px;
    height: 16px;
    path {
      stroke: rgb(${primaryDarkNew}, 0.5);
    }
  }
  &:hover {
    svg {
      path {
        stroke: rgb(${primaryNew});
      }
    }
  }
`;

export const SkillListing = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  li {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-gap: 10px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .progress {
      max-width: 60px;
      width: 100%;
    }

    .badge-sm {
      max-width: 180px;
      white-space: normal;
      text-align: left;
    }
  }
`;

export const CircularProgressbarBlock = styled.div`
  width: 130px;
  height: 130px;
  margin: 60px auto;
`;

export const ProfileGuidlines = styled.ul`
  padding: 0;
  list-style: none;
  margin-right: 10px;
  width: 100%;
  margin-bottom: 0;

  li {
    padding: 10px 20px 10px 45px;
    background: rgb(${white});
    margin-bottom: 10px;
    border-radius: 5px;
    position: relative;
    font-family: 'GT-Walsheim-Pro-Regular';

    ${media.large`
      padding: 18px 40px 18px 65px;
    `};

    &:before {
      content: '';
      position: absolute;
      top: 16px;
      left: 24px;
      width: 7px;
      height: 12px;
      border: solid rgb(${primaryNew});
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);

      ${media.large`
        top: 24px;
        left: 40px;
        width: 8px;
        height: 15px;
        border-width: 0 3px 3px 0;
      `};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ComingSoon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  svg {
    width: 50px;
    height: 65px;
    margin-bottom: 10px;
  }
`;

export const LinkViewAll = styled(Link)`
  font-size: 16px;
  line-height: 18px;
  color: rgb(${primaryNew});
  text-decoration: none;
  font-family: 'GT-Walsheim-Pro-Regular';

  &:hover {
    text-decoration: underline;
  }
`;

export const DBcontainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  ${media.medium`
    grid-template-columns: 1fr auto;
  `};
`;
export const LeftCol = styled.div`
  order: 2;
  ${media.medium`
    order: 1;
  `};
`;
export const RightCol = styled.div`
  width: 100%;
  position: relative;
  margin-top: 50px;
  order: 1;
  ${media.medium`
    width: 300px;
    order: 2;
  `};

  hr {
    margin: 10px 0;
    border-color: rgba(${primaryNew}, 0.1);
    border-width: 1px;
  }
  ${Card} {
    padding-top: 60px;
  }
`;
export const ProfileImg = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  top: -60px;

  &.has-img {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 auto;
  }

  svg {
    width: 100px;
    height: 100px;
  }
`;

export const Column1 = styled.div`
  -webkit-box-flex: 0;
  ${w100}
  max-width: 100%;

  @media (min-width: 1366px) {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    .mb-xxl-0 {
      margin-bottom: 0;
    }
  }
  ${media.extraLarge`
    flex: 0 0 25%;
    max-width: 25%;
  `};
`;
export const Column2 = styled.div`
  -webkit-box-flex: 0;
  ${w100}

  ${media.medium`
    flex: 0 0 50%;
    max-width: 50%;
    .mb-xxl-0 {
      margin-bottom: 0;
    }
  `};

  @media (min-width: 1366px) {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  ${media.extraLarge`
    -webkit-box-flex: 0;
    flex: 0 0 41.666667%;
    max-width: 41.666667%;
  `};
`;
