import { useState } from 'react'

const useRadius = () => {
    const [value, setValue] = useState(2) // range 값 저장
    const [selectedRadius, setSelectedRadius] = useState(2) // 반경선택 : 초기값 1km 

    // 반경 Range 
    const radiusData = [
        {title: '100m', value: 100},
        {title: '500m', value: 500},
        {title: '1km', value: 1000},
        {title: '1.5km', value: 1500},
        {title: '2km', value: 2000}
    ]
    
    // 반경 Range 변경
    const handleSlideChange = (e) => {
        const newValue = Number(e.target.value)
        setValue(newValue)
        setSelectedRadius(newValue)
    };

    return [value, selectedRadius, radiusData, handleSlideChange]
}

export default useRadius