/*window.addEventListener("error", (e) => {
    alert(e.message)
})*/

class GameSprite {
    /**
     * 
     * @param {String} type The type of sprite: image/img or something else that Ikd why it exists rn
     * @param {JSON} data JSON data requiring location, height and width
     * @returns 
     */
    constructor(type, data) {
        return GameEngine.__currentGameObject.loadSprite(type, data);
    }
}

class Game {
    /**
     * 
     * @param {HTMLElement} element The element to load the game into
     * @returns 
     */
    constructor(element) {
        const obj = GameEngine.setGameElement(element);
        GameEngine.__currentGameObject = obj;
        return obj;
    }
}


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
                                    document.addEventListener(a, b);
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

                                if (a.explode) {
                                    const explosion = document.createElement("img")
                                    explosion.classList.add("game2d")
                                    explosion.classList.add("explosion")

                                    explosion.setAttribute("src", "./assets/explode.gif");

                                    explosion.style.left = SpriteObject.__sprite.style.left;
                                    explosion.style.top = SpriteObject.__sprite.style.top;

                                    explosion.style.position = "fixed"

                                    GameEngine.__element.appendChild(explosion);

                                    setTimeout(() => explosion.remove(), 1000)
                                }

                                if (a.remove) SpriteObject.__sprite.remove();
                            }, parseInt(a.duration))
                        },

                        teleport: (a) => {
                            SpriteObject.__sprite.style.left = a.left;
                            SpriteObject.__sprite.style.top = a.top;
                            SpriteObject.__sprite.position = "fixed"
                            return true;
                        }
                    }

                    return SpriteObject;

                } else {

                }
            },
            /**
             * Sets the game background to an image provided
             * @param {String} image The location to the image to set the background to
             */

            setGameBackground: (image) => {
                if (!image) throw new Error("No image supplied");
                GameEngine.__element.style.background = `url(${image})`
                GameEngine.__element.style.backgroundSize = "cover"
            },
        }

        GameEngine.__currentGameObject = GameObject;
        return GameObject;
    },

    /**
     * @param {Function} callback Callback function when game closed
     * Closes the game
     */

    close: (a) => {
        GameEngine.__element = null;
        return a();
    }
}

