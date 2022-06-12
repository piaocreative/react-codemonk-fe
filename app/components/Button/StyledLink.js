import styled from 'styled-components';
import { primaryNew } from 'themes/variables';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgb(${primaryNew});
  font-size: 16px;
  line-height: 18px;
  font-family: 'GT-Walsheim-Pro-Regular';
  &.text-bold {
    font-family: 'GT-Walsheim-Pro-Bold';
  }
  &.text-medium {
    font-family: 'GT-Walsheim-Pro-Medium';
  }
`;

export default StyledLink;
