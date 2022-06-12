import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field, touch, change } from 'redux-form/immutable';
import { renderField, renderAddressField } from 'utils/Fields';
import Selects from 'components/Selects';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import { setChange } from 'containers/Auth/utils';
import containerMessage from 'containers/messages';
import { countryData } from 'containers/App/constants';
import { getFieldValidator } from './fields';
import { getAddressObject } from './utils';
import messages from './messages';

export class TradingAddressFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.tradingAddressLineOne || '',
    };
  }

  handleChange = address => {
    const { formKey, dispatch } = this.props;
    this.setState({ address });
    dispatch(change(formKey, 'tradingAddressLineOne', address));
  };

  handleSelect = (address, placeId) => {
    const { formKey, dispatch } = this.props;
    geocodeByPlaceId(placeId)
      .then(results => {
        const addObj = getAddressObject(results[0], address);
        const addressData = {
          tradingPostCode: addObj.postcode,
          tradingCity: addObj.city,
          tradingCountry: { label: addObj.country, value: addObj.country },
          tradingAddressLineOne: addObj.addressLineOne,
          tradingAddressLineTwo: addObj.addressLineTwo,
        };
        this.setState({ address: addressData.tradingAddressLineOne });

        setChange(dispatch, formKey, addressData);
      })
      .catch();
  };

  render() {
    const { tradingCountry, dispatch, formKey, editFlag = true } = this.props;
    const { address } = this.state;
    return (
      <React.Fragment>
        <Row className="row-spacing">
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelLine1} />
              </FormLabel>
              <Field
                name="tradingAddressLineOne"
                component={renderAddressField}
                defaultValue={address}
                handleChange={add => {
                  dispatch(touch(formKey, 'tradingAddressLineOne'));
                  this.handleChange(add);
                }}
                disabled={!editFlag}
                handleSelect={(add, placeID) => this.handleSelect(add, placeID)}
                placeholder="House no., apartment, building, block"
                validate={getFieldValidator(`tradingAddressLineOne`, true)}
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
              <Field name="tradingAddressLineTwo" type="text" component={renderField} disabled={!editFlag} placeholder="Area/Landmark" />
            </FormGroup>
          </Col>
        </Row>
        <Row className="row-spacing">
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelZipCode} />
              </FormLabel>
              <Field
                name="tradingPostCode"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder="Pincode"
                validate={getFieldValidator('tradingPostCode', true)}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelCity} />
              </FormLabel>
              <Field
                name="tradingCity"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder="City"
                validate={getFieldValidator('tradingCity', true)}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelCountry} />
              </FormLabel>
              <Field
                name="tradingCountry"
                component={Selects}
                disable={!editFlag}
                placeholder="Country"
                defaultValue={tradingCountry}
                options={countryData.map(c => ({
                  label: c.name,
                  value: c.name,
                }))}
                validate={getFieldValidator('tradingCountry', true)}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

TradingAddressFields.defaultProps = {};
TradingAddressFields.propTypes = {
  tradingCountry: PropTypes.string,
  editFlag: PropTypes.bool,
  formKey: PropTypes.string,
  dispatch: PropTypes.any,
  tradingAddressLineOne: PropTypes.any,
};
