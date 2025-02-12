import { createConsumerServer } from "./consumerServer";
import { createPublisherServer } from "./publisherServer";
import { logWithTimestamp } from "./utils";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const consumerPort = process.env.CONSUMER_PORT
  ? parseInt(process.env.CONSUMER_PORT)
  : 8080;
const publisherPort = process.env.PUBLISHER_PORT
  ? parseInt(process.env.PUBLISHER_PORT)
  : 8081;

// Create WebSocket server instances for consumers and publishers
const consumerWss = createConsumerServer(consumerPort);
const publisherWss = createPublisherServer(publisherPort, consumerWss);

// Handle process termination
process.on("SIGTERM", () => {
  logWithTimestamp("Server is shutting down...");
  consumerWss.close(() => {
    logWithTimestamp("Consumer server closed");
    publisherWss.close(() => {
      logWithTimestamp("Publisher server closed");
      process.exit(0);
    });
  });
});
