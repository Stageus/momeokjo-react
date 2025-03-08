
import styled, { css } from "styled-components"

const style = {

    "Recommend" : styled.div`
        position:absolute;
        top:0;
        left:0;
        width:390px;
        height:100%;
        z-index:1;
        padding:20px 16px;
    `,
    "H2" : styled.h2`
        font-size:14px;
        font-weight:400;
    `,
    "WrapBtnRound" : styled.div`
        display:flex;
        flex-wrap:wrap;
        margin:20px 0;
        gap:8px;
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
        },
        ${props => 
            props.$lg &&  css`
                height:40px;
                line-height:38px;
                font-size:12px;
                font-weight:500;

            `
        },
    `,
    "Detail" : styled.div`
        position:absolute;
        top:0;
        left:390px;
        width:100%;
        height:100%;
        z-index:1;
        background-color:${props => props.theme.maptextwhite};
    `
}

export default style