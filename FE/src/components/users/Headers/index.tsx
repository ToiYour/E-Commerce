import { AlignLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import FeatureHeader from "./FeatureHeader";
import MenuMain from "./MenuMain";
import MenuMobile from "./MenuMobile";
const Header = () => {
  const headerMenu = useRef<HTMLDivElement>(null);
  const menuMobile = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("scroll", handleScrollMenu);
    return () => {
      window.removeEventListener("scroll", handleScrollMenu);
    };
  });
  const handleMenuMobile = () => {
    menuMobile.current?.classList.toggle("open");
  };
  const handleSubMenuMobile: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    const element = e.target as HTMLElement;
    const subMenu = element.closest("li") as HTMLElement;
    subMenu.classList.toggle("open");
  };
  const handleScrollMenu = () => {
    const headerMain = headerMenu.current as HTMLElement;
    if (window.scrollY > 100) {
      headerMain.classList.add("fixed");
    } else {
      headerMain.classList.remove("fixed");
    }
  };
  const { pathname } = useLocation();
  return (
    <div id="header" className="relative w-full">
      <div
        ref={headerMenu}
        className={`header-menu style-one absolute top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${
          ["/", "/shop"].includes(pathname) ? "bg-transparent" : "bg-white"
        } `}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex justify-between h-full">
            <div
              onClick={handleMenuMobile}
              className="menu-mobile-icon lg:hidden flex items-center"
            >
              <AlignLeft />
            </div>
            <div className="left flex items-center gap-16">
              <Link
                to={"/"}
                className="flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
              >
                <div className="heading4">Toinh</div>
              </Link>
              <MenuMain />
            </div>
            <FeatureHeader />
          </div>
        </div>
      </div>
      {/* Menu Mobile */}
      <div ref={menuMobile} id="menu-mobile" className="">
        <MenuMobile
          onhandleMenuMobile={handleMenuMobile}
          onhandleSubMenuMobile={handleSubMenuMobile}
        />
      </div>
    </div>
  );
};

export default Header;
