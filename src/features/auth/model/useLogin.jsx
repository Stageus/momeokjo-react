import useValidation from "./useValidation"
import { useRecoilState } from "recoil"
import {isLoggedInState} from "../../../entities/user/model/userAtom"
import { useState } from "react"

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  const [loginError, setLoginError] = useState(null)
  const {refs, errors, handleSubmit} = useValidation("login")

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!handleSubmit()) {
      // 유효성 검사 실패
      return
    }

    const id = refs.idRef.current.value
    const password = refs.passwordRef.current.value

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      })

      if (response.ok) {
        setIsLoggedIn(true)
        setLoginError(null)
        // 로그인 성공 후 처리 (예: 리다이렉션)
      } else {
        const errorData = await response.json()
        setLoginError(errorData.message || "로그인에 실패했습니다.")
        setIsLoggedIn(false)
      }
    } catch (error) {
      setLoginError("로그인 중 오류가 발생했습니다.")
      setIsLoggedIn(false)
    }
  }

  const inputFields = [
    {
      label: "아이디",
      type: "text",
      refName: "idRef",
      error: errors.id,
      placeholder: "아이디를 입력하세요",
    },
    {
      label: "비밀번호",
      type: "password",
      refName: "passwordRef",
      error: errors.password,
      placeholder: "비밀번호를 입력하세요",
    },
  ]

  return { isLoggedIn, loginError, inputFields, handleLogin, refs, errors}
}

export default useLogin



