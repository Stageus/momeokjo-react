import styled, {css} from "styled-components";

const style = {

  "Container" : styled.div`
        width: 564px;
        margin: 0 auto;
        padding: 0 16px;
        border-radius: 10px;
        background-color: ${props => props.theme.maptextwhite};
        position: relative;
    `,

    "Form" : styled.form`
        display: flex;
        flex-direction: column;
    `,

    "InputBox" : styled.div`
        width: 532px;
        margin-bottom: 30px;
    `,

    "Label" : styled.label`
        margin-bottom: 8px;
        ${props => props.theme.fontSet.smBold};
        color: ${props => props.theme.maptextgrey};
    `,

    "Span" : styled.span`
        color: ${props => props.theme.mapaccent};
    `,

    "Input" : styled.input`
        padding: 16px;
        ${props => props.theme.fontSet.md};
        color: ${props => props.theme.mapbgdeem1};
        border: 1px solid ${props => props.theme.maplinegrey};
        border-radius: 8px;
        outline: none;
        width: 100%;

        ${props =>
            props.$error &&
            css`
              border: 2px solid ${props => props.theme.mapaccent};
            `}

        ${props =>
            props.$verify &&
            css`
              background-color: ${props => props.theme.maplinegrey};
              color: ${props => props.theme.maptextgrey};
            `
        }

        &::placeholder {
            ${props => props.theme.fontSet.md};
            color: ${props => props.theme.mapbgdeem1};

            ${props => 
                props.$verify &&
                css`
                  color: ${props => props.theme.maptextgrey};
                `
            }
        }
    `,

    "Message" : styled.p`
        margin-top: 6px;
        ${props => props.theme.fontSet.sm};
        color: ${props => props.theme.mapaccent};
    `,

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