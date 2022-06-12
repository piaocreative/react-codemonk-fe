import styled from 'styled-components';
import { Button } from 'components';
import { primaryDarkNew, darkGray, lightGray, primaryNew } from 'themes/variables';
import media from 'themes/media';

export const RoleCard = styled(Button)`
  border: 2px solid #f3f2f7;
  border-radius: 5px;
  padding: 20px;
  background: none;
  text-align: initial;
  font-family: 'GT-Walsheim-Pro-Regular';
  font-weight: normal;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: auto;

  ${media.medium`
    padding: 30px;
    margin-top: 30px;
  `};
  &:active,
  &.active {
    background: none;
    border-color: rgb(${primaryNew});
  }
  &:hover {
    background: none;
    border-color: #c6c4cf;
  }

  .role-card-header {
    display: flex;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgb(${lightGray});
    width: 100%;
    h4 {
      line-height: 37px;
    }

    ${media.medium`
      padding-bottom: 30px;
      margin-bottom: 30px;
    `};

    svg {
      top: 5px;
      position: relative;
      width: 20px;
      height: 20px;
      fill: rgb(${primaryNew});
      margin-right: 12px;
      & g {
        fill: rgb(${primaryNew});
      }
    }
  }

  ul {
    padding: 0 0 0 20px;
    margin: 0;
    list-style: none;

    li {
      color: rgba(${primaryDarkNew}, 0.7);
      font-size: 16px;
      line-height: 36px;
      font-family: 'GT-Walsheim-Pro-Regular';
      position: relative;

      ${media.medium`
        font-size: 20px;
      `};

      &:before {
        content: '';
        position: absolute;
        top: 13px;
        left: -15px;
        width: 5px;
        height: 8px;
        border: solid rgba(${darkGray}, 0.7);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }
`;
