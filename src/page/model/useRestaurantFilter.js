import { useState } from 'react'


const useRestaurantFilter = (categoryRecomend, location, selectedRadius, radiusData) => {
    const [selectedMenu, setSelectedMenu] = useState(null) // 카테고리 선택 : 초기값 null
    const [selectedRestaurant, setSelectedRestaurant] = useState([])  // 필터링된 음식점 리스트
    const [selectedRandomRestaurant, setSelectedRandomRestaurant] = useState(null) // 랜덤 필터링된 음식점 
    const [isLoading, setIsLoading] = useState(false) // 랜덤 필터링 전 로딩

    // category_name 중복 제거 (필터 버튼내 데이터로 사용하기 때문)
    const uniqueCategories = [
        ...new Map(categoryRecomend.map((item) => [item.category_name, item])).values()
    ]

    // 거리 계산 함수 (Haversine 공식)
    const getDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371e3;
        const rad = Math.PI / 180;
        const dLat = (lat2 - lat1) * rad;
        const dLng = (lng2 - lng1) * rad;
    
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return R * c;
    }

    // 음식점 카테고리 선택 시 실행 (상태만 업데이트)
    const handleCategoryChange = (idx) => {
        setSelectedMenu(idx);
    }

    // 음식점 조회 버튼 클릭 시 실행
    const handleFilterSearch = () => {  
        setSelectedRandomRestaurant(null);

        if (selectedRadius === null || selectedMenu === null) {
            alert("반경과 메뉴를 모두 선택해주세요!");
            return;
        }

        const selectedCategoryName = uniqueCategories[selectedMenu].category_name;

        const filteredRestaurants = categoryRecomend.filter((restaurant) => {
            const distance = getDistance(
                location.lat, location.lng,
                restaurant.latitude, restaurant.longitude
            );
            return distance <= radiusData[selectedRadius].value && restaurant.category_name === selectedCategoryName;
        });

        setSelectedRestaurant(filteredRestaurants);
    }
    // 랜덤 음식점 추천 버튼 클릭 시 실행
    const handleRecommend = () => {
        setIsLoading(true);
        setSelectedRestaurant([]);
        setSelectedRandomRestaurant(null);

        setTimeout(() => {
            const radiusValue = 1000;

            if (!location.lat || !location.lng) {
                alert("현재 위치를 가져오는 중입니다. 잠시 후 다시 시도해주세요.");
                setIsLoading(false);
                return;
            }

            const nearbyRestaurants = categoryRecomend.filter((restaurant) => {
                const distance = getDistance(
                    location.lat, location.lng,
                    restaurant.latitude, restaurant.longitude
                );
                return distance <= radiusValue;
            });

            if (nearbyRestaurants.length === 0) {
                alert("반경 1000m 내에 음식점이 없습니다.");
                setIsLoading(false);
                return;
            }

            const randomIndex = Math.floor(Math.random() * nearbyRestaurants.length);
            setSelectedRandomRestaurant(nearbyRestaurants[randomIndex]);
            setIsLoading(false);
        }, 3000);
    }

    // 전화번호 변환
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    }

    // 시간 변환
    const formatTime = (time) => {
        return time.replace(/(\d{2})(\d{2})/,'$1:$2')
    }
            

    return [
        selectedMenu,
        selectedRestaurant,
        selectedRandomRestaurant,
        isLoading,
        uniqueCategories,
        formatPhoneNumber,
        formatTime,
        handleCategoryChange,
        handleFilterSearch,
        handleRecommend
    ]
}

export default useRestaurantFilter