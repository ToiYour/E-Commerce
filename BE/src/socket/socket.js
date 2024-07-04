import { Server } from "socket.io"; // Import Server từ socket.io
import {
  disconnectSocket,
  eventConversationsAdmin,
  eventJoinRoomClient,
  eventLeaveConversation,
  eventSendMessage,
  eventTyping,
} from "./socket-event.js";
import { listRoomSocket, updateOperatingStatus } from "./socket-mongodb.js";
export const ConnectionSocketIo = (server) => {
  let usersConnected = [
    {
      avatar:
        "http://res.cloudinary.com/dlzhmxsqp/image/upload/v1717300660/e_commerce/vsiqf8o6pfmwnbfsmdml.jpg",
      id: "664c7d91caba19535422f0b3",
      is_admin: true,
      is_connected: false,
      name: "Huy Tới ",
    },
  ];
  const addUserConnected = (user) => {
    const isUser = usersConnected.some((u) => u.id === user.id);
    if (isUser) {
      const newUserConnected = usersConnected.map((u) => {
        if (u.id == user.id) {
          u = user;
        }
        return u;
      });
      usersConnected = newUserConnected;
    } else {
      usersConnected.push(user);
    }
    return;
  };
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });
  io.use((socket, next) => {
    const user = socket.handshake.auth;
    if (!user.id) {
      return next(new Error("Bạn cần đăng nhập lại"));
    }
    socket.user = user;
    next();
  });
  io.on("connection", (socket) => {
    console.log(listRoomSocket);
    console.log("Người dùng đã kết nối:", socket.user.id);
    addUserConnected({ ...socket.user, is_connected: true });
    updateOperatingStatus(socket.user.id, true, ""); // Trạng thái hoạt động
    // User online
    io.emit("userConnected", usersConnected); // Emit lại hoạt động các user
    socket.on("getUserConnected", () => {
      io.emit("userConnected", usersConnected); // Emit lại hoạt động các user
    });
    // Admin join room
    eventConversationsAdmin(io, socket);
    // Join vô phòng chat
    eventJoinRoomClient(io, socket, usersConnected);
    // Sử lý gửi tin nhắn
    eventSendMessage(io, socket, usersConnected);
    //Typing
    eventTyping(io, socket);
    // Out khỏi phòng chat
    eventLeaveConversation(io, socket, usersConnected);
    // Ngắt kết nối
    disconnectSocket(io, socket, usersConnected);
  });
};
