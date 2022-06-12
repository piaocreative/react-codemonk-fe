/* eslint-disable prettier/prettier */
/*
 * CandidateCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { Badge, P, Card } from 'components';
import { getLabel, getArrayLabels, getTimzoneOffest, languageLabel } from 'containers/MyProfilePage/components/utils';
import { yearsOfExperienceArray, timeXZone, teamPreferenceArray } from 'containers/App/constants';
import { PreferencesList } from 'containers/MyProfilePage/styles';
import messages from './messages';

function CandidateCard(props) {
  const { briefData } = props;

  const handleActiveField = (value, type) => {
    const userData = get(briefData, 'userData', {});
    const userDataSkill = get(userData, 'skills', []);
    let isActive = 'secondary';
    let matchItem;
    let userTeamTypes = [];
    switch (type) {
      case 'expertise':
        matchItem = getLabel(get(userData, 'yearsOfExperience', ''), yearsOfExperienceArray, 'label') === value && true;
        break;
      case 'skills':
      case 'softSkills':
        matchItem = userDataSkill.find(item => item.name === value);
        break;
      case 'language':
        matchItem = get(userData, type, []).find(item => languageLabel(item) === value);
        break;
      case 'timeZone':
        matchItem = get(userData, type) === value && true;
        break;
      case 'industries':
        matchItem = get(userData, type, []).find(item => item === value);
        break;
      case 'teamPreference':
        userTeamTypes = getArrayLabels(get(userData, type, []), teamPreferenceArray);
        matchItem = userTeamTypes.find(item => item === value);
        break;
      case 'certificateDetails':
        matchItem = get(userData, type, []).find(item => item.name === value);
        break;
      default:
        isActive = 'secondary';
        break;
    }
    isActive = matchItem ? 'success' : 'secondary';

    return isActive;
  };

  return (
    <>
      <Card className="pt-4">
        <P className="p20">
          <FormattedMessage {...messages.title} />
        </P>
        <div className="mt-4 pt-1">
          <P className="p14 mb-1" fontFamily="GT-Walsheim-Pro-Medium">
            <FormattedMessage {...messages.seniority} />
          </P>
          <div className="inline-list">
            <Badge className={`text-ellipsis mw-100 mt-2 me-2 badge-sm ${handleActiveField(get(briefData, 'expertise'), 'expertise')}`}>
              {get(briefData, 'expertise')}
            </Badge>
          </div>
        </div>
        {get(briefData, 'skills') && get(briefData, 'skills').length > 0 && (
          <>
            <hr className="mt-3 mb-3" />
            <div>
              <P className="p14 mb-1" fontFamily="GT-Walsheim-Pro-Medium">
                <FormattedMessage {...messages.skillFrameworks} />
              </P>
              <PreferencesList className="inline-list">
                {get(briefData, 'skills').map(brief => (
                  <Badge className={`text-ellipsis mw-100 mt-2 me-2 badge-sm ${handleActiveField(brief, 'skills')}`} key={brief}>
                    {brief}
                  </Badge>
                ))}
              </PreferencesList>
            </div>
          </>
        )}

        {get(briefData, 'softSkills') && get(briefData, 'softSkills').length > 0 && (
          <>
            <hr className="mt-3 mb-3" />
            <div>
              <P className="p14 mb-1" fontFamily="GT-Walsheim-Pro-Medium">
                <FormattedMessage {...messages.softSkills} />
              </P>
              <div className="inline-list">
                {get(briefData, 'softSkills').map(brief => (
                  <Badge className={`text-ellipsis mw-100 mt-2 me-2 badge-sm ${handleActiveField(brief, 'softSkills')}`} key={brief}>
                    {brief}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {get(briefData, 'certifications') && get(briefData, 'certifications').length > 0 && (
          <>
            <hr className="mt-3 mb-3" />
            <div>
              <P className="p14 mb-1" fontFamily="GT-Walsheim-Pro-Medium">
                <FormattedMessage {...messages.certifications} />
              </P>
              <div className="inline-list">
                {get(briefData, 'certifications').map(brief => (
                  <Badge
                    className={`text-ellipsis mw-100 mt-2 me-2 badge-sm ${handleActiveField(brief, 'certificateDetails')}`}
                    key={brief}
                  >
                    {brief}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {get(briefData, 'languages') && get(briefData, 'languages').length > 0 && (
          <>
            <hr className="mt-3 mb-3" />
            <div>
              <P className="p14 mb-1" fontFamily="GT-Walsheim-Pro-Medium">
                <FormattedMessage {...messages.language} />
              </P>
              <div className="inline-list">
                {get(briefData, 'languages').map(brief => (
                  <Badge className={`text-ellipsis mw-100 mt-2 me-2 badge-sm ${handleActiveField(brief, 'language')}`} key={brief}>
                    {brief}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {get(briefData, 'timeZone') && (
          <>
            <hr className="mt-3 mb-3" />
            <div>
              <P className="p14 mb-1" fontFamily="GT-Walsheim-Pro-Medium">
                <FormattedMessage {...messages.timezone} />
              </P>
              <div className="inline-list">
                <Badge className={`text-ellipsis mw-100 mt-2 me-2 badge-sm ${handleActiveField(get(briefData, 'timeZone'), 'timeZone')}`}>
                  {getTimzoneOffest(timeXZone, 'name', get(briefData, 'timeZone'))} ({get(briefData, 'timeZone')})
                </Badge>
              </div>
            </div>
          </>
        )}

        {get(briefData, 'teamPrefArray') &&
          get(briefData, 'teamPrefArray').length > 0 &&
          !(get(briefData, 'teamPrefArray').length === 1 && get(briefData, 'teamPrefArray').includes(undefined)) && (
            <>
              <hr className="mt-3 mb-3" />
              <div>
                <P className="p14 mb-1" fontFamily="GT-Walsheim-Pro-Medium">
                  <FormattedMessage {...messages.teamWork} />
                </P>
                <div className="inline-list">
                  {get(briefData, 'teamPrefArray').map(
                    brief =>
                      brief && (
                        <Badge
                          className={`text-ellipsis mw-100 mt-2 me-2 badge-sm ${handleActiveField(brief, 'teamPreference')}`}
                          key={brief}
                        >
                          {brief}
                        </Badge>
                      ),
                  )}
                </div>
              </div>
            </>
          )}

        {get(briefData, 'industry') && (
          <>
            <hr className="mt-3 mb-3" />
            <div>
              <P className="p14 mb-1" fontFamily="GT-Walsheim-Pro-Medium">
                <FormattedMessage {...messages.industry} />
              </P>
              <div className="inline-list">
                <Badge className={`text-ellipsis mw-100 mt-2 me-2 badge-sm ${handleActiveField(get(briefData, 'industry'), 'industries')}`}>
                  {get(briefData, 'industry')}
                </Badge>
              </div>
            </div>
          </>
        )}
      </Card>
    </>
  );
}

CandidateCard.defaultProps = {
  briefData: {},
};

CandidateCard.propTypes = {
  briefData: PropTypes.object,
};

export default CandidateCard;
