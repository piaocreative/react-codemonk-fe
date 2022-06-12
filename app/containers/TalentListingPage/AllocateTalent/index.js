/** HireTalent Page
 * This is the HireTalent in agency profile
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormLabel, DatePickers } from 'components';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { API_URL, CLIENT, PROJECT_API, LIST } from 'containers/App/constants';
import Emitter from 'utils/emitter';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import request from 'utils/request';
import { renderField } from 'utils/Fields';
import { loadRepos } from 'containers/App/actions';
import containerMessage from 'containers/messages';
import * as formValidations from 'utils/formValidations';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { propTypes } from 'containers/proptypes';
import * as actions from './actions';
import * as selectors from './selectors';

import reducer from './reducer';
import saga from './saga';
import { key } from './constants';
import messages from '../messages';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class AllocateTalent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, talentName } = this.props;
    dispatch(change(key, 'talentName', talentName));
    dispatch(untouch(key, 'talentName'));
    Emitter.on('allocateTalentSaga', allocateTalentSaga => {
      if (allocateTalentSaga) {
        const { allocateModalClose } = this.props;
        allocateModalClose();
      }
    });

    dispatch(change(key, 'startDate', ''));
    dispatch(untouch(key, 'startDate', ''));
    dispatch(change(key, 'endDate', ''));
    dispatch(untouch(key, 'endDate', ''));
  }

  componentWillUnmount() {
    Emitter.off('allocateTalentSaga');
  }

  modalSubmit = () => {
    const { talentId, projectId, onSubmitAllocate } = this.props;
    const { startDate, endDate } = this.state;
    const hireObj = {
      talentId,
      projectId,
      startDate,
      endDate,
    };

    onSubmitAllocate(hireObj);
  };

  fetchProject = async value => {
    const { talentId } = this.props;
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${PROJECT_API}${LIST}?q=${value}&talentId=${talentId}`;
    return request(requestURL, data);
  };

  onChangeStartDate = date => {
    const { dispatch } = this.props;

    const today = moment();
    const selectedDate = moment(date);
    const diffOfDates = selectedDate.startOf('day').diff(today.startOf('day'), 'days');

    const start = diffOfDates === 0 ? moment() : moment(date);
    const remainder = 30 - (start.minute() % 30);

    const dateTime = moment(start)
      .add(remainder, 'minutes')
      .format('DD/MM/YYYY h:mm:ss a');
    const startDate = moment(dateTime, 'DD/MM/YYYY h:mm:ss a').format('DD/MM/YYYY');

    dispatch(change(key, 'startDate', startDate));
    this.setState({ startDate });
  };

  onChangeEndDate = date => {
    const { dispatch } = this.props;

    const today = moment();
    const selectedDate = moment(date);
    const diffOfDates = selectedDate.startOf('day').diff(today.startOf('day'), 'days');

    const start = diffOfDates === 0 ? moment() : moment(date);
    const remainder = 30 - (start.minute() % 30);

    const dateTime = moment(start)
      .add(remainder, 'minutes')
      .format('DD/MM/YYYY h:mm:ss a');
    const endDate = moment(dateTime, 'DD/MM/YYYY').format('DD/MM/YYYY');

    dispatch(change(key, 'endDate', endDate));
    this.setState({ endDate });
  };

  render() {
    const { invalid, loading, handleSubmit, showAllocateModal, allocateModalClose, talentName } = this.props;
    const { startDate, endDate } = this.state;
    return (
      <PopupWrapper
        loading={loading}
        disabled={invalid}
        isOpen={showAllocateModal}
        modalType="allocate"
        onDiscard={() => allocateModalClose()}
        onHandleSubmit={handleSubmit(() => {
          this.modalSubmit();
        })}
        title={messages.allocateTalentTitle.defaultMessage}
      >
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md="12">
              <FormGroup className="input-sm">
                <FormLabel>
                  <FormattedMessage {...containerMessage.labelTalentName} />
                </FormLabel>
                <Field name="talentName" type="text" component={renderField} disabled defaultValue={talentName} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup className="input-sm">
                <FormLabel>Start Date</FormLabel>
                <Field
                  name="startDate"
                  component={DatePickers}
                  showYearDropDown
                  yearDropdownItemNumber={5}
                  scrollableYearDropdown
                  placeholder="DD/MM/YYYY"
                  placement="bottom-start"
                  selected={moment(startDate).toDate()}
                  defaultValue={moment(startDate).toDate()}
                  onChange={date => this.onChangeStartDate(date)}
                  withIcon
                  validate={[formValidations.requiredDate]}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="input-sm">
                <FormLabel>End Date</FormLabel>
                <Field
                  name="endDate"
                  component={DatePickers}
                  showYearDropDown
                  yearDropdownItemNumber={5}
                  scrollableYearDropdown
                  placeholder="DD/MM/YYYY"
                  placement="bottom-start"
                  minDate={moment(startDate).toDate()}
                  selected={moment(endDate).toDate()}
                  defaultValue={moment(endDate).toDate()}
                  onChange={date => this.onChangeEndDate(date)}
                  withIcon
                  validate={[formValidations.requiredDate]}
                />
              </FormGroup>
            </Col>
          </Row>
        </form>
      </PopupWrapper>
    );
  }
}

AllocateTalent.propTypes = propTypes;
const mapStateToProps = createStructuredSelector({
  startDate: selectors.startDate,
  endDate: selectors.endDate,
});
export function mapDispatchToProps(dispatch) {
  return {
    onSubmitAllocate: data => {
      dispatch(loadRepos());
      dispatch(actions.submitAllocate(data));
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
)(AllocateTalent);
