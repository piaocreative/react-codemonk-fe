/*
 * Payment Pages
 *
 * This contains all the text for the Payment component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.PaymentAndBilling';

const contentOne1 =
  'In order for us to comply with Anti-Money Laundering (AML) regulations, we and our payment processors are required to meet “Know Your Customer” (KYC) obligations. ';
const contentOne2 = 'For this, we are required to collect and maintain information on all Codemonk account holders.';
const contentOne3 =
  ' These requirements come from international payment regulators and are intended to prevent abuse of the financial system.';
export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Billing & Payment details',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Billing & Payment details',
  },
  headingPaymentAndBilling: {
    id: `${scope}.headingPaymentAndBilling`,
    defaultMessage: 'Billing & Payment details',
  },
  labelRate: {
    id: `${scope}.labelRate`,
    defaultMessage: 'Daily Rate',
  },
  labelCharge: {
    id: `${scope}.labelCharge`,
    defaultMessage: 'How would you charge?',
  },
  labelProof: {
    id: `${scope}.labelProof`,
    defaultMessage: 'Proof of ID and Proof of address',
  },
  labelIdProof: {
    id: `${scope}.labelIdProof`,
    defaultMessage: 'ID Proof',
  },
  labelAddProof: {
    id: `${scope}.labelAddProof`,
    defaultMessage: 'Address Proof',
  },
  labelBilling: {
    id: `${scope}.labelBilling`,
    defaultMessage: 'Billing type',
  },
  noteProof: {
    id: `${scope}.noteProof`,
    defaultMessage:
      'Note: PNG, JPG, JPEG and PDF Only. Supported documents are passport, driving license & national ID (Document must clearly showing name, photo and address).',
  },
  labelRegNo: {
    id: `${scope}.labelRegNo`,
    defaultMessage: 'Registration No.',
  },
  labelCompanyAddr: {
    id: `${scope}.labelCompanyAddr`,
    defaultMessage: "Company's Registered Address",
  },
  labelZipCode: {
    id: `${scope}.labelZipCode`,
    defaultMessage: 'Postcode / Zip code',
  },
  labelCity: {
    id: `${scope}.labelCity`,
    defaultMessage: 'City',
  },
  labelCountry: {
    id: `${scope}.labelCountry`,
    defaultMessage: 'Country',
  },
  labelVat: {
    id: `${scope}.labelVat`,
    defaultMessage: 'VAT No.',
  },
  labelCompanyIns: {
    id: `${scope}.labelCompanyIns`,
    defaultMessage: 'Company Insurances',
  },
  labelProfIns: {
    id: `${scope}.labelProfIns`,
    defaultMessage: 'Professional & Product Liability',
  },
  labelProfInsVal: {
    id: `${scope}.labelProfInsVal`,
    defaultMessage: 'Public Liability',
  },
  labelEmpIns: {
    id: `${scope}.labelEmpIns`,
    defaultMessage: 'Employers Liability',
  },
  labelDocuments: {
    id: `${scope}.labelDocuments`,
    defaultMessage: 'Documents',
  },
  labelIncCerti: {
    id: `${scope}.labelIncCerti`,
    defaultMessage: 'Incorporation Certificate',
  },
  labelVatCerti: {
    id: `${scope}.labelVatCerti`,
    defaultMessage: 'VAT Reg. Certificate',
  },
  labelInsDoc: {
    id: `${scope}.labelInsDoc`,
    defaultMessage: 'Insurance document',
  },
  labelPayment: {
    id: `${scope}.labelPayment`,
    defaultMessage: 'Payout via',
  },
  labelBankName: {
    id: `${scope}.labelBankName`,
    defaultMessage: 'Your bank',
  },
  labelPaypal: {
    id: `${scope}.labelPaypal`,
    defaultMessage: 'Paypal ID',
  },
  content1: {
    id: `${scope}.content1`,
    defaultMessage: `${contentOne1}${contentOne2}${contentOne3}`,
  },
  content2: {
    id: `${scope}.content2`,
    defaultMessage:
      'Please be assured, your information will be encrypted & securely saved in our databases and will be automatically verified through our payment processing network.',
  },
  btnNeedThis: {
    id: `${scope}.btnNeedThis`,
    defaultMessage: '(Why we need this?)',
  },
  btnUnderstand: {
    id: `${scope}.btnUnderstand`,
    defaultMessage: 'I understand',
  },
});
