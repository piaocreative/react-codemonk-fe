import PropTypes from 'prop-types';

export const propTypes = {
  dispatch: PropTypes.any,
  handleSubmit: PropTypes.func,

  experiences: PropTypes.array,

  invalid: PropTypes.any,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  onReset: PropTypes.func,
  history: PropTypes.object,

  onChangeExperience: PropTypes.func,
  onSaveForLater: PropTypes.func,
  onSubmitExperienceForm: PropTypes.func,

  handleChangeJobTitle: PropTypes.func,
  handleChangeEmploymentType: PropTypes.func,
  handleChangeEmployer: PropTypes.func,
  handleChangeCountry: PropTypes.func,
  handleChangeStartDate: PropTypes.func,
  handleChangeEndDate: PropTypes.func,
  handleChangeShortDescription: PropTypes.func,
  onDeleteForm: PropTypes.func,
};
