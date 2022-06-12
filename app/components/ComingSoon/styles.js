import styled from 'styled-components';
import { primaryDarkNew } from 'themes/variables';
import { Card } from 'components';

export const ComingSoonBlock = styled(Card)`
  svg {
    margin-bottom: 30px;
  }
  .inner-content {
    max-width: 1022px;
    text-align: center;
    margin: 0 auto;
  }
  h3 {
    margin-top: 30px;
    font-size: 20px;
    color: rgb(${primaryDarkNew});
  }
  h5 {
    line-height: 30px;
  }
  p {
    margin-top: 15px;
    margin-bottom: 30px;
    font-size: 20px;
    line-height: 36px;
    letter-spacing: 0.3px;
    color: rgb(${primaryDarkNew});
  }
  p.sm {
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.25px;
    color: rgb(${primaryDarkNew}, 0.7);
  }
  ul {
    list-style: decimal;
    text-align: left;
    max-width: 550px;
    margin: 30px auto 0;
    li {
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0.3px;
      color: rgb(${primaryDarkNew}, 0.7);
    }
  }
  .checkbox {
    margin-top: 30px;
  }
  button {
    min-width: 203px;
    margin-top: 30px;
  }
`;
