
import styled from "styled-components"

const style = {
    "CurrentLocation" : styled.div`
        position:fixed;
        bottom:40px;
        left:50%;
        transform:translateX(-50%);
        z-index:1;
        height:42px;
        line-height:42px;
        padding:0 21px;
        background-color:${props => props.theme.mapbgdeem1};
        border-radius:14px;
        color:${props => props.theme.maptextwhite};
        font-size:14px;
        font-weight:700;
    `,
}

export default style