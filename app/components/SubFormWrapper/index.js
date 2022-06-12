import styled from 'styled-components';
import media from '../../themes/media';

export const SubFormWrapper = styled.div`
  .form-group {
    &:first-child {
      margin-top: 15px;
      ${media.medium`
      margin-top: 30px;
  `};
    }
  }
  .form-group + .row {
    margin-top: 20px;
    ${media.medium`
    margin-top:30px;
`};
  }
  .col-md-6 .form-group {
    margin-top: 0px;
  }
`;
