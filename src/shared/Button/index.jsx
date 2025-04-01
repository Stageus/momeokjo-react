import StyledButton from "./style";

const Button = ({ children, color, size, shape, icon, ...props }) => {
  return (
    <StyledButton color={color} size={size} shape={shape} {...props}>
      {icon && <img src={icon} alt="아이콘" style={{width: '100%'}}/>}
      {children}
    </StyledButton>
  )
}

export default Button
