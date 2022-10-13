import CircularProgress from "@mui/material/CircularProgress";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const StyleLoader = {
    display: "flex",
    justifyContent: "center",
}

export default function Loader() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#4932D6',
            }
        }
    })

    return (
        <div style={StyleLoader}>
            <ThemeProvider theme={theme}>
                <CircularProgress color="primary" />
            </ThemeProvider>
        </div>
    )
}