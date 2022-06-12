import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field, change } from 'redux-form/immutable';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { FormLabel, DatePickers, ToastifyMessage } from 'components';
import AsyncSelects from 'components/AsyncSelects';
import { API_URL, TALENT, SEARCH_BY_NAME } from 'containers/App/constants';
import request from 'utils/request';
import containerMessage from 'containers/messages';
import { VALIDATION } from 'utils/constants';
import * as formValidations from 'utils/formValidations';
import { getMaxStartDate } from 'containers/Admin/Projects/utils';
import messages from 'containers/Admin/Projects/messages';
import { processData } from 'containers/Client/AddBrief/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import { key } from './constants';

export class AddTalent extends Component {
  constructor(props) {
    super(props);
    this.state = { list: props.list, sStartDate: '', sEndDate: '' };
    this.debouncedGetOptions = debounce(this.getOptions, 500);
  }

  fetchClient = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${TALENT}${SEARCH_BY_NAME}?q=${value}`;
    return request(requestURL, data);
  };

  getOptions = (inputValue, cb) => {
    const clientData = this.fetchClient(inputValue);
    clientData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const talentOptions = processData(data);
          this.setState({ talentOptions });
          cb(talentOptions);
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
    dispatch(change(key, 'talentName', option));
  };

  handleDateChange = (type, date) => {
    if (type === 'startDate') {
      this.setState({ sStartDate: date });
    } else {
      this.setState({ sEndDate: date });
    }
  };

  render() {
    const { talentName = '', startDate, endDate } = this.props;
    const { talentOptions, list, sStartDate, sEndDate } = this.state;
    const projectStartDate = get(list, 'startDate', moment());
    const projectEndDate = get(list, 'endDate', '');

    const maxStartDate = getMaxStartDate(sEndDate, projectEndDate);
    const minEndDate = sStartDate ? get(this.state, 'sStartDate') : projectStartDate;
    return (
      <React.Fragment>
        <Row>
          <Col md="12">
            <FormGroup className="input-sm">
              <FormLabel>
                <FormattedMessage {...messages.labelTalentName} />
              </FormLabel>
              <Field
                name="talentName"
                component={AsyncSelects}
                defaultValue={talentName}
                cacheOptions
                loadOptions={this.loadOptions}
                defaultOptions={talentOptions}
                handleChange={this.handleChange}
                placeHolder={messages.placeholderClientName.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup className="input-sm">
              <FormLabel>
                <FormattedMessage {...containerMessage.labelStartDate} />
              </FormLabel>
              <Field
                name="startDate"
                component={DatePickers}
                showYearDropDown
                yearDropdownItemNumber={5}
                scrollableYearDropdown
                placeholder={containerMessage.placeholderDate.defaultMessage}
                minDate={moment(projectStartDate).toDate()}
                maxDate={moment(maxStartDate).toDate()}
                selected={moment(startDate).toDate()}
                defaultValue={moment(startDate).toDate()}
                onChange={date => this.handleDateChange('startDate', date)}
                placement="bottom-start"
                withIcon
                validate={[formValidations.requiredDate]}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className="input-sm">
              <FormLabel>
                <FormattedMessage {...containerMessage.labelEndDate} />
              </FormLabel>
              <Field
                name="endDate"
                component={DatePickers}
                showYearDropDown
                yearDropdownItemNumber={5}
                scrollableYearDropdown
                placeholder={containerMessage.placeholderDate.defaultMessage}
                minDate={moment(minEndDate).toDate()}
                maxDate={moment(projectEndDate).toDate()}
                selected={moment(endDate).toDate()}
                defaultValue={moment(endDate).toDate()}
                onChange={date => this.handleDateChange('endDate', date)}
                placement="bottom-start"
                withIcon
                validate={[formValidations.requiredDate]}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

AddTalent.defaultProps = defaultProps;
AddTalent.propTypes = propTypes;

export default AddTalent;
