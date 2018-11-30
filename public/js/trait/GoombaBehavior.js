import Trait from "./Trait.js";

export default class GoombaBehavior extends Trait {
    constructor() {
        super('behavior')
    }

    collides(us, them) {
        if(us.killable.dead) {
            return
        }

        if(them.stomper) {
            if(them.vel.y > us.vel.y) {
                us.killable.kill()
                us.pendulumWalk.speed = 0
            } else {
                them.killable.kill()
            }

        }

    }
}