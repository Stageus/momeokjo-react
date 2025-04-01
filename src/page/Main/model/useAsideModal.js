import { useState } from "react"

const useAsideModal = () => {

  const [asideModalOpen, setAsideModalOpen] =  useState(false)

  const toggleAsideModal = () => {
    setAsideModalOpen(asideModalOpen => !asideModalOpen)
    console.log('??andjt')
  }

  return [asideModalOpen, toggleAsideModal]
}

export default useAsideModal