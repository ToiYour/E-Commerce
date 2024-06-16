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
        className={cn(
          isOpenChat && "hidden",
          "fixed bottom-0 right-0 mb-4 mr-4 z-50"
        )}
      >
        <button
          onClick={() => setIsOpenChat(true)}
          id="open-chat"
          className="rounded-2xl bg-[#ee4d2d] text-white py-2 px-4  hover:bg-[#f98770] transition duration-300 flex items-center"
        >
          <MessageCircleMore />
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
