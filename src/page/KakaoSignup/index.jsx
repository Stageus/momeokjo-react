import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // axios 설치 필요

const KAKAO_SIGNUP_REDIRECT_URI = import.meta.env.VITE_KAKAO_SIGNUP_REDIRECT_URI;

export default function KakaoSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        try {
          const signUpData = {
            nickname: randomNickname(), // randomNickname 함수 구현 필요
            redirectUri: KAKAO_SIGNUP_REDIRECT_URI,
            token: code,
          };

          const signInResponse = await SignUpUser(
            'kakao',
            signUpData,
          );

          console.log('회원가입 성공:', signInResponse);
          notify('success', '회원가입 성공!'); // notify 함수 구현 필요

          navigate('/activities');
        } catch (error) {
          console.error('회원가입 오류:', error);
          if (axios.isAxiosError(error) && error.response) {
            notify('error', error.response.data.message);
            if (error.response.data.message === '이미 등록된 사용자입니다.')
              navigate('/login');
          } else {
            notify('error', '회원가입 중 알 수 없는 오류가 발생했습니다.');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [location, navigate]);

  // JSX를 사용하지 않는 경우 React.createElement를 사용해야 함
  return React.createElement('div', null, loading ? React.createElement(Loading) : null);
}

// randomNickname 함수 구현 필요
function randomNickname() {
  return '랜덤닉네임';
}

// SignUpUser 함수 구현 필요
async function SignUpUser(provider, data) {
  // 실제 API 호출 로직 구현
  return {};
}

// notify 함수 구현 필요 (예: react-toastify 라이브러리 사용)
function notify(type, message) {
  console.log(`${type}: ${message}`);
}

// Loading 컴포넌트 구현 필요
function Loading() {
  return React.createElement('div', null, 'Loading...');
}
