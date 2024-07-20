import Message from "@/components/Message";
import Typing from "@/components/Typing";
import WelcomeChat from "@/components/WelcomeChat";
import { IMessage } from "@/interfaces/message";
import { useEffect, useRef } from "react";
const ListMessage = ({
  messages,
  typing,
}: {
  messages: IMessage[];
  typing: { avatar?: string; isTyping?: boolean };
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  return (
    <div
      id="messages"
      className="max-w-full h-[360px] flex flex-col rounded-bl-lg space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {messages.length <= 0 ? (
        <WelcomeChat />
      ) : (
        messages.map((message) => <Message data={message} key={message._id} />)
      )}
      {typing.isTyping && (
        <div className="relative pb-5">
          <Typing class_name="left-0" avatar={typing.avatar} />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ListMessage;
