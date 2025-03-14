import styled,{css} from "styled-components";

const style = {

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
}

export default style