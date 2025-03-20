import styled from "styled-components"

const style = {

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
}

export default style

