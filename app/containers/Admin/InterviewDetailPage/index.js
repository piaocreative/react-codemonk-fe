/** InterviewDetailPage **/
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, change } from 'redux-form/immutable';
import { compose } from 'redux';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import moment from 'moment';
import { VALIDATION } from 'utils/constants';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { API_URL, INTERVIEW } from 'containers/App/constants';
import Selects from 'components/Selects';
import { ProfileContent, CardHeader, CardBody, BackLink, ProjectInfo } from 'containers/MyProfilePage/styles';
import * as formValidations from 'utils/formValidations';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import request from 'utils/request';
import { PrivateGrid, Card, H4, H3, Button, Badge } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { getBadgeClass, redirectTo } from 'containers/App/utils';
import containerMessage from 'containers/messages';
import injectSaga from 'utils/injectSaga';
import { defaultProps, propTypes } from 'containers/proptypes';
import { key, talentStatusArray } from './constants';
import messages from './messages';
import * as selectors from './selectors';
import saga from './saga';
import * as actions from './actions';

export class InterviewDetailPage extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { dispatch } = this.props;
    const interviewID = get(params, 'interviewID', '');
    this.state = {
      interviewID,
      list: {},
      editFlag: false,
      talentStatus: '',
    };
    dispatch(change(key, 'status', ''));
  }

  componentDidMount() {
    this.loadInterviewDetails();
  }

  loadInterviewDetails = () => {
    const data = { method: 'GET' };
    const { interviewID } = this.state;
    const requestURL = `${API_URL}${INTERVIEW}/${interviewID}`;
    request(requestURL, data)
      .then(this.setInterviewDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setInterviewDetails = response => {
    if (get(response, 'status')) {
      const { dispatch } = this.props;
      const { data } = response;
      const statusObj = talentStatusArray.find(obj => obj.label === get(data, 'talentStatus'));
      const statusVal = get(statusObj, 'value');
      const talentStatus = get(data, 'talentStatus') ? { label: get(data, 'talentStatus'), value: statusVal } : '';
      dispatch(change(key, 'status', talentStatus));
      this.setState({ list: data, talentStatus });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleEditStatus = () => {
    this.setState({ editFlag: true });
  };

  handleChangeStatus = status => {
    this.setState({ talentStatus: status });
  };

  handleSubmitStatus = e => {
    e.preventDefault();
    const { interviewID, talentStatus } = this.state;
    const { onChangeResult } = this.props;
    const data = { interviewId: interviewID, status: talentStatus.value };
    onChangeResult(data, () => {
      this.setState({ editFlag: false });
      this.loadInterviewDetails();
    });
  };

  clientNameRow = list => (
    <Row>
      <Col md={6}>
        <ProjectInfo>
          <p className="title opacity-100">{containerMessage.labelClientName.defaultMessage}</p>
          <p className="mb-0">{list.clientName}</p>
        </ProjectInfo>
      </Col>
      <Col md={6}>
        <ProjectInfo>
          <p className="title opacity-100">{containerMessage.labelClientEmail.defaultMessage}</p>
          <p className="mb-0">{list.clientEmail}</p>
        </ProjectInfo>
      </Col>
    </Row>
  );

  render() {
    const { list, editFlag } = this.state;
    const { history, invalid, status, loading } = this.props;
    const dateRequested = get(list, 'dateRequested') ? moment(list.dateRequested).format('DD/MM/YYYY') : '-';
    const saveButtonClass = loading ? `loading btn-primary btn-sm btn-submit mt-0 me-0` : `btn-primary btn-sm btn-submit mt-0 me-0`;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ProfileContent>
          <PrivateGrid>
            <BackLink onClick={() => redirectTo(history, '/admin/interviews')}>{messages.backToInterview.defaultMessage}</BackLink>
            <Card>
              <CardHeader>
                <H4 className="m-0">{messages.titleInterviewDetails.defaultMessage}</H4>
              </CardHeader>
              <CardBody>
                <div className="d-flex align-items-start">
                  <H3 className="mb-3">{get(list, 'name')}</H3>
                  {get(list, 'status') && <Badge className={`${getBadgeClass(get(list, 'status'))} ms-3`}>{get(list, 'status')}</Badge>}
                </div>

                <p className="title opacity-100">{containerMessage.labelDescription.defaultMessage}</p>
                <div className="read-more-less-content">
                  <HTMLEllipsis unsafeHTML={get(list, 'description', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
                </div>

                <p className="title opacity-100">{messages.labelClientFeedback.defaultMessage}</p>
                <div className="read-more-less-content">
                  <HTMLEllipsis unsafeHTML={get(list, 'clientFeedback', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
                </div>
                <p className="title opacity-100">{messages.labelTalentFeedback.defaultMessage}</p>
                <div className="read-more-less-content">
                  <HTMLEllipsis unsafeHTML={get(list, 'talenFeedback', '-')} maxLine="5" ellipsis="..." basedOn="letters" />
                </div>

                {this.clientNameRow(list)}

                <Row>
                  <Col md={6}>
                    <ProjectInfo>
                      <p className="title opacity-100">{messages.labelTalentName.defaultMessage}</p>
                      <p className="mb-0">{list.talentName}</p>
                    </ProjectInfo>
                  </Col>
                  <Col md={6}>
                    <ProjectInfo>
                      <p className="title opacity-100">{messages.labelTalentEmail.defaultMessage}</p>
                      <p className="mb-0">{list.talentEmail}</p>
                    </ProjectInfo>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <ProjectInfo>
                      <p className="title opacity-100">{messages.labelDateRequested.defaultMessage}</p>
                      <p className="mb-0">{dateRequested}</p>
                    </ProjectInfo>
                  </Col>
                </Row>

                <p className="title opacity-100">{messages.labelInterviewSlotAdmin.defaultMessage}</p>
                <Row>
                  {get(list, 'timeSlots', []).length > 0 &&
                    get(list, 'timeSlots', []).map((timeSlot, index) => (
                      <Col md={6}>
                        <ProjectInfo>
                          <p className="title opacity-100">{`${messages.labelOption.defaultMessage} ${index + 1}:`}</p>
                          <p className="mb-0">{moment(get(timeSlot, 'requestedSlot')).format('DD/MM/YYYY hh:mm A')}</p>
                        </ProjectInfo>
                      </Col>
                    ))}
                </Row>
                <p className="title opacity-100">{messages.labelResult.defaultMessage}</p>
                <Row>
                  <Col md={6}>
                    <Field
                      name="status"
                      type="text"
                      component={Selects}
                      disable={!editFlag}
                      defaultValue={status}
                      placeHolder={messages.placeholderStatus.defaultValue}
                      searchable={false}
                      options={talentStatusArray.map(item => ({
                        label: `${item.label}`,
                        value: item.value,
                      }))}
                      onChange={e => this.handleChangeStatus(e)}
                      validate={[formValidations.requiredField]}
                    />
                  </Col>
                  <Col md={6} className="pt-1">
                    {editFlag ? (
                      <Button className={saveButtonClass} disabled={invalid} onClick={e => this.handleSubmitStatus(e)}>
                        <FormattedMessage {...messages.saveButton} />
                      </Button>
                    ) : (
                      <Button className="btn-primary btn-sm btn-submit mt-0 me-0" onClick={() => this.handleEditStatus()}>
                        <FormattedMessage {...messages.editButton} />
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </PrivateGrid>
        </ProfileContent>
      </React.Fragment>
    );
  }
}

InterviewDetailPage.defaultProps = defaultProps;
InterviewDetailPage.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  status: selectors.status,

  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeResult: (data, onSuccess) => {
      dispatch(loadRepos());
      dispatch(actions.changeStatus(data, onSuccess));
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
)(InterviewDetailPage);
