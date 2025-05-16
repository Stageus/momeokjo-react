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

    if (response?.status === 401) {
      console.log(response.data.message)
    }
    if (response?.status === 200) {
      console.log("로그아웃")
      alert("로그아웃")

      setAuth({
        isLoggedIn: false,
        user: null,
        checked: true,
      })

      navigate("/login")
    }
  }

  return requestLogout
}

export default useLogout