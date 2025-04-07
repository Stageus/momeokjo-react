import React from "react"

const useModalRestaurant = () => {
    const [currentModal, setCurrentModal] = React.useState(0)
    const modalTitle =  [
        {id:1, title:"폐업 신고"},
        {id:2, title:"메뉴 수정"},
        {id:3, title:"메뉴 신고"},
        {id:4, title:"메뉴 등록"},
        {id:5, title:"후기 신고"},
        {id:6, title:"후기 등록"},  
    ]
    
    const activeModalIndex = (idx) => {
        setCurrentModal(idx)
    }
    return [currentModal, activeModalIndex, modalTitle]
}

export default useModalRestaurant