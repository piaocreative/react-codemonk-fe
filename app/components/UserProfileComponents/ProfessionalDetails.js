import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import Selects from 'components/Selects';
import { roles, roleYears } from 'containers/App/constants';
import { getFieldValidator } from './fields';
import messages from './messages';
import { setInputClass } from './utils';
export const ProfessionalDetailsComponents = props => {
  const { primaryRole, yearsOfExperience, onChangePrimaryRole, onChangeExperience, size } = props;
  return (
    <React.Fragment>
      <Row>
        <Col md="6">
          <FormGroup className={setInputClass(size)}>
            <FormLabel>
              <FormattedMessage {...messages.labelPrimaryRole} />
            </FormLabel>
            <Field
              name="primaryRole"
              type="text"
              component={Selects}
              defaultValue={primaryRole}
              searchable
              options={roles.map(item => ({
                label: `${item.name}`,
                value: item.value,
              }))}
              onChange={onChangePrimaryRole}
              placeHolder={messages.placeHolderSelectPrimaryRole.defaultMessage}
              validate={getFieldValidator('primaryRole', true)}
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup className={setInputClass(size)}>
            <FormLabel>
              <FormattedMessage {...messages.labelRoleYears} />
            </FormLabel>
            <Field
              name="yearsOfExperience"
              type="text"
              component={Selects}
              defaultValue={yearsOfExperience}
              searchable
              options={roleYears.map(item => ({
                label: `${item.name}`,
                value: item.value,
              }))}
              onChange={onChangeExperience}
              placeHolder={messages.placeHolderSelectRoleYears.defaultMessage}
              validate={getFieldValidator('yearsOfExperience', true)}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};
ProfessionalDetailsComponents.defaultProps = {
  size: '',
  primaryRole: '',
  yearsOfExperience: '',
  onChangePrimaryRole: () => {},
  onChangeExperience: () => {},
};
ProfessionalDetailsComponents.propTypes = {
  size: PropTypes.string,
  primaryRole: PropTypes.any,
  yearsOfExperience: PropTypes.any,
  onChangePrimaryRole: PropTypes.func,
  onChangeExperience: PropTypes.func,
};
