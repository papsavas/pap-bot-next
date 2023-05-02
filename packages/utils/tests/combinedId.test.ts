import { describe, expect, it } from "vitest";
import { createCombinedId, resolveCombinedId } from "../combinedId";
describe('Combined Id', () => {
    it('Should create combined id from provided values', () => {
        expect(createCombinedId("foo", "bar", "baz")).toEqual("foo-bar-baz")
    });

    it("Should separate values from combined id", () => {
        expect(resolveCombinedId("foo-bar-baz")).toEqual(["foo", "bar", "baz"])
    })
});