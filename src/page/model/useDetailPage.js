import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useDetailPage = (categoryRecomend) => {
    const navigate = useNavigate()
    const [isDetailOpen, setIsDetailOpen] = useState(0)
    const [selectedRestaurantDetail, setSelectedRestaurantDetail] = useState(null)

    useEffect(() => {
        const path = window.location.pathname
        const restaurantIdx = parseInt(path.substring(1))

        if (!isNaN(restaurantIdx)) {
            const restaurant = categoryRecomend.find(r => r.restaurant_idx === restaurantIdx)
            if (restaurant) {
                setSelectedRestaurantDetail(restaurant)
                setIsDetailOpen(1)
            }
        }
    }, [categoryRecomend])

    // 상세페이지 열기
    const detailPageOpen = (idx) => {
        const restaurant = categoryRecomend.find(r => r.restaurant_idx === idx)
        setSelectedRestaurantDetail(restaurant)
        navigate(`/${idx}`)
        setIsDetailOpen(1)
    }

    // 상세페이지 닫기
    const closeDetailPage = () => {
        setIsDetailOpen(0)
        setSelectedRestaurantDetail(null)
        navigate('/')
    }

    return [
        isDetailOpen,
        selectedRestaurantDetail,
        detailPageOpen,
        closeDetailPage
    ]
}

export default useDetailPage