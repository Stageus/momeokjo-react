import { useState, useEffect } from 'react'

const useLocation = () => {
    const [location, setLocation] = useState({ lat: null, lng: null })
    const [address, setAddress] = useState()

    // 현재 위치 가져오기
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setLocation({ lat: latitude, lng: longitude })
                fetchAddress(latitude, longitude)
            }
        )
    }, [])

    // 현재 위치를 행정동 정보로 보여주기
    const fetchAddress = (lat, lng) => {
        const geocoder = new window.kakao.maps.services.Geocoder()
        geocoder.coord2RegionCode(lng, lat, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const region = result.find((r) => r.region_type === "H")
                if (region) {
                    setAddress(region.address_name)
                }
            }
        });
    };

    return [ location, address ]
}

export default useLocation