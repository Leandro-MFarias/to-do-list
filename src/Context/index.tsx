import { createContext, ReactNode, useContext, useState } from "react";

interface TasksContextProps {
    tasksTotal: number
    setTasksTotal: React.Dispatch<React.SetStateAction<number> >
    noteTotal: number
    setNoteTotal: React.Dispatch<React.SetStateAction<number> >
}

export const TasksContext = createContext<TasksContextProps | undefined>(undefined)

export function TasksProvider( { children }: { children: ReactNode } ) {
    const [ tasksTotal, setTasksTotal ] = useState(0)
    const [ noteTotal, setNoteTotal ] = useState(0)

    return (
        <TasksContext.Provider value={ { tasksTotal, setTasksTotal, noteTotal, setNoteTotal } }>
            { children }
        </TasksContext.Provider>
    )
}

export function useTasks() {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider");
    }
    return context
}

export function useNote() {
    const context = useContext(TasksContext)
    if(!context) {
        throw new Error("useNote must be used within a TasksProvider")
    }
    return context
}