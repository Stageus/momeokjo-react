import { useState } from 'react'


const useCategoryChange = () => {
    const [selectedMenu, setSelectedMenu] = useState(null) // 카테고리 선택 : 초기값 null

    // 음식점 카테고리 선택 시 실행 (상태만 업데이트)
    const handleCategoryChange = (idx) => {
        setSelectedMenu(idx);
    }          
    return [
        selectedMenu,
        handleCategoryChange,
    ]
}

export default useCategoryChange