import styled from 'styled-components';
import { primaryDarkNew, primaryNew, black, lightGray, mediumPurple } from 'themes/variables';
import media from 'themes/media';

export const UserList = styled.ul`
  padding: 0;
  list-style: none;

  &.with-scroll {
    max-height: 610px;
    overflow-y: auto;
  }
  li {
    display: flex;
    flex: 1 0 100%;
    flex-wrap: wrap;
    padding: 10px 0;
    border-bottom: 1px solid rgba(${black}, 0.1);
    min-height: 63px;

    ${media.medium`
      padding: 18px 0;
    `};

    &:hover {
      background: rgb(${lightGray});
      div {
        &:last-child {
          display: flex;
        }
        span {
          &:first-child {
            color: rgb(${primaryNew});
          }
        }
      }
    }

    ${media.large`
      padding: 15px 15px;
    `};

    div {
      font-size: 16px;
      color: rgb(${primaryDarkNew});
      flex: 0 0 70%;
      max-width: 70%;
      flex-wrap: wrap;
      display: flex;

      ${media.medium`
        flex: 0 0 84%;
        max-width: 84%;
      `};

      span {
        padding: 0 10px;
        flex: 0 0 100%;
        max-width: 100%;

        &:first-child {
          font-family: 'GT-Walsheim-Pro-Bold';
        }
        &:last-child {
          ${media.medium`
            text-align: center;
          `};
        }
        ${media.medium`
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        `};
        ${media.large`
          padding: 0 15px;
        `};
      }

      ${media.medium`
        flex: 0 0 84%;
        max-width: 84%;
      `};

      ${media.large`
        font-size: 20px;
        flex: 0 0 87%;
        max-width: 87%;
      `};

      &:last-child {
        flex: 0 0 30%;
        max-width: 30%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        display: none;

        ${media.medium`
          flex: 0 0 16%;
          max-width: 16%;
        `};
        ${media.large`
          flex: 0 0 13%;
          max-width: 13%;
        `};

        button {
          background: none;
          padding: 0 5px;
          min-width: auto;
          margin-left: 0;
          line-height: normal;

          svg {
            fill: rgb(${mediumPurple});
          }

          &:first-child {
            margin-left: 0;
          }

          ${media.medium`
            margin-left: 12px;
          `};
        }
      }
    }
  }
`;
export default UserList;
