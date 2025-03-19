import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { signupFormState } from '../../../entities/user/model/userAtom';

const useSignup = () => {
  const [form, setForm] = useRecoilState(signupFormState)
  const [signupError, setSignupError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSignupError(null)

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        alert('회원가입에 성공했습니다!')
      } else {
        const errorData = await response.json()
        setSignupError(errorData.message || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      setSignupError('회원가입 중 오류가 발생했습니다.')
    }
  }

  return {
    form,
    signupError,
    handleChange,
    handleSubmit,
  }
}

export default useSignup;
