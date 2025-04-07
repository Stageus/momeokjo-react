import styled, { css } from "styled-components"

const style = {
    "ModalRestaurant" : styled.div`
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:10;
        background-color:rgba(0,0,0,0.6);
    `,
    "ModalRestaurantContent" : styled.div`
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        width:320px;
        padding:16px 20px;
        background-color:${props => props.theme.maptextwhite};
        border-radius:12px;
    `,      
    "ModalRestaurantTitle" : styled.h2`
        ${props => props.theme.fontSet.baselightBold};
        text-align:center;
    `,
    "ModalRestaurantText" : styled.p`
        ${props => props.theme.fontSet.baseEps};
        padding:20px 0;
        text-align:center;
    `,
    "CloseModal" : styled.button`
        position:absolute;
        top:16px;
        right:20px;
        ${props => props.theme.fontSet.smEps};
        color:${props => props.theme.maptextgrey};
    `,
    "ModalRestaurantForm" : styled.form`
        padding:16px 0 0;
    `,
    "ModalRestaurantFormInput" : styled.div`
        margin-bottom:16px;
    `,
    "ModalRestaurantFormInputTitle" : styled.p`
        ${props => props.theme.fontSet.baseEps};
          color:${props => props.theme.maptextgrey};
    `,
    "ModalRestaurantFormInputInput" : styled.input`
        width:100%;
        height:40px;
        padding:8px;
        margin-top:8px;
        border-radius:8px;
        border:1px solid ${props => props.theme.maplinegrey};
        ${props => props.theme.fontSet.baseEps};
        color:${props => props.theme.maptextgrey};
    `,
    "ModalRestaurantFormSelect" : styled.select`
        width:100%;
        height:40px;
        padding:8px;
        margin-top:8px;
        border-radius:8px;
        border:1px solid ${props => props.theme.maplinegrey};
        ${props => props.theme.fontSet.baseEps};
        color:${props => props.theme.maptextgrey};
        appearance:none;
    `,
    "ModalRestaurantFormTextarea" : styled.textarea`
        width:100%;
        height:100px;
        padding:8px;
        margin-top:8px;
                border-radius:8px;
        border:1px solid ${props => props.theme.maplinegrey};
        ${props => props.theme.fontSet.baseEps};
        color:${props => props.theme.maptextgrey};
    `,
    "BtnFullCustom" : styled.button`
        width:100%;
        height:40px;
        line-height:40px;
        border-radius:8px;
        background-color:${props => props.theme.mapprimary};
        color:${props => props.theme.maptextwhite};
    `
}

export default style