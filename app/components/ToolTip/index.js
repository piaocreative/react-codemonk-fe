/*
 * ToolTip
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import SVG from 'react-inlinesvg';
import { infoIcon } from 'containers/App/constants';

function ToolTip(props) {
  const [tooltipOpen, setTooltip] = useState(false);

  const tooltipToggle = useCallback(() => {
    setTooltip(!tooltipOpen);
  }, [tooltipOpen]);

  const { title, content, wrapperClass, titleClass, placement, type = 'info', otherIcon, tooltipId = 'TooltipExample' } = props;

  return (
    <div className={wrapperClass}>
      <div href="#" id={tooltipId} className={titleClass}>
        {title}
        {type === 'info' ? <SVG src={infoIcon} /> : <SVG src={otherIcon} />}
      </div>
      <Tooltip placement={placement} isOpen={tooltipOpen} target={tooltipId} toggle={() => tooltipToggle(tooltipOpen)}>
        {content}
      </Tooltip>
    </div>
  );
}

ToolTip.defaultProps = {
  title: '',
  content: '',
  wrapperClass: '',
  titleClass: '',
  placement: 'right',
  type: 'info',
  tooltipId: 'TooltipExample',
  otherIcon: infoIcon,
};

ToolTip.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  wrapperClass: PropTypes.string,
  titleClass: PropTypes.string,
  placement: PropTypes.string,
  type: PropTypes.string,
  tooltipId: PropTypes.string,
  otherIcon: PropTypes.any,
};

export default ToolTip;
