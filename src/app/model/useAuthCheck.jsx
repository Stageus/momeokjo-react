import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../shared/model/atom";
import useFetch from "../../entities/model/useFetch";

const useAuthCheck = () => {
  const setAuth = useSetRecoilState(authState)
  const getData = useFetch()
  const [loading, setLoading] = useState(true)
  const auth = useRecoilValue(authState)

  useEffect(() => {
    console.log("useAuthCheck useEffect 진입, auth.checked:", auth.checked)

    const checkLogin = async () => {
      console.log("checkLogin 실행")
      try {
        const response = await getData(
          'GET',
          '/auth/status',
          null, 
          null, 
          null,
          { skipRedirect: true }
        )
        console.log("응답 받음:", response)

        if (response?.status === 200) {
          const userData = response.data?.data
          console.log("로그인 상태 확인됨:", userData)

          setAuth({
            isLoggedIn: true,
            user: userData,
            checked: true,
          })
        } else {
          console.log("비로그인 상태")
          setAuth({
            isLoggedIn: false,
            user: null,
            checked: true,
          })
        }
      } catch (err) {
        console.log("에러 발생:", err)
        setAuth({
          isLoggedIn: false,
          user: null,
          checked: true,
        })
      } finally {
        setLoading(false)
      }
    }

    if (!auth.checked) {
      checkLogin()
    } else {
      setLoading(false)
    }

  }, [auth.checked, getData, setAuth])

  return loading
}

export default useAuthCheck