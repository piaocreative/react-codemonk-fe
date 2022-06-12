/** ProjectDetailTabs - Teams
 */
import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import { Card, P, H5 } from 'components';
import ToolTip from 'components/ToolTip';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { getTimzoneOffest } from 'containers/MyProfilePage/components/utils';
import { countryTimeXZone, filesIcon, userProfileIcon, starTickIcon } from 'containers/App/constants';
import containerMessage from 'containers/messages';
import messages from 'containers/MyProfilePage/messages';
import { VerifiedContainer } from 'containers/MyProfilePage/styles';
import { CardTalentDetails } from '../styles';

const TeamList = props => {
  const { talentsDetails } = props;

  const getName = name => {
    const nameArr = name.split(' ');
    const firstName = nameArr[0] ? nameArr[0] : '';
    const lastName = nameArr[1] ? `${nameArr[1][0]}.` : '';
    return `${firstName} ${lastName}`;
  };

  return (
    <div className="">
      {talentsDetails.length > 0 ? (
        talentsDetails.map(talent => (
          <Card key={talent} className="mb-20 talent-card">
            <CardTalentDetails>
              <img
                className="talent-pic"
                src={talent.profilePicture}
                alt=""
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = userProfileIcon;
                }}
              />
              <div className="d-flex flex-column p-2">
                <div className="d-flex">
                  <H5 className="mb-1">{getName(talent.name)}</H5>
                  <VerifiedContainer className="d-flex ms-1 mb-0 team-tab">
                    {get(talent, 'verifiedProfile', false) && (
                      <ToolTip
                        titleClass="d-flex"
                        type="other"
                        otherIcon={starTickIcon}
                        placement="right"
                        content={
                          <ul className="m-0 ps-2">
                            <li className="text-start">{messages.interviewedForSkillsAndExpertise.defineMessages}</li>
                            <li className="text-start">{messages.checkedForEducationAndExperiences.defineMessages}</li>
                            <li className="text-start">{messages.verifiedPhotoIDandAddress.defineMessages}</li>
                          </ul>
                        }
                        tooltipId="verifiedProfileToltip"
                      />
                    )}
                  </VerifiedContainer>
                </div>
                <P className="talent-location p16 mb-1">
                  {`${talent.city}, ${talent.country}`}
                  <span>({getTimzoneOffest(countryTimeXZone, 'name', talent.timeZone)})</span>
                </P>
                <P className="p16">Distinguished - {talent.primaryRole}</P>
              </div>
            </CardTalentDetails>
          </Card>
        ))
      ) : (
        <ComingSoonBlock>
          <div className="inner-content">
            <SVG src={filesIcon} />
            <p className="sm my-0">{containerMessage.noTalent.defaultMessage}</p>
          </div>
        </ComingSoonBlock>
      )}
    </div>
  );
};

TeamList.defaultProps = {
  talentsDetails: [],
};

TeamList.propTypes = {
  talentsDetails: PropTypes.array,
};

export default TeamList;
