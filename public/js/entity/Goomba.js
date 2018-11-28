import { loadSpriteSheet } from "../loader.js";
import Entity from "../Entity.js";
import PendulumWalk from "../trait/PendulumWalk.js";



export function loadGoomba() {
    return loadSpriteSheet('goomba')
    .then(createGoombaFactory)
}

function createGoombaFactory(sprite) {
    const walkAnimation = sprite.animations.get('walk')
    function drawGoomba(context) {
        sprite.draw(walkAnimation(this.lifetime), context, 0, 0)
    }

    return function createGoomba() {
        const goomba = new Entity()
        goomba.size.set(16, 16)

        goomba.addTrait(new PendulumWalk())

        goomba.draw = drawGoomba

        return goomba
    }
}