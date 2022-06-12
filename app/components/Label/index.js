import styled from 'styled-components';
import { Label } from 'reactstrap';
import { primaryDarkNew } from 'themes/variables';

const FormLabel = styled(Label)`
  font-family: 'GT-Walsheim-Pro-Medium';
  color: rgb(${primaryDarkNew});
  letter-spacing: 0.02em;
  font-size: 14px;
  line-height: 13px;
`;
FormLabel.displayName = 'FormLabel';

export default FormLabel;
