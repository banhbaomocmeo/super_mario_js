import Trait from './Trait.js'

export default class Jump extends Trait{
	constructor() {
        super('go')
        this.dir = 0
        this.speed = 6000
        this.distance = 0
        this.heading = 1
    }

	update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir * deltaTime
        
        if (this.dir) {
            this.distance += Math.abs(entity.vel.x * deltaTime)
            this.heading = this.dir
        } else {
            this.distance = 0
        }
    }
}
