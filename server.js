const { createConsumerServer } = require("./consumerServer");
const { createPublisherServer } = require("./publisherServer");
const { logWithTimestamp, errorWithTimestamp } = require("./utils");
const url = require("url");

// Create WebSocket server instances for consumers and publishers
const consumerWss = createConsumerServer(8080);
const publisherWss = createPublisherServer(8081, consumerWss);

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

// Extract ID from query parameters
consumerWss.on("connection", (ws, req) => {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  ws.id = id;
});

publisherWss.on("connection", (ws, req) => {
  const queryObject = url.parse(req.url, true).query;
  const id = queryObject.id;
  ws.id = id;
});
