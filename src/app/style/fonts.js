import {css} from 'styled-components'
import PretendardRegular from '../assets/fonts/Pretendard-Regular.subset.woff2'
import PretendardRegularwoff from '../assets/fonts/Pretendard-Regular.subset.woff'
import PretendardMedium from '../assets/fonts/Pretendard-Medium.subset.woff2'
import PretendardMediumwoff from '../assets/fonts/Pretendard-Medium.subset.woff'
import PretendardSemiBold from '../assets/fonts/Pretendard-SemiBold.subset.woff2'
import PretendardSemiBoldwoff from '../assets/fonts/Pretendard-SemiBold.subset.woff'
import PretendardBold from '../assets/fonts/Pretendard-Bold.subset.woff2'
import PretendardBoldwoff from '../assets/fonts/Pretendard-Bold.subset.woff'
import PretendardExtraBold from '../assets/fonts/Pretendard-ExtraBold.subset.woff2'
import PretendardExtraBoldwoff from '../assets/fonts/Pretendard-ExtraBold.subset.woff'

const fonts  = css`
@font-face {
  font-family: 'Pretendard';
  font-weight: 400;
  font-display: swap;
  font-style: normal;
  src: url(${PretendardRegular}) format('woff2'),
    /* Super Modern Browsers */
    url(${PretendardRegularwoff}) format('woff');
  }
  @font-face {
  font-family: 'Pretendard';
  font-weight: 500;
  font-display: swap;
  font-style: normal;
  src: url(${PretendardMedium}) format('woff2'),
    url(${PretendardMediumwoff}) format('woff');
  }
  @font-face {
  font-family: 'Pretendard';
  font-weight: 600;
  font-display: swap;
  font-style: normal;
  src: url(${PretendardSemiBold}) format('woff2'),
    url(${PretendardSemiBoldwoff}) format('woff');
  }
  @font-face {
  font-family: 'Pretendard';
  font-weight: 700;
  font-display: swap;
  font-style: normal;
  src: url(${PretendardBold}) format('woff2'),
    url(${PretendardBoldwoff}) format('woff');
  }	
  @font-face {
  font-family: 'Pretendard';
  font-weight: 800;
  font-display: swap;
  font-style: normal;
  src: url(${PretendardExtraBold}) format('woff2'),				
    url(${PretendardExtraBoldwoff}) format('woff');
  }

`

export default fonts 