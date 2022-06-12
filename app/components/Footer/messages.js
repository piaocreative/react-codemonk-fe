/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.Footer';

const year = new Date().getFullYear();
export default defineMessages({
  copyrights: {
    id: `${scope}.copyrights`,
    defaultMessage: `© CodeMonk ${year} - All rights reserved.`,
  },
  privacyPolicy: {
    id: `${scope}.author.privacyPolicy`,
    defaultMessage: `Privacy`,
  },
  ourTermsPolicy: {
    id: `${scope}.author.ourTermsPolicy`,
    defaultMessage: `Terms`,
  },
  cookiePolicy: {
    id: `${scope}.author.cookiePolicy`,
    defaultMessage: `Cookie`,
  },
  acceptablePolicy: {
    id: `${scope}.author.acceptablePolicy`,
    defaultMessage: `Acceptable`,
  },
});
