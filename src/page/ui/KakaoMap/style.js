
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
    "BtnRegister"  : styled.button`
        display:flex;
        align-items:center;
        justify-content:center;
        gap:4px;
        width:108px;
        height:40px;
        line-height:40px;
        border-radius:14px;
        background-color:${props => props.theme.maptextwhite};
        box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.1);
    `,
    "RandomModal" : styled.div`
        position:absolute;
        top:-223px;
        left:0;
        display:flex;
        flex-direction:column;
        width:272px;
        height:168px;
        padding:16px;
        background-color:${props => props.theme.maptextwhite};
        border-radius:12px;
        gap:8px;

        & button{
            margin-top:auto;
        }
    `,
    "Title" : styled.div`
        display:flex;
        align-items:center;
        color:${props => props.theme.maptextgrey};
    `,
    "Name" : styled.span`
        color:${props => props.theme.maptextblack};
        font-size:14px;
        font-weight:500;
    `,
    "Category" : styled.span`
        margin-left:8px;
    `,
    "Like" : styled.span`
        display:flex;
        align-items:center;
        gap:2px;
        font-size:8px;
        margin-left:8px;
        & img{
            width:16px;
            height:16px;
        }
    `,
    "Adresstype1" : styled.p`
        display:flex;
        align-items:center;
        gap:8px;
        color:${props => props.theme.maptextblack};
        & img{
            width:12px;
            height:12px;
        }
    `,
    "Adresstype2" : styled.p`
        margni-top:-4px;
        padding-left:20px;
        font-size:11px;
        color:${props => props.theme.maptextgrey};
    `,
    "Time" : styled.p`
        display:flex;
        align-items:center;
        gap:8px;
        font-size:11px;
        color:${props => props.theme.maptextblack};
        & img{
            width:12px;
            height:12px;
        }
    `,
    "Phone" : styled.p`
        display:flex;
        align-items:center;
        gap:8px;
        margin-bottom:16px;
        font-size:11px;
        color:${props => props.theme.maptextblack};
        & img{
            width:12px;
            height:12px;
        }
    `,
}

export default style