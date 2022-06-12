/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.LoginPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Login',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Login',
  },
  headingLogin: {
    id: `${scope}.headingLogin`,
    defaultMessage: 'Hi, welcome back!',
  },
  headingAdminLogin: {
    id: `${scope}.headingAdminLogin`,
    defaultMessage: 'Login to CodeMonk admin panel',
  },
  labelPassword: {
    id: `${scope}.labelPassword`,
    defaultMessage: 'Password',
  },
  placeHolderPassword: {
    id: `${scope}.placeHolderPassword`,
    defaultMessage: 'Your password',
  },
  textBeforeSignupButton: {
    id: `${scope}.textBeforeSignupButton`,
    defaultMessage: "Don't have an account with us?",
  },
  signupButtonText: {
    id: `${scope}.signupButtonText`,
    defaultMessage: 'Sign up here',
  },
  loginButtonText: {
    id: `${scope}.loginButtonText`,
    defaultMessage: 'Login',
  },
  forgotPasswordText: {
    id: `${scope}.forgotPasswordText`,
    defaultMessage: 'Forgot password?',
  },
  noVerificationText: {
    id: `${scope}.noVerificationText`,
    defaultMessage: 'Your account is inactive, please activate your account first.',
  },
});
