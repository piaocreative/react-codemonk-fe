import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { change, Field, touch } from 'redux-form/immutable';
import { setChange } from 'containers/Auth/utils';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import { renderField, renderAddressField } from 'utils/Fields';
import Selects from 'components/Selects';
import { countryData } from 'containers/App/constants';
import containerMessage from 'containers/messages';
import { getFieldValidator } from './fields';
import { setInputClass, getAddressObject } from './utils';
import messages from './messages';

export class AddressFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.companyAddressLineOne || '',
    };
  }

  handleChange = address => {
    const { formKey, dispatch } = this.props;
    this.setState({ address });
    dispatch(change(formKey, 'companyAddressLineOne', address));
  };

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
        this.setState({ address: addressData.companyAddressLineOne });

        setChange(dispatch, formKey, addressData);
      })
      .catch();
  };

  render() {
    const { companyCountry, size, dispatch, formKey, editFlag = true } = this.props;
    const { address } = this.state;
    return (
      <React.Fragment>
        <Row className="row-spacing">
          <Col md="6">
            <FormGroup className={setInputClass(size)}>
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
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelLine2} />
                <small className="optional-text">
                  <FormattedMessage {...containerMessage.optionalText} />
                </small>
              </FormLabel>
              <Field name="companyAddressLineTwo" type="text" component={renderField} disabled={!editFlag} placeholder="Area/Landmark" />
            </FormGroup>
          </Col>
        </Row>
        <Row className="row-spacing">
          <Col md="4">
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelZipCode} />
              </FormLabel>
              <Field
                name="companyPincode"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder="Pincode"
                validate={getFieldValidator('companyPincode', true)}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelCity} />
              </FormLabel>
              <Field
                name="companyCity"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder="City"
                validate={getFieldValidator('companyCity', true)}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelCountry} />
              </FormLabel>
              <Field
                name="companyCountry"
                component={Selects}
                disable={!editFlag}
                placeholder="Country"
                defaultValue={companyCountry}
                options={countryData.map(c => ({
                  label: c.name,
                  value: c.name,
                }))}
                validate={getFieldValidator('companyCountry', true)}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

AddressFields.defaultProps = {
  size: '',
};
AddressFields.propTypes = {
  companyCountry: PropTypes.string,
  formKey: PropTypes.string,
  dispatch: PropTypes.any,
  editFlag: PropTypes.bool,
  size: PropTypes.string,
  companyAddressLineOne: PropTypes.any,
};
