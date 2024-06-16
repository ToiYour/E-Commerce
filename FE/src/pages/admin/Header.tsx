import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth, useLogout } from "@/hooks/auth";
import { ToastError } from "@/lib/utils";
import { logOutAccount } from "@/services/auth";
import { AxiosError } from "axios";
import {
  ChevronDown,
  CircleUser,
  Home,
  LineChart,
  ListTodo,
  Menu,
  Package,
  Palette,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { authUser: account } = useAuth();
  const logOutSuccess = useLogout();
  const childrenVariant = useRef<HTMLUListElement | null>(null);
  const handlerVariant = () => {
    const element =
      childrenVariant.current && (childrenVariant.current as HTMLElement);
    if (element) {
      element.classList.toggle("hidden");
    }
  };
  const hanlderLogout = async () => {
    try {
      const { data } = await logOutAccount();
      logOutSuccess(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
  };
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
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
              to={"/admin/orders"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Đơn đặt hàng
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </NavLink>
            <NavLink
              to={"/admin/category"}
              className="flex items-center gap-3 rounded-lg text-muted-foreground  px-3 py-2  transition-all hover:text-primary"
            >
              <ListTodo className="h-4 w-4" />
              Danh mục{" "}
            </NavLink>
            <div className="sidebar-variant">
              <NavLink
                onClick={handlerVariant}
                to={"/admin/variant/color"}
                className="flex justify-between items-center gap-3 rounded-lg text-muted-foreground  px-3 py-2  transition-all hover:text-primary "
              >
                <div className="flex items-center gap-3">
                  <Palette className="h-4 w-4" />
                  Màu & Size
                </div>{" "}
                <ChevronDown size={16} />
              </NavLink>
              <ul ref={childrenVariant} className="hidden mt-1 pl-10">
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
              Sản phẩm{" "}
            </NavLink>
            <NavLink
              to={"/admin/customers"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Khách hàng
            </NavLink>
            <NavLink
              to={"/admin/analytics"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Phân tích
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{`${account?.name?.last_name} ${account?.name?.first_name}`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={hanlderLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
