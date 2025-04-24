const useFormat = () => {

    // 전화번호 변환
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    }

    // 시간 변환
    const formatTime = (time) => {
        return time.replace(/(\d{2})(\d{2})/,'$1:$2')
    }

    return [ formatPhoneNumber, formatTime ]
}

export default useFormat