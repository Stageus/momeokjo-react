import styled, { css } from "styled-components";
import fontSet from "../../../app/style/fontSet";

const sizeStyles = {
  small: css`
    padding: 5px 8px;
    border-radius: 100px;

    ${fontSet({
      size: 12,
      weight: 600,
      lineHeight: "100%",
      letterSpacing: "0%",
      family: "'Pretendard', sans-serif",
    })}
  `,
  medium: css`
    padding: 5px 10px;
    border-radius: 100px;

    ${fontSet({
      size: 14,
      weight: 500,
      lineHeight: "21px",
      letterSpacing: "-3%",
      family: "'Pretendard', sans-serif",
    })}
  `,
  largeMap: css`
    padding-top: 10px;
    padding-bottom: 9px;
    border-radius: 4px;
    width: 100%;
    height: 40px;

    ${fontSet({
      size: 12,
      weight: 500,
      lineHeight: "21px",
      letterSpacing: "0%",
      family: "'Pretendard', sans-serif",
    })}
  `,
  largeUser: css`
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: 4px;
    width: 100%;
    height: 56px;

    ${fontSet({
      size: 16,
      weight: 600,
      lineHeight: "24px",
      letterSpacing: "0%",
      family: "'Pretendard', sans-serif",
    })}
  `,
  detail: css`
    padding-top: 5px;
    padding-bottom: 3px;
    width: 100%;
    height: 28px;

    ${fontSet({
      size: 11,
      weight: 500,
      lineHeight: "21px",
      letterSpacing: "0%",
      family: "'Pretendard', sans-serif",
    })}
  `,
  modal: css`
    padding-top: 8px;
    padding-bottom: 8px;
    width: 100%;
    height: 40px;

    ${fontSet({
      size: 14,
      weight: 400,
      lineHeight: "24px",
      letterSpacing: "0%",
      family: "'Pretendard', sans-serif",
    })}
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
