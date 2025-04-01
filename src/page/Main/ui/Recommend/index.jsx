import s from "./style"

import restaurantsCategories from '../../assets/data/restaurantsCategories.json'   // 음식점 카테고리 리스트 조회 api 대체 : /restaurants/categories?include_deleted=
import restaurantsIdx from './assets/data/restaurantsIdx.json'   // 음식점 상세 조회 api 대체 : /restaurants/:restaurant_idx
import useDetailPage from "./model/useDetailPage"

import maploding from "./assets/loading-hambuger.svg"
import nodatacry from "./assets/ico-cry.svg"
import star from "./assets/ico-star-before.png"
import time from "./assets/ico-time.png"
import phone from "./assets/ico-phone.png"
import imgaddress from "./assets/ico-address.png"
import closeDetail from './assets/close-detail.svg'
import thumb from './assets/thumb.png'


function Recommend(props) {

  const { value, selectedRadius, radiusData, handleSlideChange, selectedMenu, selectedRestaurant, isLoading, isSearched, formatPhoneNumber, handleCategoryChange, formatTime, handleFilterSearch, handleRecommend } = props
  const [isDetailOpen, depth2restaurantidx, detailPageOpen, closeDetailPage] = useDetailPage(restaurantsIdx)

  // 어디로 옮겨야 할까 ,,
  const selectedRandomRestaurant = restaurantsIdx.find(
    restaurant => Number(restaurant.restaurant_idx) === Number(depth2restaurantidx)
  )

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
                selectedRestaurant.map((elem, idx) => (
                  <s.RecommendBox key={idx}>
                    <s.Title>
                      <s.Name>{elem.restaurant_name}</s.Name>
                      <s.Category>{elem.category_name}</s.Category>
                      <s.Like><img src={star} alt="" />(13)</s.Like>
                    </s.Title>
                    <s.Adresstype1><img src={imgaddress} alt="" />{elem.address} {elem.address_detail}</s.Adresstype1>
                    <s.Adresstype2>지번 | {elem.jibunAddress}</s.Adresstype2>
                    <s.Time><img src={time} />{formatTime(elem.start_time)} ~ {formatTime(elem.end_time)}</s.Time>
                    <s.Phone><img src={phone} />{formatPhoneNumber(elem.phone)}</s.Phone>
                    <s.BtnFullCustom $grey $lg onClick={() => detailPageOpen(elem.restaurant_idx)}>상세보기</s.BtnFullCustom>
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

              {selectedRandomRestaurant && (
                <s.DetailBox key={selectedRandomRestaurant.restaurant_idx}>
                  <s.DetailTitle>{selectedRandomRestaurant.restaurant_name}</s.DetailTitle>
                  <s.DetailCategory>{selectedRandomRestaurant.category_name}     <s.Like><img src={star} alt="" />(13)</s.Like></s.DetailCategory>
                  <s.DetailAdresstype1><img src={imgaddress} alt="" />{selectedRandomRestaurant.address} {selectedRandomRestaurant.address_detail}</s.DetailAdresstype1>
                  <s.DetailAdresstype2>지번 | {selectedRandomRestaurant.jibunAddress}</s.DetailAdresstype2>
                  <s.DetailTime><img src={time} />{formatTime(selectedRandomRestaurant.start_time)} ~ {formatTime(selectedRandomRestaurant.end_time)}</s.DetailTime>
                  <s.DetailPhone><img src={phone} />{formatPhoneNumber(selectedRandomRestaurant.phone)}</s.DetailPhone>
                </s.DetailBox>
              )}
         
            <s.SortLine $lg></s.SortLine>
          </s.AsideModalDepth2>
          }

    </s.AsideModal>
  );
}

export default Recommend;
