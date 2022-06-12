import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import DatePickers from 'components/DatePickers';
import * as formValidations from 'utils/formValidations';
import moment from 'moment';
import { setInputClass } from './utils';
import messages from './messages';
export const DOBField = props => {
  const { dob, onChangeDob, size } = props;

  return (
    <FormGroup className={setInputClass(size)}>
      <FormLabel>
        <FormattedMessage {...messages.labelDOB} />
      </FormLabel>
      <Field
        name="dob"
        component={DatePickers}
        dateFormat="dd/MM/yyyy"
        showYearDropDown
        placeholder="DD/MM/YYYY"
        maxDate={moment()
          .subtract(15, 'years')
          .toDate()}
        onChange={onChangeDob}
        defaultValue={dob}
        yearDropdownItemNumber={50}
        scrollableYearDropdown
        placement="bottom-start"
        validate={[formValidations.requiredDate]}
      />
    </FormGroup>
  );
};

DOBField.defaultProps = {
  size: '',
  dob: '',
};
DOBField.propTypes = {
  size: PropTypes.string,
  dob: PropTypes.any,
  onChangeDob: PropTypes.func,
};
