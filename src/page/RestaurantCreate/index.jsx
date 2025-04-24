import s from "./style"
import BackImg from "./assets/ico-back.svg"
import Button from "../../shared/Button"

import { useRef, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import restaurantsCategories from './assets/data/restaurantsCategories.json'   // 음식점 카테고리 리스트 조회 api 대체 : /restaurants/categories?include_deleted=
import useCategoryChange from "./model/useCategoryChange.js"

function RestaurantCreate() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialAddress = location.state?.address // 라우터에서 state 받아옴
  const [address, setAddress] = useState(initialAddress)
  const [categoryError, setCategoryError] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [detailAddressError, setDetailAddressError] = useState('')
  const [startTimeError, setStartTimeError] = useState('')
  const [endTimeError, setEndTimeError] = useState('')
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

  const validateCreateRestaurant = () => {

    let isValid = true
    let errors = {}
    
    const categoryError = categoryRef.current.value
    const nameError = nameRef.current.value
    const phoneError = phoneRef.current.value
    const addressError = addressRef.current.value
    const detailAddressError = detailAddressRef.current.value
    const startTimeError = startTimeRef.current.value
    const endTimeError = endTimeRef.current.value

    const numberOnly = /^[0-9]+$/ // 숫자만 입력

    
      // 카테고리 선택 검사
      if (selectedMenu === null || selectedMenu === undefined) {
        errors.category = '카테고리를 선택해주세요'
        isValid = false
      }

        // 음식점 이름 검사
      if (!nameError.trim()) {
          errors.name = '음식점 이름을 입력해주세요'
          isValid = false
      } else if (nameError.length > 15) {
          errors.name = '15자 이하로 입력해주세요'
          isValid = false
      }
      
  
      // 전화번호 검사
      if (!phoneError.trim())   {
          errors.phone = '전화번호를 입력해주세요'
          isValid = false
      } else if (phoneError.length > 10) {
          errors.phone = '10자 이하 숫자로만 입력해주세요'
          isValid = false
      } else if (!numberOnly.test(phoneError)) {
          errors.phone = '숫자만 입력해주세요'
          isValid = false
      }
  
      // 주소 검사
      if (!addressError.trim()) {
          errors.address = '도로명 주소를 입력해주세요'
          isValid = false
      }else if(addressError.length > 100) {
          errors.address = '100자 이하로 입력해주세요'
          isValid = false
      }

      // 상세 주소 검사
      if(!detailAddressError.trim()) {
          errors.detailAddress = '상세 주소를 입력해주세요'
          isValid = false
      }else if(detailAddressError.length > 100) {
          errors.detailAddress = '100자 이하로 입력해주세요'
          isValid = false
      }

      // 영업 시작 시간 검사
      if(!startTimeError.trim()) {
        errors.startTime = '영업 시작 시간을 입력해주세요'
        isValid = false
      }else if(startTimeError.length !== 4) {
        errors.startTime = '4자 숫자로만 입력해주세요'
        isValid = false
      } else if (!numberOnly.test(startTimeError)) {
        errors.startTime = '숫자만 입력해주세요'
        isValid = false
      }

      // 영업 종료 시간 검사
      if(!endTimeError.trim()) {
        errors.endTime = '영업 종료 시간을 입력해주세요'
        isValid = false
      }else if(endTimeError.length !== 4) {
        errors.endTime = '4자 숫자로만 입력해주세요'
        isValid = false
      } else if (!numberOnly.test(endTimeError)) {
        errors.endTime = '숫자만 입력해주세요'
        isValid = false
      }

  
      // 에러 메시지 
      setCategoryError(errors.category || '')
      setNameError(errors.name || '')
      setPhoneError(errors.phone || '')
      setAddressError(errors.address || '')
      setDetailAddressError(errors.detailAddress || '')
      setStartTimeError(errors.startTime || '')
      setEndTimeError(errors.endTime || '')
  
      return isValid;
  }

  const inputBoxList =[
    {
      ref: nameRef,
      error: nameError,
      titleInput: '음식점 이름',
      contentNoti: '15자 이하 입력',
      value: null,
      onChange: null,
      setError: setNameError,
      validate: validateCreateRestaurant
    },
    {
      ref: addressRef,
      error: addressError,
      titleInput: '음식점 도로명 주소',
      contentNoti: '100자 이하 입력',
      value: address,
      onChange: handleAddressChange,
      setError: setAddressError,
      validate: validateCreateRestaurant
    },
    {
      ref: detailAddressRef,
      error: detailAddressError,
      titleInput: '음식점 상세 주소',
      contentNoti: '100자 이하 입력',
      value: null,
      onChange: null,
      setError: setDetailAddressError,
      validate: validateCreateRestaurant
    },
    {
      ref: phoneRef,
      error: phoneError,
      titleInput: '음식점 전화번호',
      contentNoti: '10자 이하 숫자로만 입력',
      value: null,
      onChange: null,
      setError: setPhoneError,
      validate: validateCreateRestaurant
    },
    {
      ref: startTimeRef,
      error: startTimeError,
      titleInput: '음식점 영업 시작 시간',
      contentNoti: '4자 숫자로만 입력 (예시:0900)',
      value: null,
      onChange: null,
      setError: setStartTimeError,
      validate: validateCreateRestaurant
    },
    {
      ref: endTimeRef,
      error: endTimeError,
      titleInput: '음식점 영업 종료 시간',
      contentNoti: '4자 숫자로만 입력 (예시:2100)',
      value: null,
      onChange: null,
      setError: setEndTimeError,
      validate: validateCreateRestaurant
    }
  ]

  const registerEvent = async () => {

    // 유효성 검사 실패 시 오류 메시지 표시
    if(!validateCreateRestaurant()) {
      return
    } else {
      console.log(selectedMenu)
      console.log(nameRef.current.value)
      console.log(address)
      console.log(detailAddressRef.current.value)
      console.log(phoneRef.current.value)
      console.log(startTimeRef.current.value)
      console.log(endTimeRef.current.value)

      alert('등록성공')
        //   const response = await fetch("/restaurants", {
        //       "method" : "POST",
        //     "headers" : {
        //         "Content-Type" : "application/json"
        //     },
        //     "body" : JSON.stringify({
        //         "category_idx": categoryRef,
        //         "restaurant_name": nameRef.current.value,
        //         "address": address,
        //         "address_detail": detailAddressRef.current.value,
        //         "phone": phoneRef.current.value,
        //         "start_time": startTimeRef.current.value,
        //         "end_time": endTimeRef.current.value,
        //     })
        // })

        // const result = await response.json()
        // console.log(result)

        // switch(response.status){
        //     case 200:
        //         alert("음식점 등록이 완료되었습니다")
        //         break
        //     case 400:
        //         alert("입력값에 문제가 있습니다")
        //         break
        //     case 401:
        //         alert("로그인 후 이용해주세요")
        //         break
        //     case 404:
        //         alert("권한이 없는 요청입니다")
        //         break
        //     case 500:
        //         alert("알수없는 오류로 동작 불가 잠시 후 다시 시도해주세요")
        //         break
        // } 
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
              <s.BtnRound key={idx} onClick={() => handleCategoryChange(idx)} $primary={selectedMenu === idx}  ref={categoryRef}>
                {elem.category_name}
              </s.BtnRound>
            ))}
        </s.WrapBtnRound>
        {categoryError && (
          <s.ContentNoti $isError>{categoryError}</s.ContentNoti>
        )}

        {inputBoxList.map((elem, idx) => (
          <s.BoxInput key={idx}>
            <s.TitleInput>{elem.titleInput}</s.TitleInput>
            <s.ContentInput ref={elem.ref} $isError={!!elem.error} onChange={elem.onChange} value={elem.value}></s.ContentInput>
            <s.ContentNoti $isError={!!elem.error}>
              {elem.error ? elem.error : elem.contentNoti}
            </s.ContentNoti>
            </s.BoxInput>
        ))}

        <Button $signup type="button" color="primary" size="largeUser" children={"음식점 등록"} onClick={registerEvent} />
      </s.Content>
    </s.Container>
  )
}

export default RestaurantCreate
 