/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["lcov", "text", "html"],
      reportsDirectory: "coverage",
      include: ["src/**/*"],
      exclude: [
        "node_modules/",
        "src/test/setup.ts",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "src/vite-env.d.ts",
      ],
    },
  },
});
