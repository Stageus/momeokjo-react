import styled, { css } from "styled-components";
import fontSet from "../../../app/style/fontSet";

const StyledButton = styled.button`

  ${({ size }) =>
    size === "small" &&
    css`
      padding: 5px 10px;
      border-radius: 100px;
      
      ${fontSet({
        size: 14,
        weight: 500,
        lineHeight: "21px",
        letterSpacing: "-3%",
        family: "'Pretendard', sans-serif",
      })}
    `}

  ${({ size }) =>
    size === "medium" &&
    css`
      padding: 5px 10px 8px;
      border-radius: 100px;
      color: ${(props) => props.theme.mapgrey2};
      ${fontSet({
        size: 14,
        weight: 500,
        lineHeight: "21px",
        letterSpacing: "-3%",
        family: "'Pretendard', sans-serif",
      })}
    `}

  ${({ size }) =>
    size === "large" &&
    css`
      padding-top: 10px;
      padding-bottom: 9px;
      padding-left: 137px;
      padding-right: 137px;
      border-radius: 4px;

      ${fontSet({
        size: 12,
        weight: 500,
        lineHeight: "21px",
        letterSpacing: "0%",
        family: "'Pretendard', sans-serif",
      })}

      
    `}

    ${({ size }) =>
      size === "large_login" &&
      css`
        border-radius: 4px;
        padding: 16px 196px;

        ${fontSet({
          size: 16,
          weight: 400,
          lineHeight: "24px",
          letterSpacing: "0%",
          family: "'Pretendard', sans-serif",
        })}

        ${props =>
          props.$verify &&
          css`
            width: 532px;
            position: absolute;
            margin: 0 auto;
            bottom: 30px;

          `
        }
      `}
  

  ${({ color, theme }) =>
    color === "default" &&
    css`
      color: ${theme.mapgrey2};
      background-color: ${theme.maptextwhite};
      border: 1px solid ${theme.maplinegrey};
    `}

  ${({ color, theme }) =>
    color === "primary" &&
    css`
      color: ${theme.maptextwhite};
      background-color: ${theme.mapprimary};
    `}

  ${({ color, theme }) =>
    color === "inactive" &&
    css`
      color: ${theme.maptextgrey};
      background-color: ${theme.maplinegrey};
    `}

  ${({ color, theme }) =>
    color === "kakao" &&
    css`
    color: ${theme.maptextblack};
    background-color: ${theme.mapkakao};
    margin-top: 16px;
  `}

  ${({ selected, theme }) => 
    selected &&
    css`
      background-color: ${theme.mapprimary};
      border: 1px solid ${theme.mapprimary};
      
  
    ${fontSet({
      size: 14,
      weight: 700,
      lineHeight: "21px",
      letterSpacing: "-3%",
      family: "'Pretendard', sans-serif",
    })}

    color: ${theme.maptextwhite};
  `}


  ${({ disabled, theme }) =>
    disabled &&
    css`
    background-color: ${theme.maptextwhite};
    border: 1px solid ${theme.maplinegrey};

    ${fontSet({
      size: 14,
      weight: 500,
      lineHeight: "21px",
      letterSpacing: "-3%",
      family: "'Pretendard', sans-serif",
    })}

    color: ${theme.mapgrey2};
  `}
`
export default StyledButton
