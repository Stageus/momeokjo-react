import React from 'react'
import s from "./style"
import CloseIcon from './assets/ico-close.svg'
import Button from '../../shared/Button'

const Modal = ({
  modalTitle,
  closeModal,
  inputList,
  registerBtn,
  btnText
}) => {
  return (
    <s.Container>
      <s.Header>
        <s.Empty />
        <s.Title>{modalTitle}</s.Title>
        <Button onClick={closeModal} shape="close" icon={CloseIcon} />
      </s.Header>
      <s.Form>
        {inputList.map((elem, idx) => 
          <s.InputBox key={idx}>
            <s.Label>{elem.label}</s.Label>
            <s.Input 
              type={elem.type}
              $error={elem.error_message}
              ref={elem.ref}
              placeholder={elem.placeholder}
            />
            {elem.error_message && (
              <s.Message>
                {elem.error_message}
              </s.Message>
            )}
          </s.InputBox>
        )}
        <Button $modal onClick={registerBtn} color="primary" children={btnText} size="largeMap" />
      </s.Form>
    </s.Container>
  )
}

export default Modal