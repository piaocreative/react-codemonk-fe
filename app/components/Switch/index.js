import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { SwitchContainer } from './switch-styles';

function SwitchComponent(props) {
  const { checked, onChange, fullWidth, layout, showLabel = true } = props;
  const switchLabel = checked ? 'On' : 'Off';
  return (
    <SwitchContainer className={`${fullWidth ? 'd-flex w-100 justify-content-between' : ''}`}>
      {showLabel && <span className={!layout && 'text-bold'}>{!layout ? switchLabel : 'List'}</span>}
      <Switch
        uncheckedIcon={false}
        checkedIcon={false}
        onColor="#1833CC"
        activeBoxShadow="0px 0px 1px 1px rgba(0, 0, 0, 0.2)"
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        width={40}
        height={24}
        onChange={() => {
          onChange();
        }}
        checked={checked}
        handleDiameter={18}
      />
      {showLabel && layout && <span className="ms-3">Card</span>}
    </SwitchContainer>
  );
}

SwitchComponent.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  layout: PropTypes.bool,
  showLabel: PropTypes.bool,
};
export default SwitchComponent;
