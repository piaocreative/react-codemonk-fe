/**
 * EnterPhonePage
 * This is the Login page for the App, at the '/enter-phone' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, change } from 'redux-form/immutable';
import { FormGroup } from 'reactstrap';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Selects from 'components/Selects';
import { renderField } from 'utils/Fields';
import * as formValidations from 'utils/formValidations';
import { Button, OnboardingForm, ContainerMod, Card, H1, OnBoardingFormBody, FormLabel } from 'components';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { getSelectedCountryCode, getFormattedObject } from 'containers/Auth/PersonalDetails/utils';
import { CountryCode } from 'containers/Auth/PersonalDetails/style';
import { countryData, defaultCountryCode } from 'containers/App/constants';
import ProgressMod from 'components/ProgressMod';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { key } from './constants';

export class EnterPhonePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { dispatch, onChangeCountryCode } = props;
    const countryCode = getSelectedCountryCode(countryData, defaultCountryCode);
    const userCountryCode = getFormattedObject({ countryCode }, 'countryCode', 'name', 'phoneCode');
    onChangeCountryCode(userCountryCode);
    dispatch(change(key, 'countryCode', userCountryCode));
  }

  render() {
    const { handleSubmit, onSubmitForm, loading, invalid, countryCode, phoneNumber, onChangeCountryCode, onChangePhoneNumber } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value="14" className="onboarding-progress" />
          <Card className="text-center">
            <H1>
              <FormattedMessage {...messages.headingEnterPhone} />
            </H1>
            <OnboardingForm>
              <OnBoardingFormBody>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...messages.labelPhoneNumber} />
                    </FormLabel>
                    <div className="d-flex">
                      <CountryCode>
                        <Field
                          name="countryCode"
                          component={Selects}
                          defaultValue={countryCode}
                          options={countryData.map(code => ({
                            label: `${code.name} ${code.phoneCode}`,
                            value: code.name,
                          }))}
                          onChange={onChangeCountryCode}
                          placeHolder="+44"
                          validate={[formValidations.requiredSelect]}
                          fullWidthOption
                        />
                      </CountryCode>
                      <div className="w-100 mw-100 labelSpacing ms-2">
                        <Field
                          name="phoneNumber"
                          type="text"
                          component={renderField}
                          value={phoneNumber}
                          placeholder={messages.placeHolderPhoneNumber.defaultMessage}
                          onChange={onChangePhoneNumber}
                          validate={[
                            formValidations.required,
                            formValidations.phoneNumber(12),
                            formValidations.allow('0-9 ', 'Only numerical values and space allowed'),
                          ]}
                        />
                      </div>
                    </div>
                  </FormGroup>
                </form>
              </OnBoardingFormBody>
              <hr />
              <OnBoardingFormBody className="d-flex justify-content-center">
                <Button className={loading ? `btn-primary loading` : 'btn-primary'} disabled={invalid} onClick={onSubmitForm}>
                  <FormattedMessage {...messages.sendOTPButton} />
                </Button>
              </OnBoardingFormBody>
            </OnboardingForm>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

EnterPhonePage.defaultProps = {
  countryCode: '',
  phoneNumber: '',
  dispatch: undefined,
  handleSubmit: undefined,
  onSubmitForm: undefined,
  onChangeCountryCode: undefined,
  onChangePhoneNumber: undefined,
  loading: false,
  invalid: false,
};
EnterPhonePage.propTypes = {
  countryCode: PropTypes.any,
  phoneNumber: PropTypes.string,
  handleSubmit: PropTypes.func,
  onSubmitForm: PropTypes.func,
  loading: PropTypes.bool,
  invalid: PropTypes.bool,
  dispatch: PropTypes.func,
  onChangeCountryCode: PropTypes.func,
  onChangePhoneNumber: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCountryCode: evt => dispatch(actions.changeCountryCode(evt)),
    onChangePhoneNumber: evt => dispatch(actions.changePhoneNumber(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();

      dispatch(loadRepos());
      dispatch(actions.submitEnterPhonePageForm());
    },
  };
}
const mapStateToProps = createStructuredSelector({
  countryCode: selectors.makeSelectCountryCode(),
  phoneNumber: selectors.makeSelectPhoneNumber(),
  loading: makeSelectLoading(),
});

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
    destroyOnUnmount: false,
    touchOnChange: true,
  }),
)(EnterPhonePage);
