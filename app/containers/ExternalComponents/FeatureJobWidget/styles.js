import styled from 'styled-components';
import Slider from 'react-slick';
import { white, black, primaryDarkNew } from 'themes/variables';

export const JobWidgetSlider = styled(Slider)`
  max-width: 100%;
  margin: 0 auto;

  .slick-dots {
    position: relative;
    bottom: 0;
    li {
      width: 50px !important;
      height: 6px !important;
      margin: 0 7px;

      @media (max-width: 767px) {
        width: 30px !important;
        margin: 0 4px;
      }

      &.slick-active {
        button {
          &:before {
            background: #5387de;
            opacity: 1;
          }
        }
      }
      button {
        width: 50px !important;
        height: 6px !important;

        @media (max-width: 767px) {
          width: 30px !important;
        }
        &:before {
          opacity: 1;
          background: rgb(${white});
          font-size: 0;
          width: 50px !important;
          height: 6px !important;
          border-radius: 30px;

          @media (max-width: 767px) {
            width: 30px !important;
          }
        }
      }
    }
  }
`;

export const WidgetCard = styled.div`
  padding: 10px;
  width: 790px !important;

  @media (max-width: 1199px) {
    width: 600px !important;
  }
  @media (max-width: 767px) {
    width: 450px !important;
  }
  @media (max-width: 600px) {
    width: 350px !important;
  }

  .logo-icon {
    width: 70px;
    height: 70px;
    background: rgb(${white});
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin: 0 auto -35px;
    svg {
      width: 60px;
      height: 60px;
    }

    @media (max-width: 767px) {
      width: 50px;
      height: 50px;
      margin: 0 auto -25px;

      svg {
        width: 40px;
        height: 40px;
      }
    }
  }
  .inner-card-block {
    border-radius: 50px;
    background: rgb(${white});
    box-shadow: 0 3px 20px -11px rgb(${black});
    padding: 40px 70px;
    min-height: 403px;

    @media (max-width: 1199px) {
      padding: 30px 50px;
      min-height: 383px;
    }
    @media (max-width: 767px) {
      padding: 30px;
    }
    @media (max-width: 600px) {
      min-height: 420px;
    }

    h4 {
      font-size: 23px;
      line-height: 25px;
      color: #04004e;
      margin-bottom: 15px;
      font-family: 'GT-Walsheim-Pro-Bold';

      @media (max-width: 767px) {
        font-size: 19px;
        line-height: 21px;
      }
    }
    h5 {
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.03em;
      color: #04004e;
      font-family: 'GT-Walsheim-Pro-Bold';
      @media (max-width: 767px) {
        font-size: 14px;
        line-height: 18px;
      }
    }

    p {
      color: #5a6b82;
      font-family: 'GT-Walsheim-Pro-Regular';

      @media (max-width: 767px) {
        font-size: 14px !important;
        line-height: 18px;
      }
    }

    .read-more-less-content {
      min-height: 72px;
      & * {
        color: #8c97a8;
        font-size: 16px !important;
        line-height: 19px;
        font-family: 'GT-Walsheim-Pro-Regular';

        @media (max-width: 767px) {
          font-size: 14px !important;
          line-height: 18px;
        }
      }
    }

    .job-tag {
      background: linear-gradient(90deg, #ffeed3 5.26%, #ffdcd9 100%);
      border-radius: 30px;
      font-size: 13px;
      padding: 6px 20px;
      font-family: 'GT-Walsheim-Pro-Bold';
      text-align: center;
      letter-spacing: -0.03em;
      color: #996f47;
      line-height: 11.7px;
      margin-right: 12px;
    }

    ul {
      list-style: none;
      display: inline-flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      max-height: 36px;
      overflow: hidden;

      li {
        padding: 10px 20px;
        border: 1px solid #d7e1ee;
        border-radius: 30px;
        font-size: 16px;
        line-height: 14px;
        font-family: 'GT-Walsheim-Pro-Bold';
        margin-right: 8px;
        margin-bottom: 8px;
        align-self: flex-start;
        color: rgb(${primaryDarkNew});
        &:last-child {
          margin-right: 0;
        }

        @media (max-width: 767px) {
          font-size: 14px;
          line-height: 12px;
          padding: 8px 15px;
        }
      }
    }
  }
`;
