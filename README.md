# WebSocket Server

This project contains two WebSocket servers: a publisher server and a consumer server. The publisher server receives messages from publishers and broadcasts them to all connected consumers, except the sender.

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

The publisher server listens on port 8081 and accepts connections from clients that want to send messages. When a message is received from a publisher, it is broadcast to all connected consumers, except the sender. This server is responsible for receiving and distributing messages to consumers.

### Consumer Server

The consumer server listens on port 8080 and accepts connections from clients that want to receive messages. When a message is received from a publisher, it is sent to all connected consumers. This server is responsible for handling incoming connections from consumers and delivering messages to them.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/websocket-server.git
   cd websocket-server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

### Starting the Consumer Server

Start the consumer server on a specified port:
```sh
node consumerServer.js <port>
```

Example:
```sh
node consumerServer.js 8081
```

### Starting the Publisher Server

Start the publisher server on a specified port and connect it to the consumer server:
```sh
node publisherServer.js <port> <consumerServerPort>
```

Example:
```sh
node publisherServer.js 8080 8081
```

## Logging

Both servers log important events with timestamps, including connections, disconnections, messages received, and errors.

## Handling Process Termination

The servers handle the `SIGTERM` signal to gracefully shut down both the consumer and publisher servers.

## Changes

- The publisher server now ensures that the publisher client won't receive the message it sent.
- Updated log messages to accurately reflect the number of consumers that received the broadcasted message.

## License

This project is licensed under the MIT License.
