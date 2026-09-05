import tsParser from "@typescript-eslint/parser";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: { parser: tsParser },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parser: tsParser },
  },
  {
    ignores: [".astro/*", "_legacy/*"],
  },
];
