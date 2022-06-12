/*
 * ClientJobCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import ApplyBrief from 'containers/Talent/ApplyBrief';
import { getLabel, getCurrencySymbol, getTimzoneOffest } from 'containers/MyProfilePage/components/utils';
import { circleTickIcon, currencyData, logoPlaceholderSM, yearsOfExperienceArray, timeXZone } from 'containers/App/constants';
import { P } from 'components';
import SkillsList from './SkillsList';
import JobPreferenceList from './JobPreferenceList';
import { CompanyTimeZone, CompanyName } from './styles';

function ClientJobCard(props) {
  const { jobBriefData = {}, loadJobBriefs } = props;
  return (
    <div className="d-flex justify-content-between flex-column">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <P className="mb-0 p16" opacityVal="0.5">
            {getLabel(get(jobBriefData, 'expertise', ''), yearsOfExperienceArray, 'label')}
          </P>
          <div className="d-flex align-items-center">
            {get(jobBriefData, 'ratePerHour') && (
              <>
                <P className="p16 mb-0 text-primary">
                  {getCurrencySymbol(currencyData, 'code', get(jobBriefData, 'currency'))}
                  {get(jobBriefData, 'ratePerHour')}
                </P>
                <P className="p16 mb-0 no-hover" opacityVal="0.5">
                  /hour
                </P>
              </>
            )}
            {!get(jobBriefData, 'isApplied') ? (
              <div role="button" tabIndex={0} className="ms-3" onClick={e => e.stopPropagation()} onKeyDown={() => {}}>
                <ApplyBrief
                  onKeyDown={() => {}}
                  loadDetails={() => loadJobBriefs()}
                  briefID={get(jobBriefData, '_id')}
                  seniority={getLabel(get(jobBriefData, 'expertise', ''), yearsOfExperienceArray, 'label')}
                  role={get(jobBriefData, 'name')}
                  companyName={get(jobBriefData, 'companyName', '')}
                />
              </div>
            ) : (
              <div className="d-flex align-items-center ms-3">
                <SVG src={circleTickIcon} />
                <P className="p14 mb-0 text-success ms-2">Applied</P>
              </div>
            )}
          </div>
        </div>
        <P className="p20 mt-2">{get(jobBriefData, 'name', '')}</P>
        <SkillsList skills={get(jobBriefData, 'skills')} />
        <JobPreferenceList
          workPreference={get(jobBriefData, 'workPreference')}
          duration={get(jobBriefData, 'duration')}
          assignments={get(jobBriefData, 'assignments')}
          teamPreference={get(jobBriefData, 'teamPreference')}
          ratePerHour={get(jobBriefData, 'ratePerHour')}
        />
      </div>
      {get(jobBriefData, 'companyName') || get(jobBriefData, 'jobId') ? (
        <>
          <hr className="mt-3 mb-3" />
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              {get(jobBriefData, 'companyName') && (
                <>
                  <CompanyName className="d-flex align-items-center">
                    <SVG src={logoPlaceholderSM} />
                    <P className="ms-3 p16 mb-0">{get(jobBriefData, 'companyName', '-')}</P>
                  </CompanyName>
                  {get(jobBriefData, 'timeZone') && (
                    <CompanyTimeZone className="p14 mb-0 ms-3 ps-3" opacityVal="0.5">
                      {getTimzoneOffest(timeXZone, 'name', get(jobBriefData, 'timeZone'))} ({get(jobBriefData, 'timeZone')})
                    </CompanyTimeZone>
                  )}
                </>
              )}
            </div>
            {get(jobBriefData, 'jobId') && (
              <P className="p14 mb-0" opacityVal="0.5">
                Job Id: {get(jobBriefData, 'jobId')}
              </P>
            )}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

ClientJobCard.defaultProps = {
  jobBriefData: {},
  loadJobBriefs: () => {},
};

ClientJobCard.propTypes = {
  jobBriefData: PropTypes.object,
  loadJobBriefs: PropTypes.func,
};

export default ClientJobCard;
