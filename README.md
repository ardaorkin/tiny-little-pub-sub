# WebSocket Server

This project consists of two WebSocket servers: one for consumers and one for publishers. The consumer server listens on port 8080, and the publisher server listens on port 8081. Messages received from publishers are broadcast to all connected consumers.

## Project Structure

```
websocket-server/
├── consumerServer.js
├── publisherServer.js
├── server.js
├── utils.js
└── README.md
```

- `consumerServer.js`: Contains the logic for the consumer WebSocket server.
- `publisherServer.js`: Contains the logic for the publisher WebSocket server.
- `server.js`: Entry point of the application that initializes both WebSocket servers.
- `utils.js`: Utility functions for logging with timestamps.
- `README.md`: This file.

## Purpose

### Publisher Server

The publisher server listens on port 8081 and accepts connections from clients that want to send messages. When a message is received from a publisher, it is broadcast to all connected consumers. This server is responsible for receiving and distributing messages to consumers.

### Consumer Server

The consumer server listens on port 8080 and accepts connections from clients that want to receive messages. When a message is received from a publisher, it is sent to all connected consumers. This server is responsible for handling incoming connections from consumers and delivering messages to them.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd websocket-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the WebSocket servers:
   ```bash
   node server.js
   ```

2. The consumer WebSocket server will be available on `ws://localhost:8080`.
3. The publisher WebSocket server will be available on `ws://localhost:8081`.

## Handling Process Termination

The servers handle the `SIGTERM` signal to gracefully shut down both the consumer and publisher servers.

## License

This project is licensed under the MIT License.
