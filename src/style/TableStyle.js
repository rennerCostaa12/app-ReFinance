import styled from "styled-components";

export const ContainerTable = styled.div`
    width: 100%;
    overflow-x: scroll;
    padding: 1rem 0;

    >div:first-child{
        display: flex;
        div:first-child{
            margin-right: 1rem;
            width: 300px;
        }
    }

    @media (max-width: 540px){
        >div{
            justify-content: center;
        }
    }
`

export const ContentTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 15px;

    thead{
        text-align: center;
        height: 50px;
    }

    tbody{
        tr{
            background-color: #ffff;
            height: 80px;
            text-align: center;

            td{
                padding: 1rem;
                font-size: 19px;
                font-weight: bold;
                color: #212121;
            }
        }

        tr td:last-child{
            display: flex;
            justify-content: center;
        }

        tr td a:first-child{
            display: flex;
            align-items: center;
            color: #83a73d;
            
            :active{
                color: #83a73d;
            }
        }
    }
`