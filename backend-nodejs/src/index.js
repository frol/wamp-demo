const autobahn = require("autobahn");

const wamp = new autobahn.Connection({
  realm: "dots",
  transports: [
    {
      url: process.env.WAMP_DOTS_URL || "ws://localhost:8080/ws",
      type: "websocket"
    }
  ],
  authmethods: ["ticket"],
  authid: "dots-backend",
  onchallenge: (session, method, extra) => {
    if (method === "ticket") {
      return process.env.WAMP_DOTS_BACKEND_SECRET || "backend";
    }
    throw "WAMP authentication error: unsupported challenge method";
  },
  retry_if_unreachable: true,
  max_retries: Number.MAX_SAFE_INTEGER,
  max_retry_delay: 10
});

const handlers = {
  "com.dots.test-js": async (args) => {
    console.log("TEST-JS received args:", args);
    return 42;
  },
};

function setupWamp() {
  wamp.onopen = async session => {
    console.log("WAMP connection is established. Waiting for commands...");

    for (let [name, handler] of Object.entries(handlers)) {
      try {
        await session.register(name, handler);
      } catch (error) {
        console.error("Failed to register .test-js handler due to:", error);
        wamp.close();
        setTimeout(() => {
          wamp.open();
        }, 1000);
        return;
      }
    }
  };

  wamp.onclose = reason => {
    console.log(
      "WAMP connection has been closed (check WAMP router availability and credentials):",
      reason
    );
  };

  console.log("Starting WAMP connection...");
  wamp.open();
}

async function main() {
  setupWamp();
}

main();
