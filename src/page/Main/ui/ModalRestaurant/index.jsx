
import s from "./style"

import btnclose from './assets/ico-close.svg'


function ModalRestaurant(props) {

    const { activeModalIndex, currentModal, title } = props


    return (
        <s.ModalRestaurant>
            <s.ModalRestaurantContent>
                <s.CloseModal onClick={() => activeModalIndex(0)}><img src={btnclose} /></s.CloseModal>
                 <s.ModalRestaurantTitle>{title}</s.ModalRestaurantTitle>

                {/* 폐업 신고 */}
                {currentModal === 1 && (        
                    <s.ModalRestaurantText>폐업 신고 처리 완료했습니다</s.ModalRestaurantText>
                )}

                {/* 음식점 메뉴 수정 */}
                {currentModal === 2 && (
                    <s.ModalRestaurantForm>
                        <s.ModalRestaurantFormInput>
                            <s.ModalRestaurantFormInputTitle>메뉴 이름</s.ModalRestaurantFormInputTitle>
                            <s.ModalRestaurantFormInputInput type="text" />
                        </s.ModalRestaurantFormInput>
                        <s.ModalRestaurantFormInput>
                            <s.ModalRestaurantFormInputTitle>메뉴 가격</s.ModalRestaurantFormInputTitle>
                            <s.ModalRestaurantFormInputInput type="text" />
                        </s.ModalRestaurantFormInput>
                        <s.BtnFullCustom $secondary $lg>메뉴 수정</s.BtnFullCustom>
                    </s.ModalRestaurantForm>
                )}

                {/* 메뉴 신고 */}
                {currentModal === 3 && (        
                    <s.ModalRestaurantText>메뉴 신고 처리 완료했습니다</s.ModalRestaurantText>
                )}


                {/* 음식점 메뉴 등록 */}
                {currentModal === 4 && (
                <s.ModalRestaurantForm>
                    <s.ModalRestaurantFormInput>
                        <s.ModalRestaurantFormInputTitle>메뉴 이름</s.ModalRestaurantFormInputTitle>
                        <s.ModalRestaurantFormInputInput type="text" />
                    </s.ModalRestaurantFormInput>
                    <s.ModalRestaurantFormInput>
                        <s.ModalRestaurantFormInputTitle>메뉴 가격</s.ModalRestaurantFormInputTitle>
                        <s.ModalRestaurantFormInputInput type="text" />
                    </s.ModalRestaurantFormInput>
                    <s.BtnFullCustom $secondary $lg>메뉴 등록</s.BtnFullCustom>
                </s.ModalRestaurantForm>
                )}

                {/* 후기 신고 */}
                {currentModal === 5 && (        
                    <s.ModalRestaurantText>후기 신고 처리 완료했습니다</s.ModalRestaurantText>
                )}

                {/* 후기 등록 */}
                {currentModal === 6 && (        
                <s.ModalRestaurantForm>
                    <s.ModalRestaurantFormInput>
                        <s.ModalRestaurantFormInputTitle>음식점 메뉴 선택</s.ModalRestaurantFormInputTitle>
                        <s.ModalRestaurantFormSelect>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </s.ModalRestaurantFormSelect>
                    </s.ModalRestaurantFormInput>
                    <s.ModalRestaurantFormInput>
                        <s.ModalRestaurantFormInputTitle>음식점 후기</s.ModalRestaurantFormInputTitle>
                        <s.ModalRestaurantFormTextarea />
                    </s.ModalRestaurantFormInput>
                    <s.BtnFullCustom $secondary $lg>후기 등록</s.BtnFullCustom>
                </s.ModalRestaurantForm>
                )}
            </s.ModalRestaurantContent>
        </s.ModalRestaurant>
    )
}

export default ModalRestaurant
