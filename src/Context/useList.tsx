import { createContext, useContext, useState, ReactNode } from "react";

interface List {
    id: string
    name: string
}

const initialLists: List[] = []

interface ListsContextProps {
    newList: List[]
    addList: (list: List) => void
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined)

export function ListsProvider({ children }: { children: ReactNode }) {
    const [newList, setNewList] = useState(initialLists)

    function addList(list: List) {
        setNewList((prevLists) => [...prevLists, list])
    }

    return (
        <ListsContext.Provider value={{ newList, addList }}>
            {children}
        </ListsContext.Provider>
    );
}

export function useLists() {
    const context = useContext(ListsContext)
    if (context === undefined) {
        throw new Error("useLists must be used within a ListsProvider");
    }
    return context
}
