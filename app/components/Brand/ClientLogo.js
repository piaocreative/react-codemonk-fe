import React from 'react';
import { brandingDarkIcon } from 'containers/App/constants';
import { NavBrand } from './brand-style';

const ClientLogo = () => (
  <NavBrand to="/client" title="CodeMonk" className="cm-logo">
    <img src={brandingDarkIcon} alt="CodeMonk" />
  </NavBrand>
);

export default ClientLogo;
