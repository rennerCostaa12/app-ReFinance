import DeleteIcon from '@mui/icons-material/Delete';
import Edit from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import { memo } from 'react';

function TableRow({ data, funcDeleteItem, numberElement }) {

    const date = new Date(data.data.seconds * 1000 + data.data.nanoseconds / 1000000);
    const dateCurrent = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} `;

    return (
        <tr style={{
            backgroundColor: numberElement % 2 ? "#D3D3D3" : '#FFF'
        }}>
            <td>{data.nome.toUpperCase()}</td>
            <td style={{ color: data.tipo == 'entrada' ? 'green' : 'red' }} >{data.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
            <td>{dateCurrent}</td>
            <td>
                <Link title="Editar" to={`editar/${data.id}`}>
                    <Edit />
                </Link>

                <Button title="Deletar" color='error' onClick={() => funcDeleteItem(data.id)}>
                    <DeleteIcon />
                </Button>
            </td>
        </tr>
    )
}

export default memo(TableRow);