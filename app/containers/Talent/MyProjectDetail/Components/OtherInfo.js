import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { Row, Col } from 'reactstrap';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import get from 'lodash/get';
import { getLabel, getArrayLabels } from 'containers/MyProfilePage/components/utils';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { filesIcon } from 'containers/App/constants';
import { H5, P } from 'components';
import {
  WorkProgress,
  BudgetArray,
  ProjectSpeed,
  ManageTeam,
  uxDesignArray,
  softwareDevArray,
  devTeamArray,
  dataAIAndMlArray,
} from 'containers/StartProjectPage/constants';
import { checkIfWhatAreYouLooking } from 'containers/App/utils';
import { ProjectInfo } from 'containers/MyProfilePage/styles';
import containerMessage from 'containers/messages';
import { OpenRoles } from '../styles';
import messages from '../messages';

const OtherInfo = props => {
  const { projectDetails } = props;
  const lookingFor = get(projectDetails, 'lookingFor', {});
  const [whatAreYouLooking, setWhatAreYouLooking] = useState({});
  const teamManageType = getLabel(get(projectDetails, 'teamManageType', ''), ManageTeam);
  const buildStatus = getLabel(get(projectDetails, 'buildStatus', ''), WorkProgress);
  const speed = getLabel(get(projectDetails, 'speed', ''), ProjectSpeed);
  const budget = getLabel(get(projectDetails, 'budget', ''), BudgetArray);
  const commingSoonHide = teamManageType || buildStatus || speed || budget;

  const setQuoteData = () => {
    const adminUxAndUiDesign = get(projectDetails, 'lookingFor.design', '')
      ? getArrayLabels(get(projectDetails, 'lookingFor.design', ''), uxDesignArray)
      : '';
    const adminSoftwareDevelopment = get(projectDetails, 'lookingFor.softwareDevelopment', '')
      ? getArrayLabels(get(projectDetails, 'lookingFor.softwareDevelopment', ''), softwareDevArray)
      : '';
    const adminDevelopmentTeam = get(projectDetails, 'lookingFor.developmentTeam', '')
      ? getArrayLabels(get(projectDetails, 'lookingFor.developmentTeam', ''), devTeamArray)
      : '';
    const adminDataAiMl = get(projectDetails, 'lookingFor.dataAiMl', '')
      ? getArrayLabels(get(projectDetails, 'lookingFor.dataAiMl', ''), dataAIAndMlArray)
      : '';

    setWhatAreYouLooking({
      uxAndUiDesign: adminUxAndUiDesign,
      softwareDevelopment: adminSoftwareDevelopment,
      developmentTeam: adminDevelopmentTeam,
      dataAiMl: adminDataAiMl,
    });
  };

  useEffect(() => {
    setQuoteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OpenRoles className="mt-3">
      {commingSoonHide || checkIfWhatAreYouLooking(lookingFor) ? (
        <React.Fragment>
          {buildStatus && (
            <React.Fragment>
              <H5 className="mb-2">{messages.howMuchBeenDone.defaultMessage}</H5>
              <div className="read-more-less-content">
                <HTMLEllipsis unsafeHTML={buildStatus} maxLine="5" ellipsis="..." basedOn="letters" />
              </div>
              <hr />
            </React.Fragment>
          )}
          {
            <React.Fragment>
              <H5 className="mb-3">{messages.whatAreYouLooking.defaultMessage}</H5>
              <Row>
                {get(whatAreYouLooking, 'uxAndUiDesign', []).length > 0 && (
                  <Col md={3}>
                    <ProjectInfo className="list-view">
                      <H5 className="mb-2 font-weight-bold">{messages.uxAndUiDesign.defaultMessage}</H5>
                      {get(whatAreYouLooking, 'uxAndUiDesign', []).map(data => (
                        <P className="p16" opacityVal={0.5} key={data}>
                          {data}
                        </P>
                      ))}
                    </ProjectInfo>
                  </Col>
                )}

                {get(whatAreYouLooking, 'softwareDevelopment', []).length > 0 && (
                  <Col md={3}>
                    <ProjectInfo className="list-view">
                      <H5 className="mb-2">{messages.softwareDevelopment.defaultMessage}</H5>
                      {get(whatAreYouLooking, 'softwareDevelopment', []).map(data => (
                        <p className="mb-1" key={data}>
                          {data}
                        </p>
                      ))}
                    </ProjectInfo>
                  </Col>
                )}

                {get(whatAreYouLooking, 'developmentTeam', []).length > 0 && (
                  <Col md={3}>
                    <ProjectInfo className="list-view">
                      <H5 className="mb-2">{messages.developmentTeam.defaultMessage}</H5>
                      {get(whatAreYouLooking, 'developmentTeam', []).map(data => (
                        <p className="mb-1" key={data}>
                          {data}
                        </p>
                      ))}
                    </ProjectInfo>
                  </Col>
                )}
                {get(whatAreYouLooking, 'dataAiMl', []).length > 0 && (
                  <Col md={3}>
                    <ProjectInfo className="list-view">
                      <H5 className="mb-2">{messages.dataAiMl.defaultMessage}</H5>
                      {get(whatAreYouLooking, 'dataAiMl', []).map(data => (
                        <p className="mb-1" key={data}>
                          {data}
                        </p>
                      ))}
                    </ProjectInfo>
                  </Col>
                )}

                {/* growthHacking */}
                {get(projectDetails, 'isGrowthHacking', '') && (
                  <Col md={3}>
                    <ProjectInfo className="list-view">
                      <H5 className="mb-2">{messages.growthHacking.defaultMessage}</H5>
                      <p className="mb-0">{get(projectDetails, 'whatAreYouLooking.growthHacking')}</p>
                    </ProjectInfo>
                  </Col>
                )}
                {get(projectDetails, 'isAgileCoach', '') && (
                  <Col md={3}>
                    <ProjectInfo className="list-view">
                      <H5 className="mb-2">{messages.agielCoaching.defaultMessage}</H5>
                      <p className="mb-0">{get(projectDetails, 'whatAreYouLooking.agielCoaching')}</p>
                    </ProjectInfo>
                  </Col>
                )}
                {get(projectDetails, 'otherRequirement') && (
                  <Col md={3}>
                    <ProjectInfo className="list-view">
                      <H5 className="mb-2">{messages.otherRequirement.defaultMessage}</H5>
                      <p className="mb-0">{get(projectDetails, 'whatAreYouLooking.otherRequirement')}</p>
                    </ProjectInfo>
                  </Col>
                )}
              </Row>
              <hr className="mt-0" />
            </React.Fragment>
          }
          {budget && (
            <React.Fragment>
              <H5 className="mb-2">{messages.whatsYourBudget.defaultMessage}</H5>
              <div className="read-more-less-content">
                <HTMLEllipsis unsafeHTML={budget} maxLine="5" ellipsis="..." basedOn="letters" />
              </div>
              <hr />
            </React.Fragment>
          )}

          {get(projectDetails, 'messageToPreSales') && (
            <React.Fragment>
              <H5 className="mb-2">{messages.anythingElseWeShould.defaultMessage}</H5>
              <div className="read-more-less-content">
                <HTMLEllipsis unsafeHTML={get(projectDetails, 'messageToPreSales', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
              </div>
              <hr />
            </React.Fragment>
          )}

          {speed && (
            <React.Fragment>
              <H5 className="mb-2">{messages.howFast.defaultMessage}</H5>
              <div className="read-more-less-content">
                <HTMLEllipsis unsafeHTML={speed} maxLine="5" ellipsis="..." basedOn="letters" />
              </div>
              <hr />
            </React.Fragment>
          )}

          {teamManageType && (
            <React.Fragment>
              <H5 className="mb-2">{messages.howWouldManageTeam.defaultMessage}</H5>
              <div className="read-more-less-content">
                <HTMLEllipsis unsafeHTML={teamManageType} maxLine="5" ellipsis="..." basedOn="letters" />
              </div>
              <hr />
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <ComingSoonBlock className="mt-3 border-0 mb-0">
          <div className="inner-content">
            <SVG src={filesIcon} />
            <p className="sm my-0">{containerMessage.noOtherInfo.defaultMessage}</p>
          </div>
        </ComingSoonBlock>
      )}
    </OpenRoles>
  );
};

OtherInfo.defaultProps = {
  projectDetails: {},
};

OtherInfo.propTypes = {
  projectDetails: PropTypes.object,
};

export default OtherInfo;
