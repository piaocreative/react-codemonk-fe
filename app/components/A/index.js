/**
 * A link to a certain page, an anchor tag
 */

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { primaryNew, primaryNewHover, white } from 'themes/variables';

export const A = styled.a`
  color: rgb(${primaryNew});
  font-family: 'GT-Walsheim-Pro-Regular';
  font-size: 16px;
  text-decoration: none;

  &.sm {
    font-size: 14px;
    letter-spacing: -0.02em;
  }

  &[disabled] {
    pointer-events: none;
  }
  &.pdf-icon {
    &[disabled] {
      opacity: 0.5;
    }
  }
  &:hover {
    color: rgb(${primaryNew});
  }
`;

export const LinkMod = styled(Link)`
  color: rgb(${white});
  border-radius: 34px;
  min-width: 190px;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 6px 45px;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  transition: background 0.3s ease;
  border: none;
  text-align: center;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;

  &.btn-primary {
    background: rgb(${primaryNew});
    &:disabled {
      &:hover {
        background: rgb(${primaryNew});
      }
    }
    &:hover {
      background: rgba(${primaryNewHover});
      text-decoration: none;
    }
    &:active {
      background-color: rgb(${primaryNew});
    }
  }
`;
