import { createContext, useContext, useState, ReactNode } from "react";

interface List {
    id: string
    name: string
    tasks: string[]
}

const initialLists: List[] = []

interface ListsContextProps {
    newList: List[]
    addList: (list: List) => void
    addTaskToList: (listId: string, task: string) => void
    removeTaskFromList: (listId: string, task: string) => void
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined)

export function ListsProvider({ children }: { children: ReactNode }) {
    const [newList, setNewList] = useState(initialLists)

    function addList(list: List) {
        setNewList((prevLists) => [...prevLists, list])
    }

    function addTaskToList(listId: string, task: string) {
        setNewList(prevLists =>
            prevLists.map(list =>
                list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list
            )
        )
    }

    function removeTaskFromList(listId: string, taskToRemove: string) {
        setNewList(prevLists =>
            prevLists.map(list =>
                list.id === listId ? { ...list, tasks: list.tasks.filter(task => task !== taskToRemove) } : list
            )
        )
    }

    return (
        <ListsContext.Provider value={{ newList, addList, addTaskToList, removeTaskFromList }}>
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
