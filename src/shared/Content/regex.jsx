export const IdRegex = /^[a-zA-Z0-9]{1,50}$/
export const PasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/
export const NickNameRegex = /^[a-zA-Z0-9가-힣]{1,50}$/
export const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


export const IdMessage = "50자 이하 / 영어, 숫자 포함"
export const PasswordMessage = "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합"
export const ConfirmPasswordMessage = "50자 이하 / 한글, 영어, 숫자 포함"
export const NickNameMessage = "50자 이하 / 한글, 영어, 숫자 포함"
export const EmailMessage = "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태"
export const EmailCodeMessage = "인증번호를 확인해주세요"
export const NoAccountMessage = "가입된 회원이 아닙니다."