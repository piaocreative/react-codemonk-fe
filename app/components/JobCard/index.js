/*
 * JobCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { redirectTo } from 'containers/App/utils';
import ClientJobCard from './ClientJobCard';
import TalentJobCard from './TalentJobCard';
import { JobCardBlock } from './styles';

function JobCard(props) {
  const { jobList = [], history, userRole } = props;
  return (
    <>
      {jobList.map(obj => (
        <JobCardBlock
          className="mb-10"
          key={get(obj, '_id')}
          onClick={() => redirectTo(history, `/${userRole}/brief-detail/${get(obj, '_id')}`)}
        >
          {userRole === 'client' || userRole === 'admin' ? <ClientJobCard jobBriefData={obj} {...props} /> : ''}
          {userRole === 'talent' ? <TalentJobCard jobBriefData={obj} {...props} /> : ''}
        </JobCardBlock>
      ))}
    </>
  );
}

JobCard.defaultProps = {
  jobList: [],
  history: {},
  userRole: 'admin',
};

JobCard.propTypes = {
  jobList: PropTypes.array,
  history: PropTypes.object,
  userRole: PropTypes.string,
};

export default JobCard;
