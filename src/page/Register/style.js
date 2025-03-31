
import styled, { css } from "styled-components"

const style = {

    "Login" : styled.div`
       width:564px;
       height:100%;
       margin:0 auto;
    `,
    "Header" : styled.header`
        width:100%;
        height:52px;
        display:flex;
        align-items:center;
    `,
    "Title" : styled.h2`
        width:calc(100% - 72px);
        font-size:20px;
        font-weight:600;
        color:${props => props.theme.maptextblack};
        text-align:center;
    `,
    "BtnBack" : styled.button`
        width:36px;
        height:36px;
    `,
    "BackImg" : styled.img`
        width:24px;
        height:24px;
    `,
    "Content" : styled.div`
        padding:20px;
    `,
    "WrapBtnRound" : styled.div`
        display:flex;
        flex-wrap:wrap;
        gap:7px;
        margin-top:8px;
        margin-bottom:20px;
    `,
    "TitleInput" : styled.div`
        ${props => props.theme.fontSet.baseEps};
        color:${props => props.theme.maptextgrey};
    `,
    "ContentInput" : styled.input`
        width:100%;
        height:56px;
        margin-top:8px;
        border:1px solid ${props => props.theme.maplinegrey};
        border-radius:8px;
        outline:0;
        padding:0 10px;
        color:${props => props.theme.mapbgdeem1};
    `,
    "ContentNoti" : styled.div`
        font-size:12px;
        margin-top:8px;
        color:${props => props.theme.maptextgrey};
        margin-bottom:20px;
    `,
    "BoxInput" : styled.div`
    
    `,
    "BtnRound" : styled.button`
    padding:0 10px;
    height:34px;
    line-height:32px;
    border-radius:100px;
    border:1px solid ${props => props.theme.maplinegrey};
    color:${props => props.theme.mapgrey2};
    font-size:14px;
    font-weight:500;
    ${props => 
        props.$primary &&  css`
            background-color:${props => props.theme.mapprimary};
            color:${props => props.theme.maptextwhite};
        `
    },
`,
"BtnFullCustom" : styled.button`
    width:100%;
    border:1px solid;
    border-radius:4px;
    ${props => 
        props.$primary &&  css`
            background-color:${props => props.theme.mapprimary};
            color:${props => props.theme.maptextwhite};
        `
    }
    ${props => 
        props.$grey &&  css`
        background-color:${props => props.theme.maplinegrey};
        color:${props => props.theme.maptextgrey};
        border:0;
        `
    }
    ${props => 
        props.$secondary &&  css`
        background-color:${props => props.theme.mapsecondary};
        color:${props => props.theme.maptextwhite};
        border:0;
        `
    }
    ${props => 
        props.$lg &&  css`
            height:40px;
            line-height:38px;
            font-size:12px;
            font-weight:500;
        `
    },
`,

}

export default style