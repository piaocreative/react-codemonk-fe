import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { H4, FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { renderField } from 'utils/Fields';
import containerMessage from 'containers/messages';
import { AddressFields } from './AddressFields';
import { getFieldValidator } from './fields';
import messages from './messages';

export const CompanyDetailsFields = props => {
  const { editFlag = true } = props;
  return (
    <React.Fragment>
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
              validate={getFieldValidator('companyName', true)}
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
              validate={getFieldValidator('companyregisteredNumber', true)}
            />
          </FormGroup>
        </Col>
      </Row>
      <H4>
        <FormattedMessage {...messages.labelCompanyAddr} />
      </H4>
      <AddressFields {...props} />

      <Row className="row-spacing">
        <Col md="6">
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.labelDuns} />
              <small className="optional-text">
                <FormattedMessage {...containerMessage.optionalText} />
              </small>
            </FormLabel>
            <Field
              name="duns"
              type="text"
              component={renderField}
              disabled={!editFlag}
              placeholder="DUNS number"
              validate={getFieldValidator('duns', false)}
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
              placeholder="VAT number"
              validate={getFieldValidator('vatNumber', true)}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

CompanyDetailsFields.defaultProps = {
  editFlag: true,
};

CompanyDetailsFields.propTypes = {
  editFlag: PropTypes.bool,
};
