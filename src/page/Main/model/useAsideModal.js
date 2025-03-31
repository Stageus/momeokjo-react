import { useState } from "react"

const useAsideModal = () => {


  const [AsideModalOpen, setAsideModalOpen] =  useState(false)

  const toggleAsideModal = () => {
    setAsideModalOpen(AsideModalOpen => !AsideModalOpen)
    console.log('??andjt')
  }

  return [AsideModalOpen, toggleAsideModal]
}

export default useAsideModal