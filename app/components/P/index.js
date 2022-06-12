import styled from 'styled-components';
import { black, primaryDarkNew } from 'themes/variables';
import media from 'themes/media';

const P = styled.p`
  font-size: 16px;
  color: rgb(${black});
  ${media.large`
    font-size: 20px;
  `};

  &.p-sm {
    font-size: 16px;
  }

  &.p-large {
    font-size: 18px;
    ${media.large`
      font-size: 24px;
    `};
  }

  &.onboarding-intro {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }

  font-family: 'GT-Walsheim-Pro-Regular';
  > b {
    font-family: 'GT-Walsheim-Pro-Bold';
  }
  &.p12 {
    font-size: 12px;
    line-height: ${props => (props.lineHeight ? `${props.lineHeight}px` : '11px')};
    color: rgb(${primaryDarkNew}, ${props => props.opacityVal || 1});
    font-family: ${props => props.fontFamily || 'GT-Walsheim-Pro-Regular'};
  }
  &.p14 {
    font-size: 14px;
    line-height: ${props => (props.lineHeight ? `${props.lineHeight}px` : '16px')};
    color: rgba(${primaryDarkNew}, ${props => props.opacityVal || 1});
    font-family: ${props => props.fontFamily || 'GT-Walsheim-Pro-Regular'};
  }
  &.p16 {
    font-size: 16px;
    line-height: ${props => (props.lineHeight ? `${props.lineHeight}px` : '18px')};
    color: rgba(${primaryDarkNew}, ${props => props.opacityVal || 1});
    font-family: ${props => props.fontFamily || 'GT-Walsheim-Pro-Regular'};
  }
  &.p20 {
    font-size: 20px;
    line-height: ${props => (props.lineHeight ? `${props.lineHeight}px` : '23px')};
    color: rgba(${primaryDarkNew}, ${props => props.opacityVal || 1});
    font-family: ${props => props.fontFamily || 'GT-Walsheim-Pro-Regular'};
  }
  &.present-text {
    min-height: 46px;
  }
`;

export default P;
