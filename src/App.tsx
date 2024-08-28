
import { TasksProvider } from "./Context";
import { AppRoutes } from "./pages/Routes";

export function App() {
  return (
    <TasksProvider>
      <AppRoutes />
    </TasksProvider>
  )
}
