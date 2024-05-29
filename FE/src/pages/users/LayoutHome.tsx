import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Headers";

const LayoutHome = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutHome;
