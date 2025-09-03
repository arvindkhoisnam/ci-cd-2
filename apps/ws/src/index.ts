import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const wss = new WebSocketServer({
  port: 3002,
});

wss.on("connection", (ws) => {
  console.log("New ws connection");

  ws.on("message", async (data) => {
    const parsed = JSON.parse(data as unknown as string);
    console.log(parsed);

    if (parsed.username && parsed.password) {
      const newUser = await client.user.create({
        data: {
          username: parsed.username,
          password: parsed.password,
        },
      });

      ws.send(`New user created with id: ${newUser.id}`);
    }
  });

  ws.on("close", () => {
    console.log("closing ws connection");
  });
});
