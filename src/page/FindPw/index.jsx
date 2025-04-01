import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../shared/Button"
import useFindPwForm from "./model/useFindPwForm"
import Header from "../../widget/Header"
import s from "./style"

const FindPw = () => {

  const navigate = useNavigate()
  const {
    errors, 
    values,
    handleFindPw, 
    findPwInputFields, 
    isFindPwSuccess,
  } = useFindPwForm()

  // 입력값 변경
  const handleInputChange = (e) => {
    const { name, value } = e.target
    values.current[name] = value
  }


  useEffect(() => {
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
                onChange={handleInputChange}
                defaultValue={values.current[field.name] || ""}
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