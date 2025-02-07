const WebSocket = require("ws");
const {
  logWithTimestamp,
  errorWithTimestamp,
  generateClientId,
} = require("./utils");
const { v4: uuidv4 } = require("uuid");

function createConsumerServer(port) {
  const consumerWss = new WebSocket.Server({ port });

  consumerWss.on("listening", () => {
    logWithTimestamp(`Consumer WebSocket server is listening on port ${port}`);
  });

  consumerWss.on("connection", (ws, req) => {
    const clientAddress = req.socket.remoteAddress;
    const clientId = generateClientId(req);
    logWithTimestamp(
      `New consumer connected from ${clientAddress} with ID ${clientId}`
    );

    ws.on("message", (message) => {
      try {
        logWithTimestamp(
          `Received message from consumer ${clientId}: ${message}`
        );
      } catch (error) {
        errorWithTimestamp(
          `Error processing message from consumer ${clientId}: ${error}`
        );
      }
    });

    ws.on("close", () => {
      logWithTimestamp(`Consumer ${clientId} (${clientAddress}) disconnected`);
    });

    ws.on("error", (error) => {
      errorWithTimestamp(
        `Error from consumer ${clientId} (${clientAddress}): ${error}`
      );
    });
  });

  consumerWss.on("error", (error) => {
    errorWithTimestamp(`Consumer WebSocket server error: ${error}`);
  });

  return consumerWss;
}

module.exports = { createConsumerServer };
