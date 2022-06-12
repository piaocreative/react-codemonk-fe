import styled from 'styled-components';
import { white, primaryDarkNew, primaryNew } from 'themes/variables';

export const SearchBox = styled.div`
  &.talent-search {
    @media (max-width: 991px) {
      margin-top: 10px;
    }
    &.open {
      & input {
        @media (max-width: 991px) {
          width: 100% !important;
        }
      }
    }
  }
  &.table-search {
    &.open {
      & input {
        width: 300px;
        height: 40px;
        padding: 8px 15px 8px 40px;
        background: rgba(${white});
        box-shadow: none;
        border-width: 1px;
        border-style: solid;
        & ~ svg.search-icon {
          left: 15px;
          circle,
          path {
            stroke: rgb(${primaryDarkNew});
          }
        }
      }
      button.close-btn {
        display: block;
      }
    }
    & input {
      width: 75px;
      line-height: normal;
      padding: 0 0 0 26px;
      background: none;
      transition: 0.2s all;
      font-size: 16px;
      border: 0;
      border-color: rgba(${primaryNew}, 0.1);
      border-radius: 10px !important;

      &:hover {
        box-shadow: none;
      }

      &::-webkit-input-placeholder {
        font-size: 16px;
      }

      &::-moz-placeholder {
        font-size: 16px;
      }

      &:-ms-input-placeholder {
        font-size: 16px;
      }

      &:-moz-placeholder {
        font-size: 16px;
      }
    }
  }
  svg.search-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    z-index: 2;
    transform: translateY(-50%);
    top: 50%;
    circle,
    path {
      stroke: rgba(${primaryDarkNew}, 0.5);
    }
  }
  button.close-btn {
    display: none;
    position: absolute;
    border: 0;
    background: none;
    right: 5px;
    z-index: 9;
    top: 50%;
    transform: translateY(-50%);
    outline: none;
    svg {
      width: 10px;
      height: 10px;
    }
  }
`;
