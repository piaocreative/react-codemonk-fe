import styled from 'styled-components';
import { Button } from 'reactstrap';
import { primaryNew } from 'themes/variables';

const ButtonMod = styled(Button)`
  &:focus {
    box-shadow: none;
  }
  &.btn-link {
    padding: 0;
    color: rgb(${primaryNew});
    font-size: 16px;
    line-height: 18px;
    font-family: 'GT-Walsheim-Pro-Regular';
    text-decoration: none;
  }
`;

export default ButtonMod;
