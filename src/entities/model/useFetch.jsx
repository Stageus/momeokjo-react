import { useEffect, useState } from "react"

const useFetch = (url) => {

  const [data, setData] = useState(null)

  useEffect(() => {

    const fetchData = async () => {

      try {
        const response = await fetch(url)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('데이터를 불러오는 중 에러 발생:', error)
      }
    }

    fetchData()
  }, [url])

  return data
}

export default useFetch
