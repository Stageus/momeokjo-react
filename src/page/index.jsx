import s from "./style"
import KakaoMap from "./ui/KakaoMap"
import categoryRecomend from './assets/data/categoryRecomend.json'

import useAsideModal from "../widget/model/useAsideModal"
import AsideModalBtn from "../widget/ui/AsideModalBtn"
import GotoLoginBtn from "../widget/ui/GotoLoginBtn"
import HamburgerBtn from "../widget/ui/HambergerBtn"

import useLocation from "./model/useLocation"
import useRadius from "./model/useRadius"
import useRestaurantFilter from "./model/useRestaurantFilter"
import useDetailPage from './model/useDetailPage';

import star from "./assets/ico-star-before.png"
import time from "./assets/ico-time.png"
import phone from "./assets/ico-phone.png"
import imgaddress from "./assets/ico-address.png"
import maploding from "./assets/loading-hambuger.svg"

function Page() {
  const [AsideModalOpen, toggleAsideModal] = useAsideModal()

  const [location, address] = useLocation()
  const [value, selectedRadius, radiusData, handleSlideChange] = useRadius()
  const [
      selectedMenu,
      selectedRestaurant,
      selectedRandomRestaurant,
      isLoading,
      uniqueCategories,
      formatPhoneNumber,
      formatTime,
      handleCategoryChange,
      handleFilterSearch,
      handleRecommend
   ] = useRestaurantFilter(categoryRecomend, location, selectedRadius, radiusData)
   const [isDetailOpen, selectedRestaurantDetail, detailPageOpen, closeDetailPage] = useDetailPage(categoryRecomend)


  return (
    <s.Main>
        <KakaoMap 
          location={location}
          address={address}
          selectedRestaurant={selectedRestaurant}
          selectedRandomRestaurant={selectedRandomRestaurant}
        />

      <GotoLoginBtn />

      {AsideModalOpen ? (
        <s.HamburgerMenu>
          <HamburgerBtn toggleAsideModal={toggleAsideModal}/>
        </s.HamburgerMenu>
      ) : (
        <s.AsideModal>
          <AsideModalBtn toggleAsideModal={toggleAsideModal} />
          <s.AsideModalDepth1>
                <s.Recommend>
                    <s.H2>추천 받고 싶은 음식점 위치의 반경을 조절해보세요!</s.H2>
                    <s.Range>
                        <s.RangeDot>
                        {radiusData.map((elem, idx) => (
                        <s.TextRange key={idx} $primary={selectedRadius === idx}>
                            {elem.title}
                        </s.TextRange>
                        ))}
                        </s.RangeDot>
                        <s.RangeValue $value={value}></s.RangeValue>
                        <s.RangeCircle $value={value}></s.RangeCircle>
                        <s.RangeSlide
                        name="range"
                        type="range"
                        min="0"
                        max="4"
                        value={value}
                        step="1"
                        onChange={handleSlideChange}
                        />
                    </s.Range>

                    <s.WrapBtnRound>
                        {uniqueCategories.map((elem, idx) => (
                        <s.BtnRound key={idx} onClick={() => handleCategoryChange(idx)} $primary={selectedMenu === idx}>
                            {elem.category_name}
                        </s.BtnRound>
                        ))}
                    </s.WrapBtnRound>

                    <s.BtnFullCustom $primary $lg onClick={handleFilterSearch}>음식점 조회</s.BtnFullCustom>
                    <s.SortLine></s.SortLine>
                    <s.H2 $gap20>랜덤으로 음식점 1곳을 추천받고 싶다면 클릭해보세요!</s.H2>

                    <s.BtnFullCustom $secondary $lg onClick={handleRecommend}>음식점 랜덤 추천 받기</s.BtnFullCustom>

                    <s.SortLine></s.SortLine>

                    <s.RecommendList>
                        {selectedRestaurant.length > 0 && (
                            selectedRestaurant.map((restaurant) => (
                                <s.RecommendBox key={restaurant.restaurant_idx}>
                                    <s.Title>
                                        <s.Name>{restaurant.restaurant_name}</s.Name>
                                        <s.Category>{restaurant.category_name}</s.Category>
                                        <s.Like><img src={star} alt="" />(13)</s.Like>
                                    </s.Title>
                                    <s.Adresstype1><img src={imgaddress} alt="" />도로명주소로 지번주소형태로 변환해야함</s.Adresstype1>
                                    <s.Adresstype2>지번 | {restaurant.address}</s.Adresstype2>
                                    <s.Time><img src={time} />{formatTime(restaurant.start_time)} ~ {formatTime(restaurant.end_time)}</s.Time>
                                    <s.Phone><img src={phone} />{formatPhoneNumber(restaurant.phone)}</s.Phone>
                                    <s.BtnFullCustom $grey $lg onClick={() => detailPageOpen(restaurant.restaurant_idx)}>상세보기</s.BtnFullCustom>
                                </s.RecommendBox>
                            ))
                        )}

                        {isLoading && (
                            <s.Loding>
                                <s.Loadingwrap>
                                    <s.LodingContent></s.LodingContent>
                                    <img src={maploding} />
                                    <s.LodingText>오늘 모먹을지 지도에서 보여드릴게요~!</s.LodingText>
                                </s.Loadingwrap>
                            </s.Loding> // 5초 동안 로딩 메시지 표시
                            )
                        }
                    </s.RecommendList>

                </s.Recommend>
            </s.AsideModalDepth1>
    
            {isDetailOpen && 
                <s.AsideModalDepth2>
                    <button onClick={closeDetailPage}>상세페이지 닫기</button>
                    {selectedRestaurantDetail && (
                        <>{selectedRestaurantDetail.restaurant_name}</>
                    )}
                </s.AsideModalDepth2>
            }
        </s.AsideModal>
      )}
    </s.Main>
  );
}

export default Page
