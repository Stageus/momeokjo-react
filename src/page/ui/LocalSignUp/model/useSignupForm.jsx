import { useRef, useState } from 'react';

const useSignUpForm = () => {
  // 입력 필드 정보
  const inputFields = [
    { label: "아이디", type: "text", refName: "id"},
    { label: "비밀번호", type: "password", refName: "password"},
    { label: "비밀번호 확인", type: "password", refName: "confirmPassword"},
    { label: "닉네임", type: "text", refName: "nickname"},
    { label: "이메일", type: "email", refName: "email" }
  ]

  // ref 객체 생성
  const idRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const nicknameRef = useRef(null)
  const emailRef = useRef(null)
  
  const refs = {
    id: idRef,
    password: passwordRef,
    confirmPassword: confirmPasswordRef,
    nickname: nicknameRef,
    email: emailRef
  }

  // 에러 상태 관리
  const [errors, setErrors] = useState({})

  const idRegex = /^[a-zA-Z0-9]{1,50}$/
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/
  const nicknameRegex = /^[a-zA-Z0-9가-힣]{1,50}$/
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // 회원가입 처리 함수
  const handleSignUp = () => {
    const newErrors = {}
    if (!idRef.current?.value) {
      newErrors.id = "아이디를 입력해주세요."
    } else if (!idRegex.test(idRef.current.value)) {
      newErrors.id = "50자 이하 / 영어, 숫자 조합으로 입력해주세요"
    }
    if (!passwordRef.current?.value) {
      newErrors.password = "비밀번호를 입력해주세요."
    } else if (!passwordRegex.test(passwordRef.current.value)) {
      newErrors.password = "8~32자 이하, 영대문자 1자 이상, 특수문자 1자 이상, 영소문자, 숫자 조합으로 입력해주세요."
    }
    if (!confirmPasswordRef.current?.value) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요."
    } else if (confirmPasswordRef.current?.value !== passwordRef.current?.value) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
    }
    if (!nicknameRef.current?.value) {
      newErrors.confirmPassword = "닉네임을 입력해주세요."
    } else if (!nicknameRegex.test(nicknameRegex.current.value)) {
      newErrors.nickname = "50자 이하 / 한글, 영어, 숫자 포함으로 입력해주세요."
    }
    if (!emailRef.current?.value) {
      newErrors.email = "이메일을 입력해주세요."
    } else if (!emailRegex.test(emailRef.current.value)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // 회원가입 API 호출 또는 다른 로직
    console.log("회원가입 시도:", {
      id: idRef.current.value,
      password: passwordRef.current.value,
      nickname: nicknameRef.current.value,
      email: emailRef.current.value,
    });
  };

  return {
    inputFields,
    refs,
    errors,
    setErrors,
    handleSignUp
  };
};

export default useSignUpForm;
