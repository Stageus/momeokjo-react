import { atom } from 'recoil'

export const authState = atom({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: null,
    checked: false, // 체크 완료 여부
  },
})