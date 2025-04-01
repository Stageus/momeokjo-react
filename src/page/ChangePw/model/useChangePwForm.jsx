import { useState, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { regex, messages } from "../../../shared/Content/regex"

const useChangePwForm = () => {
  const navigate = useNavigate()
  const values = useRef({
    password: '',
    confirmPassword: '',
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 비밀번호 변경
  const [isChangePwSuccess, setIsChangePwSuccess] = useState(false)

  // 비밀번호 변경 필드 정보
  const changePwInputFields = [
    { label: "비밀번호", type: "password", name: "password" },
    { label: "비밀번호 확인", type: "password", name: "confirmPassword"},
  ]

  // 비밀번호 변경 이벤트
  const handleChangePw = useCallback(async () => {
    const {password, confirmPassword} = values.current
    const newErrors = {}

    // 유효성 검사
    if (!regex.password.test(password)) {
      newErrors.password = messages.password
    }
    if (password !== confirmPassword || !confirmPassword) {
      newErrors.confirmPassword = messages.confirmPassword
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // ** 기존 비밀번호와 같은지 확인하는 로직 추가 **
    const storedUsers = JSON.parse(localStorage.getItem("users") || JSON.stringify([]))
    const userId = localStorage.getItem("userId")

    if (!userId) {
      console.error("User ID not found in localStorage")
      alert("로그인이 필요합니다.")
      navigate("/login")
      return;
    }

    const userIndex = storedUsers.findIndex(user => user.id === userId)
    if (userIndex === -1) {
      console.error("User not found in storedUsers")
      return 
    }

    const user = storedUsers[userIndex]
    if (user && user.password === password) {
      setErrors({ password: "기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다." })
      return
    }

    // ** 사용자 비밀번호 업데이트 (불변성 유지) **
    const newStoredUsers = [...storedUsers] // 배열 복사
    newStoredUsers[userIndex] = { ...user, password: password } // 객체 복사 후 password 변경

    // 로컬 스토리지 업데이트
    localStorage.setItem("users", JSON.stringify(newStoredUsers))
    setIsChangePwSuccess(true)
  }, [navigate, values])

  return {errors, values, handleChangePw, changePwInputFields, isChangePwSuccess}

}

export default useChangePwForm