import styled from 'styled-components';
import { primaryNew } from 'themes/variables';

export const SortDiv = styled.div`
  .sort-dropdown {
    justify-content: end;
    .selected-sort {
      color: rgb(${primaryNew}) !important;
    }
  }
  svg.down-arrow {
    margin-left: 6px;
    margin-right: 0px;
    fill: none !important;
    path {
      stroke: rgb(${primaryNew});
    }
  }
`;
