import { useParams } from "react-router-dom"
import { useLists } from "../../Context/useList"
import { SideBar } from "../../components/SideBar"

export function List() {
    const { listId } = useParams<{ listId: string }>()
    const { newList } = useLists()

    const list = newList.find(list => list.id === listId)

    return (
        <div className="flex h-screen space-x-32">
            <SideBar />
            <div className="pt-12 space-y-16 w-full">
                <div className="flex items-center gap-4">
                    <h2 className="text-5xl font-medium">{list ? list.name : 'List not found'}</h2>
                    <span className="text-2xl bg-zinc-300/40 py-0.5 px-2 rounded-md">
                        1
                    </span>
                </div>

                <div className="shadow-shape rounded-lg p-4 mr-8 space-y-4 max-w-[1360px]">

                </div>
            </div>
        </div>
    )
}