import styled from 'styled-components';
import media from 'themes/media';

export const TableTitle = styled.div`
  margin-bottom: 25px;
  margin-top: 50px;
  ${media.medium`
    margin-bottom: 30px;
    margin-top: 60px;
  `};

  &.input-sm {
    margin: 20px 0;

    ${media.extraLarge`
      margin: 30px 0;
    `};
  }
`;
