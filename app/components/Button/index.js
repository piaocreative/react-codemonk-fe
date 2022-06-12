/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import StyledButton from './StyledButton';
import StyledLink from './StyledLink';

function Button(props) {
  let button = (
    <StyledButton className={props.btnClassName} {...props}>
      {Children.toArray(props.children)}
    </StyledButton>
  );
  // Render an anchor tag
  if (props.buttonAsLink) {
    button = (
      <StyledLink to={props.href} className={props.btnClassName}>
        {Children.toArray(props.children)}
      </StyledLink>
    );
  }

  return button;
}

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
  color: PropTypes.string,
  btnClassName: PropTypes.string,
};

export default Button;
