/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        setupFiles: "./src/tests/setupTests.ts",
        include: ["./src/tests/*.{spec,test}.{js,ts}"]
    }
})