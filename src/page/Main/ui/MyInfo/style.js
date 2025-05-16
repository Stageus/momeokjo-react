import styled, { css } from "styled-components"

const style = {
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
    "AsideModalDepth2" : styled.section`
        position:absolute;
        top:0;
        left:390px;
        width:390px;
        height:100%;
        overflow-y:auto;
        overflow-x:hidden;
        z-index:0;
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
    `,
    "Myinfo" : styled.div`
        position:absolute;
        top:0;
        left:0;
        width:390px;
        height:100%;
        z-index:1;
        padding:20px 0;
    `,
    "MyinfoIcon" : styled.img`
        width:12px;
        height:12px;
    `,
    "MyinfoHeader" : styled.div`
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:0 16px;
    `,  
    "MyName" : styled.div`
        display:flex;
        align-items:center;
        gap:4px;
        ${props => props.theme.fontSet.baselightBold};
    `,
    "MyinfoBtn" : styled.div`
        display:flex;
        justify-content:space-between;
        align-items:center;
    `,
    "MyinfoBtnText" : styled.button`
        ${props => props.theme.fontSet.xs};
        text-decoration:underline;
        color:${props => props.theme.maptextblack};
    `,
    "MyNameChange" : styled.input`
        width:calc(100% - 80px);
        height:40px;
        padding:8px;
        margin:-8px 0;
        border-radius:8px;
        border:1px solid ${props => props.theme.maplinegrey};
    `,
    
    "SortLine" : styled.hr`
        display: block;
        width: 100%;
        height: 1px;
        margin:20px 0;
        background:${props => props.theme.maplinegrey};
        border: 0;
        ${props => 
            props.$lg &&  css`
                height:6px;
                margin:20px 0 0;
            `
        },
    `,
    "TabList" : styled.ul`
        display:flex;
        width:100%;
    `,
    "TabListCont" : styled.li`
        position:relative;
        flex:1;
        height:48px;
        text-align:center;
        border-bottom:2px solid;
        border-color:${(props) => props.$currenttab  ? props.theme.maptextblack : props.theme.maplinegrey};
        color:${(props) => props.$currenttab  ? props.theme.maptextblack : props.theme.maptextgrey};
        cursor: pointer;
        transition: all .2s;
        ${(props) => props.$currenttab  ? props.theme.fontSet.mdBold : props.theme.fontSet.md};
        line-height:48px;
    `,
    "TabContent" : styled.div`
        width:100%;
    `,
    "RestaurantBox" : styled.div`
        display: flex;
        flex-direction: column;
        padding: 20px 16px;
        gap: 6px;
        font-size: 12px;

        &:not(:first-child) {
            border-top: 1px solid #eee;
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
        font-size:11px;
        color:${props => props.theme.maptextblack};
        & img{
            width:12px;
            height:12px;
        }
    `,
    "BtnRoundLine" : styled.button`
        height:18px;
        padding:0 10px;
        border-radius:10px;
        border:1px solid ${props => props.theme.maplinegrey};
        color:${props => props.theme.maptextblack};
        ${props => props.theme.fontSet.smEps};
    `,
    "FlexBox" : styled.div`
        display:flex;
        align-items:center;
        gap:8px;
        margin-bottom:16px;
    `,
    "BtnText" : styled.button`
        ${props => props.theme.fontSet.xs};
        text-decoration:underline;
        color:${props => props.theme.maptextblack};
    `,
    "BtnTextWrap" : styled.div`
        display:flex;
        margin-left:auto;
        align-items:center;
        gap:8px;
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
        }
        ${props => 
            props.$grey &&  css`
            background-color:${props => props.theme.maplinegrey};
            color:${props => props.theme.maptextgrey};
            border:0;
            `
        }
        ${props => 
            props.$secondary &&  css`
            background-color:${props => props.theme.mapsecondary};
            color:${props => props.theme.maptextwhite};
            border:0;
            `
        }
        ${props => 
            props.$linenavy &&  css`
            background-color:${props => props.theme.maptextwhite};
            color:${props => props.theme.mapnavy};
            border:1px solid ${props => props.theme.mapnavy};
                ${props => props.theme.fontSet.baseBold};
            `
        }
        ${props => 
            props.$lg &&  css`
                height:40px;
                line-height:38px;
                font-size:12px;
                font-weight:500;
            `
        },
    `,
    "ReviewItem" : styled.div`
        display:flex;
        flex-direction:column;
        gap:6px;
        padding:16px;
        border-bottom:1px solid ${props => props.theme.maplinegrey};
    `,
    "ReviewRestaurant" : styled.div`
        ${props => props.theme.fontSet.mdBold};
        color:${props => props.theme.maptextblack};
    `,
    "ReviwMenu" : styled.div`
        ${props => props.theme.fontSet.smBold};
        color:${props => props.theme.maptextgrey};
    `,
    "ReviewContent" : styled.div`
        ${props => props.theme.fontSet.smEps};
        color:${props => props.theme.maptextgrey};
    `,
    "MenuItemBox" : styled.div`
        display:flex;
        justify-content:space-between;
    `,
    "MenuItemLike" : styled.div`
        display:flex;
        align-items:center;
        gap:6px;
        margin-top:6px;
        ${props => props.theme.fontSet.xs};
        color:${props => props.theme.maptextgrey};
    `,
    "MenuTextBtn" : styled.div`
        display:flex;
        align-items:center;
        gap:12px;
    `,
}

export default style