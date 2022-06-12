import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import get from 'lodash/get';
import Selects from 'components/Selects';
import * as formValidations from 'utils/formValidations';
import { CountryCode } from 'containers/Auth/PersonalDetails/style';
import { countryData } from 'containers/App/constants';
import { renderField } from 'utils/Fields';
import { setInputClass } from 'components/UserProfileComponents/utils';
import messages from 'components/UserProfileComponents/messages';
import { getFieldValidator } from './fields';
export const PhoneNumberField = props => {
  const { prefix, [`${prefix}countryCode`]: countryCode, size, editFlag = true } = props;

  const selectedCountry = countryData.find(c => c.name === get(countryCode, 'value'));
  const tempCode = selectedCountry ? { label: `${get(selectedCountry, 'alpha2code')} ${get(selectedCountry, 'phoneCode')}` } : '';
  return (
    <FormGroup className={setInputClass(size)}>
      <FormLabel>
        <FormattedMessage {...messages.labelPhoneNumber} />
      </FormLabel>
      <div className="d-flex">
        <CountryCode>
          <Field
            name={`${prefix}countryCode`}
            component={Selects}
            defaultValue={tempCode}
            disable={!editFlag}
            options={countryData.map(code => ({
              label: `${code.name} ${code.phoneCode}`,
              value: code.name,
            }))}
            placeHolder="+44"
            validate={[formValidations.requiredSelect]}
            fullWidthOption
          />
        </CountryCode>
        <div className="w-100 mw-100 labelSpacing ms-2">
          <Field
            name={`${prefix}phoneNumber`}
            type="text"
            component={renderField}
            disabled={!editFlag}
            placeholder={messages.placeHolderPhoneNumber.defaultMessage}
            validate={getFieldValidator(`${prefix}phoneNumber`, true)}
          />
        </div>
      </div>
    </FormGroup>
  );
};

PhoneNumberField.defaultProps = {
  size: '',
  phoneNumber: '',
  prefix: '',
  countryCode: 44,
};
PhoneNumberField.propTypes = {
  size: PropTypes.string,
  phoneNumber: PropTypes.string,
  prefix: PropTypes.string,
  countryCode: PropTypes.any,
};
