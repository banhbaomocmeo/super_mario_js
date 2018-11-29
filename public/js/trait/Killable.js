import Trait from "./Trait.js";

export default class Killable extends Trait {
    constructor() {
        super('killable')
        this.dead = false
        this.removeAfter = 2
        this.deadTime = 0
    }

    kill() {
        this.dead = true
    }

    update(entity, deltaTime, level) {
        if(this.dead) {
            this.deadTime += deltaTime
            if(this.deadTime > this.removeAfter) {
                level.entities.delete(entity)
            }
        }
    }
}