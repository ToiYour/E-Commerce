import Footer from "@/components/users/Footer";
import Header from "@/components/users/Headers";
import { Outlet } from "react-router-dom";

const LayoutHome = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutHome;
