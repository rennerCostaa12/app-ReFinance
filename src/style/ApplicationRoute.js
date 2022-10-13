import styled from "styled-components";

export const HeaderApp = styled.header`
    color: #f1f1f1;
    background-color: #4932D6;
    height: 200px;

    >div:first-of-type{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        padding-top: 0.5rem;
        
        img{
            width: 40px;
            margin-right: 0.5rem;
            border-radius: 20px;
        }
    }

    >div:last-of-type{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 7rem;
        padding-top: 2.5rem;
        
        img{
            width: 50px;
        }
    }

    >div div:first-child{
        display: flex;
        align-items: center;
    }

    >div > div a{
        padding: 0.6rem 1rem;
        font-size: 18px;
        cursor: pointer;
        font-weight: bold;
        border-radius: 4px;
        border: none;
        background-color: #CCF282;
        color: #000;
        text-decoration: none;
    }

    @media(max-width: 1020px){
        >div:first-of-type {
            padding: 0 1rem;
            padding-top: 1rem;

            img{
                width: 40px;
            }

            h1{
                font-size: 27px;
            }
        }

        >div:last-of-type { 
            padding: 0 1rem;
            padding-top: 1.5rem;

            img{
                width: 30px;
            }

            h1{
                font-size: 23px;
            }
        }

        >div > div button{
            font-size: 15px;
        }
    }

    @media(max-width: 425px){
        >div:first-of-type {
            padding: 0 0.5rem;
            padding-top: 1rem;

            h3{
                font-size: 15px;
            }

            button{
                font-size: 12px;
            }

        }

        >div:last-of-type {
            padding: 0 0.5rem;
            padding-top: 1.5rem;

            h1{
                font-size: 20px;
            }
        }

        >div > div button{
            font-size: 10px;
        }
    }
`

export const ContentCards = styled.div`
    position: relative;
    top: -50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
`