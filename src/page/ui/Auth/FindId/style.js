import styled from "styled-components";

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
      ${props => props.theme.fontSet.baselightBold};
      color: ${props => props.theme.maptextblack};
    `,

    "ModalText" : styled.p`
      margin-bottom: 28px;
      ${props => props.theme.fontSet.base};
      color: ${props => props.theme.maptextblack};
    `,

    "ModalSpan" : styled.span`
    ${props => props.theme.fontSet.baselightBold};
      color: ${props => props.theme.maptextblack};
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