import StyledButton from "./style";

const Button = ({ children, color = "default", size = "medium", ...props }) => {
  return (
    <StyledButton color={color} size={size} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
