import { Routes, Route } from "react-router-dom"

import s from "./style"

import Layout from "./ui/Layout"
import KakaoMap from "./ui/KakaoMap"
import Detail from "./ui/Detail"

import useAsideModal from "../widget/model/useAsideModal"

import AsideModalBtn from "../widget/ui/AsideModalBtn"
import GotoLoginBtn from "../widget/ui/GotoLoginBtn"
import HamburgerBtn from "../widget/ui/HambergerBtn"



function Page() {

  const [AsideModalOpen, toggleAsideModal] = useAsideModal()

  return (
    <s.Main>
      <KakaoMap />

      <GotoLoginBtn />

      {AsideModalOpen ? (
        <s.HamburgerMenu>
          <HamburgerBtn toggleAsideModal={toggleAsideModal}/>
        </s.HamburgerMenu>
      ) : (
        <s.AsideModal>
          <AsideModalBtn toggleAsideModal={toggleAsideModal} />
          <s.AsideModalDepth1>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="restaurant/:id" element={<Detail toggleAsideModal={toggleAsideModal} />} />
            </Route>
          </Routes>
          </s.AsideModalDepth1>
        </s.AsideModal>
      )}
      

    </s.Main>
  );
}

export default Page;
