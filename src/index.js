import GameSavingLoader from "./GameSavingLoader.js";

export default GameSavingLoader.load().then(
    (saving) => {
        console.log("Saving loaded:", saving);
    },
    (error) => {
        console.error("Error:", error);
    }
);