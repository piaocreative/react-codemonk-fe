import styled from 'styled-components';
import { P, Card } from 'components';
import { primaryDarkNew, primaryNew } from 'themes/variables';

export const JobPreferenceListItems = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;

  &.inline-list {
    display: inline-flex;
  }

  li {
    margin-right: 25px;
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 1fr auto;

    &:last-child {
      margin-right: 0;
    }

    svg {
      width: 16px;
      height: 16px;
      margin-right: 10px;

      path {
        stroke: rgba(${primaryDarkNew}, 0.5);
      }
    }
  }
`;

export const JobCardBlock = styled(Card)`
  svg {
    &.project-placeholder {
      margin-right: 12px;
    }
  }
  &:hover:not(.no-hover) {
    border: 1px solid rgb(${primaryNew}, 0.2);
    cursor: pointer;

    .p16:not(.no-hover) {
      color: rgb(${primaryDarkNew});
    }

    .p20 {
      color: rgb(${primaryNew});
    }

    ${JobPreferenceListItems} {
      li {
        svg {
          path {
            stroke: rgb(${primaryDarkNew});
          }
        }
      }
    }
  }
`;

export const CompanyTimeZone = styled(P)`
  position: relative;
  &:before {
    position: absolute;
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background-color: rgba(${primaryDarkNew}, 0.3);
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;

export const CompanyName = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;
