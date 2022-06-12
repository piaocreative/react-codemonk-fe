import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { renderField } from 'utils/Fields';
import { setInputClass } from 'components/UserProfileComponents//utils';
import messages from 'components/UserProfileComponents//messages';
import { getFieldValidator } from './fields';
export const UserNameFields = props => {
  const { size, editFlag = true, prefix = '' } = props;

  return (
    <Row>
      <Col md={6}>
        <FormGroup className={setInputClass(size)}>
          <FormLabel>
            <FormattedMessage {...messages.labelFirstName} />
          </FormLabel>
          <Field
            name={`${prefix}firstName`}
            type="text"
            component={renderField}
            disabled={!editFlag}
            placeholder={messages.placeHolderFirstName.defaultMessage}
            validate={getFieldValidator(`${prefix}firstName`, true)}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup className={setInputClass(size)}>
          <FormLabel>
            <FormattedMessage {...messages.labelLastName} />
          </FormLabel>
          <Field
            name={`${prefix}lastName`}
            type="text"
            component={renderField}
            disabled={!editFlag}
            placeholder={messages.placeHolderLastName.defaultMessage}
            validate={getFieldValidator(`${prefix}lastName`, true)}
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
  prefix: '',
  editFlag: true,
};
UserNameFields.propTypes = {
  size: PropTypes.string,
  prefix: PropTypes.string,
  firstName: PropTypes.any,
  lastName: PropTypes.any,
  editFlag: PropTypes.bool,
};
