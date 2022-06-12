import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBrand = styled(Link)`
  padding: 0;
  display: inline-block;

  > img {
    width: 40px;
    height: 40px;
  }
`;
NavBrand.displayName = 'NavBrand';
