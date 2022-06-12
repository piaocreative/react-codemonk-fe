import styled from 'styled-components';
import { A } from 'components';
import media from 'themes/media';

export const DownloadLink = styled(A)`
  font-size: 16px;
  font-family: 'GT-Walsheim-Pro-Regular';
`;

export const TableTitle = styled.div`
  margin-bottom: 25px;
  margin-top: 50px;
  ${media.medium`
    margin-bottom: 30px;
    margin-top: 60px;
  `};
`;

export const UploadTitle = styled.div`
  margin: 60px 0 30px;

  ${media.medium`
     margin: 120px 0 30px;
  `};

  a {
    position: relative;
    top: 2px;
  }
`;
