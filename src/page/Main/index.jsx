import s from "./style"
import useAsideModal from "./model/useAsideModal"

import GotoLoginBtn from "../../shared/ui/GotoLoginBtn"


import HamburgerImg from "./assets/ico-menu.svg"
import FoldImg from "./assets/ico-fold.svg"


import KakaoMap from "./ui/KakaoMap"
import Recommend from "./ui/Recommend"
import useLocation from "./ui/KakaoMap/model/useLocation"
import { useState } from "react"


function Main() {

  const [AsideModalOpen, toggleAsideModal] = useAsideModal()
  const [location, address, clickedPosition, clickedAddress, handleMapClick] = useLocation()
  const [mapProps, setMapProps] = useState({
    selectedRestaurant: [],
    selectedRandomRestaurant: null
  })


  return (
    <s.Main>
       <KakaoMap 
          location={location}
          address={address}
          selectedRestaurant={mapProps.selectedRestaurant}
          selectedRandomRestaurant={mapProps.selectedRandomRestaurant}
          clickedPosition={clickedPosition}
          clickedAddress={clickedAddress}
          handleMapClick={handleMapClick}
        />
        

      <GotoLoginBtn />

      {AsideModalOpen ? (
        <s.HamburgerMenu>
          <s.HamburgerBtn onClick={toggleAsideModal}><s.HamburgerImg src={HamburgerImg} alt="햄버거 버튼" /></s.HamburgerBtn>
        </s.HamburgerMenu>
      ) : (
        <>
          <s.BtnAsideFold onClick={toggleAsideModal}><s.FoldImg src={FoldImg} alt="접기 버튼" /></s.BtnAsideFold>
          <Recommend location={location} setMapProps={setMapProps}/>
        </>

      )}
    </s.Main>
  );
}

export default Main
