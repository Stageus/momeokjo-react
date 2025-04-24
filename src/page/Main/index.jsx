import { useNavigate, useLocation } from "react-router-dom"

import s from "./style"

import Button from "../../shared/Button"
import Kakaomap from "./ui/Kakaomap"
import Recommend from "./ui/Recommend"
import Myinfo from "./ui/MyInfo"

import useAsideModal from "./model/useAsideModal"
import useKakaomap from "./model/useKakaomap"
import useRestaurantFilter from "./model/useRestaurantFilter"
import useRadius from "./model/useRadius"

import HamburgerImg from "./assets/ico-menu.svg"
import FoldImg from "./assets/ico-fold.svg"
import MyinfoIcon from "./assets/ico-myinfo.svg"


function Main() {

  const navigate = useNavigate()
  const location = useLocation() // 추천모달 & 내정보 모달 구분을 위한 location 추가 

  const [asideModalOpen, toggleAsideModal] = useAsideModal()
  const [myLocation, address, clickedPosition, clickedAddress, handleMapClick] = useKakaomap()
  const [value, selectedRadius, radiusData, handleSlideChange] = useRadius()
  const [
    selectedMenu,   
    selectedRestaurant,
    selectedRandomRestaurant,
    setSelectedRandomRestaurant,
    isLoading,
    isSearched,
    formatPhoneNumber,
    formatTime,
    handleCategoryChange,
    handleFilterSearch,
    handleRecommend
  ] = useRestaurantFilter(myLocation, selectedRadius, radiusData)


  return (
    <s.Main>

      <Kakaomap 
        myLocation={myLocation} 
        address={address} 
        clickedPosition={clickedPosition} 
        clickedAddress={clickedAddress} 
        handleMapClick={handleMapClick}
        selectedRestaurant={selectedRestaurant}
        selectedRandomRestaurant={selectedRandomRestaurant}
        setSelectedRandomRestaurant={setSelectedRandomRestaurant}
        formatPhoneNumber={formatPhoneNumber}
        formatTime={formatTime}
      />
      
      {/* 로그인 유무 체크 후 버튼 노출 처리 필요 */}
      <Button children={"로그인"} shape={"login"} onClick={() => navigate("/login")} />
      <Button children={"홍길동"} shape={"myinfo"} icon={MyinfoIcon} onClick={() => navigate("/my-info")} style={{position:"absolute", top:"70px"}}>

      </Button>

      {asideModalOpen ? (
        <s.HamburgerMenu>
          <s.HamburgerBtn onClick={toggleAsideModal}><s.HamburgerImg src={HamburgerImg} alt="햄버거 버튼" /></s.HamburgerBtn>
        </s.HamburgerMenu>
        ) : (
        <>
          <s.BtnAsideFold onClick={toggleAsideModal}><s.FoldImg src={FoldImg} alt="접기 버튼" /></s.BtnAsideFold>

          {location.pathname === "/my-info" ? (
              <Myinfo />
              ) : (
              <Recommend 
              myLocation={myLocation} 
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
          )}
        </>

      )}
    </s.Main>
  );
}

export default Main
