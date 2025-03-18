import StyledButton from "./style";

const Button = ({ children, color = "default", size = "medium", selected, disabled, ...props }) => {
  return (
    <StyledButton 
      color={color} 
      size={size} 
      selected={selected}
      disabled={disabled}
      {...props}
      >
      {children}
    </StyledButton>
  )
}

export default Button
