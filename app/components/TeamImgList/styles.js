import styled from 'styled-components';
import { white, primaryGradient } from 'themes/variables';

export const UserImgList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  margin-bottom: 0;
  li {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    border: 2px solid rgb(${white});
    margin-left: -6px;

    &.has-count {
      align-items: center;
      justify-content: center;
      background: ${primaryGradient};
    }
  }
`;
