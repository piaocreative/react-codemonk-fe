/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { renderField, renderSelectTags } from 'utils/Fields';
import * as formValidations from 'utils/formValidations';
import { companyTypeArray } from 'containers/App/constants';
import { ProfessionalProfiles } from 'components/UserProfileComponents/ProfessionalProfiles';
import { FormLabel, P, H4, Selects } from 'components';
import containerMessage from 'containers/messages';
import componentMessage from 'components/UserProfileComponents/messages';
import { key } from './constants';
import messages from './messages';

export class AboutCompanyFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleCompanyCulturesSelectChangeTags = (selectedValues = []) => {
    const { onChangeCompanyCultures } = this.props;
    const selectedItems = (selectedValues || []).map(i => i.value);
    onChangeCompanyCultures(selectedItems);
  };

  render() {
    const {
      industryList,
      companyCulturesList,
      companyType,
      industry,
      cultures,
      name,
      brand,
      registeredNumber,
      vatNumber,
      onChangeName,
      onChangeBrand,
      onChangeCompanyType,
      onChangeIndustry,
      onChangeRegisteredNumber,
      onChangeVatNumber,
    } = this.props;
    return (
      <>
        <H4 className="newH4 mt-5 mb-3" opacityVal="0.5">
          <FormattedMessage {...containerMessage.titleCompanyDetails} />
        </H4>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelCompanyName} />
              </FormLabel>
              <Field
                name="name"
                component={renderField}
                type="text"
                defaultValue={name}
                placeholder={containerMessage.placeHolderCompanyName.defaultMessage}
                onChange={onChangeName}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelBrandName} />
              </FormLabel>
              <Field
                name="brand"
                component={renderField}
                type="text"
                defaultValue={brand}
                placeholder={messages.labelBrandName.defaultMessage}
                onChange={onChangeBrand}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelRegNo} />
              </FormLabel>
              <Field
                name="registeredNumber"
                component={renderField}
                type="text"
                defaultValue={registeredNumber}
                placeholder="e.g. 12345678"
                onChange={onChangeRegisteredNumber}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelVatTaxNumber} />
              </FormLabel>
              <Field
                name="vatNumber"
                component={renderField}
                type="text"
                defaultValue={vatNumber}
                placeholder={messages.placeholderVatTaxNumber.defaultMessage}
                onChange={onChangeVatNumber}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelIndustry} />
              </FormLabel>
              <Field
                name="industry"
                type="text"
                component={Selects}
                defaultValue={industry}
                searchable
                options={industryList.map(item => ({
                  label: item,
                  value: item,
                }))}
                onChange={onChangeIndustry}
                placeHolder={componentMessage.placeholderEmpType.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelCompanySize} />
              </FormLabel>
              <Field
                name="companyType"
                type="text"
                component={Selects}
                defaultValue={companyType}
                searchable
                options={companyTypeArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                onChange={onChangeCompanyType}
                placeHolder={componentMessage.placeholderEmpType.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelcompanyCulture} />
              </FormLabel>
              <Field
                name="cultures"
                component={renderSelectTags}
                value={cultures}
                onChange={this.handleCompanyCulturesSelectChangeTags}
                options={companyCulturesList.map(item => ({
                  label: item,
                  value: item,
                }))}
                isMulti
                closeMenuOnSelect={false}
                validate={[formValidations.requiredArray]}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
              />
            </FormGroup>
          </Col>
        </Row>
        <H4 className="newH4 mt-5 mb-3 d-inline-flex align-items-center" opacityVal="0.5">
          <FormattedMessage {...messages.titleOnlineProfiles} />
          <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
            <FormattedMessage {...containerMessage.optionalText} />
          </P>
        </H4>
        <ProfessionalProfiles {...this.props} formKey={key} user="client" />
      </>
    );
  }
}

AboutCompanyFields.defaultProps = {
  industryList: [],
  companyCulturesList: [],
  companyType: {},
  industry: {},
  cultures: [],
  name: '',
  brand: '',
  registeredNumber: '',
  vatNumber: '',
  onChangeName: () => {},
  onChangeBrand: () => {},
  onChangeCompanyType: () => {},
  onChangeIndustry: () => {},
  onChangeRegisteredNumber: () => {},
  onChangeVatNumber: () => {},
  onChangeCompanyCultures: () => {},
  image: '',
};
AboutCompanyFields.propTypes = {
  industryList: PropTypes.array,
  companyCulturesList: PropTypes.array,
  companyType: PropTypes.object,
  industry: PropTypes.object,
  cultures: PropTypes.array,
  name: PropTypes.string,
  brand: PropTypes.string,
  registeredNumber: PropTypes.string,
  vatNumber: PropTypes.string,
  onChangeName: PropTypes.func,
  onChangeBrand: PropTypes.func,
  onChangeCompanyType: PropTypes.func,
  onChangeIndustry: PropTypes.func,
  onChangeRegisteredNumber: PropTypes.func,
  onChangeVatNumber: PropTypes.func,
  onChangeCompanyCultures: PropTypes.func,
  image: PropTypes.string,
};
