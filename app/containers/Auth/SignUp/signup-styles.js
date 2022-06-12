import styled from 'styled-components';
import { primaryNew, primaryDarkNew, primaryGradientRight } from 'themes/variables';

export const PasswordFieldWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const ToolTipUlWrapper = styled.div`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-left: 0px;
    text-align: left;
    width: 100%;
    li {
      margin-bottom: 3px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
export const UserTypeButtonGroup = styled.div`
  border-radius: 23px;
  border: 1px solid rgba(${primaryNew}, 0.2);

  button {
    font-size: 16px;
    line-height: 18px;
    color: rgba(${primaryDarkNew}, 0.5);
    border-radius: 23px;
    border: 0;
    width: 50%;
    height: 46px;
    background: transparent;
    transition: background 1s linear 2s, color 1s;

    &.active {
      color: rgb(${primaryDarkNew});
      background: ${primaryGradientRight};
    }
  }
`;

export const UserBulletPointList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-bottom: 9px;
    display: grid;
    grid-template-columns: auto 1fr;

    &:last-child {
      margin-bottom: 0;
    }
    svg {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
    p {
      margin-bottom: 0;
    }
  }
`;
