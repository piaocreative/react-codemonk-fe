import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import { propTypes } from 'containers/proptypes';
import { DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { SortDropdown } from 'containers/Admin/Projects/styles';
import { downArrowIcon } from 'containers/App/constants';
import messages from './messages';
import { SortDiv } from './styles';

export class SortComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
  }

  dropdownToggle = () => {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  };

  render() {
    const { dropdownOpen } = this.state;
    const { sortArray, currentSort, handleSortChange, showSortIcon = false } = this.props;
    return (
      <SortDiv>
        <SortDropdown className="me-0 align-items-center sort-dropdown" isOpen={dropdownOpen} toggle={this.dropdownToggle}>
          <DropdownToggle className="opacity-100 selected-sort">
            {currentSort ? currentSort.label : messages.sort.defaultMessage}
            {showSortIcon && <SVG className="down-arrow" src={downArrowIcon} />}
          </DropdownToggle>
          <DropdownMenu right>
            {sortArray.map(item => (
              <DropdownItem
                key={item.value}
                className={currentSort.value === item.value ? 'active' : ''}
                onClick={() => handleSortChange(item)}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </SortDropdown>
      </SortDiv>
    );
  }
}

SortComponent.propTypes = propTypes;

export default SortComponent;
