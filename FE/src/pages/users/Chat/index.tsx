import { MessageCircleMore } from "lucide-react";
import ChatContainer from "./ChatContainer";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { createConversation } from "@/services/chats/conversation";
import { useAuth } from "@/hooks/auth";
import { useSocket } from "@/hooks/socket";

const ChatClient = () => {
  const { authUser } = useAuth();
  const socket = useSocket();
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    (async () => {
      if (authUser && !authUser.role) {
        const { data } = await createConversation(authUser?._id as string);
        setConversationId(data.data._id);
      }
    })();
    const hanleClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (element.classList.contains("modal-container-messager")) {
        setIsOpenChat(false);
      }
    };

    window.addEventListener("click", hanleClick);
    return () => {
      window.removeEventListener("click", hanleClick);
    };
  }, [authUser, socket, isOpenChat, conversationId]);
  if (authUser && authUser.role) {
    return <></>;
  }
  return (
    <>
      <div
        className={cn(isOpenChat && "hidden", "fixed bottom-0 right-3  z-10")}
      >
        <button
          onClick={() => setIsOpenChat(true)}
          id="open-chat"
          className="rounded-t shadow-[0_0_15px_1px_#ccc]  bg-white text-[#ee4d2d] py-2 px-4  hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-2"
        >
          <MessageCircleMore color="#ee4d2d" />
          <span className="font-semibold">Chat</span>
        </button>
      </div>
      {isOpenChat && (
        <ChatContainer
          conversationId={conversationId}
          onChatMessageOpen={setIsOpenChat}
        />
      )}
    </>
  );
};

export default ChatClient;
