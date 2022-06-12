/*
 * SkillsList
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'components';

function SkillsList(props) {
  const { skills = [] } = props;
  return (
    <>
      {skills.length > 0 && (
        <div className="d-flex flex-wrap mb-3">
          {skills.map(subItem => (
            <Badge key={subItem} className="secondary badge-sm me-2 mb-1">
              {subItem}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}

SkillsList.defaultProps = {
  skills: [],
};

SkillsList.propTypes = {
  skills: PropTypes.array,
};

export default SkillsList;
