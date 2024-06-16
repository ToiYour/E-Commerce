import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, Outlet } from "react-router-dom";
import ChatSections from "@/pages/admin/chats/ChatSections";
const LayoutChatAdmin = () => {
  return (
    <div className="px-5 wrapper-chats-admin">
      <Breadcrumb className="hidden md:flex my-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/admin"}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Quản lí tin nhắn</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="chats-container-admin grid grid-cols-6  border border-gray-200 rounded-lg overflow-hidden">
        <ChatSections />
        <div className="col-span-4 relative ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutChatAdmin;
