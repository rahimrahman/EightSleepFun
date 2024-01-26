module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommeded",
    "plugin:react/recommended"
  ],
};
