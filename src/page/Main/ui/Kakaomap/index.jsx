import { useNavigate } from "react-router-dom"
import { Map as KakaoMap , MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import s from "./style"
import useMyRestaurantLike from "./model/useMyRestaurantLike"

import markermylocation from './assets/ico-mylocationmarker.svg'
import markerfilter from './assets/ico-filtermarker.svg'
import mapregister from './assets/ico-reg.svg'
import star from './assets/ico-star-before.png'
import imgaddress from './assets/ico-address.png'
import icopencel from './assets/ico-pencel.svg'
import time from './assets/ico-time.png'
import phone from './assets/ico-phone.png'
import mylike from './assets/ico-mylike.svg'


function Kakaomap(props) {

    const { myLocation, address, clickedPosition, clickedAddress, handleMapClick, selectedRestaurant, selectedRandomRestaurant, formatPhoneNumber, formatTime } = props
    const [myRestaurantLike, myRestaurantLikeOpen] = useMyRestaurantLike()
    const navigate = useNavigate()

    const 내즐겨찾기목록데이터 = [
        {
            "restaurant_idx": 2,
            "category_name": "피자",
            "likes_count": 2,
            "restaurant_name": "피자스쿨 인천송현점", 
            "longitude": 126.63580509878076 ,
            "latitude": 37.479394680509785,
            "address": "인천 동구 송현로 33 1",
            "address_detail": "1층",
            "phone": "01012345678",
            "start_time": "1000",
            "end_time": "2200",
            "is_mine": true
          
        }
    ]

    return (

        <KakaoMap 
        center={myLocation} 
        style={{ width: '100%', height: '100%' }} 
        level={4}
        onRightClick={handleMapClick}>
            {/* 현재 위치 마커 */}
            {myLocation.lat && myLocation.lng && 
                <MapMarker 
                position={myLocation} 
                image={{ src: markermylocation, size: {width:50, height:50} }}
                />
            } 
            {/* 내 좋아요 음식점 마커 표시 */}
            {내즐겨찾기목록데이터.map((restaurant, idx) => (
                <>
                <MapMarker
                key={idx}
                position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                image={{ src: mylike, size: {width:24, height:24}}}
                onClick={myRestaurantLikeOpen}
                />

                {myRestaurantLike && (
                <CustomOverlayMap position={{ lat: restaurant.latitude, lng: restaurant.longitude }}>
                <s.RandomModal $like>
                    <s.Title>
                        <s.Name>{restaurant.restaurant_name}</s.Name>
                        <s.Category>{restaurant.category_name}</s.Category>
                        <s.Like><img src={star} alt="" />({restaurant.likes_count})</s.Like>
                    </s.Title>
                    <s.Adresstype1><img src={imgaddress} alt="" />{restaurant.address}</s.Adresstype1>
                    <s.Adresstype2>지번 | {restaurant.address_detail}</s.Adresstype2>
                    <s.Time><img src={time} />{formatTime(restaurant.start_time)} ~ {formatTime(restaurant.end_time)}</s.Time>
                    <s.Phone><img src={phone} />{formatPhoneNumber(restaurant.phone)}</s.Phone>
                    <s.BtnFullCustom onClick={() => navigate(`restaurant/${restaurant.restaurant_idx}`)}>상세보기</s.BtnFullCustom>
                </s.RandomModal>
                </CustomOverlayMap>
                )}
                </>
            ))}

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
                    <s.RandomModal>
                        <s.Title>
                            <s.Name>{selectedRandomRestaurant.restaurant_name}</s.Name>
                            <s.Category>{selectedRandomRestaurant.category_name}</s.Category>
                            <s.Like><img src={star} alt="" />(13)</s.Like>
                        </s.Title>
                        <s.Adresstype1><img src={imgaddress} alt="" />{selectedRandomRestaurant.address}</s.Adresstype1>
                        <s.Adresstype2>지번 | {selectedRandomRestaurant.jibunAddress}</s.Adresstype2>
                        <s.Time><img src={time} />{formatTime(selectedRandomRestaurant.start_time)} ~ {formatTime(selectedRandomRestaurant.end_time)}</s.Time>
                        <s.Phone><img src={phone} />{formatPhoneNumber(selectedRandomRestaurant.phone)}</s.Phone>
                        <s.BtnFullCustom onClick={() => navigate(`restaurant/${selectedRandomRestaurant.restaurant_idx}`)}>상세보기</s.BtnFullCustom>
                    </s.RandomModal>
                </CustomOverlayMap>
                </>
            )}

            {/* 지도 우클릭 시 음식점 등록 하러가기 버튼 생성 */}
            {clickedPosition && (
                <>
                <MapMarker 
                position={clickedPosition} 
                image={{ src: mapregister, size: {width:20, height:20} }}
                />
                <CustomOverlayMap position={clickedPosition}>
                    <s.BtnRegister onClick={() => navigate("/restaurant-create", { 
                        state: { 
                        address: clickedAddress
                        }
                    })}> <img src={icopencel} alt="" />음식점 등록</s.BtnRegister>
                </CustomOverlayMap>
                </>
            )}
            <s.CurrentLocation>{address && <>{address}</>}</s.CurrentLocation>
        </KakaoMap>
        
    )
}

export default Kakaomap
