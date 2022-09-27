import { useEffect, useState } from 'react';

//COMPONENTS MATERIAL UI
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

//ICONS AND STYLES MATERIAL UI
import { IconButton, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close } from '@mui/icons-material';

import { ContentBtnsForm, ContentModal } from '../style/ButtonModal';
import InputTextField from './InputTextField';

import { useContext } from 'react';
import { ItemsContexts } from '../contexts/Items';
import { UsersContext } from '../contexts/AuthContext';

import Swal from 'sweetalert2';

import { AddItem, updateItem } from '../config/actionsDatabase/actionDatabase';


const theme = createTheme({
    palette: {
        primary: {
            main: '#7b1fa2',
            contrastText: '#fff',
        }
    },
});

export default function ButtonModal({ title_button, datas }) {
    const [open, setOpen] = useState(false);

    const [nameTransaction, setNameTransaction] = useState('');
    const [typeTransaction, setTypeTransaction] = useState('');
    const [valueTransaction, setValueTransaction] = useState(0);

    const [errorName, setErrorName] = useState('');
    const [errorValue, setErrorValue] = useState('');
    const [errorType, setErrorType] = useState('');

    const { authUser } = useContext(UsersContext);
    const { setUpdateTable } = useContext(ItemsContexts);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (datas != undefined) {
        useEffect(() => {
            setNameTransaction(datas.nome);
            setTypeTransaction(datas.tipo);
            setValueTransaction(datas.valor);
        }, [datas])
    }

    const handleSaveTrasanction = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData)

        if (!nameTransaction) {
            setErrorName('Campo Vazio!');
            return;
        } else if (!valueTransaction) {
            setErrorValue('Campo Vazio!');
            return;
        } else if (!typeTransaction) {
            setErrorType('Escolha um item!');
            return;
        }

        const date = new Date();
        const dateCurrent = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} `;

        AddItem(nameTransaction, typeTransaction, authUser.uid, Number(valueTransaction), dateCurrent);

        setNameTransaction('');
        setValueTransaction(0);
        setTypeTransaction('');
        setOpen(false);
        
        setUpdateTable(current => [...current, data]);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Transação cadastrada com sucesso!',
            showConfirmButton: false,
            timer: 1200
        })

    }

    const handleEditTransaction = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);


        if (!nameTransaction) {
            setErrorName('Campo Vazio!');
            return;
        } else if (!valueTransaction) {
            setErrorValue('Campo Vazio!');
            return;
        } else if (!typeTransaction) {
            setErrorType('Escolha um item!');
            return;
        }

        const date = new Date();
        const dateCurrent = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} `;

        updateItem(datas.id, nameTransaction, typeTransaction, authUser.uid, Number(valueTransaction), dateCurrent);

        setNameTransaction('');
        setValueTransaction(0);
        setTypeTransaction('');
        setOpen(false);

        setUpdateTable(current => [...current, data]);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Transação editada com sucesso!',
            showConfirmButton: false,
            timer: 1200
        })
    }

    return (
        <div>
            <Button onClick={handleOpen}>{title_button}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <ContentModal>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>

                        <Typography sx={{ mb: 2 }} variant='h4' align='center'>
                            {datas != undefined ? 'Editar Transação' : 'Cadastrar Nova Transação'}
                        </Typography>
                        <form onSubmit={datas != undefined ? handleEditTransaction : handleSaveTrasanction}>
                            <ThemeProvider theme={theme}>
                                <InputTextField
                                    nameInput="nome_produto"
                                    idInput="input-text-item"
                                    labelInput="Nome do Produto"
                                    typeInput="text"
                                    valueInput={nameTransaction}
                                    helperTextInput={errorName}
                                    onChangeValue={(e) => setNameTransaction(e.target.value)}
                                />

                                <InputTextField
                                    nameInput="valor_produto"
                                    idInput="input-value-item"
                                    labelInput="Valor do Produto"
                                    typeInput="number"
                                    valueInput={valueTransaction}
                                    helperTextInput={errorValue}
                                    onChangeValue={(e) => setValueTransaction(e.target.value)}
                                />

                                <FormControl fullWidth >
                                    <InputLabel id='select-type-input'>Tipo</InputLabel>
                                    <Select
                                        name='tipo_produto'
                                        labelId='select-type-input'
                                        id='select-type'
                                        value={typeTransaction}
                                        label='Tipo'
                                        onChange={(e) => setTypeTransaction(e.target.value)}
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

                                <ContentBtnsForm>
                                    <Button sx={{ mt: 4 }} fullWidth variant='contained' color='primary' size='large' type='submit'>{datas != undefined ? 'Editar' : 'Cadastrar'} </Button>
                                </ContentBtnsForm>
                            </ThemeProvider>
                        </form>
                    </ContentModal>
                </Fade>
            </Modal>
        </div >
    );
}
