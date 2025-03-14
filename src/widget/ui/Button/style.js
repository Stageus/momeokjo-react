import styled, { css } from "styled-components";
import fontSet from "../../../app/style/fontSet";

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  ${({ size }) =>
    size === "small" &&
    css`
      padding: 10px;
      border-radius: 100px;
      color: ${(props) => props.theme.maptextgrey};
      ${fontSet({
        size: 12,
        weight: 600,
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
    `
      padding: 10px 137px 9px;
      border-radius: 4px;
      ${fontSet({
        size: 12,
        weight: 500,
        lineHeight: "21px",
        letterSpacing: "-3%",
        family: "'Pretendard', sans-serif",
      })}
    `}

  ${({ variant }) =>
    variant === "primary" &&
    `
      background: #007bff;
      color: white;
      &:hover {
        background: #0056b3;
      }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
      background: #6c757d;
      color: white;
      &:hover {
        background: #5a6268;
      }
    `}

  ${({ variant }) =>
    variant === "danger" &&
    `
      background: #dc3545;
      color: white;
      &:hover {
        background: #c82333;
      }
    `}

  ${({ variant }) =>
    variant === "kakao" &&
    `
      background: #fee500;
      color: white;
      &:hover {
        background: #c82333;
      }
    `}
`

export const BtnLogin = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  width: 69px;
  height: 39px;
  box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.1);
  color: ${(props) => props.theme.maptextgrey};
  background-color: ${(props) => props.theme.maptextwhite};
  font-size: 14px;
  font-weight: 500;
  border-radius: 14px;
`

export const HamburgerBtn = styled.button`
  width: 36px;
  height: 36px;
  margin: 7px auto;

  img {
    width: 100%;
  }
`

export const HamburgerImg = styled.img`
  width: 100%;
  height: 100%;
`

export const BtnRound = styled.button`
  padding: 0 10px;
  height: 34px;
  line-height: 32px;
  border-radius: 100px;
  border: 1px solid ${(props) => props.theme.maplinegrey};
  color: ${(props) => props.theme.mapgrey2};
  font-size: 14px;
  font-weight: 500;

  ${(props) =>
    props.$primary &&
    css`
      background-color: ${(props) => props.theme.mapprimary};
      color: ${(props) => props.theme.maptextwhite};
    `}
`

export const BtnAsideFold = styled.button`
  position: absolute;
  top: 50%;
  left: 390px;
  transform: translateY(-50%);
  width: 23px;
  height: 50px;
  background-color: ${(props) => props.theme.maptextwhite};
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0 6px 6px 0;
`

export const FoldImg = styled.img`
  width: 9px;
`

export const BtnFullCustom = styled.button`
  width: 100%;
  border: 1px solid;
  border-radius: 4px;

  ${(props) =>
    props.$primary &&
    css`
      background-color: ${(props) => props.theme.mapprimary};
      color: ${(props) => props.theme.maptextwhite};
    `}

  ${(props) =>
    props.$lg &&
    css`
      height: 40px;
      line-height: 38px;
      font-size: 12px;
      font-weight: 500;
    `}
`

