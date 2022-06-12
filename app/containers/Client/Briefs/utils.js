import React from 'react';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { filesIcon } from 'containers/App/constants';
import containerMessage from 'containers/messages';
import briefListMessage from 'containers/Talent/Briefs/messages';
import { H3 } from 'components';

export const isNoFilterApplied = filter => {
  let value = true;
  let count = 0;
  const teamPrefArray = get(filter, 'teamPrefArray', []);
  const workPrefArray = get(filter, 'workPrefArray', []);
  const assignmentsArray = get(filter, 'assignmentsArray', []);
  const showFiltArray = get(filter, 'showFiltArray', []);
  const expertiseArray = get(filter, 'expertiseArray', []);
  const roleArray = get(filter, 'roleArray', []);
  const skillsArray = get(filter, 'skillsArray', []);
  const alreadyAppliedArray = get(filter, 'alreadyAppliedArray', []);
  const datePostedArray = get(filter, 'datePostedArray', []);

  if (teamPrefArray.length !== 0) {
    count++;
    value = false;
  }
  if (showFiltArray.length !== 0) {
    count++;
    value = false;
  }
  if (workPrefArray.length !== 0) {
    count++;
    value = false;
  }
  if (assignmentsArray.length !== 0) {
    count++;
    value = false;
  }
  if (expertiseArray.length !== 0) {
    count++;
    value = false;
  }
  if (roleArray.length !== 0) {
    count++;
    value = false;
  }
  if (skillsArray.length !== 0) {
    count++;
    value = false;
  }
  if (alreadyAppliedArray.length !== 0) {
    count++;
    value = false;
  }
  if (datePostedArray.length !== 0) {
    count++;
    value = false;
  }
  return { value, count };
};

export const showNoRecordFound = (search, noFilterApplied, userType = 'talent') => {
  let output = <p className="text-center p-5">{containerMessage.noResultText.defaultMessage}</p>;
  if (noFilterApplied && !search) {
    output = (
      <ComingSoonBlock>
        <div className="inner-content">
          <SVG src={filesIcon} />
          {userType === 'talent' ? (
            <>
              <H3 className="mt-0">{briefListMessage.emptyTalentStateHeader.defaultMessage}</H3>
              <p className="sm mb-0">{briefListMessage.emptyTalentStateContent.defaultMessage}</p>
            </>
          ) : (
            <>
              <H3 className="mt-0">{briefListMessage.emptyClientStateHeader.defaultMessage}</H3>
              <p className="sm mb-0">{briefListMessage.emptyClientStateContent.defaultMessage}</p>
            </>
          )}
        </div>
      </ComingSoonBlock>
    );
  }
  return output;
};
