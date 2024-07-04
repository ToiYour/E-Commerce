import LoadingFixed from "@/components/LoadingFixed";
import { useAuth } from "@/hooks/auth";
import { ToastError } from "@/lib/utils";
import { getItemLocal } from "@/services/localStorageService";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | undefined>(undefined);
const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth();
  const socketRef = useRef<Socket | undefined>(
    io(process.env.SERVER as string, {
      transports: ["websocket"],
      autoConnect: false,
    })
  );
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.SERVER as string, {
        transports: ["websocket"],
        autoConnect: false,
      });
    }

    (socketRef.current.auth = {
      id: authUser?._id,
      name: `${authUser?.name?.last_name} ${authUser?.name?.first_name}`,
      is_admin: authUser?.role,
      avatar: authUser?.avatar,
      is_connected: false,
    }),
      socketRef.current.connect();
    socketRef.current.on("connect_error", (err) => {
      if (authUser && socketRef.current && getItemLocal("token")) {
        socketRef.current.auth = {
          id: authUser?._id,
          name: `${authUser.name?.last_name} ${authUser.name?.first_name}`,
          is_admin: authUser?.role,
          avatar: authUser.avatar,
          is_connected: false,
        };
        ToastError(err.message); // not authorized
      }
    });
    setLoading(false);
    socketRef.current.emit("conversationsAdmin");
    return () => {
      socketRef.current?.off("conversationsAdmin");
      socketRef.current && socketRef.current.disconnect();
    };
  }, [authUser, socketRef]);
  if (loading) {
    return <LoadingFixed />;
  }
  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
