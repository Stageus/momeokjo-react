import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { convertToJibunAddress } from '../utils/convertJibun'
import restaurantsIdx from '../assets/data/restaurantsIdx.json'   // 음식점 상세 조회 api 대체 : /restaurants/:restaurant_idx

const useDetailPage = () => {
    const navigate = useNavigate()
    const [ isDetailOpen, setIsDetailOpen ] = useState(0)
    const { depth2restaurantidx } = useParams() // 음식점 상세보기 조회 : /restaurants/:restaurant_idx
    const [ jibunAddress, setJibunAddress ] = useState('')

    // 선택된 음식점 정보 찾기
    const selectedDetailRestaurant = restaurantsIdx.find(
        restaurant => Number(restaurant.restaurant_idx) === Number(depth2restaurantidx)
    )

    useEffect(() => {
        if (depth2restaurantidx) {
            if (!selectedDetailRestaurant) { // 음식점 상세보기 조회 시, 받아온 idx와 동일한 idx 없으면 메인페이지로 이동
              navigate('/')
              return
            }
            setIsDetailOpen(1)

            // 지번 주소 변환
            const convertAddress = async () => {
                if (selectedDetailRestaurant?.address) {
                    const jibun = await convertToJibunAddress(selectedDetailRestaurant.address)
                    setJibunAddress(jibun)
                }
            }
            convertAddress()
        } else {
            setIsDetailOpen(0)
            setJibunAddress('')
        }
    }, [depth2restaurantidx, navigate, selectedDetailRestaurant])

    // 상세페이지 열기
    const detailPageOpen = (depth2restaurantidx) => {
        navigate(`restaurant/${depth2restaurantidx}`)
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
        closeDetailPage,
        selectedDetailRestaurant,
        jibunAddress
    ]
}

export default useDetailPage