import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import get from 'lodash/get';
import containerMessage from 'containers/messages';
import * as formValidations from 'utils/formValidations';
import { renderFileReplacement, renderFileAttach } from 'utils/Fields';
import { allowedFileTypes } from 'containers/App/constants';
import { FormLabel, H4 } from 'components';
import { propTypes } from 'containers/proptypes';
import authMessages from 'containers/Auth/PaymentAndBilling/messages';

export class CompanyDocumentsComponent extends React.Component {
  renderIncCerti = () => {
    const { companyIncorporationCertificateUrl, fileUploading, docError, onFileChange, onDeleteFile, editFlag } = this.props;
    let output = '';
    if (!companyIncorporationCertificateUrl) {
      output = (
        <Field
          type="file"
          name="companyIncorporationCertificateUrl"
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
          type="text"
          name="companyIncorporationCertificateUrl"
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

  renderVatCerti = () => {
    const { companyVatRegistrationCertificateUrl, fileUploading, docError, onFileChange, onDeleteFile, editFlag } = this.props;
    let output = '';
    if (!companyVatRegistrationCertificateUrl) {
      output = (
        <Field
          name="companyVatRegistrationCertificateUrl"
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.payment}
          stateVar={companyVatRegistrationCertificateUrl}
          wrapperClassName={fileUploading.companyVatRegistrationCertificateUrl}
          loading={fileUploading.companyVatRegistrationCertificateUrl}
          onChangeFile={e => onFileChange(e)}
          onDeleteFile={() => onDeleteFile('companyVatRegistrationCertificateUrl')}
          docError={get(docError, 'companyVatRegistrationCertificateUrl')}
          disabled={!editFlag}
        />
      );
    } else {
      output = (
        <Field
          name="companyVatRegistrationCertificateUrl"
          type="text"
          component={renderFileReplacement}
          disabled
          editFlag={editFlag}
          stateVar={companyVatRegistrationCertificateUrl}
          onDeleteFile={() => onDeleteFile('companyVatRegistrationCertificateUrl')}
        />
      );
    }
    return output;
  };

  renderInstCerti = () => {
    const { companyInsuranceDocumentUrl, fileUploading, docError, onFileChange, onDeleteFile, editFlag } = this.props;
    let output = '';
    if (!companyInsuranceDocumentUrl) {
      output = (
        <Field
          name="companyInsuranceDocumentUrl"
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.payment}
          stateVar={companyInsuranceDocumentUrl}
          wrapperClassName={fileUploading.companyInsuranceDocumentUrl}
          loading={fileUploading.companyInsuranceDocumentUrl}
          onChangeFile={e => onFileChange(e)}
          onDeleteFile={() => onDeleteFile('companyInsuranceDocumentUrl')}
          docError={get(docError, 'companyInsuranceDocumentUrl')}
          disabled={!editFlag}
        />
      );
    } else {
      output = (
        <Field
          name="companyInsuranceDocumentUrl"
          type="text"
          component={renderFileReplacement}
          disabled
          editFlag={editFlag}
          stateVar={companyInsuranceDocumentUrl}
          onDeleteFile={() => onDeleteFile('companyInsuranceDocumentUrl')}
        />
      );
    }
    return output;
  };

  render() {
    return (
      <React.Fragment>
        <H4>
          <FormattedMessage {...authMessages.labelDocuments} />
        </H4>
        <Row className="row-spacing">
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelIncCerti} />
              </FormLabel>
              {this.renderIncCerti()}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelVatCerti} />
                <small className="optional-text">
                  <FormattedMessage {...containerMessage.optionalText} />
                </small>
              </FormLabel>
              {this.renderVatCerti()}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelInsDoc} />
                <small className="optional-text">
                  <FormattedMessage {...containerMessage.optionalText} />
                </small>
              </FormLabel>
              {this.renderInstCerti()}
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

CompanyDocumentsComponent.propTypes = propTypes;
