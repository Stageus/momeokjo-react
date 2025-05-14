import {useRecoilValue} from "recoil"
import { authState } from "../../../../shared/model/atom"

import s from "./style"
import useTabIndex from "./model/useTabIndex"
import useNicknameUpdate from "./model/useNicknameUpdate"
import useFormat from "../../model/useFormat"
import useLogout from "./model/useLogout"


import MyinfoIcon from "./assets/ico-myinfo.svg"
import star from "./assets/ico-star-before.png"
import time from "./assets/ico-time.png"
import phone from "./assets/ico-phone.png"
import imgaddress from "./assets/ico-address.png"
import like from "./assets/ico-like.svg"

import Button from "../../../../shared/Button"

function Myinfo() {

  const auth = useRecoilValue(authState)

  

  const [formatPhoneNumber, formatTime] = useFormat()
  const [currentTab, activeTabIndex, MenuReviewData] = useTabIndex()
  const [nicknameUpdate, nicknameUpdateEdit] = useNicknameUpdate()

  const requestLogout = useLogout()

  return (
    <s.AsideModal>
      <s.AsideModalDepth1>
        <s.Myinfo>
            
            <s.MyinfoHeader>
                {nicknameUpdate ? (
                    <>
                    <s.MyNameChange placeholder="변경할 닉네임을 입력해주세요" />
                    <s.MyinfoBtn onClick={nicknameUpdateEdit}>
                        <s.MyinfoBtnText >닉네임 수정 완료</s.MyinfoBtnText>
                    </s.MyinfoBtn>
                    </>
                ) : (
                    <>
                      <s.MyName>
                        <img src={MyinfoIcon} />
                        {auth.user?.nickname}
                        <Button children={"로그아웃"} shape={"logout"} onClick={requestLogout} />
                    </s.MyName>
                    <s.MyinfoBtn onClick={nicknameUpdateEdit}>
                        <s.MyinfoBtnText>닉네임 수정</s.MyinfoBtnText>
                    </s.MyinfoBtn>
                    
                    </>
                )}

                    

            </s.MyinfoHeader>

            <s.SortLine $lg></s.SortLine>
            <s.TabList>
                {MenuReviewData.map((elem,idx) => (
                    <s.TabListCont $currenttab={currentTab === idx} onClick={() => activeTabIndex(idx)} key={idx}>{elem.name}</s.TabListCont>
                ))}
            </s.TabList>
            <div>
              {currentTab === 0 && (
                <>
                {MenuReviewData[currentTab].content.map((elem,idx) => (
                  <s.RestaurantBox key={idx}>
                    <s.Title>
                      <s.Name>{elem.restaurant_name}</s.Name>
                      <s.Category>{elem.category_name}</s.Category>
                      <s.Like><img src={star} alt="" />(13)</s.Like>
                    </s.Title>
                    <s.Adresstype1><img src={imgaddress} alt="" />{elem.address} {elem.address_detail}</s.Adresstype1>
                    <s.Adresstype2>지번 |</s.Adresstype2>
                    <s.Time><img src={time} />{formatTime(elem.start_time)} ~ {formatTime(elem.end_time)}</s.Time>
                    <s.FlexBox>
                      <s.Phone><img src={phone} />{formatPhoneNumber(elem.phone)}</s.Phone>
                      <s.BtnRoundLine>폐업 신고</s.BtnRoundLine>
                    </s.FlexBox>

                    <s.BtnFullCustom $grey $lg>상세보기</s.BtnFullCustom>
                  </s.RestaurantBox>
                ))}
                </>
              )}
              {currentTab === 1 && (
                <>
                {MenuReviewData[currentTab].content.map((elem,idx) => (
                  <s.ReviewItem key={idx}>
                    <s.ReviewRestaurant>{elem.restaurant_name}</s.ReviewRestaurant>
                    <s.ReviwMenu>{elem.menu_name}</s.ReviwMenu>
                    <s.ReviewContent>{elem.content}</s.ReviewContent>
                    <s.MenuItemBox>
                      <s.MenuItemLike><img src={like} />({elem.likes_count})</s.MenuItemLike>
                      <s.BtnText>후기 신고</s.BtnText>
                    </s.MenuItemBox>
                  </s.ReviewItem>
                ))}
                </>
              )}  
            </div>

        </s.Myinfo>
      </s.AsideModalDepth1>
    </s.AsideModal>
  )
}

export default Myinfo
 