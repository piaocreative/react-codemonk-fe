import PropTypes from 'prop-types';

export const propTypes = {
  dispatch: PropTypes.any,
  handleSubmit: PropTypes.func,

  email: PropTypes.string,
  password: PropTypes.string,

  invalid: PropTypes.any,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  onReset: PropTypes.func,
  history: PropTypes.object,

  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onSubmitLogin: PropTypes.func,
};
