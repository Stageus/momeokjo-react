import { useNavigate, Routes, Route } from "react-router-dom";

import s from "./style";

import Layout from "./ui/Layout";
import KakaoMap from "./ui/KakaoMap";
import Detail from "./ui/Detail";

import HamburgerImg from "./assets/ico-menu.svg";
import FoldImg from "./assets/ico-fold.svg";
import useAsideModal from "./model/useAsideModal";

function Page() {
  
  const navigate = useNavigate();
  const [AsideModalOpen, toggleAsideModal] = useAsideModal();

  return (
    <s.Main>
      <KakaoMap />

      <s.BtnLogin onClick={() => navigate("/login")}>로그인</s.BtnLogin>

      {AsideModalOpen ? (
        <s.HamburgerMenu onClick={toggleAsideModal}>
          <s.HamburgerBtn>
            <s.HamburgerImg src={HamburgerImg} alt="햄버거 버튼" />
          </s.HamburgerBtn>
        </s.HamburgerMenu>
      ) : (
        <s.AsideModal>
          <s.BtnAsideFold onClick={toggleAsideModal}>
            <s.FoldImg src={FoldImg} alt="접기 버튼" />
          </s.BtnAsideFold>
          <s.AsideModalDepth1>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="restaurant/:id" element={<Detail />} />
            </Route>
          </Routes>
          </s.AsideModalDepth1>
        </s.AsideModal>
      )}
      

    </s.Main>
  );
}

export default Page;
