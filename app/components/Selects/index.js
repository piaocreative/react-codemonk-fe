/**
 * over ride the react-select and bind with redux-form so we can do a validation of select box.
 * @author Innovify
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import Select from 'react-select';
import { VALIDATION } from 'utils/constants';
import { primaryNew } from 'themes/variables';
import { SelectContainer, selectStyle } from './style';

// import 'react-select/dist/react-select.css';
import filterOptions from './filterOptions';
import { ValidationMessage } from '../Input';
import { DropdownIndicator } from '../DropDownIndicator';

export class Selects extends React.Component {
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
    // For value = 0(type Number) added by pass rule
    if (input.onChange && selectedOption && (selectedOption.value || selectedOption.length || selectedOption.value === 0)) {
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

  /**
   * call to disable options
   * @author Innovify
   */
  disableFilterOptions = options => options;

  optionRenderer = option => {
    const { customOptionsDispay } = this.props;

    if (customOptionsDispay) {
      return (
        <div>
          {option.label}
          <div>
            <small>{option.description && option.description}</small>
          </div>
        </div>
      );
    }
    return option.label;
  };

  render() {
    const {
      multi,
      disable,
      options,
      placeHolder,
      length,
      meta: { touched, error, warning },
      isLoading,
      clearable,
      className,
      fullWidthOption,
      searchable = true,
    } = this.props;
    const { defaultValue } = this.state;
    const { hasMultiError } = this.state;
    const isValid = touched && !defaultValue && error;
    const warnging = hasMultiError ? 'has-warning' : '';
    const errorClass = isValid ? 'has-error' : '';
    const success = touched && !error && !hasMultiError ? 'success' : '';
    const errors = isValid ? 'has-error' : success;

    const syncSelect = (
      <Select
        {...this.props}
        multi={multi}
        value={defaultValue}
        onChange={this.onChange}
        onBlur={this.onBlur}
        options={options}
        placeholder={placeHolder}
        clearable={clearable}
        isSearchable={searchable}
        isDisabled={disable}
        components={{ DropdownIndicator }}
        isLoading={isLoading}
        filterOptions={filterOptions}
        optionRenderer={this.optionRenderer}
        className="custom-selectbox"
        styles={selectStyle(fullWidthOption)}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: `rgba(${primaryNew}, 0.1)`,
            primary50: `rgba(${primaryNew}, 0.1)`,
            primary: `rgb(${primaryNew})`,
          },
        })}
      />
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

Selects.propTypes = {
  options: PropTypes.array,
  input: PropTypes.object,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  disable: PropTypes.bool,
  meta: PropTypes.object,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
  multi: PropTypes.bool,
  url: PropTypes.string,
  creatable: PropTypes.bool,
  async: PropTypes.bool,
  length: PropTypes.number,
  customOptionsDispay: PropTypes.bool,
  isLoading: PropTypes.bool,
  clearable: PropTypes.bool,
  fullWidthOption: PropTypes.bool,
  searchable: PropTypes.bool,
};

Selects.defaultProps = {
  clearable: false,
  disable: false,
  placeHolder: 'select...',
  className: '',
  multi: false,
  creatable: false,
  async: false,
  length: 0,
  fullWidthOption: false,
};

export default Selects;
