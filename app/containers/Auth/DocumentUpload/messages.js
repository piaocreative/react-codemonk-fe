/*
 * Document upload Pages
 *
 * This contains all the text for the Document upload component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.documentUpload';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Document upload',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Document upload',
  },
  headingDocumentUpload: {
    id: `${scope}.headingDocumentUpload`,
    defaultMessage: 'Document upload',
  },
  documentUploadTagLine: {
    id: `${scope}.documentUploadTagLine`,
    defaultMessage:
      'We need to verify your identity to comply with Anti Money laundering (AML) regulations and ensure only genuine candidates are presented to our clients.',
  },
  identityDocs: {
    id: `${scope}.identityDocs`,
    defaultMessage: 'Your identity documents',
  },
  proofOfIdentity: {
    id: `${scope}.proofOfIdentity`,
    defaultMessage: 'Proof of Identity',
  },
  proofOfAddress: {
    id: `${scope}.proofOfAddress`,
    defaultMessage: 'Proof of Address',
  },
  companyDocs: {
    id: `${scope}.companyDocs`,
    defaultMessage: 'Your company documents',
  },
  companyRegisterCertificate: {
    id: `${scope}.companyRegisterCertificate`,
    defaultMessage: 'Company registration certificate',
  },
  vatNumber: {
    id: `${scope}.vatNumber`,
    defaultMessage: 'Sales / VAT / GST / Other tax number, if registered',
  },
  companyInsuranceCertificate: {
    id: `${scope}.companyInsuranceCertificate`,
    defaultMessage: 'Company insurance certificate',
  },
  documentUploadSuccess: {
    id: `${scope}.documentUploadSuccess`,
    defaultMessage: 'Documents uploaded successfully',
  },
});
