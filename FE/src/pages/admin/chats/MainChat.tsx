import Conversation from "@/components/Conversation";
import Message from "@/components/Message";
import Typing from "@/components/Typing";
import { useMessageAdminSocket } from "@/hooks/socket";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const MainChat = () => {
  const { id } = useParams();
  const { messages, conversation, sendMessage, startFocus, stopFocus, typing } =
    useMessageAdminSocket({ conversationId: id as string });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);
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
    <>
      {/* Chat Header */}
      <header className="bg-white p-4 text-gray-700 border-b border-gray-200 shadow-lg">
        <Conversation
          imgUrl={conversation.participant?.avatar as string}
          name={`${conversation.participant?.name?.last_name} ${conversation.participant?.name?.first_name}`}
          status={conversation.participant?.status as boolean}
          cancelConnectAt={conversation.participant?.status_at as string}
        />
      </header>
      {/* Chat Messages */}
      <div className="chats-overflow overflow-y-auto overscroll-y-contain p-4 space-y-5">
        {messages.map((message) => (
          <Message data={message} key={message._id} />
        ))}
        {typing.isTyping && (
          <div className="relative ">
            <Typing class_name="left-0" avatar={typing.avatar} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Chat Input */}
      <footer className="bg-white border-t border-gray-300  absolute bottom-0 inset-x-0">
        <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("message", { required: "Bạn chưa nhập tin nhắn" })}
            onKeyPress={handleKeyDown}
            onFocus={startFocus}
            onBlur={stopFocus}
            className="border-none outline-none p-2 flex-1 resize-none scrollbar-hide"
            placeholder="Nhập tin nhắn..."
          ></textarea>
          <button disabled={isSubmitting} className="cursor-pointer py-2 px-3 ">
            <SendHorizonal fill="#2563eb" color="#2563eb" />
          </button>
        </form>
      </footer>
    </>
  );
};

export default MainChat;
