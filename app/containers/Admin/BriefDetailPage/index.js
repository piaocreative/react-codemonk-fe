/** BriefDetailPage
 * This is the Projects page for the Talent, at the '/talent/brief-detail' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import DataTable from 'react-data-table-component';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import parse from 'html-react-parser';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import {
  API_URL,
  JOB_POST,
  watchIcon,
  professionIcon,
  expertIcon,
  calendarIcon,
  yearsOfExperienceArray,
  currencyData,
  customStyles,
} from 'containers/App/constants';
import StorageService from 'utils/StorageService';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'containers/constants';
import { PrivateGrid, H4, Card, ToastifyMessage, Button } from 'components';
import { redirectBack, talentProfileRedirect, paginationComponent, getPageData } from 'containers/App/utils';
import { getLabel, getArrayLabels, getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import { assignmentArray, teamPreferenceArray } from 'containers/TalentListingPage/constants';
import { projectPreference } from 'containers/Talent/Briefs/constants';
import { ProfileContent, CardHeader, CardBody, PreferencesList, BackLink } from 'containers/MyProfilePage/styles';
import { defaultProps, propTypes } from 'containers/proptypes';
import talentBriefMessage from 'containers/Talent/BriefsDetail/messages';
import messages from './messages';
import { adminBriefTalentListingColumns } from './constants';

export class BriefDetailPage extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
      location,
    } = props;
    const briefID = get(params, 'briefID', '');
    const getProjectID = get(location, 'extra.projectId');
    let projectId = '';
    if (getProjectID) {
      StorageService.set('adminBriefDetailID', getProjectID);
      projectId = getProjectID;
    } else {
      projectId = StorageService.get('adminBriefDetailID');
    }
    this.state = {
      briefID,
      isListLoading: false,
      pageNum: DEFAULT_PAGE_NO,
      talentsDetails: [],
      talentList: [],
      projectId,
    };
  }

  componentDidMount() {
    this.loadBriefData();
  }

  loadBriefData = () => {
    const { briefID } = this.state;
    this.setState({ isListLoading: true });
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${JOB_POST}/${briefID}`;

    request(requestURL, data)
      .then(this.setBriefData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setBriefData = response => {
    if (get(response, 'status')) {
      const { pageNum } = this.state;
      const { data } = response;

      const id = get(data, '_id');

      let skills = '';
      let workPreference = '';
      let teamPreference = '';
      let assignments = '';

      const briefSkillsArray = get(data, 'skills', '');
      skills += briefSkillsArray.map(selected => ` ${selected}`);

      const skillsWorkPreferenceArray = getArrayLabels(get(data, 'workPreference', ''), projectPreference);
      workPreference += skillsWorkPreferenceArray.map(selected => ` ${selected}`);

      const skillsTeamPrefArray = getArrayLabels(get(data, 'teamPreference', ''), teamPreferenceArray);
      teamPreference += skillsTeamPrefArray.map(selected => ` ${selected}`);

      const skillsAssignmentsArray = getArrayLabels(get(data, 'assignments', ''), assignmentArray);
      assignments += skillsAssignmentsArray.map(selected => ` ${selected}`);

      const skillsExpertise = getLabel(get(data, 'expertise', ''), yearsOfExperienceArray, 'name');
      const skillsDurationData = get(data, 'duration', '');
      const duration = skillsDurationData > 1 ? `${skillsDurationData} Months` : `${skillsDurationData} Month`;

      const briefData = {
        id,
        name: get(data, 'name', ''),
        description: get(data, 'description', ''),
        isApplied: get(data, 'isApplied'),
        skills,
        workPreference,
        teamPreference,
        assignments,
        expertise: skillsExpertise,
        duration,
      };

      this.setState({ isListLoading: false, briefData, talentsDetails: get(response, 'data.talentDetails', []) });

      if (get(response, 'data.talentDetails')) {
        this.setTalentData(pageNum);
      }
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setTalentData = pageNum => {
    const { history } = this.props;
    const { briefID, talentsDetails } = this.state;
    const paginationData = { totalDocs: talentsDetails.length, page: DEFAULT_PAGE_NO, limit: DEFAULT_PAGE_SIZE };
    this.setState({ pageNum, paginationData });
    const talentData = getPageData(talentsDetails, pageNum, DEFAULT_PAGE_SIZE);
    const extra = { briefId: briefID };
    const array = [];
    talentData.forEach(talent => {
      const talentId = get(talent, 'talentId');
      const id = get(talent, '_id');
      const name = (
        <Button
          type="button"
          className="btn-link"
          onClick={() => talentProfileRedirect(history, '/admin/talent-profile/', talentId, 'adminBriefDetails', extra)}
        >
          {get(talent, 'name')}
        </Button>
      );
      const role = get(talent, 'primaryRole');
      const currencySymbol = getCurrencySymbol(currencyData, 'code', get(talent, 'currency'));
      const rate = `${currencySymbol || ''}${get(talent, 'ratePerHour')}`;
      array.push({
        id,
        name,
        role,
        rate,
      });
    });
    this.setState({ talentList: array });
  };

  renderTalentList = (isListLoading, paginationData, talentList, pageNum) => (
    <React.Fragment>
      {!isListLoading && (
        <React.Fragment>
          <DataTable
            noHeader
            columns={adminBriefTalentListingColumns}
            customStyles={customStyles}
            data={talentList}
            totalRows={0}
            direction="ltr"
            paginationComponentOptions={{ noRowsPerPage: true }}
            overflowY
            overflowYOffset="80px"
            noDataComponent={<p className="p-4 m-0">{messages.noTalent.defaultMessage}</p>}
          />

          {paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.setTalentData, pageNum)}
        </React.Fragment>
      )}
    </React.Fragment>
  );

  renderCardBody = (textDescription, briefData) => (
    <CardBody>
      <p className="title opacity-100 list-view-title">{talentBriefMessage.description.defaultMessage}</p>
      <div className="read-more-less-content">
        {get(briefData, 'description') && (
          <ShowMoreText
            lines={5}
            more="more"
            less=""
            anchorClass="links"
            onClick={this.executeOnClick}
            expanded={false}
            plainText={textDescription}
          >
            {parse(get(briefData, 'description'))}
          </ShowMoreText>
        )}
      </div>
      <hr />
      <PreferencesList className="inline-list">
        <li>
          <img src={professionIcon} alt="team" />
          <div>
            <p className="mb-1">{get(briefData, 'skills')} </p>
          </div>
        </li>
        <li>
          <img src={watchIcon} alt="team" />
          <div>
            <p className="mb-1">{get(briefData, 'workPreference')}</p>
          </div>
        </li>
        <li>
          <img src={expertIcon} alt="team" />
          <div>
            <p className="mb-1">{get(briefData, 'expertise')}</p>
          </div>
        </li>
        <li>
          <img src={calendarIcon} alt="Assignment" />
          <div>
            <p className="mb-1">{get(briefData, 'duration')}</p>
          </div>
        </li>
      </PreferencesList>
    </CardBody>
  );

  render() {
    const { history } = this.props;
    const { projectId, pageNum, briefData, paginationData, talentList, isListLoading } = this.state;
    const textDescription = get(briefData, 'description', '-').replace(/<[^>]*>?/gm, '');
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ProfileContent>
          <PrivateGrid>
            <BackLink onClick={() => redirectBack(history, `/admin/project-detail/${projectId}`, '2')}>
              {talentBriefMessage.btnBackToBriefs.defaultMessage}
            </BackLink>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <div className="d-flex align-items-start">
                  <H4 className="m-0">{get(briefData, 'name')}</H4>
                </div>
              </CardHeader>
              {this.renderCardBody(textDescription, briefData)}
            </Card>
            {this.renderTalentList(isListLoading, paginationData, talentList, pageNum)}
          </PrivateGrid>
        </ProfileContent>
      </React.Fragment>
    );
  }
}

BriefDetailPage.defaultProps = defaultProps;
BriefDetailPage.propTypes = propTypes;

export default BriefDetailPage;
