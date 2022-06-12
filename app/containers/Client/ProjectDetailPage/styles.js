import styled from 'styled-components';
import { primaryNew } from 'themes/variables';

export const BriefList = styled.div`
  a {
    font-size: 16px;
    color: rgb(${primaryNew});
    font-family: 'GT-Walsheim-Pro-Bold';
    margin-bottom: 5px;
  }
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }

  .read-more-less-content {
    max-width: 1246px;
  }
`;

export const QuoteList = styled.div`
  .read-more-less-content {
    max-width: 1246px;
  }
`;

export const TalentDateRange = styled.div`
  height: fit-content;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export const ProjectMainInfo = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(${primaryNew}, 0.1);
`;
