import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { primaryNew } from 'themes/variables';
import { StyleSelect } from './styleTags-styles';
import P from '../P';
import { DropdownIndicator } from '../DropDownIndicator';

const Menu = props => {
  const { children, getValue, optionLimit = '' } = props;
  const optionSelectedLength = getValue().length || 0;
  const isOptionhasLimit =
    optionSelectedLength < optionLimit ? (
      children
    ) : (
      <div className="d-flex justify-content-center p-2 text-muted">
        <P className="p16 my-2" opacityVal="0.5">
          Maximum selection reached
        </P>
      </div>
    );
  return <components.Menu {...props}>{optionLimit ? isOptionhasLimit : children}</components.Menu>;
};
const SelectTags = props => {
  const { height, errorSelect, optionLimit } = props;

  return (
    <CreatableSelect
      {...props}
      components={{
        Menu: props => <Menu {...props} optionLimit={optionLimit} />,
        DropdownIndicator,
        IndicatorSeparator: () => null,
      }}
      isClearable={false}
      styles={StyleSelect({ height, errorSelect })}
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
};

SelectTags.defaultProps = {
  height: '46px',
  errorSelect: '',
};
SelectTags.propTypes = {
  height: PropTypes.any,
  errorSelect: PropTypes.any,
  optionLimit: PropTypes.string,
};
Menu.propTypes = {
  children: PropTypes.any,
  optionLimit: PropTypes.string,
  getValue: PropTypes.func,
};

export default SelectTags;
