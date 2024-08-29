import { TasksProvider } from "./Context";
import { ListsProvider } from "./Context/useList";
import { AppRoutes } from "./pages/Routes";

export function App() {
  return (
    <TasksProvider>
      <ListsProvider>
        <AppRoutes />
      </ListsProvider>
    </TasksProvider>
  )
}
