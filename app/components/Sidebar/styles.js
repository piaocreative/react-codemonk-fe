import styled from 'styled-components';
import { primaryNew, primaryDarkNew, white, darkGray } from 'themes/variables';
import media from 'themes/media';

export const FixedSidebar = styled.div`
  position: fixed;
  background-color: rgb(${white});
  top: 92px;
  left: 0;
  bottom: 0;
  width: 265px;
  border-right: 1px solid rgba(${primaryNew}, 0.1);
  overflow-y: auto;
  max-height: 100vh;
  padding: 25px;

  ${media.extraLarge`
    width: 260px;
  `};

  &.client-sidebar {
    top: 0;
  }

  @media (max-width: 767px) {
    left: -100px;
    transition: left 0.3s ease-in-out;
    z-index: 1;

    .sidebarOpen + & {
      left: 0;
    }
  }
  @media (max-width: 1199px) {
    width: 100px;
  }

  .nav {
    flex-direction: column;

    .nav-item {
      padding: 0 15px;
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }

      ${media.extraLarge`
          margin-bottom: 47px;
      `};

      @media (max-width: 1199px) {
        padding: 0 20px;
      }
      .nav-link {
        display: flex;
        align-items: center;
        padding: 0;
        color: rgba(${primaryDarkNew}, 0.3);
        font-family: 'GT-Walsheim-Pro-Regular';
        font-size: 16px;

        &:hover,
        &.active {
          cursor: pointer;
          color: rgb(${darkGray});
          .icon {
            &.referral-icon {
              path {
                fill: rgba(${primaryNew});
                stroke: none;
              }
            }
            path,
            circle {
              stroke: rgb(${primaryNew});
            }
          }
        }
        &.active {
          color: rgb(${primaryNew});
        }

        .icon {
          display: flex;
          margin-right: 16px;
          position: relative;

          &.referral-icon {
            path {
              fill: rgba(${primaryDarkNew}, 0.3);
              stroke: none;
            }
          }
          svg {
            width: 15px;
            height: 15px;
          }

          ${media.extraLarge`
            svg {
              width: 20px;
              height: 20px;
            }
          `};

          @media (max-width: 1199px) {
            margin-right: 0;
            display: flex;
            margin: 0 auto;
          }

          path,
          circle {
            stroke: rgba(${primaryDarkNew}, 0.3);
          }
        }

        @media (max-width: 1199px) {
          .menu-option {
            display: none;
          }
        }
      }
    }
  }
`;
