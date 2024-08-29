import { Plus, X } from "lucide-react";
import { SideBar } from "../../components/SideBar";
import { FormEvent, useEffect, useState } from "react";
import { useNote } from "../../Context";

export function StickyWall() {
    const [isStickyModalOpen, setIsStickyModalOpen] = useState(false)
    const [newNote, setNewNote] = useState<{ title: string, note: string, color: string }[]>([])
    const [color, setColor] = useState('#FFFFFF')
    const { noteTotal, setNoteTotal } = useNote()

    function openStickyModal() {
        setIsStickyModalOpen(true)
    }

    function closeStickyModal() {
        setIsStickyModalOpen(false)
    }

    function addNewNote(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event?.currentTarget)
        const note = data.get('note')?.toString()
        const title = data.get('title')?.toString()
        const color = data.get('color')?.toString() || '#FFFFFF'

        if (!title || !note) return

        setNewNote([...newNote, { title, note, color }])
        closeStickyModal()
    }

    function removeNote(noteToRemove: number) {
        setNewNote(newNote.filter((_, i) => i !== noteToRemove))
    }

    useEffect(() => {
        const numberNote = newNote.length
        setNoteTotal(numberNote)
    }, [newNote, setNewNote])


    return (
        <div className="flex h-screen space-x-32">
            <SideBar />
            <div className="pt-12 w-full space-y-16">
                <div className="flex items-center gap-4">
                    <h2 className="text-5xl font-medium">Sticky Wall</h2>
                    <span className="text-2xl bg-zinc-300/40 py-0.5 px-2 rounded-md">
                        {noteTotal}
                    </span>
                </div>

                <div className="max-h-[80vh] shadow-shape rounded-lg mr-8 p-6 overflow-y-auto">
                    {newNote.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_auto))] gap-5">
                            {newNote.map(({ title, note, color }, index) => (
                                <div key={index} className="flex flex-col gap-2 ${color} p-4 rounded-lg text-black h-80 w-80" style={ { backgroundColor: color } }>
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-2xl font-semibold">{title}</h4>
                                        <X onClick={() => removeNote(index)} className="hover:text-zinc-300 cursor-pointer" />
                                    </div>
                                    <p className="pl-4 pr-2">
                                        {note}
                                    </p>
                                </div>
                            ))}
                            <button onClick={openStickyModal} className="h-80 w-80 flex items-center justify-center shadow-shape bg-zinc-700/20 rounded-lg hover:bg-zinc-700/50 cursor-pointer">
                                <Plus className="size-16 text-zinc-500" />
                            </button>
                        </div>
                    ) : (
                        <button onClick={openStickyModal} className="h-80 w-80 flex items-center justify-center shadow-shape bg-zinc-700/20 rounded-lg hover:bg-zinc-700/50 cursor-pointer">
                            <Plus className="size-16 text-zinc-500" />
                        </button>
                    )}
                </div>
                {isStickyModalOpen && (
                    <div>
                        <div className="fixed h-screen flex items-center justify-center bg-black/60 -inset-36 -inset-y-1">
                            <form onSubmit={(event) => addNewNote(event)} className="flex flex-col min-h-48 min-w-96 rounded-xl bg-zinc-950 shadow-shape space-y-5 px-4 py-3 pb-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl mt-2">Add Note</span>
                                    <X onClick={closeStickyModal} className="text-zinc-600 hover:text-zinc-200 cursor-pointer" />
                                </div>
                                <div className="flex flex-col items-center space-y-3">
                                    <input type="text" name="title" className="bg-zinc-700 rounded-md p-2 outline-none self-start w-full" placeholder="Enter with a title" />
                                    <textarea
                                        name="note"
                                        rows={3}
                                        cols={50}
                                        placeholder="Enter your note" className="bg-zinc-700 rounded-md p-2 outline-none"
                                    />
                                    <label className="self-start flex items-center gap-2 text-zinc-400 px-2">
                                        <span>Select a note color:</span>
                                        <input
                                            type="color"
                                            name="color"
                                            value={color}
                                            className="bg-transparent h-8 cursor-pointer"
                                            onChange={(event) => setColor(event.target.value)}
                                        />
                                    </label>

                                    <button type="submit" className="text-lg font-medium px-4 py-1.5 rounded-lg w-full bg-teal-400 text-teal-950 hover:bg-teal-500">
                                        Create Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}