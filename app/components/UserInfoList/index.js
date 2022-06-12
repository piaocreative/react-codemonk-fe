import styled from 'styled-components';
import { primaryNew } from 'themes/variables';
import media from 'themes/media';

const UserInfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    border-top: 1px dashed rgba(${primaryNew}, 0.2);
    display: grid;
    grid-template-columns: 1fr;
    padding: 15px 0;
    column-gap: 16px;
    align-items: flex-start;

    ${media.large`
      grid-template-columns:  1fr auto;
    `};

    &.py-30 {
      padding: 15px 0;
      ${media.large`
        padding: 30px 0;
      `};
      .list-outer-block {
        column-gap: 15px;
        ${media.large`
          column-gap: 30px;
        `};
      }
    }

    &:last-child {
      border-bottom: 1px dashed rgba(${primaryNew}, 0.2);
      grid-template-columns: auto 1fr;
    }

    svg.list-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;

      &.img-lg {
        width: 80px;
        height: 60px;
        ${media.medium`
          width: 140px;
          height: 95px;
        `};
        ${media.large`
          width: 250px;
          height: 175px;
        `};
      }
    }

    .icon-container {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      border: 1px solid rgba(${primaryNew}, 0.1);
      overflow: hidden;
      &.img-lg {
        width: 80px;
        height: 60px;
        ${media.medium`
          width: 140px;
          height: 95px;
        `};
        ${media.large`
          width: 250px;
          height: 175px;
        `};
      }
    }
    .list-outer-block {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 16px;

      .list-content {
        display: grid;
        grid-template-columns: 1fr auto;
        column-gap: 16px;
        align-items: flex-start;

        .target-link {
          svg {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
    p.description-text {
      white-space: break-spaces;
    }
    .list-action {
      display: grid;
      grid-template-columns: auto auto;
      column-gap: 16px;
      justify-content: flex-end;
      margin-top: 16px;
      ${media.large`
        margin-top: 0;
        justify-content: flex-start;
      `};
    }
    ul.tag-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      li {
        background: rgba(${primaryNew}, 0.1);
        border-radius: 15px;
        padding: 6px 15px;
        margin: 0 10px 10px 0;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  &.no-add-cta {
    & > li {
      &:last-child {
        border-bottom: 0;
        ${media.large`
          grid-template-columns:  1fr auto;
        `};
      }
    }
  }
`;

export default UserInfoList;
