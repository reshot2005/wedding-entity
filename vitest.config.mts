import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@frontend": path.resolve(import.meta.dirname, "src/frontend"),
      "@backend": path.resolve(import.meta.dirname, "src/backend"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
});
