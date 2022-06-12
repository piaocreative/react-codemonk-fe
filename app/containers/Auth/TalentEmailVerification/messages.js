/*
 * TalentEmailVerification
 * This contains all the text for the TalentEmailVerification.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.TalentEmailVerification';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Verify your email',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Verify your email',
  },
  placeholderVerificatonCode: {
    id: `${scope}.placeholderVerificatonCode`,
    defaultMessage: 'Enter verification code',
  },
  labelVerificatonCode: {
    id: `${scope}.labelVerificatonCode`,
    defaultMessage: 'Verification code',
  },
});
