import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import { propTypes } from 'containers/proptypes';
export const getAdminTalentFilterCount = filters => {
  const {
    teamPreference,
    workPreference,
    assignment,
    teamWorking,
    availability,
    degreeLevel,
    skillsArray,
    industry,
    discProfile,
    companyCultures,
    certification,
    location,
    language,
  } = filters;
  let output = 0;
  if (Array.isArray(teamPreference) && teamPreference[0] !== 'all') output++;
  if (Array.isArray(workPreference) && workPreference[0] !== 'all') output++;
  if (Array.isArray(assignment) && assignment[0] !== 'all') output++;
  if (Array.isArray(degreeLevel) && degreeLevel[0] !== 'all') output++;
  if (Array.isArray(location) && location[0] !== 'all') output++;
  if (Array.isArray(language) && language[0] !== 'all') output++;

  if (teamWorking !== 'all') output++;
  if (availability !== 'all') output++;

  if (Array.isArray(skillsArray) && skillsArray.length !== 0) output++;
  if (Array.isArray(industry) && industry.length !== 0) output++;
  if (Array.isArray(discProfile) && discProfile.length !== 0) output++;
  if (Array.isArray(companyCultures) && companyCultures.length !== 0) output++;
  if (Array.isArray(certification) && certification.length !== 0) output++;

  return output;
};

export const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip prefixCls="rc-slider-tooltip" overlay={`${value}`} visible={dragging} placement="top" key={index}>
      <Slider.Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

handle.propTypes = propTypes;
