import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useKakaoLogin from "../Login/model/useKakaoLogin";

const KakaoRedirect = () => {
  const navigate = useNavigate()
  const { requestKakaoToken } = useKakaoLogin()

  useEffect(() => {
    console.log("KakaoRedirect 컴포넌트 마운트됨")
    requestKakaoToken()
  }, [requestKakaoToken])

  return (
    <div>
      <h1>카카오 로그인 처리 중...</h1>
    </div>
  )
}

export default KakaoRedirect