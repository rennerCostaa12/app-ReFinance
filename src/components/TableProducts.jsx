import { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { ContentTable, ContainerTable, ContentLoading } from "../style/TableStyle";

import { UsersContext } from "../contexts/AuthContext";
import { ItemsContexts } from "../contexts/Items";

import DeleteIcon from '@mui/icons-material/Delete';
import Edit from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { collection, getDocs } from "firebase/firestore";
import { DatabaseFirestore } from "../config/firebase/config";
import { deleteItem } from "../config/actionsDatabase/actionDatabase";


export default function TableProducts() {

    const { lists, setLists, updateTable, setUpdateTable } = useContext(ItemsContexts);
    const { authUser } = useContext(UsersContext);

    const [loading, setLoading] = useState(false);

    const handleDeleteProduct = (id) => {
        deleteItem(id);
    }

    const collectionRef = collection(DatabaseFirestore, "finanças");

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const data = await getDocs(collectionRef);
            setLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoading(false)
        }
        getUsers();

    }, [updateTable])

    const ItemsFiltered = lists.filter(data => data.id_user == authUser.uid)

    return (
        <>
            {loading ?
                <ContentLoading>
                    <CircularProgress color="success" />
                </ContentLoading>
                :
                ItemsFiltered.length > 0 ?
                    <ContainerTable>
                        <ContentTable>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ItemsFiltered && ItemsFiltered.map((value, key) => {

                                    const date = new Date(value.data.seconds * 1000 + value.data.nanoseconds / 1000000);
                                    const dateCurrent = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} `;

                                    return (
                                        <tr style={{
                                            backgroundColor: key % 2 ? "#D3D3D3" : '#FFF'
                                        }} key={key}>
                                            <td>{value.nome}</td>
                                            <td style={{ color: value.tipo == 'entrada' ? 'green' : 'red' }} >{value.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                            <td>{dateCurrent}</td>
                                            <td>
                                                <Link to={`editar/${value.id}`}>
                                                    <Edit />
                                                </Link>

                                                <Button color='error' onClick={() => handleDeleteProduct(value.id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </ContentTable>
                    </ContainerTable>
                    :
                    <h3 style={{
                        textAlign: "center",
                        marginBottom: '2rem'
                    }}
                    >
                        Nenhum Registro Cadastrado
                    </h3>

            }
        </>

    )
}