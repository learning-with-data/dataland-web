module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended",  "plugin:cypress/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "cypress"],
  rules: {
    indent: ["error", 2, {"SwitchCase": 1}],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
  "settings": {
    "react": { "version": "detect" }
  }
};
