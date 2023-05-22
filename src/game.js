const game = GameEngine.setGameElement(document.body)

game.loadSprite("image", {
    location: "./temp.jpg",
    height: "25px",
    width: "25px"
})

game.close();