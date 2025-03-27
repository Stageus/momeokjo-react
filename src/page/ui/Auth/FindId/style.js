import styled, {css} from "styled-components";
import fontSet from "../../../../app/style/fontSet"

const style = {

    "Modal" : styled.div`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 320px;
      border-radius: 12px;
      padding: 16px 20px 20px;
      gap: 16px;
      background-color: ${props => props.theme.maptextwhite};
      z-index: 100;
      text-align: center;
    `,

    "ModalTitle" : styled.h2`
      margin-bottom: 16px;
    ${({theme}) => fontSet({
        size: 14,
        weight: 600,
        lineHeight: "18px",
        letterSpacing: "0",
        family: "'Pretendard', sans-serif",
        color: "maptextblack",
        theme
    })}
    `,

    "ModalText" : styled.p`
      margin-bottom: 28px;
    ${({theme}) => fontSet({
      size: 14,
      weight: 400,
      lineHeight: "18px",
      letterSpacing: "0",
      family: "'Pretendard', sans-serif",
      color: "maptextblack",
      theme
    })}
    `,

    "ModalSpan" : styled.span`
    ${({theme}) => fontSet({
      size: 14,
      weight: 600,
      lineHeight: "18px",
      letterSpacing: "0",
      family: "'Pretendard', sans-serif",
      color: "maptextblack",
      theme
    })}
    `,

    "Overlay" : styled.div`
      width: 100%;
      height: 100%;
      background-color: ${props => props.theme.mapbgdeem1};
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
    `,
}

export default style