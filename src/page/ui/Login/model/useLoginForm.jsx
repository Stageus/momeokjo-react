import { useRef, useState } from 'react';

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
  const [errors, setErrors] = useState({
    id: null,
    password: null,
  })

  // 로그인 처리 함수
  const handleLogin = () => {
    // 유효성 검사 로직 (예시)
    const newErrors = {}
    if (!idRef.current?.value) {
      newErrors.id = "아이디를 입력해주세요."
    }
    if (!passwordRef.current?.value) {
      newErrors.password = "비밀번호를 입력해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // 로그인 API 호출 또는 다른 로직
    console.log("로그인 시도:", idRef.current.value, passwordRef.current.value);
    // ... 로그인 로직 ...
  }

  return {
    inputFields,
    refs,
    errors,
    setErrors,
    handleLogin,
    idRef, // ref도 반환합니다. 필요한 경우 사용
    passwordRef // ref도 반환합니다. 필요한 경우 사용
  }
}

export default useLoginForm;
