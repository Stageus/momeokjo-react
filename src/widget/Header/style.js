import styled from "styled-components";

const style = {
    "Container" : styled.div`
        width: 564px;
        height: 1024px;
        margin: 0 auto;
        padding: 0 16px;
        border-radius: 10px;
        background-color: ${props => props.theme.maptextwhite};
        position: relative;
    `,

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