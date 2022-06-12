import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel, P } from 'components';
import { FormattedMessage } from 'react-intl';
import { change, Field, touch } from 'redux-form/immutable';
import { setChange } from 'containers/Auth/utils';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import { renderField, renderAddressField } from 'utils/Fields';
import Selects from 'components/Selects';
import * as formValidations from 'utils/formValidations';
import { countryData, timeXZone } from 'containers/App/constants';
import containerMessage from 'containers/messages';
import { getAddressObject } from 'components/UserProfileComponents/utils';
import componentMessage from 'components/UserProfileComponents/messages';

export class AddressFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.addressLineOne || '',
    };
  }

  handleChange = address => {
    const { onChangeAddressLineOne, form, dispatch } = this.props;
    this.setState({ address });
    if (onChangeAddressLineOne) {
      onChangeAddressLineOne({ target: { name: 'addressLineOne', value: address } });
    }
    dispatch(change(form, 'addressLineOne', address));
  };

  handleSelect = (address, placeId) => {
    const {
      form,
      dispatch,
      onChangeCity,
      onChangeAddressLineTwo,
      onChangePostcode,
      onChangeAddressLineOne,
      onChangeCountry,
      onChangeState,
    } = this.props;
    geocodeByPlaceId(placeId)
      .then(results => {
        const addObj = getAddressObject(results[0], address);
        this.setState({ address: addObj.addressLineOne });

        setChange(dispatch, form, addObj);
        dispatch(change(form, 'country', { label: addObj.country, value: addObj.country }));

        if (onChangeAddressLineOne) {
          onChangeAddressLineOne({ target: { name: 'addressLineOne', value: addObj.addressLineOne } });
          onChangeAddressLineTwo({ target: { name: 'addressLineTwo', value: addObj.addressLineTwo } });
          onChangeCity({ target: { name: 'city', value: addObj.city } });
          onChangePostcode({ target: { name: 'postcode', value: addObj.postcode } });
          onChangeCountry({ label: addObj.country, value: addObj.country });
          onChangeState({ target: { name: 'state', value: addObj.state } });
        }
      })
      .catch();
  };

  render() {
    const {
      postcode,
      city,
      country,
      timezone,
      state,
      addressLineTwo,
      onChangeAddressLineTwo,
      onChangePostcode,
      onChangeCity,
      onChangeCountry,
      onChangeTimeZone,
      dispatch,
      form,
      onChangeState,
    } = this.props;
    const { address } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelLine1} />
              </FormLabel>
              <Field
                name="addressLineOne"
                component={renderAddressField}
                defaultValue={address}
                handleChange={add => {
                  dispatch(touch(form, 'addressLineOne'));
                  this.handleChange(add);
                }}
                handleSelect={(add, placeID) => this.handleSelect(add, placeID)}
                placeholder="House no., apartment, building, block"
                validate={[formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...containerMessage.labelLine2} />
                <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
              </FormLabel>
              <Field
                name="addressLineTwo"
                type="text"
                component={renderField}
                placeholder="Area"
                value={addressLineTwo}
                onChange={onChangeAddressLineTwo}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelCity} />
              </FormLabel>
              <Field
                name="city"
                type="text"
                component={renderField}
                placeholder={componentMessage.placeHolderCity.defaultMessage}
                value={city}
                onChange={onChangeCity}
                validate={[formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...componentMessage.labelState} />
                <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
              </FormLabel>
              <Field
                name="state"
                type="text"
                component={renderField}
                placeholder={componentMessage.labelState.defaultMessage}
                value={state}
                onChange={onChangeState}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelCountry} />
              </FormLabel>
              <Field
                name="country"
                component={Selects}
                defaultValue={country}
                options={countryData.map(c => ({
                  label: c.name,
                  value: c.name,
                }))}
                onChange={onChangeCountry}
                placeHolder={componentMessage.placeHolderSelectCountry.defaultMessage}
                validate={[formValidations.requiredSelect, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelPostCode} />
              </FormLabel>
              <Field
                name="postcode"
                type="text"
                component={renderField}
                placeholder={componentMessage.placeHolderPostCode.defaultMessage}
                value={postcode}
                onChange={onChangePostcode}
                validate={[formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <FormLabel>
            <FormattedMessage {...containerMessage.labelTimeZone} />
          </FormLabel>
          <Field
            name="timezone"
            component={Selects}
            defaultValue={timezone}
            options={timeXZone.map(t => ({
              label: `(${t.offset}) ${t.name}`,
              value: t.name,
            }))}
            onChange={onChangeTimeZone}
            placeHolder={containerMessage.placeHolderSelectTimeZone.defaultMessage}
            validate={[formValidations.requiredSelect, formValidations.requiredField]}
          />
        </FormGroup>
      </React.Fragment>
    );
  }
}

AddressFields.defaultProps = {
  postcode: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  country: '',
  timezone: '',
  state: '',
  form: '',
  onChangeState: () => {},
  onChangePostcode: () => {},
  onChangeAddressLineOne: () => {},
  onChangeAddressLineTwo: () => {},
  onChangeCity: () => {},
  onChangeCountry: () => {},
  onChangeTimeZone: () => {},
  dispatch: () => {},
};
AddressFields.propTypes = {
  state: PropTypes.any,
  postcode: PropTypes.any,
  addressLineOne: PropTypes.any,
  addressLineTwo: PropTypes.any,
  city: PropTypes.any,
  country: PropTypes.any,
  timezone: PropTypes.any,
  onChangeState: PropTypes.func,
  onChangePostcode: PropTypes.func,
  onChangeAddressLineOne: PropTypes.func,
  onChangeAddressLineTwo: PropTypes.func,
  onChangeCity: PropTypes.func,
  onChangeCountry: PropTypes.func,
  onChangeTimeZone: PropTypes.func,
  form: PropTypes.string,
  dispatch: PropTypes.func,
};
export default AddressFields;
