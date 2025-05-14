import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../../shared/model/atom';
import useFetch from '../../../entities/model/useFetch';

const useKakaoLogin = () => {
  const navigate = useNavigate()
  // const getData = useFetch()
  const setAuth = useSetRecoilState(authState)

  // 1. 서버에 로그인 요청하여 카카오 인증 URL로 302 리디렉션
  const requestKakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI}&response_type=code`
    window.location.href = kakaoAuthURL
  }

  // 2. 카카오 인증 성공 후 리디렉션 된 URI에서 code 추출 -> 서버에 전달
  const requestKakaoToken = () => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const error = params.get('error')
    const errorDescription = params.get('error_description')
    const state = params.get('state')

    if (error) {
      alert("카카카오 인증 오류 발생")
      console.error("카카오 로그인 오류:", error, errorDescription)
      return
    }
  
    if (code) {

      console.log("[카카오 로그인] 서버로 보낼 쿼리:", {code})
      // 인증 코드로 토큰 발급 요청
      // const response = await getData('GET', '/auth/oauth/kakao/redirect', {
      //   query: {
      //     code, // 인가 코드
      //     // error, // 선택적으로 에러 코드
      //     // error_description: errorDescription, // 선택적으로 에러 메시지
      //     // state, // 요청 시 전달한 state 값
      //   }
      // })
      window.location.href = `https://momeokjo.bluegyu.me/auth/oauth/kakao/redirect?code=${code}`

      // const result = response?.data

      // if (response.status === 200) {
      //   localStorage.setItem('kakaoAccessToken', result.access_token)
      //   setAuth({
      //     isLoggedIn: true,
      //     user: result.user,
      //     checked: true,
      //   })
      //   navigate('/')
      // } else if (response.status === 400 && result.message?.includes("가입된 유저가 없습니다")) {
      //   navigate('/signup', {
      //     state: {
      //       social: 'kakao',
      //       kakaoUser: result.kakaoUser,
      //     }
      //   })
       } else {
        alert('로그인 처리 실패')
      }
    }
  // }

  return { requestKakaoLogin, requestKakaoToken }
}

export default useKakaoLogin;
