import styled from 'styled-components';
import { primaryDarkNew, primaryNew, primaryGradientRight, dangerGradient, infoGradient } from 'themes/variables';
import SVG from 'react-inlinesvg';
import media from 'themes/media';

export const PrimarySVG = styled(SVG)`
  & path {
    stroke: rgb(${primaryNew}, 0.3);
  }
`;

export const PrimaryMainSVG = styled(SVG)`
  & path {
    stroke: rgb(${primaryNew});
  }
`;

export const LegendList = styled.div`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 650px;
  margin-left: 40px;

  li {
    display: flex;
    font-size: 14px;
    color: rgba(${primaryDarkNew});
    margin-bottom: 10px;
    margin-right: 15px;
    min-width: 200px;

    span {
      margin-right: 10px;
      position: relative;
      top: 7px;
      width: 6px;
      height: 6px;
      border-radius: 2px;
    }
  }
`;

export const CountList = styled.div`
  list-style: none;
  margin-right: 20px;

  li {
    display: flex;
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      line-height: 34px;
      margin-bottom: 5px;
      letter-spacing: 0.4px;
    }

    p {
      letter-spacing: 0.3px;
      line-height: 28px;
      color: rgba(${primaryDarkNew}, 0.5);
      margin-bottom: 0;
    }

    svg {
      margin-right: 20px;
      width: 30px;
      height: 30px;
      & g {
        fill: rgb(${primaryNew});
      }
    }
  }
`;

export const CardTitle = styled.div`
  margin-bottom: 30px;
`;

export const Column1 = styled.div`
  -webkit-box-flex: 0;
  flex: 0 0 100%;
  max-width: 100%;

  @media (min-width: 1366px) {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  ${media.extraLarge`
    flex: 0 0 25%;
    max-width: 25%;
  `};
`;
export const Column2 = styled.div`
  -webkit-box-flex: 0;
  flex: 0 0 100%;
  max-width: 100%;
  @media (min-width: 1366px) {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }

  ${media.extraLarge`
    flex: 0 0 75%;
    max-width: 75%;
  `};
`;

export const TileCard = styled.div`
  padding: 10px;
  display: inline-grid;
  border-radius: 10px;
  &.danger-tile {
    background: ${dangerGradient};
  }
  &.secondary-tile {
    background: ${primaryGradientRight};
  }
  &.info-tile {
    background: ${infoGradient};
  }
  svg {
    height: 20px;
    width: 20px;
  }
`;
