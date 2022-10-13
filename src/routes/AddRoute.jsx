import { useNavigate } from "react-router-dom"

import { Content, Container, ContentModal } from "../style/AddAndEditRoute";

import { AddItem } from "../config/actionsDatabase/actionDatabase";

import { useState, useEffect } from "react";

import InputTextField from "../components/InputTextField";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import { UsersContext } from "../contexts/AuthContext";

import Swal from "sweetalert2";

import { ArrowFatLeft } from "phosphor-react";

import ParticlesBackground from '../components/ParticlesBackground';

import AOS from "aos";
import 'aos/dist/aos.css';

export default function AddRoute() {
    const [nameItem, setNameItem] = useState('');
    const [typeItem, setTypeItem] = useState('');
    const [valueItem, setValueItem] = useState(0);


    const [errorName, setErrorName] = useState('');
    const [errorValue, setErrorValue] = useState('');
    const [errorType, setErrorType] = useState('');

    const { authUser } = useContext(UsersContext);

    const navigate = useNavigate();

    const handleAddItem = (e) => {
        e.preventDefault();

        if (!nameItem) {
            setErrorName('Campo Vazio!');
            return;
        } else if (!valueItem) {
            setErrorValue('Campo Vazio!');
            return;
        } else if (!typeItem) {
            setErrorType('Escolha um item!');
            return;
        }

        AddItem(nameItem, typeItem, authUser.uid, Number(valueItem));
        navigate('/financas')

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Transação cadastrada com sucesso!',
            showConfirmButton: false,
            timer: 1200
        })
    }

    const handleRedirectPage = () => {
        navigate('/financas');
    }

    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    return (
        <Container>
            <ParticlesBackground />
            <Content data-aos="fade-down">
                <Button
                    color="secondary"
                    title="Voltar"
                    onClick={handleRedirectPage}
                    size="small"
                    variant="contained"
                >
                    <ArrowFatLeft size={25} weight="bold" />
                </Button>
                <ContentModal>
                    <Typography align="center" variant="h4" gutterBottom>
                        Adicionar Transação
                    </Typography>
                    <form onSubmit={handleAddItem}>
                        <InputTextField
                            nameInput="nome_produto"
                            idInput="input-text-item"
                            labelInput="Nome do Produto"
                            typeInput="text"
                            valueInput={nameItem}
                            helperTextInput={errorName}
                            autoComplete="off"
                            onChangeValue={(e) => setNameItem(e.target.value)}
                        />

                        <InputTextField
                            nameInput="valor_produto"
                            idInput="input-value-item"
                            labelInput="Valor do Produto"
                            typeInput="number"
                            valueInput={valueItem}
                            helperTextInput={errorValue}
                            autoComplete="off"
                            onChangeValue={(e) => setValueItem(e.target.value)}
                        />

                        <FormControl color="primary" fullWidth>
                            <InputLabel id='select-type-input'>Tipo</InputLabel>
                            <Select
                                name='tipo_produto'
                                labelId='select-type-input'
                                id='select-type'
                                value={typeItem}
                                label='Tipo'
                                onChange={(e) => setTypeItem(e.target.value)}
                            >
                                <MenuItem value="entrada" >Entrada</MenuItem>
                                <MenuItem value="saida" >Saída</MenuItem>
                            </Select>

                            {errorType.length > 0 ?
                                <FormHelperText>
                                    {errorType}
                                </FormHelperText>
                                :
                                ''
                            }
                        </FormControl>
                        <Button
                            sx={{ mt: 4, fontWeight: 'bold' }}
                            fullWidth
                            variant='contained'
                            color='secondary'
                            size='large'
                            type='submit'
                        >
                            Adicionar
                        </Button>
                    </form>
                </ContentModal>
            </Content>
        </Container>
    )
}