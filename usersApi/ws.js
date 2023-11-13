import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { getRequests } from "./controllers/requests.controller.js";

dotenv.config();
const PORT = process.env.WSPORT;

const wss = new WebSocketServer({ port: PORT });

console.log(`Websocket server running on port ${PORT}`);

wss.broadcast = (msg) => {
  wss.clients.forEach((client) => {
    client.send(msg);
  });
};

wss.on("connection", async (ws) => {
  const requestsData = await getRequests()
  ws.send(JSON.stringify(requestsData))

  ws.on("error", console.error);

  ws.on("open", function open() {
    ws.send("something");
  });

  ws.on("message", async function message(data) {
    const requestsData = await getRequests()
    wss.broadcast(JSON.stringify(requestsData));
  });

  // todo: onclose => remove the username in the array "usersLogged" that is located in users.controllers
});
