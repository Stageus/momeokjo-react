import styled from "styled-components"

const style = {
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
}

export default style