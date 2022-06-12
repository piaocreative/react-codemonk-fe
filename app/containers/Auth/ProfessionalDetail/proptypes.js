import PropTypes from 'prop-types';

export const propTypes = {
  dispatch: PropTypes.any,
  handleSubmit: PropTypes.func,
  onSubmitProfessionalForm: PropTypes.func,

  invalid: PropTypes.any,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  onReset: PropTypes.func,
  history: PropTypes.object,

  brief: PropTypes.any,
  linkedInProfile: PropTypes.string,
  githubProfile: PropTypes.string,
  stackoverflowProfile: PropTypes.string,

  onChangeLinkedInProfile: PropTypes.func,
  onChangeGithubProfile: PropTypes.func,
  onChangeStackoverflowProfile: PropTypes.func,
  onSaveForLater: PropTypes.func,

  onChangeBrief: PropTypes.func,
  onChangeSkills: PropTypes.func,
};
