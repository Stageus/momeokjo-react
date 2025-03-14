import { useState } from "react";

function useDataSelect() {

  const [selectedRadius, setSelectedRadius] = useState(null)
  const [selectedMenu, setSelectedMenu] = useState(null)

  const radiusData = [
    {title : '100m', value : 100},
    {title : '500m', value : 500},
    {title : '1km', value : 1000},
    {title : '1.5km', value : 1500},
    {title : '2km', value : 2000}
  ]

  const menuData = ['치킨', '중식', '돈까스·회', '피자', '패스트푸드', '족발·보쌈', '분식', '카페·디저트', '한식']

  const handleRecommend = () => {
    if(selectedRadius !== null && selectedMenu != null){
      alert(`선택한 반경 : ${radiusData[selectedRadius].title}, 선택한 메뉴 : ${menuData[selectedMenu]}`)
    }else{
      alert('반경과 메뉴 모두 선택해주세요')
    }
  }

  return [selectedRadius, setSelectedRadius, selectedMenu, setSelectedMenu, handleRecommend, radiusData, menuData]
}

export default useDataSelect