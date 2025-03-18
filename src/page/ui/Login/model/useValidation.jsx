import { useRef, useState } from "react";

const useValidation = (type) => {
  const idRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const nicknameRef = useRef(null)
  const emailRef = useRef(null)

  const [errors, setErrors] = useState({
    id: false,
    password: false,
    confirmPassword: false,
    nickname: false,
    email: false,
  })

  // 개별 필드 유효성 검사
  const validateField = (name, value) => {
    let isValid = true

    switch (name) {
      case "id":
        isValid = /^(?=.*[a-zA-Z0-9])^[a-zA-Z0-9]{1,50}$/.test(value)
        break
      case "password":
        isValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,32}$/.test(value)
        break
      case "confirmPassword":
        isValid = value !== "" && value == passwordRef.current?.value
        break
      case "nickname":
        isValid = /^[가-힣a-zA-Z0-9]{1,50}$/.test(value)
        break
      case "email":
        isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/.test(value)
        break
      default:
        break
    }

    return isValid
  }

  // 전체 유효성 검사 실행
  const validateForm = () => {
    let newErrors ={}

    if (type === "signup") {

      newErrors = {
        id: !validateField("id", idRef.current?.value),
        password: !validateField("password", passwordRef.current?.value),
        confirmPassword: !validateField("confirmPassword", confirmPasswordRef.current?.value),
        nickname: !validateField("nickname", nicknameRef.current?.value),
        email: !validateField("email", emailRef.current?.value),
      }
    } else if (type === "login") {
      newErrors = {
        id: !validateField("id", idRef.current?.value),
        password: !validateField("password", passwordRef.current?.value), 
      }
    }

    setErrors(newErrors)
    return !Object.values(newErrors).includes(true)
  }

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    await signupEvent()
  }

  const signupEvent = async () => {
    
    const endpoint = "/api/signup"

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        id: idRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
        nickname: nicknameRef.current.value,
        email: emailRef.current.value,
      })
    })

    const result = await response.json()

    switch (response.status) {
      case 200:
        alert("회원가입에 성공하였습니다.")
        break
        case 400:
          alert("입력값에 문제가 있습니다.")
          break
        case 409:
          alert("이미 존재하는 아이디 입니다.")
          break
        case 500:
          alert("알 수 없는 오류로 동작할 수 없습니다.")
          break
        default:
          alert(`알 수 없는 상태 코드: ${response.status}`)
          break
    }
  }

  let refs = {}

  if (type === "signup") {
    refs = {
      idRef,
      passwordRef,
      confirmPasswordRef,
      nicknameRef,
      emailRef,
    }
  } else if (type === "login") {
    refs = {
      idRef,
      passwordRef,
    }
  }

  return {refs, errors, handleSubmit,}
}

export default useValidation
