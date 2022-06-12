/*
 * ProjectCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import SVG from 'react-inlinesvg';
import TeamImgList from 'components/TeamImgList';
import { getBadgeClass, redirectTo } from 'containers/App/utils';
import { projectPlaceholderSM, plusIcon } from 'containers/App/constants';
import { Badge, P, Button } from 'components';
import { ProjectCardLink, CardBlock } from './styles';
import messages from './messages';
function ProjectCard(props) {
  const { projectList = [], fromDashboard = false, isClient, history } = props;
  const baseCardLink = isClient ? `/client/project-detail` : `/talent/project-detail`;

  const btnDisabled = status => {
    if (['On Hold', 'Suspended', 'Closed'].indexOf(status) !== -1) {
      return true;
    }
    return false;
  };

  return (
    <Row>
      {projectList.map(obj => (
        <Col xl="4" lg="6">
          <ProjectCardLink
            to={{
              // eslint-disable-next-line no-underscore-dangle
              pathname: `${baseCardLink}/${obj._id}`,
              state: { fromDashboard },
            }}
          >
            <CardBlock>
              {get(obj, 'logo') ? (
                <div className="icon-container has-profile-img">
                  <img src={`${get(obj, 'logo')}?_t=${new Date().getTime()}`} className="img-fluid" alt={get(obj, 'name')} />
                </div>
              ) : (
                <div className="icon-container">
                  <SVG src={projectPlaceholderSM} />
                </div>
              )}
              <Badge className={`${getBadgeClass(obj.status)} badge-sm mb-0`}>{get(obj, 'status')}</Badge>
              <P className="p20 user-title">
                <HTMLEllipsis unsafeHTML={get(obj, 'name', '-')} maxLine="1" ellipsis="..." basedOn="letters" />
              </P>
              <P className="p16" lineHeight="22" opacityVal="0.5">
                <HTMLEllipsis unsafeHTML={get(obj, 'description', '-')} maxLine="2" ellipsis="..." basedOn="letters" />
              </P>
              <div className="d-flex justify-content-between">
                <TeamImgList data={get(obj, 'talentsDetails')} displayImgCount={isClient ? 6 : 4} />
                {isClient && (
                  <Button
                    type="button"
                    className={`btn btn-sm btn-outline btn-plus ms-md-3 top-0 ${btnDisabled(obj.status) ? 'opacity-50' : ''}`}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!btnDisabled(obj.status)) {
                        redirectTo(history, '/client/talent-listing');
                      }
                    }}
                  >
                    <SVG className="me-2" src={plusIcon} />
                    <span>
                      <FormattedMessage {...messages.btnHireTalentTitle} />
                    </span>
                  </Button>
                )}
              </div>
            </CardBlock>
          </ProjectCardLink>
        </Col>
      ))}
    </Row>
  );
}

ProjectCard.defaultProps = {
  projectList: [],
  fromDashboard: false,
  isClient: false,
  history: {},
};

ProjectCard.propTypes = {
  projectList: PropTypes.array,
  fromDashboard: PropTypes.bool,
  isClient: PropTypes.bool,
  history: PropTypes.any,
};

export default ProjectCard;
