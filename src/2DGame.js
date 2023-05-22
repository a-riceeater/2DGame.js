const GameEngine = {
    __element: null,
    __currentLoadedSprites: null,
    __currentGameObject: {},

    setGameElement: (a) => {
        if (!a || !document.contains(a)) throw new TypeError("Invalid element supplied for game frame.")

        this.__element = a;

        const GameObject = {
            loadSprite: (a) => {
                /*
                type: img (image) / shape
                shape: type of shape if shape type
                location: location of image if image type
                height
                width
                id: id for the sprite
                */

                
                if (a.type == "image" || a.type == "img") {
                    const location = a.location;

                    const sprite = document.createElement("image");
                    sprite.classList.add("game2d")
                    sprite.classList.add("sprite")
                    sprite.classList.add("image-sprite")
                    
                    sprite.id = a.id;
                    sprite.src = location;
                    
                    const SpriteObject = {
                        __sprite: sprite,
                        
                        watchFor: (a, b) => {
                            /*
                            a: event type
                            b: callback
                            */

                            switch (a) {
                                case "selfclick":
                                    SpriteObject.__sprite.addEventListener("click", b);
                                    break;
                                case "selfcontextmenu":
                                    SpriteObject.__sprite.__sprite.addEventListener("contextmenu", b);
                                    break;
                                default:
                                    GameEngine.__element.addEventListener(a, b);
                            }
                        }
                    }

                    return SpriteObject;

                } else {

                }
            }
        }

        return GameObject;
    },
}