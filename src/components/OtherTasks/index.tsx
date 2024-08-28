import { Plus, Check, Trash2, Frown } from "lucide-react";
import { TasksLists } from "../../pages/HomeUpcomming";

interface OtherTasksProps {
    tasks: TasksLists
    openNewTaskModal: (listName: keyof TasksLists) => void
    removeTaskFromList: (taskToRemove: string, listName: keyof TasksLists) => void
}

export function OtherTasks({
    openNewTaskModal,
    removeTaskFromList,
    tasks,
}: OtherTasksProps) {
    return (
        <div className='grid grid-cols-2 gap-5 max-w-[1395px]'>
            <div className="shadow-shape rounded-lg p-4 space-y-4">
                <h2 className="text-xl font-semibold">Tomorrow</h2>
                <div>
                    <button onClick={() => openNewTaskModal('tomorrow')} className="flex items-center text-zinc-500 shadow-shape rounded-lg w-full p-2 hover:text-zinc-200">
                        <Plus className="size-5" />
                        <p>Add New Task</p>
                    </button>

                    <div className="flex items-center py-4">
                        <ul className="flex flex-col w-full">
                            {tasks.tomorrow.length > 0 ? (
                                <div>
                                    {tasks.tomorrow.map((task, index) => (
                                        <li key={index} className="flex w-full justify-between shadow-shapeBottom p-4">
                                            <label className="flex items-center space-x-3 cursor-pointer relative">
                                                <input
                                                    type="checkbox"
                                                    className="peer relative appearance-none w-4 h-4 border border-zinc-800 rounded-sm focus:outline-none checked:bg-stone-800"
                                                />
                                                <Check className="size-4 absolute left-[-12px] text-zinc-400 opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                                                <span className="text-zinc-400 text-sm peer-checked:text-zinc-700 peer-checked:line-through transition-all duration-300">{task}</span>
                                            </label>
                                            <Trash2 onClick={() => removeTaskFromList(task, 'tomorrow')} className="size-5 text-zinc-700 hover:text-zinc-200 cursor-pointer" />
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
                </div>
            </div>

            <div className="shadow-shape rounded-lg p-4 mr-8 space-y-4">
                <h2 className="text-xl font-semibold">This Week</h2>
                <div>
                    <button onClick={() => openNewTaskModal('thisWeek')} className="flex items-center text-zinc-500 shadow-shape rounded-lg w-full p-2 hover:text-zinc-200">
                        <Plus className="size-5" />
                        <p>Add New Task</p>
                    </button>

                    <div className="flex items-center py-4">
                        <ul className="flex flex-col w-full">
                            {tasks.thisWeek.length > 0 ? (
                                <div>
                                    {tasks.thisWeek.map((task, index) => (
                                        <li key={index} className="flex w-full justify-between shadow-shapeBottom p-4">
                                            <label className="flex items-center space-x-3 cursor-pointer relative">
                                                <input
                                                    type="checkbox"
                                                    className="peer relative appearance-none w-4 h-4 border border-zinc-800 rounded-sm focus:outline-none checked:bg-stone-800"
                                                />
                                                <Check className="size-4 absolute left-[-12px] text-zinc-400 opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                                                <span className="text-zinc-400 text-sm peer-checked:text-zinc-700 peer-checked:line-through transition-all duration-300">{task}</span>
                                            </label>
                                            <Trash2 onClick={() => removeTaskFromList(task, 'thisWeek')} className="size-5 text-zinc-700 hover:text-zinc-200 cursor-pointer" />
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
                </div>
            </div>
        </div>
    )
}