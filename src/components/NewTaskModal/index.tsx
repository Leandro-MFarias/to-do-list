import { X } from "lucide-react"
import { FormEvent } from "react"
import { TasksLists } from "../../pages/HomeUpcomming"

interface NewTaskModalProps {
    closeNewTaskModal: () => void
    addNewTask: (event: FormEvent<HTMLFormElement>, listName: keyof TasksLists) => void
    currentList: keyof TasksLists
}

export function NewTaskModal({
    closeNewTaskModal,
    addNewTask,
    currentList
}: NewTaskModalProps) {
    return (
        <div className="fixed w-full h-screen flex items-center justify-center bg-black/60 -inset-36 -inset-y-1">
            <form onSubmit={(event) => addNewTask(event, currentList)} className="flex flex-col min-h-24 min-w-80 rounded-xl bg-zinc-950 shadow-shape space-y-5 px-4 py-3 pb-5">
                <div className="flex items-center justify-between">
                    <span className="text-xl mt-2">New Task</span>
                    <X onClick={closeNewTaskModal} className="text-zinc-600 hover:text-zinc-200 cursor-pointer" />
                </div>
                <div className="flex items-center bg-hoverAside rounded-md h-10 px-2 space-x-3">
                    <input type="text" name="task" placeholder="Enter your new task" className="px-2 bg-transparent outline-none" />

                    <div className="w-px h-6 bg-zinc-700" />

                    <button type="submit" className="bg-teal-400 text-teal-950 hover:bg-teal-500 px-4 py-1 rounded-lg">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    )
}