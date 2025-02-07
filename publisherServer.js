const WebSocket = require("ws");
const {
  logWithTimestamp,
  errorWithTimestamp,
  generateClientId,
} = require("./utils");
const { v4: uuidv4 } = require("uuid");

function createPublisherServer(port, consumerWss) {
  const publisherWss = new WebSocket.Server({ port });

  publisherWss.on("listening", () => {
    logWithTimestamp(`Publisher WebSocket server is listening on port ${port}`);
  });

  publisherWss.on("connection", (ws, req) => {
    const clientAddress = req.socket.remoteAddress;
    const clientId = generateClientId(req);
    logWithTimestamp(
      `New publisher connected from ${clientAddress} with ID ${clientId}`
    );

    ws.on("message", (message) => {
      try {
        logWithTimestamp(
          `Received message from publisher ${clientId}: ${message} (type: ${typeof message})`
        );
        let broadcastCount = 0;
        consumerWss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && client !== ws) {
            logWithTimestamp(
              `Sending message to consumer ${client.id}: ${message}`
            );
            client.send(message);
            broadcastCount++;
          }
        });
        logWithTimestamp(
          `Broadcasted message to ${broadcastCount} consumer(s): ${message}`
        );
      } catch (error) {
        errorWithTimestamp(
          `Error processing message from publisher ${clientId}: ${error}`
        );
      }
    });

    ws.on("close", () => {
      logWithTimestamp(`Publisher ${clientId} (${clientAddress}) disconnected`);
    });

    ws.on("error", (error) => {
      errorWithTimestamp(
        `Error from publisher ${clientId} (${clientAddress}): ${error}`
      );
    });
  });

  publisherWss.on("error", (error) => {
    errorWithTimestamp(`Publisher WebSocket server error: ${error}`);
  });

  return publisherWss;
}

module.exports = { createPublisherServer };
