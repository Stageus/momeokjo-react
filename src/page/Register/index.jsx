import s from "./style"
import BackImg from "./assets/ico-back.svg"
import Button from "../../shared/Button"

import { useRef, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import restaurantsCategories from './assets/data/restaurantsCategories.json'   // 음식점 카테고리 리스트 조회 api 대체 : /restaurants/categories?include_deleted=
import useCategoryChange from "./model/useCategoryChange.js"

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialAddress = location.state?.address || ''
  const [address, setAddress] = useState(initialAddress)
  const [selectedMenu, handleCategoryChange] = useCategoryChange(restaurantsCategories)

  const categoryRef = useRef()
  const nameRef = useRef()
  const addressRef = useRef()
  const detailAddressRef = useRef()
  const phoneRef = useRef()
  const startTimeRef = useRef()
  const endTimeRef = useRef()

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const registerEvent = async () => {
    const response = await fetch("/restaurants", {
        "method" : "POST",
        "headers" : {
            "Content-Type" : "application/json"
        },
        "body" : JSON.stringify({
            "category_idx": categoryRef,
            "restaurant_name": nameRef.current.value,
            "address": address,
            "address_detail": detailAddressRef.current.value,
            "phone": phoneRef.current.value,
            "start_time": startTimeRef.current.value,
            "end_time": endTimeRef.current.value,
        })
    })

    const result = await response.json()
    console.log(result)

    switch(response.status){
        case 200:
            alert("음식점 등록이 완료되었습니다")
            break
        case 400:
            alert("입력값에 문제가 있습니다")
            break
        case 401:
            alert("로그인 후 이용해주세요")
            break
        case 404:
            alert("권한이 없는 요청입니다")
            break
        case 500:
            alert("알수없는 오류로 동작 불가 잠시 후 다시 시도해주세요")
            break
    }
  }

  return (
    <s.Container>
      <s.Header>
        <s.BtnBack onClick={() => navigate(-1)}>
          <s.BackImg src={BackImg} alt="뒤로가기 버튼" />
        </s.BtnBack>
        <s.Title>음식점 등록</s.Title>
      </s.Header>
      <s.Content>
        <s.TitleInput>카테고리 선택</s.TitleInput>

        <s.WrapBtnRound>
            {restaurantsCategories.map((elem, idx) => (
            <s.BtnRound key={idx} onClick={() => handleCategoryChange(idx)} $primary={selectedMenu === idx} ref={categoryRef}>
            {elem.category_name}
            </s.BtnRound>
            ))}
        </s.WrapBtnRound>

        <s.BoxInput>
          <s.TitleInput>음식점 이름</s.TitleInput>
          <s.ContentInput ref={nameRef}></s.ContentInput>
          <s.ContentNoti>15자 이하 / 영어, 한글, 숫자, 특수문자 조합</s.ContentNoti>
        </s.BoxInput>

        <s.BoxInput>
          <s.TitleInput>음식점 도로명 주소</s.TitleInput>
          <s.ContentInput 
            value={address} 
            onChange={handleAddressChange}
            ref={addressRef}
          />
          <s.ContentNoti>도로명 주소를 입력해주세요</s.ContentNoti>
        </s.BoxInput>

        <s.BoxInput>
          <s.TitleInput>음식점 상세 주소</s.TitleInput>
          <s.ContentInput ref={detailAddressRef}></s.ContentInput>  
          <s.ContentNoti>100자 이하 / 영어, 한글, 숫자, 특수문자 조합</s.ContentNoti>
        </s.BoxInput>

        <s.BoxInput>
          <s.TitleInput>음식점 전화번호</s.TitleInput>
          <s.ContentInput ref={phoneRef}></s.ContentInput>
          <s.ContentNoti>10자 이하 숫자로만 기입해주세요</s.ContentNoti>
        </s.BoxInput>

        <s.BoxInput>
          <s.TitleInput>음식점 영업 시작 시간</s.TitleInput>
          <s.ContentInput ref={startTimeRef}></s.ContentInput>
          <s.ContentNoti>4자 이하 숫자로만 기입해주세요</s.ContentNoti>
        </s.BoxInput>

        <s.BoxInput>
          <s.TitleInput>음식점 영업 종료 시간</s.TitleInput>
          <s.ContentInput ref={endTimeRef}></s.ContentInput>
          <s.ContentNoti>4자 이하 숫자로만 기입해주세요</s.ContentNoti>
        </s.BoxInput>

        <Button $signup type="button" color="primary" size="largeUser" children={"음식점 등록"} onClick={registerEvent} />
      </s.Content>
    </s.Container>
  )
}

export default Register
 