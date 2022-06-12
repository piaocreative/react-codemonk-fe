/** AgencyProjectDetail **/
import React from 'react';
import { Helmet } from 'react-helmet';
import Content from 'components/Content';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { VALIDATION } from 'utils/constants';
import { API_URL, PROJECT_API } from 'containers/App/constants';
import { CardHeader, CardBody, BackLink } from 'containers/MyProfilePage/styles';
import request from 'utils/request';
import { getBadgeClass, redirectTo, showMoreDiv } from 'containers/App/utils';
import { PrivateGrid, Card, H4, Badge } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import containerMessage from 'containers/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import ProjectDetailTabs from './ProjectDetailTabs';
import messages from './messages';

export class AgencyProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
      location,
    } = props;
    const projectID = get(params, 'projectID', '');
    const activeTab = get(location, 'tab', '1');
    this.state = {
      projectID,
      projectData: {},
      activeTab,
    };
  }

  componentDidMount() {
    this.loadAgencyProjectDetails();
  }

  loadAgencyProjectDetails = () => {
    const data = { method: 'GET' };
    const { projectID } = this.state;
    const requestURL = `${API_URL}${PROJECT_API}/${projectID}`;
    request(requestURL, data)
      .then(this.setAgencyProjectDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAgencyProjectDetails = response => {
    if (get(response, 'status')) {
      this.setState({ projectData: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  cardBody = (projectData, textDescription) => (
    <CardBody>
      <p className="title opacity-100 list-view-title">{containerMessage.labelDescription.defaultMessage}</p>
      {get(projectData, 'description') && showMoreDiv(get(projectData, 'description', ''), textDescription)}
    </CardBody>
  );

  cardHeader = projectData => (
    <CardHeader>
      <div className="d-flex align-items-center">
        <H4 className="m-0">{projectData.name}</H4>
        {get(projectData, 'status') && (
          <Badge className={`${getBadgeClass(get(projectData, 'status'))} ms-3`}>{get(projectData, 'status')}</Badge>
        )}
      </div>
    </CardHeader>
  );

  render() {
    const { history } = this.props;
    const { activeTab, projectData, projectID } = this.state;
    const textDescription = get(projectData, 'description', '-').replace(/<[^>]*>?/gm, '');
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>

        <Content>
          <PrivateGrid>
            <BackLink onClick={() => redirectTo(history, '/agency/agency-projects')}>
              {containerMessage.backToProject.defaultMessage}
            </BackLink>

            <Card>
              {this.cardHeader(projectData)}
              {this.cardBody(projectData, textDescription)}
            </Card>
            {!isEmpty(projectData) && (
              <ProjectDetailTabs {...this.props} projectID={projectID} projectData={projectData} activeTab={activeTab} />
            )}
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

AgencyProjectDetail.defaultProps = defaultProps;
AgencyProjectDetail.propTypes = propTypes;

export default AgencyProjectDetail;
