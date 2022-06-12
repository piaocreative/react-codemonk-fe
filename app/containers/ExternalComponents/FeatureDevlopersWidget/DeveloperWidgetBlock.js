import React from 'react';
import PropTypes from 'prop-types';
import { P, H4 } from 'components';
import { getTimzoneOffest } from 'containers/MyProfilePage/components/utils';
import { Link } from 'react-router-dom';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import SVG from 'react-inlinesvg';
import ToolTip from 'components/ToolTip';
import { logoPlaceholder, countryTimeXZone, professionIcon, industryIcon, starTickIcon } from 'containers/App/constants';
import get from 'lodash/get';
import containerMessages from 'containers/MyProfilePage/messages';
import messages from './messages';
import { DeveloperWidgetCard, DevTypeRating, SkillsBlock, ExpBlock, IndustryBlock, HRLine } from './styles';

const DeveloperWidgetBlock = props => {
  const { developer } = props;
  const timeZoneStr = `${developer.city}, ${developer.country} | ${getTimzoneOffest(countryTimeXZone, 'name', developer.timeZone)}`;
  return (
    <DeveloperWidgetCard>
      <div className="card-widget d-flex justify-content-center">
        <div className="inner-card">
          <div className="logo-icon" key={get(developer, '_id')}>
            {developer.profilePicture ? <img src={developer.profilePicture} alt={developer.firstName} /> : <SVG src={logoPlaceholder} />}
          </div>
          <div className="inner-card-block">
            <H4>
              {get(developer, 'firstName', '-')}
              {get(developer, 'verifiedProfile', true) && (
                <ToolTip
                  wrapperClass="d-inline-flex ms-1 align-text-top"
                  type="other"
                  otherIcon={starTickIcon}
                  placement="right"
                  content={
                    <ul className="m-0 ps-2">
                      <li className="text-start">{containerMessages.interviewedForSkillsAndExpertise.defineMessages}</li>
                      <li className="text-start">{containerMessages.checkedForEducationAndExperiences.defineMessages}</li>
                      <li className="text-start">{containerMessages.verifiedPhotoIDandAddress.defineMessages}</li>
                    </ul>
                  }
                  tooltipId="verifiedProfileToltip"
                />
              )}
              <span className="mr-2">
                <Link to={`/client/talent-profile/${get(developer, '_id')}`} target="_blank">
                  {messages.hireNow.defaultMessage}
                </Link>
              </span>
            </H4>
            {developer.timeZone && (
              <P className="p16 m-0 time-zone" title={timeZoneStr}>
                <HTMLEllipsis unsafeHTML={timeZoneStr} maxLine="1" ellipsis="..." basedOn="letters" />
              </P>
            )}
            <HRLine />
            <DevTypeRating>
              <span className="dev-type">
                <span className="label">{messages.distinguished.defaultMessage}</span>
                <span>
                  <b>{developer.primaryRole}</b>
                </span>
              </span>
              <span className="rating" />
            </DevTypeRating>
            <HRLine />
            <div className="skillsExp">
              {developer.skills.length > 0 && (
                <SkillsBlock>
                  <span className="icon">
                    <SVG width={16} height={16} src={professionIcon} />
                  </span>
                  <ul>
                    {developer.skills.map(skill => (
                      <li key={get(skill, '_id')}>{skill.name}</li>
                    ))}
                  </ul>
                </SkillsBlock>
              )}
              {developer.industries && (
                <IndustryBlock>
                  <p>
                    <span className="icon">
                      <SVG width={16} height={16} src={industryIcon} />
                    </span>
                    {developer.industries
                      .reduce((acc, industry) => {
                        acc.push(industry);
                        return acc;
                      }, [])
                      .join(', ')}
                  </p>
                </IndustryBlock>
              )}
            </div>
            <HRLine />
            <ExpBlock>
              <p className="mb-2">{`${messages.formerlyAt.defaultMessage}:`}</p>
              <ul>
                {developer.workExperience.map(work => (
                  <React.Fragment>
                    <li key={get(work, '_id')}>{work.employer}</li>
                  </React.Fragment>
                ))}
              </ul>
            </ExpBlock>
          </div>
        </div>
      </div>
    </DeveloperWidgetCard>
  );
};

export default DeveloperWidgetBlock;
DeveloperWidgetBlock.defaultProps = {
  developer: {},
};

DeveloperWidgetBlock.propTypes = {
  developer: PropTypes.object,
};
