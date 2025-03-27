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
  `

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


const StyledButton = styled.button`

  ${({ size }) => size && sizeStyles[size]}

  ${({ color }) => color && colorStyles[color]}

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
`

export default StyledButton
