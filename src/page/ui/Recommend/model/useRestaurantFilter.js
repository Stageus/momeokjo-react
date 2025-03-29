import { useState } from 'react'


const useRestaurantFilter = (restaurantsCategoryIdxRangePage, restaurantsCategoryIdxRange, location, selectedRadius, radiusData, restaurantsCategories) => {
    const [selectedMenu, setSelectedMenu] = useState(null) // 카테고리 선택 : 초기값 null
    const [selectedRestaurant, setSelectedRestaurant] = useState([])  // 필터링된 음식점 리스트
    const [selectedRandomRestaurant, setSelectedRandomRestaurant] = useState(null) // 랜덤 필터링된 음식점 
    const [isLoading, setIsLoading] = useState(false) // 랜덤 필터링 전 로딩
    const [isSearched, setIsSearched] = useState(false) // 필터링 버튼 실행 유무 판단

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
        setSelectedRandomRestaurant(null)
        setIsSearched(true)

        if (selectedRadius === null || selectedMenu === null) {
            alert("반경과 메뉴를 모두 선택해주세요!");
            return;
        }

        const selectedCategoryName = restaurantsCategories[selectedMenu].category_name;

        const filteredRestaurants = restaurantsCategoryIdxRangePage.filter((restaurant) => {
            const distance = getDistance(
                location.lat, location.lng,
                restaurant.latitude, restaurant.longitude
            )
            return distance <= radiusData[selectedRadius].value && restaurant.category_name === selectedCategoryName;
        });


        const restaurantsWithJibun = filteredRestaurants.map(restaurant => ({
            ...restaurant,
            jibunAddress: '주소 변환 중...'
        }));
        
        setSelectedRestaurant(restaurantsWithJibun);

        // 각 음식점의 지번 주소 변환
        restaurantsWithJibun.forEach((restaurant, index) => {
            fetchJibunAddress(restaurant.address, (jibunAddress) => {
                setSelectedRestaurant(prev => prev.map((item, i) => 
                    i === index ? { ...item, jibunAddress: jibunAddress || '지번주소 없음' } : item
                ));
            });
        });

        console.log("내 현재 위치:", location)
        console.log("선택한 반경(m):",  radiusData[selectedRadius])
        console.log("선택한 카테고리:", selectedCategoryName)

        console.log("음식점:", filteredRestaurants)
    }

    // 도로명 주소를 지번 주소로 변환
    const fetchJibunAddress = (roadAddress, callback) => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(roadAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
            const jibunAddress = result[0]?.address?.address_name // 변환된 지번 주소 가져오기
            callback(jibunAddress)
        } else {
            console.error("지번 주소 변환 실패");
            callback(null)
        }
        })
    }


    // 랜덤 음식점 추천 버튼 클릭 시 실행
    const handleRecommend = () => {
        setIsLoading(true)
        setSelectedRestaurant([])
        setIsSearched(false)
        setSelectedRandomRestaurant(null)

        setTimeout(() => {
            const radiusValue = 1000

            if (!location.lat || !location.lng) {
                alert("현재 위치를 가져오는 중입니다. 잠시 후 다시 시도해주세요.");
                setIsLoading(false);
                return;
            }

            const nearbyRestaurants = restaurantsCategoryIdxRange.filter((restaurant) => {
                const distance = getDistance(
                    location.lat, location.lng,
                    restaurant.latitude, restaurant.longitude
                );
                return distance <= radiusValue;
            });

            if (nearbyRestaurants.length === 0) {
                alert("반경 1km 내에 음식점이 없습니다.");
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
        isSearched,
        formatPhoneNumber,
        formatTime,
        handleCategoryChange,
        handleFilterSearch,
        handleRecommend,
        fetchJibunAddress,
    ]
}

export default useRestaurantFilter