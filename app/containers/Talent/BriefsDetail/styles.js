/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Button } from 'components';
import { primaryNew, white } from 'themes/variables';

export const HeadBackLink = styled(Button)`
  color: rgb(${primaryNew});
  font-size: 16px;
  letter-spacing: 0.25px;
  margin-bottom: 10px;
  display: inline-block;
  position: relative;
  background: none;
  text-align: left;
  padding: 14px !important;
  height: 40px;
  width: 40px;
  min-width: unset;
  background: rgb(${white});
  border-radius: 10px;

  &:hover {
    color: rgb(${primaryNew});
    text-decoration: underline;
  }

  &:before {
    content: '';
    height: 8px;
    width: 8px;
    padding: 3px;
    margin-left: 3px;
    margin-right: 4px;
    display: inline-block;
    border: solid #4c00ff;
    border-width: 0px 3px 3px 0px;
    transform: rotate(135deg) translateY(1px);
  }
`;
