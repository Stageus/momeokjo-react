import styled from "styled-components";
import fontSet from "../../../app/style/fontSet"

const style = {
    "Container" : styled.div`
        width: 564px;
        margin: 0 auto;
        padding: 16px;
        border-radius: 10px;
        background-color: ${props => props.theme.maptextwhite};
        border: 1px solid red;
    `,

    "Title" : styled.h2`
        text-align: center;
        margin-bottom: 50px;

        ${fontSet({
            size: 20,
            weight: 600,
            lineHeight: "1",
            letterSpacing: "0.5px",
            family: "'Pretendard', sans-serif",
          })}
    `,

    "Form" : styled.form`
        display: flex;
        flex-direction: column;
    `,

    "Label" : styled.label`
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
    `,

    "Input" : styled.input`
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin-bottom: 15px;
        outline: none;
        width: 100%;
    `,

    "Button" : styled.button`
        background-color: #4a89f3;
        color: white;
        font-size: 16px;
        font-weight: bold;
        padding: 14px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 10px;
        width: 100%;

    ${({ variant }) => {
        switch (variant) {
          case "primary":
            return `
              background-color: #4a89f3;
              color: white;
            `;
          case "kakao":
            return `
              background-color: #fee500;
              color: black;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            `;
          default:
            return `
              background-color: #ddd;
            `;
        }
      }}
    `,

    "KakaoIcon" : styled.span`
        font-size: 18px;
    `,

    "Links" : styled.div`
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    
        a {
        text-decoration: none;
        color: #555;
        font-weight: bold;
        }
    `,

    "SignUp" : styled.div`
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    
    a {
      text-decoration: none;
      color: #4a89f3;
      font-weight: bold;
    }
  `
}

export default style