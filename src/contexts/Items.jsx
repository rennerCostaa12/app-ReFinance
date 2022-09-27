import { createContext, useState } from "react";

export const ItemsContexts = createContext();


export default function ItemsContextProviders({ children }) {
    const [lists, setLists] = useState([]);
    const [updateTable, setUpdateTable] = useState([]);

    return (
        <ItemsContexts.Provider value={{ lists, setLists, updateTable, setUpdateTable }}>
            {children}
        </ItemsContexts.Provider>
    )
}