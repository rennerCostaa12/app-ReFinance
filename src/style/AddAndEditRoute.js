import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #4932D6;
    display: flex;
    justify-content: center;
`

export const Content = styled.div`
    width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    animation-duration: 2s;
    animation-name: fadeIn;

    >button {
        align-self: flex-start;
        margin-bottom: 1rem;
    } 

    @keyframes fadeIn {
        from{
            opacity: 0;
        }

        to{
            opacity: 1;
        }
    }
`

export const ContentModal = styled.div`
    border-radius: 5px;
    padding: 2rem 1.8rem;
    background-color: #f1f1f1;
`