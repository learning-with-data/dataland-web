const dotenvPlugin = require("cypress-dotenv");

module.exports = (on, config) => {
  config = dotenvPlugin(config, {}, true);
  require("@cypress/code-coverage/task")(on, config);
  return config;
};
