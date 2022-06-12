import React, { Component } from 'react';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { NotificationCardSkeleton } from 'components/SkeletonLoader';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { VALIDATION } from 'utils/constants';
import { defaultProps, propTypes } from 'containers/proptypes';
import { API_URL, NOTIFICATION, LIST, MARK_READ, notificationIcon } from 'containers/App/constants';
import { DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { ToastifyMessage, P, Badge } from 'components';
import { NotificationsWrapper } from 'components/Header/header-style';
import { redirectToType } from 'containers/App/utils';
import { notificationRedirectTo, notificationTimeAgo } from './utils';
import messages from './messages';
import { notificationPage, notificationPageLimit } from './constants';

export class Notifications extends Component {
  constructor(props) {
    super(props);

    const userType = StorageService.get('userType');
    this.state = {
      isListLoading: false,
      notiDropdownOpen: false,
      notificationList: [],
      userType,
    };
  }

  loadNotifications = () => {
    this.setState({ isListLoading: true });
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${NOTIFICATION}${LIST}?page=${notificationPage}&limit=${notificationPageLimit}`;
    request(requestURL, data)
      .then(this.setNotificationDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setNotificationDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;
      this.setState({ isListLoading: false, notificationList: get(data, 'docs', []) });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  notificationToggle = () => {
    const { notiDropdownOpen } = this.state;
    if (!notiDropdownOpen) {
      this.loadNotifications();
    }
    this.setState(prevState => ({
      notiDropdownOpen: !prevState.notiDropdownOpen,
    }));
  };

  makeReadNotification = (body = {}) => {
    const data = { method: 'PUT', body };
    const requestURL = `${API_URL}${NOTIFICATION}${MARK_READ}`;
    request(requestURL, data)
      .then(this.loadNotifications)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  handleNotificationClick = (id, link) => {
    redirectToType(link);
    const body = { id };
    this.makeReadNotification(body);
  };

  renderNotificationCard = notification => {
    const { userType } = this.state;
    const id = get(notification, '_id');
    const notificationType = get(notification, 'notificationType');
    const readNotification = get(notification, 'isRead') ? 'read' : 'unread';
    const { link, icon, subTitle } = notificationRedirectTo(userType, notificationType);
    const timeAgo = notificationTimeAgo(get(notification, 'createdAt'));
    return (
      <DropdownItem tag="button" className={readNotification} onClick={() => this.handleNotificationClick(id, link)}>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <div className="action-item d-flex mb-2 mb-md-3">
              <SVG src={icon} className="me-2" />
              <P className="p14 mb-0 text-primary">{subTitle}</P>
            </div>
            <P className="p14 mb-0" opacityVal="0.5">
              {timeAgo}
            </P>
          </div>
          <P className="p16" opacityVal={readNotification === 'unread' ? '1' : '0.7'}>
            {notification.message}
          </P>
        </div>
      </DropdownItem>
    );
  };

  renderNotifications = () => {
    const { notificationList, isListLoading } = this.state;
    let output = '';
    if (isListLoading) {
      output = <NotificationCardSkeleton cardCount={2} />;
    } else if (notificationList.length === 0) {
      output = <P className="text-center text-muted mb-0 py-4">{messages.noNotification.defaultMessage}</P>;
    } else {
      output = notificationList.map(notification => <React.Fragment>{this.renderNotificationCard(notification)}</React.Fragment>);
    }
    return output;
  };

  render() {
    const { notiDropdownOpen, notificationList } = this.state;
    const { newNotification } = this.props;
    const notificationBellClass = newNotification ? 'noty-dot' : '';
    return (
      <React.Fragment>
        <NotificationsWrapper isOpen={notiDropdownOpen} className={`nav-link ${notificationBellClass}`} toggle={this.notificationToggle}>
          <DropdownToggle>
            <SVG src={notificationIcon} />
          </DropdownToggle>
          <DropdownMenu right>
            <div className="notification-header">
              <div className="inner-block">
                <div className="d-flex align-items-center">
                  <P className="p20 mb-0">{messages.notificationsLabel.defaultMessage}</P>
                  <Badge className="primary badge-sm ms-2">{get(notificationList, 'length', 0)}</Badge>
                </div>
                {get(notificationList, 'length', 0) > 0 && (
                  <button type="button" className="mark-read-btn" onClick={() => this.makeReadNotification()}>
                    {messages.markAllRead.defaultMessage}
                  </button>
                )}
              </div>
            </div>
            <div className="notification-body">{this.renderNotifications()}</div>
          </DropdownMenu>
        </NotificationsWrapper>
      </React.Fragment>
    );
  }
}

Notifications.defaultProps = defaultProps;
Notifications.propTypes = propTypes;

export default Notifications;
