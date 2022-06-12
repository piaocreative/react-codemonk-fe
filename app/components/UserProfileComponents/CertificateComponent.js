import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field, change, untouch } from 'redux-form/immutable';
import get from 'lodash/get';
import moment from 'moment';
import * as formValidations from 'utils/formValidations';
import { renderField } from 'utils/Fields';
import SVG from 'react-inlinesvg';
import { FormLabel, DatePickers, LinkButtonMod } from 'components';
import { deleteIcon } from 'containers/App/constants';
import { propTypes } from 'containers/proptypes';
import { checkForTouchedCertificate } from 'containers/Auth/Education-Certification/utils';
import containerMessage from 'containers/messages';
import authMessages from 'containers/Auth/Education-Certification/messages';
import messages from './messages';
import { setInputClass } from './utils';

export class CertificateComponent extends React.Component {
  constructor(props) {
    super(props);
    const { certificate } = props;
    this.state = { stateCertificate: certificate };
  }

  componentDidMount() {
    const { onBoarding, certificate, index, formKey } = this.props;
    if (!onBoarding) this.setValues(certificate, index, formKey);
  }

  setValues = (certificate, index, formKey) => {
    const { dispatch, onChangeCertificate } = this.props;
    dispatch(change(formKey, `name${index}`, certificate[index].name));
    dispatch(change(formKey, `dateObtained${index}`, certificate[index].dateObtained));
    dispatch(change(formKey, `issuedBy${index}`, certificate[index].issuedBy));
    dispatch(change(formKey, `certificateId${index}`, certificate[index].certificateId));

    dispatch(untouch(formKey, `name${index}`));
    dispatch(untouch(formKey, `dateObtained${index}`));
    dispatch(untouch(formKey, `issuedBy${index}`));
    dispatch(untouch(formKey, `certificateId${index}`));

    onChangeCertificate(certificate);
  };

  handleFieldData = (e, index) => {
    const { formKey, dispatch, onChangeCertificate, certificate } = this.props;
    const { value, name } = e.target;
    const fieldName = name.split(/([0-9]+)/);
    const stringField = fieldName[0];
    dispatch(change(formKey, name, value));
    const setCertificate = certificate;
    setCertificate[index][stringField] = value;
    onChangeCertificate(setCertificate);
  };

  handleDateChange = (date, index, fieldName) => {
    const { formKey, dispatch, onChangeCertificate, certificate } = this.props;
    const dateName = fieldName.split(/([0-9]+)/);
    const stringField = dateName[0];
    dispatch(change(formKey, fieldName, date));
    const setCertificate = certificate;
    setCertificate[index][stringField] = date;
    onChangeCertificate(setCertificate);
  };

  getValidation = (index, validation) => {
    const { onBoarding, certificateTouch } = this.props;
    let output = '';
    if (onBoarding) {
      if (certificateTouch[index] === 1) {
        output = validation;
      } else {
        output = [];
      }
    } else {
      output = validation;
    }
    return output;
  };

  checkForEmpty = (certificate, index) => {
    const { onChangeSecondCertificate, certificateTouch } = this.props;
    if (!checkForTouchedCertificate(certificate[index])) {
      const newCertificateTouch = certificateTouch;
      newCertificateTouch[index] = 0;
      onChangeSecondCertificate(newCertificateTouch);
    }
  };

  changeFieldData = (e, index) => {
    const { onBoarding, certificate, certificateTouch, onChangeSecondCertificate } = this.props;
    if (onBoarding) {
      const newCertificateTouch = certificateTouch;
      newCertificateTouch[index] = 1;
      onChangeSecondCertificate(newCertificateTouch);
      this.handleFieldData(e, index);
      this.checkForEmpty(certificate, index);
    } else {
      this.handleFieldData(e, index);
    }
  };

  onChangeRaw = (date, certificate, index, type) => {
    const validData1 = moment(date, 'DD/MM/YYYY', true).isValid();
    const validData2 = moment(date, 'DD-MM-YYYY', true).isValid();
    if (validData1 || validData2) {
      const resetDate = certificate;
      resetDate[index][type] = date;
      this.handleDateChange(date, index, `${type}${index}`);
      this.checkForEmpty(certificate, index);
    }
  };

