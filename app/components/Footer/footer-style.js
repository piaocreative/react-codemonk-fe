import styled from 'styled-components';
import { white, primaryNew, primaryDarkNew } from 'themes/variables';
import media from 'themes/media';

export const SocialLinks = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;

  @media (max-width: 991px) {
    margin-top: 15px;
  }

  ${media.medium`
    justify-content: end;
  `};

  @media screen and (max-width: 991px) and (min-width: 768px) {
    grid-column-start: 1;
    grid-column-end: span 2;
    grid-row-start: 2;
    grid-row-end: span 2;
  }

  li {
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }

    a {
      display: flex;
      svg {
        width: 16px;
        height: 16px;

        & g,
        path {
          fill: rgba(${primaryDarkNew}, 0.5);
        }
      }
    }
  }
`;

export const Footer = styled.div`
  background: rgb(${white});
  display: grid;
  grid-auto-flow: column;
  padding: 19px 30px;
  color: rgb(${primaryDarkNew});
  font-family: 'GT-Walsheim-Pro-Regular';
  border-top: 1px solid rgba(${primaryNew}, 0.1);

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
  }

  &.signin-footer {
    display: grid;
    grid-template-columns: 1fr;

    @media (max-width: 991px) {
      ${SocialLinks} {
        justify-content: center;
      }
    }
    ul.footer-links {
      display: none;
    }
  }

  ul.footer-links {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    justify-content: center;

    @media screen and (max-width: 991px) and (min-width: 768px) {
      justify-content: end;
    }
    @media (max-width: 767px) {
      margin-top: 15px;
    }

    li {
      display: flex;
      margin-right: 16px;
      a {
        color: rgb(${primaryDarkNew}, 0.5);
        font-size: 16px;
        line-height: 18px;
        text-decoration: none;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }

  p {
    margin-bottom: 0;
    text-align: center;
    ${media.medium`
      text-align: left;
    `};
  }

  &.signin-footer,
  &.auth-footer {
    padding: 20px 30px;
    align-self: flex-end;
    width: 100%;
    z-index: 1;

    ${media.medium`
      padding: 20px 50px;
    `};

    ${media.large`
      padding: 30px 100px;
    `};
  }
  &.auth-footer {
    padding: 30px;
  }
  &.signin-footer {
    border-top: 0;
    p {
      text-align: center;
      @media (min-width: 992px) {
        text-align: left;
      }
    }
  }
`;
