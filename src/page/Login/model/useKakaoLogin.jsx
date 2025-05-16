import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../../shared/model/atom';
import useFetch from '../../../entities/model/useFetch';

const useKakaoLogin = () => {
  const navigate = useNavigate()
  const setAuth = useSetRecoilState(authState)

  // 1. 서버에 로그인 요청하여 카카오 인증 URL로 302 리디렉션
  const requestKakaoLogin = () => {
    const kakaoAuthURL = `https://momeokjo.bluegyu.me/auth/oauth/kakao`
    window.location.href = kakaoAuthURL
  }


  return { requestKakaoLogin }
}

export default useKakaoLogin;
