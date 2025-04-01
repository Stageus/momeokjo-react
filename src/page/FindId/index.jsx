import React from "react"
import { useNavigate } from "react-router-dom"
import s from "./style"
import Button from "../../shared/Button"
import useFindIdForm from "./model/useFinIdForm"
import Header from "../../widget/Header"

const FindId = () => {

  const navigate = useNavigate()
  const {
    errors, 
    values,
    handleFindId, 
    findIdInputFields, 
    isFindIdSuccess,
    foundId
  } = useFindIdForm()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    values.current[name] = value
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
    <Header 
        headerTitle="아이디 찾기"
        backNavigation={() => navigate('/login')}
      />
      <s.Form>
        {findIdInputFields.map((field, index) => (
          <s.InputBox key={index}>
            <s.Label>
              {field.label} <s.Span>*</s.Span>
            </s.Label>
              <s.Input
                type={field.type}
                name={field.name}
                $error={!!errors[field.name]}
                onChange={handleInputChange}
                defaultValue={values.current[field.name] || ""}
                placeholder={field.placeholder}
              />
            {errors[field.name] && (
              <s.Message $error={!!errors[field.name]}>
                {errors[field.name]}
              </s.Message>
            )}
          </s.InputBox>
        ))}
        <Button type="button" color="primary" size="largeUser" children={"아이디 찾기"} onClick={handleFindId} />
      </s.Form>
    </s.Container>
    {isFindIdSuccess && <s.Overlay></s.Overlay>}
    </>
  )
  
}

export default FindId