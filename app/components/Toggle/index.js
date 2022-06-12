/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Select from './Select';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
  const { value: propValue, values, messages, onToggle } = props;
  let content = <option>--</option>;

  // If we have items, render them
  if (values) {
    content = values.map(value => <ToggleOption key={value} value={value} message={messages[value]} />);
  }

  return (
    <Select value={propValue} onChange={onToggle}>
      {content}
    </Select>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
