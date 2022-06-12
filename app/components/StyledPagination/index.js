import Pagination from 'rc-pagination';
import styled from 'styled-components';
import { primaryNew } from 'themes/variables';

const StyledPagination = styled(Pagination)`
  li {
    font-family: 'GT-Walsheim-Pro-Regular';
    &.rc-pagination-prev {
      color: rgb(${primaryNew});
      &:before {
        border-width: 0px 2px 2px 0px;
        line-height: 16px;
        height: 8px;
        width: 8px;
      }
    }
    &.rc-pagination-next {
      color: rgb(${primaryNew});
      &:after {
        border-width: 0px 2px 2px 0px;
        line-height: 16px;
        height: 8px;
        width: 8px;
      }
    }
    a {
      line-height: 30px;
    }

    &:hover,
    &:focus {
      color: rgb(${primaryNew});
      a {
        color: #ffffff;
      }
    }
  }
`;

export default StyledPagination;
