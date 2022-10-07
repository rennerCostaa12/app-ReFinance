import { createContext, useState } from "react";

export const ItemsContexts = createContext();


export default function ItemsContextProviders({ children }) {
    const [lists, setLists] = useState([]);

    return (
        <ItemsContexts.Provider value={{ lists, setLists }}>
            {children}
        </ItemsContexts.Provider>
    )
}