import styled from "styled-components";

export const ContentLoading = styled.div`
    display: flex;
    justify-content: center;
`

export const ContainerTable = styled.div`
    overflow-x: scroll;
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

        tr td button:first-child{
            color: #7b1fa2;
        }
    }
`