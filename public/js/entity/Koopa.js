import { loadSpriteSheet } from "../loader.js";
import Entity from "../Entity.js";
import PendulumWalk from "../trait/PendulumWalk.js";
import KoopaBehavior, { States } from "../trait/KoopaBehavior.js";
import Killable from "../trait/Killable.js";



export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory)
}

function createKoopaFactory(sprite) {
    const walkAnimation = sprite.animations.get('walk')
    const wakeAnimation = sprite.animations.get('wake')

    function routeAnimation(koopa) {
        if (koopa.behavior.state === States.HIDING) {
            if(koopa.behavior.hideTime > 3) {
                return wakeAnimation(koopa.behavior.hideTime)
            }
            return 'hiding'
        }
        if (koopa.behavior.state === States.PANIC) {
            return 'hiding'
        }

        return walkAnimation(koopa.lifetime)
    }

    function drawKoopa(context) {
        sprite.draw(routeAnimation(this), context, 0, 0, this.vel.x < 0)
    }

    return function createKoopa() {
        const koopa = new Entity()
        koopa.size.set(16, 16)
        koopa.offset.y = 8
        koopa.addTrait(new PendulumWalk())
        koopa.addTrait(new KoopaBehavior())
        koopa.addTrait(new Killable())

        koopa.draw = drawKoopa

        return koopa
    }
}