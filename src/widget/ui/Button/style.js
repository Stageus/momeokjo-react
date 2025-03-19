import styled, { css } from "styled-components";
import fontSet from "../../../app/style/fontSet";

const sizeStyles = {
  small: css`
    padding: 5px 10px;
    border-radius: 100px;
  `,
  medium: css`
    padding: 5px 10px 8px;
    border-radius: 100px;
  `,
  large_map: css`
    padding-top: 10px;
    padding-bottom: 9px;
    border-radius: 4px;
    width: 358px;
    height: 40px;
  `,
  large_user: css`
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: 4px;
    width: 532px;
    height: 56px;
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
  
}


const StyledButton = styled.button`

  ${({ size }) => size && sizeStyles[size]}

  ${({ size }) => 
    fontSet({
      size: size === "large_user" ? 16 : size === "large_map" ? 12 : 14,
      weight: size === "large_user" ? 400 : 500,
      lineHeight: "21px",
      letterSpacing: "-3%",
      family: "'Pretendard', sans-serif",
    })}

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
  
    ${({ $verify }) =>
      $verify &&
      css`
        width: 532px;
        position: absolute;
        margin: 0 auto;
        bottom: 30px;
      `}
`

export default StyledButton
