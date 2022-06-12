import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'components';
import { Dropdown } from 'reactstrap';
import { PreferencesList } from 'containers/MyProfilePage/styles';
import { white, gradient, primaryDarkNew, infoGradientRight, primaryNew, lightPurple } from 'themes/variables';
import media from 'themes/media';

export const FilterContainer = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    bottom: 0;
    margin: 0 !important;
    overflow-y: auto;
    z-index: 9;
    left: 0;
    right: 0;
    background: rgba(${white});
    display: none;

    &.show-filter {
      display: block;
    }
  }
`;
export const FilterFooter = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 !important;
  z-index: 10;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255);
  padding: 10px;
  text-align: center;
  border-top: 1px solid ${lightPurple};
  button {
    background: none;
    border: 0;
  }
`;
export const SearchBox = styled.div`
  &.table-search {
    & input {
      max-width: 300px;
      width: 300px;
    }
  }
  input {
    font-size: 14px;
    line-height: 16px;
    padding: 9px 15px;
  }
  input:focus ~ svg {
    circle,
    path {
      stroke: rgb(${primaryNew});
    }
  }
  svg.search-icon {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 1;
    transform: translateY(-50%);
    top: 50%;
  }
  .skill-search & {
    width: 300px;
    input {
      padding-left: 40px;
    }

    svg.search-icon {
      left: 15px;
      circle,
      path {
        stroke: rgba(${primaryDarkNew}, 0.5);
      }
    }

    input.has-value ~ .close-btn {
      display: block;
    }
    .close-btn {
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
  }
`;
export const SearchOptions = styled.ul`
  padding: 10px 5px;
  height: 170px;
  background: #fff;
  overflow-y: auto;
  margin: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 3;
  border: 1px solid rgba(${primaryNew}, 0.1);
  margin-top: 2px;
  list-style: none;
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(${primaryDarkNew}, 0.08);

  &.autocomplete-dropdown-container {
    height: 230px;
  }

  &.no-options {
    height: auto;
    li {
      padding: 0;
      opacity: 0.5;
      &:hover {
        background: transparent;
      }
    }
  }

  li {
    display: flex;
    font-size: 14px;
    line-height: 16px;
    padding: 10px 10px 10px 34px;
    color: rgb(${primaryDarkNew});
    background: transparent;
    border-radius: 4px;
    position: relative;

    svg {
      position: absolute;
      left: 10px;
      top: 50%;
      width: 14px;
      height: 14px;
      z-index: 1;
      transform: translateY(-50%);
      circle,
      path {
        stroke: rgba(${primaryDarkNew}, 0.3);
      }
    }

    &:hover,
    &.option-active {
      background: rgb(${primaryNew}, 0.05);
    }
    ${media.large`
      font-size: 16px;
    `};
    &.suggestion-item {
      font-size: 16px;
    }
  }
`;

export const OutlineButton = styled(Button)`
  max-width: 93px;
  /* auto to 93px to fix apply button issue in quotes */
  min-width: 93px;
  width: 100%;
  padding: 2px;
  height: 40px;
  ${gradient};
  & span {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 35px;
    padding: 0 10px;
    font-size: 16px;
    color: rgb(${primaryDarkNew});
    background: rgb(${white});
    ${media.large`
      padding: 0 15px;
    `};
  }
  &:hover {
    & span {
      ${gradient};
      color: rgb(${white});
    }
  }
`;
export const TalentCard = styled(Link)`
  display: block;
  background: rgb(${white});
  padding: 20px;
  margin-bottom: 30px !important;
  text-decoration: none;
  border: 1px solid rgba(${primaryNew}, 0.1);
  border-radius: 10px;

  &:hover {
    text-decoration: none;
    border-color: rgba(${primaryNew}, 0.2);

    ${PreferencesList} {
      li {
        p {
          color: rgb(${primaryDarkNew});
        }

        svg {
          path {
            stroke: rgb(${primaryDarkNew});
          }
        }
      }
    }
  }
  hr {
    margin: 15px 0;
    border-top: 1px solid rgba(${primaryNew}, 0.1);
  }
`;

export const FilterBlock = styled.div`
  display: flex;
  .clear-btn {
    background: none;
    border: 0;
    color: rgb(${primaryNew});
    font-size: 14px;
    line-height: 16px;
    padding: 0;
    outline: none;
  }
`;
export const FilterList = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;
  margin-bottom: 5px;
  li {
    color: rgb(${primaryDarkNew});
    border-radius: 10px;
    background-color: rgba(${primaryNew}, 0.1);
    margin-right: 10px;
    font-size: 14px;
    padding: 5px 10px;
    align-items: center;
    display: flex;
    margin-bottom: 10px;

    &:last-child {
      background: none;
      margin-right: 0;
    }

    button.close-btn {
      background: none;
      border: 0;
      margin-left: 3px;
      outline: none;

      img {
        width: 10px;
        height: 10px;
      }
    }
  }
`;
export const ListingFilter = styled(Dropdown)`
  margin-top: 10px;
  ${media.medium`
    margin-top: 0;
    margin-right: 8px;
  `};

  .dropdown-menu {
    border: 1px solid rgba(${primaryNew}, 0.1);
    box-shadow: 0px 1px 6px rgba(${primaryDarkNew}, 0.15);
    width: 100%;
    padding: 10px;
    margin-top: 0;
    max-height: 200px;
    overflow-y: auto;
    border-radius: 10px;

    .dropdown-item {
      font-size: 16px;
      line-height: 18px;
      color: rgba(${primaryDarkNew}, 0.7);
      padding: 10px 10px 2px 10px;
      border-radius: 4px;

      &:hover {
        background: rgba(${primaryNew}, 0.1);
      }
    }

    ${media.medium`
      max-height: 247px;
      min-width: 390px;
      width: auto;
    `};

    .radio-div {
      .radio-sm {
        font-size: 14px;

        .checkmark {
          top: 6%;
        }
      }
      &:last-child {
        .radio-sm {
          margin-bottom: 0 !important;
        }
      }
    }
  }
  &.show > .btn-secondary.dropdown-toggle,
  &.show > .btn-secondary {
    color: rgb(${primaryDarkNew});
    border-color: rgba(${primaryNew}, 0.1);
  }
  .btn-secondary {
    background: rgb(${white});
    border: 1px solid rgba(${primaryNew}, 0.1);
    color: rgb(${primaryDarkNew});
    padding: 9px 15px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 16px;

    @media (max-width: 767px) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    svg {
      transition: transform 0.15s ease-in-out;
      transform: rotate(-90deg);
      width: 6px;
      height: 10px;
      margin-left: 9px;
      g {
        fill: rgb(${primaryDarkNew});
      }
    }
    &:hover {
      svg {
        transform: rotate(-270deg);
      }
    }

    &.active-filter {
      background: ${infoGradientRight};
    }

    &:hover,
    &.disabled,
    &:disabled,
    &:not(:disabled):not(.disabled):active,
    &:not(:disabled):not(.disabled).active {
      color: rgb(${primaryDarkNew});
      outline: 2px solid rgba(${primaryNew}, 0.2);
      border-color: rgba(${primaryNew}, 0.5);
    }

    &:focus,
    &.focus,
    &:not(:disabled):not(.disabled):active:focus,
    &:not(:disabled):not(.disabled).active:focus,
    &.show .dropdown-toggle:focus {
      box-shadow: none !important;
    }
  }
`;
export const FilterAction = styled.div``;

export const FiltersContainer = styled.div`
  @media (max-width: 767px) {
    width: 100%;
  }
`;
