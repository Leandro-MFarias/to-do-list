import { Search, ListTodo, StickyNote, SquareChartGantt, Briefcase, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useNote, useTasks } from "../../Context";

export function HoverSideBar() {
    const { tasksTotal } = useTasks()
    const { noteTotal } = useNote()
    
    return (
        <div>
            <div className="opacity-30 mt-10 ml-5 pt-12 px-8 h-[90vh] w-72 flex flex-col bg-zinc-900 space-y-4 relative shadow-shade rounded-xl">
                <div className="space-y-2">
                    <h2 className="text-2xl pr-2">Menu</h2>
                    <div className="flex items-center gap-2 bg-hoverAside rounded-lg px-1 py-1">
                        <Search className="size-5" />
                        <input type="search" className="bg-transparent outline-none" />
                    </div>
                </div>

                <div className="w-full h-px bg-zinc-800" />


                <div className="flex flex-col">
                    <span className="">TASKS</span>
                    <ul>
                        <Link to='/'>
                            <li className="flex items-center w-full rounded-md text-xs text-zinc-400 hover:bg-hoverAside px-1 py-2">
                                <div className="flex items-center gap-1 w-full">
                                    <ListTodo className="size-5 " />
                                    <p>Upcomming</p>
                                </div>
                                <span className="[padding:1px_6px_1px_4px] text-end mr-3 px-1 rounded-sm bg-zinc-700 text-zinc-50">
                                    {tasksTotal}
                                </span>
                            </li>
                        </Link>

                        <Link to='stickyWall'>
                            <li className="flex items-center w-full rounded-md text-xs text-zinc-400 hover:bg-hoverAside px-1 py-2">
                                <div className="flex items-center gap-1 w-full">
                                    <StickyNote className="size-5 " />
                                    <p>Sticky Wall</p>
                                </div>
                                <span className="[padding:1px_6px_1px_4px] text-end mr-3 px-1 rounded-sm bg-zinc-700 text-zinc-50">
                                    {noteTotal}
                                </span>
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="w-full h-px bg-zinc-800" />

                <div className="space-y-2">
                    <span>LISTS</span>
                    <div>
                        <a href="#" className="flex items-center w-full rounded-md text-xs text-zinc-400 hover:bg-hoverAside px-1 py-2">
                            <div className="flex items-center gap-1 w-full">
                                <SquareChartGantt className="size-5 " />
                                <p>Personal</p>
                            </div>
                            <p className="[padding:1px_6px_1px_4px] text-end mr-3 px-1 rounded-sm bg-zinc-700 text-zinc-50">10</p>
                        </a>
                        <a href="#" className="flex items-center w-full rounded-md text-xs text-zinc-400 hover:bg-hoverAside px-1 py-2">
                            <div className="flex items-center gap-1 w-full">
                                <Briefcase className="size-5 " />
                                <p>Work</p>
                            </div>
                            <p className="[padding:1px_6px_1px_4px] text-end mr-3 px-1 rounded-sm bg-zinc-700 text-zinc-50">2</p>
                        </a>
                    </div>

                    <button className="flex items-center text-sm text-zinc-400 pl-2 gap-2 hover:text-zinc-200">
                        <Plus className="size-3" />
                        Add New List
                    </button>
                </div>
            </div>
        </div>
    )
}