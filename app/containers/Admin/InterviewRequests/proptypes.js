import PropTypes from 'prop-types';

export const defaultProps = {
  dispatch: '',
  invalid: '',
  loading: false,
  responseSuccess: false,
  responseError: false,
};
export const propTypes = {
  history: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dispatch: PropTypes.any,
  invalid: PropTypes.any,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSaveForLater: PropTypes.func,
};
