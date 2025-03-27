import { useState, useCallback, useEffect } from "react"

const useAuthForm = (navigate) => {

  // 상태: login, signup, findid, findpw
  const [formType, setFormType] = useState('') // login, signup, findid, findpw

  // 입력 값 상태 관리 (로그인, 회원가입 공통)
  const [values, setValues] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    emailCode: ''
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 이메일 인증 관련
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false)
  const [isEmailSuccessful, setIsEmailSuccessful] = useState(false)
  const [emailCodeMessage, setEmailCodeMessage] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")

  // 타이머 관련
  const [timer, setTimer] = useState(0)
  const [expireMessage, setExpireMessage] = useState("")
  const emailTimeLimit = 900 // 15분
  
  // 아이디 찾기
  const [isFindIdSuccess, setIsFindIdSuccess] = useState(false)
  const [foundId, setFoundId] = useState('')

  // 비밀번호 찾기
  const [isFindPwSuccess, setIsFindPwSuccess] = useState(false)

  // 비밀번호 변경
  const [isChangePwSuccess, setIsChangePwSuccess] = useState(false)

  // 정규표현식
  const regex = {
    id: /^[a-zA-Z0-9]{1,50}$/,
    password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/,
    nickname: /^[a-zA-Z0-9가-힣]{1,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  }

  // 회원가입 유효성 검사 메시지
  const messages = {
    id: "50자 이하 / 한글, 영어, 숫자 포함",
    password: "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합",
    confirmPassword: "비밀번호 입력값과 동일한 번호를 입력해주세요",
    nickname: "50자 이하 / 한글, 영어, 숫자 포함",
    email: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태",
    emailCode: "인증번호를 확인해주세요",
    noAccount: "가입된 회원이 아닙니다.",
  }

  // 입력 필드 정보 (로그인, 회원가입)
  const commonInputFields = [
    { label: "아이디", type: "text", name: "id", placeholder: "아이디를 입력하세요" },
    { label: "비밀번호", type: "password", name: "password", placeholder: "비밀번호를 입력하세요" },
  ]

  // 회원가입 필드 정보
  const signUpInputFields = [
    { label: "비밀번호 확인", type: "password", name: "confirmPassword"},
    { label: "닉네임", type: "text", name: "nickname"},
    { label: "이메일", type: "email", name: "email" }
  ]

  // 아이디 찾기 필드 정보
  const findidInputFields = [
    { label: "이메일", type: "email", name: "email", placeholder: "이메일을 입력해주세요" }
  ]

  // 비밀번호 찾기 필드 정보
  const findPwInputFields = [
    { label: "아이디", type: "text", name: "id"},
    { label: "이메일", type: "email", name: "email"}
  ]

  // 비밀번호 변경 필드 정보
  const changePwInputFields = [
    { label: "비밀번호", type: "password", name: "password", placeholder: "비밀번호를 입력하세요" },
    { label: "비밀번호 확인", type: "password", name: "confirmPassword"},
  ]

  const validate = useCallback((id, password, confirmPassword, nickname, email, emailCode, formType) => {
    const newErrors = {}

    // 로그인 회원가입 폼 적용
    if (formType === 'login' || formType === 'signup') {
      if (!regex.id.test(id)) {
        newErrors.id = messages.id
      }
      if (!regex.password.test(password)) {
        newErrors.password = messages.password
      }
    }
    

    // 회원가입 폼일 경우 추가적인 유효성 검사
    if (formType === 'signup') {
      if (password !== confirmPassword || !confirmPassword) {
        newErrors.confirmPassword = messages.confirmPassword
      }
      if (!regex.nickname.test(nickname)) {
        newErrors.nickname = messages.nickname
      }
      if (!regex.email.test(email)) {
        newErrors.email = messages.email
      }
      if (isEmailCodeSent && !isEmailSuccessful && !emailCode) {
        newErrors.emailCode = messages.emailCode
      }
      if (email && !isEmailSuccessful) {
        newErrors.email = "이메일 인증을 해주세요."
      }
    }

    // 아이디 찾기 폼일 경우 유효성 검사
    if (formType === 'findid') {
      if (!regex.email.test(email)) {
        newErrors.email = messages.email
      } else {
        // 가입된 회원 확인 (로컬 스토리지 사용)
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
        const user = storedUsers.find(user => user.email === email)

        if (!user) {
          newErrors.email = messages.noAccount
        }
      }
    }

    // 비밀번호 찾기 폼일 경우 유효성 검사
    if (formType === 'findpw') {
      if (!regex.id.test(id)) {
        newErrors.id = messages.id
      } 

      if (!regex.email.test(email)) {
        newErrors.email = messages.email
      } else {
        // 가입된 회원 확인 (아이디, 이메일 둘 다 일치하는 사용자 확인)
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
        const user = storedUsers.find(user => user.id === id && user.email === email)

        if(!user) {
          newErrors.id = messages.noAccount
          newErrors.email = messages.noAccount
        }
      }
    }

    // 비밀번호 변경 폼일 경우 유효성 검사
    if (formType === 'changepw') {
      if (!regex.password.test(password)) {
        newErrors.password = messages.password
      } else if (password !== confirmPassword || !confirmPassword) {
        newErrors.confirmPassword = messages.confirmPassword
      }

    }

    return newErrors
  }, [regex, messages, isEmailCodeSent, isEmailSuccessful, formType])

  // 필드 값 변경
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }, [])

  // 랜덤 인증 코드 생성
  const randomEmailCode = useCallback(() => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }, [])

  // 분단위로 바꿔주는 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // 타이머 이벤트
  useEffect(() => {
    if (timer > 0 && !isEmailSuccessful) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)

      return () => clearInterval(interval)
    } else if (timer === 0 && isEmailCodeSent) {
      // setIsEmailSuccessful(false);
      // setExpireMessage("인증 시간이 만료되었습니다. 다시 인증해주세요.");
      // setErrors({ emailCode: "인증 시간이 만료되었습니다. 다시 인증해주세요." });
      // setEmailCodeMessage("");
    }
  }, [timer, isEmailCodeSent, isEmailSuccessful])

  // 이메일 인증코드 전송
  const handleSendEmailCode = useCallback(async () => {
    const {email} = values
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }
      delete newErrors.email
      return newErrors
    })

    if (!regex.email.test(email)) {
      setErrors(prevErrors => ({...prevErrors, email: messages.email}))
    }

    const verificationCode = randomEmailCode()
    setGeneratedCode(verificationCode)
    console.log("생성된 인증코드:", verificationCode)

    // ** 실제 API 연동 필요 **
    setIsEmailSuccessful(false)
    setIsEmailCodeSent(true)
    setTimer(emailTimeLimit) // 타이머 초기화
    setEmailCodeMessage("")
    alert(`인증 코드가 전송되었습니다.: ${verificationCode}`)
  }, [values.email, regex.email, messages.email, randomEmailCode])


  // 이메일 인증코드 비교
  const handleConfirmEmailCode = useCallback(() => {
    const {emailCode} = values

    console.log("입력된 인증 코드:", emailCode)
    console.log("생성된 인증 코드:", generatedCode)

    setErrors((prevErrors) => {
      const newErrors = {...prevErrors} // 이전 에러 상태 복사

      if (!generatedCode) {
        newErrors.emailCode = "인증 코드가 아직 생성되지 않았습니다"
        setIsEmailSuccessful(false)
      } else if (String(emailCode) === String(generatedCode)) {
        setIsEmailSuccessful(true)
        setEmailCodeMessage("인증에 성공하였습니다.")
        setTimer(0)
        delete newErrors.emailCode
        setExpireMessage("")
      } else {
        newErrors.emailCode = "인증번호를 확인해주세요."
        setIsEmailSuccessful(false)
      }

      // 타이머 만료 메시지
      if (expireMessage) {
        newErrors.emailCode = expireMessage
      }

      return newErrors
    })
  }, [generatedCode, values.emailCode, expireMessage])

  // 아이디 찾기 부분
  const handleFindId = useCallback(async () => {
    const { email } = values

    const newErrors = validate(null, null, null, null, email, null, 'findid')

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // ** 임시 프론트엔드 테스트용 **
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const user = storedUsers.find(user => user.email === email)

    setFoundId(user.id)
    setIsFindIdSuccess(true)

    

    // ** [백엔드 API 연결 후 로직] **
    // try {
    //   const response = await fetch("/api/findId", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email }),
    //   })

    //   const data = await response.json()

    //   if (response.ok) {
    //     // 아이디 찾기 성공
    //     alert(`귀하의 아이디는 ${data.id} 입니다.`)
    //     navigate("/login") // 로그인 페이지로 이동
    //   } else {
    //     // 아이디 찾기 실패
    //     alert(data.message || "아이디를 찾을 수 없습니다.")
    //   }
    // } catch (error) {
    //   console.error("아이디 찾기 에러:", error)
    //   alert("아이디 찾기 중 오류가 발생했습니다.")
    // }

    
    
  }, [validate, values])

  // 비밀번호 찾기 부분
  const handleFindPw = useCallback(async () => {
    const { id, email } = values

    const newErrors = validate(id, null, null, null, email, null, 'findpw')

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsFindPwSuccess(true)

  }, [validate, values])

  // 비밀번호 변경 부분
  const handleChangePw = useCallback(async () => {
    const {password, confirmPassword} = values

    const newErrors = validate(null, password, confirmPassword, null, null, null, 'changepw')

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // ** 기존 비밀번호와 같은지 확인하는 로직 추가 **
    const storedUsers = JSON.parse(localStorage.getItem("users") || JSON.stringify([]))
    const userId = localStorage.getItem("userId")

    if (!userId) {
      // userId가 없는 경우 로그인 페이지로 리다이렉트 또는 에러 메시지 표시
      console.error("User ID not found in localStorage");
      // 예시: 로그인 페이지로 리다이렉트
      alert("로그인이 필요합니다."); // 사용자에게 알림 메시지 표시
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return;
    }

    const userIndex = storedUsers.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      // 사용자를 찾을 수 없는 경우 에러 처리
      console.error("User not found in storedUsers");
      return;
    }

    const user = storedUsers[userIndex];

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
  }, [validate, values])

  // 로그인 부분
  const handleLogin = useCallback(async () => {

    const { id, password } = values

    const newErrors = validate(id, password, null, null, null, null, 'login')

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // ** 프론트엔드에서 사용자 정보 확인 **
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = storedUsers.find(user => user.id === id);

    // ** 임시 프론트엔드 테스트용 **
    if (user) {
      if (user.password === password) {
        alert("로그인 성공 (임시)")
        localStorage.setItem("userId", user.id)
        navigate("/")
      } else {
        alert("로그인 실패 (임시): 아이디 또는 비밀번호가 일치하지 않습니다.")
        setValues(prevValues => ({
          ...prevValues,
          id: '',
          password: ''
        }))
      }
    } else {
      alert("로그인 실패: 존재하지 않는 아이디입니다.")
      setValues(prevValues => ({
        ...prevValues,
        id: '',
        password: ''
      }))
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
  }, [values, validate, setValues])


  // 회원가입 이벤트 부분
  const handleSignUp = useCallback(async () => {
    const { id, password, confirmPassword, nickname, email} = values
    const newErrors = validate(id, password, confirmPassword, nickname, email, null, 'signup')

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // ** [백엔드 API 연결 후 로직] **
    // try {
    //   const response = await fetch("/api/signup", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id, password, nickname, email }),
    //   })

    //   const data = await response.json()

    //   if (response.ok) {
    //     // 회원가입 성공
    //     alert("회원가입에 성공했습니다.")
    //     navigate("/login") // 로그인 페이지로 이동
    //   } else {
    //     // 회원가입 실패
    //     alert(data.message || "회원가입에 실패했습니다.")
    //   }
    // } catch (error) {
    //   console.error("회원가입 에러:", error)
    //   alert("회원가입 중 오류가 발생했습니다.")
    // }

    // 모든 필드가 유효하고, 이메일 인증이 완료된 경우 회원가입 성공
    if (id && password && confirmPassword === password && nickname && email && isEmailSuccessful) {

      // ** 프론트엔드에서 사용자 정보 저장
      const newUser = { id, password, nickname, email }
      const storedUser = JSON.parse(localStorage.getItem("users") || "[]")
      storedUser.push(newUser)
      localStorage.setItem("users", JSON.stringify(storedUser))

      alert("회원가입 성공!")
      navigate("/login", { replace: true }) // 로그인 페이지로 이동
      return
    } else if (!isEmailSuccessful) {
      setErrors(prevErrors => ({...prevErrors, email: "이메일 인증을 완료해주세요."}))
      return
    }
  }, [values, validate, navigate, isEmailSuccessful])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    const { id, password, confirmPassword, nickname, email, emailCode } = values;
    const newErrors = validate(id, password, confirmPassword, nickname, email, emailCode);

    if (Object.keys(newErrors) > length > 0) {
      setErrors(newErrors)
      return
    } else {
      // 정규 표현식 검사에 통과하면 에러 상태 초기화
      setErrors({})
    }

    if (formType === 'login') {
      handleLogin()
    } else if (formType === 'signup') {
      handleSignUp()
    } else if (formType === 'findid') {
      handleFindId()
    } else if (formType === 'findpw') {
      handleFindPw()
    } else if (formType === 'changepw') {
      handleChangePw()
    }
  }, [validate, values, handleLogin, handleSignUp, handleFindId, handleFindPw, handleChangePw, formType])

  return {
    formType,
    setFormType,
    commonInputFields,
    errors,
    values,
    handleChange,
    handleSubmit,

    // 회원가입 관련
    isEmailCodeSent,
    emailCodeMessage,
    isEmailSuccessful,
    handleSendEmailCode,
    handleConfirmEmailCode,
    formatTime,
    timer,
    expireMessage,
    messages,
    signUpInputFields,

    // 아이디 찾기 관련
    findidInputFields,
    isFindIdSuccess,
    foundId,
    setIsFindIdSuccess,

    // 비밀번호 찾기 관련
    findPwInputFields,
    isFindPwSuccess,
    setIsFindPwSuccess,

    // 비밀번호 변경 관련
    changePwInputFields,
    isChangePwSuccess,
    setIsChangePwSuccess,
  }

}

export default useAuthForm