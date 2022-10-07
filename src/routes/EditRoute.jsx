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

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Content, Container } from "../style/AddAndEditRoute";

import { useContext } from "react";
import { UsersContext } from "../contexts/AuthContext";

import Swal from "sweetalert2";

const theme = createTheme({
    palette: {
        primary: {
            main: '#7b1fa2',
            contrastText: '#fff',
        }
    },
});


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

    return (
        <Container>
            <Content>
                <h1>Editar Transação</h1>
                <form onSubmit={handleEditItem}>
                    <ThemeProvider theme={theme}>
                        <InputTextField
                            nameInput="nome_produto"
                            idInput="input-text-item"
                            labelInput="Nome do Produto"
                            typeInput="text"
                            valueInput={nameItem}
                            helperTextInput={errorName}
                            onChangeValue={(e) => setNameItem(e.target.value)}
                        />

                        <InputTextField
                            nameInput="valor_produto"
                            idInput="input-value-item"
                            labelInput="Valor do Produto"
                            typeInput="number"
                            valueInput={valueItem}
                            helperTextInput={errorValue}
                            onChangeValue={(e) => setValueItem(e.target.value)}
                        />

                        <FormControl fullWidth >
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
                        <Button sx={{ mt: 4 }} fullWidth variant='contained' color='primary' size='large' type='submit'>Editar</Button>
                    </ThemeProvider>
                </form>
            </Content>
        </Container>
    )
}