import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { H4, FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { renderField } from 'utils/Fields';
import { UserNameFields } from 'components/ClientProfileComponents/UserNameFields';
import { PersonalAddressFields } from 'components/ClientProfileComponents/PersonalAddressFields';
import authMessages from 'containers/Auth/CreateProfilePage/messages';
import { getFieldValidator } from './fields';

export const IndividualClientFields = props => {
  const { editFlag = true } = props;
  return (
    <React.Fragment>
      <H4>
        <FormattedMessage {...authMessages.subHeadingBasic} />
      </H4>
      <div className="sub-form">
        <UserNameFields {...props} prefix="individual" />
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelJobTitle} />
              </FormLabel>
              <Field
                name="individualjobTitle"
                component={renderField}
                type="text"
                placeholder={authMessages.placeholderJobTitle.defaultMessage}
                onChange=""
                defaultValue=""
                disabled={!editFlag}
                validate={getFieldValidator('individualjobTitle', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        <H4>
          <FormattedMessage {...authMessages.subHeadingPersonalAddress} />
        </H4>
        <PersonalAddressFields {...props} prefix="individual" />
      </div>
    </React.Fragment>
  );
};

IndividualClientFields.defaultProps = { editFlag: true };
IndividualClientFields.propTypes = {
  editFlag: PropTypes.bool,
};
