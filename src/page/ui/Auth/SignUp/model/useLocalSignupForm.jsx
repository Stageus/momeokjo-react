import { useState, useEffect, useCallback } from 'react';

const useSignUpForm = (navigate) => {

  // URL 파라미터 파싱
  const pageType = (() => {
    try {
      if (window.location && window.location.search) {
        const urlParams = new URLSearchParams(window.location.search)
        const pageParam = urlParams.get("page")
        return pageParam === "간편회원가입" ? "easy" : "local"
      }
    } catch (error) {
      console.error("URL 파라미터 읽기 오류:", error)
    }
    return "local" // 기본값
  })()

  const [values, setValues] = useState({
    nickname: '',
    email: '',
    emailCode: '',
    ...(pageType === 'local' ? { id: '', password: '', confirmPassword: ''} : {}),
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
  const emailTimeLimit = 900; // 15분

  


  // 정규표현식
  const regex = {
    nickname: /^[a-zA-Z0-9가-힣]{1,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    ...(pageType === 'local' ? {
      id: /^[a-zA-Z0-9]{1,50}$/,
      password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/,
    } : {}),
  }


    // 유효성 검사
  const messages = {
    nickname: "50자 이하 / 한글, 영어, 숫자 포함",
    email: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태",
    emailCode: "인증번호를 확인해주세요",
    ...(pageType === 'local' ? {
      id: "50자 이하 / 한글, 영어, 숫자 포함",
      password: "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합",
      confirmPassword: "비밀번호 입력값과 동일한 번호를 입력해주세요",
    }: {}),
  }


  // 입력 필드 정보
  const signUpInputFields = [
    ...(pageType === 'local' ? [
      { label: "아이디", type: "text", name: "id"},
      { label: "비밀번호", type: "password", name: "password"},
      { label: "비밀번호 확인", type: "password", name: "confirmPassword"},
    ] : []),
    { label: "닉네임", type: "text", name: "nickname"},
    { label: "이메일", type: "email", name: "email" }
  ]

    // 입력 값 변경
    const handleChange = useCallback((e) => {
      const {name, value} = e.target
      setValues(prevValues => ({
        ...prevValues,
        [name]: value
      }))
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

    // 타이머 Effect
    useEffect(() => {
      if (timer > 0 && !isEmailSuccessful) {
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1)
        }, 1000)

        return () => clearInterval(interval);
      } else if (timer === 0 && isEmailCodeSent) {
        // setIsEmailSuccessful(false)
        // setExpireMessage("인증 시간이 만료되었습니다. 다시 인증해주세요.")
        // setErrors({ emailCode: "인증 시간이 만료되었습니다. 다시 인증해주세요." }) // 만료 메시지를 에러로 설정
        // setEmailCodeMessage("") // 초기화
      }
    }, [timer, isEmailCodeSent, isEmailSuccessful])

    // 이메일 인증번호 전송
    const handleSendEmailCode = useCallback(async () => {
      const {email} = values

      if (!regex.email.test(email)) {
        setErrors(prevErrors => ({...prevErrors, email: messages.email}))
        return
      }

      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors.email
        return newErrors
      })

      const verificationCode = randomEmailCode()
      setGeneratedCode(verificationCode)
      console.log("생성된 인증코드:", verificationCode)

      

      // 백엔드 API 호출 (예시)
      // fetch("/api/send-email", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email: email, verificationCode: verificationCode }),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("이메일 전송 실패");
      //     }
      //     alert(`인증 코드가 전송되었습니다.: ${verificationCode}`);
      //   })
      //   .catch((error) => {
      //     console.error("이메일 전송 에러:", error);
      //     setEmailCodeMessage("이메일 전송에 실패했습니다.");
      //     setIsEmailCodeSent(false);
      //   });

      // Mock API 로직 (실제 API 연동 시 제거)
      setIsEmailSuccessful(false)
      setIsEmailCodeSent(true)
      setTimer(emailTimeLimit)
      setEmailCodeMessage("")
      alert(`인증 코드가 전송되었습니다.: ${verificationCode}`)
    }, [values.email, regex.email, messages.email, randomEmailCode])

    // 이메일 인증 확인
    const handleConfirmEmailCode = useCallback(() => {
      const {emailCode} = values

      console.log("입력된 인증 코드:", emailCode)
      console.log("생성된 인증 코드:", generatedCode)

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors } // 이전 에러 상태 복사

        if (!generatedCode) {
          newErrors.emailCode = "인증 코드가 아직 생성되지 않았습니다."
          setIsEmailSuccessful(false)
        } else if (String(emailCode) === String(generatedCode)) {
          setIsEmailSuccessful(true)
          setEmailCodeMessage("인증에 성공하였습니다.")
          setTimer(0)
          delete newErrors.emailCode // 인증 성공 시 에러 제거
          setExpireMessage("")
        } else {
          newErrors.emailCode = "인증번호를 확인해주세요."
          setIsEmailSuccessful(false)
        }

        // 타이머 만료 메시지가 있는 경우, 해당 에러를 추가
        if (expireMessage) {
          newErrors.emailCode = expireMessage
        }

        return newErrors // 새로운 에러 상태 반환
      })

    }, [generatedCode, values.emailCode, expireMessage])

    // 회원가입 이벤트 부분
    const handleSignUp = useCallback(async () => {
      const { id, password, confirmPassword, nickname, email, emailCode} = values
      const newErrors = {}

      if (pageType === 'local') {
        if (!regex.id.test(id)) {
          newErrors.id = messages.id
        }
        if (!regex.password.test(password)) {
          newErrors.password = messages.password
        }
        if (password !== confirmPassword || !confirmPassword) {
          newErrors.confirmPassword = messages.confirmPassword
        }
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
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
      // 모든 필드가 유효하고, 이메일 인증이 완료된 경우 회원가입 성공
      if (pageType === 'local' && id && password && confirmPassword === password && nickname && email && isEmailSuccessful) {
        // ** 프론트엔드에서 사용자 정보 저장
        const newUser = { id, password, nickname, email }
        const storedUser = JSON.parse(localStorage.getItem("users") || "[]")
        storedUser.push(newUser)
        localStorage.setItem("users", JSON.stringify(storedUser))
        alert("회원가입 성공!")
        navigate("/login", { replace: true })
        return
      } else if (pageType === 'easy' && nickname && email && isEmailSuccessful) {
        // 간편 회원가입 로직
        const newUser = { nickname, email }
        const storedUser = JSON.parse(localStorage.getItem("users") || "[]")
        storedUser.push(newUser)
        localStorage.setItem("users", JSON.stringify(storedUser))
        alert("회원가입 성공!")
        navigate("/login", { replace: true })
        return
      } else if (!isEmailSuccessful) {
        setErrors(prevErrors => ({...prevErrors, email: "이메일 인증을 완료해주세요."}))
        return
      }

      // ** [백엔드 API 연결 후 로직] **
      // try {
      //   // 백엔드 API 호출 (가정)
      //   const response = await fetch("/api/signup", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       id: id,
      //       password: password,
      //       nickname: nickname,
      //       email: email,
      //       emailCode: emailCode // 이메일 인증 코드도 함께 전송
      //     })
      //   });

      //   if (response.ok) {
      //     alert("회원가입 성공!");
      //     navigate("/login", { replace: true });
      //   } else {
      //     // 에러 처리
      //     const errorData = await response.json();
      //     alert(`회원가입 실패: ${errorData.message || "알 수 없는 오류"}`);
      //   }
      // } catch (error) {
      //   console.error("회원가입 에러:", error);
      //   alert("회원가입 중 오류가 발생했습니다.");
      // }

      
    }, [values, navigate, isEmailSuccessful, pageType])
  
  
  

    return {
      errors,
      values,
      handleChange,
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
      handleSignUp,
    }
}

export default useSignUpForm;
