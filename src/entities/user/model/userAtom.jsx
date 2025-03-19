import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
})

export const signupFormState = atom({
  key: 'signupFormState',
  default: {
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
  },
})