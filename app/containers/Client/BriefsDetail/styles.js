import styled from 'styled-components';
import { primaryNew, white } from 'themes/variables';
import SVG from 'react-inlinesvg';

export const ViewDetailBtn = styled.button`
  color: rgb(${primaryNew});
  font-family: 'GT-Walsheim-Pro-Regular';
  letter-spacing: 0.25px;
  padding: 0;
  position: relative;

  &:hover,
  &:focus {
    text-decoration: none;
    outline: 0;
    color: rgb(${primaryNew});
    box-shadow: none;
  }

  &:after {
    content: '';
    position: absolute;
    top: 7px;
    right: -18px;
    width: 8px;
    height: 8px;
    text-decoration: none;
    border-top: 2px solid rgb(${primaryNew});
    border-left: 2px solid rgb(${primaryNew});
    transform: rotate(-135deg);
  }
  &.card-expanded {
    &:after {
      transform: rotate(45deg);
      top: 10px;
    }
  }
`;

export const WhiteSVG = styled(SVG)`
  & path {
    stroke: rgb(${white});
  }
`;
