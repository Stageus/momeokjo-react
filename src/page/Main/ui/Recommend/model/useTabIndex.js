import React from "react"

const useTabIndex = () => {
    const [currentTab, setCurrentTab] = React.useState(0)

    const MenuReviewData = [
        { name: '메뉴', 
          content: [
          {
            "menu_idx": 201,
            "menu_name": "김치찌개",
            "price": "8000",
            "likes_count": 10,
            "image_url": "/경로",
            "is_mine": true,
          },
          {
            "menu_idx": 202,
            "menu_name": "된장찌개",
            "price": "7500",
            "likes_count": 10,
            "image_url": "/경로",
            "is_mine": true,
            }
          ]
         },
        { name: '후기', content: [
          {
            "review_idx": 101,
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