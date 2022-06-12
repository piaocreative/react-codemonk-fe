import styled from 'styled-components';
import { primaryNew } from 'themes/variables';
import media from 'themes/media';

export const RatingWrapper = styled.div`
  width: 100%;
  .title {
    display: block;
    margin-right: 15px;
    ${media.medium`
      margin-right: 30px;
    `};
  }
  .ratings {
    display: flex;
    align-items: center;
  }
  .rating-bars {
    max-width: 400px;
    align-items: center;
    margin-right: 12px;
    display: flex;
  }
  .rating-item {
    margin-top: ${props => (props.index !== 0 ? '20px' : '0px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .badge-md {
      max-width: 250px;
      white-space: normal;
      text-align: left;
      word-break: break-word;
      ${media.medium`
        max-width: 300px;
      `};
    }
  }
  .rating-label {
    max-width: 42px;
    width: 42px;
  }
`;
export const EmptyIcon = styled.div`
  width: 15px;
  height: 5px;
  margin-right: 4px;
  border-radius: 4px;
  background-color: ${props => (props.index < props.icon ? `rgb(${primaryNew})` : `rgba(${primaryNew}, 0.1)`)};
  ${media.medium`
    width: 25px;
    height: 8px;
  `};
  ${media.large`
    width: 36px;
  `};
`;
export const FullIcon = styled.div`
  width: 10px;
  margin-right: 4px;
  border-radius: 4px;
  height: 8px;
  background-color: rgb(${primaryNew});
  ${media.medium`
    width: 36px;
  `};
`;
