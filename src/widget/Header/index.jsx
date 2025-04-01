import React from "react"
import s from "./style"
import BackIcon from "./assets/ico-back.svg"
import Button from "../../shared/Button"

const Header = ({
  headerTitle,
  backNavigation,
}) => {
  return (
      <s.Header>
        <Button onClick={backNavigation} shape="back" icon={BackIcon} />
        <s.Title>{headerTitle}</s.Title>
        <s.Empty />
      </s.Header>
  )
}

export default Header