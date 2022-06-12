import React, { useState } from 'react';
import { H5, Button, P, H3, Badge } from 'components';
import {
  userProfileIcon,
  diamondIcon,
  certificationsIcon,
  teamIcon,
  industryIcon,
  timeXZone,
  teamPreferenceArray,
} from 'containers/App/constants';
import containerMessage from 'containers/messages';
import { propTypes } from 'containers/proptypes';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import AllocateTalent from 'containers/TalentListingPage/AllocateTalent';
import HireTalent from 'containers/TalentListingPage/HireTalent';
import { getArrayLabels, getTimzoneOffest } from 'containers/MyProfilePage/components/utils';
import { UserProfile, UserProfileImg, PreferencesList } from 'containers/MyProfilePage/styles';

import { TalentCard } from 'containers/TalentListingPage/styles';

export const CardComponent = ({ talentData, userRole = 'admin', briefTab = false, project = {} }) => {
  const [hireModal, setHireModal] = useState(false);
  const [hireData, setHireData] = useState({});
  const [talentId, setTalentId] = useState('');
  const [talentName, setTalentName] = useState('');

  const [allocateModal, setAllocateModal] = useState(false);
  const [projectId, setProjectId] = useState('');

  const id = briefTab ? get(talentData, 'talentId', '') : get(talentData, '_id', '');
  const cardLink = userRole === 'admin' ? `/admin/talent-profile/${id}` : `/client/talent-profile/${id}`;

  const hireTalent = e => {
    e.preventDefault();
    e.stopPropagation();
    const projectTalentId = get(project, 'projectId', '');
    const projectName = get(project, 'projectName', '');
    const projectSummary = get(project, 'projectDescription', '');
    setHireModal(true);
    setHireData({ projectTalentId, projectName, projectSummary });
    setTalentId(get(talentData, 'talentId', ''));
  };

  const hireModalClose = () => {
    setHireModal(false);
    setTalentId('');
  };

  const allocateTalent = e => {
    e.preventDefault();
    e.stopPropagation();
    const projectAllocateId = get(project, 'projectId', '');
    setAllocateModal(true);
    setTalentId(get(talentData, 'talentUserId', ''));
    setTalentName(get(talentData, 'name', ''));
    setProjectId(projectAllocateId);
  };

  const allocateModalClose = () => {
    setAllocateModal(false);
    setTalentId('');
  };

  const cardBtn = () => {
    switch (briefTab) {
      case 'application':
        if (userRole === 'admin') {
          return (
            <Button className="btn btn-sm btn-outline" onClick={e => allocateTalent(e)}>
              <span>{containerMessage.btnAllocate.defaultMessage}</span>
            </Button>
          );
        }
        return (
          <Button className="btn btn-sm btn-outline" onClick={e => hireTalent(e)}>
            <span>{containerMessage.btnHire.defaultMessage}</span>
          </Button>
        );
      case 'interview':
        return <P className="text-danger p14 mb-0">Reject</P>;
      case 'hired':
        return '';
      default:
        return '';
    }
  };

  return (
    <>
      <TalentCard to={cardLink} key={id} type="cardComponent" className="card-sm flex-1 d-flex flex-column">
        <div className="d-flex flex-0 justify-content-between align-items-center">
          <UserProfile>
            <UserProfileImg>
              <img
                src={get(talentData, 'profilePicture', '')}
                alt="user profile"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = userProfileIcon;
                }}
              />
            </UserProfileImg>
          </UserProfile>
          {cardBtn()}
        </div>
        <div className="d-flex flex-0 mt-3">
          <div className="d-flex justify-content-between w-100 flex-column">
            <H3>
              {get(talentData, 'firstName')} {get(talentData, 'lastName')}
            </H3>
            <P className="p14 mb-0" opacityVal="0.5">
              {get(talentData, 'city')}, {get(talentData, 'country')} | {getTimzoneOffest(timeXZone, 'name', get(talentData, 'timeZone'))} (
              {get(talentData, 'timeZone')})
            </P>
          </div>
        </div>
        <hr />
        <div className="flex-0">
          <P className="p14 mb-2" opacityVal="0.5">
            {get(talentData, 'yearsOfExperience')}
          </P>
          <H5>{get(talentData, 'primaryRole')}</H5>
        </div>
        <hr />
        {get(talentData, 'skills') && get(talentData, 'skills', []).length >= 1 ? (
          <>
            <div className="d-flex flex-wrap flex-0">
              {get(talentData, 'skills', [])
                .slice(0, 4)
                .map(subItem => (
                  <Badge key={subItem.name} className="primary badge-sm me-2 mb-2">
                    {subItem.name}
                  </Badge>
                ))}
              {get(talentData, 'skills', []).length > 4 && (
                <Badge className="primary badge-sm me-2 mb-2">+{get(talentData, 'skills', []).length - 4} Skills</Badge>
              )}
            </div>
            <hr />
          </>
        ) : (
          ''
        )}
        <PreferencesList className="d-flex flex-column flex-1">
          {get(talentData, 'certificateDetails') && get(talentData, 'certificateDetails', []).length >= 1 ? (
            <li>
              <SVG src={certificationsIcon} />
              <P className="p16 mb-0 text-truncate d-block" opacityVal="0.5">
                {get(talentData, 'certificateDetails', [])
                  .map(obj => obj.name)
                  .map(i => i)
                  .join(', ')}
              </P>
            </li>
          ) : (
            ''
          )}
          {get(talentData, 'industries') && get(talentData, 'industries', []).length >= 1 ? (
            <li>
              <SVG src={industryIcon} />
              <P className="p16 mb-0 text-truncate d-block" opacityVal="0.5">
                {get(talentData, 'industries', [])
                  .map(i => i)
                  .join(', ')}
              </P>
            </li>
          ) : (
            ''
          )}
          {get(talentData, 'companyCultures') && get(talentData, 'companyCultures', []).length >= 1 ? (
            <li>
              <SVG src={diamondIcon} />
              <P className="p16 mb-0 text-truncate d-block" opacityVal="0.5">
                {get(talentData, 'companyCultures', [])
                  .map(i => i)
                  .join(', ')}
              </P>
            </li>
          ) : (
            ''
          )}
          {get(talentData, 'teamPreference') && get(talentData, 'teamPreference', []).length >= 1 ? (
            <li>
              <SVG src={teamIcon} />
              <P className="p16 mb-0 text-truncate d-block" opacityVal="0.5">
                {getArrayLabels(get(talentData, 'teamPreference', []), teamPreferenceArray)
                  .map(i => i)
                  .join(', ')}
              </P>
            </li>
          ) : (
            ''
          )}
        </PreferencesList>
        <hr />
        <div className="flex-0">
          <P className="p14 mb-2" opacityVal="0.5">
            Formerly at
          </P>
          <P className="p16 mb-0">{get(talentData, 'formerEmployer', [])}</P>
        </div>
      </TalentCard>
      {hireModal && (
        <HireTalent talentId={talentId} showHireModal={hireModal} hireModalClose={() => hireModalClose()} hireData={hireData} />
      )}
      {allocateModal && (
        <AllocateTalent
          talentId={talentId}
          talentName={talentName}
          projectId={projectId}
          showAllocateModal={allocateModal}
          allocateModalClose={() => allocateModalClose()}
        />
      )}
    </>
  );
};

CardComponent.propTypes = propTypes;

export default CardComponent;
