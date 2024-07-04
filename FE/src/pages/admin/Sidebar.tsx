import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  GanttChart,
  Home,
  LineChart,
  ListTodo,
  MessageCircleMore,
  Package,
  Palette,
  ShoppingCart,
  Ticket,
  Users,
} from "lucide-react";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
type SidebarType = {
  isNewMassage: boolean;
  setIsNewMassage: (value: boolean) => void;
};
const Sidebar = (props: SidebarType) => {
  const childrenVariant = useRef<HTMLUListElement | null>(null);
  const handlerVariant = () => {
    const element =
      childrenVariant.current && (childrenVariant.current as HTMLElement);
    if (element) {
      element.classList.toggle("hidden");
    }
  };
  return (
    <div className="hidden min-h-full border-r bg-muted/40 md:block bg-neutral-100">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6">
          <Link to={"/admin"} className="flex items-center gap-2 font-semibold">
            <GanttChart className="h-6 w-6" />
            <span className="">Admin Manager</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink
              end
              to={"/admin"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Trang chủ
            </NavLink>
            <NavLink
              onClick={() => props.setIsNewMassage(false)}
              to={"/admin/messages"}
              className=" flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <MessageCircleMore className="h-4 w-4" />
              <div className="relative">
                Quản lý tin nhắn
                <div
                  className={cn(
                    "absolute -right-3 -top-1",
                    !props.isNewMassage && "hidden"
                  )}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink
              to={"/admin/orders"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Quản lý đơn hàng
              <Badge className="bg-[#ee4d2d] hover:bg-[#f05d40] ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </NavLink>
            <NavLink
              to={"/admin/category"}
              className="flex items-center gap-3 rounded-lg text-muted-foreground  px-3 py-2  transition-all hover:text-primary"
            >
              <ListTodo className="h-4 w-4" />
              Quản lý danh mục{" "}
            </NavLink>
            <div className="sidebar-variant">
              <li
                onClick={handlerVariant}
                // to={"/admin/variant/"}
                className="flex justify-between items-center gap-3 rounded-lg text-muted-foreground  px-3 py-2  transition-all hover:text-primary "
              >
                <div className="flex items-center gap-3">
                  <Palette className="h-4 w-4" />
                  Quản lý màu & size
                </div>{" "}
                <ChevronDown size={16} />
              </li>
              <ul ref={childrenVariant} className="hidden mt-1 pl-5">
                <NavLink
                  to={"/admin/variant/color"}
                  className="text-xs flex pl-10 items-center gap-3 rounded-lg text-muted-foreground  px-3 py-2  transition-all hover:text-primary "
                >
                  Màu sắc
                </NavLink>
                <NavLink
                  to={"/admin/variant/size"}
                  className="text-xs flex pl-10 items-center gap-3 rounded-lg text-muted-foreground  px-3 py-2  transition-all hover:text-primary "
                >
                  Size
                </NavLink>
              </ul>
            </div>

            <NavLink
              to={"/admin/products"}
              className="flex items-center gap-3 rounded-lg text-muted-foreground  px-3 py-2  transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Quản lý sản phẩm{" "}
            </NavLink>
            <NavLink
              to={"/admin/voucher"}
              className="flex items-center gap-3 rounded-lg text-muted-foreground  px-3 py-2  transition-all hover:text-primary"
            >
              <Ticket className="h-4 w-4" />
              Quản lý mã giảm giá{" "}
            </NavLink>
            <NavLink
              to={"/admin/customers"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Quản lý khách hàng
            </NavLink>
            <NavLink
              to={"/admin/analytics"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Thống kê
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
