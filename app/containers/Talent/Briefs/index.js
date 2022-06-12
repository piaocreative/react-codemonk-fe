/* eslint-disable jsx-a11y/no-static-element-interactions */
/** Briefs
 * This is the Projects page for the Talent, at the '/talent/job-briefs' route
 *
 */
import React from 'react';
import { toast } from 'react-toastify';
import { Row, Col } from 'reactstrap';
import { Helmet } from 'react-helmet';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import Content from 'components/Content';
import { PrivateGrid, H3, P, Badge, ToastifyMessage } from 'components';
import StorageService from 'utils/StorageService';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import JobCard from 'components/JobCard';
import { API_URL, JOB_POST, LIST } from 'containers/App/constants';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import { paginationComponent } from 'containers/App/utils';
import containerMessage from 'containers/messages';
import { propTypes, defaultProps } from 'containers/proptypes';
import SearchComponent from 'components/SearchComponent';
import { isNoFilterApplied, showNoRecordFound } from 'containers/Client/Briefs/utils';
import { getFiltersURL, getFiltersValueURL } from './utils';
import BriefFilters from './BriefFilters';
import BriefFiltersOld from './BriefFiltersOld';
import messages from './messages';

export class Briefs extends React.Component {
  constructor(props) {
    super(props);
    const getPageNumber = StorageService.get('talentBriefPage');
    const talentBriefFilter = StorageService.get('talentBriefFilter');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    const storedFilter = JSON.parse(talentBriefFilter) || {};
    const updatedFilter = isEmpty(storedFilter)
      ? {
          teamPrefArray: [],
          workPrefArray: [],
          assignmentsArray: [],
          expertiseArray: [],
          roleArray: [],
          skillsArray: [],
          alreadyAppliedArray: [],
          datePostedArray: [],
        }
      : storedFilter;

    const noFilterApplied = isNoFilterApplied(updatedFilter).value;
    this.state = {
      noFilterApplied,
      pageNum: updatedPageNumber,
      briefData: [],
      filters: updatedFilter,
      search: '',
      totalCount: 0,
      pageSize: 8,
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.loadTalentBrief(pageNum);
  }

  loadTalentBrief = pageNum => {
    StorageService.set('talentBriefPage', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });
    const { filters, search, pageSize } = this.state;

    // getting filters
    let teamPreference = '';
    let workPreference = '';
    let assignments = '';

    // new
    let expertise = '';
    let role = '';
    let skills = '';
    let applied = '';
    let datePosted = '';

    teamPreference += getFiltersURL(get(filters, 'teamPrefArray', []));
    workPreference += getFiltersURL(get(filters, 'workPrefArray', []));
    assignments += getFiltersURL(get(filters, 'assignmentsArray', []));

    // new filters
    expertise += getFiltersURL(get(filters, 'expertiseArray', []));
    role += getFiltersURL(get(filters, 'roleArray', []));
    skills += getFiltersValueURL(get(filters, 'skillsArray', []));
    applied += getFiltersURL(get(filters, 'alreadyAppliedArray', []));
    datePosted += getFiltersURL(get(filters, 'datePostedArray', []));

    const data = { method: 'GET' };
    let requestURL = `${API_URL}${JOB_POST}${LIST}?page=${pageNum}&limit=${pageSize}`;

    requestURL += teamPreference ? `&teamPreference=${teamPreference}` : '';
    requestURL += workPreference ? `&workPreference=${workPreference}` : '';
    requestURL += assignments ? `&assignments=${assignments}` : '';

    // new filters
    requestURL += expertise ? `&expertise=${encodeURIComponent(expertise)}` : '';
    requestURL += role ? `&role=${encodeURIComponent(role)}` : '';
    requestURL += skills ? `&skills=${encodeURIComponent(skills)}` : '';
    requestURL += applied ? `&applied=${encodeURIComponent(applied)}` : '';
    requestURL += datePosted ? `&datePosted=${encodeURIComponent(datePosted)}` : '';

    // search
    requestURL += search ? `&q=${encodeURIComponent(search)}` : '';

    request(requestURL, data)
      .then(this.setTalentBriefs)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTalentBriefs = response => {
    if (get(response, 'status')) {
      const { docs } = response.data;
      this.setState({
        paginationData: get(response, 'data', {}),
        briefData: docs,
        isListLoading: false,
        totalCount: response.data.totalDocs,
      });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleApplyClick = e => {
    e.stopPropagation();
  };

  briefCard = () => {
    const { pageNum, briefData } = this.state;
    return <JobCard jobList={briefData} {...this.props} loadJobBriefs={() => this.loadTalentBrief(pageNum)} userRole="talent" />;
  };

  renderTalentBriefCards = () => {
    const { isListLoading, paginationData, search, noFilterApplied } = this.state;
    let output = '';

    if (isListLoading) {
      output = (
        <BriefCardSkeleton
          cardCount={
            get(paginationData, 'totalDocs') > get(paginationData, 'limit')
              ? get(paginationData, 'limit')
              : get(paginationData, 'totalDocs')
          }
        />
      );
    } else {
      const totalDocs = get(paginationData, 'totalDocs');
      if (totalDocs === 0) {
        output = showNoRecordFound(search, noFilterApplied, 'talent');
      } else if (totalDocs > get(paginationData, 'limit')) {
        output = (
          <React.Fragment>
            {this.briefCard()}
            {paginationComponent(paginationData, get(paginationData, 'limit'), this.loadTalentBrief)}
          </React.Fragment>
        );
      } else {
        output = <React.Fragment>{this.briefCard()}</React.Fragment>;
      }
    }
    return output;
  };

  handleFilterChanged = (filters, noFilterApplied) => {
    this.setState(
      {
        filters,
        noFilterApplied,
      },
      () => {
        this.loadTalentBrief(1);
      },
    );
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  handleSearchChange = value => {
    this.setState({ search: value }, () => {
      this.loadTalentBrief(1);
    });
  };

  render() {
    const { totalCount } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <Row>
              <Col lg={12}>
                <div className="d-flex justify-content-between mb-3">
                  <div className="d-flex align-items-center me-3">
                    <H3>{messages.heading.defaultMessage}</H3>
                    {totalCount !== 0 && (
                      <Badge className="ms-2 primary badge-sm">
                        <P className="p14 mb-0" lineHeight="16">
                          {totalCount}
                        </P>
                      </Badge>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <SearchComponent handleSearchChange={this.debounceFn} placeholder={containerMessage.searchPlaceholder.defaultMessage} />
                    <BriefFiltersOld {...this.props} handleFilterChanged={this.handleFilterChanged} />
                  </div>
                </div>
              </Col>
              <Col lg={3} className="d-none" />
            </Row>
            <Row>
              <Col lg={12}>{this.renderTalentBriefCards()}</Col>
              {/* this is for future use */}
              <Col lg={3} className="d-none">
                <BriefFilters {...this.props} handleFilterChanged={this.handleFilterChanged} />
              </Col>
            </Row>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

Briefs.defaultProps = defaultProps;
Briefs.propTypes = propTypes;

export default Briefs;
