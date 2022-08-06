import styled from "styled-components";

export const ContentModal = styled.div`
    width: 600px;
    min-width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f1f1f1;
    padding: 1rem 2rem 2rem 2rem;
    border: none;
    border-radius: 8px;
    text-align: right;
    
    >button{
        position: relative;
        top: -11px;
        right: -10px;
        svg{
            font-size: 30px;
        }
    }

    @media(max-width: 600px){
        width: 450px;
        min-width: 350px;
        h4{
            font-size: 25px;
        }
        padding: 1rem 1rem 1rem 1rem;
    }

    @media(max-width: 425px){
        width: 400px;
    }

    @media(max-width: 375px){
        width: 320px;
    }

    @media(max-width: 320px){
        width: 300px;
    }
`

export const ContentBtnsForm = styled.div`
    display: flex;
    justify-content: right;
    gap: 10px;
`