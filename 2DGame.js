const GameEngine = {
    loadGame: (a) => {
        if (!a || !document.contains(a)) throw new TypeError("Invalid element supplied for game frame.")

        this.__element = a;
    }
}