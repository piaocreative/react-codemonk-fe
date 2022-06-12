import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { renderField } from 'utils/Fields';
import containerMessage from 'containers/messages';
import messages from 'containers/Auth/Talent/PayoutDetailsPage/messages';
import { getFieldValidator } from 'containers/Auth/Talent/PayoutDetailsPage/fields';
export const PayoutDetailsComponents = props => {
  const { bankName, onChangeBankName, accNumber, onChangeAccountNumber, bankCode, onChangeBankCode, editFlag } = props;
  return (
    <React.Fragment>
      <Row>
        <Col>
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelBankName} />
            </FormLabel>
            <Field
              name="bankName"
              type="text"
              component={renderField}
              placeholder={messages.placeholderBankName.defaultMessage}
              value={bankName}
              disabled={!editFlag}
              onChange={onChangeBankName}
              validate={getFieldValidator('bankName', true)}
            />
          </FormGroup>
        </Col>
      </Row>
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
              placeholder={containerMessage.placeholderAccountNumber.defaultMessage}
              value={accNumber}
              disabled={!editFlag}
              onChange={onChangeAccountNumber}
              validate={getFieldValidator('bankAccountNumber', true)}
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
              placeholder={containerMessage.placeholderIFSCCode.defaultMessage}
              value={bankCode}
              disabled={!editFlag}
              onChange={onChangeBankCode}
              validate={getFieldValidator('bankCode', true)}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

PayoutDetailsComponents.defaultProps = {
  bankName: '',
  accNumber: '',
  bankCode: '',
};
PayoutDetailsComponents.propTypes = {
  onChangeFirstName: PropTypes.func,
  bankName: PropTypes.any,
  onChangeBankName: PropTypes.func,
  accNumber: PropTypes.any,
  onChangeAccountNumber: PropTypes.func,
  bankCode: PropTypes.any,
  onChangeBankCode: PropTypes.func,
  editFlag: PropTypes.bool,
};
