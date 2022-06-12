import styled from 'styled-components';
import { primaryDarkNew, white, primaryNew } from 'themes/variables';
import media from 'themes/media';

const weekListStyle = `
  font-family: 'GT-Walsheim-Pro-Regular';
  background-color: rgba(${primaryNew}, 0.2);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgb(${primaryDarkNew});
  `;

const activeWeekListStyle = `
  background-color: rgba(${primaryNew}, 0.5);`;

const halfCircle = `
  position: absolute;
  content: '';
  right: 0;
  top: 0;
  bottom: 0;
  width: 50%;
  background: rgba(${primaryNew}, 0.5);
  z-index: 2;`;

export const WeekList = styled.ul`
  list-style: none;
  display: inline-flex;
  padding: 0;
  margin: 0;
  &:not(.no-action) {
    height: 40px;
    align-items: center;
  }
  &.no-action li {
    width: 28px;
    height: 28px;
    ${weekListStyle}

    ${media.medium`
      width: 34px;
      height: 34px;
      font-size: 16px;
    `}

    &:last-child {
      margin-right: 0;
    }

    &.active {
      ${activeWeekListStyle}
    }

    &.half-circle {
      &:after {
        ${halfCircle}
      }
    }
    &.semi-quarter-circle {
      &:after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        width: 50%;
        background: rgba(${primaryNew}, 0.5);
        z-index: 2;
        height: 50%;
        right: 0;
      }
    }
    &.quarter-circle {
      &:after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        width: 50%;
        background-color: rgba(${primaryNew}, 0.5);
        z-index: 2;
        right: 0;
      }
      &:before {
        position: absolute;
        content: '';
        bottom: 0;
        background-color: rgba(${primaryNew}, 0.5);
        z-index: 2;
        left: 0;
        right: 0;
        height: 50%;
        width: 50%;
      }
    }
  }
  li {
    margin-right: 10px;
    position: relative;
    overflow: hidden;
    ${media.large`
      margin-right: 15px;
    `}
    &:last-child {
      margin-right: 0;
    }
    button {
      min-width: auto;
      width: 28px;
      height: 28px;
      position: relative;
      overflow: hidden;
      ${weekListStyle}
      ${media.large`
        width: 40px;
        height: 40px;
        font-size: 16px;
      `}

      &:active {
        background-color: rgba(${primaryNew}, 0.2);
      }
    }
    &.active {
      button {
        ${activeWeekListStyle}
      }
    }
    &.half-circle {
      button:after {
        ${halfCircle}
      }
    }
  }
`;

export const Count = styled.div`
  color: rgb(${white});
  background-color: rgb(${primaryNew});
  border-radius: 15px;
  min-width: 38px;
  padding: 5px;
  line-height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-left: 15px;
`;
