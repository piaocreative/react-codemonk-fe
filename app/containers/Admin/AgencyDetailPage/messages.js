/*
 * AgencyDetailPage Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AgencyDetailPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Agency Details',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Agency Details',
  },
  backToAgency: {
    id: `${scope}.backToAgency`,
    defaultMessage: 'Back to Agency List',
  },
  titlePersonalDetails: {
    id: `${scope}.titlePersonalDetails`,
    defaultMessage: 'Personal details',
  },
  titleAgencyDetails: {
    id: `${scope}.titleAgencyDetails`,
    defaultMessage: 'Agency Details',
  },
  titleTradingDetails: {
    id: `${scope}.titleTradingDetails`,
    defaultMessage: 'Trading details',
  },
  titleAgencyLogo: {
    id: `${scope}.titleAgencyLogo`,
    defaultMessage: 'Logo',
  },
  titleAgencyTradingAddress: {
    id: `${scope}.titleAgencyTradingAddress`,
    defaultMessage: 'Trading office address',
  },

  // fields
  labelAgencyLogo: {
    id: `${scope}.labelAgencyLogo`,
    defaultMessage: 'Trading company logo',
  },
});
