import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { P, H4, FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { change, Field, touch } from 'redux-form/immutable';
import { setChange } from 'containers/Auth/utils';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import { renderField, renderFieldoptCheckbox, renderAddressField } from 'utils/Fields';
import Selects from 'components/Selects';
import { countryData } from 'containers/App/constants';
import containerMessage from 'containers/messages';
import ToolTip from 'components/ToolTip';
import messages from 'components/UserProfileComponents/messages';
import authMessages from 'containers/Auth/CreateProfilePage/messages';
import { PhoneNumberField } from 'components/ClientProfileComponents/PhoneNumberField';
import { UserNameFields } from 'components/ClientProfileComponents/UserNameFields';
import { PersonalAddressFields } from 'components/ClientProfileComponents/PersonalAddressFields';
import { getAddressObject } from 'components/UserProfileComponents/utils';
import { ToolTipBlock } from 'containers/Auth/CreateProfilePage/style';
import { getFieldValidator } from './fields';

const renderCompanyAuthorityDetails = props => {
  const { authorityPersonalEditFlag = true, authorityAddressEditFlag = true, editFlag = true, onBoarding = false } = props;
  const authPersonalEdit = authorityPersonalEditFlag && editFlag;
  const authAddressEdit = authorityAddressEditFlag && editFlag;
  return (
    <React.Fragment>
      <ToolTipBlock>
        <H4 className="m-0">
          <FormattedMessage {...authMessages.subHeadingPaymentAuthority} />
        </H4>
        <ToolTip
          wrapperClass="ms-2"
          placement="right"
          tooltipId="infoTooltip"
          content={authMessages.labelUnavailabilityToolTip.defaultMessage}
        />
      </ToolTipBlock>
      <P className="text-start mt-4 mb-2">
        <small className="p-0">
          <Field
            name="companyAuthorityPersonalDetailsCheckbox"
            type="checkbox"
            component={renderFieldoptCheckbox}
            disabled={!editFlag}
            message="Same as my personal details"
          />
        </small>
      </P>
      <UserNameFields {...props} prefix="companyAuthority" editFlag={authPersonalEdit} />
      <Row>
        <Col md={6}>
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...containerMessage.labelEmailAddress} />
            </FormLabel>
            <Field
              name="companyAuthorityemail"
              component={renderField}
              disabled={!authPersonalEdit}
              type="text"
              placeholder={containerMessage.placeholderEmailAddress.defaultMessage}
              validate={getFieldValidator(`companyAuthorityemail`, true)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <PhoneNumberField {...props} prefix="companyAuthority" editFlag={authPersonalEdit} />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...authMessages.labelJobTitle} />
            </FormLabel>
            <Field
              name="companyAuthorityjobTitle"
              component={renderField}
              disabled={!authPersonalEdit}
              type="text"
              placeholder={authMessages.placeholderJobTitle.defaultMessage}
              validate={getFieldValidator(`companyAuthorityjobTitle`, true)}
            />
          </FormGroup>
        </Col>
      </Row>
      {!onBoarding && (
        <React.Fragment>
          <H4>
            <FormattedMessage {...authMessages.subHeadingAuthorisedPerson} />
          </H4>
          <P className="text-start mb-4">
            <small className="p-0">
              <Field
                name="companyAuthorityPersonalAddressCheckbox"
                type="checkbox"
                component={renderFieldoptCheckbox}
                disabled={!editFlag}
                message="Same as my personal address"
              />
            </small>
          </P>
          <PersonalAddressFields {...props} prefix="companyAuthority" editFlag={authAddressEdit} company />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export class CompanyDetailsFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  handleSelect = (address, placeId) => {
    const { formKey, dispatch } = this.props;
    geocodeByPlaceId(placeId)
      .then(results => {
        const addObj = getAddressObject(results[0], address);
        const addressData = {
          companyPincode: addObj.postcode,
          companyCity: addObj.city,
          companyCountry: { label: addObj.country, value: addObj.country },
          companyAddressLineOne: addObj.addressLineOne,
          companyAddressLineTwo: addObj.addressLineTwo,
        };
        setChange(dispatch, formKey, addressData);
        this.setState({ address: addressData.companyAddressLineOne });
      })
      .catch();
  };

  handleChange = address => {
    const { formKey, dispatch } = this.props;
    this.setState({ address });
    dispatch(change(formKey, 'companyAddressLineOne', address));
  };

  renderCompanyAddressFields = () => {
    const { dispatch, companyCountry, formKey, editFlag = true } = this.props;
    const { address } = this.state;

    return (
      <React.Fragment>
        <H4>
          <FormattedMessage {...messages.labelCompanyAddr} />
        </H4>
        <React.Fragment>
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
                  validate={getFieldValidator(`companyAddressLineOne`, true)}
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
                <Field name="companyAddressLineTwo" type="text" disabled={!editFlag} component={renderField} placeholder="Area/Landmark" />
              </FormGroup>
            </Col>
          </Row>
        </React.Fragment>
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
                validate={getFieldValidator(`companyPincode`, true)}
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
                validate={getFieldValidator(`companyCity`, true)}
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
                placeholder="Country"
                defaultValue={companyCountry}
                disable={!editFlag}
                options={countryData.map(c => ({
                  label: c.name,
                  value: c.name,
                }))}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
        </Row>
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
                validate={getFieldValidator('website', false)}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelVat} />
              </FormLabel>
              <Field
                name="vatNumber"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder="VAT (or Tax) No."
                validate={getFieldValidator(`vatNumber`, true)}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    const { editFlag = true, onBoarding = false } = this.props;
    return (
      <React.Fragment>
        <H4>
          <FormattedMessage {...authMessages.subHeadingBasic} />
        </H4>
        <UserNameFields {...this.props} prefix="company" />
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelJobTitle} />
              </FormLabel>
              <Field
                name="companyjobTitle"
                component={renderField}
                type="text"
                disabled={!editFlag}
                placeholder={authMessages.placeholderJobTitle.defaultMessage}
                validate={getFieldValidator('companyjobTitle', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        {!onBoarding && (
          <React.Fragment>
            <H4>
              <FormattedMessage {...authMessages.subHeadingPersonalAddress} />
            </H4>
            <PersonalAddressFields {...this.props} prefix="companyPersonal" company />
          </React.Fragment>
        )}

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
                validate={getFieldValidator(`companyregisteredNumber`, true)}
              />
            </FormGroup>
          </Col>
        </Row>

        {/* mandatory */}
        {this.renderCompanyAddressFields()}

        {/* Optional Payment Authority Details */}
        {/* Payment Authority Details */}
        {renderCompanyAuthorityDetails(this.props)}
      </React.Fragment>
    );
  }
}

CompanyDetailsFields.defaultProps = {
  companyCountry: '',
  authorityPersonalEditFlag: true,
  authorityAddressEditFlag: true,
  editFlag: true,
  onBoarding: false,
  dispatch: () => {},
  website: '',
  formKey: '',
};
CompanyDetailsFields.propTypes = {
  companyCountry: PropTypes.string,
  authorityPersonalEditFlag: PropTypes.bool,
  authorityAddressEditFlag: PropTypes.bool,
  editFlag: PropTypes.bool,
  onBoarding: PropTypes.bool,
  dispatch: PropTypes.func,
  website: PropTypes.string,
  formKey: PropTypes.string,
};

renderCompanyAuthorityDetails.defaultProps = {
  authorityPersonalEditFlag: true,
  authorityAddressEditFlag: true,
  editFlag: true,
  onBoarding: false,
};
renderCompanyAuthorityDetails.propTypes = {
  authorityPersonalEditFlag: PropTypes.bool,
  authorityAddressEditFlag: PropTypes.bool,
  editFlag: PropTypes.bool,
  onBoarding: PropTypes.bool,
};
