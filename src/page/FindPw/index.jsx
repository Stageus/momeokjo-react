import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../shared/ui/Button"
import useFindPwForm from "./model/useFindPwForm"
import Header from "../../widget/Header"
import s from "./style"

const FindPw = () => {

  const navigate = useNavigate()
  const {
    errors, 
    values, 
    handleChange, 
    handleFindPw, 
    findPwInputFields, 
    isFindPwSuccess,
  } = useFindPwForm()

  React.useEffect(() => {
    if (isFindPwSuccess) {
      navigate('/change-pw')
    }
  }, [isFindPwSuccess, navigate])


  return(
    <s.Container>
      <Header 
        headerTitle="비밀번호 찾기"
        backNavigation={() => navigate('/login')}
      />
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
                placeholder={field.placeholder || ""}
              />
            {errors[field.name] && (
              <s.Message $error={!!errors[field.name]}>
                {errors[field.name]}
              </s.Message>
            )}
          </s.InputBox>
        ))}
        <Button type="button" color="primary" size="largeUser" children={"비밀번호 찾기"} onClick={handleFindPw} />
      </s.Form>
    </s.Container>
  )

}

export default FindPw