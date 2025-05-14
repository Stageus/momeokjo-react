import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../../../../shared/model/atom";
import useFetch from "../../../../../entities/model/useFetch";

const useLogout = () => {
  const navigate = useNavigate()
  const setAuth = useSetRecoilState(authState)
  const requestData = useFetch()

  const requestLogout = async () => {
    const response = await requestData("DELETE", "/auth/signout", null, null, {
      skipRedirect: true,
      withCredentials: true
    })

    console.log("[useLogout] 응답 상태코드:", response?.status)

    if (response?.status === 200) {
      console.log("로그아웃")
      alert("로그아웃")

      setAuth({
        isLoggedIn: false,
        user: null,
        checked: true,
      })

      navigate("/login")
    } else {
      console.error("[useLogout] 로그아웃 실패:", response?.status);
      alert("로그아웃 처리 중 문제가 발생했습니다.");
    }
  }

  return requestLogout
}

export default useLogout