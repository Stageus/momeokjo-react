import React from "react"
import { useNavigate } from "react-router-dom"
import s from "./style"
import BackIcon from "../assets/ico-back.svg"
import Button from "../../../../shared/ui/Button"
import useAuthForm from "../../../../widget/Form/model/useAuthForm"

const FindId = () => {

  const navigate = useNavigate()
  const {
    setFormType,
    errors,
    values,
    handleChange,
    handleSubmit,
    findidInputFields,
    isFindIdSuccess,
    foundId,
  } = useAuthForm(navigate)

  React.useEffect(() => {
    setFormType('findid')
  }, [setFormType])

  const onClick = (e) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <>
    {isFindIdSuccess && 
      <s.Modal>
        <s.ModalTitle>아이디 확인</s.ModalTitle>
        <s.ModalText>회원님의 아이디는 <s.ModalSpan>{foundId}</s.ModalSpan>입니다.</s.ModalText>
        <Button color="primary" size="largeMap" children={"확인"} onClick={() => navigate("/login")} />
      </s.Modal>
    }
    
    <s.Container>
      <s.Header>
        <s.Back onClick={() => navigate("/login")}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼"/>
        </s.Back>
        <s.Title>아이디 찾기</s.Title>
        <s.Empty></s.Empty>
      </s.Header>
      <s.Form>
        {findidInputFields.map((field, index) => (
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
              placeholder={field.placeholder}
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

        <Button color="primary" size="largeUser" children={"아이디 찾기"} onClick={onClick} />
      </s.Form>
      {isFindIdSuccess &&
        <s.Overlay></s.Overlay>
      }
    </s.Container>
    </>
  )
  
}

export default FindId