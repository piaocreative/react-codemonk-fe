/** ProjectDetailPage **/
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm, change, untouch } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { compose } from 'redux';
import Content from 'components/Content';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { VALIDATION } from 'utils/constants';
import ShowMoreText from 'components/ShowMore/ShowMoreText';
import parse from 'html-react-parser';
import SVG from 'react-inlinesvg';
import { API_URL, PROJECT_API, VERSION2, editNoteIcon, backIcon, projectPlaceholderSM } from 'containers/App/constants';
import { ActionIcon, ProjectInfo } from 'containers/MyProfilePage/styles';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { getBadgeClass, redirectTo } from 'containers/App/utils';
import { PrivateGrid, Card, H3, Badge, Button, P, H5 } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import EditProject from 'containers/Client/ProjectDetailPage/EditProject';
import injectSaga from 'utils/injectSaga';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { StatusContainer, ReadMoreOrLess } from 'containers/Talent/MyProjectDetail/styles';
import ProjectDetailsTab from './ProjectDetailsTab';
import { key } from './constants';
import messages from './messages';
import * as selectors from './selectors';
import saga from './saga';
import * as actions from './actions';
import AddTalent from './AddTalent';
import { ProjectMainInfo } from './styles';

export class ProjectDetailPage extends React.Component {
  constructor(props) {
    super(props);
    const {
      location,
      match: { params },
    } = props;

    const userRole = StorageService.get('userType');
    const isAdmin = userRole === '4';
    const projectID = get(params, 'projectID', '');
    const activeTab = get(location, 'tab', '1');
    this.state = {
      isAdmin,
      adminShowEditModal: false,
      projectID,
      list: {},
      talentsDetails: [],
      showAddTalentModal: false,
      activeTab,
    };
  }

