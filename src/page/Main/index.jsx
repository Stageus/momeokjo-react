import { useNavigate } from "react-router-dom"
import { Map as KakaoMap , MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import s from "./style"

import Button from "../../shared/Button"
import Recommend from "./ui/Recommend"

import useAsideModal from "./model/useAsideModal"
import useLocation from "./model/useLocation"
import useRestaurantFilter from "./model/useRestaurantFilter"
import useRadius from "./model/useRadius"

import HamburgerImg from "./assets/ico-menu.svg"
import FoldImg from "./assets/ico-fold.svg"
import markermylocation from './assets/ico-mylocationmarker.svg'
import markerfilter from './assets/ico-filtermarker.svg'
import mapregister from './assets/ico-reg.svg'
import star from './assets/ico-star-before.png'
import imgaddress from './assets/ico-address.png'
import icopencel from './assets/ico-pencel.svg'
import time from './assets/ico-time.png'
import phone from './assets/ico-phone.png'


function Main() {

  const navigate = useNavigate()

  const [asideModalOpen, toggleAsideModal] = useAsideModal()
  const [location, address, clickedPosition, clickedAddress, handleMapClick] = useLocation()
  const [value, selectedRadius, radiusData, handleSlideChange] = useRadius()
  const [
    selectedMenu,   
    selectedRestaurant,
    selectedRandomRestaurant,
    isLoading,
    isSearched,
    formatPhoneNumber,
    formatTime,
    handleCategoryChange,
    handleFilterSearch,
    handleRecommend
  ] = useRestaurantFilter(location, selectedRadius, radiusData)


  return (
    <s.Main>

      <KakaoMap 
      center={location} 
      style={{ width: '100%', height: '100%' }} 
      level={4}
      onRightClick={handleMapClick}>
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
                    <s.Time><img src={time} />{formatTime(selectedRandomRestaurant.start_time)} ~ {formatTime(selectedRandomRestaurant.end_time)}</s.Time>
                    <s.Phone><img src={phone} />{formatPhoneNumber(selectedRandomRestaurant.phone)}</s.Phone>
                    <s.BtnFullCustom onClick={() => navigate(`/${selectedRandomRestaurant.restaurant_idx}`)}>상세보기</s.BtnFullCustom>
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
              <s.BtnRegister onClick={() => navigate("/Register", { 
                state: { 
                  address: clickedAddress
                }
              })}> <img src={icopencel} alt="" />음식점 등록</s.BtnRegister>
          </CustomOverlayMap>
        </>
      )}
      <s.CurrentLocation>{address && <>{address}</>}</s.CurrentLocation>
      </KakaoMap>
      
      <Button children={"로그인"} shape={"login"} onClick={() => navigate("/login")} />

      {asideModalOpen ? (
        <s.HamburgerMenu>
          <s.HamburgerBtn onClick={toggleAsideModal}><s.HamburgerImg src={HamburgerImg} alt="햄버거 버튼" /></s.HamburgerBtn>
        </s.HamburgerMenu>
        ) : (
        <>
          <s.BtnAsideFold onClick={toggleAsideModal}><s.FoldImg src={FoldImg} alt="접기 버튼" /></s.BtnAsideFold>
          <Recommend 
            location={location} 
            value={value}
            selectedRadius={selectedRadius}
            radiusData={radiusData}
            handleSlideChange={handleSlideChange}
            selectedMenu={selectedMenu}
            selectedRestaurant={selectedRestaurant}
            isLoading={isLoading}
            isSearched={isSearched}
            formatPhoneNumber={formatPhoneNumber}
            formatTime={formatTime}
            handleCategoryChange={handleCategoryChange}
            handleFilterSearch={handleFilterSearch}
            handleRecommend={handleRecommend}
          />
        </>

      )}
    </s.Main>
  );
}

export default Main
