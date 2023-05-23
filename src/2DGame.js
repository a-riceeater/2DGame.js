/*window.addEventListener("error", (e) => {
    alert(e.message)
})*/

const GameEngine = {
    __element: null,
    __currentLoadedSprites: null,
    __currentGameObject: {},

    setGameElement: (a) => {
        if (!a || !document.contains(a)) throw new TypeError("Invalid element supplied for game frame.")

        GameEngine.__element = a;

        const GameObject = {
            loadSprite: (a, b) => {
                /*
                type: img (image) / shape
                shape: type of shape if shape type
                location: location of image if image type
                height
                width
                id: id for the sprite
                */

                
                if (a == "image" || a == "img") {
                    const location = b.location;

                    const sprite = document.createElement("img");
                    sprite.classList.add("game2d")
                    sprite.classList.add("sprite")
                    sprite.classList.add("image-sprite")
                    
                    if (b.id) sprite.setAttribute("id", b.id);

                    sprite.setAttribute("draggable", "false");
                    sprite.setAttribute("src", location);
                    
                    if (b.height) sprite.setAttribute("height", b.height)
                    if (b.width) sprite.setAttribute("width", b.width)

                    sprite.style.top = "0px";
                    sprite.style.left = "0px";

                    GameEngine.__element.appendChild(sprite);

                    
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
                        },

                        glideTo: (a) => {
                            const duration = parseInt(a.duration) / 1000;
                            let originalTransition = SpriteObject.__sprite.style.transition;
                            SpriteObject.__sprite.style.position = "fixed";

                            let addition = a.linear ? "all linear " : "all ease ";

                            SpriteObject.__sprite.style.transition = addition + duration + "s";

                            SpriteObject.__sprite.style.top = a.top;
                            SpriteObject.__sprite.style.left = a.left;

                            setTimeout(() => {
                                SpriteObject.__sprite.style.transition = originalTransition;
                            }, parseInt(a.duration))
                        }
                    }

                    return SpriteObject;

                } else {

                }
            }
        }

        return GameObject;
    },

    close: (a) => {
        GameEngine.__element = null;
        return a();
    } 
}
