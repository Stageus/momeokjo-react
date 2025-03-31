import { Map , MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { useNavigate } from "react-router-dom";
import markermylocation from "./assets/ico-mylocationmarker.svg"
import markerfilter from "./assets/ico-filtermarker.svg"
import mapregister from "./assets/ico-reg.svg"
import icopencel from "./assets/ico-pencel.svg"
import star from "./assets/ico-star-before.png"
import imgaddress from "./assets/ico-address.png"

import s from "./style";

function KakaoMap(props){ 
    const navigate = useNavigate()
    const { location, address, selectedRestaurant, selectedRandomRestaurant, clickedPosition, clickedAddress, handleMapClick } = props


    return (
        <Map center={location} style={{ width: '100%', height: '100%' }} level={4} onRightClick={handleMapClick}>
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
                <s.RandomModal>
                    <s.Title>
                        <s.Name>{selectedRandomRestaurant.restaurant_name}</s.Name>
                        <s.Category>{selectedRandomRestaurant.category_name}</s.Category>
                        <s.Like><img src={star} alt="" />(13)</s.Like>
                    </s.Title>
                    <s.Adresstype1><img src={imgaddress} alt="" />{selectedRandomRestaurant.address}</s.Adresstype1>
                    <s.Adresstype2>지번 | {selectedRandomRestaurant.jibunAddress}</s.Adresstype2>
                    <button onClick={() => navigate(`/${selectedRandomRestaurant.restaurant_idx}`)}>상세보기</button>
                </s.RandomModal>
            </CustomOverlayMap>
            </>
        )}
      {/* 클릭한 위치에 인포윈도우 표시 */}
      {clickedPosition && (
        <>
          <MapMarker 
          position={clickedPosition} 
          image={{ src: mapregister, size: {width:20, height:20} }}
          />
          <CustomOverlayMap position={clickedPosition}>
              <s.BtnRegister onClick={() => navigate("/Register", { 
                state: { 
                  address: clickedAddress,
                  latitude: clickedPosition.lat,
                  longitude: clickedPosition.lng
                }
              })}> <img src={icopencel} alt="" />음식점 등록</s.BtnRegister>
          </CustomOverlayMap>
        </>
      )}
        <s.CurrentLocation>{address && <>{address}</>}</s.CurrentLocation>
        </Map>
    );
}

export default KakaoMap;