import styled, { css } from "styled-components"

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

    "AsideModalDepth2" : styled.section`
        position:absolute;
        top:0;
        left:390px;
        width:390px;
        height:100%;
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
    "Recommend" : styled.div`
        position:absolute;
        top:0;
        left:0;
        width:390px;
        height:100%;
        z-index:1;
        padding:20px 16px;
    `,
    "H2" : styled.h2`
        margin-bottom:16px;
        ${props => props.theme.fontSet.baseEps};
        ${props => 
            props.$gap20 &&  css`
                margin-top:20px;
            `
        },
    `,
    "WrapBtnRound" : styled.div`
        display:flex;
        flex-wrap:wrap;
        margin:20px 0;
        gap:7px;
    `,
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
            props.$lg &&  css`
                height:40px;
                line-height:38px;
                font-size:12px;
                font-weight:500;
            `
        },
    `,
    "Detail" : styled.div`
        position:absolute;
        top:0;
        left:390px;
        width:100%;
        height:100%;
        z-index:1;
        background-color:${props => props.theme.maptextwhite};
    `,
    "Range" : styled.div`
        position: relative;
        padding-top:30px;
        
        &::after {
            content: "";
            width: 100%;
            height: 6px;
            border-radius: 8px;
            background: #AEABAA;
            display: block;
          }
        
    `,
    "RangeSlide" : styled.input`
        position: absolute;
        width: 100%;
        background: transparent;
        -webkit-appearance: none;
        -moz-appearance: none;
                appearance: none;
        left: 0;
        bottom:0;
        z-index: 9;
        outline: none;
        opacity: 0;
        
        ::-ms-expand {
            display: none;
        }
        ::-ms-clear {
            display: none;
        }
        ::-webkit-slider-thumb {
        width: 35px;
        height: 35px;
        margin: -3px 0 0 -3px;
        cursor: pointer;
        -webkit-appearance: none;
                appearance: none;
        }
        cursor:pointer;
    `,
    "RangeValue" : styled.span`
        position: absolute;
        top: 30px;
        left: 0;
        display: inline-block;
         width: ${props => `${props.$value * 25}%`};
        height: 6px;
        background: #438FFF;
        border-radius: 8px;
        border:0;
        transition: 0.2s;
    `,
    "RangeCircle" : styled.span`
        position: absolute;
        top: 26px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #438FFF;
        display: inline-block;
        transition: 0.2s;
         left: ${props => `calc(${props.$value * 25}% - ${3 * props.$value}px)`};
    `,
    "RangeDot" : styled.span`
        position:absolute;
        top:0;
        left:0;
        width:100%;
        display:flex;
        justify-content: space-between;
    `,
    "TextRange" : styled.em`
        font-size:12px;
        color:${props => props.theme.maptextrightgrey};
        ${props => 
            props.$primary &&  css`
                color:${props => props.theme.mapprimary};
            `
        },
    `,
    "SortLine" : styled.hr`
        display: block;
        width: calc(100% + 32px);
        height: 1px;
        margin:20px -16px;
        background:${props => props.theme.maplinegrey};
        border: 0;
    `,
    "RecommendList" : styled.div`
        overflow-y: auto;
        height:calc(100% - 390px);
    `,
    "RecommendBox" : styled.div`
        display:flex;
        flex-direction:column;
        padding:20px 0;
        gap:6px;
        font-size:12px;
        border-top:1px solid ${props => props.theme.maplinegrey};

        &:first-child{
            border:0;
            margin-top:0;
            padding-top:0;
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
    "Loding" : styled.div`
        position:fixed;
        top:0;
        left:0;
        display:flex;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
        z-index:20;
        background:rgba(0,0,0,0.6);
    `,
    "Loadingwrap" : styled.div`
        position:relative;    
        img{
            position:absolute;
            top:50%;
            left:50%;     
            width:60px;
            height:60px;
            margin-top:-30px;
            margin-left:-30px;
            animation:bgico1 1.5s ease infinite;
            animation-fill-mode:forward
            
        }
        @keyframes bgico1{
            0%{transform: rotate(20deg)}
            20%{transform: rotate(0)}
            40%{transform: rotate(10deg)}
            60%{transform: rotate(5deg)}
            100%{transform: rotate(20deg)}
        }
    `,
    "LodingContent" : styled.div`
        display: inline-block;
        width: 140px;
        height: 140px;
        border: 10px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: ${props => props.theme.mapsecondary};
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
        @keyframes spin {
        to { -webkit-transform: rotate(360deg); }
        }
        @-webkit-keyframes spin {
        to { -webkit-transform: rotate(360deg); }
        }
    `,
    "LodingText" : styled.span`
        position:absolute;
        top:-40px;
        left:50%;
        transform:translateX(-50%);
        white-space:nowrap;
        font-size:16px;
        font-weight:600;
        text-align:center;
        color:${props => props.theme.maplinegrey};
    `

}

export default style