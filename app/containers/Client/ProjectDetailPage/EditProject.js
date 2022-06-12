import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field, change } from 'redux-form/immutable';
import { FormLabel, DatePickers, ToastifyMessage } from 'components';
import moment from 'moment';
import { toast } from 'react-toastify';
import request from 'utils/request';
import debounce from 'lodash/debounce';
import { API_URL, CLIENT, SEARCH_BY_NAME } from 'containers/App/constants';
import { VALIDATION } from 'utils/constants';
import AsyncSelects from 'components/AsyncSelects';
import { renderField, renderTextEditor } from 'utils/Fields';
import containerMessage from 'containers/messages';
import { processData } from 'containers/Client/AddBrief/utils';
import * as formValidations from 'utils/formValidations';
import { defaultProps, propTypes } from 'containers/proptypes';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { key } from './constants';

export class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientOptions: [],
    };
    this.debouncedGetClientOptions = debounce(this.getClientOptions, 500);
  }

  // client Name fetch
  fetchClients = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${SEARCH_BY_NAME}?q=${value}`;
    return request(requestURL, data);
  };

  getClientOptions = (inputValue, cb) => {
    const clientsData = this.fetchClients(inputValue);
    clientsData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const clientOptions = processData(data);
          this.setState({ clientOptions });
          cb(clientOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadClientOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetClientOptions(inputValue, callback);
    }
  };

  handleClientChange = option => {
    const { dispatch } = this.props;
    dispatch(change(key, 'clientName', option));
  };

  render() {
    const { clientOptions } = this.state;
    const { projectName = '', projectDescription, isAdmin, startDate, endDate, clientName } = this.props;
    return (
      <React.Fragment>
        {isAdmin && (
          <Row>
            <Col>
              <FormGroup className="input-sm">
                <FormLabel>
                  <FormattedMessage {...containerMessage.labelClientNamePlaceHolder} />
                </FormLabel>
                <Field
                  name="clientName"
                  type="text"
                  component={AsyncSelects}
                  cacheOptions
                  defaultValue={clientName}
                  loadOptions={this.loadClientOptions}
                  defaultOptions={clientOptions}
                  handleChange={this.handleClientChange}
                  placeHolder={containerMessage.labelClientNamePlaceHolder.defaultMessage}
                  validate={[formValidations.requiredSelect]}
                  creatable
                />
              </FormGroup>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <FormGroup className="input-sm">
              <FormLabel>
                <FormattedMessage {...containerMessage.labelProjectName} />
              </FormLabel>
              <Field
                name="projectName"
                type="text"
                component={renderField}
                placeholder={containerMessage.placeholderProjectName.defaultMessage}
                value={projectName}
                validate={[formValidations.requiredField, formValidations.minLength2, formValidations.maxLength50]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="input-sm">
              <FormLabel>
                <FormattedMessage {...containerMessage.placeholderProjectSummary} />
              </FormLabel>
              <Field
                name="projectDescription"
                component={renderTextEditor}
                editorState={projectDescription}
                placeholder={containerMessage.placeholderProjectSummary.defaultMessage}
                validate={[formValidations.minLengthRichText100, formValidations.maxLengthRichText1500]}
              />
            </FormGroup>
          </Col>
        </Row>
        {isAdmin && (
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
                  selected={moment(startDate).toDate()}
                  defaultValue={moment(startDate).toDate()}
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
                  minDate={moment(startDate).toDate()}
                  selected={moment(endDate).toDate()}
                  defaultValue={moment(endDate).toDate()}
                  placement="bottom-start"
                  withIcon
                  validate={[formValidations.requiredDate]}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

EditProject.defaultProps = defaultProps;
EditProject.propTypes = propTypes;

export default EditProject;
