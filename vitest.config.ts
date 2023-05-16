import { coverageConfigDefaults, defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        setupFiles: [
            "tests/setupTests.ts",
        ],
        passWithNoTests: true,
        testTimeout: 120000,
        typecheck: { checker: "tsc" },
        globals: true,
        coverage: {
            enabled: true,
            all: true,
            provider: "c8",
            exclude: [...coverageConfigDefaults.exclude, ".next/**", "*.config.*"]
        }
    }
})