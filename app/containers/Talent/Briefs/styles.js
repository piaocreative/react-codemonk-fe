import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Button } from 'components';
import SVG from 'react-inlinesvg';
import { white, lightBlue, primaryDarkNew, primaryNew } from 'themes/variables';
import media from 'themes/media';

export const SecondSVG = styled(SVG)`
  top: 0 !important;
  & path {
    stroke: rgb(${primaryDarkNew}, 0.5);
  }
`;

export const PathSVG = styled(SVG)`
  top: 0 !important;
  & path {
    stroke: rgb(${primaryDarkNew}, 0.5);
  }
`;

export const FilterButton = styled(Button)`
  margin-left: 30px;
  background: rgb(${white});
  font-family: 'GT-Walsheim-Pro-Regular';
  color: rgba(${primaryDarkNew});
  font-size: 14px;
  display: flex;
  align-items: center;
  min-width: auto;
  line-height: 16px;
  height: 36px;
  border: 1px solid rgba(${primaryNew}, 0.1);
  padding: 10px 15px;
  border-radius: 10px;

  &:hover,
  &:active {
    border-color: rgb(${primaryNew}, 0.5);
    outline: 2px solid rgba(${primaryNew}, 0.2);
    svg {
      path {
        stroke: rgb(${primaryNew});
      }
    }
  }

  &:active {
    background: rgb(${white});
  }
  svg {
    height: 12px;
    width: 12px;
    margin-right: 10px;

    path {
      stroke: rgb(${primaryDarkNew});
    }
  }
  .count {
    margin-left: 5px;
    color: rgb(${white});
    font-size: 12px;
    height: 20px;
    width: 20px;
    line-height: 20px;
    border-radius: 100%;
    background-color: rgb(${primaryNew});
  }
`;

export const BriefCardHeader = styled(Card)`
  margin-bottom: 2px !important;
`;

export const BriefCard = styled(Link)`
  display: block;
  background: rgb(${white});
  border-radius: 20px;
  padding: 20px !important;
  border: 1px solid rgb(${white});
  margin-bottom: 10px !important;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    border-color: ${lightBlue};
  }
  ${media.large`
    padding: 40px;
  `};
  hr {
    margin: 30px 0;
  }
  h4 {
    font-size: 18px;
    letter-spacing: 0.4px;
    color: rgb(${primaryDarkNew});
    font-family: 'GT-Walsheim-Pro-Bold';
    margin: 0;
    line-height: normal;
    ${media.medium`
      font-size: 20px;
    `};
  }
  h4 ~ span {
    ${media.medium`
      position: relative;
      top: 0;
    `};
  }
  .read-more-less-content {
    margin-bottom: 20px;
    max-width: 1246px;
  }
`;
