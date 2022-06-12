import React from 'react';
import { brandingIcon } from 'containers/App/constants';
import { LeftSectionBlock, BrandIcon } from './styles';

const LeftSection = () => (
  <LeftSectionBlock className="d-none d-md-block">
    <BrandIcon to="#" title="CodeMonk">
      <img src={brandingIcon} alt="CodeMonk" />
    </BrandIcon>
  </LeftSectionBlock>
);

export default LeftSection;
