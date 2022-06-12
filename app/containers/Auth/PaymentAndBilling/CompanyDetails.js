import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { change, Field, touch } from 'redux-form/immutable';
import * as normalize from 'utils/normalize';
import * as formValidations from 'utils/formValidations';
import { FormattedMessage } from 'react-intl';
import containerMessage from 'containers/messages';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import { defaultProps, propTypes } from 'containers/proptypes';
import { renderField, renderAddressField } from 'utils/Fields';
import { setChange } from 'containers/Auth/utils';
import { H4, FormLabel, FormWrapper } from 'components';
import Selects from 'components/Selects';
import { countryData } from 'containers/App/constants';
import { CompanyDocumentsComponent } from 'components/UserProfileComponents/CompanyDocumentsComponent';
import { getAddressObject } from 'components/UserProfileComponents/utils';
import messages from './messages';

export class CompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  handleChange = address => {
    const { formKey, dispatch, handleChangeCompanyDetails } = this.props;
    this.setState({ address });
    const event = { target: { name: 'companyAddressLineOne', value: address } };
    handleChangeCompanyDetails(event);
    dispatch(change(formKey, 'companyAddressLineOne', address));
  };

  handleSelect = (address, placeId) => {
    const { formKey, dispatch, onChangeCompanyDetails, companyDetails } = this.props;
    geocodeByPlaceId(placeId)
      .then(results => {
        const addObj = getAddressObject(results[0], address);

        const addressData = companyDetails;
        addressData.companyPincode = addObj.postcode;
        addressData.companyCity = addObj.city;
        addressData.companyCountry = { label: addObj.country, value: addObj.country };
        addressData.companyAddressLineOne = addObj.addressLineOne;
        addressData.companyAddressLineTwo = addObj.addressLineTwo;

        setChange(dispatch, formKey, addressData);
        this.setState({ address: addressData.companyAddressLineOne });
        onChangeCompanyDetails(addressData);
      })
      .catch();
  };

  componentDidMount() {}

  renderRow1 = () => {
    const { companyDetails, handleChangeCompanyDetails, editFlag = true } = this.props;
    return (
      <React.Fragment>
        <H4>
          <FormattedMessage {...containerMessage.titleCompanyDetails} />
        </H4>
        <Row className="row-spacing">
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelCompanyName} />
              </FormLabel>
              <Field
                name="companyName"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder={containerMessage.placeHolderCompanyName.defaultMessage}
                value={companyDetails.companyName}
                onChange={handleChangeCompanyDetails}
                validate={[formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelRegNo} />
              </FormLabel>
              <Field
                name="companyregisteredNumber"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder="e.g. 12345678"
                value={companyDetails.companyregisteredNumber}
                onChange={handleChangeCompanyDetails}
                validate={[formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  renderRow2 = () => {
    const { companyDetails, handleChangeCompanyDetails, editFlag = true } = this.props;

    return (
      <Row className="row-spacing">
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelZipCode} />
            </FormLabel>
            <Field
              name="companyPincode"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder="Pincode"
              value={companyDetails.companyPincode}
              onChange={handleChangeCompanyDetails}
              validate={[formValidations.requiredField]}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelCity} />
            </FormLabel>
            <Field
              name="companyCity"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder="City"
              value={companyDetails.companyCity}
              onChange={handleChangeCompanyDetails}
              validate={[formValidations.requiredField]}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelCountry} />
            </FormLabel>
            <Field
              name="companyCountry"
              component={Selects}
              disable={!editFlag}
              placeholder="Country"
              defaultValue={companyDetails.companyCountry}
              options={countryData.map(c => ({
                label: c.name,
                value: c.name,
              }))}
              onChange={data => handleChangeCompanyDetails({ target: { name: 'companyCountry', value: data } })}
              validate={[formValidations.requiredSelect]}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  };

  renderRow3 = () => {
    const { companyDetails, handleChangeCompanyDetails, formKey, dispatch, editFlag = true } = this.props;
    const { address } = this.state;
    return (
      <Row className="row-spacing">
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelLine1} />
            </FormLabel>
            <Field
              name="companyAddressLineOne"
              component={renderAddressField}
              defaultValue={address}
              handleChange={add => {
                dispatch(touch(formKey, 'companyAddressLineOne'));
                this.handleChange(add);
              }}
              disabled={!editFlag}
              handleSelect={(add, placeID) => this.handleSelect(add, placeID)}
              placeholder="House no., apartment, building, block"
              validate={[formValidations.requiredField]}
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelLine2} />
              <small className="optional-text">
                <FormattedMessage {...containerMessage.optionalText} />
              </small>
            </FormLabel>
            <Field
              name="companyAddressLineTwo"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder="Area/Landmark"
              value={companyDetails.companyAddressLineTwo}
              onChange={handleChangeCompanyDetails}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  };

  renderRow4 = () => {
    const { companyDetails, handleChangeCompanyDetails, editFlag = true } = this.props;
    return (
      <Row className="row-spacing">
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelWeb} />
              <small className="optional-text">
                <FormattedMessage {...containerMessage.optionalText} />
              </small>
            </FormLabel>
            <Field
              name="website"
              type="text"
              component={renderField}
              disabled={!editFlag}
              normalize={normalize.trimSpace}
              placeholder="https://"
              value={companyDetails.website}
              onChange={handleChangeCompanyDetails}
              validate={[formValidations.websiteURL]}
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelVat} />
              <small className="optional-text">
                <FormattedMessage {...containerMessage.optionalText} />
              </small>
            </FormLabel>
            <Field
              name="vatNumber"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder="VAT number"
              value={companyDetails.vatNumber}
              onChange={handleChangeCompanyDetails}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  };

  renderRow5 = () => {
    const { companyDetails, handleChangeCompanyDetails, editFlag = true } = this.props;
    return (
      <React.Fragment>
        <H4>
          <FormattedMessage {...messages.labelCompanyIns} />
          <small className="optional-text">
            <FormattedMessage {...containerMessage.optionalText} />
          </small>
        </H4>
        <Row className="row-spacing">
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelProfIns} />
              </FormLabel>
              <Field
                name="companyProfessionInsuranceValue"
                type="text"
                component={renderField}
                disabled={!editFlag}
                normalize={normalize.trimSpace}
                placeholder="e.g. 100000"
                value={companyDetails.companyProfessionInsuranceValue}
                onChange={handleChangeCompanyDetails}
                validate={[formValidations.rateValidation]}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelProfInsVal} />
              </FormLabel>
              <Field
                name="companyPublicInsurancesValue"
                type="text"
                component={renderField}
                disabled={!editFlag}
                normalize={normalize.trimSpace}
                placeholder="e.g. 100000"
                value={companyDetails.companyPublicInsurancesValue}
                onChange={handleChangeCompanyDetails}
                validate={[formValidations.rateValidation]}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelEmpIns} />
              </FormLabel>
              <Field
                name="companyEmployerInsuranceValue"
                type="text"
                component={renderField}
                disabled={!editFlag}
                normalize={normalize.trimSpace}
                placeholder="e.g. 100000"
                value={companyDetails.companyEmployerInsuranceValue}
                onChange={handleChangeCompanyDetails}
                validate={[formValidations.rateValidation]}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    const { companyDetails } = this.props;
    return (
      <FormWrapper>
        {this.renderRow1()}
        <H4>
          <FormattedMessage {...messages.labelCompanyAddr} />
        </H4>
        {this.renderRow3()}
        {this.renderRow2()}
        {this.renderRow4()}
        {this.renderRow5()}
        <CompanyDocumentsComponent {...this.props} data={companyDetails} onBoarding />
      </FormWrapper>
    );
  }
}

CompanyDetails.defaultProps = defaultProps;
CompanyDetails.propTypes = propTypes;

export default CompanyDetails;
