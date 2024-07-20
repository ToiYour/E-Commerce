import { SocketContext } from "@/contexts/SocketProvider";
import { getAllMessageByIdConversation } from "@/services/chats/message";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { IMessage } from "@/interfaces/message";
import { AxiosError } from "axios";
import { ToastError } from "@/lib/utils";
import { IConversation } from "@/interfaces/conversation";
import { getConversationById } from "@/services/chats/conversation";

export const useSocket = () => {
  return useContext(SocketContext);
};
type useMessageSocketType = {
  conversationId: string;
};
type userConnectedMessageType = {
  id: string;
  name: string;
  is_admin: boolean;
  avatar: string;
  is_connected: boolean;
  cancel_connect_at?: string;
};
export const useMessageClientSocket = (props: useMessageSocketType) => {
  const socket = useSocket();
  const { authUser, isLoggedIn } = useAuth();
  const [userConnected, setUserConnected] = useState<
    userConnectedMessageType[]
  >([]);
  const [currentUserConnected, setCurrentUserConnected] =
    useState<userConnectedMessageType>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversation, setConversation] = useState<IConversation>({});
  const [typing, setTyping] = useState({ avatar: "", isTyping: false }); // Typing focus input
  useEffect(() => {
    (async () => {
      try {
        if (isLoggedIn) {
          const { data } = await getAllMessageByIdConversation(
            props.conversationId
          );
          const { data: dataConversation } = await getConversationById(
            props.conversationId as string
          );
          socket?.emit("conversation", props.conversationId);
          setConversation(dataConversation.data);
          setMessages(data.data);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          ToastError(error?.response?.data.message);
        }
      }
    })();
    setCurrentUserConnected(
      userConnected.find((user) => user.id === conversation.participant?._id)
    );
    socket?.on("receive_message", (response: IMessage) => {
      setMessages((prev) => [...prev, response]);
    });
    socket?.on("typing", (data) => {
      setTyping(data);
    });
    socket?.on("userConnected", (data) => {
      setUserConnected(data);
    });
    return () => {
      setTyping({
        avatar: "",
        isTyping: false,
      });
      socket?.emit("leave_conversation", props.conversationId);
      socket?.off("receive_message");
      socket?.off("typing");
      socket?.off("userConnected");
    };
  }, [props.conversationId, socket]);
  // Gửi tin nhắn
  const sendMessage = (message: string) => {
    socket?.emit("sendMessage", {
      _id: `${new Date().getTime()}${authUser?._id}`,
      conversationId: props.conversationId,
      sender: authUser,
      message: message,
      createdAt: new Date(),
    });
  };
  // Bắt đầu focus
  const startFocus = () => {
    socket?.emit("typing", {
      avatar: authUser?.avatar,
      isTyping: true,
      conversationId: props.conversationId,
    });
  };
  // Dừng focus
  const stopFocus = () => {
    socket?.emit("typing", {
      avatar: authUser?.avatar,
      isTyping: false,
      conversationId: props.conversationId,
    });
  };
  return {
    socket,
    authUser,
    isLoggedIn,
    typing,
    messages,
    sendMessage,
    startFocus,
    stopFocus,
    userConnected,
    conversation,
    currentUserConnected,
  };
};
export const useMessageAdminSocket = (props: useMessageSocketType) => {
  const socket = useSocket();
  const { authUser, isLoggedIn } = useAuth();
  const [userConnected, setUserConnected] = useState<
    userConnectedMessageType[]
  >([]);
  const [currentUserConnected, setCurrentUserConnected] =
    useState<userConnectedMessageType>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversation, setConversation] = useState<IConversation>({});
  const [typing, setTyping] = useState({
    avatar: "",
    isTyping: false,
    conversationId: "",
  }); // Typing focus input
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllMessageByIdConversation(
          props.conversationId
        );
        const { data: dataConversation } = await getConversationById(
          props.conversationId as string
        );
        setConversation(dataConversation.data);
        setMessages(data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          ToastError(error?.response?.data.message);
        }
      }
    })();
    setCurrentUserConnected(
      userConnected.find((user) => user.id === conversation.participant?._id)
    );
    socket?.on("receive_message", (response: IMessage) => {
      if (response.conversationId == props.conversationId) {
        setMessages((prev) => [...prev, response]);
      }
    });
    socket?.on("typing", (data) => {
      if (data.conversationId == props.conversationId) {
        setTyping(data);
      }
    });
    socket?.on("userConnected", (data) => {
      setUserConnected(data);
    });
    return () => {
      setTyping({
        conversationId: "",
        avatar: "",
        isTyping: false,
      });
      socket?.off("receive_message");
      socket?.off("typing");
      socket?.off("userConnected");
    };
  }, [props.conversationId, socket]);
  // Gửi tin nhắn
  const sendMessage = (message: string) => {
    socket?.emit("sendMessage", {
      _id: `${new Date().getTime()}${authUser?._id}`,
      conversationId: props.conversationId,
      sender: authUser,
      message: message,
      createdAt: new Date(),
    });
  };
  // Bắt đầu focus
  const startFocus = () => {
    socket?.emit("typing", {
      avatar: authUser?.avatar,
      isTyping: true,
      conversationId: props.conversationId,
    });
  };
  // Dừng focus
  const stopFocus = () => {
    socket?.emit("typing", {
      avatar: authUser?.avatar,
      isTyping: false,
      conversationId: props.conversationId,
    });
  };
  return {
    socket,
    authUser,
    isLoggedIn,
    typing,
    messages,
    sendMessage,
    startFocus,
    stopFocus,
    userConnected,
    conversation,
    currentUserConnected,
  };
};
