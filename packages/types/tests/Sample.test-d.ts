import { describe, expectTypeOf, it } from "vitest";

describe('Sample', () => {
    it('Type test', () => {
        const sample = "sample"
        expectTypeOf(sample).toBeString();
    });
});