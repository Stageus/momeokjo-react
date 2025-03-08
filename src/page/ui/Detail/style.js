import styled from "styled-components";
import fontSet from "../../../app/style/fontSet"

const style = {

  "Detail" : styled.div`
    position:absolute;
    top:0;
    left:390px;
    width:390px;
    height:100%;
    z-index:1;
    // background-color:${props => props.theme.maptextwhite};
    background-color:black;
    border:1px solid ${props => props.theme.maplinegrey};
  `,
  "RestaurentImgBox" : styled.div`
    width:100%;
    height:280px;
    overflow:hidden;
  `,
  "RestaurentImg" : styled.img`
    width:390px;
    height:280px;
  `,
  "CloseBtn" : styled.button`
    width:17.95px;
    height:18px;
    position:absolute;
    top:16px;
    right:15.96px;
  `,
  "CloseBtnImg" : styled.img`
    width:17.95px;
    height:18px;
  `,
  "RestaurentInformation" : styled.div`
    width:100%;
    height:225px;
    background-color:${props => props.theme.maptextwhite};
    padding-top:30px;
    padding:16px;
  `,
  "RestaurentTitlebox" : styled.div`
    text-align:center;
    height:47px;
    // background-color:red;
  `,
  "RestaurentTitle" : styled.h2`
    ${fontSet({ size:24, weight:600, lineHeight: "21px", letterSpacing:"-3%", family:"'Pretendard', sans-serif"})};
    color:${props => props.theme.maptextblack};
  `,
  "RestaurentDetailWrap" : styled.div`
    width:100%;
    height:126px;
    margin-top:5px;
    // background-color:#ddd;
  `,
  "RestaurentCategoryBox" : styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
  `,
  "RestaurentCategory" : styled.p`
    ${fontSet({ size:16, weight:400, letterSpacing:"-3%", family:"'Pretendard', sans-serif"})};
    color:${props => props.theme.maptextgrey};
  `,
  "FavoriteBtn" : styled.button`
    width:16px;
    height:16px;
    margin-top:-2px;
    margin-left:5px;
    margin-right:2px;
  `,
  "FavoriteBtnImg" : styled.img`
    width:16px;
    height:16px;
  `,
  "FavoriteIndex" : styled.p`
    ${fontSet({ size:10, weight:400, letterSpacing:"-3%", family:"'Pretendard', sans-serif"})};
    color:${props => props.theme.maptextgrey};
  `,
  "RestaurentAdressBox" : styled.div`
    width:100%;
    display:flex;
    // align-items:center;
    flex-wrap:wrap;
    // background-color:#ccc;
  `,
  "AdressImg" : styled.img`
    width:12px;
    height:12px;
    margin-top:3px;
    margin-right:6px;
  `,
  "RestaurentAdress" : styled.p`
    ${fontSet({ size:14, weight:400, lineHeight: "21px", family:"'Pretendard', sans-serif"})};
    color:${props => props.theme.maptextblack};
    text-align:left;
  `,
  "RestaurentAdressStreetNum" : styled.p`
    ${fontSet({ size:12, weight:400, lineHeight: "21px", family:"'Pretendard', sans-serif"})};
    color:${props => props.theme.maptextgrey};
  `,
  "RestaurentDateBox" : styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
  `,
  "DateImg" : styled.img`
    width:12px;
    height:12px;
    margin-top:3px;
    margin-right:6px;
  `,
  "RestaurentDate" : styled.p`
    ${fontSet({ size:14, weight:400, lineHeight: "21px", family:"'Pretendard', sans-serif"})};
    color:${props => props.theme.maptextblack};
    text-align:left;
  `
}

export default style