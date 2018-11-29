import { loadSpriteSheet } from "../loader.js";
import Entity from "../Entity.js";
import PendulumWalk from "../trait/PendulumWalk.js";
import GoombaBehavior from "../trait/GoombaBehavior.js";
import Killable from "../trait/Killable.js";



export function loadGoomba() {
    return loadSpriteSheet('goomba')
    .then(createGoombaFactory)
}

function createGoombaFactory(sprite) {
    const walkAnimation = sprite.animations.get('walk')

    function routeAnimation(goomba) {
        if (goomba.killable.dead) {
            return 'flat'
        }

        return walkAnimation(goomba.lifetime)
    }

    function drawGoomba(context) {
        sprite.draw(routeAnimation(this), context, 0, 0)
    }

    return function createGoomba() {
        const goomba = new Entity()
        goomba.size.set(16, 16)

        goomba.addTrait(new PendulumWalk())
        goomba.addTrait(new GoombaBehavior())
        goomba.addTrait(new Killable())

        goomba.draw = drawGoomba

        return goomba
    }
}