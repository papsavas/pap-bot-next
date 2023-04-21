import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
        ],
        environmentMatchGlobs: [
            ["**/bot/**", "node"],
            ["**/site/**", "jsdom"],
            ["**/packages/**", "node"]
        ],
        setupFiles: [
            "tests/setupTests.ts",
        ],
        passWithNoTests: true,
        typecheck: { checker: "tsc" },
        coverage: {
            enabled: true,
            all: true,
            provider: "c8",
        }
    }
})