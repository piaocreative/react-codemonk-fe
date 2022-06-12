import styled from 'styled-components';
import { ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { white, primaryDarkNew, darkGray, primaryNew, lightGray, lightBlue } from 'themes/variables';
import media from 'themes/media';

export const ButtonGroupWrapper = styled(ButtonGroup)`
  .btn-secondary {
    background: rgb(${lightGray});
    color: rgb(${primaryDarkNew});
    border-color: ${lightBlue};
    border-radius: 5px;
    outline: none;
    box-shadow: none;
    font-size: 12px;
    line-height: 14px;
    padding: 8px 9px;

    ${media.medium`
      font-size: 14px;
      line-height: 16px;
      padding: 8px 15px;
    `};

    &:not(:disabled):not(.disabled).active:focus,
    &:not(:disabled):not(.disabled):active:focus,
    .show > &.dropdown-toggle:focus {
      box-shadow: none;
    }
    &:not(:disabled):not(.disabled).active,
    &:not(:disabled):not(.disabled):active,
    .show > &.dropdown-toggle {
      border-color: ${lightBlue};
      background: ${lightBlue};
      color: rgb(${primaryDarkNew});
    }
  }
`;
export const BoxLink = styled(Link)`
  border-radius: 5px;
  border: 2px solid #f3f2f7;
  padding: 20px;
  margin-bottom: 30px;
  text-decoration: none;
  ${media.medium`
    padding: 30px;
  `};
  &:hover {
    text-decoration: none;
    border-color: ${lightBlue};
  }
  h2 {
    color: #262626;
    font-size: 26px;
    line-height: 37px;
    font-family: 'GT-Walsheim-Pro-Bold';
    margin-bottom: 0;
    ${media.medium`
      font-size: 36px;
      line-height: 47px;
    `};
  }
  svg.icon {
    width: 20px;
    height: 20px;
    margin-right: 20px;
    position: relative;
    top: 8px;
    ${media.medium`
      width: 30px;
      height: 30px;
    `};
  }
  svg.arrow {
    width: 6px;
    height: 10px;
  }
  svg.arrow,
  svg.arrow g {
    fill: rgba(${darkGray}, 0.5);
  }
  svg.icon,
  svg.icon path {
    stroke: rgb(${primaryNew});
  }
  p {
    font-size: 16px;
    line-height: 30px;
    color: rgb(${primaryDarkNew}, 0.5);
    ${media.medium`
      font-size: 20px;
      line-height: 36px;
    `};
  }
`;

export const CardLink = styled(Link)`
  background: rgb(${white});
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 5px;
  margin-bottom: 30px;
  text-decoration: none;
  ${media.large`
    margin-bottom: 0;
  `};
  &:hover {
    text-decoration: none;
    h4 {
      color: rgb(${primaryNew});
    }
    svg.arrow,
    svg.arrow g {
      fill: rgb(${primaryNew});
    }
  }
  svg.arrow {
    width: 6px;
    height: 10px;
  }
  svg.arrow,
  svg.arrow g {
    fill: rgba(${darkGray}, 0.5);
  }
  h3 {
    color: rgb(${primaryDarkNew});
    font-size: 24px;
    line-height: 40px;
    font-family: 'GT-Walsheim-Pro-Bold';
  }
  .count-list {
    display: flex;
    margin-top: 40px;
    .count-list-item {
      flex: 1;
      padding-left: 15px;
      border-left: 2px solid rgb(${lightGray});
      ${media.extraLarge`
        padding-left: 30px;
      `};
      &:first-child {
        padding-left: 0;
        border-left: 0;
      }
      p {
        font-size: 14px;
        line-height: 26px;
        color: rgb(${primaryDarkNew}, 0.7);
        margin-bottom: 0;
        ${media.extraLarge`
          font-size: 16px;
          line-height: 28px;
        `};
      }
    }
  }
`;
