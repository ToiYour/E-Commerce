import {
  listRoomSocket,
  saveMessagesSocketToDatabase,
  updateOperatingStatus,
} from "./socket-mongodb.js";

export const eventConversationsAdmin = (io, socket) => {
  socket.on("conversationsAdmin", () => {
    console.log("Admin join rooms");
    socket.join(listRoomSocket);
  });
};
export const eventJoinRoomClient = (io, socket, usersConnected) => {
  socket.on("conversation", (conversationId) => {
    console.log("Đã join vào phòng:", conversationId);
    socket.join(conversationId);
    socket.conversation = conversationId;
    io.emit("userConnected", usersConnected);
  });
};
export const eventSendMessage = (io, socket, usersConnected) => {
  socket.on("sendMessage", (payload) => {
    io.emit("userConnected", usersConnected); // Emit lại hoạt động các user
    const isAdmin = usersConnected.find(
      (user) => user.is_admin && !user.is_connected
    );
    io.sockets.in(payload.conversationId).emit("receive_message", payload);
    saveMessagesSocketToDatabase({
      conversationId: payload.conversationId,
      sender: payload.sender._id,
      message: payload.message,
    });
    if (isAdmin && payload.sender._id != isAdmin.id) {
      io.sockets.in(socket.conversation).emit("receive_message", {
        _id: `${new Date().getTime()}${isAdmin.id}`,
        conversationId: socket.conversation,
        sender: isAdmin,
        message:
          "Cảm ơn bạn đã quan tâm. Hiện tại Toinh đang không hoạt động, mình sẽ trả lời bạn trong thời gian sớm nhất ạ!",
        createdAt: new Date(),
      });
      saveMessagesSocketToDatabase({
        conversationId: socket.conversation,
        sender: isAdmin.id,
        message:
          "Cảm ơn bạn đã quan tâm. Hiện tại Toinh đang không hoạt động, mình sẽ trả lời bạn trong thời gian sớm nhất ạ!",
      });
    }
  });
};
export const eventTyping = (io, socket) => {
  socket.on("typing", (payload) => {
    const conversation = socket.conversation || payload?.conversationId;
    console.log(conversation);
    socket.broadcast
      .to(conversation)
      .emit("typing", { ...payload, conversationId: socket.conversation });
  });
};
export const eventLeaveConversation = (io, socket, usersConnected) => {
  socket.on("leave_conversation", (conversationId) => {
    socket.leave(conversationId);
    console.log(`Vừa out ra khỏi phòng: ${conversationId}`);
    io.emit("userConnected", usersConnected); // Emit lại hoạt động các user
  });
};
export const disconnectSocket = (io, socket, usersConnected) => {
  socket.on("disconnect", () => {
    const newUserConnected = usersConnected.map((user) => {
      if (user.id == socket.user.id) {
        user.is_connected = false;
        user.cancel_connect_at = new Date();
      }
      return user;
    });
    usersConnected = newUserConnected;
    io.emit("userConnected", usersConnected); // Emit lại hoạt động các user
    updateOperatingStatus(socket.user.id, false, new Date());
    console.log("Người dùng đã bị ngắt kết nối: ", socket.user.id);
  });
};
