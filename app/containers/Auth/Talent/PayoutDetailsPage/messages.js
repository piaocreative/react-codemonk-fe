/*
 * PayoutDetailsPage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.PayoutDetailsPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Payout details',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Payout details',
  },
  headingPayoutDetails: {
    id: `${scope}.headingPayoutDetails`,
    defaultMessage: 'Payout details',
  },
  subHeadingBankDetails: {
    id: `${scope}.subHeadingBankDetails`,
    defaultMessage: 'Bank details',
  },
  labelBankName: {
    id: `${scope}.labelBankName`,
    defaultMessage: 'Bank name',
  },
  placeholderBankName: {
    id: `${scope}.placeholderBankName`,
    defaultMessage: 'Bank name',
  },
});
