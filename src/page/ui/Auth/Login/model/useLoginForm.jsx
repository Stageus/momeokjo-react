import { useState, useCallback } from 'react';

const useLoginForm = (navigate) => {
  // 입력 필드 정보
  const inputFields = [
    { label: "아이디", type: "text", name: "id", placeholder: "아이디를 입력하세요" },
    { label: "비밀번호", type: "password", name: "password", placeholder: "비밀번호를 입력하세요" },
  ]

  // 에러 상태 관리
  const [errors, setErrors] = useState({})

  // 입력 값 상태 관리
  const [values, setValues] = useState({
    id: '',
    password: '',
  })

  // 정규표현식
  const idRegex = /^[a-zA-Z0-9]{1,50}$/
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }, [])

  // 유효성 검사 함수
  const validate = useCallback((id, password) => {

    const newErrors = {}

    if (!idRegex.test(id)) {
      newErrors.id = "50자 이하 / 영어, 숫자 조합으로 입력해주세요."
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = "8~32자 이하, 영대문자 1자 이상, 특수문자 1자 이상, 영소문자, 숫자 조합으로 입력해주세요."
    }

    return newErrors
  }, [])

  // 로그인 처리 함수
  const handleLogin = useCallback(async () => {
    const { id, password } = values

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
  }, [values, navigate])

  // 폼 제출 처리 함수
  const handleSubmit = useCallback((e) => { // navigate 추가
    e.preventDefault();

    const { id, password } = values;
    const newErrors = validate(id, password);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      // 정규 표현식 검사에 통과하면 에러 상태 초기화
      setErrors({});
    }

    handleLogin(); // handleLogin 호출
  }, [validate, values, handleLogin]);

  return {
    inputFields,
    errors,
    values,
    handleChange,
    handleSubmit,
  }
}

export default useLoginForm
