// import { useState } from "react"
import s from "./style"
import { useNavigate } from "react-router-dom"

import useDataSelect from "../../../../widget/model/useDataSelect"

import Button from "../../../../widget/ui/Button"

function Recommend() {

  const navigate = useNavigate()

  const restaurants = [
    { id: 1, name: "치킨집"},
    { id: 2, name: "고깃집"},
    { id: 3, name: "맛집"},
  ]

  const goToDetail = (id) => {
    navigate(`/restaurant/${id}`)
    console.log(`Navigating to: /restaurant/${id}`);
  }

  const [selectedRadius, setSelectedRadius, selectedMenu, setSelectedMenu, handleRecommend, radiusData, menuData] = useDataSelect()
  
  
  return (
    <>
      <s.Recommend>
        <s.H2>추천 받고 싶은 음식점 위치의 반경을 조절해보세요!</s.H2>
        <s.WrapBtnRound>
          {radiusData.map((elem, idx) => (
            <Button
              color="default"
              size="small" 
              key={idx} 
              onClick={() => setSelectedRadius(idx)} 
              selected={selectedRadius === idx}
            >
              {elem.title}
            </Button>))}
        </s.WrapBtnRound>

        <s.H2>추천 받고 싶은 메뉴를 선택해 보세요!</s.H2>
        <s.WrapBtnRound>
          {menuData.map((elem, idx) => (
            <Button 
              color="default"
              size="small" 
              key={idx} 
              onClick={() => setSelectedMenu(idx)} 
              selected={selectedMenu === idx}
            >
              {elem}
            </Button>))}
        </s.WrapBtnRound>

        <Button color="primary" size="large" onClick={handleRecommend} children="음식점 추천 받기"></Button>

        <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <button onClick={() => goToDetail(restaurant.id)}>
              {restaurant.name} 상세보기
            </button>
          </li>
        ))}
      </ul>
      </s.Recommend>

      {/* {isDetailOpen && (
        // <s.Detail>
        //   <h2>음식점 상세페이지</h2>
        //   <button onClick={handleDetailClose}>닫기</button>
        // </s.Detail>
        <Detail />

      )} */}
    </>
  )
}

export default Recommend
 