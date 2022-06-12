import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import get from 'lodash/get';
import * as formValidations from 'utils/formValidations';
import { renderFileReplacement, renderFileAttach } from 'utils/Fields';
import { allowedFileTypes } from 'containers/App/constants';
import { FormLabel, H4 } from 'components';

import { propTypes } from 'containers/proptypes';
import authMessages from 'containers/Auth/Talent/DocumentsPage/messages';

export class CompanyDocuments extends React.Component {
  renderCompanyCertificate = () => {
    const { companyIncorporationCertificateUrl, fileUploading, docError, onFileChange, onDeleteFile, editFlag } = this.props;
    let output = '';
    if (!companyIncorporationCertificateUrl) {
      output = (
        <Field
          name="companyIncorporationCertificateUrl"
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.payment}
          stateVar={companyIncorporationCertificateUrl}
          wrapperClassName={fileUploading.companyIncorporationCertificateUrl}
          loading={fileUploading.companyIncorporationCertificateUrl}
          onChangeFile={e => onFileChange(e)}
          onDeleteFile={() => onDeleteFile('companyIncorporationCertificateUrl')}
          validate={[formValidations.requiredDocument]}
          docError={get(docError, 'companyIncorporationCertificateUrl')}
          disabled={!editFlag}
        />
      );
    } else {
      output = (
        <Field
          name="companyIncorporationCertificateUrl"
          type="text"
          component={renderFileReplacement}
          disabled
          editFlag={editFlag}
          stateVar={companyIncorporationCertificateUrl}
          onDeleteFile={() => onDeleteFile('companyIncorporationCertificateUrl')}
        />
      );
    }
    return output;
  };

  renderTaxCertificate = () => {
    const { companyTaxRegistrationCertificateUrl, fileUploading, docError, onFileChange, onDeleteFile, editFlag } = this.props;
    let output = '';

    if (!companyTaxRegistrationCertificateUrl) {
      output = (
        <Field
          name="companyTaxRegistrationCertificateUrl"
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.payment}
          stateVar={companyTaxRegistrationCertificateUrl}
          wrapperClassName={fileUploading.companyTaxRegistrationCertificateUrl}
          loading={fileUploading.companyTaxRegistrationCertificateUrl}
          onChangeFile={e => onFileChange(e)}
          onDeleteFile={() => onDeleteFile('companyTaxRegistrationCertificateUrl')}
          validate={[formValidations.requiredDocument]}
          docError={get(docError, 'companyTaxRegistrationCertificateUrl')}
          disabled={!editFlag}
        />
      );
    } else {
      output = (
        <Field
          name="companyTaxRegistrationCertificateUrl"
          type="text"
          component={renderFileReplacement}
          disabled
          editFlag={editFlag}
          stateVar={companyTaxRegistrationCertificateUrl}
          onDeleteFile={() => onDeleteFile('companyTaxRegistrationCertificateUrl')}
        />
      );
    }
    return output;
  };

  renderUtilityBill = () => {
    const { utilityBillDocumentUrl, fileUploading, docError, onFileChange, onDeleteFile, editFlag } = this.props;
    let output = '';

    if (!utilityBillDocumentUrl) {
      output = (
        <Field
          name="utilityBillDocumentUrl"
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.payment}
          stateVar={utilityBillDocumentUrl}
          wrapperClassName={fileUploading.utilityBillDocumentUrl}
          loading={fileUploading.utilityBillDocumentUrl}
          onChangeFile={e => onFileChange(e)}
          onDeleteFile={() => onDeleteFile('utilityBillDocumentUrl')}
          validate={[formValidations.requiredDocument]}
          docError={get(docError, 'utilityBillDocumentUrl')}
          disabled={!editFlag}
        />
      );
    } else {
      output = (
        <Field
          name="utilityBillDocumentUrl"
          type="text"
          component={renderFileReplacement}
          disabled
          editFlag={editFlag}
          stateVar={utilityBillDocumentUrl}
          onDeleteFile={() => onDeleteFile('utilityBillDocumentUrl')}
        />
      );
    }
    return output;
  };

  render() {
    return (
      <React.Fragment>
        <H4>
          <FormattedMessage {...authMessages.titleCompanyDocument} />
        </H4>
        <Row className="mt-4">
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelCompnayRegCertificate} />
              </FormLabel>
              {this.renderCompanyCertificate()}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelTaxRegCertificate} />
              </FormLabel>
              {this.renderTaxCertificate()}
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelUtilityBill} />
                <small>
                  <FormattedMessage {...authMessages.labelUtilityBillInstruction} />
                </small>
              </FormLabel>
              {this.renderUtilityBill()}
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

CompanyDocuments.propTypes = propTypes;
