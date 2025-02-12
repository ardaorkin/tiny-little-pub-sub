// Function to get the current timestamp
function getTimestamp(): string {
  return new Date().toISOString();
}

// Function to log messages with a timestamp
function logWithTimestamp(message: string): void {
  console.log(`[${getTimestamp()}] ${message}`);
}

// Function to log errors with a timestamp
function errorWithTimestamp(error: Error): void {
  console.error(`[${getTimestamp()}]`, error.message);
}

export { logWithTimestamp, errorWithTimestamp };