  dateChange = (certificate, date, index, type) => {
    const { onBoarding, certificateTouch, onChangeSecondCertificate } = this.props;

    const newCertificate = certificate;
    newCertificate[index][type] = date;
    if (onBoarding) {
      const newCertificateTouch = certificateTouch;
      newCertificateTouch[index] = 1;
      onChangeSecondCertificate(newCertificateTouch);
      this.checkForEmpty(certificate, index);
    }

    this.setState({ stateCertificate: newCertificate });
    this.handleDateChange(date, index, `${type}${index}`);
  };

  renderDeleteButton = (certificate, onBoarding, index, onDeleteForm) => {
    const { editFlag = true } = this.props;
    let output = '';
    if (onBoarding) {
      if (certificate.length > 0) {
        output = (
          <React.Fragment>
            <LinkButtonMod
              className="me-5"
              color="link"
              disabled={!editFlag}
              onClick={() => {
                onDeleteForm(index);
              }}
            >
              <SVG src={deleteIcon} />

              <small className="opacity-100">
                <FormattedMessage {...messages.labelDeleteCertificate} />
              </small>
            </LinkButtonMod>
            <hr className="hr-280" />
          </React.Fragment>
        );
      } else {
        output = <hr className="hr-280" />;
      }
    } else {
      output = null;
    }
    return output;
  };

  render() {
    const { certificate, index, size, onBoarding, onDeleteForm, agency = false, editFlag = true } = this.props;
    const { stateCertificate } = this.state;
    return (
      <React.Fragment>
        {certificate.length > 0 && (
          // eslint-disable-next-line no-underscore-dangle
          <React.Fragment key={certificate[index]._id}>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelCertiName} />
                  </FormLabel>
                  <Field
                    name={`name${index}`}
                    type="text"
                    component={renderField}
                    disabled={!editFlag}
                    placeholder={authMessages.placeholderCertiName.defaultMessage}
                    defaultValue={certificate[index].name}
                    onChange={e => this.changeFieldData(e, index)}
                    validate={this.getValidation(index, [
                      formValidations.required,
                      formValidations.minLength2,
                      formValidations.maxLength50,
                    ])}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelDateObtained} />
                  </FormLabel>
                  <Field
                    name={`dateObtained${index}`}
                    component={DatePickers}
                    disabled={!editFlag}
                    showYearDropDown
                    yearDropdownItemNumber={20}
                    scrollableYearDropdown
                    placeholder={containerMessage.placeholderDate.defaultMessage}
                    maxDate={new Date()}
                    selected={get(stateCertificate[index], 'dateObtained')}
                    defaultValue={get(certificate[index], 'dateObtained')}
                    placement="bottom-start"
                    withIcon
                    onChange={date => this.dateChange(certificate, date, index, `dateObtained`)}
                    onChangeRaw={e => this.onChangeRaw(e.target.value, certificate, index, `dateObtained`)}
                    validate={this.getValidation(index, [formValidations.requiredDate])}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="row-spacing">
              <Col>
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelIssuingOrg} />
                  </FormLabel>
                  <Field
                    name={`issuedBy${index}`}
                    type="text"
                    component={renderField}
                    disabled={!editFlag}
                    placeholder={authMessages.placeholderIssuingOrg.defaultMessage}
                    defaultValue={certificate[index].issuedBy}
                    onChange={e => this.changeFieldData(e, index)}
                    validate={this.getValidation(index, [
                      formValidations.required,
                      formValidations.minLength2,
                      formValidations.maxLength50,
                    ])}
                  />
                </FormGroup>
              </Col>
            </Row>
            {!agency && (
              <Row className="row-spacing">
                <Col>
                  <FormGroup className={setInputClass(size)}>
                    <FormLabel>
                      <FormattedMessage {...authMessages.labelCertiId} />
                    </FormLabel>
                    <Field
                      name={`certificateId${index}`}
                      type="text"
                      component={renderField}
                      disabled={!editFlag}
                      placeholder={authMessages.placeholderCertiId.defaultMessage}
                      defaultValue={certificate[index].certificateId}
                      onChange={e => this.changeFieldData(e, index)}
                      validate={this.getValidation(index, [formValidations.required, formValidations.minLength2])}
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
            {this.renderDeleteButton(certificate, onBoarding, index, onDeleteForm)}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

CertificateComponent.propTypes = propTypes;
