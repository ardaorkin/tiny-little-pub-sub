const { v4: uuidv4 } = require("uuid");

// Function to get the current timestamp
function getTimestamp() {
  return new Date().toISOString();
}

// Function to log messages with a timestamp
function logWithTimestamp(message) {
  console.log(`[${getTimestamp()}] ${message}`);
}

// Function to log errors with a timestamp
function errorWithTimestamp(error) {
  console.error(`[${getTimestamp()}]`, error);
}

function generateClientId(req) {
  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  return urlParams.get("id") || uuidv4();
}

module.exports = {
  logWithTimestamp,
  errorWithTimestamp,
  generateClientId,
};
