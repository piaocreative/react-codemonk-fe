import styled from 'styled-components';
import { primaryDarkNew, danger, orange, success, primaryGradientRight, primaryNew } from 'themes/variables';

const Badge = styled.span`
  color: rgb(${primaryDarkNew});
  font-family: 'GT-Walsheim-Pro-Regular';
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  font-size: 16px;
  line-height: 18px;
  padding: 6px 15px;
  border-radius: 15px;

  &.new-badge {
    font-size: 10px;
    font-family: 'GT-Walsheim-Pro-Regular';
    padding: 5px;
    position: absolute;
    right: -35px;
    top: -4px;
    z-index: 9;
    border-radius: 10px;

    @media (max-width: 1199px) {
      right: -7px;
      top: -12px;
      font-size: 8px;
    }
  }

  &.light {
    background-color: rgba(${primaryDarkNew}, 0.1);
    color: rgb(${primaryDarkNew});
  }
  &.success {
    background-color: rgb(38, 167, 61, 0.1);
    color: ${success};
  }
  &.warning {
    background-color: rgba(222, 189, 24, 0.1);
    color: rgb(222, 189, 24);
  }
  &.danger {
    background-color: rgba(226, 62, 71, 0.1);
    color: ${danger};
  }
  &.alert {
    background-color: rgba(${orange}, 0.1);
    color: rgb(${orange});
  }
  &.primary {
    background: ${primaryGradientRight};
  }
  &.secondary {
    background: rgb(${primaryNew}, 0.1);
  }
  &.badge-sm {
    font-size: 14px;
    line-height: 16px;
    padding: 4px 10px;
    border-radius: 12px;
  }
  &.badge-status {
    border-radius: 12px;
    margin-bottom: 0px;
  }
`;
export default Badge;
