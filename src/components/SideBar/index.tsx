import { ChevronsLeft, ChevronsRight, ListTodo, Plus, Search, StickyNote, X } from "lucide-react";
import { useState, FormEvent } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { HoverSideBar } from "../HoverSideBar";
import { useNote, useTasks } from "../../Context";
import { useLists } from "../../Context/useList";

export function SideBar() {
    const navigate = useNavigate()
    const { tasksTotal } = useTasks()
    const { noteTotal } = useNote()
    const { newList, addList } = useLists()
    const [isBarOpen, setIsBarOpen] = useState(true)
    const [isMouseHovered, setIsMouseHovered] = useState(false)
    const [isNewListModalOpen, setIsNewListModalOpen] = useState(false)

    function hideBar() {
        setIsBarOpen(false)
    }

    function showBar() {
        setIsBarOpen(true)
        setIsMouseHovered(false)
    }

    function openListModal() {
        setIsNewListModalOpen(true)
    }

    function closeListModal() {
        setIsNewListModalOpen(false)
    }

    function createList(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const listName = data.get('list')?.toString()

        if (!listName) throw new Error("List name is required");

        const list = {
            id: crypto.randomUUID(),
            name: listName,
            tasks: []
        }

        addList(list)

        navigate(`/lists/${list.id}`)
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
                            {newList.map(list => (
                                <Link to={`/lists/${list.id}`}>
                                    <div className="flex items-center justify-between w-full rounded-md text-xs text-zinc-400 hover:bg-hoverAside pl-3 px-1 py-2">
                                        {list.name}
                                        <p className="[padding:1px_6px_1px_4px] text-end mr-3 px-1 rounded-sm bg-zinc-700 text-zinc-50">
                                            {list.tasks.length}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <button onClick={openListModal} className="flex items-center text-sm text-zinc-400 pl-2 gap-2 hover:text-zinc-200">
                            <Plus className="size-3" />
                            Add New List
                        </button>
                    </div>
                    {isNewListModalOpen && (
                        <div className="fixed w-full h-screen flex items-center justify-center bg-black/60 inset-0 -inset-y-8">
                            <form onSubmit={(event) => createList(event)} className="flex flex-col min-h-24 min-w-80 rounded-xl bg-zinc-950 shadow-shape space-y-5 px-4 py-3 pb-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl mt-2">Create List</span>
                                    <X onClick={closeListModal} className="text-zinc-600 hover:text-zinc-200 cursor-pointer" />
                                </div>
                                <div className="flex items-center bg-hoverAside rounded-md h-10 px-2 space-x-3">
                                    <input type="text" name="list" placeholder="Name for your List" className="px-2 bg-transparent outline-none" />

                                    <div className="w-px h-6 bg-zinc-700" />

                                    <button type="submit" className="bg-teal-400 text-teal-950 hover:bg-teal-500 px-4 py-1 rounded-lg">
                                        New List
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
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