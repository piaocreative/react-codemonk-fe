import styled from 'styled-components';
import { white, dangerNew, primaryNew, primaryDarkNew, primaryGradientRight } from 'themes/variables';

export const SelectContainer = styled.div`
  .Select-control {
    height: 49px;
    padding: 0 3px;
    border-radius: 5px;
  }
  .Select-control:hover {
    box-shadow: none;
  }
  .Select-placeholder,
  .Select--single > .Select-control .Select-value {
    line-height: 1.5;
    padding: 0.8rem 42px 0.7rem 15px;
  }
  .Select-input {
    height: 47px;
  }
  .Select-input > input {
    line-height: 33px;
  }
  .Select-arrow {
    border-width: 6px 5px 2.5px;
    border-color: #aaa transparent transparent;
  }
  .Select-clear {
    font-size: 15px;
  }
  .Select-menu-outer {
    z-index: 10000;
  }
  .css-1okebmr-indicatorSeparator,
  .css-109onse-indicatorSeparator,
  .css-1hb7zxy-IndicatorsContainer span {
    width: 0;
  }
`;
SelectContainer.displayName = 'SelectContainer';

export const selectStyle = fullWidthOption => ({
  control: styles => ({
    ...styles,
    backgroundColor: `rgb(${white})`,
    minHeight: '46px',
    border: `1px solid rgba(${primaryNew}, 0.2)`,
    borderRadius: '10px',
    paddingLeft: '16px',
    paddingRight: '16px',
    fontSize: '16px',
    ':hover': {
      boxShadow: `0px 0px 0px 2px rgba(${primaryNew}, 0.2)`,
      borderColor: `rgba(${primaryNew}, 0.2)`,
    },
    '.has-error &': {
      borderColor: `rgb(${dangerNew})`,
      boxShadow: `0px 0px 0px 2px rgba(${dangerNew}, 0.2)`,
    },
    '@media only screen and (max-width: 1199px)': {
      ...styles['@media only screen and (max-width: 1199px)'],
    },
  }),
  multiValueLabel: styles => ({
    ...styles,
    fontSize: '16px',
    marginLeft: '11px',
    '@media only screen and (max-width: 768px)': {
      ...styles['@media only screen and (max-width: 768px)'],
      marginLeft: '6px',
    },
  }),
  singleValue: styles => ({
    ...styles,
    color: `rgb(${primaryDarkNew})`,
  }),
  multiValue: styles => ({
    ...styles,
    '.input-sm &': {
      minHeight: '26px',
    },
    paddingTop: '3px',
    paddingBottom: '3px',
    fontSize: '16px',
    lineHeight: '18px',
    marginRight: '10px',
    minHeight: '30px',
    borderRadius: '15px',
    color: `rgb(${primaryDarkNew})`,
    background: primaryGradientRight,
    '@media only screen and (max-width: 1199px)': {
      ...styles['@media only screen and (max-width: 1199px)'],
      minHeight: '30px',
      marginRight: '10px',
    },
  }),
  valueContainer: styles => ({
    ...styles,
    paddingLeft: '0',
  }),
  multiValueRemove: styles => ({
    ...styles,
    '.input-sm &': {
      fontSize: '16px',
    },
    fontSize: '16px',
    marginRight: '11px',
    marginLeft: '9px',
    transform: 'scale(1.3)',
    ':hover': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      fill: `rgba(${primaryDarkNew}, 0.5)`,
      width: '12px',
      height: '12px',
    },
    '@media only screen and (max-width: 1199px)': {
      ...styles['@media only screen and (max-width: 1199px)'],
      marginRight: '6px',
      marginLeft: '6px',
    },
  }),
  menuList: styles => ({
    ...styles,
    padding: '0',
    borderRadius: '10px',
  }),
  option: styles => ({
    ...styles,
    fontSize: '16px',
    fontFamily: 'GT-Walsheim-Pro-Regular',
  }),
  menu: styles => ({
    ...styles,
    zIndex: 10,
    border: `1px solid rgba(${primaryNew}, 0.1)`,
    boxShadow: `0px 1px 6px rgba(${primaryNew}, 0.15)`,
    borderRadius: '10px',
    minHeight: '46px',
    width: fullWidthOption ? '330%' : '100%',
    '@media only screen and (max-width: 1199px)': {
      ...styles['@media only screen and (max-width: 1199px)'],
      width: fullWidthOption ? '233%' : '100%',
    },
  }),
  placeholder: defaultStyles => ({ ...defaultStyles, color: `rgba(${primaryDarkNew}, 0.5)`, opacity: '1' }),
});
