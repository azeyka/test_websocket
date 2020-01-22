const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let btnState = false;

wss.on("connection", ws => {
  ws.on("message", () => {
    btnState = !btnState;
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ buttonState: btnState }));
      }
    });
  });

  ws.send(JSON.stringify({ buttonState: btnState }));
});
