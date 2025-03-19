import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../model/useLogin';
import Button from '../../../../widget/ui/Button';
import kakaoIcon from "../../../../widget/assets/ico-kakao.svg"
import s from "./style"
const LoginForm = () => {
  const idRef = useRef(null)
  const passwordRef = useRef(null)

  const {inputFields, handleLogin, refs, errors} = useLogin({ idRef, passwordRef })
  const navigate = useNavigate()

  return (
    
  )
}

export default LoginForm;
