import ChatClient from "@/pages/users/Chat";
import Footer from "@/pages/users/Footer";
import Header from "@/pages/users/Headers";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const LayoutHome = () => {
  return (
    <>
      <ChatClient />
      <ToastContainer />
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default LayoutHome;
