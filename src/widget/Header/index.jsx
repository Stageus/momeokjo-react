import React from "react"
import s from "./style"
import BackIcon from "./assets/ico-back.svg"

const Header = ({
  headerTitle,
  backNavigation,
}) => {
  return (
      <s.Header>
        <s.Back onClick={backNavigation}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼" />
        </s.Back>
        <s.Title>{headerTitle}</s.Title>
        <s.Empty />
      </s.Header>
  )
}

export default Header