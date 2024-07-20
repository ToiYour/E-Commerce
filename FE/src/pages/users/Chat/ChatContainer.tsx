import Conversation from "@/components/Conversation";
import LoginToUseTheFunction from "@/components/LoginToUseTheFunction";
import { useMessageClientSocket } from "@/hooks/socket";
import { cn } from "@/lib/utils";
import { SendHorizonal, X } from "lucide-react";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import ListMessage from "./ListMessage";

type ChatContainer = {
  onChatMessageOpen: (state: boolean) => void;
  conversationId: string;
};
// Component
const ChatContainer = ({
  onChatMessageOpen,
  conversationId,
}: ChatContainer) => {
  const {
    messages,
    isLoggedIn,
    sendMessage,
    startFocus,
    stopFocus,
    userConnected,
    typing,
  } = useMessageClientSocket({ conversationId });
  const isAdminConnected = userConnected.filter((user) => user.is_admin)[0];
  const autoResize = (e: FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    const messageContent = document.querySelector(
      "#messages"
    ) as HTMLDivElement;
    if (textarea.classList.contains("h-14")) {
      textarea.classList.replace("h-14", "h-10");
    } else {
      textarea.classList.add("h-10");
    }
    if (messageContent.classList.contains("h-[348px]")) {
      messageContent.classList.replace("h-[348px]", "h-[364px]");
    } else {
      messageContent.classList.add("h-[364px]");
    }

    if (textarea.scrollHeight >= 64) {
      textarea.classList.replace("h-10", "h-14");
      messageContent.classList.replace("h-[364px]", "h-[348px]");
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = ({ message }: { message?: string }) => {
    sendMessage(message as string);
    reset();
  };

  return (
    <div className="modal-container-messager fixed inset-0 z-20">
      <div
        id="chat-container"
        className=" fixed bottom-3 right-5 w-96 h-2/3 z-50"
      >
        <div className="bg-white shadow-md rounded-lg rounded-br-none  w-full h-full relative ">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            {isAdminConnected?.avatar ? (
              <Conversation
                imgUrl={isAdminConnected?.avatar || "/images/isfeature.png"}
                name={isAdminConnected?.name || "Admin"}
                status={isAdminConnected?.is_connected}
                role={isAdminConnected?.is_admin}
                cancelConnectAt={isAdminConnected?.cancel_connect_at}
              />
            ) : (
              <div />
            )}
            <button
              onClick={() => onChatMessageOpen(false)}
              id="close-chat"
              className="cursor-pointer text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <X />
            </button>
          </div>
          {!isLoggedIn ? (
            <div className="mt-16">
              <LoginToUseTheFunction title="Đăng nhập để gửi tin nhắn" />
            </div>
          ) : (
            <>
              <ListMessage messages={messages} typing={typing} />

              <form
                id="myFormChat"
                onSubmit={handleSubmit(onSubmit)}
                className="border-t flex absolute bottom-0 inset-x-0 bg-white shadow rounded-bl-lg"
              >
                <textarea
                  {...register("message", {
                    required: "Bạn chưa nhập tin nhắn",
                  })}
                  onKeyPress={handleKeyDown}
                  onInput={autoResize}
                  onFocus={startFocus}
                  onBlur={stopFocus}
                  id="textarea-message"
                  placeholder="Tin nhắn"
                  className={cn(
                    "scrollbar-css w-full h-10 mr-14 px-3 py-2 rounded-bl-lg resize-none border-none focus:border-none "
                  )}
                ></textarea>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  id="send-button-message"
                  className="absolute right-0.5 bottom-0.5  px-4 py-1.5   transition duration-300"
                >
                  <SendHorizonal fill="#0ea5e9" color="#0ea5e9" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
