import { Map , MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import markermylocation from "./assets/ico-mylocationmarker.svg"
import markerfilter from "./assets/ico-filtermarker.svg"

import s from "./style";

function KakaoMap(props){ 
    const { location, address, selectedRestaurant, selectedRandomRestaurant } = props

    return (
        <Map center={location} style={{ width: '100%', height: '100%' }} level={5}>
        {/* 현재 위치 마커 */}
        {location.lat && location.lng && 
            <MapMarker 
            position={location} 
            image={{ src: markermylocation, size: {width:50, height:50} }}
            />
        } 

        {/* 선택된 음식점 리스트 마커 표시 */}
        {selectedRestaurant.map((restaurant) => (
            <MapMarker
            key={restaurant.restaurant_idx}
            position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
            image={{ src: markerfilter, size: {width:51, height:63}}}
            />
        ))}

        {/* 랜덤 음식점 마커 표시 */}
        {selectedRandomRestaurant&&(
            <>
            <MapMarker
                key={selectedRandomRestaurant.restaurant_idx}
                position={{ lat: selectedRandomRestaurant.latitude, lng: selectedRandomRestaurant.longitude }}
                image={{ src: markerfilter, size: {width:51, height:63}}}
            />
            <CustomOverlayMap position={{ lat: selectedRandomRestaurant.latitude, lng: selectedRandomRestaurant.longitude }}>
                <div style={{backgroundColor:'white', border:'3px solid black', width:'200px', height:'100px', textAlign:'center', position:'absolute', top:'-160px', left:'0'}}>
                {selectedRandomRestaurant.restaurant_name}
                </div>
            </CustomOverlayMap>
            </>
        )}

        <s.CurrentLocation>{address && <>{address}</>}</s.CurrentLocation>
        </Map>
    );
}

export default KakaoMap;