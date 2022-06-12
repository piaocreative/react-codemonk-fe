import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field, change } from 'redux-form/immutable';
import Selects from 'components/Selects';
import * as formValidations from 'utils/formValidations';
import StorageService from 'utils/StorageService';
import * as normalize from 'utils/normalize';
import { currencyData } from 'containers/App/constants';
import { renderField } from 'utils/Fields';
import containerMessage from 'containers/messages';
import { RateDetailList } from 'containers/MyProfilePage/styles';
import { getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import { setInputClass } from './utils';
import messages from './messages';

export class RateComponents extends React.Component {
  constructor(props) {
    super(props);
    const { rate } = this.props;
    this.state = {
      updatedRate: rate.ratePerHour,
      updatedCurrency: rate && rate.currency && rate.currency.value,
    };
  }

  handleRateChange = e => {
    const { dispatch, onChangeRate, rate, formKey: key } = this.props;
    const { value, name } = e.target;
    const newRate = rate;
    newRate[name] = value;
    if (name === 'currency') {
      this.setState({ updatedCurrency: value.value });
    }
    if (name === 'ratePerHour') {
      this.setState({ updatedRate: value });
    }
    dispatch(change(key, name, value));
    onChangeRate(newRate);
  };

  render() {
    const { rate, size, data = {} } = this.props;
    const { updatedRate, updatedCurrency } = this.state;
    const isLoginViaAdmin = StorageService.get('isLoginViaAdmin') || '';
    let isDisable = false;
    if (isLoginViaAdmin) {
      isDisable = false;
    } else if (data.hasActiveProject === true) {
      isDisable = true;
    }
    return (
      <React.Fragment>
        <Row>
          <Col md="6">
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelCurrency} />
              </FormLabel>
              <Field
                name="currency"
                component={Selects}
                defaultValue={rate.currency}
                options={currencyData.map(c => ({
                  label: c.label,
                  value: c.value,
                }))}
                disable={isDisable}
                onChange={cData => this.handleRateChange({ target: { name: 'currency', value: cData } })}
                placeHolder={containerMessage.chooseCurrency.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelRating} />
              </FormLabel>
              <Field
                name="ratePerHour"
                type="number"
                component={renderField}
                disabled={isDisable}
                value={rate.ratePerHour}
                placeholder={messages.placeHolderlabelRating.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={e => this.handleRateChange(e)}
                validate={[formValidations.requiredField, formValidations.rateValidation]}
              />
            </FormGroup>
          </Col>
        </Row>
        <RateDetailList className="mt-3">
          <p>
            You will be Invoicing at <span>(excluding taxes)</span>
          </p>
          <ul>
            <li>
              {getCurrencySymbol(currencyData, 'code', updatedCurrency)}
              {updatedRate * 1} per hour
            </li>
            <li>
              {getCurrencySymbol(currencyData, 'code', updatedCurrency)}
              {updatedRate * 7.5} per day
            </li>
            <li>
              {getCurrencySymbol(currencyData, 'code', updatedCurrency)}
              {updatedRate * 157.5} per month
            </li>
          </ul>
        </RateDetailList>
      </React.Fragment>
    );
  }
}

RateComponents.defaultProps = {
  size: '',
  rate: {},
  data: {},
};
RateComponents.propTypes = {
  dispatch: PropTypes.any,
  onChangeRate: PropTypes.func,
  size: PropTypes.string,
  rate: PropTypes.object,
  data: PropTypes.object,
  formKey: PropTypes.string,
};
