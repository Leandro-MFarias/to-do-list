import { SideBar } from "../../components/SideBar";
import { FormEvent, useEffect, useState } from "react";
import { TasksToday } from "../../components/TasksToday";
import { OtherTasks } from "../../components/OtherTasks";
import { NewTaskModal } from "../../components/NewTaskModal";
import { useTasks } from "../../Context";

export interface TasksLists {
    today: string[]
    tomorrow: string[]
    thisWeek: string[]
}

export function HomeUpcomming() {
    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)
    const [currentList, setCurrentList] = useState<keyof TasksLists>('today')
    const { tasksTotal, setTasksTotal } = useTasks()
    const [tasks, setTasks] = useState<TasksLists>({
        today: [],
        tomorrow: [],
        thisWeek: []
    })

    function openNewTaskModal(listName: keyof TasksLists) {
        setCurrentList(listName)
        setIsNewTaskModalOpen(true)
    }

    function closeNewTaskModal() {
        setIsNewTaskModalOpen(false)
    }

    function addNewTask(event: FormEvent<HTMLFormElement>, listName: keyof TasksLists) {
        event.preventDefault()

        const data = new FormData(event?.currentTarget)
        const task = data.get('task')?.toString()

        if (!task) return
        if (tasks[listName].includes('task')) return

        setTasks(prevTasks => ({
            ...prevTasks,
            [listName]: [...prevTasks[listName], task]
        }))
        closeNewTaskModal()
    }

    function removeTaskFromList(taskToRemove: string, listName: keyof TasksLists) {

        setTasks(prevTasks => ({
            ...prevTasks,
            [listName]: prevTasks[listName].filter(task => task !== taskToRemove)
        }))
    }

    useEffect(() => {
        const numberTasks = Object.values(tasks).reduce((sum, listTotal) => sum + listTotal.length, 0)
        setTasksTotal(numberTasks)
    }, [tasks, setTasksTotal])

    return (
        <div className="flex h-screen space-x-32">
            <SideBar />
            <main className="pt-12 space-y-16 w-full">
                <div className="flex items-baseline gap-4">
                    <h2 className="text-5xl font-medium">Upcomming</h2>
                    <span className="text-2xl bg-zinc-300/40 py-0.5 px-2 rounded-md">
                        {tasksTotal}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-5">

                    <TasksToday
                        tasks={tasks}
                        openNewTaskModal={openNewTaskModal}
                        removeTaskFromList={removeTaskFromList}
                    />

                    <OtherTasks
                        tasks={tasks} 
                        openNewTaskModal={openNewTaskModal}
                        removeTaskFromList={removeTaskFromList}
                    />
                </div>
            </main>
            {isNewTaskModalOpen && (
                <NewTaskModal 
                    closeNewTaskModal={closeNewTaskModal}
                    addNewTask={addNewTask}
                    currentList={currentList}
                />
            )}
        </div>
    )
}