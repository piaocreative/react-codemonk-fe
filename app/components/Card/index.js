import styled from 'styled-components';
import { white, primaryGradientRight } from 'themes/variables';
import media from 'themes/media';

const Card = styled.div`
  background: rgb(${white});
  padding: 30px 25px;
  border-radius: 5px;

  ${media.large`
		padding: 50px;
	`};

  .auth-layout > & {
    flex: 1 1 0%;
    height: 100%;
  }

  &.pagination-block {
    margin-top: 5px;
    padding: 20px 40px !important;
  }
  &.table-header {
    padding: 30px 40px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    & .form-group {
      margin-bottom: 0;
      width: 200px;
    }
  }
  &.bg-secondary-gradient {
    background: ${primaryGradientRight};
  }
  &.talent-card {
    :first-child {
      margin-top: 20px;
    }
  }
`;

export default Card;
