import { useState } from "react"
import s from "./style"
import { useNavigate } from "react-router-dom"

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

  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  const [selectedRadius, setSelectedRadius] = useState(null)
  const [selectedMenu, setSelectedMenu] = useState(null)

  

  const handleRecommend = () => {
    if(selectedRadius !== null && selectedMenu != null){
      alert(`선택한 반경 : ${radiusData[selectedRadius].title}, 선택한 메뉴 : ${menuData[selectedMenu]}`)
    }else{
      alert('반경과 메뉴 모두 선택해주세요')
    }
  }

  const handleDetailClose = () => {
    setIsDetailOpen(false)
  }

  const radiusData = [
    {title : '100m', value : 100},
    {title : '500m', value : 500},
    {title : '1km', value : 1000},
    {title : '1.5km', value : 1500},
    {title : '2km', value : 2000}
  ]

  const menuData = ['치킨', '중식', '돈까스·회', '피자', '패스트푸드', '족발·보쌈', '분식', '카페·디저트', '한식']
  
  return (
    <>
      <s.Recommend>
        <s.H2>추천 받고 싶은 음식점 위치의 반경을 조절해보세요!</s.H2>
        <s.WrapBtnRound>
          {radiusData.map((elem, idx) => (<s.BtnRound key={idx}  onClick={() => setSelectedRadius(idx)} $primary={selectedRadius === idx}>{elem.title}</s.BtnRound>))}
        </s.WrapBtnRound>

        <s.H2>추천 받고 싶은 메뉴를 선택해 보세요!</s.H2>
        <s.WrapBtnRound>
          {menuData.map((elem, idx) => (<s.BtnRound key={idx} onClick={() => setSelectedMenu(idx)} $primary={selectedMenu === idx}>{elem}</s.BtnRound>))}
        </s.WrapBtnRound>

        <s.BtnFullCustom $primary $lg onClick={handleRecommend}>음식점 추천 받기</s.BtnFullCustom>

        {/* <button onClick={() => navigate("/1",)} 
        style={{position : 'absolute', top : '300px', left : '16px', width : 'calc(100% - 32px)', height : '50px', backgroundColor : 'red'}}
        >음식점 상세페이지 열기 테스트중!!!
        </button> */}

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
 