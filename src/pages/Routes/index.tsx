import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomeUpcomming } from "../HomeUpcomming"
import { List } from "../List"
import { StickyWall } from "../StickyWall"

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeUpcomming />
    },
    {
        path: '/lists/:listId',
        element: <List />
    },
    {
        path: '/stickyWall',
        element: <StickyWall />
    }
])

export function AppRoutes() {
    return <RouterProvider router={router} />
}