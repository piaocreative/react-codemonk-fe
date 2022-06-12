/** HireTalent Page
 * This is the HireTalent in agency profile
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import { FormGroup, Row, Col } from 'reactstrap';
import DatePickers from 'components/DatePickers';
import { FormLabel, H4, Button, ToastifyMessage, P } from 'components';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import AsyncSelects from 'components/AsyncSelects';
import { API_URL, CLIENT, PROJECT_API, LIST } from 'containers/App/constants';
import { renderTextEditor } from 'utils/Fields';
import Emitter from 'utils/emitter';
import * as formValidations from 'utils/formValidations';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { VALIDATION } from 'utils/constants';
import request from 'utils/request';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import containerMessage from 'containers/messages';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { propTypes } from 'containers/proptypes';
import { ResendBtn } from 'containers/ClientAccountSettingsPage/styles';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { key } from './constants';
import messages from '../messages';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class HireTalent extends React.Component {
  constructor(props) {
    super(props);

    const minDateTime = moment().toDate();
    this.state = {
      stateInterviewSlotArray: [minDateTime],
      stateInterviewMinTimeArray: [minDateTime],
      projectOptions: [],
      projectsData: [],
    };
    this.debouncedGetOptions = debounce(this.getOptions, 500);
  }

  componentDidMount() {
    const { dispatch, onChangeInterviewSlot, hireData = {} } = this.props;
    const data = { projectName: '', projectSummary: EditorState.createEmpty() };

    if (!isEmpty(hireData)) {
      data.projectName = get(hireData, 'projectName', '')
        ? { label: get(hireData, 'projectName', ''), value: get(hireData, 'projectId', '') }
        : '';
      data.projectSummary = EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(get(hireData, 'projectSummary', ''))),
      );
    }

    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });

    dispatch(change(key, 'timeSlot0', ''));
    dispatch(untouch(key, 'timeSlot0'));
    dispatch(change(key, 'timeSlot1', ''));
    dispatch(untouch(key, 'timeSlot1'));
    dispatch(change(key, 'timeSlot2', ''));
    dispatch(untouch(key, 'timeSlot2'));
    onChangeInterviewSlot([]);

    Emitter.on('hireTalentSaga', hireTalentSaga => {
      if (hireTalentSaga) {
        const { hireModalClose } = this.props;
        hireModalClose();
      }
    });
  }

  componentWillUnmount() {
    Emitter.off('hireTalentSaga');
  }

  modalSubmit = () => {
    const { talentId, projectName, projectSummary: propSummary, interviewSlotArray, onSubmitHire } = this.props;
    const projectSummary = draftToHtml(convertToRaw(propSummary.getCurrentContent()));
    const hireObj = {
      talentId,
      name: get(projectName, 'value', ''),
      description: projectSummary,
      timeSlots: interviewSlotArray,
    };

    if (get(projectName, '__isNew__', '')) {
      hireObj.name = get(projectName, 'label', '');
    } else {
      hireObj.name = get(projectName, 'label', '');
      hireObj.projectId = get(projectName, 'value', '');
    }
    onSubmitHire(hireObj);
  };

  addTimeslot = () => {
    const { dispatch, onChangeInterviewSlot } = this.props;
    const { stateInterviewSlotArray, stateInterviewMinTimeArray } = this.state;
    if (stateInterviewSlotArray.length < 3) {
      const newInterviewSlotArray = jsonCopy(stateInterviewSlotArray);
      newInterviewSlotArray.push(moment().toDate());

      const newInterviewMinTimeArray = jsonCopy(stateInterviewMinTimeArray);
      newInterviewMinTimeArray.push(moment().toDate());

      dispatch(change(key, `timeSlot${stateInterviewSlotArray.length}`, ''));
      this.setState({ stateInterviewSlotArray: newInterviewSlotArray, stateInterviewMinTimeArray: newInterviewMinTimeArray });
      onChangeInterviewSlot(newInterviewSlotArray);
    }
  };

  removeTimeslot = removeIndex => {
    const { dispatch, onChangeInterviewSlot } = this.props;
    const { stateInterviewSlotArray, stateInterviewMinTimeArray } = this.state;
    if (stateInterviewSlotArray.length > 1) {
      let newInterviewSlotArray = jsonCopy(stateInterviewSlotArray);
      newInterviewSlotArray = newInterviewSlotArray.filter((_, index) => index !== removeIndex);

      let newInterviewMinTimeArray = jsonCopy(stateInterviewMinTimeArray);
      newInterviewMinTimeArray = newInterviewMinTimeArray.filter((_, index) => index !== removeIndex);

      this.setState({ stateInterviewSlotArray: newInterviewSlotArray, stateInterviewMinTimeArray: newInterviewMinTimeArray });
      onChangeInterviewSlot(newInterviewSlotArray);

      for (let i = 0; i < newInterviewSlotArray.length; i++) {
        const newDateTime = moment(newInterviewSlotArray[i]).toDate();
        dispatch(change(key, `timeSlot${i}`, newDateTime));
        dispatch(untouch(key, `timeSlot${i}`));
      }

      const total = newInterviewSlotArray.length;
      dispatch(change(key, `timeSlot${total}`, ''));
      dispatch(untouch(key, `timeSlot${total}`));
    }
  };

  onChangeTimeSlot = (index, date) => {
    const { dispatch, onChangeInterviewSlot } = this.props;
    const { stateInterviewSlotArray, stateInterviewMinTimeArray } = this.state;

    const today = moment();
    const selectedDate = moment(date);
    const diffOfDates = selectedDate.startOf('day').diff(today.startOf('day'), 'days');

    const start = diffOfDates === 0 ? moment() : moment(date);
    const remainder = 30 - (start.minute() % 30);

    const dateTime = moment(start)
      .add(remainder, 'minutes')
      .format('DD/MM/YYYY h:mm:ss a');
    const newDate = moment(dateTime, 'DD/MM/YYYY h:mm:ss a').toDate();

    const newInterviewSlotArray = stateInterviewSlotArray;
    newInterviewSlotArray[index] = newDate;
    dispatch(change(key, `timeSlot${index}`, newDate));

    const newInterviewMinTimeArray = stateInterviewMinTimeArray;

    if (diffOfDates === 0) {
      newInterviewMinTimeArray[index] = moment().toDate();
    } else {
      newInterviewMinTimeArray[index] = moment()
        .startOf('day')
        .toDate();
    }

    this.setState({ stateInterviewSlotArray: newInterviewSlotArray, stateInterviewMinTimeArray: newInterviewMinTimeArray });
    onChangeInterviewSlot(newInterviewSlotArray);
  };

  renderInterviewSlots = () => {
    const { stateInterviewSlotArray, stateInterviewMinTimeArray } = this.state;

    return stateInterviewSlotArray.map((slot, index) => (
      <Row>
        <Col md="6">
          <FormGroup className="input-sm">
            <FormLabel>{`Option ${index + 1}`}</FormLabel>
            <Field
              name={`timeSlot${index}`}
              component={DatePickers}
              dateFormat="dd/MM/yyyy h:mm aa"
              showYearDropDown
              showTimeSelect
              placeholder="DD/MM/YYYY HH:MM"
              minDate={new Date()}
              minTime={stateInterviewMinTimeArray[index]}
              maxTime={moment()
                .endOf('day')
                .toDate()}
              selected={slot}
              onChange={date => this.onChangeTimeSlot(index, date)}
              yearDropdownItemNumber={50}
              scrollableYearDropdown
              shouldCloseOnSelect={false}
              placement="top-end"
              validate={[formValidations.requiredDate]}
            />
            {stateInterviewSlotArray.length > 1 && (
              <ResendBtn className="input-sm" color="link" type="button" onClick={() => this.removeTimeslot(index)}>
                Delete
              </ResendBtn>
            )}
          </FormGroup>
        </Col>
      </Row>
    ));
  };

  fetchProject = async value => {
    const { talentId } = this.props;
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${PROJECT_API}${LIST}?q=${value}&talentId=${talentId}`;
    return request(requestURL, data);
  };

  processProjectData = data => {
    const output = [];
    data.forEach(item => {
      const option = {
        label: `${item.name}`,
        // eslint-disable-next-line no-underscore-dangle
        value: item._id,
      };
      output.push(option);
    });
    return output;
  };

  getOptions = (inputValue, cb) => {
    const clientData = this.fetchProject(inputValue);
    clientData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const projectOptions = this.processProjectData(data);
          this.setState({ projectOptions, projectsData: data });
          cb(projectOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetOptions(inputValue, callback);
    }
  };

  handleChange = option => {
    const { dispatch } = this.props;
    const { projectOptions = [], projectsData } = this.state;
    const projectId = option.value;
    const index = projectOptions.findIndex(item => item.value === projectId);
    const projectData = projectsData[index];
    const projectSummary = get(projectData, 'description', '');
    const richTextSummary = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(projectSummary)));
    dispatch(change(key, 'projectName', option));
    dispatch(change(key, 'projectSummary', richTextSummary));
  };

  render() {
    const { invalid, loading, handleSubmit, showHireModal, hireModalClose, projectName, projectSummary } = this.props;
    const { projectOptions, stateInterviewSlotArray } = this.state;
    return (
      <PopupWrapper
        loading={loading}
        disabled={invalid}
        isOpen={showHireModal}
        modalType="hire"
        onDiscard={() => hireModalClose()}
        onHandleSubmit={handleSubmit(() => {
          this.modalSubmit();
        })}
        title={messages.hireTalentTitle.defaultMessage}
      >
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md="12">
              <FormGroup className="input-sm">
                <FormLabel>
                  <FormattedMessage {...containerMessage.labelProjectName} />
                </FormLabel>
                <Field
                  name="projectName"
                  type="text"
                  component={AsyncSelects}
                  defaultValue={projectName}
                  cacheOptions
                  loadOptions={this.loadOptions}
                  defaultOptions={projectOptions}
                  handleChange={this.handleChange}
                  placeHolder={containerMessage.placeholderProjectName.defaultMessage}
                  validate={[formValidations.requiredSelect]}
                  creatable
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup className="input-sm">
                <FormLabel>
                  <FormattedMessage {...messages.labelProjectSummary} />
                </FormLabel>
                <Field
                  name="projectSummary"
                  component={renderTextEditor}
                  editorState={projectSummary}
                  placeholder={messages.placeholderProjectSummary.defaultMessage}
                  validate={[formValidations.minLengthRichText100, formValidations.maxLengthRichText1500]}
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-inline-flex align-items-center my-3">
            <H4 className="newH4 my-0" opacityVal="0.5">
              {messages.labelInterviewSlot.defaultMessage}
            </H4>
            <P className="p14 mb-0 ms-1 d-inline" opacityVal="0.5">
              {messages.labelInterviewSlotSmall.defaultMessage}
            </P>
          </div>
          {this.renderInterviewSlots()}

          {stateInterviewSlotArray.length < 3 && (
            <Button className="btn-primary btn-sm btn-link text-decoration-underline" type="button" onClick={() => this.addTimeslot()}>
              Add another
            </Button>
          )}
        </form>
      </PopupWrapper>
    );
  }
}

HireTalent.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  projectName: selectors.projectName,
  projectSummary: selectors.projectSummary,
  interviewSlotArray: selectors.makeSelectInterviewSlot(),

  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeInterviewSlot: data => {
      dispatch(actions.changeInterviewSlot(data));
    },

    onSubmitHire: data => {
      dispatch(loadRepos());
      dispatch(actions.submitHire(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(HireTalent);
