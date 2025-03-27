import React from "react"
import s from "./style"
import BackIcon from "./assets/ico-back.svg"

const Form = ({
  headerTitle,
  backNavigation,
  inputFields,
  errors,
  values,
  handleChange,
  submitButton,
  children,
}) => {
  return (
    <s.Container>
      <s.Header>
        <s.Back onClick={backNavigation}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼" />
        </s.Back>
        <s.Title>{headerTitle}</s.Title>
        <s.Empty />
      </s.Header>
      <s.Form>
        {inputFields.map((field, index) => (
          <s.InputBox key={index}>
            <s.Label>
              {field.label} <s.Span>*</s.Span>
            </s.Label>
            <s.EmailContainer>
              <s.Input
                type={field.type}
                name={field.name}
                $error={!!errors[field.name]}
                onChange={handleChange}
                value={values[field.name] || ""}
                placeholder={field.placeholder || ""}
              />
            </s.EmailContainer>
            {errors[field.name] && (
              <s.Message $error={!!errors[field.name]}>
                {errors[field.name]}
              </s.Message>
            )}
          </s.InputBox>
        ))}
        {submitButton}
        {children}
      </s.Form>
    </s.Container>
  )
}

export default Form