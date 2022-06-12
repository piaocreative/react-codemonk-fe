import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import { FormControl } from 'components';
import { searchIcon, closeIcon } from 'containers/App/constants';
import { defaultProps, propTypes } from 'containers/proptypes';
import { SearchBox } from './styles';

export const searchOpen = setClicked => {
  setClicked(true);
};

export const searchClose = (searchVal, handleSearchChange, setClicked, setSearch) => {
  if (searchVal) {
    handleSearchChange('');
  }
  setClicked(false);
  setSearch('');
};

export const searchBoxClass = (clicked, isOpen) => {
  let output = 'open';
  if (!isOpen && !clicked) {
    output = '';
  }
  return output;
};

export const SearchComponent = ({ placeholder, handleSearchChange, isOpen = false, customClass = '', initialValue = '' }) => {
  const [clicked, setClicked] = useState(false);
  const [searchVal, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) setClicked(true);

    if (initialValue) {
      setClicked(true);
      setSearch(initialValue);
    }
  }, [isOpen, initialValue]);

  return (
    <SearchBox className={`table-search ${searchBoxClass(clicked, isOpen)} ${customClass}`}>
      <div className="position-relative">
        <FormControl
          type="text"
          value={searchVal}
          placeholder={placeholder}
          className="search-box form-control"
          onClick={() => searchOpen(setClicked)}
          onChange={e => {
            setSearch(e.target.value);
            handleSearchChange(e.target.value);
          }}
        />
        <SVG className="search-icon" src={searchIcon} />
        <button type="button" onClick={() => searchClose(searchVal, handleSearchChange, setClicked, setSearch)} className="close-btn">
          <SVG src={closeIcon} />
        </button>
      </div>
    </SearchBox>
  );
};

SearchComponent.defaultProps = defaultProps;
SearchComponent.propTypes = propTypes;

export default SearchComponent;
