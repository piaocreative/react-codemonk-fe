import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'components';
import { userProfileIcon } from 'containers/App/constants';
import { UserImgList } from './styles';

function TeamImgList(props) {
  const { data, displayImgCount } = props;
  const remainingTalentCount = data.length - displayImgCount;
  return (
    <UserImgList>
      {data.slice(0, displayImgCount).map(i => (
        <li title={i.name} key={i.name}>
          <img
            src={i.profilePicture}
            className="img-fluid"
            alt={i.name}
            onError={e => {
              e.target.onerror = null;
              e.target.src = userProfileIcon;
            }}
          />
        </li>
      ))}
      {data.length > displayImgCount && (
        <li className="has-count" title={`${remainingTalentCount} more`} key={`${remainingTalentCount} more`}>
          <P className="p14 m-0">+{remainingTalentCount}</P>
        </li>
      )}
    </UserImgList>
  );
}

TeamImgList.defaultProps = {
  data: [],
  displayImgCount: 4,
};

TeamImgList.propTypes = {
  data: PropTypes.array,
  displayImgCount: PropTypes.number,
};

export default TeamImgList;
