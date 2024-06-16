import { useAuth } from "@/hooks/auth";
import { useSocket } from "@/hooks/socket";
import Header from "@/pages/admin/Header";
import Sidebar from "@/pages/admin/Sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const LayoutAdmin = () => {
  document.title = "Admin";
  const { authUser } = useAuth();
  const [isNewMassage, setIsNewMassage] = useState(false);
  const socket = useSocket();
  useEffect(() => {
    socket?.on("receive_message", (res) => {
      if (res.sender?._id != authUser?._id) {
        setIsNewMassage(true);
      }
    });
  }, [authUser?._id, socket]);
  return (
    <>
      <div className="grid max-h-screen min-h-screen  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar
          isNewMassage={isNewMassage}
          setIsNewMassage={setIsNewMassage}
        />
        <div className="flex flex-col ">
          <Header />
          <main className="main-content-admin overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LayoutAdmin;
