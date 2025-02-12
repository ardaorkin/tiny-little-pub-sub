import WebSocket, { WebSocketServer } from "ws";
import { logWithTimestamp, errorWithTimestamp } from "./utils";
import { IncomingMessage } from "http";

function createConsumerServer(port: number): WebSocketServer {
  const consumerWss = new WebSocketServer({ port });

  consumerWss.on("listening", () => {
    logWithTimestamp(`Consumer WebSocket server is listening on port ${port}`);
  });

  consumerWss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const clientAddress = req.socket.remoteAddress;
    logWithTimestamp(`New consumer connected from ${clientAddress}`);

    ws.on("message", (message: string) => {
      try {
        logWithTimestamp(`Received message from consumer: ${message}`);
      } catch (error) {
        errorWithTimestamp(
          new Error(`Error processing message from consumer: ${error}`)
        );
      }
    });

    ws.on("close", () => {
      logWithTimestamp(`Consumer (${clientAddress}) disconnected`);
    });

    ws.on("error", (error: Error) => {
      errorWithTimestamp(
        new Error(`Error from consumer (${clientAddress}): ${error}`)
      );
    });
  });

  consumerWss.on("error", (error: Error) => {
    errorWithTimestamp(new Error(`Consumer WebSocket server error: ${error}`));
  });

  return consumerWss;
}

export { createConsumerServer };