  componentDidMount() {
    this.loadProjectDetails();
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false) {
      this.setState({ showAddTalentModal: false });
      this.loadProjectDetails();
    }
  }

  loadProjectDetails = () => {
    const data = { method: 'GET' };
    const { projectID } = this.state;
    const requestURL = `${API_URL}${VERSION2}${PROJECT_API}/${projectID}`;
    request(requestURL, data)
      .then(this.setProjectDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setProjectDetails = response => {
    if (get(response, 'status')) {
      this.setState({
        list: get(response, 'data', {}),
        talentsDetails: get(response, 'data.talentsDetails', []),
      });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleAddTalentOpenModal = () => {
    const { dispatch } = this.props;
    const data = {
      talentName: '',
      startDate: '',
      endDate: '',
    };
    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });

    this.setState({ showAddTalentModal: true });
  };

  handleAddTalentCloseModal = () => {
    const { dispatch } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showAddTalentModal: false });
  };

  popupSubmit = e => {
    const { talentName, startDate: propStartDate, endDate: propEndDate, onSubmitAddTalentForm } = this.props;
    const { projectID: projectId } = this.state;
    const talentId = get(talentName, 'value');
    const startDate = moment(propStartDate).format('DD/MM/YYYY');
    const endDate = moment(propEndDate).format('DD/MM/YYYY');
    const data = {
      projectId,
      talentId,
      startDate,
      endDate,
    };
    onSubmitAddTalentForm(e, data);
  };

  editProjectDetailsModalOpen = () => {
    const { dispatch } = this.props;
    const { list } = this.state;
    const projectDescription = EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(get(list, 'description', ''))),
    );
    const data = {
      projectName: get(list, 'name', ''),
      projectDescription,
      startDate: get(list, 'startDate', '') ? moment(get(list, 'startDate', '')).toDate() : '',
      endDate: get(list, 'endDate', '') ? moment(get(list, 'endDate', '')).toDate() : '',
      clientName: {
        label: get(list, 'clientName', ''),
        value: get(list, 'clientId', ''),
      },
    };
    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });

    this.setState({ adminShowEditModal: true });
  };

  editProjectDetailsModalClose = () => {
    const { dispatch } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ adminShowEditModal: false });
  };

  editProjectDetailsModalSubmit = e => {
    const { projectName, projectDescription, onSumitEditProjectDetails, startDate, endDate, clientName } = this.props;
    const { projectID: projectId } = this.state;

    const description = draftToHtml(convertToRaw(projectDescription.getCurrentContent()));
    const startFormatDate = moment(startDate).format('DD/MM/YYYY');
    const endFormatDate = moment(endDate).format('DD/MM/YYYY');
    const data = {
      projectId,
      clientId: clientName.value,
      name: projectName,
      description,
      startDate: startFormatDate,
      endDate: endFormatDate,
    };
    onSumitEditProjectDetails(e, data, this.editProjectDetailsSuccess);
  };

  editProjectDetailsSuccess = () => {
    this.loadProjectDetails();
    this.setState({ adminShowEditModal: false });
  };

  quoteModalSubmit = (evt, type, data) => {
    const { onSubmitQuoteForm } = this.props;
    onSubmitQuoteForm(evt, type, data, this.quoteModalSuccess);
  };

  quoteModalSuccess = () => {
    this.loadProjectDetails();
  };

  render() {
    const { history, handleSubmit, loading: loadingAction, responseSuccess, responseError, invalid } = this.props;
    const { isAdmin, projectID, activeTab, talentsDetails, adminShowEditModal, showAddTalentModal, list } = this.state;

    const backToProjects = isAdmin ? '/admin/projects' : '/client/projects';
    const plainTextDescription = get(list, 'description', '-').replace(/<[^>]*>?/gm, '');

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <Row>
              <Col lg={9} className="d-flex align-items-center mb-3">
                <Button className="btn-icon btn-link" onClick={() => redirectTo(history, backToProjects)}>
                  <SVG className="auto-svg" height={40} width={40} src={backIcon} />
                </Button>
                <H3 className="ms-3">{messages.title.defaultMessage}</H3>
              </Col>
              <Col lg={3} />
            </Row>
            <Row>
              <Col lg={9}>
                <Card className="mb-10">
                  <ProjectMainInfo className="pl-0 d-flex justify-content-between w-100">
                    <div className="d-flex">
                      <SVG src={projectPlaceholderSM} />
                      <div className="mx-3 px-1">
                        <div className="mt-2">
                          <P className="p20 mb-2">{get(list, 'name', '')}</P>
                        </div>
                        <StatusContainer className="my-0">
                          {get(list, 'status') && (
                            <Badge className={`${getBadgeClass(get(list, 'status'))} badge-sm`}>{get(list, 'status')}</Badge>
                          )}
                        </StatusContainer>
                      </div>
                    </div>
                    <ActionIcon type="button" onClick={this.editProjectDetailsModalOpen}>
                      <SVG src={editNoteIcon} />
                    </ActionIcon>
                  </ProjectMainInfo>
                  {get(list, 'description') && (
                    <ReadMoreOrLess className="read-more-less-content">
                      <ShowMoreText
                        lines={3}
                        more="more"
                        less="less"
                        anchorClass="links"
                        onClick={this.executeOnClick}
                        expanded={false}
                        plainText={plainTextDescription}
                      >
                        {parse(get(list, 'description'))}
                      </ShowMoreText>
                    </ReadMoreOrLess>
                  )}
                  <div>
                    {isAdmin && (
                      <ProjectInfo className="mb-0">
                        <Row>
                          <Col md={6} className=" mb-4">
                            <H5 className="mb-2">{containerMessage.labelClientName.defaultMessage}</H5>
                            <P className="p16" opacityVal={0.5}>
                              {list.clientName}
                            </P>
                          </Col>
                          <Col md={6} className=" mb-4">
                            <H5 className="mb-2">{containerMessage.labelClientEmail.defaultMessage}</H5>
                            <P className="p16" opacityVal={0.5}>
                              {list.clientEmail}
                            </P>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} className="mb-4 mb-md-0">
                            <H5 className="mb-2">{messages.labelStartDate.defaultMessage}</H5>
                            <P className="p16" opacityVal={0.5}>
                              {list.startDate ? moment(list.startDate).format('DD/MM/YYYY') : '-'}
                            </P>
                          </Col>
                          <Col md={6}>
                            <H5 className="mb-2">{messages.labelEndDate.defaultMessage}</H5>
                            <P className="p16" opacityVal={0.5}>
                              {list.startDate ? moment(list.endDate).format('DD/MM/YYYY') : '-'}
                            </P>
                          </Col>
                        </Row>
                      </ProjectInfo>
                    )}
                  </div>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col lg={9}>
                {!isEmpty(list) && (
                  <ProjectDetailsTab
                    {...this.props}
                    projectData={list}
                    activeTab={activeTab}
                    projectID={projectID}
                    loadProjectDetails={this.loadProjectDetails}
                    talentsDetails={talentsDetails}
                    handleAddTalentOpenModal={this.handleAddTalentOpenModal}
                    quoteModalSubmit={this.quoteModalSubmit}
                    isAdmin={isAdmin}
                  />
                )}
              </Col>
            </Row>
          </PrivateGrid>
        </Content>
        <PopupWrapper
          loading={loadingAction}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showAddTalentModal}
          modalType="add"
          onDiscard={this.handleAddTalentCloseModal}
          onHandleSubmit={handleSubmit(this.popupSubmit)}
          title={messages.modalAddTalentHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <AddTalent {...this.props} list={list} />
          </form>
        </PopupWrapper>
        <PopupWrapper
          loading={loadingAction}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={adminShowEditModal}
          modalType="edit"
          onDiscard={this.editProjectDetailsModalClose}
          onHandleSubmit={handleSubmit(this.editProjectDetailsModalSubmit)}
          title={containerMessage.modalEditProject.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <EditProject {...this.props} isAdmin={isAdmin} />
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }
}

ProjectDetailPage.defaultProps = defaultProps;
ProjectDetailPage.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  projectName: selectors.projectName,
  projectDescription: selectors.projectDescription,
  clientName: selectors.clientName,

  talentName: selectors.talentName,
  startDate: selectors.startDate,
  endDate: selectors.endDate,

  // quoteTab
  quoteTitle: selectors.quoteTitle,
  quoteDescription: selectors.quoteDescription,

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeStatus: (data, onSuccess) => dispatch(actions.changeStatus(data, onSuccess)),

    onSumitEditProjectDetails: (evt, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.editProjectDetails(data, onSuccess));
    },
    onSubmitAddTalentForm: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.adminAddTalent(data));
    },
    onSubmitQuoteForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitQuoteForm(type, data, onSuccess));
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
)(ProjectDetailPage);
