import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { Field } from 'redux-form/immutable';
import * as formValidations from 'utils/formValidations';
import { FormattedMessage } from 'react-intl';
import { renderField } from 'utils/Fields';
import containerMessage from 'containers/messages';
import FormLabel from 'components/Label';
import { propTypes } from 'containers/proptypes';
import { SubFormWrapper } from 'components/SubFormWrapper';
import messages from './messages';

export class BankAccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { bankPayDetails, handleChangeBankPayDetails, editFlag = true } = this.props;
    return (
      <SubFormWrapper className="sub-form">
        <FormGroup>
          <FormLabel>
            <FormattedMessage {...messages.labelBankName} />
          </FormLabel>
          <Field
            name="bankName"
            type="text"
            component={renderField}
            disabled={!editFlag}
            placeholder="Your bank"
            value={bankPayDetails.bankName}
            onChange={handleChangeBankPayDetails}
            validate={[formValidations.required]}
          />
        </FormGroup>

        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelAccountNo} />
              </FormLabel>
              <Field
                name="bankAccountNumber"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder={containerMessage.placeholderAccountNumber.defaultMessage}
                value={bankPayDetails.bankAccountNumber}
                onChange={handleChangeBankPayDetails}
                validate={[formValidations.required]}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelIFSC} />
              </FormLabel>
              <Field
                name="bankCode"
                type="text"
                component={renderField}
                disabled={!editFlag}
                placeholder={containerMessage.placeholderIFSCCode.defaultMessage}
                value={bankPayDetails.bankCode}
                onChange={handleChangeBankPayDetails}
                validate={[formValidations.required]}
              />
            </FormGroup>
          </Col>
        </Row>
      </SubFormWrapper>
    );
  }
}

BankAccountDetails.propTypes = propTypes;

export default BankAccountDetails;
