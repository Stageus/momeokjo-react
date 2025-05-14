import {useNavigate} from "react-router-dom"
import {useState} from "react"

const useFetch = () => {
  const navigate = useNavigate()
  const [backendState, setBackendState] = useState()

  const requestData = async (method, url, body, formdata, query, options ={}) => {
    const { skipRedirect = false } = options
    try {

      const BASE_URL = import.meta.env.VITE_API_URL

      let fullUrl = BASE_URL + url
      
      const options = {
        method,
        headers: {},
        credentials: "include",
      }

      if (query) {
        const queryString = new URLSearchParams(query).toString()
        fullUrl += `?${queryString}`
      }

      if (formdata) {
        options["body"] = formdata
      } else if (body) {
        options["headers"]["Content-Type"] = "application/json"
        options["body"] = JSON.stringify(body)
      }

      console.log("[useFetch] 요청 시작:", method, url)
      const response = await fetch(fullUrl, options)
      console.log("[useFetch] 응답 상태코드:", response.status)

      const result = await response.json()
      const resData =  {
          status: response.status,
          data: result,
      }
      setBackendState(resData)

      if (response.status === 401 && !skipRedirect) {
        alert("로그인이 필요합니다")
        console.log(result.message)
      }
      else if (response.status === 403) {
        alert("권한이 없습니다")
        navigate("/login")
      }
      else if (response.status === 500) {
        alert("서버 오류입니다")
        navigate("/500")
      }
      
      return resData
    } catch (err) {
      console.error("요청 중 오류 발생:", err.message)
    }
  }

  return requestData
}

export default useFetch