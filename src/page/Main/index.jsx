import Recommend from './ui/Recommend'
import KakaoMap from './ui/KakaoMap'
import { useState } from 'react'
import s from "./style"
import HamburgerImg from './assets/ico-menu.svg'
import FoldImg from './assets/ico-fold.svg'
import { Routes, Route, useNavigate } from "react-router-dom"


function Main() {
  
  const navigate = useNavigate()

  // AsideModal과 햄버거 버튼을 PAGE에만 들어가기때문에 state로만 관리해도 될것 같아서 recoil로 안넣었음
  const [AsideModalOpen, setAsideModalOpen] = useState(false)

  const toggleAsideModal = () => {
    setAsideModalOpen(AsideModalOpen => !AsideModalOpen)
  }


  return (
    <s.Main>
      <KakaoMap></KakaoMap>
      <s.BtnLogin onClick={() => navigate("/login")}>로그인</s.BtnLogin> 

      {AsideModalOpen ? (
        <s.HamburgerMenu onClick={toggleAsideModal}>
          <s.HamburgerBtn><s.HamburgerImg src={HamburgerImg} alt="햄버거 버튼" /></s.HamburgerBtn>
        </s.HamburgerMenu>
      ) : (
        <s.AsideModal>
          <s.BtnAsideFold onClick={toggleAsideModal}><s.FoldImg src={FoldImg} alt="접기 버튼" /></s.BtnAsideFold>
          <s.AsideModalDepth1>
            <Recommend />
          </s.AsideModalDepth1>
        </s.AsideModal>
      )}
    </s.Main>
  )
}

export default Main
 