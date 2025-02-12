import WebSocket, { WebSocketServer } from "ws";
import { logWithTimestamp, errorWithTimestamp } from "./utils";
import { IncomingMessage } from "http";

function createPublisherServer(
  port: number,
  consumerWss: WebSocketServer
): WebSocketServer {
  const publisherWss = new WebSocketServer({ port });

  publisherWss.on("listening", () => {
    logWithTimestamp(`Publisher WebSocket server is listening on port ${port}`);
  });

  publisherWss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const clientAddress = req.socket.remoteAddress;
    logWithTimestamp(`New publisher connected from ${clientAddress}`);

    ws.on("message", (message: string) => {
      try {
        logWithTimestamp(
          `Received message from publisher: ${message} (type: ${typeof message})`
        );
        let broadcastCount = 0;
        consumerWss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && client !== ws) {
            logWithTimestamp(`Sending message to consumer: ${message}`);
            client.send(message);
            broadcastCount++;
          }
        });
        logWithTimestamp(
          `Broadcasted message to ${broadcastCount} consumer(s): ${message}`
        );
      } catch (error) {
        errorWithTimestamp(
          new Error(`Error processing message from publisher: ${error}`)
        );
      }
    });

    ws.on("close", () => {
      logWithTimestamp(`Publisher (${clientAddress}) disconnected`);
    });

    ws.on("error", (error: Error) => {
      errorWithTimestamp(
        new Error(`Error from publisher (${clientAddress}): ${error}`)
      );
    });
  });

  publisherWss.on("error", (error: Error) => {
    errorWithTimestamp(new Error(`Publisher WebSocket server error: ${error}`));
  });

  return publisherWss;
}

export { createPublisherServer };
