import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import router from "./App.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { SocketProvider } from "./contexts/SocketProvider.tsx";
import { CartProvider } from "./contexts/CartProvider.tsx";
import "./index.css";
import "./App.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <SocketProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </CartProvider>
    </SocketProvider>
  </AuthProvider>
);
