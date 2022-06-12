import styled from 'styled-components';
import { primaryDarkNew, darkGray, primaryGradient, white } from 'themes/variables';

export const ImgIconList = styled.ul`
  padding: 0;
  list-style: none;
  margin-bottom: 0;

  p {
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.25px;
    color: rgb(${primaryDarkNew});
    margin-bottom: 3px;
  }

  li {
    img {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      margin-left: -5px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  &.inline-list {
    display: inline-flex;
    flex-wrap: wrap;
    li {
      margin-right: 60px;
      &:last-child {
        margin-left: 0;
      }
    }
  }
  img {
    border: 1px solid rgb(${white});
  }
`;

export const HourRate = styled.p`
  font-size: 20px !important;
  letter-spacing: 0.25px;
  color: rgb(${darkGray});
  font-family: 'GT-Walsheim-Pro-Bold';
  margin-right: 30px;

  span {
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.25px;
    color: rgba(${primaryDarkNew}, 0.7);
    font-family: 'GT-Walsheim-Pro-Regular';
  }
`;

export const MoreImgIcon = styled.div`
  border-radius: 50% !important;
  background: ${primaryGradient};
  color: rgb(${primaryDarkNew});
  margin-left: -5px;
  width: 30px;
  height: 30px;
`;

export const LampCard = styled.div`
  position: absolute;
  top: -40px;
  left: 20px;
`;
