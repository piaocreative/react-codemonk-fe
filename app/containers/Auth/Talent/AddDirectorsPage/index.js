/** AddDirectorsPage
 * This is the Signup page for the App, at the '/add-directors-shareholders' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import SVG from 'react-inlinesvg';
import { API_URL, USER, DETAILS, countryData, editIcon, deleteIcon } from 'containers/App/constants';
import { ContainerMod, ProgressMod, Card, H1, H4, LinkButtonMod, FormWrapper, Button, FormLabel } from 'components';
import request from 'utils/request';
import { FormGroup, Row, Col } from 'reactstrap';
import get from 'lodash/get';
import has from 'lodash/has';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import containerMessage from 'containers/messages';
import { handleBackButton, errorInUserDetails } from 'containers/Auth/utils';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import confirmbox from 'components/confirmBox';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { agencyStepSize, agencyRedirectToPage } from 'containers/App/utils';
import * as formValidations from 'utils/formValidations';
import { renderField, renderCheckBox } from 'utils/Fields';
import ToolTip from 'components/ToolTip';
import { getBtnClass, getSelectedFieldFromList } from 'containers/Auth/PersonalDetails/utils';
import { UserNameFields } from 'components/UserProfileComponents/UserNameFields';
import { DOBField } from 'components/UserProfileComponents/DOBField';
import { AddressFields } from 'components/UserProfileComponents/AddressFields';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import UserList from 'components/UserList';
import { defaultProps, propTypes } from 'containers/proptypes';
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import { TableTitle } from './styles';
import { key } from './constants';
import { checkUserType, countTotalShares } from './utils';

export class AddDirectorsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddDirectorModal: false,
    };
  }

  componentDidMount() {
    this.loaderUserDetails();
  }

  loaderUserDetails = () => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(this.setUserDetails)
      .catch(() => {
        errorInUserDetails();
      });
  };

  setUserDetails = response => {
    const { history, location, onChangeTotalShares, onChangeDirectorArray } = this.props;
    if (get(response, 'status')) {
      const { data } = response;
      const currentSignupStep = has(response, 'data.signupStep') === true ? get(response, 'data.signupStep') + 1 : 1;
      agencyRedirectToPage(history, location.redirection, currentSignupStep, 5);

      const apiDirectorsArray = get(data, 'directors', []);

      const directors = [];
      for (let i = 0; i < apiDirectorsArray.length; i++) {
        const newDirectorObj = apiDirectorsArray[i];
        newDirectorObj.dob = moment(newDirectorObj.dob).format('DD/MM/YYYY');
        // eslint-disable-next-line no-underscore-dangle
        delete newDirectorObj._id;
        directors.push(newDirectorObj);
      }

      const totalShares = countTotalShares(directors);
      onChangeTotalShares(totalShares);
      onChangeDirectorArray(directors);
    } else {
      errorInUserDetails(get(response, 'message'));
    }
  };

  /** call on close button click
   * @author Innovify
   */
  handleAddDirectorCloseModal = () => {
    this.setState({ showAddDirectorModal: false });
  };

  /**
   * call on open handleAddDirectorOpenModal popup
   * @author Innovify
   */
  handleAddDirectorOpenModal = (modalType, index) => {
    const { dispatch } = this.props;
    if (modalType === 'add') {
      const data = {
        firstName: '',
        lastName: '',
        dob: '',
        companyPincode: '',
        companyCity: '',
        companyCountry: '',
        companyAddressLineOne: '',
        companyAddressLineTwo: '',
        shareholder: false,
        director: false,
        ownership: '',
      };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
    } else if (modalType === 'edit') {
      const { directorsArray, totalShares, onChangeTotalShares } = this.props;
      const { [index]: rowData } = directorsArray;
      const dob = moment(get(rowData, 'dob', ''), 'DD/MM/YYYY').toDate();
      const countryObj = getSelectedFieldFromList(countryData, 'name', get(rowData, 'country', ''));
      const country = { label: countryObj.name, value: countryObj.value };
      const ownership = get(rowData, 'holdingPercent', '');
      const data = {
        firstName: get(rowData, 'firstName', ''),
        lastName: get(rowData, 'lastName', ''),
        dob,
        companyPincode: get(rowData, 'postcode', ''),
        companyCity: get(rowData, 'city', ''),
        companyCountry: country,
        companyAddressLineOne: get(rowData, 'addressLineOne', ''),
        companyAddressLineTwo: get(rowData, 'addressLineTwo', ''),
        shareholder: get(rowData, 'isShareHolder', false),
        director: get(rowData, 'isDirector', false),
        ownership,
      };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });

      const newTotalShares = Number(totalShares) - Number(ownership);
      onChangeTotalShares(newTotalShares);
    }
    this.setState({ showAddDirectorModal: true, modalType, directorIndex: index });
  };

  popupSubmit = (modalType, directorIndex) => {
    const {
      directorsArray,
      firstName,
      lastName,
      dob: propDOB,
      companyPincode,
      companyCity,
      companyCountry,
      companyAddressLineOne,
      companyAddressLineTwo,
      shareholder,
      director,
      ownership,
      onChangeDirectorArray,
      totalShares,
      onChangeTotalShares,
    } = this.props;
    const newDirectorsArray = jsonCopy(directorsArray);

    const dob = moment(propDOB).format('DD/MM/YYYY');

    const newDirector = {
      firstName,
      lastName,
      dob,
      postcode: companyPincode,
      city: companyCity,
      country: get(companyCountry, 'value', ''),
      addressLineOne: companyAddressLineOne,
      addressLineTwo: companyAddressLineTwo,
      isShareHolder: shareholder,
      isDirector: director,
      holdingPercent: Number(ownership),
    };

    if (modalType === 'add') {
      newDirectorsArray.unshift(newDirector);
    } else if (modalType === 'edit') {
      newDirectorsArray[directorIndex] = newDirector;
    }
    onChangeDirectorArray(newDirectorsArray);

    const newTotalShares = newDirector.isShareHolder ? Number(totalShares) + Number(ownership) : Number(totalShares) + 0;
    onChangeTotalShares(Number(newTotalShares));
    this.setState({ showAddDirectorModal: false, modalType: '', directorIndex: '' });
  };

  /**
   * call on delete
   * @author Innovify
   */
  deleteForMe = index => {
    confirmbox('Are you sure?', {
      displayHeader: true,
      subTitle: 'Do you really want to delete this record?',
      className: 'confirmation-modal',
      buttons: { ok: 'Delete', discard: 'Cancel' },
    }).then(result => this.handleModal(result, index));
  };

  handleModal = (result, index) => {
    if (!result) {
      const { directorsArray, onChangeDirectorArray, totalShares, onChangeTotalShares } = this.props;
      const newDirectorsArray = jsonCopy(directorsArray);

      const userShares = directorsArray[index].isShareHolder ? directorsArray[index].holdingPercent : 0;
      const newTotalShares = Number(totalShares) - Number(userShares);
      onChangeTotalShares(newTotalShares);
      newDirectorsArray.splice(index, 1);
      onChangeDirectorArray(newDirectorsArray);
    }
  };

  getValidation = validation => {
    const { shareholder, director } = this.props;
    let output = '';
    if (!shareholder && !director) {
      output = validation;
    }
    return output;
  };

  handleSaveForLater = (e, submitType) => {
    if (submitType !== 'continue') {
      e.preventDefault();
    }
    this.setSaveForLater(e, submitType);
  };

  setSaveForLater = (e, submitType) => {
    const { directorsArray, onSaveForLater, onSubmitAddDirectors } = this.props;

    const newDirectorsArray = [];
    for (let i = 0; i < directorsArray.length; i++) {
      if (directorsArray[i].isShareHolder) {
        newDirectorsArray.push(directorsArray[i]);
      } else {
        const newDirectorObj = directorsArray[i];
        delete newDirectorObj.holdingPercent;
        newDirectorsArray.push(newDirectorObj);
      }
    }

    if (submitType === 'saveForLater') {
      onSaveForLater(e, newDirectorsArray);
    } else if (submitType === 'continue') {
      onSubmitAddDirectors(e, newDirectorsArray);
    }
  };

  render() {
    const {
      history,
      invalid,
      loading,
      responseSuccess,
      responseError,
      handleSubmit,
      directorsArray,

      shareholder,
      director,
    } = this.props;
    const { showAddDirectorModal, modalType, directorIndex } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={agencyStepSize(6)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center">
              <FormattedMessage {...messages.headingAddDirector} />
            </H1>
            <PaymentPageWrapper>
              <FormWrapper>
                <form>
                  <TableTitle className="d-flex justify-content-between mb-3">
                    <H4 className="m-0">
                      <FormattedMessage {...messages.titleListTalents} />
                    </H4>
                    <Button
                      type="button"
                      className="btn btn-primary btn-link text-underline"
                      onClick={() => this.handleAddDirectorOpenModal('add')}
                    >
                      <FormattedMessage {...messages.btnAddPerson} />
                    </Button>
                  </TableTitle>
                  <hr className="m-0" />
                  <UserList className="with-scroll">
                    {get(this.props, 'directorsArray', []).length > 0 &&
                      directorsArray.map((directorObj, index) => {
                        const mapKey = uuidv4();
                        const userType = checkUserType(directorObj);
                        const holdingPercent = get(directorObj, 'holdingPercent') ? `${get(directorObj, 'holdingPercent')}%` : '-';
                        return (
                          <li key={mapKey}>
                            <div>
                              <span>{`${get(directorObj, 'firstName')} ${get(directorObj, 'lastName')}`}</span>
                              <span>{userType}</span>
                              <span>{holdingPercent}</span>
                            </div>
                            <div>
                              <Button type="button" onClick={() => this.deleteForMe(index)}>
                                <SVG src={deleteIcon} />
                              </Button>
                              <Button type="button" onClick={() => this.handleAddDirectorOpenModal('edit', index)}>
                                <SVG src={editIcon} />
                              </Button>
                            </div>
                          </li>
                        );
                      })}
                  </UserList>
                  <hr />
                  <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end">
                    <LinkButtonMod
                      color="link"
                      className="left-arrow link me-auto"
                      onClick={e => {
                        handleBackButton(e, history, '/agency/payout-details');
                      }}
                    >
                      <FormattedMessage {...containerMessage.backButton} />
                    </LinkButtonMod>
                    <LinkButtonMod
                      onClick={e => {
                        this.handleSaveForLater(e, 'saveForLater');
                      }}
                      color="link"
                    >
                      <FormattedMessage {...containerMessage.saveLaterButton} />
                    </LinkButtonMod>
                    <Button
                      className={`${getBtnClass(loading, responseSuccess, responseError)} btn-submit`}
                      type="submit"
                      disabled={invalid || get(this.props, 'directorsArray', []).length < 1}
                      onClick={handleSubmit(e => {
                        this.handleSaveForLater(e, 'continue');
                      })}
                    >
                      <FormattedMessage {...containerMessage.continueButton} />
                    </Button>
                  </div>
                </form>
              </FormWrapper>
            </PaymentPageWrapper>
          </Card>
          <PopupWrapper
            loading={loading}
            responseSuccess={responseSuccess}
            responseError={responseError}
            disabled={invalid}
            isOpen={showAddDirectorModal}
            modalType={modalType}
            onDiscard={this.handleAddDirectorCloseModal}
            onHandleSubmit={handleSubmit(() => {
              this.popupSubmit(modalType, directorIndex);
            })}
            title={modalType === 'add' ? messages.modalAddPersonHeader.defaultMessage : messages.modalEditPersonHeader.defaultMessage}
          >
            <form onSubmit={handleSubmit}>
              <UserNameFields formKey={key} {...this.props} size="sm" />
              <Row>
                <Col md="6">
                  <DOBField formKey={key} {...this.props} size="sm" />
                </Col>
              </Row>
              <H4 className="input-sm">
                <FormattedMessage {...messages.titleAddress} />
              </H4>
              <AddressFields formKey={key} {...this.props} size="sm" />

              <TableTitle className="input-sm d-flex align-items-end">
                <H4 className="input-sm m-0">
                  <FormattedMessage {...messages.titleRole} />
                </H4>
                <ToolTip wrapperClass="ms-2" placement="right" tooltipId="infoTooltip" content={messages.roleGuidelines.defaultMessage} />
              </TableTitle>
              <FormGroup className="input-sm d-flex">
                <Field
                  name="shareholder"
                  type="checkbox"
                  checked={shareholder}
                  component={renderCheckBox}
                  label="Shareholder"
                  wrapperClassName="me-3 me-md-5"
                  validate={this.getValidation([formValidations.directorSelection])}
                />
                <Field
                  name="director"
                  type="checkbox"
                  checked={director}
                  component={renderCheckBox}
                  label="Director"
                  wrapperClassName="me-3 me-md-5"
                  validate={this.getValidation([formValidations.directorSelection])}
                />
              </FormGroup>
              {shareholder && (
                <Row>
                  <Col md="6">
                    <FormGroup className="input-sm">
                      <FormLabel>
                        <FormattedMessage {...messages.labelOwnership} />
                      </FormLabel>
                      <Field
                        name="ownership"
                        type="number"
                        component={renderField}
                        placeholder={messages.placeHolderOwnership.defaultMessage}
                        validate={[formValidations.requiredField, formValidations.ownershipValidation]}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              )}
            </form>
          </PopupWrapper>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeDirectorArray: data => dispatch(actions.changeDirectorsArray(data)),
    onChangeTotalShares: data => dispatch(actions.changeTotalShares(data)),
    onSaveForLater: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitAddDirectors('saveForLater', data));
    },
    onSubmitAddDirectors: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitAddDirectors('continue', data));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  directorsArray: selectors.makeSelectDirectorsArray(),
  totalShares: selectors.makeSelectTotalShares(),

  firstName: selectors.firstName,
  lastName: selectors.lastName,

  dob: selectors.dob,
  companyPincode: selectors.companyPincode,
  companyCity: selectors.companyCity,
  companyCountry: selectors.companyCountry,
  companyAddressLineOne: selectors.companyAddressLineOne,
  companyAddressLineTwo: selectors.companyAddressLineTwo,
  shareholder: selectors.shareholder,
  director: selectors.director,
  ownership: selectors.ownership,

  loading: makeSelectLoading(),
});

AddDirectorsPage.defaultProps = defaultProps;
AddDirectorsPage.propTypes = propTypes;

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
)(AddDirectorsPage);
