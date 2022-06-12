import { primaryNew, dangerNew, primaryDarkNew, white, primaryGradientRight } from 'themes/variables';
export const boxShadowSelect = (state, errorSelect) => {
  let shadow = '';
  if (state.isFocused) {
    shadow = `0px 0px 0px 2px rgba(${primaryNew}, 0.2)`;
  } else if (errorSelect) {
    shadow = `0px 0px 0px 2px rgba(${dangerNew}, 0.2)`;
  }
  return shadow;
};
export const StyleSelect = ({ errorSelect }) => ({
  control: (styles, state) => ({
    '.input-sm &': {
      minHeight: '40px',
    },
    ...styles,
    backgroundColor: `rgb(${white})`,
    minHeight: '46px',
    boxShadow: boxShadowSelect(state, errorSelect),
    border: `1px solid rgba(${primaryNew}, 0.2)`,
    borderRadius: '10px',
    paddingLeft: '16px',
    paddingRight: '16px',
    fontSize: '16px',
    ':hover': {
      boxShadow: `0px 0px 0px 2px rgba(${primaryNew}, 0.2)`,
      borderColor: `rgba(${primaryNew}, 0.2)`,
    },
    '@media only screen and (max-width: 1199px)': {
      ...styles['@media only screen and (max-width: 1199px)'],
    },
  }),
  multiValueLabel: styles => ({
    ...styles,
    fontSize: '16px',
    marginLeft: '11px',

    '@media only screen and (max-width: 1199px)': {
      ...styles['@media only screen and (max-width: 1199px)'],
      marginLeft: '6px',
    },
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
  valueContainer: styles => ({
    ...styles,
    paddingLeft: '0',
  }),
  menu: styles => ({
    ...styles,
    border: `1px solid rgba(${primaryNew}, 0.1)`,
    boxShadow: `0px 1px 6px rgba(${primaryNew}, 0.15)`,
    borderRadius: '10px',
    zIndex: 10,
  }),
  menuList: styles => ({
    ...styles,
    padding: '0',
    borderRadius: '10px',
    maxHeight: '200px',
  }),
  option: styles => ({
    ...styles,
    fontSize: '16px',
    fontFamily: 'GT-Walsheim-Pro-Regular',
  }),
  placeholder: defaultStyles => ({ ...defaultStyles, color: `rgba(${primaryDarkNew}, 0.5)`, opacity: '1' }),
});
