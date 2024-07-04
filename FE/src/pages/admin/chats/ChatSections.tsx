import { IConversation } from "@/interfaces/conversation";
import { ToastError } from "@/lib/utils";
import { getAllConversation } from "@/services/chats/conversation";
import { AxiosError } from "axios";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ChatSectionItem from "./ChatSectionItem";
import { useSocket } from "@/hooks/socket";
type ConnectType = {
  avatar: string;
  id: string;
  is_admin?: boolean;
  is_connected?: boolean;
  name?: string;
  cancel_connect_at?: string;
};
type UserConnect = {
  [key: string]: ConnectType;
};
const ChatSections = () => {
  const { id } = useParams();
  const socket = useSocket();
  const [usersConnect, setUsersConnected] = useState<UserConnect>({});
  const [conversations, setConversations] = useState<IConversation[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllConversation();
        setConversations(data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          ToastError(error.response?.data.message);
        }
      }
    })();
    socket?.emit("getUserConnected", "");
    socket?.on(
      "userConnected",
      (
        data: [
          {
            avatar: string;
            id: string;
            is_admin?: boolean;
            is_connected?: boolean;
            name?: string;
            cancel_connect_at?: string;
          }
        ]
      ) => {
        const newData = data.reduce(
          (acc: { [key: string]: ConnectType }, user) => {
            acc[user?.id] = user;
            return acc;
          },
          {}
        );
        setUsersConnected(newData);
      }
    );
    return () => {
      socket?.off("getUserConnected");
      socket?.off("userConnected");
    };
  }, [id, socket]);
  return (
    <div className="chat-sections col-span-2 bg-white border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-gray-300 flex flex-col justify-between items-start gap-2 shadow-lg">
        <h1 className="text-2xl font-semibold">Đoạn chat</h1>
        <div className="relative w-full">
          <input
            className="appearance-none text-sm border pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Tìm kiếm trên Messager..."
          />
          <div className="hidden absolute right-1.5 top-1/2 -translate-y-1/2  items-center justify-center hover:bg-black/5 size-7 rounded-full cursor-pointer">
            <X color="#333" strokeWidth={1} size={20} />
          </div>
          <div className="absolute left-2 inset-y-0 flex items-center">
            <Search color="#333" strokeWidth={1.5} />
          </div>
        </div>
      </header>
      {/* Contact List */}
      <div className="chats-overflow overflow-y-auto  p-3  w-full overflow-x-hidden">
        {conversations.map((conversation) => {
          const participantId = conversation.participant?._id;
          const status = participantId
            ? usersConnect[participantId]
            : undefined;
          return (
            <NavLink
              to={"/admin/messages/" + conversation._id}
              key={conversation._id}
              className="group"
            >
              <ChatSectionItem
                data={conversation}
                status={status?.is_connected}
                cancelConnect={status?.cancel_connect_at}
              />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSections;
