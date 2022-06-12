import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { H4, FormLabel, P } from 'components';
import { FormattedMessage } from 'react-intl';
import { change, Field, touch } from 'redux-form/immutable';
import DatePickers from 'components/DatePickers';
import Selects from 'components/Selects';
import moment from 'moment';
import { setChange } from 'containers/Auth/utils';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import { CountryCode } from 'containers/Auth/PersonalDetails/style';
import { countryData, timeXZone, genderArray } from 'containers/App/constants';
import { renderField, renderAddressField } from 'utils/Fields';
import containerMessage from 'containers/messages';
import { UserNameFields } from './UserNameFields';
import { ProfessionalDetailsComponents } from './ProfessionalDetails';
import { getFieldValidator } from './fields';
import { setInputClass, getAddressObject } from './utils';
import messages from './messages';

export class PersonalDetailsComponents extends React.Component {
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

  renderRow1 = () => {
    const {
      phoneNumber,
      countryCode,
      onChangeCountryCode,
      onChangePhoneNumber,
      dob,
      onChangeDob,
      gender,
      onChangeGender,
      size,
    } = this.props;
    return (
      <Row>
        <Col md={6}>
          <FormGroup className={setInputClass(size)}>
            <FormLabel>
              <FormattedMessage {...messages.labelPhoneNumber} />
            </FormLabel>
            <div className="d-flex">
              <CountryCode>
                <Field
                  name="countryCode"
                  component={Selects}
                  defaultValue={countryCode}
                  options={countryData.map(code => ({
                    label: `${code.name} ${code.phoneCode}`,
                    value: code.name,
                  }))}
                  onChange={onChangeCountryCode}
                  placeHolder="+44"
                  validate={getFieldValidator('countryCode', true)}
                  fullWidthOption
                />
              </CountryCode>
              <div className="w-100 mw-100 labelSpacing ms-2">
                <Field
                  name="phoneNumber"
                  type="text"
                  component={renderField}
                  placeholder={messages.placeHolderPhoneNumber.defaultMessage}
                  value={phoneNumber}
                  onChange={onChangePhoneNumber}
                  validate={getFieldValidator('phoneNumber', true)}
                />
              </div>
            </div>
          </FormGroup>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={6}>
              <FormGroup className={setInputClass(size)}>
                <FormLabel>
                  <FormattedMessage {...messages.labelDOB} />
                </FormLabel>
                <Field
                  name="dob"
                  component={DatePickers}
                  dateFormat="dd/MM/yyyy"
                  showYearDropDown
                  placeholder="DD/MM/YYYY"
                  maxDate={moment()
                    .subtract(15, 'years')
                    .toDate()}
                  onChange={onChangeDob}
                  defaultValue={dob}
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown
                  placement="bottom-start"
                  validate={getFieldValidator('dob', true)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className={setInputClass(size)}>
                <FormLabel>
                  <FormattedMessage {...messages.labelGender} />
                </FormLabel>
                <Field
                  name="gender"
                  type="text"
                  component={Selects}
                  defaultValue={gender}
                  searchable={false}
                  options={genderArray.map(item => ({
                    label: `${item.name}`,
                    value: item.value,
                  }))}
                  onChange={onChangeGender}
                  placeHolder={messages.placeHolderGender.defaultMessage}
                  validate={getFieldValidator('gender', true)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      postcode,
      onChangePostcode,
      addressLineTwo,
      onChangeAddressLineTwo,
      city,
      onChangeCity,
      country,
      onChangeCountry,
      timeZone,
      onChangeTimeZone,
      size,
      dispatch,
      form,
      state,
      onChangeState,
    } = this.props;
    const { address } = this.state;

    return (
      <React.Fragment>
        <UserNameFields {...this.props} />
        {this.renderRow1()}
        <ProfessionalDetailsComponents {...this.props} />
        <H4 opacityVal="0.5" className={`newH4 mt-5 mb-3 ${setInputClass(size)}`}>
          <FormattedMessage {...messages.subHeadingLocation} />
        </H4>
        <Row>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
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
                validate={getFieldValidator(`addressLineOne`, true)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
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
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelCity} />
              </FormLabel>
              <Field
                name="city"
                type="text"
                component={renderField}
                placeholder={messages.placeHolderCity.defaultMessage}
                value={city}
                onChange={onChangeCity}
                validate={getFieldValidator('city', true)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...messages.labelState} />
                <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
              </FormLabel>
              <Field
                name="state"
                type="text"
                component={renderField}
                placeholder={messages.labelState.defaultMessage}
                value={state}
                onChange={onChangeState}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelCountry} />
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
                placeHolder={messages.placeHolderSelectCountry.defaultMessage}
                validate={getFieldValidator('country', true)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelPostCode} />
              </FormLabel>
              <Field
                name="postcode"
                type="text"
                component={renderField}
                placeholder={messages.placeHolderPostCode.defaultMessage}
                value={postcode}
                onChange={onChangePostcode}
                validate={getFieldValidator('postcode', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelTimeZone} />
              </FormLabel>
              <Field
                name="timeZone"
                component={Selects}
                defaultValue={timeZone}
                options={timeXZone.map(t => ({
                  label: `(${t.offset}) ${t.name}`,
                  value: t.name,
                }))}
                onChange={onChangeTimeZone}
                placeHolder={containerMessage.placeHolderSelectTimeZone.defaultMessage}
                validate={getFieldValidator('timeZone', true)}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
PersonalDetailsComponents.defaultProps = {
  size: '',
  phoneNumber: '',
  countryCode: 44,
  dob: '',
  gender: '',
  postcode: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  country: '',
  timeZone: '',
  state: '',
};
PersonalDetailsComponents.propTypes = {
  size: PropTypes.string,
  phoneNumber: PropTypes.string,
  countryCode: PropTypes.any,
  onChangeCountryCode: PropTypes.func,
  onChangePhoneNumber: PropTypes.func,
  dob: PropTypes.any,
  onChangeDob: PropTypes.func,
  gender: PropTypes.any,
  onChangeGender: PropTypes.func,
  state: PropTypes.any,
  onChangeState: PropTypes.func,
  postcode: PropTypes.any,
  onChangePostcode: PropTypes.func,
  addressLineOne: PropTypes.any,
  onChangeAddressLineOne: PropTypes.func,
  addressLineTwo: PropTypes.any,
  onChangeAddressLineTwo: PropTypes.func,
  city: PropTypes.any,
  onChangeCity: PropTypes.func,
  country: PropTypes.any,
  onChangeCountry: PropTypes.func,
  timeZone: PropTypes.any,
  onChangeTimeZone: PropTypes.func,
  form: PropTypes.string,
  dispatch: PropTypes.any,
};
export default PersonalDetailsComponents;
