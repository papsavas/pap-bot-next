import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: [
            "**/node_modules", "**/dist", "**/next"
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