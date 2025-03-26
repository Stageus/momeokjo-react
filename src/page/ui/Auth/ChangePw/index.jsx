import React from "react"
import { useNavigate } from "react-router-dom"
import s from "./style"
import BackIcon from "../assets/ico-back.svg"
import Button from "../../../../shared/ui/Button"
import useAuthForm from "../../../../widget/Form/model/useAuthForm"


const ChangePw = () => {

  const navigate = useNavigate()
  const {
    setFormType,
    errors,
    values,
    handleChange,
    handleSubmit,
    changePwInputFields,
    isChangePwSuccess,
  } = useAuthForm(navigate)

  React.useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      alert("로그인이 필요합니다.")
      navigate("/login")
      return;
    }
    setFormType('changepw')
  }, [setFormType, navigate])

  React.useEffect(() => {
    if (isChangePwSuccess) {
      navigate('/login')
    }
  }, [isChangePwSuccess, navigate])

  const onClick = (e) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <>
    <s.Container>
      <s.Header>
        <s.Back onClick={() => navigate("/login")}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼"/>
        </s.Back>
        <s.Title>비밀번호 변경</s.Title>
        <s.Empty></s.Empty>
      </s.Header>
      <s.Form>
        {changePwInputFields.map((field, index) => (
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
            />
          </s.EmailContainer>
          {errors[field.name] && 
            <s.Message $error={!!errors[field.name]}>
              {errors[field.name]}
            </s.Message>
          }
        </s.InputBox>
        ))}

        <Button color="primary" size="largeUser" children={"비밀번호 변경"} onClick={onClick} />
      </s.Form>
    </s.Container>
    </>
  )
}

export default ChangePw