import read from "../reader.js";

describe("reader", () => {
    it("should return a Buffer", async () => {
        const buffer = await read();
        expect(buffer).toBeInstanceOf(ArrayBuffer);
    });
});