import styled from 'styled-components';
import media from 'themes/media';
import { primaryDarkNew } from 'themes/variables';

const H1 = styled.h1`
  font-size: 24px;
  line-height: 21px;
  color: rgb(${primaryDarkNew});
  font-family: 'GT-Walsheim-Pro-Bold';
  margin-bottom: 20px;

  ${media.large`
    font-size: 34px;
    line-height: 31px;
    margin-bottom: 30px;
  `};
`;

export default H1;
