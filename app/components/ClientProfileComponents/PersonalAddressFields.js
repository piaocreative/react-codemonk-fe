import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { change, Field, touch } from 'redux-form/immutable';
import Selects from 'components/Selects';
import { setChange } from 'containers/Auth/utils';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import * as formValidations from 'utils/formValidations';
import { countryData, timeXZone } from 'containers/App/constants';
import { renderField, renderAddressField } from 'utils/Fields';
import containerMessage from 'containers/messages';
import { getAddressObject, setInputClass } from 'components/UserProfileComponents/utils';
import messages from 'components/UserProfileComponents//messages';
import { getFieldValidator } from './fields';

export class PersonalAddressFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  handleChange = address => {
    const { formKey, prefix, dispatch } = this.props;
    this.setState({ address });
    dispatch(change(formKey, `${prefix}addressLineOne`, address));
  };

  handleSelect = (address, placeId) => {
    const { formKey, dispatch, prefix } = this.props;
    geocodeByPlaceId(placeId)
      .then(results => {
        const addObj = getAddressObject(results[0], address);
        const addressData = {
          [`${prefix}postcode`]: addObj.postcode,
          [`${prefix}city`]: addObj.city,
          [`${prefix}country`]: { label: addObj.country, value: addObj.country },
          [`${prefix}addressLineOne`]: addObj.addressLineOne,
          [`${prefix}addressLineTwo`]: addObj.addressLineTwo,
        };
        this.setState({ address: addressData[`${prefix}addressLineOne`] });

        setChange(dispatch, formKey, addressData);
      })
      .catch();
  };

  render() {
    const {
      size,
      dispatch,
      formKey,
      prefix,
      [`${prefix}timeZone`]: timeZone,
      [`${prefix}country`]: country,
      editFlag = true,
      company = false,
    } = this.props;
    const { address } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelLine1} />
                {company && (
                  <small className="optional-text">
                    <FormattedMessage {...containerMessage.optionalText} />
                  </small>
                )}
              </FormLabel>
              <Field
                name={`${prefix}addressLineOne`}
                component={renderAddressField}
                defaultValue={address}
                handleChange={add => {
                  dispatch(touch(formKey, `${prefix}addressLineOne`));
                  this.handleChange(add);
                }}
                disabled={!editFlag}
                handleSelect={(add, placeID) => this.handleSelect(add, placeID)}
                placeholder="House no., apartment, building, block"
                {...(company
                  ? { validate: getFieldValidator(`${prefix}addressLineOne`, false) }
                  : { validate: getFieldValidator(`${prefix}addressLineOne`, true) })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelLine2} />
                <small className="optional-text">
                  <FormattedMessage {...containerMessage.optionalText} />
                </small>
              </FormLabel>
              <Field name={`${prefix}addressLineTwo`} type="text" component={renderField} disabled={!editFlag} placeholder="Area" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelCity} />
                {company && (
                  <small className="optional-text">
                    <FormattedMessage {...containerMessage.optionalText} />
                  </small>
                )}
              </FormLabel>
              <Field
                name={`${prefix}city`}
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder={messages.placeHolderCity.defaultMessage}
                {...(company
                  ? { validate: getFieldValidator(`${prefix}city`, false) }
                  : { validate: getFieldValidator(`${prefix}city`, true) })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelCountry} />
                {company && (
                  <small className="optional-text">
                    <FormattedMessage {...containerMessage.optionalText} />
                  </small>
                )}
              </FormLabel>
              <Field
                name={`${prefix}country`}
                component={Selects}
                disable={!editFlag}
                defaultValue={country}
                options={countryData.map(c => ({
                  label: c.name,
                  value: c.name,
                }))}
                placeHolder={messages.placeHolderSelectCountry.defaultMessage}
                {...(company ? {} : { validate: [formValidations.requiredSelect] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelPostCode} />
                {company && (
                  <small className="optional-text">
                    <FormattedMessage {...containerMessage.optionalText} />
                  </small>
                )}
              </FormLabel>
              <Field
                name={`${prefix}postcode`}
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder={messages.placeHolderPostCode.defaultMessage}
                {...(company
                  ? { validate: getFieldValidator(`${prefix}postcode`, false) }
                  : { validate: getFieldValidator(`${prefix}postcode`, true) })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelTimeZone} />
                {company && (
                  <small className="optional-text">
                    <FormattedMessage {...containerMessage.optionalText} />
                  </small>
                )}
              </FormLabel>
              <Field
                name={`${prefix}timeZone`}
                component={Selects}
                disable={!editFlag}
                defaultValue={timeZone}
                options={timeXZone.map(t => ({
                  label: `(${t.offset}) ${t.name}`,
                  value: t.name,
                }))}
                placeHolder={containerMessage.placeHolderSelectTimeZone.defaultMessage}
                {...(company ? {} : { validate: [formValidations.requiredSelect] })}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

PersonalAddressFields.defaultProps = {
  size: '',
  country: '',
  timeZone: '',
  prefix: '',
  editFlag: true,
  company: false,
};
PersonalAddressFields.propTypes = {
  size: PropTypes.string,
  country: PropTypes.any,
  timeZone: PropTypes.any,
  prefix: PropTypes.string,
  editFlag: PropTypes.bool,
  formKey: PropTypes.string,
  dispatch: PropTypes.any,
  companyaddressLineOne: PropTypes.any,
  company: PropTypes.bool,
};
