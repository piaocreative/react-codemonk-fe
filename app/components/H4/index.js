import styled from 'styled-components';
import { darkGray, primaryDarkNew } from 'themes/variables';
import media from 'themes/media';

const H4 = styled.h4`
  font-size: 20px;
  margin-bottom: 25px;
  font-family: 'GT-Walsheim-Pro-Bold';
  margin-top: 50px;
  color: rgb(${darkGray});

  &.modal-title,
  &.input-sm {
    font-size: 20px;
    font-family: 'GT-Walsheim-Pro-Bold';
    margin: 0;
    color: rgb(${primaryDarkNew});
    margin: 20px 0;

    ${media.extraLarge`
      margin: 30px 0;
    `};
  }

  ${media.medium`
    font-size: 25px;
    margin-bottom: 30px;
    margin-top: 60px;
  `};

  ${media.large`
    font-size: 24px;
  `};

  ${media.extraLarge`
    font-size: 28px;
  `};

  &.newH4 {
    font-size: 20px;
    line-height: 23px;
    color: rgb(${primaryDarkNew}, ${props => props.opacityVal || 1});
    font-family: 'GT-Walsheim-Pro-Bold';
  }
`;
export default H4;
