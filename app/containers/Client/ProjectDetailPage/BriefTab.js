/** Team Tab Page
 */
import React from 'react';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import parse from 'html-react-parser';
import StorageService from 'utils/StorageService';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'containers/constants';
import { getPageData, paginationComponent, redirectToType } from 'containers/App/utils';
import { filesIcon } from 'containers/App/constants';
import AddBrief from 'containers/Client/AddBrief';
import { Card, Button } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import { BriefList } from './styles';

export class BriefTab extends React.Component {
  constructor(props) {
    super(props);
    const totalDocs = get(props, 'data', []);
    const getBriefListPageNo = StorageService.get('adminProjectDetailsBriefPageNumber');
    const briefListPageNo = JSON.parse(getBriefListPageNo) || DEFAULT_PAGE_NO;
    this.state = {
      briefList: [],
      paginationData: { totalDocs: totalDocs.length, page: briefListPageNo, limit: DEFAULT_PAGE_SIZE },
      pageNum: briefListPageNo,
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.setBriefDetails(pageNum);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setBriefDetails(1);
    }
  }

  setBriefDetails = pageNum => {
    StorageService.set('adminProjectDetailsBriefPageNumber', JSON.stringify(pageNum));
    this.setState({ pageNum });
    const paginationData = { totalDocs: get(this.props, 'data', []).length, page: DEFAULT_PAGE_NO, limit: DEFAULT_PAGE_SIZE };
    const pageData = getPageData(get(this.props, 'data', []), pageNum, DEFAULT_PAGE_SIZE);
    this.setState({ briefList: pageData, paginationData });
  };

  briefCard = (data, index) => {
    const { isAdmin, projectID, loadProjectDetails, projectData } = this.props;
    const plainText = get(data, 'description', '').replace(/<[^>]*>?/gm, '');
    const extra = { projectId: projectID, tab: '3' };
    const briefRedirect = isAdmin ? `/admin/brief-detail/${get(data, '_id')}` : `/client/brief-detail/${get(data, '_id')}`;
    const briefDetailType = isAdmin ? 'adminProjectDetails' : 'clientProjectDetails';

    const skills = [];
    get(data, 'skills', []).forEach(skill => skills.push({ label: skill, value: skill }));

    const briefData = {
      ...data,
      briefID: get(data, '_id', ''),
      isProjectDetails: true,
      projectName: get(projectData, 'name', '') ? { label: get(projectData, 'name', ''), value: get(projectData, 'name', '') } : '',
      projectDescription: get(projectData, 'description', ''),
      title: get(data, 'name', ''),
      role: get(data, 'role', '') ? { label: get(data, 'role', ''), value: get(data, 'role', '') } : '',
      description: get(data, 'description', ''),
      expertiseLevel: get(data, 'expertise', '') ? { label: get(data, 'expertise', ''), value: get(data, 'expertise', '') } : '',
      duration: get(data, 'duration', ''),
      skills,

      workPreference: get(data, 'workPreference', []),
      teamPreference: get(data, 'teamPreference', []),
      assignments: get(data, 'assignments', []),
    };

    return (
      <BriefList className="d-flex justify-content-between" key={index}>
        <div>
          <Button type="button" className="btn-link" onClick={() => redirectToType(briefRedirect, briefDetailType, extra)}>
            {get(data, 'name')}
          </Button>
          <div className="read-more-less-content mb-0">
            <ShowMoreText
              lines={5}
              more="more"
              less=""
              anchorClass="links"
              onClick={this.executeOnClick}
              expanded={false}
              plainText={plainText}
            >
              {parse(get(data, 'description'))}
            </ShowMoreText>
          </div>
        </div>
        <div>
          <AddBrief
            type="edit"
            btnClassName="btn btn-sm btn-plus ms-md-3 new-btn-theme"
            isAdmin={isAdmin}
            loadDetails={loadProjectDetails}
            projectDetailPage
            {...briefData}
          />
        </div>
      </BriefList>
    );
  };

  render() {
    const { briefList, paginationData, pageNum } = this.state;
    return (
      <React.Fragment>
        {briefList.length > 0 ? (
          <React.Fragment>
            <Card className="mb-0 border-0 px-0">{briefList.map((brief, index) => this.briefCard(brief, index))}</Card>
            {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.setBriefDetails, pageNum)}
          </React.Fragment>
        ) : (
          <ComingSoonBlock className="mt-0 border-0 mb-0">
            <div className="inner-content">
              <SVG src={filesIcon} />
              <p className="sm my-0">{containerMessage.noBrief.defaultMessage}</p>
            </div>
          </ComingSoonBlock>
        )}
      </React.Fragment>
    );
  }
}

BriefTab.defaultProps = defaultProps;
BriefTab.propTypes = propTypes;

export default BriefTab;
