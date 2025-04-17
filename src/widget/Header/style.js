import styled from "styled-components";

const style = {
    "Header" : styled.header`
        width: 100%;
        padding: 14px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 36px;
    `,

    "Title" : styled.h2`
        text-align: center;
        ${props => props.theme.fontSet.xlgBold};
        color: ${props => props.theme.maptextblack};
    `,

    "Empty" : styled.div`
        width: 24px;
        height: 24px;
    `,
}

export default style