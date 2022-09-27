import { useContext, useState, useEffect } from "react";

import { ContentTable, ContainerTable, ContentLoading } from "../style/TableStyle";

import ButtonModal from "./ButtonModal";

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

    const { setLists, updateTable, setUpdateTable } = useContext(ItemsContexts);
    const { authUser } = useContext(UsersContext);

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    const handleDeleteProduct = (id, nomeProduto) => {
        deleteItem(id);
        setUpdateTable(updateTable.filter(data => data.nome_produto !== nomeProduto));
    }

    const collectionRef = collection(DatabaseFirestore, "finanças");

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const data = await getDocs(collectionRef);
            setLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));;
            setLoading(false)
        }
        getUsers();

    }, [updateTable])

    const ItemsFiltered = items.filter(data => data.id_user == authUser.uid)

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
                                    return (
                                        <tr style={{
                                            backgroundColor: key % 2 ? "#D3D3D3" : '#FFF'
                                        }} key={key}>
                                            <td>{value.nome}</td>
                                            <td style={{ color: value.tipo == 'entrada' ? 'green' : 'red' }} >{value.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                            <td>{value.data}</td>
                                            <td>
                                                <ButtonModal title_button={<Edit />} datas={value} />
                                                <Button color='error' onClick={() => handleDeleteProduct(value.id, value.nome)}>
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