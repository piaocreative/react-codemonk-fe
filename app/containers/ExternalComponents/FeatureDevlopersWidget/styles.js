import styled from 'styled-components';
import Slider from 'react-slick';
import { Row } from 'reactstrap';
import { white, black, primaryDarkNew, darkGrayNew } from 'themes/variables';

export const DeveloperJobWidgetSlider = styled(Slider)`
  .slick-list {
    .slick-slide {
      > div {
        display: grid;
        justify-content: space-between;
        grid-template-columns: 1fr 1fr 1fr;
        @media (max-width: 980px) {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 480px) {
          grid-template-columns: 1fr;
        }
      }
    }
  }
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

export const DeveloperWidgetCard = styled(Row)`
  padding: 10px;
  width: 100%;
  .card-widget {
    margin-bottom: 20px;
    height: 480px;
    .inner-card {
      max-width: 380px;
      width: 100%;
      &:hover {
        transform: scale(1.03);
      }
    }
  }

  .logo-icon {
    width: 100px;
    height: 100px;
    background: rgb(${white});
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin: 0 auto -50px;
    svg {
      width: 60px;
      height: 60px;
    }

    img {
      width: 100%;
    }
  }
  .inner-card-block {
    border-radius: 30px;
    background: rgb(${white});
    box-shadow: 0 3px 20px -11px rgb(${black});
    padding: 20px 1.2em 30px 1.2em;
    overflow: hidden !important;
    @media (max-width: 1199px) {
      padding: 30px 20px;
      min-height: 383px;
    }
    @media (max-width: 767px) {
      padding: 30px;
      min-height: 377px;
    }

    @media (max-width: 767px) {
      height: auto !important;
    }
    @media (max-width: 600px) {
      height: auto !important;
    }
    @media (max-width: 500px) {
      height: auto !important;
    }
    @media (max-width: 400px) {
      height: auto !important;
    }

    h4 {
      font-size: 23px;
      line-height: 110%;
      color: #04004e;
      font-family: 'GT-Walsheim-Pro-Regular';
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.03em;
      @media (max-width: 767px) {
        font-size: 19px;
        line-height: 21px;
      }

      span {
        float: right;
        margin-right: 30px;
        line-height: 140%;
        a {
          text-decoration: none;
          font-size: 16px;
          font-family: 'GT-Walsheim-Pro-Regular';
          color: #1833cc;
          letter-spacing: initial;
          line-height: 18px;
        }
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
      font-family: 'GT-Walsheim-Pro-Regular';
      font-size: 18px;
      color: #8c97a8;
      line-height: 120%;
      &.time-zone {
        height: 20px;
        overflow: hidden;
      }
    }

    .skillsExp {
      height: 100px;
      margin-top: 10px;
      overflow: hidden;
      ul {
        height: auto;
        max-height: 65px;
      }
    }

    ul {
      list-style: none;
      display: inline-flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      overflow: hidden;
      height: 30px;
      li {
        padding: 5px 10px;
        border: 1px solid #d7e1ee;
        border-radius: 30px;
        letter-spacing: -0.03em;
        font-family: 'GT-Walsheim-Pro-Regular';
        margin-right: 10px;
        margin-bottom: 10px;
        align-self: flex-start;
        font-size: 13px;
        line-height: 14.4px;
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

export const HRLine = styled.hr`
  border-width: 1px;
  margin: 10px auto;
`;

export const DevTypeRating = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    font-size: 14px;

    &.dev-type {
      span {
        display: block;
        font-size: 16px;
        line-height: 120%;
        letter-spacing: -0.03em;
        &.label {
          color: ${darkGrayNew};
          opacity: 0.7;
          font-family: 'GT-Walsheim-Pro-Regular';
        }
        b {
          color: rgb(${primaryDarkNew});
        }
      }
    }
  }
`;

export const SkillsBlock = styled.div`
  span.icon {
    margin-right: 20px;
    position: absolute;
    g,
    path {
      fill: #1833cc;
    }
  }
  ul {
    li {
      &:first-child {
        margin-left: 25px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const IndustryBlock = styled.div`
  span.icon {
    margin-right: 15px;
    position: relative;
    bottom: 4px;
  }
  p {
    font-size: 16px !important;
    line-height: 120% !important;
    letter-spacing: -0.03em !important;
    padding-top: 10px;
    border: none !important;
    color: rgb(${primaryDarkNew}) !important;
  }
`;

export const ExpBlock = styled.div`
  p {
    border-bottom: 0 !important;
    letter-spacing: -0.03em;
    color: ${darkGrayNew};
  }
  ul {
    max-height: 30px;
    li {
      &:first-child {
        margin-left: 0px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
