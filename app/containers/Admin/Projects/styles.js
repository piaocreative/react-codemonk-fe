import styled from 'styled-components';
import { primaryDarkNew, black } from 'themes/variables';
import { Dropdown } from 'reactstrap';

export const SelectBox = styled.div`
  width: 130px;

  &.input-sm {
    .form-group {
      margin-bottom: 0;
    }
    .custom-selectbox,
    .custom-selectbox > div {
      font-size: 14px;
    }
  }
`;

export const SortDropdown = styled(Dropdown)`
  margin-right: 30px;
  display: flex;
  align-items: start;
  &.show {
    button.btn-secondary {
      transition: 0s all;
      color: rgb(${primaryDarkNew});
      &:hover,
      &:focus,
      &:not(:disabled):not(:disabled):active {
        box-shadow: none;
        color: rgb(${primaryDarkNew});
        background: none;
      }
      svg {
        fill: rgb(${primaryDarkNew});
        g {
          fill: rgb(${primaryDarkNew});
        }
      }
    }
  }
  button.btn-secondary {
    border: none;
    padding: 0;
    background: none;
    font-family: 'GT-Walsheim-Pro-Regular';
    color: rgba(${primaryDarkNew}, 0.5);
    letter-spacing: 0.3px;
    font-size: 16px;

    &.opacity-100 {
      color: rgb(${primaryDarkNew});
      &:hover,
      &:focus,
      &:not(:disabled):not(:disabled):active {
        color: rgb(${primaryDarkNew});
      }
      svg {
        fill: rgb(${primaryDarkNew});

        g {
          fill: rgb(${primaryDarkNew});
        }
      }
    }

    &:hover,
    &:focus,
    &:not(:disabled):not(:disabled):active {
      box-shadow: none;
      color: rgba(${primaryDarkNew}, 0.5);
      background: none;
    }

    &:not(:disabled):not(.disabled).active:focus,
    &:not(:disabled):not(.disabled):active:focus,
    .show > &.dropdown-toggle:focus {
      box-shadow: none;
    }

    svg {
      height: 16px;
      width: 16px;
      margin-right: 10px;
      fill: rgba(${primaryDarkNew}, 0.5);

      g {
        fill: rgba(${primaryDarkNew}, 0.5);
      }
    }
  }

  .dropdown-menu {
    margin-top: 10px;
    border-radius: 3px;
    padding: 13px 33px;
    min-width: 201px;
    border: 0;
    box-shadow: 0 2px 14px rgba(${black}, 0.07);
    & .dropdown-item {
      font-size: 16px;
      letter-spacing: 0.25px;
      color: rgba(${primaryDarkNew}, 0.5);
      padding: 7px 0;

      &:hover,
      &:focus {
        background-color: transparent;
      }
      &:focus {
        outline: none;
      }

      &.active {
        background: none;
        color: rgb(${primaryDarkNew});
        position: relative;

        &:before {
          content: '';
          position: absolute;
          top: 13px;
          left: -15px;
          width: 5px;
          height: 8px;
          border: solid rgb(${primaryDarkNew});
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }
    }
  }
`;
