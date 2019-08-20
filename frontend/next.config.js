// next.config.js
const withCSS = require("@zeit/next-css");

const defaultWampDemoUrl = "ws://localhost:8080/ws";
const defaultWampDemoFrontendSecret = "front";

module.exports = withCSS({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  serverRuntimeConfig: {
    wampDemoUrl:
      process.env.WAMP_DEMO_INTERNAL_URL ||
      process.env.WAMP_DEMO_URL ||
      defaultWampDemoUrl,
    wampDemoFrontendSecret:
      process.env.WAMP_DEMO_INTERNAL_FRONTEND_SECRET ||
      process.env.WAMP_DEMO_FRONTEND_SECRET ||
      defaultWampDemoFrontendSecret
  },
  publicRuntimeConfig: {
    wampDemoUrl:
      process.env.WAMP_DEMO_URL || defaultWampDemoUrl,
    wampDemoFrontendSecret:
      process.env.WAMP_DEMO_FRONTEND_SECRET ||
      defaultWampDemoFrontendSecret
  }
});
