import { useContext, useState, useEffect } from "react";

import { ContentTable, ContainerTable } from "../style/TableStyle";

import { ItemsContexts } from "../contexts/Items";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { DatabaseFirestore } from "../config/firebase/config";
import { deleteItem } from "../config/actionsDatabase/actionDatabase";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Loader from './Loader';
import AlertMessages from "./AlertMessages";
import InputTextField from "./InputTextField";
import TableRow from "./TableRow";

import { useCallback } from "react";

export default function TableProducts() {

    const { lists, setLists } = useContext(ItemsContexts);

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [typesItems, setTypesItems] = useState('');

    const handleDeleteProduct = useCallback((id) => {
        deleteItem(id);
        setTypesItems('');
        setSearch('');
    }, []);

    const tokenAccess = localStorage.getItem('tokenAccess');

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            const queryRef = query(collection(DatabaseFirestore, "finanças"), where('id_user', '==', tokenAccess));
            const queryRefStatus = query(collection(DatabaseFirestore, "finanças"), where('id_user', '==', tokenAccess), where('tipo', '==', typesItems));

            const decisionQuery = typesItems.length > 0 ? queryRefStatus : queryRef;

            onSnapshot(decisionQuery, (querySnapshot) => {
                const datas = [];
                querySnapshot.forEach((doc) => ( datas.push(({...doc.data(), id: doc.id}))))
                setLists(datas);
            });
            setLoading(false)
        }
        getUsers();

    }, [typesItems])

    const searchFilter = search.toLowerCase();
    const filteredItems = search.length > 0 ? lists.filter(data => data.nome.toLowerCase().includes(searchFilter)) : [];

    return (
        <>
            {loading && <Loader />}

            <ContainerTable>
                <Box sx={{ minWidth: 300 }}>
                    <InputTextField
                        labelInput="Pesquisa"
                        valueInput={search}
                        onChangeValue={(e) => setSearch(e.target.value)}
                    />
                    <FormControl sx={{ width: 150 }}>
                        <InputLabel id="typesItemsLabel">Tipos</InputLabel>
                        <Select
                            labelId="typesItemsLabel"
                            id="typesItems"
                            label="Tipos"
                            value={typesItems}
                            onChange={(e) => setTypesItems(e.target.value)}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="entrada">Entrada</MenuItem>
                            <MenuItem value="saida">Saída</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {
                    lists.length > 0 ?
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
                                {filteredItems.length > 0 ?
                                    filteredItems.map((value, key) => {
                                        return (
                                            <TableRow
                                                data={value}
                                                key={value.id}
                                                funcDeleteItem={handleDeleteProduct}
                                                numberElement={key}
                                            />
                                        )
                                    })
                                    :
                                    lists.map((value, key) => {
                                        return (
                                            <TableRow
                                                data={value}
                                                key={value.id}
                                                funcDeleteItem={handleDeleteProduct}
                                                numberElement={key}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </ContentTable>
                        :
                        <AlertMessages
                            messageText="Nada encontrado"
                            size="20px"
                            weight={true}
                        />
                }
            </ContainerTable>
        </>

    )
}