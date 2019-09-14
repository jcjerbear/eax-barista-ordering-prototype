#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require("debug")("WebTemplateStudioExpress:server");
const http = require("http");
const app = require("./app");
const CONSTANTS = require("./constants");
const sqlite3 = require("sqlite3").verbose();

/**
 * Start SQLite DB connections.
 */

let db = new sqlite3.Database(":memory:", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(CONSTANTS.PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Close SQLite DB connections.
 */

process.on("SIGINT", () => {
  db.close(err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
  server.close();
});
