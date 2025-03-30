import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const useDetailPage = (restaurantsIdx) => {
    const navigate = useNavigate()
    const [isDetailOpen, setIsDetailOpen] = useState(0)
    const { Depth2RestaurantIdx } = useParams() // 음식점 상세보기 조회 : /restaurants/:restaurant_idx

    useEffect(() => {
        if (Depth2RestaurantIdx) {
          const restaurantExists = restaurantsIdx.some(
            restaurant => Number(restaurant.restaurant_idx) === Number(Depth2RestaurantIdx)
          )
          if (!restaurantExists) {
            navigate('/')
            return;
          }
          setIsDetailOpen(1)
        } else {
          setIsDetailOpen(0)
        }
      }, [Depth2RestaurantIdx, navigate])

    // 상세페이지 열기
    const detailPageOpen = (Depth2RestaurantIdx) => {
        navigate(`/${Depth2RestaurantIdx}`)
        setIsDetailOpen(1)
    }

    // 상세페이지 닫기
    const closeDetailPage = () => {
        setIsDetailOpen(0)
        navigate('/')
    }

    return [
        isDetailOpen,
        Depth2RestaurantIdx,
        detailPageOpen,
        closeDetailPage
    ]
}

export default useDetailPage