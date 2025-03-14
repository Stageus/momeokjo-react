import styled from "styled-components";
import fontSet from "../../../app/style/fontSet";

const style = styled.button`
  ${({ variant, theme }) => {
    const styles = {
      AsideModal: `
        background-color: ${theme.maptextwhite};
        position: absolute; 
        top: 50%;
        transform: translateY(-50%);
        width: 23px;
        height: 50px;
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius: 0 6px 6px 0;
      `,
      Round: `
        padding: 0 10px;
        height: 34px;
        line-height: 32px;
        border-radius: 100px;
        border: 1px solid ${theme.maplinegrey};
        color: ${theme.mapgrey2};

        ${fontSet({
          size: 14,
          weight: 500,
          lineHeight: "1.5",
          letterSpacing: "0.5px",
          family: "'Pretendard', sans-serif",
        })}
      `,
      default: `
        padding: 8px 16px;
        border-radius: 6px;
        border: 1px solid ${theme.maplinegrey};
        background-color: ${theme.maptextwhite};
        color: ${theme.mapgrey2};
      `,
      Hamburger: `
        width:36px;
        height:36px;
        margin:7px auto;
        img{
            width:100%
        }
      `
    };

    return styles[variant] || styles.default;
  }}
`;

export default style;
