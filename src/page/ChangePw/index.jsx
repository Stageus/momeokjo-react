import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../shared/ui/Button"
import useChangePwForm from "./model/useChangePwForm"
import Header from "../../widget/Header"
import s from "./style"


const ChangePw = () => {

  const navigate = useNavigate()

  const {
    errors, 
    values, 
    handleChange, 
    handleChangePw, 
    changePwInputFields, 
    isChangePwSuccess,
  } = useChangePwForm()

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

  return (
    <s.Container>
      <Header 
        headerTitle="비밀번호 변경"
        backNavigation={() => navigate('/find-id')}
      />
      <s.Form>
        {changePwInputFields.map((field, index) => (
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
                placeholder={field.placeholder || ""}
              />
            {errors[field.name] && (
              <s.Message $error={!!errors[field.name]}>
                {errors[field.name]}
              </s.Message>
            )}
          </s.InputBox>
        ))}
        <Button type="button" color="primary" size="largeUser" children={"비밀번호 변경"} onClick={handleChangePw} />
      </s.Form>
    </s.Container>
  )
}

export default ChangePw