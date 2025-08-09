import { DashboardPage, LoginPage, RegisterAgent } from "./pages"
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "sonner";
import { nav } from "./constants";

const router = createBrowserRouter([
  {
    path: nav.root,
    element: <Navigate to={nav.login} replace />
  },
  { path: nav.login, element: <LoginPage /> },
  { path: nav.dashboard, element: <DashboardPage /> },
  { path: nav.register, element: <RegisterAgent /> },
]);

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors={true} position="top-center" />
      </QueryClientProvider>
    </>
  )
}

export default App
