import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
const LayoutAdmin = () => {
  return (
    <>
      <div className="grid max-h-screen min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="max-h-[calc(100vh-60px)] overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LayoutAdmin;
