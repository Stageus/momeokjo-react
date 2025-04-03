const KAKAO_API_KEY = '3aa50c332a228c651a867b0711d06d06'; // 카카오 API 키를 여기에 입력하세요

export const convertToJibunAddress = async (roadAddress) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(roadAddress)}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    
    if (data.documents && data.documents.length > 0) {
      return data.documents[0].address.address_name; // 지번 주소 반환
    }
    
    return null;
  } catch (error) {
    console.error('주소 변환 중 오류 발생:', error);
    return null;
  }
};