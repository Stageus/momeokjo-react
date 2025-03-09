import s from './style'
import FoldImg from '../../assets/ico-fold.svg'
import useAsideModal from '../../model/useAsideModal'

function AsideModal() {

  const [, toggleAsideModal] = useAsideModal()
  
  return(
    <s.BtnAsideFold onClick={toggleAsideModal}>
      <s.FoldImg src={FoldImg} alt="접기 버튼" />
    </s.BtnAsideFold>
  )
}

export default AsideModal