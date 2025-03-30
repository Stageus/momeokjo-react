import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleKakaoLogout = () => {
    if (typeof window !== 'undefined' && window.Kakao && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(function(response) {
        // 카카오 웹 세션 종료
        console.log('카카오 로그아웃 성공', response);
        window.Kakao.Auth.setAccessToken(undefined);

        // 로컬 데이터 삭제
        localStorage.removeItem('userId'); // 예시: userId 삭제

        // 페이지 리다이렉션
        alert('로그아웃 되었습니다.');
        navigate('/login');
      });
    } else {
      // 이미 로그아웃된 상태
      console.log('Not logged in.');
      navigate('/login');
    }
  };

  return (
    <button onClick={handleKakaoLogout}>
      카카오 로그아웃
    </button>
  );
};

export default LogoutButton;
