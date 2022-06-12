/*
 * StartProjectPage
 *
 * This is the first thing users see of our App, at the '/start-project' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { PrivateGrid } from 'components';
import { reduxForm, untouch, reset } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { EditorState } from 'draft-js';
import get from 'lodash/get';
import { createStructuredSelector } from 'reselect';
import StepWizard from 'react-step-wizard';
import Content from 'components/Content';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import StorageService from 'utils/StorageService';
import { defaultProps, propTypes } from 'containers/proptypes';
import reducer from './reducer';
import saga from './saga';
import { StepCard } from './styles';
import * as actions from './actions';
import { key } from './constants';
import * as selectors from './selectors';
import IntroStep from './IntroStep';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import messages from './messages';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class StartProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      transitions: {
        enterRight: 'animated enterRight',
        enterLeft: 'animated enterLeft',
        exitRight: 'animated exitRight',
        exitLeft: 'animated exitLeft',
        intro: 'animated intro',
      },
    };
  }

  componentDidMount() {
    const { onChangeProjectDecription, onChangeMessage } = this.props;
    onChangeProjectDecription(EditorState.createEmpty());
    onChangeMessage(EditorState.createEmpty());

    window.onbeforeunload = () => {
      StorageService.delete('stepCompleted');
    };
  }

  setInstance = SW => {
    const { state } = this;
    this.setState({
      ...state,
      SW,
    });
  };

  render() {
    const { transitions } = this.state;
    const { handleSubmit, location } = this.props;
    const checlURl = get(location, 'hash');
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <StepCard className="mb-0">
              {!/#step[0-9]/.test(checlURl) ? (
                <IntroStep hashKey="intro" />
              ) : (
                <form onSubmit={handleSubmit}>
                  <StepWizard
                    // onStepChange={onStepChange}
                    isLazyMount
                    transitions={transitions}
                    isHashEnabled
                    instance={this.setInstance}
                  >
                    <Step1 hashKey="step1" {...this.props} />
                    <Step2 hashKey="step2" {...this.props} />
                    <Step3 hashKey="step3" untouch={untouch} {...this.props} />
                    <Step4 hashKey="step4" {...this.props} />
                    <Step5 hashKey="step5" {...this.props} />
                    <Step6 hashKey="step6" {...this.props} />
                    <Step7 hashKey="step7" {...this.props} />
                  </StepWizard>
                </form>
              )}
            </StepCard>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

StartProjectPage.defaultProps = {};
StartProjectPage.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmitProjectDetailsForm: PropTypes.func,
  location: PropTypes.any,
};

const mapStateToProp = createStructuredSelector({
  name: selectors.makeSelectProjectName(),
  description: selectors.makeSelectProjectDescription(),
  buildStatus: selectors.makeSelectWorkProgress(),
  projectUrl: selectors.makeSelectProjectURL(),
  lookingForDesign: selectors.makeSelectUXDesign(),
  lookingForSoftwareDevelopment: selectors.makeSelectSoftwareDevelopment(),
  lookingForDevelopmentTeam: selectors.makeSelectDevelopmentTeam(),
  lookingForDataAiMl: selectors.makeSelectDataAiMi(),
  lookingForGrowthHacking: selectors.makeSelectGrowthHacking(),
  lookingForAgileCoach: selectors.makeSelectAgileCoach(),
  lookingForOther: selectors.makeSelectOther(),
  budget: selectors.makeSelectBudget(),
  messageToPreSales: selectors.makeSelectMessage(),
  speed: selectors.makeSelectProjectSpeed(),
  teamManageType: selectors.makeSelectManageTeam(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeProjectName: event => dispatch(actions.changeProjectName(event.target.value)),
    onChangeProjectDecription: data => dispatch(actions.changeProjectDescription(data)),
    onWorkProgressChange: event => {
      dispatch(actions.radioWorkProgress(event));
    },
    onChangeProjectURL: event => dispatch(actions.changeProjectURL(event.target.value)),
    onUXDesignChange: payload => {
      dispatch(actions.checkBoxUXDesign(payload));
    },
    onSoftwareDevelopmentChange: payload => {
      dispatch(actions.checkBoxSoftwareDevelopment(payload));
    },
    onDevelopmentTeamChange: payload => {
      dispatch(actions.checkBoxDevelopmentTeam(payload));
    },
    onDataAiMiChange: payload => {
      dispatch(actions.checkBoxDataAiMi(payload));
    },
    onGrowthHackingChange: payload => {
      dispatch(actions.checkBoxGrowthHacking(payload));
    },
    onAgileCoachChange: payload => {
      dispatch(actions.checkBoxAgileCoach(payload));
    },
    onChangeOther: event => dispatch(actions.changeOther(event.target.value)),
    onBudgetChange: event => {
      dispatch(actions.radioBudget(event));
    },
    onChangeMessage: data => dispatch(actions.changeMessage(data)),
    onProjectSpeedChange: event => {
      dispatch(actions.radioProjectSpeed(event));
    },
    onManageTeamChange: event => {
      dispatch(actions.radioManageTeam(event));
    },
    onSubmitProjectDetailsForm: event => {
      if (event !== undefined && event.preventDefault) event.preventDefault();
      dispatch(loadRepos());
      dispatch(
        actions.submitProjectDetailsForm('formSubmit', () => {
          dispatch(reset(key));
        }),
      );
    },
  };
}
const withConnect = connect(
  mapStateToProp,
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
    enableReinitialize: true,
    touchOnChange: true,
  }),
)(StartProjectPage);

StartProjectPage.defaultProps = defaultProps;
StartProjectPage.propTypes = propTypes;
