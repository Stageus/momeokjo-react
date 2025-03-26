import s from "./style"
import CloseImg from "./assets/ico-close.svg"

function CloseBtn(props) {
  

  return(
    <s.BtnClose>
      <s.CloseImg src={CloseImg} alt="닫기 버튼" />
    </s.BtnClose>
  )
}