import json from "../parser.js";

describe("parser (stub)", () => {
    it("should convert ArrayBuffer to string", async () => {
        const input = new Uint16Array([123, 34, 105, 100, 34, 58, 49, 125]).buffer;
        const result = await json(input);
        expect(result).toBe("{\"id\":1}");
    });

    it("should handle empty ArrayBuffer", async () => {
        const input = new Uint16Array([]).buffer;
        const result = await json(input);
        expect(result).toBe("");
    });
});