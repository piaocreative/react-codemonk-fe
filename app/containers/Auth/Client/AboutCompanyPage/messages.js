/*
 * AboutYouPage Messages
 *
 * This contains all the text for the AboutYouPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AboutYouPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'About your Company',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'About your Company',
  },
  aboutYourCompany: {
    id: `${scope}.aboutYourCompany`,
    defaultMessage: 'About your Company',
  },
  aboutYourCompanyTagLine: {
    id: `${scope}.aboutYourCompanyTagLine`,
    defaultMessage: 'Describe your business for us to better match you with best candidates',
  },
  saveLaterButton: {
    id: `${scope}.saveLaterButton`,
    defaultMessage: 'Save for Later',
  },
  continueButton: {
    id: `${scope}.continueButton`,
    defaultMessage: 'Continue',
  },
  uploadCompanyLogo: {
    id: `${scope}.uploadCompanyLogo`,
    defaultMessage: 'Upload company logo',
  },
  labelBrandName: {
    id: `${scope}.labelBrandName`,
    defaultMessage: 'Brand / Trading name',
  },
  labelVatTaxNumber: {
    id: `${scope}.labelVatTaxNumber`,
    defaultMessage: 'VAT / GST / Tax No',
  },
  placeholderVatTaxNumber: {
    id: `${scope}.placeholderVatTaxNumber`,
    defaultMessage: 'VAT (or Tax) No.',
  },
  titleOnlineProfiles: {
    id: `${scope}.titleOnlineProfiles`,
    defaultMessage: 'Online profiles',
  },
});
