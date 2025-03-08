
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
    `
}

export default style