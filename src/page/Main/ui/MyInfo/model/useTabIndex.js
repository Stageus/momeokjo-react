import React from "react"

const useTabIndex = () => {
  
    const [currentTab, setCurrentTab] = React.useState(0)


    const MenuReviewData = [
        { name: '즐겨찾기', 
          content: [
          {
            "restaurant_idx": 1,
            "category_name": "치킨",
            "likes_count": 20,
            "restaurant_name": "BHC치킨 여의도한강공원3호점", 
            "longitude": 126.927745696174 ,
            "latitude": 37.5308485071395,
            "address": "서울 영등포구 한강남자전거길 1451 ",
            "address_detail": "1층",
            "phone": "01012345678",
            "start_time": "1000",
            "end_time": "2200",
          },
          ]
         },
        { name: '후기', content: [
          {
            "review_idx": 101,
            "restaurant_name": "할매 김치찌개",
            "menu_name": "김치찌개",
            "likes_count": 10,
            "user_idx": 2,
            "nickname": "김치찌개좋아",
            "content": "정말 맛있었습니다.",
            "image_url": "https://doamin/review1.jpg",
            "created_at": "2021-07-01T12:00:00Z",
            "is_mine": true,
            },
            {
            "review_idx": 102,
            "restaurant_name": "할매 돼지국밥",
            "menu_name": "돼지국밥",
            "likes_count": 10,
            "user_idx": 5,
            "nickname": "맛있으면짖는사람",
            "content": "서비스가 만족스러웠습니다.",
            "image_url": "https://doamin/review2.jpg",
            "created_at": "2021-07-02T14:30:00Z",
            "is_mine": false,
            } 
        ] },
    ]
    
    const activeTabIndex = (idx) => {
        setCurrentTab(idx)
    }


    return [currentTab, activeTabIndex, MenuReviewData]
}

export default useTabIndex