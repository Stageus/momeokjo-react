import s from "./style"
import { useEffect } from "react"

import maploding from "./assets/loading-hambuger.svg"
import nodatacry from "./assets/ico-cry.svg"
import star from "./assets/ico-star-before.png"
import time from "./assets/ico-time.png"
import phone from "./assets/ico-phone.png"
import imgaddress from "./assets/ico-address.png"

import useRadius from "./model/useRadius"
import useRestaurantFilter from "./model/useRestaurantFilter"
import useDetailPage from './model/useDetailPage'

import restaurantsCategoryIdxRange from './assets/data/restaurantsCategoryIdxRange.json'   // 음식점 랜덤 추천 api 대체 : /restaurants/recommends?category_idx=&range=
import restaurantsCategoryIdxRangePage from './assets/data/restaurantsCategoryIdxRangePage.json'   // 음식점 리스트 조회 api 대체 : /restaurants?category_idx=&range=&page= 
import restaurantsCategories from './assets/data/restaurantsCategories.json'   // 음식점 카테고리 리스트 조회 api 대체 : /restaurants/categories?include_deleted=
import restaurantsIdx from './assets/data/restaurantsIdx.json'   // 음식점 상세 조회 api 대체 : /restaurants/:restaurant_idx

import closeDetail from './assets/close-detail.svg'
import thumb from './assets/thumb.png'


function Recommend({ location, setMapProps }) {
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
  ] = useRestaurantFilter(restaurantsCategoryIdxRangePage, restaurantsCategoryIdxRange, location, selectedRadius, radiusData, restaurantsCategories)
  const [isDetailOpen, Depth2RestaurantIdx, detailPageOpen, closeDetailPage] = useDetailPage(restaurantsIdx)

  // useRestaurantFilter의 결과가 업데이트될 때마다 맵 props 업데이트
  useEffect(() => {
    setMapProps({
      selectedRestaurant,
      selectedRandomRestaurant
    })
  }, [selectedRestaurant, selectedRandomRestaurant])

  return (
    <s.AsideModal>
    
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
            {restaurantsCategories.map((elem, idx) => (
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
            {isLoading && (
              <s.Loding>
                <s.Loadingwrap>
                  <s.LodingContent></s.LodingContent>
                  <img src={maploding} />
                  <s.LodingText>오늘 모먹을지 지도에서 보여드릴게요~!</s.LodingText>
                </s.Loadingwrap>
              </s.Loding>
            )}

            {isSearched && (
              selectedRestaurant.length > 0 ? (
                selectedRestaurant.map((restaurant) => (
                  <s.RecommendBox key={restaurant.restaurant_idx}>
                    <s.Title>
                      <s.Name>{restaurant.restaurant_name}</s.Name>
                      <s.Category>{restaurant.category_name}</s.Category>
                      <s.Like><img src={star} alt="" />(13)</s.Like>
                    </s.Title>
                    <s.Adresstype1><img src={imgaddress} alt="" />{restaurant.address} {restaurant.address_detail}</s.Adresstype1>
                    <s.Adresstype2>지번 | {restaurant.jibunAddress}</s.Adresstype2>
                    <s.Time><img src={time} />{formatTime(restaurant.start_time)} ~ {formatTime(restaurant.end_time)}</s.Time>
                    <s.Phone><img src={phone} />{formatPhoneNumber(restaurant.phone)}</s.Phone>
                    <s.BtnFullCustom $grey $lg onClick={() => detailPageOpen(restaurant.restaurant_idx)}>상세보기</s.BtnFullCustom>
                  </s.RecommendBox>
                ))
              ) : (
                <s.Nodata><img src={nodatacry} />조건에 맞는 음식점이 없습니다.</s.Nodata>
              )
            )}
          </s.RecommendList>
        </s.Recommend>
      </s.AsideModalDepth1>


      {isDetailOpen && 
          <s.AsideModalDepth2>
            <s.BtnCloseDetail onClick={closeDetailPage}><img src={closeDetail} /></s.BtnCloseDetail>
    
              <s.DetailImg><img src={thumb} /></s.DetailImg>

              {restaurantsIdx
              .filter((restaurant) => Number(restaurant.restaurant_idx) === Number(Depth2RestaurantIdx)) // 리스트에서 받아온 idx와 같은 데이터만 필터링
              .map((restaurant) => (
                <s.DetailBox key={restaurant.restaurant_idx}>
                  <s.DetailTitle>{restaurant.restaurant_name}</s.DetailTitle>
                  <s.DetailCategory>{restaurant.category_name}     <s.Like><img src={star} alt="" />(13)</s.Like></s.DetailCategory>
                  <s.DetailAdresstype1><img src={imgaddress} alt="" />{restaurant.address} {restaurant.address_detail}</s.DetailAdresstype1>
                  <s.DetailAdresstype2>지번 | {restaurant.jibunAddress}</s.DetailAdresstype2>
                  <s.DetailTime><img src={time} />{formatTime(restaurant.start_time)} ~ {formatTime(restaurant.end_time)}</s.DetailTime>
                  <s.DetailPhone><img src={phone} />{formatPhoneNumber(restaurant.phone)}</s.DetailPhone>
                </s.DetailBox>
              ))}
         
            <s.SortLine $lg></s.SortLine>
          </s.AsideModalDepth2>
          }

    </s.AsideModal>
  );
}

export default Recommend;
