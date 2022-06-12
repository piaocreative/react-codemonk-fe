import styled from 'styled-components';
import { Button } from 'components';

export const TalentNameBtn = styled(Button)`
  display: flex;
  align-items: center;
  img {
    width: 34px;
    height: 34px;
    border-radius: 100%;
  }
  span {
    text-transform: capitalize;
  }
`;

export const NameWithProfileIcon = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 34px;
    height: 34px;
    border-radius: 100%;
  }
`;
