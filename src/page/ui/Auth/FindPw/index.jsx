import React from "react"
import { useNavigate } from "react-router-dom"
import s from "./style"
import BackIcon from "../assets/ico-back.svg"
import Button from "../../../../shared/ui/Button"
import useAuthForm from "../../../../widget/Form/model/useAuthForm"

const FindPw = () => {

  const navigate = useNavigate()
  const {
    setFormType,
    errors,
    values,
    handleChange,
    handleSubmit,
    findPwInputFields,
    isFindPwSuccess,
  } = useAuthForm(navigate)

  React.useEffect(() => {
    setFormType('findpw')
  }, [setFormType])

  React.useEffect(() => {
    if (isFindPwSuccess) {
      navigate('/change-pw')
    }
  }, [isFindPwSuccess, navigate])

  const onClick = (e) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return(
    <s.Container>
      <s.Header>
        <s.Back onClick={() => navigate("/login")}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼"/>
        </s.Back>
        <s.Title>비밀번호 찾기</s.Title>
        <s.Empty></s.Empty>
      </s.Header>
      <s.Form>
        {findPwInputFields.map((field, index) => (
          <s.InputBox key={index}>
          <s.Label>
            {field.label} <s.Span>*</s.Span>
          </s.Label>
          <s.Input 
            type={field.type}
            name={field.name}
            $error={!!errors[field.name]}
            onChange={handleChange}
            value={values[field.name] || ""}
          />
          {errors[field.name] && (
            <s.Message $error={!!errors[field.name]}>
          {errors[field.name]}
            </s.Message>
          )}
        </s.InputBox>
        ))}

        <Button color="primary" size="largeUser" children={"비밀번호 찾기"} onClick={onClick} />
      </s.Form>
    </s.Container>
  )

}

export default FindPw