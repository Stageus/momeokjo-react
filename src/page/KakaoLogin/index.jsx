import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY || '';
const KAKAO_LOGIN_REDIRECT_URI =
  import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI || '';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}&response_type=code`;

export default function Kakao() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken', 'isSocialUser']);

  // 1. 인가 코드 발급을 위한 카카오 로그인 페이지로 리디렉션
  const handleKakaoLoginClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        try {
          // 2. 토큰 발급: 인가 코드로 카카오에 토큰 발급 요청
          const tokenResponse = await axios.post(
            '/api/kakao/token', // 백엔드 API 엔드포인트
            {
              code: code,
              redirectUri: KAKAO_LOGIN_REDIRECT_URI,
            }
          );

          const { accessToken, refreshToken } = tokenResponse.data;

          // 3. 회원 확인 및 등록: 사용자 토큰으로 사용자 정보 요청 및 처리
          const userInfoResponse = await axios.get(
            '/api/kakao/user', // 백엔드 API 엔드포인트
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const { isNewUser, ...userInfo } = userInfoResponse.data;

          // 4. 서비스 로그인: 세션 발급 및 쿠키 저장
          setCookie('accessToken', accessToken, {
            path: '/',
            secure: true,
            sameSite: 'strict',
          });
          setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: 'strict',
          });
          setCookie('isSocialUser', 'true', {
            path: '/',
            secure: true,
            sameSite: 'strict',
          });

          notify('success', '로그인 성공!');
          navigate('/activities');
        } catch (error) {
          console.error('로그인 오류:', error);
          notify('error', '로그인 중 알 수 없는 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [location, navigate, setCookie]);

  const handleLogout = () => {
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });
    removeCookie('isSocialUser', { path: '/' });
    notify('success', '로그아웃 성공!');
    navigate('/');
  };

  const isLoggedIn = () => {
    return !!cookies.accessToken;
  };

  return (
    <div>
      {loading && <Loading />}
      {!isLoggedIn() ? (
        <button onClick={handleKakaoLoginClick}>카카오 로그인</button>
      ) : (
        <button onClick={handleLogout}>로그아웃</button>
      )}
    </div>
  );
}

// notify 함수 구현 필요 (예: react-toastify 라이브러리 사용)
function notify(type, message) {
  console.log(`${type}: ${message}`);
}

// Loading 컴포넌트 구현 필요
function Loading() {
  return <div>Loading...</div>;
}
