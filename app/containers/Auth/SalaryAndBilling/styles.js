import styled from 'styled-components';
import { primaryNew, warningNew } from 'themes/variables';

export const RateDetailList = styled.div`
  background-color: rgba(${warningNew}, 0.2);
  padding: 20px;
  border-radius: 10px;
  ul {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 20px;

      &:before {
        content: '';
        width: 6px;
        height: 6px;
        background-color: rgb(${primaryNew});
        border-radius: 2px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
