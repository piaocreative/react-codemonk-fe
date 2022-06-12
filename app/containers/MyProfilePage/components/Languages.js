/** Skills Page
 * This is the Skills page for the App, at the '/my-profile' route
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import get from 'lodash/get';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import SVG from 'react-inlinesvg';
import { Card, P, Badge, ProgressMod } from 'components';
import { gtm } from 'utils/Helper';
import { editNoteIcon, languageIcon } from 'containers/App/constants';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import { LanguageRating } from 'components/UserProfileComponents/LanguageRating';
import { SkillListing } from 'containers/Talent/Dashboard/styles';
import { propTypes } from 'containers/proptypes';
import * as actions from 'containers/Auth/PersonalDetails/actions';
import reducer from 'containers/Auth/PersonalDetails/reducer';
import saga from 'containers/Auth/PersonalDetails/saga';
import * as selectors from 'containers/Auth/PersonalDetails/selectors';
import { key } from 'containers/Auth/PersonalDetails/constants';
import { redirectPageURL } from 'containers/App/utils';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import { CardHeader, ActionIconLink } from '../styles';
import PopupWrapper from '../PopupWrapper';
import { modals } from '../constants';
import messages from '../messages';
import { languageLabel } from './utils';

export class Languages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPersonalLanguageModal: false };
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga, loadProfileData, currentModal, modalClose } = this.props;

    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.Languages) {
      this.setState({ showPersonalLanguageModal: false });
      modalClose();
      loadProfileData();
    }
  }

  handlePersonalLanguageOpenModal = () => {
    const { onChangeLanguage, modalOpen } = this.props;
    const languages = jsonCopy(get(this.props, 'data', []));
    onChangeLanguage(languages);
    this.setState({
      showPersonalLanguageModal: true,
    });
    modalOpen(modals.Languages);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Languages',
      value: 1,
    });
  };

  handlePersonalLanguageCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showPersonalLanguageModal: false });
    modalClose();
  };

  render() {
    const {
      handleSubmit,
      loading,
      responseSuccess,
      responseError,
      invalid,
      onChangeLanguage,
      onSubmitPersonalDetailsForm,
      role,
    } = this.props;
    const { showPersonalLanguageModal } = this.state;
    return (
      <React.Fragment>
        <Card className="p-30">
          <CardHeader>
            <div className="d-flex align-items-center">
              <SVG src={languageIcon} className="me-2 title-icon" />
              <P className="p20 mb-0">
                <FormattedMessage {...messages.titleLanguages} />
              </P>
            </div>
            {(role === '1' || role === '3') && (
              <ActionIconLink to={{ pathname: redirectPageURL(1), state: { fromMyProfile: true } }}>
                <SVG src={editNoteIcon} />
              </ActionIconLink>
            )}
            {/* <ActionIcon type="button" onClick={() => this.handlePersonalLanguageOpenModal()}>
                <SVG src={editNoteIcon} />
              </ActionIcon> */}
          </CardHeader>
          <SkillListing className="mt-0">
            {get(this.props, 'data', []).map(item => (
              <li key={item.name}>
                <div className="d-flex">
                  <Badge className="badge-sm primary">{languageLabel(item)}</Badge>
                </div>
                <ProgressMod value={item.rate} max={10} className="sm ms-auto" />
              </li>
            ))}
          </SkillListing>
        </Card>
        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showPersonalLanguageModal}
          onDiscard={this.handlePersonalLanguageCloseModal}
          modalType="edit"
          onHandleSubmit={handleSubmit(e => {
            onSubmitPersonalDetailsForm(e);

            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Languages',
              value: 1,
            });
          })}
          title={messages.modelEditPersonalLanguageHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <LanguageRating
              language={get(this.props, 'data', [])}
              onChangeLanguage={onChangeLanguage}
              formKey={key}
              size="sm"
              {...this.props}
            />
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }
}

Languages.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  language: selectors.makeSelectLanguage(),

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeLanguage: language => dispatch(actions.changeLanguage(language)),
    onSubmitPersonalDetailsForm: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.submitPersonalDetailsForm('editLanguageRating'));
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
)(Languages);
