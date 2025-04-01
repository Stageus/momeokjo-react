import React from "react"
import { useNavigate } from "react-router-dom"
import s from "./style"
import Button from "../../shared/ui/Button"
import useFindIdForm from "./model/useFinIdForm"
import Form from "../../widget/Form"

const FindId = () => {

  const navigate = useNavigate()
  const {
    errors, 
    values, 
    handleChange, 
    handleFindId, 
    findIdInputFields, 
    isFindIdSuccess,
    foundId
  } = useFindIdForm(navigate)

  const submitButton = (
    <Button type="button" color="primary" size="largeUser" children={"아이디 찾기"} onClick={handleFindId} />
  )

  return (
    <>
    {isFindIdSuccess && 
      <s.Modal>
        <s.ModalTitle>아이디 확인</s.ModalTitle>
        <s.ModalText>회원님의 아이디는 <s.ModalSpan>{foundId}</s.ModalSpan>입니다.</s.ModalText>
        <Button color="primary" size="largeMap" children={"확인"} onClick={() => navigate("/login")} />
      </s.Modal>
    }
    <Form 
      headerTitle="아이디 찾기"
      backNavigation={() => navigate("/login")}
      inputFields={findIdInputFields}
      errors={errors}
      values={values}
      handleChange={handleChange}
      submitButton={submitButton}
    />
    {isFindIdSuccess && <s.Overlay></s.Overlay>}
    </>
  )
  
}

export default FindId