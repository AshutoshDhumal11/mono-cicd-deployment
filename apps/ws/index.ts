import prisma from "db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return response
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      const parsedMessage =
        typeof message !== "string" ? message.toString() : message;
      const messageData = JSON.parse(parsedMessage);
      await prisma.user.create({
        data: {
          username: messageData.username,
          password: messageData.password,
        },
      });
      ws.send("Welcome");
    },
  },
});
