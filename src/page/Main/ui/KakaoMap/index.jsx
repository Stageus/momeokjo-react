import { useEffect, useState } from "react"
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import s from "./style"

const KakaoMap = () => {
	const [location, setLocation] = useState({ lat: null, lng: null })
	const [address, setAddress] = useState()

	// 현재 위치 가져온다
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords
				setLocation({ lat: latitude, lng: longitude }) // 현재 위치의 위도, 경도를 state에 저장
				fetchAddress(latitude, longitude)
			}
		)	
	}, []);


	const fetchAddress = (lat, lng) => {
		const geocoder = new window.kakao.maps.services.Geocoder() // 위도, 경도를 행정동 주소로 변환
		geocoder.coord2RegionCode(lng, lat, (result, status) => {
			console.log(result)
		  if (status === window.kakao.maps.services.Status.OK) {
			const region = result.find((r) => r.region_type === "H") // 행정동 정보로 저장 
			if (region) {
			  setAddress(region.address_name)
			}
		  }
		})
	  }

	return(
		<>
		<Map center={location} style={{ width: '100%', height: '100%' }} level={3}>
			<MapMarker position={location} />
			<s.CurrentLocation>{address && <>{address}</>}</s.CurrentLocation>
		</Map>

		</>
    )
}

export default KakaoMap