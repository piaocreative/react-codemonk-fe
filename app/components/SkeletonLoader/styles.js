import styled from 'styled-components';
import { Card } from 'components';

export const Paragrpah = styled.div`
  span {
    display: flex;
  }
`;

export const GridCard = styled(Card)`
  span {
    display: block;
  }
`;

export const TalentCard = styled(Card)`
  border-radius: 20px;
  padding: 30px !important;
  height: 256px;
  margin-top: 30px;
  .project-image-loader {
    margin-top: -60px;
    border-radius: 20px;
  }
  span {
    display: block;
  }
`;
