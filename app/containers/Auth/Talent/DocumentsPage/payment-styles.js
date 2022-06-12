import styled from 'styled-components';
import { lightBlue, primaryNew } from 'themes/variables';
import media from 'themes/media';
export const PaymentPageWrapper = styled.div`
  .custom-radio {
    max-width: 560px;
    border: 2px solid ${lightBlue};
    border-radius: 5px;
    flex: 1;
    padding: 15px 15px 15px 53px;
    ${media.medium`
    padding: 30px 30px 30px 60px;
    `}
    .checkmark {
      top: 35%;
      left: 25px;
      ${media.medium`
      top: 41%;
      left: 30px;
      `}
    }
  }
  .custom-radio-focus {
    background-color: rgba(76, 0, 255, 0.08);
    border: 2px solid rgb(${primaryNew});
  }
`;
