import React from "react";
import { StyledButton, BtnLogin, HamburgerBtn, BtnRound, BtnAsideFold, FoldImg, BtnFullCustom } from "./style";

const Button = ({ children, variant = "primary", size = "medium", ...props }) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export { Button, BtnLogin, HamburgerBtn, BtnRound, BtnAsideFold, FoldImg, BtnFullCustom };
