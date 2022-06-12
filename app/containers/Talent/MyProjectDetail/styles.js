import styled from 'styled-components';
import { darkGrayNew, primaryNew } from 'themes/variables';

export const ApplyProjectBtn = styled.div`
  button {
    font-family: 'GT-Walsheim-Pro-Regular';
    svg {
      position: relative;
      bottom: 2px;
      g {
        fill: rgb(${primaryNew});
      }
    }
  }
`;

export const StatusContainer = styled.div`
  margin: 20px auto;
`;

export const ReadMoreOrLess = styled.div`
  * {
    line-height: 22px !important;
  }
`;

export const CardTalentDetails = styled.div`
  display: flex;
  img {
    &.talent-pic {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
  div {
    p {
      &.talent-location {
        color: ${darkGrayNew};
        span {
          margin-left: 10px;
        }
      }
    }
  }
`;

export const OpenRoles = styled.div`
  * {
    font-family: 'GT-Walsheim-Pro-Regular';
  }
`;
