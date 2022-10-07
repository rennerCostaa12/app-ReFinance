import Button from "@mui/material/Button";

import { useContext } from "react";
import { UsersContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import { Container, Content } from "../style/ApresentationRoute";

import ParticlesBackground from "../components/ParticlesBackground";

import AOS from "aos";
import 'aos/dist/aos.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#228B22',
            contrastText: '#fff',
        }
    },
})

export default function ApresentationAppRoute() {

    const { signInGoogle, authUser } = useContext(UsersContext);

    const navigate = useNavigate();

    const LoginGoogle = async () => {
        try {
            await signInGoogle();

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (authUser !== null) {
            navigate('/financas');
        }
    }, [authUser])

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, [])

    return (
        <Container>
            <ParticlesBackground />
            <Content data-aos="fade-up-right">
                <ThemeProvider theme={theme}>
                    <h1>Faça login com sua conta da google</h1>
                    <Button variant="contained" onClick={LoginGoogle}>Login</Button>
                </ThemeProvider>
            </Content>
        </Container>
    )
}