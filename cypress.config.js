const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000"
  },

  env: {
    "CYPRESS_MAILSLURP_API_KEY": "58b1daf93f0b259388138e5f94343b1ea5205bc5b2e739f20fae09bfa48cde91"
  }
});
