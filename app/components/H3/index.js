import styled from 'styled-components';
import media from 'themes/media';
import { primaryDarkNew } from 'themes/variables';

const H3 = styled.h3`
  font-family: 'GT-Walsheim-Pro-Medium';
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 0;
  color: rgb(${primaryDarkNew});

  ${media.large`
    font-size: 24px;
    line-height: 27px;
  `};

  &.mb10 {
    margin-bottom: 10px;
  }
`;
export default H3;
