import styled from 'styled-components';
import { Row } from 'reactstrap';
import { primaryNew } from 'themes/variables';
import { Button } from 'components';

export const CustomRow = styled(Row)`
  border-top: 1px solid rgba(${primaryNew}, 0.1);
  border-bottom: 1px solid rgba(${primaryNew}, 0.1);
  padding: 15px 0px !important;
  margin: 15px 0;
`;

export const TimeText = styled.p`
  font-size: 16px;
  letter-spacing: 0.25;
  margin-bottom: 0;
  span {
    color: rgb(${primaryNew});
    font-family: 'GT-Walsheim-Pro-Regular';
    display: block;
    line-height: 18px;
  }
`;

export const EditButton = styled(Button)`
  &:hover {
    background: none;
    svg {
      fill: rgb(${primaryNew});
      g {
        fill: rgb(${primaryNew});
      }
    }
  }
`;
