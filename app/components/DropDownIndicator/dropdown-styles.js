import styled from 'styled-components';
import { primaryDarkNew } from 'themes/variables';

export const DropDownIndicatorArrow = styled.div`
  svg {
    transform: rotate(90deg);
    width: 16px;
    height: 16px;

    path {
      stroke: rgb(${primaryDarkNew}, 0.5);
    }
  }
`;
DropDownIndicatorArrow.displayName = 'DropDownIndicatorArrow';
