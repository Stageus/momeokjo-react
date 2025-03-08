import React,{useState} from "react"

const useAsideModal = () => {

  const [AsideModalOpen, setAsideModalOpen] =  useState(false)

  const toggleAsideModal = () => {
    setAsideModalOpen(AsideModalOpen => !AsideModalOpen)
  }

  return [AsideModalOpen, toggleAsideModal]
}

export default useAsideModal