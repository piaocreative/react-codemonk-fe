/*
 * ClientDetailPage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ClientDetailPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Client Details',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Client Details',
  },
  backToClient: {
    id: `${scope}.backToClient`,
    defaultMessage: 'Back to Client List',
  },
  titleBasic: {
    id: `${scope}.titleBasic`,
    defaultMessage: 'Basic',
  },

  titlePaymentAuthority: {
    id: `${scope}.titlePaymentAuthority`,
    defaultMessage: 'Payment authority',
  },
  titleAddressAuthorisedPerson: {
    id: `${scope}.titleAddressAuthorisedPerson`,
    defaultMessage: 'Address of authorised person',
  },

  titleClientDetails: {
    id: `${scope}.titleClientDetails`,
    defaultMessage: 'Client Details',
  },
});
