import { useNavigate, useParams } from "react-router-dom"

import s from "./style"

import AsideModal from "../../../widget/ui/AsideModal"

import mainmenu from "../../assets/ico-mainFood.png"
import close from "../../assets/ico-close.png"
import star from "../../assets/ico-fillStar.png"
import map from "../../assets/ico-map.svg"
import time from "../../assets/ico-time.svg"
import call from "../../assets/ico-call.svg"



function Detail() {

  const navigate = useNavigate()
  const {id} = useParams()

  return (
    <s.Detail>

      <AsideModal />

      <s.RestaurentImgBox>
        <s.RestaurentImg src={mainmenu} alt="메인메뉴" />
        <s.CloseBtn onClick={() => navigate("/")}>
          <s.CloseBtnImg src={close} alt="닫기 버튼" />
        </s.CloseBtn>
      </s.RestaurentImgBox>

      <s.RestaurentInformation>

        <s.RestaurentTitlebox>
          <s.RestaurentTitle>{id}</s.RestaurentTitle>
          <s.RestaurentDetailWrap>

            <s.RestaurentCategoryBox>
              <s.RestaurentCategory>
                찜·탕
              </s.RestaurentCategory>
              <s.FavoriteBtn>
                <s.FavoriteBtnImg src={star} />
              </s.FavoriteBtn>
              <s.FavoriteIndex>
                (13)
              </s.FavoriteIndex>
            </s.RestaurentCategoryBox>

            <s.RestaurentAdressBox>
            <s.AdressImg src={map} />
              {/* <s.RestaurentAdress>
                서울 영등포구 국회대로 780 엘지여의도에클라트 (우)07237
                <s.RestaurentAdressStreetNum>
                지번 | 여의도동 14-21
              </s.RestaurentAdressStreetNum>
              </s.RestaurentAdress> */}
              
            </s.RestaurentAdressBox>

            <s.RestaurentDateBox>
              <s.DateImg src={time} alt="시계" />
              <s.RestaurentDate>
                월,화,수,목,금,일 10:00 ~ 20:00
              </s.RestaurentDate>
            </s.RestaurentDateBox>

            <s.RestaurentDateBox>
              <s.DateImg src={call} alt="시계" />
              <s.RestaurentDate>
                02-785-1950
              </s.RestaurentDate>
            </s.RestaurentDateBox>

          </s.RestaurentDetailWrap>
          


        </s.RestaurentTitlebox>

      </s.RestaurentInformation>
    </s.Detail>
  )

}

export default Detail