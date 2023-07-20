module.exports = {
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module", // 1
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
  },
  rules: {
    quotes: ["error", "single", { avoidEscape: true }],
    "comma-dangle": ["error", "always-multiline"],
  },
  settings: {
    react: {
      version: "16.4.2",
    },
  },
};
