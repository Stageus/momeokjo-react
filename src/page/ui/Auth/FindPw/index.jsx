import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../../../shared/ui/Button"
import useFindPwForm from "./model/useFindPwForm"
import Form from "../../../../widget/Form"

const FindPw = () => {

  const navigate = useNavigate()
  const {
    errors, 
    values, 
    handleChange, 
    handleFindPw, 
    findPwInputFields, 
    isFindPwSuccess,
  } = useFindPwForm(navigate)

  React.useEffect(() => {
    if (isFindPwSuccess) {
      navigate('/change-pw')
    }
  }, [isFindPwSuccess, navigate])

  const submitButton = (
    <Button type="button" color="primary" size="largeUser" children={"비밀번호 찾기"} onClick={handleFindPw} />
  )


  return(
    <Form 
      headerTitle="비밀번호 찾기"
      backNavigation={() => navigate('/login')}
      inputFields={findPwInputFields}
      errors={errors}
      values={values}
      handleChange={handleChange}
      submitButton={submitButton}
    />
  )

}

export default FindPw