import styled from 'styled-components';
import { primaryDarkNew, primaryNew } from 'themes/variables';

export const Stepper = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 424px;
  display: grid;
  grid-template-columns: auto auto auto;

  li {
    font-size: 18px;
    line-height: 21px;
    color: rgba(${primaryDarkNew}, 0.2);
    font-family: 'GT-Walsheim-Pro-Medium';
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &.active,
    &.completed {
      color: rgb(${primaryNew});
      .line {
        background: rgb(${primaryNew});
        &:before,
        &:after {
          border-color: rgb(${primaryNew});
        }
      }
    }

    &.active:not(:first-child):not(:last-child) {
      .line {
        &:after {
          border-color: rgba(${primaryDarkNew}, 0.2);
        }
      }
    }

    &:first-child.active + li {
      .line {
        &:before {
          border-color: rgb(${primaryNew});
        }
      }
    }
    &.completed {
      .line {
        svg {
          display: block;
        }
      }
    }

    &:first-child {
      .line {
        &:before {
          display: none;
        }
      }
    }
    &:last-child {
      .line {
        &:after {
          display: none;
        }
      }
    }

    .line {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(${primaryDarkNew}, 0.2);
      border-radius: 100%;
      margin-bottom: 10px;

      svg {
        display: none;
      }

      &:after {
        content: '';
        position: absolute;
        width: 50%;
        height: 1px;
        border: 1px dashed rgba(${primaryDarkNew}, 0.2);
        right: 0;
        top: 6px;
        left: calc(50% + 7px);
      }
      &:before {
        content: '';
        position: absolute;
        width: calc(50% - 16px);
        height: 1px;
        border: 1px dashed rgba(${primaryDarkNew}, 0.2);
        top: 6px;
        left: 8px;
      }
    }
  }
`;
