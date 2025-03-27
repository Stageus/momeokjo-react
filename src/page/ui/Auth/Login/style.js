import styled from "styled-components";

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
        ${props => props.theme.fontSet.base};
        color: ${props => props.theme.maptextgrey};
        text-decoration: underline;
    `,

    "SignUp" : styled.div`
        text-align: center;
        margin-top: 43px;
    `,

    "SignUpText" : styled.a`
        cursor: default;
        ${props => props.theme.fontSet.base};
        color: ${props => props.theme.maptextgrey};
    `,

    "GoToSignUP" : styled.a`
        margin-left: 12px;
        ${props => props.theme.fontSet.baselightBold};
        color: ${props => props.theme.mapprimary};
        text-decoration: underline;
    `,
}

export default style