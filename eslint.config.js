import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      ".git/**",
      ".npm-cache/**",
      "flags/**",
      "css/**",
      "site/**",
      "reports/**",
      "badges/**",
      "_site/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["scripts/**/*.js", "test/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
];
