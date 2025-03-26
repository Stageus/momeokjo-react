import s from "./style"
import PropTypes from "prop-types"

const Form = ({ children, onSubmit}) => {
  <s.Form onSubmit={onSubmit}>
    {children}
  </s.Form>
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
}

export default Form