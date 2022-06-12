/** MyProjectDetail **/
import React from 'react';
import { Helmet } from 'react-helmet';
import SVG from 'react-inlinesvg';
import Content from 'components/Content';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { VALIDATION } from 'utils/constants';
import { API_URL, PROJECT_API, VERSION2, backIcon, projectPlaceholderSM, plusIcon } from 'containers/App/constants';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import parse from 'html-react-parser';
import request from 'utils/request';
import { getBadgeClass, redirectTo } from 'containers/App/utils';
import { PrivateGrid, Card, Badge, H3, Button, P } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { defaultProps, propTypes } from 'containers/proptypes';
import { ProjectMainInfo } from 'containers/Client/ProjectDetailPage/styles';
import ProjectDetailTabs from './ProjectDetailTabs';
import messages from './messages';
import { ApplyProjectBtn, StatusContainer, ReadMoreOrLess } from './styles';

export class MyProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = props;
    const projectID = get(params, 'projectID', '');
    this.state = {
      activeTab: '1',
      projectID,
      projectData: {},
    };
  }

  componentDidMount() {
    this.loadTalentProjectDetails();
  }

  loadTalentProjectDetails = () => {
    const data = { method: 'GET' };
    const { projectID } = this.state;
    const requestURL = `${API_URL}${VERSION2}${PROJECT_API}/${projectID}`;
    request(requestURL, data)
      .then(this.setTalentProjectDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTalentProjectDetails = response => {
    if (get(response, 'status')) {
      this.setState({ projectData: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { history } = this.props;
    const { projectID, projectData, activeTab } = this.state;
    const textDescription = get(projectData, 'description', '-').replace(/<[^>]*>?/gm, '');
    const redirectLink =
      history.location && history.location.state && history.location.state.fromDashboard ? `/talent/dashboard` : '/talent/my-projects';
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>

        <Content>
          <PrivateGrid>
            <div className="d-flex align-items-center mb-3">
              <Button className="btn-icon btn-link" onClick={() => redirectTo(history, redirectLink)}>
                <SVG className="auto-svg" height={40} width={40} src={backIcon} />
              </Button>
              <H3 className="ms-3">{messages.title.defaultMessage}</H3>
            </div>
            <Card className="mb-10">
              <ProjectMainInfo className="pl-0 d-flex justify-content-between w-100">
                <div className="d-flex">
                  <SVG src={projectPlaceholderSM} />
                  <div className="mx-3 px-1">
                    <div className="mt-2">
                      <P className="p20 mb-2">{get(projectData, 'name', '')}</P>
                    </div>
                    <StatusContainer className="my-0">
                      {get(projectData, 'status') && (
                        <Badge className={`${getBadgeClass(get(projectData, 'status'))} badge-sm`}>{get(projectData, 'status')}</Badge>
                      )}
                    </StatusContainer>
                  </div>
                </div>
                <ApplyProjectBtn>
                  <Button
                    type="button"
                    className="btn btn-sm btn-outline apply-btn"
                    onClick={() => redirectTo(history, '/talent/my-profile')}
                  >
                    <SVG className="me-2" src={plusIcon} />
                    <span>{messages.addToProfile.defaultMessage}</span>
                  </Button>
                </ApplyProjectBtn>
              </ProjectMainInfo>
              {get(projectData, 'description') && (
                <ReadMoreOrLess className="read-more-less-content">
                  <ShowMoreText
                    lines={3}
                    more="more"
                    less="less"
                    anchorClass="links"
                    onClick={this.executeOnClick}
                    expanded={false}
                    plainText={textDescription}
                  >
                    {parse(get(projectData, 'description'))}
                  </ShowMoreText>
                </ReadMoreOrLess>
              )}
            </Card>
            {!isEmpty(projectData) && (
              <ProjectDetailTabs
                {...this.props}
                projectID={projectID}
                data={projectData}
                activeTab={activeTab}
                loadDetails={this.loadTalentProjectDetails}
              />
            )}
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

MyProjectDetail.defaultProps = defaultProps;
MyProjectDetail.propTypes = propTypes;

export default MyProjectDetail;
