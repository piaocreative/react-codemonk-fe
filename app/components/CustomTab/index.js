import styled from 'styled-components';
import { Card } from 'components';
import { Nav, NavLink } from 'reactstrap';
import { primaryDarkNew, primaryNew } from 'themes/variables';
import media from 'themes/media';

export const CustomNavTab = styled(Nav)`
  border-bottom: 0;

  & .nav-item {
    margin-right: 20px;

    ${media.medium`
      margin-right: 60px;
      .tab-sm & {
        margin-right: 40px;
      }
    `};

    &:last-child {
      margin-right: 0;
    }
  }
`;
export const CustomNavLink = styled(NavLink)`
  padding: 0 0 15px;
  .tab-sm & {
    font-size: 16px;
  }
  ${media.medium`
    padding: 0 0 24px;

    .tab-sm & {
      padding: 0 0 20px;
    }
  `};
  &:not([href]):not([tabindex]) {
    color: rgba(${primaryDarkNew}, 0.5);
  }
`;
export const NavCard = styled(Card)`
  margin-bottom: 2px;
  padding: 0 !important;
  border: 0px !important;
  ${media.large`
  padding: 31px 60px 0 !important;
`};
  &.tab-sm {
    padding: 0 !important;
    margin-bottom: 0px;
    border-bottom: 1px solid rgba(${primaryNew}, 0.1) !important;
    border-radius: 0px;
  }
  & ${CustomNavLink} {
    border: 0;
    position: relative;
    border-radius: 2px 0px 0px 2px;
    height: 35px;
    padding-bottom: 41px !important;
    color: rgba(${primaryDarkNew}, 0.5);
    font-family: 'GT-Walsheim-Pro-Regular';
    cursor: pointer;
    &.active:after,
    &:hover:after {
      content: '';
      position: absolute;
      height: 4px;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: rgb(${primaryNew});
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      z-index: 1;
    }
    span {
      font-size: 16px;
      line-height: 18px;
    }
  }
  .new-btn-theme {
    color: rgb(${primaryNew});
    font-family: 'GT-Walsheim-Pro-Regular';
    font-size: 16px;
    line-height: 18px;
    &:active {
      background: none;
    }
    svg {
      path {
        stroke: rgb(${primaryNew}, 1);
      }
    }
  }
`;
