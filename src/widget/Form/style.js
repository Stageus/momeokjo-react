import styled, {css} from "styled-components";
import fontSet from "../../app/style/fontSet"

const style = {
    "Container" : styled.div`
        width: 564px;
        height: 1024px;
        margin: 0 auto;
        padding: 0 16px;
        border-radius: 10px;
        background-color: ${props => props.theme.maptextwhite};
        position: relative;
    `,

    "Header" : styled.header`
        width: 100%;
        padding: 14px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 36px;
    `,

    "Back" : styled.button`
        width:24px;
        height:24px;
    `,

    "BackImg" : styled.img`
        width:100%;
    `,

    "Title" : styled.h2`
        text-align: center;

        ${({theme}) => fontSet({
            size: 20,
            weight: 600,
            lineHeight: "100%",
            letterSpacing: "0",
            family: "'Pretendard', sans-serif",
            color: "maptextblack",
            theme
          })}
    `,

    "Empty" : styled.div`
        width: 24px;
        height: 24px;
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
        ${({theme}) => fontSet({
            size: 12,
            weight: 600,
            lineHeight: "18px",
            letterSpacing: "0",
            family: "'Pretendard', sans-serif",
            color: "maptextgrey",
            theme
        })}
    `,

    "Span" : styled.span`
        color: ${props => props.theme.mapaccent};
    `,

    "Input" : styled.input`
        padding: 16px;
        ${({theme}) => fontSet({
            size: 16,
            weight: 400,
            lineHeight: "24px",
            letterSpacing: "0",
            family: "'Pretendard', sans-serif",
            color: "mapbgdeem1",
            theme
        })}
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
            ${({theme}) => fontSet({
                size: 16,
                weight: 400,
                lineHeight: "24px",
                letterSpacing: "0",
                family: "'Pretendard', sans-serif",
                color: "mapbgdeem1",
                theme
            })}

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
        ${({theme}) => fontSet({
          size: 12,
          weight: 400,
          lineHeight: "24px",
          letterSpacing: "0",
          family: "'Pretendard', sans-serif",
          color: "maptextgrey",
          theme
      })}

      ${props =>
        props.$error &&
        css`
          color: ${props => props.theme.mapaccent};
        `}

      ${props => 
        props.$succes &&
        css`
          color: ${props => props.theme.mapprimary}
        `
      }
    `,

    "EmailContainer" : styled.div`
        width: 100%;
        display: flex;
        position: relative;
        margin-top: 7px;
    `,

    "EmailVerify" : styled.a`
        position: absolute;
        top: 23px;
        right: 16px;

        ${({theme}) => fontSet({
          size: 14,
          weight: 600,
          lineHeight: "12px",
          letterSpacing: "0",
          family: "'Pretendard', sans-serif",
          line: "underline",
          color: "mapprimary",
          theme
        })}

      ${props =>
        props.$verify &&
        css`
          ${({theme}) => fontSet({
          size: 14,
          weight: 400,
          lineHeight: "12px",
          letterSpacing: "0",
          family: "'Pretendard', sans-serif",
          line: "underline",
          color: "maptextblack",
          theme
        })}
        `
      }
    `,

    "EmailMessage" : styled.p`
        margin-top: 6px;
        margin-bottom: 215px;

        ${({theme}) => fontSet({
          size: 12,
          weight: 400,
          lineHeight: "24px",
          letterSpacing: "0",
          family: "'Pretendard', sans-serif",
          color: "maptextgrey",
          theme
      })}

      ${props =>
        props.$error &&
        css`
          color: ${props => props.theme.mapaccent};
        `}
    `,

    "Timer" : styled.p`
        position: absolute;
        top: 23px;
        right: 123px;

        ${({theme}) => fontSet({
            size: 12,
            weight: 400,
            lineHeight: "12px",
            letterSpacing: "0",
            family: "'Pretendard', sans-serif",
            color: "mapaccent",
            theme
        })}
    `,

    "KakaoImg" : styled.img`
        width:24px;
        margin-right: 10px;
    `,


    "Links" : styled.div`
        text-align: center;
        margin-top: 36px;
    `,

    "LinksText" : styled.a`
    ${({theme}) => fontSet({
        size: 14,
        weight: 400,
        lineHeight: "12px",
        letterSpacing: "0",
        family: "'Pretendard', sans-serif",
        line: "underline",
        color: "maptextgrey",
        theme
    })}
    `,

    "SignUp" : styled.div`
        text-align: center;
        margin-top: 43px;
    `,

    "SignUpText" : styled.a`
        cursor: default;
    ${({theme}) => fontSet({
        size: 14,
        weight: 400,
        lineHeight: "12px",
        letterSpacing: "0",
        family: "'Pretendard', sans-serif",
        line: "none",
        color: "maptextgrey",
        theme
    })}
    `,

    "GoToSignUP" : styled.a`
        margin-left: 12px;
    ${({theme}) => fontSet({
        size: 14,
        weight: 600,
        lineHeight: "12px",
        letterSpacing: "0",
        family: "'Pretendard', sans-serif",
        line: "underline",
        color: "mapprimary",
        theme
    })}
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