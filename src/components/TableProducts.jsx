import { ContentTable, ContainerTable } from "../style/TableStyle";
import { useContext } from "react";
import { ItemsContexts } from "../contexts/Items";
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from "@mui/icons-material/Edit";
import ButtonModal from "./ButtonModal";
import Button from "@mui/material/Button";

export default function TableProducts() {

    const { lists, setLists } = useContext(ItemsContexts);

    const handleDeleteProduct = (id) => {
        setLists(lists.filter((data) => data.IdProduct !== id))
    }

    return (
        <>
            {lists.length > 0 ?
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
                            {lists && lists.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.nameProduct}</td>
                                        <td style={{ color: value.typeProduct == 'entrada' ? 'green' : 'red' }} >{value.valueProduct.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>{value.dateProduct}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <ButtonModal title_button={<Edit />} datas={value} />
                                            <Button color='error' onClick={() => handleDeleteProduct(value.IdProduct)}>
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
                ''
            }
        </>

    )
}