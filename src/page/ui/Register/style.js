
import styled from "styled-components"

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
    
    `

}

export default style