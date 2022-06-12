/* eslint-disable import/no-named-as-default-member */
/** Projects
 * This is the Projects page for the client, at the '/client/projects' route
 */
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Row, Col, CardBody, CardTitle } from 'reactstrap';
import CountUp from 'react-countup';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { reduxForm, Field } from 'redux-form/immutable';
import get from 'lodash/get';
import Content from 'components/Content';
import SVG from 'react-inlinesvg';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import { API_URL, CLIENT, PROJECTS, filesIcon, teamPreferenceArray } from 'containers/App/constants';
import request from 'utils/request';
import Selects from 'components/Selects';
import containerMessage from 'containers/messages';
import { Card, H3, H6, Badge, Button, PrivateGrid, FormLabel, P } from 'components';
import { LeftCol, RightCol, DBcontainer } from 'containers/Talent/Dashboard/styles';
import { CardProgressComponent } from 'containers/Talent/MyProjects/utils';
import { SortSection } from 'containers/Talent/MyProjects/styles';
import SortComponent from 'components/SortComponent';
import ToastifyMessage from 'components/ToastifyMessage';
import { projectSortArray } from 'containers/TalentListingPage/constants';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { ComingSoonBlock } from 'components/ComingSoon/styles';
import ProjectCard from 'components/ProjectCard';
import { paginationComponent } from 'containers/App/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import * as actions from 'containers/Admin/Projects/actions';
import * as selectors from 'containers/Admin/Projects/selectors';
import { projectStatusArray } from 'containers/constants';
import { key } from 'containers/Admin/Projects/constants';
import { DEFAULT_PAGE_SIZE } from 'containers/Talent/MyProjects/constants';
import saga from 'containers/Admin/Projects/saga';
import talentMessages from 'containers/Talent/MyProjects/messages';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export class Projects extends React.Component {
  constructor(props) {
    super(props);
    const projectStatus = StorageService.get('clientProjectStatus');
    const updatedProjectStatus = JSON.parse(projectStatus) || { label: 'All', value: -1 };
    const getPageNumber = StorageService.get('clientProjectPageNumber');
    const projectSort = StorageService.get('clientProjectSort');

    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    this.state = {
      projectList: [],
      paginationData: [],
      pageNum: updatedPageNumber,
      projectStatus: updatedProjectStatus,
      currentSort: projectSort ? projectSortArray.find(item => projectSort.indexOf(item.value) > -1) : projectSortArray[0],
    };
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga } = this.props;
    const { pageNum } = this.state;
    if (prevProps.popUpSaga === true && popUpSaga === false) {
      this.loadProjects(pageNum);
    }
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.loadProjects(pageNum);
  }

  loadProjects = pageNum => {
    StorageService.set('clientProjectPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });
    const { projectStatus } = this.state;
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${PROJECTS}?page=${pageNum}&status=${projectStatus.value}&limit=${DEFAULT_PAGE_SIZE}`;
    request(requestURL, data)
      .then(this.setProjectDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setProjectDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;
      this.setState({ projectList: get(data, 'docs', []), paginationData: get(response, 'data', {}), isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangeStatus = e => {
    StorageService.set('clientProjectStatus', JSON.stringify(e));
    this.setState({ projectStatus: e }, () => {
      this.loadProjects(1);
    });
  };

  handleChangeFilter = e => {
    if (!e) {
      e = { label: 'All', value: -1 };
    }
    StorageService.set('talentProjectFilter', JSON.stringify(e));
    this.setState({ projectStatus: e }, () => {
      this.loadProjects(1);
    });
  };

  handleSortChange = e => {
    StorageService.set('clientProjectSort', JSON.stringify(e.value));
    this.setState({ currentSort: e }, () => {
      this.loadProjects(1);
    });
  };

  render() {
    const { projectStatus, projectList, paginationData, isListLoading, currentSort } = this.state;
    const { history } = this.props;
    const totalDocs = get(paginationData, 'totalDocs', 0);

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <DBcontainer>
              <LeftCol>
                <Row className="mb-3">
                  <Col lg={6} md={12} className="mr-0 d-flex">
                    <H3>{talentMessages.allProjects.defaultMessage}</H3>
                    {totalDocs !== 0 && (
                      <Badge className="ms-2 primary badge-sm">
                        <P className="p14 mb-0" lineHeight="20">
                          <CountUp duration={1} end={totalDocs} />
                        </P>
                      </Badge>
                    )}
                  </Col>
                  <Col lg={6} md={12}>
                    <SortSection>
                      <div className="sort-label">
                        <H6 lineHeight="21">{containerMessage.sortBy.defaultMessage}:</H6>
                      </div>
                      <SortComponent
                        sortArray={projectSortArray}
                        showSortIcon
                        currentSort={currentSort}
                        handleSortChange={this.handleSortChange}
                      />
                    </SortSection>
                  </Col>
                </Row>
                {isListLoading || projectList.length > 0 ? (
                  <Fragment>
                    {isListLoading ? <CardProgressComponent /> : <ProjectCard projectList={projectList} history={history} isClient />}
                    {paginationData.totalDocs > DEFAULT_PAGE_SIZE &&
                      paginationComponent(paginationData, DEFAULT_PAGE_SIZE, this.loadProjects)}
                  </Fragment>
                ) : (
                  <ComingSoonBlock className="coming-soon-block">
                    <div className="inner-content">
                      <SVG src={filesIcon} />
                      <H3 className="mt-0">{talentMessages.emptyStateHeader.defaultMessage}</H3>
                      <P className="sm mb-0">{talentMessages.emptyStateContent.defaultMessage}</P>
                    </div>
                  </ComingSoonBlock>
                )}
              </LeftCol>
              <RightCol>
                <Card className="filter-card pt-3">
                  <CardBody className="p-0">
                    <div className="filter-card-body mb-4 d-flex justify-content-between">
                      <CardTitle tag="h5" className="card-title">
                        {talentMessages.filters.defaultMessage}
                      </CardTitle>
                      <Button type="button" className="btn btn-link" onClick={() => this.handleChangeFilter(null)}>
                        {talentMessages.clearAll.defaultMessage}
                      </Button>
                    </div>
                    <FormLabel tag="h6">{talentMessages.projectStatus.defaultMessage}</FormLabel>
                    <Field
                      name="status"
                      type="text"
                      component={Selects}
                      defaultValue={projectStatus}
                      searchable={false}
                      options={projectStatusArray.map(item => ({
                        label: `${item.label}`,
                        value: item.value,
                      }))}
                      onChange={e => this.handleChangeFilter(e)}
                    />
                    <FormLabel className="d-none" tag="h6">
                      {messages.team.defaultMessage}
                    </FormLabel>
                    <Field
                      className="d-none"
                      name="status"
                      type="text"
                      component={Selects}
                      defaultValue={projectStatus}
                      searchable={false}
                      options={teamPreferenceArray.map(item => ({
                        label: `${item.label}`,
                        value: item.value,
                      }))}
                      onChange={e => this.handleChangeFilter(e)}
                    />
                    <Button type="button" className="btn btn-outline btn-sm w-100 d-none">
                      {talentMessages.updateResult.defaultMessage}
                    </Button>
                  </CardBody>
                </Card>
              </RightCol>
            </DBcontainer>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

Projects.defaultProps = defaultProps;
Projects.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  clientName: selectors.clientName,
  companyName: selectors.companyName,
  projectName: selectors.projectName,
  projectSummary: selectors.projectSummary,
  startDate: selectors.startDate,
  endDate: selectors.endDate,
  status: selectors.status,
  teamPreference: selectors.teamPreference,

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitAddProjectForm: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.addProject(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key, saga });

export default compose(
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(Projects);
