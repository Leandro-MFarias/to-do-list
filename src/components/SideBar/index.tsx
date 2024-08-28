import { Briefcase, ChevronsLeft, ChevronsRight, ListTodo, Plus, Search, SquareChartGantt, StickyNote } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HoverSideBar } from "../HoverSideBar";
import { useNote, useTasks } from "../../Context";

export function SideBar() {
    const { tasksTotal } = useTasks()
    const { noteTotal } = useNote()
    const [isBarOpen, setIsBarOpen] = useState(true)
    const [isMouseHovered, setIsMouseHovered] = useState(false)

    function hideBar() {
        setIsBarOpen(false)
    }

    function showBar() {
        setIsBarOpen(true)
        setIsMouseHovered(false)
    }

    return (
        <aside>
            {isBarOpen ? (
                <div className={`relative  pt-12 px-8 h-screen w-72 flex flex-col bg-neutral-950 space-y-9 shadow-shape `}>
                    <button type="button" onClick={hideBar}>
                        <ChevronsLeft className="text-zinc-400 absolute top-4 right-4 cursor-pointer hover:text-zinc-200" />
                    </button>

                    <div className="space-y-2">
                        <h2 className="text-2xl pr-2">Menu</h2>
                        <div className="flex items-center gap-2 bg-hoverAside rounded-lg px-3 py-1">
                            <Search className="size-5" />
                            <input type="search" className="bg-transparent outline-none" />
                        </div>
                    </div>

                    <div className="w-full h-px bg-zinc-800" />

                    <nav className="flex flex-col">
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
                                    <span className="[padding:1px_6px_1px_4px] text-end mr-3 px-1 rounded-sm bg-zinc-700 text-zinc-50">{noteTotal}</span>
                                </li>
                            </Link>
                        </ul>
                    </nav>

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
            ) : (
                <div>
                    <button
                        type="button"
                        onClick={showBar}
                        onMouseEnter={() => setIsMouseHovered(true)} onMouseLeave={() => setIsMouseHovered(false)}
                    >
                        <ChevronsRight className="self-start absolute top-8 left-10 text-zinc-400 size-7" />
                    </button>
                    {isMouseHovered && (
                        <HoverSideBar />
                    )}

                </div>
            )}
        </aside>
    )
}