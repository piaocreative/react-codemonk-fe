import styled from 'styled-components';
import { primaryDarkNew, black } from 'themes/variables';

export const SwitchContainer = styled.div`
  display: inline-flex;
  align-items: center;
  span {
    margin-right: 15px;
    font-size: 16px;
    font-family: 'GT-Walsheim-Pro-Regular';
    color: rgba(${primaryDarkNew}, 0.5);

    &.text-bold {
      font-family: 'GT-Walsheim-Pro-Bold';
      font-size: 20px;
      color: rgb(${black});
    }
  }
`;
