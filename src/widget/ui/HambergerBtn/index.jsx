import s from "./style"
import HamburgerImg from "../../assets/ico-menu.svg";

function HamburgerBtn(props) {

  const {toggleAsideModal} = props

  return (
    <s.HamburgerBtn onClick={toggleAsideModal} >
      <s.HamburgerImg src={HamburgerImg} alt="햄버거 버튼" />
    </s.HamburgerBtn>
  )
}

export default HamburgerBtn