const dotenvPlugin = require("cypress-dotenv");

module.exports = (on, config) => {
  config = dotenvPlugin(config, {}, true);
  return config;
};
