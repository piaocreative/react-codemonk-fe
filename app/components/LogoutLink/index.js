import React from 'react';
import { compose } from 'redux';
import { logout, gtm, getUserRegisterType } from 'utils/Helper';
import { defaultProps, propTypes } from 'containers/proptypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from 'containers/App/actions';

export class LogoutLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * call on logout link
   * @author Innovify
   */
  callLogout = () => {
    // GTM
    gtm({ action: 'Button Click', label: 'user_logout', category: `${getUserRegisterType()} Portal`, directGA: true });

    const { dispatch, onClick } = this.props;
    dispatch(userLogout());
    logout();
    window.location.reload();
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <button type="button" className="dropdown-item" onKeyPress={this.callLogout} onClick={this.callLogout}>
        {children}
      </button>
    );
  }
}

LogoutLink.defaultProps = defaultProps;
LogoutLink.propTypes = propTypes;

export default compose(connect())(withRouter(LogoutLink));
