import { Plus, Check, Trash2, Frown } from "lucide-react";
import { TasksLists } from "../../pages/HomeUpcomming";

interface TasksTodayProps {
    tasks: TasksLists
    openNewTaskModal: (listName: keyof TasksLists) => void
    removeTaskFromList: (taskToRemove: string,listName: keyof TasksLists) => void
}

export function TasksToday({
    tasks,
    openNewTaskModal,
    removeTaskFromList,
} : TasksTodayProps) {
    return (
        <div className="col-span-1 shadow-shape rounded-lg p-4 mr-8 space-y-4 max-w-[1360px]">
            <h3 className="text-xl font-semibold">Today</h3>
            <div>
                <button className="flex items-center text-zinc-500 shadow-shape rounded-lg w-full p-4 hover:text-zinc-200" onClick={() => openNewTaskModal('today')}>
                    <Plus className="size-5" />
                    <p className="text-lg">Add New Task</p>
                </button>

                <div className="flex items-center py-4">
                    <ul className="flex flex-col w-full">
                        {tasks.today.length > 0 ? (
                            <div>
                                {tasks.today.map((task, index) => (
                                    <li key={index} className="flex w-full justify-between shadow-shapeBottom p-4">
                                        <label className="flex items-center space-x-3 cursor-pointer relative">
                                            <input
                                                type="checkbox"
                                                className="peer relative appearance-none w-4 h-4 border border-zinc-800 rounded-sm focus:outline-none checked:bg-stone-800"
                                            />
                                            <Check className="size-4 absolute left-[-12px] text-zinc-400 opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                                            <span className="text-zinc-400 text-sm peer-checked:text-zinc-700 peer-checked:line-through transition-all duration-300">{task}</span>
                                        </label>
                                        <Trash2 onClick={() => removeTaskFromList(task, 'today')} className="size-5 text-zinc-700 hover:text-zinc-200 cursor-pointer" />
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
    )
}