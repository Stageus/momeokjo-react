import styled, {css} from "styled-components";

const style = {
    "Container" : styled.div`
        width: 564px;
        margin: 0 auto;
        padding: 0 16px;
        border-radius: 10px;
        background-color: ${props => props.theme.maptextwhite};
        position: relative;
    `,

    "Form" : styled.form`
        display: flex;
        flex-direction: column;
    `,

    "InputBox" : styled.div`
        width: 532px;
        margin-bottom: 30px;
    `,

    "Label" : styled.label`
        margin-bottom: 8px;
        ${props => props.theme.fontSet.smBold};
        color: ${props => props.theme.maptextgrey};
    `,

    "Span" : styled.span`
        color: ${props => props.theme.mapaccent};
    `,

    "Input" : styled.input`
        padding: 16px;
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

        ${props =>
            props.$verify &&
            css`
              background-color: ${props => props.theme.maplinegrey};
              color: ${props => props.theme.maptextgrey};
            `
        }

        &::placeholder {
            ${props => props.theme.fontSet.md};
            color: ${props => props.theme.mapbgdeem1};

            ${props => 
                props.$verify &&
                css`
                  color: ${props => props.theme.maptextgrey};
                `
            }
        }
    `,

    "Message" : styled.p`
      margin-top: 6px;
      ${props => props.theme.fontSet.sm};
      color: ${props => props.theme.mapaccent};
    `,
}

export default style