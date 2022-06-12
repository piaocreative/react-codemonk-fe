/*
 * Payment Pages
 *
 * This contains all the text for the Payment component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.PaymentAndBilling';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Documents',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Documents',
  },
  headingDocuments: {
    id: `${scope}.headingDocuments`,
    defaultMessage: 'Documents',
  },
  titleCompanyDocument: {
    id: `${scope}.titleCompanyDocument`,
    defaultMessage: 'Company documents',
  },
  titleAddressProof: {
    id: `${scope}.titleAddressProof`,
    defaultMessage: "Director's ID & address proof",
  },
  labelCompnayRegCertificate: {
    id: `${scope}.labelCompnayRegCertificate`,
    defaultMessage: 'Company registration certificate',
  },
  labelTaxRegCertificate: {
    id: `${scope}.labelTaxRegCertificate`,
    defaultMessage: 'Tax registration certificate',
  },
  labelUtilityBill: {
    id: `${scope}.labelUtilityBill`,
    defaultMessage: 'Utility bill of the company',
  },
  labelUtilityBillInstruction: {
    id: `${scope}.labelUtilityBillInstruction`,
    defaultMessage: '(Address must be match with trading address)',
  },
  labelIdProof: {
    id: `${scope}.labelIdProof`,
    defaultMessage: 'ID Proof',
  },
  labelAddProof: {
    id: `${scope}.labelAddProof`,
    defaultMessage: 'Address Proof',
  },
  noteProof: {
    id: `${scope}.noteProof`,
    defaultMessage:
      'Note: PNG, JPEG and PDF Only. Supported documents are passport, driving license & national ID (Dodument must clearly showing name, photo and address).',
  },
  btnBack: {
    id: `${scope}.btnBack`,
    defaultMessage: 'Back',
  },
  btnSaveLater: {
    id: `${scope}.btnSaveLater`,
    defaultMessage: 'Save for Later',
  },
  btnContinue: {
    id: `${scope}.btnContinue`,
    defaultMessage: 'Continue',
  },
});
