import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLoginForm = () => {
  // 입력 필드 정보
  const inputFields = [
    { label: "아이디", type: "text", refName: "id", placeholder: "아이디를 입력하세요" },
    { label: "비밀번호", type: "password", refName: "password", placeholder: "비밀번호를 입력하세요" },
  ]

  // ref 객체 생성
  const idRef = useRef(null)
  const passwordRef = useRef(null)

  const refs = {
    id: idRef,
    password: passwordRef,
  }

  // 에러 상태 관리
  const [errors, setErrors] = useState({})

  const idRegex = /^[a-zA-Z0-9]{1,50}$/
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/

  // 로그인 처리 함수
  const validate = (id, password) => {

    const newErrors = {}

    if (!idRegex.test(id)) {
      newErrors.id = "50자 이하 / 영어, 숫자 조합으로 입력해주세요."
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = "8~32자 이하, 영대문자 1자 이상, 특수문자 1자 이상, 영소문자, 숫자 조합으로 입력해주세요."
      console.log(password)
    }

    return newErrors
  }

  const handleLogin = async (e, navigate) => {
    e.preventDefault()

    const id = idRef.current?.value
    const password = passwordRef.current?.value

    const newErrors = validate(id, password)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    } else {
      // 정규 표현식 검사에 통과하면 에러 상태 초기화
      setErrors({})
    }

    // ** 임시 프론트엔드 테스트용 **
    if(id === "zxc422523" && password === "Tlswotjq04@") {
      alert("로그인 성공 (임시)")
      navigate("/")
      return
    } else {
      alert("로그인 실패 (임시): 아이디 또는 비밀번호가 일치하지 않습니다.")
      return
    }

    // ** [백엔드 API 연결 후 로직] **
    // try {
    //   // API 요청
    //   const response = await fetch("/api/login", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ 
    //       id: id, 
    //       pw: password 
    //     })
    //   })

    //   const data = await response.json()

    //   switch (response.status) {
    //     case 200:
    //       alert("로그인에 성공하였습니다.")
    //       break
    //     case 400:
    //       alert(data.message || "입력값에 문제가 있습니다.")
    //       break
    //     case 409:
    //       alert(data.message || "이미 존재하는 아이디입니다.")
    //       break
    //     case 500:
    //       alert(data.message || "알 수 없는 오류로 동작할 수 없습니다.")
    //       break
    //     default:
    //       alert("로그인에 실패했습니다.")
    //       break
    //   }
    // } catch (error) {
    //     console.error("로그인 에러:", error)
    //     alert("로그인 중 오류가 발생했습니다.")
    // }
  }  

  return {
    inputFields,
    refs,
    errors,
    setErrors,
    handleLogin,
  }
}

export default useLoginForm
