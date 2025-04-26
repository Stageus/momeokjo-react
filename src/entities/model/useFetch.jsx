import {useNavigate} from "react-router-dom"
import {useState} from "react"

const baseUrl = import.meta.env.VITE_API_URL || ""

const useFetch = () => {
  const navigate = useNavigate()
  const [backendState, setBackendState] = useState()

  const requestData = async (method, url, body, formdata) => {

    try {
      const fullUrl = `${baseUrl}${url}`
      const response = await fetch(fullUrl, {
        method: method,
        headers: {

        },
        credentials: "include",  // 쿠키를 포함시켜서 요청을 보냄
        // body: JSON.stringify(body),
      })

      if (body) {
        response["headers"]["Content-Type"] = "application/json"
        response["body"] = JSON.stringify(body)
      }

      if (formdata) {

      }
      // 헤더에 있는 컨텐트 타입이, 내가 보내는 값의 형태가 json 이다 라는 의미
      // 보내는게 json가 아닌 경우가 있음 ( formdata )

      
      // ===== 에외처리
      // 통씬예써 빨썡하는 여러 쌍턔코뜨뼐 에외처리는 원럐 통씬마따 따르따로꼐야 하는 껐

      // 그럼 여기에 들어가는 예외처리는 뭐냐? ( 모두 다 공통으로 하는 것 )
      // EX. 500, 401, 403
      // 이런 것들 처럼 모든 통신에서 같은 후처리를 하는 상태코드들만 

      let result = null

      if (response.status === 401) {
        alert("login nessesary")
        navigate("/login")
      }
      else if (response.status === 403) {
        alert("unauthorized")
        navigate("/login")
      }
      else if (response.status === 500) {
        alert("server is dead")
        navigate("/500")
      }
      else {
        result = await response.json()
        setBackendState({
          status: response.status,
          data: result
        })
      }

      return [backendState]

      // if (response.status) {
      //   let errorMessage = "서버 오류"
      //   try {
      //     const errorData = await response.json()
      //     errorMessage = errorData.message || errorMessage
      //   } catch {
      //     const errorText = await response.text()
      //     errorMessage = errorText || errorMessage
      //   }
      //   throw new Error(errorMessage)
      // }

      // const result = await response.json()
      // return { success: true, ...result }
    } 

    catch (err) {
      console.error("요청 중 오류 발생:", err.message)
    }
  }

  return requestData
}

export default useFetch







// 우리가 쿠키에 직접 접근하는 방법은 없음
// 그렇기 때문에, 로그인 여부를 체크하는 api를 백엔드 개발자가 만들어 준 것이다.

// 웹 페이지가 켜지자마자 이 api를 호출하면 됨 ( 입력값으로 요구하는게 없을 것임 )
// 백엔드가 상태코르를 줄 것임 
// 200을 받았다면, 상태에 저장해야하는되 이를 global state 에 저장함

// 로그인 여부가 필요한 컴포넌트마다, 해당 글로벌 스테이트에 접근하는걸로 해결할 수 있음

// 그래서 이 에이피아이를 어디서 호출해야하는가?
// 당연히 앱의 최상단
// 새로고침할 때마다 날아가니깐, 새로고침 하더라도 다시 통신해서 계속 유지시킬 수 있게


// 내가 발생한 문제 자체를 얘기 안하고, 그냥 안됨 << 