import styled, {css} from "styled-components"

const StyledButton = styled.button`
        position:absolute;
        top:20px;
        right:20px;
        z-index:1;
        padding: 9px 16px;
        height:39px;
        box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.1);
        color:${props => props.theme.maptextgrey};
        background-color:${props => props.theme.maptextwhite};
        border-radius:14px;
        ${props => props.theme.fontSet.baseEps};

        ${(props) => 
          props.isLoggedIn
            ? css`
              backgounr-color: ${props => props.theme.maptextwhite};
              color: ${props => props.theme.maptextgrey};
            `
            : css`
              background-color: ${props => props.theme.maptextwhite};
              color: ${props => props.theme.mapnavy};
              
            `
        }
    `
export default StyledButton