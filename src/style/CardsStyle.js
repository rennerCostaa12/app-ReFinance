import styled from "styled-components";

export const CardStyle = styled.div`
    width: 300px;
    border: none;
    border-radius: 4px;
    padding: 2rem;
    box-shadow: 0px 0px 10px 4px rgba(0,0,0,0.45);

    div{
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > span{
            font-size: 20px;
            font-weight: bold;
        }
    }
`