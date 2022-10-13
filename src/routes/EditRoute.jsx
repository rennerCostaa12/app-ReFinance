import { useParams, useNavigate } from "react-router-dom"

import { doc, getDoc } from "firebase/firestore";
import { DatabaseFirestore } from "../config/firebase/config";
import { updateItem } from "../config/actionsDatabase/actionDatabase";

import { useEffect, useState } from "react";

import InputTextField from "../components/InputTextField";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

import { Content, Container, ContentModal } from "../style/AddAndEditRoute";

import { useContext } from "react";
import { UsersContext } from "../contexts/AuthContext";

import Swal from "sweetalert2";

import { ArrowFatLeft } from "phosphor-react";

import ParticlesBackground from "../components/ParticlesBackground";

import AOS from "aos";
import 'aos/dist/aos.css';

export default function EditRoute() {

    let { id } = useParams();

    const [nameItem, setNameItem] = useState('');
    const [typeItem, setTypeItem] = useState('');
    const [valueItem, setValueItem] = useState(0);


    const [errorName, setErrorName] = useState('');
    const [errorValue, setErrorValue] = useState('');
    const [errorType, setErrorType] = useState('');

    const { authUser } = useContext(UsersContext);

    const navigate = useNavigate();

    useEffect(() => {
        const getOnlyDocument = async () => {
            const docRef = doc(DatabaseFirestore, "finanças", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setNameItem(docSnap.data().nome);
                setValueItem(docSnap.data().valor);
                setTypeItem(docSnap.data().tipo);
            } else {
                console.log("Arquivo inexistente");
            }
        }

        getOnlyDocument();

    }, [])

    const handleEditItem = (e) => {
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

        updateItem(id, nameItem, typeItem, authUser.uid, Number(valueItem));

        navigate('/financas');

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Transação editada com sucesso!',
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
                <Button color="secondary" title="Voltar" onClick={handleRedirectPage} size="small" variant="contained">
                    <ArrowFatLeft size={25} weight="bold" />
                </Button>
                <ContentModal>
                    <Typography align="center" variant="h4" gutterBottom>
                        Editar Transação
                    </Typography>
                    <form onSubmit={handleEditItem}>
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

                        <FormControl color="primary" fullWidth >
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
                            fullWidth variant='contained'
                            color='secondary'
                            size='large'
                            type='submit'
                        >
                            Editar
                        </Button>
                    </form>
                </ContentModal>
            </Content>
        </Container>
    )
}