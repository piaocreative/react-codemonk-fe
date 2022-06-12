import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { Field } from 'redux-form/immutable';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import { FormattedMessage } from 'react-intl';
import { renderField } from 'utils/Fields';
import FormLabel from '../../../components/Label';
import { SubFormWrapper } from '../../../components/SubFormWrapper';
import messages from './messages';

export class PayPalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { payPalEmail, handleChangePayPalDetails, editFlag = true } = this.props;
    return (
      <SubFormWrapper className="sub-form">
        <FormGroup>
          <Row>
            <Col md="6">
              <FormLabel>
                <FormattedMessage {...messages.labelPaypal} />
              </FormLabel>
              <Field
                name="payPalEmail"
                type="text"
                component={renderField}
                disabled={!editFlag}
                normalize={normalize.trimSpace}
                placeholder="Your paypal ID"
                value={payPalEmail}
                onChange={handleChangePayPalDetails}
                validate={[formValidations.required, formValidations.email]}
              />
            </Col>
          </Row>
        </FormGroup>
      </SubFormWrapper>
    );
  }
}

PayPalDetails.propTypes = {
  editFlag: PropTypes.bool,
  payPalEmail: PropTypes.string,
  handleChangePayPalDetails: PropTypes.func,
};

export default PayPalDetails;
