import s from './style'
import FoldImg from '../../assets/ico-fold.svg'

function AsideModal(props) {

  const {toggleAsideModal} = props
  
  return(
    <s.BtnAsideFold onClick={toggleAsideModal}>
      <s.FoldImg src={FoldImg} alt="접기 버튼" />
    </s.BtnAsideFold>
  )
}

export default AsideModal