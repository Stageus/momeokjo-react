import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const useDetailPage = (restaurantsIdx) => {
    const navigate = useNavigate()
    const [isDetailOpen, setIsDetailOpen] = useState(0)
    const { depth2restaurantidx } = useParams() // 음식점 상세보기 조회 : /restaurants/:restaurant_idx

    useEffect(() => {
        if (depth2restaurantidx) {
          const restaurantExists = restaurantsIdx.some(
            restaurant => Number(restaurant.restaurant_idx) === Number(depth2restaurantidx)
          )
          if (!restaurantExists) {
            navigate('/')
            return;
          }
          setIsDetailOpen(1)
        } else {
          setIsDetailOpen(0)
        }
      }, [depth2restaurantidx, navigate])

    // 상세페이지 열기
    const detailPageOpen = (depth2restaurantidx) => {
        navigate(`/${depth2restaurantidx}`)
        setIsDetailOpen(1)
    }

    // 상세페이지 닫기
    const closeDetailPage = () => {
        setIsDetailOpen(0)
        navigate('/')
    }

    return [
        isDetailOpen,
        depth2restaurantidx,
        detailPageOpen,
        closeDetailPage
    ]
}

export default useDetailPage