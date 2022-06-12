import React from 'react';
import get from 'lodash/get';
import { talentProfileRedirect } from 'containers/App/utils';
import history from 'utils/history';
import { userProfileIcon } from 'containers/App/constants';
import { defaultProps, propTypes } from 'containers/proptypes';
import { TalentNameBtn } from './styles';

export const imgError = e => {
  e.target.onerror = null;
  e.target.src = userProfileIcon;
};

export const TalentNameButton = props => {
  const { redirectTo, talentId, redirectType, talentName } = props;
  const extra = get(props, 'extra', {});
  const profilePicture = get(props, 'profilePicture', '');

  return (
    <TalentNameBtn
      type="button"
      className="btn-link"
      onClick={() => talentProfileRedirect(history, redirectTo, talentId, redirectType, extra)}
    >
      <img src={`${profilePicture}?_t=${new Date().getTime()}`} alt="user profile" onError={imgError} />
      <span className="ms-2">{talentName}</span>
    </TalentNameBtn>
  );
};

TalentNameButton.defaultProps = defaultProps;
TalentNameButton.propTypes = propTypes;

export default TalentNameButton;
