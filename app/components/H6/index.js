import styled from 'styled-components';
import { primaryDarkNew } from 'themes/variables';

const H6 = styled.h6`
  font-size: 16px;
  line-height: ${props => (props.lineHeight ? `${props.lineHeight}px` : '18px')};
  margin-bottom: 0;
  font-family: 'GT-Walsheim-Pro-Medium';
  color: rgb(${primaryDarkNew});
`;
export default H6;
