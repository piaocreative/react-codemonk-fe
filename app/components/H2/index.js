import styled from 'styled-components';
import media from 'themes/media';
import { primaryDarkNew } from 'themes/variables';

const H2 = styled.h2`
  font-size: 20px;
  line-height: 24px;
  color: rgb(${primaryDarkNew});
  font-family: 'GT-Walsheim-Pro-Regular';
  margin-bottom: 20px;

  ${media.large`
    font-size: 30px;
    line-height: 34px;
  `};
`;

export default H2;
