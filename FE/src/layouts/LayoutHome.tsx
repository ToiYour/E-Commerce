import ChatClient from "@/pages/users/Chat";
import Footer from "@/pages/users/Footer";
import Header from "@/pages/users/Headers";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const LayoutHome = () => {
  toast.error(
    "Backend mình sử dụng render miễn phí đang bị giới hạn, bạn có thể truy cập vào lúc khác nhé. Cảm ơn bạn đã ghé thăm!"
  );
  console.error(
    "Backend mình sử dụng render miễn phí đang bị giới hạn, bạn có thể truy cập vào lúc khác nhé. Cảm ơn bạn đã ghé thăm!"
  );
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
