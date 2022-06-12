import styled from 'styled-components';
import { Card } from 'components';
import { Link } from 'react-router-dom';

export const ProjectCardLink = styled(Link)`
  display: block;
  margin-top: 40px;
  text-decoration: none;

  p.user-title {
    margin: 20px 0 10px;
  }
`;

export const CardBlock = styled(Card)`
  position: relative;
  padding-top: 55px !important;
  .icon-container {
    position: absolute;
    left: 20px;
    top: -40px;
  }
  .LinesEllipsis,
  .LinesEllipsis * {
    font-size: inherit !important;
    line-height: inherit !important;
    font-family: inherit !important;
    color: inherit !important;
    background-color: transparent !important;
  }
`;
