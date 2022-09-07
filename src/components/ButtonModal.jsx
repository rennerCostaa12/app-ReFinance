import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { IconButton, Typography } from '@mui/material';
import { ContentBtnsForm, ContentModal } from '../style/ButtonModal';
import { useContext } from 'react';
import { ItemsContexts } from '../contexts/Items';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { Close } from '@mui/icons-material';
import Swal from 'sweetalert2';

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

    const { lists, setLists } = useContext(ItemsContexts);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    if (datas != undefined) {
        useEffect(() => {
            setNameTransaction(datas.nameProduct);
            setTypeTransaction(datas.typeProduct);
            setValueTransaction(datas.valueProduct);
        }, [lists])
    }

    const handleSaveTrasanction = (e) => {
        e.preventDefault();

        if (!nameTransaction || !typeTransaction || !valueTransaction) {
            Swal.fire('Preencha os campos!');
        } else {

            const date = new Date();
            const dateCurrent = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} `;

            const NewItem = {
                IdProduct: uuid(),
                nameProduct: nameTransaction,
                dateProduct: dateCurrent,
                typeProduct: typeTransaction,
                valueProduct: Number(valueTransaction),
            }

            setNameTransaction('');
            setValueTransaction(0);
            setTypeTransaction('');
            setLists([...lists, NewItem]);
            setOpen(false);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Transação cadastrada com sucesso!',
                showConfirmButton: false,
                timer: 1200
              })
        }
    }

    const handleEditTransaction = (e) => {
        e.preventDefault();

        if (!nameTransaction || !typeTransaction || !valueTransaction) {
            Swal.fire('Preencha os campos!');
        } else {
            const date = new Date();
            const dateCurrent = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} `;

            lists.map(object => {
                if (object.IdProduct == datas.IdProduct) {
                    object.nameProduct = nameTransaction;
                    object.dateProduct = dateCurrent;
                    object.typeProduct = typeTransaction;
                    object.valueProduct = Number(valueTransaction)
                }

                return object;
            })

            setNameTransaction('');
            setTypeTransaction('');
            setValueTransaction(0);
            setLists(lists.filter((datas_current) => datas_current.IdProduct !== lists.IdProduct))
            setOpen(false);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Transação editada com sucesso!',
                showConfirmButton: false,
                timer: 1200
              })
        }
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
                                <TextField
                                    fullWidth
                                    id='input-text-item'
                                    label='Nome do Produto'
                                    type="text"
                                    sx={{ mb: 2, mt: 2 }}
                                    value={nameTransaction}
                                    onChange={(e) => setNameTransaction(e.target.value)}
                                />

                                <TextField
                                    fullWidth
                                    id="input-value-item"
                                    label="Valor do Produto"
                                    type="number"
                                    sx={{ mb: 2 }}
                                    value={valueTransaction}
                                    onChange={(e) => setValueTransaction(e.target.value)}
                                />

                                <FormControl fullWidth>
                                    <InputLabel id='select-type-input'>Tipo</InputLabel>
                                    <Select
                                        labelId='select-type-input'
                                        id='select-type'
                                        value={typeTransaction}
                                        label='Tipo'
                                        onChange={(e) => setTypeTransaction(e.target.value)}
                                    >
                                        <MenuItem value="entrada">Entrada</MenuItem>
                                        <MenuItem value="saída">Saída</MenuItem>
                                    </Select>
                                </FormControl>

                                <ContentBtnsForm>
                                    <Button sx={{ mt: 4 }} fullWidth variant='contained' color='primary' size='large' type='submit'>{datas != undefined ? 'Editar' : 'Cadastrar' } </Button>
                                </ContentBtnsForm>
                            </ThemeProvider>
                        </form>
                    </ContentModal>
                </Fade>
            </Modal>
        </div >
    );
}
