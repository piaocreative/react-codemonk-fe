import { css } from 'styled-components';
import { primaryNew, primaryDarkNew, primaryNewHover, white } from 'themes/variables';
import { Rotate } from '../Animations';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'GT-Walsheim-Pro-Bold';
  color: rgb(${white});
  border-radius: 23px;
  position: relative;
  transition: all 0.3s ease;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  line-height: 18px;
  height: 46px;
  min-width: 120px;

  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    background-color: rgb(${primaryNew});
  }
  &.loading {
    opacity: 0.7;
    text-indent: -9999px;

    &.btn-sm {
      min-width: 105px;
    }

    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: rgb(${white});
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-50%, -50%) rotate(0deg);
      border-radius: 50%;
      animation: ${Rotate} 0.7s linear infinite;
    }
  }

  &.btn-primary {
    background: rgb(${primaryNew});
    box-shadow: 0px 4px 10px rgba(${primaryNew}, 0.25);
    &:hover {
      background: rgba(${primaryNewHover});
      box-shadow: none;
    }
    &:active {
      background-color: rgb(${primaryNew});
    }
    &.btn-plus {
      svg {
        g {
          fill: rgb(${white});
        }
      }
    }
  }

  &.btn-sm {
    font-size: 14px;
    line-height: 16px;
    min-width: auto;
    padding: 10px 20px;
    height: auto;
    font-family: 'GT-Walsheim-Pro-Medium' !important;
  }

  &.btn-link {
    color: rgb(${primaryNew});
    background: none;
    font-size: 16px;
    line-height: 18px;
    padding: 0;
    min-width: auto;
    box-shadow: none;
    text-decoration: none;
    height: auto;
    font-family: 'GT-Walsheim-Pro-Regular';
    &.text-bold {
      font-family: 'GT-Walsheim-Pro-Bold';
    }
    &.text-medium {
      font-family: 'GT-Walsheim-Pro-Medium';
    }
    &.large-text {
      font-size: 18px;
    }

    &:hover,
    &:not(:disabled):not(.disabled):active:focus {
      background: transparent;
      color: rgb(${primaryNew});
      box-shadow: none;
    }
    &:disabled {
      background: transparent;
    }
  }

  &.btn-icon {
    color: rgb(${primaryDarkNew}, 0.5);
    display: flex;
    align-items: center;
    svg {
      &:not(.auto-svg) {
        width: 16px;
        height: 16px;
      }
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
    &.text-primary {
      svg {
        path {
          stroke: rgb(${primaryNew});
        }
      }
    }
  }
  &.btn-outline {
    color: rgb(${primaryNew});
    border: 2px solid rgba(${primaryNew}, 0.2);
    font-family: 'GT-Walsheim-Pro-Bold';
    border-radius: 23px;
    background: rgb(${white});
    font-size: 16px;
    line-height: 18px;
    padding: 14px 30px;

    &.btn-sm {
      font-size: 14px;
      line-height: 16px;
      padding: 10px 20px;
      font-family: 'GT-Walsheim-Pro-Medium';
    }

    &.draft-btn {
      min-width: 102px;
      padding: 5px;
    }
    &:hover,
    &:active {
      border-color: rgba(${primaryNew});
    }
  }

  &.btn-plus {
    &.top-0 {
      top: 0;
    }

    svg {
      & g {
        fill: rgb(${primaryNew});
      }
    }

    &.btn-sm {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &:disabled,
  &:hover:disabled {
    box-shadow: none;
    background: rgba(${primaryNew}, 0.3);
    cursor: not-allowed;
  }
`;
buttonStyles.displayName = 'buttonStyle';

export default buttonStyles;
