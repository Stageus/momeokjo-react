import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{
      color:  ${props => props.theme.textcolor};
      background-color: ${props  => props.theme.backgroundcolor};
  }
  @font-face {
  font-family: 'Pretendard';
  font-weight: 400;
  font-display: swap;
  font-style: normal;
  src: url('../assets/fontsPretendard-Regular.subset.woff2') format('woff2'),
    /* Super Modern Browsers */
    url('../assets/fontsPretendard-Regular.subset.woff') format('woff');
  }
  @font-face {
	font-family: 'Pretendard';
	font-weight: 500;
	font-display: swap;
	font-style: normal;
	src: url('../assets/fontsPretendard-Medium.subset.woff2') format('woff2'),
	  /* Super Modern Browsers */
		url('../assets/fontsPretendard-Medium.subset.woff') format('woff');
  }
  /* Pretendard SemiBold */
  @font-face {
	font-family: 'Pretendard';
	font-weight: 600;
	font-display: swap;
	font-style: normal;
	src: url('../assets/fontsPretendard-SemiBold.subset.woff2') format('woff2'),
	  /* Super Modern Browsers */
		url('../assets/fontsPretendard-SemiBold.subset.woff') format('woff');
  }
  
  /* Pretendard Bold */
  @font-face {
	font-family: 'Pretendard';
	font-weight: 700;
	font-display: swap;
	font-style: normal;
	src: url('../assets/fontsPretendard-Bold.subset.woff2') format('woff2'),
	  /* Super Modern Browsers */
		url('../assets/fontsPretendard-Bold.subset.woff') format('woff');
  }
  /* Pretendard exBold */
  @font-face {
	font-family: 'Pretendard';
	font-weight: 800;
	font-display: swap;
	font-style: normal;
	src: url('../assets/fontsPretendard-ExtraBold.subset.woff2') format('woff2'),
	  /* Super Modern Browsers */
		url('../assets/fontsPretendard-ExtraBold.subset.woff') format('woff');
  }      
`

export default GlobalStyles