// useKakaoLogin.js (수정 필요)
import { useNavigate } from 'react-router-dom';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_LOGIN_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI;

const useKakaoLogin = () => {
  const navigate = useNavigate();

  const handleKakaoLoginClick = () => {
    // 카카오 로그인 API 호출
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthURL; // 리디렉션
  };

  return { handleKakaoLoginClick };
};

export default useKakaoLogin;
