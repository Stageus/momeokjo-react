import styled, { css } from "styled-components";

const sizeStyles = {
  small: css`
    padding: 5px 8px;
    border-radius: 100px;
    ${props => props.theme.fontSet.smBold};
  `,
  medium: css`
    padding: 5px 10px;
    border-radius: 100px;
    ${props => props.theme.fontSet.baseEps};
  `,
  largeMap: css`
    padding-top: 10px;
    padding-bottom: 9px;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    ${props => props.theme.fontSet.smEps};
  `,
  largeUser: css`
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: 4px;
    width: 100%;
    height: 56px;
    ${props => props.theme.fontSet.mdBold};
    
  `,
}

const colorStyles = {
  default: css`
    color: ${({ theme }) => theme.mapgrey2};
    background-color: ${({ theme }) => theme.maptextwhite};
    border: 1px solid ${({ theme }) => theme.maplinegrey};
  `,
  primary: css`
    color: ${({ theme }) => theme.maptextwhite};
    background-color: ${({ theme }) => theme.mapprimary};
  `,
  secondary: css`
    color: ${({ theme }) => theme.maptextwhite};
    background-color: ${({ theme }) => theme.mapsecondary};
  `,
  inactive: css`
    color: ${({ theme }) => theme.maptextgrey};
    background-color: ${({ theme }) => theme.maplinegrey};
  `,
  kakao: css`
    color: ${({ theme }) => theme.maptextblack};
    background-color: ${({ theme }) => theme.mapkakao};
    margin-top: 16px;
  `,
  primaryReverse: css`
    color: ${({ theme }) => theme.mapprimary};
    background-color: ${({ theme }) => theme.maptextwhite};
  ` 
  
}

const shapeStyles = {
  back: css`
    width: 24px;
    height: 24px;
  `,
  close: css`
    width: 17.95px;
    height: 18px;
  `,
  login: css`
    position:absolute;
    top:20px;
    right:20px;
    z-index:1;
    padding: 9px 16px;
    height:39px;
    box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.1);
    color:${props => props.theme.maptextgrey};
    background-color:${props => props.theme.maptextwhite};
    border-radius:14px;
    ${props => props.theme.fontSet.baseEps};

    ${(props) => 
      props.isLoggedIn
        ? css`
          backgounr-color: ${props => props.theme.maptextwhite};
          color: ${props => props.theme.maptextgrey};
        `
        : css`
          background-color: ${props => props.theme.maptextwhite};
          color: ${props => props.theme.mapnavy};
          
        `
    }
  `,
  logout: css`
    padding: 9px 16px;
    height:39px;
    color:${props => props.theme.maptextgrey};
    background-color:${props => props.theme.maptextwhite};
    border-radius:14px;
    ${props => props.theme.fontSet.baseEps};
  `,
  myinfo: css`
  position:absolute;
  top:20px;
  right:20px;
  z-index:1;
  display:flex;
  gap:4px;
  white-space:nowrap;
  padding: 9px 16px;
  height:39px;
  box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.1);
  color:${props => props.theme.mapnavy};
  background-color:${props => props.theme.maptextwhite};
  border-radius:14px;
  ${props => props.theme.fontSet.baseEps};
  img{
    width:24px;
    height:24px;
  }
`,
  hamburger: css`
    width:36px;
    height:36px;
    margin:7px auto;
  `,
  aside: css`
    position:absolute;
    top:50%;
    left:390px;
    transform:translateY(-50%);
    width:23px;
    height:50px;
    background-color:${props => props.theme.maptextwhite};
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
    border-radius:0 6px 6px 0;
    z-index:1;
  `,
  detail: css`
    padding-top: 5px;
    padding-bottom: 3px;
    width: 100%;
    height: 28px;
    ${props => props.theme.fontSet.xsEps};
  `,
  modal: css`
    padding-top: 8px;
    padding-bottom: 8px;
    width: 100%;
    height: 40px;
    ${props => props.theme.fontSet.base};
  `,
}


const StyledButton = styled.button`

  ${({ size }) => size && sizeStyles[size]}

  ${({ color }) => color && colorStyles[color]}

  ${({ shape }) => shape && shapeStyles[shape]}

  ${({ selected, theme }) => 
    selected &&
    css`
      background-color: ${theme.mapprimary};
      border: 1px solid ${theme.mapprimary};
      font-weight: 700;
      color: ${theme.maptextwhite};
    `}

    ${({ disabled, theme }) =>
      disabled &&
      css`
        background-color: ${theme.maptextwhite};
        border: 1px solid ${theme.maplinegrey};
        color: ${theme.mapgrey2};
      `}
  
    ${({ $signup }) =>
      $signup &&
      css`
        position: absolute;
        margin: 0 auto;
        bottom: 30px;
      `}

    ${({ $modal }) => 
     $modal &&
     css`
       margin-top: 16px;
     `}
`

export default StyledButton
