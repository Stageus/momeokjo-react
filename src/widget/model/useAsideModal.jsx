import { useRecoilState } from "recoil"
import asideModalState from "./ui/asideModalState"

const useAsideModal = () => {


  const [AsideModalOpen, setAsideModalOpen] =  useRecoilState(asideModalState)

  const toggleAsideModal = () => {
    setAsideModalOpen(AsideModalOpen => !AsideModalOpen)
  }

  return [AsideModalOpen, toggleAsideModal]
}

export default useAsideModal