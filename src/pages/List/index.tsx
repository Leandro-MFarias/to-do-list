import { useParams } from "react-router-dom"
import { useLists } from "../../Context/useList"
import { SideBar } from "../../components/SideBar"
import { Check, Frown, Plus, Trash2, X } from "lucide-react"
import { FormEvent, useState } from "react"

export function List() {
    const { listId } = useParams<{ listId: string }>()
    const { newList, addTaskToList, removeTaskFromList } = useLists()
    const [ isModalTaskOpen, setIsModalTaskOpen ] = useState(false)

    const list = newList.find(list => list.id === listId)

    function openNewTaskModal() {
        setIsModalTaskOpen(true)
    }

    function closeNewTaskModal() {
        setIsModalTaskOpen(false)
    }

    function addNewTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event?.currentTarget)
        const task = data.get('listTask')?.toString()

        console.log('tasks submitted:', task)

        if (!task || !list) return

        addTaskToList(list.id, task)
        closeNewTaskModal()
    }

    function handleRemoveTask(task: string) {
        if (list) removeTaskFromList(list.id, task)
    }

    return (
        <div className="flex h-screen space-x-32">
            <SideBar />
            <div className="pt-12 space-y-16 w-full">
                <div className="flex items-center gap-4">
                    <h2 className="text-5xl font-medium">{list ? list.name : 'List not found'}</h2>
                    <span className="text-2xl bg-zinc-300/40 py-0.5 px-2 rounded-md">
                        { list ? list.tasks.length : 0 }
                    </span>
                </div>

                <div className="shadow-shape rounded-lg p-4 mr-8 space-y-4 max-w-[1360px]">
                    <button className="flex items-center text-zinc-500 shadow-shape rounded-lg w-full p-4 hover:text-zinc-200" onClick={openNewTaskModal}>
                        <Plus className="size-5" />
                        <p className="text-lg">Add New Task</p>
                    </button>

                    <div className="flex items-center py-4">
                        <ul className="flex flex-col w-full">
                            {list && list.tasks.length > 0 ? (
                                <div>
                                    {list.tasks.map((task, index) => (
                                        <li key={index} className="flex w-full justify-between shadow-shapeBottom p-4">
                                            <label className="flex items-center space-x-3 cursor-pointer relative">
                                                <input
                                                    type="checkbox"
                                                    className="peer relative appearance-none w-4 h-4 border border-zinc-800 rounded-sm focus:outline-none checked:bg-stone-800"
                                                />
                                                <Check className="size-4 absolute left-[-12px] text-zinc-400 opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                                                <span className="text-zinc-400 text-sm peer-checked:text-zinc-700 peer-checked:line-through transition-all duration-300">{task}</span>
                                            </label>
                                            <Trash2 onClick={() => handleRemoveTask(task)} className="size-5 text-zinc-700 hover:text-zinc-200 cursor-pointer" />
                                        </li>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex px-4 space-x-2 text-zinc-400">
                                    <span>Nothing here</span>
                                    <Frown />
                                </div>
                            )}
                        </ul>
                    </div>
                    {isModalTaskOpen && (
                        <div className="fixed w-full h-screen flex items-center justify-center bg-black/60 -inset-0 -inset-y-1">
                            <form onSubmit={(event) => addNewTask(event)} className="flex flex-col min-h-24 min-w-80 rounded-xl bg-zinc-950 shadow-shape space-y-5 px-4 py-3 pb-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl mt-2">New Task</span>
                                    <X onClick={closeNewTaskModal} className="text-zinc-600 hover:text-zinc-200 cursor-pointer" />
                                </div>
                                <div className="flex items-center bg-hoverAside rounded-md h-10 px-2 space-x-3">
                                    <input type="text" name="listTask" placeholder="Enter your new task" className="px-2 bg-transparent outline-none" />

                                    <div className="w-px h-6 bg-zinc-700" />

                                    <button type="submit" className="bg-teal-400 text-teal-950 hover:bg-teal-500 px-4 py-1 rounded-lg">
                                        Create Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}