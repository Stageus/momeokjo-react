import s from "./style"
import BackImg from "./assets/ico-back.svg"
import Button from "../../../shared/ui/Button"
import { useNavigate, useLocation } from "react-router-dom"
import restaurantsCategories from '../Recommend/assets/data/restaurantsCategories.json'   // 음식점 카테고리 리스트 조회 api 대체 : /restaurants/categories?include_deleted=

import useRegister from "./model/useRegister.js"

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const address = location.state?.address
  const [selectedMenu, handleCategoryChange] = useRegister(restaurantsCategories)

  return (
    <>
      <s.Login>
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
              <Button
              key={idx} 
              onClick={() => handleCategoryChange(idx)} 
              selected={selectedMenu === idx}
              size="medium"
              color={selectedMenu === idx ? "primary" : "default"}
              >
                {elem.category_name}
              </Button>
              ))}
          </s.WrapBtnRound>

          <s.BoxInput>
            <s.TitleInput>음식점 이름</s.TitleInput>
            <s.ContentInput></s.ContentInput>
            <s.ContentNoti>15자 이하 / 영어, 한글, 숫자, 특수문자 조합</s.ContentNoti>
          </s.BoxInput>

          <s.BoxInput>
            <s.TitleInput>음식점 도로명 주소</s.TitleInput>
            <s.ContentInput value={address}></s.ContentInput>
            <s.ContentNoti>도로명 주소를 입력해주세요</s.ContentNoti>
          </s.BoxInput>

          <s.BoxInput>
            <s.TitleInput>음식점 상세 주소</s.TitleInput>
            <s.ContentInput></s.ContentInput>
            <s.ContentNoti>100자 이하 / 영어, 한글, 숫자, 특수문자 조합</s.ContentNoti>
          </s.BoxInput>

          <s.BoxInput>
            <s.TitleInput>음식점 전화번호</s.TitleInput>
            <s.ContentInput></s.ContentInput>
            <s.ContentNoti>10자 이하 숫자로만 기입해주세요</s.ContentNoti>
          </s.BoxInput>

          <s.BoxInput>
            <s.TitleInput>음식점 영업 시작 시간</s.TitleInput>
            <s.ContentInput></s.ContentInput>
            <s.ContentNoti>4자 이하 숫자로만 기입해주세요</s.ContentNoti>
          </s.BoxInput>

          <s.BoxInput>
            <s.TitleInput>음식점 영업 종료 시간</s.TitleInput>
            <s.ContentInput></s.ContentInput>
            <s.ContentNoti>4자 이하 숫자로만 기입해주세요</s.ContentNoti>
          </s.BoxInput>

          <Button type="button" color="primary" size="largeUser" children={"음식점 등록"} />

        </s.Content>
      </s.Login>
    </>
  )
}

export default Register
 