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
    "HamburgerImg" : styled.img`
        width:100%;
        height:100%;
    `
}

export default style