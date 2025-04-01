import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../shared/ui/Button"
import useChangePwForm from "./model/useChangePwForm"
import Form from "../../widget/Form"


const ChangePw = () => {

  const navigate = useNavigate()

  const {
    errors, 
    values, 
    handleChange, 
    handleChangePw, 
    changePwInputFields, 
    isChangePwSuccess,
  } = useChangePwForm(navigate)

  React.useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      alert("로그인이 필요합니다.")
      navigate("/login")
      return
    }
  }, [navigate])

  React.useEffect(() => {
    if (isChangePwSuccess) {
      navigate('/login')
    }
  }, [isChangePwSuccess, navigate])

  const submitButton = (
    <Button type="button" color="primary" size="largeUser" children={"비밀번호 변경"} onClick={handleChangePw} />
  )

  return (
    <Form 
      headerTitle="비밀번호 변경"
      backNavigation={() => navigate('/find-id')}
      inputFields={changePwInputFields}
      errors={errors}
      values={values}
      handleChange={handleChange}
      submitButton={submitButton}
    />
  )
}

export default ChangePw