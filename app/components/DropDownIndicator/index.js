import React from 'react';
import { components } from 'react-select';
import SVG from 'react-inlinesvg';
import { rightAngleIcon } from 'containers/App/constants';
import { DropDownIndicatorArrow } from './dropdown-styles';
export const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <DropDownIndicatorArrow>
      <SVG src={rightAngleIcon} className="right-angle" />
    </DropDownIndicatorArrow>
  </components.DropdownIndicator>
);
