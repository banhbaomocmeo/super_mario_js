import Trait from "./Trait.js";

export default class Killable extends Trait {
    constructor() {
        super('killable')
        this.dead = false
        this.removeAfter = 2
        this.deadTime = 0
    }

    kill() {
        this.queue(() => this.dead = true)
    }

    revive() {
        this.dead = false 
        this.deadTime = 0
    }

    update(entity, deltaTime, level) {
        if(this.dead) {
            this.deadTime += deltaTime
            if(this.deadTime > this.removeAfter) {
                this.queue(() => {
                    level.entities.delete(entity)
                })
            }
        }
    }
}