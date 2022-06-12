/*
 * JobPreferenceList
 */

import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { getArrayLabels } from 'containers/MyProfilePage/components/utils';
import { calendarIcon, teamIcon, payIcon, watchIcon, pinIcon, assignmentArray, teamPreferenceArray } from 'containers/App/constants';
import { projectPreference } from 'containers/Client/Briefs/constants';
import { P } from 'components';
import { JobPreferenceListItems } from './styles';

function JobPreferenceList(props) {
  const { workPreference, duration, assignments, teamPreference, ratePerHour } = props;
  return (
    <JobPreferenceListItems className="inline-list">
      <li>
        <SVG src={watchIcon} />
        <P className="p16 mb-0" opacityVal="0.5">
          {getArrayLabels(workPreference, projectPreference).join(', ')}
        </P>
      </li>
      <li>
        <SVG src={calendarIcon} />
        <P className="p16 mb-0" opacityVal="0.5">
          {duration} Months
        </P>
      </li>
      {assignments.length > 0 && (
        <li>
          <SVG src={pinIcon} />
          <P className="p16 mb-0" opacityVal="0.5">
            {getArrayLabels(assignments, assignmentArray).join(', ')}
          </P>
        </li>
      )}
      {/* x-large-team value is depricated from the teamPreferenceArray. Earlier It was there so older data may has this value. This condition is used to exclude that value. */}
      {teamPreference.length > 0 && !(teamPreference.length === 1 && teamPreference.includes('x-large-team')) && (
        <li>
          <SVG src={teamIcon} />
          <P className="p16 mb-0" opacityVal="0.5">
            {getArrayLabels(teamPreference, teamPreferenceArray)
              .filter(v => v)
              .join(', ')}
          </P>
        </li>
      )}
      {ratePerHour !== '' && ratePerHour > 0 && (
        <li>
          <SVG src={payIcon} />
          <P className="p16 mb-0" opacityVal="0.5">
            {ratePerHour}/ <span>hour</span>
          </P>
        </li>
      )}
    </JobPreferenceListItems>
  );
}

JobPreferenceList.defaultProps = {
  workPreference: [],
  duration: 0,
  assignments: [],
  teamPreference: [],
  ratePerHour: 0,
};

JobPreferenceList.propTypes = {
  workPreference: PropTypes.array,
  duration: PropTypes.number,
  assignments: PropTypes.array,
  teamPreference: PropTypes.array,
  ratePerHour: PropTypes.number,
};

export default JobPreferenceList;
