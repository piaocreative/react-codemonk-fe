/**
 * over ride the react-select and bind with redux-form so we can do a validation of select box.
 * @author Innovify
 *
 */
import React from 'react';
import { FormGroup } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { defaultProps, propTypes } from 'containers/proptypes';
import { VALIDATION } from 'utils/constants';
import { primaryNew } from 'themes/variables';
import { SelectContainer, selectStyle } from '../Selects/style';

import filterOptions from '../Selects/filterOptions';
import { ValidationMessage } from '../Input';
import { DropdownIndicator } from '../DropDownIndicator';

export class AsyncSelects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue,
      hasMultiError: false,
    };
  }

  /**
   * call when component will receive Params.
   */
  componentWillReceiveProps(nextProps) {
    const { defaultValue } = this.props;
    if (nextProps.defaultValue !== defaultValue) {
      this.setDefaultValue(nextProps.defaultValue);
    }
  }

  /**
   * onChange call on data value selected by user
   * @param {object} a json of data
   * @author Innovify
   */
  onChange = selectedOption => {
    const { input, multi, length, clearable, defaultValue } = this.props;
    if (input.onChange && selectedOption && (selectedOption.value || selectedOption.length)) {
      if (multi) {
        if (selectedOption.length <= length) {
          this.setState({ defaultValue: selectedOption });
          input.onChange(selectedOption);
          this.setState({ hasMultiError: false });
        } else {
          this.setState({ hasMultiError: true });
        }
      } else {
        this.setState({ defaultValue: selectedOption });
        input.onChange(selectedOption);
      }
    } else if (multi) {
      this.setState({ defaultValue: selectedOption });
      input.value = '';
      input.onChange(selectedOption);
    } else if (clearable) {
      this.setState({ defaultValue: '' });
      input.onChange('');
    } else {
      const value = defaultValue;
      this.setState({ defaultValue: value });
      input.value = '';
    }
  };
  /**
   * onChange call on data value selected by user
   *
   * @param {object} a json of data
   * @author Innovify
   * @commented we do not need it, issue on multiple select on same form
   */

  onBlur = () => {
    const { input } = this.props;
    input.onBlur(input.value);
  };

  /**
   * onChange call on data value selected by user
   * @param {object} a json of data
   * @author Innovify
   */
  setDefaultValue = defaultValue => {
    this.setState({ defaultValue });
  };

  noOptionMessage = () => {
    const { defaultOptions } = this.props;
    const { enteredCharCount } = this.state;
    if (enteredCharCount > 1 && defaultOptions.length === 0) {
      return 'No Options';
    }
    return '';
  };

  render() {
    const {
      multi,
      placeHolder,
      length,
      meta: { touched, error, warning },
      input,
      className,
      fullWidthOption,
      loadOptions,
      defaultOptions,
      handleChange,
      disable = false,
      creatable = false,
    } = this.props;
    const { defaultValue } = this.state;
    const { hasMultiError } = this.state;
    const isValid = touched && !defaultValue && error;
    const warnging = hasMultiError ? 'has-warning' : '';
    const errorClass = isValid ? 'has-error' : '';
    const success = touched && !error && !hasMultiError ? 'success' : '';
    const errors = isValid ? 'has-error' : success;

    const selectProps = {
      cacheOptions: true,
      defaultOptions,
      loadOptions,
      onChange: handleChange,
      defaultValue,
      onBlur: () => input.onBlur(),
      value: defaultValue,
      placeholder: placeHolder,
      isClearable: true,
      isDisabled: disable,
      components: { DropdownIndicator },
      filterOptions,

      styles: selectStyle(fullWidthOption),
      noOptionsMessage: this.noOptionMessage,
      onInputChange: value => {
        this.setState({ enteredCharCount: value.length });
      },
      theme: theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: `rgba(${primaryNew}, 0.1)`,
          primary50: `rgba(${primaryNew}, 0.1)`,
          primary: `rgb(${primaryNew})`,
        },
      }),
    };

    const syncSelect = creatable ? (
      <AsyncCreatableSelect {...selectProps} {...this.props} className="custom-selectbox" />
    ) : (
      <AsyncSelect {...selectProps} {...this.props} className="custom-selectbox" />
    );

    return (
      <FormGroup className={`${warnging} ${errorClass}`}>
        <div className={`${errors} form-control-validated`}>
          <SelectContainer className={className}>{syncSelect}</SelectContainer>
          <ValidationMessage>{touched && !defaultValue && (error || warning)}</ValidationMessage>
          {multi && hasMultiError && (
            <ValidationMessage>
              {VALIDATION.MAX_LENGTH} {length}
            </ValidationMessage>
          )}
        </div>
      </FormGroup>
    );
  }
}

AsyncSelects.defaultProps = defaultProps;
AsyncSelects.propTypes = propTypes;

export default AsyncSelects;
