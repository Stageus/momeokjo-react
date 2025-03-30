import s from "./style"
import useAsideModal from "../shared/ui/AsideModalBtn/model/useAsideModal"
import AsideModalBtn from "../shared/ui/AsideModalBtn"
import GotoLoginBtn from "../shared/ui/GotoLoginBtn"
import HamburgerBtn from "../shared/ui/HambergerBtn"

import KakaoMap from "./ui/KakaoMap"
import Recommend from "./ui/Recommend"
import useLocation from "./ui/KakaoMap/model/useLocation"
import { useState } from "react"


function Page() {
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
          <HamburgerBtn toggleAsideModal={toggleAsideModal}/>
        </s.HamburgerMenu>
      ) : (
        <>
         <AsideModalBtn toggleAsideModal={toggleAsideModal} />
         <Recommend toggleAsideModal={toggleAsideModal} location={location} setMapProps={setMapProps}/>
        </>

      )}
    </s.Main>
  );
}

export default Page
