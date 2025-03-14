import React from "react";
import PropTypes from "prop-types";
import s from "./style";

const Button = ({ variant = "default", children, ...props }) => {
  return (
    <s.ButtonStyle variant={variant} {...props}>
      {children}
    </s.ButtonStyle>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["AsideModal", "Round", "default"]),
  children: PropTypes.node.isRequired,
};

export default Button;

