import { useRef, useState, useEffect, useCallback } from 'react';

const useSignUpForm = ({navigate}) => {
  // 입력 필드 정보
  const inputFields = [
    { label: "아이디", type: "text", refName: "id"},
    { label: "비밀번호", type: "password", refName: "password"},
    { label: "비밀번호 확인", type: "password", refName: "confirmPassword"},
    { label: "닉네임", type: "text", refName: "nickname"},
    { label: "이메일", type: "email", refName: "email" }
  ]
  
  const refs = inputFields.reduce((acc, field) => {
    acc[field.refName] = useRef(null)
    return acc
  }, {})

  refs.emailCode = useRef(null);

  const [errors, setErrors] = useState({})
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false)
  const [isEmailSuccessful, setIsEmailSuccessful] = useState(false)
  const [emailCodeMessage, setEmailCodeMessage] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [timer, setTimer] = useState(0)
  const [expireMessage, setExpireMessage] = useState("")

  const [values, setValues] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    emailCode: ''
  })

  const emailTimeLimit = 900; // 15분

  // 정규표현식
  const regex = {
    id: /^[a-zA-Z0-9]{1,50}$/,
    password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/,
    nickname: /^[a-zA-Z0-9가-힣]{1,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  }

  // 회원가입 유효성 검사
  const messages = {
    id: "50자 이하 / 한글, 영어, 숫자 포함",
    password: "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합",
    confirmPassword: "비밀번호 입력값과 동일한 번호를 입력해주세요",
    nickname: "50자 이하 / 한글, 영어, 숫자 포함",
    email: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태"
  }

  // 랜덤 인증 코드 생성
  const randomEmailCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const updateValue = useCallback((refName) => {
    return (e) => {
      const { value } = e.target; // value 추출
      setValues(prevValues => ({
        ...prevValues,
        [refName]: value // 추출한 value 사용
      }));
    }
  }, []);

  // 이메일 인증번호 전송
  const handleSendEmailCode = useCallback(() => {
    const email = refs.email.current?.value || ""
    setEmailErrorMessage("")
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      // delete newErrors["email"]; // "email" 필드에 대한 에러 제거
      delete newErrors["email"]
      return newErrors;
    });

    if (!email) {
      setEmailErrorMessage("이메일을 입력해주세요")
      return
    }

    if (!regex.email.test(email)) {
      setEmailErrorMessage(messages.email)
      return
    }

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
  }, [refs, regex.email, messages.email, randomEmailCode])

    // 이메일 인증 확인
    const handleConfirmEmailCode = useCallback(() => {
      const emailCode = refs.emailCode.current?.value || "";
  
      console.log("입력된 인증 코드:", emailCode);
      console.log("생성된 인증 코드:", generatedCode);
  
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }; // 이전 에러 상태 복사
  
        if (!generatedCode) {
          newErrors.emailCode = "인증 코드가 아직 생성되지 않았습니다.";
          setIsEmailSuccessful(false);
          // setEmailCodeMessage(""); // 초기화 (제거)
        } else if (String(emailCode) === String(generatedCode)) {
          setIsEmailSuccessful(true);
          setEmailCodeMessage("인증에 성공하였습니다.");
          setTimer(0);
          delete newErrors.emailCode; // 인증 성공 시 에러 제거
          // 만료 메시지 초기화
          setExpireMessage("");
        } else {
          newErrors.emailCode = "인증번호를 확인해주세요.";
          setIsEmailSuccessful(false);
          // setEmailCodeMessage(""); // 초기화 (제거)
        }
  
        // 타이머 만료 메시지가 있는 경우, 해당 에러를 추가
        if (expireMessage) {
          newErrors.emailCode = expireMessage;
        }
  
        return newErrors; // 새로운 에러 상태 반환
      });
  
    }, [generatedCode, refs.emailCode, expireMessage]);
  

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

  const handleSignUp = useCallback(async () => {
    const newErrors = {}; // 에러 객체 초기화
    let hasError = false;
  
    // 이메일 유효성 검사
    if (!values.email) {
      newErrors["email"] = messages["email"];
      hasError = true;
    } else if (!regex.email.test(values.email)) {
      newErrors["email"] = messages["email"];
      hasError = true;
    } else if (!isEmailSuccessful) { // 이메일 인증 여부 확인
      newErrors["email"] = "이메일 인증을 해주세요.";
      hasError = true;
    }
  
    // 다른 필드 유효성 검사
    for (const key in refs) {
      if (key !== "email" && key !== "emailCode") {
        if (key === "confirmPassword") {
          if (!values[key] || values[key] !== values.password) {
            newErrors[key] = messages[key];
            hasError = true;
          }
        } else if (regex[key] && !regex[key].test(values[key])) {
          newErrors[key] = messages[key];
          hasError = true;
        }
      }
    }
  
    setErrors(newErrors); // 에러 상태 업데이트
  
    if (!hasError) {
      alert("회원가입 성공!");
      navigate("/login", { replace: true });
    }
  }, [values, refs, regex, messages, isEmailSuccessful, navigate]);
  
  
  

  return {
    inputFields,
    refs,
    errors,
    setErrors,
    messages,
    isEmailCodeSent,
    emailCodeMessage,
    isEmailSuccessful,
    handleSendEmailCode,
    handleConfirmEmailCode,
    formatTime,
    timer,
    emailErrorMessage,
    updateValue,
    values,
    handleSignUp,
    expireMessage,
  }
}

export default useSignUpForm;
