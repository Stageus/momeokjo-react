// 정규표현식
export const regex = {
  id: /^[a-zA-Z0-9]{1,50}$/,
  password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/,
  nickname: /^[a-zA-Z0-9가-힣]{1,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  emailCode: /^[0-9]{6}$/
}