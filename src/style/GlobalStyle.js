import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Raleway', sans-serif;
    }

    body{
        background-color: #eceff1;
    }
 
    .swal2-container{
        z-index: 1400 !important;

        .swal2-styled.swal2-confirm{
            background-color: #7b1fa2;
        }
    }



`