import styled from 'styled-components';
import media from 'themes/media';
import { primaryNew, white, primaryGradient, primaryDarkNew } from 'themes/variables';

export const OnboardingContainer = styled.div`
  flex: 1 1 auto;
  background: rgb(${white});

  .inner-container {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    ${media.medium`
      flex-direction: row;
    `};
  }
`;

export const TabSectionBlock = styled.div`
  background: rgb(${white});
  width: 100%;
  padding: 110px 25px 30px;

  ${media.medium`
    width: 270px;
    border-right: 1px solid rgba(${primaryNew}, 0.1);
    padding: 110px 25px 0;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1;
    height: 100vh;
  `};

  ${media.large`
    width: 361px;
    padding: 130px 50px 0;
  `};

  div {
    ${media.medium`
      border-radius: 30px;
      padding: 20px;
      background: ${primaryGradient};
    `};
    ${media.large`
      padding: 25px;
    `};
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      justify-content: center;

      ${media.medium`
        flex-direction: column;
      `};

      li {
        display: flex;
        align-items: center;
        font-family: 'GT-Walsheim-Pro-Regular';
        position: relative;
        border-radius: 10px;
        background: linear-gradient(to right, rgba(${white}, 0.3) 50%, transparent 50%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: all 0.5s ease-out;
        margin-right: 20px;

        ${media.medium`  
          margin-right: 0;
          margin-bottom: 30px;
        `};

        &:last-child {
          margin-right: 0;
          margin-bottom: 0;
          &:after {
            display: none;
          }
        }

        a,
        button {
          background: transparent;
          border: 0;
          padding: 0;
          font-size: 14px;
          line-height: 16px;
          color: rgb(${primaryDarkNew});
          display: flex;
          align-items: center;
          text-decoration: none;
          width: 100%;
          text-align: left;

          ${media.medium`
            padding-right: 20px;
          `};
          ${media.large`
            font-size: 16px;
            line-height: 18px;
          `};

          &:hover,
          &:focus,
          &:active,
          &:active:focus {
            background: inherit;
            color: inherit;
            box-shadow: none;
          }

          svg {
            margin-left: auto;
            display: none;

            ${media.medium`
              display: block;
            `};

            &.tick-icon {
              height: 14px;
              width: 14px;
            }
            &.right-angle {
              height: 12px;
              width: 12px;
            }
          }
        }

        &.active,
        &:hover {
          background-position: left bottom;
          a {
            font-family: 'GT-Walsheim-Pro-Medium';
          }

          span.count {
            background: rgb(${primaryNew});
            transition: all 0.1s ease-out;
            ${media.medium`  
              background: transparent;
            `};
          }
        }

        &:after {
          content: '';
          position: absolute;
          border: 1px dashed rgb(${primaryDarkNew}, 0.3);
          right: -20px;
          width: 20px;
          height: 1px;

          ${media.medium`  
            height: 30px;
            width: 1px;
            bottom: -30px;
            right: auto;
            left: 14px;
          `};
          ${media.large`  
            left: 18px;
          `};
        }

        span.count {
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(${primaryNew}, 0.1);
          border-radius: 10px;
          width: 30px;
          height: 30px;
          font-size: 14px;
          line-height: 16px;
          color: rgb(${white});
          font-family: 'GT-Walsheim-Pro-Regular';
          z-index: 1;
          ${media.medium`
            color: rgb(${primaryDarkNew});
            background: rgba(${white}, 0.3);
            margin-right: 12px;
          `};
          ${media.large`
            width: 38px;
            height: 38px;
            font-size: 16px;
            line-height: 18px;
          `};
        }
      }
    }
  }
`;
TabSectionBlock.displayName = 'TabSectionBlock';
