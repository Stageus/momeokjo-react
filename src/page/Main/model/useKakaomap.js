import { useState, useEffect } from 'react'

const useKakaomap = () => {
    const [myLocation, setMylocation] = useState({ lat: null, lng: null })
    const [address, setAddress] = useState()
    const [clickedPosition, setClickedPosition] = useState(null);
    const [clickedAddress, setClickedAddress] = useState(null);

    // 현재 위치 가져오기
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setMylocation({ lat: latitude, lng: longitude })
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
        })
    }

    const handleMapClick = (_, mouseEvent) => {
        const latlng = mouseEvent.latLng;
        const clickedLat = latlng.getLat()
        const clickedLng = latlng.getLng()
    
        setClickedPosition({ lat: clickedLat, lng: clickedLng })
        console.log(clickedPosition)
    
        const geocoder = new window.kakao.maps.services.Geocoder()
        geocoder.coord2Address(clickedLng, clickedLat, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const address = result[0].road_address 
              ? result[0].road_address.address_name 
              : result[0].address.address_name;
            setClickedAddress(address);
          }
        })
      }

    return [ myLocation, address, clickedPosition, clickedAddress, handleMapClick ]
}

export default useKakaomap