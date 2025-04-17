import { useState } from "react"

const useFindIdForm = (validateEmail) => {
  const [isFindIdSuccess, setIsFindIdSuccess] = useState(false)
  const [foundId, setFoundId] = useState('')

  // 아이디 찾기 이벤트
  const handleFindId = (setErrors) => {
    const emailError = validateEmail()
    const errors = {}

    if (emailError) {
      errors.email = emailError
      setErrors(errors)
      return
    }

    setIsFindIdSuccess(true)
    setFoundId('zxc422523')
  }

  return {handleFindId, isFindIdSuccess, foundId}

}

export default useFindIdForm