import { css } from 'styled-components';

const sizes = {
  xsmall: 0,
  small: 350,
  medium: 768,
  large: 1200,
  extraLarge: 1670,
};
function xsmall(...args) {
  return css`
    @media (min-width: ${sizes.xsmall}px) {
      ${css(...args)};
    }
  `;
}
function small(...args) {
  return css`
    @media (min-width: ${sizes.small}px) {
      ${css(...args)};
    }
  `;
}

function large(...args) {
  return css`
    @media (min-width: ${sizes.large}px) {
      ${css(...args)};
    }
  `;
}

function extraLarge(...args) {
  return css`
    @media (min-width: ${sizes.extraLarge}px) {
      ${css(...args)};
    }
  `;
}

function medium(...args) {
  return css`
    @media (min-width: ${sizes.medium}px) {
      ${css(...args)};
    }
  `;
}

const media = {
  xsmall,
  small,
  medium,
  large,
  extraLarge,
};

export default media;
