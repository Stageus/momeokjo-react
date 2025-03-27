import styled, {css} from "styled-components";
import fontSet from "../../../../app/style/fontSet"

const style = {
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
}

export default style