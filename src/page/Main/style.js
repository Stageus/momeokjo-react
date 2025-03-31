import styled from "styled-components"

const style = {
    "Main" : styled.main`
        position:relative;
        width:100%;
        height:100%;
        overflow:hidden;
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
        z-index:1;

    `,
    "FoldImg" : styled.img`
         width:9px
    `,
}

export default style