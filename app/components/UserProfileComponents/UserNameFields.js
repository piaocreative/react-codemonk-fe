import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { renderField } from 'utils/Fields';
import { getFieldValidator } from './fields';
import { setInputClass } from './utils';
import messages from './messages';
export const UserNameFields = props => {
  const { firstName, onChangeFirstName, lastName, onChangeLastName, size, editFlag = true } = props;

  return (
    <Row>
      <Col md={6}>
        <FormGroup className={setInputClass(size)}>
          <FormLabel>
            <FormattedMessage {...messages.labelFirstName} />
          </FormLabel>
          <Field
            name="firstName"
            type="text"
            component={renderField}
            disabled={!editFlag}
            placeholder={messages.placeHolderFirstName.defaultMessage}
            value={firstName}
            onChange={onChangeFirstName}
            validate={getFieldValidator('firstName', true)}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup className={setInputClass(size)}>
          <FormLabel>
            <FormattedMessage {...messages.labelLastName} />
          </FormLabel>
          <Field
            name="lastName"
            type="text"
            component={renderField}
            disabled={!editFlag}
            placeholder={messages.placeHolderLastName.defaultMessage}
            value={lastName}
            onChange={onChangeLastName}
            validate={getFieldValidator('lastName', true)}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

UserNameFields.defaultProps = {
  size: '',
  firstName: '',
  lastName: '',
  editFlag: true,
};
UserNameFields.propTypes = {
  size: PropTypes.string,
  firstName: PropTypes.any,
  onChangeFirstName: PropTypes.func,
  lastName: PropTypes.any,
  onChangeLastName: PropTypes.func,
  editFlag: PropTypes.bool,
};
