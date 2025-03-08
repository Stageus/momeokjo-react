
import styled from "styled-components"

const style = {
    "Main" : styled.main`
        position:relative;
        width:100%;
        height:100%;
        overflow:hidden;
    `,

    "BtnLogin" : styled.button`
        position:absolute;
        top:20px;
        right:20px;
        z-index:1;
        width:69px;
        height:39px;
        box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.1);
        color:${props => props.theme.maptextgrey};
        background-color:${props => props.theme.maptextwhite};
        font-size:14px;
        font-weight:500;
        border-radius:14px;
    `,
    "HamburgerMenu" : styled.div`
        position:absolute;
        top:0;
        left:0;
        z-index:1;
        width:62px;
        height:100%;
        text-align:center;
        background-color:${props => props.theme.maptextwhite};
    `,
    "HamburgerBtn" : styled.button`
        width:36px;
        height:36px;
        margin:7px auto;
        img{
            width:100%
        }
    `,
    "HamburgerImg" : styled.img`
        width:100%;
        height:100%;
    `,
    "AsideModalDepth1" : styled.section`
        position:absolute;
        top:0;
        left:0;
        width:390px;
        height:100%;
        z-index:1;
        background-color:${props => props.theme.maptextwhite};
        border-right:1px solid ${props => props.theme.maplinegrey};
    `,
    "BtnAsideFold" : styled.button`
        position:absolute;
        top:50%;
        left:390px;
        transform:translateY(-50%);
        width:23px;
        height:50px;
        background-color:${props => props.theme.maptextwhite};
         box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
         border-radius:0 6px 6px 0;

    `,
    "FoldImg" : styled.img`
        width:9px
    `,
    "AsideModalDepth2" : styled.section`
        position:absolute;
        top:0;
        left:390px;
        width:390px;
        height:100%;
        z-index:1;
        background-color:${props => props.theme.maptextwhite};
    `,
    "AsideModal" : styled.section`
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:390px;
        z-index:1;
        background-color:${props => props.theme.maptextwhite};
    `
}

export default style