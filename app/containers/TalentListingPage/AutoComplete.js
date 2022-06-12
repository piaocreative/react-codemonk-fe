/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel } from 'components';
import SVG from 'react-inlinesvg';
import { searchIcon, closeIcon } from 'containers/App/constants';
import { SearchBox, SearchOptions } from './styles';
import messages from './messages';

export class AutoComplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired,
  };

  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: '',
  };

  onChange = e => {
    const { options } = this.props;
    const userInput = e && e.currentTarget && e.currentTarget.value;
    const filteredOptions = options.filter(optionName => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e && e.currentTarget && e.currentTarget.value,
    });
  };

  onClick = e => {
    const { valueChanged, filterType } = this.props;
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: '',
    });
    const selectedValue = { label: e.currentTarget.innerText, value: e.currentTarget.innerText };
    const data = { name: filterType, value: selectedValue };
    valueChanged(data);
  };

  onKeyDown = e => {
    const { activeOption, filteredOptions } = this.state;
    const { valueChanged, filterType } = this.props;
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: '',
      });
      if (filteredOptions.length >= 1) {
        const selectedValue = { label: filteredOptions[activeOption], value: filteredOptions[activeOption] };
        const data = { name: filterType, value: selectedValue };
        valueChanged(data);
      }
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  searchClose = (searchVal, onChange) => {
    if (searchVal) {
      onChange('');
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput },
    } = this;
    const { label, customClass, placeholder } = this.props;

    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <SearchOptions className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li className={className} key={optionName} onClick={onClick}>
                  <div className="d-flex">
                    <SVG src={searchIcon} />
                    {optionName}
                  </div>
                </li>
              );
            })}
          </SearchOptions>
        );
      } else {
        optionList = (
          <SearchOptions className="no-options d-flex align-items-center justify-content-center">
            <li>{messages.noOptions.defaultMessage}</li>
          </SearchOptions>
        );
      }
    }
    return (
      <div className={`${customClass} position-relative`}>
        <SearchBox className="input-sm">
          {label !== '' && <FormLabel>{label}</FormLabel>}
          <div className="position-relative">
            <FormControl
              type="text"
              placeholder={placeholder}
              className={`search-box ${userInput !== '' ? 'has-value' : ''}`}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
            />
            <SVG src={searchIcon} className="search-icon" />
            <button type="button" onClick={() => this.searchClose(userInput, onChange)} className="close-btn">
              <SVG src={closeIcon} />
            </button>
          </div>
        </SearchBox>
        {optionList}
      </div>
    );
  }
}

AutoComplete.defaultProps = {
  label: '',
  customClass: '',
  filterType: '',
  placeholder: '',
};
AutoComplete.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customClass: PropTypes.string,
  filterType: PropTypes.string,
  valueChanged: PropTypes.any,
};

export default AutoComplete;
