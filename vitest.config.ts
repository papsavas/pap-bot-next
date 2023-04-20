import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // include: [
        //     "{apps,packages}/**/*.{test,spec}.{js, jsx, ts, tsx}",
        //     "{apps,packages}/**/*.{test,spec}-d.ts",
        // ],
        exclude: [
            "**/node_modules", "**dist", "**/next"
        ],
        coverage: {
            enabled: true,
            all: true,
            provider: "c8",
        }
    }
})