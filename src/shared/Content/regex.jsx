// 정규표현식
export const regex = {
  id: /^[a-zA-Z0-9]{1,50}$/,
  password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/,
  nickname: /^[a-zA-Z0-9가-힣]{1,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  emailCode: /^[0-9]{6}$/
}

// 각 필드에 대한 유효성 검사 메시지
export const messages = {
  id: "50자 이하 / 영어, 숫자 포함",
  password: "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합",
  confirmPassword: "비밀번호와 동일한 값 혹은 여백이 있으면 안됩니다.",
  nickname: "50자 이하 / 한글, 영어, 숫자 포함",
  email: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태",
  emailVerification: "이메일 인증을 완료해주세요",
  emailCode: "인증번호를 확인해주세요",
  noAccount: "가입된 회원이 아닙니다.",
  generatedCode: "인증번호가 아직 전송되지 않았습니다."
}