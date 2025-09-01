import GameSavingLoader from "../GameSavingLoader.js";
import GameSaving from "../GameSaving.js";
import read from "../reader.js";
import json from "../parser.js";

jest.mock("../reader.js");
jest.mock("../parser.js");

describe("GameSavingLoader", () => {
    const mockObject = {
        id: 9,
        created: 1546300800,
        userInfo: {
            id: 1,
            name: "Hitman",
            level: 10,
            points: 2000,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should load and parse GameSaving correctly", async () => {
        const buffer = new ArrayBuffer(10);
        read.mockResolvedValue(buffer);

        json.mockResolvedValue(JSON.stringify(mockObject));

        const saving = await GameSavingLoader.load();

        expect(read).toHaveBeenCalledTimes(1);
        expect(json).toHaveBeenCalledWith(buffer);
        expect(saving).toBeInstanceOf(GameSaving);
        expect(saving.id).toBe(mockObject.id);
        expect(saving.userInfo.name).toBe("Hitman");
    });

    test("should throw error if read() fails", async () => {
        read.mockRejectedValue(new Error("File not found"));

        await expect(GameSavingLoader.load()).rejects.toThrow("File not found");
        expect(json).not.toHaveBeenCalled();
    });

    test("should throw error if json() fails", async () => {
        const buffer = new ArrayBuffer(10);
        read.mockResolvedValue(buffer);
        json.mockRejectedValue(new Error("Invalid buffer"));

        await expect(GameSavingLoader.load()).rejects.toThrow("Invalid buffer");
    });

    test("should throw error if JSON.parse fails", async () => {
        const buffer = new ArrayBuffer(10);
        read.mockResolvedValue(buffer);
        json.mockResolvedValue("not a json string");

        await expect(GameSavingLoader.load()).rejects.toThrow();
    });
});

describe("GameSaving class", () => {
    test("should correctly assign fields from object", () => {
        const data = {
            id: 9,
            created: 1546300800,
            userInfo: {
                id: 1,
                name: "Hitman",
                level: 10,
                points: 2000,
            },
        };

        const saving = new GameSaving(data);

        expect(saving).toBeInstanceOf(GameSaving);
        expect(saving.id).toBe(9);
        expect(saving.created).toBe(1546300800);
        expect(saving.userInfo).toEqual({
            id: 1,
            name: "Hitman",
            level: 10,
            points: 2000,
        });
    });
});
