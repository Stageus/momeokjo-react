import styled, {css} from "styled-components";

const style = {
  Container: styled.div`
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 16px 10px;
    border-radius: 12px;
    background-color: ${props => props.theme.maptextwhite};
    z-index: 100;
  `,

  Header: styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  Title: styled.h2`
    ${props => props.theme.fontSet.baselightBold};
    color: ${props => props.theme.maptextblack};
  `,

  Empty: styled.div`
    width: 24px;
    height: 24px;
  `,

  Form: styled.form`
    display: flex;;
    flex-direction: column;
  `,

  InputBox: styled.div`
    width: 280px;
    margin-top: 16px;
  `,

  Label: styled.label`
    margin-bottom: 8px;
    ${props => props.theme.fontSet.smBold};
    color: ${props => props.theme.maptextgrey};
  `,

  Input: styled.input`
    padding: 8px;
    ${props => props.theme.fontSet.md};
    color: ${props => props.theme.mapbgdeem1};
    border: 1px solid ${props => props.theme.maplinegrey};
    border-radius: 8px;  
    outline: none;
    width: 100%;

    ${props =>
      props.$error &&
      css`
        border: 2px solid ${props => props.theme.mapaccent};
      `}

    &::placeholder {
          ${props => props.theme.fontSet.sm};
          color: ${props => props.theme.maptextgrey};
        }  
  `,

  Message: styled.p`
    margin-top: 6px;
    ${props => props.theme.fontSet.sm};
    color: ${props => props.theme.mapaccent};
  `

}


export default style