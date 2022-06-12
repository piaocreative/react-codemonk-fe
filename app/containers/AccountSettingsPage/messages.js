/*
 * AccountSettingsPage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AccountSettingsPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Account Settings',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Account Settings',
  },
  salaryBilling: {
    id: `${scope}.salaryBilling`,
    defaultMessage: 'Salary & Billing',
  },
  tabDocuments: {
    id: `${scope}.tabDocuments`,
    defaultMessage: 'Documents',
  },
  tabNotifications: {
    id: `${scope}.tabNotifcations`,
    defaultMessage: 'Notifcations',
  },
  tabSecurity: {
    id: `${scope}.tabSecurity`,
    defaultMessage: 'Security',
  },
  tabPayment: {
    id: `${scope}.tabPayment`,
    defaultMessage: 'Payment',
  },
  headingBilling: {
    id: `${scope}.headingBilling`,
    defaultMessage: 'Billing details',
  },
  headingPayment: {
    id: `${scope}.headingPayment`,
    defaultMessage: 'Payment details',
  },
  updateYourNotificationPreferences: {
    id: `${scope}.updateYourNotificationPreferences`,
    defaultMessage: 'Update your notification preferences',
  },
  headingDeleteAccount: {
    id: `${scope}.headingDeleteAccount`,
    defaultMessage: 'Your account',
  },
  labelYourAccount: {
    id: `${scope}.labelYourAccount`,
    defaultMessage: 'Delete your account and all data held with us',
  },
});
